---
description: La C-Chain est une instance de la machine virtuelle Ethereum \(EVM\)
---

# API de la chaîne de contrat \(C-Chain\)

_Remarque : Ethereum a sa propre notion de  `networkID`et `chainID`. Ces éléments n'ont aucun rapport avec la vision d'Avalanche concernant le networkID et le chainID et sont purement internes à la_ [_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. Sur Mainnet, la C-Chain utilise `1` et `43114` pour ces valeurs. Sur le Fuji Testnet, il utilise  `1`et  `43113`pour ces valeurs.  `networkID`et  `chainID`peuvent aussi être obtenus à l'aide des `eth_chainId`méthodes   `net_version`et ._

## Déployer un contrat intelligent

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## API Ethereum

### Points de terminaison de l'API Ethereum

#### Points de terminaison JSON-RPC

Pour interagir avec la C-Chain via le point de terminaison JSON-RPC :

```cpp
/ext/bc/C/rpc
```

Pour interagir avec d'autres instances de l'EVM via le point de terminaison JSON-RPC :

```cpp
/ext/bc/blockchainID/rpc
```

`blockchainID`où est l'ID de la blockchain qui exécute l'EVM.

#### Points de terminaison WebSocket

Pour interagir avec la C-Chain via le point de terminaison de la websocket :

```cpp
/ext/bc/C/ws
```

Par exemple, pour interagir avec les API Ethereum de la C-Chain via le websocket sur localhost, vous pouvez utiliser :

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Remarque : sur localhost, utilisez `ws://`. Lorsque vous utilisez [l'API publique](../tools/public-api.md) ou un autre hôte qui prend en charge le chiffrement, utilisez `wss://`.

Pour interagir avec d'autres instances de l'EVM via le point de terminaison de la websocket :

```cpp
/ext/bc/blockchainID/ws
```

`blockchainID`où est l'ID de la blockchain qui exécute l'EVM.

### Méthodes

#### API Ethereum standard

Avalanche propose une interface API identique à l'API de Geth, sauf qu'elle prend en charge uniquement les services suivants :

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

Vous pouvez interagir avec ces services de la même manière que vous le feriez avec Geth. Pour une description détaillée de cette API, consultez la [documentation JSON-RPC d'Ethereum Wiki](https://eth.wiki/json-rpc/API) et la [documentation JSON-RPC de Geth](https://geth.ethereum.org/docs/rpc/server)

#### eth\_getAssetBalance

En plus des API standard d'Ethereum, Avalanche offre `eth_getAssetBalance` pour récupérer le solde des jetons natifs d'Avalanche de première classe sur la C-Chain \(à l'exception d'AVAX, qui doit être récupérée avec `eth_getBalance`\).

**Signature**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address`propriétaire de l'actif
* `blk` est le numéro de bloc ou le hachage auquel il faut récupérer le solde
* `assetID`id de l'actif pour lequel le solde est demandé

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

### eth\_baseFee

Obtenez les frais de base pour le bloc suivant.

#### **Signature**

```cpp
eth_baseFee() -> {}
```

`result`est la valeur hexadécimale des frais de base pour le bloc suivant.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth\_maxPriorityFeePerGas

Obtenez les frais de priorité nécessaires pour être inclus dans un bloc.

#### **Signature**

```cpp
eth_maxPriorityFeePerGas() -> {}
```

`result`est la valeur hexadécimale des frais de priorité nécessaires pour être inclus dans un bloc.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

Pour plus d'informations sur les frais dynamiques, consultez la [section C-Chain de la documentation des frais de transaction](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees).

## API spécifiques Avalanche

### Points de terminaison

Pour interagir avec les appels RPC spécifiques `avax` sur la C-Chain :

```cpp
/ext/bc/C/avax
```

Pour interagir avec d'autres instances des points de terminaison EVM AVAX :

```cpp
/ext/bc/blockchainID/avax
```

### avax.getAtomicTx

Obtient une transaction par son ID. Paramètre d'encodage facultatif pour spécifier le format de la transaction retournée. Peut être soit  `cb58`soit `hex`. Par défaut à `cb58`.

#### Signature

```go
avax.getAtomicTx({
    txID: string,
    encoding: string, //optional
}) -> {
    tx: string,
    encoding: string,
    blockHeight: string
}
```

**Demande**

* `txID` est l'ID de transaction. Il doit être au format cb58.
* `encoding` est le format d'encodage à utiliser. Peut être soit  `cb58`soit `hex`. Par défaut à `cb58`.

**Réponse**

* `tx` est la transaction encodée à `encoding`.
* `encoding` est le `encoding`.
* `blockHeight` est la hauteur du bloc dans lequel la transaction a été incluse.

#### Exemple d'appel

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.getAtomicTx",
    "params" :{
        "txID":"2GD5SRYJQr2kw5jE73trBFiAgVQyrCaeg223TaTyJFYXf2kPty",
        "encoding": "cb58"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

#### Exemple de réponse

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "tx": "111111115k3oJsP1JGxvsZPFh1WXzSYNVDtvgvZ4qDWtAs5ccogA1RtT3Me5x8xgkj7cyxaNGEHuMv5U34qo94fnvHweLeSRf31ggt3MoD7MHSDw6LbiXeaJa3uwBDHzd6tPxw17478X13Ff7DkHtbWYYx2WTcJYk4nVP2swCHjBE3uQjmu6RdhtgZCxvnD6YVpEsXqvam6cDzpf5BLaosYCSt5p8SmLU2ppaSb6DPA4EW4679ygUxiDNP3SFagjUvzSrfBJRFCzsan4ZJqH8haYqpJL42TUN4q3eFKvscZfp2v2WWEEwJYmJP4Nc1P7wndeMxPFEm3vjkBaVUZ5k25TpYtghq6Kx897dVNaMSsTAoudwqTR1cCUGiR3bLfi82MgnvuApsYqtRfaD9deSHc8UA1ohPehkj9eaY",
        "encoding": "cb58",
        "blockHeight": "1"
    },
    "id": 1
}
```

### avax.export

Exportez un actif de la C-Chain vers la X-Chain. Après avoir appelé cette méthode, vous devez appeler [`avm.import`](exchange-chain-x-chain-api.md#avm-import) sur la X-Chain pour terminer le transfert.

#### Signature

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    baseFee: int,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to` est l'adresse de la X-Chain à laquelle l'actif est envoyé.
* `amount` est le montant de l'actif à envoyer.
* `assetID` est l'ID de l'actif. Pour exporter AVAX, utilisez `"AVAX"` comme le `assetID`.
* `baseFee`est les frais de base qui doivent être utilisés lors de la création de la transaction. En cas d'omission, des frais suggérés seront utilisés.
* `username` est l'utilisateur qui contrôle l'adresse à partir de laquelle la transaction sera envoyée.
* `password` est le mot de passe de `username`.

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

**DÉCONSEILLÉ—à la place, utilisez** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

Envoyez AVAX de la C-Chain à la X-Chain. Après avoir appelé cette méthode, vous devez appeler  [`avm.import`](exchange-chain-x-chain-api.md#avm-import)avec l'assetID  `AVAX`sur la X-Chain pour terminer le transfert.

#### Signature

```go
avax.export({
    to: string,
    amount: int,
    baseFee: int,
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande**

* `to` est l'adresse de la X-Chain à laquelle l'actif est envoyé.
* `amount` est le montant de l'actif à envoyer.
* `baseFee`est les frais de base qui doivent être utilisés lors de la création de la transaction. En cas d'omission, des frais suggérés seront utilisés.
* `username` est l'utilisateur qui contrôle l'adresse à partir de laquelle la transaction sera envoyée.
* `password` est le mot de passe de `username`.

**Réponse**

* `txID` est le txid de l'ExportTx terminé.

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

Obtenez la clé privée qui contrôle une adresse donnée. La clé privée renvoyée peut être ajoutée à un utilisateur avec `avax.importKey`.

#### Signature

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Demande**

* `username` doit contrôler `address`.
* `address` est l'adresse pour laquelle vous souhaitez exporter la clé privée correspondante. Elle doit être au format hexadécimal.

**Réponse**

* `privateKey` est la représentation de la chaîne de codage CB58 de la clé privée qui contrôle `address`. Elle a un préfixe `PrivateKey-` et peut être utilisée pour importer une clé via `avax.importKey`.
* `privateKeyHex` est la représentation de la chaîne hexadécimale de la clé privée qui contrôle `address`. Elle peut être utilisée pour importer un compte dans Metamask.

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

### avax.getUTXOs

Obtient les UTXO qui font référence à une adresse donnée.

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

* `utxos` est une liste d'UTXO de sorte que chaque UTXO référence au moins une adresse dans `addresses`.
* Au plus `limit` UTXO sont retournées. Si `limit` est omise ou supérieure à 1024, elle est définie à 1024.
*  Cette méthode prend en charge la pagination.  `endIndex`désigne la dernière UTXO renvoyée. Pour obtenir le jeu suivant d'UTXO, utilisez la valeur de `endIndex` comme `startIndex` dans le prochain appel.
* Si `startIndex` est omise, elle récupérera toutes les UTXO jusqu'à `limit`.
* Lors de l'utilisation de la pagination \(c'est-à-dire quand `startIndex` est fournie\), les UTXO peuvent ne pas être uniques sur plusieurs appels. C'est-à-dire, une UTXO peut apparaître dans le résultat du premier appel, puis à nouveau dans le deuxième appel.
* Lors de l'utilisation de la pagination, la cohérence n'est pas garantie sur plusieurs appels. C'est-à-dire, l'ensemble d'UTXO des adresses peut avoir changé entre les appels.
* `encoding` définit le format des UTXO retournées. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

#### **Exemple**

Supposons que nous voulons que toutes les UTXO référencent au moins un des éléments suivants `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

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

Cela donne la réponse :

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

Finalisez le transfert d'une non-AVAX ou d'une AVAX de la X-Chain à la C-Chain. Avant d'appeler cette méthode, vous devez appeler la [`avm.export`](exchange-chain-x-chain-api.md#avm-export)méthode  de la X-Chain avec l'assetID  `AVAX`pour lancer le transfert.

#### Signature

```go
avax.import({
    to: string,
    sourceChain: string,
    baseFee: int, // optional
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande**

* `to` est l'adresse à laquelle l'actif est envoyé. Elle doit être identique à l'argument `to` dans l'appel correspondant à la C-Chain `export`.
* `sourceChain` est l'ID ou les alias de la chaîne à partir de laquelle l'actif est importé. Pour importer des fonds de la X-Chain, utilisez `"X"`.
* `baseFee`est les frais de base qui doivent être utilisés lors de la création de la transaction. En cas d'omission, des frais suggérés seront utilisés.
* `username` est l'utilisateur qui contrôle l'adresse à partir de laquelle la transaction sera envoyée.
* `password` est le mot de passe de `username`.

**Réponse**

* `txID` est l'ID de l'ImportTx terminée.

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

**DÉCONSEILLÉE—à la place**, utilisez [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finalisez un transfert d'AVAX de la X-Chain à la C-Chain. Avant d'appeler cette méthode, vous devez appeler la [`avm.export`](exchange-chain-x-chain-api.md#avm-export)méthode  de la X-Chain avec l'assetID  `AVAX`pour lancer le transfert.

#### Signature

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    baseFee: int, // optional
    username: string,
    password:string,
}) -> {txID: string}
```

**Demande**

* `to` est l'adresse à laquelle l'AVAX est envoyée. Elle doit être au format hexadécimal.
* `sourceChain` est l'ID ou les alias de la chaîne à partir de laquelle AVAX est importée. Pour importer des fonds de la X-Chain, utilisez `"X"`.
* `baseFee`est les frais de base qui doivent être utilisés lors de la création de la transaction. En cas d'omission, des frais suggérés seront utilisés.
* `username` est l'utilisateur qui contrôle l'adresse à partir de laquelle la transaction sera envoyée.
* `password` est le mot de passe de `username`.

**Réponse**

* `txID` est l'ID de l'ImportTx terminée.

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

Donnez à un utilisateur le contrôle d'une adresse en lui fournissant la clé privée qui contrôle l'adresse.

#### Signature

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Demande**

* Ajoutez `privateKey` à l'ensemble de `username` des clés privées.

**Réponse**

* `address` est l'adresse `username` qui contrôle maintenant avec la clé privée. Elle sera au format hexadécimal.

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

Envoyez une transaction signée au réseau. `encoding` indique le format de la transaction signée. Peut être « cb58 » ou « hex ». Par défaut à « cb58 ».

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

Obtenez l'état d'une transaction atomique envoyée au réseau.

#### **Signature**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` est l'une des :

* `Accepted`: la transaction est \(ou sera\) acceptée par chaque nœud. Vérifier la propriété `blockHeight`
* `Processing`: la transaction est en cours de vote par ce noeud
* `Dropped`: la transaction a été abandonnée par ce nœud parce qu'il pensait que la transaction n'était pas valide.
* `Unknown`: la transaction n'a pas été vue par ce nœud.

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

## Admin API

Cette API peut être utilisée pour le déboguage. Notez que l'API d'administrateur est désactivée par défaut. Pour exécuter un nœud avec l'Admin API activée, utilisez [l'argument de ligne de commande](../references/command-line-interface.md#c-chain-config).`--coreth-admin-api-enabled:true`

### Point de terminaison

```text
/ext/bc/C/admin
```

### Méthodes

#### admin.setLogLevel

Définit le niveau du journal de la C-Chain.

#### **Signature**

```text
admin.setLogLevel({level:string}) -> {success:bool}
```

* `level`est le niveau du journal à définir.

#### **Exemple d'appel**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLogLevel",
    "params": {
        "level":"info",
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.startCPUProfiler

Démarre un profil CPU.

#### **Signature**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Exemple d'appel**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.stopCPUProfiler

Arrête et écrit un profil CPU.

#### **Signature**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Exemple d'appel**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.memoryProfile

Exécute et écrit un profil de mémoire.

#### **Signature**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Exemple d'appel**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.setLogLevel",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

#### admin.lockProfile

Exécute un compte de profil mutex au répertoire `coreth_performance_c`.

#### **Signature**

```text
admin.lockProfile() -> {success:bool}
```

#### **Exemple d'appel**

```bash
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params": {}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/admin
```

#### **Exemple de réponse**

```javascript
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```
