# APIs de AvalancheGo

Los Clientes interactúan con Avalanche mediante llamadas a las API de los nodos. Los parámetros numéricos en las llamadas de API pueden ser dados como cadenas \(por ejemplo, `"5"`o `5`están bien para un argumento entero\). Los valores de retorno numérico se dan siempre como cadenas \(por ejemplo, en `"5"`lugar de `5`\). `127.0.0.1:9650`En ejemplos, las llamadas de API se hacen a un nodo de escucha para el tráfico HTTP

| Título | Descripción |
| :--- | :--- |
| [**Emisión de llamadas de API**](issuing-api-calls.md) | Esta guía explica cómo realizar llamadas a las API expuestas por los nodos de Avalanche. |
| La [**API de la plataforma \(P-Chain\)**](platform-chain-p-chain-api.md) | Permite a los clientes interactuar con la P-Chain \(Cadena de Platforma\), la cual mantiene el set de validadores de Avalanche y maneja la creación de cadenas de bloques y subredes. |
| La [**API de la blockchain de contrato \(C-Chain\)**](contract-chain-c-chain-api.md) | Permite a los clientes interactuar con la C-Chain, principal instancia de la EVM en Avalanche, así como otras instancias de EVM. |
| La [**API de blockchain de exchange \(X-Chain\)**](exchange-chain-x-chain-api.md) | Permite a los clientes crear e intercambiar activos, incluyendo AVAX, en la X-Chain así como otras instancias de la AVM. |
| [**API de administración**](admin-api.md) | Permite a los clientes examinar el estado interno de un nodo, conjunto de conexiones y el protocolo de datos interno. |
| [**API**](auth-api.md) | Permite a los clientes administrar la creación y revocación de tokens de aitorización. |
| [**API de salud**](health-api.md) | Permite a los clientes revisar la salud de un nodo. |
| [**API de índice**](index-api.md) | Transacciones, vértice o bloqueo por ID. |
| [**API**](info-api.md) | Permite a los clientes examinar información básica de un nodo. |
| [**API**](ipc-api.md) | Permite a los usuarios crear sockets de dominio UNIX para que las cadenas de bloques publiquen. |
| [**API**](keystore-api.md) | Permite a los clientes utilizar el archivo de almacenamiento de llaves integrado de un nodo Avalanche. |
| La [**API de métricas**](metrics-api.md) | Permite a los clientes obtener estadísticas sobre el estado y el rendimiento de un nodo. |



