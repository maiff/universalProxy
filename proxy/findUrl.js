const find = require('../getProxy/find')

module.exports = function findUrl (url) {
  return find({url: url})
}