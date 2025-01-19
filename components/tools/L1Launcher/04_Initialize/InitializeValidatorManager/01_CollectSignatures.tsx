import { apiHostPromise } from '../../../common/utils/config';
import { useEffect, useState } from 'react';
import { useWizardStore } from '../../store';
import { calculateContractAddress } from '../../../common/utils/wallet';
import { statusColors, StepState } from './colors';
import { packL1ConversionMessage } from '@/components/tools/common/utils/convertWarp';
import { bytesToHex } from 'viem';

async function rpcRequest(rpcUrl: string, method: string, params: any) {
    const response = await fetch(`${rpcUrl}/ext/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
    });
    const responseData = await response.json();
    if (responseData.error) {
        throw new Error(responseData.error.message);
    }
    return responseData.result;
}

async function collectPeers(rpcUrl: string) {
    try {
        let peers = [];

        const peersData = await rpcRequest(rpcUrl, "info.peers", { nodeIDs: [] });

        peers = peersData.peers;

        try {
            const [nodeIPData, nodeIDData] = await Promise.all([
                rpcRequest(rpcUrl, "info.getNodeIP", {}),
                rpcRequest(rpcUrl, "info.getNodeID", {})
            ]);

            peers.push({
                "ip": nodeIPData.ip,
                "publicIP": nodeIPData.ip,
                "nodeID": nodeIDData.nodeID,
            });

            console.log('Successfully added node to peers', peers[peers.length - 1]);
        } catch (e) {
            console.warn('Failed to get node IP or ID', e);
        }

        return peers;
    } catch (error) {
        console.error('Error collecting peers:', error);
    }
}

export default function CollectSignatures() {
    const {
        chainId,
        tempPrivateKeyHex,
        subnetId,
        nodePopJsons,
        nodesCount,
        convertL1SignedWarpMessage,
        setConvertL1SignedWarpMessage,
        getRpcEndpoint
    } = useWizardStore();

    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<StepState>('not_started');
    const [isLoading, setIsLoading] = useState(false);
    const [collectedPeers, setCollectedPeers] = useState<string[]>([]);

    useEffect(() => {
        if (convertL1SignedWarpMessage) {
            setStatus('success');
        }
    }, [convertL1SignedWarpMessage]);

    const onCollect = async () => {
        setStatus('in_progress');
        setIsLoading(true);
        setError(null);
        try {
            const apiHost = await apiHostPromise;

            const pChainChainID = '11111111111111111111111111111111LpoYY'//TODO: unhardcode

            // Pack the message locally using packL1ConversionMessage
            const [message, justification] = packL1ConversionMessage({
                subnetId,
                managerChainID: chainId,
                managerAddress: calculateContractAddress(tempPrivateKeyHex, 3),
                validators: nodePopJsons.slice(0, nodesCount).map(json => JSON.parse(json).result)
            }, 5, pChainChainID); // Using networkID 5 for Fuji as seen in the test

            const peers = await collectPeers(await getRpcEndpoint());
            console.log('Collected ' + peers.length + ' peers');

            // Then sign the message
            const signResponse = await fetch(`${apiHost}/signMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: bytesToHex(message),
                    justification: bytesToHex(justification),
                    signingSubnetID: subnetId,
                    extraPeers: peers,
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
        } finally {
            setIsLoading(false);
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
                    <button
                        onClick={() => setConvertL1SignedWarpMessage(null)}
                        className="text-sm text-gray-500 dark:text-gray-400 mb-1"
                    >
                        Reset
                    </button>
                </div>
            )}

            {convertL1SignedWarpMessage === null && (
                <button
                    onClick={onCollect}
                    disabled={isLoading}
                    className={`mt-2 w-full p-2 mb-2 rounded text-white ${isLoading
                        ? 'bg-blue-400 cursor-not-allowed dark:bg-blue-500'
                        : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    {isLoading ? 'Collecting Signatures...' : 'Collect Signatures'}
                </button>
            )}
        </div>
    );
}
