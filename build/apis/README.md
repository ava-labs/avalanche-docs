# APIs

Clients interact with Avalanche through APIs calls to nodes. Numeric parameters in API calls may be given as strings \(e.g., `"5"` or `5` are both ok for an integer argument\). Numeric return values are always given as strings \(e.g., `"5"` rather than `5`\). In examples, API calls are made to a node listening for HTTP traffic on `127.0.0.1:9650`.

The [**Platform Chain \(P-Chain\) API**](platform-chain-p-chain-api.md) allows clients to interact with the P-Chain \(Platform Chain\), which maintains Avalanche’s validator set and handles blockchain and subnet creation.

The [**Contract Chain \(C-Chain\) API**](contract-chain-c-chain-api.md) allows clients to interact with the C-Chain, Avalanche’s main EVM instance, as well as other EVM instances.

The [**Exchange Chain \(X-Chain\) API**](exchange-chain-x-chain-api.md) ****allows clients to create and trade assets, including AVAX, on the X-Chain as well as other instances of the AVM.

The [**Keystore API**](keystore-api.md) allows clients to use an Avalanche node’s built-in keystore.

The [**Health API**](health-api.md) allows clients to check a node’s health.

The [**Metrics API**](metrics-api.md) allows clients to collect Prometheus metrics about a node.

The [**Admin API**](admin-api.md) allows clients to examine a node’s internal state, set of connections, and similar internal protocol data.

The [**Info API**](info-api.md) allows clients to examine basic information about a node.

