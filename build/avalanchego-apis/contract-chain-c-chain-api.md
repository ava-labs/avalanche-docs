---
description: La cadena C es una instancia de la Máquina Virtual Ethereum (EVM)

---

# API de cadena de contrato \(C-Chain\)

_Nota: Ethereum tiene su propia noción de `networkID` y `chainID`. Estas no tienen relación con la visión de Avalanche de networkID y chainID y son puramente internas a la_ [_cadena C_](../../learn/platform-overview/#contract-chain-c-chain)_. En Mainnet, la cadena C utiliza `1` y `43114` para estos valores. En el Fuji Testnet, utiliza `1` y `43113` para estos valores. `networkID` y `chainID` también se pueden obtener utilizando los métodos `net_version` y `eth_chainId`._

## Desplegar un contrato inteligente

{% page-ref page-ref %}

## Ethereum API

### Ethereum API Endpoints

#### JSON-RPC Endpoints

Interactuar con C-Chain a través del punto final JSON-RPC:

```cpp
/ext/bc/C/rpc
```

Interactuar con otras instancias del EVM a través del punto final JSON-RPC:

```cpp
/ext/bc/blockchainID/rpc
```

donde `blockchainID` es el ID de la cadena de bloques que ejecuta el EVM.

#### WebSocket Endpoints

Interactuar con C-Chain a través del punto final de websocket :

```cpp
/ext/bc/C/ws
```

Por ejemplo, para interactuar con las API Ethereum de la C-Chain's a través de websocket en localhost puede usar:

```cpp
ws://127.0.0.1:9650/ext/bc/C/ws
```

Interactuar con otras instancias del EVM a través del punto final de websocket:

```cpp
/ext/bc/blockchainID/ws
```

donde `blockchainID` es el ID de la cadena de bloques que ejecuta el EVM.

### Métodos de trabajo

#### API estándar de Ethereum

Avalanche ofrece una interfaz API idéntica a la API de Geth, excepto que solo admite los siguientes servicios:

* `web3-3-00-1990.`
* `nets?`
* `eth--`
* `personal.`
* `txpool_`
* `debug_`

Puede interactuar con estos servicios de la misma manera exacta que interactuaría con Geth. Vea la [Documentación JSON-RPC de Ethereum Wiki,](https://eth.wiki/json-rpc/API) y la [Documentación](https://geth.ethereum.org/docs/rpc/server) JSON-RPC de Geth, para obtener una descripción completa de esta API.

#### eth\_getAssetBalance

Además de las API estándar de Ethereum, Avalanche ofrece `eth_getAssetBalance` para recuperar el equilibrio de las Tokens Nativas de primera clase Avalanche en la cadena C \(excluida AVAX, que debe ser traída con `eth_getBalance`\).

**Firma**

```cpp
eth_getAssetBalance({
    address: string,
    blk: BlkNrOrHash,
    assetID: string,
}) -> {balance: int}
```

* propietario de `la dirección` del activo
* `blk` es el número de bloque o hash en el que recuperar el equilibrio
* el `activo` del activo para el que se solicita el saldo

**Ejemplo de llamada**

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

## Avalanche API específicas

### Avalanche Especificaciones API Endpoints

Para interactuar con el `rax` específico RPC llama en C-Chain:

```cpp
/ext/bc/C/avax
```

Interactuar con otras instancias de los puntos finales EVM AVAX:

```cpp
/ext/bc/blockchainID/avax
```

### avax.export

Exportar un activo de la cadena C a la cadena X. Después de llamar a este método, debe llamar a [`avm.import`](exchange-chain-x-chain-api.md#avm-import) en la cadena X para completar la transferencia.

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

* `a` es la dirección de la cadena X al activo se envía a.
* `la` cantidad es la cantidad del activo a enviar.
* `asset ID` es el ID del activo. Para exportar AVAX utilice `"AVAX"` como `el activo ID`.
* El activo se envía desde direcciones controladas por `nombre` de usuario y `contraseña`.

#### Ejemplo de llamada

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

#### Respuesta de ejemplo

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

**DEPRECATED - en cambio utilice** [**avax.export**](contract-chain-c-chain-api.md#avax-export).

Enviar AVAX desde la cadena C a la cadena X. Después de llamar a este método, debe llamar a [`avm.importAVAX`](exchange-chain-x-chain-api.md#avm-importavax) en la cadena X para completar la transferencia.

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

**Solicitud de información**

* `de` es las direcciones C-Chain de las que se envía AVAX. Deben estar en formato hex.
* `a` es la dirección de la cadena X a la que se envía AVAX. Debe estar en formato bech32.
* `la` cantidad es la cantidad de nAVAX para enviar.
* `destinationChain` es la cadena a la que se envía AVAX. Para exportar fondos a la cadena X, utilice `"X"`.
* `changeAddr` es la dirección de la cadena C donde se envía cualquier cambio. Debe estar en formato hex.
* El AVAX se envía desde direcciones controladas por `nombre` de usuario

**Respuesta**

* `txID` es el txid de la ExportTx completada.

#### Ejemplo de llamada

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

#### Respuesta de ejemplo

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

Consigue la clave privada que controla una dirección determinada. La clave privada devuelta se puede agregar a un usuario con `avax.importKey`.

#### Firma

```go
avax.exportKey({
    username: string,
    password:string,
    address:string
}) -> {privateKey: string}
```

**Solicitud de información**

* `Nombre` de usuario debe controlar `la dirección`.
* `la dirección` es la dirección para la que desea exportar la clave privada correspondiente. Debe estar en formato hex.

**Respuesta**

* `privateKey` es la representación de cadena codificada CB58 de la clave privada que controla `la dirección`. Tiene un prefijo `PrivateKey-` y se puede utilizar para importar una clave a través de `avax.importKey`.
* `privateKeyHex` es la representación de cadena hex de la clave privada que controla `la dirección`. Puede ser utilizado para importar una cuenta en Metamask.

#### Ejemplo de llamada

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

#### Respuesta de ejemplo

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

Obtiene las UTXOs que refieren una dirección determinada.

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

* `utxos` es una lista de UTXOS de tal manera que cada UTXO hace referencia al menos una dirección en `direcciones`.
* Al máximo `se` devuelven UTXOs Si se omite `el límite` o supera 1024, se establece en 1024.
* Este método admite la paginación. `endIndex` denota el último UTXO devuelto. Para obtener el siguiente conjunto de UTXOs, utilice el valor de `endIndex` como `startIndex` en la siguiente llamada.
* Si `startIndex` se omitida, traerá todos los UTXOS hasta `límite`.
* Cuando se utiliza la paginación \(es decir, cuando `startIndex` se proporciona \), UTXOs no se garantiza que sean únicos en múltiples llamadas. Es decir, un UTXO puede aparecer en el resultado de la primera llamada, y luego otra vez en la segunda llamada.
* Al utilizar la paginación, la consistencia no está garantizada en múltiples llamadas. Es decir, el conjunto UTXO de las direcciones puede haber cambiado entre llamadas.
* `La codificación` establece el formato para los UTXOs. Puede ser "cb58" o "hex". Defaults to "cb58".

#### **Ejemplo de ello**

Supongamos que queremos todas las UTXOs esa referencia al menos uno de `C-avax1yzt57wd8me6xmy3t42lz8m5lg6yruy79m6whsf`.

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

Esto da respuesta:

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

Finalizar la transferencia de una no AVAX o AVAX de la cadena X a la cadena C-Chain. Antes de que se llame a este método, debe llamar el método [`avm.export`](exchange-chain-x-chain-api.md#avm-export) de la cadena X-X, para iniciar la transferencia.

#### Firma

```go
avax.import({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Solicitud de información**

* a la dirección `a` la que se envía el activo. Esto debe ser lo mismo que el argumento `de` la correspondiente llamada a la `exportación` de la cadena C.
* `sourceChain` es el ID o alias de la cadena del activo se está importando. Para importar fondos de la cadena X, utilice `"X"`.
* `nombre` de usuario es el usuario que se `controla`.

**Respuesta**

* `txID` es el ID de la ImportTx completada.

#### Ejemplo de llamada

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

#### Respuesta de ejemplo

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

**DEPRECATED—instead lugar de ello, use** [**avax.import**](contract-chain-c-chain-api.md#avax-import)

Finalizar una transferencia de AVAX de la cadena X a la cadena C-Chain. Antes de que se llame este método, debe llamar al método [`avm.exportAVAX`](exchange-chain-x-chain-api.md#avm-exportavax) de la cadena X-Chain's iniciar la transferencia.

#### Firma

```go
avax.importAVAX({
    to: string,
    sourceChain: string,
    username: string,
    password:string,
}) -> {txID: string}
```

**Solicitud de información**

* `a` es la dirección a la que se envía AVAX. Debe estar en formato hex.
* `sourceChain` es el ID o alias de la cadena de la que AVAX está siendo importado. Para importar fondos de la cadena X, utilice `"X"`.
* `nombre` de usuario es el usuario que se `controla`.

**Respuesta**

* `txID` es el ID de la ImportTx completada.

#### Ejemplo de llamada

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

#### Respuesta de ejemplo

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

Dé un control de usuario sobre una dirección proporcionando la clave privada que controla la dirección.

#### Firma

```go
avax.importKey({
    username: string,
    password:string,
    privateKey:string
}) -> {address: string}
```

**Solicitud de información**

* Añadir `privateKey` al conjunto de teclas privadas `de nombre` de usuario.

**Respuesta**

* `la dirección` es el `nombre de usuario` de dirección ahora controla con la tecla privada. Será en formato hex.

#### Ejemplo de llamada

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

#### Respuesta de ejemplo

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

Enviar una transacción firmada a la red. `La codificación` especifica el formato de la transacción firmada. Puede ser "cb58" o "hex". Defaults to "cb58".

#### **Firma**

```cpp
avax.issueTx({
    tx: string,
    encoding: string, //optional
}) -> {
    txID: string
}
```

#### **Ejemplo de llamada**

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

Obtenga el estado de una transacción atómica enviada a la red.

#### **Firma**

```cpp
avax.getAtomicTxStatus({txID: string}) -> {
  status: string,
  blockHeight: string // returned when status is Accepted
}
```

`status` es uno de:

* `Aceptado`: La transacción es \(o será \) aceptada por cada nodo. Compruebe la propiedad `blockHeight`
* `Procesamiento`: La transacción está siendo votada por este nodo
* `Caído`: La transacción fue lanzada por este nodo porque creía que la transacción no era válida.
* `Desconocido`: La transacción no ha sido vista por este nodo

#### **Ejemplo de llamada**

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

