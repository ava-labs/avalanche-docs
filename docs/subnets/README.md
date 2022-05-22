---
sidebar_position: 1
---

# Subnets Overview

Avalanche features 3 built-in blockchains: Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain). All 3 blockchains are [validated](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) and secured by the [**Primary Network**](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). The Primary Network is a special subnet, and all members of all custom subnets must also be a member of the Primary Network by staking at least 2,000 AVAX.

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
* [Create an EVM Subnet on Local](./create-a-local-subnet.md)
* [Create an EVM Subnet on Fuji Testnet](./create-a-fuji-subnet.md)

Avalanche also supports creating custom blockchains with virtual machines.
* [Create a Virtual machine (VM)](create-a-virtual-machine-vm.md)
* [Create a Custom Blockchain](create-custom-blockchain.md)
