import { useState } from 'react';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import SwitchChain from '../ui/SwitchChain';
import CheckContractLogs from './04_CheckContractLogs';
import CollectSignatures from './01_CollectSignatures';
import ContractInitialize from './02_ContractInitialize';
import ContractInitializeValidatorSet from './03_ContractInitializeValidatorSet';

export default function InitializeValidatorManager() {
    const [isInitialized, setIsInitialized] = useState(false);
    const {
        evmChainId,
        l1Name,
        tokenSymbol,
        getCChainRpcEndpoint,
    } = useWizardStore();

    // Create chain config object
    const chainConfig = {
        chainId: `0x${evmChainId.toString(16)}`,
        chainName: l1Name,
        nativeCurrency: {
            name: tokenSymbol,
            symbol: tokenSymbol,
            decimals: 18
        },
        rpcUrls: [getCChainRpcEndpoint()],
        blockExplorerUrls: [] // Add block explorer URLs if available
    };

    return (
        <SwitchChain chainConfig={chainConfig}>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-medium mb-6">Initialize Validator Manager</h1>

                <p className="mb-4">
                    This step will initialize your validator manager contract with the required signatures.
                </p>

                <CollectSignatures />
                <ContractInitialize />
                <ContractInitializeValidatorSet />
                <CheckContractLogs onSuccess={() => setIsInitialized(true)} />

                <NextPrev
                    currentStepName="initialize-validator-manager"
                    nextDisabled={!isInitialized}
                />
            </div>
        </SwitchChain>
    );
}
