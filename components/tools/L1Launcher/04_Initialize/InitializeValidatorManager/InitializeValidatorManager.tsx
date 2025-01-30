import { useState } from 'react';
import { useL1LauncherWizardStore } from '../../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import RequireWalletConnection from '@/components/tools/common/ui/RequireWalletConnection';
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
        getL1RpcEndpoint,
        goToNextStep,
        goToPreviousStep,
        getViemL1Chain
    } = useL1LauncherWizardStore();

    
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Initialize Validator Manager</h1>
                <p>This step will initialize your validator manager contract with the required signatures.</p>
            </div>

            <RequireWalletConnection chain={getViemL1Chain()} skipUI={true}>
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
