const Game = require('./Game')
const Tile = require('./Tile')
let key = '12345'
let name = 'test game'
let axis = {x: 5, y: 5}
let game = new Game(key, name, axis)

let player = game.createPlayer('Ethan')
let tile  = new Tile('whats my name?')
game.addPlayer(player, tile)
console.log(game.players)