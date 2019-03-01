const EventEmitter = require('events')
const Board = require('./Board')
const Tile = require('./Tile')
module.exports = class Game extends EventEmitter {
    constructor(gameKey, name, boardSize, axis) {
        this.key = gameKey
        this.name = name
        this.players = new Set()
        this._lastError = null
        this.tiles = []
        this.boards = new Map()
        this.boardOfPlayers = new Map()
        this.boardSize = boardSize
        this.axis = axis
        this.state = 0
    }

    createPlayer(name) {
        //if at capacity this._lastError = 'atCapacity'
        let player = new Player(name)
        this.players.add(player)
        return player
    }

    addPlayer(player, tile) {
        this.players.add(player)
        this.tiles.push(tile)
    }

    start() {
        this.state = 1
        this.players.forEach((player) => {
            let randTiles = this._genRandomTiles(this.boardSize)
            let board = new Board(randTiles, {x:this.axis.x, y:this.axis.y})
            board.on('row', () => {
                this.emit('win', (this.boardOfPlayers.get(board)))
            })
            this.boards.set(player, board)
            this.boardOfPlayers.set(board, player)
        })
        this.emit('gameStarted', )
    }

    _genRandomTiles(num) {
        let usedIndexes = new Set()
        let tiles = []
        let count = 0
        while (count < num) {
            let randNum = getRandomInt(this.tiles.length)
            if (!usedIndexes.has(randNum)) {
                tiles.push(this.tiles[randNum])
                usedIndexes.add(randNum)
                count++
            }
        }
    }

    get lastError() {
        let error = this._lastError
        this.lastError = null
        return error
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }