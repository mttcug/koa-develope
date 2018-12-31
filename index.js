const http = require('http')

const Koa = require('./server')
const Route = require('./router')
const controller = require('./controller')

app = new Koa()
router = new Route()

router.get('/', controller.index)
router.get('/home', controller.home)


app.use(router.routes())

app.listen(3000)

