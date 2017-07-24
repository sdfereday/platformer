let StatManager = (superclass) => class extends superclass {

    populateStats(obj) {

        let stats = [];

        for (let k in obj) {
            stats.push({
                "id": k,
                "v": obj[k]
            })
        }

        return stats;

    }

    modifyStat(id, n, stats) {
        stats.find(x => x.id === id).v = n;
    }

};

module.exports = StatManager;