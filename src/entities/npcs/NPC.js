class NPC extends Phaser.Sprite {

    constructor(args) {

        super(this, args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

    }

}

module.exports = NPC;