const MyExpress = require('./lib/MyExpress')
const serveStatic = require('serve-static')
const path = require('path')

const port = 666

let app = MyExpress()

app.use(serveStatic(path.join(__dirname, '/static'), {
  maxAge: 0,
  setHeaders: setCustomCacheControl
}))

const allowAll = require('./lib/allow')
app.use(allowAll())

const proxy = require('./proxy')
app.use(proxy)

const set = require('./setProxy')
app.use('/set', set)

const get = require('./getProxy')
app.use('/get', get)
app.listen(port, () => {
  console.log(`listen on ${port}`)
})

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
  // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}