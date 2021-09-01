---
description: La C-Chain est une instance de la machine virtuelle Ethereum \(EVM\)
---

# API de la chaîne du contrat \(C-Chain\)

_Note : Ethereum a sa propre notion de `networkID`et .`chainID` Ceux-ci n'ont aucune relation avec la vue d'Avalanche sur le networkID et la chainID et sont purement internes au _[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. Sur Mainnet, la C-Chain utilise `1`et `43114`pour ces valeurs. Sur le Fuji Testnet, il utilise `1`et `43113`pour ces valeurs. `networkID`et peut `chainID`également être obtenu en utilisant les et les `net_version``eth_chainId`méthodes._

## Déployer un contrat intelligent

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## API Ethereum

### Paramètres d'API Ethereum

#### JSON-RPC

Pour interagir avec C-Chain via le paramètre JSON-RPC :

```cpp
/ext/bc/C/rpc
```

Pour interagir avec d'autres instances du MVE via le paramètre JSON-RPC :

```cpp
/ext/bc/blockchainID/rpc
```

où `blockchainID`est l'ID de la blockchain qui exécute l'EVM.

#### WebSocket

Pour interagir avec C-Chain via le paramètre de prise web:

```cpp
/ext/bc/C/ws
```

Par exemple, pour interagir avec les API Ethereum de C-Chain, via la prise websocket sur localhost que vous pouvez utiliser :

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Pour interagir avec d'autres instances de l'EVM via le paramètre de prise web:

```cpp
/ext/bc/blockchainID/ws
```

où `blockchainID`est l'ID de la blockchain qui exécute l'EVM.

### Méthodes

#### API standard Ethereum

Avalanche offre une interface API identique à l'API de Geth, sauf qu'elle ne prend en charge que les services suivants :

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

Vous pouvez interagir avec ces services de la même manière exacte que vous interagissez avec Geth. Consultez la documentation [JSON-RPC de the Wiki,](https://eth.wiki/json-rpc/API) et [la documentation](https://geth.ethereum.org/docs/rpc/server) JSON-RPC de Geth, pour une description complète de cette API

#### eth\_getAssetBalance

En plus des API Ethereum standard, Avalanche propose `eth_getAssetBalance`de récupérer le reste des jetons natifs Avalanche de première classe sur la C-Chain \(à l'exclusion de APIs, qui doit être récupéré avec `eth_getBalance`\).

**Signature**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address`propriétaire de l'actif
* `blk`est le numéro de bloc ou le hachage à lequel récupérer le solde
* `assetID`id de l'actif pour lequel le solde est demandé

**Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getAssetBalance",
    "params": [
        "0x8723e5773847A4Eb5FeEDabD9320802c5c812F46",
        "latest",
        "3RvKBAmQnfYionFXMfW5P8TDZgZiogKbHjM8cjpu16LKAgF5T"
    ],
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

**Exemple**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

## API spécifiques d'Avalanche

### Enders API spécifiques d'Avalanche

Pour interagir avec les appels RPC `avax`spécifiques sur le C-Chain :

```cpp
/ext/bc/C/avax
```

Pour interagir avec d'autres instances des paramètres AVAX EVM :

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

Exporter un actif de la C-Chain vers la X-Chain. [`avm.import`](exchange-chain-x-chain-api.md#avm-import)Après avoir appelé cette méthode, vous devez appeler la X-Chain pour compléter le transfert.

#### Signature

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to`l'adresse X-Chain est envoyée à l'actif.
* `amount`est le montant de l'actif à envoyer.
* `assetID`est l'ID de l'actif. Pour exporter l'utilisation d'AVAX `"AVAX"`comme .`assetID`
* L'actif est envoyé à partir d'adresses contrôlées par `username`et .`password`

#### Exemple

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.export",
    "params" :{
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "assetID": "2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2W5JuFENitZKTpJsy9igBpTcEeBKxBHHGAUkgsSUnkjVVGQ9i8"
    },
    "id": 1
}
```

### avax.exportAVAX

**DEPRECATED—instead la place utilisez **[**avax.export**](contract-chain-c-chain-api.md#avax-export).

Envoyez AVAX de la C-Chain à la X-Chain. [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)Après avoir appelé cette méthode, vous devez appeler la X-Chain pour compléter le transfert.

#### Signature

```go
avax.exportAVAX({
    to: string,
    amount: int,
    destinationChain: string,
    from: []string, //optional
    changeAddr: string, //optional
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande**

* `from`est les adresses C-Chain que the est envoyé. Ils devraient être en format hexa.
* `to`est l'adresse X-Chain que the est envoyé. Il devrait être en format bech32.
* `amount`est la quantité de nAVAX à envoyer.
* `destinationChain`est la chaîne que the est envoyé. Pour exporter des fonds vers la X-Chain, utilisez `"X"`.
* `changeAddr`est l'adresse C-Chain où tout changement est envoyé. Il devrait être en format hexa.
* AVAX est envoyé à partir d'adresses contrôlées par`username`

**Réponse**

* `txID`est le txid de of complété.

#### Exemple

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportAVAX",
    "params" :{
        "from": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"],
        "to":"X-avax1q9c6ltuxpsqz7ul8j0h0d0ha439qt70sr3x2m0",
        "amount": 500,
        "destinationChain": "X",
        "changeAddr": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "2ffcxdkiKXXA4JdyRoS38dd7zoThkapNPeZuGPmmLBbiuBBHDa"
    },
    "id": 1
}
```

### avax.exportKey

Obtenez la clé privée qui contrôle une adresse donnée. La clé privée renvoyée peut être ajoutée à l'utilisateur avec `avax.importKey`.

#### Signature

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Demande**

* `username`doit contrôler .`address`
* `address`est l'adresse pour laquelle vous souhaitez exporter la clé privée correspondante. Il devrait être en format hexa.

**Réponse**

* `privateKey`est la représentation de chaîne de caractères encodée CB58 de la clé privée qui contrôle .`address` Il a un `PrivateKey-`préfixe et peut être utilisé pour importer une clé via .`avax.importKey`
* `privateKeyHex`est la représentation de la chaîne de caractères hex de la clé privée qui contrôle .`address` Il peut être utilisé pour importer un compte dans Metamask.

#### Exemple

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.exportKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "privateKey": "PrivateKey-2o2uPgTSf3aR5nW6yLHjBEAiatAFKEhApvYzsjvAJKRXVWCYkE",
        "privateKeyHex": "0xec381fb8d32168be4cf7f8d4ce9d8ca892d77ba574264f3665ad5edb89710157"
    },
    "id": 1
}}
```

### avax.geTUTXOS

Permet aux UTXOs de référencer une adresse donnée.

#### **Signature**

```cpp
avax.getUTXOs(
    {
        addresses: string,
        limit: int, //optional
        startIndex: { //optional
            address: string,
            utxo: string
        },
        sourceChain: string,
        encoding: string, //optional
    },
) ->
{
    numFetched: int,
    utxos: []string,
    endIndex: {
        address: string,
        utxo: string
    }
}
```

* `utxos`est une liste des UTXO de telle sorte que chaque UTXO fait référence à au moins une adresse en .`addresses`
* Au plus tard, les `limit`UTXOs sont de retour. Si elle `limit`est omise ou supérieure à 1024, elle est fixée à 1024.
* Cette méthode prend en charge la pagination. `endIndex`indique le dernier UTXO retourné. Pour obtenir le prochain jeu of utilisez la valeur de `endIndex`comme `startIndex`dans l'appel suivant.
* Si `startIndex`est omis, va récupérer tous les UTXOs jusqu'à .`limit`
* Lors de l'utilisation de la pagination \(c'est-à-dire lorsque le cas `startIndex`échéant\), les UTXOs ne sont pas garantis pour être unique sur les appels multiples. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, et puis de nouveau dans le second appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur les appels multiples. Autrement dit, l'ensemble d'adresses UTXO peut avoir changé d'appel.
* `encoding`définit le format pour les UTXOs. retournés. Peut être soit "cb58" ou "hex". Par défaut pour "cb58".

#### **Exemple**

Supposons que nous voulons tous les UTXOs cette référence au moins un de `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getUTXOs",
    "params" :{
        "addresses":["C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf"],
        "sourceChain": "X",
        "startIndex": {
            "address": "C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
            "utxo": "22RXW7SWjBrrxu2vzDkd8uza7fuEmNpgbj58CxBob9UbP37HSB"
        },
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

Ceci donne une réponse:

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "numFetched": "3",
        "utxos": [
            "11QEQTor9xZ1TyCyq8aFVShdP7YjM1ug9KuPUuMpgvQVz5qjEzo244NbJomjciNUPqUr1cD455dXhVrVNopnMXTQrTFY5kqrEVAQ3Ng9AnapQrYVEYiWc32F5CQuD3N5sB1EhQmMdJr5pis1QLjMmRQmut7Maafwup1vEU",
            "11Eo6c9iUz3ERtmHbdUb3nzzMaqFffFQStshEsSTiFQP5xqfmeaeCFHCBajmoJUdQRHtkChGAmPucDfuCyBAEyGmmv2w8b7dX5sATxV7HxHZE4eak14GMGVEr7v3ij1B8mE82cymTJJz1X3PpRk2pTaxwEnLWfh1aAiTFC",
            "118mpEHsia5sYYvKUx4j56mA7i1yvmLNyynm7LcmehcJJwMVY65smT4kGQgyc9DULwuaLTrUcsqbQutCdajoJXBdPVqvHMkYBTYQKs7WSmTXH8v7iUVqZfphMnS7VxVjGU1zykeTnbuAoZt4cFMUJzd8JaZk5eC82zmLmT"
        ],
        "endIndex": {
            "address": "C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf",
            "utxo": "27q6nsuvtyT4mvXVnQQAXw1YKoTxCow5Qm91GZ678TU1SvUiC2"
        },
        "encoding": "cb58"
    },
    "id": 1
}
```

### avax.import

Finaliser le transfert d'un non-AVAX ou d'AVAX de la X-Chain vers la C-Chain. Avant que cette méthode ne soit appelée, vous devez appeler la [`avm.export`](exchange-chain-x-chain-api.md#avm-export)méthode de X-Chain pour initier le transfert.

#### Signature

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande**

* `to`l'adresse de l'actif est envoyée. Cela doit être le même que `to`l'argument de l'appel correspondant aux C-Chain's .`export`
* `sourceChain`est l'ID ou les alias de la chaîne sur laquelle l'actif est importé. Pour importer des fonds depuis la X-Chain, utilisez `"X"`.
* `username`l'utilisateur qui contrôle .`to`

**Réponse**

* `txID`est l'ID de of complété.

#### Exemple

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.import",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "6bJq9dbqhiQvoshT3uSUbg9oB24n7Ei6MLnxvrdmao78oHR9t"
    },
    "id": 1
}
```

### avax.importAVAX

**DEPRECATED—instead la place utiliser **[**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finaliser un transfert d'AVAX de la X-Chain vers la C-Chain. Avant que cette méthode ne soit appelée, vous devez appeler la [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)méthode de X-Chain pour initier le transfert.

#### Signature

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande**

* `to`est l'adresse que the est envoyée. Il devrait être en format hexa.
* `sourceChain`est l'ID ou les alias de la chaîne que of est importé. Pour importer des fonds depuis la X-Chain, utilisez `"X"`.
* `username`l'utilisateur qui contrôle .`to`

**Réponse**

* `txID`est l'ID de of complété.

#### Exemple

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importAVAX",
    "params" :{
        "to":"0x4b879aff6b3d24352Ac1985c1F45BA4c3493A398",
        "sourceChain":"X",
        "username":"myUsername",
        "password":"myPassword"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "LWTRsiKnEUJC58y8ezAk6hhzmSMUCtemLvm3LZFw8fxDQpns3"
    },
    "id": 1
}
```

### avax.importKey

Donnez à un utilisateur un contrôle sur une adresse en fournissant la clé privée qui contrôle l'adresse.

#### Signature

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Demande**

* Ajouter `privateKey`à `username`l'ensemble de clés privées.

**Réponse**

* `address`l'adresse est `username`maintenant contrôlée avec la clé privée. Il sera en format hexa.

#### Exemple

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.importKey",
    "params" :{
        "username" :"myUsername",
        "password":"myPassword",
        "privateKey":"PrivateKey-2o2uPgTSf3aR5nW6yLHjBEAiatAFKEhApvYzsjvAJKRXVWCYkE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    },
    "id": 1
}
```

### avax.IssueTx

`encoding`Envoyez une transaction signée au réseau. Peut être soit "cb58" ou "hex". Par défaut pour "cb58".

#### **Signature**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     : 1,
    "method" :"avax.issueTx",
    "params" :{
        "tx":"6sTENqXfk3gahxkJbEPsmX9eJTEFZRSRw83cRJqoHWBiaeAhVbz9QV4i6SLd6Dek4eLsojeR8FbT3arFtsGz9ycpHFaWHLX69edJPEmj2tPApsEqsFd7wDVp7fFxkG6HmySR",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### **Exemple**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txID":"NUPLwbt2hsYxpQg4H2o451hmTWQ4JZx2zMzM4SinwtHgAdX1JLPHXvWSXEnpecStLj"
    }
}
```

### avax.getAtomicTxStatus

Obtenez l'état d'une transaction atomique envoyée au réseau.

#### **Signature**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status`est l'un des

* `Accepted`: La transaction est \(ou sera acceptée\) par tous les nœuds. Vérifier la `blockHeight`propriété
* `Processing`: la transaction est votée par ce nœud
* `Dropped`: la transaction a été abandonné par ce nœud parce qu'elle pensait que la transaction était invalide
* `Unknown`: La transaction n'a pas été vue par ce nœud

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getAtomicTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### **Exemple**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "status":"Accepted",
        "blockHeight": "1"
    }
}
```

