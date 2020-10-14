import Phaser from 'phaser'

const MAX_SPEED = 50
const ROTATION_PI = Math.PI/2
var _scene = null
export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture)
        this.setOrigin(0.5, 0.5)
        this.target = null
        this.typeObject = 'Enemy'
    }

    get currenttarget() { return this.target }
    set currenttarget(obj) { this.target = obj }
    
    init(options){
        this.target = options.target
        this.body.collideWorldBounds = true
        this.body.bounce.setTo(1, 1)
        this.scene.physics.add.collider(this,this.target,this.onHit())
    }

    update(time,delta){
        if(!this.target) return false
        const tx = this.target.x
        const ty = this.target.y
        const rotation = Phaser.Math.Angle.Between(this.x,this.y,tx,ty)
        this.setRotation(rotation + ROTATION_PI)
        this.scene.physics.moveToObject(this,this.target,MAX_SPEED)
        console.log(this.rotation, this.getParentRotation())
    }
    onHit(){
        //hit player
    }
}