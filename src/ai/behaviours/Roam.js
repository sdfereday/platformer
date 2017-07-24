import StateBase from '../../ai/behaviours/StateBase';
import MathHelpers from '../../helpers/MathHelpers';

class Roam extends StateBase {

    constructor(status, moveCallback) {

        super();

        this.id = "roam";
        this.status = status;

        this.moveCallback = moveCallback;
        this.pickedPos = {
            x: this.x,
            y: this.y
        };

    }

    update() {

        let moving = this.moveCallback(this.pickedPos);

        if (!moving)
            this.pickedPos.x = MathHelpers.getRandomInt(2 * 32, 15 * 32);

    }

};

module.exports = Roam;