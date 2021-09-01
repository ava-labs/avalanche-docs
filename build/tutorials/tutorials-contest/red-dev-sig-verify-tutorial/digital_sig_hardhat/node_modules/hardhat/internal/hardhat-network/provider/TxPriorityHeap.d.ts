import { TypedTransaction } from "@ethereumjs/tx";
import { OrderedTransaction } from "./PoolState";
export declare class TxPriorityHeap {
    private readonly _queuedTransactions;
    private readonly _heap;
    /**
     * Creates a structure which allows to retrieve the next processable transaction with
     * the highest gas price and the lowest order id.
     * Assumes that the values of `pendingTransactions` map are arrays of pending transactions
     * sorted by transaction nonces and that there are no gaps in the nonce sequence
     * (i.e. all transactions from the same sender can be executed one by one).
     * @param pendingTransactions map of (sender address) => (pending transactions list)
     */
    constructor(pendingTransactions: Map<string, OrderedTransaction[]>);
    peek(): TypedTransaction | undefined;
    /**
     * Remove the transaction at the top of the heap, and all the pending transactions
     * from the same sender.
     */
    pop(): void;
    /**
     * Remove the transaction at the top of the heap.
     */
    shift(): void;
}
//# sourceMappingURL=TxPriorityHeap.d.ts.map