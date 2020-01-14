/* eslint-disable no-unused-vars */

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = () => {};
}

const withCSS = require('@zeit/next-css');

module.exports = withCSS();

// module.exports = {
//   exportTrailingSlash: true,
//   async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
//     return {
//       ...defaultPathMap,
//       '/': { page: '/' },
//       '/application': {
//         page: '/application',
//       },
//     };
//   },
// };
