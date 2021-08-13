# AvalancheでWrapped AVAX \(WAVAX\)を使用する

## WAVAXとは何ですか？

[AVAX](../../../#avalanche-avax-token)は[Avalanche](../../../learn/platform-overview/)プラットフォーム上のネイティブトークンです。Ethereum Virtual Machineのインスタンスである[Contract Chain \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain)上の多くのスマートコントラクトは、EthereumのERC-20トークンで動作するように設計されています。AVAX を利用するには、ERC-20 互換のラップAVAX \(WAVAX\)を使用する必要があります。

## JavaScript-JP-JP-

AVAXをWAVAXに変換するには、AVAXをAVAXをロックし、WAVAXを発行するスマートコントラクトにAVAXを入金します。WAVAXをAVAXに変換するには、WAVAXをスマートコントラクトに戻し、WAVAXを焼き払い、AVAXを返します。

このチュートリアルでは、次のようにします:

* Metamask to Avalancheを接続する
* Metamaskアカウントに資金を供給する
* WAVAXコントラクトをRemixにロードする
* WAVAX 契約に接続する
* AVAXをWAVAXに変換し、戻る
* WAVAXをカスタムトークンとしてMetamaskに追加

## Metamaskを接続する

[Metamask](https://metamask.io/)は、AvalancheのC-ChainなどのEthereumや互換性のあるブロックチェーンと簡単にやり取りできる人気のWebブラウザ拡張機能です。Metamaskを設定し、それにアカウントを作成することは、このチュートリアルの範囲を超えてありますが、それを通じてあなたを歩くための多くのリソースがあります。

Metamaskアカウントにログインしたら、Avalancheネットワークに接続します。[ネットワーク]ドロップダウン -> [**カスタムRPC**]を選択します。

![metamask ネットワーク ドロップダウン](../../../.gitbook/assets/image%20%2860%29.png)

選択したネットワークに情報を入力します。

### Avalanche Mainnet 設定:

* **ネットワーク名**: Avalanche Mainnet C-Chain
* **新しいRPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **シンボル：**`AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Fuji Testnetの設定:

* **ネットワーク名：**Avalanche Fuji C-C-Chain
* **新しいRPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **シンボル：**`AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.netc](https://cchain.explorer.avax-test.network/)

変更を保存したら、指定したAvalancheネットワークを選択します。AVAXの残高は、おそらく0になります。

## C-Chainアカウントに資金を供給する

AVAXをアカウントに取得する必要があります。

### **Avalancheウォレットの使用**

AVAXをお持ちの場合は、[Avalanche Wallet](https://wallet.avax.network/)を使用してMetamaskアカウントに転送できます。財布の残高を示す「**分解」**を選択することで、資金がどこにあるかを見ることができます。C-Chainに資金がない場合は、C[-](../platform/transfer-avax-between-x-chain-and-c-chain.md)ChainにAVAXをX-ChainからC-Chainに移行する必要があります。

C-Chainで資金があれば、Walletの左側メニューで[**Send**]を選択し、ソースチェーンを**C Contract**に切り替えます。**[アドレス]**フィールドにMetamaskアドレスを貼り付けます。送信する金額を入力し、**[確認**]をクリックして[**送信**]をクリックします。

![Metamaskに送信する](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

資金はすぐにMetamaskアカウントに表示されるはずです。

### **The JavaScript-JP-JP-J**

テストネットワークに接続している場合は、その蛇口を使用してMetamaskアカウントに資金を提供できます。[蛇口](https://faucet.avax-test.network/)に移動し、Ethereumアドレスを貼り付けます。Metamask \(例:`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`\)。アカウント名をクリックすると、アカウントをクリップボードにコピーします。

![Faucetの資金調達](../../../.gitbook/assets/wavax2avax-02-faucet.png)

そのアドレスを蛇口に貼り付けて、ロボットではないことを証明し、AVAXをテストします。彼らはすぐにあなたのMetamaskに表示されるはずです。

## WAVAXコントラクトをRemixにロードする

Remixは、スマートコントラクトの書き込み、展開、およびやり取りのための人気のあるブラウザベースのツールです。Naviate to [Remixのウェブサイト](https://remix.ethereum.org/)に掲載しています。契約書のインポートオプションが表示されるまでスクロールダウンします。

![GitHub からのインポート](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

**GitHub**を選択し、入力フィールドで`https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol` を選択し、**OK** を選択します。これにより、契約書をRemixに読み込むことができます。

![ファイルエクスプローラー](../../../.gitbook/assets/wavax2avax-04-contract.png)

左側の[ファイルエクスプローラ]タブに切り替え、`WAVAX.sol`を選択します。

左側のメニューで、[コンパイル]タブに切り替えます。

![Compile-Compile-JP](../../../.gitbook/assets/wavax2avax-05-compile.png)

コンパイラー・バージョンが、図のように、コントラクトと互換性があることを確認します。**WAVAX.sol** を押し、下の `CONTRACT` フィールドに WAVAX コントラクトが表示されていることを確認します。これで、Avalancheネットワークに既に展開されているWAVAX契約に接続する準備ができました。

## WAVAX契約に接続する

左側の[**Deploy & Run Tranasactions**]タブに切り替えます。

![JP-JP-](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Metamaskにログインしていることを確認してください。**JavaScript**`-JP-JP-`Metamaskがポップアップして、アカウントを選択するよう求められます。Avalancheに接続されているものを選択し、接続を許可します。これにより、[**Account**] フィールドが事前入力されます。**Contract** フィールドが `WAVAX` 契約に設定されていることを確認します。今すぐ契約に接続できます。これはAvalancheで既に公開されています。**At Address** 編集フィールドで、次のコピーします。

* メインネットのため: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* 富士テストネットのため:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

アドレスを貼り付けた後、**At Address**ボタンを押します。

Remixは、デプロイされたコントラクトを見つける必要があります。

![JP-JP-](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

私たちは今、契約とやり取りする準備ができています。強調表示された矢印を押して、コントラクトインターフェイスを開きます。

## WAVAX契約書へのコマンド発行

AVAXを包みましょう！

ETHは10^18小さい単位\(wei\)で、AVAXは10^9で、値セレクターをweiから`gwei` \(gigawei\)に切り替え`ます`。

![インタラクション](../../../.gitbook/assets/wavax2avax-08-interact.png)

### AVAXを包みWAVAXを作成する

10 AVAX をラップするには、`[`**Value**] フィールドに 100 \(10^10\) gwei を入力します。**When you have to use the components any use-JP-**JPトランザクションを確認するためのプロンプトがRemixで表示されます。[**Confirm** Metamask]を押すと、確認を求めます。Metamaskでも**Confirm**を押します。AVAX残高は10％と手数料金額を加算してください。次のセクションに移動して、MetamaskでWAVAXを確認します。

## WAVAXをMetamaskに追加する

WAVAXの残高を確認するには、WAVAXをカスタムトークンとしてMetamaskに追加する必要があります。Metamaskで、アカウント名の横にある3つの点を選択し、`[`ビューを展開]を選択します。これにより新しいブラウザータブが開きます。下にスクロールして、**[トークンの追加]**を選択します。**[**カスタムトークン]タブに切り替えます。

![カスタムトークン](../../../.gitbook/assets/wavax2avax-10-add-token.png)

**Token Contract Address**で、以前使用した同じコントラクトアドレスを貼り付けます。

* 主要な網のため:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* 富士テスト網のため:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

[**Next**]をクリックし、**[トークンを追加**]をクリックします。WAVAXはMetmaskでアカウントで表示されるはずです。

### WAVAXをAVAXにWAXをUNWRAP

WAVAXを解除するには、**Withdraw**ボタン横の矢印を展開します。

![JAVA-JP-JP-J](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

残念ながら、decatalフィールドはweiで表現されていますので、`10` AVAXは出金額で100\(10^19\)となります。**Transact**を押すと、Remixで最初にMetamaskで同じ確認がトリガーされます。AVAXは、手数料金額を差し引いたアカウントに戻ってください。

## JP-JP-

AvalancheのC-Chainで、AVAXのERC-20バージョンであるAVAXでスマートコントラクトを操作できるようになりました。将来的には、AVAXとWAVAX間の変換は大幅に簡単になります。ウォレットや取引所からのサポートにより、Avalanche PlatformでDEXやブリッジ、その他のSolidityベースの契約書にアクセスできます。

