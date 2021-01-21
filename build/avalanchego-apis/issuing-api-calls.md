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
* Returned value `status` is the status of the transaction in question.
* El valor devuelto  `status` es el estado de la transacción en cuestión.

To call this method, then:

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

* `jsonrpc` specifies the version of the JSON RPC protocol. \(In practice is always 2.0\)
* `method` specifies the service \(`avm`\) and method \(`getTxStatus`\) that we want to invoke.
* `params` specifies the arguments to the method.
* `id` is the ID of this request. Request IDs should be unique.

That’s it!

### JSON RPC Success Response

If the call is successful, the response will look like this:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id` is the ID of the request that this response corresponds to.
* `result` is the returned values of `getTxStatus`.

### JSON RPC Error Response

If the API method invoked returns an error then the response will have a field `error` in place of `result`. Additionally, there is an extra field, `data`, which holds additional information about the error that occurred.

Such a response would look like:

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

## Other API Formats

Some APIs may use a standard other than JSON RPC 2.0 to format their requests and responses. Such extension should specify how to make calls and parse responses to them in their documentation.

## Sending and Receiving Bytes

Unless otherwise noted, when bytes are sent in an API call/response, they are in [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58) representation, a base-58 encoding with a checksum

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTM4MjgxNDE0OV19
-->