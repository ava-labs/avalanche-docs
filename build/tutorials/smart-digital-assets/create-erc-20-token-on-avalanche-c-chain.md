---
description: 'JPJ-PRJ-PRJ-P'

---

# ERC-20トークンを作成します。

ERC-20トークンはEthereumで最も基本的で本質的なコンセプトです。Avalancheコミュニティとエコシステムが成長するにつれて、Ethereumまたは異なるチェーンで実行されている新しいユースケースやプロジェクトがAvalancheに実装されます。プロジェクトに使用されるトークン標準は特定のものではなく、誰でも独自の標準および独自のトークンを作成できます。

したがって、私たちは独自のmintable ERC-20トークンを作成し、それを私たちが望む任意のアドレスにそれをミントします。トークンはAvalanche C-Chainで生成され、そのチェーンでアクセスできます。

主に考慮すべき点は、Solidityで書かれたスマートコントラクトをAvalancheに展開することです。Avalancheが提供する機能です。スマートコントラクトをチェーンに展開できるように、新しい言語固有の契約コンセプトに相互に取り組む必要はありません。ERC-20コントラクトを作成し、それをavalanche C-Chainにデプロイする方法を見てみましょう。

## Metamaskの設定

まず最初に設定すべきことは、メタマスクウォレットです。

