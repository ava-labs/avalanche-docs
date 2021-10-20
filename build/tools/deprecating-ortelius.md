# Replacing Ortelius with the Index APIs

This guide explains how to replace usage of [the Ortelius API](ortelius.md) with other APIs, including [AvalancheGo's Index API](../avalanchego-apis/index-api.md). **Ortelius is deprecated. You should use other APIs to get the information that you used to get from Ortelius.**

## Index API
AvalancheGo can be configured to run with an indexer. That is, it saves \(indexes\) every container \(a block, vertex or transaction\) it accepts on the X-Chain, P-Chain and C-Chain. To run AvalancheGo with indexing enabled, use command line flag `--index-enabled`. AvalancheGo will only index containers that are accepted when running with `--index-enabled`. For more information, see [the Index API documentation.](../avalanchego-apis/index-api.md) Please be sure to read the Index API documentation in its entirety.

## Common Ortelius Use Cases
We have identified the following common Ortelius use cases, and this document will explain how to achieve each of them using other APIs:
* Get a block/transaction by its ID
* Get the total number of blocks/transactions that have been accepted

## Get a Block/Transaction by ID

You can get containers by their ID using the Index API.
You can also use chain-specific APIs. 

### Index API

The snippet below uses the Index API Client with [getIndex API](../avalanchego-apis/index-api.md#index.getindex) to get an X-Chain container by its ID.
* To get a C-Chain block, replace `/ext/index/X/tx` with `/ext/index/C/block` below. 
* To get a P-Chain block, replace `/ext/index/X/tx` with `/ext/index/P/block`.
* To get an X-Chain vertex, replace `/ext/index/X/tx` with `/ext/index/X/vtx`.

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
	containerID, err := ids.FromString("2NFwvZvDJcbFGM4C4PMzhYrPdqxMLihPnD3dPkWWq4eX42jPcF")
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

### Chain-Specific APIs

#### X-Chain

You can use X-Chain API method [avm.getTx](../avalanchego-apis/exchange-chain-x-chain-api.md#avm.gettx) to get an X-Chain transaction by its ID. Set `encoding` to `json` to get a human-readable response. 

#### P-Chain

You can use P-Chain API method [platform.getTx](../avalanchego-apis/platform-chain-p-chain-api.md#platform.gettx) to get a P-Chain transaction by its ID.

#### C-Chain

You can use the C-Chain's API to get a transaction by its ID, a block by its ID, or a block by its height. See `eth_getTransactionByHash`, `eth_getBlockByHash` and `eth_getBlockByNumber` [here](https://eth.wiki/json-rpc/API).

## Get Total Block/Transaction Count

You can use the Index API to get the number of blocks/vertices/transactions that have been accepted on a given chain. 

The snippet below uses the Index API Client with [getlastaccepted API](../avalanchego-apis/index-api.md#index.getlastaccepted) to get the total number of X-Chain transactions that have been accepted.

* To get the number of accepted C-Chain blocks, replace `/ext/index/X/tx` with `/ext/index/C/block` below. 
* To get the number of accepted P-Chain blocks, replace `/ext/index/X/tx` with `/ext/index/P/block`.
* To get the number of accepted X-Chain vertices, replace `/ext/index/X/tx` with `/ext/index/X/vtx`.

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
