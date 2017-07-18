class BlockFactory {

    static Create(Cns, options) {

        return Cns ? new Cns(options) : {};

    }

}

module.exports = BlockFactory;