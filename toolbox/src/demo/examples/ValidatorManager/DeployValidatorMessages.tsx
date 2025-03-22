"use client";

import { useToolboxStore, useViemChainStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Button } from "../../../components/button";
import { ResultField } from "../../../components/result-field";
import ValidatorMessagesABI from "../../../../contracts/icm-contracts/compiled/ValidatorMessages.json";
import { RequireChainL1 } from "../../ui/RequireChain";
import { Container } from "../../../components/container";

export default function DeployValidatorMessages() {
    const { showBoundary } = useErrorBoundary();
    const { validatorMessagesLibAddress, setValidatorMessagesLibAddress } = useToolboxStore();
    const { walletChainId, coreWalletClient, publicClient } = useWalletStore();
    const [isDeploying, setIsDeploying] = useState(false);
    const viemChain = useViemChainStore();

    async function handleDeploy() {
        setIsDeploying(true);
        setValidatorMessagesLibAddress("");
        try {
            const hash = await coreWalletClient.deployContract({
                abi: ValidatorMessagesABI.abi,
                bytecode: ValidatorMessagesABI.bytecode.object as `0x${string}`,
                chain: viemChain,
            });

            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (!receipt.contractAddress) {
                throw new Error('No contract address in receipt');
            }

            setValidatorMessagesLibAddress(receipt.contractAddress);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsDeploying(false);
        }
    }


    return (
        <RequireChainL1>
            <Container
                title="Deploy Validator Messages Library"
                description="This will deploy the ValidatorMessages contract to the currently connected EVM network."
            >
                <div className="space-y-4">
                    <div className="mb-4">
                        This will deploy the <code>ValidatorMessages</code> contract to the currently connected EVM network <code>{walletChainId}</code>. <code>ValidatorMessages</code> is a library required by the <code>ValidatorManager</code> family of contracts.
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleDeploy}
                        loading={isDeploying}
                        disabled={isDeploying}
                    >
                        Deploy Contract
                    </Button>
                </div>
                <ResultField
                    label="Library Address"
                    value={validatorMessagesLibAddress}
                    showCheck={!!validatorMessagesLibAddress}
                />
            </Container>
        </RequireChainL1>
    );
};

