
class ParallelAsyncQueue {
    constructor(promiseArr, concurrencyLimit = 5) {
        if (isNaN(concurrencyLimit)) {
            throw new Error(400, "concurrencyLimit Param not a number")
        }
        if (!Array.isArray(promiseArr) || promiseArr.length == 0) {
            throw new Error("promiseArr param not an array or no async operation passed");
        }
        this.promiseArr = [].concat(promiseArr.map((promise, index) => ({ promise, index })));
        this.result = new Array(promiseArr.length).fill(null);
        this.error = new Array(promiseArr.length).fill(null);
        this.promises = new Array(concurrencyLimit).fill(Promise.resolve());
    }
    async All() {
        await Promise.all(this.promises.map(this.chainNext));
        return { response: this.result, error: this.error };
    }
    // Recursively chain the next Promise to the currently executed Promise
    async chainNext(promise) {
        if (this.promiseArr.length > 0) {
            let promiseObj = promiseArr.shift();
            return promise.then(() => {
                let operationPromise = promiseObj.promise.then(r => { this.result[promiseObj.index] = r })
                return this.chainNext(operationPromise);
            })
                .catch(error => {
                    this.error[promiseObj.index] = error.message;
                });
        }
        return promise;
    }
};

module.exports = ParallelAsyncQueue;
