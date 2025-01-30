"use client"
import { useState, useEffect } from 'react';
import { createPublicClient, createWalletClient, custom, http, parseEther, formatEther } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { newPrivateKey, getAddresses } from '../common/utils/wallet';
import { transferCToP, getPChainBalance } from '../common/utils/utxo';
import { pvm, utils, Context, TransferableOutput, addTxSignatures } from "@avalabs/avalanchejs";

export default function TempWalletFunder() {
    const [tempPrivateKeyHex, setTempPrivateKeyHex] = useState('');
    const [cChainBalance, setCChainBalance] = useState(BigInt(0));
    const [destinationPAddress, setDestinationPAddress] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transferring, setTransferring] = useState(false);
    const [transferError, setTransferError] = useState<string | null>(null);
    const [transferStep, setTransferStep] = useState<string>('');

    // Initialize temporary private key
    useEffect(() => {
        if (!tempPrivateKeyHex) {
            setTempPrivateKeyHex(newPrivateKey());
        }
    }, [tempPrivateKeyHex]);

    const addresses = tempPrivateKeyHex ? getAddresses(tempPrivateKeyHex) : null;

    // Check C-Chain balance periodically
    useEffect(() => {
        if (!addresses?.C) return;

        const checkCChainBalance = async () => {
            const client = createPublicClient({
                chain: avalancheFuji,
                transport: http()
            });

            try {
                const balance = await client.getBalance({
                    address: addresses.C
                });
                setCChainBalance(balance);
            } catch (error) {
                console.error('Failed to get C-Chain balance:', error);
            }
        };

        checkCChainBalance();
        const interval = setInterval(checkCChainBalance, 5000);
        return () => clearInterval(interval);
    }, [addresses?.C]);

    // Validate P-chain address format
    const isPChainAddressValid = (address: string) => {
        return address.startsWith('P-fuji') && address.length === 45;
    };

    // Function to transfer from P to P chain
const transferPToP = async (sourcePrivateKey: string, destinationAddress: string, amount: string) => {
    setTransferStep('Initiating P to P transfer...');
    const pvmApi = new pvm.PVMApi('https://api.avax-test.network');
    const context = await Context.getContextFromURI('https://api.avax-test.network');
    const addresses = getAddresses(sourcePrivateKey);
    const feeState = await pvmApi.getFeeState();
    
    const { utxos } = await pvmApi.getUTXOs({ addresses: [addresses.P] });

    if (utxos.length === 0) {
        console.log('No UTXOs found for P-chain transfer');
    }

    const amountNAvax = BigInt(Math.floor(Number(amount) * 1e9));

    const tx = pvm.newBaseTx(context, [utils.bech32ToBytes(addresses.P)], utxos, [
        TransferableOutput.fromNative(context.avaxAssetID, amountNAvax, [
        utils.bech32ToBytes(destinationAddress),
        ]),
    ]);

    /*
    const unsignedTx = pvm.e.newIncreaseL1ValidatorBalanceTx(
        {
        balance: BigInt(amountNAvax),
        feeState,
        fromAddressesBytes: [testPAddr],
        utxos,
        validationId: VALIDATION_ID,
        },
        context,
    ); */

    await addTxSignatures({
        unsignedTx: tx,
        privateKeys: [utils.hexToBuffer(sourcePrivateKey)],
    });

    return pvmApi.issueSignedTx(tx.getSignedTx());

    /* Sign the transaction
    const keychain = context.newKeyChain();
    keychain.importKey(sourcePrivateKey);
    const signedTx = tx.sign(keychain);

    setTransferStep('Sending P to P transaction...');
    
    // Issue the transaction
    await pvmApi.issueTx(signedTx.toString()); */
};

    // Handle transfer from C-chain to P-chain destination
    const handleCToPTransfer = async () => {
        if (!tempPrivateKeyHex || !destinationPAddress || !transferAmount) return;
        if (!isPChainAddressValid(destinationPAddress)) {
            setTransferError('Invalid P-Chain address format');
            return;
        }

        setTransferError(null);
        setTransferring(true);
        setTransferStep('Starting C to P transfer...');

        try {
            // First transfer from C to temp P-chain
            await transferCToP(
                transferAmount,
                tempPrivateKeyHex,
                async (balance: string) => {
                    setTransferStep('C to P transfer complete, preparing P to P transfer...');
                    try {
                        // Add delay to ensure first transaction is processed
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        
                        // Now transfer from temp P-chain to final destination
                        await transferPToP(
                            tempPrivateKeyHex,
                            destinationPAddress,
                            transferAmount
                        );

                        setTransferStep('Verifying final balance...');
                        
                        // Verify final destination balance
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        const finalBalance = await getPChainBalance(destinationPAddress);
                        console.log('Final destination balance:', finalBalance);
                    } catch (error) {
                        console.error('P to P transfer failed:', error);
                        throw error;
                    }
                }
            );

            setTransferAmount('');
            setTransferError('Transfer completed successfully!');
        } catch (error) {
            console.error('Transfer failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to complete transfer';
            setTransferError(errorMessage);
        } finally {
            setTransferring(false);
            setTransferStep('');
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-xl font-medium">Transfer to P-Chain Address</h2>
                <p className="text-sm text-gray-600">
                    1. Send AVAX to the C-Chain address below
                    2. Enter your P-Chain address
                    3. Click transfer to move funds to P-Chain
                </p>
            </div>

            <div className="p-4 border rounded">
                <div className="flex justify-between mb-2">
                    <span>Temporary C-Chain Address:</span>
                    <span>Balance: {formatEther(cChainBalance)} AVAX</span>
                </div>
                <div className="font-mono text-sm break-all">{addresses?.C}</div>
            </div>

            <div className="space-y-2">
                <label className="block">
                    <span className="text-sm font-medium">Your P-Chain Address</span>
                    <input
                        type="text"
                        value={destinationPAddress}
                        onChange={(e) => setDestinationPAddress(e.target.value)}
                        placeholder="P-fuji..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium">Amount to Transfer (AVAX)</span>
                    <input
                        type="number"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        step="0.0001"
                        min="0"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </label>
            </div>

            <button
                onClick={handleCToPTransfer}
                disabled={
                    transferring || 
                    !destinationPAddress || 
                    !transferAmount || 
                    Number(transferAmount) <= 0 || 
                    Number(formatEther(cChainBalance)) < Number(transferAmount)
                }
                className="w-full p-2 bg-green-500 text-white rounded disabled:bg-gray-400"
            >
                {transferring ? `Transferring... ${transferStep}` : `Transfer ${transferAmount || '0'} AVAX to P-Chain`}
            </button>

            {transferError && (
                <p className={`text-sm ${transferError.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                    {transferError}
                </p>
            )}
        </div>
    );
}