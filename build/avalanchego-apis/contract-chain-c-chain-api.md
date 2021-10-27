---
description: C-Chainは、Ethereum Virtual Machine（EVM）のインスタンスです
---

# Contract Chain \(C-Chain\) API

_注：Ethereumには、独自の`networkID`と`chainID`という概念があります。これらはAvalancheのnetworkIDとchainIDの見え方とは関係がなく、純粋に_[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_の内部のものです。Mainnetでは、C-Chainはこれらの値に`1`と`43114`を使用しています。Fuji Testnetでは、これらの値に`1`と`43113`を使用しています。`networkID`と`chainID`は、`net_version`と`eth_chainId`の方法でも取得できます。_

## Smart Contractをデプロイする

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## EthereumのAPI

### EthereumのAPIエンドポイント

#### JSON-RPCエンドポイント

JSON-RPCエンドポイントを介してC-Chainとやり取りするには、次を実行します。

```cpp
/ext/bc/C/rpc
```

JSON-RPCエンドポイントを介してEVMの他のインスタンスとやり取りするには、次を実行します。

```cpp
/ext/bc/blockchainID/rpc
```

ここでは、`blockchainID`は、EVMを実行しているブロックチェーンのIDです。

#### WebSocketエンドポイント

Websocketエンドポイントを介してC-Chainと対話するには、次を実行します。

```cpp
/ext/bc/C/ws
```

例えば、ローカルホストのwebsocketでC-ChainのEthereum APIとやり取りするには、次を実行します。

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Websocketエンドポイントを介してEVMの他のインスタンスとやり取りするには、次を実行します。

```cpp
/ext/bc/blockchainID/ws
```

ここでは、`blockchainID`は、EVMを実行しているブロックチェーンのIDです。

### メソッド

#### 標準的なEthereumのAP

Avalancheは、GethのAPIと同じAPIインターフェースを提供しますが、次のサービスのみをサポートします。

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

これらのサービスとのやり取りは、Gethとのやり取りまったく同じ方法で行うことができます。このAPIの完全な説明については、[EthereumのWikiのJSON-RPCドキュメント](https://eth.wiki/json-rpc/API)および[GethのJSON-RPCドキュメント](https://geth.ethereum.org/docs/rpc/server)を参照してください。

#### eth\_getAssetBalance

Avalancheは、標準的なEthereum APIに加えて、C-Chain上のファーストクラスのAvalanche Native Tokensの残高を取得するための`eth_getAssetBalance`を提供しています（`eth_getBalance`で取得する必要のあるAVAXは除きます）。

**署名**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address`資産所有者
* `blk`は、残高を取得するためのブロック番号またはハッシュです
* `assetID`残高がリクエストされた資産ID

**呼び出し例**

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

**レスポンス例**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

### eth\_baseFee

次のブロックの基本料金を取得します。

#### **署名**

```cpp
eth_baseFee() -> {}
```

`result`は、次のブロックの基本料金の16進数の値です。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **レスポンス例**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth\_maxPriorityFeePerGas

ブロックに含まれるために必要なプライオリティフィーを取得します。

#### **署名**

```cpp
eth_maxPriorityFeePerGas() -> {}
```

`result`は、ブロックに含まれるために必要なプライオリティフィーの16進数の値です。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **レスポンス例**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

ダイナミックフィーの詳細については、[トランザクションフィードキュメンテーションのC-Chainのセクション](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees)を参照してください。

## Avalanche専用API

### Avalanche専用APIエンドポイント

C-Chain上の`avax`特定のRPC呼び出しとやり取りするには、次を実行します。

```cpp
/ext/bc/C/avax
```

EVM AVAXエンドポイントの他のインスタンスとやり取りするには、次を実行します。

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

C-ChainからX-Chainに資産をエクスポートします。このメソッドを呼び出した後、X-Chain上の[`avm.import`](exchange-chain-x-chain-api.md#avm-import)を呼び出して転送を完了する必要があります。

#### 署名

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to`は、資産の送信先であるX-Chainアドレスです。
* `amount`は、送信する資産の量です。
* `assetID`は資産のIDです。AVAXをエクスポートするには、`"AVAX"`を`assetID`として使用します。
* 資産は`username`と`password`が管理するアドレスから送信されます。

#### 呼び出し例

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

#### レスポンス例

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

**は非推奨です。代わりに**[**avax.export**](contract-chain-c-chain-api.md#avax-export)を使用してください

C-ChainからX-ChainにAVAXを送信します。このメソッドを呼び出した後、X-Chain上の[`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)を呼び出して転送を完了させる必要があります。

#### 署名

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

**リクエスト**

* `from`は、AVAXの送信元となるC-Chainのアドレスです。これらは16進数で入力してください。
* `to`は、AVAXの送信先となるX-Chainアドレスです。bech32フォーマットである必要があります。
* `amount`は、送信するnAVAXの金額です。
* `destinationChain`はAVAXの送信先のチェーンです。X-Chainに資金をエクスポートするには、`"X"`を使用します。
* `changeAddr`は、変更が送信されるC-Chainアドレスです。16進数で入力してください。
* AVAXは、`username`で制御されたアドレスから送信されます

**レスポンス**

* `txID`は、完成したExportTxのトランザクションIDです。

#### 呼び出し例

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

#### レスポンス例

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

指定されたアドレスを管理する秘密鍵を取得します。返された秘密鍵は、`avax.importKey`でユーザーに追加することができます。

#### 署名

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**リクエスト**

* `username`は`address`を制御する必要があります。
* `address`は、対応する秘密鍵をエクスポートするためのアドレスです。16進数で入力してください。

**レスポンス**

* `privateKey`は、`address`を制御する秘密鍵のCB58エンドコード化された文字列表現です。これは、`PrivateKey-`のプレフィックスを持ち、`avax.importKey`を介して鍵をインポートするために使用することができます。
* `privateKeyHex`は、`address`を制御する秘密鍵の16進数表現です。Metamaskにアカウントをインポートするときに使用できます。

#### 呼び出し例

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

#### レスポンス例

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

指定されたアドレスを参照するUTXOを取得します。

#### **署名**

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

* `utxos`は、UTXOのリストです。たとえば、各UTXOは`addresses`の少なくとも1つのアドレスを参照できます。
* 最大で`limit`UTXOが返されます。`limit`が省略された場合や1024より大きい場合は、1024に設定されます。
* このメソッドはページネーションに対応しています。`endIndex`は、最後に返されたUTXOを示します。次のセットのUTXOを取得するには、次の呼び出しで`endIndex`の値を`startIndex`として使用します。
* `startIndex`が省略された場合は、`limit`までのUTXOをすべて取得します。
* ページネーションを使用する場合（つまり`startIndex`が提供されている場合）には、UTXOが複数回の呼び出しで一意となる保証はありません。つまり、あるUTXOが最初の呼び出しの結果に現れ、その後、2回目の呼び出しで再び現れる可能性があります。
* ページネーションを使用する場合、複数回の呼び出しで、一貫性の保証はありません。つまり、アドレスのUTXOセットが呼び出しの間に変更されている可能性があります。
* `encoding`は、返されるUTXOのフォーマットを設定します。「cb58」または 「16進数」のいずれかです。デフォルトは「cb58」です。

#### **例**

仮に、`C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`のうち少なくとも1つを参照しているすべてのUTXOが欲しいとします。

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

これでレスポンスが得られます。

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

X-ChainからC-Chainへの非AVAXまたはAVAXの転送を確定します。このメソッドが呼び出される前に、X-Chainの[`avm.export`](exchange-chain-x-chain-api.md#avm-export)メソッドを呼び出して転送を開始する必要があります。

#### 署名

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**リクエスト**

* `to`は、資産の送信先アドレスです。これは、C-Chainの`export`に対応する呼び出しの`to`の引数と同じでなければなりません。
* `sourceChain`は、資産のインポート元となるチェーンIDまたはエイリアスです。X-Chainから資金をインポートする場合は、`"X"`を使用します。
* `username`は、`to`を制御するユーザーです。

**レスポンス**

* `txID`は、完成したImportTxのIDです。

#### 呼び出し例

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

#### レスポンス例

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

**は非推奨です。代わりに**[**avax.import**](contract-chain-c-chain-api.md#avax-import)を使用してください

X-ChainからC-ChainへのAVAXの転送を確定します。このメソッドが呼び出される前に、X-Chainの[`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)メソッドを呼び出して転送を開始する必要があります。

#### 署名

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**リクエスト**

* `to`は、AVAXの送信先のアドレスです。16進数で入力してください。
* `sourceChain`は、AVAXがインポートされるチェーンのIDまたはエイリアスです。X-Chainから資金をインポートする場合は、`"X"`を使用します。
* `username`は、`to`を制御するユーザーです。

**レスポンス**

* `txID`は、完成したImportTxのIDです。

#### 呼び出し例

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

#### レスポンス例

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

アドレスを管理する秘密鍵を提供することで、ユーザーにアドレスの管理権を与えます。

#### 署名

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**リクエスト**

* `username`の秘密鍵のセットに`privateKey`を追加します。

**レスポンス**

* `address`は、今、`username`が秘密鍵で制御しているアドレスです。16進数で表示されます。

#### 呼び出し例

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

#### レスポンス例

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

署名付きトランザクションをネットワークに送信します。`encoding`では、署名付きトランザクションのフォーマットを指定します。「cb58」または「16進数」のいずれかを指定できます。デフォルトは「cb58」です。

#### **署名**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **呼び出し例**

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

#### **レスポンス例**

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

ネットワークに送信されたアトミックトランザクションのステータスを取得します。

#### **署名**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status`は、次のうちの1つです。

* `Accepted`：トランザクションは、すべてのノードで受け入れられます（または、受け入れられることになります）。`blockHeight`プロパティを確認してください
* `Processing`：トランザクションは、このノードが決定します
* `Dropped`:このノードがトランザクションを無効と判断したため、そのトランザクションを削除しました
* `Unknown`：このノードは、トランザクションを認識していません

#### **呼び出し例**

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

#### **レスポンス例**

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
