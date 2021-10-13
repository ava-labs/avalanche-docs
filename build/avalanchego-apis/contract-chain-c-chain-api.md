---
description: The C-Chain is an instance of the Ethereum Virtual Machine (EVM)
---

{{cchainAddress}} =  0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc

# Contract Chain \(C-Chain\) API

_Note: Ethereum has its own notion of `networkID` and `chainID`. These have no relationship to Avalanche’s view of networkID and chainID and are purely internal to the_ [_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. On Mainnet, the C-Chain uses `1` and `43114` for these values. On the Fuji Testnet, it uses `1` and `43113` for these values. `networkID` and `chainID` can also be obtained using the `net_version` and `eth_chainId` methods._

## Deploying a Smart Contract

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## Ethereum APIs

### Ethereum API Endpoints

#### JSON-RPC Endpoints

To interact with C-Chain via the JSON-RPC endpoint:

```cpp
/ext/bc/C/rpc
```

To interact with other instances of the EVM via the JSON-RPC endpoint:

```cpp
/ext/bc/blockchainID/rpc
```

where `blockchainID` is the ID of the blockchain running the EVM.

#### WebSocket Endpoints

To interact with C-Chain via the websocket endpoint:

```cpp
/ext/bc/C/ws
```

For example, to interact with the C-Chain's Ethereum APIs via websocket on localhost you can use:

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

To interact with other instances of the EVM via the websocket endpoint:

```cpp
/ext/bc/blockchainID/ws
```

where `blockchainID` is the ID of the blockchain running the EVM.

### Methods

#### Standard Ethereum APIs

Avalanche offers an API interface identical to Geth's API except that it only supports the following services:

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

You can interact with these services the same exact way you’d interact with Geth. See the [Ethereum Wiki’s JSON-RPC Documentation](https://eth.wiki/json-rpc/API) and [Geth’s JSON-RPC Documentation](https://geth.ethereum.org/docs/rpc/server) for a full description of this API.

#### eth\_getAssetBalance

In addition to the standard Ethereum APIs, Avalanche offers `eth_getAssetBalance` to retrieve the balance of first class Avalanche Native Tokens on the C-Chain \(excluding AVAX, which must be fetched with `eth_getBalance`\).

**Signature**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address` owner of the asset
* `blk` is the block number or hash at which to retrieve the balance
* `assetID` id of the asset for which the balance is requested

**Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getAssetBalance",
    "params": [
        "0x8723e5773847A4Eb5FeEDabD9320802c5c812F46",
        "latest",
        "3RvKBAmQnfYionFXMfW5P8TDZgZiogKbHjM8cjpu16LKAgF5T"
    ],
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

**Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

### eth\_baseFee

Get the base fee for the next block.

#### **Signature**

```cpp
eth_baseFee() -> {}
```

`result` is the hex value of the base fee for the next block.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth\_maxPriorityFeePerGas

Get the priority fee needed to be included in a block.

#### **Signature**

```cpp
eth_maxPriorityFeePerGas() -> {}
```

`result` is hex value of the priority fee needed to be included in a block.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

For more information on dynamic fees see the [C-Chain section of the transaction fee documentation](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees).

### eth\_blockNumber

Get the most recent block number.

#### **Signature**

```cpp
eth_blockNumber() -> {}
```

`result` is hex value of the block.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_blockNumber",
    "params" :[]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```


### eth\_call

Make a call to a contract without paying gas.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_call",
    "params" : [
        {
            "to": "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7",
            "data": "0xc92aecc4"
        },
        "latest"
    ]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x"
}
```

### eth\_chainId

Get the Chain ID.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_chainId",
    "params" : []
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xa868"
}
```

### eth\_getBalance

Get the AVAX balance.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getBalance",
    "params" : [
        "{{cchainAddress}}",
        "latest"
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x295be96e64066972000000"
}
```

### eth\_signTransaction

This method will create a signed transaction, but will not publish it automatically to the network. Instead, the `raw` result output should be used with `eth_sendRawTransaction` to execute the transaction.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_signTransaction",
    "params" :[
        {
            "from": "0xa64b27635c967dfe9674926bc004626163ddce97",
            "to": "0x1c5b0e12e90e9c52235babad76cfccab2519bb95",
            "gas": "0x5208",
            "gasPrice": "0x0",
            "nonce": "0x0",
            "value": "0x0"
        }
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x295be96e64066972000000"
}
```

### eth\_getTransactionCount

Retrieve the number of transactions to be used as a nonce.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getTransactionCount,
    "params" :[
        "{{cchainAddress}}",
        "latest"
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```


### eth\_sendRawTransaction

Broadcast a pre-signed transaction.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_sendRawTransaction,
    "params" :[
        "0xf8628080825208941c5b0e12e90e9c52235babad76cfccab2519bb958080830150efa0308ca8002f3df1a468eea9973d2d618eb866e2ef0a57cba4d34efb3025b70a0aa0592b7b0a803e7b70ec26dd74ab85aa71126198eff5552e5be638e6e26a455ee0"
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x8775a2ebead1dcd0f06fd7d0ea3ccc6ad175e3047f3ab2f4698757f1bd38cc10"
}
```



### eth\_getBlockByHash

Get a block by hash.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getBlockByHash,
    "params" :[
        "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
        true
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
    "difficulty": "0xbfabcdbd93dda",
    "extraData": "0x737061726b706f6f6c2d636e2d6e6f64652d3132",
    "gasLimit": "0x79f39e",
    "gasUsed": "0x79ccd3",
    "hash": "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
    "logsBloom": "0x4848112002a2020aaa0812180045840210020005281600c80104264300080008000491220144461026015300100000128005018401002090a824a4150015410020140400d808440106689b29d0280b1005200007480ca950b15b010908814e01911000054202a020b05880b914642a0000300003010044044082075290283516be82504082003008c4d8d14462a8800c2990c88002a030140180036c220205201860402001014040180002006860810ec0a1100a14144148408118608200060461821802c081000042d0810104a8004510020211c088200420822a082040e10104c00d010064004c122692020c408a1aa2348020445403814002c800888208b1",
    "miner": "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c",
    "mixHash": "0x3d1fdd16f15aeab72e7db1013b9f034ee33641d92f71c0736beab4e67d34c7a7",
    "nonce": "0x4db7a1c01d8a8072",
    "number": "0x5bad55",
    "parentHash": "0x61a8ad530a8a43e3583f8ec163f773ad370329b2375d66433eb82f005e1d6202",
    "receiptsRoot": "0x5eced534b3d84d3d732ddbc714f5fd51d98a941b28182b6efe6df3a0fe90004b",
    "sha3Uncles": "0x8a562e7634774d3e3a36698ac4915e37fc84a2cd0044cb84fa5d80263d2af4f6",
    "size": "0x41c7",
    "stateRoot": "0xf5208fffa2ba5a3f3a2f64ebd5ca3d098978bedd75f335f56b705d8715ee2305",
    "timestamp": "0x5b541449",
    "totalDifficulty": "0x12ac11391a2f3872fcd",
    "transactions": [
      "0x8784d99762bccd03b2086eabccee0d77f14d05463281e121a62abfebcf0d2d5f",
      "0x311be6a9b58748717ac0f70eb801d29973661aaf1365960d159e4ec4f4aa2d7f",
      "0xe42b0256058b7cad8a14b136a0364acda0b4c36f5b02dea7e69bfd82cef252a2",
      "0x4eb05376055c6456ed883fc843bc43df1dcf739c321ba431d518aecd7f98ca11",
      "0x994dd9e72b212b7dc5fd0466ab75adf7d391cf4f206a65b7ad2a1fd032bb06d7",
      "0xf6feecbb9ab0ac58591a4bc287059b1133089c499517e91a274e6a1f5e7dce53",
      "0x7e537d687a5525259480440c6ea2e1a8469cd98906eaff8597f3d2a44422ff97",
      "0x1a8ac77aff614caeca16a5a3a0931375a5a4fbe0ef1e15d6d15bf6f8e3c60f4f",
      "0xdb899136f41a3d4710907345b09d241490776383271e6b9887499fd05b80fcd4",
      "0x1007e17b1120d37fb930f953d8a3440ca11b8fd84470eb107c8b4a402a9813fd",
      "0x0910324706ffeebf8aa25ca0784636518bf67e5d173c22438a64dd43d5f4aa2a",
      "0x028f2bee56aee7005abcb2258d6d9f0f078a85a65c3d669aca40564ef4bd7f94",
      "0x14adac9bc94cde3166f4b7d42e8862a745483c708e51afbe89ecd6532acc532e",
      "0x54bed12ccad43523ba8527d1b99f5fa04a55b3a7724cfff2e0a21ec90b08590e",
      "0xcdf05df923f6e418505750069d6486276b15fcc3cd2f42a7044c642d19a86d51",
      "0x0c66977ed87db75074cb2bea66b254af3b20bb3315e8095290ceb1260b1b7449",
      "0x22626e2678da34b505b233ef08fc91ea79c5006dff00e33a442fa51a11e34c25",
      "0xe2989560000a1fc7c434c5e9c4bba82e1501bf435292ac25acc3cb182c1c2cd0",
      "0x348cfc85c58b7f3b2e8bdaa517dc8e3c5f8fb41e3ba235f28892b46bc3484756",
      "0x4ac009cebc1f2416b9e39bcc5b41cd53b1a9239e8f6c0ab043b8830ef1ffc563",
      "0xf2a96682362b9ffe9a77190bcbc47937743b6e1da2c56257f9b562f15bbd3cfa",
      "0xf1cd627c97746bc75727c2f0efa2d0dc66cca1b36d8e45d897e18a9b19af2f60",
      "0x241d89f7888fbcfadfd415ee967882fec6fdd67c07ca8a00f2ca4c910a84c7dd"
    ],
    "transactionsRoot": "0xf98631e290e88f58a46b7032f025969039aa9b5696498efc76baf436fa69b262",
    "uncles": [
      "0x824cce7c7c2ec6874b9fa9a9a898eb5f27cbaf3991dfa81084c3af60d1db618c"
    ]
  }
}
```



### eth\_getBlockByNumber

Getting a block by number in hex value.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getBlockByNumber,
    "params" :[
        "0x5",
        true
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
    "difficulty": "0xbfabcdbd93dda",
    "extraData": "0x737061726b706f6f6c2d636e2d6e6f64652d3132",
    "gasLimit": "0x79f39e",
    "gasUsed": "0x79ccd3",
    "hash": "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
    "logsBloom": "0x4848112002a2020aaa0812180045840210020005281600c80104264300080008000491220144461026015300100000128005018401002090a824a4150015410020140400d808440106689b29d0280b1005200007480ca950b15b010908814e01911000054202a020b05880b914642a0000300003010044044082075290283516be82504082003008c4d8d14462a8800c2990c88002a030140180036c220205201860402001014040180002006860810ec0a1100a14144148408118608200060461821802c081000042d0810104a8004510020211c088200420822a082040e10104c00d010064004c122692020c408a1aa2348020445403814002c800888208b1",
    "miner": "0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c",
    "mixHash": "0x3d1fdd16f15aeab72e7db1013b9f034ee33641d92f71c0736beab4e67d34c7a7",
    "nonce": "0x4db7a1c01d8a8072",
    "number": "0x5bad55",
    "parentHash": "0x61a8ad530a8a43e3583f8ec163f773ad370329b2375d66433eb82f005e1d6202",
    "receiptsRoot": "0x5eced534b3d84d3d732ddbc714f5fd51d98a941b28182b6efe6df3a0fe90004b",
    "sha3Uncles": "0x8a562e7634774d3e3a36698ac4915e37fc84a2cd0044cb84fa5d80263d2af4f6",
    "size": "0x41c7",
    "stateRoot": "0xf5208fffa2ba5a3f3a2f64ebd5ca3d098978bedd75f335f56b705d8715ee2305",
    "timestamp": "0x5b541449",
    "totalDifficulty": "0x12ac11391a2f3872fcd",
    "transactions": [
      "0x8784d99762bccd03b2086eabccee0d77f14d05463281e121a62abfebcf0d2d5f",
      "0x311be6a9b58748717ac0f70eb801d29973661aaf1365960d159e4ec4f4aa2d7f",
      "0xe42b0256058b7cad8a14b136a0364acda0b4c36f5b02dea7e69bfd82cef252a2",
      "0x4eb05376055c6456ed883fc843bc43df1dcf739c321ba431d518aecd7f98ca11",
      "0x994dd9e72b212b7dc5fd0466ab75adf7d391cf4f206a65b7ad2a1fd032bb06d7",
      "0xf6feecbb9ab0ac58591a4bc287059b1133089c499517e91a274e6a1f5e7dce53",
      "0x7e537d687a5525259480440c6ea2e1a8469cd98906eaff8597f3d2a44422ff97",
      "0x1a8ac77aff614caeca16a5a3a0931375a5a4fbe0ef1e15d6d15bf6f8e3c60f4f",
      "0xdb899136f41a3d4710907345b09d241490776383271e6b9887499fd05b80fcd4",
      "0x1007e17b1120d37fb930f953d8a3440ca11b8fd84470eb107c8b4a402a9813fd",
      "0x0910324706ffeebf8aa25ca0784636518bf67e5d173c22438a64dd43d5f4aa2a",
      "0x028f2bee56aee7005abcb2258d6d9f0f078a85a65c3d669aca40564ef4bd7f94",
      "0x14adac9bc94cde3166f4b7d42e8862a745483c708e51afbe89ecd6532acc532e",
      "0x54bed12ccad43523ba8527d1b99f5fa04a55b3a7724cfff2e0a21ec90b08590e",
      "0xcdf05df923f6e418505750069d6486276b15fcc3cd2f42a7044c642d19a86d51",
      "0x0c66977ed87db75074cb2bea66b254af3b20bb3315e8095290ceb1260b1b7449",
      "0x22626e2678da34b505b233ef08fc91ea79c5006dff00e33a442fa51a11e34c25",
      "0xe2989560000a1fc7c434c5e9c4bba82e1501bf435292ac25acc3cb182c1c2cd0",
      "0x348cfc85c58b7f3b2e8bdaa517dc8e3c5f8fb41e3ba235f28892b46bc3484756",
      "0x4ac009cebc1f2416b9e39bcc5b41cd53b1a9239e8f6c0ab043b8830ef1ffc563",
      "0xf2a96682362b9ffe9a77190bcbc47937743b6e1da2c56257f9b562f15bbd3cfa",
      "0xf1cd627c97746bc75727c2f0efa2d0dc66cca1b36d8e45d897e18a9b19af2f60",
      "0x241d89f7888fbcfadfd415ee967882fec6fdd67c07ca8a00f2ca4c910a84c7dd"
    ],
    "transactionsRoot": "0xf98631e290e88f58a46b7032f025969039aa9b5696498efc76baf436fa69b262",
    "uncles": [
      "0x824cce7c7c2ec6874b9fa9a9a898eb5f27cbaf3991dfa81084c3af60d1db618c"
    ]
  }
}
```



### eth\_getTransactionByHash

Returns information about a transaction for a given hash.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getTransactionByHash,
    "params" :[
        "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7"
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result":  {
    "blockHash": "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
    "blockNumber": "0x5bad55",
    "from": "0x398137383b3d25c92898c656696e41950e47316b",
    "gas": "0x1d45e",
    "gasPrice": "0xfa56ea00",
    "hash": "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
    "input": "0xf7d8c88300000000000000000000000000000000000000000000000000000000000cee6100000000000000000000000000000000000000000000000000000000000ac3e1",
    "nonce": "0x18",
    "r": "0x2a378831cf81d99a3f06a18ae1b6ca366817ab4d88a70053c41d7a8f0368e031",
    "s": "0x450d831a05b6e418724436c05c155e0a1b7b921015d0fbc2f667aed709ac4fb5",
    "to": "0x06012c8cf97bead5deae237070f9587f8e7a266d",
    "transactionIndex": "0x11",
    "v": "0x25",
    "value": "0x1c6bf526340000"
  }
}
```



### eth\_getTransactionReceipt

Returns the receipt of a transaction by transaction hash. Note that the receipt is not available for pending transactions.


#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_getTransactionReceipt,
    "params" :[
        "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7"
    ],
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result":{
    "blockHash": "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
    "blockNumber": "0x5bad55",
    "contractAddress": null,
    "cumulativeGasUsed": "0xb90b0",
    "from": "0x398137383b3d25c92898c656696e41950e47316b",
    "gasUsed": "0x1383f",
    "logs": [
      {
        "address": "0x06012c8cf97bead5deae237070f9587f8e7a266d",
        "blockHash": "0xb3b20624f8f0f86eb50dd04688409e5cea4bd02d700bf6e79e9384d47d6a5a35",
        "blockNumber": "0x5bad55",
        "data": "0x000000000000000000000000398137383b3d25c92898c656696e41950e47316b00000000000000000000000000000000000000000000000000000000000cee6100000000000000000000000000000000000000000000000000000000000ac3e100000000000000000000000000000000000000000000000000000000005baf35",
        "logIndex": "0x6",
        "removed": false,
        "topics": [
          "0x241ea03ca20251805084d27d4440371c34a0b85ff108f6bb5611248f73818b80"
        ],
        "transactionHash": "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
        "transactionIndex": "0x11"
      }
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000200000000000000000000000000000",
    "status": "0x1",
    "to": "0x06012c8cf97bead5deae237070f9587f8e7a266d",
    "transactionHash": "0xbb3a336e3f823ec18197f1e13ee875700f08f03e2cab75f0d0b118dabb44cba0",
    "transactionIndex": "0x11"
  }
}
```


