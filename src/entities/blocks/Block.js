class Block extends Phaser.Sprite {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);

        let game = args.game; // Can we just use 'this.game' ?
        game.add.existing(this);

        // Add the ground blocks, enable physics on each, make them immovable (would be more efficient to use tiles, but these are good for dynamic blocks)
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.body.allowGravity = false;

    }

}

module.exports = Block;