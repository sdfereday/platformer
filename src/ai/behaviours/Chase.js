import TYPES from '../../GameTypes';
import StateBase from '../../ai/behaviours/StateBase';
import PositionHelpers from '../../helpers/PositionHelpers';

class Chase extends StateBase {

    constructor(owner, status, target, moveCallback) {

        super();

        this.id = "chase";
        this.status = status;
        this.owner = owner;

        this.moveCallback = moveCallback;
        this.target = target;
        this.pickedPos = {
            x: this.target.x,
            y: this.target.y
        };

        this.currentDir = TYPES.DIR.RIGHT;

    }

    update() {

        let moving = this.moveCallback.call(this.owner, this.pickedPos);

        if (this.currentDir !== PositionHelpers.getTargetSide(this.target, this.owner) || !moving) {
            this.currentDir = PositionHelpers.getTargetSide(this.target, this.owner);
            this.pickedPos.x = this.target.x;
        }

    }

};

export default Chase;