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
[/transactions/{txid}](ortelius.md#get-transaction) can be replaced by [avm.gettx](../avalanchego-apis/exchange-chain-x-chain-api#avm.gettx). The `encoding` parameter can be set to "json" as in 

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "avm.getTx",
    "params": {
        "txID": "2NFwvZvDJcbFGM4C4PMzhYrPdqxMLihPnD3dPkWWq4eX42jPcF",
        "encoding": "json"
    }
}
```
And here is the response
```javascript
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
                                "X-avax1c72qsh3peen8pktu0gj92ny0dc8wly37hmxx6j"
                            ],
                            "amount": 937100000,
                            "locktime": 0,
                            "threshold": 1
                        }
                    },
                    {
                        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                        "output": {
                            "addresses": [
                                "X-avax194jv0pfujykh5st2pn5hwmgl034728uexuth0t"
                            ],
                            "amount": 1604224544330,
                            "locktime": 0,
                            "threshold": 1
                        }
                    }
                ],
                "inputs": [
                    {
                        "txID": "23W2Crc55qsUNkPPsKUBeroNJ2FDggTWABGTDTBsfLF8HAEZLX",
                        "outputIndex": 1,
                        "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
                        "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                        "input": {
                            "amount": 1605162644330,
                            "signatureIndices": [
                                0
                            ]
                        }
                    }
                ],
                "memo": "0x"
            },
            "credentials": [
                {
                    "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                    "credential": {
                        "signatures": [
                            "0x1147a7e8ead556c980b4caf1fcc8de21502ebf47e9ea5f55f76a17d4076c72093636b1dfb3d5c5a281f9175d5d94c200f77aac26c690d2491163a2bf40f5236001"
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


## Get Transaction List
[Ortelius API to list transactions](ortelius.md#list-transactions)

## Aggregates
[Ortelius Aggregate API](ortelius.md#aggregate)




