---
description: There is a public API server that allows developers to access the Avalanche platform without having to run a node themselves.
---

# Public API Server

There is a public API server that allows developers to access the Avalanche network without having to run a node themselves. The public API server is actually several [AvalancheGo](https://github.com/ava-labs/avalanchego) nodes behind a load balancer to ensure high availability and high request throughput.

## Using the Public API nodes

The public API server is at `api.avax.network` for Avalanche Mainnet and `api.avax-test.network` for Avalanche Fuji Testnet. To access a particular API, just append the relevant API endpoint, as documented [here](./apis/issuing-api-calls.md). Namely, use the following end points for each chain respectively:

### HTTP

- For C-Chain API, the URL is `https://api.avax.network/ext/bc/C/rpc`.
- For X-Chain API, the URL is `https://api.avax.network/ext/bc/X`.
- For P-Chain API, the URL is `https://api.avax.network/ext/bc/P`.

Note: on Fuji Testnet, use `https://api.avax-test.network/` instead of `https://api.avax.network/`.

### WebSocket

- For C-Chain API, the URL is `wss://api.avax.network/ext/bc/C/ws`.

Note: on Fuji Testnet, the URL is `wss://api.avax-test.network/ext/bc/C/ws`.

## Supported APIs

The public API server supports all the API endpoints that make sense to be available on a public-facing service, including APIs for the [X-Chain](./apis/x-chain.md), [P-Chain](./apis/p-chain.md), [C-Chain](./apis/c-chain.md), and full archival for the Primary Network. However, it does not support [Index APIs](./apis/index-api.md).

For a full list of available APIs see [here](./apis/README.md).

## Limitations

The public API only supports C-Chain websocket API calls for API methods that don't exist on the C-Chain's HTTP API.

For batched C-Chain requests on the public api node, the maximum number of items is 40. We are working on to support a larger batch size.

The maximum number of blocks to serve per `getLogs` request is 2048, which is set by [`api-max-blocks-per-request`](../../nodes/maintain/chain-config-flags.md#api-max-blocks-per-request-int).

## Sticky sessions

Requests to the public API server API are distributed by a load balancer to an individual node. As a result, consecutive requests may go to different nodes. That can cause issues for some use cases. For example, one node may think a given transaction is accepted, while for another node the transaction is still processing. To work around this, you can use 'sticky sessions', as documented [here](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). This allows consecutive API calls to be routed to the same node.

If you're using [AvalancheJS](../avalanchejs/README.md) to access the public API, simply set the following in your code:

```javascript
avalanche.setRequestConfig("withCredentials", true)
```

## Availability

Usage of public API nodes is free and available to everyone without any authentication or authorization. Rate limiting is present, but many of the API calls are cached, and the rate limits are quite high. If your application is running up against the limits, please [contact us](https://chat.avalabs.org).

## Support

If you have questions, problems or suggestions, come [talk to us](https://chat.avalabs.org/).
