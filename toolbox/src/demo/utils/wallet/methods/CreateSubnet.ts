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

export type CreateSubnetParams = {
    subnetOwners: string[];
}

export async function createSubnet(client: WalletClient<any, any, any, CoreWalletRpcSchema>, params: CreateSubnetParams): Promise<string> {
    const rpcEndpoint = getRPCEndpoint(await isTestnet(client));
    const pvmApi = new pvm.PVMApi(rpcEndpoint);
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(rpcEndpoint);

    const pChainAddress = await getPChainAddress(client);

    const addressBytes = utils.bech32ToBytes(pChainAddress);

    const { utxos } = await pvmApi.getUTXOs({
        addresses: [pChainAddress]
    });

    const tx = pvm.e.newCreateSubnetTx({
        feeState,
        fromAddressesBytes: [addressBytes],
        utxos,
        subnetOwners: params.subnetOwners.map(utils.bech32ToBytes),
    }, context);

    const txID = await client.request({
        method: 'avalanche_sendTransaction',
        params: {
            transactionHex: utils.bufferToHex(tx.toBytes()),
            chainAlias: 'P',
        }
    }) as string;

    return txID;

}
