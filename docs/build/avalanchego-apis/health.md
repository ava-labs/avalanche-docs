---
sidebar_position: 9
description: This API can be used for measuring node health. Use Avalanche docs as a reference when testing node health. Helpful examples provided. 
---

# Health API

This API can be used for measuring node health.

To get an HTTP status code response that indicates the node’s health, make a `GET` request to `/ext/health`. If the node is healthy, it will return a `200` status code. If you want more in-depth information about a node’s health, use the methods below.

## Format

This API uses the `json 2.0` RPC format. For more information on making JSON RPC calls, see [here](issuing-api-calls.md).

## Endpoint

```text
/ext/health
```

## Methods

### health.health

The node runs a set of health checks every 30 seconds, including a health check for each chain. This method returns the last set of health check results.

#### **Signature**

```sh
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

`healthy` is true if the node if all health checks are passing.

`checks` is a list of health check responses.

* A check response may include a `message` with additional context.
* A check response may include an `error` describing why the check failed.
* `timestamp` is the timestamp of the last health check.
* `duration` is the execution duration of the last health check, in nanoseconds.
* `contiguousFailures` is the number of times in a row this check failed.
* `timeOfFirstFailure` is the time this check first failed.

More information on these measurements can be found in the documentation for the [go-sundheit](https://github.com/AppsFlyer/go-sundheit) library.

#### **Example Call**

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.health"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Example Response**

In this example response, the C-Chain’s health check is failing.

```json
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

