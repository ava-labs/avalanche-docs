# API呼び出しの発行

このガイドでは、Avalancheノードが公開しているAPIへの呼び出し方法を説明します。

### エンドポイント<a id="endpoint"></a>

API呼び出しは、URLであるエンドポイントに対して行われます。URLのベースは、常に、次のようになっています。

`[node-ip]:[http-port]`

ここでは

* `node-ip`は、呼び出す先のノードのIPアドレスです。
* `http-port`は、ノードがHTTP呼び出しをリスンするためのポートです。これは[コマンドライン引数](../references/command-line-interface.md#http-server)`http-port`で指定します（デフォルト値`9650`）。

例えば、ベースとなるURLは、次のようになります。`127.0.0.1:9650`

各APIのドキュメントには、ユーザーがAPIのメソッドにアクセスするために、どのエンドポイントを呼び出すべきかが明記されています。

## JSON RPCフォーマットのAPI

いくつかのビルトインAPIは、リクエストとレスポンスの記述に[JSON RPC 2.0](https://www.jsonrpc.org/specification)フォーマットを使用しています。このようなAPIには、プラットフォームAPIやX-Chain APIなどがあります。

### JSON RPCリクエストの作成

例えば、[X-Chain API](exchange-chain-x-chain-api.md)の`getTxStatus`メソッドを呼び出したいとします。X-Chain APIのドキュメントによると、このAPIのエンドポイントは`/ext/bc/X`となっています。

つまり、API呼び出しを送信するエンドポイントは、次の通りです。

`[node-ip]:[http-port]/ext/bc/X`

X-Chain APIのドキュメントによると、`getTxStatus`の署名は以下の通りです。

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

ここでは、

* 引数`txID`は、ステータスを取得しているトランザクションのIDです。
* 返される値`status`は、問題のトランザクションのステータスです。

このメソッドを呼び出すには、次の動作を行います。

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :4,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

* `jsonrpc`は、JSON RPCプロトコルのバージョンを指定します。（実際には常に2.0です）
* `method`は、呼び出したいサービス（`avm`）とメソッド（`getTxStatus`\)を指定します。
* `params`は、メソッドの引数を指定します。
* `id`は、このリクエストのIDです。リクエストIDは一意でなければなりません。

それです！

### JSON RPCの成功レスポンス

呼び出しが成功した場合、レスポンスは次のようになります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id`は、このレスポンスが対応するリクエストのIDです。
* `result`は、`getTxStatus`の返される値です。

### JSON RPCエラーレスポンス

呼び出したAPIメソッドがエラーを返す場合、レスポンスには`result`の代わりに`error`フィールドがあります。さらに、発生したエラーに関する追加情報を保持する`data`フィールドがあります。

このようなレスポンスは、次のようになります。

```cpp
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32600,
        "message": "[Some error message here]",
        "data": [Object with additional information about the error]
    },
    "id": 1
}
```

## その他のAPIフォーマット

APIの中には、JSON RPC 2.0以外の規格を使ってリクエストやレスポンスをフォーマットするものもあります。そのような拡張機能は、そのドキュメントの中で、呼び出しやレスポンスの解析方法を指定する必要があります。

## バイトの送信と受信

特に断りのない限り、API呼び出し/レスポンスでバイトが送信されるときは、[CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58)表現、つまりチェックサム付きのベース58エンコーディングで送信されます

