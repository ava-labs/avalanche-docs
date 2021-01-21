# Emitiendo llamadas a la API

Esta guía explica cómo realizar llamadas a las API expuestas por los nodos de Avalanche.

### Endpoint <a id="endpoint"></a>

Una llamada a la API se hace al extremo, que es una URL. La base de la URL es siempre

`[node-ip]:[http-port]`

donde

* `node-ip` es la dirección IP del nodo a llamar.
* `http-port` es el puerto del nodo escuchando llamadas HTTP. Este es especificado mediante [argumento de línea de comandos](../references/command-line-interface.md#http-server) `http-port` \( Valor predeterminado `9650`\).

Por ejemplo, el URL base podría verse así: `127.0.0.1:9650`.

La documentación de cada API especifica a qué extremo un usuario debe realizar llamadas para acceder a los métodos de la API.

## APIs con formato JSON RPC

Varias API integradas utilizan el formato [JSON RPC 2.0](https://www.jsonrpc.org/specification) para describir sus peticiones y respuestas. Dichas API incluyen la API de Plataforma (P-Chain) y la API de X-Chain.

### Haciendo peticiones JSON RPC

Supongamos que queremos llamar al método `getTxStatus` de la[API de X-Chain](exchange-chain-x-chain-api.md).  La documentación de la API de X-Chain nos dice que el extremo de esta API es `/ext/bc/X`.

Eso significa que el extremo al que enviamos nuestra llamada API es:

`[node-ip]:[http-port]/ext/bc/X`

La documentación de la API de X-Chain nos dice que la firma de `getTxStatus` es:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

donde:

* El argumento `txID` es el ID de la transacción de la que obtenemos el estado.
* El valor devuelto  `status` es el estado de la transacción en cuestión.

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

* `jsonrpc` especifica la versión del protocolo JSON RPC. \(En la práctica siempre es 2.0\)
* `method` especifica el servicio \(`avm`\) y el método \(`getTxStatus` \) que queremos invocar.
* `params` especifica los argumentos del método.
* `id` es el ID de esta solicitud. Los ID de solicitud deben ser únicos.

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

* `id` es el ID de la solicitud a la que corresponde esta respuesta.
* `result` es el valor devuelto de `getTxStatus`.

### Respuesta JSON RPC Errónea

Si el método de API invocado devuelve un error, la respuesta tendrá un campo `error`  en lugar de `result`. Además, hay un campo adicional, `data` que contiene información adicional sobre el error que ocurrió.

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

A menos que se indique lo contrario, cuando se envían bytes en una llamada/respuesta de API, están en representación [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58), una codificación con base 58 con una suma de comprobación

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgwNjA0NDI4NV19
-->