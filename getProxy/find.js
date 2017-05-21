const proxyModel = require('../model/proxyModel')

module.exports = (obj) => {
  return proxyModel.findOne(obj)
}