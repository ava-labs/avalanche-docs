# メトリックAPI

このAPIにより、クライアントはノードの健全性やパフォーマンスに関する統計情報を得ることができます。

## エンドポイント

```text
/ext/metrics
```

## 使用方法

ノードのメトリックを取得するには、次を実行します。

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## フォーマット

このAPIは、Prometheus互換のメトリックを生成します。Prometheusのフォーマットについては、[こちら](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md)をご覧ください。

[ここ](../tutorials/nodes-and-staking/setting-up-node-monitoring.md)では、PrometheusとGrafanaをセットアップして、メトリックAPIを使用してAvalancheGoノードを監視する方法を紹介します。

