# Deprecating CB58 in AvalancheGo API

## Overview

For performance reasons, we are working to deprecate `cb58` encoding in favor of `hex` in the response of AvalancheGo API calls. Transaction IDs (`txIDs`), `chainIDs`, and `subnetIDs` which are represented using `cb58` are unchanged.

To prepare for this change, you can now specify `hex` for the `encoding` parameter in places where `cb58` is used explicitly or by default. For example, for API call [`avm.getUTXOs`](./apis/x-chain.md#avmgetutxos) in which

- `encoding` sets the format for the returned UTXOs.

you can specify `"encoding": "hex"` when issuing the API call.

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5", "X-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5"],
        "limit":5,
        "encoding": "hex"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

This gives response where utxos will be in `hex` format:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "numFetched": "5",
    "utxos": [
      "0x0000a195046108a85e60f7a864bb567745a37f50c6af282103e47cc62f036cee404700000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216c1f01765",
      "0x0000ae8b1b94444eed8de9a81b1222f00f1b4133330add23d8ac288bffa98b85271100000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216473d042a",
      "0x0000731ce04b1feefa9f4291d869adc30a33463f315491e164d89be7d6d2d7890cfc00000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f21600dd3047",
      "0x0000b462030cc4734f24c0bc224cf0d16ee452ea6b67615517caffead123ab4fbf1500000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216c71b387e",
      "0x000054f6826c39bc957c0c6d44b70f961a994898999179cc32d21eb09c1908d7167b00000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f2166290e79d"
    ],
    "endIndex": {
      "address": "X-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5",
      "utxo": "kbUThAUfmBXUmRgTpgD6r3nLj7rJUGho6xyht5nouNNypH45j"
    },
    "encoding": "hex"
  },
  "id": 1
}
```

You can also use `json` if the api supports it.

## Affected APIs

Following APIs are affected with this change:

### X-Chain API

- [avm.buildGenesis](./apis/x-chain.md#avmbuildgenesis)
- [avm.mintNFT](./apis/x-chain.md#avmmintnft)
- [avm.getTx](./apis/x-chain.md#avmgettx)
- [avm.getUTXOs](./apis/x-chain.md#avmgetutxos)
- [avm.issueTx](./apis/x-chain.md#avmissuetx)
- [wallet.issueTx](./apis/x-chain.md#walletissuetx)

### P-Chain API

- [platform.createBlockchain](./apis/p-chain.md#platformcreateblockchain)
- [platform.getBlock](./apis/p-chain.md#platformgetblock)
- [platform.getRewardUTXOs](./apis/p-chain.md#platformgetrewardutxos)
- [platform.getTx](./apis/p-chain.md#platformgettx)
- [platform.getUTXOs](./apis/p-chain.md#platformgetutxos)
- [platform.issueTx](./apis/p-chain.md#platformissuetx)

### C-Chain API

- [avax.getAtomicTx](./apis/c-chain.md#avaxgetatomictx)
- [avax.getUTXOs](./apis/c-chain.md#avaxgetutxos)
- [avax.issueTx](./apis/c-chain.md#avaxissuetx)

### Index API

- [index.getLastAccepted](./apis/index-api.md#indexgetlastaccepted)
- [index.getContainerByIndex](./apis/index-api.md#indexgetcontainerbyindex)
- [index.getContainerByID](./apis/index-api.md#indexgetcontainerbyindex)
- [index.getContainerRange](./apis/index-api.md#indexgetcontainerrange)
- [index.getIndex](./apis/index-api.md#indexgetindex)
- [index.isAccepted](./apis/index-api.md#indexisaccepted)

### Keystore API

- [keystore.exportUser](./apis/keystore.md#keystoreexportuser)
- [keystore.importUser](./apis/keystore.md#keystoreimportuser)
