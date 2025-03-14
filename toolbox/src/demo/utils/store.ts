import { create } from 'zustand'
import { persist, createJSONStorage, combine } from 'zustand/middleware'
import { createCoreWalletClient } from './wallet/createCoreWallet';
import { networkIDs } from '@avalabs/avalanchejs';
import { Chain } from 'viem';

export const DEFAULT_VM_ID = "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy";

export const useToolboxStore = create(
    persist(
        combine({
            subnetID: "",
            chainName: "My Chain",
            vmId: DEFAULT_VM_ID,
            chainID: "",
            nodePopJsons: [""] as string[],
            validatorWeights: Array(100).fill(100) as number[],
            managerAddress: "0xfacade0000000000000000000000000000000000",
            L1ID: "",
            L1ConversionSignature: "",
            validatorMessagesLibAddress: "",
            evmChainName: "My L1",
            evmChainRpcUrl: "",
            evmChainId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
            evmChainCoinName: "COIN",
            validatorManagerAddress: "",
            proxyAddress: "0xfacade0000000000000000000000000000000000",
            proxyAdminAddress: "0xdad0000000000000000000000000000000000000" as `0x${string}`,
            genesisData: "",
            teleporterRegistryAddress: "",
            gasLimit: 12000000,
            targetBlockRate: 2,
            icmReceiverAddress: "",
        }, (set, get) => ({
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
            setEvmChainName: (evmChainName: string) => set({ evmChainName }),
            setEvmChainRpcUrl: (evmChainRpcUrl: string) => set({ evmChainRpcUrl }),
            setEvmChainCoinName: (evmChainCoinName: string) => set({ evmChainCoinName }),
            setValidatorManagerAddress: (validatorManagerAddress: string) => set({ validatorManagerAddress }),
            setProxyAddress: (proxyAddress: string) => set({ proxyAddress }),
            setProxyAdminAddress: (proxyAdminAddress: `0x${string}`) => set({ proxyAdminAddress }),
            setGenesisData: (genesisData: string) => set({ genesisData }),
            setGasLimit: (gasLimit: number) => set({ gasLimit }),
            setTargetBlockRate: (targetBlockRate: number) => set({ targetBlockRate }),
            reset: () => {
                window.localStorage.removeItem('toolbox-storage');
                window.location.reload();
            },
            setEvmChainId: (evmChainId: number) => set({ evmChainId }),
            setTeleporterRegistryAddress: (address: string) => set({ teleporterRegistryAddress: address }),
            setIcmReceiverAddress: (address: string) => set({ icmReceiverAddress: address }),

            getChain: (): Chain | null => {
                if (!get().evmChainId || !get().evmChainName || !get().evmChainRpcUrl || !get().evmChainCoinName) {
                    return null;
                }

                return {
                    id: get().evmChainId,
                    name: get().evmChainName,
                    rpcUrls: {
                        default: { http: [get().evmChainRpcUrl] },
                    },
                    nativeCurrency: {
                        name: get().evmChainCoinName,
                        symbol: get().evmChainCoinName,
                        decimals: 18
                    }
                }
            }
        })),
        {
            name: 'toolbox-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)

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
