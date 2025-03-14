import { getRPCEndpoint } from "../../utils/wallet/utils/rpc";
import { PackL1ConversionMessageArgs } from "./convertWarp";

interface AddressObject {
    threshold: number;
    addresses: string[];
}

interface ValidatorSigner {
    publicKey: string;
    proofOfPossession: string;
}

interface Validator {
    nodeID: string;
    weight: number;
    balance: number;
    signer: ValidatorSigner;
    remainingBalanceOwner: AddressObject;
    deactivationOwner: AddressObject;
}

interface SubnetAuthorization {
    signatureIndices: number[];
}

interface OutputObject {
    addresses: string[];
    amount: number;
    locktime: number;
    threshold: number;
}

interface Output {
    assetID: string;
    fxID: string;
    output: OutputObject;
}

interface InputObject {
    amount: number;
    signatureIndices: number[];
}

interface Input {
    txID: string;
    outputIndex: number;
    assetID: string;
    fxID: string;
    input: InputObject;
}

interface UnsignedTx {
    networkID: number;
    blockchainID: string;
    outputs: Output[];
    inputs: Input[];
    memo: string;
    subnetID: string;
    chainID: string;
    address: string;
    validators: Validator[];
    subnetAuthorization: SubnetAuthorization;
}

interface Credential {
    signatures: string[];
}

interface Transaction {
    unsignedTx: UnsignedTx;
    credentials: Credential[];
    id: string;
}

interface TransactionResult {
    tx: Transaction;
    encoding: string;
}

interface ConversionDataResponse {
    result: TransactionResult;
}

export default async function getConversionDataFromTx(txId: string, isTestnet: boolean): Promise<{ conversionArgs: PackL1ConversionMessageArgs, blockchainID: string }> {
    const rpcEndpoint = getRPCEndpoint(isTestnet);

    const response = await fetch(rpcEndpoint + "/ext/bc/P", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'platform.getTx',
            params: {
                txID: txId,
                encoding: 'json'
            },
            id: 1
        })
    });

    const data = await response.json() as ConversionDataResponse


    if (!data?.result?.tx?.unsignedTx?.subnetID || !data?.result?.tx?.unsignedTx?.chainID || !data?.result?.tx?.unsignedTx?.address || !data?.result?.tx?.unsignedTx?.validators) {
        throw new Error("Invalid transaction data, are you sure this is a conversion transaction?");
    }

    const conversionArgs: PackL1ConversionMessageArgs = {
        subnetId: data.result.tx.unsignedTx.subnetID,
        managerChainID: data.result.tx.unsignedTx.chainID,
        managerAddress: data.result.tx.unsignedTx.address,
        validators: data.result.tx.unsignedTx.validators.map((validator, i) => {
            return {
                nodeID: validator.nodeID,
                nodePOP: validator.signer,
                weight: validator.weight
            }
        })
    };

    return { conversionArgs, blockchainID: data.result.tx.unsignedTx.blockchainID };
}
