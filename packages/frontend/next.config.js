/* eslint-disable no-unused-vars */
module.exports = {
  exportTrailingSlash: false,
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/account/sponsored-campaigns': { page: '/account/my-account' },
      '/account/billing-methods': { page: '/account/my-account' },
    };
  },
};
