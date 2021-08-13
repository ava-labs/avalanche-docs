# Créer un sous-réseau

## Introduction

Un [sous-réseau](../../../learn/platform-overview/#subnets) est un ensemble de validateurs. Un sous-réseau valide un ensemble de blockchains. Chaque blockchain est validé par exactement un sous-réseau, qui est spécifié sur la création de blockchain. Les Subnets sont un puissant primitif qui permet la création de blockchains permises.

Lorsqu'un sous-réseau est créé, un seuil et un ensemble de touches sont spécifiés. \(En fait, les adresses des clés, pas les clés elles-mêmes, sont spécifiées. \) Afin d'ajouter un validateur à ce sous-réseau, les signatures _de seuil_ de ces touches sont nécessaires. Nous appelons ces **clés de contrôle** du sous-réseau et nous appelons la signature d'une clé de contrôle sur une transaction qui ajoute un validateur à un sous-réseau une **signature de contrôle.** L'aperçu est qu'un sous-réseau a le contrôle de son adhésion.

Dans ce tutoriel, nous allons créer un nouveau sous-réseau avec 2 clés de contrôle et un seuil de 2.

### Générer les clés de contrôle<a id="generate-the-control-keys"></a>

Premièrement, générons les 2 clés de contrôle. Pour ce faire, nous appelons [`platform.createAddress`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createaddress) Cela génère une nouvelle clé privée et la stocke pour un utilisateur.

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

Cela donne la première clé de contrôle \(encore, il donne effectivement _l'adresse_ de la première clé de contrôle\). La clé est tenue par l'utilisateur que nous venons de spécifier.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Générer la seconde clé:

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

La réponse contient la deuxième clé de contrôle, qui est tenue par l'utilisateur que nous venons de spécifier:

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

La réponse nous donne l'ID de la transaction, qui est également l'ID du nouveau Subnet créé.

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

### Vérification du succès<a id="verifying-success"></a>

Nous pouvons appeler [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets) pour obtenir tous les Subnets qui existent:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse confirme que notre sous-réseau a été créé:

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

### Ajouter les validateurs au Sous-réseau<a id="add-validators-to-the-subnet"></a>

Ce [tutoriel](../nodes-and-staking/add-a-validator.md) vous montrera comment ajouter des validateurs à un sous-réseau.

