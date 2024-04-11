---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is an EVM-compatible cross-subnet communication protocol built on top of Avalanche Warp Messaging. This directory includes cross-chain applications that are built on top of the Teleporter protocol.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Example Applications
sidebar_position: 4
---

# Teleporter Cross Chain Applications

This directory includes cross-chain applications that are built on top of the [Teleporter protocol](https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/README.md).

## Example Applications

> Note: All example applications in the [examples](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/examples/) directory are meant for education purposes only and are not audited. The example contracts are not intended for use in production environments.

- `ERC20Bridge` allows cross-chain transfers of existing ERC20 assets. More details found [here](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/examples/ERC20Bridge/README.md)
- `ExampleMessenger` a simple cross chain messenger that demonstrates Teleporter application sending arbitrary string data. More details found [here](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/examples/ExampleMessenger/README.md)
- `VerifiedBlockHash` publishes the latest block hash of one chain to a destination chain that receives the hash and verifies the sender. Includes `BlockHashPublisher` and `BlockHashReceiver`. More details found [here](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/examples/VerifiedBlockHash/README.md)
- `NativeTokenBridge` demonstrates transferring both a native EVM token and ERC20 assets to be the native EVM token on another chain. More details found [here](https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/examples/NativeTokenBridge/README.md)