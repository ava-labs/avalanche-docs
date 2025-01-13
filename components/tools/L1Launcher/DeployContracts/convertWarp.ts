// FIXME: this is a quick hack solution untill AvalancheJS supports this
// Please don't copy this code to other projects!
import { sha256 } from '@noble/hashes/sha256';
import { cb58ToBytes } from "../utils/cb58";
import { pvmSerial, } from '@avalabs/avalanchejs';
import { bytesToHex } from 'viem';

export interface MarshalSubnetToL1ConversionDataArgs {
    subnetId: string;
    managerChainID: string;
    managerAddress: `0x${string}`;
    nonePopJsons: string[];
}

interface NodePOP {
    nodeID: string;
    nodePOP: {
        publicKey: string;
        proofOfPossession: string;
    };
}

const BootstrapValidatorWeight = 100n;
const codecVersion = 0;

function encodeUint16(num: number): Uint8Array {
    const arr = new Uint8Array(2);
    arr[0] = (num >> 8) & 0xff;
    arr[1] = num & 0xff;
    return arr;
}

function encodeInt32(num: number): Uint8Array {
    const arr = new Uint8Array(4);
    arr[0] = (num >> 24) & 0xff;
    arr[1] = (num >> 16) & 0xff;
    arr[2] = (num >> 8) & 0xff;
    arr[3] = num & 0xff;
    return arr;
}

function encodeInt64(num: bigint): Uint8Array {
    const arr = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) {
        arr[i] = Number(num & 0xffn);
        num = num >> 8n;
    }
    return arr;
}

function hexToBytes(hex: string): Uint8Array {
    hex = hex.replace(/^0x/, '');
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return bytes;
}

function encodeVarBytes(bytes: Uint8Array): Uint8Array {
    const lengthBytes = encodeInt32(bytes.length);
    const result = new Uint8Array(lengthBytes.length + bytes.length);
    result.set(lengthBytes);
    result.set(bytes, lengthBytes.length);
    return result;
}

function concatenateUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
    const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}

export function MarshalSubnetToL1ConversionData(args: MarshalSubnetToL1ConversionDataArgs): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(encodeUint16(codecVersion));
    parts.push(cb58ToBytes(args.subnetId));
    parts.push(cb58ToBytes(args.managerChainID));
    parts.push(encodeVarBytes(hexToBytes(args.managerAddress)));
    parts.push(encodeInt32(args.nonePopJsons.length));

    for (const popJson of args.nonePopJsons) {
        const { nodeID, nodePOP } = JSON.parse(popJson) as NodePOP;
        parts.push(encodeVarBytes(cb58ToBytes(nodeID.split("-")[1])));
        parts.push(hexToBytes(nodePOP.publicKey));
        parts.push(encodeInt64(BootstrapValidatorWeight));
    }

    const result = concatenateUint8Arrays(...parts);
    return result;
}


export const SubnetToL1ConversionID = (args: MarshalSubnetToL1ConversionDataArgs): Uint8Array => {
    const data = MarshalSubnetToL1ConversionData(args);
    return sha256(data);
}

export const getAddressCallBytes = (sourceAddress: Uint8Array, conversionID: Uint8Array): Uint8Array => {
    const parts: Uint8Array[] = [];

    parts.push(encodeUint16(codecVersion));
    parts.push(encodeInt32(1));//FIXME: I have zero idea what this is, but every time it is "00000001"
    parts.push(encodeVarBytes(sourceAddress));
    parts.push(encodeVarBytes(conversionID));

    return concatenateUint8Arrays(...parts);
}

export function addressedCallPayloadFromL1ConversionID(subnetConversionID: Uint8Array): Uint8Array {
    const parts: Uint8Array[] = [];

    // Add codec version (uint16)
    parts.push(encodeUint16(codecVersion));

    // Add empty source address length (uint32)
    parts.push(encodeInt32(0));

    // Add subnetConversionID
    parts.push(subnetConversionID);

    return concatenateUint8Arrays(...parts);
}

export function PackL1ConversionMessage(args: MarshalSubnetToL1ConversionDataArgs, networkID: number, sourceChainID: string): Uint8Array {
    const subnetConversionID = SubnetToL1ConversionID(args);

    console.log("subnetConversionID: ", bytesToHex(subnetConversionID))
    const addressedCallPayload = addressedCallPayloadFromL1ConversionID(subnetConversionID)
    console.log("addressedCallPayload: ", bytesToHex(addressedCallPayload))

    const subnetConversionAddressedCall = getAddressCallBytes(new Uint8Array([]), addressedCallPayload)
    console.log("subnetConversionAddressedCall: ", bytesToHex(subnetConversionAddressedCall))

    return packWarpMessage(networkID, sourceChainID, subnetConversionAddressedCall);
}

export function packWarpMessage(networkID: number, sourceChainID: string, message: Uint8Array): Uint8Array {
    const parts: Uint8Array[] = [];

    // Add codec version (uint16)
    parts.push(encodeUint16(codecVersion));

    // Add networkID (uint32)
    parts.push(encodeInt32(networkID));

    // Add sourceChainID
    parts.push(cb58ToBytes(sourceChainID));

    // Add message length and message
    parts.push(encodeInt32(message.length));
    parts.push(message);

    return concatenateUint8Arrays(...parts);
}
