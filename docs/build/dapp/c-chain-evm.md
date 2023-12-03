---
tags: [Build, Dapps]
description: Avalanche C-Chain is a blockchain that can run all the Solidity smart contracts from Ethereum, but with much greater transaction bandwidth and instant finality from Avalanche's revolutionary consensus mechanism.
sidebar_label: What to Expect
pagination_label: Building on the C-Chain
---

# Building on the C-Chain

Avalanche is a [network of networks](learn/avalanche/avalanche-platform.md). One of the chains
running on Avalanche Primary Network is an EVM fork called the C-Chain (contract chain).

C-Chain runs a fork of [`go-ethereum`](https://geth.ethereum.org/docs/rpc/server)
called [`coreth`](https://github.com/ava-labs/coreth) that has the networking and
consensus portions replaced with Avalanche equivalents. What's left is the
Ethereum VM, which runs Solidity smart contracts and manages data structures and
blocks on the chain. As a result, you get a blockchain that can run all the
Solidity smart contracts from Ethereum, but with much greater transaction
bandwidth and instant finality that
[Avalanche's revolutionary consensus](learn/avalanche/avalanche-consensus.md) enables.

Coreth is loaded as a plugin into
[AvalancheGo](https://github.com/ava-labs/avalanchego), the client node
application used to run Avalanche network. Any Dapp deployed to Avalanche C-Chain will be running
the same as on Ethereum, just faster and cheaper.
