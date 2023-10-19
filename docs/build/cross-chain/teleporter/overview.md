---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter
keywords:
  [
    docs,
    documentation,
    avalanche,
    teleporter,
    awm,
    cross-subnet communication,
    cross-chain,
    cross-chain communication,
  ]
sidebar_label: Teleporter
---

# Avalanche Teleporter

Teleporter is an EVM compatible cross-subnet communication protocol built on top of
[Avalanche Warp Messaging (AWM)](/build/cross-chain/awm/overview.md), and implemented as
a Solidity smart contract. It provides a mechanism to asynchronously invoke smart contract functions
on other EVM blockchains within Avalanche. Teleporter provides a handful of useful features on top
of AWM, such as specifying relayer incentives for message delivery, replay protection, message
delivery and execution retries, and a standard interface for sending and receiving messages within
a dapp deployed across multiple Subnets.

It's important to understand the distinction between Avalanche Warp Messaging and Teleporter. AWM
allows Subnets to communicate with each other via authenticated messages by providing signing and
verification primitives in AvalancheGo. These are used by the blockchain VMs to sign outgoing
messages and verify incoming messages.

The Teleporter protocol, on the other hand, is implemented at the smart contract level, and is a
user-friendly interface to AWM, aimed at dapp developers. All of the message signing and
verification is abstracted away from developers. Instead, developers simply call
`sendCrossChainMessage` on the `TeleporterMessenger` contract to send a message invoking a smart
contract on another Subnet, and implement the `ITeleporterReceiver` interface to receive messages
on the destination Subnet. Teleporter handles all of the message signing and verification, as well
as the message delivery and execution.

:::note
Teleporter and Avalanche Warp Messaging are under active development and may cease to
function at any time. This repository is intended to be used for testing and development purposes
only and should **not** be used in production.
:::

## Resources

- List of blockchain signing cryptography algorithms [here](http://ethanfast.com/top-crypto.html).
- Background on stateful precompiles [here](https://medium.com/avalancheavax/customizing-the-evm-with-stateful-precompiles-f44a34f39efd).
- Tutorial on stateful precompiles [here](https://github.com/ava-labs/subnet-evm/blob/precompile-tutorial-only/cmd/README.md).
- Background on BLS signature aggregation [here](https://crypto.stanford.edu/~dabo/pubs/papers/BLSmultisig.html).
