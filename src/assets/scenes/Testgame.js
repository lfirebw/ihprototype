import Phaser from 'phaser'
import Bullet from '../sprites/Bullet'
import Enemy from '../sprites/Enemy'
import statusBar from '../sprites/statusBar'

import imgPlayerIdle from '../img/player.png'
import imgEnemy from '../img/enemy.png'
import imgBullet from '../img/bullet.png'
import imgHealthBar from '../img/healthbar.png'
import imgHealthBarBackground from '../img/healthbar-background.png'

const MAX_PLAYER_SPEED = 200
const ROTATION_PI = Math.PI/2

export default class Testgame extends Phaser.Scene{
    constructor(){
        super({key:'Testgame'})
    }
    preload(){
        //load resources
        this.load.image('player',imgPlayerIdle)
        this.load.image('bullet',imgBullet)
        this.load.image('enemy',imgEnemy)
        this.load.image('healthBar',imgHealthBar)
        this.load.image('healthBarBg',imgHealthBarBackground)
    }
    create(){
        //  Set the camera and physics bounds to be the size of 4x4 bg images
        this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

        //create before to start game
        this.player = this.physics.add.sprite(200,200,'player')
        this.player.setCollideWorldBounds(true)
        this.player.setOrigin(0.5,0.5)
        this.player.body.immovable = true
        
        this.moveKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
        // this.input.keyboard.on("keydown_W", (e) => {
        //     this.player.setVelocityY(-20);
        // })
    
        this.enemys = this.physics.add.group({classType: Enemy, runChildUpdate: true})
        this.enemys.get(200,150,'enemy')
        this.enemys.children.each(child =>{
            child.init({target:this.player})
        })
        this.physics.overlap(this.player,this.enemys,()=>{ console.log("asd") },null,this)
    
        this.bullets = this.physics.add.group({classType: Bullet, runChildUpdate : true})
        this.bulletCooldown = 0

        //UI Health Bar
        var healthBarBg = this.add.sprite(5,5,'healthBarBg')
        healthBarBg.setOrigin(0,0)
        healthBarBg.setScrollFactor(0)
        this.healthBar = new statusBar(this)

        this.healthBar.init('healthBar',5,5)
        this.healthBar.setValue(50)
        
        //config camera
        this.cameras.main.startFollow(this.player)

    }
    update(time,delta){
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
    
        //enemies
        this.enemys.children.each(child =>{
            this.physics.moveToObject(child,this.player,50)
            this.physics.collide(child, this.player);
        })
    
        //fire
        if(this.input.mousePointer.isDown && this.bulletCooldown <= 0){
            const bullet = this.bullets.get().setActive(true).setVisible(true)
            bullet.fire(this.player)
            this.bulletCooldown = 100
        }
    }
}