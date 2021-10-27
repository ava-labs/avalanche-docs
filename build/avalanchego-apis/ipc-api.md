# IPC API

IPC APIにより、ユーザーはブロックチェーンを公開するためのUNIXドメインのソケットを作成することができます。ブロックチェーンが頂点/ブロックを受け入れると、それをソケットに公開し、その中に含まれる決定事項を別のソケットに公開します。

ノードは、[コマンドライン引数](../references/command-line-interface.md)で起動された場合に、このAPIのみを公開します`api-ipcs-enabled=true`。

## IPCメッセージフォーマット

ソケットメッセージは、BigEndianフォーマットの64ビット整数と、それに続くバイト数で構成されています。

例：

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## IPCソケットのURLフォーマット

ソケットの名前は`<network_id>-<chain_id>-<event_type>`の形式で、`<event_type>`は`consensus`または`decisions`のいずれかです。コンセンサスソケットは、頂点とブロックを受信し、デシジョンソケットは、個々のトランザクションを受信します。

## フォーマット

このAPIは`json 2.0`RPCフォーマットを使用しています。

## エンドポイント

`/ext/ipcs`

## メソッド

### ipcs.publishBlockchain

ブロックチェーンを登録し、受け入れた頂点をUNIXドメインソケットに公開します。

#### **署名**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID`は、受け入れられた頂点を公開するブロックチェーンです。
* `consensusURL`は、頂点が公開されているUNIXドメインソケットのパスです。
* `decisionsURL`は、トランザクションが公開されるUNIXドメインソケットのパスです。

#### **呼び出し例**

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

#### **レスポンス例**

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

ブロックチェーンの登録を解除し、UNIXドメインソケットへの公開を行わないようにします。

#### **署名**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID`は、UNIXドメインソケットへの公開を行わなくなるブロックチェーンです。

#### **呼び出し例**

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

#### **レスポンス例**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

