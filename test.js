const http = require('http')
const Websocket = require('ws')

let options = {
    host: 'localhost',
    path: '/login',
    port: '8000',
    method: 'POST'
}

callback = function(response) {
    let str = ''
    response.on('data', function(chunk) {
        str += chunk
        console.log('chunk')
    })
    response.on('end', function() {
        console.log(str)
        openWebSocket()
    })
    response.on('error', function(err) {
        console.log(err)
    })
}

function openWebSocket() {
    console.log('open web soclet')
    let socket = new Websocket("ws://localhost:8000", null)
    socket.onerror = function(error) {
        console.log(error)
    }
    socket.onopen = function() {
        console.log('opened')
    }
}

let req = http.request(options, callback)
req.write('data')
req.end()