/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        'greyBlue' : 'rgba(200, 219, 211, 1)'
      },

      fontFamily: {
        'archivo' : 'ArchivoBlack',
        'inter':'InterRegular'
      }
    },
  },
  plugins: [],
}