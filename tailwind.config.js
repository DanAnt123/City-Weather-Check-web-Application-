/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced primary color palette with improved harmony and contrast
        primary: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8b95f8',
          500: '#6366f1', // Updated for better contrast (was #667eea)
          600: '#5b21b6', // Enhanced contrast
          700: '#4c1d95',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#f4f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bfa8ff',
          400: '#a278ff',
          500: '#8b5cf6', // Updated for better harmony (was #764ba2)
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        
        // Refined accent colors with enhanced contrast and harmony
        accent: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6', // Enhanced contrast (was #4fc3f7)
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7', // Enhanced contrast (was #ba68c8)
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899', // Enhanced contrast (was #f48fb1)
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          emerald: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          teal: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
          }
        },
        
        // Enhanced glass morphism colors with better opacity values
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          'bg-light': 'rgba(255, 255, 255, 0.08)',
          'bg-lighter': 'rgba(255, 255, 255, 0.12)',
          'bg-strong': 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.1)',
          'border-light': 'rgba(255, 255, 255, 0.15)',
          'border-lighter': 'rgba(255, 255, 255, 0.2)',
          'border-strong': 'rgba(255, 255, 255, 0.25)',
        },
        
        // Improved text color hierarchy with better contrast
        text: {
          'primary': 'rgba(255, 255, 255, 1)', // Enhanced contrast
          'secondary': 'rgba(255, 255, 255, 0.9)', // Enhanced contrast
          'tertiary': 'rgba(255, 255, 255, 0.75)', // Enhanced contrast
          'muted': 'rgba(255, 255, 255, 0.6)',
          'subtle': 'rgba(255, 255, 255, 0.45)',
          'hint': 'rgba(255, 255, 255, 0.3)',
        },
        
        // Enhanced semantic colors for better UX
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      
      // Enhanced typography with improved readability and hierarchy
      fontFamily: {
        'display': ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'monospace'],
      },
      
      fontSize: {
        // Refined type scale with better proportions and line heights
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.875rem', letterSpacing: '-0.015em' }],
        'xl': ['1.25rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.035em' }],
        '5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.04em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.045em' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem', letterSpacing: '-0.05em' }],
        '8xl': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.055em' }],
        '9xl': ['8rem', { lineHeight: '8rem', letterSpacing: '-0.06em' }],
      },
      
      // Enhanced spacing scale with consistent rhythm
      spacing: {
        '15': '3.75rem',    // 60px
        '18': '4.5rem',     // 72px
        '22': '5.5rem',     // 88px
        '26': '6.5rem',     // 104px
        '30': '7.5rem',     // 120px
        '34': '8.5rem',     // 136px
        '88': '22rem',      // 352px
        '100': '25rem',     // 400px
        '128': '32rem',     // 512px
        '144': '36rem',     // 576px
      },
      
      // Enhanced background gradients with better color harmony
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #a855f7 60%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #a855f7 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #a855f7 100%)',
        'gradient-cool': 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #6366f1 100%)',
        'gradient-sunny': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #ea580c 75%, #dc2626 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #9ca3af 0%, #6b7280 25%, #4b5563 50%, #374151 75%, #1f2937 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 25%, #2563eb 50%, #1d4ed8 75%, #1e40af 100%)',
        'gradient-stormy': 'linear-gradient(135deg, #581c87 0%, #6b21a8 25%, #7c3aed 50%, #8b5cf6 75%, #a855f7 100%)',
        'gradient-snowy': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #9ca3af 75%, #6b7280 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
      
      // Enhanced animations with smoother timing
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 20s ease infinite',
        'gradient-shift-slow': 'gradientShift 30s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 4s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-left': 'slideLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-right': 'slideRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in-center': 'scaleInCenter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'breathing': 'breathing 4s ease-in-out infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.01)', opacity: '0.95' },
        },
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        scaleInCenter: {
          from: { opacity: '0', transform: 'scale(0.8) translateY(10px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      
      // Enhanced backdrop blur options
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      
      // Enhanced shadow system for better depth perception
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.12)',
        'glass-hover': '0 16px 48px rgba(31, 38, 135, 0.2)',
        'glass-active': '0 4px 16px rgba(31, 38, 135, 0.15)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'luxury-hover': '0 25px 80px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'premium': '0 32px 64px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'premium-hover': '0 40px 80px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'inner-glass': 'inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-primary': '0 0 24px rgba(99, 102, 241, 0.5)',
        'glow-accent-blue': '0 0 24px rgba(59, 130, 246, 0.5)',
        'glow-accent-purple': '0 0 24px rgba(168, 85, 247, 0.5)',
        'glow-soft': '0 0 16px rgba(255, 255, 255, 0.1)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'elevation-4': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
      },
      
      // Enhanced border radius for modern aesthetic
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '3.5rem',
      },
      
      // Enhanced transition timing functions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth-in': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'smooth-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Enhanced transition durations
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      
      // Z-index scale for proper layering
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Enhanced blur values
      blur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      }
    },
  },
  plugins: [],
}
