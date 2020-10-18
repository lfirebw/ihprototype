import Phaser from 'phaser'

const MAX_SPEED = 50
const ROTATION_PI = Math.PI/2
var _scene = null
var angle = 0
export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,texture)
        this.setOrigin(0.5, 0.5)
        this.target = null
        this.typeObject = 'Enemy'
        this.attackZone = this.scene.add.zone(this.x,this.y + 50,60,60).setOrigin(0.5,0.5)
        // this.scene.physics.world.enable(this.attackZone,0)
        // this.attackZone.body.setAllowGravity(false)
        // this.parentContainer.add(this.scene.add.zone(this.x,this.y + 50,60,60).setOrigin(0.5,0.5))
        // this.container = this.scene.add.container(x,y,this)
        // this.container.add(this)
    }

    get currenttarget() { return this.target }
    set currenttarget(obj) { this.target = obj }
    
    init(options){
        this.target = options.target
        this.body.collideWorldBounds = true
        this.body.bounce.setTo(1, 1)
        this.scene.physics.add.collider(this,this.target,this.onHit())
        // console.log(this.parentContainer)
        // this.attackZone.angle = -45
        // this.attackZone.body.angle = -45
    }

    update(time,delta){
        if(!this.target) return false
        const tx = this.target.x
        const ty = this.target.y
        const rotation = Phaser.Math.Angle.Between(this.x,this.y,tx,ty)
        this.setRotation(rotation + ROTATION_PI)
        this.scene.physics.moveToObject(this,this.target,MAX_SPEED)
        
        // this.attackZone.setRotation(rotation + ROTATION_PI)
        // this.attackZone.x = this.x + (50 * Math.cos(this.angle / 180))
        // this.attackZone.y = this.y + (50 * Math.sin(this.rotation))
        // Phaser.Math.RotateAroundDistance(this.attackZone, this.x, this.y, 0.1, 50);
        // angle = Phaser.Math.Angle.Wrap(angle + 0.02);
        
    }
    onHit(){
        //hit player
    }
}