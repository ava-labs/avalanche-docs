
"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { useState, useEffect } from "react";
import { Input, Select } from "../../ui";
import { createPublicClient, http } from 'viem';


export default function L1Form() {
    const {
        evmChainId,
        setEvmChainId,
        evmChainName,
        evmChainRpcUrl,
        evmChainCoinName,
        setEvmChainName,
        setEvmChainRpcUrl,
        setEvmChainCoinName,
        evmChainIsTestnet,
        setEvmChainIsTestnet,
    } = useToolboxStore();
    const { coreWalletClient } = useWalletStore();
    const [localError, setLocalError] = useState<string | null>(null);


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

    return (
        <div className="space-y-4">
            {localError && <p className="text-red-500">{localError}</p>}

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
            <Input
                label="EVM Chain ID"
                value={evmChainId.toString()}
                disabled={true}
                type="text"
            />
            <Select
                label="Is Testnet"
                value={evmChainIsTestnet.toString()}
                onChange={(value) => setEvmChainIsTestnet(value === "true")}
                options={[
                    { value: "true", label: "Testnet" },
                    { value: "false", label: "Mainnet" }
                ]}
            />
        </div>
    )
}
