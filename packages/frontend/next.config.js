/* eslint-disable no-unused-vars */

module.exports = {
  exportTrailingSlash: true,
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      // ...defaultPathMap,
      '/': { page: '/' },
      '/campaign': { page: '/campaign' },
    };
  },
};
