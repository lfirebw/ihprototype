import Phaser from 'phaser'

import background from '../img/banner_fanpage3.png'

export default class Mainmenu extends Phaser.Scene {
    constructor(){
        super({key:"Mainmenu"})
    }
    preload(){
        console.log("Cargando pre load");
        this.load.image('background',background)
    }
    create(){
        console.log("creando los objetos");
        this.background = this.add.sprite(0,0,'background')
        this.background.setOrigin(0,0)
        this.lbltexts = {
            lblTitle: this.add.text(100,200,"Welcome to prototype of InvaderHouse 2D"),
            lblStart: this.add.text(100,250,"Start prototype")
        }
        this.lbltexts.lblStart.setInteractive({useHandCursor: true})
        this.lbltexts.lblStart.setFontSize(24);
        this.lbltexts.lblStart.fontWeight = 'bold';
        this.lbltexts.lblStart.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 5);
        this.lbltexts.lblStart.on('pointerdown',()=>{this.onStartButton()})
    }
    update(time,delta){

    }

    onStartButton(){
        console.log("Click en start prototype")
        this.scene.switch('Testgame')
    }
}