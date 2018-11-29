const path = require('path')

const base = {
  env: process.env.NODE_ENV,
  pathBase: path.resolve(__dirname, '../../'),
  dirDist: 'xgjPlugin',
  dirApp: 'app',
  port: 9090,
  vendors: [
    'vue',
    'axios',
    'json-bigint',
    'bignumber.js',
    'vue-router'
  ]
}
// 需要添加到的全局变量
base.globals = {
  'NODE_ENV'     : base.env,
  '__DEV__'      : base.env === 'development',
  '__PROD__'     : base.env === 'production'
}
exports.base = base
exports.dev = Object.assign({}, exports.base, {
  devtool: 'cheap-module-eval-source-map'
})

exports.build = Object.assign({}, exports.base, {
  devtool: 'none',
  productionSourceMap: false
})
