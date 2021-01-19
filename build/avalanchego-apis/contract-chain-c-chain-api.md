---
descripción: La Cadena C o C-Chain es una instancia de la Máquina Virtual de Ethereum (EVM)
---

# Cadena de Contratos \(C-Chain\) API

_Nota: Ehtereum tiene su propia noción de `networkID` y `chainID`. Estos no tienen ninguna relación con la visión que tiene Avalanche de networkID and chainID y son puramente internas en la_ [_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. En la red principal, la C-Chain utiliza `1` y `43114` para estos valores. En la red de pruebas Fuji, utiliza `1` y `43113` para estos valores. `networkID` y `chainID` pueden obtenerse usando los métodos `net_version` y `eth_chainId` mostrados más adelante._

## Despligue de un Contrato Inteligente

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## Metodos

Esta API es idéntica al API de Geth, con excepción que solamente soporta los siguientes servicios:

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`

Puedes interactuar con estos servicios del mismo modo en que lo harías con Geth. Mira la [Documentación Ethereum Wiki’s JSON-RPC](https://eth.wiki/json-rpc/API) y [Documentación de Geth JSON-RPC](https://geth.ethereum.org/docs/rpc/server) para una descipción completa de la API.

## Extremos JSON-RPC 

Para interactuar con la C-Chain:

```cpp
/ext/bc/C/rpc
```

Para interactuar con otras instancias de EVM:

```cpp
/ext/bc/blockchainID/rpc
```

donde `blockchainID` es el ID de la cadena de bloques ejecutando una EVM.

Para interactuar con las llamadas RPC específicas de `avax`.

```cpp
/ext/bc/C/avax
```

## Extremos AVAX RPC

### avax.export

Export an asset from the C-Chain to the X-Chain. After calling this method, you must call [`avm.import`](exchange-chain-x-chain-api.md#avm-import) on the X-Chain to complete the transfer.

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

* `to` is the X-Chain address the asset is sent to.
* `amount` is the amount of the asset to send.
* `assetID` is the ID of the asset. To export AVAX use `"AVAX"` as the `assetID`.
* The asset is sent from addresses controlled by `username` and `password`.

#### Example Call

```javascript
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

#### Example Response

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

**DEPRECATED—instead use** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

Send AVAX from the C-Chain to the X-Chain. After calling this method, you must call [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) on the X-Chain to complete the transfer.

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

**Request**

* `from` is the C-Chain addresses the AVAX is sent from. They should be in hex format.
* `to` is the X-Chain address the AVAX is sent to. It should be in bech32 format.
* `amount` is the amount of nAVAX to send.
* `destinationChain` is the chain the AVAX is sent to. To export funds to the X-Chain, use `"X"`.
* `changeAddr` is the C-Chain address where any change is sent to. It should be in hex format.
* The AVAX is sent from addresses controlled by `username`

**Response**

* `txID` is the txid of the completed ExportTx.

#### Example Call

```javascript
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

#### Example Response

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

Get the private key that controls a given address. The returned private key can be added to a user with `avax.importKey`.

#### Signature

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Request**

* `username` must control `address`.
* `address` is the address for which you want to export the corresponding private key. It should be in hex format.

**Response**

* `privateKey` is the CB58 endcoded string representation of the private key that controls `address`. It has a `PrivateKey-` prefix and can be used to import a key via `avax.importKey`.
* `privateKeyHex` is the hex string representation of the private key that controls `address`. It can be used to import an account into Metamask.

#### Example Call

```javascript
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

#### Example Response

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

Gets the UTXOs that reference a given address.

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

* `utxos` is a list of UTXOs such that each UTXO references at least one address in `addresses`.
* At most `limit` UTXOs are returned. If `limit` is omitted or greater than 1024, it is set to 1024.
* This method supports pagination. `endIndex` denotes the last UTXO returned. To get the next set of UTXOs, use the value of `endIndex` as `startIndex` in the next call.
* If `startIndex` is omitted, will fetch all UTXOs up to `limit`.
* When using pagination \(ie when `startIndex` is provided\), UTXOs are not guaranteed to be unique across multiple calls. That is, a UTXO may appear in the result of the first call, and then again in the second call.
* When using pagination, consistency is not guaranteed across multiple calls. That is, the UTXO set of the addresses may have changed between calls.
* `encoding` sets the format for the returned UTXOs. Can be either “cb58” or “hex”. Defaults to “cb58”.

#### **Example**

Suppose we want all UTXOs that reference at least one of `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

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

This gives response:

```cpp
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

Finalize the transfer of a non-AVAX or AVAX from the X-Chain to the C-Chain. Before this method is called, you must call the X-Chain's [`avm.export`](exchange-chain-x-chain-api.md#avm-export) method to initiate the transfer.

#### Signature

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the address the asset is sent to. This must be the same as the `to` argument in the corresponding call to the C-Chain's `export`.
* `sourceChain` is the ID or alias of the chain the asset is being imported from. To import funds from the X-Chain, use `"X"`.
* `username` is the user that controls `to`.

**Response**

* `txID` is the ID of the completed ImportTx.

#### Example Call

```javascript
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

#### Example Response

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

**DEPRECATED—instead use** [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finalize a transfer of AVAX from the X-Chain to the C-Chain. Before this method is called, you must call the X-Chain's [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) method to initiate the transfer.

#### Signature

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Request**

* `to` is the address the AVAX is sent to. It should be in hex format.
* `sourceChain` is the ID or alias of the chain the AVAX is being imported from. To import funds from the X-Chain, use `"X"`.
* `username` is the user that controls `to`.

**Response**

* `txID` is the ID of the completed ImportTx.

#### Example Call

```javascript
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

#### Example Response

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

Give a user control over an address by providing the private key that controls the address.

#### Signature

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Request**

* Add `privateKey` to `username`'s set of private keys.

**Response**

* `address` is the address `username` now controls with the private key. It will be in hex format.

#### Example Call

```javascript
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

#### Example Response

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "address": "0xc876DF0F099b3eb32cBB78820d39F5813f73E18C"
    },
    "id": 1
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTM3NDMwNDQ5MiwtMTkwMTA4NDI0OV19
-->