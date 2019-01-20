const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const base = require('./webpack.base');

const distPath = path.resolve(__dirname, '../dist');
const publicPathFolder = path.resolve(__dirname, '../public');

module.exports = (env, argv) => {
  let publicPath = '';

  return merge(base(env, argv), {
    devtool: 'source-map',
    stats: 'errors-only',
    output: {
      path: distPath,
      filename: 'js/[name].[hash:8].js',
      publicPath: publicPath
    },
    plugins: [
      new ProgressBarPlugin(),
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
