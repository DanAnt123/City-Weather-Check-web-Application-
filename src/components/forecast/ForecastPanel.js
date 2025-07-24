import React, { useState } from 'react';
import WeatherIcon from '../shared/WeatherIcon';

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
        <div className="forecast-panel animate-slide-up">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary m-0 bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text text-transparent">
                    Weather Forecast
                </h2>
                <div className="forecast-tabs">
                    <button
                        className={`forecast-tab ${
                            activeTab === 'hourly' 
                                ? 'forecast-tab-active' 
                                : 'forecast-tab-inactive'
                        }`}
                        onClick={() => setActiveTab('hourly')}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Hourly
                    </button>
                    <button
                        className={`forecast-tab ${
                            activeTab === 'weekly' 
                                ? 'forecast-tab-active' 
                                : 'forecast-tab-inactive'
                        }`}
                        onClick={() => setActiveTab('weekly')}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        7-Day
                    </button>
                </div>
            </div>

            <div className="min-h-[300px]">
                {activeTab === 'hourly' && (
                    <div className="overflow-hidden">
                        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <style jsx>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
                            {hourlyData.slice(0, 12).map((hour, index) => (
                                <div key={index} className="min-w-[120px] flex flex-col items-center gap-4 forecast-item">
                                    <div className="text-sm font-semibold text-text-secondary">{hour.time}</div>
                                    <div className="w-12 h-12">
                                        <WeatherIcon 
                                            weatherCode={hour.condition} 
                                            size="small" 
                                            animated={false}
                                        />
                                    </div>
                                    <div className="text-xl font-bold text-text-primary">{hour.temp}°</div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                                            <svg className="w-3 h-3 text-accent-blue/80" viewBox="0 0 24 24" fill="none">
                                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5C2 10.79 3.51 12.54 5 14Z" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            <span>{hour.precipitation}%</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                                            <svg className="w-3 h-3 text-accent-blue/80" viewBox="0 0 24 24" fill="none">
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
                    <div className="flex flex-col gap-4">
                        {weeklyData.map((day, index) => (
                            <div key={index} className="forecast-item-weekly">
                                <div className="flex flex-col gap-1">
                                    <div className="text-base font-semibold text-text-primary">{day.day}</div>
                                    <div className="text-sm text-text-muted">{day.date}</div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-15 h-15">
                                        <WeatherIcon 
                                            weatherCode={day.condition} 
                                            size="medium" 
                                            animated={false}
                                        />
                                    </div>
                                    <div className="text-sm font-medium text-text-secondary">{day.description}</div>
                                </div>
                                
                                <div className="flex items-center gap-4 min-w-[140px]">
                                    <div className="text-lg font-bold text-text-primary min-w-[40px] text-right">{day.highTemp}°</div>
                                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden min-w-[60px]">
                                        <div 
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, #4FC3F7 0%, #FFA726 ${day.precipitation}%, #FF7043 100%)`,
                                                width: '100%'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-base font-medium text-text-muted min-w-[40px]">{day.lowTemp}°</div>
                                </div>
                                
                                <div className="flex justify-center">
                                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                                        <svg className="w-4 h-4 text-accent-blue/80" viewBox="0 0 24 24" fill="none">
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

            <div className="flex items-start gap-3 mt-8 p-5 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl text-sm text-text-secondary leading-relaxed">
                <svg className="w-[18px] h-[18px] text-yellow-400/80 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none">
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
