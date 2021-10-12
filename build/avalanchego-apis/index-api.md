# Index API

AvalancheGo can be configured to run with an indexer. That is, it saves \(indexes\) every container \(a block, vertex or transaction\) it accepts on the X-Chain, P-Chain and C-Chain. To run AvalancheGo with indexing enabled, use command line flag `--index-enabled`. AvalancheGo will only index containers that are accepted when running with `--index-enabled`. To ensure your node has a complete index, run a node with a fresh database and `--index-enabled`. The node will accept every block, vertex and transaction in the network history during bootstrapping, ensuring your index is complete. It is OK to turn off your node if it is running with indexing enabled. If it restarts with indexing still enabled, it will accept all containers that were accepted while it was offline. The indexer should never fail to index an accepted block, vertex or transaction.

Indexed containers \(that is, accepted blocks, vertices and transactions\) are timestamped with the time at which the node accepted that container. Note that if the container was indexed during bootstrapping, other nodes may have accepted the container much earlier. Every container indexed during bootstrapping will be timestamped with the time at which the node bootstrapped, not when it was first accepted by the network.

Note that for DAGs \(including the X-Chain\), nodes may accept vertices and transactions in a different order from one another.

This document shows how to query data from AvalancheGo's Index API. The Index API is only available when running with `--index-enabled`.

## Format

This API uses the `json 2.0` RPC format. For more information on making JSON RPC calls, see [here](issuing-api-calls.md).

## Endpoints

Each chain has one or more index. To see if a C-Chain block is accepted, for example, send an API call to the C-Chain block index. To see if an X-Chain vertex is accepted, for example, send an API call to the X-Chain vertex index.

### X-Chain Transactions

```text
/ext/index/X/tx
```

### X-Chain Vertices

```text
/ext/index/X/vtx
```

### P-Chain Blocks

```text
/ext/index/P/block
```

### C-Chain Blocks

```text
/ext/index/C/block
```

## API Methods

### index.getLastAccepted

Get the most recently accepted container.

#### **Signature**

```cpp
index.getLastAccepted({
  encoding:string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

where:

* `id` is the container's ID
* `bytes` is the byte representation of the container
* `timestamp` is the time at which this node accepted the container
* `index` is how many containers were accepted in this index before this one
* `encoding` is `"cb58"` or `"hex"`

#### **Example Call**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Example Response**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"0x00000000000100003039d891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000070429c921bfeddff0000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c00000001ad16b107e58d7b211e85d1173137d4c722e1471f48af992be8ac71c2971804a400000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000050429c921bffd223000000001000000000000000000126d795661726961626c65436170417373657400044d4643410000000001000000000000000100000006000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c0000000100000009000000019aff43ba0264fc88e6c73f6f615efa492e8b7a27a20b962e3af76c3fdcc3e39c7809c1f406a2421619a6701941e6227333b45cbc57420bcac9b002a1daab2b44013087e6e5",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"hex",
    "index":"0"
  }
}
```

### index.getContainerByIndex

Get container by index. The first container accepted is at index 0, the second is at index 1, etc.

#### **Signature**

```cpp
index.getContainerByIndex({
  index: uint64,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` is the container's ID
* `bytes` is the byte representation of the container
* `timestamp` is the time at which this node accepted the container
* `index` is how many containers were accepted in this index before this one
* `encoding` is `"cb58"` or `"hex"`

#### **Example Call**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByIndex",
    "params": {
        "index":0,
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Example Response**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"0x00000000000100003039d891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000070429d069188ebdc0000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000050429d069189e0000000000010000000000000000000a5465737420546f6b656e00045445535400000000010000000000000001000000070000000000000190000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c000000010000000900000001b601db1ffeff4eae09bee0f2896b959812c77975e3ddef40a8559823675c95df62539240407b2f86517e0c634199726b4db7401fb2a48dc960f9eb6d2728a72a013b8a41d7",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"hex",
    "index":"0"
  }
}
```

### index.getContainerRange

Returns containers with indices in \[`startIndex`, `startIndex+1`, ... , `startIndex` + `numToFetch` - 1\]. `numToFetch` must be in `[0,1024]`.

#### **Signature**

```cpp
index.getContainerRange({
  startIndex: uint64,
  numToFetch: uint64,
  encoding: string
}) -> []{
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` is the container's ID
* `bytes` is the byte representation of the container
* `timestamp` is the time at which this node accepted the container
* `index` is how many containers were accepted in this index before this one
* `encoding` is `"cb58"` or `"hex"`

#### **Example Call**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerRange",
    "params": {
        "startIndex":0,
        "numToFetch":100,
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Example Response**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :[{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"0x00000000000100003039d891ad56056d9c01f18f43f58b5c784ad07a4a49cf3d1f11623804b5cba2c6bf00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000070429d069188ebdc0000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db00000001dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db000000050429d069189e0000000000010000000000000000000a5465737420546f6b656e00045445535400000000010000000000000001000000070000000000000190000000000000000000000001000000013cb7d3842e8cee6a0ebd09f1fe884f6861e1b29c000000010000000900000001b601db1ffeff4eae09bee0f2896b959812c77975e3ddef40a8559823675c95df62539240407b2f86517e0c634199726b4db7401fb2a48dc960f9eb6d2728a72a013b8a41d7",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"hex",
    "index":"0"
  }]
}
```

### index.getIndex

Get a container's index.

#### **Signature**

```cpp
index.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

where `encoding` is `"cb58"` or `"hex"`.

#### **Example Call**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getIndex",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Example Response**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "index":"0"
    },
  "id":1
}
```

### index.isAccepted

Returns true if the container is in this index.

#### **Signature**

```cpp
index.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **Example Call**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.isAccepted",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **Example Response**

```cpp
{
  "jsonrpc":"2.0",
  "result":
    {
      "isAccepted": true
    },
  "id":1
}
```

