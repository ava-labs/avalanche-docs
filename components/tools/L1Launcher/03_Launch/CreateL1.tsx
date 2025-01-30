import { useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import { createSubnet, createChain, convertToL1 } from './chain';
import { PROXY_ADDRESS } from '../../common/utils/genGenesis';

type Status = 'not_started' | 'in_progress' | 'error' | 'success';

interface StepStatus {
    status: Status;
    error?: string;
    data?: any;
}

export default function CreateL1() {
    const {
        tempPrivateKeyHex,
        l1Name,
        genesisString,
        setSubnetId,
        setChainId,
        setConversionId,
        subnetId: existingSubnetId,
        chainId: existingChainId,
        conversionId: existingConversionId,
        nodePopJsons,
        nodesCount,
        goToNextStep,
        goToPreviousStep
    } = useL1LauncherWizardStore();

    const [subnetStatus, setSubnetStatus] = useState<StepStatus>(() => ({
        status: existingSubnetId ? 'success' : 'not_started',
        data: existingSubnetId
    }));

    const [createChainStatus, setCreateChainStatus] = useState<StepStatus>(() => ({
        status: existingChainId ? 'success' : 'not_started',
        data: existingChainId
    }));

    const [convertToL1Status, setConvertToL1Status] = useState<StepStatus>(() => ({
        status: existingConversionId ? 'success' : 'not_started',
        data: existingConversionId
    }));

    const renderStepIcon = (status: Status) => {
        switch (status) {
            case 'in_progress':
                return (
                    <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                );
            case 'success':
                return (
                    <svg className="w-5 h-5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            default:
                return (
                    <div className="w-5 h-5">
                        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01" />
                        </svg>
                    </div>
                );
        }
    };

    const handleCreate = async () => {
        try {
            let subnetTxId: string | undefined;
            if (subnetStatus.status === 'not_started') {
                // Step 1: Create Subnet
                setSubnetStatus({ status: 'in_progress' });
                try {
                    subnetTxId = await createSubnet(tempPrivateKeyHex);
                    setSubnetStatus({
                        status: 'success',
                        data: subnetTxId
                    });
                    setSubnetId(subnetTxId);
                } catch (error: any) {
                    setSubnetStatus({
                        status: 'error',
                        error: error.message || 'Failed to create subnet'
                    });
                    return;
                }
            }

            let chainTxId: string | undefined;

            if (createChainStatus.status === 'not_started') {
                // Step 2: Create Chain
                setCreateChainStatus({ status: 'in_progress' });
                try {
                    chainTxId = await createChain({
                        privateKeyHex: tempPrivateKeyHex,
                        chainName: l1Name,
                        subnetId: subnetTxId || subnetStatus.data,
                        genesisData: genesisString,
                    });
                    setCreateChainStatus({
                        status: 'success',
                        data: chainTxId
                    });
                    setChainId(chainTxId);
                } catch (error: any) {
                    setCreateChainStatus({
                        status: 'error',
                        error: error.message || 'Failed to create chain'
                    });
                    return;
                }
            }

            if (convertToL1Status.status === 'not_started') {
                // Step 3: Convert to L1
                setConvertToL1Status({ status: 'in_progress' });
                try {
                    const conversionId = await convertToL1({
                        privateKeyHex: tempPrivateKeyHex,
                        subnetId: subnetTxId || subnetStatus.data,
                        chainId: chainTxId || createChainStatus.data,
                        managerAddress: PROXY_ADDRESS,
                        nodePopJsons: nodePopJsons.slice(0, nodesCount),
                    });
                    setConvertToL1Status({
                        status: 'success',
                        data: conversionId
                    });
                    setConversionId(conversionId);
                } catch (error: any) {
                    console.error('Failed to convert to L1', error);
                    setConvertToL1Status({
                        status: 'error',
                        error: error.message || 'Failed to convert to L1'
                    });
                }
            }

        } catch (error: any) {
            console.error('Creation process failed:', error);
            if (subnetStatus.status === 'in_progress') {
                setSubnetStatus({
                    status: 'error',
                    error: 'Unexpected error during subnet creation'
                });
            } else if (createChainStatus.status === 'in_progress') {
                setCreateChainStatus({
                    status: 'error',
                    error: 'Unexpected error during chain creation'
                });
            } else if (convertToL1Status.status === 'in_progress') {
                setConvertToL1Status({
                    status: 'error',
                    error: 'Unexpected error during conversion to L1'
                });
            }
        }
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Create L1</h1>
                <p>Creating an L1 involves a three separate transactions on the P-Chain. Firstly, a CreateSubnetTx is issued. A Subnet with the temporary wallet as it's owner is created. Next, a CreateChainTx with the genesis information from the configuration is issued, creating the actual blockchain. Lastly, the ConvertSubnetToL1Tx is issued, converting the Subnet to a sovereign L1. The ownership of the temporary key is given up and transferred to a validator manager contract on the L1.</p>
            </div>

            {/* Creation Steps */}
            <div className="p-4 border rounded-lg">
                <div className="mb-4">
                    <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-3">
                            {renderStepIcon(subnetStatus.status)}
                            <span className="text-gray-700 dark:text-gray-300">Create a Subnet</span>
                        </div>
                        {subnetStatus.error && (
                            <p className="ml-8 mt-1 text-red-500 text-sm">
                                Error: {subnetStatus.error}
                            </p>
                        )}
                        {subnetStatus.data && (
                            <p className="ml-8 mt-1 text-gray-600">
                                <code><a href={`https://subnets-test.avax.network/p-chain/tx/${subnetStatus.data}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">{subnetStatus.data}</a></code>
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-3">
                            {renderStepIcon(createChainStatus.status)}
                            <span className="text-gray-700 dark:text-gray-300">Create a Chain</span>
                        </div>
                        {createChainStatus.error && (
                            <p className="ml-8 mt-1 text-red-500 text-sm">
                                Error: {createChainStatus.error}
                            </p>
                        )}
                        {createChainStatus.data && (
                            <p className="ml-8 mt-1 text-gray-600">
                                <code><a href={`https://subnets-test.avax.network/p-chain/tx/${createChainStatus.data}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">{createChainStatus.data}</a></code>
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-3">
                            {renderStepIcon(convertToL1Status.status)}
                            <span className="text-gray-700 dark:text-gray-300">Convert to L1</span>
                        </div>
                        {convertToL1Status.error && (
                            <p className="ml-8 mt-1 text-red-500 text-sm">
                                Error: {convertToL1Status.error}
                            </p>
                        )}
                        {convertToL1Status.data && (
                            <p className="ml-8 mt-1 text-gray-600">
                                <code><a href={`https://subnets-test.avax.network/p-chain/tx/${convertToL1Status.data}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">{convertToL1Status.data}</a></code>
                            </p>
                        )}
                    </div>
                </div>

                {!(subnetStatus.status === 'success' && createChainStatus.status === 'success' && convertToL1Status.status === 'success') && (
                    <button
                        onClick={handleCreate}
                        className={`px-6 py-2 rounded-md ${subnetStatus.status === 'in_progress' || createChainStatus.status === 'in_progress' || convertToL1Status.status === 'in_progress'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        disabled={
                            subnetStatus.status === 'in_progress' ||
                            createChainStatus.status === 'in_progress' ||
                            convertToL1Status.status === 'in_progress'
                        }
                    >
                        {subnetStatus.status === 'in_progress' || createChainStatus.status === 'in_progress' || convertToL1Status.status === 'in_progress'
                            ? 'Processing...'
                            : 'Create Subnet + Chain + Convert to L1'}
                    </button>
                )}
            </div>

            <NextPrev
                nextDisabled={createChainStatus.status !== 'success'}
                onNext={goToNextStep} 
                onPrev={goToPreviousStep}
            />
        </div>
    );
}
