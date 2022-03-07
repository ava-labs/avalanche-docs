---
description: More information available regarding Avalanche Go APIs and learning how to interact with the C-Chain. 
sidebar_position: 4
---

# Contract Chain (C-Chain) API

_Note: Ethereum has its own notion of `networkID` and `chainID`. These have no relationship to Avalanche’s view of networkID and chainID and are purely internal to the_ [_C-Chain_](../../learn/platform-overview/README.md#contract-chain-c-chain)_. On Mainnet, the C-Chain uses `1` and `43114` for these values. On the Fuji Testnet, it uses `1` and `43113` for these values. `networkID` and `chainID` can also be obtained using the `net_version` and `eth_chainId` methods._

## Deploying a Smart Contract

[Deploy a Smart Contract on Avalanche Using Remix and MetaMask](../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)

## Ethereum APIs

### Ethereum API Endpoints

#### JSON-RPC Endpoints

To interact with C-Chain via the JSON-RPC endpoint:

```
/ext/bc/C/rpc
```

To interact with other instances of the EVM via the JSON-RPC endpoint:

```
/ext/bc/blockchainID/rpc
```

where `blockchainID` is the ID of the blockchain running the EVM.

#### WebSocket Endpoints

:::info
On the [public api node](../tools/public-api.md#supported-apis), it only supports C-Chain websocket API calls for API methods that don't exist on the C-Chain's HTTP API
:::


To interact with C-Chain via the websocket endpoint:

```
/ext/bc/C/ws
```

For example, to interact with the C-Chain's Ethereum APIs via websocket on localhost you can use:

```
ws://127.0.0.1:9650/ext/bc/C/ws
```

Note: on localhost, use `ws://`. When using the [Public API](../tools/public-api.md) or another host that supports encryption, use `wss://`.

To interact with other instances of the EVM via the websocket endpoint:

```
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
* `debug_` (note: this is turned off on the public api node.)

You can interact with these services the same exact way you’d interact with Geth. See the [Ethereum Wiki’s JSON-RPC Documentation](https://eth.wiki/json-rpc/API) and [Geth’s JSON-RPC Documentation](https://geth.ethereum.org/docs/rpc/server) for a full description of this API.

:::info

Note: For batched requests on the [public api node](../tools/public-api.md) , the maximum number of items is 40. We are working on to support a larger batch size. 

:::

#### eth_getAssetBalance

In addition to the standard Ethereum APIs, Avalanche offers `eth_getAssetBalance` to retrieve the balance of first class Avalanche Native Tokens on the C-Chain (excluding AVAX, which must be fetched with `eth_getBalance`).

**Signature**

```sh
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

```sh
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

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

### eth_baseFee

Get the base fee for the next block.

#### **Signature**

```sh
eth_baseFee() -> {}
```

`result` is the hex value of the base fee for the next block.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :[]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth_maxPriorityFeePerGas

Get the priority fee needed to be included in a block.

#### **Signature**

```sh
eth_maxPriorityFeePerGas() -> {}
```

`result` is hex value of the priority fee needed to be included in a block.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :[]
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Example Response**

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

For more information on dynamic fees see the [C-Chain section of the transaction fee documentation](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees).

## Avalanche Specific APIs

### Endpoints

To interact with the `avax` specific RPC calls on the C-Chain:

```
/ext/bc/C/avax
```

To interact with other instances of the EVM AVAX endpoints:

```
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

```sh
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

```json
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

### avax.export

Export an asset from the C-Chain to the X-Chain. After calling this method, you must call [`avm.import`](x-chain.mdx#avmimport) on the X-Chain to complete the transfer.

#### Signature

```
avax.export({
    to: string,
    amount: int,
    assetID: string,
    baseFee: int,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to` is the X-Chain address the asset is sent to.
* `amount` is the amount of the asset to send.
* `assetID` is the ID of the asset. To export AVAX use `"AVAX"` as the `assetID`.
* `baseFee` is the base fee that should be used when creating the transaction. If ommitted, a suggested fee will be used.
* `username` is the user that controls the address that transaction will be sent from.
* `password` is `username`‘s password.

#### Example Call

```sh
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

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2W5JuFENitZKTpJsy9igBpTcEeBKxBHHGAUkgsSUnkjVVGQ9i8"
    },
    "id": 1
}
```

### avax.exportAVAX

**DEPRECATED—instead use** [**avax.export**](c-chain.md#avaxexport).

Send AVAX from the C-Chain to the X-Chain. After calling this method, you must call [`avm.import`](x-chain.mdx#avmimport) with assetID `AVAX` on the X-Chain to complete the transfer.

#### Signature

```go
avax.export({
    to: string,
    amount: int,
    baseFee: int,
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the X-Chain address the asset is sent to.
* `amount` is the amount of the asset to send.
* `baseFee` is the base fee that should be used when creating the transaction. If ommitted, a suggested fee will be used.
* `username` is the user that controls the address that transaction will be sent from.
* `password` is `username`‘s password.

**Response**

* `txID` is the txid of the completed ExportTx.

#### Example Call

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "from": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"],
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "changeAddr": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Example Response

```json
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

```sh
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

```json
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

```sh
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
* When using pagination (ie when `startIndex` is provided), UTXOs are not guaranteed to be unique across multiple calls. That is, a UTXO may appear in the result of the first call, and then again in the second call.
* When using pagination, consistency is not guaranteed across multiple calls. That is, the UTXO set of the addresses may have changed between calls.
* `encoding` sets the format for the returned UTXOs. Can be either "cb58" or "hex". Defaults to "cb58".

#### **Example**

Suppose we want all UTXOs that reference at least one of `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

```sh
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

```json
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

Finalize the transfer of a non-AVAX or AVAX from the X-Chain to the C-Chain. Before this method is called, you must call the X-Chain's [`avm.export`](x-chain.mdx#avmexport) method with assetID `AVAX` to initiate the transfer.

#### Signature

```go
avax.import({
    to: string,
    sourceChain: string,
    baseFee: int, // optional
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the address the asset is sent to. This must be the same as the `to` argument in the corresponding call to the C-Chain's `export`.
* `sourceChain` is the ID or alias of the chain the asset is being imported from. To import funds from the X-Chain, use `"X"`.
* `baseFee` is the base fee that should be used when creating the transaction. If omitted, a suggested fee will be used.
* `username` is the user that controls the address that transaction will be sent from.
* `password` is `username`‘s password.

**Response**

* `txID` is the ID of the completed ImportTx.

#### Example Call

```sh
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

```json
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6bJq9dbqhiQvoshT3uSUbg9oB24n7Ei6MLnxvrdmao78oHR9t"
    },
    "id": 1
}
```

### avax.importAVAX

**DEPRECATED—instead use** [**avax.import**](c-chain.md#avaximport)

Finalize a transfer of AVAX from the X-Chain to the C-Chain. Before this method is called, you must call the X-Chain's [`avm.export`](x-chain.mdx#avmexport) method with assetID `AVAX` to initiate the transfer.

#### Signature

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    baseFee: int, // optional
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the address the AVAX is sent to. It should be in hex format.
* `sourceChain` is the ID or alias of the chain the AVAX is being imported from. To import funds from the X-Chain, use `"X"`.
* `baseFee` is the base fee that should be used when creating the transaction. If omitted, a suggested fee will be used.
* `username` is the user that controls the address that transaction will be sent from.
* `password` is `username`‘s password.

**Response**

* `txID` is the ID of the completed ImportTx.

#### Example Call

```sh
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

```json
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

```sh
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

```json
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

```sh
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Example Call**

```sh
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

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avax.getAtomicTxStatus

Get the status of an atomic transaction sent to the network.

#### **Signature**

```sh
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` is one of:

* `Accepted`: The transaction is (or will be) accepted by every node. Check the `blockHeight` property
* `Processing`: The transaction is being voted on by this node
* `Dropped`: The transaction was dropped by this node because it thought the transaction invalid
* `Unknown`: The transaction hasn’t been seen by this node

#### **Example Call**

```sh
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

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted",
        "blockHeight": "1"
    }
}
```

## Admin API

This API can be used for debugging. Note that the Admin API is disabled by default. To run a node with the Admin API enabled, use [config flag](../references/avalanchego-config-flags.md#c-chain-config) `--coreth-admin-api-enabled:true`.

### Endpoint

```text
/ext/bc/C/admin
```

### Methods

#### admin.setLogLevel

Sets the log level of the C-Chain.

#### **Signature**

```text
admin.setLogLevel({level:string}) -> {success:bool}
```

* `level` is the log level to be set.

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLogLevel",
    "params": {
        "level":"info"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.startCPUProfiler

Starts a CPU profile.

#### **Signature**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.stopCPUProfiler

Stops and writes a CPU profile.

#### **Signature**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.memoryProfile

Runs and writes a memory profile.

#### **Signature**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.lockProfile

Runs a mutex profile writing to the `coreth_performance_c` directory.

#### **Signature**

```text
admin.lockProfile() -> {success:bool}
```

#### **Example Call**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Example Response**

```json
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```
