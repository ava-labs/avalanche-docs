# AvalancheGo APIs

Los Clientes interactúan con Avalanche mediante llamadas a las API de los nodos. Parámetros numéricos en llamadas a APIs pueden ser enviados como cadenas de caracteres \(e.j., `"5"` o `5` son ambos correctos para un argumento de enteros\). Valores numéricos se regresan siempre como cadena de caracteres \(e.g., `"5"` en lugar de `5`\). En ejemplos, las llamadas a las API se realizan al nodo que está escuchando tráfico HTTP en `127.0.0.1:9650`.

| Título | Descripción |
| :--- | :--- |
| [**Realizar llamadas a la API**](issuing-api-calls.md) | Esta guía explica cómo hacer llamadas a las APIs expuestas por los nodos Avalanche. |
| [**API de la Cadena de  Platforma \(P-Chain\)**](platform-chain-p-chain-api.md) | Permite a los clientes interactuar con la P-Chain \(Cadena de Platforma\), la cual mantiene el set de validadores de Avalanche y maneja la creación de cadenas de bloques y subredes. |
| [**API de la Cadena de Contratos \(C-Chain\)**](contract-chain-c-chain-api.md) | Permite a los clientes interactuar con la C-Chain, principal instancia de la EVM en Avalanche, así como otras instancias de EVM. |
| [**API de la Cadena de Intercambio \(X-Chain\)**](exchange-chain-x-chain-api.md) | Permite a los clientes crear e intercambiar activos, incluyendo AVAX, en la X-Chain así como otras instancias de la AVM. |
| [**API Admin**](admin-api.md) | Permite a los clientes examinar el estado interno de un nodo, conjunto de conexiones y el protocolo de datos interno. |
| [**API Auth**](auth-api.md) | Permite a los clientes administrar la creación y revocación de tokens de aitorización. |
| [**API Health**](health-api.md) | Permite a los clientes revisar la salud de un nodo. |
| [**API Info**](info-api.md) | Permite a los clientes examinar información básica de un nodo. |
| [**API IPC**](ipc-api.md) | Permite a los usuarios crear sockets de dominio UNIX para que las cadenas de bloques publiquen. |
| [**API Keystore**](keystore-api.md) | Permite a los clientes utilizar el archivo de almacenamiento de llaves integrado de un nodo Avalanche. |
| The [**Metrics API**](metrics-api.md) | Permite a los clientes obtener estadísticas sobre el estado y el rendimiento de un nodo.. |

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA5MjA3OTY1LDEyNjQ0OTQ3NzYsLTE3MT
I5MzE1MDUsMjIzMzU0MDIyLDE2MTYwMjYwNzksMTQwMjEyNzA3
OF19
-->