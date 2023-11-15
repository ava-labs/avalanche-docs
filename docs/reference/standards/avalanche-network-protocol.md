---
tags: [Standards]
description: Avalanche network defines the core communication format between Avalanche nodes.
sidebar_label: Network Protocol
pagination_label: Avalanche Network Protocol
---

# Avalanche Network Protocol

## Overview

<!-- vale off -->

Avalanche network defines the core communication format between Avalanche nodes.
It uses the [primitive serialization](/reference/standards/serialization-primitives.md) format for
payload packing.

`"Containers"` are mentioned extensively in the description. A Container is
simply a generic term for blocks.

This document describes the protocol for peer-to-peer communication using Protocol Buffers (proto3). The protocol defines a set of messages exchanged between peers in a peer-to-peer network. Each message is represented by the `Message` proto message, which can encapsulate various types of messages, including network messages, state-sync messages, bootstrapping messages, consensus messages, and application messages.

## Message

The `Message` proto message is the main container for all peer-to-peer communication. It uses the `oneof` construct to represent different message types. The supported compression algorithms include Gzip and Zstd.

```proto
message Message {
  oneof message {
    bytes compressed_gzip = 1;
    bytes compressed_zstd = 2;
    // ... (other compression algorithms can be added)
    Ping ping = 11;
    Pong pong = 12;
    Version version = 13;
    PeerList peer_list = 14;
    // ... (other message types)
  }
}
```

### Compression

The `compressed_gzip` and `compressed_zstd` fields are used for Gzip and Zstd compression, respectively, of the encapsulated message. These fields are set only if the message type supports compression.

## Network Messages

### Ping

The `Ping` message reports a peer's perceived uptime percentage.

```proto
message Ping {
  uint32 uptime = 1;
  repeated SubnetUptime subnet_uptimes = 2;
}
```

- `uptime`: Uptime percentage on the primary network [0, 100].
- `subnet_uptimes`: Uptime percentages on Subnets.

### Pong

The `Pong` message is sent in response to a `Ping` with the perceived uptime of the peer.

```proto
message Pong {
  uint32 uptime = 1; // Deprecated: uptime is now sent in Ping
  repeated SubnetUptime subnet_uptimes = 2; // Deprecated: uptime is now sent in Ping
}
```

### Version

The `Version` message is the first outbound message sent to a peer during the p2p handshake.

```proto
message Version {
  uint32 network_id = 1;
  uint64 my_time = 2;
  bytes ip_addr = 3;
  uint32 ip_port = 4;
  string my_version = 5;
  uint64 my_version_time = 6;
  bytes sig = 7;
  repeated bytes tracked_subnets = 8;
}
```

- `network_id`: Network identifier (e.g., local, testnet, Mainnet).
- `my_time`: Unix timestamp when the `Version` message was created.
- `ip_addr`: IP address of the peer.
- `ip_port`: IP port of the peer.
- `my_version`: Avalanche client version.
- `my_version_time`: Timestamp of the IP.
- `sig`: Signature of the peer IP port pair at a provided timestamp.
- `tracked_subnets`: Subnets the peer is tracking.

### PeerList

The `PeerList` message contains network-level metadata for a set of validators.

```proto
message PeerList {
  repeated ClaimedIpPort claimed_ip_ports = 1;
}
```

- `claimed_ip_ports`: List of claimed IP and port pairs.

### PeerListAck

The `PeerListAck` message is sent in response to `PeerList` to acknowledge the subset of peers that the peer will attempt to connect to.

```proto
message PeerListAck {
  reserved 1; // deprecated; used to be tx_ids
  repeated PeerAck peer_acks = 2;
}
```

- `peer_acks`: List of acknowledged peers.

## State-Sync Messages

### GetStateSummaryFrontier

The `GetStateSummaryFrontier` message requests a peer's most recently accepted state summary.

