webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
// Mixin maker
var MixinBuilder = function () {
  function MixinBuilder(superclass) {
    _classCallCheck(this, MixinBuilder);

    this.superclass = superclass;
  }

  // (spread operator, will pass everything from 0 to n)


  _createClass(MixinBuilder, [{
    key: "with",
    value: function _with() {
      for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
        mixins[_key] = arguments[_key];
      }

      return mixins.reduce(function (c, mixin) {
        return mixin(c);
      }, this.superclass);
    }
  }]);

  return MixinBuilder;
}();

// https://k94n.com/es6-modules-single-instance-pattern -> Revision needed


exports.default = function (superclass) {
  return new MixinBuilder(superclass);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPES = {
  DIR: {
    LEFT: -1,
    RIGHT: 1
  }
};

exports.default = TYPES;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MathHelpers = function () {
    function MathHelpers() {
        _classCallCheck(this, MathHelpers);
    }

    _createClass(MathHelpers, null, [{
        key: "getRandomInt",
        value: function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
            //The maximum is exclusive and the minimum is inclusive
        }
    }, {
        key: "clamp",
        value: function clamp(v, c, mx, mn) {
            var n = v + c;
            mn = mn ? mn : 0;
            return n < mn ? mn : n > mx ? mx : n;
        }
    }]);

    return MathHelpers;
}();

exports.default = MathHelpers;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateBase = function () {
    function StateBase() {
        _classCallCheck(this, StateBase);

        this.id = "undefined";
        this.owner = null;
        this.locked = false;
    }

    _createClass(StateBase, [{
        key: "enter",
        value: function enter() {
            //...
        }
    }, {
        key: "update",
        value: function update() {
            //...
        }
    }, {
        key: "exit",
        value: function exit() {
            //...
        }
    }]);

    return StateBase;
}();

exports.default = StateBase;

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameTypes = __webpack_require__(1);

var _GameTypes2 = _interopRequireDefault(_GameTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PositionHelpers = function () {
    function PositionHelpers() {
        _classCallCheck(this, PositionHelpers);
    }

    _createClass(PositionHelpers, null, [{
        key: 'dist',
        value: function dist(v1, v2) {

            return Phaser.Math.distance(v1.x, v1.y, v2.x, v2.y);
        }
    }, {
        key: 'getTargetSide',
        value: function getTargetSide(target, me) {

            return target.x - me.x < 0 ? _GameTypes2.default.DIR.LEFT : _GameTypes2.default.DIR.RIGHT;
        }
    }]);

    return PositionHelpers;
}();

exports.default = PositionHelpers;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

__webpack_require__(7);

var _phaser = __webpack_require__(3);

var _phaser2 = _interopRequireDefault(_phaser);

var _GameState = __webpack_require__(15);

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/// So how about using TypeScript?
// https://github.com/belohlavek/phaser-es6-boilerplate
// We extend Phaser.Game to avoid contextual issues when attaching to the lib.
var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, 500, 500, _phaser2.default.AUTO, 'container', null));

    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

// Then a simple case of starting everything here.


new Game();

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameTypes = __webpack_require__(1);

var _GameTypes2 = _interopRequireDefault(_GameTypes);

var _Mixin = __webpack_require__(0);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _phaser = __webpack_require__(3);

var _phaser2 = _interopRequireDefault(_phaser);

var _MapMaker = __webpack_require__(16);

var _MapMaker2 = _interopRequireDefault(_MapMaker);

var _MapHelpers = __webpack_require__(17);

var _MapHelpers2 = _interopRequireDefault(_MapHelpers);

var _ItemFactory = __webpack_require__(18);

var _ItemFactory2 = _interopRequireDefault(_ItemFactory);

var _CreatureFactory = __webpack_require__(20);

var _CreatureFactory2 = _interopRequireDefault(_CreatureFactory);

var _BlockFactory = __webpack_require__(28);

var _BlockFactory2 = _interopRequireDefault(_BlockFactory);

var _Player = __webpack_require__(31);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/// Config for game
var gameConfig = {
  hitBounce: -500
};

