# AvalancheGo API

Los clientes interactúan con Avalanche a través de llamadas de API a nodos. Los parámetros numéricos en las llamadas de API pueden ser dados como cadenas \(por ejemplo, `"5"` o `5` están bien para un argumento entero \). Los valores de retorno numéricos siempre se dan como cadenas \(por ejemplo, `"5"` en lugar de `5\).` En ejemplos, las llamadas API se hacen a un nodo escuchando el tráfico HTTP en `127.0.0.1:9650`.

| Título | Descripción |
| :--- | :--- |
| [**Emisión de llamadas de API**](issuing-api-calls.md) | Esta guía explica cómo hacer llamadas a las API expuestas por los nodos Avalanche. |
| La [**cadena de plataforma \(P-Chain\) API**](platform-chain-p-chain-api.md) | Permite a los clientes interactuar con la cadena P-Chain \(Platform Chain\), que mantiene el conjunto de validadores de Avalanche y maneja la creación de blockchain y subnet. |
| La [**cadena de contrato \(C-Chain\) API**](contract-chain-c-chain-api.md) | Permite a los clientes interactuar con la C-Chain, la instancia principal de Avalanche, así como con otras instancias de EVM. |
| La [**cadena de intercambio \(X-Chain\) API**](exchange-chain-x-chain-api.md) | Permite a los clientes crear y comerciar activos, incluyendo AVAX, en la cadena X, así como en otras instancias del AVM. |
| La [**API de administración**](admin-api.md) | Permite a los clientes examinar el estado interno de un nodo, conjunto de conexiones y datos similares de protocolo interno. |
| La [**Autora API**](auth-api.md) | Permite a los clientes gestionar la creación y revocación de fichas de autorización. |
| [**La API de salud**](health-api.md) | Permite a los clientes comprobar la salud de un nodo. |
| La [**API de índice**](index-api.md) | Transacciones, vértices o bloqueo por ID. |
| [**La API de información**](info-api.md) | Permite a los clientes examinar la información básica sobre un nodo. |
| [**La API IPC**](ipc-api.md) | Permite a los usuarios crear tomas de dominio UNIX para blockchains publicar. |
| [**La API de Keystore**](keystore-api.md) | Permite a los clientes utilizar el archivo de Keystore incrustado de un nodo Avalanche. |
| La [**API de Metrics**](metrics-api.md) | Permite a los clientes obtener estadísticas sobre la salud y el rendimiento de un nodo. |



