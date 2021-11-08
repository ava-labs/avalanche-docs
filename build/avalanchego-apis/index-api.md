# API del Index

AvalancheGo se puede configurar para ejecutarse con un indexador. Es decir, guarda (indexa) cada contenedor (un bloque, un vértice o una transacción) que acepta en la X-Chain, la P-Chain y la C-Chain. Para ejecutar AvalancheGo con indexación habilitada, se establece el indicador de la línea de comandos [--index-enabled](../references/command-line-interface.md#apis) en true. **AvalancheGo solo indexa los contenedores que son aceptados cuando se ejecuta con `--index-enabled` configurado en true.** Para asegurarse de que el nodo tiene un index completo, hay que ejecutar un nodo con una nueva base de datos y `--index-enabled` configurado en true. El nodo acepta la totalidad de los bloques, los vértices y las transacciones en la historia de la red durante el arranque, lo que garantiza que el index está completo. Se puede apagar el nodo sin problema si se está ejecutando con la indexación habilitada.	 Si se reinicia con la indexación aún habilitada, aceptará todos los contenedores que fueron aceptados mientras estaba fuera de línea. El indexador nunca debería dejar de indexar un bloque, un vértice o una transacción que se han aceptado.

Los contenedores indexados (es decir, los bloques, los vértices y las transacciones que se han aceptado) se marcan con la fecha en que el nodo aceptó ese contenedor. Se debe tener en cuenta que, si el contenedor fue indexado durante el arranque, otros nodos pueden haber aceptado el contenedor mucho antes. Cada contenedor indexado durante el arranque se marcará con la hora en que arrancó el nodo y no cuando fue aceptado por primera vez por la red.

Se debe tener en cuenta que, para los DAG (incluyendo la X-Chain), los nodos pueden aceptar vértices y transacciones en diferente orden.

Este documento muestra cómo consultar datos de la API del Index de AvalancheGo. La API del Index solo está disponible cuando se ejecuta con `--index-enabled`.

## Cliente Go

Hay una implementación Go de un cliente de la API del Index. La documentación se puede consultar [aquí](https://pkg.go.dev/github.com/ava-labs/avalanchego/indexer#Client). Este cliente puede usarse dentro de un programa Go para conectarse a un nodo AvalancheGo que se esté ejecutando con la API del Index habilitada y hacer llamadas a la API del Index.

## Format

Esta API usa el formato RPC `json 2.0`. Para más información sobre cómo hacer llamadas JSON RPC, mira [aquí](issuing-api-calls.md).

## Terminales

Cada cadena tiene un index o más. Para ver si un bloque de la C-Chain es aceptado, por ejemplo, hay que enviar una llamada de la API al index del bloque de la C-Chain. Para ver si un vértice de la X-Chain es aceptado, por ejemplo, hay que enviar una llamada de la API al index del vértice de la X-Chain.

### Transacciones de la X-Chain

```text
/ext/index/X/tx
```

### Vértices de la X-Chain

```text
/ext/index/X/vtx
```

### Bloques de la P-Chain

```text
/ext/index/P/block
```

### Bloques de la C-Chain

```text
/ext/index/C/block
```

## API Methods

### index.getLastAccepted

Obtén el contenedor aceptado más recientemente.

#### **Firma**

```cpp
index.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

donde:

* `id` es la identificación del contenedor.
* `bytes` es la representación del contenedor en bytes
* `timestamp` es la hora cuando este nodo aceptó el contenedor
* `index` es el número de contenedores que fueron aceptados en este index antes de este
* `encoding` es `"cb58"` o `"hex"`

#### **Llamada de ejemplo**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Respuesta de ejemplo**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByIndex

Hay que obtener el contenedor por index. El primer contenedor aceptado está en el index 0, el segundo está en el index 1 y así sucesivamente.

#### **Firma**

```cpp
index.getContainerByIndex({
  index: uint64,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` es la identificación del contenedor.
* `bytes` es la representación del contenedor en bytes
* `timestamp` es la hora cuando este nodo aceptó el contenedor
* `index` es el número de contenedores que fueron aceptados en este index antes de este
* `encoding` es `"cb58"` o `"hex"`

#### **Llamada de ejemplo**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByIndex",
    "params": {
        "index":0,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Respuesta de ejemplo**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByID

Obtener el contenedor por ID.

#### **Firma**

```cpp
index.getContainerByID({
  containerID: string,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` es la identificación del contenedor.
* `bytes` es la representación del contenedor en bytes
* `timestamp` es la hora cuando este nodo aceptó el contenedor
* `index` es el número de contenedores que fueron aceptados en este index antes de este
* `encoding` es `"cb58"` o `"hex"`

#### **Llamada de ejemplo**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByID",
    "params": {
        "containerID": "6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Respuesta de ejemplo**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" : {
      "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
      "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
      "timestamp":"2021-04-02T15:34:00.262979-07:00",
      "encoding":"hex",
      "index":"0"
    }
}
```

### index.getContainerRange

Devuelve los contenedores con índices en [`startIndex`, `startIndex+1`, ... , `startIndex` + `numToFetch` - 1]. `numToFetch` debe estar en `[0,1024]`.

#### **Firma**

```cpp
index.getContainerRange({
  startIndex: uint64,
  numToFetch: uint64,
  encoding: string
}) -> []{
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` es la identificación del contenedor.
* `bytes` es la representación del contenedor en bytes
* `timestamp` es la hora cuando este nodo aceptó el contenedor
* `index` es el número de contenedores que fueron aceptados en este index antes de este
* `encoding` es `"cb58"` o `"hex"`

#### **Llamada de ejemplo**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerRange",
    "params": {
        "startIndex":0,
        "numToFetch":100,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Respuesta de ejemplo**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :[{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }]
}
```

### index.getIndex

Obtén el index de un contenedor.

#### **Firma**

```cpp
index.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

donde `encoding` es `"cb58"` o `"hex"`.

#### **Llamada de ejemplo**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getIndex",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Respuesta de ejemplo**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "index":"0"
    },
  "id":1
}
```

### index.isAccepted

Arroja "true" si el contenedor está en este index.

#### **Firma**

```cpp
index.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Llamada de ejemplo**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.isAccepted",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **Respuesta de ejemplo**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "isAccepted": true
    },
  "id":1
}
```

