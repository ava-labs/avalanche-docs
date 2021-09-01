"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTxReceipt = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const block_1 = require("@ethereumjs/block");
const bloom_1 = __importDefault(require("./bloom"));
const evm_1 = __importDefault(require("./evm/evm"));
const message_1 = __importDefault(require("./evm/message"));
const txContext_1 = __importDefault(require("./evm/txContext"));
const precompiles_1 = require("./evm/precompiles");
/**
 * @ignore
 */
async function runTx(opts) {
    var _a;
    // tx is required
    if (!opts.tx) {
        throw new Error('invalid input, tx is required');
    }
    // create a reasonable default if no block is given
    opts.block = (_a = opts.block) !== null && _a !== void 0 ? _a : block_1.Block.fromBlockData({}, { common: opts.tx.common });
    if (opts.skipBlockGasLimitValidation !== true &&
        opts.block.header.gasLimit.lt(opts.tx.gasLimit)) {
        throw new Error('tx has a higher gas limit than the block');
    }
    // Have to cast as `EIP2929StateManager` to access clearWarmedAccounts
    const state = this.stateManager;
    if (opts.reportAccessList && !('generateAccessList' in state)) {
        throw new Error('reportAccessList needs a StateManager implementing the generateAccessList() method');
    }
    // Ensure we start with a clear warmed accounts Map
    if (this._common.isActivatedEIP(2929)) {
        state.clearWarmedAccounts();
    }
    await state.checkpoint();
    // Typed transaction specific setup tasks
    if (opts.tx.transactionType !== 0 && this._common.isActivatedEIP(2718)) {
        // Is it an Access List transaction?
        if (!this._common.isActivatedEIP(2930)) {
            await state.revert();
            throw new Error('Cannot run transaction: EIP 2930 is not activated.');
        }
        if (opts.reportAccessList && !('generateAccessList' in state)) {
            await state.revert();
            throw new Error('StateManager needs to implement generateAccessList() when running with reportAccessList option');
        }
        if (opts.tx.transactionType === 2 && !this._common.isActivatedEIP(1559)) {
            await state.revert();
            throw new Error('Cannot run transaction: EIP 1559 is not activated.');
        }
        const castedTx = opts.tx;
        castedTx.AccessListJSON.forEach((accessListItem) => {
            const address = ethereumjs_util_1.toBuffer(accessListItem.address);
            state.addWarmedAddress(address);
            accessListItem.storageKeys.forEach((storageKey) => {
                state.addWarmedStorage(address, ethereumjs_util_1.toBuffer(storageKey));
            });
        });
    }
    try {
        const result = await _runTx.bind(this)(opts);
        await state.commit();
        if (this._common.isActivatedEIP(2929) && opts.reportAccessList) {
            const { tx } = opts;
            // Do not include sender address in access list
            const removed = [tx.getSenderAddress()];
            // Only include to address on present storage slot accesses
            const onlyStorage = tx.to ? [tx.to] : [];
            result.accessList = state.generateAccessList(removed, onlyStorage);
        }
        return result;
    }
    catch (e) {
        await state.revert();
        throw e;
    }
    finally {
        if (this._common.isActivatedEIP(2929)) {
            state.clearWarmedAccounts();
        }
    }
}
exports.default = runTx;
async function _runTx(opts) {
    var _a;
    // Casted as `any` to access the EIP2929 methods
    const state = this.stateManager;
    const { tx, block } = opts;
    if (!block) {
        throw new Error('block required');
    }
    /**
     * The `beforeTx` event
     *
     * @event Event: beforeTx
     * @type {Object}
     * @property {Transaction} tx emits the Transaction that is about to be processed
     */
    await this._emit('beforeTx', tx);
    const caller = tx.getSenderAddress();
    if (this._common.isActivatedEIP(2929)) {
        // Add origin and precompiles to warm addresses
        precompiles_1.getActivePrecompiles(this._common).forEach((address) => state.addWarmedAddress(address.buf));
        state.addWarmedAddress(caller.buf);
        if (tx.to) {
            // Note: in case we create a contract, we do this in EVMs `_executeCreate` (this is also correct in inner calls, per the EIP)
            state.addWarmedAddress(tx.to.buf);
        }
    }
    // Validate gas limit against base fee
    const basefee = tx.getBaseFee();
    const gasLimit = tx.gasLimit.clone();
    if (gasLimit.lt(basefee)) {
        throw new Error('base fee exceeds gas limit');
    }
    gasLimit.isub(basefee);
    // Check from account's balance and nonce
    let fromAccount = await state.getAccount(caller);
    const { nonce, balance } = fromAccount;
    if (!opts.skipBalance) {
        const cost = tx.getUpfrontCost(block.header.baseFeePerGas);
        if (balance.lt(cost)) {
            throw new Error(`sender doesn't have enough funds to send tx. The upfront cost is: ${cost} and the sender's account only has: ${balance}`);
        }
    }
    else if (!opts.skipNonce) {
        if (!nonce.eq(tx.nonce)) {
            throw new Error(`the tx doesn't have the correct nonce. account has nonce of: ${nonce} tx has nonce of: ${tx.nonce}`);
        }
    }
    let gasPrice;
    let inclusionFeePerGas;
    // EIP-1559 tx
    if (tx.transactionType === 2) {
        const baseFee = block.header.baseFeePerGas;
        inclusionFeePerGas = ethereumjs_util_1.BN.min(tx.maxPriorityFeePerGas, tx.maxFeePerGas.sub(baseFee));
        gasPrice = inclusionFeePerGas.add(baseFee);
    }
    else {
        // Have to cast it as legacy transaction: EIP1559 transaction does not have gas price
        gasPrice = tx.gasPrice;
        if (this._common.isActivatedEIP(1559)) {
            const baseFee = block.header.baseFeePerGas;
            inclusionFeePerGas = tx.gasPrice.sub(baseFee);
        }
    }
    // Update from account's nonce and balance
    fromAccount.nonce.iaddn(1);
    const txCost = tx.gasLimit.mul(gasPrice);
    fromAccount.balance.isub(txCost);
    await state.putAccount(caller, fromAccount);
    /*
     * Execute message
     */
    const txContext = new txContext_1.default(gasPrice, caller);
    const { value, data, to } = tx;
    const message = new message_1.default({
        caller,
        gasLimit,
        to,
        value,
        data,
    });
    const evm = new evm_1.default(this, txContext, block);
    const results = (await evm.executeMessage(message));
    /*
     * Parse results
     */
    // Generate the bloom for the tx
    results.bloom = txLogsBloom(results.execResult.logs);
    // Caculate the total gas used
    results.gasUsed.iadd(basefee);
    // Process any gas refund
    // TODO: determine why the gasRefund from execResult is not used here directly
    let gasRefund = evm._refund;
    const maxRefundQuotient = this._common.param('gasConfig', 'maxRefundQuotient');
    if (!gasRefund.isZero()) {
        const maxRefund = results.gasUsed.divn(maxRefundQuotient);
        gasRefund = ethereumjs_util_1.BN.min(gasRefund, maxRefund);
        results.gasUsed.isub(gasRefund);
    }
    results.amountSpent = results.gasUsed.mul(gasPrice);
    // Update sender's balance
    fromAccount = await state.getAccount(caller);
    const actualTxCost = results.gasUsed.mul(gasPrice);
    const txCostDiff = txCost.sub(actualTxCost);
    fromAccount.balance.iadd(txCostDiff);
    await state.putAccount(caller, fromAccount);
    // Update miner's balance
    let miner;
    if (this._common.consensusType() === 'pow') {
        miner = block.header.coinbase;
    }
    else {
        // Backwards-compatibilty check
        // TODO: can be removed along VM v6 release
        if ('cliqueSigner' in block.header) {
            miner = block.header.cliqueSigner();
        }
        else {
            miner = ethereumjs_util_1.Address.zero();
        }
    }
    const minerAccount = await state.getAccount(miner);
    // add the amount spent on gas to the miner's account
    if (this._common.isActivatedEIP(1559)) {
        minerAccount.balance.iadd(results.gasUsed.mul(inclusionFeePerGas));
    }
    else {
        minerAccount.balance.iadd(results.amountSpent);
    }
    // Put the miner account into the state. If the balance of the miner account remains zero, note that
    // the state.putAccount function puts this into the "touched" accounts. This will thus be removed when
    // we clean the touched accounts below in case we are in a fork >= SpuriousDragon
    await state.putAccount(miner, minerAccount);
    /*
     * Cleanup accounts
     */
    if (results.execResult.selfdestruct) {
        const keys = Object.keys(results.execResult.selfdestruct);
        for (const k of keys) {
            const address = new ethereumjs_util_1.Address(Buffer.from(k, 'hex'));
            await state.deleteAccount(address);
        }
    }
    await state.cleanupTouchedAccounts();
    state.clearOriginalStorageCache();
    // Generate the tx receipt
    const cumulativeGasUsed = ((_a = opts.blockGasUsed) !== null && _a !== void 0 ? _a : block.header.gasUsed).add(results.gasUsed);
    results.receipt = await generateTxReceipt.bind(this)(tx, results, cumulativeGasUsed);
    /**
     * The `afterTx` event
     *
     * @event Event: afterTx
     * @type {Object}
     * @property {Object} result result of the transaction
     */
    const event = Object.assign({ transaction: tx }, results);
    await this._emit('afterTx', event);
    return results;
}
/**
 * @method txLogsBloom
 * @private
 */
