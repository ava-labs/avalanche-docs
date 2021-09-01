# API de Métricas

Esta API permite que los clientes obtengan estadísticas de la salud y el desempeño del nodo.

## Endpoint / Extremo

```text
/ext/metrics
```

## Uso

Para obtener las métricas del nodo:

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

Esta API produce métricas compatibles con Prometheus. Ver [aquí](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) para información sobre el formato de Prometheus

[Aquí](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) hay un tutorial que muestra cómo crear Prometheus y Grafana para monitorear el nodo de AvalancheGo usando la API de Metrics.

