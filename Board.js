const EventEmitter = require('events')
module.exports = class Board extends EventEmitter {
    constructor(tiles, axis) {
        if ((axis.x * axis.y) != tiles.length) {
            return null
        }
        this.tiles = new Map()
        let curIndex = 0
        for (let y = 0; y < axis.y; y++) {
            for (let x = 0; x < axis.x; x++) {
                this.tiles.set(tiles[curIndex], {
                    coords : {x:x, y:y},
                    blackedOut : false
                })
                curIndex++
            }
        }
    }

    selectTile(tile, validation) {
        if (tile.validate(validation)) {
            this.tiles.get(tile).blackedOut = true
            this.emit('tileBlackedOut', tile)
        } else {
            this.emit('error', 'tileNotOnBoard')
        }
    }
}
