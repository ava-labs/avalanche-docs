# AvalancheGo APIs

Los Clientes interactúan con Avalanche mediante llamadas a las API de los nodos. Parámetros numéricos en llamadas a APIs pueden ser enviados como cadenas de caracteres \(e.j., `"5"` o `5` son ambos correctos para un argumento de enteros\). Valores numéricos se regresan siempre como cadena de caracteres \(e.g., `"5"` en lugar de `5`\). En ejemplos, las llamadas a las API se realizan al nodo que está escuchando tráfico HTTP en `127.0.0.1:9650`.

| Título | Descripción |
| :--- | :--- |
| [**Realizar llamadas a la API**](issuing-api-calls.md) | Esta guía explica cómo hacer llamadas a las APIs expuestas por los nodos Avalanche. |
| [**API de la Cadena de  Platforma \(P-Chain\)**](platform-chain-p-chain-api.md) | Permite a los clientes interactuar con la P-Chain \(Cadena de Platforma\), la cual mantiene el set de validadores de Avalanche y maneja la creación de cadenas de bloques y subredes. |
|[**API de la Cadena de Contratos \(C-Chain\)**](contract-chain-c-chain-api.md) | Permite a los clientes interactuar con la C-Chain, principal instancia de la EVM en Avalanche, así well as other EVM instances. |
| The [**Exchange Chain \(X-Chain\) API**](exchange-chain-x-chain-api.md) | Allows clients to create and trade assets, including AVAX, on the X-Chain as well as other instances of the AVM. |
| The [**Admin API**](admin-api.md) | Allows clients to examine a node’s internal state, set of connections, and similar internal protocol data. |
| The [**Auth API**](auth-api.md) | Allows clients to manage the creation and revocation of authorization tokens. |
| The [**Health API**](health-api.md) | Allows clients to check a node’s health. |
| The [**Info API**](info-api.md) | Allows clients to examine basic information about a node. |
| The [**IPC API**](ipc-api.md) | Allows users to create UNIX domain sockets for blockchains to publish to. |
| The [**Keystore API**](keystore-api.md) | Allows customers to use the embedded Keystore file of an Avalanche node. |
| The [**Metrics API**](metrics-api.md) | Allows clients to get statistics about a node’s health and performance. |

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI1NjA4MTk2MiwtMTcxMjkzMTUwNSwyMj
MzNTQwMjIsMTYxNjAyNjA3OSwxNDAyMTI3MDc4XX0=
-->