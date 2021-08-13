# Info API

このAPIは、ノードに関する基本的な情報にアクセスするために使用できます。

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。JSON RPC 呼び出しの詳細については、[こちら](issuing-api-calls.md)を参照してください。

## Endpoint-JP

```text
/ext/info
```

## API メソッド

### info.getBlockchainID

ブロックチェーンのエイリアスが与えられたら、IDを取得します。\([`admin.aliasChain`](admin-api.md#admin-aliaschain) を参照してください。\)

#### **JPS-JP-JP**

```cpp
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

#### **Call 例**

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

#### **レスポンス例**

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

このノードが参加しているネットワークのIDを取得します。

#### **JPS-JP-JP**

```cpp
info.getNetworkID() -> {networkID:int}
```

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **レスポンス例**

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

このノードが参加しているネットワークの名前を取得します。

#### **JPS-JP-JP**

```cpp
info.getNetworkName() -> {networkName:string}
```

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **レスポンス例**

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

このノードのIDを取得します。

#### **JPS-JP-JP**

```cpp
info.getNodeID() -> {nodeID: string}
```

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **レスポンス例**

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

このノードのIPを取得します。

#### **JPS-JP-JP**

```text
info.getNodeIP() -> {ip: string}
```

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeIP"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **レスポンス例**

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

このノードのバージョンを取得します。

#### **JPS-JP-JP**

```cpp
info.getNodeVersion() -> {
    version: string,
    databaseVersion: string,
    gitCommit: string,
    vmVersions: map[string]string,
}
```

--

* `various` はこのノードのバージョンです。
* `databaseVersion` はこのノードが使用しているデータベースのバージョンです。
* `gitCommit` は、このノードがビルドされた Git コミットです。
* `vmVersions` は、各キー/値のペアがVMの名前で、このノードが実行するVMのバージョンがマップです。

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **レスポンス例**

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

--

#### **JPS-JP-JP**

```cpp
info.isBootstrapped({chain: string}) -> {isBootstrapped: bool}
```

`chain` はチェーンの ID またはエイリアスです。

#### **Call 例**

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

#### **レスポンス例**

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

PEAR_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE

#### **JPS-JP-JP**

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

* `nodeIDs` は、どのような nodeID の記述を返すべきかを指定するためのオプションのパラメータです。このパラメーターが空のままにすると、すべてのアクティブな接続の説明が返されます。NodeIDに接続されていない場合、レスポンスからは省略されます。

#### **Call 例**

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

#### **レスポンス例**

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

### info.getTxFee-JP

ネットワークの料金を取得します。

#### **JPS-JP-JP**

```cpp
info.getTxFee() ->
{
    creationTxFee: uint64,
    txFee: uint64
}
```

* `creationTxFee`は、ネットワーク上でアセットを作成するための料金です。
* `txFee`は、ネットワーク上でトランザクションを行うための手数料です。

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **レスポンス例**

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