## Avalanche Specific APIs

### Avalanche Specific API Endpoints

To interact with the `avax` specific RPC calls on the C-Chain:

```cpp
/ext/bc/C/avax
```

To interact with other instances of the EVM AVAX endpoints:

```cpp
/ext/bc/blockchainID/avax
```

### avax.getAtomicTx

Gets a transaction by its ID. Optional encoding parameter to specify the format for the returned transaction. Can be either `cb58` or `hex`. Defaults to `cb58`.

#### Signature

```go
avax.getAtomicTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
    blockHeight: string
}
```

**Request**

* `txID` is the transacion ID. It should be in cb58 format.
* `encoding` is the encoding format to use. Can be either `cb58` or `hex`. Defaults to `cb58`.

**Response**

* `tx` is the transaction encoded to `encoding`.
* `encoding` is the `encoding`.
* `blockHeight` is the height of the block which the transaction was included in.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getAtomicTx",
    "params" :{
        "txID":"2GD5SRYJQr2kw5jE73trBFiAgVQyrCaeg223TaTyJFYXf2kPty",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111111115k3oJsP1JGxvsZPFh1WXzSYNVDtvgvZ4qDWtAs5ccogA1RtT3Me5x8xgkj7cyxaNGEHuMv5U34qo94fnvHweLeSRf31ggt3MoD7MHSDw6LbiXeaJa3uwBDHzd6tPxw17478X13Ff7DkHtbWYYx2WTcJYk4nVP2swCHjBE3uQjmu6RdhtgZCxvnD6YVpEsXqvam6cDzpf5BLaosYCSt5p8SmLU2ppaSb6DPA4EW4679ygUxiDNP3SFagjUvzSrfBJRFCzsan4ZJqH8haYqpJL42TUN4q3eFKvscZfp2v2WWEEwJYmJP4Nc1P7wndeMxPFEm3vjkBaVUZ5k25TpYtghq6Kx897dVNaMSsTAoudwqTR1cCUGiR3bLfi82MgnvuApsYqtRfaD9deSHc8UA1ohPehkj9eaY",
        "encoding": "cb58",
        "blockHeight": "1"
    },
    "id": 1
}
```


### avax.getAtomicTxStatus

Get the status of an atomic transaction sent to the network.

#### **Signature**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` is one of:

