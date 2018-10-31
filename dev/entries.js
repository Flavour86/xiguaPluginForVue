const glob = require('glob')
// const path = require('path')

const pagesPath = {
  content_scripts: './app/content_scripts/',
  page_scripts: './app/content_scripts/'
}
const entries = {}
Object.keys(pagesPath).forEach(function (module) {
  glob.sync(pagesPath[module] + '**/index.js').forEach(function (entry) {
    var matches = new RegExp(pagesPath + '(.*)/index\\.js').exec(entry)
    entries[module + '/' + matches[1]] = entry
  })
})


module.exports = entries
