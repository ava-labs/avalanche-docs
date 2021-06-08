# Public API nodes

As an infrastructure service to the growing Avalanche ecosystem, Ava Labs is operating a public API endpoint that allows developers to access the Avalanche network without having to worry about the servers, their maintenance, reliability and availability. API servers are designed as a number of [AvalancheGo](https://github.com/ava-labs/avalanchego) nodes behind a load balancer, ensuring high availability and high request throughput.

## Using the API nodes

API nodes are available at `https://api.avax.network/` for the mainnet and `https://api.avax-test.network/` for the testnet. To access a particular API, just append the relevant API endpoint, as described in [issuing APi calls](../avalanchego-apis/issuing-api-calls.md) tutorial. For example, the URL for X-Chain API calls would be `https://api.avax.network/ext/bc/X`.

## APIs available

Public API supports all the API endpoints that make sense to be available on a public facing node, most notably [X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md), [P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md) and [C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md) APIs. For a full list of available APIs refer to the [documentation](../avalanchego-apis/README.md). 

## Sticky sessions

As API requests get distributed by a load balancer, your consecutive requests may end up on different client nodes. That can cause issues for particular use cases, for example doing cross-chain swaps where import might fail because it ended up on the node that didn't yet see the export transaction. To work around that, you can use 'sticky sessions', as documented [here](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). That way all your subsequent calls get routed to the same node.

If you're using [AvalancheJS](avalanchejs/README.md) to access the public API, simply set the following in your code:

```javascript
avalanche.setRequestConfig('withCredentials', true)
```

## Availability

Usage of public API nodes is free and available to everyone without any authentication or authorization. Rate limiting is present, but many of the API calls are cached, and the rate limits are quite high. If your application is running up against the limits, please contact us, and we will try to find a way to accommodate your needs and find a mutually acceptable solution.

## Support

If you have questions, problems or suggestions, come [talk to us](https://chat.avalabs.org/).
