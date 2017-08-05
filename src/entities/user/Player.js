import mix from '../../helpers/Mixin';
import StatManager from '../../data/StatManager';

class Player extends mix(Phaser.Sprite).with(StatManager) {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.setTo(args.MAX_SPEED, args.MAX_SPEED * 10);
        this.body.drag.setTo(args.DRAG, 0);

        this.stats = args.properties.stats;

    }

    onPickup(id, val) {
        this.modifyStat(id, val, this.stats);
    }

    onDamaged(val) {
        // ...
    }

}

export default Player;