import { useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from '@/components/tools/common/ui/NextPrev';
import RequireWalletConnection from '@/components/tools/common/ui/RequireWalletConnection';

export default function AddToWallet() {
    const { evmChainId, l1Name, tokenSymbol, getL1RpcEndpoint, goToNextStep, goToPreviousStep, getViemL1Chain } = useL1LauncherWizardStore();
    const [connectionSuccess, setConnectionSuccess] = useState<boolean>(false);


    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Add to Wallet</h1>
                <p>Now that we have an RPC node set up, it is time to connect our wallet to the L1 so we can deploy the contracts.</p>
            </div>
            <RequireWalletConnection chain={getViemL1Chain()} onConnection={() => setConnectionSuccess(true)} />

            <NextPrev nextDisabled={!connectionSuccess} onNext={goToNextStep} onPrev={goToPreviousStep} />
        </div>
    );
};
