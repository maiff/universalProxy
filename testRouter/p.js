let router = require('../lib/MyExpress')()

router.get((req, res) => {
  // console.log(req.body)
  console.log(req.url)
  res.end('yes1')
})

module.exports = router