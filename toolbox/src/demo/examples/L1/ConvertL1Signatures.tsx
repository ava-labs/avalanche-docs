import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { packL1ConversionMessage, PackL1ConversionMessageArgs } from "./convertWarp";
import { utils } from "@avalabs/avalanchejs";
import { Button, Input, InputArray } from "../../ui";
import { Success } from "../../ui/Success";

export const ConvertL1Signatures = () => {
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
    } = useExampleStore(state => state);
    const [isConverting, setIsConverting] = useState(false);

    async function handleConvertSignatures() {
        setL1ConversionSignature("");
        setIsConverting(true);
        try {
            const pChainChainID = '11111111111111111111111111111111LpoYY';

            const conversionArgs: PackL1ConversionMessageArgs = {
                subnetId: subnetID,
                managerChainID: chainID,
                managerAddress,
                validators: nodePopJsons.map(json => JSON.parse(json).result)
            };

            const [message, justification] = packL1ConversionMessage(conversionArgs, networkID, pChainChainID);

            //TODO: Has to be replaced with the glacier API
            const signResponse = await fetch('https://signature-aggregator-fuji.fly.dev/aggregate-signatures', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: utils.bufferToHex(message),
                    justification: utils.bufferToHex(justification),
                    'signing-subnet-id': subnetID,
                })
            });

            if (!signResponse.ok) {
                const errorText = await signResponse.text();
                throw new Error(errorText || `HTTP error! status: ${signResponse.status}`);
            }

            const respJson = await signResponse.json();
            const signedMessage = respJson['signed-message'];
            setL1ConversionSignature(`0x${signedMessage}`);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsConverting(false);
        }
    }

    if (!pChainAddress) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Collect conversion signatures</h2>
                <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="text-gray-700">Please get your P-Chain address first</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Collect conversion signatures</h2>
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
                <div className="text-sm text-gray-500">
                    Type in terminal: <span className="font-mono block">{`curl -X POST --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeID"}' -H "content-type:application/json;" 127.0.0.1:9650/ext/info`}</span>
                </div>
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
