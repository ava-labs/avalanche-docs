import { apiHostPromise } from '../config';
import { useEffect, useState } from 'react';
import { useWizardStore } from '../store';
import { calculateContractAddress } from '../wallet';
import { statusColors, StepState } from './colors';


export default function CollectSignatures() {
    const {
        chainId,
        tempPrivateKeyHex,
        subnetId,
        nodePopJsons,
        nodesCount,
        getRpcEndpoint,
        convertL1SignedWarpMessage,
        setConvertL1SignedWarpMessage
    } = useWizardStore();

    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<StepState>('not_started');

    useEffect(() => {
        if (convertL1SignedWarpMessage) {
            setStatus('success');
        }
    }, [convertL1SignedWarpMessage]);

    const onCollect = async () => {
        setStatus('in_progress');
        try {
            const apiHost = await apiHostPromise;

            // First pack the message
            const packResponse = await fetch(`${apiHost}/temporaryDevAPI/packL1ConversionMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chainId,
                    subnetId,
                    managerAddress: calculateContractAddress(tempPrivateKeyHex, 3),
                    nodes: nodePopJsons
                        .slice(0, nodesCount)
                        .map(json => JSON.parse(json).result),
                })
            });

            if (!packResponse.ok) {
                const errorText = await packResponse.text();
                throw new Error(errorText || `HTTP error! status: ${packResponse.status}`);
            }

            const { message, justification } = await packResponse.json();

            // Then sign the message
            const signResponse = await fetch(`${apiHost}/temporaryDevAPI/signMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    justification,
                    signingSubnetID: subnetId,
                    extraPeerRPCURLs: [getRpcEndpoint()]
                })
            });

            if (!signResponse.ok) {
                const errorText = await signResponse.text();
                throw new Error(errorText || `HTTP error! status: ${signResponse.status}`);
            }

            const { signedMessage } = await signResponse.json();
            setConvertL1SignedWarpMessage(`0x${signedMessage}`);
            setStatus('success');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error:', err);
            setStatus('error');
        }
    };

    return (
        <div className={`pt-4 px-4 pb-2 rounded-lg border ${statusColors[status]} mb-4 dark:bg-gray-800`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium dark:text-white">Collect L1 Conversion WARP Signatures</h3>
                <span className={`${error ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}`}>
                    {error ? 'Failed' : 'Success'}
                </span>
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</div>
            )}

            {convertL1SignedWarpMessage && (
                <div className="mb-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Signature:</div>
                    <div className="bg-white dark:bg-gray-900 rounded p-2 border border-gray-100 dark:border-gray-700">
                        <pre className="font-mono text-sm whitespace-pre-wrap break-all dark:text-gray-300">{convertL1SignedWarpMessage}</pre>
                    </div>
                </div>
            )}

            {convertL1SignedWarpMessage === null && (
                <button
                    onClick={onCollect}
                    className="mt-2 w-full p-2 mb-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Collect Signatures
                </button>
            )}
        </div>
    );
}
