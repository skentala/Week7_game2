import "./styles.css";
import images from "../assets/*.png";
//import block from '../assets/block_white.png';
//import flower_red from '../assets/flower_red.png';
//import flower_blue from '../assets/flower_blue.png';

let game;
let blocksize = 60;
let xblocks = 0;
let yblocks = 0;

window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x7f7f7f,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 600,
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: PlayGame
  };
  
  game = new Phaser.Game(gameConfig);
  xblocks = game.config.width / blocksize;
  yblocks = game.config.height / blocksize;
  window.focus();
}


class PlayGame extends Phaser.Scene {

    constructor() {
        super("PlayGame")
        this.score = 0;
    }

    preload() {
      this.load.image("block", require("../assets/block_white.png"));
      this.load.image("flowerBlue", require("../assets/flower_blue.png"));
      this.load.image("flowerRed", require("../assets/flower_red.png"));
//      this.load.image("man", require("../assets/man2.png"));
      this.load.spritesheet("man", require("../assets/man2.png"), { frameWidth: 60, frameHeight: 60 });
//      this.load.spritesheet("dude", "assets/dude.png", {frameWidth: 32, frameHeight: 48})
    }

    create() {
      this.scoreText = this.add.text(game.config.width-blocksize/2, 0, this.score, {fontSize: "34px", fill: "#000000"})

//      this.add.image(blocksize/2, blocksize/2, "man")
      this.blockGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      })
      this.blueFlowerGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      })
      this.redFlowerGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      })
      let x, y;
      for(let i = 0; i < 50; i++) {
        x = Phaser.Math.Between(0, xblocks) * blocksize + blocksize/2;
        y = Phaser.Math.Between(0, yblocks) * blocksize + blocksize/2;
//        console.log(x, y);
        this.blockGroup.create(x, y, "block");
      }
      for(let i = 0; i < 5; i++) {
        x = Phaser.Math.Between(0, xblocks) * blocksize + blocksize/2;
        y = Phaser.Math.Between(0, yblocks) * blocksize + blocksize/2;
//        console.log(x, y);
        this.blueFlowerGroup.create(x, y, "flowerBlue");
      }
      for(let i = 0; i < 5; i++) {
        x = Phaser.Math.Between(0, xblocks) * blocksize + blocksize/2;
        y = Phaser.Math.Between(0, yblocks) * blocksize + blocksize/2;
//        console.log(x, y);
        this.redFlowerGroup.create(x, y, "flowerRed");
      }
      this.man = this.physics.add.sprite(blocksize/2, blocksize/2, "man");
      this.man.body.gravity.y = gameOptions.dudeGravity;
      this.physics.add.collider(this.man, this.blockGroup);
      this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectBlueFlower, null, this);
      this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectRedFlower, null, this);
      
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    collectBlueFlower(man, flowerBlue) {
        flowerBlue.disableBody(true, true)
        this.score += 1
        this.scoreText.setText(this.score)
    }
    collectRedFlower(man, flowerRed) {
        flowerRed.disableBody(true, true)
        this.score += 1
        this.scoreText.setText(this.score)
    }



}
