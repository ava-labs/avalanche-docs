# Créer une NFT \(Partie 1\)

## Introduction

Sur Avalanche, les marchandises numériques sont représentées en jetons. Certains jetons sont ****fungibles, ce qui signifie qu'un jeton est interchangeable pour tout autre jeton. La monnaie du monde réel est fungible, par exemple; une note de 5 $ est traitée comme étant la même que toute autre note de 5 $.

Avalanche prend également en charge les jetons non fongibles \(NFT\). Par définition, chaque NFT est unique et ne peut pas être parfaitement interchangeable pour tout autre NFT. Par exemple, il pourrait y avoir un NFT qui représente la propriété d'une pièce d'art du monde réel; chaque pièce d'art, comme chaque NFT, est unique. Les NFT représentent une rareté numérique et peuvent s'avérer plus utilitaires que les jetons fongibles traditionnels.

Dans ce tutoriel, nous créerons et enverrons des NFT en utilisant l'API and Dans un futur tutoriel, nous créerons une famille NFT personnalisée en utilisant [AvalancheJS](../../tools/avalanchejs/) et explorerons les NFT en plus détail.

## Exigences

Vous avez terminé [Exécuter un nœud Avalanche](../nodes-and-staking/run-avalanche-node.md) et êtes familier avec [l'architecture d'Avalanche](../../../learn/platform-overview/). Dans ce tutoriel, nous utilisons [la collection Postman d'Avalanche](https://github.com/ava-labs/avalanche-postman-collection) pour nous aider à faire des appels d'API.

## Créer la famille NFT

Chaque NFT appartient à une ****famille, qui a un nom et un symbole. Chaque famille est composée de ****groupes. Le nombre de groupes dans une famille est spécifié lorsque la famille est créée. [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)Notre NFT existera sur la [X-Chain,](../../avalanchego-apis/exchange-chain-x-chain-api.md) donc pour créer notre famille NFT que nous appellerons , qui est une méthode de l'API de X-Chain,

La signature pour cette méthode est :

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

* [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)

**Paramètres**

* `name`est un nom lisible par l'homme pour notre famille NFT. Pas nécessairement unique. Entre 0 et 128 caractères.
* `symbol`est un symbole de shorthand pour cette famille NFT. Entre 0 et 4 caractères. Pas nécessairement unique. Peut être omis.
* `minterSets`est une liste où chaque élément spécifie celle des adresses dans `minters`peut ensemble taper plus de `threshold`l'actif en signant une opération de minting
* `username``password`Pour effectuer une transaction sur la X-Chain, une taxe de transaction est payée sur AVAX.
* `from`sont les adresses que vous souhaitez utiliser pour cette opération. Si omis, utilise l'une de vos adresses au besoin.
* `changeAddr`est l'adresse que tout changement sera envoyé. Si omis, le changement est envoyé à l'une de vos adresses.

### **Réponse**

* `assetID`est l'ID du nouvel actif que nous aurons créé.
* `changeAddr`dans le résultat est l'adresse où tout changement a été envoyé.

Plus tard dans cet exemple, nous allons frapper un NFT, donc assurez-vous de remplacer au moins une adresse dans le minter par une adresse que votre utilisateur contrôle.

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

La réponse devrait ressembler à ce qui suit :

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

Un couple de choses à noter : d'abord, en plus de créer une famille NFT, AvalancheGo’s crée [`avm.createNFTAsset`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createnftasset)également un groupe pour chacun des , `minterSets`qui sont transmis. Par exemple, si 3 éléments sont `minterSets`disponibles, la famille NFT a 3 groupes. Deuxièmement, prenez note de ce `assetID`qui est retourné dans la réponse. `assetID`Ceci est la nouvelle famille NFT et vous en aurez besoin plus tard pour émettre des NFT.

Vous vous demandez peut-être pourquoi nous spécifions des _ensembles d'adresses qui peuvent taper plus d'unités de l'actif que _d'une seule adresse. Voici pourquoi:

* **Sécurité : **si une seule adresse peut n'être plus d'actifs et que la clé privée pour cette adresse est perdue, ni plus d'unités ne peuvent jamais être n'être n'importe où. De même, si une seule adresse peut n'importe quelle autre adresse peut n'importe quel autre élément de l'actif, rien ne empêche le titulaire de cette adresse de n'importe quel point de frappe unilatéralement ce qu'ils veulent.
* ****Flexibilité : il est agréable de pouvoir encoder une logique comme, « Alice peut unilatéralement frapper plus d'unités de cet actif, ou 2 de Dinesh, Ellin et Jamie peuvent en coder plus ».

## Obtenez des UTXOs pour NFT

Les sorties NFT ne se présentent pas dans les appels vers [`avm.getBalance`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getbalance)ou .[`avm.getAllBalances`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getallbalances) Pour voir vos NFT, vous devez appeler [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)et ensuite parer NFTs, pour vérifier la type d'ID `00 00 00 0b`Les sorties de la mint NFT ont un type d'identifiant en hexidecimal \( `10`en décimal\) et les sorties de transfert NFT ont un type d'identifiant `00 00 00 0a`en hexdecimal \( `11`en décimal\).

### **Méthode**

* [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)

### **Paramètres**

* `addresses`sont les adresses pour chercher les UTX.

**Réponse :**

* `numFetched`est le nombre total of dans la réponse.
* `utxos`est un tableau de chaînes codées CB58.
* `endIndex`Cette méthode prend en charge la pagination. `endIndex`indique le dernier UTXO retourné.

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

La réponse contient une liste of :

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)retourne 2 UTX. Prenons le premier et le décodons pour confirmer qu'il s'agit d'une [sortie de la menthe NFT.](../../references/avm-transaction-serialization.md#nft-mint-output) Premièrement, nous convertions la chaîne encodée Base58Check qui est renvoyée de [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)in à hex. La chaîne [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) suivante:

