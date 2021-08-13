# API de salud

Esta API se puede utilizar para medir la salud de los nodos.

Para obtener una respuesta de código de estado HTTP que indica la salud del nodo, haga una solicitud `GET` a `/ext/health`. Si el nodo es saludable, devolverá un código de estado de `200`. Si desea más información en profundidad sobre la salud de un nodo, utilice los métodos a continuación.

## Formato de la versión

Esta API utiliza el formato `json 2.0` RPC. Para obtener más información sobre hacer llamadas JSON RPC, vea [aquí](issuing-api-calls.md).

## Endpoint

```text
/ext/health
```

## Métodos de trabajo

### health.getLiveness

El nodo lleva a cabo un conjunto de cheques de salud cada 30 segundos, incluyendo un cheque de salud para cada cadena. Este método devuelve el último conjunto de resultados de verificación de salud.

#### **Firma**

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

`sana` es cierto si el nodo si todos los cheques de salud están pasando.

`Los controles` son una lista de respuestas de control de salud.

* Una respuesta de verificación puede incluir un `mensaje` con contexto adicional.
* Una respuesta de verificación puede incluir un `error` que describe por qué fracasó el cheque.
* `timestamp` es la marca de tiempo del último cheque de salud.
* `duración` es la duración de ejecución del último cheque de salud, en nanosegundos.
* `contiguousFailures` es el número de veces en una fila que este cheque falló.
* `timeOfFirstFailure` es el momento en que este cheque falló primero.

En la documentación de la biblioteca [go-sundheit](https://github.com/AppsFlyer/go-sundheit) se puede encontrar más información sobre estas medidas.

#### **Ejemplo de llamada**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Respuesta de ejemplo**

En esta respuesta de ejemplo, el cheque de salud de la cadena C-Chain’s está fallando.

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

