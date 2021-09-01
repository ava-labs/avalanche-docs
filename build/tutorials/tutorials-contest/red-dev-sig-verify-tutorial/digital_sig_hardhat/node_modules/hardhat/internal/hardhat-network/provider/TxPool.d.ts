/// <reference types="node" />
import Common from "@ethereumjs/common";
import { TypedTransaction } from "@ethereumjs/tx";
import { StateManager } from "@ethereumjs/vm/dist/state";
import { Address, BN } from "ethereumjs-util";
import { OrderedTransaction, SerializedTransaction } from "./PoolState";
export declare function serializeTransaction(tx: OrderedTransaction): SerializedTransaction;
export declare function deserializeTransaction(tx: SerializedTransaction, common: Common): OrderedTransaction;
export declare class TxPool {
    private readonly _stateManager;
    private _state;
    private _snapshotIdToState;
    private _nextSnapshotId;
    private _nextOrderId;
    private readonly _deserializeTransaction;
    constructor(_stateManager: StateManager, blockGasLimit: BN, common: Common);
    addTransaction(tx: TypedTransaction): Promise<void>;
    snapshot(): number;
    revert(snapshotId: number): void;
    getTransactionByHash(hash: Buffer): OrderedTransaction | undefined;
    hasPendingTransactions(): boolean;
    hasQueuedTransactions(): boolean;
    getPendingTransactions(): Map<string, OrderedTransaction[]>;
    getQueuedTransactions(): Map<string, OrderedTransaction[]>;
    getExecutableNonce(accountAddress: Address): Promise<BN>;
    getBlockGasLimit(): BN;
    setBlockGasLimit(newLimit: BN | number): void;
    /**
     * Updates the pending and queued list of all addresses, along with their
     * executable nonces.
     */
    updatePendingAndQueued(): Promise<void>;
    private _getSenderAddress;
    private _removeSnapshotsAfter;
    private _removeTx;
    private _addPendingTransaction;
    private _addQueuedTransaction;
    private _validateTransaction;
    private _knownTransaction;
    private _transactionExists;
    private _txWithNonceExists;
    private _getTransactionsByHash;
    private _getPending;
    private _getQueued;
    private _getPendingForAddress;
    private _getQueuedForAddress;
    private _setTransactionByHash;
    private _setPending;
    private _setQueued;
    private _setPendingForAddress;
    private _setQueuedForAddress;
    private _setBlockGasLimit;
    private _deleteTransactionByHash;
}
//# sourceMappingURL=TxPool.d.ts.map