```cpp
116VhGCxiSL4GrMPKHkk9Z92WCn2i4qk8qdN3gQkFz6FMEbHo82Lgg8nkMCPJcZgpVXZLQU6MfYuqRWfzHrojmcjKWbfwqzZoZZmvSjdD3KJFsW3PDs5oL3XpCHq4vkfFy3q1wxVY8qRc6VrTZaExfHKSQXX1KnC
```

est exprimé en hexadécimal comme :

```cpp
00 00 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0a 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Maintenant, nous pouvons décomposer le hex dans les composants individuels de the en se référant au [format de sérialisation](../../references/avm-transaction-serialization.md) des transactions:

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

Notez que `TypeID`l'est `00 00 00 0a`qui est l'ID de type correct pour une sortie de la mint NFT. Notez également que la `GroupID`est .`00 00 00 00` Ceci a `GroupID`été créé sur la base du nombre de `MinterSets`laquelle je suis passé à .`avm.createNFTAsset`

## Frapper l'actif

Maintenant que nous avons une famille NFT et un groupe pour le single que nous `MinterSet`sommes en mesure de créer des NFT appartenant à ce groupe. Pour ce faire, nous appelons [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft):

### **Méthode**

* [`avm.mintNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-mintnft)

### **Paramètres**

* `assetID`est l'ID de la famille NFT.
* `payload`est une charge utile encodée arbitraire CB58 de jusqu'à 1024 octets. Dans la partie 2 **\(COMING **SOON\) nous explorerons la création d'un protocole autour de la charge utile NFT. Pour ce tutoriel, la charge utile est la chaîne "AVA Labs".
* `to`est l'adresse qui recevra le NFT nouvellement frappé. Remplacez `to`par une adresse vos commandes d'utilisateur afin que vous puissiez envoyer plus tard une partie de la NFT nouvellement frappée.
* `username`doit être un utilisateur qui détient des clés lui donnant la permission de n'importe quelle autre partie de ce NFT. C'est-à-dire qu'il contrôle au moins les _clés de _seuil pour l'une des jeux de minter que nous avons spécifiés ci-dessus.
* `password`est le mot de passe valide`username`

### **Réponse**

* `txID`est l'ID de transaction.
* `changeAddr`dans le résultat est l'adresse où tout changement a été envoyé.

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

