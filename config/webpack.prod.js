const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack.base');

const distPath = path.resolve(__dirname, '../dist');
const publicPathFolder = path.resolve(__dirname, '../public');

module.exports = () => {
  let publicPath = '';

  return merge(base, {
    devtool: 'source-map',
    output: {
      path: distPath,
      filename: 'js/[name].[hash:8].js',
      publicPath: publicPath
    },
    plugins: [
      new CleanWebpackPlugin(
        ['dist'],
        {
          root: path.resolve(__dirname, '../'),
        }
      ),
      new CopyWebpackPlugin([
        { from: publicPathFolder }
      ])
    ]
  });
};
