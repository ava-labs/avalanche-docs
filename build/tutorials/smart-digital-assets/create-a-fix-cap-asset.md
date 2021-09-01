# Créer un actif à capuchon fixe

## Introduction

Ce tutoriel illustre comment Avalanche peut être utilisé pour créer et trader un actif fongible et fixe. Une quantité spécifique de l'actif est créée à l'initialisation de l'actif, et puis, plus aucun autre n'est jamais créé.

Supposons qu'il existe un accord de partage de revenu \(ISA\) avec des actions de 10 millions d'actions, et qu'aucun autre n'est jamais créé. Créons un actif où une unité de l'actif représente une part de l'ISA.

## Exigences

Vous avez terminé [Exécuter un nœud Avalanche](../nodes-and-staking/run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

## Créer l'actif

`avm.createFixedCapAsset`Notre actif existera sur la X-Chain, afin de créer notre actif que nous appellerons [,](../../../learn/platform-overview/#exchange-chain-x-chain) une méthode de [l'API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la X-Chain.

La signature pour cette méthode est :

```cpp
avm.createFixedCapAsset({
    name: string,
    symbol: string,
    denomination: int,  
    initialHolders: []{
        address: string,
        amount: int
    },
    from: []string,
    changeAddr: string,
    username: string,  
    password: string
}) ->
{
    assetID: string,
    changeAddr: string,
}
```

### Paramètres

* `name`est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol`est un symbole de shorthand pour l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `denomination`détermine comment les soldes de cet actif sont affichés par les interfaces d'utilisateur. Si la dénomination est de 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est de 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est de 2, 100 unités de cet actif sont affichées sous la forme de .100, etc.
* `username``password`Pour effectuer une transaction sur la X-Chain, une taxe de transaction est payée sur AVAX.
* Chaque élément de `initialHolders`spécifie qui `address`détient des `amount`unités de l'actif sur la genèse.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.

### Réponse

* `assetID`est l'ID du nouvel actif.
* `changeAddr`dans le résultat est l'adresse où tout changement a été envoyé.

Maintenant, sur la création de l'actif. Vous voulez remplacer `address`par une adresse que vous contrôlez afin que vous contrôlez tous les actifs nouvellement frappés et que vous puissiez l'envoyer plus tard dans ce tutoriel.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createFixedCapAsset",
    "params" :{
        "name": "ISA Shares",
        "symbol":"ISAS",
        "denomination": 0,
        "initialHolders": [
            {
                "address": "X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
                "amount": 10000000
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse contient l'ID de l'actif, qui est également l'ID de cette transaction :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Trade the Asset

### Vérifier l'équilibre

Toutes les 10 000 000 unités de l'actif \(actions\) sont contrôlées par l'adresse que nous avons spécifiée dans `initialHolders`.

Pour vérifier cela, nous appelons [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax10pvk9anjqrjfv2xudkdptza654695uwc8ecyg5",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse confirme que notre création d'actifs a été réussie et que l'adresse prévue détient toutes les 10 000 000 actions :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Envoyer l'actif

Maintenant, envoyons 100 actions en appelant [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send).

Pour envoyer les actions, nous devons prouver que nous contrôlons l'utilisateur que les actions sont envoyées. Par conséquent, cette fois-ci, nous aurons besoin de remplir `username`et .`password`

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1",
        "amount"  :100,
        "to"      :"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

### Vérifier l'état de la transaction

La réponse de l'appel ci-dessus devrait ressembler à ceci :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

`txID`est l'ID de la `send`transaction que nous avons envoyé au réseau.

Après une deuxième ou deux, la transaction doit être finalisée. Nous pouvons vérifier l'état de la transaction avec [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2EAgR1YbsaJrwFiU4DpwjUfTLkt97WrjQYYNQny13AheewnxSR"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse devrait ressembler à ce qui suit :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

Vous pouvez également voir que `status`c'est `Pending`si le réseau ne l'a pas encore finalisé

Maintenant, vérifions l'équilibre de l'adresse `to`:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1t8sl0knfzly3t3sherctxwezy533ega3sxww2k",
        "assetID":"keMuoTQSGjqZbNVTCcbrwuNNNv9eEEZWBaRY3TapcgjkoZmQ1"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse devrait être :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Wrapping

Dans ce tutoriel, nous :

* Appelé à créer un actif `createFixedCapAsset`de cap fixe
* Appelé à vérifier les soldes `getBalance`d'adresses
* Appelé `send`à transférer une quantité de notre actif

