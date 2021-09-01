# API de IPC

La API de IPC permite a los usuarios crear sockets de dominio UNIX para que las cadenas de bloques publiquen. Cuando la cadena de bloques acepta un vértice / bloque, lo publicará en un socket y las decisiones contenidas en su interior se publicarán en otro.

Un nodo solo expondrá esta API si se inicia con [el argumento de la línea](../references/command-line-interface.md) de `api-ipcs-enabled=true`comandos.

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

Los nombres de las tomas son del formulario `<network_id>-<chain_id>-<event_type>`donde `<event_type>`está ya sea o `consensus`.`decisions` El socket de consenso recibe vértices y bloques y mientras el socket de decisiones recibe transacciones individuales.

## Format

Esta API utiliza el formato `json 2.0`RPC.

## Endpoint / Extremo

`/ext/ipcs`

## Metodos

### ipcs.publishBlockchain

Registra una cadena de bloques para que publique los vértices aceptados en un socket de dominio Unix.

#### **Firma**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID`es la blockchain que publicará vértices aceptados.
* `consensusURL`es la ruta del socket de dominio Unix a la que se publican vértices.
* `decisionsURL`es la ruta del socket de dominio Unix a las transacciones se publican.

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

#### **Respuesta de ejemplo**

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

#### **Firma**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID`es la blockchain que ya no publicará en un socket de dominio de Unix.

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

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

