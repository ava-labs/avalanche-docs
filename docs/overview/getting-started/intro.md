---
slug: /intro
---

# Overview

## Introduction

Avalanche is an open-source platform for building decentralized applications (Dapps) in one
interoperable, highly scalable ecosystem. Avalanche is the first ecosystem designed to accommodate
the scale of global finance, with near-instant transaction finality.

Avalanche empowers developers to join a rich ecosystem of blockchains known as Subnets. Subnets
are isolated clusters of the Avalanche network that allow any Dapp to run on its own dedicated set
of nodes, enabling unmatched levels of isolation, fault-tolerance, privacy, and compliance. Each
Dapp is isolated from other Dapps in the ecosystem, so increased usage on a single Dapp doesn't
affect other Dapps in their own Subnets in Avalanche.

In Avalanche, developers can create their Dapps by implementing them as a Virtual Machine (VM).
EVM developers can build on Avalanche's implementation of the EVM straight out-of-the box, or build
their own custom VM for advanced use cases. VMs are supported in multiple languages including Go
and Rust, giving developers unparalleled amounts of flexibility in their implementation.

Avalanche employs a novel proof-of-stake consensus algorithm which offers strong safety guarantees,
quick finality times, and high throughput, without compromising decentralization. Avalanche
consensus is incredibly energy-efficient and sustainable and can run on easily accessible
consumer-grade hardware, consuming the same amount of energy as 46 US households. The entire
Avalanche network consumes only 0.0005% of the amount of energy consumed by Bitcoin.

## Features

### Avalanche Consensus

Avalanche uses a revolutionary proof-of-stake consensus algorithm that is scalable, robust, and
energy-efficient. Avalanche consensus offers stronger security guarantees well-above the 51%
standard of other networks.

To learn more about consensus, click [here](/docs/overview/getting-started/avalanche-consensus.md).

### Virtual Machines

Avalanche allows developers to build Dapps through the Virtual Machine (VM) framework. VMs serve as
blockchain blueprints, and define the behavior of a blockchain application. VMs are language
agnostic, and are currently supported in multiple popular languages like Golang and Rust.

All Avalanche validators come out-of-the box three VMs:

- Coreth: Defines the Contract Chain (C-Chain); supports smart contracts written in Solidity.
- Platform VM: Defines the Platform Chain (P-Chain); supports operations on staking and Subnets.
- Avalanche VM: Defines the Exchange Chain (X-Chain); supports operations on Avalanche Native
  Assets.

Validators are able to install additional VMs on their node to validate additional blockchains.

To learn more about VMs, click [here](/docs/subnets/introduction-to-vm.md).

### Subnets

Subnets are Avalanche's solution to scaling, and allow Avalanche to scale to handle an infinite
amount of interoperable Dapps in its ecosystem.

To learn more about Subnets, click [here](/docs/subnets/README.md).

### Smart Contracts

Ethereum developers have the option of deploying their smart contracts on the C-Chain's
implementation of the Ethereum Virtual Machine (EVM), or on their own isolated Subnet using the
Subnet-EVM.

Developers can use their favorite Ethereum tools like Remix,
MetaMask, Truffle, and more.

To learn more about smart contract support, click [here](/docs/dapps/launch-your-ethereum-dapp.md).
