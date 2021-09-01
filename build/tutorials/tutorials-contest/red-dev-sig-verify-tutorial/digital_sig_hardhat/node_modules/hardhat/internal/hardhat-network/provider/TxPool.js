"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxPool = exports.deserializeTransaction = exports.serializeTransaction = void 0;
const tx_1 = require("@ethereumjs/tx");
const ethereumjs_util_1 = require("ethereumjs-util");
const immutable_1 = require("immutable");
const errors_1 = require("../../core/providers/errors");
const PoolState_1 = require("./PoolState");
const FakeSenderAccessListEIP2930Transaction_1 = require("./transactions/FakeSenderAccessListEIP2930Transaction");
const FakeSenderTransaction_1 = require("./transactions/FakeSenderTransaction");
const bnToHex_1 = require("./utils/bnToHex");
const reorganizeTransactionsLists_1 = require("./utils/reorganizeTransactionsLists");
// tslint:disable only-hardhat-error
function serializeTransaction(tx) {
    const rlpSerialization = ethereumjs_util_1.bufferToHex(tx.data.serialize());
    const isFake = tx.data instanceof FakeSenderTransaction_1.FakeSenderTransaction ||
        tx.data instanceof FakeSenderAccessListEIP2930Transaction_1.FakeSenderAccessListEIP2930Transaction;
    return PoolState_1.makeSerializedTransaction({
        orderId: tx.orderId,
        fakeFrom: isFake ? tx.data.getSenderAddress().toString() : undefined,
        data: rlpSerialization,
        txType: tx.data.transactionType,
    });
}
exports.serializeTransaction = serializeTransaction;
function deserializeTransaction(tx, common) {
    const rlpSerialization = tx.get("data");
    const fakeFrom = tx.get("fakeFrom");
    let data;
    if (fakeFrom !== undefined) {
        const sender = ethereumjs_util_1.Address.fromString(fakeFrom);
        const serialization = ethereumjs_util_1.toBuffer(rlpSerialization);
        if (tx.get("txType") === 1) {
            data = FakeSenderAccessListEIP2930Transaction_1.FakeSenderAccessListEIP2930Transaction.fromSenderAndRlpSerializedTx(sender, serialization, { common });
        }
        else {
            data = FakeSenderTransaction_1.FakeSenderTransaction.fromSenderAndRlpSerializedTx(sender, serialization, { common });
        }
    }
    else {
        data = tx_1.TransactionFactory.fromSerializedData(ethereumjs_util_1.toBuffer(rlpSerialization), {
            common,
        });
    }
    return {
        orderId: tx.get("orderId"),
        data,
    };
}
exports.deserializeTransaction = deserializeTransaction;
class TxPool {
    constructor(_stateManager, blockGasLimit, common) {
        this._stateManager = _stateManager;
        this._snapshotIdToState = new Map();
        this._nextSnapshotId = 0;
        this._nextOrderId = 0;
        this._state = PoolState_1.makePoolState({
            blockGasLimit: bnToHex_1.bnToHex(blockGasLimit),
        });
        this._deserializeTransaction = (tx) => deserializeTransaction(tx, common);
    }
    async addTransaction(tx) {
        const senderAddress = this._getSenderAddress(tx);
        const senderNonce = await this.getExecutableNonce(senderAddress);
        await this._validateTransaction(tx, senderAddress, senderNonce);
        const txNonce = new ethereumjs_util_1.BN(tx.nonce);
        if (txNonce.eq(senderNonce)) {
            this._addPendingTransaction(tx);
        }
        else {
            this._addQueuedTransaction(tx);
        }
    }
    snapshot() {
        const id = this._nextSnapshotId++;
        this._snapshotIdToState.set(id, this._state);
        return id;
    }
    revert(snapshotId) {
        const state = this._snapshotIdToState.get(snapshotId);
        if (state === undefined) {
            throw new Error("There's no snapshot with such ID");
        }
        this._state = state;
        this._removeSnapshotsAfter(snapshotId);
    }
    getTransactionByHash(hash) {
        const tx = this._getTransactionsByHash().get(ethereumjs_util_1.bufferToHex(hash));
        if (tx !== undefined) {
            return this._deserializeTransaction(tx);
        }
        return undefined;
    }
    hasPendingTransactions() {
        const pendingMap = this._getPending();
        return pendingMap.some((senderPendingTxs) => !senderPendingTxs.isEmpty());
    }
    hasQueuedTransactions() {
        const queuedMap = this._getQueued();
        return queuedMap.some((senderQueuedTxs) => !senderQueuedTxs.isEmpty());
    }
    getPendingTransactions() {
        const deserializedImmutableMap = this._getPending()
            .filter((txs) => txs.size > 0)
            .map((txs) => txs.map(this._deserializeTransaction).toJS());
        return new Map(deserializedImmutableMap.entries());
    }
    getQueuedTransactions() {
        const deserializedImmutableMap = this._getQueued()
            .filter((txs) => txs.size > 0)
            .map((txs) => txs.map(this._deserializeTransaction).toJS());
        return new Map(deserializedImmutableMap.entries());
    }
    async getExecutableNonce(accountAddress) {
        const pendingTxs = this._getPendingForAddress(accountAddress.toString());
        const lastPendingTx = pendingTxs === null || pendingTxs === void 0 ? void 0 : pendingTxs.last(undefined);
        if (lastPendingTx === undefined) {
            const account = await this._stateManager.getAccount(accountAddress);
            return account.nonce;
        }
        const lastPendingTxNonce = this._deserializeTransaction(lastPendingTx).data
            .nonce;
        return lastPendingTxNonce.addn(1);
    }
    getBlockGasLimit() {
        return new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(this._state.get("blockGasLimit")));
    }
    setBlockGasLimit(newLimit) {
        if (typeof newLimit === "number") {
            newLimit = new ethereumjs_util_1.BN(newLimit);
        }
        this._setBlockGasLimit(newLimit);
    }
    /**
     * Updates the pending and queued list of all addresses, along with their
     * executable nonces.
     */
    async updatePendingAndQueued() {
        var _a;
        let newPending = this._getPending();
        // update pending transactions
        for (const [address, txs] of newPending) {
            const senderAccount = await this._stateManager.getAccount(ethereumjs_util_1.Address.fromString(address));
            const senderNonce = new ethereumjs_util_1.BN(senderAccount.nonce);
            const senderBalance = new ethereumjs_util_1.BN(senderAccount.balance);
            let moveToQueued = false;
            for (const tx of txs) {
                const deserializedTx = this._deserializeTransaction(tx);
                if (moveToQueued) {
                    newPending = this._removeTx(newPending, address, deserializedTx);
                    const queued = (_a = this._getQueuedForAddress(address)) !== null && _a !== void 0 ? _a : immutable_1.List();
                    this._setQueuedForAddress(address, queued.push(tx));
                    continue;
                }
                const txNonce = new ethereumjs_util_1.BN(deserializedTx.data.nonce);
                const txGasLimit = new ethereumjs_util_1.BN(deserializedTx.data.gasLimit);
                if (txGasLimit.gt(this.getBlockGasLimit()) ||
                    txNonce.lt(senderNonce) ||
                    deserializedTx.data.getUpfrontCost().gt(senderBalance)) {
                    newPending = this._removeTx(newPending, address, deserializedTx);
                    // if we are dropping a pending transaction, then we move
                    // all the following txs to the queued
                    if (txNonce.gt(senderNonce)) {
                        moveToQueued = true;
                    }
                }
            }
        }
        this._setPending(newPending);
        // update queued addresses
        let newQueued = this._getQueued();
        for (const [address, txs] of newQueued) {
            const senderAccount = await this._stateManager.getAccount(ethereumjs_util_1.Address.fromString(address));
            const senderNonce = new ethereumjs_util_1.BN(senderAccount.nonce);
            const senderBalance = new ethereumjs_util_1.BN(senderAccount.balance);
            for (const tx of txs) {
                const deserializedTx = this._deserializeTransaction(tx);
                const txNonce = new ethereumjs_util_1.BN(deserializedTx.data.nonce);
                const txGasLimit = new ethereumjs_util_1.BN(deserializedTx.data.gasLimit);
                if (txGasLimit.gt(this.getBlockGasLimit()) ||
                    txNonce.lt(senderNonce) ||
                    deserializedTx.data.getUpfrontCost().gt(senderBalance)) {
                    newQueued = this._removeTx(newQueued, address, deserializedTx);
                }
            }
        }
        this._setQueued(newQueued);
    }
    _getSenderAddress(tx) {
        try {
            return tx.getSenderAddress(); // verifies signature
        }
        catch (e) {
            if (!tx.isSigned()) {
                throw new errors_1.InvalidInputError("Invalid Signature");
            }
            throw new errors_1.InvalidInputError(e.message);
        }
    }
    _removeSnapshotsAfter(snapshotId) {
        const snapshotIds = [...this._snapshotIdToState.keys()].filter((x) => x >= snapshotId);
        for (const id of snapshotIds) {
            this._snapshotIdToState.delete(id);
        }
    }
    _removeTx(map, address, deserializedTX) {
        const accountTxs = map.get(address);
        if (accountTxs === undefined) {
            throw new Error("Trying to remove a transaction from list that doesn't exist, this should never happen");
        }
        this._deleteTransactionByHash(deserializedTX.data.hash());
        const indexOfTx = accountTxs.indexOf(serializeTransaction(deserializedTX));
        return map.set(address, accountTxs.remove(indexOfTx));
    }
    _addPendingTransaction(tx) {
        var _a, _b;
        const orderedTx = serializeTransaction({
            orderId: this._nextOrderId++,
            data: tx,
        });
        const hexSenderAddress = tx.getSenderAddress().toString();
        const accountTransactions = (_a = this._getPendingForAddress(hexSenderAddress)) !== null && _a !== void 0 ? _a : immutable_1.List();
        const { newPending, newQueued } = reorganizeTransactionsLists_1.reorganizeTransactionsLists(accountTransactions.push(orderedTx), (_b = this._getQueuedForAddress(hexSenderAddress)) !== null && _b !== void 0 ? _b : immutable_1.List(), (stx) => this._deserializeTransaction(stx).data.nonce);
        this._setPendingForAddress(hexSenderAddress, newPending);
        this._setQueuedForAddress(hexSenderAddress, newQueued);
        this._setTransactionByHash(ethereumjs_util_1.bufferToHex(tx.hash()), orderedTx);
    }
    _addQueuedTransaction(tx) {
        var _a;
        const orderedTx = serializeTransaction({
            orderId: this._nextOrderId++,
            data: tx,
        });
        const hexSenderAddress = tx.getSenderAddress().toString();
        const accountTransactions = (_a = this._getQueuedForAddress(hexSenderAddress)) !== null && _a !== void 0 ? _a : immutable_1.List();
        this._setQueuedForAddress(hexSenderAddress, accountTransactions.push(orderedTx));
        this._setTransactionByHash(ethereumjs_util_1.bufferToHex(tx.hash()), orderedTx);
    }
    async _validateTransaction(tx, senderAddress, senderNonce) {
        if (this._knownTransaction(tx)) {
            throw new errors_1.InvalidInputError(`Known transaction: ${ethereumjs_util_1.bufferToHex(tx.hash())}`);
        }
        // Temporary check that should be removed when transaction replacement is added
        if (this._txWithNonceExists(tx)) {
            throw new errors_1.InvalidInputError(`Transaction with nonce ${tx.nonce.toNumber()} already exists in transaction pool`);
        }
        const txNonce = new ethereumjs_util_1.BN(tx.nonce);
        // Geth returns this error if trying to create a contract and no data is provided
        if (tx.to === undefined && tx.data.length === 0) {
            throw new errors_1.InvalidInputError("contract creation without any data provided");
        }
        const senderAccount = await this._stateManager.getAccount(senderAddress);
        const senderBalance = new ethereumjs_util_1.BN(senderAccount.balance);
        if (tx.getUpfrontCost().gt(senderBalance)) {
            throw new errors_1.InvalidInputError(`sender doesn't have enough funds to send tx. The upfront cost is: ${tx
                .getUpfrontCost()
                .toString()}` +
                ` and the sender's account only has: ${senderBalance.toString()}`);
        }
        if (txNonce.lt(senderNonce)) {
            throw new errors_1.InvalidInputError(`Nonce too low. Expected nonce to be at least ${senderNonce.toString()} but got ${txNonce.toString()}.`);
        }
        const gasLimit = new ethereumjs_util_1.BN(tx.gasLimit);
        const baseFee = tx.getBaseFee();
        if (gasLimit.lt(baseFee)) {
            throw new errors_1.InvalidInputError(`Transaction requires at least ${baseFee} gas but got ${gasLimit}`);
        }
        const blockGasLimit = this.getBlockGasLimit();
        if (gasLimit.gt(blockGasLimit)) {
            throw new errors_1.InvalidInputError(`Transaction gas limit is ${gasLimit} and exceeds block gas limit of ${blockGasLimit}`);
        }
    }
    _knownTransaction(tx) {
        const senderAddress = tx.getSenderAddress().toString();
        return (this._transactionExists(tx, this._getPendingForAddress(senderAddress)) ||
            this._transactionExists(tx, this._getQueuedForAddress(senderAddress)));
    }
    _transactionExists(tx, txList) {
        const existingTx = txList === null || txList === void 0 ? void 0 : txList.find((etx) => this._deserializeTransaction(etx).data.hash().equals(tx.hash()));
        return existingTx !== undefined;
    }
    _txWithNonceExists(tx) {
        var _a;
        const senderAddress = tx.getSenderAddress().toString();
        const queuedTxs = (_a = this._getQueuedForAddress(senderAddress)) !== null && _a !== void 0 ? _a : immutable_1.List();
        const queuedTx = queuedTxs.find((ftx) => this._deserializeTransaction(ftx).data.nonce.eq(tx.nonce));
        return queuedTx !== undefined;
    }
    _getTransactionsByHash() {
        return this._state.get("hashToTransaction");
    }
    _getPending() {
        return this._state.get("pendingTransactions");
    }
    _getQueued() {
        return this._state.get("queuedTransactions");
    }
    _getPendingForAddress(address) {
        return this._getPending().get(address);
    }
    _getQueuedForAddress(address) {
        return this._getQueued().get(address);
    }
    _setTransactionByHash(hash, transaction) {
        this._state = this._state.set("hashToTransaction", this._getTransactionsByHash().set(hash, transaction));
    }
    _setPending(transactions) {
        this._state = this._state.set("pendingTransactions", transactions);
    }
    _setQueued(transactions) {
        this._state = this._state.set("queuedTransactions", transactions);
    }
    _setPendingForAddress(address, transactions) {
        this._state = this._state.set("pendingTransactions", this._getPending().set(address, transactions));
    }
    _setQueuedForAddress(address, transactions) {
        this._state = this._state.set("queuedTransactions", this._getQueued().set(address, transactions));
    }
    _setBlockGasLimit(newLimit) {
        this._state = this._state.set("blockGasLimit", bnToHex_1.bnToHex(newLimit));
    }
    _deleteTransactionByHash(hash) {
        this._state = this._state.set("hashToTransaction", this._getTransactionsByHash().delete(ethereumjs_util_1.bufferToHex(hash)));
    }
}
exports.TxPool = TxPool;
//# sourceMappingURL=TxPool.js.map