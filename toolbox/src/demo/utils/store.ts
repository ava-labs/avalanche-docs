import { create } from 'zustand'
import { persist, createJSONStorage, combine } from 'zustand/middleware'
import { createCoreWalletClient } from './wallet/createCoreWallet';
import { networkIDs } from '@avalabs/avalanchejs';
import { CoreWalletChain } from './wallet/overrides/addChain';
import { useShallow } from 'zustand/react/shallow'
import { useMemo } from 'react'

export const DEFAULT_VM_ID = "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy";

export const useToolboxStore = create(
    persist(
        combine({
            chainID: "",
            evmChainCoinName: "COIN",
            evmChainId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            evmChainIsTestnet: true,
            evmChainName: "My L1",
            evmChainRpcUrl: "",
            gasLimit: 12000000,
            genesisData: "",
            icmReceiverAddress: "",
            L1ConversionSignature: "",
            L1ID: "",
            managerAddress: "0xfacade0000000000000000000000000000000000",
            nodePopJsons: [""] as string[],
            proxyAddress: "0xfacade0000000000000000000000000000000000",
            proxyAdminAddress: "0xdad0000000000000000000000000000000000000" as `0x${string}`,
            subnetID: "",
            targetBlockRate: 2,
            teleporterRegistryAddress: "",
            validatorManagerAddress: "",
            validatorMessagesLibAddress: "",
            validatorWeights: Array(100).fill(100) as number[],
            vmId: DEFAULT_VM_ID,
        }, (set) => ({
            reset: () => { window.localStorage.removeItem('toolbox-storage'); window.location.reload(); },

            setChainID: (chainID: string) => set({ chainID }),

            setEvmChainCoinName: (evmChainCoinName: string) => set({ evmChainCoinName }),
            setEvmChainId: (evmChainId: number) => set({ evmChainId }),
            setEvmChainIsTestnet: (evmChainIsTestnet: boolean) => set({ evmChainIsTestnet }),
            setEvmChainName: (evmChainName: string) => set({ evmChainName }),
            setEvmChainRpcUrl: (evmChainRpcUrl: string) => set({ evmChainRpcUrl }),

            setGasLimit: (gasLimit: number) => set({ gasLimit }),
            setGenesisData: (genesisData: string) => set({ genesisData }),
            setIcmReceiverAddress: (address: string) => set({ icmReceiverAddress: address }),
            setL1ConversionSignature: (L1ConversionSignature: string) => set({ L1ConversionSignature }),
            setL1ID: (L1ID: string) => set({ L1ID }),
            setManagerAddress: (managerAddress: string) => set({ managerAddress }),
            setNodePopJsons: (nodePopJsons: string[]) => set({ nodePopJsons }),
            setProxyAddress: (proxyAddress: string) => set({ proxyAddress }),
            setProxyAdminAddress: (proxyAdminAddress: `0x${string}`) => set({ proxyAdminAddress }),
            setSubnetID: (subnetID: string) => set({ subnetID }),
            setTargetBlockRate: (targetBlockRate: number) => set({ targetBlockRate }),
            setTeleporterRegistryAddress: (address: string) => set({ teleporterRegistryAddress: address }),
            setValidatorManagerAddress: (validatorManagerAddress: string) => set({ validatorManagerAddress }),
            setValidatorMessagesLibAddress: (validatorMessagesLibAddress: string) => set({ validatorMessagesLibAddress }),
            setValidatorWeights: (validatorWeights: number[]) => set({ validatorWeights }),
            setVmId: (vmId: string) => set({ vmId }),
        })),
        {
            name: 'toolbox-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

export function useViemChainStore() {
    // Use useShallow to select the primitive state values we need
    const chainData = useToolboxStore(
        useShallow((state) => ({
            evmChainId: state.evmChainId,
            evmChainName: state.evmChainName,
            evmChainRpcUrl: state.evmChainRpcUrl,
            evmChainCoinName: state.evmChainCoinName,
            evmChainIsTestnet: state.evmChainIsTestnet
        }))
    );

    // Create the viemChain object with useMemo to prevent unnecessary recreation
    const viemChain = useMemo(() => {
        const { evmChainId, evmChainName, evmChainRpcUrl, evmChainCoinName, evmChainIsTestnet } = chainData;

        if (!evmChainId || !evmChainName || !evmChainRpcUrl || !evmChainCoinName) {
            return null;
        }

        return {
            id: evmChainId,
            name: evmChainName,
            rpcUrls: {
                default: { http: [evmChainRpcUrl] },
            },
            nativeCurrency: {
                name: evmChainCoinName || evmChainName + " Coin",
                symbol: evmChainCoinName || evmChainName + " Coin",
                decimals: 18
            },
            isTestnet: evmChainIsTestnet,
        };
    }, [chainData]);

    return viemChain;
}

export const useWalletStore = create(
    combine({
        coreWalletClient: null as ReturnType<typeof createCoreWalletClient> | null,
        walletChainId: 0,
        walletEVMAddress: "",
        avalancheNetworkID: networkIDs.FujiID as typeof networkIDs.FujiID | typeof networkIDs.MainnetID,
        pChainAddress: "",
    }, set => ({
        setCoreWalletClient: (coreWalletClient: ReturnType<typeof createCoreWalletClient>) => set({ coreWalletClient }),
        setWalletChainId: (walletChainId: number) => set({ walletChainId }),
        setWalletEVMAddress: (walletEVMAddress: string) => set({ walletEVMAddress }),
        setAvalancheNetworkID: (avalancheNetworkID: typeof networkIDs.FujiID | typeof networkIDs.MainnetID) => set({ avalancheNetworkID }),
        setPChainAddress: (pChainAddress: string) => set({ pChainAddress }),
    })),
)
