let router = require('../lib/MyExpress')()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

const sendJson = require('../lib/sendJson')
router.use(sendJson())

const save = require('./save')
const find = require('../getProxy/find')

router.post((req, res) => {
  let method = req.body.method
  let withCookie = !!+req.body.withCookie
  let url = req.body.url
  let getCookie = !!+req.body.getCookie
  let apiUrl = req.body.apiUrl
  find({url: url}).then((item) => {
    if(item) {
      throw new Error('此路由已经存在')
    }
  }).then(() => {
    save({
      method,
      withCookie,
      url,
      getCookie,
      apiUrl
    }).then((item) => {
      res.json({status: 1})
    })
  }, (err) => {
    res.json({status: 0})
  })
  
})

module.exports = router