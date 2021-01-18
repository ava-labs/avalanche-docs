# Crea una Blockchain

## Introducción

Una de las características principales de Avalanche es la capacidad de crear nuevas blockchains. Avalanche actualmente soporta la creación de nuevas instancias del [Avalanche Virtual Machine \(AVM\)](../../avalanchego-apis/exchange-chain-x-chain-api.md) y el Timestamp VM.

En este tutorial, crearemos una blockchain creando una nueva instancia de la AVM.

### Requisitos Previos

Necesitarás un nodo de ejecución, un usuario en el nodo y algo de AVAX en la dirección controlada por el usuario. Todo eso está cubierto en el tutorial de como [Ejecutar un Nodo de Avalanche](../../getting-started.md).

A continuación, necesitas que tu nodo sea un validador en la [Red Primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Puedes averiguar cómo hacerlo en el tutorial [Añadir un Validador](../nodes-and-staking/add-a-validator.md). Se recomienda que lo haga [con llamados API](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls), ya que esa es la forma en que interactuará con su nodo en el resto de este tutorial.

## Crea la Subnet

Cada blockchain ese validada por una [subnet](../../../learn/platform-overview/#subnets). Antes de que puedas crear una blockchain, necesitarás una subnet para validarla. También puedes usar una subnet que ya exista si tienes un número suficiente de sus control keys.

{% page-ref page="create-a-subnet.md" %}

### Añadir Validadores a la Subnet

La subnet necesita validadores en ella para, bueno, validar las blockchains.

Asegúrate de que la subnet que validará tu blockchain tenga al menos `snow-sample-size` validators in it. \(Recall that `snow-sample-size` is one of the [command-line arguments](../../references/command-line-interface.md) when starting a node. Its default value is 20.\)

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### Create the Genesis Data <a id="create-the-genesis-data"></a>

Each blockchain has some genesis state when it’s created. Each Virtual Machine has a static API method named `buildGenesis` that takes in a JSON representation of a blockchain’s genesis state and returns the byte representation of that state. \(This isn’t true for some VMs, like the Platform VM, because we disallow the creation of new instances.\)

The [AVM’s documentation](../../avalanchego-apis/exchange-chain-x-chain-api.md) specifies that the argument to [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-buildgenesis) should look like this:

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

To create the byte representation of this genesis state, call [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-buildgenesis). Your call should look like the one below. Note that this call is made to the AVM’s static API endpoint, `/ext/vm/avm`.

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
                            "amount":100000,
                            "address": "8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ"
                        },
                        {
                            "amount":100000,
                            "address": "AgVkHvvDShLumJrzXzkwuHa7rYpewj9Kg"
                        },
                        {
                            "amount":50000,
                            "address": "AwBDGsUwNdXgVc8XG2E8A8dL3bkoVbkL9"
                        },
                        {
                            "amount":50000,
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
        "username":"USERNAME",
        "password":"PASSWORD"
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

### Interact With the New Blockchain <a id="interact-with-the-new-blockchain"></a>

You can interact with this new instance of the AVM almost the same way you’d interact with the [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain). There are two small differences:

* The API endpoint of your blockchain is `127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK`.
* Addresses are prepended with `zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-` rather than `X-`.

In the genesis data we specified that address `8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ` has 100,000 units of the asset with alias `asset1`. Let’s verify that:

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

```json
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "100000"
    },
    "id": 1
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1OTkyMzk3MzcsMTExMjAyNzE4Nl19
-->