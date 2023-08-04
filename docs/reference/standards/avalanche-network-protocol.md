---
tags: [Standards]
description: Avalanche network defines the core communication format between Avalanche nodes.
sidebar_label: Network Protocol
pagination_label: Avalanche Network Protocol
---

# Avalanche Network Protocol

Avalanche network defines the core communication format between Avalanche nodes.
It uses the [primitive serialization](/reference/standards/serialization-primitives.md) format for
payload packing.

`"Containers"` are mentioned extensively in the description. A Container is
simply a generic term for blocks.

## GetVersion

`GetVersion` requests for a `Version` message to be sent as a response.

The OpCode used by `GetVersion` messages is: `0x00`.

### What GetVersion Contains

The payload of a `GetVersion` message is empty.

```text
[]
```

### How GetVersion Is Handled

A node receiving a `GetVersion` message must respond with a `Version` message
containing the current time and node version.

### When GetVersion Is Sent

`GetVersion` is sent when a node is connected to another node, but has not yet
received a `Version` message. It may, however, be re-sent at any time.

## Version

`Version` ensures that the nodes we are connected to are running compatible
versions of Avalanche, and at least loosely agree on the current time.

The OpCode used by `Version` messages is: `0x01`.

### What Version Contains

`Version` contains the node’s current time in Unix time format in number of
milliseconds since the beginning of the epoch in January 1, 1970, as well as a
version string describing the version of the code that the node is running.

Content:

```text
[
    Long   <- Unix Timestamp (Seconds)
    String <- Version String
]
```

### How Version Is Handled

If the versions are incompatible or the current times differ too much, the connection will be terminated.

### When Version Is Sent

`Version` is sent in response to a `GetVersion` message.

### Version Example

Sending a `Version` message with the time `November 16th, 2008 at 12:00am (UTC)` and the version `avalanche/0.0.1`

```text
[
    Long   <- 1226793600 = 0x00000000491f6280
    String <- "avalanche/0.0.1"
]
=
[
    0x00, 0x00, 0x00, 0x00, 0x49, 0x1f, 0x62, 0x80,
    0x00, 0x0f, 0x61, 0x76, 0x61, 0x6c, 0x61, 0x6e,
    0x63, 0x68, 0x65, 0x2f, 0x30, 0x2e, 0x30, 0x2e,
    0x31,
]
```

## GetPeers

### Overview

`GetPeers` requests that a `Peers` message be sent as a response.

The OpCode used by `GetPeers` messages is: `0x02`.

### What GetPeers Contains

The payload of a `GetPeers` message is empty.

```text
[]
```

### How GetPeers Is Handled

A node receiving `GetPeers` request must respond with a `Peers` message
containing the IP addresses of its connected, staking nodes.

### When GetPeers Is Sent

A node sends `GetPeers` messages upon startup to discover the participants in
the network. It may also periodically send `GetPeers` messages in order to
discover new nodes as they arrive in the network.

## Peers

### Overview

`Peers` message contains a list of peers, represented as IP Addresses. Note that
an IP Address contains both the IP and the port number, and supports both IPv4
and IPv6 format.

The OpCode used by `Peers` messages is: `0x03`.

### What Peers Contains

`Peers` contains the IP addresses of the staking nodes this node is currently connected to.

Content:

```text
[
    Variable Length IP Address Array
]
```

### How Peers Is Handled

On receiving a `Peers` message, a node should compare the nodes appearing in the
message to its own list of neighbors, and forge connections to any new nodes.

### When Peers Is Sent

`Peers` messages do not need to be sent in response to a `GetPeers` message, and
are sent periodically to announce newly arriving nodes. The default period for
such push gossip is 60 seconds.

### Peers Example

Sending a `Peers` message with the IP addresses `"127.0.0.1:9650"` and `"[2001:0db8:ac10:fe01::]:12345"`

```text
[
    Variable Length IP Address Array <- ["127.0.0.1:9650", "[2001:0db8:ac10:fe01::]:12345"]
]
=
[
    0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff,
    0x7f, 0x00, 0x00, 0x01, 0x25, 0xb2, 0x20, 0x01,
    0x0d, 0xb8, 0xac, 0x10, 0xfe, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39,
]
```

