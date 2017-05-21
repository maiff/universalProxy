let router = require('../lib/MyExpress')()
const get = require('./get')

const sendJson = require('../lib/sendJson')
router.use(sendJson())
router.get((req, res, next) => {
  get().then((list) => {
    res.json(list)
  })
})

module.exports = router