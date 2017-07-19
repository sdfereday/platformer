import mix from '../../helpers/Mixin';
import Block from '../blocks/Block';

class CoinBlock extends mix(Block).with() {

    // Coin blocks need to make use of mixins for the extra functionality given.
    constructor(args) {       
        
        super(args);
        
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onInteract, this);

    }

    onInteract() { // <-- Can this be called from in here?
        
        console.log("Player hit me!");

    }

}

module.exports = CoinBlock;