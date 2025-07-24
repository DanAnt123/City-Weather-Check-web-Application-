/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced primary color palette with better harmony
        primary: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8b95f8',
          500: '#667eea', // main primary
          600: '#5a6dd8',
          700: '#4f5bc4',
          800: '#444ca0',
          900: '#3d4580',
        },
        secondary: {
          50: '#f4f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bfa8ff',
          400: '#a278ff',
          500: '#764ba2', // main secondary
          600: '#6b3d96',
          700: '#5f3085',
          800: '#4f2870',
          900: '#42225c',
        },
        
        // Refined accent colors with better contrast
        accent: {
          blue: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#4fc3f7', // main accent blue
            600: '#0ea5e9',
            700: '#0284c7',
            800: '#0369a1',
            900: '#0c4a6e',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#ba68c8', // main accent purple
            600: '#a855f7',
            700: '#9333ea',
            800: '#7c3aed',
            900: '#6b21a8',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#f48fb1', // main accent pink
            600: '#ec4899',
            700: '#db2777',
            800: '#be185d',
            900: '#9d174d',
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
          }
        },
        
        // Enhanced glass morphism colors
        glass: {
          bg: 'rgba(255, 255, 255, 0.08)',
          'bg-light': 'rgba(255, 255, 255, 0.12)',
          'bg-lighter': 'rgba(255, 255, 255, 0.16)',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-light': 'rgba(255, 255, 255, 0.18)',
          'border-lighter': 'rgba(255, 255, 255, 0.25)',
        },
        
        // Improved text color hierarchy
        text: {
          'primary': 'rgba(255, 255, 255, 0.98)',
          'secondary': 'rgba(255, 255, 255, 0.85)',
          'tertiary': 'rgba(255, 255, 255, 0.70)',
          'muted': 'rgba(255, 255, 255, 0.55)',
          'subtle': 'rgba(255, 255, 255, 0.40)',
        },
        
        // Semantic colors for better UX
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      
      // Enhanced typography with better hierarchy
      fontFamily: {
        'display': ['Manrope', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      
      fontSize: {
        // Enhanced type scale with better proportions
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      
      // Enhanced spacing scale for better consistency
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Improved background gradients with better color harmony
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ba68c8 80%, #f48fb1 100%)',
        'gradient-sunny': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #ea580c 75%, #dc2626 100%)',
        'gradient-cloudy': 'linear-gradient(135deg, #94a3b8 0%, #64748b 25%, #475569 50%, #334155 75%, #1e293b 100%)',
        'gradient-rainy': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 25%, #0369a1 50%, #075985 75%, #0c4a6e 100%)',
        'gradient-stormy': 'linear-gradient(135deg, #4c1d95 0%, #581c87 25%, #6b21a8 50%, #7c2d92 75%, #86198f 100%)',
        'gradient-snowy': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
      // Enhanced animations with better timing
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'gradient-shift': 'gradientShift 20s ease infinite',
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
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(4px) rotate(-1deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
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
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
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
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
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
      
      // Enhanced shadow system for depth
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'glass-hover': '0 16px 48px rgba(31, 38, 135, 0.25)',
        'glass-active': '0 4px 16px rgba(31, 38, 135, 0.2)',
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'luxury-hover': '0 25px 80px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'premium': '0 32px 64px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'premium-hover': '0 40px 80px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'inner-glass': 'inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glow-primary': '0 0 20px rgba(102, 126, 234, 0.4)',
        'glow-accent-blue': '0 0 20px rgba(79, 195, 247, 0.4)',
        'glow-accent-purple': '0 0 20px rgba(186, 104, 200, 0.4)',
      },
      
      // Enhanced border radius for modern feel
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      
      // Additional utilities for modern design
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      
      // Z-index scale for layering
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}
