# Custom Blockchainの作成

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaSeriesJavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaJavaJav

Avalancheは、サブネットで仮想マシンを使ったブロックチェーンを作成することができます。このチュートリアルでは、カスタムVRM \(Timestamp VM\)を使用して、カスタムブロックチェーンを作成します。

X-Chain \(AVM\)の機能を持つブロックチェーンが必要な場合は、[「AVM Blockchain](../nodes-and-staking/run-avalanche-node.md)の作成」を参照してください。

### Preerequisitesの前提条件

JavaScript-JP-JP-これらはすべて[、Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行チュートリアルでカバーされています。

次に、Nodeが[Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)でバリデーターである必要があります。[JavaScript](../nodes-and-staking/add-a-validator.md)-JP-JP-[APIコールで](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls)実行することをお勧めします。このチュートリアルでは、他のチュートリアルでノードとやり取りする方法です。

## 仮想マシンを作成する

すべてのブロックチェーンは仮想マシンのインスタンスです。例えば、X-ChainはAVMのインスタンスであり、C-ChainはEVMのインスタンスです。AvalancheはVirtual Machinesから新しいブロックチェーン \(instances\)を作成することができます。この場合、Timestamp VM を使用します。これは外部VMプラグインです。Timestamp VMはAvalancheGoノードとRPCを通じて通信します。

---virtual-machine-vm.md" %}

## サブネットの作成

すべてのブロックチェーンは[サブネット](../../../learn/platform-overview/#subnets)によって検証されます。ブロックチェーンを作成する前に、それを検証するためにサブネットが必要です。また、十分な数のコントロールキーを持っている場合、既存のサブネットを使用することもできます。

--subnet.md-jp-jp-

### Validators をサブネットに追加する

サブネットにはバリデータが必要です。ブロックチェーンにバリデーションを必要とします。

--

### ジェネシスデータの作成<a id="create-the-genesis-data"></a>

各ブロックチェーンには、作成時点でジェネシス状態があります。各VMは、そのジェネシスデータのフォーマットとセマンティクスを定義します。TimestampVMは、CB58エンコードされたデータをジェネシスデータとして使用します。文字列`データ`をエンコード/デコードするために使用できる静的APIメソッドがあります。[TimestampVM API](create-a-virtual-machine-vm.md#api)を参照してく`ださい`。

TimestampVMのジェネシスデータを生成しましょう:

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

`JPG-JPG-J`

## ブロックチェーンを作成する

さて、新しいブロックチェーンを作成しましょう。これを行うには、[`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)を呼び出します。あなたの通話は以下の通りです。`subnetID`をブロックチェーンを検証するサブネットに変更し、サブネットの制御キーを十分に制御する`ユーザー名`を入力する必要があります。リマインダーとして、[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) を呼び出すことで、サブネットの閾値とコントロールキーが何であるかを調べることができます。

`tGas3T58KzdjLHHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhHHを`[仮想マシンを作成\(VM\)](create-a-virtual-machine-vm.md#vm-aliases)でVM IDとして使用したことを思い出してください。

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

レスポンスにはトランザクションIDが含まれています。

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

数秒後、ブロックチェーンを作成するトランザクションが受け入れられ、ブロックチェーンが存在するはずです。

チェックするには、[`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains)を呼び出します。これは、存在するすべてのブロックチェーンのリストを返します。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

この応答により、ブロックチェーンが作成されたことを確認します。

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

### Blockchainの検証<a id="validating-blockchain"></a>

すべてのブロックチェーンには、トランザクションの検証と処理に一連のバリデータが必要です。そのノードで[`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)を呼び出すことで、特定のブロックチェーンが検証されているかどうかを確認できます。

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

`JavaScript`-JP-JP-`"Syncing"` に応答すると、このノードによって追跡されたチェーンが検証されません。`JavaScript`-JP-JP-サブネットを検証したり、見るには、`--whitelisted-subnets=[subnet ID goes here]` \(例: `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUA8tmBfadqpf9K2dc2TTT\)`と同時に、サブネットのバリデータセットにノードを追加する必要があります。

The remove is [any](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) use-mail.

## 新しいブロックチェーンとのやり取り<a id="interact-with-the-new-blockchain"></a>

VM の新しいインスタンスと対話できます。ブロックチェーンのAPIエンドポイントは`127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFFY7AjDd2c9rm64SbApnvjmkです。`

また、このチェーンIDを`timestampbc`で別名することもできます。また、API URL では、好きなものは何でもできます。詳細情報: [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Genesis Blockを検証する

ジェネシスでは、`fP1vxkpyLWnH9dD6BQA`をジェネシスデータとして指定しました。これを確認してみましょう:

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

最初のブロックは`タイムスタンプを持っています: 0`. また、親 ID `\(11LpoYY\)`はP-チェーンのIDです。ジェネシスデータをVMの静的APIメソッドでデコードしてみましょう。TimestampVM IDは`timestampvm`でエイリアスされたことを思い出してください。

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

ジェネシスデータには`helloworld`文字列が含まれています。

### 新しいブロックを提案する

私たちは、その中のいくつかのデータで、ブロックチェーンに新しいブロックを提案することができます。

まずはエンコードされたデータを取得しましょう。Blocks は32-Lengthバイトを持つことを期待しています。encodeメソッドには`length`引数があります:

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

結果:

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

これで、新しいブロックをデータで提案できます:

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

結果:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

最新のブロックをチェックして、提案したブロックの存在を確認しましょう。

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

結果:

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

Result `に`は`、qDNkrS9xuyGmaAgdHAjbmMANSvCKnK5BHvyCybJaFCAqx46Z8yがあります。`これは、前回のデータと同じです。

