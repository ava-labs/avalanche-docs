# API de Estado

Esta API puede ser usada para medir el estado del nodo.

Para obtener una respuesta del código de estado HTTP que indique el estado de un nodo, se debe hacer una petición`GET`  a`/ext/health` . Si el nodo está sano, arrojará un código de estado `200`. Si deseas profundizar más respecto al estado del nodo, utiliza los siguientes métodos.

## Format

Esta API usa el formato RPC `json 2.0`. [Aquí](issuing-api-calls.md) se encuentra más información sobre cómo hacer llamadas JSON RPC.

## Endpoint / Extremo

```text
/ext/health
```

## Métodos

### health.health

El nodo ejecuta una serie de revisiones de estado cada 30 segundos, incluyendo una revisión de estado de cada una de las cadenas. Este método regresa la última colección de resultados del análisis de estado.

#### **Firma**

```cpp
health.health() -> {
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

`healthy` es verdadero (true) si el nodo aprueba todas las verificaciones de estado.

`checks` es una lista de las respuestas a la verificación de estado.

* La respuesta de la verificación puede incluir un `message` con contexto adicional.
* La respuesta a la verificación puede incluir un `error` que describa por qué la verificación no fue aprobada.
* `timestamp` es la marca temporal de la verificación de estado más reciente.
* `duration`  es la duración de la ejecución de la última revisión de estado, en nanosegundos.
* `contiguousFailures` es el número de veces consecutivas que falló la revisión.
* `timeOfFirstFailure` es la primera vez que falló esta revisión.

En la documentación para la biblioteca [go-sundheit](https://github.com/AppsFlyer/go-sundheit) se encuentra más información sobre estas medidas.

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.health"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Respuesta de ejemplo**

En la respuesta de ejemplo, la revisión de estado de la C-Chain falló.

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

