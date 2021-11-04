# Avalanche Bridge (AB) 常见问题解答

## Avalanche Bridge (AB) 常见问题解答

Avalanche Bridge (AB) 可用于将 ERC20 代币从以太坊转至 Avalanche 的 C-Chain，反之亦然。本文档解答了有关桥接的常见问题。如果在本文档和其他文档中没有解答您的问题，您可以通过 [Avalanche 的支持网站](https://support.avax.network)、[Discord](https://chat.avalabs.org) 或 [Telegram](https://t.me/avalancheavax) 与我们联系。

### 重要说明

1. Metamask Mobile 应用程序中存在影响桥接交易的故障（**仅在移动设备上**）。在此问题得到解决之前，请勿使用 Metamask 移动应用程序进行桥接转账。使用桌面应用程序，或者，如果在移动设备上，请使用 Coinbase 钱包。
2. 您需要 AVAX 来支付 Avalanche 的交易费用。**您应该使用您在空投中收到的 AVAX 在 AMM 上进行互换以获得更多的 AVAX，以便您可以支付交易费用。**如果您用完了 AVAX，将无法在 Avalanche 上进行交易。

### 交易

#### 如果我的交易似乎卡住了，我该怎么办？

如果通过桥接将资金转至 Avalanche 的以太坊交易似乎卡住了，并且没有任何确认，您可以按照[此处](avalanche-bridge-faq.md#speed-up-transaction)的说明加快交易速度。如果以太坊交易已经收到 35 个确认，但是 Avalanche 交易计时器似乎卡住了，请检查您在 Avalanche 网络上的 Metamask 钱包余额。可能是交易已经被处理，但只是还没有显示在用户界面上。请注意，如果您选择“加速”您的交易，则可能会发生这种情况。

在将资金转至以太坊时，桥接发出的以太坊交易需要很长时间才能收到 35 次确认，这是可能的，但可能性很小。如果以太坊 gas 价格突然大幅飙升，则可能会发生这种情况。如果交易在以太坊上发布时未包含的 200 个区块内，则可能会发布具有更高 gas 价格的新交易以“取消”转账。

#### 桥接转账需要多长时间？

以太坊交易需要 10-15 分钟。Avalance 交易需要几秒钟。

#### 为什么 Avalanche 交易的桥接环节需要这么长时间？

只需要几秒钟。如果桥接界面显示花费的时间更长，那只是界面的问题。几秒钟后您的资产就已转账。检查您的钱包和 C-Chain 浏览器。

#### 如果 gas 价格超过我转账的金额怎么办？

将 ERC20 资产从以太坊转至 Avalanche 时，使用 Metamask 来发送转移资金的以太坊交易。该交易的费用取决于以太坊网络上的当前 gas 价格，该价格是极其可变的。如果 gas 价格很高，以致交易费用高于转移的价值，您可能需要等到 gas 价格下降。

将资产从 Avalanche 转回以太坊时，该桥接会收取实物转账费用，具体说明请参阅[此处](avalanche-bridge-faq.md#fees)。用户界面现在允许转账金额低于费用金额。如果用户手动生成并发出此类交易，则桥接会将转账标记为无效并且不会对其进行处理。

#### 我是否可以将在 Avalanche 上创建的代币发送到以太坊？

还不行。AB 目前仅支持将以太坊上创建的 ERC20 代币转至 Avalanche 以及反向转移。计划在未来实现前述功能。

#### 我是否可以通过桥接发送 ETH 或 BTC？

AB 目前不支持原生 ETH 或 BTC。但是，您可以通过桥接转账这些资产的打包版本（WETH 和 WBTC）。

#### 如果我的交易在浏览器中不可见，该怎么办？

对应于桥接转账的交易将出现在 Avalanche 和 Ethereum 网络的浏览器上。交易可能需要几分钟才会显示出来。如果要在浏览器中搜索您的交易，请将您的地址复制并粘贴到 [Avalanche 的 C-Chain 浏览器](https://cchain.explorer.avax.network/)或 [Etherscan](https://etherscan.io/) 中。如果要查看桥接本身发送的交易，您可以在[此处](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) (Avalanche) 查看，以及在[此处](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)（以太坊）查看。如果您仍然没有看到您的交易，请通过 [Telegram](https://t.me/avalancheavax) 或 [Discord](https://chat.avax.network/) 联系我们。

#### 是否有关于如何使用桥接的教程？

是的，您可以在[此处](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP)观看有关桥接功能的视频教程。

#### 我如何支付 Avalanche 的交易费用？

在 Avalanche 上，交易费用采用原生资产 AVAX 进行支付。为了在 Avalanche C-Chain上发送交易，您的钱包中必须有足够的 AVAX 来支付交易的 gas 费用。为了帮助您在 Avalanche 上快速入门，如果您从以太坊转入价值超过 75 美元（可能会更改）的代币，该桥接会向您空投少量的 AVAX。为了避免用完 AVAX 而无法支付您的交易费用，我们建议您首先购买足够数量的 AVAX。您可以在 [Pangolin](https://app.pangolin.exchange/) 上购买。

#### 我是否可以发送到另一个网络上的不同地址？

桥接只允许转账到另一个网络上的相同地址。在资产转账到其他网络之后，可以被发送到任何地址或合约。

#### 我是否可以加快我的交易速度？<a id="speed-up-transaction"></a>

是的，您可以在 Metamask 上单击“加速”按钮。通过 Metamask “加速”交易，会在以太坊上发出一个新交易，该交易的 gas 价格高于最初发送的交易。由于新交易的 gas 价格更高，因此更有可能被包含在一个区块中。其中只有一笔交易（原始交易和“加速交易”）会被接受。加速将资金转至桥接的交易是安全的。但是，用户界面不会知道新交易，这意味着您可能在用户界面中看不到确认。一旦新交易在以太坊上获得 35 次确认，请在 Avalanche 上检查您的 Metamask 钱包以查看打包的资金。

#### 为什么 Metamask 上显示的代币数量与我指定的数量不一致？

当从 Avalanche 转账到以太坊时，Metamask 显示要转账 0 个代币，而不是实际的代币数量。这是 Metamask 的一个已知问题。

#### 以太坊和 Avalanche 上的桥接地址是什么？

桥接地址：

* 以太坊：[`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche：[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

请注意，**您不应该直接将代币转至这些地址**。您应该使用桥接的用户界面，该界面会检查格式错误的交易。

### 费用

#### Avalanche Bridge 如何收费？

桥接收取转账费用，以支付 Avalanche 和以太坊网络的交易费用，以及桥接基础设施的运营成本。这些费用通过被转账的 ERC20 资产以实物收取。也就是说，您转移代币时，转账余额的一部分将用于支付费用。

将资产从以太坊转至 Avalanche 时，转账的 ERC20 资产要收取相当于 3 美元的桥接费用。转账到 Avalanche 可能符合获得一笔 AVAX 空投的资格，具体说明请参阅[此处](avalanche-bridge-faq.md#airdrop)。

将资产从 Avalanche 转至以太坊时，桥接费用主要依据**预期的**以太坊交易费用，即使用当前资产价格、当前以太坊 gas 价格以及以太坊交易将使用的 gas 的大致数量来计算。因此，以太坊交易费用，也就是桥接费用可以是高度可变的。为了考虑价格波动，在桥接费用中增加了一个固定的美元金额（目前为 15 美元）。请注意，桥接费用与浏览器（如 Etherscan）中显示的以太坊交易费用不同，因为资产价格、以太坊 gas 价格和以太坊交易使用的 gas 金额会波动。执行转账时，预期的桥接费用将显示在桥接 UI 中。

#### 为什么我在一个网络上收到的资产金额与我从另一个网络发送的金额不一致？

桥接收取了一笔费用。请参见上文。

#### gas 是如何估算的？桥接如何获取代币价格？

桥接使用 Chainlink 价格信息源，来获取以太坊网络的 gas 价格信息。采用的 gas 价格以 Chainlink FASTGAS 值和 Geth gas 价格近似值中的较高者为准。gas 价格以 GWEI 为计量单位，以确保桥接发送的交易快速包含在以太坊区块中。

桥接还使用 Chainlink 价格信息源，来确定用于计算相当于桥接费用的代币数量的代币价格。

#### 是否有空投？<a id="airdrop"></a>

当用户从以太坊向 Avalanche 转账超过 75 美元（可能会更改）的代币时，他们将最多获得 0.1 AVAX 的空投。

#### 如果我没有收到空投怎么办？

如果您还没有收到空投，请确认转账金额达到最低金额要求。

### 安全

#### Avalanche Bridge 是否去信任？

Avalanche Bridge 是去信任的，因为任何一方都无法访问作为抵押品或铸造打包资产持有的任何资金。桥接的所有转账都必须得到 4 个独立方（称为监管人）中 3 方的批准。从这个意义上说，使用桥接不需要信任任何一方便可转移您的资金。

#### 监管人的作用是什么？

监管人有四大作用：

1. 存储秘密份额
2. 索引受支持的区块链
3. 追踪处理的交易
4. 托管公共信息

可以在[此处](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1)查找监管人作用和职责的完整详情。

#### Ava Labs 和监管人之间是什么关系？

监管人是 Avalanche 基金会值得信赖的合作伙伴。他们拥有卓越的技术以及与 Avalanche 合作的记录。

#### 代码是否经过审计？审计报告在哪里？

是的，桥接、监管人和智能合约的代码已经过 Halborn 审计。可以在[此处](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1)找到审计报告。

### 代币

#### 我向 Avalanche 的转账已完成，但我在 Metamask Avalanche 上看不到我的资产。这是怎么回事？<a id="cant-see-funds"></a>

您需要告诉 Metamask 查找代币。确保您已将 [Avalanche Bridge](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) 代币列表中的代币添加到 Metamask。

#### 哪种的代币可以通过桥接转账？

只有受支持的 ERC20 代币才能通过桥接转账。在 Avalanche 上，这些代币用附加了“.e”的代币符号表示。例如，桥接的 DAI 代币表示为 DAI.e。

#### 如何在 Avalanche 上将 WETH.e 解包为 ETH？

不行。Avalanche 上没有 ETH。您可以在 Avalanche 上的智能合约和 dapp 中使用 WETH.e，这表示打包的 ETH。

#### 如何在以太坊上打包/解包 ETH？

您可以使用 Metamask 的 SWAP 功能从 ETH 转换为 WETH。或者，您也可以在以太坊上使用 AMM，例如 [Uniswap](https://app.uniswap.org/#/)。

#### 如何向桥接添加代币？

请参阅[此处](https://github.com/ava-labs/avalanche-bridge-resources#readme)。

#### 如何将桥接中使用的代币添加到 Metamask？

请参阅[此处](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3)获取教程。

#### 为什么有两种相同的代币？我怎么知道哪一个来自 Avalanche Bridge？

通常，当您与智能合约以及 Pangolin 等 dapp 进行交互时，**您希望使用以 .e 结尾的代币**。

本文档所指的当前一代 Avalanche Bridge \(AB\) 是先前被称为 AEB 的桥接实施的继任者。AEB 桥接和 AB 桥接都有自己独特的代币集。AEB 代币已被弃用，取而代之的是 AB 代币。AB 代币有一个 `.e` 后缀。虽然代币的名称和符号是区分两者的不错参考，但验证代币的唯一可靠方法是合约地址。AB 代币合约地址可以在[此处](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)找到。

#### 为什么新桥接的代币没有自动出现在我的钱包中？

代币不是由您的 C-chain 地址持有，而是在代币的智能合约中。您必须告诉您的钱包（即 Metamask）哪些智能合约要检查您的地址持有的余额。

#### Avalanche Bridge 是否支持 NFT 转账？

Avalanche Bridge 目前不支持 NFT 转账。

### 支持的链

#### Avalanche Bridge 支持哪些链？

Avalanche Bridge 目前仅支持将以太坊 ERC20 转至 Avalanche C-Chain，以及反向转移。计划将来支持转移 Avalanche C-Chain 上创建的 ERC20。还计划以后支持 Avalanche 和以太坊之外的网络。

#### 我是否可以将资产从（网络）桥接到 Avalanche？

Avalanche Bridge 只能在以太坊和 Avalanche 之间转移资产。如果要将资产从另一个网络转移到 Avalanche，您可以执行以下任一操作：

* 将这些资产转至以太坊，然后从以太坊转至 Avalanche
* 使用非 Ava Labs 创建/维护/支持的第三方桥接
* 在中心化交易所购买 AVAX 并将 AVAX 提现到 Avalanche，然后使用 AMM 互换其他资产。

### AEB（已弃用的桥接）

本文档所指的当前一代 Avalanche Bridge \(AB\) 是先前被称为 AEB 的桥接实施的继任者。本节讨论有关以前桥接实施 \(AEB\) 的问题。

#### AEB 何时停止运作？

AEB 已停用，无法再通过它进行转账。AEB 以太坊一侧持有的资金已转至新的 Avalanche Bridge \(AB\)。Avalanche C-Chain 已启用代币转换，允许用户以 1-1 的基准转换他们的 AEB 代币，以换取 Avalanche Bridge 上的等价物。这一转换可以在 [https://bridge.avax.network/convert](https://bridge.avax.network/convert) 上完成。AEB 代币支持时间表将由各个 DApp 项目决定。

#### 我是否可以将我的 AEB 代币转至以太坊？

为了将您的 AEB 代币转至以太坊，您必须首先将它们转换为 AB 代币，具体说明请参阅上述问题。转换后，您可以使用新的 Avalanche Bridge 将 AB 代币转回以太坊。

#### 如何将我的 AEB（已弃用的桥接）代币转换为 Avalanche Bridge \(AB\) 代币？

您可以使用 [AB 用户界面](http://bridge.avax.network/convert)将 AEB 代币转换为 AB 代币。此外，Pangolin 等许多生态系统项目正在努力让用户轻松转换其代币并进入新的流动性池。

### 设计/技术

#### 单个私钥是否可以铸币？

任何一方都无法访问 SGX enclave 地址。只有当 enclave 收到来自 4 个监管人中的 3 个的批准时，它才能使用该密钥构建/签署交易。从这个意义上说，这里的 enclave 起到了跨链智能合约的作用。

#### 为什么桥接不在智能合约中持有资金？

不使用智能合约会简化端到端的转账要求，从而降低 gas 费用并加快转账速度。

#### 我是否可以将桥接转账集成到我自己的智能合约中？

目前，该桥接仅支持来自外部账户 \(EOA\) 的跨链转账。这是因为桥接在两个网络上使用相同的地址，确保跨桥接转移的资金保存在同一个钱包中，并且没有办法确保以太坊上给定地址的智能合约也同时存在 Avalanche 的地址。从以太坊网络上的智能合约发送到桥接地址的 ERC20 代币不会在 Avalanche 上铸造成打包的代币。

#### 在 BridgeToken 合约中使用 tx.origin 是否安全？

虽然使用 tx.origin 检查智能合约中的授权会带来潜在的安全风险，但我们的用例不会这样。在桥接合约中，tx.origin 仅用于禁止智能合约直接调用“解包”函数，因为桥接目前仅支持从外部拥有的账户转账。通过将 tx.origin 值与 msg.sender 值进行比较，这样做是安全的。

#### 在哪里可以找到有关此设计的详细信息？

请参阅 [Avalanche Bridge：使用英特尔® SGX 保护跨链资产转移](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1)。

### 其他问题

#### 我在钱包里看不到我的代币。它们是否会永久性丢失？

不。这很可能是用户界面问题，代币已在那里，而您只是看不到代币。请参阅[此处](avalanche-bridge-faq.md#cant-see-funds)。

#### 在资产证明页面上，为什么以太坊和 Avalanche 上的资产数量不一致？

由于三个原因，桥接可能会被过度抵押（即在以太坊上持有的 ERC20 资产多于 Avalanche）。这些都在意料之中。

1. 有从以太坊到 Avalanche 的新转账。桥接仅在以太坊交易收到 35 次确认后才处理转账。在此之前，抵押品余额将大于打包的资产供应量。
2. AEB 抵押品已转至新的 AB 桥接，但并非所有 AEB 代币都已在 Avalanche 上转换为 AB 代币。
3. 桥接费用在以太坊侧累计。enclave 不会立即收取桥接产生的费用。相反，它在桥接钱包中保存每个资产所有收取的费用，直到达到配置的阈值。此时，费用将被发送到单独的钱包。

#### 我在哪里可以买到 AVAX？

您可以根据自己所在的位置，在中心化交易所购买 AVAX。您还可以在 [Pangolin](https://app.pangolin.exchange/) 等去中心化交易所购买 AVAX。

#### 我如何进行联系以寻求支持？

使用 [support.avax.network](https://support.avax.network) 或我们的 [Discord](https://chat.avax.network/) 服务器上的聊天功能可获得支持。**在提问之前，请尽量通过搜索来寻找您问题的答案！**很可能有其他人问过这些问题。

#### 代币名称中的 .e 后缀是什么意思？

`.e` 后缀表示资产是从以太坊通过桥接转账而来。

#### 如何在 Avalanche 上配置 Metamask？

如果要设置您的 Metamask 钱包并将其连接到 Avalanche 网络，请参阅[此处](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche)。

#### 我通过 Avalanche Bridge 对我的 ERC20 进行了转账。我现在可以在哪里对其进行交易？

您可以在 Avalanche C-Chain 的多个不同的 AMM 中交易桥接代币，例如 [Pangolin](https://app.pangolin.exchange/)。

## 生态系统

### 如何将我的项目添加到生态系统目录？

如果要将您的项目添加到生态系统目录，请发送电子邮件至`ecosystem@avalabs.org`。请提供：

* 您的项目名称
* 关于您的服务的简要描述
* 您项目徽标的 88 高 x 88 宽 .svg 版本

   Avalanche 团队的一名成员将与您联系，以确认添加您的项目。

#### 如何在生态系统页面上获得横幅推广？

如果要将您的项目放在 Avalanche 生态系统页面的宣传轮播位置进行展示，请将申请提交至`ecosystem@avalabs.org`。请附上关于您项目的简短描述和促销详情。Ava Labs 支持团队成员将在 2 个工作日内对您进行回复。

横幅规格如下：

* 台式机和横向：1155px \* 440px
* 纵向和移动端：720px \* 337px
* 设计元素位于横幅中央，否则可能被截断
* 使用纯色作为背景或渐变为 #000000（已编辑）

