---
tags: [Tooling, Indexers]
description: tools or services that facilitate efficient and quick access to data stored on Avalanche network.
keywords: [indexers, rpc, endpoint, api, graphql]
---

# 🗄️ Indexers

There are several indexer solutions available, each offering different levels of decentralisation, ease of development, and performance for you to consider. These solutions serve as intermediaries to assist in indexing the Avalanche network.

## Community Providers

:::info Disclaimer

Provided for informational purposes only, without representation, warranty or
guarantee of any kind. None of this is as an endorsement by the Avalanche
Foundation Limited, Ava Labs, Inc. or any of their respective subsidiaries or
affiliates, nor is any of this investment or financial advice. Please review
this
[Notice](https://assets.website-files.com/6059b554e81c705f9dd2dd32/60ec9590f189c16edaa086d4_Important%20Notice%20-%20avax.network.pdf)
and conduct your own research to properly evaluate the risks and benefits of any
project.

:::

### Blockflow 

[Blockflow](https://www.blockflow.network/) simplifies building data backends for dApps.
The modular architecture seamlessly handles on-chain data retrieval, re-org handling, indexing, streaming, storage, and API consumption, allowing developers to focus on building innovative applications rather than wrestling with complex data infrastructure.

Blockflow's modular architecture for data indexing has three key components:
- **Instances:** Serverless functions that act as your data transformation and compute layer. These functions are triggered by blockchain events,  function calls, transactions, and traces, allowing you to filter and process data exactly as you need it.
- **Managed Storage:** A scalable storage solution that houses your transformed blockchain data. Our storage layer ensures data integrity by handling chain reorganizations, providing you with a reliable, always-consistent dataset.
- **Flexible Querying:** Access your data effortlessly through our REST and GraphQL APIs. Define your own query logic to retrieve precisely the information you need, when you need it.

To get started visit our [documentation](https://docs.blockflow.network/v/cli). Also do checkout an example [here](https://docs.blockflow.network/v/cli/hands-on-project/ens).

### SubQuery

SubQuery is a leading blockchain data indexer that provides developers with fast, flexible, universal, open source and decentralised APIs for web3 projects. Another one of SubQuery's competitive advantages is the ability to aggregate data not only within a chain but across multiple blockchains all within a single project.

**Useful resources**:

- [SubQuery Docs](https://academy.subquery.network/)
- [Intro Quick Start Guide](https://academy.subquery.network/quickstart/quickstart.html)
- [Avalanche Quickstart](https://academy.subquery.network/quickstart/quickstart_chains/avalanche.html)
- [Mainnet Starter Project](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/avalanche-starter)
- [Fuji Starter Project](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/avalanche-fuji-starter)

### Flair

[Flair](https://flair.dev) provides real-time and historical custom data indexing for any EVM-compatible chain.

It offers reusable **indexing primitives** (such as fault-tolerant RPC ingestors, custom processors and aggregations, re-org aware database integrations) to make it easy to receive, transform, store and access your on-chain data.

To get started, visit the [documentation](https://docs.flair.dev) or clone the [starter boilerplate](https://github.com/flair-sdk/starter-boilerplate) template and follow the instructions.

### Envio 

[Envio](https://envio.dev) is a full-featured data indexing solution that provides application developers with a seamless and efficient way to index and aggregate real-time and historical blockchain data for any EVM.

Envio supports [HyperSync](https://docs.envio.dev/docs/hypersync) on Avalanche. HyperSync is a real-time indexed layer of the Avalanche blockchain, providing accelerated APIs (JSON-RPC bypass) for the hyper-speed syncing of Avalanche data. Developers do not need to worry about RPC URLs, rate-limiting, or managing infrastructure, and can easily sync large datasets in a few minutes, something that would usually take 100x longer via standard RPC.

To get started, visit the [documentation](https://docs.envio.dev/docs/getting-started) or follow the [quickstart](https://docs.envio.dev/docs/contract-import) guide.

### SQD

[SQD](https://sqd.dev/) is a decentralized hyper-scalable data platform optimized for providing efficient, permissionless access to large volumes of data. It currently serves historical on-chain data, including event logs, transaction receipts, traces, and per-transaction state diffs. SQD offers a powerful toolkit for creating custom data extraction and processing pipelines, achieving an indexing speed of up to 150k blocks per second.

To get started, visit the [documentation](https://docs.sqd.dev/) or see [EVM examples](https://github.com/subsquid-labs/squid-evm-examples) of what you can build with SQD.

#### Supported Networks

- Avalanche	
- Avalanche Testnet

