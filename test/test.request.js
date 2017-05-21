const assert = require('assert')
const request = require('../proxy/request')
describe('test request', function () {
  it('get', function (done) {
    request('get', 'http://dict.youdao.com/fsearch', {query: {q: 'test'}})
    .then(text => {
      assert.equal(text.indexOf('xml') === -1, false)
      done()
    })
  })
  it('get with cookie', function (done) {
    request('get', 'http://120.77.37.119:30002/getMyList', {
      withCookie: 1,
      query: {_cookie: 'sessionId=%229be3d76ed487a41188e104b0bc45381243ec40b8e46e85a2153e04e3b45a518a%22; name=%22%u5411%u738B%u6D9B%22'}})
    .then(text => {
      console.log(text)
      done()
    })
  })

  it('post get cookie', function (done) {
    request('post', 'https://logindict.youdao.com/login/acc/login', {
      getCookie: 1,
      isFollowRedirects: 0,
      postData: {
        username:'webstudy616@163.com',
        password:'996952c8ad4c22926136347df5a7a31f',
        app:'web',
        tp:'urstoken',
        cf:7,
        fr:1,
        ru:'http://dict.youdao.com/wordbook/wordlist?keyfrom=login_from_dict2.index',
        product:'DICT',
        type:1,
        um:true,
        savelogin:1,
      }
    })
    .then(obj => {
      console.log(obj)
      done()
    }, err => console.log(err))
  })
  
  it('post with cookie', function (done) {
    request('post', 'http://120.77.37.119:30002/addGood', {
      isFollowRedirects: 1,
      withCookie: 1,
      postData: {
        _cookie: 'sessionId=%229be3d76ed487a41188e104b0bc45381243ec40b8e46e85a2153e04e3b45a518a%22; name=%22%u5411%u738B%u6D9B%22',
        name:1,
        price:1,
        detail:'',
        contactType:'QQ',
        contactValue:8,
        imgUrl:''
      }
    })
    .then(text => {
      console.log(text.text)
      done()
    }, err => console.log(err))
  })
})
