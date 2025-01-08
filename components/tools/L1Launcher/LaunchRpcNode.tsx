import { useState } from 'react';
import { useWizardStore } from './store';
import NextPrev from './ui/NextPrev';
import Note from './ui/Note';
import { CONTAINER_VERSION } from './constants';

const dockerCommand = (subnetID: string, chainID: string) => `mkdir -p ~/.avalanchego_rpc/staking; docker run -it -d \\
  --name avalanchego_rpc \\
  --network host \\
  -v ~/.avalanchego_rpc/:/home/avalanche/.avalanchego \\
  -e AVALANCHEGO_NETWORK_ID=fuji \\
  -e AVALANCHEGO_PARTIAL_SYNC_PRIMARY_NETWORK=true \\
  -e AVALANCHEGO_TRACK_SUBNETS=${subnetID} \\
  -e AVALANCHEGO_HTTP_PORT=8080 \\
  -e AVALANCHEGO_STAKING_PORT=9653 \\
  -e AVALANCHEGO_HTTP_ALLOWED_HOSTS="*" \\
  -e AVALANCHEGO_HTTP_HOST=0.0.0.0 \\
  -e EASY_AVALANCHEGO_EVM_DEBUG_${chainID}=true \\
  -e AVALANCHEGO_PUBLIC_IP_RESOLUTION_SERVICE=ifconfigme \\
  -e HOME=/home/avalanche \\
  --user $(id -u):$(id -g) \\
  containerman17/easy-avalanchego:${CONTAINER_VERSION}`;

export default function LaunchRpcNode() {
    const { subnetId, chainId, evmChainId } = useWizardStore();
    const [isRpcLaunched, setIsRpcLaunched] = useState(false);

    return (
        <>
            <h1 className="text-2xl font-medium mb-6">Launch RPC Node</h1>

            <h3 className="mb-4 font-medium">Run this command on your RPC node:</h3>
            <pre className="bg-gray-100 p-4 rounded-md mb-4">{dockerCommand(subnetId, chainId)}</pre>


            <p className="mb-4">
                This command launches an AvalancheGo node configured as an RPC node. It changes the RPC port to <code>8080</code> and the P2P port to <code>9653</code> to avoid conflicts with your validator node. You can run this on the same machine as one of your validator nodes or even on your local computer for easier access from a wallet.
            </p>

            <h3 className="mb-4 font-medium">Verify the RPC node is running:</h3>
            <pre className="bg-gray-100 p-4 rounded-md mb-4">
                {`curl -X POST --data '{ 
  "jsonrpc":"2.0", "method":"eth_chainId", "params":[], "id":1 
}' -H 'content-type:application/json;' \\
http://127.0.0.1:8080/ext/bc/${chainId}/rpc`}
            </pre>

            <Note>
                Replace <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">127.0.0.1</code> with your RPC node's IP address if you're checking from a different machine.
            </Note>

            <p className="mb-4">
                You should receive a response similar to:
            </p>

            <pre className="bg-gray-100 p-4 rounded-md mb-4">
                {`{"jsonrpc":"2.0","id":1,"result":"0x${evmChainId.toString(16)}"}`}
            </pre>

            <Note>
                <code className="font-mono bg-blue-100 px-1 py-0.5 rounded">0x{evmChainId.toString(16)}</code> is the hex representation of your EVM chain ID <code>{evmChainId}</code>. Also check that port 8080 is open on your RPC node.
            </Note>

            <div className="mb-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rpcLaunchedConfirm"
                        checked={isRpcLaunched}
                        onChange={(e) => setIsRpcLaunched(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="rpcLaunchedConfirm" className="ml-2">
                        I confirm the RPC node is running and returning the expected chain ID
                    </label>
                </div>
                <p className="text-sm text-gray-500 pl-6">Click this to continue</p>
            </div>

            <NextPrev nextDisabled={!isRpcLaunched} currentStepName="launch-rpc-node" />
        </>
    );
}
