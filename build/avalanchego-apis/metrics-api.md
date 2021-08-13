# Metrics API

API により、クライアントはノードの健全性とパフォーマンスに関する統計を取得できます。

## Endpoint-JP

```text
/ext/metrics
```

## JPY-JPY-JPY

ノードメトリックを取得するには:

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## JP-JP-

このAPIはPrometheus互換メトリクスを生成します。Prometheusのフォーマットに関する情報は[こちら](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md)をご覧ください。

[Metrics](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) API を使用して AvalancheGo ノードを監視するために Prometheus と Grafana を設定する方法を示すチュートリアルです。

