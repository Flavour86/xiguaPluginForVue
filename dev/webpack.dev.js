const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpack = require('./webpack.base')
const ChromeReloadPlugin  = require('wcer')
const utils = require('./utils')
const config = require('./config').dev

module.exports = merge(baseWebpack, {
  watch: true,
  devtool: config.devtool,
  plugins: [
    new ChromeReloadPlugin({
      port: config.port,
      manifest: utils.resolvePath.baseApp('manifest.js')
    })
  ]
})
