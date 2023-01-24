---
description: Avalanche features 3 built-in blockchains which includes Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain).  More info here.
---

# Avalanche Platform

Avalanche is a heterogeneous network of blockchains. As opposed to homogeneous networks, where
all applications reside in the same chain, heterogeneous networks allow separate chains to be
created for different applications.

Avalanche is an ecosystem that allows users to execute smart contracts, interact with validators and
Subnets, and exchange assets. Avalanche is designed to support application-specific chains, so each
of these 3 supported operation types is implemented in its own blockchain.

These 3 blockchains are [validated](../../nodes/validate/staking.md) and secured by all validators
in the Avalanche network and is referred to as the Primary Network. Each Avalanche validator
validates:
the [**Exchange Chain (X-Chain)**](#exchange-chain-x-chain),
the [**Platform Chain (P-Chain)**](#platform-chain-p-chain), and
the [**Contract Chain (C-Chain**)](#contract-chain-c-chain).

![Primary network](/img/primary-network.png)

The Primary Network is a special [Subnet](../../subnets/README.md) that contains all validators
(including validators of any custom Subnets). A node can become a validator for the Primary
Network by staking at least 2,000 AVAX.

## Contract Chain (C-Chain)

The **C-Chain** is an implementation of the Ethereum Virtual Machine (EVM) allows for the
creation and execution of Solidity smart contracts using the
[C-Chain’s API](../../apis/avalanchego/apis/c-chain.md).

The C-Chain is an instance of the Coreth Virtual Machine.

## Platform Chain (P-Chain)

The **P-Chain** is responsible for all validator and Subnet-level operations.
The [P-Chain API](../../apis/avalanchego/apis/p-chain.md) supports the creation of new
blockchains and Subnets, the addition of validators to Subnets, staking operations, and other
platform-level operations.

The P-Chain is an instance of the Platform Virtual Machine.

## Exchange Chain (X-Chain)

The **X-Chain** is responsible for operations on digital smart assets known as **Avalanche Native
Assets**. A smart asset is a representation of a real-world resource (for example, equity, or a
bond)with sets of rules that govern its behavior, like "can’t be traded until tomorrow" or "can only
be sent to US citizens." The [X-Chain API](../../apis/avalanchego/apis/x-chain.md) supports the
creation and trade of Avalanche Native Assets.

One asset traded on the X-Chain is AVAX. When you issue a transaction to a blockchain on Avalanche,
you pay a fee denominated in AVAX.