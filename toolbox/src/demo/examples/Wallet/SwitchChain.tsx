import { useExampleStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import { Button, Input } from "../../ui";
import { createWalletClient, createPublicClient, custom, http, Chain } from 'viem';


export const SwitchChain = () => {
    const { showBoundary } = useErrorBoundary();
    const [isSwitching, setIsSwitching] = useState(false);
    const [targetChainId, setTargetChainId] = useState<number>(0);
    const {
        walletChainId,
        evmChainName,
        evmChainRpcUrl,
        evmChainCoinName,
        setEvmChainName,
        setEvmChainRpcUrl,
        setEvmChainCoinName,
    } = useExampleStore();
    const [isCheckingRpc, setIsCheckingRpc] = useState(false);


    async function handleSwitchChain() {
        setIsSwitching(true);
        try {
            const walletClient = createWalletClient({
                transport: custom(window.avalanche!),
            });

            const chain: Chain = {
                id: targetChainId,
                name: evmChainName,
                nativeCurrency: {
                    name: evmChainCoinName,
                    symbol: evmChainCoinName,
                    decimals: 18,
                },
                rpcUrls: {
                    default: { http: [evmChainRpcUrl] },
                },
                testnet: false,
            }

            await walletClient.addChain({
                chain,
            });

            await walletClient.switchChain({
                id: targetChainId,
            });
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsSwitching(false);
        }
    }

    async function checkRpc() {
        setIsCheckingRpc(true);
        try {
            const publicClient = createPublicClient({
                transport: http(evmChainRpcUrl)
            });

            const chainId = await publicClient.getChainId();
            setTargetChainId(chainId);
        } catch (error) {
            showBoundary(error);
            setTargetChainId(0);
        } finally {
            setIsCheckingRpc(false);
        }
    }

    useEffect(() => {
        setTargetChainId(0);
    }, [evmChainRpcUrl]);


    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Switch Chain</h2>
            <div className="space-y-4">
                <div className="mb-4">
                    Current Chain ID: {walletChainId}
                </div>
                <Input
                    label="Chain Name"
                    value={evmChainName}
                    onChange={setEvmChainName}
                    placeholder="Enter chain name"
                />
                <Input
                    label="RPC URL"
                    value={evmChainRpcUrl}
                    onChange={setEvmChainRpcUrl}
                    placeholder="Enter RPC URL"
                />
                <Input
                    label="Coin Name"
                    value={evmChainCoinName}
                    onChange={setEvmChainCoinName}
                    placeholder="Enter coin name"
                />
                <Input
                    label="Target Chain ID"
                    value={targetChainId.toString()}
                    disabled={true}
                    type="text"
                />
                {targetChainId === 0 && (
                    <Button
                        type="secondary"
                        onClick={checkRpc}
                        loading={isCheckingRpc}
                        disabled={evmChainRpcUrl === ""}
                    >
                        Load Chain ID from RPC
                    </Button>
                )}
                {targetChainId > 0 && (
                    <Button
                        type="primary"
                        onClick={handleSwitchChain}
                        loading={isSwitching}
                    >
                        Switch Chain
                    </Button>
                )}
            </div>
        </div>
    );
};
