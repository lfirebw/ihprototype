import Phaser from 'phaser'

const MAX_SPEED = 200
const ROTATION_PI = Math.PI/2

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture)
        this.setOrigin(0.5, 0.5)
        this.target = null
    }

    get currenttarget() { return this.target }
    set currenttarget(obj) { this.target = obj }
    
    init(options){
        this.target = options.target
        this.body.collideWorldBounds = true
        this.body.bounce.setTo(1, 1)
    }

    update(time,delta){
        if(!this.target) return false
        const tx = this.target.x
        const ty = this.target.y
        const rotation = Phaser.Math.Angle.Between(this.x,this.y,tx,ty)
        this.setRotation(rotation + ROTATION_PI)
    }
}