import { useState, useEffect } from 'react';
import { createWalletClient, createPublicClient, http, hexToBytes, Abi, decodeErrorResult, AbiEvent, custom, encodeFunctionData } from 'viem';
import { useL1LauncherWizardStore } from '../../config/store';
import { PROXY_ADDRESS } from '@/components/tools/common/utils/genGenesis';
import { cb58ToHex } from '../../../common/utils/cb58';
import { packWarpIntoAccessList } from '../../../common/utils/packWarp';
import PoAValidatorManagerABI from '../contract_compiler/compiled/PoAValidatorManager.json';
import { statusColors, StepState } from './colors';

interface StatusState {
    status: StepState;
    error?: string;
    data?: string;
}

export default function ContractInitializeValidatorSet() {
    const [status, setStatus] = useState<StatusState>({ status: 'not_started' });
    const [error, setError] = useState<string | null>(null);
    const {
        chainId,
        subnetId,
        nodePopJsons,
        nodesCount,
        evmChainId,
        l1Name,
        tokenSymbol,
        getCChainRpcEndpoint,
        convertL1SignedWarpMessage
    } = useL1LauncherWizardStore();

    const [initialCheckHasRun, setInitialCheckHasRun] = useState(false);

    useEffect(() => {
        if (initialCheckHasRun) return;
        setInitialCheckHasRun(true);

        const checkInitialization = async () => {
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
                        default: { http: [getCChainRpcEndpoint()] },
                        public: { http: [getCChainRpcEndpoint()] },
                    },
                };

                const publicClient = createPublicClient({
                    chain: customChain,
                    transport: http()
                });

                const initialValidatorEvent = PoAValidatorManagerABI.abi.find(
                    item => item.type === 'event' && item.name === 'InitialValidatorCreated'
                ) as AbiEvent;

                const logs = await publicClient.getLogs({
                    address: PROXY_ADDRESS,
                    event: initialValidatorEvent,
                    fromBlock: 'earliest',
                    toBlock: 'latest'
                });

                if (logs && logs.length > 0) {
                    setStatus({ status: 'success' });
                }
            } catch (err) {
                console.error('Error checking initialization:', err);
            }
        };

        checkInitialization();
    }, [evmChainId, l1Name, tokenSymbol, getCChainRpcEndpoint]);

    const onInitialize = async () => {
        if (!window.ethereum) {
            setStatus({ status: 'error', error: 'MetaMask is not installed' });
            return;
        }

        setStatus({ status: 'in_progress' });
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
                    default: { http: [getCChainRpcEndpoint()] },
                    public: { http: [getCChainRpcEndpoint()] },
                },
            };

            const walletClient = createWalletClient({
                chain: customChain,
                transport: custom(window.ethereum)
            });

            const [address] = await walletClient.requestAddresses();

            const publicClient = createPublicClient({
                chain: customChain,
                transport: http()
            });

            // Convert hex signature to bytes
            const signatureBytes = hexToBytes(convertL1SignedWarpMessage!);

            // Pack the WARP message into access list format
            const accessList = packWarpIntoAccessList(signatureBytes);

            const args = [{
                l1ID: cb58ToHex(subnetId),
                validatorManagerBlockchainID: cb58ToHex(chainId),
                validatorManagerAddress: PROXY_ADDRESS,
                initialValidators: nodePopJsons
                    .slice(0, nodesCount)
                    .map(json => {
                        const node = JSON.parse(json).result;
                        return {
                            nodeID: cb58ToHex(node.nodeID.split('-')[1]),
                            blsPublicKey: node.nodePOP.publicKey,
                            weight: 100
                        };
                    })
            }, 0];
            // Simulate first to validate the call will succeed
            const { request } = await publicClient.simulateContract({
                address: PROXY_ADDRESS,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initializeValidatorSet', 
                args,
                account: address,
                accessList
            });

            // Encode the function data
            const data = encodeFunctionData({
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initializeValidatorSet',
                args: request.args
            });

            window.ethereum.on("debug", console.log)

            const req = {
                method: 'eth_sendTransaction',
                params: [{
                    from: address,
                    to: PROXY_ADDRESS,
                    data,
                    accessList
                }]
            }

            console.log(req);   
            // Send transaction via window.ethereum
            const hash = await window.ethereum.request(req);

            // Wait for receipt
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (receipt.status === 'success') {
                setStatus({ status: 'success', data: hash });
            } else {
                const revertReason = await debugTraceAndDecode(hash);
                throw new Error(`Transaction reverted: ${revertReason}`);
            }

        } catch (err) {
            setStatus({ status: 'error' });
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error:', err);
        }
    };

    const debugTraceAndDecode = async (txHash: string) => {
        try {
            const traceResponse = await fetch(getCChainRpcEndpoint(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'debug_traceTransaction',
                    params: [txHash, { tracer: 'callTracer' }],
                    id: 1
                })
            });

            const trace = await traceResponse.json();

            // Add safety checks
            if (!trace || !trace.result) {
                return 'Unable to get trace data';
            }

            const errorSelector = trace.result.output;
            if (!errorSelector) {
                return 'No error data available';
            }

            if (errorSelector.startsWith('0x')) {
                try {
                    const errorResult = decodeErrorResult({
                        abi: PoAValidatorManagerABI.abi as Abi,
                        data: errorSelector
                    });
                    return `${errorResult.errorName}${errorResult.args ? ': ' + errorResult.args.join(', ') : ''}`;
                } catch (e) {
                    return `Unknown error selector: ${errorSelector}`;
                }
            }
            return 'No error selector found in trace';
        } catch (err) {
            console.error('Error in debug trace:', err);
            return 'Failed to get transaction trace';
        }
    };

    return (
        <div className={`pt-4 px-4 pb-2 rounded-lg border ${statusColors[status.status]} mb-4 dark:bg-gray-800`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium dark:text-white">Call initializeValidatorSet in PoA Validator Manager</h3>
                <span className={`${status.status === 'error' ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}`}>
                    {status.status === 'not_started' ? 'Not started' :
                        status.status === 'in_progress' ? 'In progress...' :
                            status.status === 'error' ? 'Failed' : 'Success'}
                </span>
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</div>
            )}

            {status.status === 'success' && status.data && (
                <div className="mb-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction Hash:</div>
                    <div className="bg-white dark:bg-gray-900 rounded p-2 border border-gray-100 dark:border-gray-700">
                        <pre className="font-mono text-sm whitespace-pre-wrap break-all dark:text-gray-300">{status.data}</pre>
                    </div>
                </div>
            )}

            {status.status === 'not_started' && (
                <button
                    onClick={onInitialize}
                    disabled={!convertL1SignedWarpMessage}
                    className={`mt-2 w-full p-2 mb-2 rounded ${!convertL1SignedWarpMessage
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    Initialize
                </button>
            )}
        </div>
    );
}
