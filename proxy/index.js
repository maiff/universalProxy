let router = require('../lib/MyExpress')()

let findUrl = require('./findUrl')

const sendJson = require('../lib/sendJson')
router.use(sendJson())

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

const query = require('../lib/query')
router.use(query())

const request = require('./request')
router.use((req, res, next) => {
  let url = req.url.replace(/\//g, '')
  // console.log(url)
  url = url.indexOf('?') === -1 ? url : url.slice(0, url.indexOf('?'))
  // console.log(url)
  findUrl(url).then((item) => {
    if (item) {
      request(req.method.toLowerCase(), item.apiUrl, {
        withCookie: item.withCookie,
        getCookie: item.getCookie,
        data: req.method.toLowerCase() === 'get' ? req.query : req.body,
        isFollowRedirects: false
      }).then((val) => {
        
        typeof val === 'object' ? res.json(val) : res.end(val)
      }, (err) => console.log(err))
    } else next()
  })
})

// function isEmptyObject(e) {  
//     var t;  
//     for (t in e)  
//         return !1;  
//     return !0  
// }  

module.exports = router