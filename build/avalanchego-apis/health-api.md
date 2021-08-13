# API de santé

Cette API peut être utilisée pour mesurer la santé des noeuds.

Pour obtenir une réponse du code de statut HTTP qui indique la santé du nœud, faites une demande `GET` à `/ext/health`. Si le noeud est sain, il retournera un code de statut `200`. Si vous voulez plus d'informations approfondies sur la santé d'un nœud, utilisez les méthodes ci-dessous.

## Format

Cette API utilise le format RPC `json 2.0`. Pour plus d'informations sur les appels JSON RPC, voir [ici](issuing-api-calls.md).

## Point de fin

```text
/ext/health
```

## Méthodes

### health.getLiveness

Le noeud exécute un ensemble de contrôles de santé toutes les 30 secondes, y compris un contrôle de santé pour chaque chaîne. Cette méthode retourne le dernier ensemble de résultats de vérification de santé.

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

`la santé` est vraie si le noeud si tous les contrôles de santé passent.

`les vérifications` sont une liste des réponses aux vérifications de santé.

* Une réponse de vérification peut inclure un `message` avec un contexte supplémentaire.
* Une réponse de vérification peut inclure une `erreur` décrivant pourquoi la vérification a échoué.
* `timestamp` est the du dernier contrôle de santé.
* `la` durée est la durée d'exécution du dernier contrôle sanitaire, en nanosecondes.
* `contiguousFailures` est le nombre de fois dans une rangée ce contrôle a échoué.
* `timeOfFirstFailure` est la fois que ce contrôle premier échoué.

Plus d'informations sur ces mesures se trouvent dans la documentation de la bibliothèque [go-sundheit](https://github.com/AppsFlyer/go-sundheit)

#### **Exemple d'appel**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Exemple de réponse**

Dans cet exemple, la vérification de la santé de la chaîne C-est en échec.

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

