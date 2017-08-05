import mix from '../../helpers/Mixin';
import StatManager from '../../data/StatManager';

class Player extends mix(Phaser.Sprite).with(StatManager) {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;
        this.game = game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.setTo(args.MAX_SPEED, args.MAX_SPEED * 10);
        this.body.drag.setTo(args.DRAG, 0);

        this.disabled = false;
        this.stats = args.properties.stats;

    }

    onPickup(id, val) {
        this.modifyStat(id, val, this.stats);
    }

    onDamaged(val) {

        this.disabled = true;
        
        this.alpha = 0;

        this.flashTween = this.game.add.tween(this).to( { alpha: 1 }, 10, "Linear", true, 0, -1);
        this.flashTween.yoyo(true, 10);

        this.game.time.events.add(Phaser.Timer.SECOND * 0.6, function(){
            this.disabled = false;
            this.alpha = 1;
            this.flashTween.stop();
        }, this);

    }

}

export default Player;