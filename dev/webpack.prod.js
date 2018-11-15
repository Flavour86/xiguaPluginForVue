const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpack = require('./webpack.base')
const config = require('./config').build
const utils = require('./utils')

module.exports = merge(baseWebpack, {
  devtool: config.devtool,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
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
    })
  ]
})