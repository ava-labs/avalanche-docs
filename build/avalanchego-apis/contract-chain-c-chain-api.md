---
description: La C-Chain es una instancia de la Máquina Virtual de Ethereum \(EVM\).
---

# API de la Cadena de contratos \(C-Chain\)

_Nota: Ethereum tiene sus propios conceptos de `networkID` y `chainID`. Estos no tienen relación con el concepto que tiene Avalanche de la networkID ni la chainID y son netamente internas de la _[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. En la Mainnet, la C-Chain utiliza `1`y `43114`para estos valores. En la red de pruebas Fuji, utiliza `1` y `43113` para estos valores. `networkID` y también `chainID` pueden obtenerse utilizando los `eth_chainId`métodos `net_version` y _.

## Despliegue de un contrato inteligente

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## API de Ethereum

### Terminales de la API de Ethereum

#### Terminales de JSON-RPC

Para interactuar con la C-Chain mediante la terminal JSON-RPC:

```cpp
/ext/bc/C/rpc
```

Para interactuar con otras instancias de EVM mediante la terminal JSON-RPC

```cpp
/ext/bc/blockchainID/rpc
```

donde `blockchainID` es la identificación de la blockchain que ejecuta la EVM.

#### Terminales de WebSocket

Para interactuar con la C-Chain mediante la terminal de Websocket:

```cpp
/ext/bc/C/ws
```

Por ejemplo, para interactuar con las API de Ethereum de la C-Chain, mediante Websocket en el localhost, se puede usar:

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Nota: en localhost, utiliza `ws://`Cuando uses la [API pública](../tools/public-api.md) u otro host que admite la encriptación, utiliza `wss://`.

Para interactuar con otras instancias de la EVM mediante la terminal de Websocket:

```cpp
/ext/bc/blockchainID/ws
```

donde `blockchainID` es la identificación de la blockchain que ejecuta la EVM.

### Métodos

#### API estándar de Ethereum

Avalanche tiene una interfaz API idéntica a la de Geth, excepto que solo admite los siguientes servicios:

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

Puedes interactuar con estos servicios del mismo modo en que lo harías con Geth. En la [documentación sobre JSON-RPC en la Wiki de Ethereum](https://eth.wiki/json-rpc/API) y [la documentación sobre JSON-RPC de Geth](https://geth.ethereum.org/docs/rpc/server) encontrarás la descripción completa de esta API.

####
eth\_getAssetBalance

Además de las API estándar de Ethereum, Avalanche tiene `eth_getAssetBalance` para recuperar el balance de los Tokens Nativos de Avalanche de primera clase sobre la C-Chain \(excepto AVAX, que debe consultarse con `eth_getBalance`\).

**Firma**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address` dueño del activo
* `blk` es el número del bloque o función hash al cual se debe devolver el saldo
* `assetID` identificación del activo cuyo saldo se solicita

**Llamada de ejemplo**

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

**Respuesta de ejemplo**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1388"
}
```

### eth\_baseFee

Obtén la comisión base para el siguiente bloque.

#### **Firma**

```cpp
eth_baseFee() -> {}
```

`result` es el valor hex de la comisión base para el siguiente bloque.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_baseFee",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x34630b8a00"
}
```

### eth\_maxPriorityFeePerGas

Obtén la comisión prioritaria necesaria para ser incluida en un bloque.

#### **Firma**

```cpp
eth_maxPriorityFeePerGas() -> {}
```

`result` es el valor hex de la comisión prioritaria que se necesita incluir en un bloque.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"eth_maxPriorityFeePerGas",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/rpc
```

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x2540be400"
}
```

En la [sección C-Chain de la documentación sobre comisiones de transacciones](https://docs.avax.network/learn/platform-overview/transaction-fees#c-chain-fees) se encuentra más información sobre las comisiones dinámicas.

## API específicas de Avalanche

### Terminales de la API específicas de Avalanche

Para interactuar con las llamadas RPC `avax` específicas de la C-Chain:

```cpp
/ext/bc/C/avax
```

Para interactuar con otras instancias de las terminales de AVAX de la EVM:

```cpp
/ext/bc/blockchainID/avax
```

### avax.getAtomicTx

Obtiene una transacción por su ID. Parámetro de codificación opcional para especificar el formato de la transacción devuelta. Puede ser `cb58` o `hex`. De forma predeterminada es `cb58`.

#### Firma

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

**Petición**

* `txID` es el ID de la transacción. Debe estar en formato cb58.
* `encoding` es el formato de codificación que debe utilizarse. Puede ser `cb58` o `hex`. De forma predeterminada es `cb58`.

**Respuesta**

* `tx` es la transacción codificada a `encoding`.
* `encoding` es el `encoding`.
* `blockHeight` es la altura del bloque en el que se incluyó la transacción.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

Exporta un activo desde la C-Chain hacia la X-Chain. Después de llamar este método, deberás llamar [`avm.import`](exchange-chain-x-chain-api.md#avm-import) en la X-Chain para completar la transferencia.

#### Firma

```cpp
avax.export({
    to: string,
    amount: int,
    assetID: string,
    username: string,
    password:string,
}) -> {txID: string}
```

* `to` es la dirección de la X-Chain a donde se envía el activo.
* `amount` es la cantidad del activo que se va a enviar.
* `assetID` es la identificación del activo. Para exportar AVAX se debe utilizar `"AVAX"` como el `assetID`.
* El activo se envía de direcciones controladas por `username` y `password`.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

**OBSOLETO—en su lugar utiliza** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

Envía AVAX desde la C-Chain hacia la X-Chain. Después de llamar este método, deberás llamar [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) en la X-Chain para completar la transferencia.

#### Firma

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

**Petición**

* `from` son las direcciones de la C-Chain desde donde se envía el AVAX. Debe estar en formato hex.
* `to` es la dirección de la X-Chain hacia donde se envió el AVAX. Debe estar en formato bech32.
* `amount` es el monto de nAVAX a enviar.
* `destinationChain` es la cadena a donde se envía el AVAX. Para exportar fondos a la X-Chain, utiliza `"X"`.
* `changeAddr` es la dirección de la C-Chain a donde se envía cualquier cambio. Debe estar en formato hex.
* El AVAX se envía desde las direcciones controladas por `username`

**Respuesta**

* `txID` es la txid de la ExportTx completada.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

Obtén la clave privada que controla una dirección determinada. La clave privada devuelta puede agregársele a un usuario con `avax.importKey`.

#### Firma

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Petición**

* `username` debe controlar `address`.
* `address` es la dirección cuya clave privada se quiere exportar. Debe estar en formato hex.

**Respuesta**

* `privateKey` es la representación de la cadena codificada CB58 de la clave privada que controla `address`. Tiene un prefijo `PrivateKey-` y puede utilizarse para importar una clave mediante `avax.importKey`.
* `privateKeyHex` es la representación de la cadena en formato hex de la clave privada que controla `address`. Puede usarse para importar una cuenta en Metamask.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

Obtiene los UTXO con referencia a cierta dirección.

#### **Firma**

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

* `utxos` es una lista de UTXO en la que cada UTXO remite al menos a una dirección de `addresses`.
* Como máximo `limit` UTXO son devueltos. Si `limit`es omitido o mayor que 1024, se establece en 1024.
* Este método admite la paginación. `endIndex` denota el último UTXO devuelto. Para obtener el siguiente grupo de UTXO, utiliza el valor de `endIndex` como `startIndex` en la siguiente llamada.
* Si `startIndex` se omite, consulta todos los UTXO hasta `limit`.
* Cuando se utiliza  la paginación \(es decir, cuando se suministra el `startIndex`\), no se garantiza que los UTXO sean únicos en varias llamadas. Es decir, puede aparecer un UTXO en el resultado de la primera llamada y luego nuevamente en la segunda llamada.
* Cuando se utiliza la paginación, no se garantiza la consistencia en varias llamadas. Es decir, el conjunto UTXO de direcciones puede haber cambiado entre llamadas.
* `encoding` establece el formato para los UTXO devueltos. Pueden ser "cb58" o "hex". De forma predeterminada es "cb58".

#### **Ejemplo**

Supongamos que queremos todos las UTXO que hacen referencia al menos a uno de los `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

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

