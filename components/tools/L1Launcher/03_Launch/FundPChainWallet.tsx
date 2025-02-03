import { useState, useEffect } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import { getPChainBalance } from '../../common/utils/utxo';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import RequireWalletConnection, { fujiConfig } from '@/components/tools/common/ui/RequireWalletConnection';
import { RefreshCw } from 'lucide-react';

const TRANSFER_BUFFER = 0.1; // Buffer amount to account for fees/precision loss

export default function FundPChainWallet() {
    const { nodesCount, pChainBalance, setPChainBalance, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();
    const [pChainAddress, setPChainAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const requiredAmount = nodesCount + 0.5;
    const currentPBalance = Number(pChainBalance) / 1e9;
    const hasEnoughFunds = currentPBalance >= (requiredAmount - TRANSFER_BUFFER);
    const remainingAmount = Math.max(0, requiredAmount - currentPBalance).toFixed(2);

    const fetchPChainAddress = async () => {
        try {
            const accounts = await window.avalanche.request({
                method: 'avalanche_getAccounts',
                params: []
            });
            const activeAccount = accounts.filter(item => item.active)[0];
            setPChainAddress(activeAccount.addressPVM);
        } catch (err) {
            console.error('Failed to get P-Chain address:', err);
            setError('Failed to get P-Chain address');
        }
    };

    const checkPChainBalance = async () => {
        if (!pChainAddress) return;

        setIsLoading(true);
        setError(null);
        try {
            const balance = await getPChainBalance(pChainAddress);
            setPChainBalance(balance);
        } catch (err) {
            console.error('Failed to get P-Chain balance:', err);
            setError('Failed to get P-Chain balance');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPChainAddress();
    }, []);

    useEffect(() => {
        if (pChainAddress) {
            checkPChainBalance();
            const interval = setInterval(checkPChainBalance, 10000); // Refresh every 10 seconds
            return () => clearInterval(interval);
        }
    }, [pChainAddress]);

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <h1 className="text-2xl font-medium">Fund P-Chain Wallet</h1>
                <p>To set up your L1, you need to transfer {requiredAmount} AVAX to your P-Chain address. You can do this using the <a
                    href="https://test.core.app/stake/cross-chain-transfer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Cross-Chain Transfer tool in Core.app
                </a>.</p>
                {!hasEnoughFunds && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Transfer {remainingAmount} more AVAX to continue.
                    </p>
                )}
            </div>

            <RequireWalletConnection chain={fujiConfig} skipUI={true}>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-gray-600 dark:text-gray-400">P-Chain Address:</div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>Balance: {currentPBalance.toFixed(4)} AVAX</span>
                            <button
                                onClick={checkPChainBalance}
                                disabled={isLoading}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                title="Refresh Balance"
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                    <div className="font-mono text-sm break-all mb-3 text-gray-900 dark:text-gray-100">
                        {pChainAddress}
                    </div>

                    <div className="mt-2">
                        {!hasEnoughFunds ? (
                            <a
                                href="https://test.core.app/stake/cross-chain-transfer/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full px-4 py-2 text-center rounded text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Transfer Funds in Core.app
                            </a>
                        ) : (
                            <div className="flex items-center justify-center space-x-2 p-4 rounded bg-green-50 dark:bg-green-900/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-green-600 dark:text-green-400">Funds Sufficient</span>
                            </div>
                        )}
                    </div>

                    {error && (
                        <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    )}
                </div>
            </RequireWalletConnection>

            <NextPrev
                nextDisabled={!hasEnoughFunds}
                onNext={goToNextStep}
                onPrev={goToPreviousStep}
            />
        </div>
    );
}
