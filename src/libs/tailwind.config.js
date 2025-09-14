/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../index.html',
  ],
  theme: {
    screens: {

      'xs3': '340px',
      // => @media (min-width: 340px) { ... }

      'xs2': '460px',
      // => @media (min-width: 460px) { ... }

      'xs': '560px',
      // => @media (min-width: 560px) { ... }
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
      },

      container: {
        center: true,
        screens: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '1440px',
        }
      },

      colors: {
        primary: '#16153C',
        secondary: '#16a34b',
        'secondary-dark': '#15803e',
        tertiary: '#010101',
        whatsapp: '#16a34b',
        'whatsapp-hover': '#15803e',
        'gray-50': '#F4F5F6',
        'gray-100': '#E5E7EB',
      },
    },
  },
  plugins: [],
}

