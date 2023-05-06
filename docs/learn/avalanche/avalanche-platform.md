---
description: Avalanche features 3 built-in blockchains which includes Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain).  More info here.
---

# The Primary Network

Avalanche is a heterogeneous network of blockchains. As opposed to homogeneous networks, where
all applications reside in the same chain, heterogeneous networks allow separate chains to be
created for different applications.

The Primary Network is essentially a [Subnet](subnets-overview.md) that runs three blockchains:

- The Contract Chain [(C-Chain)](avalanche-platform.md#contract-chain-c-chain)
- The Platform Chain [(P-Chain)](avalanche-platform.md#platform-chain-p-chain)
- The Exchange Chain [(X-Chain)](avalanche-platform.md#exchange-chain-x-chain)

A node can become a validator for the Primary Network by staking at least **2,000 AVAX**.

![Primary network](/img/primary-network.png)

## The Chains

All validators of the Primary Network are required to validate and secure the following:

### Contract Chain

The **C-Chain** is an implementation of the Ethereum Virtual Machine (EVM).
The [C-Chain’s API](../../apis/avalanchego/apis/c-chain.md) supports Geth's API and supports the
deployment and execution of smart contracts written in Solidity.

The C-Chain is an instance of the [Coreth](/learn/projects#coreth) Virtual Machine.

### Platform Chain 

The **P-Chain** is responsible for all validator and Subnet-level operations.
The [P-Chain API](../../apis/avalanchego/apis/p-chain.md) supports the creation of new
blockchains and Subnets, the addition of validators to Subnets, staking operations, and other
platform-level operations.

The P-Chain is an instance of the Platform Virtual Machine.

### Exchange Chain 

The **X-Chain** is responsible for operations on digital smart assets known as **Avalanche Native
Tokens**. A smart asset is a representation of a real-world resource (for example, equity, or a
bond) with sets of rules that govern its behavior, like "can’t be traded until tomorrow."
The [X-Chain API](../../apis/avalanchego/apis/x-chain.md) supports the creation and trade of
Avalanche Native Tokens.

One asset traded on the X-Chain is AVAX. When you issue a transaction to a blockchain on Avalanche,
you pay a fee denominated in AVAX.

The X-Chain is an instance of the Avalanche Virtual Machine (AVM).
