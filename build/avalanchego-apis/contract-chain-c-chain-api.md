---
descripción: La Cadena C o C-Chain es una instancia de la Máquina Virtual de Ethereum (EVM)
---

# API de la Cadena de Contratos \(C-Chain\)

_Nota: Ethereum tiene su propia noción de `networkID` y `chainID`. Estos no tienen ninguna relación con la visión que tiene Avalanche de networkID and chainID y son puramente internas en la_ [_C-Chain_](../../learn/platform-overview/#contract-chain-c-chain)_. En la red principal, la C-Chain utiliza `1` y `43114` para estos valores. En la red de pruebas Fuji, utiliza `1` y `43113` para estos valores. `networkID` y `chainID` pueden obtenerse usando los métodos `net_version` y `eth_chainId` mostrados más adelante._

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

* `to` es la dirección de la X-Chain a la cual enviar el activo.
* `amount` es el monto del activo a enviar.
* `assetID` es el ID del activo. Para exportar AVAX usa `"AVAX"` como `assetID`.
* El activo es enviado desde las cuentas controladas por `username` y `password`.

#### Llamada de ejemplo

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

**DESCONTINUADA—en lugar use** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

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

* `from` es la dirección de la C-Chain desde la cual se envían los AVAX. Debe estar en formato hex.
* `to` es la dirección de la X-Chain hacia la cual se enviarán los AVAX. Debe estar en formato bech32.
* `amount` es el monto en nAVAX a enviar.
* `destinationChain` es la cadena a la cual el AVAX se envía. Para exportar los fondos a la X-Chain, usa `"X"`.
* `changeAddr` es la dirección de C-Chain en la cual se envía cualquier cambio. Debe estar en formato hex.
* El AVAX es enviado desde las direcciones controladas por`username`

**Respuesta**

* `txID` es el ID de la transacción completada con ExportTx.

#### Llamada de Ejemplo

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

Obtén la llave privada que controla una dirección dada. La llave privada que regresa puede ser agregada a un usuario con `avax.importKey`.

#### Firma

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Petición**

* `username` debe tener control de  `address`.
* `address` es la dirección de la cual quieres exportar su correspondiente llave privada. Debe estar en formato hex.

**Respuesta**

* `privateKey` es la cadena codificada con CB58 representando la llave privada que controla `address`. Tiene prefijo `PrivateKey-` y puede usarse para importar una llave vía `avax.importKey`.
* `privateKeyHex` es la cadena en formato hex representando la llave privada que controla `address`. Puede usarse para importar una cuenta en Metamask.

#### Llamada de Ejemplo

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

* `utxos` es una lista de UTXOs tal que cada UTXO hace referencia a alguna de las direcciones en `addresses`.
* A lo más se regresaran un máximo de `limit` UTXOs. Si `limit` es omitido o mayor a 1024, entonces serán 1024.
* Este método soporta paginación. `endIndex` denota la última UTXO regresada. Para obtener la siguiente UTXOs, utiliza el valor de `endIndex` como `startIndex` en la llamada.
* Si `startIndex` es omitido, buscará todas las UTXOs hasta alcanzar `limit`.
* Cuando se utiliza paginación \(ie cuando se provee un `startIndex`\),  las UTXOs no necesariamente serán únicas a lo largo de varias llamadas. Esto es, una UTXO puede aparecer en el resultado de la primer llamada y nuevamente en la segunda llamada.
* Cuando se utiliza paginación, no está garantizada la consistencia a lo largo de multiples llamadas. Esto es, el conjunto UTXO puede haber cambiado entre llamadas.
* `encoding` establece el formato en que se regresarán las UTXOs. Puede ser “cb58” o “hex”. Por defecto será “cb58”.

#### **Ejemplo**

Suponer que queremos todos los UTXOs que hagan referencia a al menos una de `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

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

esto nos da como respuesta:

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

Finaliza la transferencia de un activo no-AVAX o AVAX que fue enviado de la X-Chain a la C-Chain. Antes de llamar este método, debes llamar al método [`avm.export`](exchange-chain-x-chain-api.md#avm-export) para iniciar la transferencia.

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

* `to` es la dirección a la cual se enviará el activo. Esta debe ser la misma en el argumento `to` en la llamada `export` correspondiente en la C-Chain's.
* `sourceChain` es el ID o sobrenombre de la cadena desde la cual el activo será importado.  Para importar fondos desde la X-Chain, utiliza `"X"`.
* `username` es el usuario que controla la dirección `to`.

**Respuesta**

* `txID` es el ID de la transacción de importación completada.

#### Llamada de ejemplo

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

#### Respuesta Ejemplo

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

**DESCONTINUADA—en lugar use** [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finaliza una transferencia de AVAX desde la X-Chain hacia la C-Chain. Antes de llamar a este método, debes llamar el método [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) en la  X-Chain para inciar la transferencia.

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

* `to` es la dirección a la cual se enviará AVAX. Debe estar en formato hex.
* `sourceChain` es el ID o sobrenombre de la cadena desde la cual se está importando el AVAX. Para importar fondos desde la X-Chain, utiliza `"X"`.
* `username` es el usuario que controla la dirección `to`.

**Respuesta**

* `txID` es el ID de la transacción de importación completada.

#### Llamada de ejemplo

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

Otorga control de una dirección a un usuario, mediante la asignación de la llave privada que controla la dirección.

#### Firma

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Petición**

* Agrega una llave privada (`privateKey`) al conjunto de llaves privadas de un usuario (`username`)

**Respuesta**

* `address` es la dirección que ahora controla `username` con la llave privada. Debe estar en formato hex.

#### Llamada de Ejemplo 

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyODIwNTQ5MTksMzAzNzUyNjUsOTgyMD
k3NDA5LC0xOTg3MjM0MDQsMjY5MDA3NjA1LDE0OTcxODgwMTgs
MTY1NzI0ODQ0MiwtMTkwMTA4NDI0OV19
-->