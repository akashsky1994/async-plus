class AysncPlus {
    constructor(promiseArr,concurrencyLimit = 5){
        this.promiseArr = promiseArr;
        this.result = new Array(promiseArr.length);
        this.promises = new Array(concurrencyLimit).fill(Promise.resolve());
    }
    async All(){
        await Promise.all(this.promiseArr.map(this.chainNext));
        return result;
    }
    // Recursively chain the next Promise to the currently executed Promise
    async chainNext(promise) {
        if (this.promiseArr.length > 0) {
            return promise.then(() => {
                return chainNext(promiseArr.shift());
            });
        }
        return promise;
    }
};

module.exports = AysncPlus
