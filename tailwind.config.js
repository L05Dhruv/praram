import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand color - Deep blue
        primary: {
          50: '#f0f9ff',  // Lightest - Background, hover states
          100: '#e0f2fe', // Super light - Backgrounds
          200: '#bae6fd', // Very light - Borders, dividers
          300: '#7dd3fc', // Light - Text on dark backgrounds
          400: '#38bdf8', // Medium light - Secondary buttons
          500: '#0ea5e9', // Base - Main brand color
          600: '#0284c7', // Medium dark - Primary buttons
          700: '#0369a1', // Dark - Hover states
          800: '#075985', // Very dark - Text
          900: '#0c4a6e', // Darkest - Headers
        },
        // Secondary color - Warm gray for neutral elements
        secondary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Accent color - Forest green for success states and CTAs
        accent: {
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
        // Warning color - Amber
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
        // Error color - Red
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
        // Success color - Emerald
        success: {
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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.secondary.800'),
            h1: {
              color: theme('colors.primary.900'),
            },
            h2: {
              color: theme('colors.primary.800'),
            },
            h3: {
              color: theme('colors.primary.800'),
            },
            h4: {
              color: theme('colors.primary.700'),
            },
            strong: {
              color: theme('colors.primary.900'),
            },
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            blockquote: {
              color: theme('colors.secondary.600'),
              borderLeftColor: theme('colors.primary.200'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.primary.300'),
            },
            'ol > li::before': {
              color: theme('colors.primary.600'),
            },
            hr: {
              borderColor: theme('colors.primary.100'),
            },
            code: {
              color: theme('colors.primary.700'),
              backgroundColor: theme('colors.primary.50'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.secondary.200'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.primary.100'),
            },
            h3: {
              color: theme('colors.primary.200'),
            },
            h4: {
              color: theme('colors.primary.300'),
            },
            strong: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            blockquote: {
              color: theme('colors.secondary.300'),
              borderLeftColor: theme('colors.primary.700'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.primary.600'),
            },
            'ol > li::before': {
              color: theme('colors.primary.400'),
            },
            hr: {
              borderColor: theme('colors.primary.800'),
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.primary.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typographyPlugin,
  ],
};

export default config;