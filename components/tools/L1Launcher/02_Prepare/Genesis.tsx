import { useState } from 'react';
import { getWalletAddress } from '../wallet';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import { Button } from '@/components/ui/button';

function isValidL1Name(name: string): boolean {
    return name.split('').every(char => {
        const code = char.charCodeAt(0);
        return code <= 127 && // MaxASCII check
            (char.match(/[a-zA-Z0-9 ]/) !== null); // only letters, numbers, spaces
    });
}

export default function Genesis() {
    const { ownerEthAddress, setOwnerEthAddress, evmChainId, setEvmChainId, genesisString, regenerateGenesis, l1Name, setL1Name, tokenSymbol, setTokenSymbol, currentStep, maxAdvancedStep } = useWizardStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRegenerating, setIsRegenerating] = useState(false);

    const isCurrentMaxAdvancedStep = maxAdvancedStep === 'genesis';

    const handleConnectWallet = async () => {
        setIsLoading(true);
        setError('');
        try {
            const walletAddress = await getWalletAddress();
            setOwnerEthAddress(walletAddress);
        } catch (err: any) {
            setError(err.message || 'Failed to connect wallet');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: 'evmChainId' | 'ownerEthAddress' | 'l1Name', value: any) => {
        if (field === 'evmChainId') {
            setEvmChainId(parseInt(value));
        } else if (field === 'l1Name') {
            setL1Name(value);
        } else {
            setOwnerEthAddress(value);
        }
    };

    const handleGenerateGenesis = async () => {
        setIsRegenerating(true);
        setError('');
        try {
            await regenerateGenesis();
        } catch (err: any) {
            setError(err.message || 'Failed to regenerate genesis');
            console.error(err);
        } finally {
            setIsRegenerating(false);
        }
    };

    return (
        <div className="">
            <h1 className="text-2xl font-medium mb-6">Genesis Settings</h1>

            {error && (
                <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            <div className="mb-6">
                <input
                    type="text"
                    value={l1Name}
                    onChange={(e) => handleInputChange('l1Name', e.target.value)}
                    placeholder="L1 Name"
                    disabled={!isCurrentMaxAdvancedStep}
                    className={`w-full p-2 border rounded-md ${l1Name && !isValidL1Name(l1Name)
                        ? 'border-red-500 text-red-500 dark:text-red-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                        } ${!isCurrentMaxAdvancedStep ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-900'}`}
                />
                <p className={`mt-2 text-sm ${l1Name && !isValidL1Name(l1Name)
                    ? 'text-red-500'
                    : 'text-gray-500'
                    }`}>
                    {l1Name && !isValidL1Name(l1Name)
                        ? 'Only letters, numbers, and spaces are allowed'
                        : 'The name of your L1 blockchain.'}
                </p>
            </div>

            <div className="mb-6">
                <input
                    type="number"
                    value={evmChainId}
                    onChange={(e) => handleInputChange('evmChainId', e.target.value)}
                    onBlur={() => handleInputChange('evmChainId', evmChainId)}
                    placeholder="Chain ID"
                    disabled={!isCurrentMaxAdvancedStep}
                    className={`w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 ${!isCurrentMaxAdvancedStep ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-900'}`}
                />
                <p className="mt-2 text-sm text-gray-500">
                    Unique identifier for your blockchain network.  Check if it's unique <a href={`https://chainlist.org/?search=${evmChainId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600">on chainlist.org</a>.
                </p>
            </div>

            <div className="mb-6">
                <div className="flex gap-3 items-start">
                    <div className="flex-grow">
                        <input
                            type="text"
                            value={ownerEthAddress}
                            onChange={(e) => handleInputChange('ownerEthAddress', e.target.value)}
                            onBlur={() => handleInputChange('ownerEthAddress', ownerEthAddress)}
                            placeholder="Wallet Address in 0x format"
                            disabled={!isCurrentMaxAdvancedStep}
                            className={`w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 ${!isCurrentMaxAdvancedStep ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-900'}`}
                        />
                    </div>
                    {window.ethereum && <Button
                        onClick={handleConnectWallet}
                        disabled={isLoading || !isCurrentMaxAdvancedStep}
                        variant="secondary"
                    >
                        {isLoading ? 'Loading...' : 'Fill from Wallet'}
                    </Button>}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    This address will receive all tokens and control in case of Proof of Authority chain.
                </p>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="Token Symbol"
                    disabled={!isCurrentMaxAdvancedStep}
                    className={`w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-gray-100 ${!isCurrentMaxAdvancedStep ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-900'}`}
                />
                <p className="mt-2 text-sm text-gray-500">
                    The symbol (ticker) of your blockchain's native token (e.g., AAA, TEST). Do not use existing tickers like AVAX, ETH, etc.
                </p>
            </div>

            <div className="mb-6 flex justify-between">
                <Button
                    onClick={handleGenerateGenesis}
                    disabled={!evmChainId || !ownerEthAddress || isRegenerating || !isCurrentMaxAdvancedStep}
                    variant="default"
                >
                    {isRegenerating ? 'Generating...' : 'Generate Genesis'}
                </Button>
            </div>

            {genesisString && <div className="mb-6">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Genesis JSON:
                </label>
                <div className="bg-gray-50 dark:bg-gray-900 overflow-x-auto text-sm font-mono border border-gray-200 dark:border-gray-700 rounded-md h-96">
                    <pre className="w-full p-3 break-words overflow-auto text-gray-900 dark:text-gray-100">
                        {genesisString}
                    </pre>
                </div>
            </div>}

            <NextPrev nextDisabled={!isValidEthereumAddress(ownerEthAddress) || !genesisString || !isValidL1Name(l1Name)} currentStepName="genesis" />


        </div>
    );
}

function isValidEthereumAddress(address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}
