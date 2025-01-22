import { create } from 'zustand'
import { StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAddresses } from '../../common/utils/wallet';
import { stepList } from './stepList';
import { generateGenesis } from '../../common/utils/genGenesis';
import { AllowlistPrecompileConfig } from '@/components/tools/common/allowlist-precompile-configurator/types';
import { AllocationEntry } from '@/components/tools/common/token-allocation-list/types';
import { StepWizardState } from '@/components/tools/common/ui/types';

interface L1LauncherWizardState extends StepWizardState {
    poaOwnerAddress: string;
    setPoaOwnerAddress: (address: string) => void;

    nodesCount: number;
    setNodesCount: (count: number) => void;

    evmChainId: number;
    setEvmChainId: (chainId: number) => void;

    txAllowlistConfig: AllowlistPrecompileConfig;
    setTxAllowlistConfig: (config: AllowlistPrecompileConfig) => void;

    contractDeployerAllowlistConfig: AllowlistPrecompileConfig;
    setContractDeployerAllowlistConfig: (config: AllowlistPrecompileConfig) => void;

    nativeMinterAllowlistConfig: AllowlistPrecompileConfig;
    setNativeMinterAllowlistConfig: (config: AllowlistPrecompileConfig) => void;

    genesisString: string;
    regenerateGenesis: () => Promise<void>;

    nodePopJsons: string[];
    setNodePopJsons: (nodePopJsons: string[]) => void;

    l1Name: string;
    setL1Name: (l1Name: string) => void;

    chainId: string;
    setChainId: (chainId: string) => void;

    subnetId: string;
    setSubnetId: (subnetId: string) => void;

    conversionId: string;
    setConversionId: (conversionId: string) => void;

    rpcLocationType: 'local' | 'remote';
    setRpcLocationType: (type: 'local' | 'remote') => void;

    rpcDomainType: 'has-domain' | 'no-domain' | 'manual-ssl';
    setRpcDomainType: (type: 'has-domain' | 'no-domain' | 'manual-ssl') => void;

    rpcAddress: string;
    setRpcAddress: (address: string) => void;

    rpcVerified: boolean;
    setRpcVerified: (verified: boolean) => void;

    tokenSymbol: string;
    setTokenSymbol: (symbol: string) => void;

    tokenAllocations: AllocationEntry[];
    setTokenAllocations: (allocations: AllocationEntry[]) => void;

    tempPrivateKeyHex: string;
    setTempPrivateKeyHex: (key: string) => void;

    pChainBalance: string;
    setPChainBalance: (balance: string) => void;
    getCChainRpcEndpoint: () => string;
    getRpcEndpoint: () => string;

    convertL1SignedWarpMessage: `0x${string}` | null;
    setConvertL1SignedWarpMessage: (message: `0x${string}` | null) => void;
}


import generateName from 'boring-name-generator'
import { createStepWizardStore } from '../../common/ui/StepWizardStoreCreator';

