import {
    createWalletClient,
    http,
    formatTransactionRequest,
    type CallParameters,
    AddChainParameters,
    numberToHex
} from 'viem'
import { avalanche, mainnet } from 'viem/chains'

type CustomAddChainParameters = AddChainParameters & { isTestnet?: boolean }

const myCustomClient = createWalletClient({
    chain: mainnet,
    transport: http(),
}).extend(client => ({
    async addChain({ chain, isTestnet }: CustomAddChainParameters) {
        const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain
        await client.request(
            {
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: numberToHex(id),
                        chainName: name,
                        nativeCurrency,
                        rpcUrls: rpcUrls.default.http,
                        blockExplorerUrls: blockExplorers
                            ? Object.values(blockExplorers).map(({ url }) => url)
                            : undefined,
                    },
                ],
                isTestnet: isTestnet ?? false,
            },
            { dedupe: true, retryCount: 0 },
        )
    }
}))


await myCustomClient.addChain({ chain: avalanche, isTestnet: true }) 
