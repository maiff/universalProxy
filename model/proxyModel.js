const mongoose = require('../connect/connect')

const Schema = mongoose.Schema

let proxy = new Schema({
  method: {
    type: String,
    required: [true, 'method required']
  },
  withCookie: Boolean,
  apiUrl: {
    type: String,
    required: [true, 'url required']
  },
  url: {
    type: String,
    required: [true, 'url required']
  },
  getCookie: Boolean
})

let proxyModel = mongoose.model('proxyModel', proxy)

module.exports = proxyModel
