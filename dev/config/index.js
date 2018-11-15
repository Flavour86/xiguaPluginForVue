const path = require('path')

exports.base = {
  env: process.env.NODE_ENV || 'development',
  pathBase: path.resolve(__dirname, '../../'),
  dirDist: 'xgjPlugin',
  dirApp: 'app',
  port: 9090
}
exports.dev = Object.assign({}, exports.base, {
  devtool: 'cheap-module-eval-source-map'
})

exports.build = Object.assign({}, exports.base, {
  devtool: 'none',
  productionSourceMap: true
})