const L1LauncherWizardStoreFunc: StateCreator<L1LauncherWizardState> = (set, get) => ({
    ...createStepWizardStore({set, get, stepList}),

    poaOwnerAddress: "",
    setPoaOwnerAddress: (address: string) => set(() => ({
        poaOwnerAddress: address,
        genesisString: "",
    })),

    nodesCount: 1,
    setNodesCount: (count: number) => set(() => ({ nodesCount: count })),

    nodePopJsons: ["", "", "", "", "", "", "", "", "", ""],
    setNodePopJsons: (nodePopJsons: string[]) => set(() => ({ nodePopJsons: nodePopJsons })),

    l1Name: (generateName().spaced.split('-').join(' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + " L1"),
    setL1Name: (l1Name: string) => set(() => ({ l1Name: l1Name })),

    chainId: "",
    setChainId: (chainId: string) => set(() => ({ chainId: chainId })),

    subnetId: "",
    setSubnetId: (subnetId: string) => set(() => ({ subnetId: subnetId })),

    conversionId: "",
    setConversionId: (conversionId: string) => set(() => ({ conversionId: conversionId })),

    evmChainId: Math.floor(Math.random() * 1000000) + 1,
    setEvmChainId: (chainId: number) => set(() => ({
        evmChainId: chainId,
        genesisString: ""
    })),

    txAllowlistConfig: {
        addresses: {
            Admin: [],
            Manager: [],
            Enabled: []
        },
        activated: false
    } as AllowlistPrecompileConfig,
    setTxAllowlistConfig: (config: AllowlistPrecompileConfig) => set(() => ({ txAllowlistConfig: config })),

    contractDeployerAllowlistConfig: {
        addresses: {
            Admin: [],
            Manager: [],
            Enabled: []
        },
        activated: true
    } as AllowlistPrecompileConfig,
    setContractDeployerAllowlistConfig: (config: AllowlistPrecompileConfig) => set(() => ({ contractDeployerAllowlistConfig: config })),

    tokenSymbol: "TEST",
    setTokenSymbol: (symbol: string) => set(() => ({ tokenSymbol: symbol })),

    tempPrivateKeyHex: "",
    setTempPrivateKeyHex: (key: string) => set(() => ({
        tempPrivateKeyHex: key,
        tokenAllocations: [],
        txAllowlistConfig: {
            addresses: {
                Admin: get().txAllowlistConfig.addresses.Admin,
                Manager: get().txAllowlistConfig.addresses.Manager,
                Enabled: [
                    {
                        id: '1',
                        address: getAddresses(key).C,
                        requiredReason: 'Initial Contract Deployer'
                    },
                    ...get().txAllowlistConfig.addresses.Enabled.filter(entry => entry.requiredReason !== "Initial Contract Deployer")
                ]
            },
            activated: get().txAllowlistConfig.activated
        },
        contractDeployerAllowlistConfig: {
            addresses: {
                Admin: get().contractDeployerAllowlistConfig.addresses.Admin,
                Manager: get().contractDeployerAllowlistConfig.addresses.Manager,
                Enabled: [
                    {
                        id: '1',
                        address: getAddresses(key).C,
                        requiredReason: 'Initial Contract Deployer'
                    },
                    ...get().contractDeployerAllowlistConfig.addresses.Enabled.filter(entry => entry.requiredReason !== "Initial Contract Deployer")
                ]
            },
            activated: get().txAllowlistConfig.activated
        }
    })),

    tokenAllocations: [] as AllocationEntry[],
    setTokenAllocations: (allocations: AllocationEntry[]) => set(() => ({ tokenAllocations: allocations })),

    nativeMinterAllowlistConfig: {
        addresses: {
            Admin: [],
            Manager: [],
            Enabled: []
        },
        activated: false
    } as AllowlistPrecompileConfig,
    setNativeMinterAllowlistConfig: (config: AllowlistPrecompileConfig) => set(() => ({ nativeMinterAllowlistConfig: config })),

    genesisString: "",
    regenerateGenesis: async () => {
        const { poaOwnerAddress, evmChainId, tempPrivateKeyHex, txAllowlistConfig, contractDeployerAllowlistConfig, nativeMinterAllowlistConfig, tokenAllocations } = get();

        const genesis = generateGenesis({
            evmChainId,
            tokenAllocations,
            txAllowlistConfig,
            contractDeployerAllowlistConfig,
            nativeMinterAllowlistConfig,
            poaOwnerAddress
        });

        set({ genesisString: JSON.stringify(genesis, null, 2) });
    },

    rpcLocationType: 'local',
    setRpcLocationType: (type) => set(() => ({ rpcLocationType: type })),

    rpcDomainType: 'has-domain',
    setRpcDomainType: (type) => set(() => ({ rpcDomainType: type })),

    rpcAddress: '',
    setRpcAddress: (address) => set(() => ({ rpcAddress: address })),

    rpcVerified: false,
    setRpcVerified: (verified) => set(() => ({ rpcVerified: verified })),

    pChainBalance: "0",
    setPChainBalance: (balance: string) => set(() => ({ pChainBalance: balance })),

    getRpcEndpoint: () => {
        const state = get();
        if (state.rpcLocationType === 'local') {
            return 'http://localhost:8080';
        }
        if (state.rpcDomainType === 'no-domain') {
            return `https://${state.rpcAddress}.nip.io`;
        }
        return `https://${state.rpcAddress}`;
    },

    getCChainRpcEndpoint: () => {
        const state = get();
        const baseEndpoint = get().getRpcEndpoint();
        return `${baseEndpoint}/ext/bc/${state.chainId}/rpc`;
    },

    convertL1SignedWarpMessage: null,
    setConvertL1SignedWarpMessage: (message: `0x${string}` | null) => set(() => ({ convertL1SignedWarpMessage: message })),
})


const shouldPersist = true//window.location.origin.startsWith("http://localhost:") || window.location.origin.startsWith("http://tokyo:")

export const useL1LauncherWizardStore = shouldPersist
    ? create<L1LauncherWizardState>()(
        persist(
            L1LauncherWizardStoreFunc,
            {
                name: 'l1-launcher-wizard-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
    : create<L1LauncherWizardState>()(L1LauncherWizardStoreFunc);

export const resetL1ManagerWizardStore = () => {
    if (confirm('Are you sure you want to start over? This will reset all progress while preserving your temporary wallet.')) {
        const currentStore = useL1LauncherWizardStore.getState();
        const savedPrivateKey = currentStore.tempPrivateKeyHex;
        localStorage.setItem('temp-private-key', savedPrivateKey);
        localStorage.removeItem('l1-launcher-wizard-storage');
        window.location.reload();
    }
};

// Initialize store with saved private key if it exists
if (typeof window !== 'undefined') {
    const savedPrivateKey = localStorage.getItem('temp-private-key');
    if (savedPrivateKey) {
        useL1LauncherWizardStore.getState().setTempPrivateKeyHex(savedPrivateKey);
        localStorage.removeItem('temp-private-key');
    }
}
