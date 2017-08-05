import 'pixi';
import 'p2';
import Phaser from 'phaser';
import GameState from './states/GameState';

/// So how about using TypeScript?
// https://github.com/belohlavek/phaser-es6-boilerplate
// We extend Phaser.Game to avoid contextual issues when attaching to the lib.
class Game extends Phaser.Game {

  constructor() {
    super(500, 500, Phaser.AUTO, 'container', null);
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
  }

}

// Then a simple case of starting everything here.
new Game();
