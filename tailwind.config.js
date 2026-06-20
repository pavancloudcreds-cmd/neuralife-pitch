/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        teal: { DEFAULT: '#0B6E6E', light: '#0B6E6E1A' },
        gold: { DEFAULT: '#F59E0B', light: '#F59E0B1A' },
        deep: '#0A0E1A',
        warm: '#F5F3EE',
      },
    },
  },
  plugins: [],
};


