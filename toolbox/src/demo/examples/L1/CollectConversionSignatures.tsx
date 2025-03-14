"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { packL1ConversionMessage, PackL1ConversionMessageArgs } from "./convertWarp";
import { networkIDs, utils } from "@avalabs/avalanchejs";
import { Button, Input, InputArray } from "../../ui";
import { Success } from "../../ui/Success";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";
import getConversionDataFromTx from "./getConversionDataFromTx";

export default function CollectConversionSignatures() {
    const { showBoundary } = useErrorBoundary();
    const {
        subnetID,
        L1ConversionSignature,
        setL1ConversionSignature,
        L1ID,
        setL1ID,
    } = useToolboxStore(state => state);
    const { coreWalletClient } = useWalletStore();
    const [isConverting, setIsConverting] = useState(false);

    useEffect(() => {
        getConversionDataFromTx(L1ID, true);
    }, []);


    async function handleConvertSignatures() {
        setL1ConversionSignature("");
        setIsConverting(true);

        try {
            const isTestnet = await coreWalletClient!.isTestnet();
            const networkID = isTestnet ? networkIDs.FujiID : networkIDs.MainnetID;

            const { conversionArgs, blockchainID } = await getConversionDataFromTx(L1ID, isTestnet);

            const [message, justification] = packL1ConversionMessage(conversionArgs, networkID, blockchainID);

            const { signedMessage } = await new AvaCloudSDK().data.signatureAggregator.aggregateSignatures({
                network: isTestnet ? "fuji" : "mainnet",
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
