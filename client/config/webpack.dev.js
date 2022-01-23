const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const fs = require("fs");
const paths = {
  dotenv: path.resolve(__dirname, '..', '..', '.env.dev'),
  contentBase: path.resolve(__dirname, '..', '..', 'dist')
};

if (fs.existsSync(path.join(__dirname, '..', '..', '.env.local'))) {
  paths.dotenv = path.resolve(__dirname, '..', '..', '.env.local');
};

require('dotenv').config({path: paths.dotenv});

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: paths.dotenv,
    }),
  ],
  // https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    contentBase: paths.contentBase,
    hot: true,
    host: process.env.HOST || 'localhost',
    port: process.env.FRONTEND_PORT || 3000,
    // https://webpack.js.org/configuration/dev-server/#devserverallowedhosts
    allowedHosts: ['all'],
    // Invalid Host header
    disableHostCheck: true,
    proxy: {
			"/api": {
          pathRewrite: {'^/api' : ''},
          target: `http://localhost:${process.env.BACKEND_PORT}`,
          secure: false,
          changeOrigin: true
      },
		},
  },
  devtool: 'eval-source-map',
};
