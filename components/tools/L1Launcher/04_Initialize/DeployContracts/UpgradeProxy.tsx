declare global {
    interface Window {
        ethereum?: any;
    }
}

import { PROXY_ADDRESS } from "@/components/tools/common/utils/genGenesis";
import { PROXY_ADMIN_ADDRESS } from "@/components/tools/common/utils/genGenesis";
import ProxyAdmin from "../../contract_compiler/compiled-4.9/ProxyAdmin.json";
import { useEffect, useState } from 'react';
import { createPublicClient, http, getAddress, createWalletClient, custom, defineChain } from 'viem';
import { useL1LauncherWizardStore } from "../../config/store";

export function UpgradeProxyUI() {
    return (<>
        <ProxyStorageReader />
        <UpgradeProxyForm />
    </>)
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

export function ProxyStorageReader() {
    const { evmChainId, chainId, getCChainRpcEndpoint } = useL1LauncherWizardStore();
    const [implementationAddress, setImplementationAddress] = useState<string | null>(null);
    const [adminAddress, setAdminAddress] = useState<string | null>(null);
    const [proxyAdminOwner, setProxyAdminOwner] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [contractData, setContractData] = useState<{
        proxyAdmin?: string;
        proxyImplementation?: string;
        owner?: string;
    }>({});

    async function readContractMethods() {
        try {
            const chain = getChainConfig(evmChainId, chainId, getCChainRpcEndpoint());
            const client = createPublicClient({
                chain,
                transport: http(),
            });

            // Read all view methods
            const [proxyAdmin, proxyImplementation, owner] = await Promise.all([
                client.readContract({
                    address: PROXY_ADMIN_ADDRESS,
                    abi: ProxyAdmin.abi,
                    functionName: 'getProxyAdmin',
                    args: [PROXY_ADDRESS],
                }),
                client.readContract({
                    address: PROXY_ADMIN_ADDRESS,
                    abi: ProxyAdmin.abi,
                    functionName: 'getProxyImplementation',
                    args: [PROXY_ADDRESS],
                }),
                client.readContract({
                    address: PROXY_ADMIN_ADDRESS,
                    abi: ProxyAdmin.abi,
                    functionName: 'owner',
                    args: [],
                }),
            ]);

            setContractData({
                proxyAdmin: proxyAdmin as string,
                proxyImplementation: proxyImplementation as string,
                owner: owner as string,
            });
        } catch (err) {
            console.error('Error reading contract methods:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
    }

    async function readStorageSlots() {
        const chain = getChainConfig(evmChainId, chainId, getCChainRpcEndpoint());
        const client = createPublicClient({
            chain,
            transport: http(),
        });

        // Read implementation slot
        const implSlot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
        const adminSlot = '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103';
        const ownerSlot = '0x0000000000000000000000000000000000000000000000000000000000000000';

        const [implStorage, adminStorage, ownerStorage] = await Promise.all([
            client.getStorageAt({ address: PROXY_ADDRESS, slot: implSlot }),
            client.getStorageAt({ address: PROXY_ADDRESS, slot: adminSlot }),
            client.getStorageAt({ address: PROXY_ADMIN_ADDRESS, slot: ownerSlot }),
        ]);

        // Convert storage values to addresses
        if (implStorage) {
            const impl = getAddress('0x' + implStorage.slice(-40));
            setImplementationAddress(impl);
        }

        if (adminStorage) {
            const admin = getAddress('0x' + adminStorage.slice(-40));
            setAdminAddress(admin);
        }

        if (ownerStorage) {
            const owner = getAddress('0x' + ownerStorage.slice(-40));
            setProxyAdminOwner(owner);
        }
    }

    async function readStorage() {
        try {
            setIsLoading(true);
            setError(null);

            await Promise.all([
                readContractMethods(),
                readStorageSlots(),
            ]);

        } catch (err) {
            console.error('Error reading data:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        readStorage();
    }, [evmChainId, chainId, getCChainRpcEndpoint]);

    const refreshStorage = () => {
        readStorage();
    };

    return (
        <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium dark:text-gray-200">Proxy Storage Reader</h2>
                <button
                    onClick={refreshStorage}
                    disabled={isLoading}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Refresh
                </button>
            </div>

            {isLoading && (
                <div className="text-gray-600 dark:text-gray-400">Loading storage values...</div>
            )}

            {error && (
                <div className="text-red-600 dark:text-red-400 mb-4">
                    Error: {error}
                </div>
            )}

            {!isLoading && !error && (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Implementation Address (Storage):
                        </h3>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded">
                            <code className="flex-1 p-2 font-mono text-sm break-all">
                                {implementationAddress || 'Not set'}
                            </code>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Implementation Address (Contract):
                        </h3>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded">
                            <code className="flex-1 p-2 font-mono text-sm break-all">
                                {contractData.proxyImplementation || 'Not set'}
                            </code>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Admin Address (Storage):
                        </h3>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded">
                            <code className="flex-1 p-2 font-mono text-sm break-all">
                                {adminAddress || 'Not set'}
                            </code>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Admin Address (Contract):
                        </h3>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded">
                            <code className="flex-1 p-2 font-mono text-sm break-all">
                                {contractData.proxyAdmin || 'Not set'}
                            </code>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            ProxyAdmin Owner (Storage):
                        </h3>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded">
                            <code className="flex-1 p-2 font-mono text-sm break-all">
                                {proxyAdminOwner || 'Not set'}
                            </code>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            ProxyAdmin Owner (Contract):
                        </h3>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded">
                            <code className="flex-1 p-2 font-mono text-sm break-all">
                                {contractData.owner || 'Not set'}
                            </code>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function UpgradeProxyForm() {
    const { evmChainId, chainId, getCChainRpcEndpoint } = useL1LauncherWizardStore();
    const [newImplementation, setNewImplementation] = useState('');
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleUpgrade = async () => {
        try {
            if (!newImplementation.match(/^0x[a-fA-F0-9]{40}$/)) {
                throw new Error('Invalid implementation address format');
            }

            if (!window.ethereum) {
                throw new Error('No ethereum provider found');
            }

            setIsUpgrading(true);
            setError(null);
            setSuccessMessage(null);

            const chain = getChainConfig(evmChainId, chainId, getCChainRpcEndpoint());

            const walletClient = createWalletClient({
                chain,
                transport: custom(window.ethereum)
            });

            // Get the current account
            const [address] = await walletClient.requestAddresses();

            const hash = await walletClient.writeContract({
                address: PROXY_ADMIN_ADDRESS,
                abi: ProxyAdmin.abi,
                functionName: 'upgrade',
                args: [PROXY_ADDRESS, newImplementation as `0x${string}`],
                account: address,
            });

            const publicClient = createPublicClient({
                chain,
                transport: http(),
            });

            await publicClient.waitForTransactionReceipt({ hash });
            setNewImplementation('');
            setSuccessMessage('Proxy implementation upgraded successfully!');
        } catch (err) {
            console.error('Error upgrading proxy:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setIsUpgrading(false);
        }
    };

    return (
        <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-medium mb-4 dark:text-gray-200">Upgrade Proxy Implementation</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Implementation Address
                    </label>
                    <input
                        type="text"
                        value={newImplementation}
                        onChange={(e) => setNewImplementation(e.target.value)}
                        placeholder="0x..."
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                </div>

                {successMessage && (
                    <div className="text-green-600 dark:text-green-400 mb-2">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="text-red-600 dark:text-red-400">
                        Error: {error}
                    </div>
                )}

                <button
                    onClick={handleUpgrade}
                    disabled={isUpgrading || !newImplementation}
                    className={`w-full p-2 rounded ${isUpgrading || !newImplementation
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                >
                    {isUpgrading ? 'Upgrading...' : 'Upgrade'}
                </button>
            </div>
        </div>
    );
}
