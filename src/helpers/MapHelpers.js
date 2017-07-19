class MapHelpers {

    static generateTileScore(u, d, l, r)
    {
        let sum = 0;
        sum += u ? 1 : 0;
        sum += r ? 2 : 0;
        sum += d ? 4 : 0;
        sum += l ? 8 : 0;
        return sum;
    }

}

module.exports = MapHelpers;