---
description: Création d'un actif non fongible
---

# Création d'un NFT - Partie 1

## Introduction

Avalanche est un réseau financier mondial pour l'émission et le commerce de biens numériques. Sur Avalanche, ces biens numériques sont représentés sous forme de jetons, qui peuvent être des actifs ou des utilitaires. Certains jetons sont **fongibles**, ce qui signifie qu'un jeton est interchangeable avec n'importe quel autre jeton. La monnaie du monde réel est fongible, par exemple; un billet de 5 $ est traité comme étant le même que tout autre billet de 5 $.

Avalanche prend également en charge les **jetons non fongibles \(NFT\)**. Par définition, chaque NFT est unique et n'est pas parfaitement interchangeable avec un autre NFT. Par exemple, il pourrait y avoir un NFT qui représente la propriété d'une œuvre d'art du monde réel; chaque œuvre d'art, comme chaque NFT, est unique. Les NFT représentent une rareté numérique et peuvent s'avérer encore plus utiles que les jetons fongibles traditionnels.

Dans ce didacticiel, nous allons créer et envoyer des NFT à l'aide de l'API d'AvalancheGo. Dans un prochain tutoriel, nous allons créer une famille NFT personnalisée à l'aide d'AvalancheJS et explorer les NFT plus en détail.

## Hypothèses

