---
tags: [Standards]
description: This guide explains how to make calls to APIs exposed by Avalanche nodes.
sidebar_label: API Calls
pagination_label: Issuing API Calls
sidebar_position: 0
---

# Issuing API Calls

This guide explains how to make calls to APIs exposed by Avalanche nodes.

## Endpoints

An API call is made to an endpoint, which is a URL, made up of the base URI
which is the address and the port of the node, and the path the particular
endpoint the API call is on.

### Base URL

The base of the URL is always:

`[node-ip]:[http-port]`

where

- `node-ip` is the IP address of the node the call is to.
- `http-port` is the port the node listens on for HTTP calls. This is specified
  by [command-line argument](/nodes/configure/avalanchego-config-flags.md#http-server)
  `http-port` (default value `9650`).

For example, if you're making RPC calls on the local node, the base URL might look like this: `127.0.0.1:9650`.

If you're making RPC calls to remote nodes, then the instead of `127.0.0.1` you
should use the public IP of the server where the node is. Note that by default
the node will only accept API calls on the local interface, so you will need to
set up the
[`http-host`](/nodes/configure/avalanchego-config-flags.md#--http-host-string)
config flag on the node. Also, you will need to make sure the firewall and/or
security policy allows access to the `http-port` from the internet.

:::caution

When setting up RPC access to a node, make sure you don't leave the
`http-port` accessible to everyone! There are malicious actors that scan for
nodes that have unrestricted access to their RPC port and then use those nodes
for spamming them with resource-intensive queries which can knock the node
offline. Only allow access to your node's RPC port from known IP addresses!

:::

### Endpoint Path

Each API’s documentation specifies what endpoint path a user should make calls
to in order to access the API’s methods.

In general, they are formatted like:

```sh
/ext/[api-name]
```

So for the Admin API, the endpoint path is `/ext/admin`, for the Info API it is
`/ext/info` and so on. Note that some APIs have additional path components, most
notably the chain RPC endpoints which includes the Subnet chain RPCs. We'll go
over those in detail in the next section.

So, in combining the base URL and the endpoint path we get the complete URL for
making RPC calls. For example, to make a local RPC call on the Info API, the
full URL would be:

```sh
http://127.0.0.1:9650/ext/info
```

## Primary Network and Subnet RPC calls

Besides the APIs that are local to the node, like Admin or Metrics APIs, nodes
also expose endpoints for talking to particular chains that are either part of
the Primary Network (the X, P and C chains), or part of any Subnets the node
might be syncing or validating.

In general, chain endpoints are formatted as:

```sh
ext/bc/[blockchainID]
```

### Primary Network Endpoints

The Primary Network consists of three chains: X, P and C chain. As those chains
are present on every node, there are also convenient aliases defined that can be
used instead of the full blockchainIDs. So, the endpoints look like:

```sh
ext/bc/X
ext/bc/P
ext/bc/C
```

### C-Chain and Subnet-EVM Endpoints

C-Chain and many Subnets run a version of the EthereumVM (EVM). EVM exposes its
own endpoints, which are also accessible on the node: JSON-RPC, and Websocket.

#### JSON-RPC EVM Endpoints

To interact with C-Chain EVM via the JSON-RPC use the endpoint:

```sh
/ext/bc/C/rpc
```

To interact with Subnet instances of the EVM via the JSON-RPC endpoint:

```sh
/ext/bc/[blockchainID]/rpc
```

where `blockchainID` is the ID of the blockchain running the EVM. So for
example, the RPC URL for the DFK Network (a Subnet that runs the DeFi Kingdoms:Crystalvale game)
running on a local node would be:

```sh
http://127.0.0.1/ext/bc/q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi/rpc
```

Or for the WAGMI Subnet on the Fuji testnet:

```sh
http://127.0.0.1/ext/bc/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/rpc
```

#### Websocket EVM Endpoints

To interact with C-Chain via the websocket endpoint, use:

```sh
/ext/bc/C/ws
```

To interact with other instances of the EVM via the websocket endpoint:

```sh
/ext/bc/blockchainID/ws
```

where `blockchainID` is the ID of the blockchain running the EVM. For example,
to interact with the C-Chain's Ethereum APIs via websocket on localhost you can
use:

```sh
ws://127.0.0.1:9650/ext/bc/C/ws
```

:::info

When using the [Public API](/tooling/rpc-providers.md) or another host
that supports HTTPS, use `https://` or `wss://` instead of `http://` or `ws://`.

Also, note that the [public API](/tooling/rpc-providers.md#supported-apis) only
supports C-Chain websocket API calls for API methods that don't exist on the
C-Chain's HTTP API.

:::

## Making a JSON RPC Request

Most of the built-in APIs use the [JSON RPC
2.0](https://www.jsonrpc.org/specification) format to describe their requests
and responses. Such APIs include the Platform API and the X-Chain API.

Suppose we want to call the `getTxStatus` method of the [X-Chain API](/reference/avalanchego/x-chain/api.md). The X-Chain API documentation tells us that the
endpoint for this API is `/ext/bc/X`.

That means that the endpoint we send our API call to is:

`[node-ip]:[http-port]/ext/bc/X`

The X-Chain API documentation tells us that the signature of `getTxStatus` is:

[`avm.getTxStatus`](/reference/avalanchego/x-chain/api.md#avmgettxstatus)`(txID:bytes) -> (status:string)`

where:

- Argument `txID` is the ID of the transaction we’re getting the status of.
- Returned value `status` is the status of the transaction in question.

To call this method, then:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :4,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

- `jsonrpc` specifies the version of the JSON RPC protocol. (In practice is always 2.0)
- `method` specifies the service (`avm`) and method (`getTxStatus`) that we want to invoke.
- `params` specifies the arguments to the method.
- `id` is the ID of this request. Request IDs should be unique.

That’s it!

### JSON RPC Success Response

If the call is successful, the response will look like this:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "Status": "Accepted"
  },
  "id": 1
}
```

- `id` is the ID of the request that this response corresponds to.
- `result` is the returned values of `getTxStatus`.

### JSON RPC Error Response

If the API method invoked returns an error then the response will have a field
`error` in place of `result`. Additionally, there is an extra field, `data`,
which holds additional information about the error that occurred.

Such a response would look like:

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32600,
        "message": "[Some error message here]",
        "data": [Object with additional information about the error]
    },
    "id": 1
}
```

## Other API Formats

Some APIs may use a standard other than JSON RPC 2.0 to format their requests
and responses. Such extension should specify how to make calls and parse
responses to them in their documentation.

## Sending and Receiving Bytes

Unless otherwise noted, when bytes are sent in an API call/response, they are in
hex representation. However, Transaction IDs (TXIDs), ChainIDs, and subnetIDs
are in [CB58](https://support.avalabs.org/en/articles/4587395-what-is-cb58)
representation, a base-58 encoding with a checksum.
