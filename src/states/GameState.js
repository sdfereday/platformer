import TYPES from '../GameTypes';
import mix from '../helpers/Mixin';
import Phaser from 'phaser';
import MapMaker from '../level/MapMaker';
import MapHelpers from '../helpers/MapHelpers';
import ItemFactory from '../factories/ItemFactory';
import CreatureFactory from '../factories/CreatureFactory';
import BlockFactory from '../factories/BlockFactory';
import Player from '../entities/user/Player';

/// Config for game
const gameConfig = {
  hitBounce: -500
};

// Solely for global game data only (save to own json local storage later)
let globalGameData = {
  score: 0
};

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
    };

    // Some media to play with
    this.game.load.image('ground', levelConf.groundTile);
    this.game.load.image('player', './assets/gfx/player.png');
    this.game.load.image('bug', './assets/gfx/bug.png');
    this.game.load.image('life', './assets/gfx/oneup.png');
    this.game.load.image('coin', './assets/gfx/coin.png');
    this.game.load.image('tiles', './assets/tilemaps/tiles/salt-tiles.png');

    // The various amounts of game data used
    this.game.load.json('player', './assets/gamedata/playerData.json');
    this.game.load.json('enemies', './assets/gamedata/enemies.json');
    this.game.load.json('items', './assets/gamedata/items.json');

    // Map data (sandbox is all we have right now)
    this.game.load.json('mapdata-sandbox', levelConf.mapData);

  }

  // Setup the example
  create() {
    // Set stage background to something sky colored
    this.game.stage.backgroundColor = 0x88BBcc;

    // Define movement constants
    this.MAX_SPEED = 250; // pixels/second
    this.ACCELERATION = 2500; // pixels/second/second
    this.DRAG = 1500; // pixels/second
    this.GRAVITY = 2500; // pixels/second/second - note: anything above this causes you to fall through tiles... :/
    this.JUMP_SPEED = -500; // pixels/second (negative y is up)

    // Create a player sprite
    let props = this.game.cache.getJSON('player').properties;
    this.player = new Player({
      game: this.game,
      x: 6 * 32,
      y: 2 * 32,
      name: 'player',
      properties: props,
      MAX_SPEED: this.MAX_SPEED,
      DRAG: this.DRAG
    });

    // Since we're jumping we need gravity
    this.game.physics.arcade.gravity.y = this.GRAVITY;

    // Flag to track if the jump button is pressed
    this.jumping = false;

    // Create some groups to house the tiles / items, etc
    this.ground = this.game.add.group();
    this.enemies = this.game.add.group();
    this.items = this.game.add.group();

    // Retrieve the levels map data and set the tile scaling
    this.game.physics.arcade.TILE_BIAS = 40; // Prevents strange tile fall-through
    let mapData = this.game.cache.getJSON('mapdata-sandbox');
    let tileSize = 32;

    // Now we can generate the map
    let levelMap = MapMaker.create(mapData, tileSize);
    this.generateMap(levelMap, mapData, tileSize);

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

  generateMap(generatedMapData, mapJSON, tileSize) {

    let tilex = 0;
    let tiley = 0;
    let tilen = 0;

    //  Generates CSV data based on the raw map data supplied
    let mapCSV = MapHelpers.generateCSV(generatedMapData);

    //  Add data to the cache
    this.game.cache.addTilemap('dynamicMap', null, mapCSV, Phaser.Tilemap.CSV);

    //  Create our map (the 32x32 is the tile size)
    this.levelTileMap = this.game.add.tilemap('dynamicMap', tileSize, tileSize);

    //  'tiles' = cache image key, 32x32 = tile size
    this.levelTileMap.addTilesetImage('tiles', 'tiles', tileSize, tileSize);

    //  Enable collisions on all tiles on this layer
    this.levelTileMap.setCollisionBetween(0, this.levelTileMap.tiles.length);

    //  0 is important
    this.levelLayer = this.levelTileMap.createLayer(0);

    /// .............. Items
    for (let i = 0; i < mapJSON.items.length; i++) {

      let currentEntity = mapJSON.items[i];
      let props = this.game.cache.getJSON('items').find(x => x.id === currentEntity.id).properties;

      let ent = ItemFactory.create({
        game: this.game,
        x: currentEntity.x * tileSize,
        y: currentEntity.y * tileSize,
        name: currentEntity.name.toLowerCase(),
        properties: props
      });

      this.items.add(ent);

    }

    /// .............. Enemies
    for (let i = 0; i < mapJSON.enemies.length; i++) {

      let currentEntity = mapJSON.enemies[i];
      let props = this.game.cache.getJSON('enemies').find(x => x.id === currentEntity.id).properties;

      let ent = CreatureFactory.create({
        game: this.game,
        x: currentEntity.x * tileSize,
        y: currentEntity.y * tileSize,
        id: currentEntity.id,
        name: currentEntity.name.toLowerCase(),
        target: this.player,
        properties: props
      });

      this.enemies.add(ent);

    }

  }

  update() {

    // Collide layers and players
    this.game.physics.arcade.collide(this.player, this.levelLayer);
    this.game.physics.arcade.collide(this.enemies, this.levelLayer);

    // Collide the player with items - modify based on pickup stat
    this.game.physics.arcade.overlap(this.player, this.items, function (a, b) {
      a.onPickup(b.itemData.id, b.itemData.value);
      b.kill();
    });

    // Collide with enemies, at present we only care about hitting their head, otherwise it's damage to us
    this.game.physics.arcade.collide(this.player, this.enemies, function (player, b) {
      
      if(player.disabled)
        return;
      
      if(b.body.touching.up) {
        
        player.body.velocity.y = gameConfig.hitBounce;
        globalGameData.score += b.props.onkill.score;

        b.ko();

      } else {

        let pa = new Phaser.Point(player.x, player.y);
        let n = pa.subtract(b.x, b.y).normalize();

        player.body.maxVelocity.setTo(650, 650);

        player.body.acceleration.x = 0;
        player.body.velocity.x = n.x * 650;
        player.body.velocity.y = -600;
        
        player.onDamaged(b.props.onhit.damagePlayer);

      }

    });

    if(this.player.disabled)
      return;

    /// Input manager area
    if (this.leftInputIsActive()) {
      this.player.body.acceleration.x = -this.ACCELERATION;
    } else if (this.rightInputIsActive()) {
      this.player.body.acceleration.x = this.ACCELERATION;
    } else {
      this.player.body.acceleration.x = 0;
    }

    // Set a variable that is true when the player is touching the ground
    let onTheGround = this.player.body.blocked.down; // this.player.body.touching.down; - Only works on arcade physics bodies. Not tiles apparently...

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
    return this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
  }

  // This function should return true when the player activates the "go right" control
  // In this case, either holding the right arrow or tapping or clicking on the right
  // side of the screen.
  rightInputIsActive() {
    return this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
  }

  // This function should return true when the player activates the "jump" control
  // In this case, either holding the up arrow or tapping or clicking on the center
  // part of the screen.
  upInputIsActive(duration) {
    return this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
  }

  // This function returns true when the player releases the "jump" control
  upInputReleased() {
    return this.input.keyboard.upDuration(Phaser.Keyboard.UP);
  }

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

}

export default GameState;