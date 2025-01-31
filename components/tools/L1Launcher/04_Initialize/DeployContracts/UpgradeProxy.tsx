import { PROXY_ADDRESS, UNITIALIZED_PROXY_ADDRESS } from "@/components/tools/common/utils/genGenesis";
import { PROXY_ADMIN_ADDRESS } from "@/components/tools/common/utils/genGenesis";
import ProxyAdmin from "../../../common/openzeppelin-contracts-4.9/compiled/ProxyAdmin.json";
import { useEffect, useState } from 'react';
import { createPublicClient, http, getAddress, createWalletClient, custom, defineChain } from 'viem';
import { useL1LauncherWizardStore } from "../../config/store";

 function UpgradeProxyUI() {
    return (<>
        {/* <ProxyStorageReader /> */}
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
    const { evmChainId, chainId, getL1RpcEndpoint } = useL1LauncherWizardStore();
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
            const chain = getChainConfig(evmChainId, chainId, getL1RpcEndpoint());
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
        const chain = getChainConfig(evmChainId, chainId, getL1RpcEndpoint());
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
    }, [evmChainId, chainId, getL1RpcEndpoint]);

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

export function UpgradeProxyForm({ onUpgradeComplete }: { onUpgradeComplete?: (success: boolean) => void }) {
    const { evmChainId, chainId, getL1RpcEndpoint, poaValidatorManagerAddress } = useL1LauncherWizardStore();
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [currentImplementation, setCurrentImplementation] = useState<string | null>(null);

    useEffect(() => {
        async function checkCurrentImplementation() {
            try {
                const chain = getChainConfig(evmChainId, chainId, getL1RpcEndpoint());
                const client = createPublicClient({
                    chain,
                    transport: http(),
                });

                const implementation = await client.readContract({
                    address: PROXY_ADMIN_ADDRESS,
                    abi: ProxyAdmin.abi,
                    functionName: 'getProxyImplementation',
                    args: [PROXY_ADDRESS],
                });

                setCurrentImplementation(implementation as string);
                if (implementation && poaValidatorManagerAddress && 
                    (implementation as string).toLowerCase() === poaValidatorManagerAddress.toLowerCase()) {
                    onUpgradeComplete?.(true);
                } else {
                    onUpgradeComplete?.(false);
                }
            } catch (err) {
                console.error('Error checking implementation:', err);
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
                onUpgradeComplete?.(false);
            }
        }

        checkCurrentImplementation();
    }, [evmChainId, chainId, getL1RpcEndpoint, poaValidatorManagerAddress, onUpgradeComplete]);

    const handleUpgrade = async () => {
        try {
            if (!poaValidatorManagerAddress) {
                throw new Error('PoA Validator Manager address not set');
            }

            if (!window.avalanche) {
                throw new Error('No ethereum provider found');
            }

            setIsUpgrading(true);
            setError(null);
            setSuccessMessage(null);

            const chain = getChainConfig(evmChainId, chainId, getL1RpcEndpoint());
            const walletClient = createWalletClient({
                chain,
                transport: custom(window.avalanche)
            });

            const [address] = await walletClient.requestAddresses();

            const hash = await walletClient.writeContract({
                address: PROXY_ADMIN_ADDRESS,
                abi: ProxyAdmin.abi,
                functionName: 'upgrade',
                args: [PROXY_ADDRESS, poaValidatorManagerAddress as `0x${string}`],
                account: address,
            });

            const publicClient = createPublicClient({
                chain,
                transport: http(),
            });

            await publicClient.waitForTransactionReceipt({ hash });
            setSuccessMessage('Proxy implementation upgraded successfully!');
            setCurrentImplementation(poaValidatorManagerAddress);
            onUpgradeComplete?.(true);
        } catch (err) {
            console.error('Error upgrading proxy:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            onUpgradeComplete?.(false);
        } finally {
            setIsUpgrading(false);
        }
    };

    let status = null;
    if (currentImplementation === UNITIALIZED_PROXY_ADDRESS) {
        status = <div className="text-yellow-600 dark:text-yellow-400 mb-4">Proxy is not initialized yet</div>;
    } else if (currentImplementation?.toLowerCase() === poaValidatorManagerAddress?.toLowerCase()) {
        status = <div className="text-green-600 dark:text-green-400 mb-4">Proxy is already pointing to the correct implementation</div>;
    } else if (currentImplementation === null) {
        status = <div className="text-red-600 dark:text-red-400 mb-4">loading...</div>;
    }

    return (
        <div className="mt-6 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-medium mb-4 dark:text-gray-200">Upgrade Proxy Implementation</h2>

            <div className="space-y-4">
                {status}

                {successMessage && (
                    <div className="text-green-600 dark:text-green-400 mb-2">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="text-red-600 dark:text-red-400 mb-4">
                        Error: {error}
                    </div>
                )}

                <button
                    onClick={handleUpgrade}
                    disabled={isUpgrading || currentImplementation?.toLowerCase() === poaValidatorManagerAddress?.toLowerCase()}
                    className={`w-full p-2 rounded ${
                        isUpgrading || currentImplementation?.toLowerCase() === poaValidatorManagerAddress?.toLowerCase()
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                    }`}
                >
                    {isUpgrading ? 'Upgrading...' : 'Upgrade to PoA Validator Manager'}
                </button>
            </div>
        </div>
    );
}
