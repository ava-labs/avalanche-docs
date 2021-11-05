# OrteliusをインデックスAPIで置き換える

このガイドでは、[Ortelius API](ortelius.md)の使用を、[AvalancheGoのインデックスAPI](../avalanchego-apis/index-api.md)を含む他のAPIに置き換える方法を説明します。**Orteliusは非推奨です。今までOrteliusから得ていた情報を得るためには、他のAPIを使用する必要があります。**

## インデックスAPI
AvalancheGoは、インデクサーと一緒に動作するように設定することができます。つまり、Xチェーン、Pチェーン、Cチェーンで受け入れたすべてのコンテナ（ブロック、バーテックス、トランザクション）を保存（インデックス化）します。インデックスを有効にしてAvalancheGoを実行するには、コマンドラインフラグ`--index-enabled`を使用します。AvalancheGoは、`--index-enabled`で実行した際に受け入れられたコンテナのみをインデックスします。詳しくは、[インデックスAPIのドキュメント](../avalanchego-apis/index-api.md)をご覧ください。インデックスAPIのドキュメントを必ず最後までお読みください。

以下では、インデックスAPIの使用方法を説明します。
* 受け入れられたブロック/取引の総数を取得
* ブロック/トランザクションのIDを取得

## トータルブロック/トランザクションカウントの取得

インデックスAPIを使用して、特定のチェーンで受け入れられたブロック/バーティス/トランザクションの数を取得することができます。
これを実現するには、`curl`またはインデックスAPIクライアントの[getLastAccepted](../avalanchego-apis/index-api.md#index.getlastaccepted)メソッドを使用します。

以下の例では、受理されたX-Chainトランザクションの数を取得しています。
* 受け入れられたC-Chainブロックの数を求めるには、`/ext/index/X/tx`を以下の`/ext/index/C/block`に置き換えます。
* 受け入れられた P-Chainブロックの数を求めるには、`/ext/index/X/tx`を`/ext/index/P/block`に置き換えます。
* 受け入れられたX-Chainの頂点の数を求めるには、`/ext/index/X/tx`を`/ext/index/X/vtx`に置き換えます。

### クライアントAPIインデックス

```go
package main

import (
	"fmt"
	"time"

	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/utils/formatting"
)

func main() {
	client := indexer.NewClient("http://localhost:9650", "/ext/index/X/tx", 5*time.Second)
	args := &indexer.GetLastAcceptedArgs{Encoding: formatting.Hex}
	container, err := client.GetLastAccepted(args)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d transactions have been accepted", container.Index+1)
}
```

### カール

`curl`使用して、特定のチェーンで受け入れられたブロック/バーティス/トランザクションの数を取得することができます。

**呼び出し例**
```sh
curl --location --request POST 'http://localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"hex"
    },
    "id": 1
}' | jq
```

**レスポンス例**

（なお、`bytes`の欄は簡潔にするために切り捨てています。）

```json
{
  "jsonrpc": "2.0",
  "result": {
    "id": "2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ",
    "bytes": "0x00000000000000000001ed5f383...",
    "timestamp": "2021-10-21T20:55:27.616393152Z",
    "encoding": "hex",
    "index": "2683522"
  },
  "id": 1
}
```

直近に受け付けたX-Chain取引のIDは`2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ`です。
最後に受け付けた取引の`index`が`2683522`なので、`2683523`のX-Chain取引が受け付けられたことになります。

## トランザクション/ブロック/バーテックスをIDで取得する

インデックスAPIを使って、コンテナをIDで取得することができます。
また、チェーン固有のAPIを使用することもできます。

### クライアントAPIインデックス

以下のスニペットは、インデックスAPIクライアントの[getContainerByID](../avalanchego-apis/index-api.md#index.getcontainerbyid)メソッドを使用して、X-ChainコンテナをそのIDで取得しています。
* C-Chainブロックを取得するには、`/ext/index/X/tx`を以下の`/ext/index/C/block`に置き換えます。
* P-Chainブロック取得するには、`/ext/index/X/tx`を`/ext/index/P/block`に置き換えます。
* X-Chainのバーテックスを取得するには、`/ext/index/X/tx`を`/ext/index/X/vtx`に置き換えます。

```go
package main

import (
	"fmt"
	"time"

	"github.com/ava-labs/avalanchego/ids"
	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/utils/formatting"
)

func main() {
	client := indexer.NewClient("http://localhost:9650", "/ext/index/X/tx", 5*time.Second)
	containerID, err := ids.FromString("2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ")
	if err != nil {
		panic(err)
	}
	args := &indexer.GetIndexArgs{
		ContainerID: containerID,
		Encoding:    formatting.Hex,
	}
	container, err := client.GetContainerByID(args)
	if err != nil {
		panic(err)
	}
	containerBytes, err := formatting.Decode(container.Encoding, container.Bytes)
	if err != nil {
		panic(err)
	}
	fmt.Printf("container: %v\n", containerBytes)
}
```

`getContainerByID`の`curl`例は[こちら](../avalanchego-apis/index-api.md#index.getcontainerbyid)にあります。


### チェーンに特化したAPI

#### X-Chain

X-ChainのAPIの[avm.getTx](../avalanchego-apis/exchange-chain-x-chain-api.md#avm.gettx)メソッドを使用すると、X-ChainトランザクションをそのIDで取得することができます。`encoding`～`json`を設定することで、人間が読めるJSONレスポンスを取得できます。

**呼び出し例**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ",
        "encoding": "json"
    }
}' -H 'content-type:application/json;' http://localhost:9650/ext/bc/X | jq
```

**レスポンス例**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "tx": {
      "unsignedTx": {
        "networkID": 1,
        "blockchainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
        "outputs": [
          {
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "X-avax1c284te00gjeph54wh8jy5zdlc5k6qjkkgjuz5g"
              ],
              "amount": 50000000000,
              "locktime": 0,
              "threshold": 1
            }
          },
          {
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "X-avax1pgqxa6qw87wajaezvu02myyy8cctjl5y3hv02s"
              ],
              "amount": 55027917498,
              "locktime": 0,
              "threshold": 1
            }
          }
        ],
        "inputs": [
          {
            "txID": "23D2DrDg4apGW7sz3gGEXkx6wz4wMkuT8ru7s39p8K5vyvkinz",
            "outputIndex": 1,
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "input": {
              "amount": 105028917498,
              "signatureIndices": [
                0
              ]
            }
          }
        ],
        "memo": "0x43727974706f2e636f6d"
      },
      "credentials": [
        {
          "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
          "credential": {
            "signatures": [
              "0x5943457d6a7e370e0ed239715f04bf4ba7545a9d3440a848d52db97aece6f51c7c87ba9aa944327f63dd39feeec9ad978b23855fe1b081bc7159a2d4f8f027b600"
            ]
          }
        }
      ]
    },
    "encoding": "json"
  },
  "id": 1
}
```


#### P-Chain

PチェーンのAPIの[platform.getT](../avalanchego-apis/platform-chain-p-chain-api.md#platform.gettx)xメソッドを使用すると、PチェーントランザクションをそのIDで取得できます。

#### C-Chain

CチェーンのAPIを使って、トランザクションをそのIDで、ブロックをそのIDで、またはブロックをその高さで取得することができます。[こちら](https://eth.wiki/json-rpc/API)では、`eth_getTransactionByHash`、`eth_getBlockByHash`、`eth_getBlockByNumber`をご覧ください。