## Get

### Overview

A `Get` message requests a container, that is, block or vertex, from a node.

The OpCode used by `Get` messages is: `0x04`.

### What Get Contains

A `Get` message contains a `SubnetID`, `RequestID`, and `ContainerID`.

**`SubnetID`** defines which Subnets this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a
node. Each time a node sends an un-prompted message, the node will create a new
unique `RequestID` for the message.

**`ContainerID`** is the identifier of the requested container.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### How Get Is Handled

The node should reply with a `Put` message with the same `SubnetID`,
`RequestID`, and `ContainerID` along with the `Container` with the specified
identifier. Under correct situations, a node should only be asked for a
container that it has. Therefore, if the node does not have the specified
container, the `Get` message can safely be dropped.

### When Get Is Sent

A node will send a `Get` message to a node that tells us about the existence of
a container. For example, suppose we have two nodes: Rick and Morty. If Rick
sends a `PullQuery` message that contains a `ContainerID`, that Morty doesn’t
have the container for, then Morty will send a Get message containing the
missing `ContainerID`.

### Get Example

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x2122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x21, 0x22, 0x23, 0x24,
    0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b, 0x2c,
    0x2d, 0x2e, 0x2f, 0x30, 0x31, 0x32, 0x33, 0x34,
    0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c,
    0x3d, 0x3e, 0x3f, 0x40,
]
```

## Put

### Overview

A `Put` message provides a requested container to a node.

The OpCode used by `Put` messages is: `0x05`.

### What Put Contains

A `Put` message contains a `SubnetID`, `RequestID`, `ContainerID`, and `Container`.

**`SubnetID`** defines which Subnets this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`ContainerID`** is the identifier of the container this message is sending.

**`Container`** is the bytes of the container this message is sending.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### How Put Is Handled

The node should attempt to add the container to consensus.

### When Put Is Sent

A node will send a `Put` message in response to receiving a Get message for a
container the node has access to.

### Put Example

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x5ba080dcf6861c94c24ec62bc09a3c8b0fdd4691ebf02491e0e921dd0c77206f
    Container   <- 0x2122232425
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x5b, 0xa0, 0x80, 0xdc,
    0xf6, 0x86, 0x1c, 0x94, 0xc2, 0x4e, 0xc6, 0x2b,
    0xc0, 0x9a, 0x3c, 0x8b, 0x0f, 0xdd, 0x46, 0x91,
    0xeb, 0xf0, 0x24, 0x91, 0xe0, 0xe9, 0x21, 0xdd,
    0x0c, 0x77, 0x20, 0x6f, 0x00, 0x00, 0x00, 0x05,
    0x21, 0x22, 0x23, 0x24, 0x25,
]
```

## PushQuery

### Overview

A `PushQuery` message requests the preferred `containerIDs` from the node after
the specified `ContainerID` has been added to consensus. If the `ContainerID` is
not known, the `Container` is optimistically provided.

The OpCode used by `PushQuery` messages is: `0x06`.

### What PushQuery Contains

A `PushQuery` message contains a `SubnetID`, `RequestID`, `ContainerID`, and `Container`.

**`SubnetID`** defines which Subnets this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`ContainerID`** is the identifier of the container this message expects to
have been added to consensus before the response is sent.

**`Container`** is the bytes of the container with identifier `ContainerID`.

```text
[
    Length 32 Byte Array       <- SubnetID
    UInt                       <- RequestID
    Length 32 Byte Array       <- ContainerID
    Variable Length Byte Array <- Container
]
```

### How PushQuery Is Handled

The node should attempt to add the container to consensus. After the container
is added to consensus, a `Chits` message should be sent with the current
preferences of the node.

### When PushQuery Is Sent

A node should send a `PushQuery` message if it wants to learn of this node’s
current preferences and it feels that it is possible the node hasn’t learned of
`Container` yet. The node will want to learn of nodes preferences when it learns
of a new container or it has had pending containers for "awhile."

