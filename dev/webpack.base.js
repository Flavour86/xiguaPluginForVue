const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ChromeReloadPlugin  = require('wcer')
const utils = require('./utils')
const config = require('./config').base
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    popup: utils.resolvePath.baseApp('popup'),
    background: utils.resolvePath.baseApp('background')
  },
  output: {
    path: utils.resolvePath.baseDist(),
    publicPath: '/',
    filename: 'static/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolvePath.baseApp()
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [utils.resolvePath.baseApp()],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
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
        include: [utils.resolvePath.baseApp()],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'less-loader'
          ],
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'vue-style-loader'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': config.env
    }),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /zh-cn/),
    new ExtractTextPlugin({
      filename: 'static/[name].css'
    }),
    utils.htmlPage('popup', 'popup', ['popup']),
    new ChromeReloadPlugin({
      port: config.port,
      manifest: utils.resolvePath.baseApp('manifest.js')
    }),
    new CopyWebpackPlugin([{ from: utils.resolvePath.base('static'), to: utils.resolvePath.baseDist('static') }])
  ]
}