class MapMaker {

    constructor() {
        this.mapCache = [];
        this.area = 0;
        this.width = 0;
        this.height = 0;
    }

    // Remember you cannot use/access static methods through class instances!
    create(mapData, tileSize) {

        this.width = mapData.map[0].length;
        this.height = mapData.map.length;
        this.area = this.width * this.height;
        this.mapCache = mapData.map.reduce((a, b) => a.concat(b));

        return this;

    }

    atIndex(i) {

        if(i < 0 || i > this.mapCache.length - 1)
            return null;

        return this.mapCache[i];

    }

}

// Ensures singleton state (I think...)
let mapMaker = mapMaker ? mapMaker : new MapMaker();
export default mapMaker;