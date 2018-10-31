const path = require('path')
const config = require('./config')

const utils = {}
utils.resolvePath = (function () {
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
module.exports = utils
