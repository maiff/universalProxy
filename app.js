const MyExpress = require('./lib/myExpress')

const port = 30002

let app = MyExpress()

const allowAll = require('./lib/allow')
app.use(allowAll())

// const login = require('./router/login')
// app.use(function(req,res){res.end('1')})

app.listen(port, () => {
  console.log(`listen on ${port}`)
})
