import { useL1LauncherWizardStore } from '../config/store';
import NextPrev from "@/components/tools/common/ui/NextPrev";
import Note from '@/components/tools/common/ui/Note';
import Pre from '@/components/tools/common/ui/Pre';
import { Button } from '@/components/ui/button';
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
    <ul className="mb-4 items-center w-full text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:flex">
        <li className="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r last:border-r-0">
            <div className="flex items-center ps-3">
                <input
                    id="location-local"
                    type="radio"
                    disabled={nodesCount !== 1}
                    checked={value === 'local'}
                    onChange={() => onChange('local')}
                    name="location-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-0"
                />
                <label htmlFor="location-local" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Running locally (or port forwarding)
                    {nodesCount !== 1 && (
                        <span className="ms-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-0"
                />
                <label htmlFor="location-remote" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-100">
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
    <ul className="mb-4 items-center w-full text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:flex">
        <li className="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input
                    id="domain-yes"
                    type="radio"
                    checked={value === 'has-domain'}
                    onChange={() => onChange('has-domain')}
                    name="domain-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-0"
                />
                <label htmlFor="domain-yes" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    I have a domain
                </label>
            </div>
        </li>
        <li className="w-full border-b border-gray-200 dark:border-gray-700 sm:border-b-0 sm:border-r">
            <div className="flex items-center ps-3">
                <input
                    id="domain-no"
                    type="radio"
                    checked={value === 'no-domain'}
                    onChange={() => onChange('no-domain')}
                    name="domain-type"
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-0"
                />
                <label htmlFor="domain-no" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-100">
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
                    className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-0"
                />
                <label htmlFor="manual-ssl" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-100">
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

            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (jsonError) {
                throw new Error(`Unexpected response format: ${responseText.slice(0, 100)}`);
            }

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

            let errorMessage = error instanceof Error ? error.message : 'Failed to connect to RPC endpoint. Please check your configuration.';
            setErrorMessage(errorMessage);
            setStatus('error');
        }
    };

    return (
        <div className="mb-6">
            <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-100">Verify your setup:</h3>
            <div className="mb-4">
                <p className="mb-2 text-gray-800 dark:text-gray-200">Test your endpoint:</p>
                <div className="flex items-center gap-2 mb-2">
                    <code className="flex-grow bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-mono">
                        {endpoint}
                    </code>
                    <Button
                        onClick={testRpcEndpoint}
                        disabled={status === 'loading'}
                        variant={status === 'loading' ? 'secondary' : 'default'}
                    >
                        {status === 'loading' ? 'Testing...' : 'Test'}
                    </Button>
                </div>
            </div>

            {status === 'error' && (
                <div className="mb-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-3 rounded">
                    {errorMessage}
                </div>
            )}

            {status === 'success' && (
                <div className="mb-4 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 p-3 rounded">
                    Successfully connected to RPC endpoint!
                </div>
            )}

            <p className="mb-4 text-gray-800 dark:text-gray-200">
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
        evmChainId,
        goToNextStep,
        goToPreviousStep
    } = useL1LauncherWizardStore();


    const isAddressValid = () => {
        if (rpcDomainType === 'no-domain') {
            return isValidIP(rpcAddress);
        }
        return isValidDomain(rpcAddress);
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-medium mb-4">Configure Access to your RPC Node</h1>
                <p>In this step we will configure the access to the RPC nodes. If necessary, we will launch a reverse proxy using Docker.</p>
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
                        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                            {rpcDomainType === 'no-domain' ? 'Server IP Address:' : 'Domain Name:'}
                        </label>
                        {rpcDomainType === 'manual-ssl' && (
                            <div className="mb-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                                <p className="mb-2 font-medium text-gray-900 dark:text-gray-100">Configure your reverse proxy:</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Make sure your SSL-enabled reverse proxy forwards port 443 to <code className="font-mono bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded text-blue-900 dark:text-blue-200">localhost:8080</code>
                                </p>
                            </div>
                        )}
                        {rpcDomainType === 'no-domain' && (
                            <div className="mb-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                                <p className="mb-2 font-medium text-gray-900 dark:text-gray-100">Get your server's public IP:</p>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-2 text-gray-900 dark:text-gray-100 font-mono">curl checkip.amazonaws.com</pre>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Run this command on your RPC server and paste the result below</p>
                            </div>
                        )}
                        <input
                            type="text"
                            value={rpcAddress}
                            onChange={(e) => setRpcAddress(e.target.value)}
                            placeholder={rpcDomainType === 'no-domain' ? '123.45.67.89' : 'example.com'}
                            className={`w-full p-2 border rounded-md ${rpcAddress && !isAddressValid()
                                ? 'border-red-500 text-red-500 dark:text-red-400'
                                : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900'
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
                            <Note className="mt-4">
                                We'll use nip.io service to create a domain-like address: <code className="bg-blue-100 dark:bg-blue-800 px-1 py-0.5 rounded text-blue-900 dark:text-blue-200">{`${rpcAddress}.nip.io`}</code>
                            </Note>
                        )}

                        {rpcAddress && isAddressValid() && rpcDomainType !== 'manual-ssl' && (
                            <>
                                <h3 className="mt-6 mb-4 font-medium text-gray-900 dark:text-gray-100">Set up HTTPS proxy:</h3>
                                <Pre>{caddyDockerCommand(rpcDomainType === 'no-domain' ? `${rpcAddress}.nip.io` : rpcAddress)}</Pre>
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
                onNext={goToNextStep} onPrev={goToPreviousStep}
            />
        </div>
    );
}
