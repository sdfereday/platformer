class MapHelpers {

    static generateTileScore(u, r, d, l) {
        let sum = 0;
        sum += u ? 1 : 0;
        sum += l ? 2 : 0;
        sum += d ? 4 : 0;
        sum += r ? 8 : 0;
        return sum;
    }

    static generateCSV(mapData) {
   
        let csvData = '';
        let tileScore = 0;
        let arrayWidth = mapData.width - 1;
        let arrayHeight = mapData.height - 1;

        // https://phaser.io/examples/v2/tilemaps/create-from-array#download
        // Doesn't have to be CSV, you can quite happily use json probably.
        // Feel free to change this so it picks n*2 of the number to pick a tile variant.
        for (let x = 0; x < mapData.area; x += 1) {

            // Generate tile scores based on neighbours (we only care about '1' here, use enums)
            if (mapData.atIndex(x) === 1) {

                // We know this tile has a block, so we want to know if it has nehbours
                // Don't be mislead, we need the real width, not zero-based here since we're dealing with number of squares
                // as opposed to 'index' of squares.
                tileScore = this.generateTileScore(
                    mapData.atIndex(x - mapData.width), // up
                    mapData.atIndex(x + 1), // right
                    mapData.atIndex(x + mapData.width), // below
                    mapData.atIndex(x - 1) // left
                );

            } else {

                // Nothing of interest surrounding us, treat as empty tile
                tileScore = -1;

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

export default MapHelpers;