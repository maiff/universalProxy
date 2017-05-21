let router = require('../lib/MyExpress')()

let findUrl = require('./findUrl')
router.get((req, res, next) => {
  if (findUrl(req.url)) {
    res.end('ok')
  } else {
    next()
  }
})

module.exports = router