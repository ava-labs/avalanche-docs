---
description: >-
  L'API permet aux clients d'obtenir des statistiques sur la santé et les
  performances d'un nœud.
---

# API Metrics

## Endpoint

```text
/ext/metrics
```

## Utilisation

Pour obtenir les métriques du noeud :

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

Cette API produit des métriques compatibles de Prometheus. Cliquez [ici](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) pour obtenir des informations sur le formatage de Prometheus.

