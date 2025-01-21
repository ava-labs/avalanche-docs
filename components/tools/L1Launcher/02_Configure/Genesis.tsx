import { useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import { Button } from '@/components/ui/button';
import Pre from '@/components/tools/common/ui/Pre';

export default function Genesis() {
    const { evmChainId, genesisString, regenerateGenesis, maxAdvancedStep, goToNextStep, goToPreviousStep } = useL1LauncherWizardStore();
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
            <div>
                <h1 className="text-2xl font-medium mb-4">Genesis Generation</h1>
                <p>Based on your configurations in the steps before, you can now generate your EVM genesis. Please check this carefully before proceeding.</p>
            </div>
            
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
                
                <h3 className="mb-4 text-xl font-medium">Test Your Genesis Configuration (optional)</h3>
                <div className="steps space-y-6">
                    <div className="step">Open a Codespace from the main branch in <a className="underline" href="https://github.com/ava-labs/avalanche-starter-kit">Avalanche Starter Kit</a> repository.</div>
                    <div className="step">Create <code className="px-1 py-1 bg-gray-50 dark:bg-gray-900 rounded">genesis.json</code> in the GitHub codespace, paste L1 launcher genesis code, and copy the file's full path.</div>
                    <div className="step">Run <code className="px-1 py-1 bg-gray-50 dark:bg-gray-900 rounded">avalanche blockchain create &lt;blockchain_name&gt; --genesis &lt;file_path&gt; --sovereign=false</code> and enter the requested details (Token Symbol, etc.).</div>
                    <div className="step">Wait for blockchain configuration generation based on your inputs and genesis file parameters.</div>                   
                    <div className="step">Verify setup by running <code className="px-1 py-1 bg-gray-50 dark:bg-gray-900 rounded">avalanche blockchain describe &lt;blockchain_name&gt;</code> and check the configuration.</div>         
                    <div className="step">(Optional) You can also deploy the blockchain by running <code className="px-1 py-1 bg-gray-50 dark:bg-gray-900 rounded">avalanche blockchain deploy &lt;blockchain_name&gt;</code>.</div>
                </div>
            </div>}



            <NextPrev nextDisabled={!genesisString} onNext={goToNextStep} onPrev={goToPreviousStep} />


        </div>
    );
}