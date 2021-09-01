# Créer une blockchain de fonctionnement de l'AVM

## Introduction

L'une des principales caractéristiques d'Avalanche est la possibilité de créer de nouvelles blockchains. Avalanche prend en charge la création de nouvelles instances de la [machine virtuelle Avalanche \(AVM\)](../../../learn/platform-overview/#exchange-chain-x-chain). Dans ce tutoriel, nous créerons une blockchain en créant une nouvelle instance de l'AVM.

Si vous êtes intéressé à construire des blockchains personnalisées, consultez [Créer une machine virtuelle \(VM\)](create-a-virtual-machine-vm.md) et Créer une [blockchain personnalisé](create-a-virtual-machine-vm.md).

### Préalables

Vous aurez besoin d'un nœud d'exécution, d'un utilisateur sur le nœud et d'un certain AVAX dans l'adresse contrôlée par l'utilisateur. Tout cela est couvert dans le tutoriel [Run an Avalanche](../nodes-and-staking/run-avalanche-node.md) Nœud.

Ensuite, vous devez avoir votre nœud être un validateur sur le [réseau principal](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Vous pouvez trouver comment faire cela dans le tutoriel [Ajouter un](../nodes-and-staking/add-a-validator.md) validateur. Il est recommandé que vous le fassez avec les [appels de](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) l'API puisque c'est ainsi que vous interagissez avec votre nœud dans le reste de ce tutoriel.

## Créer le sous-réseau

Chaque blockchain est validé par un [sous-réseau](../../../learn/platform-overview/#subnets). Avant de créer une blockchain, vous aurez besoin d'un sous-réseau pour la valider. Vous pouvez également utiliser un sous-réseau qui existe déjà si vous avez un nombre suffisant de ses clés de contrôle.

{% page-ref page="create-a-subnet.md" %}

### Ajouter des validateurs au sous-réseau

Le sous-réseau a besoin de validateurs pour valider les blockchains.

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

## Créer les données de Genèse<a id="create-the-genesis-data"></a>

Chaque blockchain a un certain état de genèse lorsqu'il est créé. Chaque VM définit le format et les sémantiques de ses données de genèse. L'AVM et Coreth ont une méthode d'API statique nommée `buildGenesis`qui prend en compte une représentation JSON de l'état de genèse d'un blockchain et retourne la représentation d'octets de cet état.

[La documentation de](../../avalanchego-apis/exchange-chain-x-chain-api.md)[`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis) l'AVM spécifie que l'argument doit ressembler à ce qui suit :

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

Pour créer la représentation des octs de cet état de genèse, appelez [`avm.buildGenesis`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.buildGenesis). Votre appel devrait ressembler à celui ci-dessous. Notez que AVAX n'existe pas sur les blockchains personnalisées, mais vous aurez encore besoin d'un moyen de payer les frais de transaction sur cette nouvelle chaîne. Sur les instances AVM personnalisées, les frais de transaction sont libellés dans le premier actif spécifié dans le `genesisData`. Dans cet exemple, les frais sont payés avec `asset1`\(nommé `myFixedCapAsset`.\) Assurez-vous que vous mettez assez de montant pour couvrir les frais. La taxe de transaction par défaut est de 1 000 000 personnes de tout actif sur lequel les frais sont libellés. Plus d'informations sur les frais peuvent être trouvées[`here.`](../../../learn/platform-overview/transaction-fees.md#transaction-fees)

Notez que cet appel est effectué au point de référence de l'API statique de l'AVM, `/ext/vm/avm`:

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

Cela renvoie la représentation des octets de l'état de genèse de votre blockchain :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "bytes": "111TNWzUtHKoSvxohjyfEwE2X228ZDGBngZ4mdMUVMnVnjtnawW1b1zbAhzyAM1v6d7ECNj6DXsT7qDmhSEf3DWgXRj7ECwBX36ZXFc9tWVB2qHURoUfdDvFsBeSRqatCmj76eZQMGZDgBFRNijRhPNKUap7bCeKpHDtuCZc4YpPkd4mR84dLL2AL1b4K46eirWKMaFVjA5btYS4DnyUx5cLpAq3d35kEdNdU5zH3rTU18S4TxYV8voMPcLCTZ3h4zRsM5jW1cUzjWVvKg7uYS2oR9qXRFcgy1gwNTFZGstySuvSF7MZeZF4zSdNgC4rbY9H94RVhqe8rW7MXqMSZB6vBTB2BpgF6tNFehmYxEXwjaKRrimX91utvZe9YjgGbDr8XHsXCnXXg4ZDCjapCy4HmmRUtUoAduGNBdGVMiwE9WvVbpMFFcNfgDXGz9NiatgSnkxQALTHvGXXm8bn4CoLFzKnAtq3KwiWqHmV3GjFYeUm3m8Zee9VDfZAvDsha51acxfto1htstxYu66DWpT36YT18WSbxibZcKXa7gZrrsCwyzid8CCWw79DbaLCUiq9u47VqofG1kgxwuuyHb8NVnTgRTkQASSbj232fyG7YeX4mAvZY7a7K7yfSyzJaXdUdR7aLeCdLP6mbFDqUMrN6YEkU2X8d4Ck3T"
    },
    "id": 1
}
```

## Créer la blockchain

Maintenant, créons la nouvelle blockchain. Pour le faire, nous appelons [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain). Votre appel devrait ressembler à celui ci-dessous. Vous devez changer `subnetID`au sous-réseau qui validera votre blockchain, et fournir un `username`qui contrôle un nombre suffisant de clés de contrôle du sous-réseau. Pour rappel, vous pouvez découvrir ce que sont le seuil et les clés de contrôle d'un sous-réseau en appelant [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets).

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

La réponse contient l'ID de la transaction :

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

### Vérifier le succès<a id="verify-success"></a>

Après quelques secondes, la transaction pour créer notre blockchain aurait dû être acceptée et la blockchain devrait exister \(en supposant que la demande ait été bien formée, etc.\)

Pour vérifier, appelez [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). Cela renvoie une liste de toutes les blockchains qui existent.

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

### Validation de la blockchain<a id="validating-blockchain"></a>

Chaque blockchain a besoin d'un ensemble de validateurs pour valider et traiter les transactions sur elle. Vous pouvez vérifier si un nœud node une blockchain donnée en appelant [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)à ce nœud, en particulier :

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

Si elle répond `"Validating"`, le nœud validera la chaîne donnée. Si elle répond , la chaîne suivie par ce `"Syncing"`nœud, mais elle ne s'est pas validante. Si elle répond `"Created"`alors la chaîne existe mais elle n'est pas en train de se synchroniser. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`Notez que pour valider ou regarder un sous-réseau, vous devez démarrer votre nœud avec un argument \(par `--whitelisted-subnets=[subnet ID goes here]`exemple\) et ajouter le nœud au jeu de validateur du sous-réseau.

Plus d'informations peuvent être trouvées dans le tutoriel [de validateur de](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) sous-réseau.

## Interagissant avec la nouvelle blockchain<a id="interact-with-the-new-blockchain"></a>

Vous pouvez interagir avec cette nouvelle instance de l'AVM presque de la même manière que vous interagissez avec la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain). Il y a quelques petites différences :

* Le point de fin de l'API de votre blockchain est `127.0.0.1:9650/ext/bc/xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH`. Vous pouvez également alias cette ID de la chaîne avec pour `myxchain`des URL d'API plus simples. Plus d'informations :

   [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

* Les adresses sont préparées avec `xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH-`plutôt que .`X-`
* Les frais sont payés avec le premier actif spécifié dans les données de genesis, comme mentionné ci-dessus, plutôt que AVAX..

### Vérifier l'équilibre

Dans les données de genesis, nous avons spécifié que l'adresse `avax1dmrwka6uck44zkaamagq46hhntta67yxfy9h9z`a 100 000 000 unités de l'actif avec des alias .`asset1` Vérifiez que:

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

### Envoyer un actif

Envoyons certains `asset1`à une autre adresse. Premièrement, créez une adresse de destinataire:

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

Maintenant envoyons une unité de l'adresse `asset1`à la nouvelle adresse avec .[`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.send)

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

Nous pouvons vérifier l'état de la transaction avec:

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

Maintenant nous pouvons confirmer que les soldes sont modifiés en conséquence :

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

Comme mentionné plus haut, les frais de transaction sont payés avec `asset1`. Nous pouvons confirmer que 1 000 000 unités \(par défaut\) est utilisé comme frais dans notre transaction. Vérifions l'équilibre des expéditeurs après la transaction.

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

Cette adresse avait 100 000 000 `asset1`, puis nous avons envoyé une unité à l'autre adresse et avons payé 1 000 000 pour les frais de transaction, ce qui a entraîné un solde de 98 999 999 unités de `asset1`.

### Mint Asset

Notre blockchain a un autre actif `asset2`nommé .`myVarCapAsset` C'est un actif à variable-cap Frappons plus d'unités de cet actif avec [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.mint). L'adresse `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`contrôle l'actif de la table , `asset2`et elle a également 5 000 000 unités , ce `asset1`qui est suffisant pour payer les frais de transaction.

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

Vérifions l'équilibre avec [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm.getAllBalances).

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

Comme nous pouvons le voir, une unité de a `asset2`été frappée. L'adresse `avax16k8n4d8xmhplqn5vhhm342g6n9rkxuj8wn6u70`avait 5 000 000 , `asset1`comme défini dans les données de la genèse, et a maintenant 4 000 000 `asset1`après avoir payé les frais de transaction.

