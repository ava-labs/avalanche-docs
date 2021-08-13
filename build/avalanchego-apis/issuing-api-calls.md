# Emisión de llamadas de API

Esta guía explica cómo hacer llamadas a las API expuestas por los nodos Avalanche.

### Endpoint<a id="endpoint"></a>

Una llamada API se realiza hasta un punto final, que es una URL. La base de la URL es siempre:

`[node-ip]:[http-port]`

donde se puede encontrar

* `node-ip` es la dirección IP del nodo a la que se llama.
* `http-port` es el puerto en el que el nodo escucha las llamadas HTTP. Esto se especifica por [el argumento de línea de comandos](../references/command-line-interface.md#http-server) `http-port` \(valor predeterminado `9650`\).

Por ejemplo, la URL de base podría parecer así: `127.0.0.1:9650`.

La documentación de cada API especifica a qué punto final debe hacer llamadas un usuario para acceder a los métodos de la API.

## API formateadas JSON RPC

Varias API integradas usan el formato [JSON RPC 2.0](https://www.jsonrpc.org/specification) para describir sus peticiones y respuestas. Tales API incluyen la API de plataforma y la API de cadena X.

### Hacer una solicitud de JSON RPC

Supongamos que queremos llamar al método `getTxStatus` de la API de [Cadena X](exchange-chain-x-chain-api.md). La documentación de API de cadena X nos dice que el punto final de esta API es `/ext/bc/X`.

Eso significa que el punto final a que enviamos nuestra llamada API es:

`[node-ip]:[http-port]/ext/bc/X`

La documentación de API de cadena X nos dice que la firma de `getTxStatus` es:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

dónde:

* El `txID` de argumento es el ID de la transacción de la que estamos recibiendo el estado.
* `El estado` de valor devuelto es el estado de la transacción en cuestión.

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

* `jsonrpc` especifica la versión del protocolo JSON RPC. \(En la práctica es siempre 2.0\)
* `método` especifica el servicio \(`avm`\) y el método \(`getTxStatus`\) que queremos invocar.
* `params` especifica los argumentos al método.
* `ID` es el ID de esta petición. Las identificaciones de solicitud deben ser únicas.

¡Eso es todo!

### Respuesta de éxito JSON RPC

Si la llamada tiene éxito, la respuesta se verá así:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id` es el ID de la solicitud que corresponde a esta respuesta.
* `el resultado` es los valores devuelta de `getTxStatus`.

### Respuesta de error JSON RPC

Si el método API invocado devuelve un error, la respuesta tendrá un `error` de campo en lugar de `resultado`. Además, hay un campo adicional, `datos`, que contiene información adicional sobre el error que ocurrió.

Tal respuesta parecería que:

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

## Otros formatos de API

Algunas API pueden utilizar un estándar distinto del JSON RPC 2.0 para formatear sus peticiones y respuestas. Dicha prórroga debería especificar cómo hacer llamadas y analizar las respuestas a ellos en su documentación.

## Envío y recepción de Bytes

A menos que se indique lo contrario, cuando los bytes se envían en una llamada / respuesta de la API, están en representación de [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58), una codificación base-58 con una suma de verificación

