
const controller = {
    index: (ctx, next) => {
        console.log('index')
    },
    home: (ctx, next) => {
        console.log('home')
    }
}

module.exports = controller