const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const indexFilePath = path.resolve(__dirname, '../src/index.jsx');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    entry: indexFilePath,
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]__[hash:base64:5]',
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              query: {
                config: { path: path.resolve(__dirname, './postcss.config.js') }
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]'
            }
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html'
      })
    ]
  };
};
