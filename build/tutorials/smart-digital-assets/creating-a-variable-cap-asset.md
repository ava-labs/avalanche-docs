# Créer un actif de variable

## Introduction

Ce tutoriel illustre comment créer un actif fongible et variable. Aucune unité de l'actif n'existe lorsque l'actif est initialisé, mais d'autres unités de l'actif peuvent être frappées. Sur la création d'actifs, nous spécifions les jeux d'adresses qui peuvent taper plus d'unités.

Vous vous demandez peut-être pourquoi nous spécifions des _ensembles d'adresses qui peuvent taper plus d'unités de l'actif que _d'une seule adresse. Voici pourquoi:

* **Sécurité : **si une seule adresse peut n'être plus d'actifs et que la clé privée pour cette adresse est perdue, ni plus d'unités ne peuvent jamais être n'être n'importe où. De même, si une seule adresse peut n'importe quelle autre adresse peut n'importe quel autre élément de l'actif, rien ne empêche le titulaire de cette adresse de n'importe quel point de frappe unilatéralement ce qu'ils veulent.
* ****Flexibilité : il est agréable de pouvoir encoder une logique comme, « Alice peut unilatéralement frapper plus d'unités de cet actif, ou 2 de Dinesh, Ellin et Jamie peuvent en coder plus ».

Supposons que nous voulons émettre un actif qui représente les actions d'une société. Aucune action n'existe pour commencer, mais d'autres actions peuvent être créées ultérieurement. Créons un tel actif.

## Exigences

Vous avez terminé [Exécuter un nœud Avalanche](../nodes-and-staking/run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/).

## Créer l'actif

[`avm.createVariableCapAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createvariablecapasset)Notre actif existera sur la X-Chain, afin de créer notre actif que nous appellerons , qui est une méthode de [l'API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la X-Chain.

La signature pour cette méthode est :

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

* `name`est un nom lisible par l'homme pour notre actif. Pas nécessairement unique. Entre 0 et 128 caractères.
* `symbol`est un symbole de shorthand pour cet actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `denomination`détermine comment les soldes de cet actif sont affichés par les interfaces d'utilisateur. Si la dénomination est de 0, 100 unités de cet actif sont affichées comme 100. Si la dénomination est de 1, 100 unités de cet actif sont affichées comme 10,0. Si la dénomination est de 2, 100 unités de cet actif sont affichées sous la forme de .100, etc.
* `minterSets`est une liste où chaque élément spécifie celle des adresses dans `minters`peut ensemble taper plus de `threshold`l'actif en signant une transaction de frappe.
* `username``password`Pour effectuer une transaction sur la X-Chain, une taxe de transaction est payée sur AVAX.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une des adresses contrôlées par l'utilisateur.

### Réponse

* `assetID`est l'ID du nouvel actif.
* `changeAddr`dans le résultat est l'adresse où tout changement a été envoyé.

Plus tard dans cet exemple, nous allons taper plus d'actions, donc assurez-vous de remplacer au moins 2 adresses dans le second jeu de minter avec les adresses de vos contrôles d'utilisateurs.

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

La réponse devrait ressembler à ce qui suit :

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

En ce moment là, 0 parts existent. Let's pitons 10M shares.

### Créer la transaction non signée

Nous utiliserons [`avm.mint`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mint)pour frapper les actions.

* `amount`est le nombre d'actions qui seront créées.
* `assetID`est l'ID de l'actif que nous créons plus de.
* `to`est l'adresse qui recevra les actions nouvellement frappées. Remplacez `to`par une adresse vos commandes d'utilisateur afin que vous puissiez envoyer plus tard certaines des actions nouvellement frappées.
* `username`doit être un utilisateur qui détient des clés lui donnant la permission de naître plus de cet actif. C'est-à-dire qu'il contrôle au moins les _clés de _seuil pour l'une des jeux de minter que nous avons spécifiés ci-dessus.

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

Nous pouvons vérifier l'état de la transaction que nous venons de envoyer au réseau en utilisant [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

Cela devrait donner :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "status": "Accepted"
    },
    "id": 1
}
```

## Trade the Asset

### Vérifier l'équilibre

Toutes les actions de 10M sont contrôlées par `to`l'adresse que nous avons spécifiée dans .`mint` Pour vérifier cela, nous utiliserons [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance):

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

Vérifions les soldes de l'adresse `to`:

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

* Utilisé `createVariableCapAsset`pour créer un actif à plafond variable qui représente des actions.
* Utilisé `mint`pour frapper plus d'unités d'un actif.
* Utilisé pour vérifier les soldes `getBalance`d'adresses.
* Utilisé `send`pour transférer des actions.

