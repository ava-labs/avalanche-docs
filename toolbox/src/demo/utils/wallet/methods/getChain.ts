import { WalletClient } from "viem";
import { CoreWalletRpcSchema } from "../rpcSchema";

export async function getChain(client: WalletClient<any, any, any, CoreWalletRpcSchema>) {
    return await client.request({
        method: "wallet_getEthereumChain",
        params: []
    })
}
