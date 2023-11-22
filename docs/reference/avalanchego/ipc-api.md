---
tags: [AvalancheGo APIs]
description: This page is an overview of the IPC API associated with AvalancheGo.
sidebar_label: IPC API
pagination_label: IPC API
---

# IPC API

The IPC API allows users to create Unix domain sockets for blockchains to publish to. When the
blockchain accepts a vertex/block it will publish it to a socket and the decisions contained inside
will be published to another.

A node will only expose this API if it is started with [config flag](/nodes/configure/avalanchego-config-flags.md) `api-ipcs-enabled=true`.

:::info

This API set is for a specific node, it is unavailable on the [public server](/tooling/rpc-providers.md).

:::

## IPC Message Format

Socket messages consist of a 64bit integer in BigEndian format followed by that many bytes.

Example:

```text
Sending:
    [0x41, 0x76, 0x61, 0x78]
Writes to the socket:
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x41, 0x76, 0x61, 0x78]
```

## IPC Socket URL Format

The names of the sockets are of the form `<network_id>-<chain_id>-<event_type>` where `<event_type>`
is either `consensus` or `decisions`. The consensus socket receives vertices and blocks and while
the decisions socket receives individual transactions.

## Format

This API uses the `json 2.0` RPC format.

## Endpoint

`/ext/ipcs`

## Methods

### `ipcs.publishBlockchain`

:::caution

Deprecated as of [**v1.9.12**](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.12).

:::

Register a blockchain so it publishes accepted vertices to a Unix domain socket.

**Signature:**

```sh
ipcs.publishBlockchain({blockchainID: string}) -> {consensusURL: string, decisionsURL: string}
```

- `blockchainID` is the blockchain that will publish accepted vertices.
- `consensusURL` is the path of the Unix domain socket the vertices are published to.
- `decisionsURL` is the path of the Unix domain socket the transactions are published to.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.publishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "decisionsURL": "/tmp/1-11111111111111111111111111111111LpoYY-consensus",
    "consensusURL": "/tmp/1-11111111111111111111111111111111LpoYY-decisions"
  },
  "id": 1
}
```

### `ipcs.unpublishBlockchain`

:::caution

Deprecated as of [**v1.9.12**](https://github.com/ava-labs/avalanchego/releases/tag/v1.9.12).

:::

Deregister a blockchain so that it no longer publishes to a Unix domain socket.

**Signature:**

```sh
ipcs.unpublishBlockchain({blockchainID: string}) -> {}
```

- `blockchainID` is the blockchain that will no longer publish to a Unix domain socket.

**Example Call:**

```sh
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "ipcs.unpublishBlockchain",
    "params":{
        "blockchainID":"11111111111111111111111111111111LpoYY"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/ipcs
```

**Example Response:**

```json
{
  "jsonrpc": "2.0",
  "result": {},
  "id": 1
}
```
