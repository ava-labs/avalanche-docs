import { useState, useEffect } from 'react';
import { createWalletClient, createPublicClient, http, hexToBytes, Abi, decodeErrorResult, AbiEvent, formatEther, custom, WalletClient } from 'viem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import { StateCreator } from 'zustand';
import { useL1LauncherWizardStore } from '../../config/store';
import { cb58ToHex } from '../../../common/utils/cb58';
import { packWarpIntoAccessList } from '../../../common/utils/packWarp';
import PoAValidatorManagerABI from '../../../common/icm-contracts/compiled/PoAValidatorManager.json';
import { statusColors, StepState } from './colors';
import { PROXY_ADDRESS } from '@/components/tools/common/utils/genGenesis';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

interface StatusState {
    status: StepState;
    error?: string;
    data?: string;
}

interface PrivateKeyState {
    privateKey: `0x${string}`;
    clearPrivateKey: () => void;
    initializePrivateKey: () => void;
}

const PrivateKeyStoreFunc: StateCreator<PrivateKeyState> = (set, get) => ({
    privateKey: '0x',
    clearPrivateKey: () => set({ privateKey: '0x' }),
    initializePrivateKey: () => {
        const { privateKey } = get();
        if (privateKey === '0x') {
            set({ privateKey: generatePrivateKey() });
        }
    }
});

const usePrivateKeyStore = create<PrivateKeyState>()(
    persist(PrivateKeyStoreFunc, {
        name: 'temp-private-key-storage-wizard-initialize-validator-set',
        storage: createJSONStorage(() => localStorage),
    })
);

