# Metrics API

The API allows clients to get statistics about a node’s health and performance.

## Endpoint

```text
/ext/metrics
```

## Usage

To get the node metrics:

```text
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

This API produces Prometheus compatible metrics. See [here](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) for information on Prometheus’ formatting.

