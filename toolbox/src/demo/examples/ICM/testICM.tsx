import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { Button } from "../../ui";
import { createWalletClient, custom, createPublicClient } from 'viem';
import ICMSenderReceiverABI from "../../../../contracts/example-contracts/compiled/ICMSenderReceiver.json";

export default function TestICM() {
    const { showBoundary } = useErrorBoundary();
    const { icmSenderReceiverAddress } = useExampleStore();
    const [isSending, setIsSending] = useState(false);
    const [destinationBlockchainID, setDestinationBlockchainID] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [message, setMessage] = useState("");

    async function handleSend() {
        if (!icmSenderReceiverAddress) {
            alert("Please deploy the ICM contract first");
            return;
        }

        setIsSending(true);
        try {
            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });

            const [address] = await walletClient.requestAddresses();

            await walletClient.writeContract({
                address: icmSenderReceiverAddress as `0x${string}`,
                abi: ICMSenderReceiverABI.abi,
                functionName: 'sendMessage',
                args: [
                    destinationBlockchainID as `0x${string}`,
                    destinationAddress as `0x${string}`,
                    message
                ],
                account: address,
                chain: null,
            });

            setMessage("");
            alert("Message sent successfully!");
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Send ICM Message</h2>
            <div className="space-y-4">
                {!icmSenderReceiverAddress && (
                    <div className="text-red-500">
                        Please deploy the ICM contract first
                    </div>
                )}
                <div className="space-y-2">
                    <label className="block">
                        Destination Blockchain ID (hex):
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={destinationBlockchainID}
                            onChange={(e) => setDestinationBlockchainID(e.target.value)}
                            placeholder="0x..."
                        />
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block">
                        Destination Address:
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={destinationAddress}
                            onChange={(e) => setDestinationAddress(e.target.value)}
                            placeholder="0x..."
                        />
                    </label>
                </div>
                <div className="space-y-2">
                    <label className="block">
                        Message:
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                        />
                    </label>
                </div>
                <Button
                    type="primary"
                    onClick={handleSend}
                    loading={isSending}
                    disabled={isSending || !icmSenderReceiverAddress || !destinationBlockchainID || !destinationAddress || !message}
                >
                    Send Message
                </Button>
            </div>
        </div>
    );
}
