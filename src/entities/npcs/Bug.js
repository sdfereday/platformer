class Bug extends mix(NPC).with() {

    constructor(args) {

        super(this, args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

    }

}

module.exports = Bug;