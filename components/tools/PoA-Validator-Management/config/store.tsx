import { create } from 'zustand'
import { StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAddresses } from '@/components/tools/common/utils/wallet';
import { stepList } from './stepList';
import { AllowlistPrecompileConfig } from '@/components/tools/common/allowlist-precompile-configurator/types';
import { AllocationEntry } from '@/components/tools/common/token-allocation-list/types';
import { StepWizardState } from '@/components/tools/common/ui/types';
import { createStepWizardStore } from '@/components/tools/common/ui/StepWizardStoreCreator';
import { Validator } from '../../common/api/types'

interface NetworkToken {
    name: string;
    symbol: string;
    decimals: number;
    logoUri: string;
    description: string;
}

interface UtilityAddresses {
    multicall: string;
}

interface ChainInfo {
    chainId: string;
    status: string;
    chainName: string;
    description: string;
    platformChainId: string;
    subnetId: string;
    vmId: string;
    vmName: string;
    explorerUrl: string;
    rpcUrl: string;
    wsUrl: string;
    isTestnet: boolean;
    utilityAddresses: UtilityAddresses;
    networkToken: NetworkToken;
    chainLogoUri: string;
    private: boolean;
    enabledFeatures: string[];
}

interface L1ManagerWizardState extends StepWizardState {
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

    rpcUrl: string;
    setRpcUrl: (url: string) => void;
    
    transparentProxyAddress: string;
    setTransparentProxyAddress: (address: string) => void;

    chainInfo: ChainInfo | null;
    setChainInfo: (info: ChainInfo) => void;

    validators: Validator[]
    setValidators: (validators: Validator[]) => void
}

const L1ManagerWizardStoreFunc: StateCreator<L1ManagerWizardState> = (set, get) => ({
    ...createStepWizardStore({set, get, stepList}),
    
    poaOwnerAddress: "",
    setPoaOwnerAddress: (address: string) => set(() => ({
        poaOwnerAddress: address
    })),

    nodesCount: 1,
    setNodesCount: (count: number) => set(() => ({ nodesCount: count })),

    nodePopJsons: ["", "", "", "", "", "", "", "", "", ""],
    setNodePopJsons: (nodePopJsons: string[]) => set(() => ({ nodePopJsons: nodePopJsons })),

    l1Name: "",
    setL1Name: (l1Name: string) => set(() => ({ l1Name: l1Name })),

    chainId: "",
    setChainId: (chainId: string) => set(() => ({ chainId: chainId })),

    subnetId: "",
    setSubnetId: (subnetId: string) => set(() => ({ subnetId: subnetId })),

    conversionId: "",
    setConversionId: (conversionId: string) => set(() => ({ conversionId: conversionId })),

    evmChainId: 0,
    setEvmChainId: (chainId: number) => set(() => ({
        evmChainId: chainId
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
        tokenAllocations: [
            { id:"Initial Contract Deployer", address: getAddresses(key).C, amount: 1, requiredReason: "Initial Contract Deployer" } as AllocationEntry,
            ...get().tokenAllocations.filter((entry) => entry.requiredReason !== "Initial Contract Deployer")
        ],
        txAllowlistConfig : {
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
        contractDeployerAllowlistConfig : {
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

    tokenAllocations: [ ] as AllocationEntry[],
    setTokenAllocations: (allocations: AllocationEntry[]) => set(() => ({ tokenAllocations: allocations })),

    nativeMinterAllowlistConfig: {
        addresses: {
          Admin: [],
          Manager: [],
          Enabled: []
        },
        activated: false} as AllowlistPrecompileConfig,
    setNativeMinterAllowlistConfig: (config: AllowlistPrecompileConfig) => set(() => ({ nativeMinterAllowlistConfig: config })),

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

    rpcUrl: '',
    setRpcUrl: (url: string) => set(() => ({ rpcUrl: url })),
    
    transparentProxyAddress: '0x0feedc0de0000000000000000000000000000000',
    setTransparentProxyAddress: (address: string) => set(() => ({ transparentProxyAddress: address })),

    chainInfo: null,
    setChainInfo: (info: ChainInfo) => set(() => ({ chainInfo: info })),

    validators: [],
    setValidators: (validators: Validator[]) => set(() => ({ validators })),
})


const shouldPersist = true//window.location.origin.startsWith("http://localhost:") || window.location.origin.startsWith("http://tokyo:")

export const useL1ManagerWizardStore = shouldPersist
    ? create<L1ManagerWizardState>()(
        persist(
            L1ManagerWizardStoreFunc,
            {
                name: 'l1-manager-wizard-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
    : create<L1ManagerWizardState>()(L1ManagerWizardStoreFunc);

export const resetL1ManagerWizardStore = () => {
    if (confirm('Are you sure you want to start over? This will reset all progress while preserving your temporary wallet.')) {
        const currentStore = useL1ManagerWizardStore.getState();
        const savedPrivateKey = currentStore.tempPrivateKeyHex;
        localStorage.setItem('temp-private-key', savedPrivateKey);
        localStorage.removeItem('l1-manager-wizard-storage');
        window.location.reload();
    }
};

// Initialize store with saved private key if it exists
if (typeof window !== 'undefined') {
    const savedPrivateKey = localStorage.getItem('temp-private-key');
    if (savedPrivateKey) {
        useL1ManagerWizardStore.getState().setTempPrivateKeyHex(savedPrivateKey);
        localStorage.removeItem('temp-private-key');
    }
}
