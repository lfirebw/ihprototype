import Phaser from 'phaser'

export default class statusBar extends Phaser.GameObjects.Group {
    constructor(game){
        super(game)
        this.bar = null
    }
    init(barname,x=0,y=0){
        this.bar = this.create(x,y,barname)
        this.bar.setOrigin(0,0)
        this.bar.setScrollFactor(0)

    }
    setValue(value){
        value = value == null ? 0 : value;
        this.bar.displayWidth = 250 * (value / 100)   
    }
    getValue(){ return (this.bar.displayWidth * 100) / 250 }
}