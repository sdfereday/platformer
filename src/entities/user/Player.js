class Player extends Phaser.Sprite {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        // Enable physics on the player
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // Make player collide with world boundaries so he doesn't leave the stage
        this.body.collideWorldBounds = true;

        // Set player minimum and maximum movement speed
        this.body.maxVelocity.setTo(args.MAX_SPEED, args.MAX_SPEED * 10); // x, y

        // Add drag to the player that slows them down when they are not accelerating
        this.body.drag.setTo(args.DRAG, 0); // x, y

    }

}

module.exports = Player;