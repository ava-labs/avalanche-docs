---
description: C-Chainは、イーサリアムバーチャルマシン（EVM）のインスタンスです。
---

# コントラクトチェーン（C-Chain）API

_注意：イーサリアムは、その独自の概念を持ち`networkID`ます。`chainID`これらは、AvalancheのnetworkIDとchainIDとは関係がなく、[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)にまさしく内部となっています__。Mainnetでは、C-Chainがこれらの値`43114`のために使用`1`されます。`net_version``eth_chainId`富士テストネット上で、これらの値`43113`を`1`用いて取得`networkID`すること`chainID`も可能です。_

## スマートコントラクトを展開する

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## イーサリアムAPI

### イーサリアムAPIエンドポイント

#### JSON-RPCエンドポイント

JSON-RPCエンドポイント経由でC-Chainとやり取りするには：

```cpp
/ext/bc/C/rpc
```

JSON-RPCエンドポイントを通じてEVMの他のインスタンスとやり取りするには：

```cpp
/ext/bc/blockchainID/rpc
```

EVMを実行するブロックチェーンのID`blockchainID`です。

#### WebSocket エンドポイント

ウェブソケットエンドポイントを通じてC-Chainとやり取りするには：

```cpp
/ext/bc/C/ws
```

例えば、ローカルホスト上でウェブソケットを介してC-ChainのイーサリアムAPIとやり取りするには、以下のようにしてください。

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

ウェブソケットエンドポイントを通じてEVMの他のインスタンスとやり取りするには：

```cpp
/ext/bc/blockchainID/ws
```

EVMを実行するブロックチェーンのID`blockchainID`です。

### メソッド

#### 標準イーサリアムAPI

Avalancheは、GethのAPIと同一のAPIインターフェースを提供します。ただし、以下のサービスのみをサポートします。

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

