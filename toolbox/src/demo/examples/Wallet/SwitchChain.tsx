"use client";

import { useToolboxStore, useWalletStore } from "../../utils/store";
import { Button } from "../../ui";
import L1Form from "./L1Form";
import { useErrorBoundary } from "react-error-boundary";
import { useViemChainStore } from '../../utils/store';


export default function SwitchChain() {
    const {
        evmChainId,
        setEvmChainId,
        setEvmChainName,
        setEvmChainRpcUrl,
        setEvmChainCoinName,
        setEvmChainIsTestnet,
    } = useToolboxStore();
    const { coreWalletClient, walletChainId } = useWalletStore();
    const { showBoundary } = useErrorBoundary();

    // Use the dedicated store
    const viemChain = useViemChainStore();

    async function addToWallet() {
        try {
            if (!viemChain) {
                throw new Error("Some chain data is missing. Please reach out to the developers, this was not supposed to happen.");
            }
            await coreWalletClient!.addChain({ chain: viemChain });
            await coreWalletClient!.switchChain({ id: viemChain.id });
        } catch (error) {
            showBoundary(error);
        }
    }

    async function loadFromWallet() {
        const chain = await coreWalletClient!.getEthereumChain();
        setEvmChainName(chain.chainName);
        setEvmChainRpcUrl(chain.rpcUrls.filter((url) => url.startsWith('http'))[0]);
        setEvmChainCoinName(chain.nativeCurrency.name);
        setEvmChainId(parseInt(chain.chainId));
        setEvmChainIsTestnet(chain.isTestnet);
    }


    return (
        <div className="space-y-4">
            <pre>{JSON.stringify(viemChain)}</pre>
            <h2 className="text-lg font-semibold">Enter L1 Data</h2>
            <div className="space-y-4">
                {walletChainId !== evmChainId && <div className="mb-4">
                    <Button onClick={loadFromWallet}
                    >Load from wallet</Button>
                </div>}
                <L1Form />
                {/* <Button onClick={addToWallet} type="primary" disabled={!viemChain} >Add to wallet & switch</Button> */}
            </div>
        </div>
    );
};
