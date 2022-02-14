---
description: There is a public API server that allows developers to access the Avalanche platform without having to run a node themselves.
---

# Public API

There is a public API server that allows developers to access the Avalanche network without having to run a node themselves. The public API server is actually several [AvalancheGo](https://github.com/ava-labs/avalanchego) nodes behind a load balancer to ensure high availability and high request throughput.

## Using the Public API nodes

The public API server is at `https://api.avax.network/` for Avalanche Mainnet and `https://api.avax-test.network/` for Avalanche Testnet. To access a particular API, just append the relevant API endpoint, as documented [here](../avalanchego-apis/issuing-api-calls.md). Namely, use the following end points for each chain respectively:

* For C-Chain API, the URL is `https://api.avax.network/ext/bc/C/rpc`.
* For X-Chain API, the URL is `https://api.avax.network/ext/bc/X`.
* For P-Chain API, the URL is `https://api.avax.network/ext/P`.

## Supported APIs

The public API server supports all the API endpoints that make sense to be available on a public-facing service, including APIs for the [X-Chain](../avalanchego-apis/x-chain.mdx), [P-Chain](../avalanchego-apis/p-chain.md) and [C-Chain](../avalanchego-apis/c-chain.md). For a full list of available APIs see [here](../avalanchego-apis/README.md).


:::info
The public API only supports C-Chain websocket API calls for API methods that don't exist on the C-Chain's HTTP API.

For batched C-Chain requests on the public api node, the maximum number of items is 40. We are working on to support a larger batch size. 
:::


## Sticky sessions

Requests to the public API server API are distributed by a load balancer to an individual node. As a result, consecutive requests may go to different nodes. That can cause issues for some use cases. For example, one node may think a given transaction is accepted, while for another node the transaction is still processing. To work around this, you can use 'sticky sessions', as documented [here](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). This allows consecutive API calls to be routed to the same node.

If you're using [AvalancheJS](avalanchejs/README.md) to access the public API, simply set the following in your code:

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## Availability

Usage of public API nodes is free and available to everyone without any authentication or authorization. Rate limiting is present, but many of the API calls are cached, and the rate limits are quite high. If your application is running up against the limits, please [contact us](https://chat.avalabs.org).

## Support

If you have questions, problems or suggestions, come [talk to us](https://chat.avalabs.org/).

