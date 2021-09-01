"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxPriorityHeap = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const heap_1 = require("mnemonist/heap");
function compareTransactions(left, right) {
    const cmp = new ethereumjs_util_1.BN(left.data.gasPrice).cmp(new ethereumjs_util_1.BN(right.data.gasPrice));
    return cmp === 0 ? right.orderId - left.orderId : cmp;
}
class TxPriorityHeap {
    /**
     * Creates a structure which allows to retrieve the next processable transaction with
     * the highest gas price and the lowest order id.
     * Assumes that the values of `pendingTransactions` map are arrays of pending transactions
     * sorted by transaction nonces and that there are no gaps in the nonce sequence
     * (i.e. all transactions from the same sender can be executed one by one).
     * @param pendingTransactions map of (sender address) => (pending transactions list)
     */
    constructor(pendingTransactions) {
        this._queuedTransactions = new Map();
        this._heap = new heap_1.MaxHeap(compareTransactions);
        for (const [address, txList] of pendingTransactions) {
            const [firstTx, ...remainingTxs] = txList;
            this._heap.push(firstTx);
            this._queuedTransactions.set(address, remainingTxs);
        }
    }
    peek() {
        var _a;
        return (_a = this._heap.peek()) === null || _a === void 0 ? void 0 : _a.data;
    }
    /**
     * Remove the transaction at the top of the heap, and all the pending transactions
     * from the same sender.
     */
    pop() {
        const bestTx = this._heap.pop();
        if (bestTx !== undefined) {
            const bestTxSender = bestTx.data.getSenderAddress().toString();
            this._queuedTransactions.delete(bestTxSender);
        }
    }
    /**
     * Remove the transaction at the top of the heap.
     */
    shift() {
        var _a;
        const bestTx = this.peek();
        if (bestTx === undefined) {
            return;
        }
        const bestTxSender = bestTx.getSenderAddress().toString();
        const senderQueuedTxs = (_a = this._queuedTransactions.get(bestTxSender)) !== null && _a !== void 0 ? _a : [];
        if (senderQueuedTxs.length > 0) {
            const [nextTx, ...remainingTxs] = senderQueuedTxs;
            this._heap.replace(nextTx);
            this._queuedTransactions.set(bestTxSender, remainingTxs);
        }
        else {
            this._heap.pop();
        }
    }
}
exports.TxPriorityHeap = TxPriorityHeap;
//# sourceMappingURL=TxPriorityHeap.js.map