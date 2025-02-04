import { useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from '@/components/tools/common/ui/NextPrev';
import Note from '@/components/tools/common/ui/Note';
import { getWalletAddress } from '../../common/utils/wallet';
import RequireWalletConnection, { ChainConfig } from '@/components/tools/common/ui/RequireWalletConnection';

export default function AddToWallet() {
    const { evmChainId, l1Name, tokenSymbol, getCChainRpcEndpoint, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();
    const [connectionSuccess, setConnectionSuccess] = useState<boolean>(false);

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
        blockExplorerUrls: [], // Add block explorer URLs if available
        isTestnet: true 
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Add to Wallet</h1>
                <p>Now that we have an RPC node set up, it is time to connect our wallet to the L1 so we can deploy the contracts.</p>
            </div>
            <RequireWalletConnection chainConfig={chainConfig} requiredBalance={0.1} onConnection={() => setConnectionSuccess(true)}/>
    
            <NextPrev nextDisabled={!connectionSuccess} onNext={goToNextStep} onPrev={goToPreviousStep} />
        </div>
    );
};
