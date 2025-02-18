import { ArrowRight } from "lucide-react";
import { useExampleStore } from "../../utils/store";

export default function CreateL1() {
    const { pChainAddress,
        subnetID,
        chainID,
        nodePopJsons,
        L1ID,
        L1ConversionSignature,
        validatorMessagesLibAddress,
        walletChainId,
        evmChainRpcUrl,
        validatorManagerAddress,
        evmChainId } = useExampleStore();

    // FIXME: The 'done' property should either be implemented for all steps or not implemented at all. Hidden for now.

    const steps: { id: string, title: string, description: string, done: boolean | undefined }[] = [
        {
            id: "getPChainAddress",
            title: "Get P-chain Address",
            description: "Connect your wallet and get your P-chain address to start the process.",
            done: pChainAddress !== ""
        },
        {
            id: "createSubnet",
            title: "Create Subnet",
            description: "Create a new subnet on the P-chain.",
            done: subnetID !== ""
        },
        {
            id: "createChain",
            title: "Create Chain",
            description: "Create a new chain within your subnet.",
            done: chainID !== ""
        },
        {
            id: "avalanchegoDocker",
            title: "Launch Validator Node",
            description: "Set up an Avalanchego node in Docker to get proof of possession.",
            done: nodePopJsons.length > 0
        },
        {
            id: "convertToL1",
            title: "Convert to L1",
            description: "Convert your subnet to an L1 chain.",
            done: L1ID !== ""
        },
        {
            id: "collectConversionSignatures",
            title: "Collect Signatures",
            description: "Collect conversion signatures from validators.",
            done: L1ConversionSignature !== ""
        },
        {
            id: "rpcUrlForChain",
            title: "Build RPC URL",
            description: "Create the RPC URL for your new chain.",
            done: evmChainRpcUrl !== ""
        },
        {
            id: "switchChain",
            title: "Switch Chain",
            description: "Connect to your new L1 chain using the RPC URL.",
            done: walletChainId === evmChainId
        },
        {
            id: "deployValidatorMessages",
            title: "Deploy Validator Messages",
            description: "Deploy the validator messages library contract.",
            done: validatorMessagesLibAddress !== ""
        },
        {
            id: "deployValidatorManager",
            title: "Deploy Validator Manager",
            description: "Deploy the validator manager contract.",
            done: validatorManagerAddress !== ""
        },
        {
            id: "upgradeProxy",
            title: "Upgrade Proxy",
            description: "Point the proxy to the validator manager.",
            done: undefined
        },
        {
            id: "initialize",
            title: "Initialize",
            description: "Initialize the validator manager contract.",
            done: undefined
        },
        {
            id: "initValidatorSet",
            title: "Initialize Validator Set",
            description: "Initialize the validator set.",
            done: undefined
        }
    ];

    const handleStepClick = (stepId: string) => {
        window.location.hash = stepId;
    };


    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Create L1 Guide</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    This guide will walk you through manual L1 creation step by step. You will need a VM with a static IPv4 address
                    with ports 443, 9651, and 9653 open.
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer`}
                        onClick={() => handleStepClick(step.id)}
                    >
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className={`text-base font-medium text-gray-900 dark:text-gray-100`}>{step.title}</h3>
                                <p className={`mt-1 text-sm text-gray-500 dark:text-gray-400`}>{step.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/*

This guide will walk you through manual L1 creation step by step. You will need a vm with a static IPv4 address, for example from AWS or DigitalOcean with ports 443, 9651 and 9653 open.  

0. Connect your wallet and get your P-chain address
1. Create a new subnet
2. Create a new chain 
3. launch a validator node (link to Avalanchego in Docker) to get a proof of possesion
4. Convert Subnet to L1
5. Collect conversion signatures
6. Launch an RPC node. 
7. Build an RPC URL, copy it
8. Switch Chain. Use the RPC URL you copied. 
9. Deploy a validator messages library
10. Deploy a validator manager
11. Upgrade the proxy to point to the validator manager
12. Initialize the validator manager contract

*/
