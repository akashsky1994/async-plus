const ParallelAsyncQueue = require("./src/parallel-queue");

/**
 * asyncQueue - processes asynchronous operations in parallel queue
 * @param {Number} concurrencyLimit 
 * @param {Array<Promise>} promiseArr 
 * @returns {Object<Array,Error>}
 */
const asyncQueue = (concurrencyLimit,promiseArr) => {
    const pAsyncQueue = new ParallelAsyncQueue(promiseArr,concurrencyLimit);
    return pAsyncQueue.All();
};

module.exports = {
    asyncQueue
};