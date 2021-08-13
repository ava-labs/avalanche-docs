# Créer un NFT \(Partie 1\)

## Introduction

Sur l'Avalanche, les produits numériques sont représentés comme des jetons. Certains jetons sont **fungibles**, ce qui signifie qu'un jeton est interchangeable pour n'importe quel autre jeton. La monnaie du monde réel est fungible, par exemple; une note de 5 $ est traitée comme étant la même que n'importe quelle autre note de 5 $.

Avalanche supporte également les jetons non fongibles \(NFTs\). Par définition, chaque NFT est unique et pas parfaitement interchangeable pour n'importe quel autre NFT. Par exemple, il pourrait y avoir une NFT qui représente la propriété d'une pièce d'art du monde réel; chaque pièce d'art, comme chaque NFT, est unique. Les FTN représentent la rareté numérique et peuvent s'avérer avoir plus utilitaire que les jetons fongibles traditionnels.

Dans ce tutoriel, nous allons créer et envoyer des NFT en utilisant l'API AvalancheGo’s Dans un tutoriel futur, nous allons créer une famille NFT personnalisée en utilisant [AvalancheJS](../../tools/avalanchejs/) et explorer les NFT en plus détail.

## Exigences minimales

Vous avez terminé [Run un nœud avalanche](../nodes-and-staking/run-avalanche-node.md) et vous êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/). Dans ce tutoriel, nous utilisons [la collection Avalanche Postman](https://github.com/ava-labs/avalanche-postman-collection) pour nous aider à faire des appels API.

## Créer la famille NFT

Chaque NFT appartient à une **famille**, qui a un nom et un symbole. Chaque famille est composée de **groupes**. Le nombre de groupes dans une famille est spécifié lorsque la famille est créée. Notre NFT existera sur la chaîne X, donc pour créer notre famille NFT nous appellons [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset), qui est une méthode de l'API de la chaîne [X](../../avalanchego-apis/exchange-chain-x-chain-api.md).

La signature de cette méthode est:

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

### **Méthode de la méthode**

* [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**Paramètres**

* `nom` est un nom lisible par l'homme pour notre famille NFT. Pas nécessairement unique. Entre 0 et 128 caractères.
* `symbole` est un symbole shorthand pour cette famille NFT. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omise.
* `minterSets` est une liste où chaque élément spécifie que `le seuil` des adresses dans `les mineurs` peut ensemble minter plus de l'actif en signant une opération de mintage.
* Pour effectuer une transaction sur la chaîne X, il faut une taxe de transaction payée dans AVAX. `nom` d'utilisateur et `mot de passe` dénotent l'utilisateur qui paie les frais.
* `sont` les adresses que vous souhaitez utiliser pour cette opération. Si elle est omise, utilise l'une de vos adresses au besoin.
* `changeAddr` est l'adresse que tout changement sera envoyé à. Si vous êtes omis, changement est envoyé à l'une de vos adresses.

### **Réponse**

* `assetID` est l'ID du nouvel actif que nous aurons créé.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

Plus tard dans cet exemple, nous allons lancer un NFT, donc assurez-vous de remplacer au moins 1 adresse dans le jeu de minter avec une adresse que votre utilisateur contrôle.

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

La réponse devrait ressembler à ceci:

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

Quelques choses à noter : premièrement, en plus de créer une famille NFT, AvalancheGo’s [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset) crée également un groupe pour chacun des `minterSets`, qui sont passés dans. Par exemple, si les `minterSets` ont 3 éléments, la famille NFT a 3 groupes. Deuxièmement, prenez note de `l'identifiant qui` est retourné dans la réponse. Ceci est `l'identifiant` de la nouvelle famille NFT, et vous aurez besoin de celle-ci plus tard pour émettre des NFT.

Vous pouvez vous demander pourquoi nous spécifions _des ensembles_ d'adresses qui peuvent minter plus d'unités de l'actif plutôt qu'une seule adresse. Voici pourquoi:

* **Sécurité:** si une seule adresse peut minter plus de l'actif, et la clé privée pour cette adresse est perdue, aucun autre unité ne peut jamais être minted. De même, si une seule adresse peut minter plus de l'actif, rien ne empêche le titulaire de cette adresse de tirer unilatéralement autant qu'ils le veulent.
* **Flexibilité:** il est agréable de pouvoir encoder la logique comme: « Alice peut unilatéralement mint plus d'unités de cet actif, ou 2 de Dinesh, Ellin et Jamie peuvent ensemble mint plus. »

## Obtenez UTXOs pour NFT

Les sorties NFT ne se présentent pas dans les appels à [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance) ou [`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances). Pour voir vos NFT, vous devez appeler [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) puis parsemer the pour vérifier la configuration ID. Les sorties de la menthe NFT ont un type id de `00 00 00 0a` dans of \(`10` dans la décimal\) et les sorties de transfert NFT ont un type id de `00 00 00 0b` dans have \(`11` dans la décimal\).

### **Méthode de la méthode**

* [`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Paramètres**

* `les adresses` sont les adresses pour récupérer les UTXOs pour.

**Réponse:**

* `numFetched` est le nombre total of dans la réponse.
* `utxos` est un tableau de chaînes encodées CB58.
* `endIndex` Cette méthode prend en charge la pagination. endIndex indique le dernier UTXO `retourné.`

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

La réponse contient une liste des UTXOs:

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

[`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) retourne 2 UTXOS. Prenons la première et décodons pour confirmer qu'il s'agit d'une [sortie de la Monnaie NFT.](../../references/avm-transaction-serialization.md#nft-mint-output) Premièrement, nous convertir la chaîne encodée Base58Check qui est retourné de [`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) dans l'hex. Chaîne [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) suivante:

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

est exprimé en hexadécimal comme:

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Maintenant, nous pouvons décomposer le hex dans les composants individuels de the en se référant au [format de sérialisation de la transaction](../../references/avm-transaction-serialization.md):

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

Notez que le `TypeID` est `00 00 00 0a` qui est l'ID de type correct pour une sortie de la Monnaie NFT. Notez également que le `GroupID` est `00 00 00 00`. Ce `GroupID` a été créé en fonction du nombre de `MinterSets` que j'ai passé à `avm.createNFTAsset`.

## Mint l'actif

Maintenant que nous avons une famille NFT et un groupe pour le seul `MinterSet`, nous sommes en mesure de créer des NFT appartenant à ce groupe. Pour ce faire, nous appelons [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft):

### **Méthode de la méthode**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Paramètres**

* `assetID` est l'ID de la famille NFT.
* `charge utile` est une charge utile encodée arbitraire CB58 de jusqu'à 1024 octets. Dans la partie 2 **\(VENANT SOON\)** nous allons explorer la création d'un protocole autour de la charge utile NFT. Pour ce tutoriel, la charge utile est la chaîne "AVA Labs".
* `à` est l'adresse qui recevra le NFT nouvellement frappé. Remplacez-le par une adresse vos commandes utilisateur de sorte que plus tard vous `serez` en mesure d'envoyer certains des NFT nouvellement frappés.
* `nom` d'utilisateur doit être un utilisateur qui détient les clés lui donnant la permission de minter plus de ce NFT. Autrement dit, il contrôle au moins les clés _de seuil_ pour l'un des ensembles de minter que nous avons spécifiés ci-dessus.
* `mot` de passe est le mot de passe valide pour `le nom` d'utilisateur

### **Réponse**

* `txID` est l'ID de la transaction.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

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

Semblable à l'étape précédente, nous pouvons maintenant confirmer qu'un NFT a été triplé en appelant [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) et en analysant avm.getUTXOs pour confirmer que nous avons maintenant une [sortie de transfert NFT](../../references/avm-transaction-serialization.md#nft-transfer-output).

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

Cela devrait donner:

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

Comme dans l'étape précédente, nous pouvons maintenant décoder the encodé CB58 en hexidecimal puis le décomposer à ses composants individuels pour confirmer que nous avons le bon UTXO et le type.

Premièrement, nous convertir la chaîne encodée Base58Check qui est retourné de [`avm.getUTXOS`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) dans l'hex. Chaîne CB58 suivante:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

est exprimé en hexadécimal comme:

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Maintenant, nous pouvons décomposer le hex dans les composants individuels de the :

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

Notez que le `TypeID` est `00 00 00 0b` qui est le type id correct pour une [sortie de transfert NFT](../../references/avm-transaction-serialization.md#nft-transfer-output). Aussi, noter que la charge utile est incluse.

## Envoyer la NFT

Maintenant, vous pouvez envoyer le NFT à n'importe qui. Pour ce faire, utilisez la méthode [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft) API AvalancheGo’s

**Méthode de la méthode**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Paramètres**

* `assetID` est l'ID de la NFT que nous envoyons.
* `à` est l'adresse qui recevra le NFT nouvellement frappé.
* `groupID` est le groupe NFT à partir duquel envoyer le NFT.
* `nom` d'utilisateur est l'utilisateur qui contrôle le NFT.
* `mot` de passe est le mot de passe valide pour `le nom` d'utilisateur

**Réponse**

* `txID` est l'ID de la transaction.
* `changeAddr` dans le résultat est l'adresse où tout changement a été envoyé.

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

La réponse confirme que notre opération de transfert NFT a été fructueuse :

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

Vous pouvez appeler [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos) pour l'adresse que vous avez envoyé le NFT et décomposer the retourné, après la conversion de CB58 en hex, pour confirmer qu'il y a un UTXO avec type id `00 00 00 0b` dans hex ou `11` en décimal.

## Wrapping

La technologie Blockchain et la symbolique représentent une nouvelle façon radicale de représenter les actifs numériques. Les jetons non fongibles permettent l'utilisation d'actifs rares à être tokenized. Dans ce tutoriel, nous:

* Utilisé `createNFTAsset` pour créer une famille et un groupe d'actifs non fongibles.
* Utilisé `mintNFT` pour les unités de menthe d'un NFT au groupe.
* `getUTXOs` utilisé pour récupérer getUTXOs pour une adresse. Nous avons ensuite converti the encodé CB58 en l'hex et la décomposition en ses composants individuels.
* Utilisé `sendNFT` pour transférer les NFT entre les adresses.

Dans la partie 2 de cette série, nous allons aller plus en profondeur en utilisant AvalancheJS pour créer un protocole pour notre charge utile NFT en we’ll à plusieurs groupes.

