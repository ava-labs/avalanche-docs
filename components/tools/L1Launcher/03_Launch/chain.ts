import { utils, pvm, Context, L1Validator, pvmSerial, PChainOwner } from "@avalabs/avalanchejs";
import { bytesToHex, hexToBytes } from "viem";
import { getRPCEndpoint } from "../../common/endpoints";


export async function newCreateSubnetTxHex(pChainAddress: string): Promise<string> {
    const pvmApi = new pvm.PVMApi(getRPCEndpoint(true));
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(getRPCEndpoint(true));

    const addressBytes = utils.bech32ToBytes(pChainAddress);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [pChainAddress]
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

    return bytesToHex(tx.toBytes());
}

export interface CreateChainParams {
    pChainAddress: string;
    chainName: string;
    subnetId: string;
    genesisData: string;
}

export const SUBNET_EVM_ID = "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy";

export async function newCreateChainTxHex(params: CreateChainParams): Promise<string> {
    const pvmApi = new pvm.PVMApi(getRPCEndpoint(true));
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(getRPCEndpoint(true));

    const addressBytes = utils.bech32ToBytes(params.pChainAddress);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [params.pChainAddress]
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

    return bytesToHex(tx.toBytes());
}

export async function newConvertSubnetToL1TxHex(params: {
    pChainAddress: string;
    subnetId: string;
    chainId: string;
    managerAddress: `0x${string}`;
    nodePopJsons: string[];
}): Promise<string> {
    const pvmApi = new pvm.PVMApi(getRPCEndpoint(true));
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(getRPCEndpoint(true));

    const addressBytes = utils.bech32ToBytes(params.pChainAddress);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [params.pChainAddress]
    });

    // Parse node proof of possession data
    const validators = params.nodePopJsons.map(nodePopJson => {
        const { nodeID, nodePOP } = JSON.parse(nodePopJson).result;
        const publicKey = utils.hexToBuffer(nodePOP.publicKey);
        const signature = utils.hexToBuffer(nodePOP.proofOfPossession);

        const pChainOwner = PChainOwner.fromNative([addressBytes], 1);

        return L1Validator.fromNative(
            nodeID,
            BigInt(100), // weight 
            BigInt(1000000000), // balance 
            new pvmSerial.ProofOfPossession(publicKey, signature),
            pChainOwner,
            pChainOwner
        );
    });

    const managerAddressBytes = hexToBytes(params.managerAddress);

    const tx = pvm.e.newConvertSubnetToL1Tx(
        {
            feeState,
            fromAddressesBytes: [addressBytes],
            subnetId: params.subnetId,
            utxos,
            chainId: params.chainId,
            validators,
            subnetAuth: [0],
            address: managerAddressBytes,
        },
        context,
    );

    return bytesToHex(tx.toBytes());
}
