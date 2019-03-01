module.exports = class Tile {
    constructor(password, question) {
        this.password = password
        this.question = question
    }

    validate(validation) {
        return password === this.password
    }
}