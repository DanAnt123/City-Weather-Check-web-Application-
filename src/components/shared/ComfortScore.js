import React, { useState, useEffect } from 'react';

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
        <div className="flex justify-center my-8 animate-fade-in" style={{ animationDelay: '1.4s', animationFillMode: 'both' }}>
            {showTooltip && <div className="tooltip-overlay md:hidden" onClick={() => setShowTooltip(false)}></div>}
            <div 
                className="comfort-score-card cursor-pointer transition-all duration-400 outline-none focus:outline-2 focus:outline-green-500 focus:outline-offset-4"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                tabIndex="0"
                role="button"
                aria-label={`Comfort score: ${score} out of 10. Press to see details.`}
            >
                <div className="flex flex-col items-center gap-6 p-8">
                <div className="relative flex items-center justify-center comfort-score-ring">
                    <svg className="transform -rotate-90" width="120" height="120" viewBox="0 0 100 100">
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
                            className={`transition-all duration-[1500ms] cubic-bezier-[0.4,0,0.2,1] ${isAnimating ? 'animate-pulse-soft' : ''}`}
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
                            className="transition-all duration-[1500ms] cubic-bezier-[0.4,0,0.2,1] opacity-50 blur-sm animate-pulse"
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                        <div className="text-4xl font-extrabold text-text-primary leading-none text-shadow-sm bg-gradient-to-r from-white to-blue-50 bg-clip-text text-transparent">
                            {Math.round(animatedScore * 10) / 10}
                        </div>
                        <div className="text-base font-medium text-text-secondary -mt-1">/10</div>
                        <div className="text-2xl mt-1 animate-bounce-soft">
                            {getScoreEmoji(score)}
                        </div>
                    </div>
                </div>
                
                <div className="comfort-score-content max-w-60">
                    <h3 className="comfort-score-title">
                        Can I Go Outside?
                    </h3>
                    <p className="comfort-score-description">
                        {getScoreDescription(score)}
                    </p>
                </div>
                </div>

                {showTooltip && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-full w-[420px] max-w-[90vw] bg-white/98 backdrop-blur-xl border border-white/30 rounded-3xl shadow-luxury z-[1000] overflow-hidden animate-slide-up" role="tooltip">
                        <div className="flex items-center justify-between p-6 pb-0">
                            <h4 className="text-lg font-bold text-gray-900 m-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                How is this score computed?
                            </h4>
                            <button 
                                className="tooltip-close-enhanced"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTooltip(false);
                                }}
                                aria-label="Close tooltip"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            </button>
                        </div>
                        
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-[14px] border-transparent border-t-white/98" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))' }}></div>
                        
                        <div className="p-4 pt-4 pb-6 text-gray-700">
                            <div className="text-sm leading-relaxed mb-6 whitespace-pre-line text-gray-600">
                                {tooltipContent}
                            </div>
                            
                            <div>
                                <h5 className="text-base font-semibold text-gray-700 m-0 mb-4 pb-2 border-b-2 border-primary/10">
                                    Current Conditions
                                </h5>
                                <div className="grid gap-4">
                                    {factors && Object.entries(factors).map(([key, value]) => {
                                        const factorScore = getFactorScore(key, value);
                                        return (
                                            <div key={key} className="p-4 bg-primary/5 border border-primary/10 rounded-xl transition-all duration-300 hover:bg-primary/8 hover:border-primary/15 hover:-translate-y-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-gray-700 text-sm">{key}</span>
                                                    <div className="flex gap-1">
                                                        {[1, 2].map(dot => (
                                                            <div 
                                                                key={dot}
                                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${dot <= factorScore ? 'shadow-sm' : ''}`}
                                                                style={{
                                                                    backgroundColor: dot <= factorScore ? getScoreColor(factorScore * 5) : 'rgba(255,255,255,0.2)',
                                                                    boxShadow: dot <= factorScore ? `0 0 8px ${getScoreColor(factorScore * 5)}50` : 'none'
                                                                }}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-lg font-bold text-primary mb-1">{value}</div>
                                                <div className="text-xs font-medium opacity-80">
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
