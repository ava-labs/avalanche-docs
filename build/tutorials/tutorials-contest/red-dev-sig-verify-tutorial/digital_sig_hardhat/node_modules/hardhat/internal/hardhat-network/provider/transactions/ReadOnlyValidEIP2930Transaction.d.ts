/// <reference types="node" />
import { AccessListEIP2930Transaction, AccessListEIP2930TxData, AccessListEIP2930ValuesArray, TxOptions } from "@ethereumjs/tx";
import { Address } from "ethereumjs-util";
/**
 * This class is like `ReadOnlyValidTransaction` but for
 * EIP-2930 (access list) transactions.
 */
export declare class ReadOnlyValidEIP2930Transaction extends AccessListEIP2930Transaction {
    static fromTxData(txData: AccessListEIP2930TxData, opts?: TxOptions): never;
    static fromSerializedTx(serialized: Buffer, opts?: TxOptions): never;
    static fromRlpSerializedTx(serialized: Buffer, opts?: TxOptions): never;
    static fromValuesArray(values: AccessListEIP2930ValuesArray, opts?: TxOptions): never;
    private readonly _sender;
    constructor(sender: Address, data?: AccessListEIP2930TxData);
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
//# sourceMappingURL=ReadOnlyValidEIP2930Transaction.d.ts.map