---
description: La C-Chain es una instancia de la máquina virtual de Ethereum \(EVM\)
---

# API de la Cadena de contratos \(C-Chain\)

_Nota: Ethereum tiene su propia noción `networkID`y su propia`chainID` Estos no tienen relación con la vista de Avalanche de la ID de red y de la chainID y son puramente internos a la _[_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. En Mainnet, la C-Chain utiliza `1`y `43114`para estos valores. En la Testnet de Fuji, usa `1`y `43113`para estos valores. `networkID`y `chainID`también puede ser obtenido usando los y `net_version``eth_chainId`métodos._

## Despligue de un Contrato Inteligente

{% page-ref page="../tutorials/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

## API de Ethereum

### Puntos de referencia de la API

#### Puntos de referencia

Para interactuar con C-Chain a través de la línea de extremo JSON-RPC:

```cpp
/ext/bc/C/rpc
```

Para interactuar con otras instancias de EVM:

```cpp
/ext/bc/blockchainID/rpc
```

donde `blockchainID`es el ID de la blockchain que ejecuta el EVM.

#### Puntos de referencia

Para interactuar con C-Chain a través de la punta de página websocket

```cpp
/ext/bc/C/ws
```

Por ejemplo, para interactuar con las API de Ethereum de la C-Chain, a través de la web socket en localhost puedes usar:

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Para interactuar con otras instancias de la EVM a través de la vía de la vía de la web endpoint:

```cpp
/ext/bc/blockchainID/ws
```

donde `blockchainID`es el ID de la blockchain que ejecuta el EVM.

### Metodos

#### API de Ethereum

Avalanche ofrece una interfaz API idéntica a la API de Geth, excepto que solo admite los siguientes servicios:

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`
* `debug_`

Puedes interactuar con estos servicios del mismo modo en que lo harías con Geth. Ver la [documentación](https://geth.ethereum.org/docs/rpc/server) [de JSON-RPC](https://eth.wiki/json-rpc/API) de la Wiki, y la documentación JSON-RPC de Get para una descripción completa de esta API.

#### eth\_getAssetBalance

Además de las API de Ethereum estándar, Avalanche ofrece `eth_getAssetBalance`recuperar el equilibrio de las Tokens de primera clase Avalanche Nativas en la C-Chain \(excluyendo AVAX, que debe ser alcanzado con `eth_getBalance`\).

**Firma**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* `address`propietario de el activo
* `blk`es el número de bloque o hash en el que recuperar el saldo
* `assetID`id del activo para el que se solicita el saldo

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

## API específicas de Avalanche

### Puntos de ruta específicos de Avalanche

Para interactuar con las llamadas RPC `avax`específicas en la C-Chain:

```cpp
/ext/bc/C/avax
```

Para interactuar con otras instancias de los extremos de EVM AVAX:

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

Exporta un activo desde la C-Chain hacia la X-Chain. Después de llamar a este método, debes llamar [`avm.import`](exchange-chain-x-chain-api.md#avm-import)a la X-Chain para completar la transferencia.

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

* `to`es la dirección de X-Chain a la que se envía el activo.
* `amount`es la cantidad del activo a enviar.
* `assetID`es el ID de la activo. Para exportar el uso de AVAX `"AVAX"`como el .`assetID`
* El activo se envía de direcciones controladas por `username`y controladas.`password`

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

**DEPRECATED, en lugar usa **[**avax.export**](contract-chain-c-chain-api.md#avax-export).

Envía AVAX desde la C-Chain hacia la X-Chain. Después de llamar a este método, debes llamar [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax)a la X-Chain para completar la transferencia.

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

**Solicitar**

* `from`es la C-Chain direcciones de la AVAX Debe estar en formato hex.
* `to`es la dirección de X-Chain a la que se envía AVAX. Debe estar en formato bech32.
* `amount`es la cantidad de nAVAX para enviar.
* `destinationChain`es la cadena a la que se envía AVAX. Para exportar fondos a la X-Chain, usa `"X"`.
* `changeAddr`es la dirección de C-Chain donde se envía cualquier cambio a la que se modifica. Debe estar en formato hex.
* La AVAX se envía de direcciones controladas por`username`

**Respuesta**

* `txID`es el txid de la ExportTx completada.

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

Obtén la llave privada que controla una dirección determinada. `avax.importKey`Se puede agregar a un usuario con .

#### Firma

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Solicitar**

* `username`debe controlar`address`
* `address`es la dirección para la que quieres exportar la clave privada correspondiente. Debe estar en formato hex.

**Respuesta**

* `privateKey`es la representación de string codificada de CB58 de la clave privada que controla.`address` Tiene un `PrivateKey-`prefijo y puede ser utilizado para importar una clave a través de`avax.importKey`
* `privateKeyHex`es la representación de string hex de la clave privada que controla.`address` Puede usarse para importar una cuenta en Metamask.

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

Obtiene los UTXOs con referencia a cierta dirección.

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

* `utxos`es una lista de UTXOs de tal manera que cada UTXO hace referencia al menos una dirección en .`addresses`
* En la mayoría de los `limit`UTXOs Si `limit`se omite o supera 1024, se establece en 1024.
* Este método admite la paginación. `endIndex`Denomina la última UTXO devuelve. Para obtener el siguiente conjunto de UTXOs, usa el valor de `endIndex`como `startIndex`en la siguiente llamada.
* Si `startIndex`se omite el proceso, buscará todas las UTXOs hasta .`limit`
* Cuando utiliza la paginación \(es decir, cuando se `startIndex`proporciona\), las UTXO no están garantizadas como únicas en varias llamadas. Es decir, puede aparecer un UTXO en el resultado de la primera llamada y luego nuevamente en la segunda llamada.
* Cuando se utiliza la paginación, no se garantiza la consistencia en varias llamadas. Es decir, el conjunto UTXO de direcciones puede haber cambiado entre llamadas.
* `encoding`establece el formato para los UTXOs devueltos Puede ser "cb58" o "hex". Por defecto es "cb58".

#### **Ejemplo**

`C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`Supongamos que queremos todas las UTXOs esa referencia al menos una de .

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

Finaliza la transferencia de un activo no-AVAX o AVAX que fue enviado de la X-Chain a la C-Chain. Antes de que se llame a este método, debes llamar el [`avm.export`](exchange-chain-x-chain-api.md#avm-export)método de la X-Chain's iniciar la transferencia.

#### Firma

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Solicitar**

* `to`es la dirección a la que se envía el activo. Este debe ser el mismo que el `to`argumento en la llamada correspondiente a la C-Chain.`export`
* `sourceChain`es el ID o alias de la cadena de la que el activo está siendo importado. `"X"`Para importar fondos de la X-Chain, usa
* `username`es el usuario que controla`to`

**Respuesta**

* `txID`es el ID de la ImportTx completada.

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

**DEPRECATED—instead lugar usa **[**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finaliza una transferencia de AVAX desde la X-Chain hacia la C-Chain. Antes de que se llame a este método, debes llamar el [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax)método de la X-Chain's iniciar la transferencia.

#### Firma

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Solicitar**

* `to`es la dirección a la que se envía AVAX. Debe estar en formato hex.
* `sourceChain`es el ID o alias de la cadena de la cual la AVAX está siendo importada. `"X"`Para importar fondos de la X-Chain, usa
* `username`es el usuario que controla`to`

**Respuesta**

* `txID`es el ID de la ImportTx completada.

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

Otorga a un usuario control sobre una dirección proporcionando la llave privada que controla la dirección.

#### Firma

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Solicitar**

* `username`Añadir `privateKey`al conjunto de claves privadas.

**Respuesta**

* `address`es la dirección `username`ahora controla con la clave privada. Debe estar en formato hex.

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

Envía una transacción firmada a la red. `encoding`Especifica el formato de la transacción firmada. Puede ser "cb58" o "hex". Por defecto es "cb58".

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

`status`es uno de los siguientes:

* `Accepted`: La transacción es \(o será\) aceptada por cada nodo. Consulta la `blockHeight`propiedad
* `Processing`: La transacción está siendo votada por este nodo
* `Dropped`: La transacción fue lanzada por este nodo porque pensaba que la transacción no es válida
* `Unknown`: La transacción no ha sido vista por este nodo

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

