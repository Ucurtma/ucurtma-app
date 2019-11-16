/* eslint-disable no-unused-vars */
module.exports = {
  exportTrailingSlash: true,
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/account/my-account': {
        page: '/account/settings',
        query: { slug: 'my-account' },
      },
      '/account/sponsored-campaigns': {
        page: '/account/settings',
        query: { slug: 'sponsored-campaigns' },
      },
      '/account/billing-methods': {
        page: '/account/settings',
        query: { slug: 'billing-methods' },
      },
    };
  },
};
