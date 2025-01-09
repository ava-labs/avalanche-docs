import { utils, pvm, Context, UnsignedTx } from "@avalabs/avalanchejs";
import { RPC_ENDPOINT } from "../utxo";
import { getAddresses } from "../wallet";
import { secp256k1 } from "@avalabs/avalanchejs";
import { apiHostPromise } from "../config";

async function addTxSignatures(tx: any, privateKeyHex: string) {
    const unsignedBytes = tx.toBytes();
    const privateKey = utils.hexToBuffer(privateKeyHex);
    const publicKey = secp256k1.getPublicKey(privateKey);

    if (tx.hasPubkey(publicKey)) {
        const signature = await secp256k1.sign(unsignedBytes, privateKey);
        tx.addSignature(signature);
    }
}

const addSigToAllCreds = async (
    unsignedTx: UnsignedTx,
    privateKey: Uint8Array,
) => {
    const unsignedBytes = unsignedTx.toBytes();
    const publicKey = secp256k1.getPublicKey(privateKey);
    if (!unsignedTx.hasPubkey(publicKey)) {
        return;
    }
    const signature = await secp256k1.sign(unsignedBytes, privateKey);
    for (let i = 0; i < unsignedTx.getCredentials().length; i++) {
        unsignedTx.addSignatureAt(signature, i, 0);
    }
};

export async function createSubnet(privateKeyHex: string): Promise<string> {
    if (!privateKeyHex) {
        throw new Error("Private key required");
    }

    const pvmApi = new pvm.PVMApi(RPC_ENDPOINT);
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(RPC_ENDPOINT);

    const { P: pAddress } = await getAddresses(privateKeyHex);
    const addressBytes = utils.bech32ToBytes(pAddress);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [pAddress]
    });

    const tx = pvm.e.newCreateSubnetTx(
        {
            feeState,
            fromAddressesBytes: [addressBytes],
            utxos,
            subnetOwners: [addressBytes],
        },
        context,
    );

    await addTxSignatures(tx, privateKeyHex);

    const response = await pvmApi.issueSignedTx(tx.getSignedTx());
    return response.txID;
}

export interface CreateChainParams {
    privateKeyHex: string;
    chainName: string;
    subnetId: string;
    genesisData: string;
}

export const SUBNET_EVM_ID = "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy";

export async function createChain(params: CreateChainParams): Promise<string> {
    if (!params.privateKeyHex) {
        throw new Error("Private key required");
    }

    const pvmApi = new pvm.PVMApi(RPC_ENDPOINT);
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(RPC_ENDPOINT);

    const { P: pAddress } = await getAddresses(params.privateKeyHex);
    const addressBytes = utils.bech32ToBytes(pAddress);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [pAddress]
    });

    const tx = pvm.e.newCreateChainTx(
        {
            feeState,
            fromAddressesBytes: [addressBytes],
            utxos,
            chainName: params.chainName,
            subnetAuth: [0],
            subnetId: params.subnetId,
            vmId: SUBNET_EVM_ID,
            fxIds: [],
            genesisData: JSON.parse(params.genesisData),
        },
        context,
    );

    await addSigToAllCreds(tx, utils.hexToBuffer(params.privateKeyHex));

    const response = await pvmApi.issueSignedTx(tx.getSignedTx());

    console.log('chain created via avalanchejs', response.txID);
    return response.txID;
}

export async function convertToL1(params: {
    privateKeyHex: string;
    subnetId: string;
    chainId: string;
    managerAddress: string;
    nodePopJsons: string[];
}
): Promise<string> {
    if (!params.privateKeyHex) {
        throw new Error("Private key required");
    }

    const response = await fetch(await apiHostPromise + '/temporaryDevAPI/convertToL1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            privateKeyHex: params.privateKeyHex,
            subnetID: params.subnetId,
            chainID: params.chainId,
            managerAddress: params.managerAddress,
            nodes: params.nodePopJsons.map((nodePopJson) => JSON.parse(nodePopJson).result),
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to convert to L1: ${errorText}`);
    }

    const result = await response.json();
    return result.conversionID;
}
