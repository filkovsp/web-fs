const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.development'),
    }),
  ],
  // https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    contentBase: path.resolve(__dirname, '..', './dist'),
    hot: true,
    // host: '0.0.0.0',
    port: 80,
    // https://webpack.js.org/configuration/dev-server/#devserverallowedhosts
    allowedHosts: ['all'],
  },
  devtool: 'eval-source-map',
};
