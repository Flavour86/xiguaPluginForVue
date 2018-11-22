// const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')

const utils = require('./utils')
const config = require('./config').dev
console.log(utils.styleLoaders({ sourceMap: false }), '111')
module.exports = merge(baseWebpack, {
  output: {
    path: utils.resolvePath.baseTemp(),
  },
  watch: true,
  devtool: config.devtool,
  module: {
    rules: utils.styleLoaders({ sourceMap: false })
  }
})
