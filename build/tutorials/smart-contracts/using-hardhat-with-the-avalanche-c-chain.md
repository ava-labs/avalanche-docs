# Avalanche C-Chainでハードハットを使用する

## はじめに

Avalancheは、相互運用可能で拡張性の高い単一のエコシステムで分散型アプリケーションとエンタープライズブロックチェーンデプロイメントを起動するためのオープンソースプラットフォームです。Avalancheにより、ネットワークとアプリケーションレイヤー両方で完全なコントロールが可能になります。

Avalancheネットワークは、多くのブロックチェーンで構成されています。これらのブロックチェーンのひとつは、イーサリアムのバーチャルマシンインスタンスであるC-Chain（コントラクトチェーン）です。C-ChainのAPIは、イーサリアムノードAPIとほぼ同じです。Avalancheは、イーサリアムと同じインターフェースを提供しますが、より高速、より高いスループット、より低い手数料、より低い取引確認時間であります。これらのプロパティにより、DAppsのパフォーマンスとスマートコントラクトのユーザー体験が大幅に向上します。

このガイドの目的は、AvalancheのC-Chainにスマートコントラクトの書き込み、テスト、展開に関するベストプラクティスを、Avalancheのベストプラクティスで提供することです。開発環境 [Hardhat](https://hardhat.org)でスマートコントラクトを構築します。

## 前提条件

### NodeJSとヤーン

まず、LTS（長期サポート）バージョンの [nodejs](https://nodejs.org/en)をインストールします。これは、執筆時点`14.17.0`です。NodeJSバンドル`npm`。

次に、[yarn](https://yarnpkg.com)をインストールします：

```zsh
npm install -g yarn
```

### AvalancheGoとAvash

[AvalancheGo](https://github.com/ava-labs/avalanchego)は、Goで書かれたAvalancheノード実装です。[Avash](https://docs.avax.network/build/tools/avash)は、ローカルテストネットワークを迅速に展開するためのツールです。一緒に、ローカルテストネットワークを展開し、それら上にテストを実行できます。

### SolidityとAvalanche

[Solidity](https://docs.soliditylang.org)と[Avalanche](https://docs.avax.network)を基本的に理解する場合も便利です。

## 依存性

[quickstartリポジトリ](https://github.com/ava-labs/avalanche-smart-contract-quickstart)をクローンし、必要なパッケージを経由してインストールします`yarn`。

```zsh
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## コントラクトを書く

.でコントラクトを編集する`contracts/``Coin.sol`のは[オープンZeppelin ERC20](https://openzeppelin.com)[](https://eips.ethereum.org/EIPS/eip-20)`Coin.sol`コントラクトです。ERC20は、人気のスマートコントラクトインターフェースです。自身のコントラクトを追加することもできます。

## Hardhat Config

Hardhatは、設定ファイル`hardhat.config.js`として使用します。タスク、ネットワーク、コンパイラなどをそのファイルで定義することができます。より詳細な情報については[、ここ](https://hardhat.org/config/)を参照してください。

我々のリポジトリでは、事前に設定されたファイル [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts)を使用します。このファイルは、Avalancheとのスムーズなやり取りを提供するために必要なネットワーク情報を構成します。ローカルテストネットワーク上でテストするための事前に定義された秘密鍵もあります。

## Hardhat Tasks

カスタムハットタスクを [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts)で定義できます。例として、2つのタスクがあります：`accounts`と。`balances`両方とも[package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts``yarn balances`アカウントのリストを印刷します。他の`yarn`スクリプトと同様に、ハードハットタスクに`--network`フラグを渡すことができます。

### アカウント

ローカルAvashネットワーク上にアカウントのリストを印字します。

```zsh
$ yarn accounts --network local
yarn run v1.22.4
npx hardhat accounts --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
0x9632a79656af553F58738B0FB750320158495942
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4
0x0B891dB1901D4875056896f28B6665083935C7A8
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2
0x78A23300E04FB5d5D2820E23cc679738982e1fd5
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB
0x0Fa8EA536Be85F32724D57A37758761B86416123
```

### バランス

アカウントのリストと、それに該当するAVAXバランスがローカルAvashネットワーク上に表示されます。

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

最初のアカウントがすでに資金が入手されていることにご留意ください。このアドレスは、ローカルネットワークジェネシスファイルで事前に資金提供されているからです。


## Hardhat ヘルプ

実行して、Hardhatのバージョン、使用指示、グローバルオプション、利用可能なタスクをリスト`yarn hardhat`します。

## 典型的なAvashワークフロー

### Avashを実行する

まず、AvalancheGoが構築されていることを確認します。

```zsh
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

（[あらかじめコンパイルされたAvalancheGoバイナリ](https://github.com/ava-labs/avalanchego/releases)をダウンロードすることもできます。）

Avashを起動し、スクリプトを実行して新しいローカルネットワークを開始します。

```zsh
$ cd /path/to/avash
$ git fetch -p
$ git checkout master
$ go build
$ ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
$ avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

5つのノードで、ローカルAvalancheネットワークを実行します。

### ファンドアカウント

`hardhat.config.ts`X-Chainから10アカウントに10アカウントを移動します。[`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js)これらのアカウントの資金化は、スマートコントラクトを展開し、やり取りするための前提条件です。

注意：あなたが見る場合`Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`、ネットワークがブートストラップと使用できるまで待つ必要があります。あまりにも長くかかるべきではありません。


```zsh
$ cd /path/to/avalanche-smart-contract-quickstart
$ yarn fund-cchain-addresses
yarn run v1.22.4
npx hardhat run scripts/fund-cchain-addresses.js --network local
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

それぞれのアカウントが1000 AVAXで資金提供されていることを確認します。

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000001000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000000000000000000
✨  Done in 0.72s.
```

最初のアカウントからAVAXをそれぞれ送付します。

```zsh
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

残高が更新されていることを確認する

```zsh
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 49999999995275000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000010000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000010000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000010000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000010000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000010000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000010000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000010000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000010000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000010000000000000000
```

### スマートコントラクト

スクリプ[`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)があります`compile`。

```json
"compile": "npx hardhat compile",
```

実行して、プロジェクトがコンパイル`yarn compile`するようにします。

スマートコントラクトをコンパイルします。

```zsh
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## スマートコントラクトを展開する

Hardhatにより、多数の環境にデプロイすることができます。[package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)

デプロイメントスクリプトを編集する`scripts/deploy.ts`

```json
"deploy": "npx hardhat run scripts/deploy.ts",
```

`local`（Avashで作成されたローカルネットワークなど）`--network`フラグで渡し、`fuji`またはそれぞれの環境`mainnet`でデプロイする環境を選択できます。パスインしない場合`--network`、ハードハットネットワークにデフォルトになります。例えば、mainnetにデプロイしたい場合：

```zsh
yarn deploy --network mainnet
```

ローカルネットワークにコントラクトを展開します

```zsh
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

現在、以下の場所でトークンが展開されました`0x17aB05351fC94a1a67Bf3f56DdbB941aE6`。

### スマートコントラクトとのやり取り

Hardhatは、コントラクトやネットワークとやり取りするための開発者コンソールを持っています。Hardhatのコンソールについてのより詳細な情報は[、ここ](https://hardhat.org/guides/hardhat-console.html)を参照してください。Hardhatコンソールは、NodeJS-REPLであり、その中で異なるツールを使用できます。[エター](https://docs.ethers.io/v5/)は、我々が我々のネットワークとやり取りするためのライブラリです。

以下のようなコンソールで開くことができます。

```zsh
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

我々の契約とやり取りするためのファクトリーおよびコントラクトアドレスでコントラクトインスタンスを取得します：

```js
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

最初の行は、ABIとバイトコードでコントラクトファクトリを取得します。2番目の行は、指定されたコントラクトアドレスで、そのコントラクトファクトリーのインスタンスを取得します。我々のコントラクトがすでに以前のステップ`0x17aB05351fC94a1a67Bf3f56DdbB941aE6`で展開されていることを忘れないようにしてください。

アカウントを取得する：

```js
> let accounts = await ethers.provider.listAccounts()
undefined
> accounts
[
  '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  '0x9632a79656af553F58738B0FB750320158495942',
  '0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430',
  '0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4',
  '0x0B891dB1901D4875056896f28B6665083935C7A8',
  '0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2',
  '0x78A23300E04FB5d5D2820E23cc679738982e1fd5',
  '0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293',
  '0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB',
  '0x0Fa8EA536Be85F32724D57A37758761B86416123'
]
```
これは、とまさに同じアカウントリストです`yarn accounts`。

これで、我々のコントラクトとやり取りできます`ERC-20`：

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]``account[0]`デフォルトのアカウントであるため、バランスが保持されます。コントラクトは、このアカウントで展開されます。[ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol)のコンストラクタで、コントラクトのデプロイアに123456789トークンの123456789トークンのミント`TOTAL_SUPPLY`のコントラストです。

`accounts[1]`現在バランスがありません。`accounts[1]`いくつかのトークンを送信します`0x9632a79656af553F58738B0FB750320158495942`。

```js
> let result = await coin.transfer(accounts[1], 100)
undefined
> result
{
  hash: '0x35eec91011f9089ba7689479617a90baaf8590395b5c80bb209fa7000e4848a5',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 3,
  data: '0xa9059cbb0000000000000000000000009632a79656af553f58738b0fb7503201584959420000000000000000000000000000000000000000000000000000000000000064',
  r: '0xc2b9680771c092a106eadb2887e5bff41fcda166c8e00f36ae79b196bbc53d36',
  s: '0x355138cb5e2b9f20c15626638750775cfc9423881db374d732a8549d05ebf601',
  v: 86260,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

注意：これはローカルネットワークなので、トランザクションが承認されるまで待つ必要はありません。`fuji``mainnet`しかし、他のネットワークでは、トランザクションが受け付けるまで待つ必要があります。 .`await result.wait()`

これで、トークンが転送されるようにすることができます：

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

ご存知のように、内に「送信者」情報は存在しません`await coin.transfer(accounts[1], 100)`。これは、最初のシグナーをデフォルトのシグナーとして`ethers`使用するためです。我々の場合、これはです`account[0]`。別のアカウントを使用したい場合、まずそれに接続する必要があります。

```js
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

今度は`signer1`、コントラクトを呼ぶことができます`account[1]`。

```js
> await contractAsSigner1.transfer(accounts[0], 5)
{
  hash: '0x807947f1c40bb723ac312739d238b62764ae3c3387c6cdbbb6534501577382dd',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9632a79656af553F58738B0FB750320158495942',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 2,
  data: '0xa9059cbb0000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000005',
  r: '0xcbf126dd0b109491d037c5f3af754ef2d0d7d06149082b13d0e27e502d3adc5b',
  s: '0x5978521804dd15674147cc6b532b8801c4d3a0e94f41f5d7ffaced14b9262504',
  v: 86259,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

さあ、残高を確認しましょう：

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

5つのトークを、順次移転しました`accounts[1]`。`accounts[0]`

## 概要

現在、ローカルAvalancheネットワークの立ち上げ、Hardhatプロジェクトを作成するだけでなく、Solidityコントラクトの作成、コンパイル、デプロイ、やり取りする必要がありますツールが完了しました。

[Discordサーバー](https://chat.avax.network)に参加し、より多くの情報を知り、あなたが持つ可能性のある質問をしてください。