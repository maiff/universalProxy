const ProxyModel = require('../model/proxyModel')
module.exports = (proxyInformation) => {
  let proxy = new ProxyModel(proxyInformation)
  return proxy.save()
}