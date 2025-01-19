import { useState, useEffect } from 'react';
import { useWizardStore } from '../../store';
import { createPublicClient, createWalletClient, http, defineChain, keccak256, } from 'viem';
import NextPrev from '@/components/tools/common/ui/NextPrev';
import { calculateContractAddress, getAddresses } from '../../../common/utils/wallet';
import ProxyAdmin from "../contract_compiler/compiled/ProxyAdmin.json";
import { privateKeyToAccount } from 'viem/accounts';

import PoAValidatorManager from "../contract_compiler/compiled/PoAValidatorManager.json"
import ValidatorMessages from "../contract_compiler/compiled/ValidatorMessages.json"
import TransparentUpgradeableProxy from "../contract_compiler/compiled/TransparentUpgradeableProxy.json"

type Status = 'not_started' | 'in_progress' | 'error' | 'success' | 'loading';

export async function deployContract({
    privateKeyHex,
    evmChainId,
    chainId,
    rpcEndpoint,
    l1Name,
    tokenSymbol,
    abi,
    bytecode,
    args,
    nonce
}: {
    privateKeyHex: string,
    evmChainId: number,
    chainId: string,
    rpcEndpoint: string,
    l1Name: string,
    tokenSymbol: string,
    abi: any,
    bytecode: `0x${string}`,
    args: any[],
    nonce: number
}) {
    const chain = defineChain({
        id: Number(evmChainId),
        name: chainId,
        nativeCurrency: {
            decimals: 18,
            name: l1Name,
            symbol: tokenSymbol,
        },
        rpcUrls: {
            default: { http: [rpcEndpoint] },
            public: { http: [rpcEndpoint] },
        },
    });

    const publicClient = createPublicClient({
        chain,
        transport: http(rpcEndpoint),
    });

    const account = privateKeyToAccount(`0x${privateKeyHex}`);

    const walletClient = createWalletClient({
        chain,
        transport: http(rpcEndpoint),
    });

    const hash = await walletClient.deployContract({
        abi,
        bytecode,
        account,
        args,
        nonce,
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (!receipt.contractAddress) {
        throw new Error('Contract address not found in receipt');
    }

    return {
        address: receipt.contractAddress,
        txHash: hash,
    };
}


interface DeploymentStatus {
    status: Status;
    error?: string;
    address?: `0x${string}`;
    txHash?: `0x${string}`;
    predictedDeployer?: `0x${string}`;
}

// Contract Deployment Card Component
function ContractCard({
    title,
    status,
    onDeploy,
    disabled = false,
    showDeployButton = true
}: {
    title: string;
    status: DeploymentStatus;
    onDeploy: () => Promise<void>;
    disabled?: boolean;
    showDeployButton?: boolean;
}) {
    const handleCopy = (text: string) => navigator.clipboard.writeText(text).catch(console.error);

    const statusColors = {
        not_started: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
        in_progress: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
        error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
        success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
        loading: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    };

    return (
        <div className={`p-4 rounded-lg border ${statusColors[status.status]} mb-4`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium dark:text-gray-200">{title}</h3>
                <span className={status.status === 'error' ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}>
                    {status.status === 'not_started' ? 'Not deployed' :
                        status.status === 'in_progress' ? 'Deploying...' :
                            status.status === 'error' ? 'Failed' : 'Deployed'}
                </span>
            </div>

            {status.error && <div className="text-sm text-red-600 dark:text-red-400 mb-2">{status.error}</div>}

            {status.address && (
                <div className="mb-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Contract Address:</div>
                    <div className="flex items-center bg-white dark:bg-gray-800 rounded p-2 border border-gray-100 dark:border-gray-700">
                        <code className="font-mono text-sm flex-1 break-all dark:text-gray-300">{status.address}</code>
                        <button onClick={() => handleCopy(status.address!)}
                            className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded dark:text-gray-300">
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {status.txHash && (
                <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction Hash:</div>
                    <div className="flex items-center bg-white dark:bg-gray-800 rounded p-2 border border-gray-100 dark:border-gray-700">
                        <code className="font-mono text-sm flex-1 break-all dark:text-gray-300">{status.txHash}</code>
                        <button onClick={() => handleCopy(status.txHash!)}
                            className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded dark:text-gray-300">
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {status.predictedDeployer && (
                <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Predicted Deployer:</div>
                    <div className="flex items-center bg-white dark:bg-gray-800 rounded p-2 border border-gray-100 dark:border-gray-700">
                        <code className="font-mono text-sm flex-1 break-all dark:text-gray-300">{status.predictedDeployer}</code>
                        <button onClick={() => handleCopy(status.predictedDeployer!)}
                            className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded dark:text-gray-300">
                            Copy
                        </button>
                    </div>
                </div>
            )}

            {showDeployButton && status.status === 'not_started' && (
                <button
                    onClick={onDeploy}
                    disabled={disabled}
                    className={`mt-2 w-full p-2 rounded ${disabled
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    Deploy
                </button>
            )}
        </div>
    );
}

// Add this new component
interface ContractDeployerProps {
    name: string;
    nonce: number;
    abi: any;
    bytecode: `0x${string}`;
    args: any[];
    isEnabled: boolean;
    onDeployComplete?: (address: `0x${string}`) => void;
}

function ContractDeployer({
    name,
    nonce,
    abi,
    bytecode,
    args,
    isEnabled,
    onDeployComplete,
}: ContractDeployerProps) {
    const [status, setStatus] = useState<DeploymentStatus>({ status: 'loading' });
    const { evmChainId, chainId, getCChainRpcEndpoint, tempPrivateKeyHex, l1Name, tokenSymbol } = useWizardStore();

    useEffect(() => {
        let mounted = true;

        const checkContract = async () => {
            try {
                const chain = getChainConfig(evmChainId, chainId, getCChainRpcEndpoint());
                const publicClient = createPublicClient({
                    chain,
                    transport: http(),
                });

                const predictedAddress = calculateContractAddress(tempPrivateKeyHex, nonce);
                console.log(`Checking ${name} at ${predictedAddress}`);

                const code = await publicClient.getCode({ address: predictedAddress });

                if (code && code !== '0x') {
                    // if (code === deployedBytecode) {
                    const newStatus = {
                        status: 'success' as const,
                        address: predictedAddress,
                    };
                    if (mounted) {
                        setStatus(newStatus);
                        onDeployComplete?.(predictedAddress);
                    }
                    // } else {
                    //     console.log("Bytecode mismatch at expected address", code, deployedBytecode);
                    //     throw new Error("Bytecode mismatch at expected address");
                    // }
                } else if (mounted) {
                    setStatus({ status: 'not_started' });
                }
            } catch (err: any) {
                console.error(`Error checking ${name}:`, err);
                if (mounted) {
                    setStatus({
                        status: 'error',
                        error: err.message
                    });
                }
            }
        };

        checkContract();

        return () => {
            mounted = false;
        };
    }, []);

    const handleDeploy = async () => {
        try {
            setStatus({ status: 'in_progress' });
            const predictedAddress = calculateContractAddress(tempPrivateKeyHex, nonce);

            const { address, txHash } = await deployContract({
                privateKeyHex: tempPrivateKeyHex,
                evmChainId,
                chainId,
                rpcEndpoint: getCChainRpcEndpoint(),
                l1Name,
                tokenSymbol,
                abi,
                bytecode,
                args,
                nonce
            });

            if (address.toLowerCase() !== predictedAddress.toLowerCase()) {
                throw new Error(`Address mismatch! Expected: ${predictedAddress}, Got: ${address}`);
            }

            setStatus({
                status: 'success',
                address,
                txHash
            });

            onDeployComplete?.(address);
        } catch (err: any) {
            console.error(`Error deploying ${name}:`, err);
            setStatus({
                status: 'error',
                error: err.message
            });
        }
    };

    return (
        <ContractCard
            title={name}
            status={status}
            onDeploy={handleDeploy}
            disabled={!isEnabled}
        />
    );
}

// Add this component after ContractCard
function QuickDeploymentTest({ onTestComplete }: { onTestComplete: (success: boolean) => void }) {
    const [status, setStatus] = useState<'not_started' | 'testing' | 'success' | 'error'>('not_started');
    const [error, setError] = useState<string | null>(null);
    const { tempPrivateKeyHex, evmChainId, chainId, getCChainRpcEndpoint } = useWizardStore();

    const testContracts = async () => {
        setStatus('testing');
        setError(null);
        try {
            const chain = getChainConfig(evmChainId, chainId, getCChainRpcEndpoint());
            const publicClient = createPublicClient({
                chain,
                transport: http(),
            });

            const implAddress = calculateContractAddress(tempPrivateKeyHex, 1);
            const proxyAddress = calculateContractAddress(tempPrivateKeyHex, 3);

            console.log('Testing contract calls:', {
                implementation: implAddress,
                proxy: proxyAddress,
                function: 'P_CHAIN_BLOCKCHAIN_ID'
            });

            const [implResult, proxyResult] = await Promise.all([
                publicClient.readContract({
                    address: implAddress,
                    abi: PoAValidatorManager.abi,
                    functionName: 'P_CHAIN_BLOCKCHAIN_ID',
                }),
                publicClient.readContract({
                    address: proxyAddress,
                    abi: PoAValidatorManager.abi,
                    functionName: 'P_CHAIN_BLOCKCHAIN_ID',
                })
            ]);

            console.log('Results:', {
                implementation: implResult,
                proxy: proxyResult,
                match: implResult === proxyResult
            });

            if (implResult === proxyResult) {
                setStatus('success');
                onTestComplete(true);
            } else {
                throw new Error('Implementation and proxy returned different values');
            }

        } catch (err: any) {
            console.error('Contract test failed:', err);
            setStatus('error');
            setError(err.message);
            onTestComplete(false);
        }
    };

    const statusColors = {
        not_started: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
        testing: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
        error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
        success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
    };

    return (
        <div className={`p-4 rounded-lg border ${statusColors[status]} mb-4`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium dark:text-gray-200">Proxy Test</h3>
                <span className={status === 'error' ? 'text-red-600 dark:text-red-400' : 'dark:text-gray-300'}>
                    {status === 'not_started' ? 'Not tested' :
                        status === 'testing' ? 'Testing...' :
                            status === 'error' ? 'Failed' : 'Passed'}
                </span>
            </div>

            {error && <div className="text-sm text-red-600 dark:text-red-400 mb-2">{error}</div>}

            {status === 'not_started' && (
                <button
                    onClick={testContracts}
                    className="mt-2 w-full p-2 rounded bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Test
                </button>
            )}
        </div>
    );
}

// Main Component
export default function DeployContracts() {
    const { tempPrivateKeyHex, goToNextStep, goToPreviousStep } = useWizardStore();
    const [validatorMessagesDeployed, setValidatorMessagesDeployed] = useState(false);
    const [validatorManagerDeployed, setValidatorManagerDeployed] = useState(false);
    const [proxyAdminDeployed, setProxyAdminDeployed] = useState(false);
    const [proxyDeployed, setProxyDeployed] = useState(false);
    const [proxyTestPassed, setProxyTestPassed] = useState(false);

    // Pre-link the ValidatorManager bytecode
    const getLinkedValidatorManagerBytecode = () => {
        const libraryPath = `${Object.keys(PoAValidatorManager.bytecode.linkReferences)[0]}:${Object.keys(Object.values(PoAValidatorManager.bytecode.linkReferences)[0])[0]}`;
        const libraryHash = calculateLibraryHash(libraryPath);
        const libraryPlaceholder = `__$${libraryHash}$__`;
        const libraryAddress = calculateContractAddress(tempPrivateKeyHex, 0); // ValidatorMessages nonce is 0

        const linkedBytecode = PoAValidatorManager.bytecode.object
            .split(libraryPlaceholder)
            .join(libraryAddress.slice(2).padStart(40, '0'));

        // Verify linking was successful
        if (linkedBytecode.includes("$__")) {
            throw new Error("Failed to replace library placeholder with actual address");
        }

        return linkedBytecode;
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-medium mb-6 dark:text-gray-200">Deploy Contracts</h1>

            <ContractDeployer
                name="ValidatorMessages"
                nonce={0}
                abi={ValidatorMessages.abi}
                bytecode={ValidatorMessages.bytecode.object as `0x${string}`}
                args={[]}
                isEnabled={true}
                onDeployComplete={() => setValidatorMessagesDeployed(true)}
            />

            <ContractDeployer
                name="PoAValidatorManager"
                nonce={1}
                abi={PoAValidatorManager.abi}
                bytecode={getLinkedValidatorManagerBytecode() as `0x${string}`}
                args={[0]}
                isEnabled={validatorMessagesDeployed}
                onDeployComplete={() => setValidatorManagerDeployed(true)}
            />

            <ContractDeployer
                name="ProxyAdmin"
                nonce={2}
                abi={ProxyAdmin.abi}
                bytecode={ProxyAdmin.bytecode.object as `0x${string}`}
                args={[(getAddresses(tempPrivateKeyHex)).C]}
                isEnabled={validatorManagerDeployed}
                onDeployComplete={() => {
                    setProxyAdminDeployed(true);
                }}
            />

            <ContractDeployer
                name="TransparentUpgradeableProxy"
                nonce={3}
                abi={TransparentUpgradeableProxy.abi}
                bytecode={TransparentUpgradeableProxy.bytecode.object as `0x${string}`}
                args={[
                    calculateContractAddress(tempPrivateKeyHex, 1),
                    calculateContractAddress(tempPrivateKeyHex, 2),
                    "0x" as `0x${string}`
                ]}
                isEnabled={proxyAdminDeployed}
                onDeployComplete={() => setProxyDeployed(true)}
            />

            {proxyDeployed && (
                <QuickDeploymentTest
                    onTestComplete={setProxyTestPassed}
                />
            )}

            <NextPrev
                nextDisabled={!proxyTestPassed}
                onNext={goToNextStep}
                onPrev={goToPreviousStep}
            />
        </div>
    );
}

function getChainConfig(evmChainId: number, chainId: string, rpcEndpoint: string) {
    return defineChain({
        id: Number(evmChainId),
        name: chainId,
        nativeCurrency: {
            decimals: 18,
            name: 'Native Token',
            symbol: 'TOKEN',
        },
        rpcUrls: {
            default: { http: [rpcEndpoint] },
            public: { http: [rpcEndpoint] },
        },
    });
}


const calculateLibraryHash = (libraryPath: string) => {
    // Calculate keccak256 of the fully qualified library name
    const hash = keccak256(
        new TextEncoder().encode(libraryPath)
    ).slice(2);
    // Take first 34 characters (17 bytes)
    return hash.slice(0, 34);
};
