# Health API

Esta API puede ser usada para medir la salud del nodo.

Para obtener el código HTTP de estado de un nodo que indique el estado de salud de un nodo, haz una petición tipo `GET` a `/ext/health`. Si el nodo está saludable, regresará un código de estado `200`. Si deseas profundizar más respecto a la salud del nodo, utiliza los siguientes métodos.

## Formato

La API utiliza formato RPC `json 2.0`. Para más información de cómo hacer llamadas JSON RPC, mira [aquí](issuing-api-calls.md).

## Endpoint / Extremos

```text
/ext/health
```

## Metodos

### health.getLiveness

El nodo ejecuta una serie de revisiones de salud cada 30 segundos, incluyendo una revisión de salud de cada una de las cadenas. Este método regresa la última colección de resultados del análisis de salud.

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

`healthy` es verdadero (true) si todas las condiciones de salud para el nodo se cumplen.

`checks` es una lista de las revisiones de salud del nodo.

* Una respuesta de revisión puede incluir un mensaje (`message`) con contexto adicional.
* Una respuesta de revisión puede incluir un  `error` describiendo por qué falló la revisión.
* `timestamp` es la marca de tiempo de la última revisión de salud.
* `duration` es la duración de la última revisión de salud, en nanoseconds.
* `contiguousFailures` número de revisiones de salud continuas que fallaron.
* `timeOfFirstFailure` es el tiempo en que falló por primera vez la revisión

Más información de estas medidas pueden encontrase en la documentación de la librería[go-sundheit](https://github.com/AppsFlyer/go-sundheit).

#### **Llamada de ejemplo**

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"health.getLiveness"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/health
```

#### **Respuesta de ejemplo**

En la respuesta de ejemplo, la revisión de salud de la C-Chain falló.

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NTUxNzY4ODMsLTE2MTYzMzg3OTVdfQ
==
-->