これらのサービスとやり取りできます。[イーサリアムウィキのJSON-RPC](https://eth.wiki/json-rpc/API)ドキュメントと[GethのJSON-RPC](https://geth.ethereum.org/docs/rpc/server)ドキュメントをご覧ください。このAPIの詳細については、

#### eth\_getAssetBalance

標準的なイーサリアムAPIに加え、Avalancheは、C-Chain上でファーストクラスのAvalancheネイティブトークンのバランスを取り出すよう提供しています（AVAXを除く、Cチェーンでフェッチ`eth_getAssetBalance`する必要があります`eth_getBalance`。

**シグネチャ**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address`アセットのオーナー
* `blk`バランスを取り戻すブロック番号あるいはハッシュ
* `assetID`バランスが要求されたアセットのid

**コール例**

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

**例**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

## Avalanche固有API

### Avalanche 固有 API エンドポイント

C-Chain上で呼び出される`avax`特定のRPCとやり取りするには、次のようにします。

```cpp
/ext/bc/C/avax
```

EVM AVAXエンドポイントの他のインスタンスとやり取りするには：

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

C-ChainからX-Chainにアセットをエクスポートします。このメソッドを呼び出した後、X-Chain[`avm.import`](exchange-chain-x-chain-api.md#avm-import)に呼び出して、振り込みが完了する必要があります。

#### シグネチャ

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to`iss a good is a good asset to good asset to good asset to g
* `amount`iss は、送信するアセットの額です。
* `assetID`は、アセットのID。AVAX`"AVAX"`で使用される輸出をするには、`assetID`
* アセットは、管理された`username`アドレスから送信されます。`password`

#### コール例

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

#### 例

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

**DEPRECATED—代わりに[**avax.export**](contract-chain-c-chain-api.md#avax-export)を使用**する

CチェーンからX-ChainにAVAXを送信します。このメソッドを呼び出した後、X-Chain[`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)に呼び出して、振り込みが完了する必要があります。

#### シグネチャ

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

* `from`iss a C-Chainアドレス彼らは16進形式でなければなりません。
* `to`AVAXが送信されるX-Chainアドレス。bech32形式でなければなりません。
* `amount`issimplyは、送信するnAVAX額です。
* `destinationChain`AVAXが送信されるチェーンです。X-Chainに資金を輸出するには、使用してください`"X"`。
* `changeAddr`変更が送信されたC-Chainアドレス。16進形式でなければなりません。
* AVAXは、以下によってコントロールされたアドレスから送信されます。`username`

**レスポンス**

* `txID`issiminceは、完了したExportTxのtxidです。

#### コール例

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

#### 例

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

指定されたアドレスをコントロールする秘密鍵を取得します。返却された秘密鍵は、. でユーザーに追加することができます`avax.importKey`。

#### シグネチャ

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**リクエスト**

* `username`コントロールする必要があります。`address`
* `address`は、対応する秘密をエクスポートしたいアドレスです。16進形式でなければなりません。

**レスポンス**

* `privateKey`コントロールする秘密鍵のCB58エンコードされた文字列表現`address``PrivateKey-`プレフィックスがあり、 . を経由して鍵をインポートするのに使用できます。`avax.importKey`
* `privateKeyHex`is is コントロールする秘密鍵の10進文字列表現`address`Metamaskにアカウントをインポートするために使用できます。

#### コール例

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

#### 例

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

### avax.getUTXO

指定されたアドレスを参照するUTXOを取得します。

#### **シグネチャ**

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

* `utxos`UTXOのリストにより、各UTXOが少なくとも1つのアドレスを参照する`addresses`
* ほとんどの`limit`UTXOは返却されます。`limit`省略された場合、1024を超える場合、1024に設定されます。
* この方法は、ページネーションを`endIndex`サポートします。`startIndex`次のUTXOセットを取得するには、次の呼び出し時にその値`endIndex`を使用してください。
* `startIndex`省略された場合、UTXOを最大限に取得します。`limit`
* （す`startIndex`なわち、提供時）ページネーションを使用する際、UTXOは、複数の呼び出しでユニークであることが保証されることはありません。つまり、UTXOは、最初の呼び出しの結果に表示され、その後、2回目の呼び出しで表示される場合があります。
* ページネーションを使用する際、複数の呼び出しで一貫性が保証されることはありません。つまり、呼び出し間でアドレスのUTXOセットが変更された可能性があります。
* `encoding`戻されたUTXOのフォーマットを設定します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **例**

少なくとも1つを参照するすべてのUTXOを望むとします`C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`。

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

これにより応答が得られます：

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

X-ChainからC-Chainに非AVAXあるいはAVAXの移動を完了します。このメソッドが呼び出される前に、X-Chainの[`avm.export`](exchange-chain-x-chain-api.md#avm-export)メソッドを呼び出して転送を開始する必要があります。

#### シグネチャ

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**リクエスト**

* `to`iss は、アセットが送信されたアドレスです。C-Chainに呼び出される際に、これは`to`引数と同じでなければなりません。`export`
* `sourceChain`iss a good is is a good asset from the kernel how to complete relative relativeX-Chainから資金をインポートするには、 `"X"`.
* `username`は、コントロールするユーザです。`to`

**レスポンス**

* `txID`issimplified ImportTxのID。

#### コール例

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

#### 例

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

**DEPRECATED—代わりに[**avax.import**](contract-chain-c-chain-api.md#avax-import)**を使用する

X-ChainからC-ChainにAVAXの移動を完了します。このメソッドが呼び出される前に、X-Chainの[`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)メソッドを呼び出して転送を開始する必要があります。

#### シグネチャ

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**リクエスト**

* `to`AVAXが送信されるアドレス16進形式でなければなりません。
* `sourceChain`AVAXがインポートされるチェーンのIDまたはエイリアです。X-Chainから資金をインポートするには、 `"X"`.
* `username`は、コントロールするユーザです。`to`

**レスポンス**

* `txID`issimplified ImportTxのID。

#### コール例

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

#### 例

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

アドレスをコントロールする秘密鍵を提供することにより、ユーザーにアドレスをコントロールします。

#### シグネチャ

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**リクエスト**

* 秘密鍵`username`のセットに追加`privateKey`します。

**レスポンス**

* `address`は、`username`現在秘密鍵でコントロールされているアドレスです。16進形式でとなります。

#### コール例

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

#### 例

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

`encoding`署名トランザクションをネットワークに送信します。「cb58」あるいは「六角」のいずれかでできます。デフォルトは、「cb58」になります。

#### **シグネチャ**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **コール例**

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

#### **例**

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

ネットワークに送信されたアトミックトランザクションステータスを取得します。

#### **シグネチャ**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status`次のいずれかです：

* `Accepted`：トランザクションは、すべてのノードで受け入れられる（あるいは受け入れられる）ものです。`blockHeight`プロパティを確認する
* `Processing`：トランザクションは、このノードによって投票されます
* `Dropped`：トランザクションが無効と考えられていたため、このノードによってトランザクションは削除されました。
* `Unknown`：このノードではトランザクションは見ることができません。

#### **コール例**

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

#### **例**

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

