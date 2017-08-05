import StateBase from '../../ai/behaviours/StateBase';

class Idle extends StateBase {

    constructor() {
        
        super();
        
        this.id = "idle";
        this.locked = true;

    }

}

export default Idle;