import Phaser from 'phaser'
import Bullet from './assets/sprites/Bullet'

import imgPlayerIdle from './assets/img/player.png'
import imgEnemy from './assets/img/enemy1_idle.png'
import imgBullet from './assets/img/bullet.png'


const config = {
    type: Phaser.AUTO,
    title: "Invader House",
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#000000",
    physics: {
        default: 'arcade'
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    }
}
const MAX_PLAYER_SPEED = 200
const ROTATION_PI = Math.PI/2

const game = new Phaser.Game(config)

function preload(){
    //load resources
    this.load.image('player',imgPlayerIdle)
    this.load.image('bullet',imgBullet)
    // this.load.image('enemy',imgEnemy)
}
function create(){
    //create before to start game
    this.player = this.physics.add.sprite(200,200,'player')
    this.player.setCollideWorldBounds(true)
    this.player.setOrigin(0.5,0.5)
    // this.enemy = this.physics.add.sprite(500,200,'enemy')
    // this.enemy.setCollideWorldBounds(true)
    // this.enemy.setOrigin(0,0)

    this.moveKeys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    // this.input.keyboard.on("keydown_W", (e) => {
    //     this.player.setVelocityY(-20);
    // })

    this.bullets = this.physics.add.group({classType: Bullet, runChildUpdate : true})
    this.bulletCooldown = 0
}
function update(time,delta){
    // bucle game
    this.input.mousePointer.updateWorldPoint(this.cameras.main);
    this.mouseX = this.input.mousePointer.worldX;
    this.mouseY = this.input.mousePointer.worldY;
    let agleToMousePosition = Phaser.Math.Angle.Between(this.player.x,this.player.y,this.mouseX,this.mouseY)
    
    this.player.rotation = (agleToMousePosition+ROTATION_PI)
    
    this.player.setVelocityY(0)
    this.player.setVelocityX(0)

    if (this.bulletCooldown > 0) {
        // Reduce bullet cooldown
        this.bulletCooldown -= delta
    }

    //moving
    if(this.moveKeys.up.isDown){
        this.player.setVelocityY(-MAX_PLAYER_SPEED)
    }else if(this.moveKeys.down.isDown){
        this.player.setVelocityY(MAX_PLAYER_SPEED)
    }
    if(this.moveKeys.left.isDown){
        this.player.setVelocityX(-MAX_PLAYER_SPEED)
    } else if(this.moveKeys.right.isDown){
        this.player.setVelocityX(MAX_PLAYER_SPEED)
    }
    this.player.body.velocity.normalize().scale(MAX_PLAYER_SPEED)

    //fire
    if(this.input.mousePointer.isDown && this.bulletCooldown <= 0){
        const bullet = this.bullets.get().setActive(true).setVisible(true)
        bullet.fire(this.player)
        this.bulletCooldown = 100
    }
}

