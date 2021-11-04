# 用 Index API 替换 Ortelius

本指南说明如何将 [Ortelius API](ortelius.md) 替换为其他 API，包括 [AvalancheGo 的 Index API](../avalanchego-apis/index-api.md)。**Ortelius 已弃用。您应该使用其他 API 获取您过去从 Ortelius 获取的信息。**

## Index API
AvalancheGo 可以配置为与索引器一起运行。也就是说，它保存（索引）在 X-Chain、P-Chain 和 C-Chain 上接受的每个容器（区块、顶点或交易）。要在启用索引的情况下运行 AvalancheGo，请使用命令行标志 `--index-enabled`。AvalancheGo 只会对在 `--index-enabled` 情况下运行时接受的容器进行索引。有关详细信息，请参阅 [Index API 文档。](../avalanchego-apis/index-api.md)请务必完整阅读 Index API 文档。

下面，我们提供使用 Index API 进行以下操作的说明：
* 获取已接受的区块/交易总数量
* 按 ID 获取区块/交易

## 获取总区块/交易计数

您可以使用 Index API 获取在给定链上接受的区块/顶点/交易数量。您可以使用 `curl`或 Index API 客户端的 [getLastAccepted](../avalanchego-apis/index-api.md#index.getlastaccepted) 方法来完成此操作。

在下面的示例中，我们获得已接受的 X-Chain 交易数量。
* 要获取接受的 C-Chain 区块的数量，请在下面将 `/ext/index/X/tx` 替换为 `/ext/index/C/block`。
* 要获取已接受的 P-Chain 区块的数量，请将 `/ext/index/X/tx` 替换为 `/ext/index/P/block`。
* 要获取接受的 X-Chain 顶点的数量，请将 `/ext/index/X/tx` 替换为 `/ext/index/X/vtx`。

### Index API 客户端

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

### curl

您可以使用  `curl` 获取给定链上已接受的区块/顶点/交易数量。

**示例调用**
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

**示例响应**

（请注意，为简洁起见，`bytes` 字段已被截断。）

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

最近接受的 X-Chain 交易的 ID 为 `2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ`。由于最后接受的交易的 `index` 是 `2683522`，这意味着  `2683523` X-Chain 交易已被接受。

## 按 ID 获取交易/区块/顶点

您可以使用 Index API 按其 ID 获取容器。您还可以使用链特定的 API。

### Index API 客户端

下面的片段使用 Index API 客户端的 [getContainerByID](../avalanchego-apis/index-api.md#index.getcontainerbyid) 方法来按 ID 获取 X-Chain 容器。
* 要获取 C-Chain 区块，请在下面将  `/ext/index/X/tx` 替换为 `/ext/index/C/block`。
* 要获取 P-Chain 区块，请将 `/ext/index/X/tx` 替换为 `/ext/index/P/block`。
* 要获取 X-Chain 顶点，请将  `/ext/index/X/tx` 替换为 `/ext/index/X/vtx`。

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

可以在[此处](../avalanchego-apis/index-api.md#index.getcontainerbyid)找到 `getContainerByID` 的 `curl` 示例。


### 链特定的 API

#### X-Chain

您可以使用 X-Chain API 方法 [avm.getTx](../avalanchego-apis/exchange-chain-x-chain-api.md#avm.gettx) 来按 ID 获取 X-Chain 交易。将 `encoding` 设置为 `json` 来获取人类可读的 JSON 响应。

**示例调用**

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

**示例响应**

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

您可以使用 P-Chain API 方法 [platform.getTx](../avalanchego-apis/platform-chain-p-chain-api.md#platform.gettx) 来按 ID 获取 P-Chain 交易。

#### C-Chain

您可以使用 C-Chain 的 API 按 ID 获取交易，按 ID 获取区块，或按其高度获取区块。请参阅[此处](https://eth.wiki/json-rpc/API)的 `eth_getTransactionByHash`、`eth_getBlockByHash`和`eth_getBlockByNumber`。

