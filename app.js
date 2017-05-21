const MyExpress = require('./lib/myExpress')
const serveStatic = require('serve-static')
const path = require('path')

const port = 30002

let app = MyExpress()

app.use(serveStatic(path.join(__dirname, '/static'), {
  maxAge: '1d',
  setHeaders: setCustomCacheControl
}))

const allowAll = require('./lib/allow')
app.use(allowAll())

const proxy = require('./proxy')
app.use(proxy)
const p = require('./testRouter/p')
app.use('/test', p)
app.listen(port, () => {
  console.log(`listen on ${port}`)
})

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
  // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}