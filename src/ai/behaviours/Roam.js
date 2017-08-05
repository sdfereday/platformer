import StateBase from '../../ai/behaviours/StateBase';
import MathHelpers from '../../helpers/MathHelpers';

class Roam extends StateBase {

    constructor(owner, status, moveCallback) {

        super();

        this.id = "roam";
        this.status = status;
        this.owner = owner;

        this.moveCallback = moveCallback;
        this.pickedPos = {
            x: this.owner.x,
            y: this.owner.y
        };

    }

    update() {

        let moving = this.moveCallback.call(this.owner, this.pickedPos);

        if (!moving) {
            this.pickedPos.x = MathHelpers.getRandomInt(2 * 32, 15 * 32);
            this.pickedPos.y = this.pickedPos.y;
        }

    }

};

export default Roam;