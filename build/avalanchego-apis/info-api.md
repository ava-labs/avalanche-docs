# Info API

Cette API peut être utilisée pour accéder aux informations de base sur le nœud.

## Format

Cette API utilise le `json 2.0` format RPC. Pour plus d'informations sur les appels JSON RPC, voir [ici](issuing-api-calls.md).

## Point de terminaison

```text
/ext/info
```

## Méthodes API

### info.getBlockchainID

Accordé un alias d'une blockchain, obtenez son ID. (Voir [`admin.aliasChain`](admin-api.md#admin-aliaschain).)

#### **Signature**

```cpp
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez l'ID du réseau auquel participe ce nœud.

#### **Signature**

```cpp
info.getNetworkID() -> {networkID:int}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

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

Obtenez le nom du réseau auquel participe ce nœud.

#### **Signature**

```cpp
info.getNetworkName() -> {networkName:string}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

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

Obtenez l'ID de ce nœud.

#### **Signature**

```cpp
info.getNodeID() -> {nodeID: string}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

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

Obtenez l'IP de ce nœud.

#### **Signature**

```text
info.getNodeIP() -> {ip: string}
```

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeIP"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

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

Obtenez la version de ce nœud.

#### **Signature**

```cpp
info.getNodeVersion() -> {
    version: string,
    databaseVersion: string,
    gitCommit: string,
    vmVersions: map[string]string,
}
```

où :

* `version`est la version de ce nœud
* `databaseVersion`est la version de la base de données que ce nœud utilise
* `gitCommit` est la validation Git à partir de laquelle ce nœud a été construit.
* `vmVersions` est une carte où chaque paire clé/valeur est le nom d'une VM, et la version de cette VM que ce nœud exécute.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

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

Vérifier si une chaîne donnée a fini de s'amorcer

#### **Signature**

```cpp
info.isBootstrapped({chain: string}) -> {isBootstrapped: bool}
```

`chain`est l'ID ou l'alias d'une chaîne.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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

Obtenez une description des connexions par des pairs.

#### **Signature**

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
        lastReceived: string,
        benched: string[],
        observedUptime: int,
    }
}
```

* `nodeIDs`est un paramètre facultatif pour spécifier quelles descriptions de NodeID doivent être renvoyées. Si ce paramètre est laissé vide, des descriptions de toutes les connexions actives seront renvoyées. Si le nœud n'est pas connecté à un nodeID spécifié, il sera omis de la réponse.
* `ip`est l'IP distant du pair.
* `publicIP`est l'IP publique du pair.
* `nodeID`est l'ID du nœud préfixé du pair.
* `version`montre la version sur laquelle le pair fonctionne.
* `lastSent`est l'horodatage du dernier message envoyé au pair.
* `lastReceived`est l'horodatage du dernier message reçu du pair.
* `benched` montre les ID de chaîne que le pair est en cours d'analyse.
* `observedUptime`est le temps de fonctionnement de ce nœud observé par le pair.

#### **Exemple d'appel**

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

#### **Exemple de réponse**

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
             "lastReceived":"2020-06-01T15:22:57Z",
             "benched": [],
             "observedUptime": "99",
          },
          {
             "ip":"158.255.67.151:9651",
             "publicIP":"158.255.67.151:9651",
             "nodeID":"NodeID-C14fr1n8EYNKyDfYixJ3rxSAVqTY3a8BP",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:34Z",
             "benched": [],
             "observedUptime": "75",
          },
          {
             "ip":"83.42.13.44:9651",
             "publicIP":"83.42.13.44:9651",
             "nodeID":"NodeID-LPbcSMGJ4yocxYxvS2kBJ6umWeeFbctYZ",
             "version":"avalanche/0.5.0",
             "lastSent":"2020-06-01T15:23:02Z",
             "lastReceived":"2020-06-01T15:22:55Z",
             "benched": [],
             "observedUptime": "95",
          }
        ]
    }
}
```

### info.getTxFee

Obtenez les frais du réseau.

#### **Signature**

```cpp
info.getTxFee() ->
{
    creationTxFee: uint64,
    txFee: uint64
}
```

* `creationTxFee`est le prix pour créer des actifs sur le réseau.
* `txFee` est le prix à payer pour effectuer des transactions sur le réseau.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

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

### info.uptime<a id="info-uptime"></a>

Renvoie le temps de fonctionnement du réseau observé de ce nœud.

#### **Signature**

```cpp
info.uptime() ->
{
    rewardingStakePercentage: float64,
    weightedAveragePercentage: float64
}
```

* `rewardingStakePercentage` est le pourcentage de la mise qui pense que ce nœud est au-dessus de l'exigence de temps de fonctionnement.
* `weightedAveragePercentage` est la moyenne pondérée de la stake de tous les temps de fonctionnement observés pour ce nœud.

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.uptime"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Exemple de réponse**

```cpp
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result": {
        "rewardingStakePercentage": "100.0000",
        "weightedAveragePercentage": "99.0000"
    }
}
```
