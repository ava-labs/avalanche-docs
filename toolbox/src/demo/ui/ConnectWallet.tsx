import { useState, useEffect } from "react";
import { Button } from "./Button";
import { useErrorBoundary } from "react-error-boundary";
import { Wallet } from "lucide-react";
import { useExampleStore } from "../utils/store";


export const ConnectWallet = ({ children }: { children: React.ReactNode }) => {
    const { walletChainId, setWalletChainId } = useExampleStore();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [hasWallet, setHasWallet] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
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
            setAddress(accounts[0]);
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
                setAddress(accounts[0]);
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

        return () => {
            window.avalanche?.removeListener("chainChanged", () => { });
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
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-full">
                        <Wallet className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Connected to</div>
                        <div className="font-mono text-gray-900">{address}</div>
                    </div>
                </div>
                {walletChainId && (
                    <div className="text-sm text-gray-500">
                        Chain ID: <span className="font-mono text-gray-900">{walletChainId}</span>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};
