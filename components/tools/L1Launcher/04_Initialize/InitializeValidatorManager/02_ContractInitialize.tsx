import { useState, useEffect } from 'react';
import { createWalletClient, createPublicClient, custom, http, AbiEvent } from 'viem';
import { useL1LauncherWizardStore } from '../../config/store';
import { cb58ToHex } from '@/components/tools/common/utils/cb58';
import PoAValidatorManagerABI from '../../../common/icm-contracts/compiled/PoAValidatorManager.json';
import { statusColors, StepState } from './colors';
import { PROXY_ADDRESS } from "@/components/tools/common/utils/genGenesis";

export default function ContractInitialize() {
    const [status, setStatus] = useState<StepState>('not_started');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [initialCheckHasRun, setInitialCheckHasRun] = useState(false);
    const {
        evmChainId,
        l1Name,
        tokenSymbol,
        getL1RpcEndpoint,
        tempPrivateKeyHex,
        subnetId,
        convertL1SignedWarpMessage
    } = useL1LauncherWizardStore();

    useEffect(() => {
        if (initialCheckHasRun) return;
        setInitialCheckHasRun(true);

        const fetchLogs = async () => {
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

                const initializedEventABI = PoAValidatorManagerABI.abi.find(item => item.type === 'event' && item.name === 'Initialized') as AbiEvent;

                const logs = await publicClient.getLogs({
                    address: PROXY_ADDRESS,
                    event: initializedEventABI,
                    fromBlock: 'earliest',
                    toBlock: 'latest'
                });

                console.log('Contract logs:', logs);

                // If logs exist, contract is already initialized
                if (logs && logs.length > 0) {
                    setStatus('success');
                }
            } catch (err) {
                console.error('Error fetching logs:', err);
                setStatus('error');
                setErrorMessage(err instanceof Error ? err.message : String(err));
            }
        };

        fetchLogs();
    }, []); // Empty dependency array means this runs once on mount

    const onInitialize = async () => {
        if (!window.avalanche) {
            setStatus('error');
            setErrorMessage('MetaMask is not installed');
            return;
        }

        setStatus('in_progress');
        setErrorMessage(null);
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

            // Create wallet client for metamask
            const walletClient = createWalletClient({
                chain: customChain,
                transport: custom(window.avalanche)
            });
            const [address] = await walletClient.requestAddresses();


            const settings = {
                subnetID: cb58ToHex(subnetId),
                churnPeriodSeconds: BigInt(0),
                maximumChurnPercentage: 20
            };

            console.log('calling initialize', {
                address: PROXY_ADDRESS,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initialize',
                args: [settings, address],
                account: address
            });

            // Simulate with metamask address
            const { request } = await publicClient.simulateContract({
                address: PROXY_ADDRESS,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initialize',
                args: [settings, address],
                account: address
            });

            // Execute with metamask wallet
            const hash = await walletClient.writeContract(request);

            // Wait for transaction receipt
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (receipt.status === 'success') {
                setStatus('success');
            } else {
                throw new Error('Transaction failed');
            }

        } catch (err) {
            setStatus('error');
            console.error('Error:', err);
            setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    return (
        <div className={`pt-4 px-4 pb-2 rounded-lg border ${statusColors[status]} mb-4 dark:bg-gray-800`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium dark:text-white">Call initialize in PoA Validator Manager</h3>
                <span className={`${status === 'error' ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}`}>
                    {status === 'not_started' ? 'Not started' :
                        status === 'in_progress' ? 'In progress...' :
                            status === 'error' ? 'Failed' : 'Success'}
                </span>
            </div>

            {errorMessage && (
                <div className="mb-4 p-3 rounded bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                    {errorMessage}
                </div>
            )}

            {status === 'not_started' && (
                <button
                    onClick={onInitialize}
                    disabled={!convertL1SignedWarpMessage}
                    className={`mt-2 w-full p-2 mb-2 rounded ${!convertL1SignedWarpMessage
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    Call initialize function
                </button>
            )}
        </div>
    );
}