### PushQuery Example

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x5ba080dcf6861c94c24ec62bc09a3c8b0fdd4691ebf02491e0e921dd0c77206f
    Container   <- 0x2122232425
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x5b, 0xa0, 0x80, 0xdc,
    0xf6, 0x86, 0x1c, 0x94, 0xc2, 0x4e, 0xc6, 0x2b,
    0xc0, 0x9a, 0x3c, 0x8b, 0x0f, 0xdd, 0x46, 0x91,
    0xeb, 0xf0, 0x24, 0x91, 0xe0, 0xe9, 0x21, 0xdd,
    0x0c, 0x77, 0x20, 0x6f, 0x00, 0x00, 0x00, 0x05,
    0x21, 0x22, 0x23, 0x24, 0x25,
]
```

## PullQuery

### Overview

A `PullQuery` message requests the preferred `containerIDs` from the node after
the specified `ContainerID` has been added to consensus.

The OpCode used by `PullQuery` messages is: `0x07`.

### What PullQuery Contains

A `PullQuery` message contains a `SubnetID`, `RequestID`, and `ContainerID`.

**`SubnetID`** defines which Subnets this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`ContainerID`** is the identifier of the container this message expects to
have been added to consensus before the response is sent.

```text
[
    Length 32 Byte Array <- SubnetID
    UInt                 <- RequestID
    Length 32 Byte Array <- ContainerID
]
```

### How PullQuery Is Handled

If the node hasn’t added `ContainerID`, it should attempt to add the container
to consensus. After the container is added to consensus, a `Chits` message
should be sent with the current preferences of the node.

### When PullQuery Is Sent

A node should send a `PullQuery` message if it wants to learn of this node’s
current preferences and it feels that it quite likely the node has already
learned of `Container`. The node will want to learn of nodes preferences when it
learns of a new container or it has had pending containers for "awhile."

### PullQuery Example

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    ContainerID <- 0x5ba080dcf6861c94c24ec62bc09a3c8b0fdd4691ebf02491e0e921dd0c77206f
]
=
[
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
    0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
    0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
    0x00, 0x00, 0xa8, 0x66, 0x5b, 0xa0, 0x80, 0xdc,
    0xf6, 0x86, 0x1c, 0x94, 0xc2, 0x4e, 0xc6, 0x2b,
    0xc0, 0x9a, 0x3c, 0x8b, 0x0f, 0xdd, 0x46, 0x91,
    0xeb, 0xf0, 0x24, 0x91, 0xe0, 0xe9, 0x21, 0xdd,
    0x0c, 0x77, 0x20, 0x6f,
]
```

## Chits

### Overview

A `Chits` message provides a requested set of preferred containers to a node.

The OpCode used by `Chits` messages is: `0x08`.

### What Chits Contains

A `Chits` message contains a `SubnetID`, `RequestID`, and `Preferences`.

**`SubnetID`** defines which Subnets this message is destined for.

**`RequestID`** is a counter that helps keep track of the messages sent by a node.

**`Preferences`** is the list of `containerIDs` that fully describe the node’s preferences.

```text
[
    Length 32 Byte Array                         <- SubnetID
    UInt                                         <- RequestID
    Variable Length (Length 32 Byte Array) Array <- Preferences
]
```

### How Chits Is Handled

The node should attempt to add any referenced containers to consensus. If the
referenced containers can’t be added, the node can ignore the missing containers
and apply the remaining chits to the poll. Once a poll is completed, container
confidences should be updated appropriately.

### When Chits Is Sent

A node will send a `Chits` message in response to receiving a `PullQuery` or
`PushQuery` message for a container the node has added to consensus.

### Chits Example

```text
[
    SubnetID    <- 0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
    RequestID   <- 43110 = 0x0000A866
    Preferences <- [
        0x2122232425262728292a2b2c2d2e2f303132333435363738393a3b3c3d3e3f40,
        0x4142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f60,
    ]
]
=
[
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
        0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
        0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20,
        0x00, 0x00, 0xa8, 0x66, 0x00, 0x00, 0x00, 0x02,
        0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28,
        0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f, 0x30,
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38,
        0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f, 0x40,
        0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48,
        0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f, 0x50,
        0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58,
        0x59, 0x5a, 0x5b, 0x5c, 0x5d, 0x5e, 0x5f, 0x60,
]
```
