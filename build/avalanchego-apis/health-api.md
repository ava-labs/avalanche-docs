# API de Salud

Esta API puede ser usada para medir la salud del nodo.

Para obtener una respuesta de código de estado HTTP que indica la salud del nodo, haz una `GET`solicitud a la .`/ext/health` Si el nodo es saludable, devolverá un código de `200`estado. Si deseas profundizar más respecto a la salud del nodo, utiliza los siguientes métodos.

## Format

Esta API utiliza el formato `json 2.0`RPC. Para más información sobre la realización de llamadas RPC, mira [aquí](issuing-api-calls.md).

## Endpoint / Extremo

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

`healthy`es cierto si el nodo si todas las inspecciones de salud

`checks`es una lista de respuestas de verificación de salud.

* Una respuesta de verificación puede incluir un `message`con contexto adicional.
* Una respuesta de verificación puede incluir una `error`descripción de por qué la verificación falló.
* `timestamp`es la marca de tiempo del último control de salud.
* `duration`es la duración de ejecución del último control de salud, en nanosegundos.
* `contiguousFailures`es el número de veces en una fila que este cheque falló.
* `timeOfFirstFailure`es la hora de que este cheque fracasó por primera vez.

Más información sobre estas medidas se puede encontrar en la documentación para la biblioteca [go-sundheit](https://github.com/AppsFlyer/go-sundheit).

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

