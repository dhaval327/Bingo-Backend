const EventEmitter = require('events')
module.exports = class Player  {
    constructor(name) {
        this.name = name
        this._board = null
    }
    set board(board) {
        this._board = board
        board.on('bingo', () => {
            this.emit('won')
        })
    }
    get board() {
        return this._board
    }
}