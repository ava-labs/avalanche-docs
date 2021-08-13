# Health API-JP

このAPIはノードの健康状態を測定するために使用できます。

ノードのヘルスを示すHTTPステータスコードレスポンスを取得するには、`/ext/health`に`GET`リクエストを行います。ノードがヘルシーならば、`200`ステータスコードを返します。ノードの健康に関するより詳細な情報が必要な場合は、以下のメソッドを使用してください。

## JP-JP-

`JSON 2.0` RPC 形式を使用しています。JSON RPC 呼び出しの詳細については、[こちら](issuing-api-calls.md)を参照してください。

## Endpoint-JP

```text
/ext/health
```

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

### Health.getLiveness-JP

ノードは30秒ごとに一連のヘルスチェックを実行し、各チェーンごとにヘルスチェックを取得します。このメソッドは、ヘルスチェック結果の最後のセットを返します。

#### **JPS-JP-JP**

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

`halesy`はすべてのヘルスチェックが合格している場合に、trueです。

`checks`は、ヘルスチェックレスポンスの一覧です。

* チェックレスポンスには、追加のコンテキストを持つ`メッセージ`が含まれます。
* check レスポンスには、なぜチェックが失敗したのかを説明する`エラー`が含まれている場合があります。
* `timestamp` は、最後のヘルスチェックのタイムスタンプです。
* `duration` は、最後のヘルスチェックの実行時間(ナノ秒)です。
* `contiguousFailures` は、このチェックに失敗した行の回数です。
* `timeOfFirstFailure` は、このチェックが最初に失敗した時期です。

これらの測定値の詳細は、[go-sundheit](https://github.com/AppsFlyer/go-sundheit) ライブラリのドキュメントを参照してください。

#### **Call 例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **レスポンス例**

この例では、C-Chainの健康チェックは失敗しています。

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

