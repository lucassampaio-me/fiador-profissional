/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
      },

      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '1440px',
        }
      },

      colors: {
        primary: '#16153C',
        secondary: '#84A17D',
        'secondary-dark': '#567a4f',
        tertiary: '#171926',
        quaternary: '#3F3F50',
        'gray-50': '#F4F5F6',
        'gray-100': '#E5E7EB',
      },
    },
  },
  plugins: [],
}