Esto nos da la respuesta:

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

Finaliza la transferencia de un activo no-AVAX o AVAX que fue enviado de la X-Chain a la C-Chain. Antes de llamar a este método, debes llamar al [`avm.export`](exchange-chain-x-chain-api.md#avm-export) método de la X-Chain para iniciar la transferencia.

#### Firma

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Petición**

* `to` es la dirección a donde se envía el activo. Esta debe ser igual al argumento `to` en la correspondiente llamada a la `export`de la C-Chain.
* `sourceChain` es la identificación o alias de la cadena desde la cual se importará el activo. Para importar fondos desde la X-Chain, utiliza `"X"`.
* `username` es el usuario que controla `to`.

**Respuesta**

* `txID` es la identificación de la transacción de importación \(ImportTx\) completada.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

**OBSOLETO—en su lugar utiliza** [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finaliza una transferencia de AVAX desde la X-Chain hacia la C-Chain. Antes de llamar a este método, debes llamar al [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) método de la X-Chain para iniciar la transferencia.

#### Firma

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Petición**

* `to` es la dirección a donde se envía AVAX. Debe estar en formato hex.
* `sourceChain` es la identificación o alias de la cadena desde donde se importa el AVAX. Para importar fondos desde la X-Chain, utiliza `"X"`.
* `username` es el usuario que controla `to`.

**Respuesta**

* `txID` es la identificación de la transacción de importación \(ImportTx\) completada.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

Otorga a un usuario control sobre una dirección proporcionando la clave privada que controla la dirección.

#### Firma

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Petición**

* Agrega `privateKey` al conjunto de claves privadas de `username`.

**Respuesta**

* `address` es la dirección que ahora `username` controla con la clave privada. Debe estar en formato hex.

#### Llamada de Ejemplo

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

#### Respuesta ejemplo

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

Envíale una transacción firmada a la red. `encoding` especifica el formato de la transacción firmada. Pueden ser "cb58" o "hex". De forma predeterminada es "cb58".

#### **Firma**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Llamada de ejemplo**

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

#### **Respuesta de ejemplo**

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

Obtén el estado de una transacción atómica enviada a la red.

#### **Firma**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` es uno de:

* `Accepted`: La transacción está \(o será\) aceptada por cada nodo. Verifica la propiedad `blockHeight`
* `Processing`: El nodo está votando por esta transacción
* `Dropped`: Este nodo abandonó la transacción porque pensó que la transacción era inválida
* `Unknown`: El nodo no ha visto esta transacción

#### **Llamada de ejemplo**

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

#### **Respuesta de ejemplo**

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

