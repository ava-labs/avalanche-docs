# AVMを実行するブロックチェーンを作成する

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaSeriesJavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaJavaJav

Avalancheの主要な機能の1つは、新しいブロックチェーンを作成する機能です。Avalancheは、[Avalanche Virtual Machine \(AVM\)](../../../learn/platform-overview/#exchange-chain-x-chain)の新しいインスタンスを作成することができます。このチュートリアルでは、AVMの新しいインスタンスを作成してブロックチェーンを作成します。

カスタムブロックチェーン作成に興味がある場合は、[「仮想マシン \(VM\)」](create-a-virtual-machine-vm.md)と「[カスタムブロックチェーン作成](create-a-virtual-machine-vm.md)」を参照してください。

### Preerequisitesの前提条件

JavaScript-JP-JP-これらはすべて[、Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行チュートリアルでカバーされています。

次に、Nodeが[Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)でバリデーターである必要があります。[JavaScript](../nodes-and-staking/add-a-validator.md)-JP-JP-[APIコールで](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls)実行することをお勧めします。このチュートリアルでは、他のチュートリアルでノードとやり取りする方法です。

## サブネットの作成

すべてのブロックチェーンは[サブネット](../../../learn/platform-overview/#subnets)によって検証されます。ブロックチェーンを作成する前に、それを検証するためにサブネットが必要です。また、十分な数のコントロールキーを持っている場合、既存のサブネットを使用することもできます。

--subnet.md-jp-jp-

### Validators をサブネットに追加する

サブネットにはバリデータが必要です。ブロックチェーンにバリデーションを必要とします。

--

## ジェネシスデータの作成<a id="create-the-genesis-data"></a>

各ブロックチェーンには、作成時点でジェネシス状態があります。各VMは、そのジェネシスデータのフォーマットとセマンティクスを定義します。AVMとCorethには、`buildGenesis`という名前の静的APIメソッドがあり、ブロックチェーンのジェネシス状態のJSON表現を取り込み、その状態のバイト表現を返します。

[AVMのドキュメント](../../avalanchego-apis/exchange-chain-x-chain-api.md)では、[`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis) への引数は次のようになります:

```cpp
{
"genesisData":
    {
        "assetAlias1": {               // Each object defines an asset
            "name": "human readable name",
            "symbol":"AVAL",           // Symbol is between 0 and 4 characters
            "initialState": {
                "fixedCap" : [         // Choose the asset type.
                    {                  // Can be "fixedCap", "variableCap"
                        "amount":1000, // At genesis, address A has
                        "address":"A"  // 1000 units of asset
                    },
                    {
                        "amount":5000, // At genesis, address B has
                        "address":"B"  // 1000 units of asset
                    },
                    ...                // Can have many initial holders
                ]
            }
        },
        "assetAliasCanBeAnythingUnique": { // Asset alias can be used in place of assetID in calls
            "name": "human readable name", // names need not be unique
            "symbol": "AVAL",              // symbols need not be unique
            "initialState": {
                "variableCap" : [          // No units of the asset exist at genesis
                    {
                        "minters": [       // The signature of A or B can mint more of
                            "A",           // the asset.
                            "B"
                        ],
                        "threshold":1
                    },
                    {
                        "minters": [       // The signatures of 2 of A, B and C can mint
                            "A",           // more of the asset
                            "B",
                            "C"
                        ],
                        "threshold":2
                    },
                    ...                    // Can have many minter sets
                ]
            }
        },
        ...                                // Can list more assets
    }
}
```

このジェネシス状態のバイト表現を作成するには、[`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis) を呼び出します。あなたの通話は以下の通りです。AVAXはカスタムブロックチェーンには存在しないことに注意してください。しかし、この新しいチェーンではトランザクション手数料を支払う方法が必要です。AVM インスタンスでは、トランザクション手数料は、`genesisData` で指定された最初のアセットで建てられます。この例では、手数料は`asset1` \(`myFixedCapAsset` という名前で支払われます。\) 手数料を補償するのに十分な量を確かめます。デフォルトのトランザクション手数料は、手数料が建てられた資産の100万です。料金に関する詳細は[`こちらを`](../../../learn/platform-overview/transaction-fees.md#transaction-fees)ご覧ください。

この呼び出しはAVMの静的 API エンドポイント`/ext/vm/avm` へ行われます:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "avm.buildGenesis",
    "params" : {
        "genesisData": {
            "asset1": {
                "name": "myFixedCapAsset",
                "symbol":"MFCA",
                "initialState": {
                    "fixedCap" : [
                        {
                            "amount":100000000,
                            "address": "avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z"
                        },
                        {
                            "amount":100000000,
                            "address": "avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl"
                        },
                        {
                            "amount":5000000,
                            "address": "avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
                        },
                        {
                            "amount":5000000,
                            "address": "avax1hzrwdlpum8xmt3pgstejx4sz86ajylmmaylspc"
                        }
                    ]
                }
            },
            "asset2": {
                "name": "myVarCapAsset",
                "symbol":"MVCA",
                "initialState": {
                    "variableCap" : [
                        {
                            "minters": [
                                "avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70",
                                "avax1hzrwdlpum8xmt3pgstejx4sz86ajylmmaylspc"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "avax1je76jegcc0qylnz473ag9l5ywvhe8we8e5qw0k",
                                "avax1y9sull9tpaz9s507uekmm4sejwvndrela0mu43",
                                "avax1grn5kuzalzek7uk405fmgae06ly8cw52ms070k"
                            ],
                            "threshold":2
                        }
                    ]
                }
            }
        }
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/avm
```

これにより、ブロックチェーンのジェネシス状態のバイト表現が返されます。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T"
    },
    "id": 1
}
```

## ブロックチェーンを作成する

さて、新しいブロックチェーンを作成しましょう。これを行うには、[`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)を呼び出します。あなたの通話は以下の通りです。`subnetID`をブロックチェーンを検証するサブネットに変更し、サブネットの制御キーを十分に制御する`ユーザー名`を入力する必要があります。リマインダーとして、[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) を呼び出すことで、サブネットの閾値とコントロールキーが何であるかを調べることができます。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"avm",
        "name":"My new AVM",
        "genesisData": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T",
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
        "txID": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
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
        "blockchainID":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH"
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

AVMのこの新しいインスタンスと対話することができます。[X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)と対話する方法はほぼ同じです。いくつかの小さな違いがあります:

* ブロックチェーンのAPIエンドポイントは`127.0.0.1:9650/ext/bc/xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH`です。また、このチェーンIDを `myxchain` で別名することもできます。より多くの情報:

   [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

* アドレスは`xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-``で`先頭に置かれています。
* 手数料は、AVAXではなく、前述のように、ジェネシスデータで指定された最初の資産で支払われます。

### バランスを確認する

ジェネシスデータでは、そのアドレス`avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z`は、アセットの100,000,000ユニットをエイリアス`asset1`で指定しました。それを確認しましょう:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z",
        "assetID":"asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balance": "100000000",
    "utxoIDs": [
      {
        "txID": "9tKDkdk4PUj3GW3tw6fuYywVRwP5gXDj7XTEuPkmLAhauPN8a",
        "outputIndex": 0
      }
    ]
  },
  "id": 1
}
```

### Assetを送信する

`asset1`を別のアドレスに送りましょう。まず、受信者アドレスを作成します。

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "address": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl"
  },
  "id": 1
}
```

[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.send)で`asset1`の1ユニットを新しいアドレスに送りましょう。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID" : "asset1",
        "amount"  : 1,
        "from"    : ["xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z"],
        "to"      : "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl",
        "changeAddr": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z",
        "username": "USERNAME GOES HERE",
        "password": "PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
    "changeAddr": "g1GK7GErN3BqauK6BhhU8uCNfaBTMz4VWr3JdwvXXNCwpwQJQ-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z"
  },
  "id": 1
}
```

トランザクションステータスを検証できます:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
       "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Accepted"
  },
  "id": 1
}
```

これで、残高がそれに応じて変更されることを確認できます。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1u4uvatmymlue3zf4w0admnyj6vsw9mqk7hjckl",
        "assetID": "asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balance": "1",
    "utxoIDs": [
      {
        "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
        "outputIndex": 0
      }
    ]
  },
  "id": 1
}
```

上記の通り、取引手数料は`asset1`で支払われます。100万単位\(default\)が当社の取引で手数料として使用されていることを確認できます。トランザクションの後で送信者の残高を確認しましょう。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z",
        "assetID": "asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balance": "98999999",
    "utxoIDs": [
      {
        "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
        "outputIndex": 1
      }
    ]
  },
  "id": 1
}
```

このアドレスは100,000,000 `asset1を`持ち、その後、1 個の他のアドレスに送金し、1,000,000 asset`1`.98,999 unitsの残高を達成しました。

### Mint Asset-JP

私たちのブロックチェーンには、`myVarCapAsset`という名前の別の`asset2`があります。これは可変キャップアセットです。[`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.mint)でこのアセットの単位をさらにミントしましょう。アドレス `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`はmintable `asset2`を制御し、5,000,000 unit `asset1`を持ち、トランザクション手数料を支払うのに十分です。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount": 1,
        "assetID": "asset2",
        "from": ["xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"],
        "to": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70",
        "minters": [
            "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
        ],
        "changeAddr": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70",
        "username": "USERNAME GOES HERE",
        "password": "PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "txID": "2UQL5u5ZEELHfRpAtDYtmFF8BMSdoWNWS1Zf2dkbVSDeTbXeJQ",
    "changeAddr": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
  },
  "id": 1
}
```

[`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.getAllBalances)で残高を確認しましょう。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getAllBalances",
    "params" :{
        "address":"xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/myxchain
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "balances": [
      {
        "asset": "asset2",
        "balance": "1"
      },
      {
        "asset": "asset1",
        "balance": "4000000"
      }
    ]
  },
  "id": 1
}
```

わかるように、`asset2`の1ユニットが鋳造されました。アドレス `avax16k8n4d8xmhplqn5vhhhm342g6n9rkxuj8wn6u70は`、ジェネシスデータで定義された5,000,000 `asset1```を持ち、現在ではトランザクション手数料を支払った後4,000,000 asset1を持っています。

