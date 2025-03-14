"use client";

import { useToolboxStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Button } from "../../ui";
import { Success } from "../../ui/Success";
import { createWalletClient, custom, createPublicClient } from 'viem';
import ValidatorMessagesABI from "../../../../contracts/icm-contracts/compiled/ValidatorMessages.json";

export default function DeployValidatorMessages() {
    const { showBoundary } = useErrorBoundary();
    const { validatorMessagesLibAddress, setValidatorMessagesLibAddress, getChain, evmChainId } = useToolboxStore();
    const [isDeploying, setIsDeploying] = useState(false);

    async function handleDeploy() {
        setIsDeploying(true);
        setValidatorMessagesLibAddress("");
        try {
            const publicClient = createPublicClient({
                transport: custom(window.avalanche!),
            });

            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });

            const [address] = await walletClient.requestAddresses();

            const chain = getChain();
            if (!chain) {
                throw new Error('No chain found');
            }

            const hash = await walletClient.deployContract({
                abi: ValidatorMessagesABI.abi,
                bytecode: ValidatorMessagesABI.bytecode.object as `0x${string}`,
                account: address,
                chain: chain,
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
        <div className="space-y-4">
            <h2 className="text-lg font-semibold ">Deploy Validator Messages Library</h2>
            <div className="space-y-4">
                <div className="mb-4">
                    This will deploy the <code>ValidatorMessages</code> contract to the currently connected EVM network <code>{evmChainId}</code>. <code>ValidatorMessages</code> is a library required by the <code>ValidatorManager</code> family of contracts.
                </div>
                <Button
                    type="primary"
                    onClick={handleDeploy}
                    loading={isDeploying}
                    disabled={isDeploying}
                >
                    Deploy Contract
                </Button>
            </div>
            <Success
                label="Library Address"
                value={validatorMessagesLibAddress}
            />
        </div>
    );
};

