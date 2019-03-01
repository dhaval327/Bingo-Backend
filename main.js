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
let userNameToUsers = new Map()
let tiles = new Map()

wss.on('connection', (connectionId, headers) => {
    let username = headers['username']
    let authKey = headers['authkey']
    //check if authkey is from player or leader
    let user = usernamesToUsers.get(username)
    users.set(connectionId, user)
    //validate auth key
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
    user.game = game
    resp.send()
})

wss.onCommand('startGame', null, (req, resp) => {
    //make sure message is from leader
    let user = users.get(req.id)
    let game = user.game
    if (game == null) {
        resp.data.error = 'notInGame'
        resp.data.send()
        return
    }
    game.start()
})

wss.onCommand('fillTile', ['tileId'], (req, resp) => {
    let game = users.get(req.id).game
    if (game != null) {
        let player = users.get(req.id).player
        let tileId = req.data.tileId
        let board = boards.get(player)
        let tile = tiles.get(tileId)
    }
})

function addPlayerListeners(player) {
    player.on('won', () => {
        //wss.send(won)
    })
}