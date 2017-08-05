class MathHelpers {

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
        //The maximum is exclusive and the minimum is inclusive
    }

    static clamp(v, c, mx, mn) {
        let n = v + c;
        mn = mn ? mn : 0;
        return n < mn ? mn : (n > mx ? mx : n);
    }

}

export default MathHelpers;