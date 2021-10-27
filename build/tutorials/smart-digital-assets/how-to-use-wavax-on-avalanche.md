# Avalanche上でラップされたAVAX（WAVAX）を使用する

## WAVAXとは？

[AVAX](../../../#avalanche-avax-token)は、[Avalancheプラットフォーム](../../../learn/platform-overview/)上のネイティブトークンです。Ethereum Virtual Machineのインスタンスである[コントラクトチェーン（ C-Chain）](../../../learn/platform-overview/#contract-chain-c-chain)上の多くのスマートコントラクトは、EthereumのERC-20トークンで動作するように設計されています。このようなコントラクトでAVAXを使用するには、ERC-20と互換性のあるラップされたAVAX（WAVAX）を使用する必要があります。

## 概要

AVAXをWAVAXに変換するには、AVAXをロックし、WAVAXを発行するスマートコントラクトにAVAXをデポジットします。WAVAXをAVAXに変換するには、スマートコントラクトにWAVAXを返します。そこで、WAVAXを使い果し、AVAXを返却します。

このチュートリアルでは、次を行います。

* MetamaskをAvalancheに接続する
* Metamaskアカウントに資金を入れる
* WAVAXコントラクトをRemixにロードする
* デプロイ前のWAVAXコントラクトに接続する
* AVAXをWAVAXに変換し、戻す
* MetamaskにカスタムトークンとしてWAVAXを追加する

## Metamaskを接続する

[Metamask](https://metamask.io/)は、Avalancheの C-ChainなどのEthereumや互換性のあるブロックチェーンと簡単にやり取りできる、よく使用されているウェブブラウザの拡張機能です。Metamaskを設定し、Metamask上にアカウントを作成するのは、このチュートリアルの範囲外ですが、インターネット上にその方法を説明する多くのリソースがあります。

Metamaskアカウントにログインした後、Avalancheネットワークに接続します。「ネットワーク」ドロップダウンをクリックして、 **Custom RPC（カスタムRPC）**を選択します。

![metamaskネットワークドロップダウン](../../../.gitbook/assets/image%20%2860%29.png)

選択したネットワークの情報を次のように入力します。

### Avalanche Mainnet の設定：

* **Network Name（ネットワーク名）**：Avalanche Mainnet C-Chain
* **New RPC URL2（新しいRPC URL）**： [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID **：`43114`
* **Symbol（シンボル）**： `AVAX`
* **Explorer（エクスプローラ）**： [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Fuji Testnetの設定：

* **Network Name（ネットワーク名）**： Avalanche Fuji C-Chain
* **New RPC URL（新しいRPC URL）**： [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID **：`43113`
* **Symbol（シンボル）**： `AVAX`
* **Explorer（エクスプローラ）**： [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

変更を保存したのち、指定したAvalancheネットワークを選択します。AVAXの残高を見てください。これは、おそらく「0」となっています。

##  C-Chainアカウントに資金を入れる

アカウントにAVAXをいくらか取得する必要があります。

### **Avalancheウォレットを使用する**

すでにいくらかAVAXをお持ちの場合は、[Avalancheウォレット](https://wallet.avax.network/)を使用してMetamaskアカウントに転送することができます。残高を表示するウォレットパネルの**show breakdown（詳細を表示）**を選択して自分の資金がどこにあるかを確認することができます。 C-Chain上にまだ資金がない場合は、[Cross Chain Transfer（クロスチェーン転送）](../platform/transfer-avax-between-x-chain-and-c-chain.md)を行ってAVAXをX-Chainから C-Chainに移動する必要があります。

 C-Chain上に資金を確保したのち、ウォレットの左側メニューの**Send（送信）**を選択し、送信元チェーンを**C Contract（Cコントラクト）**に切り替えます。**To Address（送信先アドレス）**フィールドに、Metamaskアドレスを貼り付けます。送信する数量を入力し、**Confirm（確認）**、そして**Send（送信）**をクリックします。

![Metamaskに送信](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

資金は、Metamaskアカウント上に間もなく表示されます。

### **Test Network Faucetを使用する**

テストネットワークにすでに接続されている場合は、そのフォーセットを使用して、Metamaskアカウントに資金を入れることができます。[フォーセット](https://faucet.avax-test.network/)に移動し、Metamaskのアカウント名の下に表示されているEthereumのアドレス（例：`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`）を貼り付けてください。アカウント名をクリックすると、アカウントがクリップボードにコピーされます。

![フォーセット資金調達](../../../.gitbook/assets/wavax2avax-02-faucet.png)

そのアドレスをフォーセットに貼り付け、ロボットではないことを証明し、AVAXテストをリクエストします。まもなくMetamaskにこれらが表示されます。

## WAVAXコントラクトをRemixにロードする

Remixは、スマートコントラクトを書き、デプロイし、やり取りするための人気のあるブラウザベースのツールです。[Remixのウェブサイト](https://remix.ethereum.org/)に移動します。コントラクトをインポートするためのオプションが出てくるまで下にスクロールします。

![GitHubからインポートする](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

**GitHub**を選択し、入力フィールドに`https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol`を貼り付け**OK**を選択します。これにより、コントラクトをRemixにロードします。

![File Explorer（ファイルエクスプローラ）](../../../.gitbook/assets/wavax2avax-04-contract.png)

左側にある「File Explorer（ファイルエクスプローラ）」タブに切り替え、たった今ロードしたコントラクトである`WAVAX.sol`を選択します。

左のサイドメニューで、「Compile（コンパイル）」タブに切り替えます。

![コンパイル](../../../.gitbook/assets/wavax2avax-05-compile.png)

表示されているように、コンパイラーのバージョンがコントラクトと互換性があることを確認してください。**Compile WAVAX.sol（WAVAX.solをコンパイルする）**をクリックし、WAVAXコントラクトが次の`CONTRACT`フィールドに表示されていることを確認します。これでAvalancheネットワーク上で既にデプロイされているWAVAXコントラクトに接続する準備ができました。

## WAVAXコントラクトに接続する

左側から**Deploy & Run Transactions（トランザクションをデプロイし実行する）**タブに切り替える。

![接続](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Metamaskにログインしていることを確認してください。**Environment（環境）**ドロップダウンメニューで、`Injected Web3`を選択します。Metamaskがポップアップされ、アカウントを選択するよう求められます。Avalancheに接続したものを選択し、接続を許可します。これにより、**Account（アカウント）**フィールドにあらかじめ記入されます。**Contract（コントラクト）**フィールドが`WAVAX`コントラクトに設定されていることを確認してください。これで、Avalancheで既に公開されているコントラクトに接続することができます。**At Address（アドレス）**の編集フィールドに、次をコピーしてください。

* Mainnetの場合：`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Fuji Testnetの場合：`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

アドレスを貼り付けた後、**At Address（アドレス）**ボタンを押してください。

Remixがデプロイされたコントラクトを見つけます。

![接続](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

これでコントラクトとやり取りする準備ができました。ハイライトされた矢印をクリックしコントラクトインターフェースを開きます。

## WAVAXコントラクトに対してコマンドを発行する

AVAXをいくらかラップしましょう。

ETHは10^18のより小さい単位 (wei)で、AVAXは10^9でデノミされているため、VALUEセレクタで`wei`から`gwei`（gigawei）に切り替えます。

![やり取り](../../../.gitbook/assets/wavax2avax-08-interact.png)

### AVAXをラップしてWAVAXを作成する

10AVAXをラップするには、**Value（値）**フィールドに`10000000000`（10^10）gweiを入力します。ラップを開始するには、**Deposit（デポジット）**をクリックします。Remixでトランザクションを確認するプロンプトが表示されます。**Confirm（確認）**を押すと、Metamaskがポップアップされ、確認も求められます。Metamaskでも**Confirm（確認）**を押してください。AVAXの残高が10プラス代金分が引かれたことに気づくでしょう。Metamask上でWAVAXを確認するには次のセクションに移動します。

## WAVAXをMetamaskに追加する

WAVAXの残高を見るには、MetamaskにカスタムトークンとしてWAVAXを追加する必要があります。Metamaskで、アカウント名の横にある3つの点を選び、`Expand View`を選択します。これにより新しいブラウザタブが開きます。下にスクロールし、**Add Token（トークンを追加）**を選択します。**Custom Token（カスタムトークン）**タブに切り替えます。

![Custom Token（カスタムトークン）](../../../.gitbook/assets/wavax2avax-10-add-token.png)

**Token Contract Address（トークンコントラクトアドレス）**に、以前使った同じコントラクトアドレスを貼り付けます。

* メインネット用：`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Fuji Testnet用：`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

まず、**Next（次へ）**、そして**Add Tokens（トークンを追加）**をクリックします。maMetmaskのアカウントには、WAVAXが表示されています。

### WAVAXをAVAXにアンラップする

WAVAXをアンラップするには、**Withdraw（引き出す）**ボタンの隣にある矢印を展開します。

![引き出し](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

残念ながら、withdraw（引き出し）フィールドは、wei建てのため、10AVAXは`10000000000000000000`（10^19）として表現されます。**Transact（取引）**を押すと、まずRemix上で、そのあとMetamask上で同じ確認をスタートします。AVAXは手数料が差し引かれた状態でアカウントに戻りました。

## 結論

これで、AVAXのERC-20バージョンであるWAVAXで、Avalancheの C-Chain上でスマートコントラクトとやり取りできるようになりました。将来的には、AVAXとWAVAXの変換は、ウォレットと取引所からのビルトインサポートを得てずっとシンプルになる予定です。しかし、しばらくの間は、Avalancheプラットフォーム上で、DEX、ブリッジ、その他のSolidityベースのコントラクトにアクセスしていただけます。

