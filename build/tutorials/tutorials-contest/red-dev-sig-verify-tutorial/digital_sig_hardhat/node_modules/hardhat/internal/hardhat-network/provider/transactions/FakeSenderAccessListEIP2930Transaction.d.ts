/// <reference types="node" />
import { AccessListEIP2930Transaction } from "@ethereumjs/tx";
import { AccessListEIP2930TxData, AccessListEIP2930ValuesArray, TxOptions } from "@ethereumjs/tx/dist/types";
import { Address } from "ethereumjs-util";
/**
 * This class is the EIP-2930 version of FakeSenderTransaction.
 */
export declare class FakeSenderAccessListEIP2930Transaction extends AccessListEIP2930Transaction {
    static fromTxData(txData: AccessListEIP2930TxData, opts?: TxOptions): never;
    static fromSerializedTx(serialized: Buffer, opts?: TxOptions): never;
    static fromRlpSerializedTx(serialized: Buffer, opts?: TxOptions): never;
    static fromValuesArray(values: AccessListEIP2930ValuesArray, opts?: TxOptions): never;
    static fromSenderAndRlpSerializedTx(sender: Address, serialized: Buffer, opts?: TxOptions): FakeSenderAccessListEIP2930Transaction;
    static fromSenderAndValuesArray(sender: Address, values: AccessListEIP2930ValuesArray, opts?: TxOptions): FakeSenderAccessListEIP2930Transaction;
    private readonly _sender;
    constructor(sender: Address, data?: AccessListEIP2930TxData, opts?: TxOptions);
    verifySignature(): boolean;
    getSenderAddress(): Address;
    getSenderPublicKey(): never;
    _processSignature(v: number, r: Buffer, s: Buffer): never;
    sign(privateKey: Buffer): never;
    getMessageToSign(): never;
    getMessageToVerifySignature(): never;
    validate(stringError?: false): boolean;
    validate(stringError: true): string[];
}
//# sourceMappingURL=FakeSenderAccessListEIP2930Transaction.d.ts.map