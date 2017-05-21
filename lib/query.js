const qs = require('qs')

module.exports = (options) => {
  return (req, res, next) => {
    let url = req.url
    let query = qs.parse(url.indexOf('?') === -1 ? '' : url.slice(url.indexOf('?') + 1))
    req.query = query
    next()
  }
}