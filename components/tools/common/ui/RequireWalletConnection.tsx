import { on } from 'events';
import { useState, useEffect, ReactNode } from 'react';

export interface ChainConfig {
    network: 'Mainnet' | 'Testnet';
    EVMChainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
}

export const fujiConfig: ChainConfig = {
    network: 'Testnet',
    EVMChainId: '0xa869',
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/']
};

/**
 * @value children: Content to be shown if wallet is connected correctly
 * @value chainConfig: Configuration for the chain that the wallet needs to be connected to
 */
interface RequireWalletConnectionProps {
    children?: ReactNode;
    chainConfig: ChainConfig;
    onConnection?: () => void;
}

type Status = 'no_wallet_installed' | 'wrong_chain' | 'success';

/**
 * Component that checks if the user has a wallet installed and is connected to the right chain. If
 * not, the user will be prompted to install a wallet and connect to the chain. If the connection
 * is correctly established, the children elements will be shown.
 */
export default function RequireWalletConnection({ children, chainConfig, onConnection }: RequireWalletConnectionProps) {
    const [connectionStatus, setConnectionStatus] = useState<Status>('no_wallet_installed');
    const [error, setError] = useState<string | null>(null);

    // Check if user is connected and on the right chain
    const checkConnection = async () => {
        if (!window.ethereum) {
            setConnectionStatus('no_wallet_installed');
            return;
        }

        try {
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (!accounts || accounts.length === 0) {
                setError('No account detected');
                return;
            }

            // Check chain
            const chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });

            if (chainId !== chainConfig.EVMChainId) {
                setConnectionStatus('wrong_chain');
                return;
            }

            setError(null);
            setConnectionStatus('success');
            onConnection && onConnection();

        } catch (error) {
            if (error instanceof Error) {
                setError(`Connection error: ${error.message}`);
            } else {
                setError(`An unknown error occurred ${error}`);
            }
        }
    };

    useEffect(() => {
        checkConnection();

        if (window.ethereum) {
            window.ethereum.on('chainChanged', checkConnection);
            window.ethereum.on('accountsChanged', checkConnection);

            return () => {
                window.ethereum.removeListener('chainChanged', checkConnection);
                window.ethereum.removeListener('accountsChanged', checkConnection);
            };
        }
    }, []);

    const switchChain = async () => {
        if (!window.ethereum) {
            setConnectionStatus('no_wallet_installed');
            return;
        }

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainConfig.EVMChainId }],
            });
        } catch (error: any) {
            // If the chain hasn't been added to the wallet, add it
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [chainConfig]
                    });
                    checkConnection();
                } catch (addError) {
                    setError(`Failed to add network: ${addError}`);
                }
            } else {
                setError(`Failed to switch network: ${error}`);
            }
        }
    };

    const renderContent = () => {
        switch (connectionStatus) {
            case 'no_wallet_installed':
                return <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
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
                </div>;
            case 'wrong_chain':
                return <div>
                    <h3 className="font-medium mb-2">Add the Chain</h3>
                    <p className="mb-4">
                        You need to add and connect the {chainConfig.chainName} chain to your wallet to continue.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <div className="font-medium">Chain Name:</div>
                            <div>{chainConfig.chainName}</div>
                        </div>
                        <div>
                            <div className="font-medium">Chain ID:</div>
                            <div>{chainConfig.EVMChainId}</div>
                        </div>
                        <div>
                            <div className="font-medium">RPC URLs:</div>
                            {chainConfig.rpcUrls.map(rpcUrl => <div className="break-all">{rpcUrl}</div>)}
                        </div>
                    </div>

                    <div className='mt-4 space-x-4'>
                        <button
                            onClick={switchChain}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add/Switch to {chainConfig.chainName}
                        </button>

                        <button
                            onClick={checkConnection}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Check Wallet Connection
                        </button>
                    </div>

                   
                </div>;
            case 'success':
                return <>{children ? children : `Succesful connected to ${chainConfig.chainName}!`}</>;
            default:
                return <p>An Unexpected error occured</p>
        }
    }

    return (
        <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-400 dark:border-blue-600 mb-6">
            <h3 className="font-medium mb-4">Network Check</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {renderContent()}
        </div>
    );
}
