# 将 Hardhat 与 Avalanche C-Chain 结合使用

## 简介

Avalanche 是一个开源平台，用于在一个可互操作、高扩展性的生态系统中启动去中心化应用程序和进行企业区块链部署。Avalanche 可让您完全控制网络层和应用层，帮助您构建您能想象到的任何东西。

Avalanche 网络由许多区块链组成。这些区块链之一是 C-Chain（合约链），它是一个以太坊虚拟机实例。C-Chain 的 API 几乎与以太坊节点的 API 相同。Avalanche 提供与以太坊相同的接口，但具有更高的速度、更高的吞吐量、更低的费用和更短的交易确认时间。这些特性大大提高了 DApp 的性能以及智能合约的用户体验。

本指南的目标是讲解有关编写和测试智能合约，并将其将部署到 Avalanche 的 C-Chain 的最佳实践。我们将使用开发环境 [Hardhat](https://hardhat.org) 构建智能合约。

## 前提条件

### NodeJS 和 Yarn

首先，安装 [nodejs](https://nodejs.org/en) 的 LTS（长期支持）版本。撰写本文时，该版本为 `14.17.0`。NodeJS 捆绑包 `npm`。

接下来，安装 [yarn](https://yarnpkg.com)：

```text
npm install -g yarn
```

### AvalancheGo 和 Avash

[AvalancheGo](https://github.com/ava-labs/avalanchego) 是用 Go 编写的 Avalanche 节点实施。[Avash](https://docs.avax.network/build/tools/avash) 是一种快速部署本地测试网络的工具。您可以一起部署本地测试网络，并在其上运行测试。

### Solidity 和 Avalanche

对 [Solidity](https://docs.soliditylang.org) 和 [Avalanche](https://docs.avax.network) 有基本的了解也很有帮助。

## 依赖关系

克隆[快速入门储存库](https://github.com/ava-labs/avalanche-smart-contract-quickstart)并通过 `yarn` 安装必要的软件包。

```text
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## 编写合约

在 `contracts/` 中编辑 `Coin.sol` 合约。`Coin.sol` 是 [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) 合约。ERC20 是一种流行的智能合约接口。您还可以添加自己的合约。

## Hardhat 配置

Hardhat 将 `hardhat.config.js` 用作配置文件。您可以在该文件中定义任务、网络、编译器等。有关详细信息，请参阅[此处](https://hardhat.org/config/)。

在我们的储存库中，我们使用一个预先配置的文件 [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts)。此文件配置了必要的网络信息，以提供与 Avalanche 的顺畅交互。还有一些预定义的私钥用于在本地测试网络上进行测试。

## Hardhat 任务

您可以在 [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts) 中定义自定义 Hardhat 任务。有两个任务作为示例包括在内：`accounts`和`balances`。两者都有 [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) 格式的脚本。

```javascript
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts` 打印账户列表。`yarn balances` 打印 AVAX 账户余额列表。与其他 `yarn` 脚本一样，您可以将 `--network` 标志传递给 Hardhat 任务。

### 账户

打印本地 Avash 网络上的账户列表。

```text
$ yarn accounts --network local
yarn run v1.22.4
npx hardhat accounts --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
0x9632a79656af553F58738B0FB750320158495942
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4
0x0B891dB1901D4875056896f28B6665083935C7A8
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2
0x78A23300E04FB5d5D2820E23cc679738982e1fd5
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB
0x0Fa8EA536Be85F32724D57A37758761B86416123
```

### 余额

打印本地 Avash 网络上的账户列表及其相应的 AVAX 余额。

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

请注意，第一个账户已经注资。这是因为这个地址是在本地网络创世文件中预先注资的。

## Hardhat 帮助

运行 `yarn hardhat` 以列出 Hardhat 的版本、使用说明、全局选项和可用任务。

## 典型的 Avash 工作流程

### 运行 Avash

首先确认您已经构建最新的 AvalancheGo。

```text
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

（请注意，您也可以[下载预编译的 AvalancheGo 二进制文件](https://github.com/ava-labs/avalanchego/releases)，而不是从源代码构建。）

启动 Avash 并运行脚本，以启动新的本地网络。

```text
$ cd /path/to/avash
$ git fetch -p
$ git checkout master
$ go build
$ ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
$ avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

现在您正在运行具有 5 个节点的本地 Avalanche 网络。

### 账户注资

使用脚本 [`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js)将 1,000 个 AVAX 从 X-Chain 转至 `hardhat.config.ts` 中 10 个账户中的每个账户。为这些账户注资是部署智能合约并与其进行交互的前提条件。

注意：如果看到 `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`，则需要等到网络完成引导并准备就绪。这应该不会花太长时间。

```text
$ cd /path/to/avalanche-smart-contract-quickstart
$ yarn fund-cchain-addresses
yarn run v1.22.4
npx hardhat run scripts/fund-cchain-addresses.js --network local
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

确认每个账户都注资了 1,000 个 AVAX。

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000001000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000000000000000000
✨  Done in 0.72s.
```

从第一个账户向每个账户发送一些 AVAX。

```text
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

确认余额已更新

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 49999999995275000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000010000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000010000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000010000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000010000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000010000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000010000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000010000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000010000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000010000000000000000
```

### 编译智能合约

[`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) 中有一个 `compile` 脚本。

```javascript
"compile": "npx hardhat compile",
```

运行 `yarn compile` 以确保您的项目可以编译。

编译智能合约。

```text
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## 部署智能合约

Hardhat 支持部署到多个环境。在 [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) 中有一个用于部署的脚本。

编辑 `scripts/deploy.ts` 中的部署脚本

```javascript
"deploy": "npx hardhat run scripts/deploy.ts",
```

您可以选择要部署到的环境，对于每种环境，只需传递带有 `local`（例如，使用 Avash 创建的本地网络）、`fuji` 或 `mainnet` 的 `--network` 标志即可。如果您不传入 `--network`，则将默认为 Hardhat 网络。例如，如果要部署到主网：

```text
yarn deploy --network mainnet
```

将合约部署到您的本地网络

```text
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

我们现在有一个代币部署在 `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`。

### 与智能合约进行交互

Hardhat 有一个开发人员控制台来与合约和网络进行交互。有关 Hardhat 控制台的详细信息，请参阅[此处](https://hardhat.org/guides/hardhat-console.html)。Hardhat 控制台是一个 NodeJS-REPL，您可以在其中使用不同的工具。[ethers](https://docs.ethers.io/v5/) 是我们用来与网络交互的库。

您可以通过以下方式打开控制台：

```text
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

获取带有工厂与合约地址的合约实例，以与我们的合约进行交互：

```javascript
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

第一行检索带有 ABI 和字节码的合约工厂。第二行检索具有给定合约地址的合约工厂实例。回想一下，我们的合约已经在上一步部署到了 `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`。

获取账户：

```javascript
> let accounts = await ethers.provider.listAccounts()
undefined
> accounts
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

这与 `yarn accounts` 中的账户列表完全相同。

现在我们可以与我们的 `ERC-20` 合约进行交互：

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]` 有余额，因为 `account[0]` 是默认账户。使用此账户部署合约。[ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) 的构造函数向合约的部署者铸造 `TOTAL_SUPPLY` 123456789 枚代币。

`accounts[1]` 目前没有余额。向 `accounts[1]` 发送一些代币，即 `0x9632a79656af553F58738B0FB750320158495942`。

```javascript
> let result = await coin.transfer(accounts[1], 100)
undefined
> result
{
  hash: '0x35eec91011f9089ba7689479617a90baaf8590395b5c80bb209fa7000e4848a5',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 3,
  data: '0xa9059cbb0000000000000000000000009632a79656af553f58738b0fb7503201584959420000000000000000000000000000000000000000000000000000000000000064',
  r: '0xc2b9680771c092a106eadb2887e5bff41fcda166c8e00f36ae79b196bbc53d36',
  s: '0x355138cb5e2b9f20c15626638750775cfc9423881db374d732a8549d05ebf601',
  v: 86260,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

注意：由于这是一个本地网络，我们不需要等待交易被接受。但是对于其他网络，例如 `fuji` 或者 `mainnet`，您需要等到交易被接受：`await result.wait()`。

现在我们可以确保代币会被转移：

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

正如您可能注意到的那样，在 `await coin.transfer(accounts[1], 100)` 中没有“发件人”信息。这是因为 `ethers` 使用第一个签名者作为默认签名者。在我们的例子中，这是 `account[0]`。如果我们想使用另一个账户，我们需要先与其连接。

```javascript
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

现在我们可以用 `signer1` 来调用合约，即 `account[1]`。

```javascript
> await contractAsSigner1.transfer(accounts[0], 5)
{
  hash: '0x807947f1c40bb723ac312739d238b62764ae3c3387c6cdbbb6534501577382dd',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9632a79656af553F58738B0FB750320158495942',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 2,
  data: '0xa9059cbb0000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000005',
  r: '0xcbf126dd0b109491d037c5f3af754ef2d0d7d06149082b13d0e27e502d3adc5b',
  s: '0x5978521804dd15674147cc6b532b8801c4d3a0e94f41f5d7ffaced14b9262504',
  v: 86259,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

现在让我们检查余额：

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

我们已经成功地将 5 个代币从 `accounts[1]` 转至 `accounts[0]`

## 摘要

现在您拥有启动本地 Avalanche 网络、创建 Hardhat 项目，以及创建、编译、部署和与 Solidity 合约交互所需的工具。

加入我们的 [Discord 服务器](https://chat.avax.network)以了解详细信息，并提出您可能遇到的任何问题。

