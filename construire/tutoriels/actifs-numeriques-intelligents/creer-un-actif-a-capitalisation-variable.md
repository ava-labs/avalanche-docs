---
description: Créer et échanger un actif fongible à capitalisation variable
---

# Créer un actif à capitalisation variable

## Introduction

Ce tutoriel explique comment créer un actif fongible à plafond variable. Aucune unité de l'actif n'existe lorsque l'actif est initialisé, mais plusieurs unités de l'actif peuvent être frappées. Lors de la création d'actifs, nous spécifions quels ensembles d'adresses peuvent créer plus d'unités.

Vous vous demandez peut-être pourquoi nous spécifions des ensembles d'adresses qui peuvent frapper plus d'unités de l'actif plutôt qu'une seule adresse. Voici pourquoi :

* **Sécurité :** Si une seule adresse peut frapper plus de l'actif et que la clé privée de cette adresse est perdue, aucune autre unité ne peut jamais être frappée. De même, si une seule adresse peut frapper plus de l'actif, rien n'empêche le détenteur de cette adresse de frapper unilatéralement autant qu'il le souhaite.
* **Flexibilité :** C’est bien de pouvoir encoder une logique comme «Alice peut unilatéralement frapper plus d’unités de cet élément, ou Dinesh, Ellin et Jamie peuvent ensemble en fabriquer plus.»

Supposons que nous souhaitons émettre un actif qui représente des actions d'une société. Aucun partage n'existe au départ, mais d'autres partages peuvent être créés ultérieurement. Créons un tel actif.

## Hypothèses

Nous supposons que le lecteur a déjà terminé le guide [pour commencer](../../commencer.md) et est familiarisé avec l'[architecture d'Avalanche](../../../apprendre/presentation-du-systeme/).

## Créer l'actif

Notre actif existera sur la [X-Chain](../../../apprendre/presentation-du-systeme/#x-chain), donc pour créer notre actif, nous appellerons [`avm.createVariableCapAsset`](../../apis/avm-api-x-chain.md#avm-createvariablecapasset), une méthode de l'API de X-Chain.

La signature de cette méthode est :

```cpp
avm.createVariableCapAsset({
    name: string,
    symbol: string,
    denomination: int,
    minterSets []{
        minters: []string,
        threshold: int
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
* `minterSets` est une liste où chaque élément spécifie que le seuil `threshold` des adresses dans les `minters` peut ensemble minter plus de pièces de l'actif en signant une transaction de frappe.
* Effectuer une transaction sur la X-Chain nécessite des frais de transaction payés en AVAX. `username` et `password` indiquent quel utilisateur paie les frais.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.

### Réponse

* `assetID` est l'ID du nouvel actif. 
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

Plus tard dans cet exemple, nous allons créer d'autres shares de cet actif. Assurez-vous donc de remplacer au moins 2 adresses dans le deuxième set de minter par des adresses que vos utilisateurs contrôlent.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.createVariableCapAsset",
    "params" :{
        "name":"Corp. Shares",
        "symbol":"CS",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            },
            {
                "minters": [
                    "X-avax1k4nr26c80jaquzm9369j5a4shmwcjn0vmemcjz",
                    "X-avax1yell3e4nln0m39cfpdhgqprsd87jkh4qnakklx",
                    "X-avax1ztkzsrjnkn0cek5ryvhqswdtcg23nhge3nnr5e"
                ],
                "threshold": 2
            }
        ],
        "from":["X-avax1s65kep4smpr9cnf6uh9cuuud4ndm2z4jguj3gp"],
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse devrait ressembler à ça :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "changeAddr":"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

## Frapper l'actif

Il existe actuellement 0 actions. Nous allons frapper 10 millions d'actions.

### Créer la transaction non signée

Nous utiliserons [`avm.mint`](../../apis/avm-api-x-chain.md#avm-mint) pour frapper les actions.

* `amount` est le nombre d'actions qui seront créées.
* `assetID` est l'ID de l'élément sur lequel nous créons davantage.
* `to` est l'adresse qui recevra les actions nouvellement émises. Remplacez par une adresse que votre utilisateur contrôle afin que vous puissiez ultérieurement envoyer certaines des actions nouvellement créés.
* `username` doit être un utilisateur qui détient des clés lui donnant la permission de frapper davantage de cet actif. Autrement dit, il contrôle au moins les clés de seuil pour l'un des set de minter que nous avons spécifiés ci-dessus.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mint",
    "params" :{
        "amount":10000000,
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "to":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse contient l'ID de la transaction :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ",
        "changeAddr": "X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

Nous pouvons vérifier l'état de la transaction que nous venons d'envoyer au réseau à l'aide de `avm.getTxStatus` :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"E1gqPbkziu8AutqccRa9ioPWyEF3Vd7eMjDJ3UshjQPpLoREZ"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cela devrait nous donner :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Échangez l'actif

### Vérifiez un solde

Les 10M actions sont contrôlées par `to` l'adresse à nous spécifiée dans `mint`. Pour vérifier cela, nous utiliserons [`avm.getBalance`](../../apis/avm-api-x-chain.md#avm-getbalance):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

Envoyons 100 partages à une autre adresse en utilisant [`avm.send`](../../apis/avm-api-x-chain.md#avm-send). Pour faire cela :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE",
        "assetID" :"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2",
        "amount"  :100,
        "to"      :"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Vérifions les soldes de `to` l’adresse :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1qwnlpknmdkkl22rhmad0dcn80wfasp2y3yg3x0",
        "assetID":"i1EqsthjiFTxunrj8WD2xFSrQ5p2siEKQacmCCB5qBFVqfSL2"
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

* Utilisé `createVariableCapAsset` pour créer un actif à capitalisation variable qui représente des actions.
* Utilisé `mint` pour frapper plus d'unités d'un actif.
* Utilisé `getBalance` pour vérifier les soldes d'adresses.
* Utilisé `send` pour transférer des actions.

