module.exports = {
   exportTrailingSlash: true,
   async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
     return {
       ...defaultPathMap,
     };
   },
 };
