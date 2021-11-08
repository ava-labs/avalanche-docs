# Sustitución de Ortelius con las API del Index

Esta guía explica cómo sustituir el uso de [la API de Ortelius](ortelius.md) con otras API, incluyendo [la API del Index de AvalancheGo](../avalanchego-apis/index-api.md). **Ortelius es obsoleto. Debes usar otras API para obtener la información que obtenías desde Ortelius.**

## API del Index
AvalancheGo se puede configurar para ejecutarse con un indexador. Es decir, guarda (indexa) cada contenedor (un bloque, un vértice o una transacción) que acepta en la X-Chain, la P-Chain y la C-Chain. Para ejecutar AvalancheGo con la indexación habilitada hay que utilizar el indicador de la línea de comandos `--index-enabled`. AvalancheGo solo indexa los contenedores que son aceptados cuando se ejecuta con `--index-enabled`. Para más información, consulta [la documentación de la API del Index.](../avalanchego-apis/index-api.md) Por favor, asegúrate de leer la documentación de la API del Index en su totalidad.

A continuación, damos instrucciones sobre cómo usar la API del Index para:
* Obtener el número total de bloques o transacciones que han sido aceptadas
* Obtener un bloque o una transacción por su ID

## Obtener el conteo total de bloques o transacciones

Puedes usar la API del Index para obtener el número de bloques, vértices o transacciones que han sido aceptadas en una cadena dada. Puedes usar `curl` o el método [getLastAccepted](../avalanchego-apis/index-api.md#index.getlastaccepted) del cliente de la API del Index para lograrlo.

En los ejemplos a continuación, obtendremos el número de transacciones de la X-Chain que han sido aceptadas.
* Para obtener el número de bloques aceptados de la C-Chain, reemplaza `/ext/index/X/tx` con `/ext/index/C/block` a continuación.
* Para obtener el número de bloques aceptados de P-Chain, reemplaza `/ext/index/X/tx` con `/ext/index/P/block`.
* Para obtener el número de vértices aceptados de la X-Chain, reemplaza `/ext/index/X/tx` con `/ext/index/X/vtx`.

### Cliente de la API del Index

```go
package main

import (
	"fmt"
	"time"

	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/utils/formatting"
)

func main() {
	client := indexer.NewClient("http://localhost:9650", "/ext/index/X/tx", 5*time.Second)
	args := &indexer.GetLastAcceptedArgs{Encoding: formatting.Hex}
	container, err := client.GetLastAccepted(args)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%d transactions have been accepted", container.Index+1)
}
```

### curl

Puedes usar `curl` para obtener el número de bloques, vértices o transacciones que han sido aceptados en una cadena dada.

**Llamada de ejemplo**
```sh
curl --location --request POST 'http://localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"hex"
    },
    "id": 1
}' | jq
```

**Respuesta de ejemplo**

(Hay que anotar que el campo `bytes` ha sido recortado en aras de la brevedad).

```json
{
  "jsonrpc": "2.0",
  "result": {
    "id": "2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ",
    "bytes": "0x00000000000000000001ed5f383...",
    "timestamp": "2021-10-21T20:55:27.616393152Z",
    "encoding": "hex",
    "index": "2683522"
  },
  "id": 1
}
```

El ID de la transacción de la X-Chain aceptada más recientemente es `2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ`.
 Como el `index` de la última transacción es `2683522`, las transacciones `2683523` de la X-Chain han sido aceptadas.

## Obtención de una transacción, boloque o vértice por ID

Puedes obtener contenedores por su ID usando la API del Index. También puedes usar API específicas de la cadena.

### Cliente de la API del Index

El fragmento a continuación usa el método [getContainerByID](../avalanchego-apis/index-api.md#index.getcontainerbyid) del cliente de la API del Index para obtener un contenedor la X-Chain por su ID.
* Para obtener un bloque de la C-Chain, reemplaza `/ext/index/X/tx` con `/ext/index/C/block` a continuación.
* Para obtener un bloque de la P-Chain, reemplaza `/ext/index/X/tx` con `/ext/index/P/block`.
* Para obtener un vértice de la X-Chain, reemplaza `/ext/index/X/tx` con `/ext/index/X/vtx`.

```go
package main

import (
	"fmt"
	"time"

	"github.com/ava-labs/avalanchego/ids"
	"github.com/ava-labs/avalanchego/indexer"
	"github.com/ava-labs/avalanchego/utils/formatting"
)

func main() {
	client := indexer.NewClient("http://localhost:9650", "/ext/index/X/tx", 5*time.Second)
	containerID, err := ids.FromString("2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ")
	if err != nil {
		panic(err)
	}
	args := &indexer.GetIndexArgs{
		ContainerID: containerID,
		Encoding:    formatting.Hex,
	}
	container, err := client.GetContainerByID(args)
	if err != nil {
		panic(err)
	}
	containerBytes, err := formatting.Decode(container.Encoding, container.Bytes)
	if err != nil {
		panic(err)
	}
	fmt.Printf("container: %v\n", containerBytes)
}
```

`curl` ejemplo de `getContainerByID` se puede encontrar [aquí](../avalanchego-apis/index-api.md#index.getcontainerbyid).


### API específicas de la cadena

#### X-Chain

Puedes usar el método [avm.getTx](../avalanchego-apis/exchange-chain-x-chain-api.md#avm.gettx) de la API de la X-Chain para obtener una transacción de la X-Chain por su ID. Configura `encoding` en `json` para obtener una respuesta JSON apta para lectura humana.

**Llamada de ejemplo**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"2W1vuBmkapdCfRXMKbUH6BQCaTycrztxkuuBPdAfe96DanCvqZ",
        "encoding": "json"
    }
}' -H 'content-type:application/json;' http://localhost:9650/ext/bc/X | jq
```

**Respuesta de ejemplo**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "tx": {
      "unsignedTx": {
        "networkID": 1,
        "blockchainID": "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
        "outputs": [
          {
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "X-avax1c284te00gjeph54wh8jy5zdlc5k6qjkkgjuz5g"
              ],
              "amount": 50000000000,
              "locktime": 0,
              "threshold": 1
            }
          },
          {
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "output": {
              "addresses": [
                "X-avax1pgqxa6qw87wajaezvu02myyy8cctjl5y3hv02s"
              ],
              "amount": 55027917498,
              "locktime": 0,
              "threshold": 1
            }
          }
        ],
        "inputs": [
          {
            "txID": "23D2DrDg4apGW7sz3gGEXkx6wz4wMkuT8ru7s39p8K5vyvkinz",
            "outputIndex": 1,
            "assetID": "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z",
            "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
            "input": {
              "amount": 105028917498,
              "signatureIndices": [
                0
              ]
            }
          }
        ],
        "memo": "0x43727974706f2e636f6d"
      },
      "credentials": [
        {
          "fxID": "spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
          "credential": {
            "signatures": [
              "0x5943457d6a7e370e0ed239715f04bf4ba7545a9d3440a848d52db97aece6f51c7c87ba9aa944327f63dd39feeec9ad978b23855fe1b081bc7159a2d4f8f027b600"
            ]
          }
        }
      ]
    },
    "encoding": "json"
  },
  "id": 1
}
```


#### P-Chain

Puedes usar el método [platform.getTx](../avalanchego-apis/platform-chain-p-chain-api.md#platform.gettx) de la API de la P-Chain para obtener una transacción de la P-Chain por su ID.

#### C-Chain

Puedes usar la API de la C-Chain para obtener una transacción por su ID, un bloque por su ID o un bloque por su altura. Consulta `eth_getTransactionByHash`, `eth_getBlockByHash` y `eth_getBlockByNumber` [aquí](https://eth.wiki/json-rpc/API).

