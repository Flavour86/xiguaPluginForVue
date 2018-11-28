const glob = require('glob')
// const path = require('path')

const packPath = [
  './app/content_scripts/',
  './app/inject_scripts/'
]
let entries ={}
packPath.forEach(function (path) {
  glob.sync(path + '**/index.js').forEach(function (entry) {
    const matches = new RegExp('.app/(.*)/index\\.js').exec(entry)
    matches[1] && (entries[matches[1]] = entry)
  })
})

module.exports = entries
