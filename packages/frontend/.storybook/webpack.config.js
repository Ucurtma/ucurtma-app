// TODO: use full control mode instead of extend mode. look: https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './.storybook/',
              },
            },
          },
        ],
      },
    ],
  },
};
