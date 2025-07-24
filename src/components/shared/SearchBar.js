import React, { useState } from 'react';
import './SearchBar.css';

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
        <div className="luxury-search-container">
            <div className={`search-wrapper ${isFocused ? 'focused' : ''} ${isLoading ? 'loading' : ''}`}>
                <div className="search-icon-container">
                    {isLoading ? (
                        <div className="search-spinner"></div>
                    ) : (
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    )}
                </div>
                
                <input
                    type="text"
                    placeholder="Search for any city worldwide..."
                    className="luxury-search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-label="Search for weather in a city"
                />
                
                <button 
                    className="voice-search-btn"
                    onClick={() => {/* Voice search would be implemented here */}}
                    aria-label="Voice search"
                    title="Voice search (Coming soon)"
                >
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </button>
            </div>

            {showSuggestions && (
                <div className="search-suggestions">
                    <div className="suggestions-section">
                        <h4>Recent Searches</h4>
                        <div className="suggestions-list">
                            {recentSearches.map((city, index) => (
                                <button
                                    key={`recent-${index}`}
                                    className="suggestion-item"
                                    onClick={() => handleSearch(city)}
                                >
                                    <svg className="history-icon" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                        <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="suggestions-section">
                        <h4>Popular Destinations</h4>
                        <div className="suggestions-list">
                            {popularCities.map((city, index) => (
                                <button
                                    key={`popular-${index}`}
                                    className="suggestion-item popular"
                                    onClick={() => handleSearch(city)}
                                >
                                    <svg className="trending-icon" viewBox="0 0 24 24" fill="none">
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
