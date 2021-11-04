---
description: 学习 Avalanche 的核心概念和架构
---

# 平台概览

Avalanche 内置 3 条区块链：[**交易链 \(X-Chain\)**](./#exchange-chain-x-chain)、[**平台链 \(P-Chain\)**](./#platform-chain-p-chain) 以及[**合约链 \(C-Chain**\)](./#contract-chain-c-chain)。所有 3 个区块链都由的[**主网](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)[验证](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)**和保护。主网是一个特殊的[子网](http://support.avalabs.org/en/articles/4064861-what-is-a-subnetwork-subnet)，所有自定义子网的所有成员也必须通过质押至少 2,000 个 AVAX 成为主网的成员。

以下是有关[创建子网](../../build/tutorials/platform/create-a-subnet.md)和向子网[添加验证者](../../build/tutorials/nodes-and-staking/add-a-validator.md)的教程。

![主网](../../.gitbook/assets/image%20%2821%29.png)

## 子网

**子网**或子网络是一组动态的验证者，它们协同工作以就一组区块链的状态达成共识。每个区块链都确切地由一个子网验证。一个子网可以验证许多区块链。一个节点可能是许多子网的成员。

子网管理自己的成员资格，并且可能要求其组成验证者具有某些属性。这非常有用，我们将在下面更深入地探讨其后果：

### 合规

Avalanche 的子网架构使合规性易于管理。如上所述，子网可能需要验证者来满足一组要求。

一些关于要求的例子包括：

* 验证者必须位于给定的国家/地区
* 验证者必须通过 KYC/AML 检查
* 验证者必须持有特定的许可证

（很明显，上面的例子只是：例子。这些要求不适用于 Avalanche 主网）。

### 支持私有区块链

您可以创建一个只有某些预定义验证者可以加入的子网，并创建一个私有子网，其中区块链的内容仅对这些验证者可见。这对于有意将其信息保密的组织来说是理想的选择。

### 关注点分离

在异构的区块链网络中，一些验证者不想验证某些区块链，因为它们根本对这些区块链不感兴趣。子网模型允许验证者只关注它们重视的区块链。这减轻了验证者的负担。

### 特定于应用程序的要求

不同的基于区块链的应用程序可能需要验证者具有某些属性。假设有一个应用程序需要占用大量的 RAM 或 CPU 性能。子网可能要求验证者满足某些[硬件要求](http://support.avalabs.org/en/articles/4064879-technical-requirements-for-running-a-validator-node-on-avalanche)，以便应用程序不会因验证者速度慢而导致性能低下。

## 虚拟机

**虚拟机 **\(VM\) 定义了区块链的应用层逻辑。在技术方面，它指定了区块链的状态、状态转换函数、交易以及用户可以与区块链交互的 API。Avalanche 上的每个区块链都是虚拟机的一个实例。

在编写虚拟机时，您无需关注网络、共识和区块链结构等底层逻辑。Avalanche 在幕后执行此操作，因此您可以专注于您想要构建的事物。

将虚拟机视为区块链的蓝图；您可以使用相同的虚拟机创建多个区块链，每个区块链都遵循相同的规则集，但在逻辑上独立于其他区块链。

### 为什么是虚拟机？

起初，区块链网络有一个具有预定义静态功能集的虚拟机 \(VM\)。这种僵化的整体设计限制了可以在此类网络上运行的基于区块链的应用程序。

想要定制去中心化应用程序的人必须从头开始创建自己全新的区块链网络。这样做需要大量的时间和精力，提供的安全性有限，并且通常会导致定制的、脆弱的区块链从未启动。

以太坊朝着通过智能合约解决这个问题迈出了一步。开发人员无需担心网络和共识，但创建去中心化应用程序仍然很困难。以太坊虚拟机性能低下，并且对智能合约开发人员施加了限制。大多数程序员都不熟悉 Solidity 和其他几种编写以太坊智能合约的语言。

Avalanche 虚拟机 \(AVM\) 可以轻松定义基于区块链的去中心化应用程序。开发人员可以用 Go 编写虚拟机，而不是像 Solidity 这样有限制的新语言（将来会支持其他语言）。

### 创建您的区块链和虚拟机

Avalanche 支持创建 Avalanche 虚拟机的新实例。

{% page-ref page="../../build/tutorials/platform/create-avm-blockchain.md" %}

Avalanche 还支持使用虚拟机创建自定义区块链。

{% page-ref page="../../build/tutorials/platform/create-a-virtual-machine-vm.md" %}

{% page-ref page="../../build/tutorials/platform/create-custom-blockchain.md" %}

## 交错链（X-链）

**X-Chain** 被用作创建和交易数字智能资产的去中心化平台，代表现实世界的资源（例如，股票、债券），具有一套治理其行为的规则，就像是“明天才能交易”或“只能发送给美国公民”。

在 X-Chain 上交易的一种资产是 AVAX。当您在 Avalanche 上向区块链发出交易时，您需要支付以 AVAX 计价的费用。

X-Chain 是 Avalanche 虚拟机 \(AVM\) 的实例。此 [X-Chain API](../../build/avalanchego-apis/exchange-chain-x-chain-api.md) 允许客户在 X-Chain 和 AVM 的其他实例上创建和交易资产。

{% page-ref page="../../build/tutorials/smart-digital-assets/create-a-fix-cap-asset.md" %}

## 平台链 \(P-Chain\)

**P-Chain **是 Avalanche 上的元数据区块链，可以协调验证者，追踪活动子网，并支持创建新子网。P-Chain 实现了[雪人共识协议](../../#snowman-consensus-protocol)。

[P-Chain API](../../build/avalanchego-apis/platform-chain-p-chain-api.md) 允许客户端创建子网、向子网添加验证者以及创建区块链。

## 合约链 \(C-Chain\)

**C-Chain **允许使用 [C-Chain 的 API](../../build/avalanchego-apis/contract-chain-c-chain-api.md) 创建智能合约。

C-Chain 是由 [Avalanche](../../) 提供支持的以太坊虚拟机（EVM）的实例。

