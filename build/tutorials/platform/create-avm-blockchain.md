# AVMを実行するブロックチェーンを作成する

## はじめに

Avalancheのコア機能のひとつは、新しいブロックチェーンを作成する機能です。Avalancheは、[Avalanche Virtual Machine(AVM)](../../../learn/platform-overview/#exchange-chain-x-chain)の新しいインスタンスの作成をサポートしています。このチュートリアルでは、AVMの新しいインスタンスを作成することで、ブロックチェーンを作成します。

カスタムブロックチェーンの構築に関心がある場合、[Create a Virtual Machine (VM)1（仮想マシン（VM）を作成する）](create-a-virtual-machine-vm.md)と[Create a Custom Blockchain（カスタムブロックチェーンを作成する）](create-a-virtual-machine-vm.md)を参照してください。

### 前提要件

実行中のノード、ノード上のユーザー、ユーザーが管理するアドレスでの一部のAVAXが必要になります。そのすべてが[Run an Avalanche Node（Avalancheノードを実行する）](../nodes-and-staking/run-avalanche-node.md)のチュートリアルで取り上げられています。

次に、[一次ネットワーク](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)上でノードがバリデーターである必要があります。方法は、[Add a Validator（バリデータを追加する） ](../nodes-and-staking/add-a-validator.md)のチュートリアルで確認できます。それを[API呼び出しで](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls)行うよう推奨します。これは、このチュートリアルの後半の部分で説明されているノードとやり取りする方法です。

## サブネットを作成する

すべてのブロックチェーンは[、サブネット](../../../learn/platform-overview/#subnets)で検証されます。ブロックチェーンを作成する前に、検証にサブネットが必要です。十分な数のコントロール鍵がある場合は、既存のサブネットも使用することができます。

{% page-ref page="create-a-subnet.md" %}

### サブネットにバリデーターを追加する

サブネットは、その中にバリデーターが必要です。つまり、ブロックチェーンを検証するものです。

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

## ジェネシスデータを作成する<a id="create-the-genesis-data"></a>

各ブロックチェーンには、作成されたときにいくつかのジェネシス状態のものがあります。各VMは、そのジェネシスデータのフォーマットとセマンティックを定義します。AVMとCorethには、ブロックチェーンのジェネシス状態のJSON表現を取り込み、その状態のバイト表現を返す`buildGenesis`というAPIメソッドがあります。

[`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis)への因数を特定する[AVMのドキュメンテーション](../../avalanchego-apis/exchange-chain-x-chain-api.md)は、次のようになります。

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

このジェネシス状態のバイト表現を作成する場合は、[`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis)を呼び出します。呼び出しは、次のようになります。カスタムブロックチェーンにAVAXは存在しないことに注意してください。ただし、この新しいチェーンでのトランザクション手数料の支払いをする方法が必要です。カスタムAVMインスタンスでは、トランザクション手数料は、`genesisData`で指定された最初の資産の通貨建てです。この例では、（`myFixedCapAsset`という名前の）`asset1`で手数料が支払われます。手数料を支払うのに十分な金額があるようにしましょう。デフォルトのトランザクション手数料通貨建ての資産の1,000,000です。手数料の詳細は、[`here.`](../../../learn/platform-overview/transaction-fees.md#transaction-fees)にあります。

この呼び出しは、AVMの静的APIエンドポイント`/ext/vm/avm`へのものであることに注意してください。

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

これは、ブロックチェーンのジェネシス状態のバイト表現を返します。

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

では、新しいブロックチェーンを作成しましょう。そうするには、[`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain)を呼び出します。呼び出しは、次のようになります。ブロックチェーンを検証するサブネットに`subnetID`を変更し、サブネットのコントロール鍵の十分な数量を管理する`username`を供給する必要があります。リマインダーとして、[`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)を呼び出すことでサブネットのしきい値とコントロール鍵が何であるかを確認することができます。

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

レスポンスには、トランザクションのIDが含まれています。

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

### 成功を検証する<a id="verify-success"></a>

数秒後、ブロックチェーンを作成するトランザクションが承認されたはずですので、ブロックチェーンが存在しています（リクエストがよくフォーマットされていることなどを想定）。

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

すべてのブロックチェーンには、トランザクションを検証し、処理するバリデーターが必要です。そのノードで[`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)を呼び出すことで、特定のブロックチェーンをノードが検証するかどうか確認することができます。

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

`"Validating"`に応答する場合、ノードは指定されたチェーンを検証しています。`"Syncing"`に応答する場合、このノードでチェーンが追跡されたものの、検証はされていません。`"Created"`に応答する場合、チェーンは存在するものの、同期されていません。サブネットを検証するか見るには、引数`--whitelisted-subnets=[subnet ID goes here]`でノードを起動する必要がある（例：`--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`）ほか、サブネットのバリデーターにノードを追加する必要があることに注意してください

詳細は、[サブネットバリデーターを追加する](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator)のチュートリアルで確認することができます。

## 新しいブロックチェーンでやり取りする<a id="interact-with-the-new-blockchain"></a>

[X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain)と同じ方法で、AVMの新しいインスタンスとやり取りすることができます。相違点が少しあります。

* ブロックチェーンのAPIエンドポイントは、`127.0.0.1:9650/ext/bc/xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH`です。また、シンプルなAPIURLのため、このチェーンIDを`myxchain`でエイリアス作成することも可能です。詳細は、次の通りです。

   [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

* アドレスは\(`X-`ではなく、`xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-`でプリペンドされています。
* 手数料は上記のように、AVAXではなく、ジェネシスデータで指定された最初の資産で支払われます。

### 残高を検証する

ジェネシスデータでは、そのアドレス`avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z`にエイリアス`asset1`で資産の100,000,000単位があるよう指定しました。確認しましょう。

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

### 資産を送信する

別のアドレスに一部の`asset1`を送信しましょう。まず、受信者のアドレスを作成します。

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

では、`asset1`の1単位をで新[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.send)しいアドレスに送信しましょう。

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

トランザクションの状態を下記で検証することができます。

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

これで、残高が変更されたことを確認できます。

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

上述のように、トランザクション手数料は`asset1`で支払われます。トランザクションの手数料として1,000,000単位（デフォルト）が使用されていることを確認できます。トランザクション後の送信者の残高を確認しましょう。

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

このアドレスには100,000,000`asset1`がありました。そして別のアドレスに1単位を送信し、トランザクション手数料として1,000,000を支払い、結果として残高はの単`asset1`位の98,999,999,999という残高になりました。

### ミント資産

当社のブロックチェーンには、`myVarCapAsset`という別の`asset2`資産があります。可変資本の資産です。[`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.mint)で、この資産のより多くの単位をミントしましょう。アドレス`avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`は、ミント可能な資産`asset2`を管理し、トランザクション手数料を支払うのに十分な5,000,000単位のがあ`asset1`ります。

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

ご覧のように、`asset2`の1単位がミントされました。アドレス`avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`には、ジェネシスデータで定義されたように5,000,000`asset1`があり、現在はトランザクション手数が引かれて、4,000,000`asset1`があります。

