/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['"EB Garamond"', 'serif'],
      },
      colors: {
        heraldic: {
          gold: '#D4AF37',
          crimson: '#722F37',
          royal: '#1E3A8A',
        }
      },
      animation: {
        'in': 'fadeIn 0.2s ease-out',
        'fade-in-0': 'fadeIn 0.2s ease-out',
        'zoom-in-95': 'zoomIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'parchment': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='35' cy='35' r='1'/%3E%3Ccircle cx='41' cy='41' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }
    },
  },
  plugins: [],
};