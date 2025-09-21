/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-800
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // slate-700
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-800
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // emerald-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-50
          foreground: 'var(--color-muted-foreground)', // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // yellow-400
          foreground: 'var(--color-accent-foreground)', // slate-700
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // slate-700
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // slate-700
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-500
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        caption: ['Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'civic-sm': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'civic-md': '0 4px 8px rgba(0, 0, 0, 0.12)',
        'civic-lg': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'civic-xl': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-out',
        'progress-pulse': 'progressPulse 2s ease-in-out infinite',
        'scale-hover': 'scaleHover 150ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(4px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        progressPulse: {
          '0%, 100%': {
            transform: 'scaleX(1)',
          },
          '50%': {
            transform: 'scaleX(1.05)',
          },
        },
        scaleHover: {
          '0%': {
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(1.02)',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionTimingFunction: {
        'civic': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}