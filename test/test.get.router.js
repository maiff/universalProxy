const assert = require('assert')
const router = require('../getProxy')

let connect = require('../lib/myExpress')
const request = require('supertest')
describe('get router', function () {
  it('get success', function (done) {
    let app = connect()
    app.use('/get', router)
    app.listen(0, function () {
      request(app)
      .get('/get')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        // assert.equal(JSON.parse(res.text).status, 1)
        done()
      })
    })
  })
})
