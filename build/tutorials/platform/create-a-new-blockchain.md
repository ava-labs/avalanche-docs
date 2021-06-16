# Create a Blockchain

## Introduction

One of the core features of Avalanche is the ability to create new blockchains. Avalanche currently supports the creation of new instances of the [Avalanche Virtual Machine \(AVM\)](../../avalanchego-apis/exchange-chain-x-chain-api.md) and the Timestamp VM.

In this tutorial, we’ll create a blockchain by creating a new instance of the AVM.

### Prerequisites

You will need a running node, a user on the node, and some AVAX in the address controlled by the user. All of that is covered in the [Run an Avalanche Node](../nodes-and-staking/run-avalanche-node.md) tutorial.

Next, you need to have your node be a validator on the [Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). You can find out how to do that in the [Add a Validator](../nodes-and-staking/add-a-validator.md) tutorial. It is recommended you do that [with API calls](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls), since that is the way you will be interacting with your node in the rest of this tutorial.

## Create the Subnet

Every blockchain is validated by a [subnet](../../../learn/platform-overview/#subnets). Before you can create a blockchain, you’ll need a subnet to validate it. You can also use a subnet that already exists if you have a sufficient number of its control keys.

{% page-ref page="create-a-subnet.md" %}

### Add Validators to the Subnet

The subnet needs validators in it to, well, validate blockchains.

{% page-ref page="../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator" %}

### Create the Genesis Data <a id="create-the-genesis-data"></a>

Each blockchain has some genesis state when it’s created. Each VM defines the format and semantics of its genesis data. The AVM and Coreth have a static API method named `buildGenesis` that takes in a JSON representation of a blockchain’s genesis state and returns the byte representation of that state. 

The [AVM’s documentation](../../avalanchego-apis/exchange-chain-x-chain-api.md) specifies that the argument to [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis) should look like this:

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

To create the byte representation of this genesis state, call [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis). Your call should look like the one below. Note that AVAX does not exist on custom blockchains, but you'll still need a way to pay for transaction fees on this new chain. On custom AVM instances, the transaction fees are denominated in the first asset specified in the `genesisData`. In this example, fees are paid with `asset1` (named `myFixedCapAsset`.) Make sure that you put enough amount to cover for fees. The default transaction fee is 1,000,000 of whatever asset the fees are denominated in. More information about fees can be found [`here.`](../../../learn/platform-overview/transaction-fees.md#transaction-fees)

Note that this call is made to the AVM’s static API endpoint, `/ext/vm/avm`:

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
                            "address": "8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ"
                        },
                        {
                            "amount":100000000,
                            "address": "AgVkHvvDShLumJrzXzkwuHa7rYpewj9Kg"
                        },
                        {
                            "amount":5000000,
                            "address": "AwBDGsUwNdXgVc8XG2E8A8dL3bkoVbkL9"
                        },
                        {
                            "amount":5000000,
                            "address": "AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8"
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
                                "AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8",
                                "FNqMDYafoDVYQ2o4a7Zd9maJAxcUEieQb"
                            ],
                            "threshold":1
                        },
                        {
                            "minters": [
                                "JJSiKQfha9Z2TiMxBZ8XdW9F6KFw8aKS4",
                                "7jJHY1vZL6AAbCFb97KMLY8nqMQVyd5JG",
                                "58pM5cEf1wMSncPdCwtQ8tbHs2xdMA4eo"
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

This returns the byte representation of your blockchain’s genesis state:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T"
    },
    "id": 1
}
```

## Create the Blockchain

Now let’s create the new blockchain. To do so, we call [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain). Your call should look like the one below. You have to change `subnetID` to the subnet that will validate your blockchain, and supply a `username` that controls a sufficient number of the subnet’s control keys. As a reminder, you can find out what a subnet’s threshold and control keys are by calling [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets).

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

The response contains the transaction ID:

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

### Verify Success <a id="verify-success"></a>

After a few seconds, the transaction to create our blockchain should have been accepted and the blockchain should exist \(assuming the request was well-formed, etc.\)

To check, call [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). This returns a list of all blockchains that exist.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

The response confirms that the blockchain was created:

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
                "id": "CqhF97NNugqYLiGaQJ2xckfmkEr8uNeGG5TQbyGcgnZ5ahQwa",
                "name": "Simple DAG Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjdyTKUSrQs1YmKDTUbdUhdstSdtRTGRbUn8sqK8B6pkZkz1"
            },
            {
                "id": "VcqKNBJsYanhVFxGyQE5CyNVYxL3ZFD7cnKptKWeVikJKQkjv",
                "name": "Simple Chain Payments",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "sqjchUjzDqDfBPGjfQq2tXW1UCwZTyvzAWHsNzF2cb1eVHt6w"
            },
            {
                "id": "2SMYrx4Dj6QqCEA3WjnUTYEFSnpqVTwyV3GPNgQqQZbBbFgoJX",
                "name": "Simple Timestamp Server",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### Validating the Blockchain <a id="validating-blockchain"></a>

Every blockchain needs a set of validators to validate and process transactions on it. You can check if a node is validating a given blockchain by calling [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus) on that node:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

If it responds `"Validating"`, the node is validating the given chain. If it responds `"Created"`, then the chain exists but this node is not validating it. Note that in order to validate a subnet, you need to start your node with argument `--whitelisted-subnets=[subnet ID goes here]` (e.g. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`) as well as add the node to the subnet's validator set.

