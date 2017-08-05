class AIHelpers {

    static inLOS(a, b)
    {
        // To implement from:
        // https://gamemechanicexplorer.com/#raycasting-1
        // console.log(a, b);
        return true;
    }

    static inDistance(v1, v2)
    {
        return Phaser.Math.distance(v1.x, v1.y, v2.x, v2.y);
    }

}

export default AIHelpers;