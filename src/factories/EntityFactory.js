import Block from '../entities/blocks/Block';
import CoinBlock from '../entities/blocks/CoinBlock';
import Pickup from '../entities/pickups/Pickup';
import Bug from '../entities/npcs/Bug';

class EntityFactory {

    static create(options) {

        switch (options.type) {
            case 0:
                return new Block(options);
            case 1:
                return new CoinBlock(options);
            case 2:
                return new Pickup(options);
            case 3:
                return new Bug(options);
        }

    }

}

module.exports = EntityFactory;