"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { networkIDs } from "@avalabs/avalanchejs";
import { Button, Input } from "../../ui";
import { Success } from "../../ui/Success";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";

export default function CollectConversionSignatures() {
    const { showBoundary } = useErrorBoundary();
    const {
        L1ConversionSignature,
        setL1ConversionSignature,
        L1ID,
        setL1ID,
    } = useToolboxStore(state => state);
    const { coreWalletClient } = useWalletStore();
    const [isConverting, setIsConverting] = useState(false);


    async function handleConvertSignatures() {
        setL1ConversionSignature("");
        setIsConverting(true);

        try {
            const { message, justification, signingSubnetId, networkId } = await coreWalletClient.extractWarpMessageFromPChainTx({ txId: L1ID });

            const { signedMessage } = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
                network: networkId === networkIDs.FujiID ? "fuji" : "mainnet",
                signatureAggregatorRequest: {
                    message: message,
                    justification: justification,
                    signingSubnetId: signingSubnetId,
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
                    label="Conversion ID"
                    value={L1ID}
                    onChange={setL1ID}
                    type="text"
                    placeholder="Enter conversion ID"
                    notes={`Also called L1 ID. Transaction ID of the conversion transaction on the P-Chain.`}
                />
                <Button
                    type="primary"
                    onClick={handleConvertSignatures}
                    disabled={!L1ID}
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
