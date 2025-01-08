import { useWizardStore } from './store';
import NextPrev from './ui/NextPrev';
import Note from './ui/Note';
import { useState } from 'react';

type LocationType = 'local' | 'remote';
type DomainType = 'has-domain' | 'no-domain' | 'manual-ssl';
type CheckStatus = 'idle' | 'loading' | 'success' | 'error';

const LocationSelector = ({
    value,
    onChange,
    nodesCount
}: {
    value: LocationType,
    onChange: (v: LocationType) => void,
    nodesCount: number
}) => (
    <ul className="mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input
                    id="location-local"
                    type="radio"
                    disabled={nodesCount !== 1}
                    checked={value === 'local'}
                    onChange={() => onChange('local')}
                    name="location-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                />
                <label htmlFor="location-local" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    Running locally (or port forwarding)
                    {nodesCount !== 1 && (
                        <span className="ms-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Single node only
                        </span>
                    )}
                </label>
            </div>
        </li>
        <li className="w-full">
            <div className="flex items-center ps-3">
                <input
                    id="location-remote"
                    type="radio"
                    checked={value === 'remote'}
                    onChange={() => onChange('remote')}
                    name="location-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                />
                <label htmlFor="location-remote" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    Running on a remote server
                </label>
            </div>
        </li>
    </ul>
);

const DomainSelector = ({
    value,
    onChange
}: {
    value: DomainType,
    onChange: (v: DomainType) => void
}) => (
    <ul className="mb-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input
                    id="domain-yes"
                    type="radio"
                    checked={value === 'has-domain'}
                    onChange={() => onChange('has-domain')}
                    name="domain-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                />
                <label htmlFor="domain-yes" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    I have a domain
                </label>
            </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input
                    id="domain-no"
                    type="radio"
                    checked={value === 'no-domain'}
                    onChange={() => onChange('no-domain')}
                    name="domain-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                />
                <label htmlFor="domain-no" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    I don't have a domain
                </label>
            </div>
        </li>
        <li className="w-full">
            <div className="flex items-center ps-3">
                <input
                    id="manual-ssl"
                    type="radio"
                    checked={value === 'manual-ssl'}
                    onChange={() => onChange('manual-ssl')}
                    name="domain-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0"
                />
                <label htmlFor="manual-ssl" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    I'll manage SSL myself
                </label>
            </div>
        </li>
    </ul>
);

const caddyDockerCommand = (domain: string) => `docker run -d \\
  --name caddy \\
  --network host \\
  -v caddy_data:/data \\
  caddy:2.8-alpine \\
  caddy reverse-proxy --from ${domain} --to localhost:8080`;

const isValidDomain = (domain: string): boolean => {
    const pattern = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return pattern.test(domain);
};

const isValidIP = (ip: string): boolean => {
    const pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(ip);
};

