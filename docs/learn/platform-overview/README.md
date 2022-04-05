---
sidebar_position: 1
description: Avalanche features 3 built-in blockchains which includes Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain).  More info here. 
---

# Avalanche Platform Overview 

Avalanche features 3 built-in blockchains: [**Exchange Chain (X-Chain)**](#exchange-chain-x-chain), [**Platform Chain (P-Chain)**](#platform-chain-p-chain), and [**Contract Chain (C-Chain**)](#contract-chain-c-chain). All 3 blockchains are [validated](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) and secured by the [**Primary Network**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). The Primary Network is a special [subnet](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet), and all members of all custom subnets must also be a member of the Primary Network by staking at least 2,000 AVAX.

Here are tutorials on [creating a subnet](../../build/tutorials/platform/subnets/create-a-subnet.md) and [adding validators](../../build/tutorials/nodes-and-staking/add-a-validator.md) to a subnet.

![Primary network](/img/primary-network.png)

## Subnets

A **subnet**, or subnetwork, is a dynamic set of validators working together to achieve consensus on the state of a set of blockchains. Each blockchain is validated by exactly one subnet. A subnet can validate many blockchains. A node may be a member of many subnets.

A subnet manages its own membership, and it may require that its constituent validators have certain properties. This is very useful, and we explore its ramifications in more depth below:

### Compliance

Avalanche’s subnet architecture makes regulatory compliance manageable. As mentioned above, a subnet may require validators to meet a set of requirements.

Some examples of requirements include:

* Validators must be located in a given country
* Validators must pass a KYC/AML checks
* Validators must hold a certain license

(To be abundantly clear, the above examples are just that: examples. These requirements do not apply to the Avalanche Primary Network.)

### Support for Private Blockchains

You can create a subnet where only certain pre-defined validators may join and create a private subnet where the contents of the blockchains would be visible only to those validators. This is ideal for organizations interested in keeping their information private.

### Separation of Concerns

In a heterogeneous network of blockchains, some validators will not want to validate certain blockchains because they simply have no interest in those blockchains. The subnet model allows validators to only concern themselves with blockchains that they care about. This reduces the burden on validators.

### Application-Specific Requirements

Different blockchain-based applications may require validators to have certain properties. Suppose there is an application that requires large amounts of RAM or CPU power. A Subnet could require that validators meet certain [hardware requirements](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche) so that the application doesn’t suffer from low performance due to slow validators.

## Virtual Machines

A **Virtual Machine** (VM) defines the application-level logic of a blockchain. In technical terms, it specifies the blockchain’s state, state transition function, transactions, and the API through which users can interact with the blockchain. Every blockchain on Avalanche is an instance of a VM.

When you write a VM, you don't need to concern yourself with lower-level logic like networking, consensus, and the structure of the blockchain. Avalanche does this behind the scenes so you can focus on the thing you would like to build.

Think of a VM as a blueprint for a blockchain; you can use the same VM to create many blockchains, each of which follows the same ruleset but is logically independent of other blockchains.

### Why Virtual Machines?

At first, blockchain networks had one Virtual Machine (VM) with a pre-defined, static set of functionality. This rigid, monolithic design limited what blockchain-based applications one could run on such networks.

People who wanted custom decentralized applications had to create their own, entirely new blockchain network from scratch. Doing so required a great deal of time and effort, offered limited security, and generally resulted in a bespoke, fragile blockchain that never got off the ground.

Ethereum made a step toward solving this problem with smart contracts. Developers didn’t need to worry about networking and consensus, but creating decentralized applications was still hard. The Ethereum VM has low performance and imposes restrictions on smart contract developers. Solidity and the other few languages for writing Ethereum smart contracts are unfamiliar to most programmers.

Avalanche VMs (AVMs) make it easy to define a blockchain-based decentralized application. Rather than new, limited languages like Solidity, developers can write VMs in Go (other languages will be supported in the future).

### Creating Your Blockchain and Virtual Machine

Avalanche supports the creation of new instances of the Avalanche VM.
* [Create a Blockchain Running Subnet-EVM](../../build/tutorials/platform/subnets/create-evm-blockchain.md)
* [Create a Blockchain Running AVM](../../build/tutorials/platform/subnets/create-avm-blockchain.md)

Avalanche also supports creating custom blockchains with virtual machines.
* [Create a Virtual Machine (VM)](../../build/tutorials/platform/subnets/create-a-virtual-machine-vm.md)
* [Create a Custom Blockchain](../../build/tutorials/platform/subnets/create-custom-blockchain.md)

## Exchange Chain (X-Chain)

The **X-Chain** acts as a decentralized platform for creating and trading digital smart assets, a representation of a real-world resource (e.g., equity, bonds) with a set of rules that govern its behavior, like "can’t be traded until tomorrow" or "can only be sent to US citizens."

One asset traded on the X-Chain is AVAX. When you issue a transaction to a blockchain on Avalanche, you pay a fee denominated in AVAX.

The X-Chain is an instance of the Avalanche Virtual Machine (AVM). The [X-Chain API](../../build/avalanchego-apis/x-chain.mdx) allows clients to create and trade assets on the X-Chain and other instances of the AVM. See [this](../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md) for more details.


## Platform Chain (P-Chain)

The **P-Chain** is the metadata blockchain on Avalanche and coordinates validators, keeps track of active subnets, and enables the creation of new subnets. The P-Chain implements the [Snowman consensus protocol](../../#snowman-consensus-protocol).

The [P-Chain API](../../build/avalanchego-apis/p-chain.md) allows clients to create subnets, add validators to subnets, and create blockchains.

## Contract Chain (C-Chain)

The **C-Chain** allows for the creation smart contracts using the [C-Chain’s API](../../build/avalanchego-apis/c-chain.md).

The C-Chain is an instance of the Ethereum Virtual Machine powered by [Avalanche](../../).

