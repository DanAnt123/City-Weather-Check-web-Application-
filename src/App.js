import React, { useState, useEffect, useRef } from 'react';
import { fetchWeather } from './api/fetchWeather';
import { computeComfortScore } from './utils/comfortScore';
import './App.css';

/**
 * Returns a guessed UV index based on cloudiness and weather condition (fallback for demo)
 * OpenWeatherMap free API does not directly return UV index; normally another endpoint is used.
 * Here, we'll provide an estimated value for demo purposes.
 */
function estimateUVIndex(weather) {
    if (!weather || !weather.weather) return 5;
    // Lower UV if clouds/rain, higher UV for clear
    const code = weather.weather[0].main.toLowerCase();
    if (code.includes("cloud")) return 3;
    if (code.includes("rain") || code.includes("drizzle")) return 2;
    if (code.includes("thunder")) return 1;
    return 7; // likely sunny
}

/**
 * Returns a guessed AQI (air quality index) as a placeholder.
 * Normally, AQI requires a separate API.
 * We'll return a "typical" value based on city and weather for demo.
 */
function estimateAQI(weather) {
    if (!weather) return 75; // moderate
    // Stereotyped: big cities higher, clean weather lower
    if (weather.name && ['Delhi', 'Beijing', 'Shanghai', 'Los Angeles', 'Mexico City'].includes(weather.name)) {
        return 120;
    }
    if (weather.weather && weather.weather[0].main.toLowerCase().includes('rain')) {
        return 40; // rain clears air pollution
    }
    return 55;
}

const tooltipText = `The "Can I Go Outside?" score is calculated from:
- Temperature (ideal 18–25°C)
- Wind (ideal < 6 m/s)
- Humidity (ideal 30–60%)
- Air Quality Index (AQI, ideal ≤ 50)
- UV Index (ideal ≤ 3)
Score 10 = most comfortable, 1 = least comfortable.`;

const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Ref for interval id to allow cleanup
    const intervalId = useRef(null);

    // PUBLIC_INTERFACE
    // Search function to fetch weather data for query
    const search = async (e) => {
        if (e.key === 'Enter') {
            setIsRefreshing(true);
            const data = await fetchWeather(query);
            setWeather(data);
            setQuery('');
            setLastUpdated(new Date());
            setIsRefreshing(false);
        }
    };

    // PUBLIC_INTERFACE
    // Function to refresh weather for currently selected city (for auto-refresh)
    const refreshWeather = async () => {
        if (!weather || !weather.name) return;
        setIsRefreshing(true);
        try {
            const data = await fetchWeather(weather.name);
            setWeather(data);
            setLastUpdated(new Date());
        } catch (err) {
            // Optionally add error handling/notification
        }
        setIsRefreshing(false);
    };

    // Set up auto-refresh every 5 minutes when weather (city) is selected
    useEffect(() => {
        if (weather && weather.name) {
            // Immediately clear any existing interval if city changes
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
            // Set up interval for auto-refresh
            intervalId.current = setInterval(() => {
                refreshWeather();
            }, AUTO_REFRESH_INTERVAL);

            // Cleanup on city change or unmount
            return () => {
                if (intervalId.current) {
                    clearInterval(intervalId.current);
                }
            };
        } else {
            // If weather/city not selected, make sure to clear interval
            if (intervalId.current) clearInterval(intervalId.current);
        }
    // Should reset/ref whenever city changes
    }, [weather && weather.name]);

    // Estimate additional data for comfort score using available fields
    let canGoScore = null, scoreFactors;
    if (weather && weather.main) {
        const tempC = Math.round((weather.main.temp) - 273.15);
        const wind = weather.wind ? weather.wind.speed : 3;
        const humidity = weather.main.humidity ?? 50;
        const airQuality = estimateAQI(weather); 
        const uvIndex = estimateUVIndex(weather);

        canGoScore = computeComfortScore({
            temperature: tempC,
            wind,
            humidity,
            airQuality,
            uvIndex
        });

        scoreFactors = {
            Temperature: tempC + "°C",
            "Wind Speed": wind + " m/s",
            Humidity: humidity + "%",
            "Air Quality Index": airQuality,
            "UV Index": uvIndex
        };
    }

    return (
        <div className="main-container">
            <div className="search-container">
                <div className="search-icon">🔍</div>
                <input
                    type="text"
                    placeholder="Search for a city..."
                    className="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={search}
                    aria-label="Search for weather in a city"
                />
            </div>
            
            {weather.main && (
                <div className="weather-card">
                    <div className="city-header">
                        <h1 className="city-name">
                            <span>{weather.name}</span>
                            <span className="country-badge">{weather.sys.country}</span>
                        </h1>
                    </div>
                    
                    <div className="temperature-section">
                        <div className="city-temp">
                            {Math.round((weather.main.temp) - 273.15)}
                            <span className="temp-unit">°C</span>
                        </div>
                    </div>
                    
                    <div className="refresh-status">
                        <div className="refresh-indicator">
                            {isRefreshing ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Refreshing...</span>
                                </>
                            ) : (
                                <>
                                    <span>🔄</span>
                                    <span>Auto-refresh: ON</span>
                                    <span>⏰</span>
                                </>
                            )}
                        </div>
                        <div className="last-updated">
                            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Now'}
                        </div>
                    </div>
                    
                    <div className="weather-info">
                        <img 
                            className="city-icon" 
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                            alt={weather.weather[0].description}
                        />
                        <p className="weather-description">{weather.weather[0].description}</p>
                        
                        {canGoScore !== null && (
                            <div className="comfort-score-container">
                                <div
                                    className="comfort-score"
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    onFocus={() => setShowTooltip(true)}
                                    onBlur={() => setShowTooltip(false)}
                                    tabIndex="0"
                                    role="button"
                                    aria-label={`Comfort score: ${canGoScore} out of 10. Press to see details.`}
                                >
                                    Can I Go Outside? Score: {canGoScore}/10
                                    <span className="score-emoji">☀️</span>
                                    
                                    {showTooltip && (
                                        <div className="tooltip" role="tooltip">
                                            <div className="tooltip-title">How is this score computed?</div>
                                            <div className="tooltip-content">{tooltipText}</div>
                                            <div className="tooltip-factors">
                                                <h4>Current factors:</h4>
                                                <ul className="factors-list">
                                                    {Object.entries(scoreFactors).map(([key, value]) => (
                                                        <li key={key}>
                                                            <span>{key}:</span>
                                                            <span className="factor-value">{value}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
