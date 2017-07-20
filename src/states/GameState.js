import mix from '../helpers/Mixin';
import Phaser from 'phaser';
import EntityFactory from '../factories/EntityFactory';
import MapMaker from '../level/MapMaker';
import MapHelpers from '../helpers/MapHelpers';
import Player from '../entities/user/Player';
import Bug from '../entities/npcs/Bug';

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
    this.game.load.image('bug', './assets/gfx/bug.png');

    // The various amounts of game data used
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
    this.MAX_SPEED = 250; // pixels/second
    this.ACCELERATION = 2500; // pixels/second/second
    this.DRAG = 1500; // pixels/second
    this.GRAVITY = 2600; // pixels/second/second
    this.JUMP_SPEED = -500; // pixels/second (negative y is up)

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

    // Create some groups to house the tiles / pickups, etc
    this.ground = this.game.add.group();
    this.enemies = this.game.add.group();
    this.pickups = this.game.add.group();

    // Retrieve the levels map data and set the tile scaling
    let mapData = this.game.cache.getJSON('mapdata-sandbox');
    let tileSize = 32;

    // Now we can generate the map
    let levelMap = MapMaker.create(mapData, tileSize);
    this.placeEntities(levelMap, tileSize);

    // Place an enemy (will streamline more later)
    let bugProps = this.game.cache.getJSON('enemies').find(x => x.id === 'bug').properties;
    let bug = new Bug({
      game: this.game,
      x: this.game.width / 2,
      y: this.game.height - 64,
      name: 'bug',
      target: this.player,
      properties: bugProps
    });

    this.enemies.add(bug);

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

  placeEntities(mapData, tileSize) {

    let tilex = 0;
    let tiley = 0;
    let tilen = 0;

    /*
    (Assuming I don't care about following graphical tile maps, and just use them for placement)
    I guess by using neighbour aware tiles, will need to store the number on said area
    in a similar way to what's being done already. Also, for things like destructible or coin tiles,
    it'll need to generate in the same way (unless otherwise specified).
    The map will have the number already generated. Ok so we're going to need a layering system I believe.

    // If tile is equal to 1, it's a standard tile.
    // If tile is equal to 2, it's a coin tile and it'll blow up after 'x' hits.
    // etc, etc

    To score, we simple do:
    above: x - mapWidth
    right: x + 1
    below: x + mapWidth
    left: x - 1

    */

    // First off, we have to place the areas in which tiles will exist (includes coin tile types)
    for (let x = 0; x < mapData.area; x += 1) {

      // https://phaser.io/examples/v2/tilemaps/blank-tilemap
      tilex += 1;

      if (x % mapData.width === 0) {
        tiley += 1;
        tilex = 0;
      }

      /// DEBUG
      let t = document.createElement('div');
      t.style.position = 'absolute';
      t.style.left = tilex * tileSize + 'px';
      t.style.top = tiley * tileSize + 'px';
      t.style.width = tileSize + 'px';
      t.style.height = tileSize + 'px';
      t.style.border = '1px solid #ccc';

      // If the tile is actually occupied by a block, then we care about its neighbours, otherwise ignore.
      // You technically use this to place decor on top of the tile also (if you're feeling brave)!
      // You can also mix it up a bit with random tile picks of the same set, or of course, you could do away
      // with auto-tiling altogether and give it a more manual feel.
      if (mapData.atIndex(x) > 0) {

        /// DEBUG
        t.style.backgroundColor = "#333";

        /* We find out current 'x' to map directly to tile in mapCache */
        let above = mapData.atIndex(x - mapData.width);
        let below = mapData.atIndex(x + mapData.width);
        let right = mapData.atIndex(x + 1);
        let left = mapData.atIndex(x - 1);

        tilen = MapHelpers.generateTileScore(above, right, below, left);

        t.innerHTML = tilen;

        // We know there's a tile here (standard, not coin-type, will get to that),
        // so we can map a score against it.
        // if (mapData.atIndex(x) === 1) {

        let groundBlock = EntityFactory.create({
          type: 0,
          game: this.game,
          x: tilex * tileSize,
          y: tiley * tileSize,
          name: 'ground' // <- It's at this point you need to pick the right 'tile' to use.
        });

        this.ground.add(groundBlock);

      } else {

        tilen = 0;

      }

      document.getElementById('container').appendChild(t);

    }

    // Map out the various blocks on the map with its data
    // for (let x = 0; x < mapData.area; x += 1) {

    //   tilex += 1;

    //   if (x % mapData.width === 0) {
    //     tiley += 1;
    //     tilex = 0;
    //   }

    //   if (mapData.atIndex(x) === 1) {

    //     let groundBlock = EntityFactory.create({
    //       type: 0,
    //       game: this.game,
    //       x: tilex * tileSize,
    //       y: tiley * tileSize,
    //       name: 'ground' // <- It's at this point you need to pick the right 'tile' to use.
    //     });

    //     this.ground.add(groundBlock);

    //   }

    //   if (mapData.atIndex(x) === 2) {

    //     let groundBlock = EntityFactory.create({
    //       type: 1,
    //       game: this.game,
    //       x: tilex * tileSize,
    //       y: tiley * tileSize,
    //       name: 'ground'
    //     });

    //     this.ground.add(groundBlock);

    //   }

    //   if (mapData.atIndex(x) === 3) {

    //     let healthPickup = EntityFactory.create({
    //       type: 2,
    //       game: this.game,
    //       x: tilex * tileSize,
    //       y: tiley * tileSize,
    //       name: 'health'
    //     });

    //     this.pickups.add(healthPickup);

    //   }

    // }

  }

  // This function draws horizontal lines across the stage
  drawHeightMarkers() {
    // Create a bitmap the same size as the stage
    let bitmap = this.game.add.bitmapData(this.game.width, this.game.height);

    // These functions use the canvas context to draw lines using the canvas API
    for (let y = this.game.height - 20; y >= 0; y -= 32) {
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

    // Collide layers and players
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.enemies, this.ground);

    // Collide the player with pickups
    this.game.physics.arcade.overlap(this.player, this.pickups, (a, b) => b.kill());

    // Reset velocity counter (to avoid overrun)
    //this.player.body.velocity.x = 0;

    if (this.leftInputIsActive()) {
      // If the LEFT key is down, set the player velocity to move left
      this.player.body.acceleration.x = -this.ACCELERATION;
      //this.player.body.velocity.x = -this.ACCELERATION;
    } else if (this.rightInputIsActive()) {
      // If the RIGHT key is down, set the player velocity to move right
      this.player.body.acceleration.x = this.ACCELERATION;
      //this.player.body.velocity.x = this.ACCELERATION;
    } else {
      this.player.body.acceleration.x = 0;
      //this.player.body.velocity.x = 0;
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