# IPC API

IPC APIにより、ブロックチェーンが公開できるUNIXドメインソケットを作成できるようになります。ブロックチェーンがvertex/ブロックを受け入れると、ソケットに公開され、内部に含まれる決定は別のものに公開されます。

[コマンドライン引数](../references/command-line-interface.md)で起動された場合にのみ、ノードがこのAPIを公開します`api-ipcs-enabled=true`。

## IPCメッセージフォーマット

ソケットメッセージは、BigEndian形式で64bit整数で構成され、その数バイトが続きます。

例：

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## IPCソケットURLフォーマット

`<network_id>-<chain_id>-<event_type>``<event_type>``consensus`ソケットの名前は、あるいは、.`decisions`コンセンサスソケットは、バーティシとブロックを受け取り、決定によって決定される場合、個々のトランザクションを再生することができます。

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。

## エンドポイント

`/ext/ipcs`

## メソッド

### ipcs.publishBlockchain

ブロックチェーンを登録し、Unixドメインソケットに受け入れられた頂点を公開する。

#### **シグネチャ**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID`これは、受け入れられた頂点を公開するブロックチェーンです。
* `consensusURL`iss は、頂点が公開されるUnixドメインソケットのパスです。
* `decisionsURL`トランザクションが公開されるUnixドメインソケットのパスです。

#### **コール例**

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

#### **例**

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

ブロックチェーンをDeregister。

#### **シグネチャ**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID`これは、もはやUnixドメインソケットに公開することはなくなりますブロックチェーンです。

#### **コール例**

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

#### **例**

```cpp
{
    "jsonrpc":"2.0",
    "result":{
        "success":true
    },
    "id":1
}
```

