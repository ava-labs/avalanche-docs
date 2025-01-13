// FIXME: this is a quick hack solution untill AvalancheJS supports this
// Please don't copy this code to other projects!

import { cb58ToHex } from "../utils/cb58";

interface MarshalSubnetToL1ConversionDataArgs {
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

const BootstrapValidatorWeight = 100

const codecVersion = 0
export function MarshalSubnetToL1ConversionData(args: MarshalSubnetToL1ConversionDataArgs): string {
    let result = ""

    result += encodeUint16Hex(codecVersion);
    result += cb58ToHex(args.subnetId, false);
    result += cb58ToHex(args.managerChainID, false);
    result += encodeVarBytesHex(args.managerAddress);
    result += encodeInt32Hex(args.nonePopJsons.length);
    for (const popJson of args.nonePopJsons) {
        const { nodeID, nodePOP } = JSON.parse(popJson) as NodePOP;
        result += encodeVarBytesHex(cb58ToHex(nodeID.split("-")[1], false));
        result += unZerox(nodePOP.publicKey);
        result += encodeInt64Hex(BootstrapValidatorWeight);
    }

    return result;
}

//4 bytes length + bytes
const encodeVarBytesHex = (bytes: string) => {
    bytes = unZerox(bytes);
    return encodeInt32Hex(bytes.length / 2) + bytes;
}

const encodeInt64Hex = (int: number) => {
    return int.toString(16).padStart(16, '0');
}

const encodeInt32Hex = (int: number) => {
    return int.toString(16).padStart(8, '0');
}

const encodeUint16Hex = (int: number) => {
    return int.toString(16).padStart(4, '0');
}

const unZerox = (hex: string) => hex.replace(/^0x/, '');
