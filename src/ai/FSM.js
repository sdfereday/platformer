import IdleBehaviour from './behaviours/Idle';

class FSM {

    constructor() {
        this.stack = [];
        this.stack.push(new IdleBehaviour());
    }

    update(params) {

        this.top().update(params);

    }

    push(state, params) {

        if (this.stack.find(x => x.id === state.id))
            throw " - State duplication error, check you aren't pushing the same type.";

        this.stack.push(state);

        this.top().enter(params);

    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    pop() {

        if (this.stack.length === 0)
            throw " - No states to use!";

        if (this.top().locked)
            return;

        let removed = this.stack.splice(this.stack.length - 1, 1)[0];
        removed.exit();

        // GC (wouldn't have to do this if they were cached instead)
        removed = null;

    }

    clear() {

        this.stack = this.stack.filter(x => x.locked);

        if (this.stack.length > 1)
            throw " - Can only have one locked state.";

    }

    sameAsCurrent(id) {
        return this.top().id === id;
    }

}

export default FSM;