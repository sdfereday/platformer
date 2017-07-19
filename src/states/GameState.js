import mix from '../helpers/Mixin';
import Phaser from 'phaser';
import BlockFactory from '../factories/BlockFactory';
import MapMaker from '../level/MapMaker';
import Player from '../entities/user/Player';

// class BaseClass {
//   // ...
// }

// // Some amazing class 
// class MyCollection extends mix(BaseClass).with(/* ... */) {
//   // I have access to both the prototypal method above, and the other 'useful' bits in the mixins <3
// }

/// https://gamemechanicexplorer.com/#platformer-6
// At this point GameState doesn't really need to extend anything, it's more Sprites and things that should.
class GameState {

  constructor(game) {
    // ... If it isn't already...
    this.game = game;
  }

  // Prototypal methods
  // Load images and sounds
  preload() {

    // Differs per level
    let levelConf = {
      groundTile: './assets/gfx/ground.png',
      mapData: './assets/mapdata/sandbox.json'
    }

    // Some media to play with
    this.game.load.image('ground', levelConf.groundTile);
    this.game.load.image('player', './assets/gfx/player.png');

    // The various amounts of game data used
    this.game.load.json('gambits', './assets/gamedata/gambits.json');
    this.game.load.json('enemies', './assets/gamedata/enemies.json');
    this.game.load.json('items', './assets/gamedata/items.json');

    // Map data (sandbox is all we have right now)
    this.game.load.json('mapdata-sandbox', levelConf.mapData);

  }

  // Setup the example
  create() {
    // Set stage background to something sky colored
    this.game.stage.backgroundColor = 0x4488cc;

    // Define movement constants
    this.MAX_SPEED = 500; // pixels/second
    this.ACCELERATION = 1500; // pixels/second/second
    this.DRAG = 600; // pixels/second
    this.GRAVITY = 2600; // pixels/second/second
    this.JUMP_SPEED = -700; // pixels/second (negative y is up)

    // Create a player sprite
    this.player = new Player({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height - 64,
      name: 'player',
      MAX_SPEED: this.MAX_SPEED,
      DRAG: this.DRAG
    });

    // Since we're jumping we need gravity
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    // Flag to track if the jump button is pressed
    this.jumping = false;

    // Create some ground for the player to walk on
    this.ground = this.game.add.group();

    // Retrieve the levels map data and set the tile scaling
    let mapData = this.game.cache.getJSON('mapdata-sandbox');
    let tileSize = 32;

    // Now we can generate the map
    let levelMap = MapMaker.create(mapData, tileSize);
    this.placeBlocks(levelMap, tileSize);

    // Capture certain keys to prevent their default actions in the browser.
    // This is only necessary because this is an HTML5 game. Games on other
    // platforms may not need code like this.
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ]);

    // Just for fun, draw some height markers so we can see how high we're jumping
    this.drawHeightMarkers();
  }

  placeBlocks(mapData, tileSize) {

    let tilex = 0;
    let tiley = 0;

    // Map out the various blocks on the map with its data
    for (let x = 0; x < mapData.area; x += 1) {

      tilex += 1;

      if (x % mapData.width === 0) {
        tiley += 1;
        tilex = 0;
      }

      if (mapData.atIndex(x) > 0) {

        let groundBlock = BlockFactory.create({
          game: this.game,
          x: tilex * tileSize,
          y: tiley * tileSize,
          name: 'ground'
        });

        this.ground.add(groundBlock);

      }

    }

  }

  // This function draws horizontal lines across the stage
  drawHeightMarkers() {
    // Create a bitmap the same size as the stage
    let bitmap = this.game.add.bitmapData(this.game.width, this.game.height);

    // These functions use the canvas context to draw lines using the canvas API
    for (let y = this.game.height - 32; y >= 64; y -= 32) {
      bitmap.context.beginPath();
      bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      bitmap.context.moveTo(0, y);
      bitmap.context.lineTo(this.game.width, y);
      bitmap.context.stroke();
    }

    this.game.add.image(0, 0, bitmap);
  }

  // The update() method is called every frame
  update() {
    // Collide the player with the ground
    this.game.physics.arcade.collide(this.player, this.ground);

    if (this.leftInputIsActive()) {
      // If the LEFT key is down, set the player velocity to move left
      this.player.body.acceleration.x = -this.ACCELERATION;
    } else if (this.rightInputIsActive()) {
      // If the RIGHT key is down, set the player velocity to move right
      this.player.body.acceleration.x = this.ACCELERATION;
    } else {
      this.player.body.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    let onTheGround = this.player.body.touching.down;

    // If the player is touching the ground, let him have 2 jumps
    if (onTheGround) {
      this.jumps = 2;
      this.jumping = false;
    }

    // Jump! Keep y velocity constant while the jump button is held for up to 150 ms
    if (this.jumps > 0 && this.upInputIsActive(150)) {
      this.player.body.velocity.y = this.JUMP_SPEED;
      this.jumping = true;
    }

    // Reduce the number of available jumps if the jump input is released
    if (this.jumping && this.upInputReleased()) {
      this.jumps--;
      this.jumping = false;
    }
  }

  // This function should return true when the player activates the "go left" control
  // In this case, either holding the right arrow or tapping or clicking on the left
  // side of the screen.
  leftInputIsActive() {
    let isActive = false;
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    return isActive;
  }

  // This function should return true when the player activates the "go right" control
  // In this case, either holding the right arrow or tapping or clicking on the right
  // side of the screen.
  rightInputIsActive() {
    let isActive = false;
    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    return isActive;
  }

  // This function should return true when the player activates the "jump" control
  // In this case, either holding the up arrow or tapping or clicking on the center
  // part of the screen.
  upInputIsActive(duration) {
    let isActive = false;
    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
    return isActive;
  }

  // This function returns true when the player releases the "jump" control
  upInputReleased() {
    let released = false;
    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
    return released;
  }

}

export default GameState;