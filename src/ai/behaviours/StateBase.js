class StateBase {

    constructor() {
        
        this.id = "undefined";
        this.owner = null;
        this.locked = false;

    }

    enter() {
        //...
    }

    update() {
        //...
    }

    exit() {
        //...
    }

}

module.exports = StateBase;