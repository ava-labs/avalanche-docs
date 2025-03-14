"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { useErrorBoundary } from "react-error-boundary";
import { useState, useEffect } from "react";
import { Button, Input, Select } from "../../ui";
import { createPublicClient, http } from 'viem';


export default function SwitchChain() {
    const { showBoundary } = useErrorBoundary();
    const [isSwitching, setIsSwitching] = useState(false);
    const [isTestnet, setIsTestnet] = useState<boolean>(true);
    const {
        evmChainId,
        setEvmChainId,
        evmChainName,
        evmChainRpcUrl,
        evmChainCoinName,
        setEvmChainName,
        setEvmChainRpcUrl,
        setEvmChainCoinName,
        getChain
    } = useToolboxStore();
    const { coreWalletClient, walletChainId } = useWalletStore();
    const [localError, setLocalError] = useState<string | null>(null);

    async function addToWallet() {
        const chain = getChain();
        if (!chain) {
            setLocalError("Chain not found");
            return;
        }
        await coreWalletClient!.addChain({ chain: { ...chain, isTestnet } });
        await coreWalletClient!.switchChain({ id: chain.id });
    }

    useEffect(() => {
        setLocalError(null);
        if (evmChainRpcUrl) {
            const publicClient = createPublicClient({
                transport: http(evmChainRpcUrl)
            });

            //loading chain id from rpc
            setEvmChainId(0)
            publicClient.getChainId().then((chainId) => {
                setEvmChainId(chainId);
            }).catch((error) => {
                setLocalError("Loading chain id failed: " + error.message || String(error));
            });
        }

        if (evmChainRpcUrl) {
            const match = evmChainRpcUrl.match(/\/ext\/bc\/([a-zA-Z0-9]{49})\/rpc/);
            if (match) {
                //try to load chain info from rpc
                coreWalletClient!.extractChainInfo({ txId: match[1] }).then((chainInfo) => {
                    setEvmChainName(chainInfo.chainName);
                }).catch((error) => {
                    setLocalError("Loading chain name failed: " + error.message || String(error));
                });
            }
        }
    }, [evmChainRpcUrl]);

    useEffect(() => {
        if (evmChainName && !evmChainCoinName) {
            setEvmChainCoinName(evmChainName + " Coin");
        }
    }, [evmChainName, evmChainCoinName]);

    async function loadFromWallet() {
        const chain = await coreWalletClient!.getEthereumChain();
        setEvmChainName(chain.chainName);
        setEvmChainRpcUrl(chain.rpcUrls.filter((url) => url.startsWith('http'))[0]);
        setEvmChainCoinName(chain.nativeCurrency.name);
        setEvmChainId(parseInt(chain.chainId));
        setIsTestnet(chain.isTestnet);
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Enter L1 Data</h2>
            <div className="space-y-4">
                {localError && <p className="text-red-500">{localError}</p>}
                {walletChainId !== evmChainId && <div className="mb-4">
                    <Button onClick={loadFromWallet}
                    >Load from wallet</Button>
                </div>}
                <Input
                    label="RPC URL"
                    value={evmChainRpcUrl}
                    onChange={setEvmChainRpcUrl}
                    placeholder="Enter RPC URL"
                />
                <Input
                    label="Chain Name"
                    value={evmChainName}
                    onChange={setEvmChainName}
                    placeholder="Enter chain name"
                />
                <Input
                    label="Coin Name"
                    value={evmChainCoinName}
                    onChange={setEvmChainCoinName}
                    placeholder="Enter coin name"
                />
                <Select
                    label="Is Testnet"
                    value={isTestnet.toString()}
                    onChange={(value) => setIsTestnet(value === "true")}
                    options={[
                        { value: "true", label: "Testnet" },
                        { value: "false", label: "Mainnet" }
                    ]}
                />
                <Input
                    label="EVM Chain ID"
                    value={evmChainId.toString()}
                    disabled={true}
                    type="text"
                />
                <Button onClick={addToWallet} type="primary" disabled={!evmChainId || !evmChainName || !evmChainRpcUrl || localError} >Add to wallet & switch</Button>
            </div>
        </div>
    );
};