// Solely for global game data only (save to own json local storage later)
var globalGameData = {
  score: 0
};

/// https://gamemechanicexplorer.com/#platformer-6
// At this point GameState doesn't really need to extend anything, it's more Sprites and things that should.

var GameState = function () {
  function GameState(game) {
    _classCallCheck(this, GameState);

    // ... If it isn't already...
    this.game = game;
  }

  // Prototypal methods
  // Load images and sounds


  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {

      // Differs per level
      var levelConf = {
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

  }, {
    key: 'create',
    value: function create() {
      // Set stage background to something sky colored
      this.game.stage.backgroundColor = 0x88BBcc;

      // Define movement constants
      this.MAX_SPEED = 250; // pixels/second
      this.ACCELERATION = 2500; // pixels/second/second
      this.DRAG = 1500; // pixels/second
      this.GRAVITY = 2500; // pixels/second/second - note: anything above this causes you to fall through tiles... :/
      this.JUMP_SPEED = -500; // pixels/second (negative y is up)

      // Create a player sprite
      var props = this.game.cache.getJSON('player').properties;
      this.player = new _Player2.default({
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
      var mapData = this.game.cache.getJSON('mapdata-sandbox');
      var tileSize = 32;

      // Now we can generate the map
      var levelMap = _MapMaker2.default.create(mapData, tileSize);
      this.generateMap(levelMap, mapData, tileSize);

      // Capture certain keys to prevent their default actions in the browser.
      // This is only necessary because this is an HTML5 game. Games on other
      // platforms may not need code like this.
      this.game.input.keyboard.addKeyCapture([_phaser2.default.Keyboard.LEFT, _phaser2.default.Keyboard.RIGHT, _phaser2.default.Keyboard.UP, _phaser2.default.Keyboard.DOWN]);

      // Just for fun, draw some height markers so we can see how high we're jumping
      this.drawHeightMarkers();
    }
  }, {
    key: 'generateMap',
    value: function generateMap(generatedMapData, mapJSON, tileSize) {
      var _this = this;

      var tilex = 0;
      var tiley = 0;
      var tilen = 0;

      //  Generates CSV data based on the raw map data supplied
      var mapCSV = _MapHelpers2.default.generateCSV(generatedMapData);

      //  Add data to the cache
      this.game.cache.addTilemap('dynamicMap', null, mapCSV, _phaser2.default.Tilemap.CSV);

      //  Create our map (the 32x32 is the tile size)
      this.levelTileMap = this.game.add.tilemap('dynamicMap', tileSize, tileSize);

      //  'tiles' = cache image key, 32x32 = tile size
      this.levelTileMap.addTilesetImage('tiles', 'tiles', tileSize, tileSize);

      //  Enable collisions on all tiles on this layer
      this.levelTileMap.setCollisionBetween(0, this.levelTileMap.tiles.length);

      //  0 is important
      this.levelLayer = this.levelTileMap.createLayer(0);

      /// .............. Items

      var _loop = function _loop(i) {

        var currentEntity = mapJSON.items[i];
        var props = _this.game.cache.getJSON('items').find(function (x) {
          return x.id === currentEntity.id;
        }).properties;

        var ent = _ItemFactory2.default.create({
          game: _this.game,
          x: currentEntity.x * tileSize,
          y: currentEntity.y * tileSize,
          name: currentEntity.name.toLowerCase(),
          properties: props
        });

        _this.items.add(ent);
      };

      for (var i = 0; i < mapJSON.items.length; i++) {
        _loop(i);
      }

      /// .............. Enemies

      var _loop2 = function _loop2(i) {

        var currentEntity = mapJSON.enemies[i];
        var props = _this.game.cache.getJSON('enemies').find(function (x) {
          return x.id === currentEntity.id;
        }).properties;

        var ent = _CreatureFactory2.default.create({
          game: _this.game,
          x: currentEntity.x * tileSize,
          y: currentEntity.y * tileSize,
          id: currentEntity.id,
          name: currentEntity.name.toLowerCase(),
          target: _this.player,
          properties: props
        });

        _this.enemies.add(ent);
      };

      for (var i = 0; i < mapJSON.enemies.length; i++) {
        _loop2(i);
      }
    }
  }, {
    key: 'update',
    value: function update() {

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

        if (player.disabled) return;

        if (b.body.touching.up) {

          player.body.velocity.y = gameConfig.hitBounce;
          globalGameData.score += b.props.onkill.score;

          b.ko();
        } else {

          var pa = new _phaser2.default.Point(player.x, player.y);
          var n = pa.subtract(b.x, b.y).normalize();

          player.body.maxVelocity.setTo(650, 650);

          player.body.acceleration.x = 0;
          player.body.velocity.x = n.x * 650;
          player.body.velocity.y = -600;

          player.onDamaged(b.props.onhit.damagePlayer);
        }
      });

      if (this.player.disabled) return;

      /// Input manager area
      if (this.leftInputIsActive()) {
        this.player.body.acceleration.x = -this.ACCELERATION;
      } else if (this.rightInputIsActive()) {
        this.player.body.acceleration.x = this.ACCELERATION;
      } else {
        this.player.body.acceleration.x = 0;
      }

      // Set a variable that is true when the player is touching the ground
      var onTheGround = this.player.body.blocked.down; // this.player.body.touching.down; - Only works on arcade physics bodies. Not tiles apparently...

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

  }, {
    key: 'leftInputIsActive',
    value: function leftInputIsActive() {
      return this.input.keyboard.isDown(_phaser2.default.Keyboard.LEFT);
    }

    // This function should return true when the player activates the "go right" control
    // In this case, either holding the right arrow or tapping or clicking on the right
    // side of the screen.

  }, {
    key: 'rightInputIsActive',
    value: function rightInputIsActive() {
      return this.input.keyboard.isDown(_phaser2.default.Keyboard.RIGHT);
    }

    // This function should return true when the player activates the "jump" control
    // In this case, either holding the up arrow or tapping or clicking on the center
    // part of the screen.

  }, {
    key: 'upInputIsActive',
    value: function upInputIsActive(duration) {
      return this.input.keyboard.downDuration(_phaser2.default.Keyboard.UP, duration);
    }

    // This function returns true when the player releases the "jump" control

  }, {
    key: 'upInputReleased',
    value: function upInputReleased() {
      return this.input.keyboard.upDuration(_phaser2.default.Keyboard.UP);
    }
  }, {
    key: 'drawHeightMarkers',
    value: function drawHeightMarkers() {
      // Create a bitmap the same size as the stage
      var bitmap = this.game.add.bitmapData(this.game.width, this.game.height);

      // These functions use the canvas context to draw lines using the canvas API
      for (var y = this.game.height - 20; y >= 0; y -= 32) {
        bitmap.context.beginPath();
        bitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        bitmap.context.moveTo(0, y);
        bitmap.context.lineTo(this.game.width, y);
        bitmap.context.stroke();
      }

      this.game.add.image(0, 0, bitmap);
    }
  }]);

  return GameState;
}();

