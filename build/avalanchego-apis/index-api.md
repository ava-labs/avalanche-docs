# API de índice

AvalancheGo se puede configurar para ejecutar con un indexador. Es decir, guarda \(indexes\) cada contenedor \(un bloque, vértice o transacción\) que acepta en la Cadena X, Cadena P y C-Chain. Para ejecutar AvalancheGo con la indexación habilitada, utilice la bandera de línea de comandos `--index-enabled`. AvalancheGo solo indexará contenedores que se aceptan cuando se ejecuta con `--index-enabled`. Para asegurar que su nodo tenga un índice completo, ejecute un nodo con una base de datos fresca y `--index-enabled`. El nodo aceptará todos los bloqueos, vértice y transacción en el historial de red durante el arranque de arranque, asegurando que su índice esté completo. Está bien apagar su nodo si se está ejecutando con la indexación habilitada. Si reinicia con la indexación aún activada, aceptará todos los contenedores que fueron aceptados mientras estaba sin conexión. El indexador nunca debe dejar de indexar un bloque, vértice o transacción.

Los contenedores indizados \(es decir, bloques aceptados, vértices y transacciones) se marcan con el momento en que el nodo aceptó ese contenedor. Tenga en cuenta que si el contenedor fue indexado durante el arranque de arranque, otros nodos pueden haber aceptado el contenedor mucho antes. Cada contenedor indexado durante el arranque se marcará con el momento en que el nodo se trabó, no cuando fue aceptado por primera vez por la red.

Tenga en cuenta que para DAGs \(incluyendo la X-Chain\), los nodos pueden aceptar vértices y transacciones en un orden diferente entre sí.

Este documento muestra cómo consultar datos de la API de AvalancheGo's Index API. La API de índice solo está disponible cuando se ejecuta con `--index-enabled`.

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC. Para obtener más información sobre hacer llamadas JSON RPC, vea [aquí](issuing-api-calls.md).

## Puntos de partida

Cada cadena tiene uno o más índice. Para ver si se acepta un bloque de cadena C, por ejemplo, envíe una llamada API al índice de bloque de cadena C. Para ver si se acepta un bloque de cadena X, por ejemplo, envíe una llamada API al índice de bloque de cadena X.

### Transacciones de cadena X

```text
/ext/index/X/tx
```

### Vértices de cadena X

```text
/ext/index/X/vtx
```

### Bloques de cadena P

```text
/ext/index/P/block
```

### Bloques de cadena C

```text
/ext/index/C/block
```

## Métodos de API

### index.getLastAccepted

Obtén el contenedor más recientemente aceptado.

#### **Firma**

```cpp
info.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

dónde:

* `id` es el ID del contenedor
* `bytes` es la representación de bytes del contenedor
* `timestamp` es el momento en que este nodo aceptó el contenedor
* `índice` es cuántos contenedores fueron aceptados en este índice antes de este
* `La codificación` es `"cb58"` o `"hex"`

#### **Ejemplo de llamada**

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

Consigue el contenedor por índice. El primer contenedor aceptado está en el índice 0, el segundo está en el índice 1, etc.

#### **Firma**

```cpp
info.getContainerByIndex({
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

* `id` es el ID del contenedor
* `bytes` es la representación de bytes del contenedor
* `timestamp` es el momento en que este nodo aceptó el contenedor
* `índice` es cuántos contenedores fueron aceptados en este índice antes de este
* `La codificación` es `"cb58"` o `"hex"`

#### **Ejemplo de llamada**

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

### index.getContainerRange

Devuelve contenedores con índices en `\[startIndex`, `startIndex+1`, ... , `startIndex` + `numToFetch``` - 1\]. numToFetch debe estar en `[0,1024]`.

#### **Firma**

```cpp
info.getContainerRange({
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

* `id` es el ID del contenedor
* `bytes` es la representación de bytes del contenedor
* `timestamp` es el momento en que este nodo aceptó el contenedor
* `índice` es cuántos contenedores fueron aceptados en este índice antes de este
* `La codificación` es `"cb58"` o `"hex"`

#### **Ejemplo de llamada**

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

Consigue el índice de un contenedor.

#### **Firma**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

cuando `la codificación` sea `"cb58"` o `"hex"`.

#### **Ejemplo de llamada**

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

Devuelve cierto si el contenedor está en este índice.

#### **Firma**

```cpp
info.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Ejemplo de llamada**

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

