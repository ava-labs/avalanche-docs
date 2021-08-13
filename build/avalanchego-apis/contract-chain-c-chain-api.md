---
description: C-ChainはEthereum Virtual Machine(EVM)のインスタンスです。

---

# Contract Chain \(C-Chain\) API

_注: Ethereumには`networkID`と`chainID`の独自の概念があります。これらはAvalancheのnetworkIDとchainIDの見方とは関係なく、純粋に_[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)__に内部です。Mainnetでは、C-Chainはこれらの値に`1`と`43114`を使用しています。Fuji Testnetでは、この値に`1`と`43113`を使用して`い`ます。`net_version`と`eth_chainId`メソッドを使ってnet_idと`chainID`を取得することもできます。

## スマートコントラクトの導入

--

## Ethereum APIs

### Ethereum API エンドポイント

#### JSON-RPCエンドポイント

JSON-RPCエンドポイントでC-Chainと対話するには:

```cpp
/ext/bc/C/rpc
```

JSON-RPC エンドポイント経由でEVMの他のインスタンスと対話するには:

```cpp
/ext/bc/blockchainID/rpc
```

ここで、`blockchainID`はEVMを動かしているブロックチェーンのIDです。

#### WebSocketエンドポイント

C-Chain と対話するには、websocket エンドポイントで:

```cpp
/ext/bc/C/ws
```

例えば、c-ChainのEthereum APIと対話するには、以下のようにします。

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

EVM の他のインスタンスと対話するには、websocket エンドポイントを使います。

```cpp
/ext/bc/blockchainID/ws
```

ここで、`blockchainID`はEVMを動かしているブロックチェーンのIDです。

### JavaScript-JavaScript-JavaScript-Java

#### Ethereum APIの標準

AvalancheはGethのAPIと同じAPIインターフェイスを提供していますが、以下のサービスのみをサポートしています。

* `Web3_`
* `net_`
* `--`
* `personal_`
* `txpool_`
* `debug__`

