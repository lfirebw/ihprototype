import Phaser from 'phaser'
import {ENEMY_STATE} from '../globalvars/EnemyState'
import {TYPE_OBJECT} from '../globalvars/TypeObject'

const MAX_SPEED = 1
const ROTATION_PI = Math.PI/2


const velocityToTarget = (from, to, speed = 1) => {
    const direction = Math.atan((to.x - from.x) / (to.y - from.y));
    const speed2 = to.y >= from.y ? speed : -speed;
   
    return { velX: speed2 * Math.sin(direction), velY: speed2 * Math.cos(direction) };
};
var coll = false

export default class Enemyv2 extends Phaser.Physics.Matter.Sprite{
    constructor(scene,x,y,texture){
        super(scene.matter.world,x,y,texture)
        this.params = {
            target: null,
            type: TYPE_OBJECT.ENEMY,
            currentState: ENEMY_STATE.RUN_PLAYER
        }
        
        this.initialize()
    }
    setTarget(t){
        this.params.target = t
        this.setOnCollideWith(this.params.target,pair=>{
            console.log(pair,"pam")
        })
    }
    initialize(target){
        try{
            let Bodies = Phaser.Physics.Matter.Matter.Bodies
            let BodyEnemy = Bodies.circle(600,500,32)
            let zoneAttackBody = Bodies.rectangle(600,460,25,25,{isSensor:true,label:'hitAttack1'})
            let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
                parts: [ BodyEnemy,zoneAttackBody ],
                inertia: Infinity
            })

            this.setExistingBody(compoundBody)
            this.setOrigin(0.5, 0.5)
            this.setIgnoreGravity(true)

            this.scene.matterCollision.addOnCollideStart({
                objectA: zoneAttackBody,
                callback: eventData => {
                    const { bodyB, gameObjectB } = eventData;

                    if(bodyB.label.toLowerCase() == 'player'){
                        this.params.currentState = ENEMY_STATE.ATTACK
                        this.setVelocity(0,0)
                    }
                }
            });
            this.scene.matterCollision.addOnCollideEnd({
                objectA: zoneAttackBody,
                callback: eventData => {
                    const { bodyB, gameObjectB } = eventData;

                    if(bodyB.label.toLowerCase() == 'player'){
                        this.params.currentState = ENEMY_STATE.RUN_PLAYER
                    }
                }
            });
        }catch(error){
            alert("Error at initialize Enemyv2 ", error.toString())
            console.error(error)
        }
    }
    update(t,dt){
        //do it
        const tx = this.params.target.x
        const ty = this.params.target.y
        const rotation = Phaser.Math.Angle.Between(this.x,this.y,tx,ty)
        this.setRotation(rotation + ROTATION_PI)
        
        if(this.params.currentState === ENEMY_STATE.RUN_PLAYER){
            let v = velocityToTarget(this,this.params.target,MAX_SPEED)
            this.setVelocity(v.velX,v.velY)
        }

    }
    onHit(){
        //hit player
    }
}