# Avalanche  C-ChainでHardhatを使用する

## はじめに

Avalancheは、相互運用可能で拡張性の高い単一のエコシステムで分散型アプリケーションとエンタープライズブロックチェーンデプロイメントを起動するためのオープンソースプラットフォームです。Avalancheでは、ネットワーク層とアプリケーション層の両方を完全に制御することができます - 想像できるあらゆるものを構築するのに役立ちます。

Avalancheネットワークは、多くのブロックチェーンで構成されています。これらのブロックチェーンのひとつが、Ethereumの仮想マシンインスタンスである C-Chain（コントラクトチェーン）です。 C-ChainのAPIは、EthereumのノードのAPIとほとんど同じものです。Avalancheは、Ethereumと同じインターフェースを、より高速、より高いスループット、より安い手数料、より短いトランザクション確認時間で提供しています。これらのプロパティは、自律分散型アプリケーションのパフォーマンスとスマートコントラクトのユーザーエクスペリエンスを大幅に向上させています。

このガイドの目的は、Avalancheの C-Chainにスマートコントラクトを書き込み、テストし、デプロイするためのベストプラクティスを示すことです。開発環境[Hardhat](https://hardhat.org)でスマートコントラクトを構築していきます。

## 前提要件

### NodeJSとYarn

まず、[nodejs](https://nodejs.org/en)のLTS（長期サポート）バージョンをインストールします。このガイドの作成時のバージョンは`14.17.0`です。NodeJSは`npm`をバンドルしています。

次に、[yarn](https://yarnpkg.com)をインストールします。

```text
npm install -g yarn
```

### AvalancheGoとAvash

[AvalancheGo](https://github.com/ava-labs/avalanchego)は、Goで記述されたAvalancheノード実装です。[Avash](https://docs.avax.network/build/tools/avash)は、ローカルテストネットワークを迅速にデプロイするためのツールです。これらを使って、ローカルテストネットワークをデプロイし、そのネットワーク上でテストを実行することができます。

### SolidityとAvalanche

[Solidity](https://docs.soliditylang.org)と[Avalanche](https://docs.avax.network)の基本を理解していると役に立ちます。

## 依存関係

[quickstartリポジトリ](https://github.com/ava-labs/avalanche-smart-contract-quickstart)をクローンを作成し、必要なパッケージを`yarn`を介してインストールします。

```text
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## コントラクトを書く

`Coin.sol`のコントラクトを`contracts/`に編集すると、`Coin.sol`は[Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20)コントラクトになります。ERC20は人気のスマートコントラクトインターフェースです。自分のコントラクトを追加することもできます。

## Hardhatの構成

Hardhatは、`hardhat.config.js`を環境設定ファイルとして使用します。そのファイルにタスク、ネットワーク、コンパイラなどを定義することができます。詳細については、[こちら](https://hardhat.org/config/)をご覧ください。

リポジトリでは、設定済のファイル [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts)を使用しています。このファイルは、Avalancheとスムーズにやり取りするために必要なネットワーク情報を設定します。ローカルテストネットワーク上でテストを行うための定義済の秘密鍵もいくつかあります。

## Hardhatタスク

[hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts)でカスタムhardhatタスクを定義することができます。例として`accounts`と`balances`を含む2つのタスクがあります。両方とも[package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)にスクリプトがあります。

```javascript
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts`は、アカウントのリストを表示します。`yarn balances`は、AVAXアカウントの残高リストを表示します。他の`yarn`スクリプトと同様に、hardhatタスクに`--network`フラグを渡すことができます。

### アカウント

ローカルAvashネットワーク上にアカウントのリストを表示します。

```text
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

### 残高

アカウントのリストと対応するAVAX残高をローカルAvashネットワークに表示します。

```text
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

最初のアカウントにすでに資金が入金されていることに注意してください。これは、このアドレスが、ローカルネットワークgenesisファイルで事前に入金されているからです。

## Hardhat ヘルプ

`yarn hardhat`を実行して、Hardhatのバージョン、使用方法、グローバルオプション、利用可能なタスクをリストします。

## 典型的なAvashのワークフロー

### Avashを実行する

まず、AvalancheGoの最新のビルドであることを確認します。

```text
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

（注意：ソースからビルドするのではなく、[コンパイル済のAvalancheGoバイナリをダウンロード](https://github.com/ava-labs/avalanchego/releases)することもできます。）

Avashを起動し、新しいローカルネットワークを開始するスクリプトを実行します。

```text
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

これで、5つのノードでローカルAvalancheネットワークを実行しています。

### アカウントに入金する

[`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js)スクリプトを使って`hardhat.config.ts`、1,000 AVAXをX-Chainから10個のアカウントのそれぞれに転送します。これらのアカウントへの資金の入金は、スマートコントラクトのデプロイとやり取りを前提条件としています。

注意: `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`が表示された場合は、ネットワークがブートストラップされ、使用可能になるまで待つ必要があります。それほど長くはかからないはずです。

```text
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

各アカウントに1000 AVAXが入金されていることを確認します。

```text
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

最初のアカウントから各アカウントにいくらかのAVAXを送信します。

```text
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

残高が更新されていることを確認します。

```text
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

### スマートコントラクトをコンパイルします。

[`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)に`compile`スクリプトが存在します。

```javascript
"compile": "npx hardhat compile",
```

`yarn compile`を実行して、プロジェクトがコンパイルされていることを確認します。

スマートコントラクトをコンパイルします。

```text
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## スマートコントラクトをデプロイする

Hardhatにより、複数の環境にデプロイすることが可能になります。[package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)には、デプロイするためのスクリプトがあります。

`scripts/deploy.ts`でデプロイスクリプトを編集します。

```javascript
"deploy": "npx hardhat run scripts/deploy.ts",
```

`--network`フラグに、それぞれの環境に応じた`local`（例えばAvashで作成したローカルネットワーク）、`fuji`または`mainnet`を指定することで、デプロイしたい環境を選ぶことができます。`--network`に指定しない場合は、デフォルトのhardhatネットワークになります。例えば、mainnetにデプロイしたい場合は、次のようになります。

```text
yarn deploy --network mainnet
```

ローカルネットワークにコントラクトをデプロイします。

```text
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

今、`0x17aB05351fC94a1a67Bf3f56DdbB941aE6`にデプロイされているトークンがあります。

### スマートコントラクトとのやり取り

Hardhatには、コントラクトやネットワークとやり取りするための開発者コンソールがあります。Hardhatのコンソールの詳細は、[こちら](https://hardhat.org/guides/hardhat-console.html)を参照ください。HardhatコンソールはNodeJS-REPLであり、その中で様々なツールを使用することができます。[ethers](https://docs.ethers.io/v5/)は、ネットワークと対話するために使用するライブラリです。

次でコンソールを開くことができます。

```text
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

コントラクトとやり取りするため、ファクトリーとコントラクトアドレスでコントラクトインスタンスを取得します。

```javascript
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

最初の行で、ABIとbytecodeでコントラクトファクトリを検索します。2行目で、指定されたコントラクトアドレスで、コントラクトファクトリーのインスタンスを検索します。前のステップで、コントラクトがすでに`0x17aB05351fC94a1a67Bf3f56DdbB941aE6`にデプロイされていたことを思い出してください。

アカウントをフェッチする。

```javascript
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

これは、`yarn accounts`にあるのと全く同じアカウントリストです。

これで、`ERC-20`コントラクトとやり取りできます。

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]`がデフォルトのアカウントであるため、`account[0]`には、残高があります。コントラクトはこのアカウントでデプロイされます。[ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol)の構成者は、コントラクトのデプロイ者に対し123456789トークンの`TOTAL_SUPPLY`をミントします。

`accounts[1]`には現在残高がありません。`accounts[1]`、すなわち`0x9632a79656af553F58738B0FB750320158495942`にいくらかのトークンを送信します。

```javascript
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

注意:これはローカルネットワークであるため、トランザクションが受け入れられるまで待つ必要はありませんでした。しかし、`fuji`や`mainnet`のような他のネットワークでは、`await result.wait()`でトランザクションが受け入れられるまで待つ必要があります。

これで、確実にトークンが転送されます。

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

お気づきかもしれませんが、`await coin.transfer(accounts[1], 100)`には「sender（送信者）」情報がありません。これは、`ethers`がデフォルトの署名者として最初の署名者を使用しているからです。この場合には、`account[0]`です。別のアカウントを使用したい場合は、最初にそのアカウントと接続する必要があります。

```javascript
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

これで、`signer1`、すなわち`account[1]`でコントラクトを呼び出すことができます

```javascript
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

さあ、残高をチェックしましょう。

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

`accounts[1]`から`accounts[0]`への5つのトークンの転送に成功しました。

## まとめ

これで、ローカルAvalancheネットワークを起動し、Hardhatプロジェクトを作成、Solidityコントラクトを作成、コンパイル、デプロイ、やり取りするのに必要なツールが備わりました。

[Discordサーバー](https://chat.avax.network)に参加して、もっと多くを知り、質問してください。

