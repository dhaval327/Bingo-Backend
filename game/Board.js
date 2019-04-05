const EventEmitter = require('events')
module.exports = class Board extends EventEmitter {
    constructor(tiles, axis) {
        super()
        if ((axis.x * axis.y) != tiles.length) {
            return null
        }
        this.size = axis.x * axis.y
        this._completionTable = {
            rows : new Map(),
            columns : new Map(),
            diagonals : new Map()
        }
        this._completionTable.diagonals.set(0, 0)
        this._completionTable.diagonals.set(1, 0)
        this.axis = axis
        this.grid = new Array(this.axis.y)
        for (let y = 0; y < this.axis.y; y++) {
            this.grid[y] = new Array(this.axis.x)
        }
        for (let y = 0; y < this.axis.y; y++) {
            this._completionTable.rows.set(y, 0)
            for (let x = 0; x < this.axis.x; x++) {
                this._completionTable.columns.set(x, 0)
                let tile = tiles.pop()
                this.grid[y][x] = tile
            }
        }
    }

    get tiles() {
        
    }

    selectTile(coords, validation) {
        if (coords.x <= this.axis.x && coords.x >= 0 && coords.y <= this.axis.y && coords.y >= 0) {
            if (this.grid[coords.y][coords.x].blackout(validation)) {
                this._setCompletionTable(coords)
            }
        }
    }

    _setCompletionTable(coords) {
        const setCol = () => {
            let num = this._completionTable.columns.get(coords.x) + 1
            this._completionTable.columns.set(coords.x, num)
        }

        const setRow = () => {
            let num = this._completionTable.rows.get(coords.y) + 1
            this._completionTable.rows.set(coords.y, num)
        }

        const setDiaginal = () => {
            if (coords.x === coords.y) {
                let num = this._completionTable.diagonals.get(0) + 1
                this._completionTable.diagonals.set(0, num)
                return 0
            } else if (coords.x + coords.y === this.axis.x) {
                let num = this._completionTable.diagonals.get(1) + 1
                this._completionTable.diagonals.set(1, num)
                return 1
            }
            return null
        }

        setCol()
        setRow()
        let diagonal = setDiaginal()

        if (this._completionTable.columns.get(coords.x) === this.axis.x ||
        this._completionTable.rows.get(coords.y) === this.axis.y || 
        (diagonal != null && this._completionTable.diagonals.get(diagonal) === this.axis.x)) {
            this.emit('bingo')
        }
    }
}
