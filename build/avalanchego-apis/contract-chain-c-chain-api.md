---
description: La chaîne C est une instance de la machine virtuelle Ethereum (EVM)

---

# API de chaîne contractuelle \(C-Chain\)

_Note: Ethereum a sa propre notion de `networkID` et `chainID`. Ceux-ci n'ont aucune relation avec la vue d'Avalanche sur networkID et chainID et sont purement internes à la_ [_chaîne C_](../../learn/platform-overview/#contract-chain-c-chain)_. Sur Mainnet, la chaîne C utilise `1` et `43114` pour ces valeurs. Sur le Fuji Testnet, il utilise `1` et `43113` pour ces valeurs. `networkID` et `chainID` peuvent également être obtenus à l'aide des méthodes `net_version` et `eth_chainId`._

## Déploiement d'un contrat intelligent

{% page-ref page-ref %}

## API Ethereum

### Ethereum API Endpoints

#### JSON-RPC Endpoints

Interagir avec la chaîne C via le paramètre JSON-RPC :

```cpp
/ext/bc/C/rpc
```

Interagir avec d'autres instances de la MVE via le paramètre JSON-RPC :

```cpp
/ext/bc/blockchainID/rpc
```

où `blockchainID` est l'ID de la blockchain exécutant l'EVM.

#### Paramètres Websocket

Interagir avec la chaîne C via le paramètre de prise web:

```cpp
/ext/bc/C/ws
```

Par exemple, pour interagir avec les API Ethereum de la chaîne C-Chain's via websocket sur localhost vous pouvez utiliser :

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Interagir avec d'autres instances de l'EVM via le paramètre de prise web:

```cpp
/ext/bc/blockchainID/ws
```

où `blockchainID` est l'ID de la blockchain exécutant l'EVM.

### Méthodes

#### API Ethereum standard

Avalanche offre une interface API identique à l'API de Geth, sauf qu'elle supporte uniquement les services suivants:

* `web3:00`
* `nettement?`
* `ethnie`
* `personnel:`
* `txpool_`
* `debug_`

Vous pouvez interagir avec ces services de la même manière exacte que vous interagir avec Geth. Consultez [la](https://eth.wiki/json-rpc/API) documentation JSON-RPC de the Wiki’s [la documentation](https://geth.ethereum.org/docs/rpc/server) JSON-RPC de Geth’s une description complète de cette API .

#### eth\_getAssetBalance

En plus des API Ethereum standard, Avalanche offre `eth_getAssetBalance` pour récupérer le solde des Tokens autochtones avalanche de première classe sur la chaîne C \(à l'exclusion AVAX, qui doit être récupéré avec `eth_getBalance`\).

**Signature**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `adresse` propriétaire de l'actif
* `blk` est le numéro de bloc ou hachage à lequel récupérer l'équilibre
* `assetID` id de l'actif pour lequel le solde est demandé

**Exemple d'appel**

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

**Exemple de réponse**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

## APIS spécifiques d'avalanche

### Endpoints API spécifiques d'avalanche

Pour interagir avec les appels RPC spécifiques `avax` sur la chaîne C:

```cpp
/ext/bc/C/avax
```

Pour interagir avec d'autres instances des paramètres EVM AVAX:

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

Exporter un actif de la chaîne C vers la chaîne X. Après avoir appelé cette méthode, vous devez appeler [`avm.import`](exchange-chain-x-chain-api.md#avm-import) sur la chaîne X-Chain de compléter le transfert.

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

* `à` est l'adresse X-Chain l'actif est envoyé à.
* `le` montant est le montant de l'actif à envoyer.
* `assetID` est l'ID de l'actif. Pour exporter `AVAX,` utilisez `"AVAX"` comme use
* L'actif est envoyé à partir d'adresses contrôlées par `nom` d'utilisateur et `mot de passe`.

#### Exemple d'appel

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

#### Exemple de réponse

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

**DEPRECATED—instead la place utiliser** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

Envoyez AVAX de la chaîne C à la chaîne X. Après avoir appelé cette méthode, vous devez appeler [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) sur la chaîne Xpour terminer le transfert.

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

**Demande de renseignements**

* `depuis` les adresses C-Chain que is est envoyé de. Ils devraient être en format hex.
* `à` est l'adresse X-Chain que is envoyé. Il devrait être en format bech32.
* `le` montant est le montant de nAVAX à envoyer.
* `destinationChain` est la chaîne que is envoyé. Pour exporter des fonds vers la chaîne X, utilisez `"X"`.
* `changeAddr` est l'adresse C-Chain où tout changement est envoyé. Il devrait être en format hex.
* The est envoyé à partir d'adresses contrôlées par `le nom` d'utilisateur

**Réponse**

* `txID` est le txid de of achevé.

#### Exemple d'appel

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

#### Exemple de réponse

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

Obtenez la clé privée qui contrôle une adresse donnée. La clé privée retournée peut être ajoutée à un utilisateur avec `avax.importKey`.

#### Signature

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Demande de renseignements**

* `nom` d'utilisateur doit contrôler `l'adresse`.
* `l'adresse` est l'adresse pour laquelle vous souhaitez exporter la clé privée correspondante. Il devrait être en format hex.

**Réponse**

* `privateKey` est la représentation chaîne encodée CB58 de la clé privée qui contrôle `l'adresse`. Il a un préfixe `PrivateKey-` et peut être utilisé pour importer une clé via `avax.importKey`.
* `privateKeyHex` est la représentation chaîne hex de la clé privée qui contrôle `l'adresse`. Il peut être utilisé pour importer un compte dans Metamask.

#### Exemple d'appel

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

#### Exemple de réponse

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

### avax.getUTXOS

Obtient les UTXOs qui font référence à une adresse donnée.

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

* `utxos` est une liste des UTXO de telle que chaque UTXO renvoie au moins une adresse dans `les adresses`.
* Au maximum `les` UTXOs sont retournés. Si la `limite` est omise ou supérieure à 1024, elle est fixée à 1024.
* Cette méthode supporte la pagination. `endIndex` indique la dernière UTXO retournée. Pour obtenir l'ensemble suivant of utilisez la valeur de `endIndex` comme `startIndex` dans l'appel suivant.
* Si `startIndex` est omitted, va chercher tous les UTXOs jusqu'à `limiter`.
* Lorsque vous utilisez la pagination \(c'est-à-dire lorsque `startIndex` est fourni\), les UTXOs ne sont pas garantis d'être unique sur plusieurs appels. Autrement dit, un UTXO peut apparaître dans le résultat du premier appel, puis dans le second appel.
* Lorsque vous utilisez la pagination, la cohérence n'est pas garantie sur plusieurs appels. Autrement dit, l'ensemble UTXO des adresses peut avoir changé entre les appels.
* `encodage` définit le format des UTXOs. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

#### **Exemple**

Supposons que nous voulons tous les UTXOs cette référence au moins une de `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

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

Ceci donne la réponse:

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

Finaliser le transfert d'un non-AVAX ou AVAX de la chaîne Xà la chaîne C. Avant que cette méthode soit appelée, vous devez appeler la méthode [`avm.export`](exchange-chain-x-chain-api.md#avm-export) de la X-Chain's pour initier le transfert.

#### Signature

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande de renseignements**

* `à` est l'adresse de l'actif est envoyé. Cela doit être le même que celui `de` l'argument dans l'appel correspondant à `l'exportation` de la chaîne C.
* `sourceChain` est l'ID ou les alias de la chaîne dont l'actif est importé. Pour importer des fonds depuis la chaîne X, utilisez `"X"`.
* `nom` d'utilisateur est l'utilisateur qui contrôle `à`.

**Réponse**

* `txID` est l'ID de of rempli.

#### Exemple d'appel

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

#### Exemple de réponse

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

**DEPRECATED—instead la place utiliser** [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finaliser un transfert of de la chaîne Xà la chaîne C. Avant que cette méthode soit appelée, vous devez appeler la méthode [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) de la X-Chain's pour initier le transfert.

#### Signature

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande de renseignements**

* `à` est l'adresse que the envoyé. Il devrait être en format hex.
* `sourceChain` est l'ID ou les alias de la chaîne dont of est importé. Pour importer des fonds depuis la chaîne X, utilisez `"X"`.
* `nom` d'utilisateur est l'utilisateur qui contrôle `à`.

**Réponse**

* `txID` est l'ID de of rempli.

#### Exemple d'appel

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

#### Exemple de réponse

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

Donnez un contrôle utilisateur sur une adresse en fournissant la clé privée qui contrôle l'adresse.

#### Signature

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Demande de renseignements**

* Ajoutez `la clé privée` à l'ensemble de clés privées du `nom` d'utilisateur.

**Réponse**

* `l'adresse` est `l'adresse nom` d'utilisateur maintenant les contrôles avec la clé privée. Il sera au format hexadécimal.

#### Exemple d'appel

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

#### Exemple de réponse

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    },
    "id": 1
}
```

### avax.issueTx

Envoyez une transaction signée au réseau. `l'encodage` spécifie le format de la transaction signée. Peut être soit "cb58" ou "hex". Par défaut vers "cb58".

#### **Signature**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez le statut d'une transaction atomique envoyée au réseau.

#### **Signature**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`statut` est l'un des :

* `Accepté `: La transaction est \(ou sera\) acceptée par chaque nœud. Vérifier la propriété `blockHeight`
* `Traitement`: la transaction est votée par ce noeud
* `Perdue`: la transaction a été abandonnée par ce noeud parce qu'elle pensait que la transaction était invalide
* `Inconnu`: la transaction n'a pas été vue par ce noeud

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

