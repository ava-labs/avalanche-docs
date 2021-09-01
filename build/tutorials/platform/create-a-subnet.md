# Créer un sous-réseau

## Introduction

Un [sous-réseau](../../../learn/platform-overview/#subnets) est un ensemble de validateurs. Un sous-réseau valide un ensemble de blockchains. Chaque blockchain est validé par exactement un sous-réseau, qui est spécifié sur la création de blockchain. Les sous-réseaux sont un puissant primitif qui permet la création de blockchains autorisées.

Lorsqu'un sous-réseau est créé, un seuil et un ensemble de clés sont spécifiés. \(En fait, les adresses des clés, et non les clés elles-mêmes, sont spécifiées.\) __Afin d'ajouter un validateur à ce sous-réseau, des signatures de seuil de ces clés sont nécessaires. Nous appelons ces clés de **contrôle du sous-réseau et nous appelons la signature d'une clé **de contrôle sur une transaction qui ajoute un validateur à une signature de **contrôle.** The est qu'un sous-réseau a le contrôle de sa adhésion.

Dans ce tutoriel, nous créerons un nouveau sous-réseau avec 2 clés de contrôle et un seuil de 2.

### Générer les clés de contrôle<a id="generate-the-control-keys"></a>

Premièrement, générons les 2 clés de contrôle. Pour ce faire, nous l'appelons [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress)Ceci génère une nouvelle clé privée et la stocke pour un utilisateur.

Pour générer la première clé :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

Cela donne la première clé de contrôle \(de nouveau, il donne en fait _l'adresse de la première clé _de contrôle\). La clé est tenue par l'utilisateur que nous venons de spécifier.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Générer la deuxième clé :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createAddress",
    "params": {
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse contient la deuxième clé de contrôle, qui est tenue par l'utilisateur que nous venons de spécifier :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Créer le sous-réseau<a id="create-the-subnet"></a>

Pour créer un sous-réseau, nous appelons [`platform.createSubnet`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createsubnet).

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createSubnet",
    "params": {
        "controlKeys":[
            "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg",
            "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
        ],
        "threshold":2,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse nous donne l'ID de la transaction, qui est également l'ID du sous-réseau nouvellement créé.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Vérifier le succès<a id="verifying-success"></a>

Nous pouvons appeler [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets)à obtenir tous les sous-réseaux qui existent :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse confirme que notre sous-réseau a été créé :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "subnets": [
            {
                "id": "3fbrm3z38NoDB4yMC3hg5pRvc72XqnAGiu7NgaEp1dwZ8AD9g",
                "controlKeys": [
                    "KNjXsaA1sZsaKCD1cd85YXauDuxshTes2",
                    "Aiz4eEt5xv9t4NCnAWaQJFNz5ABqLtJkR"
                ],
                "threshold": "2"
            }
        ]
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

### Ajouter des validateurs au sous-réseau<a id="add-validators-to-the-subnet"></a>

Ce [tutoriel](../nodes-and-staking/add-a-validator.md) vous montrera comment ajouter des validateurs à un sous-réseau.

