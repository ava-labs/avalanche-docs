import { useL1LauncherWizardStore } from '../../config/store';
import NextPrev from '@/components/tools/common/ui/NextPrev';
import { useState } from 'react';

import { UpgradeProxyForm } from './UpgradeProxy';
import { ValidatorMessagesDeployer } from './ValidatorMessages';
import { PoAValidatorManagerDeployer } from './PoAValidatorManager';
import RequireWalletConnection from '@/components/tools/common/ui/RequireWalletConnectionV2';


// Main Component
export default function DeployContracts() {
    const {
        goToNextStep,
        goToPreviousStep,
        validatorMessagesAddress,
        poaValidatorManagerAddress,
        getViemL1Chain
    } = useL1LauncherWizardStore();

    const [isProxyUpgraded, setIsProxyUpgraded] = useState(false);

    // Both contracts must be deployed and proxy must be upgraded to proceed
    const canProceed = validatorMessagesAddress !== null &&
        poaValidatorManagerAddress !== null &&
        isProxyUpgraded;

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
                    <UpgradeProxyForm onUpgradeComplete={setIsProxyUpgraded} />
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




