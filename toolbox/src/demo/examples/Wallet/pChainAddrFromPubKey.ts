import {
    utils,
    secp256k1,
    networkIDs,
} from "@avalabs/avalanchejs";
import { Buffer as BufferPolyfill } from "buffer";
import { SigningKey } from 'ethers';

export function pChainAddrFromPubKey(xpPublicKey: string, networkID: number) {
    if (!xpPublicKey.startsWith("0x")) {
        xpPublicKey = `0x${xpPublicKey}`;
    }
    const compressed = SigningKey.computePublicKey(xpPublicKey, true).slice(2);
    const pubComp = BufferPolyfill.from(compressed, "hex");
    const address = secp256k1.publicKeyBytesToAddress(pubComp);
    return utils.format("P", networkIDs.getHRP(networkID), address)
}
