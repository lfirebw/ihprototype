import Phaser, { Physics } from 'phaser'
import Bullet from '../sprites/Bullet'
import Enemy from '../sprites/Enemyv2'
import statusBar from '../sprites/statusBar'

import imgPlayerIdle from '../img/player.png'
import imgEnemy from '../img/enemy.png'
import imgBullet from '../img/bullet.png'
import imgHealthBar from '../img/healthbar.png'
import imgHealthBarBackground from '../img/healthbar-background.png'
import Player from '../sprites/Player'

const MAX_PLAYER_SPEED = 3
const ROTATION_PI = Math.PI/2

export default class TestgameDos extends Phaser.Scene{
    constructor(){
        super({
            key:'TestgameDos',physics: {
                matter: { debug:true }
            }
        })
    }
    preload(){
        //load resources
        this.load.image('player',imgPlayerIdle)
        this.load.image('bullet',imgBullet)
        this.load.image('enemy',imgEnemy)
    }
    create(){
        //  Set the camera and physics bounds to be the size of 4x4 bg images
        // this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
        // this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);
        
        this.matter.world.setBounds().disableGravity();

        //keywords
        this.moveKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })

        //Groups
        this.players = new Phaser.GameObjects.Group(this,{classType:Player,name:"Player"})
        this.enemies = new Phaser.GameObjects.Group(this,{classType:Enemy,name:"Enemy"})
        // make player
        let _payer = this.players.get(300,400,'player')
        // make enemy
        this.enemies.get(600,500,'enemy')
        this.enemies.children.each(child =>{ child.setTarget(_payer) })
    }
    update(time,delta){
        this.input.mousePointer.updateWorldPoint(this.cameras.main);
        this.mouseX = this.input.mousePointer.worldX;
        this.mouseY = this.input.mousePointer.worldY;
        
        this.players.children.each(child =>{ child.update(time,delta) })
        this.enemies.children.each(child =>{ child.update(time,delta) })
        
        //fire
        if(this.input.mousePointer.isDown && this.bulletCooldown <= 0){
            //do it
        }
    }
}