import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { packL1ConversionMessage, PackL1ConversionMessageArgs } from "./convertWarp";
import { networkIDs, utils } from "@avalabs/avalanchejs";
import { Button, Input, InputArray } from "../../ui";
import { Success } from "../../ui/Success";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";
import { useEffect } from "react";
import { CodeHighlighter } from "../../ui/CodeHighlighter";
export const CollectConversionSignatures = () => {
    const { showBoundary } = useErrorBoundary();
    const {
        networkID,
        pChainAddress,
        subnetID,
        chainID,
        setSubnetID,
        setChainID,
        managerAddress,
        setManagerAddress,
        nodePopJsons,
        setNodePopJsons,
        L1ConversionSignature,
        setL1ConversionSignature,
        validatorWeights,
        setValidatorWeights,
    } = useExampleStore(state => state);
    const [isConverting, setIsConverting] = useState(false);
    const [message, setMessage] = useState("");
    const [justification, setJustification] = useState("");
    const [networkName, setNetworkName] = useState<"fuji" | "mainnet" | undefined>(undefined);
    const [sdkCallString, setSdkCallString] = useState("");


    useEffect(() => {
        if (networkID === networkIDs.MainnetID) {
            setNetworkName("mainnet");
        } else if (networkID === networkIDs.FujiID) {
            setNetworkName("fuji");
        } else {
            showBoundary(new Error("Unsupported network with ID " + networkID));
        }
    }, [networkID]);

    useEffect(() => {
        try {
            const pChainChainID = '11111111111111111111111111111111LpoYY';

            const conversionArgs: PackL1ConversionMessageArgs = {
                subnetId: subnetID,
                managerChainID: chainID,
                managerAddress,
                validators: nodePopJsons.filter(json => json !== "").map((json, i) => {
                    const { nodeID, nodePOP } = JSON.parse(json).result;
                    return {
                        nodeID,
                        nodePOP,
                        weight: validatorWeights[i]
                    }
                })
            };

            if (conversionArgs.validators.length === 0) {
                setMessage("")
                setJustification("")
                return
            }

            const [message, justification] = packL1ConversionMessage(conversionArgs, networkID, pChainChainID);

            if (networkName) {
                setMessage(utils.bufferToHex(message));
                setJustification(utils.bufferToHex(justification));
            }
        } catch (e) {
            setMessage("")
            setJustification("")
        }
    }, [networkName, subnetID, chainID, managerAddress, nodePopJsons, validatorWeights, networkID]);

    useEffect(() => {
        if (message && justification) {
            setSdkCallString(`import { AvaCloudSDK } from "https://esm.sh/@avalabs/avacloud-sdk";
const { signedMessage } = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
    network: "${networkName}",
    signatureAggregatorRequest: {
        message: "${message}",
        justification: "${justification}",
        signingSubnetId: "${subnetID}",
        quorumPercentage: 67, // Default threshold for subnet validation
    },
});`);
        } else {
            setSdkCallString("")
        }
    }, [networkName, message, justification, subnetID]);

    async function handleConvertSignatures() {
        setL1ConversionSignature("");
        setIsConverting(true);
        try {
            const { signedMessage } = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
                network: networkName,
                signatureAggregatorRequest: {
                    message: message,
                    justification: justification,
                    signingSubnetId: subnetID,
                    quorumPercentage: 67, // Default threshold for subnet validation
                },
            });

            setL1ConversionSignature(signedMessage);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsConverting(false);
        }
    }

    if (!pChainAddress) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold ">Collect conversion signatures</h2>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="">Please get your P-Chain address first</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold ">Collect conversion signatures</h2>
            <div className="space-y-4">
                <Input
                    label="Your P-Chain Address"
                    value={pChainAddress}
                    disabled={true}
                    type="text"
                />
                <Input
                    label="Subnet ID"
                    value={subnetID}
                    onChange={setSubnetID}
                    type="text"
                    placeholder="Enter subnet ID to convert"
                />
                <Input
                    label="Chain ID"
                    value={chainID}
                    onChange={setChainID}
                    type="text"
                    placeholder="Enter chain ID"
                />
                <Input
                    label="Manager Address (0x...)"
                    value={managerAddress}
                    onChange={setManagerAddress}
                    placeholder="0x..."
                    type="text"
                />
                <InputArray
                    label="Info.getNodeID responses of the initial validators"
                    values={nodePopJsons}
                    onChange={setNodePopJsons}
                    type="textarea"
                    placeholder={'{"result":{"nodeID":"NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg","nodePOP":{"publicKey":"0x...","proofOfPossession":"0x..."}}}'}
                    rows={4}
                />
                <div className="text-sm ">
                    Type in terminal: <span className="font-mono block">{`curl -X POST --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeID"}' -H "content-type:application/json;" 127.0.0.1:9650/ext/info`}</span>
                </div>
                <InputArray
                    label="Validator Weights"
                    values={validatorWeights.map(weight => weight.toString()).slice(0, nodePopJsons.length)}
                    onChange={(weightsStrings) => setValidatorWeights(weightsStrings.map(weight => parseInt(weight)))}
                    type="number"
                    disableAddRemove={true}
                />
                {sdkCallString && <div className="mb-4">
                    <div className="text-sm font-semibold">SDK Call that will be executed</div>
                    <CodeHighlighter
                        code={sdkCallString}
                        language="typescript"
                    />
                </div>}
                <Button
                    type="primary"
                    onClick={handleConvertSignatures}
                    disabled={!managerAddress || nodePopJsons.length === 0}
                    loading={isConverting}
                >
                    Collect Signatures
                </Button>
            </div>
            <Success
                label="Collected Signatures"
                value={L1ConversionSignature}
            />
        </div>
    );
};
