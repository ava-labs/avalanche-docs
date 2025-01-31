import { useState, useEffect } from 'react';
import { useL1LauncherWizardStore } from '../../config/store';
import { createWalletClient, custom, createPublicClient, http, Chain, ChainConfig } from 'viem';
import ValidatorMessagesABI from "../../../common/icm-contracts/compiled/ValidatorMessages.json";
import RequireWalletConnection, { fujiConfig } from '../../../common/ui/RequireWalletConnection';

export function ValidatorMessagesDeployer() {
    const { setValidatorMessagesAddress, validatorMessagesAddress, evmChainId, chainId, getL1RpcEndpoint, tokenSymbol, l1Name, getViemL1Chain } = useL1LauncherWizardStore();
    const [status, setStatus] = useState<'not_started' | 'deploying' | 'success' | 'error'>('not_started');
    const [error, setError] = useState<string | null>(null);
    

    // Initialize status based on stored address
    useEffect(() => {
        if (validatorMessagesAddress) {
            setStatus('success');
        }
    }, [validatorMessagesAddress]);

    const deployContract = async () => {
        if (!window.avalanche) {
            throw new Error('No ethereum wallet found');
        }

        setStatus('deploying');
        setError(null);

        try {
            const chain = getViemL1Chain();

            const publicClient = createPublicClient({
                transport: http(),
                chain
            });

            const walletClient = createWalletClient({
                transport: custom(window.avalanche),
                chain
            });

            const [address] = await walletClient.requestAddresses();

            const hash = await walletClient.deployContract({
                abi: ValidatorMessagesABI.abi,
                bytecode: ValidatorMessagesABI.bytecode.object as `0x${string}`,
                account: address,
                chain
            });

            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (!receipt.contractAddress) {
                throw new Error('No contract address in receipt');
            }

            setValidatorMessagesAddress(receipt.contractAddress);
            setStatus('success');

        } catch (err) {
            console.error('Error deploying ValidatorMessages:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setStatus('error');
        }
    };

    return (
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">ValidatorMessages Contract</h3>
            
            {validatorMessagesAddress && (
                <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Contract Address:</div>
                    <code className="block p-2 bg-gray-50 dark:bg-gray-800 rounded break-all">
                        {validatorMessagesAddress}
                    </code>
                </div>
            )}
            
            {error && (
                <div className="text-red-600 dark:text-red-400 mb-4">
                    Error: {error}
                </div>
            )}

            <button
                onClick={deployContract}
                disabled={status === 'deploying' || status === 'success'}
                className={`w-full p-2 rounded ${
                    status === 'deploying' || status === 'success'
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {status === 'deploying' ? 'Deploying...' : 
                 status === 'success' ? 'Deployed' : 
                 'Deploy ValidatorMessages'}
            </button>
        </div>
    );
}