More information can be found in the [Adding a Subnet Validator](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) tutorial.

### Interacting with the New Blockchain <a id="interact-with-the-new-blockchain"></a>

You can interact with this new instance of the AVM almost the same way you’d interact with the [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain). There are some small differences:

- The API endpoint of your blockchain is `127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK`.
- Addresses are prepended with `zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-` rather than `X-`.
- Fees are paid with the first asset specified in the genesis data, as noted above, rather than AVAX..

In the genesis data we specified that address `8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ` has 100,000,000 units of the asset with alias `asset1`. Let’s verify that:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ",
        "assetID":"asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
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

Let's send some `asset1` to another address. First, create a recipient address:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "address": "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-6JnJrXHM5g6L6hTz119jxI7i9nu0tvhRl"
  },
  "id": 1
}
```

Now let's send 1 unit of `asset1` to the new address with [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.send).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID" : "asset1",
        "amount"  : 1,
        "from"    : ["zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ"],
        "to"      : "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-6JnJrXHM5g6L6hTz119jxI7i9nu0tvhRl",
        "changeAddr": "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ",
        "username": "USERNAME GOES HERE",
        "password": "PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq",
    "changeAddr": "g1GK7GErN3BqauK6BhhU8uCNfaBTMz4VWr3JdwvXXNCwpwQJQ-8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ"
  },
  "id": 1
}
```

We can verify transaction status with:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
       "txID": "2MqZ5x6keEF1mZ4d6rb12bN4euirTqwTTm1AZGVzTT7n3eKQqq"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Accepted"
  },
  "id": 1
}
```

Now we can confirm balances are changed accordingly:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-6JnJrXHM5g6L6hTz119jxI7i9nu0tvhRl",
        "assetID": "asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
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

As mentioned above, transaction fees are paid with `asset1`. We can confirm 1,000,000 unit (default) is used as fee in our transaction. Let's check senders balance after the transaction.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ",
        "assetID": "asset1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
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

This address had 100,000,000 `asset1`, then we sent 1 unit to the other address and paid 1,000,000 for the transaction fee, resulting in a balance of 98,999,999 units of `asset1`.

#### Mint Asset

Our blockchain has another asset `asset2` named `myVarCapAsset`. It is a variable-cap asset. Let's mint more units of this asset with [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.mint). Address `AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8` controls the mintable asset `asset2`, and it also has 5,000,000 unit `asset1`, which is enough to pay the transaction fee.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount": 1,
        "assetID": "asset2",
        "from": ["zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8"],
        "to": "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8",
        "minters": [
            "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8"
        ],
        "changeAddr": "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8",
        "username": "USERNAME GOES HERE",
        "password": "PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
{
  "jsonrpc": "2.0",
  "result": {
    "txID": "2UQL5u5ZEELHfRpAtDYtmFF8BMSdoWNWS1Zf2dkbVSDeTbXeJQ",
    "changeAddr": "zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8"
  },
  "id": 1
}
```

Let's check the balance with [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.getAllBalances).

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getAllBalances",
    "params" :{
        "address":"zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK
```

```json
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

As we can see, 1 unit of `asset2` was minted. Address `AATN8YjgmFjC2jQRq45sEeGcBFXNYPcM8` had 5,000,000 `asset1`, as defined in the genesis data, and now has 4,000,000 `asset1` after paying the transaction fee.
