import React, { useState, useEffect } from 'react';
import './ComfortScore.css';

// PUBLIC_INTERFACE
/**
 * Advanced comfort score component with animated progress ring and detailed tooltips
 * Features dynamic scoring visualization and comprehensive factor breakdown
 */
const ComfortScore = ({ score, factors, isVisible }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Animate score on change
    useEffect(() => {
        if (score && isVisible) {
            setIsAnimating(true);
            const duration = 1500;
            const startTime = Date.now();
            const startScore = animatedScore;
            const targetScore = score;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                
                const currentScore = startScore + (targetScore - startScore) * easeOutCubic;
                setAnimatedScore(currentScore);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsAnimating(false);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [score, isVisible]);

    const getScoreColor = (score) => {
        if (score >= 8) return '#4CAF50'; // Green
        if (score >= 6) return '#FFC107'; // Yellow
        if (score >= 4) return '#FF9800'; // Orange
        return '#F44336'; // Red
    };

    const getScoreEmoji = (score) => {
        if (score >= 9) return '🌟';
        if (score >= 7) return '😊';
        if (score >= 5) return '😐';
        if (score >= 3) return '😕';
        return '😟';
    };

    const getScoreDescription = (score) => {
        if (score >= 9) return 'Perfect conditions!';
        if (score >= 7) return 'Great for outdoor activities';
        if (score >= 5) return 'Decent weather conditions';
        if (score >= 3) return 'Consider indoor activities';
        return 'Better stay inside';
    };

    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (animatedScore / 10) * circumference;

    const tooltipContent = `The "Can I Go Outside?" score is calculated from multiple weather factors:

• Temperature: Ideal range 18-25°C (65-77°F)
• Wind Speed: Best when under 6 m/s (13 mph)
• Humidity: Comfortable between 30-60%
• Air Quality: Healthiest when AQI ≤ 50
• UV Index: Safest when ≤ 3

Each factor contributes up to 2 points, creating a total score from 1-10 where 10 represents perfect outdoor conditions.`;

    if (!isVisible || !score) return null;

    return (
        <div className="luxury-comfort-score">
            <div 
                className="score-container"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                tabIndex="0"
                role="button"
                aria-label={`Comfort score: ${score} out of 10. Press to see details.`}
            >
                <div className="score-ring-container">
                    <svg className="score-ring" width="120" height="120" viewBox="0 0 100 100">
                        {/* Background ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="6"
                        />
                        {/* Progress ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={getScoreColor(score)}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className={`progress-ring ${isAnimating ? 'animating' : ''}`}
                            transform="rotate(-90 50 50)"
                        />
                        {/* Glow effect */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={getScoreColor(score)}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="progress-glow"
                            transform="rotate(-90 50 50)"
                            opacity="0.5"
                        />
                    </svg>
                    
                    <div className="score-content">
                        <div className="score-value">
                            {Math.round(animatedScore * 10) / 10}
                        </div>
                        <div className="score-max">/10</div>
                        <div className="score-emoji">
                            {getScoreEmoji(score)}
                        </div>
                    </div>
                </div>
                
                <div className="score-label">
                    <h3>Can I Go Outside?</h3>
                    <p className="score-description">
                        {getScoreDescription(score)}
                    </p>
                </div>

                {showTooltip && (
                    <div className="luxury-tooltip" role="tooltip">
                        <div className="tooltip-header">
                            <h4>How is this score computed?</h4>
                            <button 
                                className="tooltip-close"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTooltip(false);
                                }}
                                aria-label="Close tooltip"
                            >
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="tooltip-body">
                            <div className="tooltip-explanation">
                                {tooltipContent}
                            </div>
                            
                            <div className="factors-breakdown">
                                <h5>Current Conditions</h5>
                                <div className="factors-grid">
                                    {factors && Object.entries(factors).map(([key, value]) => {
                                        const factorScore = getFactorScore(key, value);
                                        return (
                                            <div key={key} className="factor-item">
                                                <div className="factor-header">
                                                    <span className="factor-name">{key}</span>
                                                    <div className="factor-score-dots">
                                                        {[1, 2].map(dot => (
                                                            <div 
                                                                key={dot}
                                                                className={`score-dot ${dot <= factorScore ? 'active' : ''}`}
                                                                style={{
                                                                    backgroundColor: dot <= factorScore ? getScoreColor(factorScore * 5) : 'rgba(255,255,255,0.2)'
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="factor-value">{value}</div>
                                                <div className="factor-status">
                                                    {getFactorStatus(key, value)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function to get factor score (0-2 points)
const getFactorScore = (factorName, value) => {
    const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
    
    switch (factorName.toLowerCase()) {
        case 'temperature':
            if (numValue >= 18 && numValue <= 25) return 2;
            if (numValue >= 14 && numValue <= 28) return 1;
            return 0;
        case 'wind speed':
            if (numValue <= 3) return 2;
            if (numValue <= 6) return 1;
            return 0;
        case 'humidity':
            if (numValue >= 30 && numValue <= 60) return 2;
            if ((numValue >= 20 && numValue < 30) || (numValue > 60 && numValue <= 75)) return 1;
            return 0;
        case 'air quality index':
            if (numValue <= 50) return 2;
            if (numValue <= 100) return 1;
            return 0;
        case 'uv index':
            if (numValue <= 3) return 2;
            if (numValue <= 7) return 1;
            return 0;
        default:
            return 1;
    }
};

// Helper function to get factor status description
const getFactorStatus = (factorName, value) => {
    const score = getFactorScore(factorName, value);
    if (score === 2) return 'Excellent';
    if (score === 1) return 'Good';
    return 'Poor';
};

export default ComfortScore;
