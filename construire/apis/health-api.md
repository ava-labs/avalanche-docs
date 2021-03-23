---
description: Cette API peut être utilisée pour mesurer la santé des nœuds.
---

# API Health

Pour obtenir une réponse de code d'état HTTP indiquant la santé du nœud, envoyez une requête `GET` à `/ext /health`. Si le nœud est sain, il renverra un code d'état `200`. Si vous souhaitez obtenir des informations plus détaillées sur l’intégrité d’un nœud, utilisez les méthodes ci-dessous.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, cliquez [ici](emettre-des-appels-dapi.md).

## Endpoint

```cpp
/ext/health
```

## API Méthodes

### health.getLiveness

Obtenez une vérification de l'état de ce nœud.

**Signature**

```cpp
health.getLiveness() -> {
    checks: {
        network.validators.heartbeat: {
            message: {
                heartbeat: int
            },
            timestamp: string,
            duration: int,
            contiguousFailures: int,
            timeOfFirstFailure: int
        }
    },
    healthy: bool
}
```

* `chains.default.bootstrapped`
  * `timestamp` est l'horodatage de la dernière vérification de l'état.
  * `duration` est la durée d'exécution du dernier contrôle d'intégrité en nanosecondes.
  * `contiguousFailures`est le nombre d'échecs survenus à la suite.
  * `timeOfFirstFailure` est l'heure de l'échec de la transition initiale.
* `network.validators.heartbeat`
  * `heartbeat` est l'horodatage unix de la dernière fois que le réseau a traité un message.
  * `timestamp` est l'horodatage de la dernière vérification de l'état.
  * `duration` est la durée d'exécution du dernier contrôle d'intégrité en nanosecondes.
  * `contiguousFailures` est le nombre d'échecs survenus à la suite.
  * `timeOfFirstFailure` est l'heure de l'échec de la transition initiale.

Vous trouverez plus d'informations sur ces mesures dans la documentation de la bibliothèque [go-sundheit.](https://github.com/AppsFlyer/go-sundheit)

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

**Example de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "checks": {
            "chains.default.bootstrapped": {
                "timestamp": "2020-09-17T21:27:31.776773-07:00",
                "duration": 5891,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "network.validators.heartbeat": {
                "message": {
                    "heartbeat": 1600403244
                },
                "timestamp": "2020-09-17T21:27:31.776793-07:00",
                "duration": 4000,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            }
        },
        "healthy": true
    },
    "id": 1
}
```

