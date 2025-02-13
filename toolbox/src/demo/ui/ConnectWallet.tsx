import { useState, useEffect } from "react";
import { Button } from "./Button";
import { useErrorBoundary } from "react-error-boundary";
import { Wallet } from "lucide-react";
import { useExampleStore } from "../utils/store";


export const ConnectWallet = ({ children }: { children: React.ReactNode }) => {
    const { walletChainId, setWalletChainId, walletEVMAddress, setWalletEVMAddress } = useExampleStore();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [hasWallet, setHasWallet] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { showBoundary } = useErrorBoundary();
    const [isConnecting, setIsConnecting] = useState(false);


    useEffect(() => {
        setHasWallet(!!window.avalanche);
    }, []);

    async function connectWallet() {
        setIsConnecting(true);
        try {
            const accounts = await window.avalanche?.request<string[]>({
                method: "eth_requestAccounts",
            });
            if (!accounts?.[0]) {
                throw new Error("No accounts found");
            }
            setWalletEVMAddress(accounts[0]);
            setIsConnected(true);
        } catch (error) {
            showBoundary(error as Error);
        } finally {
            setIsConnecting(false);
        }
    }

    useEffect(() => {
        window.avalanche?.request<string[]>({
            method: "eth_accounts",
        }).then((accounts) => {
            if (accounts.length > 0) {
                console.log(`ConnectWallet:Connected to ${accounts[0]}`);
                setWalletEVMAddress(accounts[0]);
                setIsConnected(true);
            } else {
                console.log(`ConnectWallet:Not connected`);
                setIsConnected(false);
            }
        }).catch((error) => {
            // We can still log errors here, but no need to set localError for initial connection check
            console.log(`ConnectWallet:Error connecting to wallet: ${error}`);
        }).finally(() => {
            setIsLoaded(true);
        });
    }, []);

    useEffect(() => {
        // Initial chain ID check
        window.avalanche?.request<string>({
            method: "eth_chainId",
        }).then((id) => {
            setWalletChainId(parseInt(id, 16));
        }).catch(console.error);

        // Subscribe to chain changes
        window.avalanche?.on("chainChanged", (newChainId: string) => {
            setWalletChainId(parseInt(newChainId, 16));
        });

        // Subscribe to account changes
        window.avalanche?.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length > 0) {
                setWalletEVMAddress(accounts[0]);
                setIsConnected(true);
            } else {
                setWalletEVMAddress("");
                setIsConnected(false);
            }
        });

        return () => {
            window.avalanche?.removeListener("chainChanged", () => { });
            window.avalanche?.removeListener("accountsChanged", () => { });
        };
    }, []);

    if (!hasWallet) {
        return (
            <div className="space-y-2">
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

    if (!isConnected && isLoaded) {
        return (
            <div className="space-y-2">
                <Button onClick={connectWallet} icon={<Wallet className="w-4 h-4 mr-2" />} loading={isConnecting}>
                    Connect Wallet
                </Button>
            </div>
        );
    }

    if (!isLoaded) {
        return null;
    }

    return (
        <div className={`space-y-4 transition`}>
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full">
                        <Wallet className="w-6 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Connected to</div>
                        <div className="font-mono">{walletEVMAddress}</div>
                    </div>
                </div>
                {walletChainId && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Chain ID: <span className="font-mono text-gray-900 dark:text-gray-100">{walletChainId}</span>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};
