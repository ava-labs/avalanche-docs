const dockerCommand = `mkdir -p ~/.avalanchego/staking; docker run -it -d \\
  --name avago \\
  --network host \\
  -v ~/.avalanchego:/home/avalanche/.avalanchego \\
  -e AVAGO_NETWORK_ID=fuji \\
  -e AVAGO_PARTIAL_SYNC_PRIMARY_NETWORK=true \\
  -e HOME=/home/avalanche \\
  --user $(id -u):$(id -g) \\
  avaplatform/subnet-evm:${CONTAINER_VERSION}`

const popRequest = `curl -X POST --data '{ 
    "jsonrpc":"2.0", 
    "id"     :1, 
    "method" :"info.getNodeID" 
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info`

const stopScript = `docker stop avago; docker rm avago`

import { useState } from 'react';
import { CONTAINER_VERSION } from '../constants';
import { useWizardStore } from '../store';
import NextPrev from '../ui/NextPrev';
import Pre from '../ui/Pre';
import TextArea from '../ui/TextArea';

const validateNodePop = (json: string): boolean => {
    try {
        const parsed = JSON.parse(json);
        if (!parsed.result?.nodeID || !parsed.result?.nodePOP?.publicKey || !parsed.result?.nodePOP?.proofOfPossession) {
            return false;
        }

        // Validate nodeID is base58
        const base58Regex = /^NodeID-[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
        if (!base58Regex.test(parsed.result.nodeID)) {
            return false;
        }

        // Validate publicKey and proofOfPossession are hex strings
        const hexRegex = /^0x[0-9a-fA-F]+$/;
        if (!hexRegex.test(parsed.result.nodePOP.publicKey) || !hexRegex.test(parsed.result.nodePOP.proofOfPossession)) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
};

export default function GenerateKeys() {
    const { nodePopJsons, setNodePopJsons, nodesCount } = useWizardStore();
    const [errors, setErrors] = useState<string[]>(Array(nodesCount).fill(''));
    const [nodesRemovedAfterKeyGeneration, setNodesRemovedAfterKeyGeneration] = useState(false);

    const handleNodePopChange = (index: number, value: string) => {
        const newJsons = [...nodePopJsons];
        newJsons[index] = value;
        setNodePopJsons(newJsons);

        const newErrors = [...errors];
        if (value) {
            if (!validateNodePop(value)) {
                newErrors[index] = 'Invalid JSON format. Must contain nodeID and nodePOP fields';
            } else {
                newErrors[index] = '';
            }
        } else {
            newErrors[index] = '';
        }
        setErrors(newErrors);
    };

    return <>
        <h1 className="text-2xl font-medium mb-6">Generate Keys</h1>

        <p className="mb-4">
            For creating the L1, we need to know the node IDs, the BLS public keys and the proof of possession (POP) of the nodes. To generate the keys for the nodes, we will briefly start the nodes and request the keys from them. Afterwards, we will immediately stop the nodes.
        </p>

        <h3 className="mb-4 font-medium">Run this on {nodesCount === 1 ? "the" : "every"} node:</h3>
        <Pre>{dockerCommand}</Pre>
        <p className="mb-4">
            This runs an avalanchego node in docker. The node, while starting, generates its own keys if they are not present.
            You can find them at <code>~/.avalanchego/staking/</code> in your local system.
        </p>

        <h3 className="mb-4 font-medium">Request node credentials:</h3>
        <Pre>{popRequest}</Pre>

        <p className="mb-4">The response will contain fields <code>nodeID</code> and <code>nodePOP</code> (proof of possession). We will need them to convert the Subnet to an L1.</p>

        <h3 className="mb-4 font-medium">Paste the node credentials for each node:</h3>
        {Array.from({ length: nodesCount }).map((_, index) => (
            <div key={index} className="mb-4">
                <label className="block mb-2">
                    Node {index + 1} Credentials:
                </label>
                <div className="relative">
                    <TextArea
                        isValid={!!nodePopJsons[index] && !errors[index]}
                        rows={8}
                        value={nodePopJsons[index] || ''}
                        onChange={(e) => handleNodePopChange(index, e.target.value)}
                        placeholder={`{"jsonrpc":"2.0","result":{"nodeID":"NodeID-....","nodePOP":{"publicKey":"0x...","proofOfPossession":"0x..."}},"id":1}`}
                    />
                    {nodePopJsons[index] && !errors[index] && (
                        <div className="absolute right-2 top-2 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>
                {errors[index] && (
                    <p className="text-red-500 text-sm mt-1">{errors[index]}</p>
                )}
            </div>
        ))}

        <h3 className="mb-4 font-medium">Stop and remove the nodes:</h3>
        <p className="mb-4">
            Run this command on every node:
        </p>
        <Pre>{stopScript}</Pre>

        <div className="mb-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="rpcLaunchedConfirm"
                    checked={nodesRemovedAfterKeyGeneration}
                    onChange={(e) => setNodesRemovedAfterKeyGeneration(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="rpcLaunchedConfirm" className="ml-2">
                    I confirm that I stopped {nodesCount === 1 ? "the node" : "all the nodes"} and removed container{nodesCount === 1 ? "" : "s"}
                </label>
            </div>
            <p className="text-sm text-gray-500 pl-6">Please don't forget to stop the nodes or subsequent steps will fail.</p>
        </div>

        <NextPrev
            nextDisabled={nodePopJsons.length < nodesCount || nodePopJsons.slice(0, nodesCount).some(json => !json) || errors.slice(0, nodesCount).some(error => error) || !nodesRemovedAfterKeyGeneration}
            currentStepName="generate-keys"
        />
    </>
}
