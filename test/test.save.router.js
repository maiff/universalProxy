const assert = require('assert')
const router = require('../setProxy')

let connect = require('../lib/myExpress')
const request = require('supertest')
describe('set router', function () {
  it('set success', function (done) {
    let app = connect()
    app.use('/set', router)
    app.listen(0, function () {
      request(app)
      .post('/set')
      .type('form')
      .send({
        method: 'post',
        withCookie: '0',
        url: 'test',
        getCookie: '1',
        apiUrl: 'https://logindict.youdao.com/login/acc/login'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(JSON.parse(res.text).status, 1)
        done()
      })
    })
  })

  it('set fail', function (done) {
    let app = connect()
    app.use('/set', router)
    app.listen(0, function () {
      request(app)
      .post('/set')
      .type('form')
      .send({
        method: 'get',
        withCookie: '0',
        url: 'test',
        getCookie: '1',
        apiUrl: 'http://baidu.com'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(JSON.parse(res.text).status, 0)
        done()
      })
    })
  })
})
