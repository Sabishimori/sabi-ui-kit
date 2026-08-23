/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        voral: {
          bg: '#F4F3F1',
          border: '#0a0a0a',
          dark: '#111111',
          btn: '#1a1a1a',
          muted: '#9a9a9a',
          subcopy: '#8a8a8a',
          nav: '#6b6b6b',
          card: '#FFFFFF',
          cardAlt: '#ECEAE6',
          blue: '#366299',
          lightblue: '#4A78B0',
          accent: '#4276A8',
          success: '#15803D',
          warning: '#D97706',
          error: '#B91C1C',
        },
        sabi: {
          blue: '#366299',
          lightblue: '#4A78B0',
          accentblue: '#4276A8',
          dark: '#161412',
          charcoal: '#292521',
          gray: '#66615C',
          muted: '#8A8580',
          creamSurface: '#EAE2D4',
          creamBg: '#F4F3F1',
          creamLight: '#FAF5EE',
        },
      },
      fontFamily: {
        main: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'voral-btn': '0 2px 8px rgba(0, 0, 0, 0.22)',
        'voral-card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'voral-elevated': '0 8px 30px rgba(0, 0, 0, 0.08)',
      },
      borderWidth: {
        '2': '2px',
        '3': '3px',
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}
