import "./styles.css";
import images from "../assets/*.png";
//import block from '../assets/block_white.png';
//import flower_red from '../assets/flower_red.png';
//import flower_blue from '../assets/flower_blue.png';

let game;
let blocksize = 60;
let xblocks = 0;
let yblocks = 0;

const gameOptions = {
  manGravity: 0,
  manSpeed: 150
}


window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x7f7f7f,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 720,
        height: 720,
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
      let flowers = [];
      this.scoreText = this.add.text(game.config.width-blocksize, 0, this.score, {fontSize: "34px", fill: "#000000"})

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
      for(let i = 0; i < 5; i++) {
        x = Phaser.Math.Between(1, xblocks-2) * blocksize + blocksize/2;
        y = Phaser.Math.Between(1, yblocks-2) * blocksize + blocksize/2;
//        console.log(x, y);
        this.blueFlowerGroup.create(x, y, "flowerBlue");
        flowers[i] = {x: x, y: y};
      }
      for(let i = 0; i < 5; i++) {
        x = Phaser.Math.Between(1, xblocks-2) * blocksize + blocksize/2;
        y = Phaser.Math.Between(1, yblocks-2) * blocksize + blocksize/2;
//        console.log(x, y);
        this.redFlowerGroup.create(x, y, "flowerRed");
        flowers[5 + i] = {x: x, y: y};
      }
      for(let i = 0; i < 50; i++) {
        x = Phaser.Math.Between(1, xblocks-2) * blocksize + blocksize/2;
        y = Phaser.Math.Between(1, yblocks-2) * blocksize + blocksize/2;
//        console.log(x, y);
        let allowed = true;
        for (let j = 0; j<10; j++) {
          if (x == flowers[j].x && y == flowers[j].y){
            allowed = false;
          }
        }
        if (allowed == true){
          this.blockGroup.create(x, y, "block");
        }
      }
      this.man = this.physics.add.sprite(blocksize/2, blocksize/2, "man");
      this.man.body.gravity.y = gameOptions.manGravity;
      this.physics.add.collider(this.man, this.blockGroup);
      this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectBlueFlower, null, this);
      this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectRedFlower, null, this);
      
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    collectBlueFlower(man, flowerBlue) {
        flowerBlue.disableBody(true, true)
        this.score += 10
        this.scoreText.setText(this.score)
    }
    collectRedFlower(man, flowerRed) {
        flowerRed.disableBody(true, true)
        this.score += 20
        this.scoreText.setText(this.score)
    }

    update() {
      if(this.cursors.left.isDown) {
        this.man.body.velocity.x = -gameOptions.manSpeed
//        this.man.anims.play("left", true)
      }
      else if(this.cursors.right.isDown) {
        this.man.body.velocity.x = gameOptions.manSpeed
//        this.man.anims.play("right", true)
      }
      else if(this.cursors.up.isDown) {
        this.man.body.velocity.y = -gameOptions.manSpeed
//        this.man.anims.play("up", true)
      }
      else if(this.cursors.down.isDown) {
        this.man.body.velocity.y = gameOptions.manSpeed
//        this.man.anims.play("up", true)
      }
      else{
        this.man.body.velocity.x = 0;
        this.man.body.velocity.y = 0;
      }

/*        if(this.cursors.up.isDown && this.man.body.touching.down) {
            this.man.body.velocity.y = -gameOptions.dudeGravity / 1.6
        }

        if(this.man.y > game.config.height || this.man.y < 0) {
            this.scene.start("PlayGame")
        }
*/

    }


}
