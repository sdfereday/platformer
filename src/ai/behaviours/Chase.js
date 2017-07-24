import StateBase from '../../ai/behaviours/StateBase';
import PositionHelpers from '../../helpers/PositionHelpers';

class Chase extends StateBase {

    constructor(status, target, moveCallback) {

        super();

        this.id = "chase";
        this.status = status;

        this.moveCallback = moveCallback;
        this.target = target;
        this.pickedPos = {
            x: this.x,
            y: this.y
        };

        this.currentDir = CONSTS.DIR.RIGHT;

    }

    update() {

        let moving = this.moveTowards(this.pickedPos);

        if (this.currentDir !== PositionHelpers.getTargetSide(this.target, this) || !moving) {
            this.currentDir = PositionHelpers.getTargetSide(this.target, this);
            this.pickedPos.x = this.target.x;
        }

    }

};

module.exports = Chase;