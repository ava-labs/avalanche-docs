# Créer un actif à capsulage fixe

## Introduction

Ce tutoriel illustre comment l'Avalanche peut être utilisé pour créer et commercialiser un actif fongible fixe à capuche. Une quantité spécifique de l'actif est créée à l'initialisation de l'actif, et ensuite, plus n'est jamais créé.

Supposons qu'il y ait une entente de partage du revenu \(ISA\) avec des actions 10M, et qu'aucune autre action n'est jamais établie. Créons un actif où une unité de l'actif représente une part de l'ISA.

## Exigences minimales

Vous avez terminé [Run un nœud avalanche](../nodes-and-staking/run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

## Créer l'actif

Notre actif existera sur la [chaîne X](../../../learn/platform-overview/#exchange-chain-x-chain), donc pour créer notre actif nous appellons `avm.createFixedCapAsset`, une méthode de l'API de la chaîne [X](../../avalanchego-apis/exchange-chain-x-chain-api.md).

La signature de cette méthode est:

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

* `nom` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbole` est un symbole shorthand pour l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omise.
* `la dénomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la valeur est 0, 100 unités de cet actif sont affichées comme 100. Si la valeur est 1, 100 unités de cet actif sont affichées comme 10.0. Si la dénomination est 2, 100 unités de cet actif sont affichées comme .100, etc.
* Pour effectuer une transaction sur la chaîne X, il faut une taxe de transaction payée dans AVAX. `nom` d'utilisateur et `mot de passe` dénotent l'utilisateur qui paie les frais.
* Chaque élément dans `initialHolders` spécifie que `l'adresse` détient des unités `de montant` de l'actif à la genèse.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.

### Réponse

* `assetID` est l'ID du nouvel actif.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

Maintenant, sur la création de l'actif. Vous voudrez remplacer `l'adresse` avec une adresse que vous contrôlez afin que vous contrôlez tous les actifs nouvellement mis en place et être en mesure de l'envoyer plus tard dans ce tutoriel.

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

## Commerce de l'actif

### Vérifier l'équilibre

Toutes les 100unités de l'actif \(actions\) sont contrôlées par l'adresse que nous avons spécifiée dans `initialHolders`.

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

La réponse confirme que notre création d'actifs a été réussie et que l'adresse attendue détient l'ensemble des 100actions:

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

Pour envoyer les actions, nous devons prouver que nous contrôlons l'utilisateur que les actions sont envoyées de. Par conséquent, cette fois-ci nous aurons besoin de remplir `le nom` d'utilisateur et `mot` de passe.

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

### Vérifier le statut de la transaction

La réponse de l'appel ci-dessus devrait ressembler à ceci:

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

`txID` est l'ID de la transaction `d'envoi` que nous avons envoyée au réseau.

Après une seconde ou deux, la transaction devrait être finalisée. Nous pouvons vérifier l'état de la transaction avec [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

La réponse devrait ressembler à ceci:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

Vous pourriez également voir que `le statut` est `en instance` si le réseau ne l'a pas encore finalized

Maintenant, vérifions le `solde` de l'adresse :

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

La réponse devrait être:

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

Dans ce tutoriel, nous:

* Appelé `createFixedCapAsset` pour créer une actif de cap fixe
* Appelé `getBalance` pour vérifier les soldes d'adresses
* Appelée `envoyer` à transférer une quantité de notre actif

