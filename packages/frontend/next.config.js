/* eslint-disable no-unused-vars */
module.exports = {
  exportTrailingSlash: false,
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/account/my-account': { page: '/account/settings' },
      '/account/sponsored-campaigns': { page: '/account/settings' },
      '/account/billing-methods': { page: '/account/settings' },
    };
  },
};
