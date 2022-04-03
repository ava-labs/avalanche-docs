---
sidebar_position: 14
---

# Metrics API

The API allows clients to get statistics about a node’s health and performance.

## Endpoint

```text
/ext/metrics
```

## Usage

To get the node metrics:

```sh
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

This API produces Prometheus compatible metrics. See [here](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) for information on Prometheus’ formatting.

[Here](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) is a tutorial that shows how to set up Prometheus and Grafana to monitor AvalancheGo node using the Metrics API.

