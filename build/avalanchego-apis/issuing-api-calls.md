# API Calls Emitidas

Esta guía explica cómo realizar llamadas a las API expuestas por los nodos de Avalanche.

### Endpoint<a id="endpoint"></a>

Una llamada a la API se hace al extremo, que es una URL. La base de la URL es siempre

`[node-ip]:[http-port]`

donde

* `node-ip`es la dirección IP del nodo al que se llama.
* `http-port`es el puerto el nodo que escucha para las llamadas HTTP. Esto se especifica por [el argumento de la línea de comandos](../references/command-line-interface.md#http-server) \(valor por `http-port``9650`defecto\).

Por ejemplo, la URL de base puede parecer así: `127.0.0.1:9650`.

La documentación de cada API especifica a qué extremo un usuario debe realizar llamadas para acceder a los métodos de la API.

## APIs con formato JSON RPC

Varias API integradas usan el formato [JSON RPC 2.0](https://www.jsonrpc.org/specification) para describir sus peticiones y respuestas. Dichas API incluyen la API de Plataforma \(P-Chain\) y la API de X-Chain.

### Haciendo peticiones JSON RPC

Supongamos que queremos llamar el `getTxStatus`método de la [API](exchange-chain-x-chain-api.md) de X-Chain La documentación de la API de X-Chain nos dice que el punto de extremo es `/ext/bc/X`.

Eso significa que el extremo al que enviamos nuestra llamada API es:

`[node-ip]:[http-port]/ext/bc/X`

La documentación de la API de X-Chain nos dice que la firma `getTxStatus`es:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

donde:

* Argumento `txID`es el ID de la transacción que estamos recibiendo el estado.
* El valor devuelto `status`es el estado de la transacción en cuestión.

Para llamar a este método, entonces:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :4,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

* `jsonrpc`especifica la versión del protocolo RPC JSON. \(En la práctica siempre es 2.0\)
* `method`especifica el servicio \(\) `avm`y el método \(\) `getTxStatus`que queremos invocar.
* `params`Especifica los argumentos al método.
* `id`es el ID de esta petición. Los ID de solicitud deben ser únicos.

¡Eso es todo!

### Respuestas JSON RPC Exitosas

Si la llamada es exitosa, la respuesta se verá así:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id`es el ID de la solicitud a la que corresponde esta respuesta.
* `result`es los valores devueltos`getTxStatus`

### Respuesta JSON RPC Errónea

Si el método de API invocado devuelve un error, entonces la respuesta tendrá un campo `error`en lugar de .`result` `data`Además, hay un campo extra, que contiene información adicional sobre el error que ocurrió.

Dicha respuesta se verá como:

```cpp
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32600,
        "message": "[Some error message here]",
        "data": [Object with additional information about the error]
    },
    "id": 1
}
```

## Otros Formatos de API

Algunas API pueden utilizar un estándar distinto de JSON RPC 2.0 para formatear sus solicitudes y respuestas. Dicha extensión debe especificar cómo realizar llamadas y analizar las respuestas a ellas en su documentación.

## Enviando y Recibiendo Bytes

A menos que se indique lo contrario, cuando los bytes se envían en una llamada/respuesta de la API, están en la representación de [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58), una codificación de la base-58 con una suma de verificación

