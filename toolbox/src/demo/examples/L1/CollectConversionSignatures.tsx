"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { networkIDs } from "@avalabs/avalanchejs";
import { Button } from "../../../components/button";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";
import { Container } from "../../../components/container";
import { Input } from "../../../components/input";
import { ResultField } from "../../../components/result-field";

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
            console.error("Conversion error:", error);
            showBoundary(error);
        } finally {
            setIsConverting(false);
        }
    }

    return (
        <Container
            title="Collect conversion signatures"
            description="This will collect signatures from the subnet validators to convert the subnet to an L1 chain."
        >
            <div className="space-y-4">
                <Input
                    label="Conversion ID"
                    value={L1ID}
                    onChange={setL1ID}
                    type="text"
                    placeholder="Enter conversion ID"
                    helperText={`Also called L1 ID. Transaction ID of the conversion transaction on the P-Chain.`}
                />
                <Button
                    variant="primary"
                    onClick={handleConvertSignatures}
                    disabled={!L1ID}
                    loading={isConverting}
                >
                    Collect Signatures
                </Button>
            </div>
            <ResultField
                label="Collected Signatures"
                value={L1ConversionSignature}
                showCheck={!!L1ConversionSignature}
            />
        </Container>
    );
};
