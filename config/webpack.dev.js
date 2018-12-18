const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const publicPath = path.resolve(__dirname, '../public');

module.exports = merge(base, {
  devtool: 'source-map',
  devServer: {
    contentBase: publicPath,
    stats: {
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      modules: false,
      children: false,
    },
    overlay: true,
    port: 4000,
    historyApiFallback: true
  }
});