Comme à l'étape précédente, nous pouvons maintenant confirmer qu'un NFT a été frappée en appelant [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)et en parsant that pour confirmer que nous avons maintenant une sortie de [transfert NFT.](../../references/avm-transaction-serialization.md#nft-transfer-output)

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

Cela devrait donner :

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

Comme lors de l'étape précédente, nous pouvons maintenant décoder step, codé en CB58 et puis le décomposer avec ses composants individuels pour confirmer que nous avons le bon UTXO et le type.

Premièrement, nous convertions la chaîne encodée Base58Check qui est renvoyée de [`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)in à hex. La chaîne CB58 suivante:

```cpp
11Do4RK6FchGXeoycKujR7atm3tvBz3qc64uoipCc5J74Sj1U4orM6vbBGSES8hnjgjZava9oPgmnbHxh2mBKjeXdvAqTRtYMHEacrveSzKgk7F8h8xi8JB9CddoiX8nbjZMYt1keGo5Rvpjh8dGymDWwRbV1FdnG5uDiiyU8uidc3P24
```

est exprimé en hexadécimal comme :

```cpp
00 00 7d 07 0d 1e fe a6 4e 45 09 05 c6 11 ee b1 cf 61 9f 21 22 eb 17 db aa ea 9a fe 2d ff 17 be 27 6b 00 00 00 01 04 78 f2 39 8d d2 16 3c 34 13 2c e7 af a3 1f 0a c5 03 01 7f 86 3b f4 db 87 ea 55 53 c5 2d 7b 57 00 00 00 0b 00 00 00 00 00 00 00 08 41 56 41 20 4c 61 62 73 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 01 3c b7 d3 84 2e 8c ee 6a 0e bd 09 f1 fe 88 4f 68 61 e1 b2 9c
```

Maintenant, nous pouvons décomposer le hex en les composants individuels de the :

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

`TypeID`Notez que l'est `00 00 00 0b`qui est l'id de type approprié pour une sortie de [transfert NFT.](../../references/avm-transaction-serialization.md#nft-transfer-output) De plus, notez que la charge utile est inclus.

## Envoyer la NFT

Maintenant, vous pouvez envoyer la NFT à n'importe qui. Pour ce faire, utilisez la méthode [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)API AvalancheGo’s

**Méthode**

* [`avm.sendNFT`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-sendnft)

**Paramètres**

* `assetID`est l'ID de la NFT que nous envoyons.
* `to`est l'adresse qui recevra le NFT nouvellement frappé.
* `groupID`est le groupe NFT d'envoyer le NFT.
* `username`est l'utilisateur qui contrôle le NFT.
* `password`est le mot de passe valide`username`

**Réponse**

* `txID`est l'ID de transaction.
* `changeAddr`dans le résultat est l'adresse où tout changement a été envoyé.

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

La réponse confirme que notre opération de transfert NFT a été couronnée de succès :

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

[`avm.getUTXOs`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-getutxos)Vous pouvez demander l'adresse à laquelle vous avez envoyé le NFT et décomposer le UTXO retourné après la conversion de CB58 en hex, pour confirmer qu'il y a un UTXO avec un type id `00 00 00 0b`en hex ou en `11`décimal.

## Wrapping

La technologie et les jetons-les représentent une nouvelle façon radicale de représenter les actifs numériques. Les jetons non fongibles permettent de tokenized. les actifs rares. Dans ce tutoriel, nous :

* Utilisé `createNFTAsset`pour créer une famille et un groupe d'actifs non fongibles.
* Utilisé `mintNFT`pour frapper les unités d'un NFT vers le groupe.
* Utilisé `getUTXOs`pour récupérer des UTXOs pour une adresse. Nous avons ensuite converti the codé CB58 en l'hexagone et la décomposition en ses composants individuels.
* Utilisé `sendNFT`pour transférer des NFT entre les adresses.

Dans la partie 2 de cette série, nous allons aller plus en profondeur en utilisant AvalancheJS pour créer un protocole pour notre charge utile NFT en we’ll à plusieurs groupes.

