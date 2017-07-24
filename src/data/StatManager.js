let StatManager = (superclass) => class extends superclass {

    populateStats(obj) {

        if (!this.stats)
            this.stats = [];

        for (let k in obj) {
            this.stats.push({
                "id": k,
                "v": obj[k]
            })
        }

    }

    modifyStat(id, n) {
        this.stats.find(x => x.id === id).v = n;
    }

};

module.exports = StatManager;