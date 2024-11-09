/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#333',
        'black-50': 'rgba(0, 0, 0, 0.7)',
      },
      fontSize: {
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '5xl': '48px',
      },
      fontFamily: {
        'gowun': ['"Gowun Batang"', 'serif'], 
        'libre-caslon': ['"Libre Caslon Text"', 'serif'],
        'noto-serif': ['"Noto Serif"', 'serif'],
        'windsong': ['"WindSong"', 'cursive'],
        'cormorant': ['"Cormorant"', 'serif'],
      },
      backgroundImage: {
        'login-bg': "url('/images/your-image.jpg')", // Set your path here
      },
    },
  },
  plugins: [],
}
