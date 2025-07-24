import React, { useState } from 'react';
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
Score 10 = most comfortable, 1 = least comfortable.
`;

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');
    // UI state for tooltip display
    const [showTooltip, setShowTooltip] = useState(false);

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);
            setWeather(data);
            setQuery('');
        }
    };

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
            Humidity: humidity + " %",
            "Air Quality Index": airQuality,
            "UV Index": uvIndex
        };
    }

    return (
        <div className="main-container">
            <input
                type="text"
                placeholder="Search City ..."
                className="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round((weather.main.temp) - 273.15)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                        {canGoScore !== null && (
                            <div style={{ marginTop: 18 }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        fontWeight: 600,
                                        fontSize: '1.2em',
                                        background: '#ffdfa3',
                                        color: '#5a420c',
                                        borderRadius: '16px',
                                        padding: '6px 15px',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                    title="Click for explanation"
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    tabIndex="0"
                                >
                                    Can I Go Outside? Score: {canGoScore}/10
                                    <span style={{
                                        marginLeft: 7,
                                        fontSize: "1.1em",
                                        verticalAlign: 'middle'
                                    }}
                                    >☀️</span>
                                    {showTooltip && (
                                        <div style={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "120%",
                                            transform: "translateX(-50%)",
                                            zIndex: 2,
                                            background: "#fffbe9",
                                            color: "#1e2432",
                                            border: "1px solid #d1b369",
                                            borderRadius: 8,
                                            padding: "15px",
                                            maxWidth: 320,
                                            fontSize: "0.97em",
                                            boxShadow: "0 2px 8px rgba(22,22,22,0.12)"
                                        }}>
                                            <strong>How is this score computed?</strong>
                                            <p style={{ marginTop: 7, marginBottom: 7, whiteSpace: "pre-line" }}>{tooltipText}</p>
                                            <div>
                                                <strong>Current factors:</strong>
                                                <ul style={{ paddingLeft: 18, marginTop: 5 }}>
                                                {Object.entries(scoreFactors).map(([k, v]) =>
                                                    <li key={k}>{k}: <b>{v}</b></li>
                                                )}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