exports.default = GameState;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapMaker = function () {
    function MapMaker() {
        _classCallCheck(this, MapMaker);

        this.mapCache = [];
        this.area = 0;
        this.width = 0;
        this.height = 0;
    }

    // Remember you cannot use/access static methods through class instances!


    _createClass(MapMaker, [{
        key: "create",
        value: function create(mapData, tileSize) {

            this.width = mapData.map[0].length;
            this.height = mapData.map.length;
            this.area = this.width * this.height;
            this.mapCache = mapData.map.reduce(function (a, b) {
                return a.concat(b);
            });

            return this;
        }
    }, {
        key: "atIndex",
        value: function atIndex(i) {

            if (i < 0 || i > this.mapCache.length - 1) return null;

            return this.mapCache[i];
        }
    }]);

    return MapMaker;
}();

// Ensures singleton state (I think...)


var mapMaker = mapMaker ? mapMaker : new MapMaker();
exports.default = mapMaker;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapHelpers = function () {
    function MapHelpers() {
        _classCallCheck(this, MapHelpers);
    }

    _createClass(MapHelpers, null, [{
        key: 'generateTileScore',
        value: function generateTileScore(u, r, d, l) {
            var sum = 0;
            sum += u ? 1 : 0;
            sum += l ? 2 : 0;
            sum += d ? 4 : 0;
            sum += r ? 8 : 0;
            return sum;
        }
    }, {
        key: 'generateCSV',
        value: function generateCSV(mapData) {

            var csvData = '';
            var tileScore = 0;
            var arrayWidth = mapData.width - 1;
            var arrayHeight = mapData.height - 1;

            // https://phaser.io/examples/v2/tilemaps/create-from-array#download
            // Doesn't have to be CSV, you can quite happily use json probably.
            // Feel free to change this so it picks n*2 of the number to pick a tile variant.
            for (var x = 0; x < mapData.area; x += 1) {

                // Generate tile scores based on neighbours (we only care about '1' here, use enums)
                if (mapData.atIndex(x) === 1) {

                    // We know this tile has a block, so we want to know if it has nehbours
                    // Don't be mislead, we need the real width, not zero-based here since we're dealing with number of squares
                    // as opposed to 'index' of squares.
                    tileScore = this.generateTileScore(mapData.atIndex(x - mapData.width), // up
                    mapData.atIndex(x + 1), // right
                    mapData.atIndex(x + mapData.width), // below
                    mapData.atIndex(x - 1) // left
                    );
                } else {

                    // Nothing of interest surrounding us, treat as empty tile
                    tileScore = -1;
                }

                // Generate node in data
                csvData += tileScore;

                // Ensure you don't append a comma at the end
                if (x < mapData.area - 1) csvData += ',';

                // Edge of row reached, increment to next
                if (x % mapData.width === arrayWidth) csvData += '\n';
            }

            return csvData;
        }
    }]);

    return MapHelpers;
}();

