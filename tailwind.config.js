module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'custom1':'#00FFAB',
        'custom2':'#40E0D0',
        'btn':'#FFE300'
      }
    },
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [],
}
