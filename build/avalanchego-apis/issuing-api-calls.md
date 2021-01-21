# Emitiendo llamadas a la API

Esta guía explica cómo realizar llamadas a las API expuestas por los nodos de Avalanche.

### Endpoint <a id="endpoint"></a>

Una llamada a la API se hace al extremo, que es una URL. La base de la URL es siempre

`[node-ip]:[http-port]`

donde

* `node-ip` es la dirección IP del nodo a llamar.
* `http-port` es el puerto del nodo escuchando llamadas HTTP.is the port the node listens on for HTTP calls. This is specified by [command-line argument](../references/command-line-interface.md#http-server) `http-port` \(default value `9650`\).

For example, the base URL might look like this: `127.0.0.1:9650`.

Each API’s documentation specifies what endpoint a user should make calls to in order to access the API’s methods.

## JSON RPC Formatted APIs

Several built-in APIs use the [JSON RPC 2.0](https://www.jsonrpc.org/specification) format to describe their requests and responses. Such APIs include the Platform API and the X-Chain API.

### Making a JSON RPC Request

Suppose we want to call the `getTxStatus` method of the [X-Chain API](exchange-chain-x-chain-api.md). The X-Chain API documentation tells us that the endpoint for this API is `/ext/bc/X`.

That means that the endpoint we send our API call to is:

`[node-ip]:[http-port]/ext/bc/X`

The X-Chain API documentation tells us that the signature of `getTxStatus` is:

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

where:

* Argument `txID` is the ID of the transaction we’re getting the status of.
* Returned value `status` is the status of the transaction in question.

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
eyJoaXN0b3J5IjpbOTM2NTQyMDUxXX0=
-->