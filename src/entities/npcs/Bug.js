import mix from '../../helpers/Mixin';
import AIHelpers from '../../helpers/AIHelpers';
import BehaviourManager from '../../ai/BehaviourManager';
import ChaseBehaviour from '../../ai/behaviours/Chase';
import RoamBehaviour from '../../ai/behaviours/Roam';

class Bug extends mix(Phaser.Sprite).with(BehaviourManager, ChaseBehaviour, RoamBehaviour) {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.setTo(args.MAX_SPEED, args.MAX_SPEED * 10);
        this.body.drag.setTo(args.DRAG, 0);

        this.status = args.properties.status;
        this.gambits = args.properties.gambits;
        this.target = args.target;

        this.currentState = this.gambits.find(x => x.isDefault).actionIfTrue;

        // Temporary
        this.pickedPos = {
            x: this.x,
            y: this.y
        };

        this.currentDir = "right";

    }

    update() {

        // The computation takes place in the entity, since its world status is referenced from its own pov.
        this.status.has_los = AIHelpers.inLOS(this, this.target);
        this.status.has_dist = AIHelpers.inDistance(this, this.target);

        // Then we feed in the world status and decide what to do with ourselves.
        this.currentState = this.analyse(this.gambits, this.status, this.target);

        // When we have an action string, we know what state to push / activate.
        /// Needs to use types, not strings
        if (this.currentState === "roam")
            this.roam();

        if (this.currentState === "follow")
            this.chase();

    }

    roam() {

        let moving = this.moveTowards(this.pickedPos);

        if (!moving)
            this.pickedPos.x = this.getRandomInt(2 * 32, 15 * 32);

    }

    chase() {

        let moving = this.moveTowards(this.pickedPos);

        if (this.currentDir !== this.getTargetSide(this.target, this) || !moving) {
            this.pickedPos.x = this.target.x;
        }

    }

    getTargetSide(target, me) {

        return target.x - me.x < 0 ? "left" : "right";

    }

    moveTowards(pos) {

        this.body.velocity.x = 0;

        if (this.dist(pos, { x: this.x, y: this.y }) > 2) {

            let diff = {
                x: pos.x - this.x
            };

            let direction = diff.x < 0 ? "left" : "right";
            this.currentDir = direction;

            if (Math.round(Math.abs(diff.x)) > 10) {
                let spd = this.getRandomInt(80, 130);
                this.body.velocity.x = direction === "left" ? -spd : spd;
                return true;
            } else {
                this.body.velocity.x = 0;
                return false;
            }

        }

        return false;

    }

    dist(v1, v2) {

        return Phaser.Math.distance(v1.x, v1.y, v2.x, v2.y);

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
        //The maximum is exclusive and the minimum is inclusive
    }

}

module.exports = Bug;