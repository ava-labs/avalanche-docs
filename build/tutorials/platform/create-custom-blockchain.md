# カスタムブロックチェーンを作成する

## はじめに

Avalancheは、サブネット上の仮想マシンでブロックチェーンの作成をサポートします。このチュートリアルでは、カスタムバーチャルマシン（Timestamp VM）を使用してカスタムブロックチェーンを作成します。

X-Chain（AVM）の機能を持つブロックチェーンが欲しい場合は、AVMブロックチェーンを作成するを参照してください[。](../nodes-and-staking/run-avalanche-node.md)

### 前提条件

実行中のノード、ノード上のユーザ、そしてユーザがコントロールするアドレスにAVAXが必要になります。すべてが[、Avalancheノードを実行](../nodes-and-staking/run-avalanche-node.md)チュートリアルでカバーされます。

次に、プライマリネットワーク上でバリデータにする必要があります[。](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)バリデータを[追加](../nodes-and-staking/add-a-validator.md)チュートリアルでその方法を確認することができます。[API呼び出しで](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls)実行することをお勧めします。なぜなら、このチュートリアルの残りの部分であなたのノードと取引する方法です。

## バーチャルマシンを作成する

すべてのブロックチェーンは、仮想マシンのインスタンスです。例えば、X-ChainはAVMのインスタンスであり、C-ChainはEVMのインスタンスです。Avalancheは、バーチャルマシンから新しいブロックチェーン（インスタンス）の作成をサポートします。この場合、外部VMプラグインである[Timestamp VM](https://github.com/ava-labs/timestampvm)を使用します。タイムスタンプVMは、RPCを通じてAvalancheGoノードと通信します。

{% page-ref page="create-a-virtual-machine-vm.md" %}

## サブネットを作成

すべてのブロックチェーンは、[サブネット](../../../learn/platform-overview/#subnets)によって検証されます。ブロックチェーンを作成できる前に、バリデーションにサブネットが必要です。また、十分な数のコントロールキーを持っている場合、すでに存在するサブネットを使用することもできます。

{% page-ref page="create-a-subnet.md" %}

### サブネットにバリデータを追加する

サブネットは、ブロックチェーンでバリデータが必要です。

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### ジェネシスデータを作成<a id="create-the-genesis-data"></a>

各ブロックチェーンは、作成時点で、いくつかのジェネシスステートがあります。各VMは、そのジェネシスデータのフォーマットとセマンティクスを定義します。TimestampVMは、CB58エンコードさ[れ](create-a-virtual-machine-vm.md#api)たデータをジェネシスデータとして使用します。文字列データのエンコード、デコードに使用できる`decode`静的APIメソッドや`encode`、文字列データの解読方法があります。

TimestampVMのためのシンプルなジェネシスデータを生成しましょう：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.encode",
    "params":{
        "data":"helloworld"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "fP1vxkpyLWnH9dD6BQA",
    "encoding": "cb58"
  },
  "id": 1
}
```

我々のジェネシスデータは、次のようになります`fP1vxkpyLWnH9dD6BQA`。

## ブロックチェーンを作成する

次に、新しいブロックチェーンを作成しましょう。そうするため、我々は呼び出します[`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)。あなたの呼び出しは、以下のようになります。ブロックチェーンを検証し、サブネットのコントロールキーを十分にコントロールできる`username`サブネット`subnetID`を供給する必要があります。リマインダとして、サブネットの閾値とコントロールキーが何であるかを見つけることができます[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)。

[仮想マシン（VM）](create-a-virtual-machine-vm.md#vm-aliases)を作成で、VM ID`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`として使用したことを思い出してください。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH",
        "name":"My new TSVM",
        "genesisData": "fP1vxkpyLWnH9dD6BQA",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスには、トランザクションIDが含まれています：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### 成功を確認する<a id="verify-success"></a>

数秒後に、我々のブロックチェーンを生成するトランザクションが受け入れられ、ブロックチェーンは存在するはずです。（リクエストが適切に形成されたと仮定して、ブロックチェーンは存在するはずです。

チェックするには、呼び出し[`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains)。これにより、存在するすべてのブロックチェーンのリストを返します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

こうしたレスポンスにより、ブロックチェーンが作成されたことを確認します：

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "AXerNQX7voY2AABaRdTAyXcawBURBR6thPRJp43LtPpZZi6Qz",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "tZGm6RCkeGpVETUTp11DW3UYFZmm69zfqxchpHrSF7wgy8rmw",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
                "name": "My new TSVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### ブロックチェーンのバリデーション<a id="validating-blockchain"></a>

すべてのブロックチェーンは、その上でのトランザクションをバリデーション、処理する一連のバリデータが必要です。そのノード[`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)が指定されたブロックチェーンのバリデータであるかどうか確認できます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

応答した場合`"Validating"`、ノードは指定されたチェーンのバリデーションをします。応答した場合、このノードによってチェーンがトラッキングされたが`"Syncing"`、バリデーションは存在しません。レスポンデが行われた場合`"Created"`、チェーンは存在するが、同期されていないこと。サブネットをバリデートしたり見るには、引数（例`--whitelisted-subnets=[subnet ID goes here]`：）でノードを開始する`--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`だけでなく、サブネットのバリデータセットにノードを追加する必要があります。

より詳細な情報は、[サブネットバリデータを追加](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator)するチュートリアルでご覧いただけます。

## 新しいブロックチェーンとのやり取り<a id="interact-with-the-new-blockchain"></a>

VMの新しいインスタンスとやり取りできます。ブロックチェーンのAPIエンドポイントは次のようになります`127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`。

よりシンプルなAPI URLsのために`timestampbc`、このチェーンIDと別名することもできます。より詳しい情報[：](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### ジェネシスブロック

ジェネシスで、ジェネシスデータとして指定しました。以下`fP1vxkpyLWnH9dD6BQA`を確認してみましょう：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "0",
        "data": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp",
        "id": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn",
        "parentID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}
```

最初のブロックが持つことを確認できるようにします`timestamp: 0`。また、親ID（`11111111111111111111111111111111LpoYY`）はP-chainのIDです。ジェネシスデータを、VMのスタティックAPIメソッドでデコードしましょう。我々のTimestampVM IDは、以下のものでエイリアスされていることを思い出してください`timestampvm`。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.decode",
    "params" : {
        "bytes": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "data":"helloworld",
        "encoding": "cb58"
    },
    "id": 1
}
```

ジェネシスデータが文字列を持つことがわかります`helloworld`。

### 新しいブロック

我々は、その中にいくつかのデータで、ブロックチェーンに新しいブロックを提案することができます。

まずエンコードされたデータを取得しましょう。ブロックは、32秒の長さバイトを持つことを期待します。encodeメソッドには、`length`引数があります：

```cpp
curl -X POST --data '{
   "jsonrpc": "2.0",
    "method" : "timestampvm.encode",
    "params" : {
        "data": "mynewblock",
        "length": 32
    }
    "id"     : 1,
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

結果：

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "encoding": "cb58"
  },
  "id": 1
}
```

これで、データで新しいブロックを提案することができます：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.proposeBlock",
    "params":{
        "data":"qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

結果：

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

最新ブロックをチェックし、我々の提案ブロックの存在を確認しましょう：

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

結果：

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "timestamp": "1625674027",
    "data": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "id": "Br36bggr9vEEoNTNVPsSCD7QHHoCqE31Coui6uh1rA71EGPve",
    "parentID": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn"
  },
  "id": 1
}
```

結果には、以下の`data`フィールドが含まれています。`qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y`これは、以前のステップで我々の提案したデータと同じデータです。

