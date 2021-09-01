---
description: 'コミュニティメンバーによって提供される：'
---

# ERC-20トークンを作成する

ERC-20トークンは、イーサリアムの最も基本的かつ重要な概念です。Avalancheコミュニティとエコシステムが成長するにつれて、イーサリアム上で実行されている新しいユースケースやプロジェクトがAvalancheに実装されます。プロジェクトに使用されるトークンスタンダードは特定のものではなく、誰もが独自のスタンダードおよび独自のトークンを作成できます。

したがって、独自のミニトークンを作成し、我々が望む任意のアドレスにミントすることができます。トークンは、Avalanche C-Chain上で生成され、そのチェーン上でアクセス可能になります。

主に考慮すべきことは、Solidityで書かれたスマートコントラクトをAvalancheに展開することです。これは、Avalancheが、スマートコントラクトをチェーンに展開できるように提供する機能であり、新しい言語固有のコントラクトコンセプトがやり取りされる必要はありません。ERC-20コントラクトを作成し、avalanche C-Chainに展開する方法を見てみよう。

## Metamaskをセットアップ

まず設定すべきことは、メタマスクウォレットです。

![ポストのための画像](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

ブラウザ上のメタマスクアイコンをクリックし、ネットワークドロップダウンメニューを選択します。ここでは、C-Chainに接続する必要があります。「カスタムRPC

![ポストのための画像](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

さて、これらのボックスを正しい値で設定する必要があります。

* **ネットワーク名**：Avalanche C-Chain
* **新しいRPC URL**:
   * **メインネット：[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)**
   * **富士テストネット：[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)**
   * **ローカルテストネット：[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)**
* **ChainID**：
   * **メインネット：**`43114`
   * **富士テストネット：**`43113`
   * **ローカルテストネット：**`43112`
* **シンボル**：AVAX
* **エクスプローラ**：
   * **メインネット：[https://cchain.explorer.avax.net](https://cchain.explorer.avax.network/)**
   * **富士テストネット：[https://cchain.explorer.avax-test.](https://cchain.explorer.avax-test.network/)**net
   * **Localnet：n/**a

![ポストのための画像](../../../.gitbook/assets/erc20-metamask.png)

すべてのパラメーターを正しく設定した後、このページが表示されるはずです。今のところ、0AVAXを持っています。

## C-Chainアドレスに資金を供給する

使用されるネットワークにより、C-Chainアドレスに資金を稼働する3つの方法があります。

### **Avalancheウォレットを使用する**

メインネット上で、[Avalancheウォレット](https://wallet.avax.network/)を使用して、X-ChainからC-Chainアドレスに資金を送金することができます。この[チュートリアル](../platform/transfer-avax-between-x-chain-and-c-chain.md)で説明したように、プロセスはシンプルウォレットは、テストやローカルネットワーク上でも使用できます。

### **テストネットワークフォーセットを使用する**

テストネットワーク上で資金を提供する場合、テストネットワークコーセットを使用することもできます。[https://faucet.avax-test.network/](https://faucet.avax-test.network/)に移動し、C-Chainアドレスを貼り付けます。

### ローカルテストネット上で資金を提供

ローカルネットワーク上で、自身のコーセットを展開することにより、簡単にアドレスを資金調達ができます。[チュートリアル](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

[avaxフォーセット](https://faucet.avax-test.network/)に移動し、Cチェーンアドレスを貼り付けましょう。exmaple "0xfe8886bec537252040Dff36448C0F104Be635650"

![ポストのための画像](../../../.gitbook/assets/erc20-faucet.png)

ここに住所をコピーして貼り付けた後、20 AVAXリクエストをクリックします。このテストコークンは、価値はありません。

その後、ウォレット残高を確認し、メタマスクにテストトークンを用意する必要があります。

## mintableトークンを作成

さて、Remix上でミンテーブルトークンを作成することができます。ブラウザでリミックスを開くか[、このリンク](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js)に移動します。

![ポストのための画像](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

このページを見る必要があります。このページでは、まず「注目のプラグイン」から「SOLIDITY」をクリックし、「新しいファイル」ボタンをクリックします。新しいファイルボタンをクリックすると、ファイル名が必要なポップアップが表示されます。名前を選択するか、デフォルトは残してください。

[OpenZeppelin](https://openzeppelin.com/contracts/)からERC-20コントラクトを使用するため、この行をファイルに貼り付け、保存するだけです。

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![ポストのための画像](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

保存後、リミックスにインポートされる多くのファイルが表示されます。これは、URL-Linkを渡すだけで、GitHubコントラクトリポジトリをインポートするリミックスできるリミックス機能です。

![ポストのための画像](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

ERC20PresetMinterPauser.solこのファイルは、ERC20スタンダードに従い、Minter機能を備えたOpenZeppelinによって書かれます。このファイルを展開した後、我々はコントラクトの所有者となり、トークンをミントする権限と能力を持っています。

![ポストのための画像](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## コントラクトを展開

「SOLIDITY COMPILER」である2番目のタブを開き、「プラグマのソリティバージョンと一致する「ソリティバージョン」を選択します。バージョンは、ファイルのバージョンと同額以上でなければなりません。たとえば、私のファイルには、「pragma solidity ^0.6.0」と書かれているので、必要なバージョンは0.6.0以上です。以下のように、コンパイラで、0.6.6で、大丈夫です。 確認後、コンパイルボタンをクリックします。ファイル内の変更がなく、Solidityバージョンが間違いがない場合、エラーなしでコントラクトをコンパイルする必要があります。

![ポストのための画像](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

次に、DEPLOYとRUN TRANSACTIONである3番目のタブにジャンプしましょう。ここでは、コントラクトを展開する前に、環境を変更する必要があります。環境にクリックし、「インジェクションWeb3」を選択します。ポップアップが表示され、アカウントに接続するよう求まれた場合は、クリックして接続してください。その後、「アカウント」テキストボックスにアカウントアドレスが表示されるはずです。

デプロイメントプロセス前の最後のことは、トークンとしてデプロイされるコントラクトを設定することです。デプロイボタン上に、コントラクトを選択するドロップダウンメニューがあります。「ERC20PresetMinterPauser.sol

![ポストのための画像](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

さあ、ここにあなたのトークンの名前とシンボルを入力します。「テストと名付けられ、シンボルは「tst」になります。1度を与え、クリックして取引ボタンをクリックすることができます。

![ポストのための画像](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

ボタンをクリックすると、ポップアップが表示され、確認だけです。

![ポストのための画像](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

その後、別のポップアップ、メタマスク確認が表示されます。確認してください。

これらのポップアップを確認した後、avalanche C-Chainにトークンを展開しました。だから、我々はそれとやり取り始めることができます。

## トークンとのやり取り

この[cチェーンエクスプローラ](https://cchain.explorer.avax-test.network/)を通じてavalanche C-Chain上に展開されたトランザクションを見ることができます。

しかし、まず、リミックスコンソールからトランザクションハッシュを見てみましょう。

![ポストのための画像](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

コントラクトを展開した後、ログインリミックスコンソールが表示されるはずです。矢印をクリックして展開すると、トランザクションハッシュが出てきます。コピー。

![ポストのための画像](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

トランザクションハッシュを上記で共有した[エクスプローラ](https://cchain.explorer.avax-test.network/)に貼り付け、ENTERを押すだけです。

![ポストのための画像](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

ここでは、トランザクションとトークンコントラクトについてのすべての詳細を確認することができます。

![ポストのための画像](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

最初のものは、トークンを生成する私のウォレットアドレスであり、2番目のアドレスは、「テスト」と命名される私のトークンコントラクトアドレスです。さあ、我々自身のアドレスにトークンをミントしましょう。

![ポストのための画像](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

リミックスに戻り、デプロイ後、「デプロイされたコントラクト」セクションでコントラクトを見ることができるはずです。

ここでは、トークンコントラクトとやり取りできる機能が豊富です。OpenZeppelinドキュメントからこれらのメソッドをすべて確認して、使用方法を学ぶことができます。しかし、我々はmintメソッドのみを使用します。

mintメソッドの横に矢印をクリックして読み取ります。

![ポストのための画像](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

WEIであなたのアドレスと金額を入力します。たとえば、1000 tstトークンをミントするので、「100」を入力しました

![ポストのための画像](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Metamaskにトークンを追加する

今度は、コントラクトに1000トークンをミントしましたが、メタマスクウォレットでトークンを表示できないことはありません。自身のトークンを表示するには、追加する必要があります。メタマスク上で、「トークンを追加する」ボタンをクリックし、「カスタムトークン」タブを選択します。

ここに、上記のようにエクスプローラから見ることができるトークンアドレスを入力します。ここにコピーして貼り付けます。次に、次のボタンをクリックすると、メタマスクウォレットに名前が付いた1000トークンが表示されるはずです。また、remixあるいはmetamask経由で別のアカウントに送信することができます。

