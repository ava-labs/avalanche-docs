import { create } from 'zustand'
import { StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getAddresses, newPrivateKey } from './wallet';
import { stepList } from './ui/Steps';
import { generateGenesis } from './02_Genesis/genGenesis';

interface WizardState {
    ownerEthAddress: string;
    setOwnerEthAddress: (address: string) => void;
    currentStep: keyof typeof stepList;
    advanceFrom: (givenStep: keyof typeof stepList, direction?: "up" | "down") => void;
    nodesCount: number;
    setNodesCount: (count: number) => void;
    evmChainId: number;
    setEvmChainId: (chainId: number) => void;
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
    tempPrivateKeyHex: string;
    setTempPrivateKeyHex: (key: string) => void;
    pChainBalance: string;
    setPChainBalance: (balance: string) => void;
    getCChainRpcEndpoint: () => string;
    getRpcEndpoint: () => string;
    maxAdvancedStep: keyof typeof stepList;
    advanceTo: (targetStep: keyof typeof stepList) => void;
    convertL1SignedWarpMessage: `0x${string}` | null;
    setConvertL1SignedWarpMessage: (message: `0x${string}` | null) => void;
}


import generateName from 'boring-name-generator'
import { apiHostPromise } from './config';

const wizardStoreFunc: StateCreator<WizardState> = (set, get) => ({
    ownerEthAddress: "",
    setOwnerEthAddress: (address: string) => set(() => ({
        ownerEthAddress: address,
        genesisString: "",
    })),

    currentStep: Object.keys(stepList)[0] as keyof typeof stepList,
    advanceFrom: (givenStep, direction: "up" | "down" = "up") => set((state) => {
        const stepKeys = Object.keys(stepList) as (keyof typeof stepList)[];
        const currentIndex = stepKeys.indexOf(givenStep);

        if (direction === "up" && currentIndex < stepKeys.length - 1) {
            const nextStep = stepKeys[currentIndex + 1];
            return {
                currentStep: nextStep,
                maxAdvancedStep: nextStep // Update maxAdvancedStep when moving forward
            };
        }
        if (direction === "down" && currentIndex > 0) {
            return { currentStep: stepKeys[currentIndex - 1] };
        }
        return state;
    }),

    nodesCount: 1,
    setNodesCount: (count: number) => set(() => ({ nodesCount: count })),

    genesisString: "",
    regenerateGenesis: async () => {
        const { ownerEthAddress, evmChainId, tempPrivateKeyHex } = get();
        const { C: initialContractDeployer } = getAddresses(tempPrivateKeyHex);

        const genesis = generateGenesis({
            evmChainId,
            initialBalances: {
                [ownerEthAddress]: "1000000000.00",
                [initialContractDeployer]: "1.00",
            },
        });

        set({ genesisString: JSON.stringify(genesis, null, 2) });
    },

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

    rpcLocationType: 'local',
    setRpcLocationType: (type) => set(() => ({ rpcLocationType: type })),

    rpcDomainType: 'has-domain',
    setRpcDomainType: (type) => set(() => ({ rpcDomainType: type })),

    rpcAddress: '',
    setRpcAddress: (address) => set(() => ({ rpcAddress: address })),

    rpcVerified: false,
    setRpcVerified: (verified) => set(() => ({ rpcVerified: verified })),

    tokenSymbol: "TEST",
    setTokenSymbol: (symbol: string) => set(() => ({ tokenSymbol: symbol })),

    tempPrivateKeyHex: newPrivateKey(),
    setTempPrivateKeyHex: (key: string) => set(() => ({ tempPrivateKeyHex: key })),

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

    maxAdvancedStep: Object.keys(stepList)[0] as keyof typeof stepList,

    advanceTo: (targetStep) => set((state) => {
        const stepKeys = Object.keys(stepList) as (keyof typeof stepList)[];
        const targetIndex = stepKeys.indexOf(targetStep);
        const maxAdvancedIndex = stepKeys.indexOf(state.maxAdvancedStep);

        // Only allow navigation to steps that have been reached before
        if (targetIndex <= maxAdvancedIndex) {
            return { currentStep: targetStep };
        }
        return state;
    }),

    convertL1SignedWarpMessage: null,
    setConvertL1SignedWarpMessage: (message: `0x${string}` | null) => set(() => ({ convertL1SignedWarpMessage: message })),
})


const shouldPersist = true//window.location.origin.startsWith("http://localhost:") || window.location.origin.startsWith("http://tokyo:")

export const useWizardStore = shouldPersist
    ? create<WizardState>()(
        persist(
            wizardStoreFunc,
            {
                name: 'wizard-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
    : create<WizardState>()(wizardStoreFunc);

export const resetStore = () => {
    if (confirm('Are you sure you want to start over? This will reset all progress while preserving your temporary wallet.')) {
        const currentStore = useWizardStore.getState();
        const savedPrivateKey = currentStore.tempPrivateKeyHex;
        localStorage.setItem('temp-private-key', savedPrivateKey);
        localStorage.removeItem('wizard-storage');
        window.location.reload();
    }
};

// Initialize store with saved private key if it exists
if (typeof window !== 'undefined') {
    const savedPrivateKey = localStorage.getItem('temp-private-key');
    if (savedPrivateKey) {
        useWizardStore.setState({ tempPrivateKeyHex: savedPrivateKey });
        localStorage.removeItem('temp-private-key');
    }
}
