# Info API

Esta API se puede utilizar para acceder a la información básica sobre el nodo.

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC. Para obtener más información sobre hacer llamadas JSON RPC, vea [aquí](issuing-api-calls.md).

## Endpoint

```text
/ext/info
```

## Métodos de API

### info.getBlockchainID

Dado el alias de un blockchain, obtenga su ID. \(Ver [`admin.aliasChain`](admin-api.md#admin-aliaschain). \)

#### **Firma**

```cpp
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getBlockchainID",
    "params": {
        "alias":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "blockchainID":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}
```

### info.getNetworkID

Consigue el ID de la red en la que participa este nodo.

#### **Firma**

```cpp
info.getNetworkID() -> {networkID:int}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "networkID":"2"
    }
}
```

### info.getNetworkName

Consigue el nombre de la red en la que participa este nodo.

#### **Firma**

```cpp
info.getNetworkName() -> {networkName:string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "networkName":"local"
    }
}
```

### info.getNodeID

Consigue el ID de este nodo.

#### **Firma**

```cpp
info.getNodeID() -> {nodeID: string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

### info.getNodeIP

Consigue la IP de este nodo.

#### **Firma**

```text
info.getNodeIP() -> {ip: string}
```

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeIP"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "ip": "192.168.1.1:9651"
    },
    "id": 1
}
```

### info.getNodeVersion

Consigue la versión de este nodo.

#### **Firma**

```cpp
info.getNodeVersion() -> {
    version: string,
    databaseVersion: string,
    gitCommit: string,
    vmVersions: map[string]string,
}
```

dónde:

* `versión` es la versión de este nodo
* `databaseVersion` es la versión de la base de datos que este nodo está utilizando
* `gitCommit` es el compromiso Git de que este nodo fue construido desde
* `vmVersions` es mapa donde cada par de teclas / valor es el nombre de un VM, y la versión de ese VM este nodo se ejecuta

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.10",
        "databaseVersion": "v1.4.5",
        "gitCommit": "a3930fe3fa115c018e71eb1e97ca8cec34db67f1",
        "vmVersions": {
            "avm": "v1.4.10",
            "evm": "v0.5.5-rc.1",
            "platform": "v1.4.10"
        }
    },
    "id": 1
}
```

### info.isBootstrapped

Compruebe si una cadena dada se realiza el arranque

#### **Firma**

```cpp
info.isBootstrapped({chain: string}) -> {isBootstrapped: bool}
```

`cadena` es el ID o alias de una cadena.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

### info.peers

Obtener una descripción de las conexiones entre pares.

#### **Firma**

```cpp
info.peers({
    nodeIDs: string[] // optional
}) ->
{
    numPeers: int,
    peers:[]{
        ip: string,
        publicIP: string,
        nodeID: string,
        version: string,
        lastSent: string,
        lastReceived: string
    }
}
```

* NodeIDs es un parámetro opcional para especificar qué descripciones de `nodeIDs` deben ser devueltas . Si este parámetro está dejado vacío, se devolverán las descripciones de todas las conexiones activas. Si el nodo no está conectado a un nodo especificado, se omitirá de la respuesta.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers",
    "params": {
        "nodeIDs": []
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "numPeers":3,
        "peers":[
          {
             "ip":"206.189.137.87:9651",
             "publicIP":"206.189.137.87:9651",
             "nodeID":"NodeID-8PYXX47kqLDe2wD4oPbvRRchcnSzMA4J4",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:57Z"
          },
          {
             "ip":"158.255.67.151:9651",
             "publicIP":"158.255.67.151:9651",
             "nodeID":"NodeID-C14fr1n8EYNKyDfYixJ3rxSAVqTY3a8BP",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:34Z"
          },
          {
             "ip":"83.42.13.44:9651",
             "publicIP":"83.42.13.44:9651",
             "nodeID":"NodeID-LPbcSMGJ4yocxYxvS2kBJ6umWeeFbctYZ",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:55Z"
          }
        ]
    }
}
```

### info.getTxFee

Consigue las tarifas de la red.

#### **Firma**

```cpp
info.getTxFee() ->
{
    creationTxFee: uint64,
    txFee: uint64
}
```

* `creationTxFee` es la cuota por crear activos en la red.
* `txFee` es la cuota por realizar transacciones en la red.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Respuesta de ejemplo**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "creationTxFee": "10000000",
        "txFee": "1000000"
    }
}
```

