/// <reference types="bn.js" />
/// <reference types="node" />
import { BN } from 'ethereumjs-util';
import { BaseTransaction } from './baseTransaction';
import { AccessList, AccessListBuffer, AccessListEIP2930TxData, AccessListEIP2930ValuesArray, JsonTx, TxOptions } from './types';
/**
 * Typed transaction with optional access lists
 *
 * - TransactionType: 1
 * - EIP: [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)
 */
export default class AccessListEIP2930Transaction extends BaseTransaction<AccessListEIP2930Transaction> {
    readonly chainId: BN;
    readonly accessList: AccessListBuffer;
    readonly AccessListJSON: AccessList;
    readonly gasPrice: BN;
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
    /**
     * Instantiate a transaction from a data dictionary
     */
    static fromTxData(txData: AccessListEIP2930TxData, opts?: TxOptions): AccessListEIP2930Transaction;
    /**
     * Instantiate a transaction from the serialized tx.
     *
     * Note: this means that the Buffer should start with 0x01.
     */
    static fromSerializedTx(serialized: Buffer, opts?: TxOptions): AccessListEIP2930Transaction;
    /**
     * Instantiate a transaction from the serialized tx.
     * (alias of `fromSerializedTx()`)
     *
     * Note: This means that the Buffer should start with 0x01.
     *
     * @deprecated this constructor alias is deprecated and will be removed
     * in favor of the `fromSerializedTx()` constructor
     */
    static fromRlpSerializedTx(serialized: Buffer, opts?: TxOptions): AccessListEIP2930Transaction;
    /**
     * Create a transaction from a values array.
     *
     * The format is:
     * chainId, nonce, gasPrice, gasLimit, to, value, data, access_list, yParity (v), senderR (r), senderS (s)
     */
    static fromValuesArray(values: AccessListEIP2930ValuesArray, opts?: TxOptions): AccessListEIP2930Transaction;
    /**
     * This constructor takes the values, validates them, assigns them and freezes the object.
     *
     * It is not recommended to use this constructor directly. Instead use
     * the static factory methods to assist in creating a Transaction object from
     * varying data types.
     */
    constructor(txData: AccessListEIP2930TxData, opts?: TxOptions);
    /**
     * The amount of gas paid for the data in this tx
     */
    getDataFee(): BN;
    /**
     * The up front amount that an account must have for this transaction to be valid
     */
    getUpfrontCost(): BN;
    /**
     * Returns a Buffer Array of the raw Buffers of this transaction, in order.
     *
     * Use `serialize()` to add to block data for `Block.fromValuesArray()`.
     */
    raw(): AccessListEIP2930ValuesArray;
    /**
     * Returns the serialized encoding of the transaction.
     */
    serialize(): Buffer;
    /**
     * Returns the serialized unsigned tx (hashed or raw), which is used to sign the transaction.
     *
     * @param hashMessage - Return hashed message if set to true (default: true)
     */
    getMessageToSign(hashMessage?: boolean): Buffer;
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
    _processSignature(v: number, r: Buffer, s: Buffer): AccessListEIP2930Transaction;
    /**
     * Returns an object with the JSON representation of the transaction
     */
    toJSON(): JsonTx;
}
