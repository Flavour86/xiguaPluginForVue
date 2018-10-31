const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')

exports.isProd = process.env.NODE_ENV === 'production'
exports.htmlPage = function (title, filename, chunks, template) {
  return  new HtmlWebpackPlugin({
    title,
    cache: true,
    inject: 'body',
    filename: filename + '.html',
    template: template || config.resolvePath.baseApp('index.ejs'),
    chunks: chunks,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true
    }
  })
}