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
        //init text
        this.lbltexts = {
            lblTitle: this.add.text(100,200,"Welcome to prototype of InvaderHouse 2D"),
            lblStart: this.add.text(100,250,"Start prototype"),
            lblStartMetter: this.add.text(100,300,"Start prototype v2")
        }
        //text configurations
        this.lbltexts.lblStart.setInteractive({useHandCursor: true})
        this.lbltexts.lblStart.setFontSize(24);
        this.lbltexts.lblStart.fontWeight = 'bold';
        this.lbltexts.lblStart.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 5);
        
        this.lbltexts.lblStartMetter.setInteractive({useHandCursor: true}).setFontSize(24).setShadow(-5, 5, 'rgba(0,0,0,0.5)', 5)
        this.lbltexts.lblStartMetter.fontWeight = 'bold'
        //events
        this.lbltexts.lblStart.on('pointerdown',()=>{this.onStartButton(1)})
        this.lbltexts.lblStartMetter.on('pointerdown',()=>{this.onStartButton(2)})
    }
    update(time,delta){

    }

    onStartButton(t){
        let sceneString = 'Testgame'
        switch(t){
            case 1: sceneString = 'Testgame'
            break;
            case 2: sceneString = 'TestgameDos'
            break;
        }
        this.scene.switch(sceneString)
    }
}