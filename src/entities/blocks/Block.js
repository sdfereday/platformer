class Block extends Phaser.Sprite {

    constructor(args) {

        // Normal blocks don't really do much, so we don't need mixins for them.
        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.body.allowGravity = false;
        
    }

}

export default Block;