import React, { useState } from 'react';
// No longer need separate CSS file - using Tailwind classes

// PUBLIC_INTERFACE
/**
 * Modern luxury search bar component with glassmorphism effects
 * Features animated search icon, voice search capability, and recent searches
 */
const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Mock recent searches for luxury UX
    const recentSearches = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    const popularCities = ['Dubai', 'Singapore', 'Barcelona', 'Amsterdam'];

    const handleSearch = (searchQuery = query) => {
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setQuery('');
            setShowSuggestions(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowSuggestions(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        // Delay hiding suggestions to allow clicks
        setTimeout(() => setShowSuggestions(false), 200);
    };

    return (
        <div className="search-container">
            <div className={`relative flex items-center bg-glass-bg backdrop-blur-xl border border-glass-border rounded-[2.5rem] p-2 transition-all duration-400 shadow-glass overflow-hidden ${isFocused ? 'transform -translate-y-1 scale-[1.02] border-white/20 bg-white/12 shadow-glass-hover' : ''} ${isLoading ? 'bg-accent-blue/10 border-accent-blue/20' : ''}`}>
                {/* Animated background shine */}
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-600 ${isFocused ? 'transform translate-x-full' : '-translate-x-full'}`}></div>
                
                <div className="flex items-center justify-center w-12 h-12 mr-3 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg transition-all duration-300">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        <svg className={`w-5 h-5 text-white transition-transform duration-300 ${isFocused ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    )}
                </div>
                
                <input
                    type="text"
                    placeholder="Search for any city worldwide..."
                    className="flex-1 bg-transparent border-none outline-none text-text-primary text-lg font-normal font-manrope tracking-wide py-4 placeholder:text-text-muted placeholder:font-light"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-label="Search for weather in a city"
                />
                
                <button 
                    className="w-11 h-11 border-none rounded-full bg-white/10 text-white/70 cursor-pointer transition-all duration-300 flex items-center justify-center ml-2 hover:bg-white/15 hover:text-white/90 hover:scale-105"
                    onClick={() => {/* Voice search would be implemented here */}}
                    aria-label="Voice search"
                    title="Voice search (Coming soon)"
                >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </button>
            </div>

            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-luxury z-[1000] max-h-[400px] overflow-y-auto animate-slide-up">
                    <div className="mb-6 last:mb-0">
                        <h4 className="text-sm font-semibold text-gray-700 m-0 mb-4 uppercase tracking-wide opacity-80">Recent Searches</h4>
                        <div className="flex flex-col gap-2">
                            {recentSearches.map((city, index) => (
                                <button
                                    key={`recent-${index}`}
                                    className="flex items-center gap-3 py-3 px-4 bg-primary/5 border border-primary/10 rounded-xl text-sm font-medium text-gray-700 cursor-pointer transition-all duration-300 font-manrope hover:bg-primary/10 hover:border-primary/20 hover:translate-x-1 hover:text-gray-900"
                                    onClick={() => handleSearch(city)}
                                >
                                    <svg className="w-4 h-4 text-primary/70 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-6 last:mb-0">
                        <h4 className="text-sm font-semibold text-gray-700 m-0 mb-4 uppercase tracking-wide opacity-80">Popular Destinations</h4>
                        <div className="flex flex-col gap-2">
                            {popularCities.map((city, index) => (
                                <button
                                    key={`popular-${index}`}
                                    className="flex items-center gap-3 py-3 px-4 bg-accent-pink/5 border border-accent-pink/10 rounded-xl text-sm font-medium text-gray-700 cursor-pointer transition-all duration-300 font-manrope hover:bg-accent-pink/10 hover:border-accent-pink/20 hover:translate-x-1 hover:text-gray-900"
                                    onClick={() => handleSearch(city)}
                                >
                                    <svg className="w-4 h-4 text-accent-pink flex-shrink-0" viewBox="0 0 24 24" fill="none">
                                        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke="currentColor" strokeWidth="2"/>
                                        <polyline points="17,6 23,6 23,12" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
