class MapHelpers {

    static generateTileScore(u, r, d, l) {
        let sum = 0;
        sum += u ? 1 : 0;
        sum += r ? 2 : 0;
        sum += d ? 4 : 0;
        sum += l ? 8 : 0;
        return sum;
    }

    static generateCSV(mapData) {
   
        let csvData = '';
        let tileScore = 0;
        let arrayWidth = mapData.width - 1;
        let arrayHeight = mapData.height - 1;

        // https://phaser.io/examples/v2/tilemaps/create-from-array#download
        // Doesn't have to be CSV, you can quite happily use json probably.
        for (let x = 0; x < mapData.area; x += 1) {

            // Generate tile scores based on neighbours
            if (mapData.atIndex(x) > 0) {

                // We know this tile has a block, so we want to know if it has nehbours
                tileScore = this.generateTileScore(
                    mapData.atIndex(x - arrayWidth), // up
                    mapData.atIndex(x + 1), // right
                    mapData.atIndex(x + arrayWidth), // below
                    mapData.atIndex(x - 1) // left
                );

            } else {

                // Nothing of interest surrounding us, treat as empty tile
                tileScore = 0;

            }

            // Generate node in data
            csvData += tileScore;

            // Ensure you don't append a comma at the end
            if (x < mapData.area - 1)
                csvData += ',';

            // Edge of row reached, increment to next
            if (x % mapData.width === arrayWidth)
                csvData += '\n';

        }

        return csvData;

    }

}

module.exports = MapHelpers;