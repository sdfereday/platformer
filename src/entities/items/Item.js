import mix from '../../helpers/Mixin';

class Pickup extends mix(Phaser.Sprite).with() {

    constructor(args) {

        super(args.game, args.x, args.y, args.name);
        args.game.add.existing(this);

        let game = args.game;

        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.body.allowGravity = false;

        this.id = args.modifier.id;
        this.value = args.modifier.value;

    }

}

module.exports = Pickup;