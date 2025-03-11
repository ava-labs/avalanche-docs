import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useMemo } from "react";
import { Button } from "../../ui";
import { Success } from "../../ui/Success";
import { createWalletClient, custom, createPublicClient, AddEthereumChainParameter } from 'viem';
import ReceiverOnSubnetABI from "../../../../contracts/example-contracts/compiled/ReceiverOnSubnet.json";
import SenderOnCChainABI from "../../../../contracts/example-contracts/compiled/SenderOnCChain.json";
import KnownChainIDWarning from "../../ui/KnownChainIDWarning";
import { utils } from "@avalabs/avalanchejs";
import { Input } from "../../ui";
import { avalancheFuji } from "viem/chains";

const SENDER_C_CHAIN_ADDRESS = "0x2419133a23EA13EAF3dC3ee2382F083067107386";

export default function DeployReceiver() {
    const { showBoundary } = useErrorBoundary();
    const { walletChainId, icmReceiverAddress, chainID, setChainID, evmChainId } = useExampleStore();
    const [message, setMessage] = useState("Hello");
    const [isSending, setIsSending] = useState(false);
    const [isSwitchingChains, setIsSwitchingChains] = useState(false);
    const [lastTxId, setLastTxId] = useState<string>();

    const chainIDHex = useMemo(() =>
        utils.bufferToHex(utils.base58check.decode(chainID))
        , [chainID]);

    const isOnFuji = useMemo(() => walletChainId === avalancheFuji.id, [walletChainId]);

    async function handleSendMessage() {
        if (!icmReceiverAddress) {
            throw new Error('Receiver contract not deployed');
        }

        setIsSending(true);
        try {
            const publicClient = createPublicClient({
                transport: custom(window.avalanche!),
            });

            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });

            const [address] = await walletClient.requestAddresses();

            const { request } = await publicClient.simulateContract({
                address: SENDER_C_CHAIN_ADDRESS,
                abi: SenderOnCChainABI.abi,
                functionName: 'sendMessage',
                args: [icmReceiverAddress, message, chainIDHex],
                account: address,
                chain: avalancheFuji,
            });

            const hash = await walletClient.writeContract(request);
            await publicClient.waitForTransactionReceipt({ hash });
            setLastTxId(hash);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsSending(false);
        }
    }

    async function switchToFuji() {
        setIsSwitchingChains(true);
        try {
            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });
            await walletClient.switchChain({ id: avalancheFuji.id });
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsSwitchingChains(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Send ICM Message</h2>
            <Success
                label="ICM Receiver Address"
                value={icmReceiverAddress}
            />
            <Input
                label="Receiver Chain ID"
                value={chainID}
                onChange={setChainID}
                validator={chainID => utils.base58check.decode(chainID).length === 32 ? undefined : "Invalid chain ID length: " + utils.base58check.decode(chainID).length}
            />
            <Input
                label="Receiver Chain ID in Hex"
                value={chainIDHex}
                disabled
            />
            <Input
                label="Message"
                value={message}
                onChange={setMessage}
                validator={message => message.length > 0 ? undefined : "Message is required"}
            />
            <Input
                label="C-Chain Sender Address"
                value={SENDER_C_CHAIN_ADDRESS}
                disabled
            />
            {!isOnFuji && <Button
                type="primary"
                onClick={() => switchToFuji()}
                disabled={isSwitchingChains}
            >
                Switch to Fuji
            </Button>}
            {!isOnFuji && <div className="text-sm">
                You must be on the Fuji network to send messages from the C-Chain to the Subnet.
            </div>}
            {!icmReceiverAddress && <div className="text-sm">
                You must <a href="#receiverOnSubnet" className="text-blue-500 hover:underline">deploy the ReceiverOnSubnet contract first</a>.
            </div>}
            <Button
                type="primary"
                onClick={handleSendMessage}
                loading={isSending}
                disabled={isSending || !icmReceiverAddress || !message || !isOnFuji}
            >
                Send Message from C-Chain to Subnet
            </Button>
            <div className="space-y-2">
                <Success
                    label="Transaction ID"
                    value={lastTxId ?? ""}
                />
                {lastTxId && (
                    <a
                        href={`https://subnets-test.avax.network/c-chain/tx/${lastTxId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                    >
                        View on Explorer
                    </a>
                )}
            </div>
        </div>
    );
}
