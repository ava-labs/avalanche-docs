import { useState } from 'react';
import { useL1LauncherWizardStore } from '../../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import RequireWalletConnection, { ChainConfig } from '@/components/tools/common/ui/RequireWalletConnection';
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
        goToNextStep,
        goToPreviousStep
    } = useL1LauncherWizardStore();

    // Create chain config object
    const chainConfig: ChainConfig = {
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
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Initialize Validator Manager</h1>
                <p>This step will initialize your validator manager contract with the required signatures.</p>
            </div>

            <RequireWalletConnection chainConfig={chainConfig}>
                <CollectSignatures />
                <ContractInitialize />
                <ContractInitializeValidatorSet />
                <CheckContractLogs onSuccess={() => setIsInitialized(true)} />
            </RequireWalletConnection>

            <NextPrev
                nextDisabled={!isInitialized}
                onNext={goToNextStep}
                onPrev={goToPreviousStep}
            />
                
        </div>
        
    );
}
