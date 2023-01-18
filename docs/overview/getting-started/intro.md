---
slug: /intro
---

# Overview

## Introduction

Avalanche is an open-source platform for building decentralized applications (Dapps) in one
interoperable, highly scalable ecosystem. Avalanche is the first ecosystem designed to accommodate
the scale of global finance, with near-instant transaction finality.

Avalanche empowers developers to join a rich ecosystem of interoperable and blockchains known as
Subnets. Subnets allow developers to isolate and scale their applications, enabling customization
for any use-case. Subnets can be permission-ed or permission-less, allowing Subnet creators to build
Dapps that support arbitrary levels of privacy and compliance.

Avalanche empowers developers to build Dapps in multiple languages through the Virtual Machine (VM)
framework. VMs are language agnostic, and grant developers rich amounts of flexibility in the
implementation of their Dapp.

Avalanche employs a novel consensus algorithm which allows it to have strong safety guarantees,
quick finality, and high throughput, without compromising decentralization.

The Avalanche protocol has relatively modest hardware requirements. The protocol is incredibly
lightweight, and can run on easily accessible consumer-grade hardware.

Avalanche is uses a proof-of-stake consensus model which is incredibly energy-efficient and
sustainable, consuming the same amount of energy as 46 US households. The entire Avalanche network
consumes only 0.0005% of the amount of energy consumed by Bitcoin.

## AVAX

AVAX is the native token of Avalanche. It’s a hard-capped, scarce asset that is used to pay for
fees, secure the platform through staking, and provide a basic unit of account between the multiple
Subnets created on Avalanche. `1 nAVAX` is equal to `0.000000001 AVAX`.

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

Validator operators are able to install additional VMs on their node to validate their corresponding
blockchains.

To learn more about VMs, click [here](/docs/subnets/introduction-to-vm.md).

### Subnets

Subnets are Avalanche's solution to scaling, and allow Avalanche to scale to handle an infinite
amount of Dapps in its ecosystem.

Interoperability between Subnets are supported through Avalanche Warp Messaging (AWM).

To learn more about Subnets, click [here](/docs/subnets/README.md).

### Smart Contracts

Ethereum developers have the option of deploying their smart contracts on the C-Chain's
implementation of the Ethereum Virtual Machine (EVM), or on their own isolated Subnet using the
Subnet-EVM.

Developers can use their favorite Ethereum tools like Remix,
MetaMask, Truffle, and more.

To learn more about smart contract support, click [here](/docs/dapps/launch-your-ethereum-dapp.md).