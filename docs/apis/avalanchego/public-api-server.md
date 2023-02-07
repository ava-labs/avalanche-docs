---
description: There is a public API server that allows developers to access the Avalanche platform without having to run a node themselves.
---

# Public API Server

There is a public API server that allows developers to access the Avalanche
network without having to run a node themselves. The public API server is
actually several [AvalancheGo](https://github.com/ava-labs/avalanchego) nodes
behind a load balancer to ensure high availability and high request throughput.

## Using the Public API Nodes

The public API server is at `api.avax.network` for Avalanche Mainnet and
`api.avax-test.network` for Avalanche Fuji Testnet. To access a particular API,
just append the relevant API endpoint, as documented
[here](./apis/issuing-api-calls.md). Namely, use the following end points for
each chain respectively:

### HTTP

- For C-Chain API, the URL is `https://api.avax.network/ext/bc/C/rpc`.
- For X-Chain API, the URL is `https://api.avax.network/ext/bc/X`.
- For P-Chain API, the URL is `https://api.avax.network/ext/bc/P`.

Note: on Fuji Testnet, use `https://api.avax-test.network/` instead of `https://api.avax.network/`.

### WebSocket

- For C-Chain API, the URL is `wss://api.avax.network/ext/bc/C/ws`.

Note: on Fuji Testnet, the URL is `wss://api.avax-test.network/ext/bc/C/ws`.

### Supported APIs

The public API server supports all the API endpoints that make sense to be
available on a public-facing service, including APIs for the
[X-Chain](./apis/x-chain.md), [P-Chain](./apis/p-chain.md),
[C-Chain](./apis/c-chain.md), and full archival for the Primary Network.
However, it doesn't support [Index APIs](./apis/index-api.md), which includes
the X-Chain API's `getAddressTxs` method.

For a full list of available APIs see [here](./apis/README.md).

### Limitations

The public API only supports C-Chain WebSocket API calls for API methods that
don't exist on the C-Chain's HTTP API.

For batched C-Chain requests on the public API node, the maximum number of items
is 40. We're working on to support a larger batch size.

The maximum number of blocks to serve per `getLogs` request is 2048, which is set by [`api-max-blocks-per-request`](../../nodes/maintain/chain-config-flags.md#api-max-blocks-per-request-int).

### Sticky Sessions

Requests to the public API server API are distributed by a load balancer to an
individual node. As a result, consecutive requests may go to different nodes.
That can cause issues for some use cases. For example, one node may think a
given transaction is accepted, while for another node the transaction is still
processing. To work around this, you can use 'sticky sessions', as documented
[here](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials).
This allows consecutive API calls to be routed to the same node.

If you're using [AvalancheJS](../avalanchejs/README.md) to access the public
API, simply set the following in your code:

```javascript
avalanche.setRequestConfig("withCredentials", true)
```

### Availability

Usage of public API nodes is free and available to everyone without any
authentication or authorization. Rate limiting is present, but many of the API
calls are cached, and the rate limits are quite high. If your app is
running up against the limits, please [contact us](https://chat.avalabs.org) or
try using a community RPC provider.

### Support

If you have questions, problems, or suggestions, join the official [Avalanche Discord](https://chat.avalabs.org/).

## Subnets

### DeFi Kingdom (DFK)

#### HTTP

- The URL is `https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc`.

Note: on Fuji Testnet, the URL is `https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc`.

#### Websockets

- The URL is `wss://subnets.avax.network/defi-kingdoms/dfk-chain/ws`.

Note: on Fuji Testnet, the URL is `wss://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/ws`.

### Swimmer Network

#### HTTP

- The URL is `https://subnets.avax.network/swimmer/mainnet/rpc`.

Note: on Fuji Testnet, the URL is ` https://subnets.avax.network/swimmer/testnet/rpc`.

#### Websockets

- The URL is `wss://subnets.avax.network/swimmer/mainnet/ws`.

Note: on Fuji Testnet, the URL is `wss://subnets.avax.network/swimmer/testnet/ws`.

### Dexalot

#### HTTP

- The URL is `https://subnets.avax.network/dexalot/mainnet/rpc`.

Note: on Fuji Testnet, the URL is `https://subnets.avax.network/dexalot/testnet/rpc`.

#### Websockets

- The URL is `wss://subnets.avax.network/dexalot/mainnet/ws`.

Note: on Fuji Testnet, the URL is `wss://subnets.avax.network/dexalot/testnet/ws`.

## Community Providers

:::warning Disclaimer

Provided for informational purposes only, without representation, warranty or
guarantee of any kind. None of this is as an endorsement by the Avalanche
Foundation Limited, Ava Labs, Inc. or any of their respective subsidiaries or
affiliates, nor is any of this investment or financial advice. Please review
this
[Notice](https://assets.website-files.com/6059b554e81c705f9dd2dd32/60ec9590f189c16edaa086d4_Important%20Notice%20-%20avax.network.pdf)
and conduct your own research to properly evaluate the risks and benefits of any
project.

:::

### Infura

[Infura](https://docs.infura.io/infura/networks/avalanche-c-chain/how-to/choose-a-network)
currently only supports the C-Chain.

#### HTTP

- For C-Chain API, the URL is  `https://avalanche-mainnet.infura.io/v3/YOUR-API-KEY`

Note: on Fuji Testnet, the URL is `https://avalanche-fuji.infura.io/v3/YOUR-API-KEY`.

### ANKR

#### Mainnet

- Standard EVM API, the URL is `https://rpc.ankr.com/avalanche`.
- For C-Chain API, the URL is `https://rpc.ankr.com/avalanche-c`. On ANKR the C-Chain API doesn't 
support standard EVM APIs. For that use the Standard EVM API.
- For X-Chain API, the URL is `https://rpc.ankr.com/avalanche-x`.
- For P-Chain API, the URL is `https://rpc.ankr.com/avalanche-p`.

#### Testnet (Fuji)

- Standard EVM API, the URL is `https://rpc.ankr.com/avalanche_fuji`.
- For C-Chain API, the URL is `https://rpc.ankr.com/avalanche_fuji-c`. On ANKR the C-Chain API 
doesn't support standard EVM APIs. For that use the Standard EVM API.
- For X-Chain API, the URL is `https://rpc.ankr.com/avalanche_fuji-x`.
- For P-Chain API, the URL is `https://rpc.ankr.com/avalanche_fuji-p`.

Features:

- Archive Data Included.
- Automatic geo-routing across North America, Europe, and Asia.

Note: soft limited to 1 million daily requests per IP or referring domain. Batch calls limited to 1000.

Support is available on the [ANKR Discord](https://discord.gg/9yVU8YvayA).

### Blast

[Blast](https://blastapi.io/public-api/avalanche) supports the
C-Chain, X-Chain, and P-Chain.

#### Mainnet

##### HTTP

- For C-Chain RPC Endpoint ETH, the URL is `https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc`
- For C-Chain RPC Endpoint AVAX, the URL is `https://ava-mainnet.public.blastapi.io/ext/bc/C/avax`
- For X-Chain RPC Endpoint, the URL is `https://ava-mainnet.public.blastapi.io/ext/bc/X`
- For P-Chain RPC Endpoint, the URL is `https://ava-mainnet.public.blastapi.io/ext/P`

##### Websockets

- For C-Chain WSS Endpoint, the URL is `wss://ava-mainnet.public.blastapi.io/ext/bc/C/ws`

#### Testnet (Fuji)

##### HTTP

- For C-Chain RPC Endpoint ETH, the URL is `https://ava-testnet.public.blastapi.io/ext/bc/C/rpc`
- For C-Chain RPC Endpoint AVAX, the URL is `https://ava-testnet.public.blastapi.io/ext/bc/C/avax`
- For X-Chain RPC Endpoint, the URL is `https://ava-testnet.public.blastapi.io/ext/bc/X`
- For P-Chain RPC Endpoint, the URL is `https://ava-testnet.public.blastapi.io/ext/P`

##### Websockets

- For C-Chain WSS Endpoint, the URL is `wss://ava-testnet.public.blastapi.io/ext/bc/C/ws`

### GetBlock 

[GetBlock](https://getblock.io/nodes/avax) currently only supports the C-Chain.

#### HTTP

- For C-Chain API, the URL is  `https://avax.getblock.io/api_key/mainnet/ext/bc/C/ws?api_key=`

Note: on Fuji Testnet, the URL is `https://avax.getblock.io/api_key/testnet/ext/bc/C/ws?api_key=`.

#### Websockets

- For C-Chain API, the URL is  `wss://avax.getblock.io/api_key/mainnet/ext/bc/C/ws?api_key=`

Note: on Fuji Testnet, the URL is `wss://avax.getblock.io/api_key/testnet/ext/bc/C/ws?api_key=`.

### QuickNode

[QuickNode](https://www.quicknode.com/chains/avax) supports the X-Chain,
P-Chain, C-Chain, and Index API.

#### HTTP

- The URL is  `http://sample-endpoint-name.network.quiknode.pro/token-goes-here/`

#### Websockets

- The URL is  `wss://sample-endpoint-name.network.quiknode.pro/token-goes-here/`

### ChainStack

[ChainStack](https://chainstack.com/build-better-with-avalanche/) supports the
C-Chain, X-Chain, P-Chain, and the Fuji Testnet.

Features:

- Globally distributed infrastructure for optimal performance.
- Crypto payments natively.
- 24/7 customer support.

#### Mainnet

##### HTTP

- For C-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/C/rpc`
- For X-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/X`
- For P-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/P`

##### Websockets

Websockets are available for the C-chain and the X-chain.

- For C-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/C/ws`
- For X-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/X/events`

#### Testnet (Fuji)

##### HTTP

- For C-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/C/rpc`
- For X-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/X`
- For P-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/P`

##### Websockets

Websockets are available for the C-chain and the X-chain.

- For C-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/C/ws`
- For X-Chain API, the URL is `https://nd-123-145-789.p2pify.com/API_KEY/ext/bc/X/events`

### PublicNode

[PublicNode](https://avalanche.publicnode.com) supports the C-Chain on the Mainnet.

Features:

- Free
- Globally distributed infrastructure on Allnodes
- Optimized for speed and reliability - check our page for stats

#### Mainnet

##### HTTPS

- For C-Chain API, the URL is `https://avalanche-evm.publicnode.com`
