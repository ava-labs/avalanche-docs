"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransaction = void 0;
const common_1 = __importDefault(require("@ethereumjs/common"));
const ethereumjs_util_1 = require("ethereumjs-util");
/**
 * This base class will likely be subject to further
 * refactoring along the introduction of additional tx types
 * on the Ethereum network.
 *
 * It is therefore not recommended to use directly.
 */
class BaseTransaction {
    constructor(txData, txOptions = {}) {
        var _a, _b;
        const { nonce, gasLimit, to, value, data, v, r, s, type } = txData;
        this._type = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(type)).toNumber();
        const toB = ethereumjs_util_1.toBuffer(to === '' ? '0x' : to);
        const vB = ethereumjs_util_1.toBuffer(v === '' ? '0x' : v);
        const rB = ethereumjs_util_1.toBuffer(r === '' ? '0x' : r);
        const sB = ethereumjs_util_1.toBuffer(s === '' ? '0x' : s);
        this.nonce = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(nonce === '' ? '0x' : nonce));
        this.gasLimit = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(gasLimit === '' ? '0x' : gasLimit));
        this.to = toB.length > 0 ? new ethereumjs_util_1.Address(toB) : undefined;
        this.value = new ethereumjs_util_1.BN(ethereumjs_util_1.toBuffer(value === '' ? '0x' : value));
        this.data = ethereumjs_util_1.toBuffer(data === '' ? '0x' : data);
        this.v = vB.length > 0 ? new ethereumjs_util_1.BN(vB) : undefined;
        this.r = rB.length > 0 ? new ethereumjs_util_1.BN(rB) : undefined;
        this.s = sB.length > 0 ? new ethereumjs_util_1.BN(sB) : undefined;
        this._validateCannotExceedMaxInteger({
            nonce: this.nonce,
            gasLimit: this.gasLimit,
            value: this.value,
            r: this.r,
            s: this.s,
        });
        this.common = (_b = (_a = txOptions.common) === null || _a === void 0 ? void 0 : _a.copy()) !== null && _b !== void 0 ? _b : new common_1.default({ chain: 'mainnet' });
    }
    /**
     * Returns the transaction type
     */
    get transactionType() {
        return this._type;
    }
    /**
     * Alias for `transactionType`
     */
    get type() {
        return this.transactionType;
    }
    validate(stringError = false) {
        const errors = [];
        if (this.getBaseFee().gt(this.gasLimit)) {
            errors.push(`gasLimit is too low. given ${this.gasLimit}, need at least ${this.getBaseFee()}`);
        }
        if (this.isSigned() && !this.verifySignature()) {
            errors.push('Invalid Signature');
        }
        return stringError ? errors : errors.length === 0;
    }
    /**
     * The minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
     */
    getBaseFee() {
        const fee = this.getDataFee().addn(this.common.param('gasPrices', 'tx'));
        if (this.common.gteHardfork('homestead') && this.toCreationAddress()) {
            fee.iaddn(this.common.param('gasPrices', 'txCreation'));
        }
        return fee;
    }
    /**
     * The amount of gas paid for the data in this tx
     */
    getDataFee() {
        const txDataZero = this.common.param('gasPrices', 'txDataZero');
        const txDataNonZero = this.common.param('gasPrices', 'txDataNonZero');
        let cost = 0;
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] === 0 ? (cost += txDataZero) : (cost += txDataNonZero);
        }
        return new ethereumjs_util_1.BN(cost);
    }
    /**
     * If the tx's `to` is to the creation address
     */
    toCreationAddress() {
        return this.to === undefined || this.to.buf.length === 0;
    }
    isSigned() {
        const { v, r, s } = this;
        if (this.type === 0) {
            if (!v || !r || !s) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (v === undefined || !r || !s) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    /**
     * Determines if the signature is valid
     */
    verifySignature() {
        try {
            // Main signature verification is done in `getSenderPublicKey()`
            const publicKey = this.getSenderPublicKey();
            return ethereumjs_util_1.unpadBuffer(publicKey).length !== 0;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Returns the sender's address
     */
    getSenderAddress() {
        return new ethereumjs_util_1.Address(ethereumjs_util_1.publicToAddress(this.getSenderPublicKey()));
    }
    /**
     * Signs a tx and returns a new signed tx object
     */
    sign(privateKey) {
        if (privateKey.length !== 32) {
            throw new Error('Private key must be 32 bytes in length.');
        }
        const msgHash = this.getMessageToSign(true);
        const { v, r, s } = ethereumjs_util_1.ecsign(msgHash, privateKey);
        return this._processSignature(v, r, s);
    }
    _validateCannotExceedMaxInteger(values) {
        for (const [key, value] of Object.entries(values)) {
            if (value === null || value === void 0 ? void 0 : value.gt(ethereumjs_util_1.MAX_INTEGER)) {
                throw new Error(`${key} cannot exceed MAX_INTEGER, given ${value}`);
            }
        }
    }
}
exports.BaseTransaction = BaseTransaction;
//# sourceMappingURL=baseTransaction.js.map