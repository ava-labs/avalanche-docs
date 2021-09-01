# Metrics API

APIにより、クライアントがノードの健康とパフォーマンスについての統計を得ることができます。

## エンドポイント

```text
/ext/metrics
```

## 使用

ノードメトリクスを取得するには：

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## フォーマット

このAPIにより、Prometheus互換メトリクスを生成します。Prometheusのフォーマットに関する情報は[、ここ](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md)を参照してください。

[以下は](../tutorials/nodes-and-staking/setting-up-node-monitoring.md)、Metrics APIを使用してAvalancheGoノードをモニターする方法を示すチュートリアルです。