exports.default = MapHelpers;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item = __webpack_require__(19);

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ItemFactory = function () {
    function ItemFactory() {
        _classCallCheck(this, ItemFactory);
    }

    _createClass(ItemFactory, null, [{
        key: 'create',
        value: function create(options) {
            return new _Item2.default(options);
        }
    }]);

    return ItemFactory;
}();

exports.default = ItemFactory;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _Mixin = __webpack_require__(0);

var _Mixin2 = _interopRequireDefault(_Mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pickup = function (_mix$with) {
        _inherits(Pickup, _mix$with);

        function Pickup(args) {
                _classCallCheck(this, Pickup);

                var _this = _possibleConstructorReturn(this, (Pickup.__proto__ || Object.getPrototypeOf(Pickup)).call(this, args.game, args.x, args.y, args.name));

                args.game.add.existing(_this);

                var game = args.game;

                game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.immovable = true;
                _this.body.allowGravity = false;

                _this.itemData = {
                        id: args.properties.id,
                        value: args.properties.value
                };

                return _this;
        }

        return Pickup;
}((0, _Mixin2.default)(Phaser.Sprite).with());

exports.default = Pickup;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bug = __webpack_require__(21);

var _Bug2 = _interopRequireDefault(_Bug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreatureFactory = function () {
    function CreatureFactory() {
        _classCallCheck(this, CreatureFactory);
    }

    _createClass(CreatureFactory, null, [{
        key: "create",
        value: function create(options) {

            var CreatureClass = null;

            switch (options.id) {
                case "bug":
                    CreatureClass = _Bug2.default;
                    break;
            }

            return new CreatureClass(options);
        }
    }]);

    return CreatureFactory;
}();

exports.default = CreatureFactory;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameTypes = __webpack_require__(1);

var _GameTypes2 = _interopRequireDefault(_GameTypes);

var _Mixin = __webpack_require__(0);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _AIHelpers = __webpack_require__(22);

var _AIHelpers2 = _interopRequireDefault(_AIHelpers);

var _PositionHelpers = __webpack_require__(8);

var _PositionHelpers2 = _interopRequireDefault(_PositionHelpers);

var _MathHelpers = __webpack_require__(4);

var _MathHelpers2 = _interopRequireDefault(_MathHelpers);

var _Analyser = __webpack_require__(23);

var _Analyser2 = _interopRequireDefault(_Analyser);

var _FSM = __webpack_require__(24);

var _FSM2 = _interopRequireDefault(_FSM);

var _Chase = __webpack_require__(26);

var _Chase2 = _interopRequireDefault(_Chase);

var _Roam = __webpack_require__(27);

var _Roam2 = _interopRequireDefault(_Roam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bug = function (_mix$with) {
        _inherits(Bug, _mix$with);

        function Bug(args) {
                _classCallCheck(this, Bug);

                var _this = _possibleConstructorReturn(this, (Bug.__proto__ || Object.getPrototypeOf(Bug)).call(this, args.game, args.x, args.y, args.name));

                args.game.add.existing(_this);

                var game = args.game;

                game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.collideWorldBounds = true;
                _this.body.maxVelocity.setTo(args.properties.physics.MAX_SPEED, args.properties.physics.MAX_SPEED * 10);
                _this.body.drag.setTo(args.properties.physics.DRAG, 0);

                _this.status = args.properties.status;
                _this.gambits = args.properties.gambits;
                _this.target = args.target;
                _this.props = args.properties;

                _this.useState = _this.gambits.find(function (x) {
                        return x.isDefault;
                }).actionIfTrue;

                _this.fsm = new _FSM2.default();

                _this.dead = false;
                _this.checkWorldBounds = true;
                _this.events.onOutOfBounds.add(_this.onOutOfBounds, _this);

                return _this;
        }

        _createClass(Bug, [{
                key: 'update',
                value: function update() {

                        if (this.dead) {
                                this.body.velocity.x = 0;
                                return;
                        }

                        // The computation takes place in the entity, since its world status is referenced from its own pov.
                        this.status.has_los = _AIHelpers2.default.inLOS(this, this.target);
                        this.status.has_dist = _AIHelpers2.default.inDistance(this, this.target);

                        // Then we feed in the world status and decide what to do with ourselves.
                        this.useState = this.analyse(this.gambits, this.status, this.target);

                        // When we have an action string, we know what state to push / activate.
                        /// Needs to use types, not strings, also, is this comparison a little slow?
                        /// Is it also a little slow to instantiate like this? Why not cache them? TODO.
                        /// Do we have the right way of calling the move function here?
                        //// This area could use a little work. I'd suggest resorting to types instead of strings and whatnot.
                        if (this.useState === "idle" && !this.fsm.sameAsCurrent(this.useState)) {
                                this.fsm.clear();
                        }

                        if (this.useState === "roam" && !this.fsm.sameAsCurrent(this.useState)) {
                                this.fsm.pop();
                                this.fsm.push(new _Roam2.default(this, this.status, this.moveTowards));
                        }

                        if (this.useState === "chase" && !this.fsm.sameAsCurrent(this.useState)) {
                                this.fsm.pop();
                                this.fsm.push(new _Chase2.default(this, this.status, this.target, this.moveTowards));
                        }

                        this.fsm.update(this.status);
                }
        }, {
                key: 'moveTowards',
                value: function moveTowards(pos) {

                        this.body.velocity.x = 0;

                        if (_PositionHelpers2.default.dist(pos, { x: this.x, y: this.y }) > 2) {

                                var diff = {
                                        x: pos.x - this.x
                                };

                                // Use enums for these magic strings, applies all over!
                                var direction = diff.x < 0 ? _GameTypes2.default.DIR.LEFT : _GameTypes2.default.DIR.RIGHT;

                                // Don't use an arbitrary distance number, at least pass it as an arg. Or better yet, get from gambit.
                                if (Math.round(Math.abs(diff.x)) > 10) {
                                        var spd = _MathHelpers2.default.getRandomInt(80, 130);
                                        this.body.velocity.x = direction === _GameTypes2.default.DIR.LEFT ? -spd : spd;
                                        return true;
                                } else {
                                        this.body.velocity.x = 0;
                                        return false;
                                }
                        }

                        return false;
                }
        }, {
                key: 'ko',
                value: function ko() {

                        this.dead = true;
                        this.body.velocity.y = -400;
                        this.body.checkCollision.up = false;
                        this.body.checkCollision.down = false;
                        this.body.checkCollision.left = false;
                        this.body.checkCollision.right = false;

                        // In the small chance of out of bounds not being triggered, I may want
                        // to clean up all dead entities later on 'if' still on screen yet dead.
                }
        }, {
                key: 'onOutOfBounds',
                value: function onOutOfBounds() {

                        this.kill();
                }
        }]);

        return Bug;
}((0, _Mixin2.default)(Phaser.Sprite).with(_Analyser2.default));

exports.default = Bug;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AIHelpers = function () {
    function AIHelpers() {
        _classCallCheck(this, AIHelpers);
    }

    _createClass(AIHelpers, null, [{
        key: "inLOS",
        value: function inLOS(a, b) {
            // To implement from:
            // https://gamemechanicexplorer.com/#raycasting-1
            // console.log(a, b);
            return true;
        }
    }, {
        key: "inDistance",
        value: function inDistance(v1, v2) {
            return Phaser.Math.distance(v1.x, v1.y, v2.x, v2.y);
        }
    }]);

    return AIHelpers;
}();

exports.default = AIHelpers;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Analyser = function Analyser(superclass) {
    return function (_superclass) {
        _inherits(_class, _superclass);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: 'analyse',


            // https://bitbucket.org/drunkenoodle/rpg-turn-based-proto/src/b98fbc1356938739acf0ef77b47502847f8d5652/src/data/definitions.js?at=master&fileviewer=file-view-default
            value: function analyse(gambits, status, target) {

                /// Remember it's just 1 on 1 right now, so target picking is a bit redundant. However,
                /// it might decide to pick its self.
                // Gets the list of gambit nodes to return from analyses
                var defaultAction = gambits.find(function (x) {
                    return x.isDefault;
                });
                var gambitTest = gambits.find(function (node) {
                    return this.conditionRunner(node, status);
                }, this);

                return gambitTest ? gambitTest.actionIfTrue : defaultAction.actionIfTrue; // What happens if non-true ? Perform default?
            }
        }, {
            key: 'conditionRunner',
            value: function conditionRunner(condition, data) {

                // For each condition, run the stats against it.
                var status = data[condition.identifier];
                // If against specific static value not specified, we just revert to the actual condition value (things like distance use this).
                var againstStatus = condition.against ? data[condition.against] : condition.value;
                // This needs to be true for this gambit to pass.
                var allTrue = false;

                // Some type checking would be useful here too.
                switch (condition.operator) {
                    case 'boolean':
                        allTrue = status === condition.value;
                        break;
                    case 'less_than':
                        allTrue = condition.value > 0 && condition.percentile ? status < againstStatus * condition.value : status < againstStatus;
                        break;
                    case 'greater_than':
                        allTrue = condition.value > 0 && condition.percentile ? status > againstStatus * condition.value : status > againstStatus;
                        break;
                    case 'equal_to':
                        allTrue = condition.value === status;
                        break;
                    case 'not_equal_to':
                        allTrue = condition.value !== status;
                        break;
                }

                if (condition.and && condition.and.length > 0) {

                    return condition.and.every(function (subcondition) {
                        return this.conditionRunner(subcondition, data);
                    }, this) && allTrue;
                }

                if (condition.or && condition.or.length > 0) {

                    return condition.and.every(function (subcondition) {
                        return this.conditionRunner(subcondition, data);
                    }, this) || allTrue;
                }

                return allTrue;
            }
        }]);

        return _class;
    }(superclass);
};

