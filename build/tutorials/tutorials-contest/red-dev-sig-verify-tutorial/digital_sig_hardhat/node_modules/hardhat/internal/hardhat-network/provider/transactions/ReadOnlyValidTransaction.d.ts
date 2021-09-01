/// <reference types="node" />
import { Transaction, TxData, TxOptions } from "@ethereumjs/tx";
import { Address } from "ethereumjs-util";
/**
 * This class represents a transaction that is assumed to be valid.
 *
 * This transaction is not meant to be run. It can only be used to read
 * from its values.
 *
 * The transaction's signature is never validated, but assumed to be valid.
 *
 * The sender's private key is never recovered from the signature. Instead,
 * the sender's address is received as parameter.
 *
 * This class doesn't use its Common instance, so there's no need to provide
 * one.
 */
export declare class ReadOnlyValidTransaction extends Transaction {
    static fromTxData(txData: TxData, opts?: TxOptions): never;
    static fromSerializedTx(serialized: Buffer, opts?: TxOptions): never;
    static fromRlpSerializedTx(serialized: Buffer, opts?: TxOptions): never;
    static fromValuesArray(values: Buffer[], opts?: TxOptions): never;
    private readonly _sender;
    constructor(sender: Address, data?: TxData);
    verifySignature(): boolean;
    getSenderAddress(): Address;
    sign(): never;
    getDataFee(): never;
    getBaseFee(): never;
    getUpfrontCost(): never;
    validate(stringError?: false): never;
    validate(stringError: true): never;
    toCreationAddress(): never;
    getSenderPublicKey(): never;
    getMessageToVerifySignature(): never;
    getMessageToSign(): never;
}
//# sourceMappingURL=ReadOnlyValidTransaction.d.ts.map