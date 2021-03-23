---
description: >-
  Cette API peut être utilisée pour accéder aux informations de base sur le
  nœud.
---

# API Info

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoint

```cpp
/ext/info
```

## API Méthodes

### info.getBlockchainID

Étant donné l'alias d'une blockchain, obtenez son identifiant. \(Voir [admin.aliasChain](admin-api.md) pour plus de contexte.\)

**Signature**

```cpp
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

**Exemple d'un Appel**

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

**Exemple de Réponse**

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

Obtenez l'ID du réseau auquel ce nœud participe.

**Signature**

```cpp
info.getNetworkID() -> {networkID:int}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

**Exemple de Réponse**

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

Obtenez le nom du réseau auquel ce nœud participe.

**Signature**

```cpp
info.getNetworkName() -> {networkName:string}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

**Exemple de Réponse**

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

Obenir l'Id du nœud

**Signature**

```cpp
info.getNodeID() -> {nodeID: string}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

### info.getNodeVersion

Obenir la version du nœud.

**Signature**

```cpp
info.getNodeVersion() -> {version: string}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/0.5.7"
    },
    "id": 1
}
```

### info.isBootstrapped

Vérifiez si une chaîne donnée a terminé le boostraping

**Signature**

```cpp
info.isBootstrapped(chain: string) -> {isBootstrapped: bool}
```

* `chain` est l'ID ou l'alias de la chaîne..

**Exemple d'un Appel**

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

**Exemple de Réponse**

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

Obtenir une description des connexions de vos pairs.

**Signature**

```cpp
info.peers() -> {peers:[]{
    ip: string,
    publicIP: string,
    nodeID: string,
    version: string,
    lastSent: string,
    lastRecevied: string
}}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
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

Obtenez les frais de transaction du réseau.

**Signature**

```cpp
info.getTxFee() -> {txFee:uint64}
```

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txFee": "1000000"
    }
}
```

