const Game = require('../game/Game')
const Tile = require('../game/Tile')


class testValidation {
    validate(validation) {
        return true
    }
}


let gameKey = '12345'
let gameName = 'testGame'
let axis = {x : 5, y : 5}

let game = new Game(gameKey, gameName, axis)

for (let i = 0; i < 35; i++) {
    let player = game.createPlayer('player' + i)
    player.on('won', () => {
        console.log('' + player.name + 'Won! ')
    })
    let tile = new Tile('I am #' + i, new testValidation())
    game.addPlayer(player, tile)
}
game.start()

let players = game.players

let player = players[0]
console.log(player.name)

for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
        console.log('(' + x + ', ' + y + ')')
        player.board.selectTile({x : x, y : y})
    }
}


