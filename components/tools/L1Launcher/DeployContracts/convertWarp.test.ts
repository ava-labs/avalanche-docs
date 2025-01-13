import { describe, it, expect } from 'vitest';
import { addressCallBytes, MarshalSubnetToL1ConversionData, MarshalSubnetToL1ConversionDataArgs, PackL1ConversionMessage, SubnetToL1ConversionID, packWarpMessage } from './convertWarp';
import { bytesToHex, hexToBytes } from 'viem';

const node1PopJson = `{"nodeID":"NodeID-FTbzbUVtjSpKC4nFFFM9Gb8iAqJKZpzMQ","nodePOP":{"publicKey":"0xa2ea5071b185225223ceb743fe265b47905fff03c64d6517733b9f79bde4937bfab0a7b903e697e2b4b5b90a7aa74427","proofOfPossession":"0x98b52bcfbbb9425f14ca97aedcfc318e00f92daaac711cb0b6a7da4af9c9aac20f4ce986f45165747c4f5ece93860c250640e060a0ac6af89c95f2aadff1eb2515bb9fdd05dbdfa12bf63ba7e07dc53b94f37c31a3ecc680fdb76cc300821b8c"}}`;
const node2PopJson = `{"nodeID":"NodeID-5o3bfUMfJhxfKYSKu3VyiAq7APVZNyX19","nodePOP":{"publicKey":"0xa09e63e32ce3b24205455bc470b54d6260bc826821857458b67adcab63ea842b392407b9dff0564ce520f6337ac2b5ca","proofOfPossession":"0x83fdae9dc276b17c8fe21f2800b6794466102d17d59ff914e667ed2ba4fecd948ad226b7d3aec6e5c813a303ef58429919ee029472646c582e636b07051fc495ae4c12f3b624f87945a489d5902472e53239a9a1417be83ecd6c9cd987f32663"}}`;

const defaultArgs: MarshalSubnetToL1ConversionDataArgs = {
    subnetId: "PFWYqXhRtrKGRvnSwCpxMXKa9d1pHmY8ASzu8mRCCBCb25p17",
    managerChainID: "QchxtYKkzHYB6qxLUfvpi95hgDYvMVVKh39YEdaGBZ7Lo6XKN",
    managerAddress: "0xc0dd1cdd60bd82a4c48fa06ddbd927da5443c58a",
    nonePopJsons: [node1PopJson, node2PopJson]
}

describe('MarshalSubnetToL1ConversionData', () => {
    it('should correctly marshal subnet to L1 conversion data', () => {

        const marshaledData = MarshalSubnetToL1ConversionData(defaultArgs);

        expect(bytesToHex(marshaledData)).toBe("0x000032858f45b192eeb190e643f6915d45f832def5d2021b77b151867ec29843af18359f4649f7d828a1ea590ae669509ac86fa9fc0cd7cd83f048323a73a1d315ad00000014c0dd1cdd60bd82a4c48fa06ddbd927da5443c58a00000002000000149e99c96338c2ae4131ba1d4fb1a9dd146e06d16ca2ea5071b185225223ceb743fe265b47905fff03c64d6517733b9f79bde4937bfab0a7b903e697e2b4b5b90a7aa744270000000000000064000000143495ce47a5968640acd0cbf613c050fd0a5b30cea09e63e32ce3b24205455bc470b54d6260bc826821857458b67adcab63ea842b392407b9dff0564ce520f6337ac2b5ca0000000000000064");

        const conversionID = SubnetToL1ConversionID(defaultArgs);
        expect(bytesToHex(conversionID)).toBe("0xae4984e3c1f0b73c2e160b899295e4a2d44b2229f23bdb7b8eccbbbcb0ba7d93");
    });

    describe('addressCallBytes', () => {
        const cases = [
            {
                name: "subnet conversion with empty sourceAddress",
                sourceAddress: hexToBytes("0x"),
                payload: hexToBytes("0x11223344"),
                expected: "0x" + "0000" + "00000001" + "00000000" + "" + "00000004" + "11223344"
            },
            {
                name: "subnet conversion with non-empty sourceAddress",
                sourceAddress: hexToBytes("0x77777777"),
                payload: hexToBytes("0x111111"),
                expected: "0x" + "0000" + "00000001" + "00000004" + "77777777" + "00000003" + "111111"
            }
        ];

        cases.forEach(({ name, sourceAddress, payload, expected }) => {
            it(name, () => {
                const result = addressCallBytes(sourceAddress, payload);
                expect(bytesToHex(result)).toBe(expected);
            });
        });
    });

    it.skip('packs L1 conversion message', () => {
        const expectedMessage = "0x" + "000000000005" + //fuji ID
            "0000000000000000000000000000000000000000000000000000000000000000" + //platform chain id
            "00000034" + // ?
            "0000000000010000000000000026000000000000ae4984e3c1f0b73c2e160b899295e4a2d44b2229f23bdb7b8eccbbbcb0ba7d93" //subnetConversionAddressedCall

        const message = PackL1ConversionMessage(defaultArgs, 5);
        expect(bytesToHex(message)).toBe(expectedMessage);
    });

    it('packs warp message', () => {
        const networkID = 12345;
        const sourceChainID = "PFWYqXhRtrKGRvnSwCpxMXKa9d1pHmY8ASzu8mRCCBCb25p17";
        const message = hexToBytes("0x11223344");

        const result = packWarpMessage(networkID, sourceChainID, message);

        expect(bytesToHex(result)).toBe("0x" +
            "0000" + // codec version
            "00003039" + // networkID (12345 in hex)
            "32858f45b192eeb190e643f6915d45f832def5d2021b77b151867ec29843af18" + // sourceChainID bytes
            "00000004" + // message length
            "11223344"  // message
        );
    });
});
