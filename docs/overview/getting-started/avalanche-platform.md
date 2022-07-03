---
description: Avalanche features 3 built-in blockchains which includes Exchange Chain (X-Chain), Platform Chain (P-Chain), and Contract Chain (C-Chain).  More info here.
---

# Avalanche Platform

Avalanche features 3 built-in blockchains: [**Exchange Chain (X-Chain)**](#exchange-chain-x-chain), [**Platform Chain (P-Chain)**](#platform-chain-p-chain), and [**Contract Chain (C-Chain**)](#contract-chain-c-chain). All 3 blockchains are [validated](../../nodes/validate/staking.md) and secured by all Avalanche validators which is also referred as the Primary Network. The Primary Network is a special [subnet](../../subnets/README.md), and all members of all custom Subnets must also be a member of the Primary Network by staking at least 2,000 AVAX.

![Primary network](/img/primary-network.png)

## Contract Chain (C-Chain)

The **C-Chain** allows for the creation smart contracts using the [C-Chain’s API](../../apis/avalanchego/apis/c-chain.md).

The C-Chain is an instance of the Ethereum Virtual Machine powered by [Avalanche](./intro.md).

## Platform Chain (P-Chain)

The **P-Chain** is the metadata blockchain on Avalanche and coordinates validators, keeps track of active Subnets, and enables the creation of new Subnets. The P-Chain implements the [Snowman consensus protocol](../../#snowman-consensus-protocol).

The [P-Chain API](../../apis/avalanchego/apis/p-chain.md) allows clients to create Subnets, add validators to Subnets, and create blockchains.

## Exchange Chain (X-Chain)

The **X-Chain** acts as a decentralized platform for creating and trading digital smart assets, a representation of a real-world resource (e.g., equity, bonds) with a set of rules that govern its behavior, like "can’t be traded until tomorrow" or "can only be sent to US citizens."

One asset traded on the X-Chain is AVAX. When you issue a transaction to a blockchain on Avalanche, you pay a fee denominated in AVAX.

The X-Chain is an instance of the Avalanche Virtual Machine (AVM). The [X-Chain API](../../apis/avalanchego/apis/x-chain.md) allows clients to create and trade assets on the X-Chain and other instances of the AVM.
