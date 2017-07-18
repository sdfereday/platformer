import Phaser from 'phaser';

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
    this.game.load.image('ground', './assets/gfx/ground.png');
    this.game.load.image('player', './assets/gfx/player.png');
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
    this.player = this.game.add.sprite(this.game.width / 2, this.game.height - 64, 'player');

    // Enable physics on the player
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    // Make player collide with world boundaries so he doesn't leave the stage
    this.player.body.collideWorldBounds = true;

    // Set player minimum and maximum movement speed
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); // x, y

    // Add drag to the player that slows them down when they are not accelerating
    this.player.body.drag.setTo(this.DRAG, 0); // x, y

    // Since we're jumping we need gravity
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    // Flag to track if the jump button is pressed
    this.jumping = false;

    // Create some ground for the player to walk on
    this.ground = this.game.add.group();
    for (let x = 0; x < this.game.width; x += 32) {
      // Add the ground blocks, enable physics on each, make them immovable
      let groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
      this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
      groundBlock.body.immovable = true;
      groundBlock.body.allowGravity = false;
      this.ground.add(groundBlock);
    }

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