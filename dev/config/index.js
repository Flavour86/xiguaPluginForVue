const path = require('path')

module.exports = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '../../'),
  dir_dist: 'dist',
  dir_app: 'app',
}
