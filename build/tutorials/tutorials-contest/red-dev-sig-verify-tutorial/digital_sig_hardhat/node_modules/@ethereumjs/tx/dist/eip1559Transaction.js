"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereumjs_util_1 = require("ethereumjs-util");
const baseTransaction_1 = require("./baseTransaction");
const types_1 = require("./types");
const util_1 = require("./util");
const TRANSACTION_TYPE = 2;
const TRANSACTION_TYPE_BUFFER = Buffer.from(TRANSACTION_TYPE.toString(16).padStart(2, '0'), 'hex');
class FeeMarketEIP1559Transaction extends baseTransaction_1.BaseTransaction {
    /**
     * This constructor takes the values, validates them, assigns them and freezes the object.
     *
     * It is not recommended to use this constructor directly. Instead use
     * the static factory methods to assist in creating a Transaction object from
     * varying data types.
     */
    constructor(txData, opts = {}) {
        var _a, _b;
        const { chainId, accessList, maxFeePerGas, maxPriorityFeePerGas } = txData;
        super(Object.assign(Object.assign({}, txData), { type: TRANSACTION_TYPE }), opts);
        if (!this.common.isActivatedEIP(1559)) {
            throw new Error('EIP-1559 not enabled on Common');
        }
        // Populate the access list fields
        const accessListData = util_1.AccessLists.getAccessListData(accessList !== null && accessList !== void 0 ? accessList : []);
        this.accessList = accessListData.accessList;
        this.AccessListJSON = accessListData.AccessListJSON;
        // Verify the access list format.
        util_1.AccessLists.verifyAccessList(this.accessList);
        this.chainId = chainId ? new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(chainId)) : this.common.chainIdBN();
        this.maxFeePerGas = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(maxFeePerGas === '' ? '0x' : maxFeePerGas));
        this.maxPriorityFeePerGas = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(maxPriorityFeePerGas === '' ? '0x' : maxPriorityFeePerGas));
        this._validateCannotExceedMaxInteger({
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
        });
        if (!this.chainId.eq(this.common.chainIdBN())) {
            throw new Error('The chain ID does not match the chain ID of Common');
        }
        if (this.v && !this.v.eqn(0) && !this.v.eqn(1)) {
            throw new Error('The y-parity of the transaction should either be 0 or 1');
        }
        if (this.common.gteHardfork('homestead') && ((_a = this.s) === null || _a === void 0 ? void 0 : _a.gt(types_1.N_DIV_2))) {
            throw new Error('Invalid Signature: s-values greater than secp256k1n/2 are considered invalid');
        }
        const freeze = (_b = opts === null || opts === void 0 ? void 0 : opts.freeze) !== null && _b !== void 0 ? _b : true;
        if (freeze) {
            Object.freeze(this);
        }
    }
    /**
     * EIP-2930 alias for `r`
     */
    get senderR() {
        return this.r;
    }
    /**
     * EIP-2930 alias for `s`
     */
    get senderS() {
        return this.s;
    }
    /**
     * EIP-2930 alias for `v`
     */
    get yParity() {
        return this.v;
    }
    static fromTxData(txData, opts = {}) {
        return new FeeMarketEIP1559Transaction(txData, opts);
    }
    /**
     * Instantiate a transaction from the serialized tx.
     *
     * Note: this means that the Buffer should start with 0x01.
     */
    static fromSerializedTx(serialized, opts = {}) {
        if (!serialized.slice(0, 1).equals(TRANSACTION_TYPE_BUFFER)) {
            throw new Error(`Invalid serialized tx input: not an EIP-1559 transaction (wrong tx type, expected: ${TRANSACTION_TYPE}, received: ${serialized
                .slice(0, 1)
                .toString('hex')}`);
        }
        const values = ethereumjs_util_1.rlp.decode(serialized.slice(1));
        if (!Array.isArray(values)) {
            throw new Error('Invalid serialized tx input: must be array');
        }
        return FeeMarketEIP1559Transaction.fromValuesArray(values, opts);
    }
    /**
     * Instantiate a transaction from the serialized tx.
     * (alias of `fromSerializedTx()`)
     *
     * Note: This means that the Buffer should start with 0x01.
     *
     * @deprecated this constructor alias is deprecated and will be removed
     * in favor of the `fromSerializedTx()` constructor
     */
    static fromRlpSerializedTx(serialized, opts = {}) {
        return FeeMarketEIP1559Transaction.fromSerializedTx(serialized, opts);
    }
    /**
     * Create a transaction from a values array.
     *
     * The format is:
     * chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, signatureYParity, signatureR, signatureS
     */
    static fromValuesArray(values, opts = {}) {
        if (values.length !== 9 && values.length !== 12) {
            throw new Error('Invalid EIP-1559 transaction. Only expecting 9 values (for unsigned tx) or 12 values (for signed tx).');
        }
        const [chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, v, r, s,] = values;
        return new FeeMarketEIP1559Transaction({
            chainId: new ethereumjs_util_1.BN(chainId),
            nonce,
            maxPriorityFeePerGas,
            maxFeePerGas,
            gasLimit,
            to,
            value,
            data,
            accessList: accessList !== null && accessList !== void 0 ? accessList : [],
            v: v !== undefined ? new ethereumjs_util_1.BN(v) : undefined,
            r,
            s,
        }, opts);
    }
    /**
     * The amount of gas paid for the data in this tx
     */
    getDataFee() {
        const cost = super.getDataFee();
        cost.iaddn(util_1.AccessLists.getDataFeeEIP2930(this.accessList, this.common));
        return cost;
    }
    /**
     * The up front amount that an account must have for this transaction to be valid
     * @param baseFee The base fee of the block (will be set to 0 if not provided)
     */
    getUpfrontCost(baseFee) {
        if (!baseFee) {
            baseFee = new ethereumjs_util_1.BN(0);
        }
        const inclusionFeePerGas = ethereumjs_util_1.BN.min(this.maxPriorityFeePerGas, this.maxFeePerGas.sub(baseFee));
        const gasPrice = inclusionFeePerGas.add(baseFee);
        return this.gasLimit.mul(gasPrice).add(this.value);
    }
    /**
     * Returns a Buffer Array of the raw Buffers of this transaction, in order.
     *
     * Use `serialize()` to add to block data for `Block.fromValuesArray()`.
     */
    raw() {
        return [
            ethereumjs_util_1.bnToRlp(this.chainId),
            ethereumjs_util_1.bnToRlp(this.nonce),
            ethereumjs_util_1.bnToRlp(this.maxPriorityFeePerGas),
            ethereumjs_util_1.bnToRlp(this.maxFeePerGas),
            ethereumjs_util_1.bnToRlp(this.gasLimit),
            this.to !== undefined ? this.to.buf : Buffer.from([]),
            ethereumjs_util_1.bnToRlp(this.value),
            this.data,
            this.accessList,
            this.v !== undefined ? ethereumjs_util_1.bnToRlp(this.v) : Buffer.from([]),
            this.r !== undefined ? ethereumjs_util_1.bnToRlp(this.r) : Buffer.from([]),
            this.s !== undefined ? ethereumjs_util_1.bnToRlp(this.s) : Buffer.from([]),
        ];
    }
    /**
     * Returns the serialized encoding of the transaction.
     */
    serialize() {
        const base = this.raw();
        return Buffer.concat([TRANSACTION_TYPE_BUFFER, ethereumjs_util_1.rlp.encode(base)]);
    }
    getMessageToSign(hashMessage = true) {
        const base = this.raw().slice(0, 9);
        const message = Buffer.concat([TRANSACTION_TYPE_BUFFER, ethereumjs_util_1.rlp.encode(base)]);
        if (hashMessage) {
            return ethereumjs_util_1.keccak256(message);
        }
        else {
            return message;
        }
    }
    /**
     * Computes a sha3-256 hash of the serialized tx
     */
    hash() {
        if (!this.isSigned()) {
            throw new Error('Cannot call hash method if transaction is not signed');
        }
        return ethereumjs_util_1.keccak256(this.serialize());
    }
    /**
     * Computes a sha3-256 hash which can be used to verify the signature
     */
    getMessageToVerifySignature() {
        return this.getMessageToSign();
    }
    /**
     * Returns the public key of the sender
     */
    getSenderPublicKey() {
        var _a;
        if (!this.isSigned()) {
            throw new Error('Cannot call this method if transaction is not signed');
        }
        const msgHash = this.getMessageToVerifySignature();
        // EIP-2: All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
        // Reasoning: https://ethereum.stackexchange.com/a/55728
        if (this.common.gteHardfork('homestead') && ((_a = this.s) === null || _a === void 0 ? void 0 : _a.gt(types_1.N_DIV_2))) {
            throw new Error('Invalid Signature: s-values greater than secp256k1n/2 are considered invalid');
        }
        const { v, r, s } = this;
        try {
            return ethereumjs_util_1.ecrecover(msgHash, v.addn(27), // Recover the 27 which was stripped from ecsign
            ethereumjs_util_1.bnToRlp(r), ethereumjs_util_1.bnToRlp(s));
        }
        catch (e) {
            throw new Error('Invalid Signature');
        }
    }
    _processSignature(v, r, s) {
        const opts = {
            common: this.common,
        };
        return FeeMarketEIP1559Transaction.fromTxData({
            chainId: this.chainId,
            nonce: this.nonce,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            maxFeePerGas: this.maxFeePerGas,
            gasLimit: this.gasLimit,
            to: this.to,
            value: this.value,
            data: this.data,
            accessList: this.accessList,
            v: new ethereumjs_util_1.BN(v - 27),
            r: new ethereumjs_util_1.BN(r),
            s: new ethereumjs_util_1.BN(s),
        }, opts);
    }
    /**
     * Returns an object with the JSON representation of the transaction
     */
    toJSON() {
        const accessListJSON = util_1.AccessLists.getAccessListJSON(this.accessList);
        return {
            chainId: ethereumjs_util_1.bnToHex(this.chainId),
            nonce: ethereumjs_util_1.bnToHex(this.nonce),
            maxPriorityFeePerGas: ethereumjs_util_1.bnToHex(this.maxPriorityFeePerGas),
            maxFeePerGas: ethereumjs_util_1.bnToHex(this.maxFeePerGas),
            gasLimit: ethereumjs_util_1.bnToHex(this.gasLimit),
            to: this.to !== undefined ? this.to.toString() : undefined,
            value: ethereumjs_util_1.bnToHex(this.value),
            data: '0x' + this.data.toString('hex'),
            accessList: accessListJSON,
            v: this.v !== undefined ? ethereumjs_util_1.bnToHex(this.v) : undefined,
            r: this.r !== undefined ? ethereumjs_util_1.bnToHex(this.r) : undefined,
            s: this.s !== undefined ? ethereumjs_util_1.bnToHex(this.s) : undefined,
        };
    }
}
exports.default = FeeMarketEIP1559Transaction;
//# sourceMappingURL=eip1559Transaction.js.map