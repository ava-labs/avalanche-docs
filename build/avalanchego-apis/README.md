# AvalancheGo APIs

Los Clientes interactúan con Avalanche mediante llamadas a las API de los nodos. Parámetros numéricos en llamadas a APIs pueden ser enviados como cadenas de caracteres \(e.j., `"5"` o `5` son ambos correctos para un argumento de enteros\). Valores numéricos se regresan siempre como cadena de caracteres \(e.g., `"5"` en lugar de `5`\). En ejemplos, las llamadas a las API se realizan al nodo que está escuchando tráfico HTTP en `127.0.0.1:9650`.

| Título | Descripción |
| :--- | :--- |
| [**Issuing API Calls**](issuing-api-calls.md) | This guide explains how to make calls to APIs exposed by Avalanche nodes. |
| The [**Platform Chain \(P-Chain\) API**](platform-chain-p-chain-api.md) | Allows clients to interact with the P-Chain \(Platform Chain\), which maintains Avalanche’s validator set and handles blockchain and subnet creation. |
| The [**Contract Chain \(C-Chain\) API**](contract-chain-c-chain-api.md) | Allows clients to interact with the C-Chain, Avalanche’s main EVM instance, as well as other EVM instances. |
| The [**Exchange Chain \(X-Chain\) API**](exchange-chain-x-chain-api.md) | Allows clients to create and trade assets, including AVAX, on the X-Chain as well as other instances of the AVM. |
| The [**Admin API**](admin-api.md) | Allows clients to examine a node’s internal state, set of connections, and similar internal protocol data. |
| The [**Auth API**](auth-api.md) | Allows clients to manage the creation and revocation of authorization tokens. |
| The [**Health API**](health-api.md) | Allows clients to check a node’s health. |
| The [**Info API**](info-api.md) | Allows clients to examine basic information about a node. |
| The [**IPC API**](ipc-api.md) | Allows users to create UNIX domain sockets for blockchains to publish to. |
| The [**Keystore API**](keystore-api.md) | Allows customers to use the embedded Keystore file of an Avalanche node. |
| The [**Metrics API**](metrics-api.md) | Allows clients to get statistics about a node’s health and performance. |

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjIzMzU0MDIyLDE2MTYwMjYwNzksMTQwMj
EyNzA3OF19
-->