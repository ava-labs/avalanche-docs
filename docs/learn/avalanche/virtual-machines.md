---
tags: [Virtual Machines, Subnet-EVM]
description: Virtual Machine is a virtual environment inside blockchain networks that executes smart contracts and transactions according to predetermined rules and protocols.
keywords: [docs, avalanche, virtual machines, subnets, Subnet EVM]
sidebar_label: Virtual Machines
---

# Virtual Machines

In a nutshell, a **Virtual Machine** (VM) is the blueprint for a blockchain, meaning it defines
the application-level logic of a blockchain. In technical terms, it specifies the blockchain’s state,
state transition function, transactions, and the API through which users can interact with the
blockchain. 

You can use the same VM to create many blockchains, each of which follows the same rule-set but is
independent of all others.

## Why Run a VM on Avalanche?

_Developers with advanced use-cases for utilizing distributed ledger technology are often forced to build
their own blockchain from scratch, re-implement complex abstractions like networking and consensus,
all before even being able to start working on their new application._

**With Avalanche,**

- Developers can create a VM that defines how their blockchain 
should behave, and use this blueprint to coordinate validators in the network to run 
the application. 

- VMs can be written in any language, and use libraries and tech stacks that its creator
is familiar with. Developers have fine control over the behavior of their blockchain, and can redefine
the rules of a blockchain to fit any use-case they have.

- Developers don't need to concern yourself with lower-level logic
like networking, consensus, and the structure of the blockchain; Avalanche does
this behind the scenes so you can focus on building your Dapp, your ecosystem, and your community.


## How VMs Work

VMs communicate with Avalanche over a language agnostic request-response protocol known as
[RPC](https://en.wikipedia.org/wiki/Remote_procedure_call). This allows the VM framework to 
open a world of endless possibilities, as developers can implement their Dapps using 
the languages, frameworks, and libraries of their choice. To get started, create a VM out-of-the-box
with the [Subnet-EVM](/build/subnet/c-chain-vs-subnet.md) in Solidity, or design a custom VM with languages
like Golang, Rust, and many more.

## Running a VM

All Avalanche validators as members of the Avalanche Primary Network are required to run three VMs:

- Coreth: Defines the Contract Chain (C-Chain); supports smart contract functionality and is
EVM-compatible.
- Platform VM: Defines the Platform Chain (P-Chain); supports operations on staking and Subnets.
- Avalanche VM: Defines the Exchange Chain (X-Chain); supports operations on Avalanche Native
  Tokens.

All three can easily be run on any computer with [AvalancheGo](/nodes).

Validators can install additional VMs on their node to validate additional
[Subnets](subnets-overview.md) in the Avalanche ecosystem. In exchange, validators receive
staking rewards in the form of a reward token determined by the Subnets.

### Solidity

Avalanche natively supports the execution of Ethereum smart contracts written in solidity. Ethereum
developers have the option of deploying their smart contracts on the C-Chain's implementation of the
Ethereum Virtual Machine ([Coreth](https://github.com/ava-labs/coreth)),
or on their own Subnet using the
[Subnet-EVM](https://github.com/ava-labs/subnet-evm) for advanced use cases that require more customization.

Both C-Chain and the Subnet-EVM are compatible with Ethereum tooling like Remix, Core, MetaMask,
thirdweb, and more.

To learn more about smart contract support, click [here](build/dapp/launch-dapp.md).

### Golang

- [Coreth](https://github.com/ava-labs/coreth)
  - An implementation of the EVM that powers the Avalanche C-Chain that supports Solidity smart
  contracts.
- [Subnet-EVM](https://github.com/ava-labs/subnet-evm)
  - An implementation of the EVM that can be deployed to a custom Subnet to support Solidity smart
  contracts
- [TimestampVM](https://github.com/ava-labs/timestampvm)
  - A decentralized timestamp server
- [XSVM](https://github.com/ava-labs/xsvm)
  - An example of Avalanche Warp Messaging that implements Cross-Subnet asset transfers

See here for a tutorial on [How to Build a Simple Golang VM](/build/vm/create/golang-vm-simple.md)

### Rust

The following VMs were built using Rust via the [Avalanche Rust SDK](https://crates.io/crates/avalanche-types)

- [TimestampVM RS](https://github.com/ava-labs/timestampvm-rs)
  - A Rust implementation of TimestampVM

See here for a tutorial on [How to Build a Simple Rust VM](/build/vm/create/rust-vm.md)
