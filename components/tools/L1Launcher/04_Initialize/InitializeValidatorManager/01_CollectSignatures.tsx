import { useEffect, useState } from 'react';
import { useL1LauncherWizardStore } from '../../config/store';
import { statusColors, StepState } from './colors';
import { packL1ConversionMessage, PackL1ConversionMessageArgs } from '@/components/tools/common/utils/convertWarp';
import { bytesToHex } from 'viem';
import { PROXY_ADDRESS } from '@/components/tools/common/utils/genGenesis';

// % curl 'https://signature-aggregator-fuji.fly.dev/aggregate-signatures' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'Referer: https://surprising-condo-prophet-affecting.trycloudflare.com/' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36' \
//   -H 'accept: application/json' \
//   -H 'sec-ch-ua: "Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"' \
//   -H 'Content-Type: application/json' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   --data-raw '{"message":"0x00000000000500000000000000000000000000000000000000000000000000000000000000000000003400000000000100000000000000260000000000007705388e8173500aba9e1fba72ac5bd2fac96cc515812c63da73679ab5e1c7b1","justification":"0x34fd013aa672464cacbee11d468b08d9d85a05795af20e0ec401fea2ba197963","signing-subnet-id":"QLWsUp3kELKwz161sNitABoW7cvzm52EHDNhpS1THCy1rymrC"}'
// {"signed-message":"00000000000500000000000000000000000000000000000000000000000000000000000000000000003400000000000100000000000000260000000000007705388e8173500aba9e1fba72ac5bd2fac96cc515812c63da73679ab5e1c7b1000000000000000101847210cea3dcfe666d658601e20364a7ecc7236be1b87571c89e22166bb727be5cb24efa330ae1d412e037566b8566e117e221c73eadf75149bdc2dcca848814a68b1cdad6f82293bd2828ba6d8ce7e83c0515e8fa940d44968cbc28be7c2569"}%                                                               ilya.solohin@AVL-KFG97N ~ % 

export default function CollectSignatures() {
    const {
        chainId,
        subnetId,
        nodePopJsons,
        nodesCount,
        convertL1SignedWarpMessage,
        setConvertL1SignedWarpMessage,
    } = useL1LauncherWizardStore();

    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<StepState>('not_started');
    const [isLoading, setIsLoading] = useState(false);

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
            const pChainChainID = '11111111111111111111111111111111LpoYY'//TODO: unhardcode

            // Pack the message locally using packL1ConversionMessage

            const coversionArgs: PackL1ConversionMessageArgs = {
                subnetId,
                managerChainID: chainId,
                managerAddress: PROXY_ADDRESS,
                validators: nodePopJsons.slice(0, nodesCount).map(json => JSON.parse(json).result)
            }

            const [message, justification] = packL1ConversionMessage(coversionArgs, 5, pChainChainID);

            // Use the new API endpoint for signature aggregation
            // const signResponse = await fetch('https://glacier-api-dev.avax.network/v1/signatureAggregator/aggregateSignatures', {
            const signResponse = await fetch('https://signature-aggregator-fuji.fly.dev/aggregate-signatures', {

                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: bytesToHex(message),
                    justification: bytesToHex(justification),
                    'signing-subnet-id': subnetId,
                    // signingSubnetId: subnetId,
                })
            });

            if (!signResponse.ok) {
                const errorText = await signResponse.text();
                throw new Error(errorText || `HTTP error! status: ${signResponse.status}`);
            }

            // const { signedMessage } = await signResponse.json();
            const respJson = await signResponse.json();
            const signedMessage = respJson['signed-message'];
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
