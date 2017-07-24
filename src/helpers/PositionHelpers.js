class PositionHelpers {

    static dist(v1, v2) {

        return Phaser.Math.distance(v1.x, v1.y, v2.x, v2.y);

    }

    static getTargetSide(target, me) {

        return target.x - me.x < 0 ? "left" : "right";

    }

}

module.exports = PositionHelpers;