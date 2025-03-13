import { CoreWalletRpcSchema } from "../rpcSchema";
import { WalletClient } from "viem";
import { getChain } from "./getChain";

export async function isTestnet(client: WalletClient<any, any, any, CoreWalletRpcSchema>) {
    const chain = await getChain(client)
    return chain.isTestnet;
}