export default function ContractInitializeValidatorSet() {
    const { privateKey, initializePrivateKey } = usePrivateKeyStore();
    const clearTempPrivateKey = usePrivateKeyStore(state => state.clearPrivateKey);

    const [status, setStatus] = useState<StatusState>({ status: 'not_started' });
    const [error, setError] = useState<string | null>(null);
    const [depositStatus, setDepositStatus] = useState<StatusState>({ status: 'not_started' });
    const {
        chainId,
        subnetId,
        nodePopJsons,
        nodesCount,
        evmChainId,
        l1Name,
        tokenSymbol,
        getL1RpcEndpoint,
        convertL1SignedWarpMessage,
        getViemL1Chain
    } = useL1LauncherWizardStore();


    const [initialCheckHasRun, setInitialCheckHasRun] = useState(false);

    const [txArgs, setTxArgs] = useState<any[]>([]);


    const [tempWalletClient, setTempWalletClient] = useState<WalletClient | null>(null);
    const [hasEnoughFunds, setHasEnoughFunds] = useState(false);

    useEffect(() => {
        if (privateKey === '0x') return;
        const newTempWalletClient = createWalletClient({
            chain: getViemL1Chain(),
            transport: http(),
            account: privateKeyToAccount(privateKey)
        })
        setTempWalletClient(newTempWalletClient)
        console.log('tempWalletClient address', newTempWalletClient.account?.address);

    }, [privateKey]);

    useEffect(() => {
        initializePrivateKey();
    }, []);

    useEffect(() => {
        setTxArgs([{
            subnetID: cb58ToHex(subnetId),
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
        }, 0])
    }, [subnetId, chainId, nodePopJsons, nodesCount]);

    useEffect(() => {
        const checkBalance = async () => {
            if (!tempWalletClient?.account?.address) return;

            try {
                const publicClient = createPublicClient({ chain: getViemL1Chain(), transport: http() })

                const balance = await publicClient.getBalance({
                    address: tempWalletClient.account.address
                });

                // Check if balance is >= 0.5 tokens
                const requiredBalance = BigInt(5e17);
                setHasEnoughFunds(balance >= requiredBalance);
            } catch (err) {
                console.error('Error checking balance:', err);
            }
        };

        checkBalance();
    }, [tempWalletClient?.account?.address, depositStatus.status]);

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
                        default: { http: [getL1RpcEndpoint()] },
                        public: { http: [getL1RpcEndpoint()] },
                    },
                };

                const publicClient = createPublicClient({
                    chain: customChain,
                    transport: http()
                });


                // Find the InitialValidatorCreated event in ABI
                const initialValidatorEvent = PoAValidatorManagerABI.abi.find(
                    item => item.type === 'event' && item.name === 'InitialValidatorCreated'
                ) as AbiEvent;

                const logs = await publicClient.getLogs({
                    address: PROXY_ADDRESS,
                    event: initialValidatorEvent,
                    fromBlock: 'earliest',
                    toBlock: 'latest'
                });

                // If logs exist, validator set has been initialized
                if (logs && logs.length > 0) {
                    setStatus({ status: 'success' });
                }
            } catch (err) {
                console.error('Error checking initialization:', err);
            }
        };

        checkInitialization();
    }, [evmChainId, l1Name, tokenSymbol, getL1RpcEndpoint]);


    // Add UI Flow: function to add money (send 0.5 AVAX) from the extension wallet (browser wallet)
    const onDepositFunds = async () => {
        if (!window.avalanche || !tempWalletClient?.account?.address) {
            setDepositStatus({ status: 'error' });
            setError('MetaMask (Avalanche wallet) is not installed or temporary wallet not initialized');
            return;
        }

        setDepositStatus({ status: 'in_progress' });
        setError(null);

        try {
            const value = BigInt(5e17); // 0.5 coins in wei


            const browserWalletClient = createWalletClient({
                chain: getViemL1Chain(),
                transport: custom(window.avalanche!)
            })

            const [address] = await browserWalletClient.getAddresses()

            const txRequest = {
                account: address,
                to: tempWalletClient.account.address,
                value,
            }
            console.log('txRequest', txRequest);
            const txHash = await browserWalletClient.sendTransaction(txRequest);

            // Wait for transaction confirmation
            const publicClient = createPublicClient({ chain: getViemL1Chain(), transport: http() })
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            console.log('Deposit transaction receipt:', receipt);

            if (receipt.status === 'success') {
                setDepositStatus({ status: 'success', data: txHash });
            } else {
                throw new Error('Deposit transaction failed');
            }
        } catch (err) {
            setDepositStatus({ status: 'error' });
            setError(err instanceof Error ? err.message : 'An error occurred during deposit');
            console.error('Deposit error:', err);
        }
    };

    const onInitialize = async () => {
        if (!window.avalanche || !tempWalletClient?.account) {
            setStatus({ status: 'error' });
            setError('MetaMask is not installed or temporary wallet not initialized');
            return;
        }

        setStatus({ status: 'in_progress' });
        setError(null);
        try {
            const publicClient = createPublicClient({
                chain: getViemL1Chain(),
                transport: http()
            });


            // Convert hex signature to bytes
            const signatureBytes = hexToBytes(convertL1SignedWarpMessage!);
            const accessList = packWarpIntoAccessList(signatureBytes);

            // First simulate the transaction
            const simlation = await publicClient.simulateContract({
                address: PROXY_ADDRESS,
                abi: PoAValidatorManagerABI.abi,
                functionName: 'initializeValidatorSet',
                args: txArgs,
                accessList,
                account: tempWalletClient.account
            });

            console.log('simlation', simlation);
            const gasPrice = await publicClient.getGasPrice();
            const gas = await publicClient.estimateContractGas(simlation.request)
            const totalGas = gasPrice * gas;
            console.log('Gas:', { gas, gasPrice, totalGas, totalGasInEth: formatEther(totalGas) });

            // Execute with metamask wallet
            const hash = await tempWalletClient.writeContract(simlation.request);

            // Wait for transaction receipt
            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            console.log('Transaction receipt:', receipt);

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
        const traceResponse = await fetch(getL1RpcEndpoint(), {
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

        // The error selector is in the output field
        const errorSelector = trace.result.output;
        if (errorSelector && errorSelector.startsWith('0x')) {
            try {
                // For this specific case, we got 0x6b2f19e9
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
    };

    return (
        <>
            {/* Only show Initialize Validator Set if we have enough funds */}
            {hasEnoughFunds && (
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
            )}

            {/* Only show Deposit UI if we don't have enough funds */}
            {!hasEnoughFunds && (
                <div className="pt-4 px-4 pb-2 rounded-lg border border-green-300 mb-4 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium dark:text-white">Deposit 0.5 AVAX into Temporary Wallet</h3>
                        <span className={`${depositStatus.status === 'error' ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}`}>
                            {depositStatus.status === 'not_started' ? 'Not started' :
                                depositStatus.status === 'in_progress' ? 'In progress...' :
                                    depositStatus.status === 'error' ? 'Failed' : 'Success'}
                        </span>
                    </div>

                    {depositStatus.status === 'success' && depositStatus.data && (
                        <div className="mb-2">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Deposit Transaction Hash:</div>
                            <div className="bg-white dark:bg-gray-900 rounded p-2 border border-gray-100 dark:border-gray-700">
                                <pre className="font-mono text-sm whitespace-pre-wrap break-all dark:text-gray-300">{depositStatus.data}</pre>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onDepositFunds}
                        className="mt-2 w-full p-2 mb-2 rounded bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        Deposit 0.5 AVAX
                    </button>
                </div>
            )}
        </>
    );
} 
