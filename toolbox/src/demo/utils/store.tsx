import { create } from 'zustand'
import { persist, createJSONStorage, combine } from 'zustand/middleware'
import { networkIDs } from "@avalabs/avalanchejs";

export const initialState = {
    pChainAddress: "",
    networkID: networkIDs.FujiID,
    xpPublicKey: "",
    evmPublicKey: "",
    subnetID: "",
    chainName: "My Chain",
    vmId: "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy",
    chainID: "",
    nodePopJsons: [""] as string[],
    validatorWeights: Array(100).fill(100) as number[],
    managerAddress: "0xfacade0000000000000000000000000000000000",
    L1ID: "",
    L1ConversionSignature: "",
    validatorMessagesLibAddress: "",
    walletChainId: 0,
    evmChainName: "My L1",
    evmChainRpcUrl: "",
    evmChainId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    evmChainCoinName: "COIN",
    validatorManagerAddress: "",
    proxyAddress: "0xfacade0000000000000000000000000000000000",
    proxyAdminAddress: "0xdad0000000000000000000000000000000000000" as `0x${string}`,
    walletEVMAddress: "",
    genesisData: "",
}

export const useExampleStore = create(
    persist(
        combine(initialState, (set) => ({
            setPChainAddress: (pChainAddress: string) => set({ pChainAddress }),
            setNetworkID: (networkID: number) => set({ networkID }),
            setXpPublicKey: (xpPublicKey: string) => set({ xpPublicKey }),
            setEvmPublicKey: (evmPublicKey: string) => set({ evmPublicKey }),
            setSubnetID: (subnetID: string) => set({ subnetID }),
            setChainName: (chainName: string) => set({ chainName }),
            setVmId: (vmId: string) => set({ vmId }),
            setChainID: (chainID: string) => set({ chainID }),
            setNodePopJsons: (nodePopJsons: string[]) => set({ nodePopJsons }),
            setValidatorWeights: (validatorWeights: number[]) => set({ validatorWeights }),
            setManagerAddress: (managerAddress: string) => set({ managerAddress }),
            setL1ID: (L1ID: string) => set({ L1ID }),
            setL1ConversionSignature: (L1ConversionSignature: string) => set({ L1ConversionSignature }),
            setValidatorMessagesLibAddress: (validatorMessagesLibAddress: string) => set({ validatorMessagesLibAddress }),
            setWalletChainId: (walletChainId: number) => set({ walletChainId }),
            setEvmChainName: (evmChainName: string) => set({ evmChainName }),
            setEvmChainRpcUrl: (evmChainRpcUrl: string) => set({ evmChainRpcUrl }),
            setEvmChainCoinName: (evmChainCoinName: string) => set({ evmChainCoinName }),
            setValidatorManagerAddress: (validatorManagerAddress: string) => set({ validatorManagerAddress }),
            setProxyAddress: (proxyAddress: string) => set({ proxyAddress }),
            setProxyAdminAddress: (proxyAdminAddress: `0x${string}`) => set({ proxyAdminAddress }),
            setWalletEVMAddress: (walletEVMAddress: string) => set({ walletEVMAddress }),
            setGenesisData: (genesisData: string) => set({ genesisData }),
            reset: () => {
                window.localStorage.removeItem('example-storage');
                window.location.reload();
            },
            setEvmChainId: (evmChainId: number) => set({ evmChainId }),
        })),
        {
            name: 'example-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)
