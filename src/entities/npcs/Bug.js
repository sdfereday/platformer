import mix from '../../helpers/Mixin';

class Bug extends mix(Phaser.Sprite).with() {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

    }

}

module.exports = Bug;