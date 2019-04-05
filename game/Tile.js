const EventEmitter = require('events')
module.exports = class Tile extends EventEmitter {
    constructor(fact, validator) {
        super()
        this.fact = fact
        this.blackedout = false
        this._validator = validator
    }

    blackout(validation) {
        if (this.validate(validation)) {
            this.blackedout = true
            this.emit('blackedOut')
            return true
        }
        return false
    }
    
/*bool*/
    validate(validation) {
        return this._validator.validate(validation)
    }
}