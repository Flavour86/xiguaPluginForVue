// const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')

const utils = require('./utils')
const config = require('./config').dev

module.exports = merge(baseWebpack, {
  watch: true,
  devtool: config.devtool
})
