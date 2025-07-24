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
        <div className="flex justify-center my-8 animate-fade-in [animation-delay:1.4s] [animation-fill-mode:both]">
            {showTooltip && <div className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm" onClick={() => setShowTooltip(false)} onTouchStart={() => setShowTooltip(false)}></div>}
            <div 
                className="comfort-score-card cursor-pointer transition-all duration-400 outline-none focus:outline-2 focus:outline-accent-blue-500 focus:outline-offset-4 focus:ring-2 focus:ring-accent-blue-500/30"
                onMouseEnter={() => !('ontouchstart' in window) && setShowTooltip(true)}
                onMouseLeave={() => !('ontouchstart' in window) && setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={(e) => {
                    // Don't hide tooltip if focus moves to tooltip content
                    if (!e.relatedTarget?.closest('[role="tooltip"]')) {
                        setShowTooltip(false);
                    }
                }}
                onClick={() => setShowTooltip(!showTooltip)}
                onTouchStart={() => setShowTooltip(!showTooltip)}
                tabIndex="0"
                role="button"
                aria-label={`Comfort score: ${score} out of 10. Press to see details.`}
                aria-describedby={showTooltip ? "comfort-tooltip" : undefined}
                aria-expanded={showTooltip}
            >
                <div className="flex flex-col items-center gap-8 p-8 lg:p-10">
                <div className="relative flex items-center justify-center comfort-score-ring">
                    <svg className="transform -rotate-90" width="120" height="120" viewBox="0 0 100 100">
                        {/* Background ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="fill-none stroke-white/10 stroke-[6]"
                        />
                        {/* Progress ring */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className={`fill-none stroke-[6] stroke-round transition-all duration-[1500ms] ease-smooth ${isAnimating ? 'animate-pulse-soft' : ''}`}
                            style={{ 
                                stroke: getScoreColor(score),
                                strokeDasharray: circumference,
                                strokeDashoffset: strokeDashoffset,
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%'
                            }}
                        />
                        {/* Glow effect */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="fill-none stroke-[2] stroke-round transition-all duration-[1500ms] ease-smooth opacity-50 blur-sm animate-pulse"
                            style={{ 
                                stroke: getScoreColor(score),
                                strokeDasharray: circumference,
                                strokeDashoffset: strokeDashoffset,
                                transform: 'rotate(-90deg)',
                                transformOrigin: '50% 50%'
                            }}
                        />
                    </svg>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                        <div className="text-4xl lg:text-5xl font-extrabold text-text-primary leading-none">
                            <span className="bg-gradient-to-r from-white via-primary-50 to-primary-100 bg-clip-text text-transparent">
                                {Math.round(animatedScore * 10) / 10}
                            </span>
                        </div>
                        <div className="text-base font-medium text-text-tertiary -mt-1">/10</div>
                        <div className="text-2xl mt-2 animate-bounce-soft">
                            {getScoreEmoji(score)}
                        </div>
                    </div>
                </div>
                
                <div className="comfort-score-content max-w-72 text-center">
                    <h3 className="comfort-score-title">
                        Can I Go Outside?
                    </h3>
                    <p className="body-base text-text-secondary leading-relaxed">
                        {getScoreDescription(score)}
                    </p>
                </div>
                </div>

                {showTooltip && (
                    <div 
                        id="comfort-tooltip"
                        className="fixed md:absolute -top-4 left-1/2 transform -translate-x-1/2 md:-translate-y-full 
                                   w-[min(420px,95vw)] md:w-[420px] max-w-[95vw] 
                                   bg-white/98 backdrop-blur-xl border border-white/30 
                                   rounded-3xl shadow-luxury z-[1000] overflow-hidden animate-slide-up
                                   md:max-h-[80vh] max-h-[90vh] overflow-y-auto
                                   inset-x-4 md:inset-x-auto top-4 md:top-auto"
                        role="tooltip"
                        aria-live="polite"
                    >
                        {/* Mobile-first header with better spacing */}
                        <div className="flex items-center justify-between p-4 md:p-6 pb-3 md:pb-0 sticky top-0 bg-white/98 backdrop-blur-xl border-b border-gray-200/20 md:border-none md:bg-transparent md:backdrop-blur-none">
                            <h4 className="text-base md:text-lg font-bold text-gray-900 m-0 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                How is this score computed?
                            </h4>
                            <button 
                                className="tooltip-close-enhanced min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTooltip(false);
                                }}
                                onTouchStart={(e) => {
                                    e.stopPropagation();
                                }}
                                aria-label="Close tooltip"
                                tabIndex="0"
                            >
                                <svg className="w-5 h-5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        
                        {/* Tooltip arrow - hidden on mobile, visible on desktop */}
                        <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 border-[14px] border-transparent border-t-white/98 drop-shadow-lg"></div>
                        
                        <div className="p-4 md:p-4 pt-2 md:pt-4 pb-6 text-gray-700">
                            {/* Enhanced explanation with better mobile formatting */}
                            <div className="text-sm md:text-sm leading-relaxed mb-6 text-gray-600">
                                <p className="mb-4 font-medium text-gray-800">
                                    The "Can I Go Outside?" score combines multiple weather factors:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-accent-blue-500 font-bold mt-0.5">•</span>
                                        <div>
                                            <span className="font-semibold">Temperature:</span> Ideal range 18-25°C (65-77°F)
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-accent-blue-500 font-bold mt-0.5">•</span>
                                        <div>
                                            <span className="font-semibold">Wind Speed:</span> Best when under 6 m/s (13 mph)
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-accent-blue-500 font-bold mt-0.5">•</span>
                                        <div>
                                            <span className="font-semibold">Humidity:</span> Comfortable between 30-60%
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-accent-blue-500 font-bold mt-0.5">•</span>
                                        <div>
                                            <span className="font-semibold">Air Quality:</span> Healthiest when AQI ≤ 50
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-accent-blue-500 font-bold mt-0.5">•</span>
                                        <div>
                                            <span className="font-semibold">UV Index:</span> Safest when ≤ 3
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs md:text-sm text-gray-500 bg-gray-50/80 p-3 rounded-xl">
                                    Each factor contributes up to 2 points, creating a total score from 1-10 where 10 represents perfect outdoor conditions.
                                </p>
                            </div>
                            
                            <div>
                                <h5 className="text-base font-semibold text-gray-700 m-0 mb-4 pb-2 border-b-2 border-primary/10">
                                    Current Conditions
                                </h5>
                                <div className="grid gap-3 md:gap-4">
                                    {factors && Object.entries(factors).map(([key, value]) => {
                                        const factorScore = getFactorScore(key, value);
                                        const status = getFactorStatus(key, value);
                                        return (
                                            <div key={key} className="p-4 bg-primary/5 border border-primary/10 rounded-xl transition-all duration-300 hover:bg-primary/8 hover:border-primary/15 md:hover:-translate-y-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-gray-700 text-sm">{key}</span>
                                                    <div className="flex gap-1" aria-label={`${status} rating: ${factorScore} out of 2 points`}>
                                                        {[1, 2].map(dot => (
                                                            <div 
                                                                key={dot}
                                                                className={`w-3 h-3 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                                                                    dot <= factorScore 
                                                                        ? 'shadow-sm [box-shadow:var(--glow-shadow)]' 
                                                                        : 'bg-gray-400/30'
                                                                }`}
                                                                style={dot <= factorScore ? {
                                                                    backgroundColor: getScoreColor(factorScore * 5),
                                                                    '--glow-shadow': `0 0 8px ${getScoreColor(factorScore * 5)}80`
                                                                } : {}}
                                                                aria-hidden="true"
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-lg font-bold text-primary mb-1">{value}</div>
                                                <div className="text-xs font-medium text-gray-600">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        status === 'Excellent' ? 'bg-green-100 text-green-800' :
                                                        status === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {status}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile-only close button at bottom */}
                        <div className="md:hidden sticky bottom-0 bg-gradient-to-t from-white/98 to-transparent p-4 pt-2">
                            <button
                                className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-xl font-medium text-sm transition-colors duration-200 min-h-[44px]"
                                onClick={() => setShowTooltip(false)}
                                onTouchStart={() => setShowTooltip(false)}
                                type="button"
                            >
                                Got it!
                            </button>
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
