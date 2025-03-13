import { createWalletClient, custom, rpcSchema } from 'viem'
import { addChain, CoreWalletAddChainParameters } from './overrides/addChain'
import { sendTransaction } from './overrides/sendTransaction'
import { getChain } from './methods/getChain'
import { CoreWalletRpcSchema } from './rpcSchema'
import { isTestnet } from './methods/isTestnet'
import { getPChainAddress } from './methods/getPChainAddress'

export function createCoreWalletClient(account: `0x${string}`) {
    return createWalletClient({
        transport: custom(window.avalanche!),
        account: account,
        rpcSchema: rpcSchema<CoreWalletRpcSchema>(),
    }).extend((client) => ({
        addChain: (args: CoreWalletAddChainParameters) => addChain(client, args),
        getChain: () => getChain(client),
        sendTransaction: (args) => sendTransaction(client, args),
        isTestnet: () => isTestnet(client),
        getPChainAddress: () => getPChainAddress(client),
    }))
}

export async function createDefaultCoreWalletClient() {
    if (!window.avalanche) {
        throw new Error('Avalanche is not supported');
    }
    const accounts = await window.avalanche!.request({
        "method": "eth_accounts",
        "params": []
    }) as `0x${string}`[]
    if (accounts.length === 0) {
        throw new Error('No accounts found');
    }
    return createCoreWalletClient(accounts[0] as `0x${string}`);
}
