import { useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from '@/components/tools/common/ui/NextPrev';
import Note from '@/components/tools/common/ui/Note';
import { getWalletAddress } from '../../common/utils/wallet';
import SwitchChain from '@/components/tools/common/ui/SwitchChain';

export default function AddToWallet() {
    const { evmChainId, l1Name, tokenSymbol, getCChainRpcEndpoint, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();
    const [isAdded, setIsAdded] = useState(false);
    const [balanceError, setBalanceError] = useState<string | null>(null);
    const [walletError, setWalletError] = useState<string | null>(null);
    const [balanceInfo, setBalanceInfo] = useState<{ address: string; balance: number } | null>(null);

    const checkAccountBalance = async (): Promise<{ address: string; balance: number } | null> => {
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
                throw new Error(data.error.message);
            }

            const balance = parseInt(data.result, 16) / 1e18; // Convert balance from wei to ether
            if (balance === 0) {
                throw new Error('Your account balance is zero. Please fund your account to proceed.');
            }

            setBalanceError(null); // Clear any previous errors
            return { address: account, balance }; // Return account and balance
        } catch (error: any) {
            console.error('Balance check failed:', error);
            setBalanceError(error.message);
            return null; // Return null if balance check fails
        }
    };

    const handleAddToWallet = async () => {
        try {
            setWalletError(null); // Clear any previous wallet errors
            if (!window.ethereum) {
                throw new Error('No wallet detected');
            }

            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: `0x${evmChainId.toString(16)}`,
                    chainName: l1Name,
                    nativeCurrency: {
                        name: tokenSymbol,
                        symbol: tokenSymbol,
                        decimals: 18
                    },
                    rpcUrls: [getCChainRpcEndpoint()],
                }],
            });

            const balanceInfo = await checkAccountBalance();
            if (balanceInfo) {
                setIsAdded(true);
                setBalanceInfo(balanceInfo);
            }
        } catch (error: any) {
            console.error('Failed to add to wallet:', error);
            setWalletError(error.message);
            setIsAdded(false);
        }
    };

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

    if (!window.ethereum) {
        return (
            <SwitchChain chainConfig={chainConfig}>
                <h1 className="text-2xl font-medium mb-6">Add to Wallet</h1>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <h3 className="font-medium mb-2">No Wallet Detected</h3>
                    <p className="mb-4">
                        You need a Web3 wallet to interact with your L1 chain. We recommend installing Core wallet:
                    </p>
                    <a
                        href="https://chromewebstore.google.com/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
                    >
                        Install Core Wallet
                    </a>
                </div>

                <NextPrev nextDisabled={true} onNext={goToNextStep} onPrev={goToPreviousStep} />
            </SwitchChain>
        );
    }

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Add to Wallet</h1>
                <p>Now that we have an RPC node set up, it is time to connect our wallet to the L1 so we can deploy the contracts.</p>
            </div>
            <SwitchChain chainConfig={chainConfig}>
                <p>Success</p>
            </SwitchChain>
            <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 p-4 mb-6">
                <div className="space-y-4">
                    <div>
                        <div className="font-medium">Chain Name:</div>
                        <div>{l1Name}</div>
                    </div>
                    <div>
                        <div className="font-medium">Chain ID:</div>
                        <div>{evmChainId}</div>
                    </div>
                    <div>
                        <div className="font-medium">RPC URL:</div>
                        <div className="break-all">{getCChainRpcEndpoint()}</div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <button
                    onClick={handleAddToWallet}
                    disabled={isAdded}
                    className={`w-full p-3 rounded-md ${isAdded
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-800'
                        }`}
                >
                    {isAdded ? 'Added to Wallet ✓' : 'Add to Wallet'}
                </button>
            </div>

            {walletError && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-4 mb-6">
                    <h3 className="font-medium mb-2 text-red-700 dark:text-red-400">Wallet Error</h3>
                    <p className="text-red-600 dark:text-red-400">{walletError}</p>
                </div>
            )}

            {balanceError && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-4 mb-6">
                    <h3 className="font-medium mb-2 text-red-700 dark:text-red-400">Balance Error</h3>
                    <p className="text-red-600 dark:text-red-400">{balanceError}</p>
                </div>
            )}

            {isAdded && balanceInfo && (
                <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-400 dark:border-green-600 p-4 mb-6">
                    <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Wallet Added Successfully</h3>
                    <p className="text-gray-800 dark:text-gray-200">
                        Balance of account <span className="font-mono">{balanceInfo.address}</span> is{' '}
                        <span className="font-bold">{balanceInfo.balance.toFixed(4)} {tokenSymbol}</span>.
                    </p>
                </div>
            )}

            {isAdded && !balanceError && (
                <Note>
                    You can now interact with your L1 chain using your wallet!
                </Note>
            )}

            <NextPrev nextDisabled={!isAdded || !!balanceError} onNext={goToNextStep} onPrev={goToPreviousStep} />
        </div>
    );
};
