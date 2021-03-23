---
description: Créer et échanger un actif fongible à capitalisation fixe
---

# Créer un actif à capitalisation fixe

## Introduction

Ce tutoriel illustre comment Avalanche peut être utilisé pour créer et échanger un actif fongible à capitalisation fixe. Une quantité de l'actif est créée lors de l'initialisation de l'actif, puis plus rien n'est jamais créé.

Supposons qu'il existe un accord de partage des revenus \(ISA\) avec 10 millions d'actions et qu'aucune action ne soit plus créée. Créons un actif dans lequel une unité de l’actif représente une part de l’ISA.

## Hypothèses

Nous supposons que le lecteur a déjà terminé le guide [pour commencer](../../commencer.md) et est familiarisé avec l'[architecture d'Avalanche](../../../apprendre/presentation-du-systeme/).

## Créer l'actif

Notre actif existera sur la [X-Chain](../../../apprendre/presentation-du-systeme/#x-chain), donc pour créer notre actif, nous appellerons [`avm.createFixedCapAsset`](../../apis/avm-api-x-chain.md#avm-createfixedcapasset), une méthode de l'API de X-Chain.

La signature de cette méthode est :

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

* `name` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique.
* `symbol` est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `denomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la dénomination est 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est 2, 100 unités de cet actif sont affichées sous la forme .100, etc.
* Effectuer une transaction sur la X-Chain nécessite des frais de transaction payés en AVAX. `username` et `password` indiquent quel utilisateur paie les frais.
* Chaque élément de `initialHolders` spécifie que l'`address` contient les unités de montant de l'actif `amount` lors de la genèse.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.

### Réponse

* `assetID` est l'ID du nouvel actif. 
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

Passons maintenant à la création de l'actif. Vous souhaiterez remplacer l'adresse `address` par une adresse contrôlée par votre utilisateur afin de conserver tout l'élément nouvellement créé et de pouvoir l'envoyer plus tard dans ce didacticiel.

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

## Échangez l'actif

### Vérifier un solde

Les 10 000 000 d'unités de l'actif \(actions\) sont contrôlées par l'adresse que nous avons spécifiée dans `initialHolders`.

Pour vérifier cela, nous appelons [`avm.getBalance`](../../apis/avm-api-x-chain.md#avm-getbalance):

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

La réponse confirme que notre création d'actifs a réussi et que l'adresse attendue contient les 10 000 000 actions :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":10000000
    }
}
```

### Envoyez l'actif

Maintenant, envoyons 100 partages en appelant [`avm.send`](../../apis/avm-api-x-chain.md#avm-send).

Pour envoyer les partages, nous devons prouver que nous contrôlons l'utilisateur à partir duquel les partages sont envoyés. Par conséquent, cette fois, nous devrons remplir le `username` et `password`.

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

### Vérifiez l'état de la transaction

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

`txID` est l'ID de la transaction d'envoi que nous avons envoyée au réseau.

Après une seconde ou deux, la transaction devrait être finalisée. Nous pouvons vérifier le statut de la transaction avec [`avm.getTxStatus`](../../apis/avm-api-x-chain.md#avm-gettxstatus):

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

La réponse devrait ressembler à ça :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted"
    }
}
```

Vous pouvez également voir que le `status` est en `Pending` si le réseau ne l'a pas encore finalisé.

Voyons maintenant le solde de l'adresse à:

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

La réponse devrait être :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "balance":100
    }
}
```

## Récapitulatif

Dans ce tutoriel, nous avons :

* Utilisé `createFixedCapAsset` pour créer un actif à capitalisation fixe. 
* Utilisé `getBalance` pour vérifier les soldes d'adresses.
* Utilisé `send` pour transférer une quantité de notre actif.

