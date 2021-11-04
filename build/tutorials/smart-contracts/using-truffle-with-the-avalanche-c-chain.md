# 将 Truffle 与 Avalanche C-Chain 结合使用

## 简介

[Truffle Suite](https://www.trufflesuite.com) 是一个用于在 EVM 上启动去中心化应用程序 (dapp) 的工具套件。使用 Truffle，您可以编写和编译智能合约、构建工件、运行迁移并与已部署的合约进行交互。本教程说明了如何将 Truffle 与 Avalanche 的 C-Chain（EVM 的一个实例）结合使用。

## 要求

您完成了 [Avalanche 节点运行](../nodes-and-staking/run-avalanche-node.md)流程，熟悉了 [Avalanche 的架构](../../../learn/platform-overview/)。您还通过[在 X-Chain 和 C-Chain 之间转移 AVAX](../platform/transfer-avax-between-x-chain-and-c-chain.md)教程执行了跨链互换，将资金转至您的 C-Chain 地址。

## 依赖关系

* [Avash](https://github.com/ava-labs/avash) 是一个用于运行本地 Avalanche 网络的工具。它类似于 Truffle 的 [Ganache](https://www.trufflesuite.com/ganache)。
* [NodeJS](https://nodejs.org/en) v8.9.4 或更高版本。
* Truffle，您可以用 `npm install -g truffle` 安装

## 启动本地 Avalanche 网络

[Avash](https://github.com/ava-labs/avash) 允许您使用多达 15 个开箱即用的 AvalancheGo 节点来加速专用测试网络部署。Avash 支持通过 lua 脚本自动执行常规任务。这可以针对各种配置实现快速测试。第一次使用 avash 时，您需要[进行安装和构建](https://github.com/ava-labs/avash#quick-setup)。

启动一个五节点的本地 Avalanche 网络：

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

五节点 Avalanche 网络正在您的机器上运行。当您想退出 Avash 时，请运行 `exit`，但现在不要运行，也不要关闭此终端选项卡。

## 创建 Truffle 目录并安装依赖项

打开一个新的终端选项卡，以便我们可以创建一个 `truffle` 目录并安装更多的依赖项。

首先，导航到您打算在其中创建 `truffle` 工作目录的目录：

```text
cd /path/to/directory
```

创建一个新目录并取名为 `truffle`：

```text
mkdir truffle; cd truffle
```

使用 `npm` 安装 [web3](https://web3js.readthedocs.io)，这是一个我们可以通过它与 EVM 通信的库：

```text
npm install web3 -s
```

我们将使用 web3 来设置 HTTP Provider，这是 web3 与 EVM 通信的方式。最后，创建一个 boilerplace truffle 项目：

```text
truffle init
```

Avash 中的开发（本地）网络在创建时预先对一些静态地址进行注资。我们将使用 [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) 将这些预先注资的地址用作我们的账户。

```text
npm install @truffle/hdwallet-provider
```

## 更新 truffle-config.js

运行 `truffle-config.js` 时创建的文件之一是 `truffle init`。将以下内容添加到 `truffle-config.js`。

```javascript
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const protocol = "http";
const ip = "localhost";
const port = 9650;
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}:${port}/ext/bc/C/rpc`
);

const privateKeys = [
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
  "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
  "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
  "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
  "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
  "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
  "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
  "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
  "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
  "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a",
];

module.exports = {
  networks: {
    development: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
    },
  },
};
```

请注意，如果您想将 API 调用定向到不同的 AvalancheGo 节点，您可以更改 `protocol`、`ip` 和 `port`。另请注意，我们为 Avalanche C-Chain 将 `gasPrice` 和 `gas` 设置到适当的值。

## 添加 Storage.sol

在 `contracts` 目录中添加一个名为 `Storage.sol` 的新文件，并添加以下代码块：

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

`Storage` 是一个 Solidity 智能合约，使我们可以通过 `store` 函数将一个数字写入区块链，然后通过 `retrieve` 函数从区块链中读取该数字。

## 添加新迁移

在名为 `2_deploy_contracts.js` 的 `migrations` 目录中创建一个新文件，并添加以下代码块。这会将 `Storage` 智能合约部署到区块链。

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## 使用 Truffle 编译合约

任何时候如果您更改 `Storage.sol`，都需要运行 `truffle compile`。

```text
truffle compile
```

您应能看到：

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## C-chain 上的账户

将智能合约部署到 C-Chain 时，truffle 将默认为您的 C-Chain 客户端提供的第一个可用账户，作为迁移期间使用的 `from` 地址。我们添加了一些预定义的私钥作为我们在 `truffle-config.json` 中的账户。第一个账户和默认账户应该预先注资一些 AVAX。

### Truffle 账户

您可以使用 truffle 控制台查看导入的账户。

要打开 Truffle 控制台：

```bash
$ truffle console --network development
```

注意：如果看到 `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`，则需要等到网络完成引导并准备就绪。这应该不会花太长时间。

Truffle 控制台内部：

```bash
truffle(development)> accounts
[
  '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  '0x9632a79656af553F58738B0FB750320158495942',
  '0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430',
  '0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4',
  '0x0B891dB1901D4875056896f28B6665083935C7A8',
  '0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2',
  '0x78A23300E04FB5d5D2820E23cc679738982e1fd5',
  '0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293',
  '0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB',
  '0x0Fa8EA536Be85F32724D57A37758761B86416123'
]
```

您可以通过以下方式查看余额：

```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```

请注意，`accounts[0]`（默认账户）有一些余额，而 `accounts[1]` 没有余额。

### 为账户注资编写脚本

有一个为 `accounts` 列表注资的方便脚本。您可以在[此处](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/fund-cchain-addresses.js)找到。您也可以使用以下命令进行下载：

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

您可以通过以下方式运行脚本：

```text
truffle exec fund-cchain-addresses.js --network development
```

脚本将为上面 `accounts` 列表中的每个账户注资 1,000 个 AVAX。在成功运行脚本后，您可以通过以下方式检查余额：

```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### 为您的账户注资

如果您想为自己的账户注资，请按照[在 X-Chain 和 C-Chain 之间转移 AVAX](../platform/transfer-avax-between-x-chain-and-c-chain.md)教程中的步骤进行操作。您至少需要向账户发送 `135422040` 个 nAVAX，以支付合约部署的费用。

### Personal API

Personal API 与节点的账户交互。`web3` 有一些使用该 API 的函数，例如：`web3.eth.personal.newAccount`、`web3.eth.personal.unlockAccount` 等...但是，此 API 默认禁用。可以用 `Coreth`/`C-chain` 配置来启用。Avash 目前不支持启用此 API。所以如果您想使用这些功能，您需要用 `personal-api-enabled` 手动运行您自己的网络。请参阅[创建本地测试网络/手动](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually)和 [C-Chain 配置](https://docs.avax.network/build/references/command-line-interface#c-chain-configs)。

## 运行迁移

现在一切就绪，可以运行迁移和部署 `Storage` 合约：

```text
truffle(development)> migrate --network development
```

您应能看到：

```text
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      1
> Block gas limit: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        4
   > block timestamp:     1607734632
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.91683679
   > gas used:            176943 (0x2b32f)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.08316321 ETH

   -------------------------------------
   > Total cost:          0.08316321 ETH

2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > block number:        6
   > block timestamp:     1607734633
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.8587791
   > gas used:            96189 (0x177bd)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH

   -------------------------------------
   > Total cost:          0.04520883 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

如果您没有在 C-Chain 上创建账户，您将看到以下错误：

```text
Error: Expected parameter 'from' not passed to function.
```

如果您没有为该账户注资，您将看到以下错误：

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

## 与您的合约交互

现在 `Storage` 合约已经部署完毕。让我们向区块链写入一个数字，然后将其读回。再次打开 truffle 控制台：

获取已部署 `Storage` 合约的实例：

```javascript
truffle(development)> let instance = await Storage.deployed()
```

这将返回：

```text
undefined
```

### 将数字写入区块链

现在您有了 `Storage` 合约的实例，调用它的 `store` 方法并传入一个数字来写入区块链。

```javascript
truffle(development)> instance.store(1234)
```

您会看到以下显示：

```javascript
{
  tx: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
  receipt: {
    blockHash: '0x8bacbce7c9d835db524bb856288e3a73a6afbe49ab34abd8cd8826db0240eb21',
    blockNumber: 9,
    contractAddress: null,
    cumulativeGasUsed: 26458,
    from: '0x34cb796d4d6a3e7f41c4465c65b9056fe2d3b8fd',
    gasUsed: 26458,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x0d507b0467baef742f9cc0e671eddbdf6df41d33',
    transactionHash: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
    transactionIndex: 0,
    rawLogs: []
  },
  logs: []
}
```

### 从区块链中读取一个数字

要从区块链中读取数字，请调用 `Storage`合约实例的 `retrieve` 方法。

```javascript
truffle(development)> let i = await instance.retrieve()
```

返回：

```javascript
undefined
```

调用 `retrieve` 的结果是一个 `BN`（大数）。调用它的 `.toNumber` 方法来查看值：

```javascript
truffle(development)> i.toNumber()
```

您应能看到您存储的数字。

```javascript
1234
```

## 摘要

现在您拥有启动本地 Avalanche 网络、创建 truffle 项目以及创建、编译、部署和与 Solidity 合约交互所需的工具。

