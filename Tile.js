module.exports = class Tile {
    constructor(question) {
        this.question = question
    }

    validate(validation) {
        return validation.validate()
    }
}