* `Accepted`: The transaction is \(or will be\) accepted by every node. Check the `blockHeight` property
* `Processing`: The transaction is being voted on by this node
* `Dropped`: The transaction was dropped by this node because it thought the transaction invalid
* `Unknown`: The transaction hasn’t been seen by this node

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getAtomicTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### **Example Response**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted",
        "blockHeight": "1"
    }
}
```



### avax.export

Export an asset from the C-Chain to the X-Chain. After calling this method, you must call [`avm.import`](exchange-chain-x-chain-api.md#avm-import) on the X-Chain to complete the transfer.

#### Signature

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to` is the X-Chain address the asset is sent to.
* `amount` is the amount of the asset to send.
* `assetID` is the ID of the asset. To export AVAX use `"AVAX"` as the `assetID`.
* The asset is sent from addresses controlled by `username` and `password`.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.export",
    "params" :{
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "assetID": "2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2W5JuFENitZKTpJsy9igBpTcEeBKxBHHGAUkgsSUnkjVVGQ9i8"
    },
    "id": 1
}
```

### avax.exportAVAX

**DEPRECATED—instead use** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

Send AVAX from the C-Chain to the X-Chain. After calling this method, you must call [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) on the X-Chain to complete the transfer.

#### Signature

```go
avax.exportAVAX({
    to: string,
    amount: int,
    destinationChain: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `from` is the C-Chain addresses the AVAX is sent from. They should be in hex format.
* `to` is the X-Chain address the AVAX is sent to. It should be in bech32 format.
* `amount` is the amount of nAVAX to send.
* `destinationChain` is the chain the AVAX is sent to. To export funds to the X-Chain, use `"X"`.
* `changeAddr` is the C-Chain address where any change is sent to. It should be in hex format.
* The AVAX is sent from addresses controlled by `username`

**Response**

* `txID` is the txid of the completed ExportTx.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "from": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"],
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "destinationChain": "X",
        "changeAddr": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ffcxdkiKXXA4JdyRoS38dd7zoThkapNPeZuGPmmLBbiuBBHDa"
    },
    "id": 1
}
```

### avax.exportKey

Get the private key that controls a given address. The returned private key can be added to a user with `avax.importKey`.

#### Signature

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Request**

* `username` must control `address`.
* `address` is the address for which you want to export the corresponding private key. It should be in hex format.

**Response**

* `privateKey` is the CB58 endcoded string representation of the private key that controls `address`. It has a `PrivateKey-` prefix and can be used to import a key via `avax.importKey`.
* `privateKeyHex` is the hex string representation of the private key that controls `address`. It can be used to import an account into Metamask.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "privateKey": "PrivateKey-2o2uPgTSf3aR5nW6yLHjBEAiatAFKEhApvYzsjvAJKRXVWCYkE",
        "privateKeyHex": "0xec381fb8d32168be4cf7f8d4ce9d8ca892d77ba574264f3665ad5edb89710157"
    },
    "id": 1
}}
```

