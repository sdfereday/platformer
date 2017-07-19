import Block from '../entities/blocks/Block';

class BlockFactory {

    static create(options) {

        return new Block(options);

    }

}

module.exports = BlockFactory;