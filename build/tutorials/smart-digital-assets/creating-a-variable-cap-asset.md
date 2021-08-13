# Créer un actif de cap variable

## Introduction

Ce tutoriel illustre comment créer un actif fongible à cap variable. Aucune unité de l'actif n'existe lorsque l'actif est initialisé, mais plus d'unités de l'actif peut être minted. Sur la création d'actifs, nous spécifions quels ensembles d'adresses peuvent minter plus d'unités.

Vous pouvez vous demander pourquoi nous spécifions _des ensembles_ d'adresses qui peuvent minter plus d'unités de l'actif plutôt qu'une seule adresse. Voici pourquoi:

* **Sécurité:** si une seule adresse peut minter plus de l'actif, et la clé privée pour cette adresse est perdue, aucun autre unité ne peut jamais être minted. De même, si une seule adresse peut minter plus de l'actif, rien ne empêche le titulaire de cette adresse de tirer unilatéralement autant qu'ils le veulent.
* **Flexibilité:** il est agréable de pouvoir encoder la logique comme: « Alice peut unilatéralement mint plus d'unités de cet actif, ou 2 de Dinesh, Ellin et Jamie peuvent ensemble mint plus. »

Supposons que nous voulons émettre un actif qui représente les actions d'une société. Aucune action n'existe pour commencer, mais plus d'actions peuvent être créées ultérieurement. Créons un tel actif.

## Exigences minimales

Vous avez terminé [Run un nœud avalanche](../nodes-and-staking/run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

## Créer l'actif

Notre actif existera sur la chaîne X, donc pour créer notre actif nous allons appeler [`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset), qui est une méthode de l'API de la chaîne [X](../../avalanchego-apis/exchange-chain-x-chain-api.md).

La signature de cette méthode est:

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

* `nom` est un nom lisible par l'homme pour notre actif. Pas nécessairement unique. Entre 0 et 128 caractères.
* `symbole` est un symbole shorthand pour cet actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omise.
* `la dénomination` détermine la manière dont les soldes de cet actif sont affichés par les interfaces utilisateur. Si la valeur est 0, 100 unités de cet actif sont affichées comme 100. Si la valeur est 1, 100 unités de cet actif sont affichées comme 10.0. Si la dénomination est 2, 100 unités de cet actif sont affichées comme .100, etc.
* `minterSets` est une liste où chaque élément spécifie que `le seuil` des adresses dans les `mineurs` peut ensemble minter plus de l'actif en signant une transaction de mintage.
* Pour effectuer une transaction sur la chaîne X, il faut une taxe de transaction payée dans AVAX. `nom` d'utilisateur et `mot de passe` dénotent l'utilisateur qui paie les frais.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si l'omission est effectuée, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.

### Réponse

* `assetID` est l'ID du nouvel actif.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

Plus tard dans cet exemple, nous allons commencer plus d'actions, donc assurez-vous de remplacer au moins 2 adresses dans le second jeu de minter avec les adresses vos commandes utilisateur.

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

La réponse devrait ressembler à ceci:

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

## Mint l'actif

Actuellement, 0 parts existent. Let’s mint 10M actions.

### Créer la transaction non signée

Nous utiliserons [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint) pour la menthe des actions.

* `le montant` est le nombre d'actions qui seront créées.
* `assetID` est l'ID de l'actif que nous créons plus.
* `à` est l'adresse qui recevra les actions nouvellement exploitées. Remplacez-le par une adresse vos commandes utilisateur de sorte que plus tard vous `serez` en mesure d'envoyer certaines des actions nouvellement mises en place.
* `nom` d'utilisateur doit être un utilisateur qui détient les clés lui donnant la permission de minter plus de cet actif. Autrement dit, il contrôle au moins les clés _de seuil_ pour l'un des ensembles de minter que nous avons spécifiés ci-dessus.

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

Nous pouvons vérifier l'état de la transaction que nous venons d'envoyer au réseau en utilisant [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

Cela devrait donner:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Commerce de l'actif

### Vérifier l'équilibre

Toutes les actions 10M sont contrôlées par l'adresse que nous avons spécifiée dans `la`` menthe`. Pour vérifier cela, nous allons utiliser [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

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

Envoyons 100 actions à une autre adresse en utilisant [`avm.send`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-send). Pour ce faire:

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

Vérifions les soldes `de` l'adresse :

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

* Utilisé `createVariableCapAsset` pour créer un actif à plafond variable qui représente les actions.
* Utilisé `menthe` pour la menthe plus d'unités d'un actif.
* `getBalance` utilisé pour vérifier les soldes d'adresse.
* Utilisé `envoyer` à transférer des actions.

