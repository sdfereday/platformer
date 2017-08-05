import MathHelpers from "../helpers/MathHelpers";

let StatManager = (superclass) => class extends superclass {

    populateStats(obj) {

        let stats = [];

        for (let k in obj) {
            stats.push({
                "id": k,
                "m": obk[k].max,
                "v": obj[k].now
            })
        }

        return stats;

    }

    modifyStat(id, n, stats) {

        let stat = stats.find(x => x.id === id);

        console.log(stat);

        if(stat)
            stat.v = MathHelpers.clamp(n, stat.v, stat.m);
        
        console.log(id, n, stats);

    }

};

export default StatManager;