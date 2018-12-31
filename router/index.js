

class Route {

    constructor () {
        this.layers = []
    }

    get (url, fn) {
        this.request('GET', url, fn)
    }

    post (url, fn) {
        this.request('POST', url, fn)
    }

    request (method, url ,fn) {
        let layer = {
            method: method,
            url: url,
            controller: fn
        }
        this.layers.push(layer)
    }

    executeRequest (matches, ctx, next) {
        function dispatch (id) {
            if (id === matches.length) return
            let fn = matches[id].controller
            fn(ctx, next)
            dispatch(id+1)
        }
        dispatch(0)
    }

    routes (ctx, next) {
        console.log('ooooooooooooooooooooooooo:', ctx)
        let matches = []
        this.layers.forEach((item, i) => {
            if (item.url === ctx.url) {
                matches.push(item)
            }
        })
        this.executeRequest(matches, ctx, next)
    }

}

module.exports = Route