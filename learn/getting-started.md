# 入门

本教程的目的是提供 Avalanche 的一般概述，并作为 Avalanche 生态系统新用户的入门起点。假设您己具备加密货币的一般知识，特别是熟悉以太坊生态系统。如果您不能立即理解某些内容，也没有关系。您可以在线搜索答案，如果找不到，请在我们的 [Discord](https://chat.avax.network) 上提问。

我们建议您在使用 Avalanche 之前完整阅读本文档，以避免新用户遇到的常见隐患和问题。Avalanche 涉及很多方面，因此最好在深入了解之前全面进行了解，以免造成混乱。此外，本指南包含提示和警告，可帮助您避免成为诈骗者的受害者。

您可以在[此处](https://support.avax.network/en/articles/4135427-avalanche-platform-overview)找到 Avalanche 的总体概述。它将有助于理解 Avalanche 和其他平台之间的异同。

## AVAX 代币和费用

Avalanche 的所有手续费均以原生代币 AVAX 支付，因此您需要一些代币才能与 Avalanche 网络进行交互。您可以通过[交易所](https://ecosystem.avax.network/marketplace?tag=exchange)获得代币。另一种获取 AVAX 的方式是用信用卡在 [Pangolin](https://app.pangolin.exchange/#/buy) 上购买。下面对其他方式进行了说明。

如果您使用 [Avalanche Bridge](https://bridge.avax.network) 将资产转至 Avalanche，您将需要一些 AVAX 来移动/互换您的资产。Avalanche Bridge 为向 Avalanche 转移超过一定价值资产的用户提供 AVAX [空投](https://support.avax.network/en/articles/5462264-is-there-an-airdrop)。使用此 AVAX 将您的部分桥接资产交换为 AVAX，以便您可以支付未来的交易费用。

## 钱包

一个可以持有加密货币余额的_地址_。_钱包_可以控制一组地址。把地址想象成一个锁箱，把钱包想象成许多锁箱的钥匙。通过提供独特的 24 字密码短语可以访问钱包。**如果您遗忘了这个密码，您将无法访问您的钱包，也无法恢复您的资产！**因此，安全地保管钱包的密码非常重要。同时，**任何拥有您密码的人都可以访问和获取您的所有资产**，因此确保没有其他人知道您的密码至关重要。最好**不要将您的密码保存在任何计算机上。**

您可以在 [Avalanche 钱包](https://wallet.avax.network/)网站上访问您的钱包。您可以按照[本](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet)指南设置一个新的自己的钱包。

您可以并且应该使用[硬件 Ledger ](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche)来登录您的钱包。**使用硬件钱包是访问您代币的最安全方式，**因为您的私钥和密码永远不会离开设备。

在拥有钱包后，您可能希望将 AVAX 从交易所发送到您的钱包。相关操作指南，请参见[此处](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet)。

如上面链接的概述文章中所述，Avalanche 的主网由三个不同的链组成。如果要将您的资金从一条链转至另一条链，您需要进行[跨链转账。](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains)

## metamask

Avalanche 网络上的大部分活动都发生在各种 dapp（去中心化应用）上。如果要与之互动，您可以使用浏览器扩展程序将您的钱包与 dapp 连接起来。[Metamask](http://metamask.io/) 就是这样一种流行的钱包扩展。

默认情况下，Metamask 会连接到以太坊。如果要连接到 Avalanche，您需要将 [Avalanche 添加为自定义网络。](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche)

在 Metamask 中，您可以创建一个新账户并从您的 Avalanche 主钱包向其发送资金，或导入现有的 Avalanche 钱包账户。您可以通过使用密码或通过从钱包中导出 C-Chain 私钥（选择 `Manage Keys`，然后 `View C Chain Private Key`）来导入账户。如果您使用 Ledger 硬件钱包，您也可以在 Metamask 中使用它。它将连接到您的钱包，并与您在钱包网站上访问钱包一样，具有相同的余额/地址。

如果要在 Metamask 中查看您的资金（如果您导入了 Avalanche 钱包），或者要能够从钱包账户向 Metamask 账户发送资金，您需要在 C-Chain 上拥有您的资金。如果您从交易所转移资金，它们通常会在 X-Chain 上，因此您需要进行跨链转账，具体说明请参阅上一节。

## 交易

您可以从 Avalanche 钱包或 Metamask 发送代币。重要的是要记住，所有交易都是最终的且不可逆转的。如果您出现了差错，并将资金发送到错误的地址，那么没有任何机制可以逆转交易并将资金返还给您。这就是为什么确保您将代币发送到的地址是正确的并且您打算发送到 Avalanche 上的地址而不是其他网络的地址至关重要（请参阅下一节）。

### 发送到其他网络

其他网络的地址格式可能与 Avalanche 上的相同。但**这并不意味着您可以将 Avalanche 上的资金直接发送到其他区块链网络**，例如以太坊或 BSC（币安智能链）。例如，如果您告诉 Avalanche 向地址 (`0x12345`) 发送资金，它会在 **Avalanche **而非其他网络上发送资金，即使该地址在其他网络上存在或有效。您的资金不会最终进入另一个网络。一旦资金被发送，只有拥有控制目标地址的私钥的人才能访问它们。如果_您_控制目标地址，您可能可以通过将控制地址的私钥导入 Metamask 来取回它们。但是，如果您将它们发送到其他人的地址，您将需要他们的配合，这可能很困难。

以上也适用于相反方向的操作。您不能直接从以太坊、BSC 等向 Avalanche 地址发送资金。地址可能看起来相同并被接受，但这并不意味着资金会到达您的钱包。如果您想从以太坊发送或接收资金，请参阅下面的 [Avalanche Bridge](getting-started.md#Avalanche%20Bridge) 章节。

如果您不确定自己要尝试做什么操作，或者是第一次进行某操作，最好先发送少量金额（“小额”），以检查它是否到达了预定的目的地址。

### 添加代币

除了原生代币 AVAX 之外，网络上还存在许多其他代币。Avalanche 钱包内置了对最流行代币的支持，但 Metamask 没有。如果您获得了其他代币，它们可能不会立即出现在您的钱包或 Metamask 中。您可能需要通过选择“添加代币”按钮，手动对其进行添加。如果要添加代币，您需要知道代币合约地址。不要使用 Metamask 中的搜索功能，它只能在以太坊上正常工作。您可以在[此处](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json)找到最流行的代币地址，了解以太坊资产，或在[此处](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json)了解 Avalanche 资产。

在添加地址后，其余数据将自动填充，并且您的余额应该会显示可见。您可以在[此处](https://bridge.avax.network/proof-of-assets)通过按`Wrapped token`中要添加的 Metamask 图标，自动将代币添加到 Metamask。

## Dapp

### Avalanche Bridge

在设置好浏览器扩展程序（例如 Metamask）后，您就可以在 Avalanche 上与 dapp 进行交互了。您想要做的大部分事情，例如_流动性挖矿_，都需要您拥有 AVAX 以外的代币。如果您在以太坊（或可以将它们发送到以太坊的交易所）上有这些代币，最便宜和最快速的方式之一就是使用 [Avalanche Bridge](https://bridge.avax.network/)。

您可以在[此处](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP)找到有关 Avalanche Bridge 基本用法的视频教程集。此外，请确保您阅读了[常见问题解答](https://docs.avax.network/learn/avalanche-bridge-faq)，其中解答了有关桥接的最常见问题，并重点讲解了需要注意的事项。

当您桥接超过 75 美元或更多的资产时，您还将被空投一些 AVAX 以帮助支付初始互换费用。使用这些资金仅用于获取额外的 AVAX，因为您需要 AVAX 来支付您使用的每个其他 dapp 的费用！如果您在没有足够的 AVAX 费用的情况下陷入困境，您将无法做任何其他事情，因此请确保您的钱包中始终有一些 AVAX。您可以在 [Pangolin](https://app.pangolin.exchange) 上互换 AVAX。

### 生态系统

Avalanche 上部署的 dapp 越来越多。如果要找到它们，您可以访问我们的官方[生态系统网站](https://ecosystem.avax.network/marketplace)。您可以通过为您感兴趣的领域选择标签来过滤项目。还有一个[社区驱动](https://www.avax-projects.com/)的项目列表。（您不应将上述列表中的项目视为对该项目的认可。）

沉浸、浏览和尝试。里面有很多有价值的内容。

## 安全

与加密货币领域的其他方面一样，您需要敏锐地意识到危险。所有交易都是最终且不可逆转，如果您不幸上当受骗，则没有人能够取回您的资金。

### 钱包密码

了解**您的密码是您钱包机密所在**，这至关重要。任何有权访问 24 字符密码的人都可以完全访问和控制钱包中的所有内容。如果您将自己的密码透露给某人，您就给了他们里面的一切。因此，**切勿将您的密码提供给任何人**。不要将其发送到任何地方。不要将其输入到您在网上找到的网站或有人向您发送链接指向的网站。最好不要将您的密码保存在任何计算机上。

唯一可以输入密码的地方是 [Avalanche 钱包的官方](https://wallet.avax.network)网站，即便如此，也请确保您使用的是安全网络，并通过自己输入地址`https://wallet.avax.network`来确保该网站是正确的。检查浏览器中的挂锁图标，以确保您的连接安全。如果您不确定是否输入密码，请不要输入。

如果您使用相当数量的代币（换句话说，就是发生损失会让您非常心痛的金额），我们强烈建议您使用 [Ledger 硬件钱包](https://www.ledger.com/)来访问您的资金。

### DYOR

这表示“亲自做调查”。换句话说，不要盲目相信您在网上了解的任何内容。比对其他信息来源，征求更多意见。采纳来自某个来源的消息时，要非常谨慎和理智。

当您公开发布问题时，如果有人私下与您联系提供帮助，要特别小心。实际上，每次发生这种情况时，都是诈骗者试图套取您密码、私钥或以其他方式觊觎您的代币。

不要急于进入承诺超额回报的陌生项目。您存入资金的任何 dapp 都可以对其进行访问。在线搜索项目，了解谁在对其进行维护。检查合约是否经过验证和审计。留意潜在的危险信号。

### 虚假代币

任何人都可以创建一个新的代币，而且在 Avalanche 上它非常便宜。此外，在 DEX 上创建流动性池是无需许可的，因此任何人都可以使用与真实事物具有相同名称和代币图像的虚假代币创建新交易对。为了避免这种骗局，请始终从 DEX 上的官方代币列表中选择代币，不要使用来自其他地方的链接。

## 浏览器

浏览器是索引和呈现网络活动的网站，您可以在其中查找单笔交易，并了解有关网络传输内容的更多信息。

### 官方浏览器

[explorer.avax.network](https://explorer.avax.network/) 是 Ava Labs 维护的官方网络浏览器。

### avascan

[Avascan](https://avascan.info/) 是一个独立的浏览器网站，以其流畅的演示和全面的概述而闻名，特别适合查看[验证者和委托者](https://avascan.info/staking/validators)，因为它显示了许多关于单个网络验证者的有趣信息。

### vscout

[VScout](https://vscout.io/) 是 Avalanche 的另一个备选浏览器。除此之外，您还可以看到验证者在全球的分布情况。

## 在线支持

我们提供多种获得支持的方式。以下是其中一部分：

* [支持网站](https://support.avax.network/en/)
* [Twitter 技术支持](https://twitter.com/avaxtechsupport)。
* [电报](https://t.me/avalancheavax)
* [Discord 服务器](http://chat.avax.network/)（最受欢迎并且流量最高。）

关于上面 [DYOR](getting-started.md#dyor) 小节的扩展：在使用任何公共支持渠道时，请警惕任何通过直邮、电子邮件或类似方式私下联系您的人。他们可能冒充管理员、版主或团队成员。**合法账户永远不会首先通过直邮与您联系**！真正的管理员和团队成员将始终率先公开参与事项，并在需要时邀请您通过直接消息_与他们联系_。

诈骗者会监视寻求帮助的人的公共渠道，然后私下与他们联系以提供帮助。诈骗者可能会告诉您，您需要“同步钱包”或类似的套路，并为您提供一个链接，告诉您应该在其中输入钱包密码以完成该流程。他们可能会提供假称可以解决问题的应用程序。在这两种情况下，只是有人想窃取您的资金。

值得重申的是：不要将您的 24 字符密码或私钥告诉任何人！

## 结论

虽然 Avalanche 是一个年轻的平台，但它提供了许多有趣和令人振奋的机会，用以参与和参加区块链的新前沿领域。入门阶段可能会让人望而生畏，但我们希望本文档能够简化您的初学和上手过程。

如果您遇到任何问题或疑问，需要讲解，或者只是想进行探讨，请加入我们的 [Discord 服务器](http://chat.avax.network/)。我们很乐意听取您的看法。

