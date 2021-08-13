# RemixとMetaMaskを使用してAvalancheにスマートコントラクトをデプロイする

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

![Primary Network-JP](../../../.gitbook/assets/image%20%2821%29.png)

AvalancheのPrimary Networkは、P-Chain、X-Chain、C-Chainの3つのチェーンを持つサブネットです。C-Chainは、AvalancheのSnowmanコンセンサスプロトコルによって供給されたEthereum Virtual Machineのインスタンスです。[C-Chain RPC](../../avalanchego-apis/contract-chain-c-chain-api.md)は、Ethereum標準のRPC呼び出しを使用して、典型的なEthereumクライアントができることを何でも行うことができます。EthereumではなくC-Chainを使用することのすぐに利点は、Avalancheを使用することの利点です。DAppsのパフォーマンスとユーザーエクスペリエンスを大幅に向上させることができるこれらのプロパティ。

本日は、RemixとMetaMaskを使用してAvalanche上でスマートコントラクトを展開してテストします。

## ステップ1：MetaMaskの設定

MetaMaskにログイン -> ネットワークドロップダウン -> カスタムRPCを選択します。

![metamask ネットワーク ドロップダウン](../../../.gitbook/assets/image%20%2860%29.png)

#### **Avalanche Mainnet 設定:**

* **ネットワーク名**: Avalanche Mainnet C-Chain
* **新しいRPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **シンボル：**`AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Testnetの設定:**

* **ネットワーク名：**Avalanche FUJI C-C-Chain
* **新しいRPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **シンボル：**`AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.netc](https://cchain.explorer.avax-test.network/)

#### **Local Testnet \(AVASH\) 設定:** [(Avash チュートリアル)](https://docs.avax.network/build/tools/avash)

* **ネットワーク名**: Avalanche Local
* **RPC URL:http://localhost:9650/ext/bc/C/rpc**[](http://localhost:9650/ext/bc/C/rpc)[](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**: `43112`
* **シンボル：**`AVAX`
* **エクスプローラー**: N/A

## ステップ2：C-Chainアドレスを資金調達する

### **Avalancheウォレットの使用**

メインネットでは、[Avalanche Wallet](https://wallet.avax.network/)を使用して、X-ChainからC-Chainアドレスに資金を振り込むことができます。このチュートリアルで説明したように、プロセスは簡単です[。](../platform/transfer-avax-between-x-chain-and-c-chain.md)Walletはテストやローカルネットワークでも使用できます。

### **Test Network Faucetの使用**

テストネットワークでの資金調達には、[Test Network Faucet]を使用することもできます。[https://faucet.avax-test.network/](https://faucet.avax-test.network/) に移動し、C-AVAX アドレスを貼り付けます。あなたがする必要があるのは、"C-"のプレフィックスを追加するだけで、蛇口はAVAXからC-AVAXに切り替わります。

### ローカルテストネットでの資金調達

ローカルネットワークでは、自分で蛇口を展開することによって、簡単にアドレスに資金を供給することができます。[JavaScript-JP-JP-](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

## ステップ3：MetaMaskを接続し、Remixを使用してスマートコントラクトを展開する

[Remix](https://remix.ethereum.org/)を開く -> Solidityを選択します。

![remix ファイルエクスプローラ](../../../.gitbook/assets/remix-file-explorer.png)

Remix ファイルエクスプローラーを使用してコンパイルおよびデプロイしたいスマートコントラクトを読み込んだり作成します。

この例では、ERC20コントラクトを[OpenZeppelin](https://openzeppelin.com/contracts)から展開します。

![ERC20契約](../../../.gitbook/assets/erc20-contract.png)

[Deploy]タブ -> [ENVRIONMENT] ドロップダウンを開き、[Injected Web3 \(MetaMask がロードされていることを確認してください\)] を選択します。

![トランザクションのデプロイおよび実行](../../../.gitbook/assets/deploy-and-run-transactions.png)

Web3->>コンパイラーに戻り、選択したコントラクトをコンパイルします->[デプロイ]タブに移動します。

![Solidity コンパイラー](../../../.gitbook/assets/solidity-compiler.png)

これで、スマートコントラクトがコンパイルされ、MetaMaskが注入され、ERC20を導入する準備ができています。[Deploy]をクリックします。

![erc20の導入](../../../.gitbook/assets/deploy-erc20.png)

MetaMaskのトランザクションを確認します。

![ERC20を確認する](../../../.gitbook/assets/confirm-erc20.png)

私たちの契約が成功しました！

![Published metadata-JP](../../../.gitbook/assets/published-metadata.png)

これで、「Deployed Contracts」タブからそれを展開してテストします。

![契約書との交換](../../../.gitbook/assets/interact-with-contract.png)

ABI と Bytecode の契約は、コンパイラー・タブで使用できます。

![ABIバイトコード](../../../.gitbook/assets/abi-bytecode.png)

このチュートリアルに従って何か困難なこと、または単に私たちとAvalancheについて議論したい場合は、[Discord](https://chat.avalabs.org/)で私たちのコミュニティに参加することができます!

