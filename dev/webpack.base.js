const path = require('path')
const webpack = require('webpack')
const ChromeReloadPlugin  = require('wcer')
const config = require('./config')
const entries = require('./entries')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: Object.assign({
    popup: config.resolvePath.baseApp('popup'),
    background: config.resolvePath.baseApp('background')
  }, entries),
  output: {
    path: config.resolvePath.base(config.dir_dist),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': config.resolvePath.baseApp(),
      'components': config.resolvePath.baseApp('components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [config.resolvePath.baseApp()],
        options: {
          emitWarning: !utils.isProd,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // extractCSS: true,
          loaders: [
            'vue-style-loader',
            'css-loader',
            'less-loader'
          ],
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:  [config.resolvePath.baseApp()],
      },
      {
        test: /\.less/,
        loader: 'less-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    utils.htmlPage('popup', 'popup', ['popup']),
    new CopyWebpackPlugin([{ from: config.resolvePath.base('static') }]),
    new ChromeReloadPlugin({
      port: 9090,
      manifest: config.resolvePath.baseApp('manifest.js')
    }),
  ],
  performance: { hints: 'warning' },
}