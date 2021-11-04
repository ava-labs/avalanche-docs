---
description: C-Chain 是以太坊虚拟机（EVM）的实例。
---

# 合同链（C-Chain） API

_注意：以太坊对于`networkID`和`chainID`有自己的理解。这些与 Avalanche 对于 networkID 和 chainID 的观点没有关系，完全属于 _[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain) _内部。在主网上，C-Chain 将 `1` 和 `43114` 用于这些值。在 Fuji 测试网上，它将 `1` 和 `43113`用于这些值。`networkID` 和 `chainID` 也可以使用 `net_version` 和 `eth_chainId` 方法获得。_

## 部署智能合约

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## 以太坊 API

### 以太坊 API 端点

#### JSON-RPC 端点

要通过 JSON-RPC 端点与 C-Chain 交互：

```cpp
/ext/bc/C/rpc
```

要通过 JSON-RPC 端点与 EVM 的其他实例交互：

```cpp
/ext/bc/blockchainID/rpc
```

其中，`blockchainID`是运行 EVM 的区块链的 ID。

#### WebSocket 端点

要通过 websocket 端点与 C-Chain 交互：

```cpp
/ext/bc/C/ws
```

例如，要通过 localhost 上的 websocket 与 C-Chain 的以太坊 API 交互，您可以使用：

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

注意：在 localhost 上，使用 `ws://`。 当使用[公共 API](../tools/public-api.md) 或支持加密的另一台主机时，请使用 `wss://`。

要通过 websocket 端点与 EVM 的其他实例交互：

```cpp
/ext/bc/blockchainID/ws
```

其中，`blockchainID`是运行 EVM 的区块链的 ID。

### 方法

#### 标准以太坊 API

Avalanche 提供的 API 接口与 Geth 的 API 相同，只是它只支持以下服务：

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

