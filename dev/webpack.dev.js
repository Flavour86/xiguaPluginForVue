// const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const utils = require('./utils')
const config = require('./config').dev

module.exports = merge(baseWebpack, {
  output: {
    path: utils.resolvePath.baseDist(),
  },
  watch: true,
  devtool: config.devtool,
  module: {
    rules: utils.styleLoaders({ sourceMap: false })
  }
})
