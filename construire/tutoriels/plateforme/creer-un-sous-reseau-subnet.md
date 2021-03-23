---
description: La création d'un subnet sur Avalanche
---

# Créer un sous-réseau \(subnet\)

## Introduction

Un [**sous-réseau \(subnet**\)](../../../apprendre/presentation-du-systeme/#sous-reseaux-subnets) est un ensemble de validateurs. Un sous-réseau valide un ensemble de blockchains. Chaque blockchain est validée par exactement un sous-réseau, qui est spécifié lors de la création de la blockchain. Les sous-réseaux sont une primitive puissante qui permet aux blockchains d'avoir des ensembles de validateurs personnalisés, ce qui signifie que l'on peut créer des blockchains autorisées.

Lors de la création d'un sous-réseau, un seuil et un ensemble de clés sont spécifiés. \(En fait, les adresses des clés, et non les clés elles-mêmes, sont spécifiées.\) Afin d'ajouter un validateur à ce sous-réseau, des _thresold_ signatures de ces clés sont nécessaires. Nous les appelons les **clés de contrôle du sous-réseau** et nous appelons la signature d’une clé de contrôle sur une transaction qui ajoute un validateur à un sous-réseau une **signature de contrôle**. Le résultat est qu'un sous-réseau contrôle ses membres.

Dans ce tutoriel, nous allons créer un nouveau sous-réseau avec 2 clés de contrôle et un seuil de 2.

## Générer les clés de contrôle

Commençons par générer les 2 clés de contrôle. Pour ce faire, nous appelons [`platform.createAddress`](../../apis/platform-api-p-chain.md#platform-createaddress) . Cela génère une nouvelle clé privée et la stocker pour un utilisateur.

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

Cela donne la première clé de contrôle \(encore une fois, cela donne en fait l'adresse de la première touche de contrôle\). La clé est détenue par l'utilisateur que nous venons de spécifier.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1spnextuw2kfzeucj0haf0e4e08jd4499gn0zwg"
    },
    "id": 1
}
```

Générez la deuxième clé :

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

La réponse contient la deuxième clé de contrôle, qui est détenue par l'utilisateur que nous venons de spécifier :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "address": "P-avax1zg5uhuwfrf5tv852zazmvm9cqratre588qm24z"
    },
    "id": 1
}
```

### Créer le sous-réseau \(subnet\)

Pour créer un sous-réseau nous appelons [`platform.createSubnet`.](https://docs.avax.network/v1.0/en/api/platform/#platformcreatesubnet)

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

### Verification du succès <a id="verifying-success"></a>

Nous pouvons appeler [`platform.getSubnets`](../../apis/platform-api-p-chain.md#platform-getsubnets) pour obtenir tous les sous-réseaux existants :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.getSubnets",
    "params": {},
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse confirme que notre sous-réseau a été créé :

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

### Ajouter un validateur au sous-réseau <a id="add-validators-to-the-subnet"></a>

Pour ajouter un validateur à un sous-réseau veuillez suivre le lien ci-dessous.

{% page-ref page="../noeuds-et-mise-en-jeu/ajouter-un-validateur.md" %}

