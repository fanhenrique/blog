/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#0D80BF',
        'secondary-color': '#161B22',
        'backgroud-color': '#0F0F0F'
      },
      boxShadow: {
        's': '10px 10px 10px -2px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

