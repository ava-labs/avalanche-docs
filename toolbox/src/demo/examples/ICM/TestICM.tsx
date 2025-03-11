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

export default function TestICM() {
    const { showBoundary } = useErrorBoundary();
    const { walletChainId, setIcmReceiverAddress, icmReceiverAddress, chainID, setChainID, evmChainId } = useExampleStore();
    const [isDeploying, setIsDeploying] = useState(false);
    const [message, setMessage] = useState("Hello");
    const [isSending, setIsSending] = useState(false);
    const [isSwitchingChains, setIsSwitchingChains] = useState(false);
    const [lastTxId, setLastTxId] = useState<string>();

    const chainIDHex = useMemo(() =>
        utils.bufferToHex(utils.base58check.decode(chainID))
        , [chainID]);

    async function handleDeploy() {
        setIsDeploying(true);
        setIcmReceiverAddress("");
        try {
            const publicClient = createPublicClient({
                transport: custom(window.avalanche!),
            });

            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });

            const [address] = await walletClient.requestAddresses();


            const hash = await walletClient.deployContract({
                abi: ReceiverOnSubnetABI.abi,
                bytecode: ReceiverOnSubnetABI.bytecode.object as `0x${string}`,
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

            setIcmReceiverAddress(receipt.contractAddress);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsDeploying(false);
        }
    }

    const isOnFuji = useMemo(() => walletChainId === avalancheFuji.id, [walletChainId]);
    const isOnL1 = useMemo(() => walletChainId === evmChainId, [walletChainId, evmChainId]);

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

    async function switchToChain(desiredChain: "fuji" | "l1") {
        setIsSwitchingChains(true);
        try {
            if (desiredChain === "l1" && !evmChainId) {
                throw new Error("No EVM chain ID found. Please use the 'Switch Chain' tool.");
            }
            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });
            const chainId = desiredChain === "fuji" ? avalancheFuji.id : evmChainId;
            await walletClient.switchChain({ id: chainId });
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsSwitchingChains(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Deploy ICM Receiver</h2>
            <div className="space-y-4">
                <div className="mb-4">
                    This will deploy the <code>ReceiverOnSubnet</code> contract to your connected network (Chain ID: <code>{walletChainId}</code>). This contract can receive messages from the C-Chain using Avalanche's Inter-Chain Messaging (ICM) protocol. Once deployed, you can use the pre-deployed sender contract on the C-Chain to send messages to this receiver.
                </div>
                <KnownChainIDWarning walletChainId={walletChainId} />
                {!isOnL1 && <Button
                    type="primary"
                    onClick={() => switchToChain("l1")}
                    disabled={isSwitchingChains}
                >
                    Switch to chain {evmChainId}
                </Button>}
                <Button
                    type={icmReceiverAddress ? "default" : "primary"}
                    onClick={handleDeploy}
                    loading={isDeploying}
                    disabled={isDeploying}
                >
                    {icmReceiverAddress ? "Re-Deploy ReceiverOnSubnet" : "Deploy ReceiverOnSubnet"}
                </Button>
            </div>
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
                onClick={() => switchToChain("fuji")}
                disabled={isSwitchingChains}
            >
                Switch to Fuji
            </Button>}
            {!isOnFuji && <div className="text-sm">
                You must be on the Fuji network to send messages from the C-Chain to the Subnet.
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