exports.default = Analyser;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Idle = __webpack_require__(25);

var _Idle2 = _interopRequireDefault(_Idle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FSM = function () {
    function FSM() {
        _classCallCheck(this, FSM);

        this.stack = [];
        this.stack.push(new _Idle2.default());
    }

    _createClass(FSM, [{
        key: "update",
        value: function update(params) {

            this.top().update(params);
        }
    }, {
        key: "push",
        value: function push(state, params) {

            if (this.stack.find(function (x) {
                return x.id === state.id;
            })) throw " - State duplication error, check you aren't pushing the same type.";

            this.stack.push(state);

            this.top().enter(params);
        }
    }, {
        key: "top",
        value: function top() {
            return this.stack[this.stack.length - 1];
        }
    }, {
        key: "pop",
        value: function pop() {

            if (this.stack.length === 0) throw " - No states to use!";

            if (this.top().locked) return;

            var removed = this.stack.splice(this.stack.length - 1, 1)[0];
            removed.exit();

            // GC (wouldn't have to do this if they were cached instead)
            removed = null;
        }
    }, {
        key: "clear",
        value: function clear() {

            this.stack = this.stack.filter(function (x) {
                return x.locked;
            });

            if (this.stack.length > 1) throw " - Can only have one locked state.";
        }
    }, {
        key: "sameAsCurrent",
        value: function sameAsCurrent(id) {
            return this.top().id === id;
        }
    }]);

    return FSM;
}();

exports.default = FSM;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _StateBase2 = __webpack_require__(5);

var _StateBase3 = _interopRequireDefault(_StateBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Idle = function (_StateBase) {
    _inherits(Idle, _StateBase);

    function Idle() {
        _classCallCheck(this, Idle);

        var _this = _possibleConstructorReturn(this, (Idle.__proto__ || Object.getPrototypeOf(Idle)).call(this));

        _this.id = "idle";
        _this.locked = true;

        return _this;
    }

    return Idle;
}(_StateBase3.default);

exports.default = Idle;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameTypes = __webpack_require__(1);

var _GameTypes2 = _interopRequireDefault(_GameTypes);

var _StateBase2 = __webpack_require__(5);

var _StateBase3 = _interopRequireDefault(_StateBase2);

var _PositionHelpers = __webpack_require__(8);

var _PositionHelpers2 = _interopRequireDefault(_PositionHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chase = function (_StateBase) {
        _inherits(Chase, _StateBase);

        function Chase(owner, status, target, moveCallback) {
                _classCallCheck(this, Chase);

                var _this = _possibleConstructorReturn(this, (Chase.__proto__ || Object.getPrototypeOf(Chase)).call(this));

                _this.id = "chase";
                _this.status = status;
                _this.owner = owner;

                _this.moveCallback = moveCallback;
                _this.target = target;
                _this.pickedPos = {
                        x: _this.target.x,
                        y: _this.target.y
                };

                _this.currentDir = _GameTypes2.default.DIR.RIGHT;

                return _this;
        }

        _createClass(Chase, [{
                key: 'update',
                value: function update() {

                        var moving = this.moveCallback.call(this.owner, this.pickedPos);

                        if (this.currentDir !== _PositionHelpers2.default.getTargetSide(this.target, this.owner) || !moving) {
                                this.currentDir = _PositionHelpers2.default.getTargetSide(this.target, this.owner);
                                this.pickedPos.x = this.target.x;
                        }
                }
        }]);

        return Chase;
}(_StateBase3.default);

;

exports.default = Chase;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StateBase2 = __webpack_require__(5);

var _StateBase3 = _interopRequireDefault(_StateBase2);

var _MathHelpers = __webpack_require__(4);

var _MathHelpers2 = _interopRequireDefault(_MathHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Roam = function (_StateBase) {
    _inherits(Roam, _StateBase);

    function Roam(owner, status, moveCallback) {
        _classCallCheck(this, Roam);

        var _this = _possibleConstructorReturn(this, (Roam.__proto__ || Object.getPrototypeOf(Roam)).call(this));

        _this.id = "roam";
        _this.status = status;
        _this.owner = owner;

        _this.moveCallback = moveCallback;
        _this.pickedPos = {
            x: _this.owner.x,
            y: _this.owner.y
        };

        return _this;
    }

    _createClass(Roam, [{
        key: 'update',
        value: function update() {

            var moving = this.moveCallback.call(this.owner, this.pickedPos);

            if (!moving) {
                this.pickedPos.x = _MathHelpers2.default.getRandomInt(2 * 32, 15 * 32);
                this.pickedPos.y = this.pickedPos.y;
            }
        }
    }]);

    return Roam;
}(_StateBase3.default);

;

exports.default = Roam;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CoinBlock = __webpack_require__(29);

var _CoinBlock2 = _interopRequireDefault(_CoinBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockFactory = function () {
    function BlockFactory() {
        _classCallCheck(this, BlockFactory);
    }

    _createClass(BlockFactory, null, [{
        key: "create",
        value: function create(options) {

            var BlockClass = null;

            switch (options.id) {
                case "coin":
                    BlockClass = _CoinBlock2.default;
                    break;
            }

            return new BlockClass(options);
        }
    }]);

    return BlockFactory;
}();

exports.default = BlockFactory;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin = __webpack_require__(0);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _Block = __webpack_require__(30);

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoinBlock = function (_mix$with) {
    _inherits(CoinBlock, _mix$with);

    // Coin blocks need to make use of mixins for the extra functionality given.
    function CoinBlock(args) {
        _classCallCheck(this, CoinBlock);

        var _this = _possibleConstructorReturn(this, (CoinBlock.__proto__ || Object.getPrototypeOf(CoinBlock)).call(this, args));

        _this.body.onCollide = new Phaser.Signal();
        _this.body.onCollide.add(_this.onInteract, _this);

        return _this;
    }

    _createClass(CoinBlock, [{
        key: 'onInteract',
        value: function onInteract() {
            // <-- Can this be called from in here?

            console.log("Player hit me!");
        }
    }]);

    return CoinBlock;
}((0, _Mixin2.default)(_Block2.default).with());

exports.default = CoinBlock;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = function (_Phaser$Sprite) {
        _inherits(Block, _Phaser$Sprite);

        function Block(args) {
                _classCallCheck(this, Block);

                var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, args.game, args.x, args.y, args.name));

                // Normal blocks don't really do much, so we don't need mixins for them.


                args.game.add.existing(_this);

                var game = args.game;

                game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.immovable = true;
                _this.body.allowGravity = false;

                return _this;
        }

        return Block;
}(Phaser.Sprite);

exports.default = Block;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mixin = __webpack_require__(0);

var _Mixin2 = _interopRequireDefault(_Mixin);

var _StatManager = __webpack_require__(32);

var _StatManager2 = _interopRequireDefault(_StatManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_mix$with) {
        _inherits(Player, _mix$with);

        function Player(args) {
                _classCallCheck(this, Player);

                var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, args.game, args.x, args.y, args.name));

                args.game.add.existing(_this);

                var game = args.game;
                _this.game = game;

                game.physics.enable(_this, Phaser.Physics.ARCADE);
                _this.body.collideWorldBounds = true;
                _this.body.maxVelocity.setTo(args.MAX_SPEED, args.MAX_SPEED * 10);
                _this.body.drag.setTo(args.DRAG, 0);

                _this.disabled = false;
                _this.stats = args.properties.stats;

                return _this;
        }

        _createClass(Player, [{
                key: 'onPickup',
                value: function onPickup(id, val) {
                        this.modifyStat(id, val, this.stats);
                }
        }, {
                key: 'onDamaged',
                value: function onDamaged(val) {

                        this.disabled = true;

                        this.alpha = 0;

                        this.flashTween = this.game.add.tween(this).to({ alpha: 1 }, 10, "Linear", true, 0, -1);
                        this.flashTween.yoyo(true, 10);

                        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function () {
                                this.disabled = false;
                                this.alpha = 1;
                                this.flashTween.stop();
                        }, this);
                }
        }]);

        return Player;
}((0, _Mixin2.default)(Phaser.Sprite).with(_StatManager2.default));

exports.default = Player;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MathHelpers = __webpack_require__(4);

var _MathHelpers2 = _interopRequireDefault(_MathHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatManager = function StatManager(superclass) {
    return function (_superclass) {
        _inherits(_class, _superclass);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "modifyStat",
            value: function modifyStat(id, n, stats) {

                var stat = stats.find(function (x) {
                    return x.id === id;
                });
                stat.current = _MathHelpers2.default.clamp(n, stat.current, stat.max);
            }
        }]);

        return _class;
    }(superclass);
};

exports.default = StatManager;

/***/ })
],[9]);
//# sourceMappingURL=game.js.map