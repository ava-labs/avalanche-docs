---
tags: [Nodes]
description: If you experience any issues building your node, here are some common errors and possible solutions.
sidebar_label: Common Errors
pagination_label: Common Errors While Building a Node
sidebar_position: 5
---

# Common Errors While Building a Node

## Introduction

If you experience any issues building your node, here are some common errors and possible solutions.

### Error: `WARN node/node.go:291 failed to connect to bootstrap nodes`

This error can occur when the node doesn't have access to the Internet or if the NodeID 
is already being used by a different node in the network. This can occur when an old instance
is running and not terminated.

### Error: `err="cannot query unfinalized data"`

There may be a number of reasons for this issue, but it is likely that the node is not 
connected properly to other validators, which is usually caused by networking 
misconfiguration (wrong public IP, closed p2p port 9651).

### Error: `RPCChainVM protocol version mismatch between AvalancheGo and Virtual Machine plugin`

This error occurs when the RPCChainVM protocol version used by VMs like Subnet-EVM or Precompile-EVM are incompatible with
the protocol version of AvalancheGo. Make sure both are using compatible versions. You can 
follow the table provided below to check the Subnet-EVM versions compatible with each AvalancheGo release:

| RPCChainVM | AvalancheGo | Subnet-EVM | Precompile-EVM | HyperSDK |
| :--------: | :-------: | :-------: | :-------: | :-------: |
| 26 | v1.10.1-v1.10.4 | v0.5.1-v0.5.2 | v0.1.0-v0.1.1 | v0.0.6-v0.0.9 |
| 27 | v1.10.5-v1.10.8 | v0.5.3 | v0.1.2 | v0.0.10-v0.0.12 |
| **28** | v1.10.9-**v1.10.11(latest)** | v0.5.4-**v0.5.6 (latest)** | v0.1.3-**v0.1.4 (latest)** | v0.0.13-**v0.0.14 (latest)** |
