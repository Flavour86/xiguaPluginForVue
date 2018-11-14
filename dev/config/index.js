const path = require('path')
const base = {
  env: process.env.NODE_ENV || 'development',
  pathBase: path.resolve(__dirname, '../../'),
  dirDist: 'dist',
  dirApp: 'app',
}

exports.dev = Object.assign({}, base, {
  devtool: 'cheap-module-eval-source-map',
  port: 9090
})

exports.build = Object.assign({}, base, {
  devtool: 'none'
})
