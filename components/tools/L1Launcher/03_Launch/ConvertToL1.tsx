import { useEffect, useState } from 'react';
import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import { getRPCEndpoint } from '../../common/endpoints';
import { utils, pvm, Context, L1Validator, pvmSerial, PChainOwner } from '@avalabs/avalanchejs';
import TextArea from '@/components/tools/common/ui/TextArea';
import Pre from '@/components/tools/common/ui/Pre';
import { PROXY_ADDRESS } from '@/components/tools/common/utils/genGenesis';

const INITIAL_VALIDATOR_WEIGHT = 100

const popRequest = `curl -X POST --data '{ 
    "jsonrpc":"2.0", 
    "id"     :1, 
    "method" :"info.getNodeID" 
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info`

const validateNodePop = (json: string): boolean => {
    try {
        const parsed = JSON.parse(json);
        if (!parsed.result?.nodeID || !parsed.result?.nodePOP?.publicKey || !parsed.result?.nodePOP?.proofOfPossession) {
            return false;
        }

        // Validate nodeID is base58
        const base58Regex = /^NodeID-[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
        if (!base58Regex.test(parsed.result.nodeID)) {
            return false;
        }

        // Validate publicKey and proofOfPossession are hex strings
        const hexRegex = /^0x[0-9a-fA-F]+$/;
        if (!hexRegex.test(parsed.result.nodePOP.publicKey) || !hexRegex.test(parsed.result.nodePOP.proofOfPossession)) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
};

export default function ConvertToL1() {
    const {
        subnetId,
        chainId,
        goToNextStep,
        goToPreviousStep,
        updatePChainAddressFromCore,
        pChainAddress,
        nodePopJsons,
        setNodePopJsons,
        nodesCount,
        conversionId,
        setConversionId
    } = useL1LauncherWizardStore();

    const [isConverting, setIsConverting] = useState(false);
    const [errors, setErrors] = useState<string[]>(Array(nodesCount).fill(''));
    const [globalError, setGlobalError] = useState<string | null>(null);

    useEffect(() => {
        updatePChainAddressFromCore().catch(err => {
            console.error('Failed to update P-Chain address:', err);
            setGlobalError(`Failed to update P-Chain address: ${err.message}`);
        });
    }, []);

    const handleNodePopChange = (index: number, value: string) => {
        const newJsons = [...nodePopJsons];
        newJsons[index] = value;
        setNodePopJsons(newJsons);

        const newErrors = [...errors];
        if (value) {
            if (!validateNodePop(value)) {
                newErrors[index] = 'Invalid JSON format. Must contain nodeID and nodePOP fields';
            } else {
                newErrors[index] = '';
            }
        } else {
            newErrors[index] = '';
        }
        setErrors(newErrors);
    };

    const handleConvertToL1 = async () => {
        setIsConverting(true);
        setGlobalError(null);
        setConversionId('');

        try {
            if (!window.avalanche) {
                throw new Error('Core wallet not found');
            }

            const pvmApi = new pvm.PVMApi(getRPCEndpoint(true));
            const feeState = await pvmApi.getFeeState();
            const context = await Context.getContextFromURI(getRPCEndpoint(true));

            const addressBytes = utils.bech32ToBytes(pChainAddress);

            const { utxos } = await pvmApi.getUTXOs({
                addresses: [pChainAddress]
            });

            const validators: L1Validator[] = [];

            for (let i = 0; i < nodesCount; i++) {
                if (!nodePopJsons[i]) {
                    throw new Error(`Node credentials for node ${i + 1} are missing`);
                }

                const { nodeID, nodePOP } = JSON.parse(nodePopJsons[i]).result;
                const publicKey = utils.hexToBuffer(nodePOP.publicKey);
                if (!nodePOP.proofOfPossession) throw new Error("Proof of possession is missing");
                const signature = utils.hexToBuffer(nodePOP.proofOfPossession);
                if (!nodeID) throw new Error("Node ID is missing");

                const pChainOwner = PChainOwner.fromNative([addressBytes], 1);

                validators.push(L1Validator.fromNative(
                    nodeID,
                    BigInt(INITIAL_VALIDATOR_WEIGHT), // weight 
                    BigInt(1000000000), // default balance
                    new pvmSerial.ProofOfPossession(publicKey, signature),
                    pChainOwner,
                    pChainOwner
                ));
            }

            const managerAddressBytes = utils.hexToBuffer(PROXY_ADDRESS.replace('0x', ''));

            const tx = pvm.e.newConvertSubnetToL1Tx(
                {
                    feeState,
                    fromAddressesBytes: [addressBytes],
                    subnetId,
                    utxos,
                    chainId,
                    validators,
                    subnetAuth: [0],
                    address: managerAddressBytes,
                },
                context,
            );

            const transactionID = await window.avalanche.request<string>({
                method: 'avalanche_sendTransaction',
                params: {
                    transactionHex: utils.bufferToHex(tx.toBytes()),
                    chainAlias: 'P',
                }
            });

            // Wait for transaction to be processed
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            setConversionId(transactionID || '');

        } catch (error: any) {
            console.error('Failed to convert to L1', error);
            setGlobalError(error.message || 'Failed to convert to L1');
        } finally {
            setIsConverting(false);
        }
    };

    const isFormValid = () => {
        return nodePopJsons.slice(0, nodesCount).every(json => json && validateNodePop(json));
    };

    return (
        <div className="space-y-8">
            {globalError && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{globalError}</span>
                </div>
            )}

            <div>
                <h1 className="text-2xl font-medium mb-4">Convert to L1</h1>
                <p className="text-gray-700 dark:text-gray-300">
                    The final step is to convert your subnet to an L1. This requires collecting node credentials and setting up the initial validators.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">Node Credentials</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    For each validator node, run this command to get the node credentials:
                </p>
                <Pre>{popRequest}</Pre>

                <div className="mt-6 space-y-6">
                    {Array.from({ length: nodesCount }).map((_, index) => (
                        <div key={index} className="space-y-2">
                            <label className="block font-medium text-gray-700 dark:text-gray-300">
                                Node {index + 1} Credentials:
                            </label>
                            <div className="relative">
                                <TextArea
                                    isValid={!!nodePopJsons[index] && !errors[index]}
                                    rows={4}
                                    value={nodePopJsons[index] || ''}
                                    onChange={(e) => handleNodePopChange(index, e.target.value)}
                                    placeholder={`{"jsonrpc":"2.0","result":{"nodeID":"NodeID-....","nodePOP":{"publicKey":"0x...","proofOfPossession":"0x..."}},"id":1}`}
                                />
                                {nodePopJsons[index] && !errors[index] && (
                                    <div className="absolute right-2 top-2 text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {errors[index] && (
                                <p className="text-red-500 text-sm">{errors[index]}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-medium mb-4">Convert to L1</h2>

                {conversionId ? (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                            </svg>
                            <span>L1 created successfully</span>
                        </div>
                        <div className="mt-2 flex items-center">
                            <span className="font-medium text-gray-700 dark:text-gray-300">L1 Transaction ID:</span>
                            <a
                                href={`https://subnets-test.avax.network/p-chain/tx/${conversionId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-mono"
                            >
                                {conversionId}
                            </a>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            Convert your subnet to an L1 with the specified validators. All validators will have a weight of {INITIAL_VALIDATOR_WEIGHT}. The manager address will be set to {PROXY_ADDRESS}.
                        </p>

                        <button
                            onClick={handleConvertToL1}
                            disabled={isConverting || !isFormValid()}
                            className={`px-6 py-2 rounded-md ${isConverting || !isFormValid()
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                }`}
                        >
                            {isConverting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Converting to L1...
                                </span>
                            ) : 'Convert to L1'}
                        </button>
                    </>
                )}
            </div>

            <NextPrev
                nextDisabled={!conversionId}
                onNext={goToNextStep}
                onPrev={goToPreviousStep}
            />
        </div>
    );
}
