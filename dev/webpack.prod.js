// const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: config.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          unused: true,
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          warnings: false
        },
        output: {
          comments: false
        }
      },
      sourceMap: config.productionSourceMap,
      parallel: true
    })
  ]
})
