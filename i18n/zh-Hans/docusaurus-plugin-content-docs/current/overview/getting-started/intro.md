---
slug: /
---

# Overview

## Introduction

[Avalanche](https://avax.network) 是一个开放源码平台，用于启动 [分散的应用程序](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp) 和 enterprises [blockchain](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain) 部署在一个互可操作、高度可缩放的生态系统。 Avalanche是第一个为全球金融规模建立的分散式智能合同平台，几乎即刻完成交易。 Ethereum developers can quickly build on Avalanche as Solidity works out-of-the-box.

Avalanche和其他分散的网络之间的一个关键区别是协商一致的议定书。 随着时间的推移，人们达成了一种错误的理解，即区块链必须是缓慢和不可扩展的。 Avalanche议定书采用了一种新的协商一致办法，以实现其强有力的安全保障、快速的终局性和高吞吐量，而又不损害权力下放。

## AVAX

AVAX 是Avalanche的本地令牌。 这是一个硬封的、稀有的资产，用于支付费用，通过加盖来安全平台， 并在Avalanche上创建的多个子网之间提供一个基本的账户单位。 `1 nAVAX` 等于 `0.0000001 AVAX`。

## Avalanche 协商一致议定书

![Consensus Comparison](/img/Consensus-protocol-comparison.png)

Avalanche家庭的协议是通过重复次抽样投票运作的。 当 [验证器](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) 决定是否接受 [交易](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) 是否被拒绝， 它询问了一组小的、随机的验证组，无论他们认为交易应该被接受还是被拒绝。 如果查询验证器认为交易无效，已拒绝交易。 或者偏爱冲突的交易，它的答复是，它认为交易应当被拒绝。 否则，它就答复说，它认为交易应当被接受。

If a sufficiently large portion (_alpha_ α) of the validators sampled reply that they think the transaction should be accepted, the validator prefers to accept the transaction. That is, when it is queried about the transaction in the future, it will reply that it thinks the transaction should be accepted. Similarly, the validator will prefer to reject the transaction if a sufficiently large portion of the validators replies that they think the transaction should be rejected.

The validator repeats this sampling process until _alpha_ of the validators queried reply the same way (accept or reject) for _beta_ β consecutive rounds.

In the common case when a transaction has no conflicts, finalization happens very quickly. When conflicts exist, honest validators quickly cluster around conflicting transactions, entering a positive feedback loop until all correct validators prefer that transaction. This leads to the acceptance of non-conflicting transactions and the rejection of conflicting transactions.

![How Avalanche Consensus Works](/img/howavalancheconsensusworks.png)

It is guaranteed (with high probability based on system parameters) that if any honest validator accepts or rejects a transaction, all honest validators will accept or reject that transaction.

Learn more technical components of the Avalanche consensus protocol by reading the [whitepaper](https://arxiv.org/pdf/1906.08936.pdf).

## Snowman Consensus Protocol

Snowman is a chain-optimized consensus protocol–high-throughput, totally-ordered, and great for smart contracts. Snowman is powered by the [Avalanche consensus protocol](./#avalanche-consensus-protocol). Both [P-Chain](overview/getting-started/avalanche-platform.md#platform-chain-p-chain) and [C-Chain](overview/getting-started/avalanche-platform.md#contract-chain-c-chain) implement the Snowman consensus protocol.

## Key Features

### Speed

Uses a novel consensus protocol, developed by a team of Cornell computer scientists, and is able to permanently confirm transactions in under 1 second.

### Scalability

Capable of 4,500 transactions per second–an order of magnitude greater than existing blockchains.

### Security

Ensures stronger security guarantees well-above the 51% standard of other networks.

### Flexibility

Easily create custom blockchains and decentralized apps that contain almost any arbitrary logic.

### Sustainability

Uses energy-efficient proof-of-stake consensus algorithm rather than proof-of-work.

### Smart Contract Support

Supports the creation of Solidity smart contracts and your favorite Ethereum tools like Remix, Metamask, Truffle, and more.

### Private and Public Blockchains

Create your own public or private blockchains.

### Designed for Finance

Native support for easily creating and trading digital smart assets with complex, custom rulesets.
