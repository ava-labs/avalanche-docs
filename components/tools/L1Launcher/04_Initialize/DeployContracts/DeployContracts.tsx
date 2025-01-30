import { useL1LauncherWizardStore } from '../../config/store';
import NextPrev from '@/components/tools/common/ui/NextPrev';

import { UpgradeProxyUI } from './UpgradeProxy';
import { ValidatorMessagesDeployer } from './ValidatorMessages';
import { PoAValidatorManagerDeployer } from './PoAValidatorManager';
import RequireWalletConnection from '@/components/tools/common/ui/RequireWalletConnection';


// Main Component
export default function DeployContracts() {
    const { 
        goToNextStep, 
        goToPreviousStep,
        validatorMessagesAddress,
        poaValidatorManagerAddress,
        getViemL1Chain
    } = useL1LauncherWizardStore();
    

    // Both contracts must be deployed to proceed
    const canProceed = validatorMessagesAddress !== null && poaValidatorManagerAddress !== null;

    return (
        <RequireWalletConnection chain={getViemL1Chain()} skipUI={true}>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-medium mb-6 dark:text-gray-200">Deploy Contracts</h1>

                <div className="space-y-6">
                    {/* Step 1: Deploy ValidatorMessages */}
                    <ValidatorMessagesDeployer />

                    {/* Step 2: Deploy PoAValidatorManager */}
                    <PoAValidatorManagerDeployer />

                    {/* Step 3: Upgrade Proxy */}
                    <UpgradeProxyUI />
                </div>

                <div className="mt-6">
                    <NextPrev
                        nextDisabled={!canProceed}
                        onNext={goToNextStep}
                        onPrev={goToPreviousStep}
                    />
                </div>
            </div>
        </RequireWalletConnection>
    );
}




