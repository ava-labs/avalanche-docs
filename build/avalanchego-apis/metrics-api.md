# API de métriques

L'API permet aux clients d'obtenir des statistiques sur la santé et la performance d'un nœud.

## Endpoint

```text
/ext/metrics
```

## Utilisation

Pour obtenir les métriques de nœuds :

```cpp
curl -X POST 127.0.0.1:9650/ext/metrics
```

## Format

Cette API produit des métriques compatibles avec Prometheus. Voir [ici](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) pour des informations sur le formatage de Prometeus.

[Voici](../tutorials/nodes-and-staking/setting-up-node-monitoring.md) un tutoriel qui montre comment configurer Prometheus et Grafana pour surveiller le nœud AvalancheGo en utilisant l'API de Metrics.

