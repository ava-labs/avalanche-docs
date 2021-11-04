# 将交易所与 Avalanche C-Chain 集成

## 概览

本文档的目标是简要说明如何与 EVM 兼容的 Avalanche C-Chain 相集成。对于已支持 ETH 的团队，支持 C-Chain 与启动 Avalanche 节点（该节点具有与 [go-ethhoreum](https://geth.ethereum.org/docs/rpc/server) 相同的 [API](https://eth.wiki/json-rpc/API)）以及在创建交易时填充 Avalanche 的 ChainID (43114) 一样简单。

此外，Ava Labs 为称作 [Avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta) 的 C-Chain 实施 [Rosetta API](https://www.rosetta-api.org/)。您可以在随附的 Rosetta API 网站上了解此标准化集成路径。

## 使用 EVM 端点进行集成

### 运行 Avalanche 节点

如果您希望从源代码构建节点或将它包含在 docker 镜像中，请参阅 [AvalancheGo GitHub 储存库](https://github.com/ava-labs/avalanchego)。为了快速启动和运行，您可以使用[节点安装脚本](../nodes-and-staking/set-up-node-with-installer.md)，该脚本使用预先构建的二进制程序，自动安装和更新作为 Linux 系统服务的 avalanchego 节点。

### 配置 Avalanche 节点

[此处](../../references/command-line-interface.md)描述了所有配置选项及其默认值。

您可以在命令行上提供配置选项，或使用配置文件（在提供多个选项时这样做更容易使用）。您可以使用 `—config-file=config.json` 指定配置文件的位置，其中 `config.json` 是一个 JSON 文件，其密钥和值为选项名称和值。

单独的链（包括 C-Chain 在内）都拥有自己的配置选项，这些选项与节点级选项相分开。这些也可以在配置文件中指定。如需了解更多详情，请查看[此处](../../references/command-line-interface.md#chain-configs)。

C-Chain 配置文件应在 `$HOME/.avalanchego/configs/chains/C/config.json`。您还可以通过选项 `--chain-config-dir` 告诉 AvalancheGo 在其他地方查找 C-Chain 配置文件。C-Chain 配置文件示例：

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

### 与 C-Chain 交互

与 C-Chain 交互与 [go-ethhoreum](https://geth.ethereum.org/) 交互相同。您可以在[此处](../../avalanchego-apis/contract-chain-c-chain-api.md)查找 C-Chain API 的参考材料。

请注意，`personal_` 命名空间默认关闭。如要启用，您需要将适当的命令行开关传到节点，如上文配置示例所示。

## 使用 Rosetta 进行集成

[Rosetta](https://www.rosetta-api.org/) 是一套开源规格和工具集，通过为每个网络提供相同的 API 集，让不同区块链网络的集成变得更容易。Rosetta API 由 2 个核心组件组成，即 [Data API](https://www.rosetta-api.org/docs/data_api_introduction.html) 和 [Construction API](https://www.rosetta-api.org/docs/construction_api_introduction.html)。借助这些 API，任何人都可以通过标准通信协议以标准格式读取和写入区块链。这些 API 的规格可在 [rosetta 规格](https://github.com/coinbase/rosetta-specifications)储存库中找到。

您可以在[此处](https://github.com/ava-labs/avalanche-rosetta)找到 Avalanche C-Chain 的 Rosetta 服务器实施，您只需要使用适当的配置安装和运行服务器。配备了 Dockerfile，该文件打包了服务器和 Avalanche 客户端。详细的说明可在链接的储存库中找到。

## 创建交易

Avalanche C-Chain 交易与标准的 EVM 交易相同，但存在 2 个例外：

* 交易必须用 Avalanche 的 ChainID (43114) 来签名。
* 可以在[此处](../../../learn/platform-overview/transaction-fees.md#c-chain-fees)找到详细的动态 gas 费用。

出于开发目的，Avalanche 支持以太坊的所有流行工具，因此熟悉以太坊和 Solidity 的开发人员可以感到轻松自在。我们有多个流行开发环境的教程和储存库：

* [MetaMask 和 Remix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## 获取链上数据

您可以使用任何标准方式来获取用于以太坊网络的链上数据。

### 确定最终性

Avalanche 共识提供 1-2 秒的快速和不可逆转最终性。如需查询最最新的最终区块，使用 `latest` 参数查询任何值（即区块、余额、状态等）。如果您在最后一个完成的区块上查询（即 eth_blockNumber 返回 10，您查询 11），将出现错误，指明无法查询未最终完成的数据（从 avalanchego@v1.3.2 起）。

### （可选）自定义 Golang SDK

如果您计划使用 golang 从 C-Chain 提取数据并放入您自己的系统，建议使用我们的自定义 [ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient)。标准 go-ehhoreum 以太坊客户端未能正确计算区块哈希值（在您调用 `block.Hash()` 时），因为它未考虑到 Avalanche C-Chain 区块中添加的 `[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)` 标头字段，该字段用于在链（X-Chain 和 P-Chain）之间移动 AVAX。您可以在[此处](../../../learn/platform-overview/)了解有关我们的多链提取详情（此内容超出了正常 C-Chain 集成的范围）。

如果您计划直接读取 JSON 响应或使用 web3.js（不会重新计算通过网络收到的哈希值）提取链上交易数据/日志/收据，应该不会遇到任何问题！

## 支持

如果您有任何问题或疑问，请直接与我们的开发人员联系，或在我们的公共 [Discord](https://chat.avalabs.org/) 服务器上与我们联系。

