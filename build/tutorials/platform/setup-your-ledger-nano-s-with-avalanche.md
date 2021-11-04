# 将 Ledger Nano S 或 Nano X 与 Avalanche 结合使用

安全保护加密货币的行业标准是硬件钱包，这是一种在您的计算机和您的私钥之间提供完全隔离的专用设备。

如果您想使用您之前创建的 Avalanche 地址，您需要使用从 Avalanche 钱包获得的助记词[从恢复阶段程序中恢复](https://support.ledger.com/hc/en-us/articles/4404382560913-Restore-from-recovery-phrase)。如果您要设置新地址，只需按照常规[设置为新设备](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device)程序即可。

Avalanche Ledger 钱包应用程序可通过 [Ledger Live](https://www.ledger.com/ledger-live) 获得。

## 如何在 Ledger Live <a id="1c80"></a>上设置 Avalanche

首先，您需要安装 [Ledger Live](https://www.ledger.com/ledger-live)。有适用于 MacOS、Windows 和 Linux 以及 iOS 和 Android 的下载版本。

{% hint style="danger" %}
在继续之前，请确保您拥有最新版本的 Ledger Live 应用程序。旧版本可能不会显示最新的设备固件和 Avalanche 应用程序版本。在撰写本文时，最新的 Ledger Live 应用程序版本是 2.26.1。
{% endhint %}

成功安装应用程序后运行。转到“管理器”选项卡，并通过按设备上的两个按钮来允许设备管理。在应用程序目录搜索栏位中，输入“Avalanche”。确认 Avalanche 应用程序是 v0.5.2（或更高版本），然后单击“安装”按钮。

![Avalanche Ledger 应用程序安装按钮](../../../.gitbook/assets/ledger-06-live-install.png)

您可以通过转到“已安装的应用程序”选项卡来确认安装是否成功，您应能在其中看到 Avalanche v0.5.2。

![Avalanche Ledger 应用程序安装按钮](../../../.gitbook/assets/ledger-07-live-version.png)

## 将 Avalanche 钱包与 Ledger <a id="48a3"></a>结合使用

在安装 Avalanche 应用程序后，您就可以通过 Ledger 与 [Avalanche 钱包](https://wallet.avax.network/)进行交互。这包括发送 AVAX、代币、NFT、跨链互换以及质押或委托。

首先，如果要访问钱包，请将 Ledger 插入您的计算机并输入您的 PIN。

![PIN 码画面](../../../.gitbook/assets/ledger-03-pin.png)

如果您在设备上安装了多个应用程序，请使用左右按钮选择 Avalanche 应用程序：

![Avalanche 应用程序](../../../.gitbook/assets/ledger-04-app-start.png)

按两个按钮启动应用程序。您应该登录“Avalanche”应用程序画面，您可以在其中确认该应用程序的版本为 0.5.2（或更高版本）。

![应用程序版本](../../../.gitbook/assets/ledger-05-app-version.png)

在确认 Avalanche 应用程序正在运行后，请在钱包主页上单击“访问钱包”按钮。

![访问钱包按钮](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

在随后的“您想如何访问您的钱包？”提示中，单击“Ledger”按钮。

![Ledger 访问](../../../.gitbook/assets/ledger-01-wallet-access.png)

现在系统会提示您确认访问 Ledger 设备上的公钥。在设备上的提示中单击右侧按钮，在最后一个画面上按下两个按钮进行确认。

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

您将需要执行此操作两次，因为不同的密钥用于不同的链。如果成功，您将登录钱包并显示任何以前的余额。

![网络钱包资产组合选项卡](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

如果要进行资金转账，请转到“发送”选项卡并将 X 地址粘贴到“目标地址”字段。设置金额并可选择设置备注。按“确认”，然后按“发送交易”按钮。

![发送交易](../../../.gitbook/assets/send-transaction.png)

系统会提示您确认您在 Ledger 上的操作。检查网络钱包中显示的哈希值是否与您的 Ledger.上显示的哈希值匹配。如果一切都匹配，则通过按下最后一个画面上的两个按钮进行确认，以发送交易。

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

您可以单击该图标来刷新您的余额，您应该会看到余额随着您刚刚发送的金额和交易费用而减少。

![刷新钱包余额](../../../.gitbook/assets/refresh-wallet-balance.png)

在右侧栏中，您将看到您的最新交易。单击放大镜图标将在我们的浏览器中打开交易。

![放大镜](../../../.gitbook/assets/magnifying-glass.png)

最后，您应该能够在我们的浏览器中看到交易详情。其中列出了有关交易的所有内容，包括交易 ID、状态、交易发生的时间，以及有关输入和输出的所有信息。

![交易详情](../../../.gitbook/assets/transaction-details.png)

## 即将推出更多工具<a id="135b"></a>

Ava Labs 正在构建金融互联网。我们正在开发解决方案，通过重新定义人们构建和使用金融应用程序的方式，来创建一个畅通无阻的世界。该基础设施的一个关键部分是硬件钱包，因此用户可以充分确信他们的私钥和代币完全杜绝任何潜在的恶意行为。我们新发布的 Ledger 应用程序做到了这一点，通过遵循行业最佳实践，确保用户和代币的安全。

