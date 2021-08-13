# APIコールの発行

このガイドでは、Avalanche ノードで公開される API への呼び出し方法を説明します。

### Endpoint-JP<a id="endpoint"></a>

APIコールが、URLであるエンドポイントに実行されます。URLのベースは常に次のようにします。

`[node-ip]:[http-port]`

JP-JP-

* `node-ip` は、呼び出し元のノードの IP アドレスです。
* `http-port` は、HTTP 呼び出し時にノードがリスニングするポートです。これは[、コマンドライン引数](../references/command-line-interface.md#http-server) `http-port` \(デフォルト値 `9650`\)で指定します。

例えば、ベースURLは次のようになります: `127.0.0.1:9650`.JP.JP

各APIのドキュメントでは、APIのメソッドにアクセスするために、ユーザーが呼び出すエンドポイントを指定します。

## JSON RPC フォーマット済み API

いくつかの組み込みAPIは、[JSON RPC 2.0](https://www.jsonrpc.org/specification) フォーマットを使用してリクエストとレスポンスを記述します。このようなAPIには、Platform APIとX-Chain APIが含まれています。

### JSON RPCリクエストの作成

[X-Chain API](exchange-chain-x-chain-api.md) の `getTxStatus` メソッドを呼び出したいとします。X-Chain API ドキュメントでは、この API のエンドポイントは `/ext/bc/X` であることを示しています。

つまり、APIコールを送信するエンドポイントは次の通りです。

`[node-ip]:[http-port]/ext/bc/X`

X-Chain API ドキュメントでは、`getTxStatus` の署名は次のように説明されています。

[`avm.getTxStatus`](exchange-chain-x-chain-api.md#avm-gettxstatus)`(txID:bytes) -> (status:string)`

--

* 引数 `txID` は、ステータス取得したトランザクションの ID です。
* 返却された値`の`ステータスは、問題のトランザクションのステータスです。

このメソッドを呼び出すには、次のようにします。

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

* `jsonrpc`はJSON RPCプロトコルのバージョンを指定します。\(実際には常に2.0\)
* `method` は、呼び出したいサービス \(`avm`\) とメソッド \(`getTxStatus`\) を指定します。
* `params` はメソッドの引数を指定します。
* `id` はこのリクエストの ID です。リクエストIDは一意でなければなりません。

それでいい！

### JSON RPCの成功応答

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

* `id` は、このレスポンスが対応するリクエストの ID です。
* `result` は `getTxStatus` の値です。

### JSON RPCエラーレスポンス

APIメソッドがエラーを返す場合、レスポンスは`結果`の代わりに`フィールドエラー`になります。さらに、発生したエラーに関する追加の情報が保持されている`データ`があります。

このようなレスポンスは次のようになります:

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

一部のAPIでは、JSON RPC 2.0以外の標準でリクエストとレスポンスをフォーマットすることができます。このような拡張機能は、それらに対する呼び出しやレスポンスを解析する方法をドキュメントで指定する必要があります。

## バイトの送信と受信

特に注目されていない限り、バイトがAPIコール/レスポンスで送られるとき、それらは[CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58)表現であり、checksumでBase-58エンコーディングです。

