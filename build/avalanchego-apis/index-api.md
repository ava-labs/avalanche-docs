# Index API

AvalancheGo 可以配置为与索引器一起运行。也就是说，它保存（索引）在 X-Chain、P-Chain 和 C-Chain 上接受的每个容器（区块、顶点或交易）。要通过启用索引来运行 AvalancheGo，请将命令行标志 [--index-enabled](../references/command-line-interface.md#apis) 设置为 true。**AvalancheGo 仅在将 `--index-enabled` 设置为 true 的情况下运行时，才会对接受的容器进行索引。**为确保您的节点具有完整的索引，请使用新数据库运行节点并将 `--index-enabled` 设置为 true。节点将在引导过程中接受网络历史记录中的每个区块、顶点和交易，以确保您的索引是完整的。如果您的节点在运行时启用了索引，则可以关闭节点。如果节点重启时仍启用了索引，则节点将接受所有在离线时已接受的容器。对于已接受的区块、顶点或交易，索引器一般不会索引失败。

已索引的容器（即接受的区块、顶点和交易）均带有时间戳，表明节点接受该容器的时间。请注意，如果容器在引导期间被索引了，则表示其他节点可能已在更早时间接受了此容器。在引导过程中索引的每个容器都将带有时间戳，表明节点被引导的时间，而不是它第一次被网络接受的时间。

请注意，对于 DAG（包括 X-Chain），每个节点接受顶点和交易的顺序可能彼此不同。

本文档介绍了如何从 AvalancheGo 的 Index API 查询数据。仅在 `--index-enabled` 情况下运行时，Index API 才可用。

## Go 客户端

Index API 客户端有一个 Go 实施。请参阅[此处](https://pkg.go.dev/github.com/ava-labs/avalanchego/indexer#Client)的文档该客户端可以在 Go 程序中使用，连接到通过启用 Index API 运行的 AvalancheGo 节点，并调用 Index API。

## 格式

本 API 使用 `json 2.0`RPC 格式。有关进行 JSON  RPC 调用的更多信息，请参阅[此处](issuing-api-calls.md)。

## 端点

每个链都有一个或多个索引。例如，要查看 C-Chain 区块是否被接受，请向 C-Chain 区块索引发送 API 调用。例如，要查看 X-Chain 顶点是否被接受，请向 X-Chain 顶点索引发送 API 调用。

### X-Chain 交易

```text
/ext/index/X/tx
```

### X-Chain 顶点

```text
/ext/index/X/vtx
```

### P-Chain 区块

```text
/ext/index/P/block
```

### C-Chain 区块

```text
/ext/index/C/block
```

## API 方法

### index.getLastAccepted

获取最近接受的容器。

#### **签名**

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

其中：

* `id` 是容器的 ID
* `bytes` 是容器的字节表示
* `timestamp` 是此节点接受容器的时间
* `index` 是指在此容器这前，在索引中已接受了多少个容器
* `encoding` 是 `"cb58"` 或 `"hex"`

#### **示例调用**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getLastAccepted",
    "params": {
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **示例响应**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByIndex

按索引获取容器。接受的第一个容器在索引 0 处，第二个在索引 1 处，依此类推。

#### **签名**

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

* `id` 是容器的 ID
* `bytes` 是容器的字节表示
* `timestamp` 是此节点接受容器的时间
* `index` 是指在此容器这前，在索引中已接受了多少个容器
* `encoding` 是 `"cb58"` 或 `"hex"`

#### **示例调用**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByIndex",
    "params": {
        "index":0,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **示例响应**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }
}
```

### index.getContainerByID

按 ID 获取容器。

#### **签名**

```cpp
index.getContainerByID({
  containerID: string,
  encoding: string
}) -> {
  id: string,
  bytes: string,
  timestamp: string,
  encoding: string,
  index: string
}
```

* `id` 是容器的 ID
* `bytes` 是容器的字节表示
* `timestamp` 是此节点接受容器的时间
* `index` 是指在此容器这前，在索引中已接受了多少个容器
* `encoding` 是 `"cb58"` 或 `"hex"`

#### **示例调用**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerByID",
    "params": {
        "containerID": "6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"hex"
    },
    "id": 1
}'
```

#### **示例响应**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" : {
      "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
      "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
      "timestamp":"2021-04-02T15:34:00.262979-07:00",
      "encoding":"hex",
      "index":"0"
    }
}
```

### index.getContainerRange

返回容器以及 [`startIndex`, `startIndex+1`, ... , `startIndex` + `numToFetch` - 1] 中的索引。`numToFetch` 必须在 `[0,1024]`中。

#### **签名**

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

* `id` 是容器的 ID
* `bytes` 是容器的字节表示
* `timestamp` 是此节点接受容器的时间
* `index` 是指在此容器这前，在索引中已接受了多少个容器
* `encoding` 是 `"cb58"` 或 `"hex"`

#### **示例调用**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getContainerRange",
    "params": {
        "startIndex":0,
        "numToFetch":100,
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **示例响应**

```cpp
{
  "jsonrpc":"2.0",
  "id"     :1,
  "result" :[{
    "id":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
    "bytes":"111115HRzXVDSeonLBcv6QdJkQFjPzPEobMWy7PyGuoheggsMCx73MVXZo2hJMEXXvR5gFFasTRJH36aVkLiWHtTTFcghyFTqjaHnBhdXTRiLaYcro3jpseqLAFVn3ngnAB47nebQiBBKmg3nFWKzQUDxMuE6uDGXgnGouDSaEKZxfKreoLHYNUxH56rgi5c8gKFYSDi8AWBgy26siwAWj6V8EgFnPVgm9pmKCfXio6BP7Bua4vrupoX8jRGqdrdkN12dqGAibJ78Rf44SSUXhEvJtPxAzjEGfiTyAm5BWFqPdheKN72HyrBBtwC6y7wG6suHngZ1PMBh93Ubkbt8jjjGoEgs5NjpasJpE8YA9ZMLTPeNZ6ELFxV99zA46wvkjAwYHGzegBXvzGU5pGPbg28iW3iKhLoYAnReysY4x3fBhjPBsags37Z9P3SqioVifVX4wwzxYqbV72u1AWZ4JNmsnhVDP196Gu99QTzmySGTVGP5ABNdZrngTRfmGTFCRbt9CHsgNbhgetkxbsEG7tySi3gFxMzGuJ2Npk2gnSr68LgtYdSHf48Ns",
    "timestamp":"2021-04-02T15:34:00.262979-07:00",
    "encoding":"cb58",
    "index":"0"
  }]
}
```

### index.getIndex

获取容器的索引。

#### **签名**

```cpp
index.getIndex({
  containerID: string,
  encoding: string
}) -> {
  index: string
}
```

其中 `encoding` 是 `"cb58"` 或 `"hex"`。

#### **示例调用**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.getIndex",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **示例响应**

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

如果容器在此索引中，则返回 true。

#### **签名**

```cpp
index.isAccepted({
  containerID: string,
  encoding: string
}) -> {
  isAccepted: bool
}
```

#### **示例调用**

```cpp
curl --location --request POST 'localhost:9650/ext/index/X/tx' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "index.isAccepted",
    "params": {
        "containerID":"6fXf5hncR8LXvwtM8iezFQBpK5cubV6y1dWgpJCcNyzGB1EzY",
        "encoding":"cb58"
    },
    "id": 1
}'
```

#### **示例响应**

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