您可以与这些服务交互，就像您与 Geth 交互一样。有关此 API 的完整描述，请参阅[以太坊 Wiki 的 JSON-RPC 文档](https://eth.wiki/json-rpc/API)和 [Geth 的 JSON-RPC 文档](https://geth.ethereum.org/docs/rpc/server)。

#### eth\_getAssetBalance

除了标准的以太坊 API 外, Avalanche 还提供 `eth_getAssetBalance` 来检索 C-Chain 上的一类 Avalanche 原生代币的余额（不包括 AVAX，它必须用 `eth_getBalance` 获取）。

**签名**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* 资产的 `address` 所有人
* `blk`是要检索余额的区块编号或哈希。
* `assetID`请求余额的资产的 id

**示例调用**

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

**示例响应**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

### eth\_baseFee

获取下个区块的基本费用。

#### **签名**

```cpp
eth_baseFee() -> {}
```

`result`是下一个区块的基本费用的十六进制值。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **示例响应**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth\_maxPriorityFeePerGas

获得需要包含在区块中的优先费用。

#### **签名**

```cpp
eth_maxPriorityFeePerGas() -> {}
```

`result`是需要包含在区块中的优先费用的十六进制值。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **示例响应**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

有关动态费用的更多信息，请参阅[交易费用文档的 C-Chain 部分](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees)。

## Avalanche 特定 API

### Avalanche 特定 API 端点

要与 C-Chain 上`avax`特定 RPC 调用进行交互：

```cpp
/ext/bc/C/avax
```

要与 EVM AVAX 端点的其他实例交互：

```cpp
/ext/bc/blockchainID/avax
```

### avax.getAtomicTx

通过 ID 获取交易。可选编码参数，用于指定返回交易的格式。可以是  `cb58`或 `hex`。默认值设为 `cb58`。

#### 签名

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

**请求**

* `txID`是交易 ID。应该为 cb58 格式。
* `encoding`是要使用的编码格式。可以是  `cb58`或 `hex`。默认值设为 `cb58`。

**响应**

* `tx` 是编码到 `encoding` 的交易 。
* `encoding` 是 `encoding`。
* `blockHeight` 是包含交易的区块的高度。

#### 示例调用

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

#### 示例响应

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

### avax.export

将资产从 C-Chain 导出到 X-Chain。调用本方法后，您必须调用 X-Chain 上的[`avm.import`](exchange-chain-x-chain-api.md#avm-import)以完成转移。

#### 签名

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to`是资产被发送到的 X-Chain 地址。
* `amount`是要发送的资产数量。
* `assetID`是资产的 ID。要导出 AVAX，使用 `"AVAX"` 作为 `assetID`。
* 资产是从 `username` 和 `password` 控制的地址发送。

#### 示例调用

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

#### 示例响应

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

**DEPRECATED——使用 **[**avax.export**](contract-chain-c-chain-api.md#avax-export)。

将 AVAX 从 C-Chain 发送到 X-Chain。调用本方法后，您必须调用 X-Chain 上的[`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)以完成转移。

#### 签名

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

**请求**

* `from`是发送 AVAX 的 C-Chain 地址。它们应该为十六进制格式。
* `to`是 AVAX 发送到的 X-Chain 地址。它应该为 bech32 格式。
* `amount`是要发送的 nAVAX 数量。
* `destinationChain`是发送 AVAX 的链。要将资金导出到 X-Chain，请使用 `"X"`。
* `changeAddr`是任何更改发送到的 C-Chain 地址。它应该为十六进制格式。
* AVAX 是从由 `username` 控制的地址发送。

**响应**

* `txID`是已完成的 ExportTx 的 txid。

#### 示例调用

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

#### 示例响应

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

获取控制给定地址的私钥。可以使用 `avax.importKey` 将返回的私钥添加到用户。

#### 签名

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**请求**

* `username` 必须控制 `address`。
* `address`是您想导出相应私钥的地址。它应该为十六进制格式。

**响应**

* `privateKey` 是控制 `address` 的私钥的 CB58 端码字符串表达式。它有一个 `PrivateKey-` 前缀，可以用于通过 `avax.importKey` 导入密钥。
* `privateKeyHex` 是控制 `address` 的私钥的十六进制字符串表达式。它可以用于将账户导入到 Metamask 中。

#### 示例调用

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

#### 示例响应

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

获取引用给定地址的 UTXO。

#### **签名**

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

* `utxos` 是一个 UTXO 列表，以便每个 UTXO 在 `addresses` 中引用至少一个地址。
* 最多返回 `limit` 个 UTXO。如果 `limit` 被省略或大于 1024，则将其设置为 1024。
* 本方法支持页码。`endIndex` 表示最后一次返回的 UTXO。要获取下一个 UTXO 集，请在下次调用中使用 `endIndex` 的值作为 `startIndex`。
* 如果 `startIndex` 被省略，将获取所有 UTXO，最多 `limit` 个。
* 当使用页码时（即提供 `startIndex` 时）时，无法保证 UTXO 在多个调用中是独一无二的。也就是说，一个 UTXO 可能出现在第一次调用的结果中，然后在第二次调用中再次出现。
* 使用页码时，不能保证多个调用之间的一致性。也就是说，地址的 UTXO 集可能在调用之间发生变化。
* `encoding` 设置返回的 UTXO 的格式。可以是“cb58”或“hex”。默认为“cb58”。

#### **示例**

假设我们希望所有 UTXO 至少引用 `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf` 中的一个。

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

这给出响应：

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

最后完成将 non-AVAX 或 AVAX 从 X-Chain 转移到 C-Chain。调用此方法之前，您必须调用 X-Chain 的 [`avm.export`](exchange-chain-x-chain-api.md#avm-export) 方法启动转移。

#### 签名

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**请求**

* `to`是资产被发送到的地址。这必须与 C-Chain 的 `export` 的相应调用中的 `to` 参数相同。
* `sourceChain`是导入资产所在的链的 ID 或别名。要从 X-Chain 导入资金，请使用 `"X"`。
* `username`是控制`to`的用户。

**响应**

* `txID`是已完成的 ImportTx 的 ID。

#### 示例调用

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

#### 示例响应

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

**DEPRECATE- 使用 **[**avax.import**](contract-chain-c-chain-api.md#avax-import)

最后完成从 X-Chain 到 C-Chain 的 AVAX 转移。调用此方法之前，您必须调用 X-Chain 的 [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) 方法启动转移。

#### 签名

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**请求**

* `to`是 AVAX 发送到的地址。它应该为十六进制格式。
* `sourceChain`是导入 AVAX 所在的链的 ID 或别名。要从 X-Chain 导入资金，请使用 `"X"`。
* `username`是控制`to`的用户。

**响应**

* `txID`是已完成的 ImportTx 的 ID。

#### 示例调用

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

#### 示例响应

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

通过提供控制地址的私钥，让用户控制该地址。

#### 签名

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**请求**

* 将  `privateKey` 添加到 `username` 的私钥集。

**响应**

* `address` 是 `username` 现在通过私钥控制的地址。它将为十六进制格式。

#### 示例调用

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

#### 示例响应

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

将签名交易发送到网络。`encoding` 指定签名交易的格式。可以是“cb58”或“hex”。默认为“cb58”。

#### **签名**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **示例调用**

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

#### **示例响应**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avax.getAtomicTxStatus

获取发送到网络的原子交易的状态。

#### **签名**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` 是其中之一：

* `Accepted`：交易被（或将要被）每个节点接受。检查 `blockHeight` 财产
* `Processing`：交易正在由本节点投票表决。
* `Dropped`：交易被此节点放弃，因为它认为交易无效。
* `Unknown`：交易尚未被本节点查看。

#### **示例调用**

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

#### **示例响应**

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

