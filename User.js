module.exports = class User {
    constructor(name, id, currentConnectionKey) {
        this.name = name
        this.id = id
        this.currentConnectionKey = currentConnectionKey
    }
}