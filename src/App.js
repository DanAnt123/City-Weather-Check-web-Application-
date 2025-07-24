import React, { useState, useEffect, useRef } from 'react';
import { fetchWeather } from './api/fetchWeather';
import { computeComfortScore } from './utils/comfortScore';
import SearchBar from './components/shared/SearchBar';
import WeatherIcon from './components/shared/WeatherIcon';
import ComfortScore from './components/shared/ComfortScore';
import ForecastPanel from './components/forecast/ForecastPanel';
import './tailwind.css';

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

const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

const App = () => {
    const [weather, setWeather] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [showForecast, setShowForecast] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Ref for interval id to allow cleanup
    const intervalId = useRef(null);

    // PUBLIC_INTERFACE
    // Search function to fetch weather data for query
    const handleSearch = async (query) => {
        if (!query.trim()) return;
        
        setIsSearching(true);
        setIsRefreshing(true);
        
        try {
            const data = await fetchWeather(query);
            setWeather(data);
            setLastUpdated(new Date());
            setShowForecast(true);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // In production, you would show an error notification here
        } finally {
            setIsRefreshing(false);
            setIsSearching(false);
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
            console.error('Error refreshing weather data:', err);
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

    // Dynamic background based on weather condition
    const getWeatherClass = () => {
        if (!weather || !weather.weather) return '';
        const condition = weather.weather[0].main.toLowerCase();
        
        if (condition.includes('clear')) return 'sunny-bg';
        if (condition.includes('cloud')) return 'cloudy-bg';
        if (condition.includes('rain')) return 'rainy-bg';
        if (condition.includes('thunder')) return 'stormy-bg';
        if (condition.includes('snow')) return 'snowy-bg';
        return '';
    };

    return (
        <div className={`main-container ${getWeatherClass()}`}>
            {/* Luxury Search Bar */}
            <SearchBar onSearch={handleSearch} isLoading={isSearching || isRefreshing} />
            
            {weather.main && (
                <>
                    {/* Main Weather Card */}
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
                        
                        {/* Enhanced refresh status */}
                        <div className="refresh-status">
                            <div className="refresh-indicator">
                                {isRefreshing ? (
                                    <>
                                        <div className="spinner"></div>
                                        <span>Updating weather data...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="auto-refresh-icon" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M8 16H3v5" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span>Auto-refresh: Active</span>
                                        <div className="status-indicator"></div>
                                    </>
                                )}
                            </div>
                            <div className="last-updated">
                                Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Now'}
                            </div>
                        </div>
                        
                        <div className="weather-info">
                            {/* Luxury Weather Icon */}
                            <WeatherIcon 
                                weatherCode={weather.weather[0].main}
                                description={weather.weather[0].description}
                                size="large"
                                animated={true}
                            />
                            
                            <p className="weather-description">
                                {weather.weather[0].description}
                            </p>

                            {/* Additional Weather Details */}
                            <div className="weather-details-grid">
                                <div className="detail-card">
                                    <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M14 4.5V9a3 3 0 0 0 3 3h4.5" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L12 2z" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <div className="detail-content">
                                        <span className="detail-label">Feels Like</span>
                                        <span className="detail-value">
                                            {Math.round((weather.main.feels_like) - 273.15)}°C
                                        </span>
                                    </div>
                                </div>

                                <div className="detail-card">
                                    <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <div className="detail-content">
                                        <span className="detail-label">Wind</span>
                                        <span className="detail-value">
                                            {weather.wind?.speed || 0} m/s
                                        </span>
                                    </div>
                                </div>

                                <div className="detail-card">
                                    <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5C2 10.79 3.51 12.54 5 14Z" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <div className="detail-content">
                                        <span className="detail-label">Humidity</span>
                                        <span className="detail-value">
                                            {weather.main.humidity}%
                                        </span>
                                    </div>
                                </div>

                                <div className="detail-card">
                                    <svg className="detail-icon" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 2v2" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M12 20v2" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M4.93 4.93l1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M17.66 17.66l1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M2 12h2" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M20 12h2" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M6.34 17.66l-1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                        <path d="M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                    <div className="detail-content">
                                        <span className="detail-label">Pressure</span>
                                        <span className="detail-value">
                                            {weather.main.pressure} hPa
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Luxury Comfort Score */}
                    {canGoScore !== null && (
                        <ComfortScore 
                            score={canGoScore}
                            factors={scoreFactors}
                            isVisible={!!weather.main}
                        />
                    )}

                    {/* Forecast Panel */}
                    <ForecastPanel 
                        currentWeather={weather}
                        isVisible={showForecast}
                    />
                </>
            )}

            {/* Welcome message when no weather selected */}
            {!weather.main && !isSearching && (
                <div className="welcome-message">
                    <div className="welcome-content">
                        <div className="welcome-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 2v2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 20v2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M4.93 4.93l1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                <path d="M17.66 17.66l1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                <path d="M2 12h2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M20 12h2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M6.34 17.66l-1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                                <path d="M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <h2>Welcome to Luxury Weather</h2>
                        <p>Discover premium weather insights with our flagship experience</p>
                        <div className="welcome-features">
                            <div className="feature-item">
                                <span className="feature-icon">🌤️</span>
                                <span>Real-time Weather Data</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📊</span>
                                <span>Comfort Score Analysis</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">📱</span>
                                <span>Mobile-First Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
