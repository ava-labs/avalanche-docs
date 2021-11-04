# 启动您的以太坊 Dapp

## 概述

本文档的目的是帮助您在 Avalanche 上启动您现有的 dapp。本文包含一系列资源，旨在帮助您了解 Avalanche 平台的基础知识及其工作原理、演示如何连接到网络、如何使用现有工具和环境在 Avalanche 上进行开发和部署，以及在 Avalanche 上运行 dapp 时需要考虑的一些常见陷阱。

## 平台基础知识

Avalanche 是一个[由多个网络构建的网络](../../../learn/platform-overview/)。这意味着它不是运行单一、统一类型区块的单一链。它包含多个子网，每个子网运行多个异构链的其中之一。但是要在具有即时最终性的低费用、快速网络上运行以太坊 dapp，而我们现在不需要担心这一点。如果您愿意，可以使用上面的链接找到更多信息，但您现在需要知道的是，在 Avalanche 主网上运行的其中一个链是 C-Chain（合约链）。

C-Chain 运行一个名为 [coreth](https://github.com/ava-labs/coreth) 的 [go-ethereum](https://geth.ethereum.org/docs/rpc/server) 分支，其网络和共识部分替换为 Avalanche 对等部分。剩下的是以太坊虚拟机，它运行 Solidity 智能合约并管理链上的数据结构和区块。因此，您获得一个区块链，该区块链可以运行来自以太坊的所有 Solidity 智能合约，但具有 [Avalanche 革命性共识](../../../learn/platform-overview/avalanche-consensus.md)所实现的更大交易带宽和即时最终性。

Coreth 作为插件加载到 [AvalancheGo](https://github.com/ava-labs/avalanchego) 中，AvalancheGo 是用于运行 Avalanche 网络的客户端节点应用程序。

就您的 dapp 而言，它将与在以太坊上运行相同，只是更快且更便宜。让我们来了解工作原理。

## 访问 Avalanche C-Chain

C-Chain 公开了与 go-ethereum [相同的 API](../../avalanchego-apis/contract-chain-c-chain-api.md)，因此您可以使用以太坊上可用的所有熟悉的 API 与平台进行交互。

使用 C-Chain 有多种方式。

### 通过 MetaMask

您可以通过定义自定义网络，经由 MetaMask 访问 C-Chain。转到 MetaMask，登录，单击网络下拉列表，然后选择“自定义 RPC”。Avalanche 的数据如下。

#### **Avalanche 主网设置：**

* **网络名称**：Avalanche Mainnet C-Chain
* **新的 RPC 网址**：[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **链 ID**：`43114`
* **符号**：`AVAX`
* **浏览器**：[https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI 测试网设置：**

* **网络名称**：Avalanche FUJI C-Chain
* **新的 RPC 网址**：[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **链 ID**：`43113`
* **符号**：`AVAX`
* **浏览器**：[https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

在您应用程序的 Web 界面中，您可以[通过编程方式添加 Avalanche](../smart-contracts/add-avalanche-to-metamask-programmatically.md)，这样您的用户就不必手动输入网络数据。如果要查看添加自定义网络流的实际操作，请查看 [Pangolin DEX](https://app.pangolin.exchange/)。

### 使用公共 API 节点

您可以使用公共 API，而不是通过 MetaMask 来代理网络操作，该 API 由负载均衡器后面的许多 AvalancheGo 节点组成。

C-Chain API 端点是 [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)（用于主网）和 [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)（用于测试网）。

有关详细信息，请参阅文档：

{% page-ref page="../../tools/public-api.md" %}

### 运行您自己的节点

如果您不希望您的 dapp 依赖于您无法控制的中心化服务，则您可以运行自己的节点并以这种方式访问网络。运行您自己的节点还可以避免公共 API 拥塞和速率限制的潜在问题。

出于开发目的，[这里](../nodes-and-staking/run-avalanche-node.md)有一个下载、构建和安装 AvalancheGo 的教程。如果您要在 Linux 机器上运行生产节点，[这里](../nodes-and-staking/set-up-node-with-installer.md)有一个教程，展示了如何使用安装程序脚本快速轻松地将节点安装为 `systemd` 服务。脚本还可以处理节点升级。如果您想在 Docker 容器中运行节点，则 AvalancheGo 储存库中有用于各种 Docker 配置的[构建脚本](https://github.com/ava-labs/avalanchego/tree/master/scripts)。

### 运行本地测试网络

如果您需要一个专用测试网络来测试您的 dapp，[Avash](https://github.com/ava-labs/avash) 是一个用于启动本地 Avalanche 网络的 shell 客户端，类似于以太坊上的 Ganache。

Avash 使用 Lua 作为脚本语言来编排本地网络。

有关详细信息，请参阅文档：

{% page-ref page="../../tools/avash.md" %}

## 开发和部署合约

作为兼容以太坊的区块链，所有常用的以太坊开发工具和环境都可用于为 Avalanche 的 C-Chain 开发和部署 dapp。

### Remix

有一个使用 Remix 在 Avalanche 上部署智能合约的教程。它依赖 MetaMask 来访问 Avalanche 网络。

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### Truffle

您还可以使用 Truffle 在 Avalanche 上测试和部署智能合约。在本教程中了解具体操作：

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

### hardhat

Hardhat 是 Solidity 智能合约的最新开发和测试环境，也是我们的开发人员使用最多的环境。由于其测试支持表现出色，推荐将其作为 Avalanche 的开发方式。

有关详细信息，请参阅：

{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}

## Avalanche 浏览器

智能合约开发环境的一个重要部分是浏览器，它为区块链数据编制索引并提供服务。主网 C-Chain 浏览器可在 [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/) 获得，而测试网浏览器可在 [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/) 获得。除了 Web 界面，它还公开了标准[以太坊 JSON RPC API](https://eth.wiki/json-rpc/API)。

## Avalanche 水龙头

出于开发目的，您将需要测试代币。Avalanche 有一个[水龙头](https://faucet.avax-test.network/)，可以将测试代币发放到您选择的地址。在那里粘贴您的 C-Chain 地址。

如果需要，您也可以在本地运行水龙头，但要从[储存库](https://github.com/ava-labs/avalanche-faucet)对其进行构建。

## 合约验证

智能合约验证通过发布源代码，为与智能合约交互的用户提供了透明度，让每个人都可以证明其确实已履约。您可以使用 [C-Chain 浏览器](https://cchain.explorer.avax.network/)验证您的智能合约。程序很简单：

* 在浏览器上导航到已发布的合约地址
* 在 `code` 选项卡上选择 `verify & publish`
* 复制并粘贴扁平化的源代码，并完全按照已发布合约中的格式，输入所有构建参数
* 点击 `verify & publish`

如果成功，`code` 选项卡现在将有一个绿色复选标记，您的用户将能够验证您的合约内容。这是一个强烈的积极信号，表明您的用户可以信任您的合约，强烈建议将其用于所有生产合约。

请参阅[此文](../smart-contracts/verify-smart-contracts-with-sourcify-truffle.md)了解 Sourcify 和 Truffle 的详细教程。

## 合约安全检查

由于分布式应用程序的性质，一旦部署应用程序之后，就很难修复错误。因此，在部署之前确保您的应用程序正确且安全地运行非常重要。合约安全审查由专业公司和服务机构来完成。费用可能非常昂贵，这对于单个开发人员和初创公司来说可能难以承受。但是，也有免费使用的自动化服务和程序。

最流行的包括：

* [Slither](https://github.com/crytic/slither)，这里是一个[教程](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

如果无法进行专业的合约安全审查，我们强烈建议至少使用上述任何一种。可以在[此处](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md)找到关于安全开发实践的更全面介绍。

## 注意事项

Avalanche 平台的 C-Chain 与 EVM 兼容，但并不完全相同。您需要注意一些差异，否则，您可能会在 dapp 的行为方式中产生细微的错误或不一致情况。

以下是您应该注意的主要区别。

### 测量时间

以太坊习惯上使用区块高度进度指代时间。您不应该将此照搬到 Avalanche。Avalanche 上的链是静止的，这意味着如果没有活动，就不会产生区块。反之亦然，如果活动量很大，区块产生速度会非常快。因此，您不应通过生成的区块数来衡量时间的流逝。结果将不准确，并且您的合约可能会被第三方操纵。

您应该直接通过读取所生成区块的时间戳属性来衡量时间，而不是出块速度。时间戳必定是单调递增并且在实时的 30 秒内。

### 最终性

在以太坊上，区块链可以重组，区块可以被孤立，所以您不能依赖一个区块已经被接受的事实，而是等到该区块离尖端有几个区块的距离才能确认（通常，假设有 6 个位置深度的区块是安全的）。Avalanche 的情况并非如此。区块要在一、两秒内被接受或拒绝。一旦区块被接受，即为最终，并且不能被替换、放弃或修改。因此，在 Avalanche 上没有“确认次数”的概念。一旦某个区块被接受并在浏览器中可用，它就是最终的。

### gas 价格

Avalanche 上的 gas 被烧毁。验证者不会为自己保留 gas（他们会因质押而获得奖励），因此不存在动态的“gas 竞争”，即价高者先得。因此，永远不需要为您的交易设定较高的 gas 价格。这只会白白烧毁 gas。

### C-Chain 配置

包括 C-Chain 在内的各个链都有各自的配置选项，这些可以在配置文件中给定。在开发 dapp 时，您可能希望使用默认配置以外的 C-Chain 配置。有关链配置的更多详细信息，请参阅[此处。](../../references/command-line-interface.md#chain-configs)

C-Chain 配置文件应该在 `$HOME/.avalanchego/configs/chains/C/config.json`。您还可以通过选项 `--chain-config-dir` 告诉 AvalancheGo 在其他地方查找 C-Chain 配置文件。您可以在[这里](../../references/command-line-interface.md#coreth-config)查找 C-Chain 的完整配置选项。C-Chain 配置文件示例：

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true,
  "local-txs-enabled": true
}
```

{% hint style="warning" %}
如果您需要以太坊 [存档节点](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node)功能，则需要禁用 C-Chain 精简，该功能自 AvalancheGo v1.4.10 以来已默认启用。如要禁用精简，请将 `"pruning-enabled": false` 包含在 C-Chain 配置文件中。
{% endhint %}

### 通过公共 API 使用 `eth_newFilter` 和相关调用

如果您在公共 API 服务器上使用 [`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) API 方法，它可能不会像您预期的那样运行，因为公共 API 实际上是负载均衡器后面的几个节点。如果您进行 `eth_newFilter` 调用，则后续调用 [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) 可能不会像第一次调用一样在同一节点上完成，并且您最终会得到未定义的结果。

如果您需要日志过滤功能，您应该使用 websocket 连接，以确保您的客户端始终与负载均衡器后面的同一个节点进行通信。或者，您可以使用 [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs) 或运行您自己的节点，并对其进行 API 调用。

## 支持

通过本教程，您应该能够快速掌握 Avalanche，以及部署和测试您的 dapp。如果您有疑问、问题或想与我们沟通，您可以通过我们的公共 [Discord](https://chat.avalabs.org/) 服务器与我们联系。我们很乐意听取您的意见并了解您在 Avalanche 上构建的内容！

