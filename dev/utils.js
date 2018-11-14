const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')

exports.resolvePath = (function () {
  const resolve = path.resolve

  const base = function () {
    let args = [config.pathBase].concat(Array.prototype.slice.call(arguments))
    return resolve.apply(resolve, args)
  }
  return {
    base: base,
    baseApp: base.bind(null, config.dirApp),
    baseDist: base.bind(null, config.dirDist),
  }
})()

exports.htmlPage = (title, filename, chunks, template) => new HtmlWebpackPlugin({
  title,
  hash: true,
  cache: true,
  inject: 'body',
  filename: './pages/' + filename + '.html',
  template: template || exports.resolvePath.baseApp('page.ejs'),
  appMountId: 'app',
  chunks
})
