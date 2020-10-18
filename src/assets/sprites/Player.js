import Phaser from 'phaser'

const MAX_PLAYER_SPEED = 3
const ROTATION_PI = Math.PI/2

export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(scene,x,y,texture){
        super(scene.matter.world,x,y,texture)
        scene.add.existing(this);
        this.initialize()
    }
    initialize(){
        this.setOrigin(0.5,0.5)
        this.setBody({type:'circle',radius:45})
        this.body.label = 'player'
        this.setFixedRotation()
    }
    update(t,dt){
        let agleToMousePosition = Phaser.Math.Angle.Between(this.x,this.y,this.scene.mouseX,this.scene.mouseY)
        
        this.rotation = agleToMousePosition + ROTATION_PI

        //moving
        this.setVelocity(0,0)
        if(this.scene.moveKeys.up.isDown){
            this.setVelocityY(-MAX_PLAYER_SPEED)
        }else if(this.scene.moveKeys.down.isDown){
            this.setVelocityY(MAX_PLAYER_SPEED)
        }
        if(this.scene.moveKeys.left.isDown){
            this.setVelocityX(-MAX_PLAYER_SPEED)
        } else if(this.scene.moveKeys.right.isDown){
            this.setVelocityX(MAX_PLAYER_SPEED)
        }
    }
}