# Info API

This API can be used to access basic information about the node.

## Format

This API uses the `json 2.0` RPC format. For more information on making JSON RPC calls, see [here](issuing-api-calls.md).

## Endpoint

```text
/ext/info
```

## API Methods

### info.getBlockchainID

Given a blockchain’s alias, get its ID. \(See [`admin.aliasChain`](admin-api#admin-aliaschain)for more context.\)

#### **Signature**

```text
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getBlockchainID",
    "params": {
        "alias":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "blockchainID":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM"
    }
}
```

### info.getNetworkID

Get the ID of the network this node is participating in.

#### **Signature**

```text
info.getNetworkID() -> {networkID:int}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "networkID":"2"
    }
}
```

### info.getNetworkName

Get the name of the network this node is participating in.

#### **Signature**

```text
info.getNetworkName() -> {networkName:string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "networkName":"local"
    }
}
```

### info.getNodeID

Get the ID of this node.

#### **Signature**

```text
info.getNodeID() -> {nodeID: string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc": "2.0",
    "result": {
        "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
    },
    "id": 1
}
```

### info.getNodeIP

Get the IP of this node.

#### **Signature**

```text
info.getNodeIP() -> {ip: string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeIP"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc": "2.0",
    "result": {
        "ip": "192.168.1.1:9651"
    },
    "id": 1
}
```

### info.getNodeVersion

Get the version of this node.

#### **Signature**

```text
info.getNodeVersion() -> {version: string}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/0.5.7"
    },
    "id": 1
}
```

### info.isBootstrapped

Check whether a given chain is done bootstrapping

#### **Signature**

```text
info.isBootstrapped({chain: string}) -> {isBootstrapped: bool}
```

`chain` is the ID or alias of a chain.

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

### info.peers

Get a description of peer connections.

#### **Signature**

```text
info.peers() -> 
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

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
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

Get the transaction fee of the network.

#### **Signature**

```text
info.getTxFee() -> {txFee:uint64}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "txFee": "1000000"
    }
}
```

