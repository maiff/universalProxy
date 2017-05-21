const assert = require('assert')
const get = require('../getProxy/get')
describe('get', function () {
  it('get all', function (done) {
    get().then((items) => {
      assert.equal(typeof items, 'object')
      done()
    })
  })
})
