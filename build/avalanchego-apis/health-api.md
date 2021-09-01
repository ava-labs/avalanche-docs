# ヘルスAPI

このAPIは、ノードヘルス測定に使用することができます。

ノードの健康を示すHTTPステータスコードレスポンスを得るには、以下に`GET`リクエストしてください。`/ext/health`ノードがヘルシーである場合、`200`ステータスコードを返します。ノードの健康についてより詳細な情報を求める場合は、以下のメソッドを使用してください。

## フォーマット

このAPIは、`json 2.0`RPC形式を使用します。JSON RPC呼び出し方法の詳細については、ここを参照[してください。](issuing-api-calls.md)

## エンドポイント

```text
/ext/health
```

## メソッド

### health.getLiveness

ノードは、30秒ごとに一連のヘルスチェックを実行します。このメソッドは、ヘルスチェック結果の最後のセットを返します。

#### **シグネチャ**

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

`healthy`すべてのヘルスチェックがパスワードが存在する場合、ノードが真のものです。

`checks`は、ヘルスチェックレスポンスの一覧です。

* チェックレスポンスには、追加のコンテキスト`message`を持つものが含まれます。
* チェックレスポンスには、なぜチェックに失敗したのか説明`error`することができます。
* `timestamp`は、最後のヘルスチェックのタイムスタンプです。
* `duration`最後のヘルスチェックの実行期間（ナノ秒単位）。
* `contiguousFailures`このチェックに失敗した行で回数です。
* `timeOfFirstFailure`は、このチェックが最初に失敗した時刻です。

これらの測定についてのより多くの情報は、[go-sundheit](https://github.com/AppsFlyer/go-sundheit)ライブラリのドキュメントで入手できます。

#### **コール例**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **例**

この例では、C-Chainのヘルスチェックが失敗しました。

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