Geth と同じように、これらのサービスと対話できます。[JSON-RPCドキュメント](https://eth.wiki/json-rpc/API)および[JSON-RPC](https://geth.ethereum.org/docs/rpc/server)ドキュメントを参照してください。

#### eth\_getAssetBalance-JP

Ethereum APIに加えて、Avalancheは`C`-Chain \(AVAXを除く)ファーストクラスAvalanceネイティブトークンのバランスを取得するために`eth_getAssetBalance`\で取得する必要があります。

**JPS-JP-JP**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* Asset の`アドレス`所有者
* `blk` はバランスを取得するブロック番号またはハッシュです。
* `assetID` 残高が要求されるアセットのid

**Call 例**

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

## Avalanche 特定の API

### Avalanche 特定の API エンドポイント

`avax` 特定の RPC との対話には、C-Chain 上で呼び出す:

```cpp
/ext/bc/C/avax
```

EVM AVAX エンドポイントの他のインスタンスと対話するには:

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

C-ChainからX-Chainにアセットをエクスポートします。このメソッドを呼び出した後、転送を完了するには、X-Chainで[`avm.import`](exchange-chain-x-chain-api.md#avm-import)を呼び出す必要があります。

#### JPS-JP-JP

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to` は、アセットが送信される X-Chain アドレスです。
* `amount` は、送信するアセットの量です。
* `assetID` はアセットの ID です。AVAXをエクスポートするには`、AVAX を` `assetID` として使用します。
* アセットは`、ユーザー名`と`パスワード`によって制御されたアドレスから送信されます。

#### Call 例

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

### avax.exportAVAX-JP

**DEPRECATED-代わりに** [**avax.export**](contract-chain-c-chain-api.md#avax-export) を使います。

AVAXをC-ChainからX-Chainに送ります。このメソッドを呼び出した後、転送を完了するには、[`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) を X-Chain で呼び出す必要があります。

#### JPS-JP-JP

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

**JP-JP-**

* `From` は AVAX から送られる C-Chain アドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `To` は AVAX から送られる X-Chain アドレスです。Bech32形式でなければなりません。
* `amount` は、nAVAX の送信する量です。
* `destinationChain` は AVAX から送られるチェーンです。X-Chainに資金をエクスポートするには、`「X」`を使用します。
* `changeAddr` は変更が送信される C-Chain アドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* AVAXは`ユーザー名`によって制御されたアドレスから送信されます。

**JPRESSENTS**

* `txID`はExportTxのtxidです。

#### Call 例

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

### avax.exportKey-JP

指定したアドレスを制御する秘密鍵を取得します。`avax.importKey` を使用して、返された秘密鍵をユーザーに追加できます。

#### JPS-JP-JP

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**JP-JP-**

* `username` `はアドレス`を制御する必要があります。
* `address` は、対応する秘密鍵をエクスポートするアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

**JPRESSENTS**

* `privateKey` は`、アドレス`を制御する秘密鍵の CB58 エンコードされた文字列表現です。`PrivateKey-` プレフィックスを持ち、`avax.importKey` 経由でキーをインポートすることができます。
* `privateKeyHex` は`、アドレス`を制御する秘密鍵の16進文字列表現です。Metamask にアカウントをインポートするために使用できます。

#### Call 例

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

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

#### **JPS-JP-JP**

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

* `utxos` は、各 UTXO `が`少なくとも 1 つのアドレスをアドレスに参照するような UTXO のリストです。
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript`-`JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-`limit` が省略されたり、1024 より大きい場合は、1024 に設定されます。
* `endIndex`は、最後のUTXOを表します。次のUTXOを取得するには、次の呼び出しで`endIndex`の値を`startIndex`として使用します。
* `startIndex`が省略された場合、UTXOを最大`限`に取得します。
* Pagination \(すなわち `startIndex` が指定された場合\) を使用する場合、UTXO は複数の呼び出しで一意であることが保証されません。つまり、UTXOは最初の呼び出しの結果に表示され、その後2番目の呼び出しに再び表示されます。
* ページネーションを使用する場合、複数の呼び出しで一貫性が保証されません。つまり、アドレスのUTXOセットは、呼び出し間で変更された可能性があります。
* `encoding` は、UTXO の書式を設定します。--デフォルトは "cb58" です。

#### **JPE-JP-JP**

`JavaScript-JP-JP-`

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

これによりレスポンスが与えられます:

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

### avax.import-JP

X-ChainからC-Chainへの非AVAXまたはAVAXの転送を最終的にします。このメソッドが呼び出される前に、X-Chainの[`avm.export`](exchange-chain-x-chain-api.md#avm-export)メソッドを呼び出して転送を開始する必要があります。

#### JPS-JP-JP

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**JP-JP-**

* `to`は、アセットが送信されるアドレスです。これは、C-Chainのエクスポートに対する対応する呼び出しの`to`引数と同じでなければなりません`。`
* `sourceChain` は、アセットがインポートされるチェーンの ID またはエイリアスです。X-Chainから資金をインポートするには、`「X」`を使用します。
* `username` `は`、コントロールするユーザーです。

**JPRESSENTS**

* `txID`はImportTxのIDです。

#### Call 例

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

### avax.importAVAX-JP

**DEPRECATED—代わりに** [**avax.import**](contract-chain-c-chain-api.md#avax-import) を使います。

AVAXのX-ChainからC-Chainへの転送を最終化します。このメソッドが呼び出される前に、X-Chainの[`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)メソッドを呼び出して転送を開始する必要があります。

#### JPS-JP-JP

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**JP-JP-**

* `To` は AVAX 宛てに送られるアドレスです。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `sourceChain` は、AVAX からインポートされるチェーンの ID またはエイリアスです。X-Chainから資金をインポートするには、`「X」`を使用します。
* `username` `は`、コントロールするユーザーです。

**JPRESSENTS**

* `txID`はImportTxのIDです。

#### Call 例

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

### avax.importKey-JP

アドレスを制御する秘密鍵を指定することで、アドレスをユーザーに制御できます。

#### JPS-JP-JP

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**JP-JP-**

* `privateKey`を`username`のプライベートキーのセットに追加します。

**JPRESSENTS**

* `address` は、現在、プライベートキーで制御するアドレス `username` です。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

#### Call 例

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

### avax.issueTx-JP

署名済みトランザクションをネットワークに送信します。`encoding` 署名済みトランザクションのフォーマットを指定します。--デフォルトは "cb58" です。

#### **JPS-JP-JP**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Call 例**

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

#### **JPS-JP-JP**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` は次のいずれかです:

* `Accepted`: トランザクションは、すべてのノードで \(または \) 受け入れられます。`blockHeight` プロパティを確認します。
* `Processing`: トランザクションはこのノードによって投票されています。
* `Dropped`:トランザクションはこのノードによって削除されました。
* `Unknown`: このノードではトランザクションが見られませんでした

#### **Call 例**

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

