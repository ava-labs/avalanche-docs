import { useEffect, useState } from 'react';
import { useL1LauncherWizardStore } from '../../config/store';
import { createWalletClient, custom, createPublicClient, http, keccak256 } from 'viem';
import PoAValidatorManagerABI from "../../../common/icm-contracts/compiled/PoAValidatorManager.json"

export function PoAValidatorManagerDeployer() {
    const { 
        setPoaValidatorManagerAddress,
        validatorMessagesAddress,
        poaValidatorManagerAddress,
        getViemL1Chain
    } = useL1LauncherWizardStore();
    
    const [status, setStatus] = useState<'not_started' | 'deploying' | 'success' | 'error'>('not_started');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (poaValidatorManagerAddress) {
            setStatus('success');
        }
    }, [poaValidatorManagerAddress]);

    const getLinkedBytecode = () => {
        if (!validatorMessagesAddress) {
            throw new Error('ValidatorMessages address not set');
        }

        const libraryPath = `${Object.keys(PoAValidatorManagerABI.bytecode.linkReferences)[0]}:${Object.keys(Object.values(PoAValidatorManagerABI.bytecode.linkReferences)[0])[0]}`;
        const libraryHash = calculateLibraryHash(libraryPath);
        const libraryPlaceholder = `__$${libraryHash}$__`;

        const linkedBytecode = PoAValidatorManagerABI.bytecode.object
            .split(libraryPlaceholder)
            .join(validatorMessagesAddress.slice(2).padStart(40, '0'));

        if (linkedBytecode.includes("$__")) {
            throw new Error("Failed to replace library placeholder with actual address");
        }

        return linkedBytecode as `0x${string}`;
    };

    const deployContract = async () => {
        if (!window.avalanche) {
            throw new Error('No ethereum wallet found');
        }

        if (!validatorMessagesAddress) {
            throw new Error('ValidatorMessages must be deployed first');
        }

        setStatus('deploying');
        setError(null);

        try {
            const chain = getViemL1Chain();

            const walletClient = createWalletClient({
                chain,
                transport: custom(window.avalanche)
            });

            const [address] = await walletClient.requestAddresses();
            
            const hash = await walletClient.deployContract({
                abi: PoAValidatorManagerABI.abi,
                bytecode: getLinkedBytecode(),
                account: address,
                args: [0], // Initial threshold
            });

            const publicClient = createPublicClient({
                chain,
                transport: http(),
            });

            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (!receipt.contractAddress) {
                throw new Error('No contract address in receipt');
            }

            setPoaValidatorManagerAddress(receipt.contractAddress);
            setStatus('success');

        } catch (err) {
            console.error('Error deploying PoAValidatorManager:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setStatus('error');
        }
    };

    return (
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 dark:text-gray-200">PoAValidatorManager Contract</h3>
            
            {poaValidatorManagerAddress && (
                <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Contract Address:</div>
                    <code className="block p-2 bg-gray-50 dark:bg-gray-800 rounded break-all">
                        {poaValidatorManagerAddress}
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
                disabled={status === 'deploying' || status === 'success' || !validatorMessagesAddress}
                className={`w-full p-2 rounded ${
                    status === 'deploying' || status === 'success' || !validatorMessagesAddress
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {status === 'deploying' ? 'Deploying...' : 
                 status === 'success' ? 'Deployed' : 
                 !validatorMessagesAddress ? 'Deploy ValidatorMessages First' :
                 'Deploy PoAValidatorManager'}
            </button>
        </div>
    );
}


 function calculateLibraryHash(libraryPath: string) {
    // Calculate keccak256 of the fully qualified library name
    const hash = keccak256(
        new TextEncoder().encode(libraryPath)
    ).slice(2);
    // Take first 34 characters (17 bytes)
    return hash.slice(0, 34);
} 
