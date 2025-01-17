import { pvm, Utxo } from "@avalabs/avalanchejs";

import { Context, evm, utils } from '@avalabs/avalanchejs'
import { addSignature, getAddresses } from "./wallet";
import { createPublicClient, http, parseEther } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { useWizardStore } from './store';

export const RPC_ENDPOINT = "https://api.avax-test.network"

export async function transferCToP(amount: string, privateKeyHex: string) {
    const publicClient = createPublicClient({
        chain: avalancheFuji,
        transport: http(RPC_ENDPOINT + '/ext/bc/C/rpc')
    });
    const address = await getAddresses(privateKeyHex);

    // Get total balance
    const balance = await publicClient.getBalance({ address: address.C });
    const amountToTransfer = parseEther(amount);

    // Check if we have enough balance
    if (balance < amountToTransfer) {
        throw new Error('Insufficient C-chain balance');
    }

    // Convert from wei to AVAX for the exportUTXO function
    const avaxAmount = Number(amountToTransfer) / 1e18;
    await exportUTXO(privateKeyHex, avaxAmount);

    let imported = false;
    for (let i = 0; i < 3; i++) {
        if (i !== 0) await new Promise(resolve => setTimeout(resolve, 2000));

        imported = await importExistingUTXOs(privateKeyHex);
        if (imported) break;
    }

    if (!imported) {
        throw new Error('Export transaction may still be processing - no UTXOs found to import after 3 attempts');
    }

    // Update P-chain balance after transfer
    const newBalance = await getPChainBalance(address.P);
    useWizardStore.getState().setPChainBalance(newBalance);
}

export async function importExistingUTXOs(privateKeyHex: string): Promise<boolean> {
    const utxos = await getUTXOS(privateKeyHex);
    if (utxos.length === 0) {
        return false;
    }
    await importUTXOs(privateKeyHex, utxos);
    return true;
}

export async function exportUTXO(privateKeyHex: string, amount: number) {
    const publicClient = createPublicClient({
        chain: avalancheFuji,
        transport: http(RPC_ENDPOINT + '/ext/bc/C/rpc')
    });
    const evmapi = new evm.EVMApi(RPC_ENDPOINT);

    const context = await Context.getContextFromURI(RPC_ENDPOINT);
    const address = await getAddresses(privateKeyHex);
    const txCount = await publicClient.getTransactionCount({ address: address.C });
    const baseFee = await evmapi.getBaseFee();
    const addressBytes = utils.bech32ToBytes(address.P);

    const tx = evm.newExportTxFromBaseFee(
        context,
        baseFee / BigInt(1e9),
        BigInt(amount * 1e9),
        context.pBlockchainID,
        utils.hexToBuffer(address.C),
        [addressBytes],
        BigInt(txCount),
    );

    await addSignature(tx, privateKeyHex);
    await evmapi.issueSignedTx(tx.getSignedTx());
}

export async function getUTXOS(privateKeyHex: string) {
    //FIXME: ignores pagination

    const myAddress = await getAddresses(privateKeyHex);

    const pvmApi = new pvm.PVMApi(RPC_ENDPOINT);

    const { utxos } = await pvmApi.getUTXOs({
        sourceChain: 'C',
        addresses: [myAddress.P],
    });

    return utxos;
}

export async function importUTXOs(privateKeyHex: string, utxos: Utxo[]) {
    console.log('importing utxos', utxos);
    const myAddress = await getAddresses(privateKeyHex);

    const pvmApi = new pvm.PVMApi(RPC_ENDPOINT);
    const feeState = await pvmApi.getFeeState();
    const context = await Context.getContextFromURI(RPC_ENDPOINT);

    const importTx = pvm.e.newImportTx(
        {
            feeState,
            fromAddressesBytes: [utils.bech32ToBytes(myAddress.P)],
            sourceChainId: context.cBlockchainID,
            toAddressesBytes: [utils.bech32ToBytes(myAddress.P)],
            utxos,
        },
        context,
    );

    await addSignature(importTx, privateKeyHex);

    const issueResponse = await pvmApi.issueSignedTx(importTx.getSignedTx());
    console.log('issueResponse', issueResponse);
}

export async function getPChainBalance(address: string): Promise<string> {
    const response = await fetch('https://api.avax-test.network/ext/bc/P', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "platform.getBalance",
            params: {
                addresses: [address]
            }
        })
    });

    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message || 'Failed to fetch P-chain balance');
    }

    return data.result.balance;
}