function txLogsBloom(logs) {
    const bloom = new bloom_1.default();
    if (logs) {
        for (let i = 0; i < logs.length; i++) {
            const log = logs[i];
            // add the address
            bloom.add(log[0]);
            // add the topics
            const topics = log[1];
            for (let q = 0; q < topics.length; q++) {
                bloom.add(topics[q]);
            }
        }
    }
    return bloom;
}
/**
 * Returns the tx receipt.
 * @param this The vm instance
 * @param tx The transaction
 * @param txResult The tx result
 * @param cumulativeGasUsed The gas used in the block including this tx
 */
async function generateTxReceipt(tx, txResult, cumulativeGasUsed) {
    var _a;
    const baseReceipt = {
        gasUsed: cumulativeGasUsed.toArrayLike(Buffer),
        bitvector: txResult.bloom.bitvector,
        logs: (_a = txResult.execResult.logs) !== null && _a !== void 0 ? _a : [],
    };
    let receipt;
    if (!('transactionType' in tx) || tx.transactionType === 0) {
        // Legacy transaction
        if (this._common.gteHardfork('byzantium')) {
            // Post-Byzantium
            receipt = Object.assign({ status: txResult.execResult.exceptionError ? 0 : 1 }, baseReceipt);
        }
        else {
            // Pre-Byzantium
            const stateRoot = await this.stateManager.getStateRoot(true);
            receipt = Object.assign({ stateRoot: stateRoot }, baseReceipt);
        }
    }
    else if ('transactionType' in tx && tx.transactionType === 1) {
        // EIP2930 Transaction
        receipt = Object.assign({ status: txResult.execResult.exceptionError ? 0 : 1 }, baseReceipt);
    }
    else if ('transactionType' in tx && tx.transactionType === 2) {
        // EIP1559 Transaction
        receipt = Object.assign({ status: txResult.execResult.exceptionError ? 0 : 1 }, baseReceipt);
    }
    else {
        throw new Error(`Unsupported transaction type ${'transactionType' in tx ? tx.transactionType : 'NaN'}`);
    }
    return receipt;
}
exports.generateTxReceipt = generateTxReceipt;
//# sourceMappingURL=runTx.js.map