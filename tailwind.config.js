module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'main': '#0acefa',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
