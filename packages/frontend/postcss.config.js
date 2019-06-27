/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
  ],
};
