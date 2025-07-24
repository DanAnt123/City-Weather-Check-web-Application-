import React, { useState } from 'react';
import WeatherIcon from '../shared/WeatherIcon';
import './ForecastPanel.css';

// PUBLIC_INTERFACE
/**
 * Luxury forecast panel component displaying hourly and weekly weather data
 * Features smooth transitions, glass morphism design, and interactive elements
 * Note: Uses mock data for demonstration - would integrate with weather API in production
 */
const ForecastPanel = ({ currentWeather, isVisible }) => {
    const [activeTab, setActiveTab] = useState('hourly');

    // Mock hourly forecast data (in production, this would come from API)
    const generateMockHourlyData = () => {
        const baseTemp = currentWeather?.main?.temp ? Math.round(currentWeather.main.temp - 273.15) : 20;
        const hours = [];
        
        for (let i = 1; i <= 24; i++) {
            const hour = new Date();
            hour.setHours(hour.getHours() + i);
            
            hours.push({
                time: hour.toLocaleTimeString('en-US', { hour: 'numeric' }),
                temp: baseTemp + Math.floor(Math.random() * 10) - 5,
                condition: ['clear', 'clouds', 'rain'][Math.floor(Math.random() * 3)],
                precipitation: Math.floor(Math.random() * 40),
                windSpeed: Math.floor(Math.random() * 15) + 3
            });
        }
        return hours;
    };

    // Mock weekly forecast data
    const generateMockWeeklyData = () => {
        const baseTemp = currentWeather?.main?.temp ? Math.round(currentWeather.main.temp - 273.15) : 20;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const week = [];
        
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            week.push({
                day: days[date.getDay()],
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                highTemp: baseTemp + Math.floor(Math.random() * 8) - 2,
                lowTemp: baseTemp - Math.floor(Math.random() * 10) - 5,
                condition: ['clear', 'clouds', 'rain', 'thunder'][Math.floor(Math.random() * 4)],
                precipitation: Math.floor(Math.random() * 60),
                description: ['Sunny', 'Partly Cloudy', 'Light Rain', 'Thunderstorms'][Math.floor(Math.random() * 4)]
            });
        }
        return week;
    };

    const hourlyData = generateMockHourlyData();
    const weeklyData = generateMockWeeklyData();

    if (!isVisible) return null;

    return (
        <div className="forecast-panel">
            <div className="forecast-header">
                <h2 className="forecast-title">Weather Forecast</h2>
                <div className="forecast-tabs">
                    <button
                        className={`tab-button ${activeTab === 'hourly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hourly')}
                    >
                        <svg className="tab-icon" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Hourly
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('weekly')}
                    >
                        <svg className="tab-icon" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        7-Day
                    </button>
                </div>
            </div>

            <div className="forecast-content">
                {activeTab === 'hourly' && (
                    <div className="hourly-forecast">
                        <div className="forecast-scroll-container">
                            {hourlyData.slice(0, 12).map((hour, index) => (
                                <div key={index} className="hourly-item">
                                    <div className="hour-time">{hour.time}</div>
                                    <div className="hour-icon">
                                        <WeatherIcon 
                                            weatherCode={hour.condition} 
                                            size="small" 
                                            animated={false}
                                        />
                                    </div>
                                    <div className="hour-temp">{hour.temp}°</div>
                                    <div className="hour-details">
                                        <div className="precipitation">
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5C2 10.79 3.51 12.54 5 14Z" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            <span>{hour.precipitation}%</span>
                                        </div>
                                        <div className="wind">
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M9.6 4.6A2 2 0 1 1 11 8H2" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M12.6 19.4A2 2 0 1 0 14 16H2" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            <span>{hour.windSpeed}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'weekly' && (
                    <div className="weekly-forecast">
                        {weeklyData.map((day, index) => (
                            <div key={index} className="weekly-item">
                                <div className="day-info">
                                    <div className="day-name">{day.day}</div>
                                    <div className="day-date">{day.date}</div>
                                </div>
                                
                                <div className="day-weather">
                                    <WeatherIcon 
                                        weatherCode={day.condition} 
                                        size="medium" 
                                        animated={false}
                                    />
                                    <div className="weather-desc">{day.description}</div>
                                </div>
                                
                                <div className="day-temps">
                                    <div className="high-temp">{day.highTemp}°</div>
                                    <div className="temp-bar">
                                        <div className="temp-range" style={{
                                            background: `linear-gradient(90deg, #4FC3F7 0%, #FFA726 ${day.precipitation}%, #FF7043 100%)`
                                        }}></div>
                                    </div>
                                    <div className="low-temp">{day.lowTemp}°</div>
                                </div>
                                
                                <div className="day-details">
                                    <div className="detail-item">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5C2 10.79 3.51 12.54 5 14Z" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        <span>{day.precipitation}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="forecast-note">
                <svg className="info-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9,9h6v6H9V9z" fill="currentColor"/>
                    <path d="M9,7h6v1H9V7z" fill="currentColor"/>
                </svg>
                <span>Forecast data is simulated for demonstration. In production, this would use extended weather API data.</span>
            </div>
        </div>
    );
};

export default ForecastPanel;
