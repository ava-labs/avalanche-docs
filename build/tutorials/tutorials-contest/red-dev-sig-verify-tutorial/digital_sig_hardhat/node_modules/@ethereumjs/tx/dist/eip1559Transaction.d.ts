/// <reference types="bn.js" />
/// <reference types="node" />
import { BN } from 'ethereumjs-util';
import { BaseTransaction } from './baseTransaction';
import { AccessList, AccessListBuffer, FeeMarketEIP1559TxData, FeeMarketEIP1559ValuesArray, JsonTx, TxOptions } from './types';
export default class FeeMarketEIP1559Transaction extends BaseTransaction<FeeMarketEIP1559Transaction> {
    readonly chainId: BN;
    readonly accessList: AccessListBuffer;
    readonly AccessListJSON: AccessList;
    readonly maxPriorityFeePerGas: BN;
    readonly maxFeePerGas: BN;
    /**
     * EIP-2930 alias for `r`
     */
    get senderR(): BN | undefined;
    /**
     * EIP-2930 alias for `s`
     */
    get senderS(): BN | undefined;
    /**
     * EIP-2930 alias for `v`
     */
    get yParity(): BN | undefined;
    static fromTxData(txData: FeeMarketEIP1559TxData, opts?: TxOptions): FeeMarketEIP1559Transaction;
    /**
     * Instantiate a transaction from the serialized tx.
     *
     * Note: this means that the Buffer should start with 0x01.
     */
    static fromSerializedTx(serialized: Buffer, opts?: TxOptions): FeeMarketEIP1559Transaction;
    /**
     * Instantiate a transaction from the serialized tx.
     * (alias of `fromSerializedTx()`)
     *
     * Note: This means that the Buffer should start with 0x01.
     *
     * @deprecated this constructor alias is deprecated and will be removed
     * in favor of the `fromSerializedTx()` constructor
     */
    static fromRlpSerializedTx(serialized: Buffer, opts?: TxOptions): FeeMarketEIP1559Transaction;
    /**
     * Create a transaction from a values array.
     *
     * The format is:
     * chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, to, value, data, accessList, signatureYParity, signatureR, signatureS
     */
    static fromValuesArray(values: FeeMarketEIP1559ValuesArray, opts?: TxOptions): FeeMarketEIP1559Transaction;
    /**
     * This constructor takes the values, validates them, assigns them and freezes the object.
     *
     * It is not recommended to use this constructor directly. Instead use
     * the static factory methods to assist in creating a Transaction object from
     * varying data types.
     */
    constructor(txData: FeeMarketEIP1559TxData, opts?: TxOptions);
    /**
     * The amount of gas paid for the data in this tx
     */
    getDataFee(): BN;
    /**
     * The up front amount that an account must have for this transaction to be valid
     * @param baseFee The base fee of the block (will be set to 0 if not provided)
     */
    getUpfrontCost(baseFee?: BN): BN;
    /**
     * Returns a Buffer Array of the raw Buffers of this transaction, in order.
     *
     * Use `serialize()` to add to block data for `Block.fromValuesArray()`.
     */
    raw(): FeeMarketEIP1559ValuesArray;
    /**
     * Returns the serialized encoding of the transaction.
     */
    serialize(): Buffer;
    /**
     * Returns the serialized unsigned tx (hashed or raw), which is used to sign the transaction.
     *
     * @param hashMessage - Return hashed message if set to true (default: true)
     */
    getMessageToSign(hashMessage: false): Buffer[];
    getMessageToSign(hashMessage?: true): Buffer;
    /**
     * Computes a sha3-256 hash of the serialized tx
     */
    hash(): Buffer;
    /**
     * Computes a sha3-256 hash which can be used to verify the signature
     */
    getMessageToVerifySignature(): Buffer;
    /**
     * Returns the public key of the sender
     */
    getSenderPublicKey(): Buffer;
    _processSignature(v: number, r: Buffer, s: Buffer): FeeMarketEIP1559Transaction;
    /**
     * Returns an object with the JSON representation of the transaction
     */
    toJSON(): JsonTx;
}
