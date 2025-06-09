/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003399',
        secondary: '#ED6E0A',
        tertiary: '#6699FF',
      },
    },
  },
  plugins: [],
}

