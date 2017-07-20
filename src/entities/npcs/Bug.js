import mix from '../../helpers/Mixin';
import AIHelpers from '../../helpers/AIHelpers';
import BehaviourManager from '../../ai/BehaviourManager';

class Bug extends mix(Phaser.Sprite).with(BehaviourManager) {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.status = args.properties.status;
        this.gambits = args.properties.gambits;
        this.target = args.target;
        
    }

    update() {
        
        // The computation takes place in the entity, since its world status is referenced from its own pov.
        this.status.has_los = AIHelpers.inLOS(this, this.target);

        // Then we feed in the world status and decide what to do with ourselves.
        let actionToTake = this.analyse(this.gambits, this.status, this.target);

        // When we have an action string, we know what state to push / activate.
        console.log(actionToTake);

    }

}

module.exports = Bug;