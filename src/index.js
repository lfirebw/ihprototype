import Phaser from 'phaser'
import MainMenu from './assets/scenes/Mainmenu'
import Testgame from './assets/scenes/Testgame'

const config = {
    type: Phaser.AUTO,
    title: "Invader House",
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#000000",
    physics: {
        default: 'arcade'
    }
}

const game = new Phaser.Game(config)

game.scene.add('Testgame', Testgame);
game.scene.add('Mainmenu', MainMenu);
game.scene.start('Mainmenu')

