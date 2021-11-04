# Health API

此 API 可用于测量节点的健康状况。

要获得指示节点健康状况的 HTTP 状态代码响应，请向 `/ext/health` 发出 `GET` 请求。如果节点健康，它将返回一个 `200` 状态代码。如果您想了解有关节点健康状况的更多信息，请使用以下方法。

## 格式

本 API 使用 `json 2.0`RPC 格式。有关进行 JSON  RPC 调用的更多信息，请参阅[此处](issuing-api-calls.md)。

## 端点

```text
/ext/health
```

## 方法

### health.health

节点每 30 秒运行一组健康检查，包括对每条区块链的健康检查。此方法返回最后一组健康检查的结果。

#### **签名**

```cpp
health.health() -> {
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

 如果所有健康检查都通过，则节点的 `healthy` 为 true。

`checks` 是健康检查响应的列表。

* 检查响应可能包括带有附加上下文的 `message`。
* 检查响应可能包括 `error` 以描述检查失败的原因。
* `timestamp` 是最后一次健康检查的时间戳。
* `duration` 是最后一次健康检查的执行持续时间，以纳秒为单位。
* `contiguousFailures` 是此检查失败的连续次数。
* `timeOfFirstFailure` 是此检查首次失败的时间。

有关这些测量的更多信息，请参阅 [ go-sundheit](https://github.com/AppsFlyer/go-sundheit) 库的文档。

#### **示例调用**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.health"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **示例响应**

在此响应示例中，C-Chain 的健康检查失败了。

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

