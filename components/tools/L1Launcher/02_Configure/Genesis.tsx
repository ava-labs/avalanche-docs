import { useState } from 'react';
import { getWalletAddress } from '../wallet';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import { Button } from '@/components/ui/button';
import { isValidEthereumAddress } from '@/components/tools/common/utils'
import Pre from '../ui/Pre';

function isValidL1Name(name: string): boolean {
    return name.split('').every(char => {
        const code = char.charCodeAt(0);
        return code <= 127 && // MaxASCII check
            (char.match(/[a-zA-Z0-9 ]/) !== null); // only letters, numbers, spaces
    });
}

export default function Genesis() {
    const { evmChainId, genesisString, regenerateGenesis, l1Name, maxAdvancedStep } = useWizardStore();
    const [error, setError] = useState('');
    const [isRegenerating, setIsRegenerating] = useState(false);

    const isCurrentMaxAdvancedStep = maxAdvancedStep === 'genesis';

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
        <div className="space-y-12">
            <h1 className="text-2xl font-medium mb-6">Genesis Settings</h1>
            
            {error && (
                <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            <div className="flex justify-between">
                <Button
                    onClick={handleGenerateGenesis}
                    disabled={!evmChainId || isRegenerating || !isCurrentMaxAdvancedStep}
                    variant="default"
                >
                    {isRegenerating ? 'Generating...' : 'Generate Genesis'}
                </Button>
            </div>

            {genesisString && <div className="space-y-6">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Genesis JSON:
                </label>
                <Pre>{genesisString}</Pre>
                <h3 className="mb-4 font-medium">Test to Genesis locally (optional)</h3>
                <p className="mb-4 text-gray-600">Coming soon</p>
            </div>}



            <NextPrev nextDisabled={!genesisString} currentStepName="genesis" />


        </div>
    );
}