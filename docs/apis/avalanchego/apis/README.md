---
sidebar_position: 1
---

# AvalancheGo APIs Overview

Clients interact with Avalanche through APIs calls to nodes. Numeric parameters in API calls may be given as strings (e.g., `"5"` or `5` are both ok for an integer argument). Numeric return values are always given as strings (e.g., `"5"` rather than `5`). In examples, API calls are made to a node listening for HTTP traffic on `127.0.0.1:9650`.

| Title | Description |
| :--- | :--- |
| [**Issuing API Calls**](issuing-api-calls.md) | This guide explains how to make calls to APIs exposed by Avalanche nodes. |
| The [**Platform Chain (P-Chain) API**](p-chain.md) | Allows clients to interact with the P-Chain (Platform Chain), which maintains Avalanche’s validator set and handles blockchain and subnet creation. |
| The [**Contract Chain (C-Chain) API**](c-chain.md) | Allows clients to interact with the C-Chain, Avalanche’s main EVM instance, as well as other EVM instances. |
| The [**Exchange Chain (X-Chain) API**](x-chain.mdx) | Allows clients to create and trade assets, including AVAX, on the X-Chain as well as other instances of the AVM. |
| The [**Admin API**](admin.md) | Allows clients to examine a node’s internal state, set of connections, and similar internal protocol data. |
| The [**Auth API**](auth.md) | Allows clients to manage the creation and revocation of authorization tokens. |
| The [**Health API**](health.md) | Allows clients to check a node’s health. |
| The [**Index API**](index-api.md) | Fetch transactions, vertex, or block by ID. |
| The [**Info API**](info.md) | Allows clients to examine basic information about a node. |
| The [**IPC API**](ipc.md) | Allows users to create UNIX domain sockets for blockchains to publish to. |
| The [**Keystore API**](keystore.md) | Allows customers to use the embedded Keystore file of an Avalanche node. |
| The [**Metrics API**](metrics.md) | Allows clients to get statistics about a node’s health and performance. |



