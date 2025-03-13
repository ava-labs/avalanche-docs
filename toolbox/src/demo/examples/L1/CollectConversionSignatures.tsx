"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { packL1ConversionMessage, PackL1ConversionMessageArgs } from "./convertWarp";
import { networkIDs, utils } from "@avalabs/avalanchejs";
import { Button, Input, InputArray } from "../../ui";
import { Success } from "../../ui/Success";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";

export default function CollectConversionSignatures() {
    const { showBoundary } = useErrorBoundary();
    const {
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
    } = useToolboxStore(state => state);
    const { coreWalletClient } = useWalletStore();
    const [isConverting, setIsConverting] = useState(false);

    async function handleConvertSignatures() {
        setL1ConversionSignature("");
        setIsConverting(true);

        try {
            const isTestnet = await coreWalletClient!.isTestnet();
            const networkName = isTestnet ? "fuji" : "mainnet";
            const networkID = isTestnet ? networkIDs.FujiID : networkIDs.MainnetID;

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

            const [message, justification] = packL1ConversionMessage(conversionArgs, networkID, pChainChainID);

            const { signedMessage } = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
                network: networkName,
                signatureAggregatorRequest: {
                    message: utils.bufferToHex(message),
                    justification: utils.bufferToHex(justification),
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

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold ">Collect conversion signatures</h2>
            <div className="space-y-4">
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
