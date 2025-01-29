import { defineChain, keccak256 } from 'viem';

export function getChainConfig(evmChainId: number, chainId: string, rpcEndpoint: string) {
    return defineChain({
        id: Number(evmChainId),
        name: chainId,
        nativeCurrency: {
            decimals: 18,
            name: 'Native Token',
            symbol: 'TOKEN',
        },
        rpcUrls: {
            default: { http: [rpcEndpoint] },
            public: { http: [rpcEndpoint] },
        },
    });
}

export function calculateLibraryHash(libraryPath: string) {
    // Calculate keccak256 of the fully qualified library name
    const hash = keccak256(
        new TextEncoder().encode(libraryPath)
    ).slice(2);
    // Take first 34 characters (17 bytes)
    return hash.slice(0, 34);
} 
