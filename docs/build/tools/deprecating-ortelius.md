# Replacing Ortelius with the Index APIs

This guide explains how to replace usage of [the Ortelius API](ortelius.md) with other APIs, including [AvalancheGo's Index API](../avalanchego-apis/index-api.md). **Ortelius is deprecated. You should use other AvalancheGo APIs to get the information that you used to get from Ortelius.**

## Index API
AvalancheGo can be configured to run with an indexer. That is, it saves (indexes) every container (a block, vertex or transaction) it accepts on the X-Chain, P-Chain and C-Chain. To run AvalancheGo with indexing enabled, use command line flag `--index-enabled`. AvalancheGo will only index containers that are accepted when running with `--index-enabled`. For more information, see [the Index API documentation.](../avalanchego-apis/index-api.md) Please be sure to read the Index API documentation in its entirety.

Below, we provide instructions on how to use the Index API to:
* Get the total number of blocks/transactions that have been accepted
* Get a block/transaction by its ID

## Get Total Block/Transaction Count

You can use the Index API to get the number of blocks/vertices/transactions that have been accepted on a given chain. 
You can use `curl` or the the Index API Client's [getLastAccepted](../avalanchego-apis/index-api.md#indexgetlastaccepted) method to accomplish this.

In the examples below, we're getting the number of X-Chain transactions that have been accepted.
* To get the number of accepted C-Chain blocks, replace `/ext/index/X/tx` with `/ext/index/C/block` below. 
* To get the number of accepted P-Chain blocks, replace `/ext/index/X/tx` with `/ext/index/P/block`.
* To get the number of accepted X-Chain vertices, replace `/ext/index/X/tx` with `/ext/index/X/vtx`.

### Index API Client

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

You can use `curl` to get the number of blocks/vertices/transactions that have been accepted on a given chain.

**Example Call**
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

**Example Response**

(Note that the `bytes` field has been truncated for brevity.)

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

The ID of the most recently accepted X-Chain transaction is `2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ`.
Since the `index` of the last accepted transaction is `2683522`, this means `2683523` X-Chain transactions have been accepted.

## Get a Transaction/Block/Vertex by ID

You can get containers by their ID using the Index API.
You can also use chain-specific APIs. 

### Index API Client

The snippet below uses the Index API Client's [getContainerByID](../avalanchego-apis/index-api.md#indexgetcontainerbyid) method to get an X-Chain container by its ID.
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

`curl` example of `getContainerByID` can be found [here](../avalanchego-apis/index-api.md#indexgetcontainerbyid).


### Chain-Specific APIs

#### X-Chain

You can use X-Chain API method [avm.getTx](../avalanchego-apis/x-chain.mdx#avmgettx) to get an X-Chain transaction by its ID. Set `encoding` to `json` to get a human-readable JSON response.

**Example Call**

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

**Example Response**

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

You can use P-Chain API method [platform.getTx](../avalanchego-apis/p-chain.md#platform.gettx) to get a P-Chain transaction by its ID.

#### C-Chain

You can use the C-Chain's API to get a transaction by its ID, a block by its ID, or a block by its height. See `eth_getTransactionByHash`, `eth_getBlockByHash` and `eth_getBlockByNumber` [here](https://eth.wiki/json-rpc/API).

