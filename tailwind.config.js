module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'body' : ['Space Grotesk']
      }
    },
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [],
}
