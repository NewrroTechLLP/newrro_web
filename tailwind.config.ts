import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

// @ts-ignore - Ignore TypeScript error for this import
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        body: ['Source Sans Pro', 'sans-serif'],
      },

      height: {
        '40vh': '40vh',
        '50vh': '50vh',
        '120vh': '120vh',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      colors: {
        background: '#feffff',
        foreground: '#333333',

        card: {
          DEFAULT: '#ffffff',
          foreground: '#333333',
        },

        popover: {
          DEFAULT: '#ffffff',
          foreground: '#333333',
        },

        primary: {
          DEFAULT: '#df5bd3',
          foreground: '#feffff',
        },

        secondary: {
          DEFAULT: '#7e5bf6',
          foreground: '#feffff',
        },

        muted: {
          DEFAULT: '#f6f6f6',
          foreground: '#666666',
        },

        accent: {
          DEFAULT: '#df5bd3',
          foreground: '#feffff',
        },

        destructive: {
          DEFAULT: '#e63946',
          foreground: '#ffffff',
        },

        border: '#cccccc',
        input: '#e0e0e0',
        ring: '#df5bd3',

        chart: {
          '1': '#df5bd3',
          '2': '#7e5bf6',
          '3': '#6b7280',
          '4': '#f97316',
          '5': '#3b82f6',
        },
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
    },
  },

  plugins: [
    require('tailwindcss-animate'),
    
  ],
};

export default config;
