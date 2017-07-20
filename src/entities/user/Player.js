class Player extends Phaser.Sprite {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.setTo(args.MAX_SPEED, args.MAX_SPEED * 10);
        this.body.drag.setTo(args.DRAG, 0);

        this.entityData = args.properties;

    }

}

module.exports = Player;