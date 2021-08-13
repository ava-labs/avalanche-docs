# API IPC

La API IPC permite a los usuarios crear tomas de dominio UNIX para que blockchains publique. Cuando el blockchain acepte un vértice/bloque, lo publicará en un zócalo y las decisiones contenidas en el interior se publicarán a otro.

Un nodo solo expondrá esta API si se inicia con [el argumento de línea de comandos](../references/command-line-interface.md) `api-ipcs-enabled=true`.

## Formato de mensaje IPC

Los mensajes de enchufe consisten de un entero de 64 bits en formato BigEndian, seguido por muchos bytes.

Ejemplo:

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## Formato URL de Socket IPC

Los nombres de las tomas son del formulario `<network_id>-<chain_id>-<event_type>``` donde <event_type> es `consensuado` o `decisiones`. El enchufe de consenso recibe verticies y bloques y mientras que el toma de decisiones recibe transacciones individuales.

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC.

## Endpoint

`/ext/ipcs`

## Métodos de trabajo

### ipcs.publishBlockchain

Registre una cadena de bloques para que publique vértices aceptados a un socket de dominio Unix.

#### **Firma**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID` es el blockchain que publicará vértices aceptados.
* `consensusURL` es la ruta del enchufe de dominio Unix a la que se publican vértices.
* `decisionsURL` es la ruta del zócalo de dominio Unix a las transacciones se publican.

#### **Ejemplo de llamada**

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

Deregister una cadena de bloques para que ya no publique a un socket de dominio Unix.

#### **Firma**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID` es el blockchain que ya no publicará en un socket de dominio Unix.

#### **Ejemplo de llamada**

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

