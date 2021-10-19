# How to Replace Ortelius with AvalancheGo Index APIs?

This provides a guideline on how to migrate from Ortelius to Index API.

## How Index API works
AvalancheGo can be configured to run with an indexer. That is, it saves \(indexes\) every container \(a block, vertex or transaction\) it accepts on the X-Chain, P-Chain and C-Chain. To run AvalancheGo with indexing enabled, use command line flag `--index-enabled`. AvalancheGo will only index containers that are accepted when running with `--index-enabled`. For more details, see [this](../avalanchego-apis/index-api.md).

To replace Ortelius, You can use [X-Chain Transaction APIs](../avalanchego-apis/index-api.md#x-chain-transactions).

The following Ortelius APIs are identified to be used by our partners:
* /transactions/{txid} 
* /transactions? with different parameters such as
    - “/x/transactions?sort=” + “timestamp-desc” + “&offset=” + 0 + “&limit=” + limit + “&endTime=” + endTime + “&chainID=” + avaxChainID + “&assetID=” + avaxAssetID;
    - /v2/transactions?startTime={startTime}&limit=50&chainId={chainId}
* /transactions/aggregates


## Get Transaction by ID
[Ortelius API to get transaction by ID](ortelius.md#get-transaction)


## Get Transaction List
[Ortelius API to list transactions](ortelius.md#list-transactions)

## Aggregates
[Ortelius Aggregate API](ortelius.md#aggregate)




