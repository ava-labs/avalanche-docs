import { describe, it, expect } from 'vitest';
import { MarshalSubnetToL1ConversionData, MarshalSubnetToL1ConversionDataArgs, SubnetToL1ConversionID } from './convertWarp';
import { bytesToHex } from 'viem';

describe('MarshalSubnetToL1ConversionData', () => {
    it('should correctly marshal subnet to L1 conversion data', () => {
        const node1PopJson = `{"nodeID":"NodeID-FTbzbUVtjSpKC4nFFFM9Gb8iAqJKZpzMQ","nodePOP":{"publicKey":"0xa2ea5071b185225223ceb743fe265b47905fff03c64d6517733b9f79bde4937bfab0a7b903e697e2b4b5b90a7aa74427","proofOfPossession":"0x98b52bcfbbb9425f14ca97aedcfc318e00f92daaac711cb0b6a7da4af9c9aac20f4ce986f45165747c4f5ece93860c250640e060a0ac6af89c95f2aadff1eb2515bb9fdd05dbdfa12bf63ba7e07dc53b94f37c31a3ecc680fdb76cc300821b8c"}}`;
        const node2PopJson = `{"nodeID":"NodeID-5o3bfUMfJhxfKYSKu3VyiAq7APVZNyX19","nodePOP":{"publicKey":"0xa09e63e32ce3b24205455bc470b54d6260bc826821857458b67adcab63ea842b392407b9dff0564ce520f6337ac2b5ca","proofOfPossession":"0x83fdae9dc276b17c8fe21f2800b6794466102d17d59ff914e667ed2ba4fecd948ad226b7d3aec6e5c813a303ef58429919ee029472646c582e636b07051fc495ae4c12f3b624f87945a489d5902472e53239a9a1417be83ecd6c9cd987f32663"}}`;

        const args: MarshalSubnetToL1ConversionDataArgs = {
            subnetId: "PFWYqXhRtrKGRvnSwCpxMXKa9d1pHmY8ASzu8mRCCBCb25p17",
            managerChainID: "QchxtYKkzHYB6qxLUfvpi95hgDYvMVVKh39YEdaGBZ7Lo6XKN",
            managerAddress: "0xc0dd1cdd60bd82a4c48fa06ddbd927da5443c58a",
            nonePopJsons: [node1PopJson, node2PopJson]
        }
        const marshaledData = MarshalSubnetToL1ConversionData(args);

        expect(bytesToHex(marshaledData)).toBe("0x000032858f45b192eeb190e643f6915d45f832def5d2021b77b151867ec29843af18359f4649f7d828a1ea590ae669509ac86fa9fc0cd7cd83f048323a73a1d315ad00000014c0dd1cdd60bd82a4c48fa06ddbd927da5443c58a00000002000000149e99c96338c2ae4131ba1d4fb1a9dd146e06d16ca2ea5071b185225223ceb743fe265b47905fff03c64d6517733b9f79bde4937bfab0a7b903e697e2b4b5b90a7aa744270000000000000064000000143495ce47a5968640acd0cbf613c050fd0a5b30cea09e63e32ce3b24205455bc470b54d6260bc826821857458b67adcab63ea842b392407b9dff0564ce520f6337ac2b5ca0000000000000064");

        const conversionID = SubnetToL1ConversionID(args);
        expect(bytesToHex(conversionID)).toBe("0xae4984e3c1f0b73c2e160b899295e4a2d44b2229f23bdb7b8eccbbbcb0ba7d93");
    });
});
