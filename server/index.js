const http = require('http')
const url = require('url')

class Koa {
    constructor () {
        this.middleWares = []
    }

    use (fn) {
        this.middleWares.push(fn)
        return this
    }

    genContext (req, res) {
        let ctx = {
            url: req.url,
            path: url.parse(req.url).pathname,
            method: req.method,
            body: res.body
        }
        return ctx
    }

    middlwareHandle (ctx) {
        function dispatch (id) {
            if (id === this.middleWares.length) return
            let fn = this.middleWares[id]
            fn(ctx, () => dispatch(id+1))
        }
        dispatch.call(this, 0)
    }

    requestHandle (req, res) {
        const ctx = this.genContext(req, res)
        this.middlwareHandle(ctx)
    }

    listen (port) {
        let server = http.createServer(this.requestHandle.bind(this))
        server.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`)
        })
    }
} 

module.exports = Koa