![投稿の画像](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

ブラウザのメタマスクアイコンをクリックして、ネットワークドロップダウンメニューを選択します。C-Chainに接続する必要があります。Custom RPCをクリックします。

![投稿の画像](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

これで、これらのボックスを正しい値で設定する必要があります。

* **ネットワーク名**: Avalanche C-Chain
* **新しいRPC URL**:
   * **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
   * **JPJ**[-JP-](https://api.avax-test.network/ext/bc/C/rpc)JP
   * **Local Testnet:** [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:
   * **メインネット:** `43114`
   * **富士テストネット:** `43113`
   * **Local Testnet:** `43112`
* **シンボル：**AVAX
* **Explorer**:
   * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/)
   * **JP**[-JP-](https://cchain.explorer.avax-test.network/)
   * **Localnet:** n/a

![投稿の画像](../../../.gitbook/assets/erc20-metamask.png)

すべてのパラメータを正しく設定した後、このページを見るはずです。JavaScript-JP-JP-

## C-Chainアドレスに資金を供給する

使用しているネットワークによっては、C-Chainアドレスに資金を取得する方法は3つあります。

### **Avalancheウォレットの使用**

メインネットでは、[Avalanche Wallet](https://wallet.avax.network/)を使用して、X-ChainからC-Chainアドレスに資金を振り込むことができます。このチュートリアルで説明したように、プロセスは簡単です[。](../platform/transfer-avax-between-x-chain-and-c-chain.md)Walletはテストやローカルネットワークでも使用できます。

### **Test Network Faucetの使用**

テストネットワークでの資金調達には、[Test Network Faucet]を使用することもできます。[https://faucet.avax-test.network/](https://faucet.avax-test.network/) に移動し、C-Chain アドレスを貼り付けます。

### ローカルテストネットでの資金調達

ローカルネットワークでは、自分で蛇口を展開することによって、簡単にアドレスに資金を供給することができます。[JavaScript-JP-JP-](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

[avax蛇口](https://faucet.avax-test.network/)に行き、C-Chainアドレスを貼り付けましょう。exmaple "0xfe8886bec537252040Dff36448C0F104Be635650" のために。

![投稿の画像](../../../.gitbook/assets/erc20-faucet.png)

ここにアドレスをコピーして貼り付けた後、[20 AVAX]をクリックします。このテスト蛇口トークンは、単に開発目的のためだけです。

その後、ウォレットの残高を確認し、メタマスクでテストトークンを持っている必要があります。

## mintableトークンを作成します。

これで、Remixでmintableトークンを作成できます。Remix を開くか[、このリンク](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js)に移動します。

![投稿の画像](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

このページを見るべきです。このページではまず、「Featured Plugins」から「SOLIDITY」をクリックし、「New File」ボタンをクリックします。[New File]ボタンをクリックすると、ファイル名が必要なポップアップが表示されます。名前を選択するか、デフォルトを残すことができます。

[OpenZeppelin](https://openzeppelin.com/contracts/)からERC-20コントラクトを使用するので、この行をファイルに貼り付けて保存してください。

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![投稿の画像](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

ファイルを保存した後、Remixにインポートしたたくさんのファイルが表示されます。これは、GitHubコントラクトリポジトリをインポートして、URL-Link. を import 文で remix することができます。

![投稿の画像](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

ERC20PresetMinterPauser.sol ファイルはプリセットに含まれています。このファイルは、Minter機能を備えたERC20規格に従ってOpenZeppelinによって書かれています。このファイルをデプロイした後、私たちはコントラクトの所有者になり、トークンをミントする権限と能力があります。

![投稿の画像](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Contractのデプロイ

2番目のタブを開き、「SOLIDITY COMPILER」で書き込まれたsolidityバージョンと一致するsolidityバージョンを選択します。バージョンはファイルのバージョンと同じまたはそれ以上でなければなりません。例えば、私のファイルには、"pragma solidity ^0.6.0" と書かれているので、必要なバージョンは0.6.0以上です。JavaScript-JP-JP-もし、ファイル内の何も変更されなかったり、solidityバージョンが間違っていない場合は、コントラクトはエラーなしでコンパイルする必要があります。

![投稿の画像](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

次に、DEPLOY & RUN TRANSACTIONの3番目のタブにジャンプしましょう。ここでは、契約を展開する前に、環境を変更する必要があります。環境に戻って、「Injected Web3」を選択します。ポップアップが表示され、アカウントの接続を求められたら、[接続]をクリックします。その後、[ACCOUNT]テキストボックスにアカウントアドレスが表示されます。

デプロイプロセスの前の最後のものは、トークンとしてデプロイされるコントラクトを設定することです。Deploy Buttonの上に、契約を選択するドロップダウンメニューがあります。ERC20PresetMinterPauser.solという名前のコントラクトを選択します。

![投稿の画像](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

ここにトークンの名前とシンボルを入力します。Test と名前を付けて、シンボルは "tst" になります。あなたはそれを与え、クリックしてトランザクションボタンを押します。

![投稿の画像](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

ボタンをクリックすると、ポップアップが表示され、それを確認するだけです。

![投稿の画像](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

そして別のポップアップ、メタマスク確認が表示されます。確認してください。

これらのポップアップをすべて確認した後、私たちはavalanche C-Chainにトークンを展開しました。それで、それと対話し始めます。

## Tokenと交換する

この[c](https://cchain.explorer.avax-test.network/)-chainエクスプローラーを通じて、avalanche C-Chainにデプロイしたトランザクションを見ることができます。

まず、remixコンソールからトランザクションハッシュを見てみましょう。

![投稿の画像](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

コントラクトをデプロイしたら、log in remix console が表示されます。矢印をクリックして展開するとトランザクションハッシュが表示されます。- それをコピーします

![投稿の画像](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

トランザクションハッシュを上記の[エクスプローラ](https://cchain.explorer.avax-test.network/)に貼り付けてEnterキーを押します。

![投稿の画像](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

ここでは、トランザクションとトークン契約のすべての詳細を見ることができます。

![投稿の画像](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

1つ目は、トークンを作成する私のウォレットアドレスであり、2つ目は、testという名前の私のトークンコントラクトアドレスです。さて、自分自身のアドレスにトークンをミントしましょう。

![投稿の画像](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

リミックスに戻って、デプロイした後、「Deployed Contracts」セクションで契約を確認できるはずです。

トークンコントラクトと対話するために使える関数がたくさんあります。これらのメソッドは、OpenZeppelin ドキュメントから確認できます。しかし、mintメソッドのみを使用します。

mintメソッドの横にある矢印をクリックして読み込む。

![投稿の画像](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

WEIであなたの住所と金額を入力します。例えば、1000 tst tokenをmintしますので、「100

![投稿の画像](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## TokenをMetamaskに追加

今度は1000トークンがコントラクトにマイナーされましたが、メタマスクウォレットにトークンが表示されないはずです。独自のトークンを見るには、追加する必要があります。metamaskでは、「Add Token」ボタンをクリックし、「Custom Token」タブを選択します。

ここでは、上記のように、エクスプローラーから見ることができるトークンアドレスを入力します。ここにそれをコピーして貼り付けます。次に[Next]ボタンをクリックすると、メタマスクウォレットに名前を付けた1000トークンが表示されます。また、remixまたはmetamaskで別のアカウントに送信することもできます。

