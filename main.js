const wss = require('./WebSocketWrapper/Wrapper')
const EventEmitter = require('events')
const Tile = require('./Tile')

class Player extends EventEmitter  {
    constructor(name) {
        this.name = name
        this.board = null
    }
}

function createUser(connectionId) {
    return {
        connectionId: connectionId,
        game: null,
        player: null
    }
}

let games = new Map()
let users = new Map()

wss.on('connection', (connectionId, headers) => {
    let user = createUser(connectionId)
    users.set(connectionId, user)
})

wss.onCommand('createGame', ['gameKey', 'gameName'], (req, resp) => {
    let key = req.data.gameKey
    let name = req.data.gameName
    let game = new Game(key, name)
    games.set(key, game)
    resp.send()
})

wss.onCommand('joinGame', ['gameKey', 'question'], (req, resp) => {
    let connectionId = req.id
    let user = users.get(connectionId)
    let game = games.get(req.data.gameKey)
    let player = game.addPlayer(name)
    let question = req.data.question
    let tile = new Tile(password, question)
    game.addPlayer(player, tile)
    if (game.lastError) {
        resp.data.error = err
        resp.send()
        return
    } 
    user.player = player
    resp.send()
})

wss.onCommand('fillSquare', ['',''])