### avax.getUTXOs

Gets the UTXOs that reference a given address.

#### **Signature**

```cpp
avax.getUTXOs(
    {
        addresses: string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string,
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    }
}
```

* `utxos` is a list of UTXOs such that each UTXO references at least one address in `addresses`.
* At most `limit` UTXOs are returned. If `limit` is omitted or greater than 1024, it is set to 1024.
* This method supports pagination. `endIndex` denotes the last UTXO returned. To get the next set of UTXOs, use the value of `endIndex` as `startIndex` in the next call.
* If `startIndex` is omitted, will fetch all UTXOs up to `limit`.
* When using pagination \(ie when `startIndex` is provided\), UTXOs are not guaranteed to be unique across multiple calls. That is, a UTXO may appear in the result of the first call, and then again in the second call.
* When using pagination, consistency is not guaranteed across multiple calls. That is, the UTXO set of the addresses may have changed between calls.
* `encoding` sets the format for the returned UTXOs. Can be either "cb58" or "hex". Defaults to "cb58".

#### **Example**

Suppose we want all UTXOs that reference at least one of `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getUTXOs",
    "params" :{
        "addresses":["C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf"],
        "sourceChain": "X",
        "startIndex": {
            "address": "C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
            "utxo": "22RXW7SWjBrrxu2vzDkd8uza7fuEmNpgbj58CxBob9UbP37HSB"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

This gives response:

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "3",
        "utxos": [
            "11QEQTor9xZ1TyCyq8aFVShdP7YjM1ug9KuPUuMpgvQVz5qjEzo244NbJomjciNUPqUr1cD455dXhVrVNopnMXTQrTFY5kqrEVAQ3Ng9AnapQrYVEYiWc32F5CQuD3N5sB1EhQmMdJr5pis1QLjMmRQmut7Maafwup1vEU",
            "11Eo6c9iUz3ERtmHbdUb3nzzMaqFffFQStshEsSTiFQP5xqfmeaeCFHCBajmoJUdQRHtkChGAmPucDfuCyBAEyGmmv2w8b7dX5sATxV7HxHZE4eak14GMGVEr7v3ij1B8mE82cymTJJz1X3PpRk2pTaxwEnLWfh1aAiTFC",
            "118mpEHsia5sYYvKUx4j56mA7i1yvmLNyynm7LcmehcJJwMVY65smT4kGQgyc9DULwuaLTrUcsqbQutCdajoJXBdPVqvHMkYBTYQKs7WSmTXH8v7iUVqZfphMnS7VxVjGU1zykeTnbuAoZt4cFMUJzd8JaZk5eC82zmLmT"
        ],
        "endIndex": {
            "address": "C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
            "utxo": "27q6nsuvtyT4mvXVnQQAXw1YKoTxCow5Qm91GZ678TU1SvUiC2"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### avax.import

Finalize the transfer of a non-AVAX or AVAX from the X-Chain to the C-Chain. Before this method is called, you must call the X-Chain's [`avm.export`](exchange-chain-x-chain-api.md#avm-export) method to initiate the transfer.

#### Signature

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the address the asset is sent to. This must be the same as the `to` argument in the corresponding call to the C-Chain's `export`.
* `sourceChain` is the ID or alias of the chain the asset is being imported from. To import funds from the X-Chain, use `"X"`.
* `username` is the user that controls `to`.

**Response**

* `txID` is the ID of the completed ImportTx.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.import",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6bJq9dbqhiQvoshT3uSUbg9oB24n7Ei6MLnxvrdmao78oHR9t"
    },
    "id": 1
}
```

### avax.importAVAX

**DEPRECATED—instead use** [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finalize a transfer of AVAX from the X-Chain to the C-Chain. Before this method is called, you must call the X-Chain's [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) method to initiate the transfer.

#### Signature

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the address the AVAX is sent to. It should be in hex format.
* `sourceChain` is the ID or alias of the chain the AVAX is being imported from. To import funds from the X-Chain, use `"X"`.
* `username` is the user that controls `to`.

**Response**

* `txID` is the ID of the completed ImportTx.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importAVAX",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

### avax.importKey

Give a user control over an address by providing the private key that controls the address.

#### Signature

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Request**

* Add `privateKey` to `username`'s set of private keys.

**Response**

* `address` is the address `username` now controls with the private key. It will be in hex format.

#### Example Call

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2o2uPgTSf3aR5nW6yLHjBEAiatAFKEhApvYzsjvAJKRXVWCYkE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    },
    "id": 1
}
```

### avax.issueTx

Send a signed transaction to the network. `encoding` specifies the format of the signed transaction. Can be either "cb58" or "hex". Defaults to "cb58".

#### **Signature**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avax.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### **Example Response**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```
