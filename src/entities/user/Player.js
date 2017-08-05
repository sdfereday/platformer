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

        this.stats = this.populateStats({
            "hp_max": args.properties.hp_max,
            "hp_now": args.properties.hp_now,
            "score": args.properties.score
        });

    }

    onPickup(id, val) {
        this.modifyStat(id, val, this.stats);
        console.log(this.stats);
    }

    onDamaged(val) {
        // ...
    }

}

export default Player;