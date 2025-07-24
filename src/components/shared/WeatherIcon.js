import React from 'react';
import './WeatherIcon.css';

// PUBLIC_INTERFACE
/**
 * Advanced weather icon component with animated SVGs and dynamic backgrounds
 * Provides fallback to OpenWeatherMap icons and custom luxury animations
 */
const WeatherIcon = ({ weatherCode, description, size = 'large', animated = true }) => {
    // Weather code mapping for custom SVG icons
    const getCustomIcon = () => {
        const code = weatherCode?.toLowerCase() || '';
        
        if (code.includes('clear') || code.includes('01')) {
            return (
                <svg className={`weather-svg sun ${animated ? 'animated' : ''}`} viewBox="0 0 200 200">
                    {/* Sun rays */}
                    <g className="sun-rays">
                        {[...Array(8)].map((_, i) => (
                            <line
                                key={i}
                                x1="100"
                                y1="20"
                                x2="100"
                                y2="35"
                                stroke="url(#sunGradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                transform={`rotate(${i * 45} 100 100)`}
                            />
                        ))}
                    </g>
                    {/* Sun circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="35"
                        fill="url(#sunGradient)"
                        className="sun-circle"
                    />
                    <defs>
                        <radialGradient id="sunGradient" cx="0.3" cy="0.3">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#FFA500" />
                        </radialGradient>
                    </defs>
                </svg>
            );
        }
        
        if (code.includes('cloud') || code.includes('02') || code.includes('03') || code.includes('04')) {
            return (
                <svg className={`weather-svg clouds ${animated ? 'animated' : ''}`} viewBox="0 0 200 200">
                    {/* Background sun (partly cloudy) */}
                    {(code.includes('02') || code.includes('few')) && (
                        <circle
                            cx="130"
                            cy="70"
                            r="25"
                            fill="url(#partlySunGradient)"
                            className="hidden-sun"
                        />
                    )}
                    {/* Cloud shapes */}
                    <g className="cloud-group">
                        <ellipse cx="100" cy="120" rx="40" ry="25" fill="url(#cloudGradient)" />
                        <ellipse cx="80" cy="105" rx="30" ry="20" fill="url(#cloudGradient)" />
                        <ellipse cx="120" cy="105" rx="35" ry="22" fill="url(#cloudGradient)" />
                        <ellipse cx="90" cy="95" rx="25" ry="18" fill="url(#cloudGradient)" />
                        <ellipse cx="110" cy="95" rx="28" ry="20" fill="url(#cloudGradient)" />
                    </g>
                    <defs>
                        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="100%" stopColor="#E0E0E0" />
                        </linearGradient>
                        <radialGradient id="partlySunGradient">
                            <stop offset="0%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#FFA500" />
                        </radialGradient>
                    </defs>
                </svg>
            );
        }
        
        if (code.includes('rain') || code.includes('09') || code.includes('10')) {
            return (
                <svg className={`weather-svg rain ${animated ? 'animated' : ''}`} viewBox="0 0 200 200">
                    {/* Rain cloud */}
                    <g className="rain-cloud">
                        <ellipse cx="100" cy="100" rx="45" ry="28" fill="url(#rainCloudGradient)" />
                        <ellipse cx="75" cy="85" rx="32" ry="22" fill="url(#rainCloudGradient)" />
                        <ellipse cx="125" cy="85" rx="38" ry="25" fill="url(#rainCloudGradient)" />
                    </g>
                    {/* Rain drops */}
                    <g className="rain-drops">
                        {[...Array(6)].map((_, i) => (
                            <ellipse
                                key={i}
                                cx={70 + i * 12}
                                cy={140 + (i % 2) * 10}
                                rx="2"
                                ry="8"
                                fill="url(#rainGradient)"
                                className="rain-drop"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </g>
                    <defs>
                        <linearGradient id="rainCloudGradient">
                            <stop offset="0%" stopColor="#8E8E93" />
                            <stop offset="100%" stopColor="#636366" />
                        </linearGradient>
                        <linearGradient id="rainGradient">
                            <stop offset="0%" stopColor="#4A90E2" />
                            <stop offset="100%" stopColor="#357ABD" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        }
        
        if (code.includes('thunder') || code.includes('11')) {
            return (
                <svg className={`weather-svg thunder ${animated ? 'animated' : ''}`} viewBox="0 0 200 200">
                    {/* Storm cloud */}
                    <g className="storm-cloud">
                        <ellipse cx="100" cy="90" rx="50" ry="32" fill="url(#stormCloudGradient)" />
                        <ellipse cx="70" cy="75" rx="35" ry="25" fill="url(#stormCloudGradient)" />
                        <ellipse cx="130" cy="75" rx="40" ry="28" fill="url(#stormCloudGradient)" />
                    </g>
                    {/* Lightning bolt */}
                    <path
                        d="M95 125 L105 145 L98 145 L108 165 L95 150 L102 150 Z"
                        fill="url(#lightningGradient)"
                        className="lightning-bolt"
                    />
                    <defs>
                        <linearGradient id="stormCloudGradient">
                            <stop offset="0%" stopColor="#4A4A4A" />
                            <stop offset="100%" stopColor="#2C2C2E" />
                        </linearGradient>
                        <linearGradient id="lightningGradient">
                            <stop offset="0%" stopColor="#FFFF00" />
                            <stop offset="100%" stopColor="#FFD700" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        }
        
        if (code.includes('snow') || code.includes('13')) {
            return (
                <svg className={`weather-svg snow ${animated ? 'animated' : ''}`} viewBox="0 0 200 200">
                    {/* Snow cloud */}
                    <g className="snow-cloud">
                        <ellipse cx="100" cy="100" rx="45" ry="28" fill="url(#snowCloudGradient)" />
                        <ellipse cx="75" cy="85" rx="32" ry="22" fill="url(#snowCloudGradient)" />
                        <ellipse cx="125" cy="85" rx="38" ry="25" fill="url(#snowCloudGradient)" />
                    </g>
                    {/* Snowflakes */}
                    <g className="snowflakes">
                        {[...Array(8)].map((_, i) => (
                            <g key={i} className="snowflake" transform={`translate(${60 + i * 15}, ${130 + (i % 3) * 15})`}>
                                <circle r="3" fill="#FFFFFF" opacity="0.9" />
                                <g className="snowflake-arms">
                                    {[...Array(6)].map((_, j) => (
                                        <line
                                            key={j}
                                            x1="0"
                                            y1="-6"
                                            x2="0"
                                            y2="6"
                                            stroke="#FFFFFF"
                                            strokeWidth="1"
                                            opacity="0.8"
                                            transform={`rotate(${j * 60})`}
                                        />
                                    ))}
                                </g>
                            </g>
                        ))}
                    </g>
                    <defs>
                        <linearGradient id="snowCloudGradient">
                            <stop offset="0%" stopColor="#E8E8E8" />
                            <stop offset="100%" stopColor="#B8B8B8" />
                        </linearGradient>
                    </defs>
                </svg>
            );
        }
        
        // Default fallback icon
        return (
            <svg className={`weather-svg default ${animated ? 'animated' : ''}`} viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="40" fill="url(#defaultGradient)" />
                <defs>
                    <radialGradient id="defaultGradient">
                        <stop offset="0%" stopColor="#4FC3F7" />
                        <stop offset="100%" stopColor="#29B6F6" />
                    </radialGradient>
                </defs>
            </svg>
        );
    };

    return (
        <div className={`weather-icon-container ${size} ${animated ? 'animated' : ''}`}>
            <div className="icon-wrapper">
                {getCustomIcon()}
                <div className="icon-glow"></div>
            </div>
            {description && (
                <div className="weather-description-overlay">
                    {description}
                </div>
            )}
        </div>
    );
};

export default WeatherIcon;
