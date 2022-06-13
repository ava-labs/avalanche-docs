# Deprecating CB58 in AvalancheGo API

For performance reasons, we are working to deprecate `cb58` encoding in favor of `hex`. To prepare for this change, you can now specify `hex` for the `encoding` parameter in places where `cb58` is used explicitly or by default. For example, for API call [`avm.getUTXOs`](./apis/x-chain.md#avmgetutxos)

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
      "0000a195046108a85e60f7a864bb567745a37f50c6af282103e47cc62f036cee404700000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216",
      "0000ae8b1b94444eed8de9a81b1222f00f1b4133330add23d8ac288bffa98b85271100000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216",
      "0000731ce04b1feefa9f4291d869adc30a33463f315491e164d89be7d6d2d7890cfc00000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216",
      "0000b462030cc4734f24c0bc224cf0d16ee452ea6b67615517caffead123ab4fbf1500000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216",
      "000054f6826c39bc957c0c6d44b70f961a994898999179cc32d21eb09c1908d7167b00000000345aa98e8a990f4101e2268fab4c4e1f731c8dfbcffa3a77978686e6390d624f000000070000000000000001000000000000000000000001000000018ba98dabaebcd83056799841cfbc567d8b10f216"
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

You can also use `json` if it is supported.

This set of changes only deprecates the cb58 encoding type over the APIs. `txIDs`, `chainIDs`, and `subnetIDs` which are represented using cb58 are unmodified.
