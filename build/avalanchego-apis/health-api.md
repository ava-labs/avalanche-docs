# API de santé

Cette API peut être utilisée pour mesurer la santé des nœuds.

Pour obtenir une réponse au code de statut HTTP qui indique la santé du nœud, faites une `GET`requête à .`/ext/health` Si le nœud est en bonne santé, il retournera un code de `200`statut. Si vous voulez plus d'informations approfondies sur la santé d'un nœud, utilisez les méthodes ci-dessous.

## Format

Cette API utilise le format `json 2.0`RPC. Pour plus d'informations sur la création d'appels JSON RPC, consultez [ici](issuing-api-calls.md).

## Endpoint

```text
/ext/health
```

## Méthodes

### health.getLiveness

Le nœud exécute un ensemble de contrôles de santé toutes les 30 secondes, y compris un contrôle de santé pour chaque chaîne. Cette méthode retourne le dernier ensemble de résultats de vérification de santé.

#### **Signature**

```cpp
health.getLiveness() -> {
    checks: []{
        checkName: {
            message: JSON,
            error: JSON,
            timestamp: string,
            duration: int,
            contiguousFailures: int,
            timeOfFirstFailure: int
        }
    },
    healthy: bool
}
```

`healthy`est vrai si le nœud si tous les contrôles de santé sont en cours.

`checks`est une liste de réponses aux vérifications de santé.

* Une réponse `message`à la vérification peut inclure une avec un contexte supplémentaire.
* Une réponse à la vérification peut inclure une `error`description de la raison pour laquelle la vérification a échoué.
* `timestamp`est l'horodatage du dernier contrôle de santé.
* `duration`est la durée d'exécution du dernier contrôle de santé, en nanosecondes.
* `contiguousFailures`est le nombre de fois dans une rangée que ce contrôle a échoué.
* `timeOfFirstFailure`est le moment où ce contrôle a échoué.

Plus d'informations sur ces mesures se trouvent dans la documentation de la bibliothèque [go-sundheit](https://github.com/AppsFlyer/go-sundheit).

#### **Exemple**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Exemple**

Dans cette réponse, le contrôle de santé de C-Chain est en panne.

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "checks": {
            "C": {
                "message": null,
                "error": {
                    "message": "example error message"
                },
                "timestamp": "2020-10-14T14:04:20.57759662Z",
                "duration": 465253,
                "contiguousFailures": 50,
                "timeOfFirstFailure": "2020-10-14T13:16:10.576435413Z"
            },
            "P": {
                "message": {
                    "percentConnected": 0.9967694992864075
                },
                "timestamp": "2020-10-14T14:04:08.668743851Z",
                "duration": 433363830,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "X": {
                "timestamp": "2020-10-14T14:04:20.3962705Z",
                "duration": 1853,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "chains.default.bootstrapped": {
                "timestamp": "2020-10-14T14:04:04.238623814Z",
                "duration": 8075,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            },
            "network.validators.heartbeat": {
                "message": {
                    "heartbeat": 1602684245
                },
                "timestamp": "2020-10-14T14:04:05.610007874Z",
                "duration": 6124,
                "contiguousFailures": 0,
                "timeOfFirstFailure": null
            }
        },
        "healthy": false
    },
    "id": 1
}
```

