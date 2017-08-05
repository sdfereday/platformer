import TYPES from '../../GameTypes';
import mix from '../../helpers/Mixin';
import AIHelpers from '../../helpers/AIHelpers';
import PositionHelpers from '../../helpers/PositionHelpers';
import MathHelpers from '../../helpers/MathHelpers';
import Analyser from '../../ai/Analyser';

import FSM from '../../ai/FSM';
import ChaseBehaviour from '../../ai/behaviours/Chase';
import RoamBehaviour from '../../ai/behaviours/Roam';

class Bug extends mix(Phaser.Sprite).with(Analyser) {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.setTo(args.properties.physics.MAX_SPEED, args.properties.physics.MAX_SPEED * 10);
        this.body.drag.setTo(args.properties.physics.DRAG, 0);

        this.status = args.properties.status;
        this.gambits = args.properties.gambits;
        this.target = args.target;

        this.useState = this.gambits.find(x => x.isDefault).actionIfTrue;

        this.fsm = new FSM();

    }

    update() {

        // The computation takes place in the entity, since its world status is referenced from its own pov.
        this.status.has_los = AIHelpers.inLOS(this, this.target);
        this.status.has_dist = AIHelpers.inDistance(this, this.target);

        // Then we feed in the world status and decide what to do with ourselves.
        this.useState = this.analyse(this.gambits, this.status, this.target);

        // When we have an action string, we know what state to push / activate.
        /// Needs to use types, not strings, also, is this comparison a little slow?
        /// Is it also a little slow to instantiate like this? Why not cache them? TODO.
        /// Do we have the right way of calling the move function here?
        //// This area could use a little work. I'd suggest resorting to types instead of strings and whatnot.
        if (this.useState === "idle" && !this.fsm.sameAsCurrent(this.useState)) {
            this.fsm.clear();
        }

        if (this.useState === "roam" && !this.fsm.sameAsCurrent(this.useState)) {
            this.fsm.pop();
            this.fsm.push(new RoamBehaviour(this, this.status, this.moveTowards));
        }

        if (this.useState === "chase" && !this.fsm.sameAsCurrent(this.useState)) {
            this.fsm.pop();
            this.fsm.push(new ChaseBehaviour(this, this.status, this.target, this.moveTowards));
        }

        this.fsm.update(this.status);

    }

    moveTowards(pos) {

        this.body.velocity.x = 0;

        if (PositionHelpers.dist(pos, { x: this.x, y: this.y }) > 2) {

            let diff = {
                x: pos.x - this.x
            };

            // Use enums for these magic strings, applies all over!
            let direction = diff.x < 0 ? TYPES.DIR.LEFT : TYPES.DIR.RIGHT;

            // Don't use an arbitrary distance number, at least pass it as an arg. Or better yet, get from gambit.
            if (Math.round(Math.abs(diff.x)) > 10) {
                let spd = MathHelpers.getRandomInt(80, 130);
                this.body.velocity.x = direction === TYPES.DIR.LEFT ? -spd : spd;
                return true;
            } else {
                this.body.velocity.x = 0;
                return false;
            }

        }

        return false;

    }

}

export default Bug;