const CheckRPC = ({ endpoint, onSuccess, evmChainId }: { endpoint: string, onSuccess?: () => void, evmChainId: number }) => {
    const [status, setStatus] = useState<CheckStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const testRpcEndpoint = async () => {
        setStatus('loading');
        setErrorMessage('');

        const data = {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_chainId",
            params: []
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!result.result) {
                throw new Error('Invalid response format');
            }

            const chainId = parseInt(result.result, 16);
            if (chainId !== evmChainId) {
                throw new Error(`Chain ID mismatch. Expected ${evmChainId}, got ${chainId}`);
            }

            setStatus('success');
            onSuccess?.();
        } catch (error) {
            console.error('Error testing RPC endpoint:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Failed to connect to RPC endpoint. Please check your configuration.');
            setStatus('error');
        }
    };

    return (
        <div className="mb-6">
            <h3 className="mb-4 font-medium">Verify your setup:</h3>
            <div className="mb-4">
                <p className="mb-2">Test your endpoint:</p>
                <div className="flex items-center gap-2 mb-2">
                    <code className="flex-grow bg-gray-100 px-3 py-2 rounded overflow-x-auto">
                        {endpoint}
                    </code>
                    <button
                        onClick={testRpcEndpoint}
                        disabled={status === 'loading'}
                        className={`px-4 py-2 rounded ${status === 'loading'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        {status === 'loading' ? 'Testing...' : 'Test'}
                    </button>
                </div>
            </div>

            {status === 'error' && (
                <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
                    {errorMessage}
                </div>
            )}

            {status === 'success' && (
                <div className="mb-4 text-green-600 bg-green-50 p-3 rounded">
                    Successfully connected to RPC endpoint!
                </div>
            )}

            <p className="mb-4">
                A successful test means your RPC node is properly configured and accessible.
            </p>
        </div>
    );
};

export default function OpenRPCPort() {
    const {
        nodesCount,
        rpcLocationType,
        setRpcLocationType,
        rpcDomainType,
        setRpcDomainType,
        rpcAddress,
        setRpcAddress,
        rpcVerified,
        setRpcVerified,
        getCChainRpcEndpoint,
        evmChainId
    } = useWizardStore();


    const isAddressValid = () => {
        if (rpcDomainType === 'no-domain') {
            return isValidIP(rpcAddress);
        }
        return isValidDomain(rpcAddress);
    };

    return (
        <>
            <h1 className="text-2xl font-medium mb-6">Configure RPC Access</h1>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <h3 className="font-medium mb-2">About RPC Nodes</h3>
                <p className="mb-2">
                    RPC (Remote Procedure Call) nodes allow users to access your blockchain data and send transactions. You have two main options:
                </p>
                <ul className="list-disc ml-6 mb-2">
                    <li className="mb-1">
                        <span className="font-medium">Local access:</span> Running on localhost:8080 without SSL. Simple but only you can access the chain.
                    </li>
                    <li className="mb-1">
                        <span className="font-medium">Public access:</span> Running on a domain with SSL certificates. Required for most wallets to connect.
                    </li>
                </ul>
                <p className="text-sm text-blue-600">
                    Important: Don't use your validator node as an RPC node. Your RPC node from the previous step exposes port 8080 for API access.
                </p>
            </div>

            <div className="mb-6">
                <h3 className="mb-4 font-medium">Where is your RPC node running?</h3>
                <LocationSelector
                    value={rpcLocationType}
                    onChange={setRpcLocationType}
                    nodesCount={nodesCount}
                />
            </div>

            {rpcLocationType === 'local' && (
                <div className="mb-6">
                    <p className="mb-4">Your RPC endpoint will be available at: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8080</code></p>
                </div>
            )}

            {rpcLocationType === 'remote' && (
                <>
                    <div className="mb-6">
                        <h3 className="mb-4 font-medium">Do you have a domain name?</h3>
                        <DomainSelector value={rpcDomainType} onChange={setRpcDomainType} />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            {rpcDomainType === 'no-domain' ? 'Server IP Address:' : 'Domain Name:'}
                        </label>
                        {rpcDomainType === 'manual-ssl' && (
                            <div className="mb-4 bg-gray-50 p-4 rounded-md">
                                <p className="mb-2 font-medium">Configure your reverse proxy:</p>
                                <p className="text-sm text-gray-600">
                                    Make sure your SSL-enabled reverse proxy forwards port 443 to <code className="bg-gray-100 px-2 py-1 rounded">localhost:8080</code>
                                </p>
                            </div>
                        )}
                        {rpcDomainType === 'no-domain' && (
                            <div className="mb-4 bg-gray-50 p-4 rounded-md">
                                <p className="mb-2 font-medium">Get your server's public IP:</p>
                                <pre className="bg-gray-100 p-3 rounded-md mb-2">curl checkip.amazonaws.com</pre>
                                <p className="text-sm text-gray-600">Run this command on your RPC server and paste the result below</p>
                            </div>
                        )}
                        <input
                            type="text"
                            value={rpcAddress}
                            onChange={(e) => setRpcAddress(e.target.value)}
                            placeholder={rpcDomainType === 'no-domain' ? '123.45.67.89' : 'example.com'}
                            className={`w-full p-2 border rounded-md mb-2 ${rpcAddress && !isAddressValid()
                                ? 'border-red-500 text-red-500'
                                : 'border-gray-200'
                                }`}
                        />
                        {rpcAddress && !isAddressValid() && (
                            <p className="text-red-500 text-sm mb-2">
                                {rpcDomainType === 'no-domain'
                                    ? 'Please enter a valid IP address (e.g., 123.45.67.89)'
                                    : 'Please enter a valid domain name (e.g., example.com)'}
                            </p>
                        )}

                        {rpcDomainType === 'no-domain' && rpcAddress && isAddressValid() && (
                            <Note>
                                We'll use nip.io service to create a domain-like address: <code className="bg-blue-100 px-1 py-0.5 rounded">{`${rpcAddress}.nip.io`}</code>
                            </Note>
                        )}

                        {rpcAddress && isAddressValid() && rpcDomainType !== 'manual-ssl' && (
                            <>
                                <h3 className="mt-6 mb-4 font-medium">Set up HTTPS proxy:</h3>
                                <pre className="bg-gray-100 p-4 rounded-md mb-4">
                                    {caddyDockerCommand(rpcDomainType === 'no-domain' ? `${rpcAddress}.nip.io` : rpcAddress)}
                                </pre>
                            </>
                        )}
                    </div>

                    {rpcAddress && isAddressValid() && (
                        <>
                            <CheckRPC
                                endpoint={getCChainRpcEndpoint()}
                                onSuccess={() => setRpcVerified(true)}
                                evmChainId={evmChainId}
                            />
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="verifySetup"
                                    checked={rpcVerified}
                                    onChange={(e) => setRpcVerified(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="verifySetup" className="ml-2">
                                    I confirm the RPC endpoint is accessible and returns the expected message
                                </label>
                            </div>
                        </>
                    )}
                </>
            )}

            <NextPrev
                nextDisabled={rpcLocationType === 'remote' && (!isAddressValid() || !rpcVerified)}
                currentStepName="open-rpc-port"
            />
        </>
    );
}
