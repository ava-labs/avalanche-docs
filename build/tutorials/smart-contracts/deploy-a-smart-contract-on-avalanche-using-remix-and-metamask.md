# RemixとMetaMaskを使用してAvalanche上にスマートコントラクトをデプロイする

## はじめに

![一次ネットワーク](../../../.gitbook/assets/image%20%2821%29.png)

Avalancheの一次ネットワークは、P-Chain、X-Chain、 C-Chainの3つのチェーンを持つサブネットです。 C-Chainは、AvalancheのSnowmanコンセンサスプロトコルを搭載したEthereumの仮想マシンのインスタンスです。[ C-Chain RPC](../../avalanchego-apis/contract-chain-c-chain-api.md)は、Ethereum標準のRPC呼び出しを使用することにより、典型的なEthereumクライアントでできることは何でも可能です。Ethereumではなく C-Chainを使用することですぐに実感できる利点こそが、Avalancheを使用する利点のすべてです。これらの特性により自律分散型アプリケーションのパフォーマンスと、ユーザーエクスペリエンスを大きく改善することができます。

ここでは、RemixとMetaMaskを使用して、Avalanche上でスマートコントラクトをデプロイ、テストします。

## ステップ１：MetaMaskを設定する

MetaMaskにログインする ->Networkのドロップダウンをクリックする -> Custom RPCを選択

![metamaskネットワークドロップダウン](../../../.gitbook/assets/image%20%2860%29.png)

#### **Avalanche Mainnet の設定:**

* **ネットワーク名**: Avalanche Mainnet  C-Chain
* **新しいRPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbol**:`AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Testnetの設定:**

* **ネットワーク名**: Avalanche FUJI C-Chain
* **新しいRPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbol**:`AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

#### **ローカルテストネット (AVASH) の設定: **[(Avashチュートリアル)](../../tools/avash.md)

* **ネットワーク名**: Avalanche Local
* **新しいRPC URL**:[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**: `43112`
* **Symbol**:`AVAX`
* **Explorer2**：N/A

## ステップ 2:  C-Chainアドレスに資金を入れる

### **Avalancheウォレットを使用する**

Mainnetでは、[Avalancheウォレット](https://wallet.avax.network/)を使用して、X-Chainから C-Chainアドレスに資金を転送することができます。この[チュートリアル](../platform/transfer-avax-between-x-chain-and-c-chain.md)で説明しているように、プロセスはシンプルです。ウォレットは、テストネットワークやローカルネットワークでも使用できます。

### **Test Network Faucetを使用する**

テストネットワーク上に資金を入れるには、Test Network Faucetを使用することができます。[https://faucet.avax-test.network/](https://faucet.avax-test.network/)に移動し、 C-Chainアドレスを貼り付けます。フォーセットは、テストAVAXを C-Chainに送信する必要があることを自動的に知っています。captchaチェックボックスをクリックし、「Request AVAX（AVAXを要求する）」ボタンを選択します。アドレスは数秒でテストAVAXを受け取ります。

### ローカルテストネット上に資金を入れる

ローカルネットワークでは、[これ](../platform/create-a-local-test-network.md#getting-avax)に従うことで簡単にアドレスに資金を入れることができます。

## ステップ3: MetaMaskを接続し、Remixを使用してスマートコントラクトをデプロイする

[Remix](https://remix.ethereum.org/)を開く -> Solidityの選択

![remixファイルエクスプローラ](../../../.gitbook/assets/remix-file-explorer.png)

Remixファイルエクスプローラを使用してコンパイル、デプロイしたいスマートコントラクトをロードあるいは作成します。

この例では、[OpenZeppelin](https://openzeppelin.com/contracts)からERC20コントラクトをデプロイします。

![ERC20コントラクト](../../../.gitbook/assets/erc20-contract.png)

「Deploy」タブに移動して、「ENIVRIVENT」ドロップダウンを開き、「Injected Web3」を選択（MetaMaskがロードされていることを確認する）

![トランザクションのデプロイと実行](../../../.gitbook/assets/deploy-and-run-transactions.png)

web3のインジェクトが完了したら、コンパイラに戻り、選択したコントラクトをコンパイルして、「 Deploy（デプロイ）」タブに移動する

![Solidityコンパイラ](../../../.gitbook/assets/solidity-compiler.png)

これで、スマートコントラクトがコンパイルされ、MetaMaskが組み込まれ、ERC20をデプロイする準備ができました。「Deploy（デプロイ）」をクリックします。

![erc20をデプロイする](../../../.gitbook/assets/deploy-erc20.png)

MetaMaskポップアップでトランザクションを確認します。

![ERC20を確認する](../../../.gitbook/assets/confirm-erc20.png)

コントラクトがうまくデプロイされました。

![公開されたメタデータ](../../../.gitbook/assets/published-metadata.png)

これで、「Deployed Contracts（デプロイされたコントラクト）」タブから選択してデプロイし、テストすることができるようになりました。

![コントラクトとのやり取り](../../../.gitbook/assets/interact-with-contract.png)

「Compiler（コンパイラ）」タブでコントラクトABIとBytecodeを使用できます。

![ABIバイトコード](../../../.gitbook/assets/abi-bytecode.png)

チュートリアルを理解するのが難しかったり、Avalancheについてお話になりたい場合は、[Discord](https://chat.avalabs.org/)で我々のコミュニティに参加することができます。

