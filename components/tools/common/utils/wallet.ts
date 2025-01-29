declare global {
    interface Window {
        ethereum?: {
            request: (args: { method: string; params?: any[] }) => Promise<any>;
            on: (event: string, callback: (...args: any[]) => void) => void;
            removeListener: (event: string, callback: (...args: any[]) => void) => void;
        };
    }
}

export async function getWalletAddress() {
    if (!window.ethereum) {
        throw new Error('No wallet detected');
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
        throw new Error('No account found');
    }

    return accounts[0]; // Return the first account
}


import { secp256k1, UnsignedTx, utils } from '@avalabs/avalanchejs';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { Address } from 'micro-eth-signer';
import { keccak256, toRlp, toBytes } from 'viem'


export function newPrivateKey(): string {
    return bytesToHex(secp256k1.randomPrivateKey());
}

export function getAddresses(privateKeyHex: string): { C: `0x${string}`, P: string } {
    const publicKey = secp256k1.getPublicKey(hexToBytes(privateKeyHex));

    const pChainAddress = `P-${utils.formatBech32(
        "fuji",
        secp256k1.publicKeyBytesToAddress(publicKey)
    )}`

    const cChainAddress = Address.fromPublicKey(publicKey) as `0x${string}`

    return {
        C: cChainAddress,
        P: pChainAddress
    }
}

export async function addSignature(tx: UnsignedTx, privateKeyHex: string) {
    const privateKey = hexToBytes(privateKeyHex);
    const unsignedBytes = tx.toBytes();
    const publicKey = secp256k1.getPublicKey(privateKey);

    if (tx.hasPubkey(publicKey)) {
        const signature = await secp256k1.sign(unsignedBytes, privateKey);
        tx.addSignature(signature);
    } else {
        throw new Error("Public key not found in transaction");
    }
}

export function calculateContractAddress(deployerPrivateKey: string, nonce: number): `0x${string}` {
    // Get deployer address from private key
    const { C: deployerAddress } = getAddresses(deployerPrivateKey);

    // Remove '0x' prefix from address and convert to bytes
    const addressBytes = toBytes(deployerAddress);

    // Convert nonce to bytes - if 0, use empty array
    const nonceBytes = nonce === 0 ? new Uint8Array() : toBytes(nonce);

    // RLP encode the deployer address and nonce
    const encodedData = toRlp([addressBytes, nonceBytes]);

    // Calculate keccak256 hash and take last 20 bytes (40 hex chars)
    const hash = keccak256(encodedData);
    const contractAddress = `0x${hash.slice(-40)}` as `0x${string}`;

    return contractAddress;
}
