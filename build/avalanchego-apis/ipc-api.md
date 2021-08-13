# IPC API

IPC APIにより、ユーザーはブロックチェーンに公開するUNIXドメインソケットを作成できます。ブロックチェーンがvertex/blockを受け入れると、それをソケットに公開し、内部に含まれる決定は別のものに公開されます。

Node は、[コマンドライン引数](../references/command-line-interface.md) `api-ipcs-enabled=true` で起動した場合にのみこのAPIを公開します。

## IPCメッセージフォーマット

Socket メッセージはBigEndian形式の64bit整数で構成され、その多くはそのままです。

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## IPC Socket URL フォーマット

ソケットの名前は `<network_id>-<chain_id>-<event_type>` という形式で、`<event_type>` は`コンセンサス`か`意思決定`です。コンセンサスソケットはverticiesとブロックを受け取り、決定ソケットは個々のトランザクションを再生します。

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。

## Endpoint-JP

`/ext/ipcs/JP`

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

### ipcs.publishBlockchain-JP

ブロックチェーンに登録して、受け入れられた頂点をUNIXドメインソケットに公開します。

#### **JPS-JP-JP**

```cpp
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

* `blockchainID`は、受け入れられた頂点を公開するブロックチェーンです。
* `consensusURL` は、頂点が公開される Unix ドメインソケットのパスです。
* `design`-URL はトランザクションが公開される Unix ドメインソケットのパスです。

#### **Call 例**

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

ブロックチェーンをDeregisterで、Unixドメインソケットに公開されなくなります。

#### **JPS-JP-JP**

```cpp
ipcs.unpublishBlockchain({blockchainID: string}) -> {success: bool}
```

* `blockchainID`は、UNIXドメインソケットに公開されなくなったブロックチェーンです。

#### **Call 例**

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

