webpackJsonp([0],[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(t){r(this,e),this.superclass=t}return o(e,[{key:"with",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return t(e)},this.superclass)}}]),e}();e.exports=function(e){return new a(e)}},,,,,function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.game,e.x,e.y,e.name));return e.game.add.existing(n),e.game.physics.enable(n,Phaser.Physics.ARCADE),n.body.immovable=!0,n.body.allowGravity=!1,n}return a(t,e),t}(Phaser.Sprite);e.exports=i},function(e,t,n){e.exports=n(7)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n(3),n(4);var u=n(2),s=r(u),c=n(12),l=r(c);new(function(e){function t(){o(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,500,500,s.default.AUTO,"container",null));return e.state.add("GameState",l.default,!1),e.state.start("GameState"),e}return i(t,e),t}(s.default.Game))},,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),u=(r(i),n(2)),s=r(u),c=n(13),l=r(c),f=n(16),p=r(f),h=n(17),y=r(h),d=n(18),b=r(d),g=n(19),m=r(g),v=function(){function e(t){o(this,e),this.game=t}return a(e,[{key:"preload",value:function(){var e={groundTile:"./assets/gfx/ground.png",mapData:"./assets/mapdata/sandbox.json"};this.game.load.image("ground",e.groundTile),this.game.load.image("player","./assets/gfx/player.png"),this.game.load.image("bug","./assets/gfx/bug.png"),this.game.load.json("enemies","./assets/gamedata/enemies.json"),this.game.load.json("items","./assets/gamedata/items.json"),this.game.load.json("mapdata-sandbox",e.mapData)}},{key:"create",value:function(){this.game.stage.backgroundColor=4491468,this.MAX_SPEED=250,this.ACCELERATION=2500,this.DRAG=1500,this.GRAVITY=2600,this.JUMP_SPEED=-500,this.player=new b.default({game:this.game,x:this.game.width/2,y:this.game.height-64,name:"player",MAX_SPEED:this.MAX_SPEED,DRAG:this.DRAG}),this.game.physics.arcade.gravity.y=this.GRAVITY,this.jumping=!1,this.ground=this.game.add.group(),this.enemies=this.game.add.group(),this.pickups=this.game.add.group();var e=this.game.cache.getJSON("mapdata-sandbox"),t=p.default.create(e,32);this.placeEntities(t,32);var n=this.game.cache.getJSON("enemies").find(function(e){return"bug"===e.id}).properties,r=new m.default({game:this.game,x:this.game.width/2,y:this.game.height-64,name:"bug",target:this.player,properties:n});this.enemies.add(r),this.game.input.keyboard.addKeyCapture([s.default.Keyboard.LEFT,s.default.Keyboard.RIGHT,s.default.Keyboard.UP,s.default.Keyboard.DOWN]),this.drawHeightMarkers()}},{key:"placeEntities",value:function(e,t){for(var n=0,r=0,o=0,a=0;a<e.area;a+=1){n+=1,a%e.width==0&&(r+=1,n=0);var i=document.createElement("div");if(i.style.position="absolute",i.style.left=n*t+"px",i.style.top=r*t+"px",i.style.width=t+"px",i.style.height=t+"px",i.style.border="1px solid #ccc",e.atIndex(a)>0){i.style.backgroundColor="#333";var u=e.atIndex(a-e.width),s=e.atIndex(a+e.width),c=e.atIndex(a+1),f=e.atIndex(a-1);o=y.default.generateTileScore(u,c,s,f),i.innerHTML=o;var p=l.default.create({type:0,game:this.game,x:n*t,y:r*t,name:"ground"});this.ground.add(p)}else o=0;document.getElementById("container").appendChild(i)}}},{key:"drawHeightMarkers",value:function(){for(var e=this.game.add.bitmapData(this.game.width,this.game.height),t=this.game.height-20;t>=0;t-=32)e.context.beginPath(),e.context.strokeStyle="rgba(255, 255, 255, 0.2)",e.context.moveTo(0,t),e.context.lineTo(this.game.width,t),e.context.stroke();this.game.add.image(0,0,e)}},{key:"update",value:function(){this.game.physics.arcade.collide(this.player,this.ground),this.game.physics.arcade.collide(this.enemies,this.ground),this.game.physics.arcade.overlap(this.player,this.pickups,function(e,t){return t.kill()}),this.leftInputIsActive()?this.player.body.acceleration.x=-this.ACCELERATION:this.rightInputIsActive()?this.player.body.acceleration.x=this.ACCELERATION:this.player.body.acceleration.x=0,this.player.body.touching.down&&(this.jumps=2,this.jumping=!1),this.jumps>0&&this.upInputIsActive(150)&&(this.player.body.velocity.y=this.JUMP_SPEED,this.jumping=!0),this.jumping&&this.upInputReleased()&&(this.jumps--,this.jumping=!1)}},{key:"leftInputIsActive",value:function(){return this.input.keyboard.isDown(s.default.Keyboard.LEFT)}},{key:"rightInputIsActive",value:function(){return this.input.keyboard.isDown(s.default.Keyboard.RIGHT)}},{key:"upInputIsActive",value:function(e){return this.input.keyboard.downDuration(s.default.Keyboard.UP,e)}},{key:"upInputReleased",value:function(){return this.input.keyboard.upDuration(s.default.Keyboard.UP)}}]),e}();t.default=v},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(5),u=r(i),s=n(14),c=r(s),l=n(15),f=r(l),p=function(){function e(){o(this,e)}return a(e,null,[{key:"create",value:function(e){switch(e.type){case 0:return new u.default(e);case 1:return new c.default(e);case 2:return new f.default(e)}}}]),e}();e.exports=p},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(5),f=r(l),p=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.body.onCollide=new Phaser.Signal,n.body.onCollide.add(n.onInteract,n),n}return i(t,e),u(t,[{key:"onInteract",value:function(){console.log("Player hit me!")}}]),t}((0,c.default)(f.default).with());e.exports=p},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.game,e.x,e.y,e.name));return e.game.add.existing(n),e.game.physics.enable(n,Phaser.Physics.ARCADE),n.body.immovable=!0,n.body.allowGravity=!1,n.anchor.y=.5,n.entityData=e.properties,n}return a(t,e),t}((0,u.default)(Phaser.Sprite).with());e.exports=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e),this.mapCache=[],this.area=0,this.width=0,this.height=0}return o(e,[{key:"create",value:function(e,t){return this.width=e.map[0].length,this.height=e.map.length,this.area=this.width*this.height,this.mapCache=e.map.reduce(function(e,t){return e.concat(t)}),this}},{key:"atIndex",value:function(e){return e<0||e>this.mapCache.length-1?0:this.mapCache[e]}}]),e}();e.exports=new a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e)}return o(e,null,[{key:"generateTileScore",value:function(e,t,n,r){var o=0;return o+=e?1:0,o+=t?2:0,o+=n?4:0,o+=r?8:0}}]),e}();e.exports=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.game,e.x,e.y,e.name));return e.game.add.existing(n),e.game.physics.enable(n,Phaser.Physics.ARCADE),n.body.collideWorldBounds=!0,n.body.maxVelocity.setTo(e.MAX_SPEED,10*e.MAX_SPEED),n.body.drag.setTo(e.DRAG,0),n.entityData=e.properties,n}return a(t,e),t}(Phaser.Sprite);e.exports=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=r(s),l=n(20),f=r(l),p=n(21),h=r(p),y=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.game,e.x,e.y,e.name));return e.game.add.existing(n),e.game.physics.enable(n,Phaser.Physics.ARCADE),n.body.collideWorldBounds=!0,n.status=e.properties.status,n.gambits=e.properties.gambits,n.target=e.target,n}return i(t,e),u(t,[{key:"update",value:function(){this.status.has_los=f.default.inLOS(this,this.target);this.analyse(this.gambits,this.status,this.target)}}]),t}((0,c.default)(Phaser.Sprite).with(h.default));e.exports=y},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e)}return o(e,null,[{key:"inLOS",value:function(e,t){return!0}}]),e}();e.exports=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e){return function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),i(t,[{key:"analyse",value:function(e,t,n){var r=e.find(function(e){return e.isDefault}),o=e.find(function(e){return this.conditionRunner(e,t)},this);return o?o.actionIfTrue:r.actionIfTrue}},{key:"conditionRunner",value:function(e,t){var n=t[e.identifier],r=e.against?t[e.against]:null,o=!1;switch(e.operator){case"boolean":o=n===e.value;break;case"less_than":o=e.value>0&&e.percentile?n<r*e.value:n<r;break;case"greater_than":o=e.value>0&&e.percentile?n>r*e.value:n>r;break;case"equal_to":o=e.value===n;break;case"not_equal_to":o=e.value!==n}return e.and&&e.and.length>0?e.and.every(function(e){return this.conditionRunner(e,t)},this)&&o:e.or&&e.or.length>0?e.and.every(function(e){return this.conditionRunner(e,t)},this)||o:o}}]),t}(e)};e.exports=u}],[6]);