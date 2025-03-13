import { networkIDs } from "@avalabs/avalanchejs";
import { SigningKey } from "ethers";//TODO: remove etheres dependency
import { WalletClient } from "viem";
import {
    utils,
    secp256k1,
} from "@avalabs/avalanchejs";
import { Buffer as BufferPolyfill } from "buffer";
import { CoreWalletRpcSchema } from "../rpcSchema";
import { isTestnet } from "./isTestnet";
import { getPChainAddress } from "./getPChainAddress";
import { getRPCEndpoint } from "../utils/rpc";
import { pvm } from "@avalabs/avalanchejs";
import { Context } from "@avalabs/avalanchejs";

export type CreateChainParams = {
    fromAddresses: string[];
    chainName: string;
    subnetAuth: number[];
    subnetId: string;
    vmId: string;
    fxIds: string[];
    genesisData: string;
}

export async function createChain(client: WalletClient<any, any, any, CoreWalletRpcSchema>, params: CreateChainParams): Promise<string> {
    const rpcEndpoint = getRPCEndpoint(await isTestnet(client));
    const pvmApi = new pvm.PVMApi(rpcEndpoint);
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(rpcEndpoint);

    const pChainAddress = await getPChainAddress(client);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [pChainAddress]
    });

    const tx = pvm.e.newCreateChainTx({
        feeState,
        fromAddressesBytes: params.fromAddresses.map(utils.bech32ToBytes),
        utxos,
        chainName: params.chainName,
        subnetAuth: params.subnetAuth,
        subnetId: params.subnetId,
        vmId: params.vmId,
        fxIds: params.fxIds,
        genesisData: JSON.parse(params.genesisData),
    }, context);

    const txID = await window.avalanche!.request({
        method: 'avalanche_sendTransaction',
        params: {
            transactionHex: utils.bufferToHex(tx.toBytes()),
            chainAlias: 'P',
        }
    }) as string;

    return txID;

}
