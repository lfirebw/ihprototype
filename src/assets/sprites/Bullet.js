import Phaser from 'phaser'

const BULLET_SPEED = 800
const ROTATION_BULLET_PI = Math.PI/2

export default class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'bullet')
        this.born = 0

    }
    fire(shooter){
        
        this.setRotation(shooter.rotation - ROTATION_BULLET_PI)
        this.x = shooter.x + (50 * Math.cos(this.rotation))
        this.y = shooter.y + (50 * Math.sin(this.rotation))

        this.setVelocityX(BULLET_SPEED * Math.cos(Math.PI * this.angle / 180))
        this.setVelocityY(BULLET_SPEED * Math.sin(Math.PI * this.angle / 180))

        this.born = 0
        this.scene.physics.add.overlap(this,this.scene.enemys,(bullet,object)=>{
            this.onHit(object)
        })
    }
    update(time,delta){
        this.born += delta
        if(this.born > 1500){
            this.destroy()
        }
        //     this.physics.collide(child, this.player,this.hitenemy,null,this);
    }
    onHit(obj){
        if(obj.typeObject.toLowerCase() == 'enemy'){
            obj.destroy()
        }
        this.destroy()
    }
}