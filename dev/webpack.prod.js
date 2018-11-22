const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpack = require('./webpack.base')
const config = require('./config').build
const utils = require('./utils')

module.exports = merge(baseWebpack, {
  devtool: config.devtool,
  output: {
    path: utils.resolvePath.baseDist(),
  },
  module: {
    rules: utils.styleLoaders({ extract: true, sourceMap: true })
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin({
      filename: 'static/css/[name].css'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.productionSourceMap,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: config.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    })
  ]
})