# API de IPC

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

Los nombres de los sockets tienen el formato `<network_id>-<chain_id>-<event_type>` donde `<event_type>` es `consensus` o`decisions`. El socket de consenso recibe vértices y bloques y mientras el socket de decisiones recibe transacciones individuales.

## Formato

Esta API utiliza formatos RPC `json 2.0`.

## Endpoint / Extremo

`/ext/ipcs`

## Métodos

### ipcs.publishBlockchain

Registra una cadena de bloques para que publique los vértices aceptados en un socket de dominio Unix.

#### **Firma**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID` es la cadena de bloques que publicará los vértices aceptados.
* `consensusURL` es la ruta del socket de dominio Unix en el que se publican los vértices.
* `decisionsURL` es la ruta del socket de dominio Unix en el que se publican las transacciones.

#### **Llamada de ejemplo**

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

#### **Respuesta ejemplo**

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

Dar de baja una cadena de bloques para que ya no se publique en un socket de dominio Unix.

#### **Signature**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID` es la cadena de bloques que ya no publicará en un socket de dominio Unix.

#### **Llamada de ejemplo**

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

#### **Respuesta ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

