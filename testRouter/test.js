let router = require('../lib/MyExpress')()

router.get((req, res) => {
  // console.log(req.body)
  console.log(req.url)
  res.end('yes')
})

module.exports = router