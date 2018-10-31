const path = require('path')

const config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '../../'),
  dir_dist: 'dist',
  dir_app: 'app',
}

config.resolvePath = (function () {
  const resolve = path.resolve

  const base = function () {
    let agrs = [config.path_base].concat(Array.prototype.slice.call(arguments))
    return resolve.apply(resolve, agrs)
  }
  return {
    base: base,
    baseApp: base.bind(null, config.dir_app),
    baseDist: base.bind(null, config.dir_dist),
  }
})()

module.exports = config
