import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Button } from "../../ui";
import { Success } from "../../ui/Success";
import { createWalletClient, custom, createPublicClient } from 'viem';
import ICMSenderReceiverABI from "../../../../contracts/example-contracts/compiled/ICMSenderReceiver.json";
import KnownChainIDWarning from "../../ui/KnownChainIDWarning";

export default function DeployICMSenderRecever() {
    const { showBoundary } = useErrorBoundary();
    const { walletChainId, setIcmSenderReceiverAddress, icmSenderReceiverAddress } = useExampleStore();
    const [isDeploying, setIsDeploying] = useState(false);

    async function handleDeploy() {
        setIsDeploying(true);
        setIcmSenderReceiverAddress("");
        try {
            const publicClient = createPublicClient({
                transport: custom(window.avalanche!),
            });

            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });

            const [address] = await walletClient.requestAddresses();

            const hash = await walletClient.deployContract({
                abi: ICMSenderReceiverABI.abi,
                bytecode: ICMSenderReceiverABI.bytecode.object as `0x${string}`,
                account: address,
                chain: {
                    // The values below (except for chainID) are not important since viem only checks chainID
                    id: walletChainId,
                    name: "My L1",
                    rpcUrls: {
                        default: { http: [] },
                    },
                    nativeCurrency: {
                        name: "COIN",
                        symbol: "COIN",
                        decimals: 18,
                    },
                },
            });

            const receipt = await publicClient.waitForTransactionReceipt({ hash });

            if (!receipt.contractAddress) {
                throw new Error('No contract address in receipt');
            }

            setIcmSenderReceiverAddress(receipt.contractAddress);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsDeploying(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Deploy ICM Sender Receiver</h2>
            <div className="space-y-4">
                <div className="mb-4">
                    This will deploy the <code>ICMSenderReceiver</code> contract to the currently connected EVM network <code>{walletChainId}</code>. This contract can be used to send and receive messages between blockchains using the Inter-Chain Messaging (ICM) protocol.
                </div>
                <KnownChainIDWarning walletChainId={walletChainId} />
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
                label="ICMSenderReceiver Address"
                value={icmSenderReceiverAddress}
            />
        </div>
    );
}
