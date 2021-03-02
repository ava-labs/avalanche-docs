---
description: Créer une blockchain sur le réseau d'Avalanche
---

# Créer une nouvelle blockchain

## Introduction

L'une des principales caractéristiques du réseau Avalanche est la possibilité de créer de nouvelles blockchains. Avalanche prend actuellement en charge la création de nouvelles instances de l'[AVM \(la machine virtuelle exécutée par X-Chain](../../apis/avm-api-x-chain.md)\) et de la VM d'horodatage.

Dans ce tutoriel, nous allons créer une nouvelle instance de l'AVM.

## Créer le Subnet

Chaque blockchain est validée par un [sous-réseau](../../apprendre/presentation-du-systeme/#quest-ce-quun-sous-reseau-subnet). Avant de pouvoir créer une blockchain, vous aurez besoin d'un sous-réseau pour la valider. Vous pouvez également utiliser un sous-réseau qui existe déjà, si vous disposez d'un nombre suffisant de ses clés de contrôle.

{% page-ref page="creer-un-sous-reseau-subnet.md" %}

## Ajouter des validateurs au sous-réseau

Le sous-réseau a besoin de validateurs pour valider les blockchains.

Assurez-vous que le sous-réseau qui validera vôtre blockchain contient au moins des validateurs `snow-sample-size` dedans. \(Rappelez-vous que `snow-sample-size` est l'un des arguments de ligne de commande lors du démarrage d'un nœud. Sa valeur par défaut est 20.\)

{% page-ref page="ajouter-un-validateur.md" %}

## Créer les données Genesis

Chaque blockchain a un état de genèse lors de sa création. Chaque machine virtuelle possède une méthode d'API statique nommée `buildGenesis` qui prend une représentation JSON de l'état de genèse d'une blockchain et renvoie la représentation octet de cet état. \(Ce n'est pas le cas pour certaines VM, comme la VM Platform, car nous interdisons la création de nouvelles instances.\)

La [documentation d'AVM](../../apis/avm-api-x-chain.md) spécifie que l'argument de [`avm.buildGenesis`](../../apis/avm-api-x-chain.md#avm-buildgenesis) doit ressembler à ceci :

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

Pour créer la représentation octet de cet état de genèse, appelez [`avm.buildGenesis`](../../apis/avm-api-x-chain.md#avm-buildgenesis). Votre appel doit ressembler à celui ci-dessous. Notez que cet appel est effectué vers le point de terminaison d'API statique d'AVM, `/ ext / vm / avm`.

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

Cela renvoie la représentation en octets de l'état de genèse de votre blockchain :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T"
    },
    "id": 1
}
```

## Créer la Blockchain

Créons maintenant la nouvelle blockchain. Pour ce faire, nous appelons [`platform.createBlockchain`](../../apis/platform-api-p-chain.md#platform-createblockchain). Votre appel doit ressembler à celui ci-dessous. Vous devez remplacer subnetID par le sous-réseau qui validera vôtre blockchain et fournir un `username` qui contrôle un nombre suffisant de clés de contrôle du sous-réseau. Pour rappel, vous pouvez connaître le seuil et les clés de contrôle d’un sous-réseau en appelant [`platform.getSubnet`](../../apis/platform-api-p-chain.md#platform-getsubnets).

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

La réponse contient l'ID de transaction :

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

### Vérifiez le succès <a id="verify-success"></a>

Après quelques secondes, la transaction de création de notre blockchain aurait dû être acceptée et la blockchain devrait exister \(en supposant que la demande était bien formée, etc.\)

Pour vérifier, appelez [`platform.getBlockchains`](../../apis/platform-api-p-chain.md#platform-getblockchains). Cela renvoie une liste de toutes les blockchains existantes.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse confirme que la blockchain a été créée :

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

### Interagissez avec la nouvelle blockchain <a id="interact-with-the-new-blockchain"></a>

Vous pouvez interagir avec cette nouvelle instance de l'AVM presque de la même manière que vous interagiriez avec la [X-Chain](../../apprendre/presentation-du-systeme/#chaine-dechange-x-chain). Il y a deux petites différences:

* Le point de terminaison API de votre blockchain est `127.0.0.1:9650/ext/bc/zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK`.
* Les adresses sont précédées de `zpFTwJwzPh3b9N6Ahccy4fXdJFHJJdhGah5z731J6ZspcYKpK-` plutôt que `X`-.

Dans les données de genèse, nous avons spécifié que l'adresse `8UeduLccQuSmYiY3fGQEyotM9uXxoHoQQ` a 100 000 unités de l'actif avec l'alias `asset1`. Vérifions cela :

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

