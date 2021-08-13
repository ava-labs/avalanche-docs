# API de Metrics

La API permite a los clientes obtener estadísticas sobre la salud y el rendimiento de un nodo.

## Endpoint

```text
/ext/metrics
```

## Uso

Para obtener las métricas del nodo:

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Formato de la versión

Esta API produce métricas compatibles con Prometheus. Vea [aquí](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) para obtener información sobre el formateo de Prometheus.

[Aquí](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) hay un tutorial que muestra cómo configurar Prometheus y Grafana para monitorear el nodo AvalancheGo utilizando la API de Metrics.

