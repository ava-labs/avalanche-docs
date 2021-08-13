# API de métriques

L'API permet aux clients d'obtenir des statistiques sur la santé et la performance d'un nœud.

## Point de fin

```text
/ext/metrics
```

## Utilisation

Pour obtenir les métriques du nœud :

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

Cette API produit des métriques compatibles Prometheus. Voir [ici](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) pour obtenir des informations sur le formatage de Prometheus.

[Voici](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) un tutoriel qui montre comment configurer Prométheus et Grafana pour surveiller le noeud AvalancheGo à l'aide de l'API Metrics.

