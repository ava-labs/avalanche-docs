# Avalanche上でラップされたAVAX（WAVAX）を使用する

## WAVAXとは何ですか？

[AVAX](../../../#avalanche-avax-token)は、[Avalanche](../../../learn/platform-overview/)プラットフォーム上のネイティブトークンです。イーサリアムバーチャルマシンのインスタンスである[コントラクトチェーン（C-Chain）](../../../learn/platform-overview/#contract-chain-c-chain)上の多くのスマートコントラクトは、イーサリアムのERC-20トークンで動作するように設計されています。こうした契約でAVAXを使用するには、ERC-20互換であるラップされたAVAX（WAVAX）を使用する必要があります。

## 概要

AVAXをWAVAXに変換するには、AVAXをロックし、AVAXを発行するスマートコントラクトにAVAXを預金します。WAVAXをAVAXに変換するには、WAVAXをスマートコントラクトに戻し、WAVAXを焼き上げ、AVAXを返します。

このチュートリアルでは、以下のようにします：

* MetamaskをAvalancheに接続する
* Metamaskアカウントに資金を提供する
* WAVAXコントラクトをRemixにロードする
* プリデプロイされたWAVAXコントラクトに接続する
* AVAXをWAVAXに変換し、戻る
* MetamaskにカスタムトークンとしてWAVAXを追加する

## Metamask

[Metamask](https://metamask.io/)は、AvalancheのC-Chainなどイーサリアムや互換性のあるブロックチェーンと簡単にやり取りできるようにする人気のあるウェブブラウザ拡張です。Metamaskをセットアップし、アカウントを作成するのはこのチュートリアルの範囲を超えておりますが、インターネット上に、その中であなたを歩くための多くのリソースがあります。

Metamaskアカウントにログイン後、Avalancheネットワークに接続します。ネットワークドロップダウンをクリックします ->**カスタムRPCを選択します**：

![metamaskネットワークドロップダウン](../../../.gitbook/assets/image%20%2860%29.png)

あなたの選択したネットワークのための情報を入力します：

### Avalancheメインネット設定：

* **ネットワーク名**：AvalancheメインネットC-Chain
* **新しいRPC URL**：[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**：`43114`
* **シンボル**：`AVAX`
* **エクスプローラ**：[https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### 富士テストネット設定：

* **ネットワーク名**：Avalanche富士Cチェーン
* **新しいRPC URL**：[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**：`43113`
* **シンボル**：`AVAX`
* **エクスプローラ**：[https://cchain.explorer.avax-test.net](https://cchain.explorer.avax-test.network/)

変更を保存した後、指定したAvalancheネットワークを選択します。AVAXバランスが見るはずです。

## C-Chainアカウントに資金を提供する

AVAXをアカウントに入力する必要があります。

### **Avalancheウォレットを使用する**

すでにAVAXをお持ちでない場合、[Avalancheウォレット](https://wallet.avax.network/)を使用してMetamaskアカウントに移動することができます。バランスが示すウォレットパネルで**ショーブレークダウンを選択することで、資金がどこ**にあるかを見ることができます。C-Chain上に資金が存在しない場合、AVAXをX-ChainからC-Chainに移動するには、[クロスチェーン移行](../platform/transfer-avax-between-x-chain-and-c-chain.md)が必要です。

**C-Chain上で資金が稼働した後、ウォレットの左側メニュー**で**送信を選択し、ソースチェーンをCコントラクトに切り替えます**。[アドレス**]**フィールドに、メタマスクアドレスを貼り付けます。送信金額を入力し、[**確認と送信]をクリック**します****。

![Metamaskに送信](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

間もなく、Metamaskアカウントで資金が表示されるはずです。

### **テストネットワークフォーセットを使用する**

テストネットワークに接続されている場合、メタマスクアカウントの資金を供給するために、そのコーセットを使用することができます。メタマスク内のアカウント名の下に示すイーサリアムのアドレスを[、フォーセット](https://faucet.avax-test.network/)に移動し、貼り付けます`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`。アカウント名をクリックすると、アカウントをクリップボードにコピーします。

![フォーセットファンディング](../../../.gitbook/assets/wavax2avax-02-faucet.png)

そのアドレスをフォーセットに貼り付け、あなたがロボットではないことを証明し、AVAXテスト要求を行います。まさにMetamaskに表示されるはずです。

## WAVAXコントラクトをRemixにロードする

Remixは、スマートコントラクトとの書き込み、デプロイ、やり取りのための人気のあるブラウザーベースのツールです。Naviateは[、Remixのウェブサイト](https://remix.ethereum.org/)に移動します。コントラクトをインポートするためのオプションが表示されるまでスクロールダウンします。

![GitHubからインポート](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

GitHubを選択し****、入力フィールドでOKを選択`https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol`します**。**これにより、コントラクトをRemixにロードします。

![ファイル エクスプローラ](../../../.gitbook/assets/wavax2avax-04-contract.png)

`WAVAX.sol`左側のファイルエクスプローラタブに切り替え、選択します。

左側メニューで、コンパイルタブに切り替えます：

![Compile](../../../.gitbook/assets/wavax2avax-05-compile.png)

コンパイラバージョンがコントラクトと互換性があることを確認します。Compile WAVAX.solを押し、以下の`CONTRACT`フィールドに**WAVAX**コントラクトが表示されていることを確認してください。さて、Avalancheネットワーク上に展開されているWAVAXコントラクトに接続する準備が完了しました。

## WAVAXコントラクトに接続する

左側の「**デプロイと実行」**タブに切り替える。

![コネクト](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Metamaskにログインしていることを確認します。****環境メニューで、を選択します`Injected Web3`。Metamaskは、ポップアップしてアカウントを選択するよう求める。Avalancheに接続されたものを選択し、接続できるようにします。これにより、**アカウントフィールドを事前に記入します**。****コントラクトフィールドがコントラクトに設定されていることを確認します`WAVAX`。すでにAvalanche上に公開済みのコントラクトに接続することができます。**At Address**編集フィールドで、コピー:

* メインネット：`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* 富士テストネット：`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

アドレスを貼り付け後、At **Addressボタンを押してください**。

Remixは、デプロイされたコントラクトを見つけるはずです：

![コネクト](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

今、コントラクトとやり取りする準備が完了しました。ハイライトされた矢印を押し、コントラクトインターフェースを開きます。

## WAVAXコントラクトにコマンドを発行する

AVAXをラップしましょう！

ETHは、10^18の小さなユニットで、AVAXは10^9の建物で、価値セレクタを切り替えることにより、価値セレクタを（gigawei）`wei`に切り替えます`gwei`。1gwei=10^9 wei=1 nAVAX

![インタラクション](../../../.gitbook/assets/wavax2avax-08-interact.png)

### AVAXをラップしてWAVAXを作成する

10AVAXをラップするには、**Valueフィールドに（10^10`10000000000`）gweiを入力してください**。ラッピングを開始するには、預金をクリックします****。トランザクションを確認するためのメッセージがRemixによって表示されます。**確認を押すと、**Metamaskがポップアップし、確認を求める場合もあります。Metamaskで確認するキー**を押すとも、プレス**します。AVAX残高が10引き下げられたことに加えて、手数料金額に気づく必要があります。次のセクションに移動し、MetamaskでWAVAXを確認します。

## MetamaskにWAVAXを追加

WAVAXバランスを見るには、WAVAXをカスタムトークンとしてMetamaskに追加する必要があります。Metamaskで、アカウント名の隣にいる3つのドットを選択し、選択します`Expand View`。これにより新しいブラウザタブが開きます。下にスクロールして、**トークンの**追加を選択します。**カスタムトークンタブに切り替えます**。

![カスタムトークン](../../../.gitbook/assets/wavax2avax-10-add-token.png)

**トークンコントラクトアドレスで、以前に使用した同じコントラクトアドレスを**ペーストします。

* メインネット：`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* 富士テストネット：`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

**次へをクリックし、トークンを**追加**します**。Metmask内のアカウントでWAVAXが表示されるようになります。

### WAVAXをAVAXに巻き戻す

WAVAXの包みを解除するには、WebAXの[**撤回]ボタンの横に矢印を展開します**：

![引き出し](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

残念ながら、撤回フィールドはwei建てとなっています。そのため、引き出し額で10AVAXは（10^19`10000000000000000000`）と表されます。**Transacを押すと、Remixでまず、Metamaskで同じ確認が発生**します。AVAXは、手数料額を差し引いたアカウントに戻すべきです。

## 結論

AvalancheのC-Chain上で、AVAXバージョンであるERC-20バージョンであるAVAXでやり取りできるようになりました。将来的には、AVAXとWAVAX間で変換されることははるかにシンプルになります。ウォレットや取引所から組み込みのサポートを受けて、Avalancheプラットフォーム上でDEXやブリッジ、その他のSolidityベースのコントラクトにアクセスすることができます。

