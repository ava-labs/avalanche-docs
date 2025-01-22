import { useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from '@/components/tools/common/ui/NextPrev';
import Note from '@/components/tools/common/ui/Note';
import { getWalletAddress } from '../../common/utils/wallet';
import RequireWalletConnection, { ChainConfig } from '@/components/tools/common/ui/RequireWalletConnection';

export default function AddToWallet() {
    const { evmChainId, l1Name, tokenSymbol, getCChainRpcEndpoint, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();
    const [balanceError, setBalanceError] = useState<string | null>(null);
    const [balanceInfo, setBalanceInfo] = useState<{ address: string; balance: number } | null>(null);

    const checkAccountBalance = async () => {
        try {
            const account = await getWalletAddress()
            const rpcUrl = getCChainRpcEndpoint();
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [account, 'latest'],
                    id: 1,
                }),
            });

            const data = await response.json();
            if (data.error) {
                setBalanceError(data.error.message);
                return;
            }

            const balance = parseInt(data.result, 16) / 1e18; // Convert balance from wei to ether
            if (balance === 0) {
                setBalanceError('Your account balance is zero. Please fund your account to proceed.');
                return;
            }

            setBalanceError(null); // Clear any previous errors
            setBalanceInfo({ address: account, balance });
            return;
        } catch (error: any) {
            console.error('Balance check failed:', error);
            setBalanceError(error.message);
            return;
        }
    };

    // Create chain config object
    const chainConfig: ChainConfig = {
        network: 'Testnet',
        EVMChainId: `0x${evmChainId.toString(16)}`,
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
                <h1 className="text-2xl font-medium mb-4">Add to Wallet</h1>
                <p>Now that we have an RPC node set up, it is time to connect our wallet to the L1 so we can deploy the contracts.</p>
            </div>
            <RequireWalletConnection chainConfig={chainConfig} onConnection={checkAccountBalance}/>
    
                {balanceError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-4 mb-6">
                        <h3 className="font-medium mb-2 text-red-700 dark:text-red-400">Balance Error</h3>
                        <p className="text-red-600 dark:text-red-400">{balanceError}</p>
                        <button onClick={checkAccountBalance} className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Retry
                        </button>
                    </div>
                )}

                {balanceInfo && (
                    <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-400 dark:border-green-600 p-4 mb-6">
                        <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Wallet Added Successfully</h3>
                        <p className="text-gray-800 dark:text-gray-200">
                            Balance of account <span className="font-mono">{balanceInfo.address}</span> is{' '}
                            <span className="font-bold">{balanceInfo.balance.toFixed(4)} {tokenSymbol}</span>.
                        </p>
                    </div>
                )}

                {!balanceError && (
                    <Note>
                        You can now interact with your L1 chain using your wallet!
                    </Note>
                )}

            <NextPrev nextDisabled={!!balanceError} onNext={goToNextStep} onPrev={goToPreviousStep} />
        </div>
    );
};
