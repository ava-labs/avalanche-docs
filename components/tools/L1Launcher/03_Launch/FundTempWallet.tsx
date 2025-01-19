import { useState, useEffect } from 'react';
import SwitchChain, { fujiConfig } from '@/components/tools/common/ui/SwitchChain';
import { useWizardStore } from '../store';
import { createPublicClient, createWalletClient, custom, http, parseEther, formatEther } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { newPrivateKey, getAddresses } from '../../common/utils/wallet';
import { transferCToP, getPChainBalance, importExistingUTXOs } from '../../common/utils/utxo';
import NextPrev from "@/components/tools/common/ui/NextPrev";

const changeAllowance = parseEther('0.1');
const TRANSFER_BUFFER = 0.1; // Buffer amount to account for fees/precision loss

export default function FundTempWallet() {
    const { nodesCount, tempPrivateKeyHex, setTempPrivateKeyHex, pChainBalance, setPChainBalance, goToNextStep, goToPreviousStep } = useWizardStore();
    const [cChainBalance, setCChainBalance] = useState<bigint>(BigInt(0));
    const [transferring, setTransferring] = useState(false);
    const nodeCounts = [1, 3, 5];
    const [transferError, setTransferError] = useState<string | null>(null);

    // Initialize temporary private key if not exists
    useEffect(() => {
        if (!tempPrivateKeyHex) {
            setTempPrivateKeyHex(newPrivateKey());
        }
    }, [tempPrivateKeyHex, setTempPrivateKeyHex]);

    const addresses = tempPrivateKeyHex ? getAddresses(tempPrivateKeyHex) : null;

    // Check C-Chain balance
    const checkCChainBalance = async () => {
        if (!addresses?.C) return;

        const client = createPublicClient({
            chain: avalancheFuji,
            transport: http()
        });

        try {
            const balance = await client.getBalance({
                address: addresses.C as `0x${string}`
            });
            setCChainBalance(balance);
        } catch (error) {
            console.error('Failed to get C-Chain balance:', error);
        }
    };

    // Check P-Chain balance
    useEffect(() => {
        if (!addresses?.P || !tempPrivateKeyHex) return;

        const checkPChainBalance = async () => {
            try {
                // First try to import any existing UTXOs
                await importExistingUTXOs(tempPrivateKeyHex);

                // Then get the P-chain balance
                const balance = await getPChainBalance(addresses.P);
                setPChainBalance(balance);
            } catch (error) {
                console.error('Failed to get P-Chain balance:', error);
            }
        };

        checkPChainBalance();
        const interval = setInterval(checkPChainBalance, 5000);
        return () => clearInterval(interval);
    }, [addresses?.P, tempPrivateKeyHex, setPChainBalance]);

    // Check C-Chain balance periodically
    useEffect(() => {
        checkCChainBalance();
        const interval = setInterval(checkCChainBalance, 5000);
        return () => clearInterval(interval);
    }, [addresses?.C]);

    const handleTransfer = async () => {
        if (!window.ethereum || !addresses?.C) return;

        const requiredTotal = nodesCount + 0.5;
        const currentCBalance = Number(formatEther(cChainBalance));
        const currentPBalance = Number(pChainBalance) / 1e9;
        const totalCurrentBalance = currentCBalance + currentPBalance;

        // Calculate base transfer amount
        let transferAmount = requiredTotal - totalCurrentBalance;
        if (transferAmount <= 0) {
            return; // Already have enough funds across both chains
        }

        // Add change allowance to initial transfer
        const totalTransferAmount = transferAmount + Number(formatEther(changeAllowance));

        setTransferring(true);
        try {
            const walletClient = createWalletClient({
                chain: avalancheFuji,
                transport: custom(window.ethereum)
            });

            const [account] = await walletClient.requestAddresses();

            // Transfer total amount (including change allowance) to C-chain
            await walletClient.sendTransaction({
                account,
                to: addresses.C as `0x${string}`,
                value: parseEther(totalTransferAmount.toFixed(2))
            });

            // Wait for the balance to update
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Transfer only the required amount to P chain (without change allowance)
            await transferCToP(transferAmount.toFixed(2), tempPrivateKeyHex!, setPChainBalance);

        } catch (error: any) {
            console.error('Transfer failed:', error);
        } finally {
            setTransferring(false);
        }
    };

    const handleCToPTransfer = async () => {
        if (!tempPrivateKeyHex) return;
        setTransferError(null); // Clear previous errors

        const requiredTotal = nodesCount + 0.5;
        const currentPBalance = Number(pChainBalance) / 1e9;
        const currentCBalance = Number(formatEther(cChainBalance));

        // Calculate how much more we need in P chain
        const neededInP = requiredTotal - currentPBalance;

        if (neededInP <= 0) return;

        setTransferring(true);
        try {
            await transferCToP(neededInP.toFixed(2), tempPrivateKeyHex, setPChainBalance);
        } catch (error: any) {
            console.error('C to P transfer failed:', error);
            setTransferError(error.message || 'Failed to transfer to P-Chain');
        } finally {
            setTransferring(false);
        }
    };

    const hasEnoughFunds = () => {
        const currentPBalance = Number(pChainBalance) / 1e9;
        const requiredTotal = nodesCount + 0.5;
        // Add buffer to required amount check
        return currentPBalance >= (requiredTotal - TRANSFER_BUFFER);
    };

    const needsPChainFunds = () => {
        const requiredTotal = nodesCount + 0.5;
        const currentPBalance = Number(pChainBalance) / 1e9;
        const currentCBalance = Number(formatEther(cChainBalance));
        // Add buffer to required amount check
        return currentPBalance < (requiredTotal - TRANSFER_BUFFER) && currentCBalance >= (requiredTotal - currentPBalance);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-medium mb-6">Fund Temporary Wallet</h1>
            <SwitchChain chainConfig={fujiConfig}>
                <div className="space-y-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">C-Chain Address:</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Balance: {formatEther(cChainBalance)} AVAX</div>
                        </div>
                        <div className="font-mono text-sm break-all mb-3 text-gray-900 dark:text-gray-100">{addresses?.C}</div>
                        {(nodesCount + 0.5 - (Number(formatEther(cChainBalance)) + Number(pChainBalance) / 1e9)) > 0 && (
                            <button
                                onClick={handleTransfer}
                                disabled={transferring}
                                className={`w-full px-4 py-2 rounded text-white ${transferring
                                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                    }`}
                            >
                                {transferring ? 'Transferring...' : `Transfer ${(nodesCount + 0.5 + Number(formatEther(changeAllowance)) - (Number(formatEther(cChainBalance)) + Number(pChainBalance) / 1e9)).toFixed(2)} AVAX`}
                            </button>
                        )}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">P-Chain Address:</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Balance: {Number(pChainBalance) / 1e9} AVAX</div>
                        </div>
                        <div className="font-mono text-sm break-all mb-3 text-gray-900 dark:text-gray-100">{addresses?.P}</div>
                        {needsPChainFunds() && (
                            <>
                                <button
                                    onClick={handleCToPTransfer}
                                    disabled={transferring}
                                    className={`w-full px-4 py-2 rounded text-white ${transferring
                                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                                        }`}
                                >
                                    {transferring ? 'Importing...' : `Import ${(nodesCount + 0.5 - Number(pChainBalance) / 1e9).toFixed(2)} AVAX to P-Chain`}
                                </button>
                                {transferError && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {transferError}
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <NextPrev
                    nextDisabled={!hasEnoughFunds()}
                    onNext={goToNextStep} 
                    onPrev={goToPreviousStep}
                />
            </SwitchChain>
        </div >
    );
}
