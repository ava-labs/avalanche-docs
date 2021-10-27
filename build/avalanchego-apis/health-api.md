# APIの健全性

このAPIは、ノードの健全性を測定するために使用することができます。

ノードの健全性を示すHTTPステータスコードのレスポンスを得るには、`/ext/health`に対して`GET`のリクエストを行います。ノードが健全であれば、`200`のステータスコードが返されます。ノードの健全性についてより詳細な情報を得たい場合は、次のメソッドを使用します。

## フォーマット

本APIは`json 2.0`RPCフォーマットを使用しています。JSONのRPC呼び出しの詳細については、[こちら](issuing-api-calls.md)をご覧ください。

## エンドポイント

```text
/ext/health
```

## メソッド

### health.getLiveness

ノードは、各チェーンの健全性チェックを含む一連の健全性チェックを30秒ごとに実行します。 このメソッドは、健全性チェック結果の最後のセットを返します。

#### **署名**

```cpp
health.getLiveness() -> {
    checks: []{
        checkName: {
            message: JSON,
            error: JSON,
            timestamp: string,
            duration: int,
            contiguousFailures: int,
            timeOfFirstFailure: int
        }
    },
    healthy: bool
}
```

`healthy`は、すべての健全性チェックに合格しているノードの場合、trueです。

`checks`は、健全性チェックレスポンスのリストです。

* チェックレスポンスは、追加のコンテキストを持つ`message`を含んでいることがあります。
* チェックレスポンスは、チェックが失敗した理由の説明する`error`を含んでいることがあります。
* `timestamp`は、最後の健全性チェックのタイムスタンプです。
* `duration`は、最後の健全性チェックの実行時間で、単位はナノ秒です。
* `contiguousFailures`は、このチェックが連続して失敗した回数です。
* `timeOfFirstFailure`は、このチェックが最初に失敗した時間です。

これらの測定値の詳細については、[go-sundheit](https://github.com/AppsFlyer/go-sundheit)ライブラリのドキュメントを参照してください。

#### **呼び出し例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **レスポンス例**

このレスポンス例では、C-Chainの健全性チェックが失敗しています。

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "checks": {
            "C": {
                "message": null,
                "error": {
                    "message": "example error message"
                },
                "timestamp": "2020-10-14T14:04:20.57759662Z",
                "duration": 465253,
                "contiguousFailures": 50,
                "timeOfFirstFailure": "2020-10-14T13:16:10.576435413Z"
            },
            "P": {
                "message": {
                    "percentConnected": 0.9967694992864075
                },
                "timestamp": "2020-10-14T14:04:08.668743851Z",
                "duration": 433363830,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "X": {
                "timestamp": "2020-10-14T14:04:20.3962705Z",
                "duration": 1853,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "chains.default.bootstrapped": {
                "timestamp": "2020-10-14T14:04:04.238623814Z",
                "duration": 8075,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "network.validators.heartbeat": {
                "message": {
                    "heartbeat": 1602684245
                },
                "timestamp": "2020-10-14T14:04:05.610007874Z",
                "duration": 6124,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            }
        },
        "healthy": false
    },
    "id": 1
}
```

