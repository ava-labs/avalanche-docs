# APIコールを発行する

このガイドでは、Avalancheノードで公開されるAPIへの呼び出し方法を説明します。

### エンドポイント<a id="endpoint"></a>

APIコールが、URLになります。URLのベースは、常に

`[node-ip]:[http-port]`

ここで

* `node-ip`iss は、呼び出しが求めるノードのIPアドレスです。
* `http-port`は、HTTP呼び出しのためにノードがリスニングしたポートです。[コマンドライン引数](../references/command-line-interface.md#http-server)（`http-port`デフォルト値）で指定されます`9650`。

`127.0.0.1:9650`たとえば、ベースURLは次のようになります。

各APIドキュメントにより、APIのメソッドにアクセスするために、ユーザーが呼び出すべきエンドポイントが指定されます。

## JSON RPCフォーマットされたAPI

いくつかの組み込みAPIが、[JSON RPC 2.0](https://www.jsonrpc.org/specification)フォーマットを使用して、リクエストとレスポンスを記述します。こうしたAPIには、プラットフォームAPIやX-Chain APIが含まれます。

### JSON RPCリクエスト

[X-Chain API](exchange-chain-x-chain-api.md)の`getTxStatus`メソッドを呼び出したいとします。X-Chain APIドキュメントにより、このAPIのエンドポイントが次のようになります`/ext/bc/X`。

つまり、APIコールを送信するエンドポイントは次のようになります。

`[node-ip]:[http-port]/ext/bc/X`

X-Chain APIドキュメントにより、以下の署名は次のようになります`getTxStatus`。

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

ここで：

* Argumentは、我々がステータスを得たトランザクションのID`txID`です。
* 戻された値は、問題の取引ステータス`status`です。

このメソッドを呼び出すには、次のようにしてください：

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

* `jsonrpc`JSON RPCプロトコルのバージョンを指定します。（実際には常に2.0です）
* `method``getTxStatus`呼び出したいサービス（）`avm`とメソッド（）を指定します。
* `params`メソッドに引数を指定します。
* `id`iss は、この要求のIDです。リクエストIDは一意でなければなりません。

それで終わりました！

### JSON RPC成功レスポンス

コールが成功した場合、レスポンスは次のようになります。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "Status":"Success"
    },
    "id": 1
}
```

* `id`isは、このレスポンスが対応するリクエストのIDです。
* `result`は、返された値で`getTxStatus`

### JSON RPC エラーレスポンス

呼び出されたAPIメソッドがエラーを返した場合、レスポンスはその代わり`error`にフィールドとなります。`result`さらに、余分フィールドがあり`data`、発生したエラーについて追加情報が保持されます。

こうしたレスポンスは、次のようになります。

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

一部のAPIでは、JSON RPC 2.0以外のスタンダードを使用して、リクエストとレスポンスをフォーマットすることができます。こうした拡張は、ドキュメントで呼び出しとレスポンスを解析する方法を指定する必要があります。

## バイトの送信と受信

APIコール/レスポンスでバイトが送信される場合、特に記載されていない限り、チェックサムでBase-58エンコードである[CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58)表現になります。

