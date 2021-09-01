# API de índice

AvalancheGo puede ser configurado para ejecutarse con un indexador. Es decir, guarda \(indexes\) cada contenedor \(un bloque, vértex o una transacción\) que acepta en la X-Chain, P-Chain y C-Chain. `--index-enabled`Para ejecutar AvalancheGo con la indexación habilitada, usa la bandera de la línea de comandos AvalancheGo solo indexará contenedores que se aceptan al ejecutar con `--index-enabled`. Para asegurar que tu nodo tenga un índice completo, ejecuten un nodo con una base de datos fresca y `--index-enabled`. El nodo aceptará cada block, vértex y transacción en el historial de la red durante la toma de arranque, asegurando que tu índice sea completo. Es bueno apagar tu nodo si se está ejecutando con la indexación habilitada. Si recomienza con la indexación aún habilitada, aceptará todos los contenedores aceptados mientras estaba fuera de línea. El indexador nunca debería dejar de marcar un bloque aceptado, vértex o una transacción.

Los contenedores de Indización \(es decir, bloques aceptados, vértices y transacciones\) se marcan con el momento en el que el nodo aceptó ese contenedor. Tenga en cuenta que si el contenedor fue indexado durante la toma de arranque, otros nodos pueden haber aceptado el contenedor mucho antes. Cada contenedor indexado durante la toma de arranque se marcará con el momento en el que el nodo bootstrapped, no cuando la red aceptó por primera.

Tenga en cuenta que para DAGs \(incluyendo la X-Chain\), pueden aceptar vértices y transacciones en un orden diferente entre sí.

Este documento muestra cómo consultar datos de la API de AvalancheGo. La API de índice solo está disponible al ejecutar con `--index-enabled`.

## Format

Esta API utiliza el formato `json 2.0`RPC. Para más información sobre la realización de llamadas RPC, mira [aquí](issuing-api-calls.md).

## Endpoints / Extremos

Cada cadena tiene uno o más índice. Para ver si se acepta un bloque de C-Chain por ejemplo, envía una llamada de API al índice de bloque de C-Chain Para ver si se acepta un bloque de X-Chain por ejemplo, envía una llamada de API al índice de bloque de X-Chain

### Transacciones de X-Chain

```text
/ext/index/X/tx
```

### Vértices de X-Chain

```text
/ext/index/X/vtx
```

### Bloques de P-Chain

```text
/ext/index/P/block
```

### Bloques de C-Chain

```text
/ext/index/C/block
```

## API Methods

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

donde:

* `id`es el ID del contenedor
* `bytes`es la representación de byte del contenedor
* `timestamp`es el momento en que este nodo aceptó
* `index`es cuántos contenedores fueron aceptados en este índice antes de éste
* `encoding`es `"cb58"`o`"hex"`

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

Obtén contenedor por índice. El primer contenedor aceptado es en el índice 0, el segundo está en el índice 1, etc.

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

* `id`es el ID del contenedor
* `bytes`es la representación de byte del contenedor
* `timestamp`es el momento en que este nodo aceptó
* `index`es cuántos contenedores fueron aceptados en este índice antes de éste
* `encoding`es `"cb58"`o`"hex"`

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

### index.getContainerRange

`startIndex+1`Devuelve contenedores con índices en [, `startIndex`..., `startIndex`\+ - `numToFetch`1]. `numToFetch`debe estar en .`[0,1024]`

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

* `id`es el ID del contenedor
* `bytes`es la representación de byte del contenedor
* `timestamp`es el momento en que este nodo aceptó
* `index`es cuántos contenedores fueron aceptados en este índice antes de éste
* `encoding`es `"cb58"`o`"hex"`

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

Obtén el índice de un contenedor.

#### **Firma**

```cpp
info.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

donde `encoding`es `"cb58"`o .`"hex"`

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

Regresa verdad si el contenedor está en este índice.

#### **Firma**

```cpp
info.isAccepted({
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