Nous supposons que le lecteur a déjà terminé le guide [pour commencer](../../commencer.md) et est familiarisé avec l'[architecture d'Avalanche](../../../apprendre/presentation-du-systeme/). Dans ce tutoriel, nous utilisons la [collection Postman d'Avalanche](https://github.com/ava-labs/avalanche-postman-collection) pour nous aider à faire des appels API.

## Créer la famille NFT

Chaque NFT appartient à une **famille**, qui a un nom et un symbole. Chaque famille est composée de **groupes**. Le nombre de groupes dans une famille est spécifié lors de la création de la famille. Notre NFT existera sur la X-Chain, donc pour créer notre famille NFT, nous appellerons [`avm.createNFTAsset`](../../apis/avm-api-x-chain.md#avm-createnftasset), qui est une méthode de l'[API de X-Chain](../../apis/avm-api-x-chain.md).

La signature de cette méthode est :

```cpp
avm.createNFTAsset({
    name: string,
    symbol: string,
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

### **Méthode**

* \`\`[`avm.createNFTAsset`](../../apis/avm-api-x-chain.md#avm-createnftasset)

### **Paramètres**

* `name` est un nom lisible par l'homme pour l'actif. Pas nécessairement unique. Entre 0 et 128 caractères.
* `symbol` est un symbole abrégé de l'actif. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `minterSets` est une liste où chaque élément spécifie que le seuil `threshold` des adresses dans les `minters` peut ensemble minter plus de pièces de l'actif en signant une transaction de frappe.
* Effectuer une transaction sur la X-Chain nécessite des frais de transaction payés en AVAX. `username` et `password` indiquent quel utilisateur paie les frais.
* Chaque élément de `initialHolders` spécifie que l'`address` contient les unités de montant de l'actif `amount` lors de la genèse.
* `from` sont les adresses que vous souhaitez utiliser pour cette opération. En cas d'omission, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse à laquelle tout changement sera envoyé. En cas d'omission, la modification est envoyée à l'une des adresses contrôlées par l'utilisateur.

### **Réponse**

* `assetID` est l'ID du nouvel actif. 
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

Plus loin dans cet exemple, nous créerons un NFT. Assurez-vous donc de remplacer au moins 1 adresse dans le set de minter par une adresse que votre utilisateur contrôle.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.createNFTAsset",
    "params" :{
        "name":"Family",
        "symbol":"FAM",
        "minterSets":[
            {
                "minters": [
                    "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
                ],
                "threshold": 1
            }
        ],
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
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "changeAddr":"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"
    }
}
```

Quelques points à noter: tout d'abord, en plus de créer une famille NFT, `avm.createNFTAsset` d'AvalancheGo crée également un groupe pour chacun des `minterSets` qui sont transmis. Par exemple, si minterSets a 3 éléments, la famille NFT a 3 groupes. Deuxièmement, notez le `assetID` qui est retourné dans la réponse. Il s'agit de l'ID d'élément de la famille NFT nouvellement créée et vous en aurez besoin plus tard pour émettre des NFT.

Vous vous demandez peut-être pourquoi nous spécifions des _sets_ d'adresses qui peuvent frapper plus d'unités de l'actif plutôt qu'une seule adresse. Voici les raisons :

* **Sécurité :** Si une seule adresse peut frapper plus de l'actif et que la clé privée de cette adresse est perdue, aucune autre unité ne peut jamais être frappée. De même, si une seule adresse peut frapper plus de l'actif, rien n'empêche le détenteur de cette adresse de frapper unilatéralement autant qu'il le souhaite.
* **Flexibilité :** C’est bien de pouvoir encoder une logique comme «Alice peut unilatéralement frapper plus d’unités de cet élément, ou Dinesh, Ellin et Jamie peuvent ensemble en fabriquer plus.»

## Obtenez les UTXO pour NFT

Les sorties NFT n'apparaissent pas dans les appels à [`avm.getBalance`](../../apis/avm-api-x-chain.md#avm-getbalance) ou [`avm.getAllBalances`](../../apis/avm-api-x-chain.md#avm-getallbalances). Pour voir vos NFT, vous devez appeler [`avm.getUTXOs`](../../apis/avm-api-x-chain.md#avm-getutxos), puis analyser l'utxo pour vérifier le type de l'ID. Les sorties NFT Mint ont un identifiant de type `00 00 00 0a` en hexadécimal \(`10` en décimal\) et les sorties de transfert NFT ont un identifiant de type `00 00 00 0b` en hexdécimal \(`11` en décimal\).

### **Méthode**

* \`\`[`avm.getUTXOs`](../../apis/avm-api-x-chain.md#avm-getutxos)

### **Paramètres :**

* `addresses` sont les adresses pour lesquelles récupérer les UTXO.

### **Résponse:**

* `numFetched` est le nombre total d'UTXO dans la réponse.
* `utxos` est un tableau de  chaîne de caractères codées CB58.
* `endIndex` Cette méthode prend en charge la pagination. `endIndex` désigne le dernier UTXO renvoyé.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse contient une liste d'UTXO :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numFetched": "2",
        "utxos": [
            "116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC",
            "11cxRVipJgtuHy1ZJ6qM7moAf3GveBD9PjHeZMkhk7kjizdGUu5RxZqhViaWh8dJa9jT9sS62xy73FubMAxAy8b542v3k8frTnVitUagW9YhTMLmZ6nE48Z9qXB2V9HHzCuFH1xMvUEj33eNWv5wsP3JvmywkwkQW9WLM"
        ],
        "endIndex": {
            "address": "X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
            "utxo": "2iyUVo8XautXpZwVfp5vhSh4ASWbo67zmHbtx7SUJg2Qa8BHtr"
        }
    }
}
```

\`\`[`avm.getUTXOs`](../../apis/avm-api-x-chain.md#avm-getutxos) renvoie 2 UTXO. Prenons le premier et décodons-le pour confirmer qu’il s’agit d’une sortie NFT Mint. Tout d'abord, nous convertissons la chaîne de caractères codée Base58Check qui est retournée par [`avm.getUTXOs`](../../apis/avm-api-x-chain.md#avm-getutxos) en hexadécimal. La chaîne de caractères CB58 suivante :

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

est exprimé en hexadécimal comme cela :

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Nous pouvons maintenant décomposer l'hexagone en composants individuels de l'UTXO en se référant au **format de sérialisation de transaction** :

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0a
GroupID: 00 00 00 00
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Notez que le `TypeID` est `00 00 00 0a` qui est un type d'ID correct pour une sortie NFT Mint. Notez également que le `GroupID` est `00 00 00 00`. Ce `GroupID` a été créé en fonction du nombre de `MinterSets` que j'ai transmis à [`avm.createNFTAsset`](../../apis/avm-api-x-chain.md#avm-createnftasset).

## Frapper l'actif

Maintenant que nous avons une famille NFT et un groupe pour le seul `MinterSet`, nous sommes en mesure de créer des NFT appartenant à ce groupe. Pour ce faire, nous appelons [`avm.mintNFT`](../../apis/avm-api-x-chain.md#avm-mintnft):

### **Méthode**

* \`\`[`avm.mintNFT`](../../apis/avm-api-x-chain.md#avm-mintnft)

### **Paramètres**

* `assetID` est l'ID de la famille NFT.
* `payload` est une charge utile encodée CB58 arbitraire jusqu'à 1024 octets. Dans la partie 2 \(BIENTÔT\), nous explorerons la création d'un protocole autour de la charge utile NFT. Pour ce didacticiel, la payload est la  chaîne de caractères «AVA Labs».
* `to` est l'adresse qui recevra le NFT nouvellement créé. Remplacez `to` par une adresse que votre utilisateur contrôle afin que vous puissiez plus tard envoyer une partie du NFT nouvellement créé.
* `username` doit être un utilisateur qui détient des clés lui donnant la permission de frapper plus de ce NFT. Autrement dit, il contrôle au moins les clés de `thresold` pour l'un des sets de minter que nous avons spécifiés ci-dessus.
* `password` est le mot de passe valide pour l'`username`

### **Résponses**

* `txID` est l'ID de transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.mintNFT",
    "params" :{
        "assetID":"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "payload":"2EWh72jYQvEJF9NLk",
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
        "txID":"x4fKx95KirTvqWCeiPZfnjB4xFdrTduymRKMouXTioXojdnUm",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"
    }
}
```

Semblable à l'étape précédente, nous pouvons maintenant confirmer qu'un NFT a été frappé \(mint\) en appelant `avm.getUTXOs` et en analysant l'UTXO pour confirmer que nous avons maintenant une sortie de transfert NFT.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avm.getUTXOs",
    "params" :{
        "addresses":["X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"]
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Cela devrait donner :

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "2",
        "utxos": [
            "11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24",
            "11JL98R9yVoCaekrzP2PoCKJfCTin6vhTWU4h9TxqevEUnhiMo2j7F4DHxRpHq6BnFnHGAajhmiXgrdfUbbNd1izmdLVMwqe3UCTJWWLaJ6XUZ46R243T8NdhKXXJWC9GvcjFYMyiKRWvVnvFt7duzq8P8D53uhv1QfdQ9"
        ],
        "endIndex": {
            "address": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv",
            "utxo": "2qs3A1sBhVjFcXqRADJ7AorvoawVgMkNdgJi8eYNPABMKmdBYq"
        }
    },
    "id": 1
}
```

Comme à l'étape précédente, nous pouvons maintenant décoder l'UTXO codé CB58 en hexadécimal, puis le décomposer en ses composants individuels pour confirmer que nous avons le bon UTXO et le bon type.

Tout d'abord, nous convertissons la chaîne de caractères codée Base58Check qui est retournée par `avm.getUTXOs` en hexadécimal. La chaîne de caractères CB58 suivante :

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

est exprimé en hexadécimal comme :

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Nous pouvons maintenant décomposer l'hexadécimal en composants individuels de l'UTXO :

```cpp
NFT Mint Output

CodecID: 00 00
TXID: 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b
Output Index: 00 00 00 01
AssetID: 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57
TypeID: 00 00 00 0b
GroupID: 00 00 00 00
Payload Length: 00 00 00 08
Payload: 41 56 41 20 4c 61 62 73
Locktime: 00 00 00 00 00 00 00 00
Threshold: 00 00 00 01
Address Count: 00 00 00 01
Addresses[0]: 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Notez que le `TypeID` est `00 00 00 0b` qui est l'identifiant de type correct pour une sortie de transfert NFT. Notez également que le `Payload` est inclus.

## Envoyer les NFT

Vous pouvez désormais envoyer le NFT à n'importe qui. Pour ce faire, utilisez la méthode API [`avm.sendNFT`](../../apis/avm-api-x-chain.md#avm-sendnft) d'AvalancheGo.

### **Méthode**

* \`\`[`avm.sendNFT`](../../apis/avm-api-x-chain.md#avm-sendnft)\`\`

### **Paramètres**

* `assetID` est l'ID du NFT que nous envoyons.
* `to` est l'adresse qui recevra le NFT nouvellement créé.
* `groupID` est le groupe NFT à partir duquel envoyer le NFT.
* `username` est l'utilisateur qui contrôle le NFT.
* `password` est le mot de passe valide pour `username`

### **Réponses**

* `txID` est l'ID de transaction.
* `changeAddr` dans le résultat est l'adresse à laquelle tout changement a été envoyé.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.sendNFT",
    "params" :{
        "assetID" :"2X1YV4jpGpqezvj2khQdj1yEiXU1dCwsJ7DmNhQRyZZ7j9oYBp",
        "to"      :"X-avax1ghstjukrtw8935lryqtnh643xe9a94u3tc75c7",
        "groupID" : 0,
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse confirme que votre opération de transfert NFT a réussi :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID": "txtzxcrzPx1sn38HWKU9PB52EpbpXCegbdHNxPNAYd9ZvezJq",
        "changeAddr": "X-avax1a202a8pu5w4vnerwzp84j68yknm6lf47drfsdv"0
    }
}
```

Vous pouvez appeler [`avm.getUTXOs`](../../apis/avm-api-x-chain.md#avm-getutxos) pour l'adresse à laquelle vous avez envoyé le NFT et décomposer l'UTXO renvoyé, après la conversion de CB58 en hexadécimal, pour confirmer qu'il existe un UTXO avec l'ID de type `00 00 00 0b` en hexadécimal ou `11` en décimal.

## Récapitulatif

La technologie blockchain et la tokenomique représentent une nouvelle façon radicale de représenter les actifs numériques. Les jetons non fongibles permettent de tokeniser des actifs rares. Dans ce tutoriel, nous avons :

* Utilisé `createNFTAsset` pour créer une famille et un groupe d'actifs non fongibles.
* Utilisé `mintNFT` pour frapper les unités d'un NFT au groupe.
* Utilisé `getUTXOs` pour récupérer des UTXO pour une adresse. Nous avons ensuite converti l'UTXO encodé CB58 en hexadécimal et l'avons décomposé en ses composants individuels.
* Utilisé `sendNFT` pour transférer des NFT entre adresses.

Dans la deuxième partie de cette série, nous irons plus en profondeur en utilisant AvalancheJS pour créer un protocole pour notre `Payload` NFT et en émettant vers plusieurs groupes.

