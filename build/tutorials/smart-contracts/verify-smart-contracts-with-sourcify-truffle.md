# プロジェクトを作成する

_このチュートリアルは、truffle[のクイックスタートドキュメント](https://www.trufflesuite.com/docs/truffle/quickstart)の項目を含み、[blockscoutのドキュメント](https://docs.blockscout.com/for-users/smart-contract-interaction/verifying-a-smart-contract/contracts-verification-via-sourcify)にも影響を受けています_

truffleが以下にインストールされているか確認してください。
```
npm install -g truffle
```

Truffleプロジェクト用の新しいディレクトリを作成します。

```zsh
mkdir MetaCoin
cd MetaCoin
```

MetaCoinボックス（「unbox」）をダウンロードします。
```
truffle unbox metacoin
```


この操作が完了すると、次のような項目で構成されたプロジェクト構造ができあがります。

* ``contracts/``：Solidityの契約に関するディレクトリ
* ``migrations/``：スクリプト可能な展開ファイルのディレクトリ
* ``test/``：アプリケーションやコントラクトをテストするためのテストファイル用ディレクトリ
* ``truffle.js``：Truffleの設定ファイル

## コンパイル
以下のように環境を整えてください。

```zsh
yarn add @truffle/hdwallet-provider
```


プロジェクトのルートディレクトリに``.env.json``ファイルを作成します。

```json
{"mnemonic": "your-wallet-seed-phrase"}
```

あなたの``truffle-config.js``ファイルを適切な設定にします。


```js
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require("@truffle/hdwallet-provider");

 //
 const { mnemonic } = require('./.env.json');

 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */

   networks: {

    fuji: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
_メインネットに対応したネットワーク構成が可能です（[代替案](verify-smart-contracts-with-sourcify-truffle.md#alternatives)参照）_

次のコマンドを実行します。

```zsh
truffle compile
```


この操作が完了すると、``./build/contracts``フォルダには以下の項目が含まれるようになります。


* ``ConvertLib.json``
* ``MetaCoin.json``
* ``Migrations.json``

_今後の利用_には、``MetaCoin.json``が必要になります。

## 移行

次のコマンドを実行します。
```zsh
truffle migrate --network fuji
```

ターミナルにtxnのアクティビティが表示されているはずです。

![ステップ1







](https://user-images.githubusercontent.com/73849597/128948790-654fc0dc-25d5-4713-9058-dfc4101a8366.png)
<br>
![ステップ2](https://user-images.githubusercontent.com/73849597/128949004-c63d366f-3c0e-42e0-92f5-cb86da62bcba.png)
<br>
![ステップ3](https://user-images.githubusercontent.com/73849597/128948793-3cb1beda-00c3-47e2-ab43-7b4712b1cf1d.png)


_今後の使用のために、MetaCoinの契約アドレスが必要となります。_


#  C-Chainエクスプローラでスマートコントラクトを検証する

C-Chainコントラクトの検証をサポートしており、ユーザーはそれを確認することができます。

メインネットのC-Chainエクスプローラーは[こちら](https://cchain.explorer.avax.network/)、「Fujiテストネットエクスプローラー」は[こちら](https://cchain.explorer.avax-test.network/)です。

問題がある場合は、[Discord](https://chat.avalabs.org)でご連絡ください。

## ステップ
* コントラクトのアドレス用のエクスプローラーページで_コード_タブに進む

![CodeTab2](https://user-images.githubusercontent.com/73849597/128950386-35d89fe5-c61f-41b0-badf-87a487bf422c.png)


* _検証と公開_をクリックして、スマートコントラクトの検証ページに入る

![SourcifyVerify](https://user-images.githubusercontent.com/73849597/128950515-cc74c92f-6da3-485f-bb7f-a033eb59bd2e.png)


* _Sourcifyをクリック：SourcesおよびmetadataJSONファイル_

* _次へ_をクリック

![JSONSourcify](https://user-images.githubusercontent.com/73849597/128950634-55bdd46e-885b-437e-84d2-534bd1801df0.png)

* ``MetaCoin.sol`` ``ConvertLib.sol``と``MetaCoin.json``をアップロード（ビルドフォルダ内にあります）

* _検証と公開_をクリック



![MetaCoin](https://user-images.githubusercontent.com/73849597/128950810-b1b5c280-267b-47ce-9922-edd36a157cd6.png)

* 検証済みのコントラクトを見る：[MetaCoin](https://cchain.explorer.avax-test.network/address/0xf1201EA651Ed5F968920c8bC62Fd76ea4CBfd9C2/contracts)


# 代替案

## 検証用ファイルのフラット化
```zsh
yarn add truffle-flattener
```

次のコマンドを実行します。

```zsh
npx truffle-flattener contracts/MetaCoin.sol > contracts/MetaCoin_flat.sol
```

コンピレーション、マイグレーション、ベリファイのステップを繰り返す

## メインネットの展開

あなたの``truffle-config.js``ファイルを適切な設定にします。

```js
module.exports = {
...
   networks: {

    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
次のコマンドを実行します。
```zsh
truffle migrate --network mainnet
```

