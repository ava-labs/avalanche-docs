import { useState, useEffect } from "react";
import { Button } from "./Button";
import { useErrorBoundary } from "react-error-boundary";
import { Wallet } from "lucide-react";
import { useWalletStore } from "../utils/store";
import { createCoreWalletClient } from "../../coreViem";
import { networkIDs } from "@avalabs/avalanchejs";
import { zeroAddress } from "viem";

export const ConnectWallet = ({ children, required }: { children: React.ReactNode, required: boolean }) => {
    const { setWalletChainId, walletEVMAddress, setWalletEVMAddress, setCoreWalletClient, coreWalletClient, setAvalancheNetworkID, setPChainAddress, walletChainId, avalancheNetworkID } = useWalletStore();
    const [hasWallet, setHasWallet] = useState<boolean>(false);
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        async function init() {
            try {
                //first, let's check if there is a wallet at all
                if (window.avalanche) {
                    setHasWallet(true);
                } else {
                    setHasWallet(false);
                    return
                }

                window.avalanche?.on("accountsChanged", async (accounts: string[]) => {
                    if (accounts.length === 0) {
                        setWalletEVMAddress("");
                        return
                    } else if (accounts.length > 1) {
                        showBoundary(new Error("Multiple accounts found, we don't support that yet"));
                        return
                    }

                    //re-create wallet with new account
                    setCoreWalletClient(createCoreWalletClient(accounts[0] as `0x${string}`));

                    setWalletEVMAddress(accounts[0] as `0x${string}`);

                    coreWalletClient.getPChainAddress().then(setPChainAddress).catch(showBoundary);

                    if (walletChainId === 0) {
                        coreWalletClient.getChainId().then(onChainChanged).catch(showBoundary);
                    }
                });


                const onChainChanged = (chainId: string | number) => {
                    if (typeof chainId === "string") {
                        chainId = parseInt(chainId, 16);
                    }

                    setWalletChainId(chainId);
                    coreWalletClient.getPChainAddress().then(setPChainAddress).catch(showBoundary);

                    coreWalletClient.getEthereumChain().then(({ isTestnet }) => {
                        setAvalancheNetworkID(isTestnet ? networkIDs.FujiID : networkIDs.MainnetID);
                    }).catch(showBoundary);
                }
                window.avalanche.on("chainChanged", onChainChanged);

            } catch (error) {
                showBoundary(error);
            }
        }
        init();
    }, []);

    async function connectWallet() {
        window.avalanche?.request({ method: "eth_requestAccounts" }).catch((error) => {
            showBoundary(error);
        });
    }

    if (required && !hasWallet) {
        return (
            <div className="space-y-2">
                <p>Core wallet is required for most of these tools.</p>
                <a
                    href="https://chromewebstore.google.com/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button>Download Core Wallet</Button>
                </a>
            </div>
        );
    }

    if (required && !walletEVMAddress) {
        return (
            <div className="space-y-2">
                <Button onClick={connectWallet} icon={<Wallet className="w-4 h-4 mr-2" />}>
                    Connect Wallet
                </Button>
            </div>
        );
    }

    return (
        <div className={`space-y-4 transition`}>
            {walletEVMAddress && <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-4 min-w-0">
                    <div className="p-2 rounded-full">
                        <Wallet className="w-6 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-sm">Connected to</div>
                        <div className="font-mono truncate whitespace-nowrap overflow-hidden text-ellipsis block">
                            {walletEVMAddress}
                        </div>
                    </div>
                </div>
                {walletChainId && (
                    <div className="text-sm flex-3 min-w-0 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${avalancheNetworkID === networkIDs.FujiID ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'}`}>
                            {avalancheNetworkID === networkIDs.FujiID ? "Testnet" : "Mainnet"}
                        </span>
                        <span className="dark:text-zinc-300">Chain ID: {walletChainId}</span>
                    </div>
                )}
            </div>}
            {children}
        </div>
    );
};
