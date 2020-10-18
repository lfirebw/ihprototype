import Phaser from 'phaser'
import MainMenu from './assets/scenes/Mainmenu'
import Testgame from './assets/scenes/Testgame'
import TestgameDos from './assets/scenes/TestgameDos'
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin"

const config = {
    type: Phaser.AUTO,
    title: "Invader House",
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#000000",
    physics: {
        default: 'arcade',
        arcade:{
            debug:true
        }
    },
    plugins: {
        scene: [
            {
            plugin: PhaserMatterCollisionPlugin, // The plugin class
            key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
            mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
            }
        ]
    }
}

const game = new Phaser.Game(config)

game.scene.add('Testgame', Testgame);
game.scene.add('TestgameDos', TestgameDos);
game.scene.add('Mainmenu', MainMenu);
game.scene.start('Mainmenu')

