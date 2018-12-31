const http = require('http')

class Koa {
    constructor () {

    }

    listen (port) {
        let server = http.createServer(this.requestHandle)
        server.listen(port)
    }
} 