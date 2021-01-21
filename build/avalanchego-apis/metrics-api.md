#  API de Métricas

Esta API permite que los clientes obtengan estadísticas de la salud y el desempeño del nodo.

## Endpoint / Extremos

```text
/ext/metrics
```

## Uso

Para obtener las métricas del nodo:

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Formato

Esta API produce métricas compatibles con Prometheus. Mira [aquí](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) para información del formato de Prometheus.

[Aquí](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) es un tutorial que muestra como configurar un monitor de AvalanceGois a tutorial that shows how to set up Prometheus and Grafana to monitor AvalancheGo node using the Metrics API.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU0NDY0OTk2XX0=
-->