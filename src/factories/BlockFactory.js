import CoinBlock from '../entities/blocks/CoinBlock';

class BlockFactory {

    static create(options) {
        
        let BlockClass = null;

        switch(options.id) {
            case "coin":
                BlockClass = CoinBlock;
                break;
        }

        return new BlockClass(options);

    }

}

export default BlockFactory;