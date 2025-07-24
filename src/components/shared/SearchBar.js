import React, { useState, useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
/**
 * Modern luxury search bar component with enhanced accessibility and mobile-first design
 * Features improved contrast, touch-friendly controls, and responsive suggestion system
 */
const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionRefs = useRef([]);

    // Mock recent searches for luxury UX
    const recentSearches = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    const popularCities = ['Dubai', 'Singapore', 'Barcelona', 'Amsterdam'];
    const allSuggestions = [...recentSearches, ...popularCities];

    const handleSearch = (searchQuery = query) => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setQuery('');
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < allSuggestions.length) {
                handleSearch(allSuggestions[activeIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = activeIndex < allSuggestions.length - 1 ? activeIndex + 1 : 0;
            setActiveIndex(nextIndex);
            if (showSuggestions && suggestionRefs.current[nextIndex]) {
                suggestionRefs.current[nextIndex].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = activeIndex > 0 ? activeIndex - 1 : allSuggestions.length - 1;
            setActiveIndex(prevIndex);
            if (showSuggestions && suggestionRefs.current[prevIndex]) {
                suggestionRefs.current[prevIndex].scrollIntoView({ block: 'nearest' });
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setActiveIndex(-1);
            inputRef.current?.blur();
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowSuggestions(true);
    };

    const handleBlur = (e) => {
        // Only hide suggestions if focus is not moving to a suggestion
        if (!e.relatedTarget || !e.relatedTarget.closest('[data-suggestion]')) {
            setIsFocused(false);
            setTimeout(() => {
                setShowSuggestions(false);
                setActiveIndex(-1);
            }, 150);
        }
    };

    const handleSuggestionClick = (city, index) => {
        handleSearch(city);
    };

    const toggleSuggestions = () => {
        if (showSuggestions) {
            setShowSuggestions(false);
            setActiveIndex(-1);
        } else {
            setShowSuggestions(true);
            inputRef.current?.focus();
        }
    };

    // Clear active index when suggestions change
    useEffect(() => {
        if (!showSuggestions) {
            setActiveIndex(-1);
        }
    }, [showSuggestions]);

    return (
        <div className="search-container">
            <div 
                className={`relative flex items-center backdrop-blur-xl border rounded-[2rem] p-1.5 transition-all duration-300 shadow-glass overflow-hidden min-h-[3.5rem]
                    ${isFocused 
                        ? 'transform -translate-y-0.5 scale-[1.01] border-white/30 bg-white/15 shadow-glass-hover' 
                        : 'border-white/20 bg-white/10'
                    } 
                    ${isLoading ? 'bg-accent-blue/15 border-accent-blue/30' : ''}`}
                role="combobox"
                aria-expanded={showSuggestions}
                aria-haspopup="listbox"
                aria-owns="search-suggestions"
            >
                {/* Enhanced animated background shine */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-500 ${isFocused ? 'transform translate-x-full' : '-translate-x-full'}`}></div>
                
                {/* Search icon with improved contrast */}
                <div className="flex items-center justify-center w-12 h-12 mr-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg transition-all duration-300">
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Loading"></div>
                    ) : (
                        <svg 
                            className={`w-5 h-5 text-white transition-transform duration-300 ${isFocused ? 'rotate-12' : ''}`} 
                            viewBox="0 0 24 24" 
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    )}
                </div>
                
                {/* Enhanced input with better contrast and accessibility */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for any city worldwide..."
                    className="flex-1 bg-transparent border-none outline-none text-white text-lg font-normal font-manrope tracking-wide py-4 px-2 placeholder:text-white/60 placeholder:font-light focus:placeholder:text-white/40 selection:bg-white/20"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-label="Search for weather in a city"
                    aria-describedby="search-instructions"
                    aria-autocomplete="list"
                    aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
                    autoComplete="off"
                />
                
                {/* Voice search button with improved touch target */}
                <button 
                    className="min-w-[3rem] min-h-[3rem] w-12 h-12 border-none rounded-full bg-white/15 text-white/80 cursor-pointer transition-all duration-300 flex items-center justify-center ml-2 hover:bg-white/25 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
                    onClick={() => {/* Voice search would be implemented here */}}
                    aria-label="Voice search (coming soon)"
                    title="Voice search - feature coming soon"
                    type="button"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </button>

                {/* Toggle suggestions button for mobile */}
                <button 
                    className="min-w-[3rem] min-h-[3rem] w-12 h-12 border-none rounded-full bg-white/15 text-white/80 cursor-pointer transition-all duration-300 flex items-center justify-center ml-2 md:hidden hover:bg-white/25 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95"
                    onClick={toggleSuggestions}
                    aria-label={showSuggestions ? "Hide suggestions" : "Show suggestions"}
                    title={showSuggestions ? "Hide suggestions" : "Show recent searches"}
                    type="button"
                >
                    <svg className={`w-5 h-5 transition-transform duration-300 ${showSuggestions ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* Hidden instructions for screen readers */}
            <div id="search-instructions" className="sr-only">
                Use arrow keys to navigate suggestions, Enter to select, Escape to close
            </div>

            {/* Enhanced suggestions with mobile-friendly height and touch targets */}
            {showSuggestions && (
                <div 
                    id="search-suggestions"
                    className="absolute top-full left-0 right-0 mt-3 bg-white/96 backdrop-blur-xl border border-white/25 rounded-2xl shadow-luxury z-[1000] overflow-hidden animate-slide-up max-h-[60vh] md:max-h-[400px]"
                    role="listbox"
                    data-suggestion
                >
                    <div className="overflow-y-auto max-h-full">
                        {/* Recent searches section */}
                        <div className="p-4 pb-2">
                            <h4 className="text-xs font-semibold text-gray-600 m-0 mb-3 uppercase tracking-wider">Recent Searches</h4>
                            <div className="flex flex-col gap-1">
                                {recentSearches.map((city, index) => (
                                    <button
                                        key={`recent-${index}`}
                                        ref={el => suggestionRefs.current[index] = el}
                                        id={`suggestion-${index}`}
                                        className={`flex items-center gap-3 py-4 px-4 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 font-manrope min-h-[3rem] text-left w-full border-none
                                            ${activeIndex === index 
                                                ? 'bg-primary/15 text-gray-900 border-primary/20 scale-[1.02]' 
                                                : 'bg-primary/5 text-gray-700 hover:bg-primary/10 hover:text-gray-900 active:scale-[0.98]'
                                            }`}
                                        onClick={() => handleSuggestionClick(city, index)}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        role="option"
                                        aria-selected={activeIndex === index}
                                        tabIndex={-1}
                                    >
                                        <svg className="w-4 h-4 text-primary/70 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span className="flex-1">{city}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Popular destinations section */}
                        <div className="p-4 pt-2">
                            <h4 className="text-xs font-semibold text-gray-600 m-0 mb-3 uppercase tracking-wider">Popular Destinations</h4>
                            <div className="flex flex-col gap-1">
                                {popularCities.map((city, index) => {
                                    const suggestionIndex = recentSearches.length + index;
                                    return (
                                        <button
                                            key={`popular-${index}`}
                                            ref={el => suggestionRefs.current[suggestionIndex] = el}
                                            id={`suggestion-${suggestionIndex}`}
                                            className={`flex items-center gap-3 py-4 px-4 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 font-manrope min-h-[3rem] text-left w-full border-none
                                                ${activeIndex === suggestionIndex 
                                                    ? 'bg-accent-pink/15 text-gray-900 border-accent-pink/20 scale-[1.02]' 
                                                    : 'bg-accent-pink/5 text-gray-700 hover:bg-accent-pink/10 hover:text-gray-900 active:scale-[0.98]'
                                                }`}
                                            onClick={() => handleSuggestionClick(city, suggestionIndex)}
                                            onMouseEnter={() => setActiveIndex(suggestionIndex)}
                                            role="option"
                                            aria-selected={activeIndex === suggestionIndex}
                                            tabIndex={-1}
                                        >
                                            <svg className="w-4 h-4 text-accent-pink flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke="currentColor" strokeWidth="2"/>
                                                <polyline points="17,6 23,6 23,12" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            <span className="flex-1">{city}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    {/* Close button for mobile */}
                    <div className="sticky bottom-0 bg-gradient-to-t from-white/98 to-transparent p-4 pt-2 md:hidden">
                        <button
                            className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl font-medium text-sm transition-colors duration-200 min-h-[3rem]"
                            onClick={() => setShowSuggestions(false)}
                            type="button"
                        >
                            Close suggestions
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
