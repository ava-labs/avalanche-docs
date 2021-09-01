# 情報API

このAPIを使用して、ノードに関する基本情報にアクセスすることができます。

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。JSON RPC呼び出し方法の詳細については、ここを参照[してください。](issuing-api-calls.md)

## エンドポイント

```text
/ext/info
```

## APIメソッド

### info.getBlockchainID

ブロックチェーンのエイリアスを考えると、IDを取得します。（.を参照してください[`admin.aliasChain`](admin-api.md#admin-aliaschain)）

#### **シグネチャ**

```cpp
info.getBlockchainID({alias:string}) -> {blockchainID:string}
```

#### **コール例**

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

#### **例**

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

#### **シグネチャ**

```cpp
info.getNetworkID() -> {networkID:int}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **例**

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

#### **シグネチャ**

```cpp
info.getNetworkName() -> {networkName:string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **例**

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

このノードIDを取得します。

#### **シグネチャ**

```cpp
info.getNodeID() -> {nodeID: string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **例**

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

このノードでIPを取得します。

#### **シグネチャ**

```text
info.getNodeIP() -> {ip: string}
```

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeIP"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **例**

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

#### **シグネチャ**

```cpp
info.getNodeVersion() -> {
    version: string,
    databaseVersion: string,
    gitCommit: string,
    vmVersions: map[string]string,
}
```

ここで：

* `version`このノードバージョン
* `databaseVersion`は、このノードが使用しているデータベースのバージョン
* `gitCommit`iss
* `vmVersions`ismマップで、各キー/値ペアがVMの名前であり、このノードが実行するVMバージョンがマップされます。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **例**

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

### info.is

指定されたチェーンがブートストラップが完了するかどうか確認する

#### **シグネチャ**

```cpp
info.isBootstrapped({chain: string}) -> {isBootstrapped: bool}
```

`chain`は、チェーンのIDあるいはエイリアスです。

#### **コール例**

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

#### **例**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

### info.peer

ピアコネクションの説明を取得します。

#### **シグネチャ**

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

* `nodeIDs`iss オプションパラメータで、 nodeIDの記述が返すべきかを指定します。このパラメータが空のままにした場合、すべてのアクティブコネクションについての説明が返されます。指定された nodeIDに接続されていない場合、レスポンスからエントリが省略されます。

#### **コール例**

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

#### **例**

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

ネットワークの手数料を取得します。

#### **シグネチャ**

```cpp
info.getTxFee() ->
{
    creationTxFee: uint64,
    txFee: uint64
}
```

* `creationTxFee`ネットワーク上にアセットを作成するための手数料です。
* `txFee`ネットワーク上で取引を行うための手数料です。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getTxFee"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

#### **例**

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

