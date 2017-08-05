import MathHelpers from "../helpers/MathHelpers";

let StatManager = (superclass) => class extends superclass {

    modifyStat(id, n, stats) {

        let stat = stats.find(x => x.id === id);
        stat.current = MathHelpers.clamp(n, stat.current, stat.max);

    }

};

export default StatManager;