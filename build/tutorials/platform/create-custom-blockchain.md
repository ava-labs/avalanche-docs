# カスタムブロックチェーンを作成する

## はじめに

Avalancheは、サブネットの仮想マシンでのブロックチェーン作成をサポートしています。このチュートリアルでは、カスタム仮想マシン（Timestamp VM）でカスタムブロックチェーンを作成していきます。

X-Chain（AVM）の機能を持つブロックチェーンをご希望の場合は、[Create AVM Blockchain（AVMブロックチェーンを作成する）](../nodes-and-staking/run-avalanche-node.md)を参照してください。

### 前提要件

実行中のノード、ノード上のユーザー、ユーザーが制御するアドレスにいくつかのAVAXが必要になります。これらはすべて、[Run an Avalanche Node（Avalancheノードを実行する）](../nodes-and-staking/run-avalanche-node.md)のチュートリアルで取り上げられています。

次に、[一次ネットワーク](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)上でノードがバリデーターである必要があります。方法は、[Add a Validator（バリデーターを追加する） ](../nodes-and-staking/add-a-validator.md)のチュートリアルで確認できます。それを[API呼び出しで](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls)行うよう推奨します。これは、このチュートリアルの後半の部分で説明されているノードとやり取りする方法です。

## 仮想マシンを作成する

すべてのブロックチェーンが、仮想マシンのインスタンスです。例えば、X-Chainは、AVMのインスタンスであり、 C-Chainは、EVMのインスタンスです。Avalancheは、仮想マシンからの新しいブロックチェーン（インスタンス）の作成をサポートします。この場合、外部VMプラグインである[Timestamp VM](https://github.com/ava-labs/timestampvm)を使用します。Timestamp VMは、RPCを介してAvalancheGoノードと通信します。

{% page-ref page="create-a-virtual-machine-vm.md" %}

## サブネットを作成する

すべてのブロックチェーンは[サブネット](../../../learn/platform-overview/#subnets)で検証されています。ブロックチェーンを作成する前に、検証にサブネットが必要です。十分な数のコントロール鍵がある場合は、既存のサブネットも使用することができます。

{% page-ref page="create-a-subnet.md" %}

### サブネットにバリデーターを追加する

サブネットは、その中にバリデーターが必要です。つまり、ブロックチェーンを検証するものです。

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### ジェネシスデータを作成する<a id="create-the-genesis-data"></a>

各ブロックチェーンには、作成されたときにいくつかのジェネシス状態のものがあります。各VMは、そのジェネシスデータのフォーマットとセマンティックを定義します。Timestamp VMは、CB58エンコード済みデータをジェネシスデータとして使用します。`encode`と`decode`の静的APIメソッドがデータのエンコード/デコードに使用されます。[TimestampVM API](create-a-virtual-machine-vm.md#api)を参照してください。

TimestampVMのシンプルなジェネシスデータを生成しましょう。

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

ジェネシスデータは、`fP1vxkpyLWnH9dD6BQA`となります。

## ブロックチェーンを作成する

では、新しいブロックチェーンを作成しましょう。そうするには、[`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)を呼び出します。呼び出しは、以下のようになります。ブロックチェーンを検証するサブネットに`subnetID`を変更し、サブネットのコントロール鍵の十分な数量を管理する`username`を供給する必要があります。リマインダーとして、[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)を呼び出すことでサブネットのしきい値とコントロール鍵が何であるかを確認することができます。

[ 仮想マシン（VM）を作成する](create-a-virtual-machine-vm.md#vm-aliases)で、VMIDとして`tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`を使用したことを覚えておきましょう。

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

レスポンスには、トランザクションのIDが含まれています。

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

### 成功を検証する<a id="verify-success"></a>

数秒後にはブロックチェーンを作成するトランザクションが承認されますから、ブロックチェーンが必ず存在しています（リクエストが確実にフォーマットされていることなどを想定しています）。

確認するには、[`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains)を呼び出します。これは、存在するすべてのブロックチェーンのリストを返します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

レスポンスは、ブロックチェーンが作成されたことを確認します。

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

### ブロックチェーンを検証する<a id="validating-blockchain"></a>

すべてのブロックチェーンには、トランザクションを検証し、処理するバリデータが必要です。そのノードで[`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)を呼び出すことで、特定のブロックチェーンをノードが検証するかどうか確認することができます。

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

`"Validating"`に応答する場合、ノードは指定されたチェーンを検証しています。`"Syncing"`に応答する場合、このノードでチェーンが追跡されたものの、検証はされていません。`"Created"`に応答する場合、チェーンは存在するものの、同期されていません。サブネットを検証するか見るには、引数`--whitelisted-subnets=[subnet ID goes here]`でノードを起動する必要がある（例：`--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`）ほか、サブネットのバリデータにノードを追加する必要があることに注意してください

詳細は、[サブネットバリデータを追加する](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator)のチュートリアルで確認することができます。

## 新しいブロックチェーンでやり取りする<a id="interact-with-the-new-blockchain"></a>

これで、VMの新しいインスタンスとやり取りすることができるようになりました。ブロックチェーンのAPIエンドポイントは、`127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`です。

また、シンプルなAPI URLにするために、このチェーンIDを`timestampbc`または好きなもので、エイリアス作成することも可能です。詳細は：[admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### ジェネシスブロックを検証する

ジェネシスでは、ジェネシスデータとして`fP1vxkpyLWnH9dD6BQA`を指定しました。次を確認します。

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

ご覧のように、最初のブロックに`timestamp: 0`があります。また、親ID（`11111111111111111111111111111111LpoYY`）はP-ChainのIDです。ジェネシスデータをVMの静的APIメソッドでデコードします。`timestampvm`でTimestampVM IDがエイリアス作成されていることを覚えておきましょう。

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

ジェネシスデータに`helloworld`の文字列があることが確認できます。

### 新しいブロックを提案する

一部のデータで、新しいブロックをブロックチェーンに提案することができます。

まずエンコードデータを取得しましょう。ブロックは、32バイト長です。encodeメソッドに`length`数があります。

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

これで、データで新しいブロックを提案することができます。

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

最新のブロックで提案したブロックの存在を確認してみましょう。

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

結果には、`data`フィールドに`qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y`があります。これは、前述のステップで提案したデータと同じデータです。

