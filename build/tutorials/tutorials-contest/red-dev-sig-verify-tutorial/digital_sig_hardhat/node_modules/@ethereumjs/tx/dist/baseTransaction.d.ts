/// <reference types="bn.js" />
/// <reference types="node" />
import Common from '@ethereumjs/common';
import { Address, BN } from 'ethereumjs-util';
import { TxData, TxOptions, JsonTx, AccessListEIP2930ValuesArray, AccessListEIP2930TxData, FeeMarketEIP1559ValuesArray, FeeMarketEIP1559TxData, TxValuesArray } from './types';
/**
 * This base class will likely be subject to further
 * refactoring along the introduction of additional tx types
 * on the Ethereum network.
 *
 * It is therefore not recommended to use directly.
 */
export declare abstract class BaseTransaction<TransactionObject> {
    private readonly _type;
    readonly nonce: BN;
    readonly gasLimit: BN;
    readonly to?: Address;
    readonly value: BN;
    readonly data: Buffer;
    readonly common: Common;
    readonly v?: BN;
    readonly r?: BN;
    readonly s?: BN;
    constructor(txData: TxData | AccessListEIP2930TxData | FeeMarketEIP1559TxData, txOptions?: TxOptions);
    /**
     * Returns the transaction type
     */
    get transactionType(): number;
    /**
     * Alias for `transactionType`
     */
    get type(): number;
    /**
     * Checks if the transaction has the minimum amount of gas required
     * (DataFee + TxFee + Creation Fee).
     */
    validate(): boolean;
    validate(stringError: false): boolean;
    validate(stringError: true): string[];
    /**
     * The minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
     */
    getBaseFee(): BN;
    /**
     * The amount of gas paid for the data in this tx
     */
    getDataFee(): BN;
    /**
     * The up front amount that an account must have for this transaction to be valid
     */
    abstract getUpfrontCost(): BN;
    /**
     * If the tx's `to` is to the creation address
     */
    toCreationAddress(): boolean;
    /**
     * Returns a Buffer Array of the raw Buffers of this transaction, in order.
     */
    abstract raw(): TxValuesArray | AccessListEIP2930ValuesArray | FeeMarketEIP1559ValuesArray;
    /**
     * Returns the encoding of the transaction.
     */
    abstract serialize(): Buffer;
    /**
     * Returns the serialized unsigned tx (hashed or raw), which is used to sign the transaction.
     *
     * @param hashMessage - Return hashed message if set to true (default: true)
     */
    abstract getMessageToSign(hashMessage: false): Buffer | Buffer[];
    abstract getMessageToSign(hashMessage?: true): Buffer;
    abstract hash(): Buffer;
    abstract getMessageToVerifySignature(): Buffer;
    isSigned(): boolean;
    /**
     * Determines if the signature is valid
     */
    verifySignature(): boolean;
    /**
     * Returns the sender's address
     */
    getSenderAddress(): Address;
    /**
     * Returns the public key of the sender
     */
    abstract getSenderPublicKey(): Buffer;
    /**
     * Signs a tx and returns a new signed tx object
     */
    sign(privateKey: Buffer): TransactionObject;
    /**
     * Returns an object with the JSON representation of the transaction
     */
    abstract toJSON(): JsonTx;
    protected abstract _processSignature(v: number, r: Buffer, s: Buffer): TransactionObject;
    protected _validateCannotExceedMaxInteger(values: {
        [key: string]: BN | undefined;
    }): void;
}
