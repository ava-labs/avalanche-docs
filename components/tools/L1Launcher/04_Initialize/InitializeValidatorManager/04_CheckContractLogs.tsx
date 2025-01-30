import { useState } from 'react';
import { createPublicClient, http, AbiEvent, Log, decodeEventLog } from 'viem';
import { useL1LauncherWizardStore } from '../../config/store';
import { calculateContractAddress } from '../../../common/utils/wallet';
import PoAValidatorManagerABI from '../../../common/icm-contracts/compiled/PoAValidatorManager.json';

const serializeBigInt = (obj: any): any => {
    if (typeof obj === 'bigint') {
        return obj.toString();
    }
    if (Array.isArray(obj)) {
        return obj.map(serializeBigInt);
    }
    if (obj && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, serializeBigInt(value)])
        );
    }
    return obj;
};

export default function CheckContractLogs({ onSuccess }: { onSuccess: () => void }) {
    const [logs, setLogs] = useState<Array<{
        eventName: string;
        decodedData: Record<string, any>;
        blockNumber: bigint;
        transactionHash: `0x${string}`;
    }>>([]);
    const [hasInitialized, setHasInitialized] = useState(false);
    const [hasInitialValidator, setHasInitialValidator] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        evmChainId,
        l1Name,
        tokenSymbol,
        getL1RpcEndpoint,
        tempPrivateKeyHex,
    } = useL1LauncherWizardStore();

    const fetchLogs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const customChain = {
                id: evmChainId,
                name: l1Name,
                network: l1Name.toLowerCase(),
                nativeCurrency: {
                    name: tokenSymbol,
                    symbol: tokenSymbol,
                    decimals: 18,
                },
                rpcUrls: {
                    default: { http: [getL1RpcEndpoint()] },
                    public: { http: [getL1RpcEndpoint()] },
                },
            };

            const publicClient = createPublicClient({
                chain: customChain,
                transport: http()
            });

            const managerAddress = calculateContractAddress(tempPrivateKeyHex, 3);

            // Get all events from ABI
            const eventAbis = PoAValidatorManagerABI.abi.filter(
                item => item.type === 'event'
            ) as AbiEvent[];

            // Fetch logs for all events
            const allLogs = await Promise.all(
                eventAbis.map(eventAbi =>
                    publicClient.getLogs({
                        address: managerAddress,
                        event: eventAbi,
                        fromBlock: 'earliest',
                        toBlock: 'latest'
                    })
                )
            );

            // Process and decode all logs
            const processedLogs = allLogs.flat().map((log: Log) => {
                const decodedLog = decodeEventLog({
                    abi: PoAValidatorManagerABI.abi,
                    data: log.data,
                    topics: log.topics,
                });

                return {
                    eventName: decodedLog.eventName,
                    decodedData: decodedLog.args as Record<string, any>,
                    blockNumber: log.blockNumber,
                    transactionHash: log.transactionHash,
                };
            });

            // Sort logs by block number
            const sortedLogs = processedLogs.sort((a, b) =>
                Number(a.blockNumber || 0) - Number(b.blockNumber || 0)
            );

            setLogs(sortedLogs as any);

            // Check for specific events
            const initialized = sortedLogs.some(log => log.eventName === 'Initialized');
            const hasInitialValidator = sortedLogs.some(log => log.eventName === 'InitialValidatorCreated');

            setHasInitialized(initialized);
            setHasInitialValidator(hasInitialValidator);

            // Call onSuccess if both events are found
            if (initialized && hasInitialValidator) {
                onSuccess();
            }

        } catch (err) {
            console.error('Error fetching logs:', err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(`Failed to fetch contract logs: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 mb-4 dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium dark:text-white">Contract Events</h2>
            </div>

            <div className="p-4">
                <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center
                            ${hasInitialized ? 'bg-green-500' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            {hasInitialized && (
                                <span className="text-white text-sm">✓</span>
                            )}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">PoAValidatorManager emitted Initialized event</span>
                    </div>

                    <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center
                            ${hasInitialValidator ? 'bg-green-500' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            {hasInitialValidator && (
                                <span className="text-white text-sm">✓</span>
                            )}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">PoAValidatorManager emitted InitialValidatorCreated event</span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <button
                    onClick={fetchLogs}
                    disabled={isLoading}
                    className={`w-full p-2 rounded ${isLoading
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    {isLoading ? 'Loading...' : 'Fetch Contract Logs'}
                </button>

                {logs.length > 0 && (
                    <div className="mt-4 space-y-3">
                        {logs.map((log, index) => (
                            <div key={`${log.transactionHash}-${index}`}
                                className="rounded border border-gray-100 dark:border-gray-700">
                                <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                    <div className="font-medium text-blue-600 dark:text-blue-400">
                                        {log.eventName}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Block: {log.blockNumber.toString()}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        Tx: {log.transactionHash}
                                    </div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-800">
                                    <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
                                        {JSON.stringify(serializeBigInt(log.decodedData), null, 2)}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
