/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6154',
        secondary: '#5139EE',
        accent: '#00D4FF',
        surface: '#FFFFFF',
        background: '#F5F7FA',
        success: '#00C896',
        warning: '#FFB800',
        error: '#FF3B3B',
        info: '#0099FF',
        text: {
          primary: '#1F2937',
          secondary: '#6B7280',
          muted: '#9CA3AF'
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'vote-bounce': 'bounce 0.3s ease-out',
        'vote-pulse': 'pulse 0.2s ease-out'
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'vote': '0 4px 12px rgba(255, 97, 84, 0.3)'
      }
    },
  },
  plugins: [],
}