```proto
message GetStateSummaryFrontier {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.

### StateSummaryFrontier

The `StateSummaryFrontier` message is sent in response to a `GetStateSummaryFrontier` request.

```proto
message StateSummaryFrontier {
  bytes chain_id = 1;
  uint32 request_id = 2;
  bytes summary = 3;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `GetStateSummaryFrontier` request.
- `summary`: The requested state summary.

### GetAcceptedStateSummary

The `GetAcceptedStateSummary` message requests a set of state summaries at specified block heights.

```proto
message GetAcceptedStateSummary {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  repeated uint64 heights = 4;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `heights`: Heights being requested.

### AcceptedStateSummary

The `AcceptedStateSummary` message is sent in response to `GetAcceptedStateSummary`.

```proto
message AcceptedStateSummary {
  bytes chain_id = 1;
  uint32 request_id = 2;
  repeated bytes summary_ids = 3;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `GetAcceptedStateSummary` request.
- `summary_ids`: State summary IDs.

## Bootstrapping Messages

### GetAcceptedFrontier

The `GetAcceptedFrontier` message requests the accepted frontier from a peer.

```proto
message GetAcceptedFrontier {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  EngineType engine_type = 4;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `engine_type`: Consensus type the remote peer should use to handle this message.

### AcceptedFrontier

The `AcceptedFrontier` message contains the remote peer's last accepted frontier.

```proto
message AcceptedFrontier {
  reserved 4; // Until Cortina upgrade is activated
  bytes chain_id = 1;
  uint32 request_id = 2;
  bytes container_id = 3;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `GetAcceptedFrontier` request.
- `container_id`: The ID of the last accepted frontier.

### GetAccepted

The `GetAccepted` message sends a request with the sender's accepted frontier to a remote peer.

```proto
message GetAccepted {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  repeated bytes container_ids = 4;
  EngineType engine_type = 5;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this message.
- `deadline`: Timeout (ns) for this request.
- `container_ids`: The

sender's accepted frontier.

- `engine_type`: Consensus type to handle this message.

### Accepted

The `Accepted` message is sent in response to `GetAccepted`.

```proto
message Accepted {
  reserved 4; // Until Cortina upgrade is activated
  bytes chain_id = 1;
  uint32 request_id = 2;
  repeated bytes container_ids = 3;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `GetAccepted` request.
- `container_ids`: Subset of container IDs from the `GetAccepted` request that the sender has accepted.

### GetAncestors

The `GetAncestors` message requests the ancestors for a given container.

```proto
message GetAncestors {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  bytes container_id = 4;
  EngineType engine_type = 5;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `container_id`: Container for which ancestors are being requested.
- `engine_type`: Consensus type to handle this message.

### Ancestors

The `Ancestors` message is sent in response to `GetAncestors`.

```proto
message Ancestors {
  reserved 4; // Until Cortina upgrade is activated
  bytes chain_id = 1;
  uint32 request_id = 2;
  repeated bytes containers = 3;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `GetAncestors` request.
- `containers`: Ancestry for the requested container.

## Consensus Messages

### Get

The `Get` message requests a container from a remote peer.

```proto
message Get {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  bytes container_id = 4;
  EngineType engine_type = 5;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `container_id`: Container being requested.
- `engine_type`: Consensus type to handle this message.

### Put

The `Put` message is sent in response to `Get` with the requested block.

```proto
message Put {
  bytes chain_id = 1;
  uint32 request_id = 2;
  bytes container = 3;
  EngineType engine_type = 4;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `Get` request.
- `container`: Requested container.
- `engine_type`: Consensus type to handle this message.

### PushQuery

The `PushQuery` message requests the preferences of a remote peer given a container.

```proto
message PushQuery {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  bytes container = 4;
  EngineType engine_type = 5;
  uint64 requested_height = 6;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `container`: Container being gossiped.
- `engine_type`: Consensus type to handle this message.
- `requested_height`: Requesting peer's last accepted height.

### PullQuery

The `PullQuery` message requests the preferences of a remote peer given a container id.

```proto
message PullQuery {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  bytes container_id = 4;
  EngineType engine_type = 5;
  uint64 requested_height = 6;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `container_id`: Container id being gossiped.
- `engine_type`: Consensus type to handle this message.
- `requested_height`: Requesting peer's last accepted height.

### Chits

The `Chits` message contains the preferences of a peer in response to a `PushQuery` or `PullQuery` message.

```proto
message Chits {
  bytes chain_id = 1;
  uint32 request_id = 2;
  bytes preferred_id = 3;
  bytes accepted_id = 4;
  bytes preferred_id_at_height = 5;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `PushQuery`/`PullQuery` request.
- `preferred_id`: Currently preferred block.
- `accepted_id`: Last accepted block.
- `preferred_id_at_height`: Currently preferred block at the requested height.

## Application Messages

### AppRequest

The `AppRequest` message is a VM-defined request.

```proto
message AppRequest {
  bytes chain_id = 1;
  uint32 request_id = 2;
  uint64 deadline = 3;
  bytes app_bytes = 4;
}
```

- `chain_id`: Chain being requested from.
- `request_id`: Unique identifier for this request.
- `deadline`: Timeout (ns) for this request.
- `app_bytes`: Request body.

### AppResponse

The `AppResponse` message is a VM-defined response sent in response to `AppRequest`.

```proto
message AppResponse {
  bytes chain_id = 1;
  uint32 request_id = 2;
  bytes app_bytes = 3;
}
```

- `chain_id`: Chain being responded from.
- `request_id`: Request ID of the original `AppRequest`.
- `app_bytes`: Response body.

### AppGossip

The `AppGossip` message is a VM-defined message.

```proto
message AppGossip {
  bytes chain_id = 1;
  bytes app_bytes = 2;
}
```

- `chain_id`: Chain the message is for.
- `app_bytes`: Message body.

<!-- vale on -->
