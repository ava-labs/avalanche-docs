import { Label } from '@radix-ui/react-label';
import { useL1ManagerWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getWalletAddress } from '@/components/tools/common/utils/wallet';

const DEFAULT_PROXY_ADDRESS = "0x0feedc0de0000000000000000000000000000000";

const getEndpoints = (rpcUrl: string) => {
    // Parse the URL to handle query parameters
    const url = new URL(rpcUrl);
    const baseUrl = url.origin + url.pathname.split('/ext/bc/')[0];
    const queryParams = url.search;
    
    console.log('Base URL:', baseUrl);
    
    return {
        platform: `${baseUrl}/ext/bc/P${queryParams}`,
        info: `${baseUrl}/ext/info${queryParams}`,
        validators: rpcUrl.replace('/rpc', '/validators')
    };
};

const checkEndpoint = async (url: string) => {
    try {
        console.log('Checking endpoint:', url);
        
        // Different request body based on endpoint type
        let requestBody;
        if (url.includes('/ext/bc/P')) {
            requestBody = {
                jsonrpc: "2.0",
                method: "platform.getHeight",
                params: {},
                id: 1
            };
        } else if (url.includes('/ext/info')) {
            requestBody = {
                jsonrpc: "2.0",
                method: "info.getNetworkName",
                params: {},
                id: 1
            };
        } else if (url.includes('/validators')) {
            requestBody = {
                jsonrpc: "2.0",
                method: "validators.getCurrentValidators",
                params: {
                    nodeIDs: []
                },
                id: 1
            };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status, 'for', url);
        const data = await response.json();
        
        if (data.error) {
            console.error('API Error:', data.error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error checking endpoint:', url, error);
        return false;
    }
};

async function rpcRequest(rpcUrl: string, method: string, params: any) {
    const url = new URL(rpcUrl);
    const baseUrl = url.origin + url.pathname.split('/ext/bc/')[0];
    const queryParams = url.search;
    const infoUrl = `${baseUrl}/ext/info${queryParams}`;
    
    const response = await fetch(infoUrl, {
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
        } catch (e) {
            console.warn('Failed to get node IP or ID', e);
        }

        return peers;
    } catch (error) {
        console.error('Error collecting peers:', error);
        return null;
    }
}

export default function ChainParameters() {
    const { 
        rpcUrl,
        setRpcUrl,
        setEvmChainId,
        evmChainId,
        tokenSymbol,
        setTokenSymbol,
        transparentProxyAddress,
        setTransparentProxyAddress,
        l1Name,
        setL1Name,
        setPoaOwnerAddress,
        goToNextStep,
        goToPreviousStep
    } = useL1ManagerWizardStore();

    useEffect(() => {
        if (!transparentProxyAddress) {
            setTransparentProxyAddress(DEFAULT_PROXY_ADDRESS);
        }
    }, []);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [endpointStatus, setEndpointStatus] = useState({
        platform: false,
        info: false,
        validators: false,
        peers: false
    });
    const [showWallet, setShowWallet] = useState(false);
    const [walletError, setWalletError] = useState<string | null>(null);
    const [balanceInfo, setBalanceInfo] = useState<{ address: string; balance: number } | null>(null);
    const [isWalletAdded, setIsWalletAdded] = useState(false);

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const isValidAddress = (address: string) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    const fetchChainConfig = async () => {
        if (!isValidUrl(rpcUrl)) return;
        
        setIsLoading(true);
        setError("");
        setShowWallet(false);
        
        try {
            // First validate the endpoints
            const endpoints = getEndpoints(rpcUrl);
            console.log('Generated endpoints:', endpoints);
            
            const [platformOk, infoOk, validatorsOk] = await Promise.all([
                checkEndpoint(endpoints.platform),
                checkEndpoint(endpoints.info),
                checkEndpoint(endpoints.validators)
            ]);

            // Check peers
            const peers = await collectPeers(rpcUrl);
            const peersOk = peers !== null && peers.length > 0;
            
            console.log('Endpoint check results:', {
                platform: platformOk,
                info: infoOk,
                validators: validatorsOk,
                peers: peersOk
            });
            
            setEndpointStatus({
                platform: platformOk,
                info: infoOk,
                validators: validatorsOk,
                peers: peersOk
            });

            if (!platformOk || !infoOk || !validatorsOk || !peersOk) {
                const failedEndpoints = [
                    !platformOk && 'Platform Chain API',
                    !infoOk && 'Info API',
                    !validatorsOk && 'Validators API',
                    !peersOk && 'Network Peers'
                ].filter(Boolean);
                
                throw new Error(`The following endpoints are not accessible: ${failedEndpoints.join(', ')}`);
            }

            // Then proceed with chain config fetch
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getChainConfig',
                    params: [],
                    id: 1
                })
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }

            if (data.result && data.result.chainId) {
                setEvmChainId(Number(data.result.chainId));
                
                // Try to get chain name using eth_chainId
                try {
                    const chainIdResponse = await fetch(rpcUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'eth_chainId',
                            params: [],
                            id: 1
                        })
                    });
                    
                    const chainIdData = await chainIdResponse.json();
                    if (chainIdData.result) {
                        const chainIdHex = chainIdData.result;
                        const chainIdNum = parseInt(chainIdHex, 16);
                        setL1Name(`L1 ${chainIdNum}`);
                    }
                } catch (chainErr) {
                    console.error("Error fetching chain name:", chainErr);
                    setL1Name("My L1");
                }
                
                setError("");
                setShowWallet(true);
            } else {
                throw new Error("Chain ID not found in response");
            }
        } catch (err) {
            console.error("Error:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch chain configuration");
            setEvmChainId(0);
            setShowWallet(false);
        } finally {
            setIsLoading(false);
        }
    };

    const checkAccountBalance = async (): Promise<{ address: string; balance: number } | null> => {
        try {
            const account = await getWalletAddress()
            const response = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'eth_getBalance',
                    params: [account, 'latest'],
                    id: 1,
                }),
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            const balance = parseInt(data.result, 16) / 1e18;
            if (balance === 0) {
                throw new Error(`Connected account ${account} balance is zero. Please fund your account to proceed.`);
            }

            setWalletError(null);
            return { address: account, balance };
        } catch (error: any) {
            console.error('Balance check failed:', error);
            setWalletError(error.message);
            return null;
        }
    };

    const handleAddToWallet = async () => {
        try {
            setWalletError(null);
            if (!window.ethereum) {
                throw new Error('No wallet detected');
            }

            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: `0x${evmChainId.toString(16)}`,
                    chainName: l1Name,
                    nativeCurrency: {
                        name: tokenSymbol,
                        symbol: tokenSymbol,
                        decimals: 18
                    },
                    rpcUrls: [rpcUrl],
                }],
            });

            const balanceInfo = await checkAccountBalance();
            if (balanceInfo) {
                setPoaOwnerAddress(balanceInfo.address);
                setIsWalletAdded(true);
                setBalanceInfo(balanceInfo);
            }
        } catch (error: any) {
            console.error('Failed to add to wallet:', error);
            setWalletError(error.message);
            setIsWalletAdded(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium dark:text-white">Chain Configuration</h1>
            </div>

            <div className="space-y-6">
                <div>
                    <Label className="dark:text-gray-200">Developer RPC URL</Label>
                    <div className="flex gap-2 mt-1.5">
                        <Input 
                            type='text' 
                            value={rpcUrl} 
                            onChange={(e) => setRpcUrl(e.target.value)}
                            placeholder="https://example.com/ext/bc/<BlockchainID>/rpc"
                            disabled={isLoading}
                        />
                        <button
                            onClick={fetchChainConfig}
                            disabled={!isValidUrl(rpcUrl) || isLoading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed min-w-[100px]"
                        >
                            {isLoading ? "Loading..." : "Load"}
                        </button>
                    </div>
                    
                    {rpcUrl && isValidUrl(rpcUrl) && (endpointStatus.platform || endpointStatus.info || endpointStatus.validators || endpointStatus.peers) && (
                        <div className="mt-3 space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Endpoint Status:</h3>
                            <div className="flex items-center gap-2 text-sm">
                                {endpointStatus.platform ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className={endpointStatus.platform ? "text-green-700" : "text-red-700"}>
                                    Platform Chain API
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                {endpointStatus.info ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className={endpointStatus.info ? "text-green-700" : "text-red-700"}>
                                    Info API
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                {endpointStatus.validators ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className={endpointStatus.validators ? "text-green-700" : "text-red-700"}>
                                    Validators API
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                {endpointStatus.peers ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className={endpointStatus.peers ? "text-green-700" : "text-red-700"}>
                                    Network Peers
                                </span>
                            </div>
                        </div>
                    )}

                    {rpcUrl && !isValidUrl(rpcUrl) && (
                        <p className="mt-2 text-sm text-red-500">
                            Please enter a valid URL.
                        </p>
                    )}
                    {error && (
                        <p className="mt-2 text-sm text-red-500">
                            {error}
                        </p>
                    )}
                    <div className="flex items-start gap-2 mt-2 text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                        <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                            Enter the Developer RPC endpoint URL of your L1. The endpoint must have access to P-Chain and Subnet-EVM API for validator management (<a href="https://docs.avax.network/api-reference/subnet-evm-api#validators_getcurrentvalidators" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">see documentation</a>).
                        </span>
                    </div>
                </div>

                {evmChainId !== 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div>
                                <Label className="dark:text-gray-200">L1 Name</Label>
                                <Input 
                                    type='text' 
                                    value={l1Name} 
                                    onChange={(e) => setL1Name(e.target.value)}
                                    placeholder="My L1"
                                    className="mt-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Enter the name for your existing L1.
                                </p>
                            </div>

                            <div>
                                <Label className="dark:text-gray-200">Chain ID</Label>
                                <div className="mt-1.5 text-sm font-mono bg-white dark:bg-gray-700 p-2.5 rounded border border-gray-200 dark:border-gray-600 dark:text-white">
                                    {evmChainId}
                                </div>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Automatically detected from RPC endpoint.
                                </p>
                            </div>

                            <div>
                                <Label className="dark:text-gray-200">Native Token Symbol</Label>
                                <Input 
                                    type='text' 
                                    value={tokenSymbol} 
                                    onChange={(e) => setTokenSymbol(e.target.value)}
                                    placeholder="TEST"
                                    className="mt-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Enter the symbol for your L1's native token.
                                </p>
                            </div>

                            <div>
                                <Label className="dark:text-gray-200">Validator Manager Proxy Contract Address</Label>
                                <Input 
                                    type='text' 
                                    value={transparentProxyAddress} 
                                    onChange={(e) => setTransparentProxyAddress(e.target.value)}
                                    placeholder={DEFAULT_PROXY_ADDRESS}
                                    className="mt-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                {transparentProxyAddress && !isValidAddress(transparentProxyAddress) && (
                                    <p className="mt-2 text-sm text-red-500">
                                        Please enter a valid Ethereum address.
                                    </p>
                                )}
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Enter the address of the transparent proxy contract. Learn more about the proxy contract in the <a href="https://build.avax.network/docs/avalanche-l1s/validator-manager/contract" target="_blank" className="text-blue-500 dark:text-blue-400 hover:underline">documentation</a>.
                                </p>
                            </div>
                        </div>

                        {showWallet && (
                            <div className="mt-8 border-t dark:border-gray-700 pt-8">
                                <div className="mb-6">
                                    <button
                                        onClick={handleAddToWallet}
                                        disabled={isWalletAdded}
                                        className={`
                                            w-full p-3 rounded-md transition-all duration-200 transform
                                            ${isWalletAdded
                                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg active:shadow-md'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            {isWalletAdded ? (
                                                <>
                                                    Added to Wallet
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </>
                                            ) : (
                                                <>
                                                    Add to Wallet
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>

                                {walletError && (
                                    <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg mb-6">
                                        <h3 className="font-medium mb-2 text-red-700 dark:text-red-400">Wallet Error</h3>
                                        <p className="text-red-600 dark:text-red-300">{walletError}</p>
                                    </div>
                                )}

                                {isWalletAdded && balanceInfo && (
                                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg mb-6">
                                        <h3 className="font-medium mb-2 dark:text-green-400">Wallet Added Successfully</h3>
                                        <p className="dark:text-gray-300">
                                            Balance of account <span className="font-mono">{balanceInfo.address}</span> is{' '}
                                            <span className="font-bold">{balanceInfo.balance.toFixed(4)} {tokenSymbol}</span>.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            <NextPrev 
                nextDisabled={
                    !isValidUrl(rpcUrl) || 
                    !evmChainId || 
                    !l1Name ||
                    !tokenSymbol || 
                    !transparentProxyAddress || 
                    !isValidAddress(transparentProxyAddress) ||
                    !endpointStatus.platform ||
                    !endpointStatus.info ||
                    !endpointStatus.validators ||
                    !endpointStatus.peers ||
                    !isWalletAdded || 
                    !!walletError
                } 
                onNext={goToNextStep} onPrev={goToPreviousStep}
            />
        </div>
    );
}