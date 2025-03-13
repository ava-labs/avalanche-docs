
export type CoreWalletRpcSchema = [
    {
        Method: 'avalanche_getAccountPubKey',
        Parameters: []
        ReturnType: { xp: string, evm: string }
    },
    {
        Method: 'wallet_getEthereumChain',
        Parameters: []
        ReturnType: {
            chainId: string,
            chainName: string,
            rpcUrls: string[],
            nativeCurrency: {
                name: string,
                symbol: string,
                decimals: number
            },
            isTestnet: boolean
        }
    }
]
