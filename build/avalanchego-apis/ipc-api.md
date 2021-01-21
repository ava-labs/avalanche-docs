# IPC API

La API de IPC permite a los usuarios crear sockets de dominio UNIX para que las cadenas de bloques publiquen. Cuando la cadena de bloques acepta un vértice / bloque, lo publicará en un socket y las decisiones contenidas en su interior se publicarán en otro.

Un nodo solo expondrá esta API si se inicia con el [argumento de línea de comando](../references/command-line-interface.md) `api-ipcs-enabled=true`.

## IPC Message Format

Los mensajes de socket constan de un entero de 64 bits en formato BigEndian seguido de esa cantidad de bytes.

Ejemplo:

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## IPC Socket URL Format

Los nombres de los sockets tienen el formato `<network_id>-<chain_id>-<event_type>` donde `<event_type>` es `consensus` o` decisions`. El socket de consenso recibe vértices y bloques y mientras que el socket de decisiones recibe transacciones individuales.

The names of the sockets are of the form `<network_id>-<chain_id>-<event_type>` where `<event_type>` is either `consensus` or `decisions`. The consensus socket receives verticies and blocks and while the decisions socket recives individual transactions.

## Format

This API uses the `json 2.0` RPC format.

## Endpoint

`/ext/ipcs`

## Methods

### ipcs.publishBlockchain

Register a blockchain so it publishes accepted vertices to a Unix domain socket.

#### **Signature**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID` is the blockchain that will publish accepted vertices.
* `consensusURL` is the path of the Unix domain socket the vertices are published to.
* `decisionsURL` is the path of the Unix domain socket the transactions are published to.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.publishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

#### **Example Response**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "decisionsURL":"/tmp/1-11111111111111111111111111111111LpoYY-consensus",
        "consensusURL":"/tmp/1-11111111111111111111111111111111LpoYY-decisions"
    },
    "id":1
}
```

### ipcs.unpublishBlockchain

Deregister a blockchain so that it no longer publishes to a Unix domain socket.

#### **Signature**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID` is the blockchain that will no longer publish to a Unix domain socket.

#### **Example Call**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.unpublishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

#### **Example Response**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI1MjU1ODkyMF19
-->