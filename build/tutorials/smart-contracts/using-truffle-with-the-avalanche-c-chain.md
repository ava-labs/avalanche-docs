# Avalanche C-ChainでTruffleを使用する

## はじめに

[Truffle Suite](https://www.trufflesuite.com)は、EVM上で分散型アプリケーション（dapps）を起動するためのツールキットです。Truffleを使用することで、スマートコントラクトの書き込み、コンパイル、アーティファクトを構築し、移行を実行し、デプロイされたコントラクトとやり取りできます。このチュートリアルでは、AvalancheのC-ChainでTruffleを使用できる方法を説明します。

## 要件

完了した[Avalancheノードを実行](../nodes-and-staking/run-avalanche-node.md)し、Avalancheアーキテクチャに精通しています[。](../../../learn/platform-overview/)また、[AVAX X-ChainとC-Chain間](../platform/transfer-avax-between-x-chain-and-c-chain.md)のトランスファーAVAXチュートリアルを通じて、C-Chainアドレスに資金を稼働するようにクロスチェーンスワップを実行しています。

## 依存性

* [Avash](https://github.com/ava-labs/avash)は、ローカルAvalancheネットワークを実行するためのツールです。Truffleの[ガナッシュ](https://www.trufflesuite.com/ganache)と似ています。
* [NodeJS](https://nodejs.org/en) v8.9.4以降。
* Truffle。`npm install -g truffle`

## ローカルAvalancheネットワークを立ち上げる

[Avash](https://github.com/ava-labs/avash)により、AvalancheGoノードで、最大15の個別のテストネットワークデプロイメントをスピンアップすることができます。Avashは、luaスクリプトを通じて通常のタスクの自動化をサポートします。これにより、多様な構成に対して迅速なテストが可能になります。avashを使用する初めてのとき、[インストールとビルド](https://github.com/ava-labs/avash#quick-setup)が必要です。

ローカル5ノードAvalancheネットワークを開始する：

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

5つのノードAvalancheネットワークが、マシン上で実行されています。Avashを終了したいときは、実行し、実行してください。しかし`exit`、今はそのことをしないで、このターミナルタブを閉じないでAvashを終了します。

## Truffleディレクトリを作成し、依存をインストールする

新しいターミナルタブを開き、`truffle`ディレクトリを作成し、いくつかのさらなる依存をインストールすることができます。

まず、`truffle`作業ディレクトリを作成するディレクトリに移動します：

```text
cd /path/to/directory
```

新しいディレクトリを作成し、入力します`truffle`：

```text
mkdir truffle; cd truffle
```

EVMと通信できるライブラリ[であるweb3](https://web3js.readthedocs.io)をインストール`npm`するために使用してください。

```text
npm install web3 -s
```

web3を使用して、Web3がEVMにどのように対応するかという、HTTPプロバイダを設定します。最後に、ボイラープレーストリュフプロジェクトを作成します：

```text
truffle init
```

Avash内の開発（ローカル）ネットワークは、作成時にいくつかのスタティックアドレスを事前にファンドアップします。[@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider)を使用して、事前に資金されたアドレスを我々のアカウントとして使用します。

```text
npm install @truffle/hdwallet-provider
```

## truffle-config.js

`truffle init`実行時に作成されたファイルのひとつは、 .`truffle-config.js`以下のように追加します`truffle-config.js`。

```javascript
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const protocol = "http";
const ip = "localhost";
const port = 9650;
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}:${port}/ext/bc/C/rpc`
);

const privateKeys = [
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
  "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
  "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
  "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
  "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
  "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
  "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
  "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
  "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
  "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a",
];

module.exports = {
  networks: {
    development: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
    },
  },
};

```

変更が可能`ip`で`protocol`、APIコールが異なるAvalancheGoノードに直接呼び出される`port`場合にご留意ください。また`gasPrice`、Avalanche C-Chainに適した値を設定するに`gas`します。

## Storage.sol

`contracts`ディレクトリに、呼び出された新しいファイルを追加し`Storage.sol`、以下のコードブロックを追加します。

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

`Storage``store`機能を介してブロックチェーンに数字を書き込むとともに、機能を介してブロックチェーンから番号を戻すことができる、solidityスマートコントラクトです`retrieve`。

## 新しいマイグレーションを追加

名前付きの`migrations`ディレクトリに新しいファイルを作成`2_deploy_contracts.js`し、以下のコードブロックを追加します。これにより、`Storage`スマートコントラクトをブロックチェーンに展開することができます。

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Truffleでコントラクトをコンパイルする

`Storage.sol`変更があったときは、いつでも実行する必要があります。`truffle compile`

```text
truffle compile
```

あなたが見るはずです：

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## C-chain上でアカウント

スマートコントラクトをC-Chainに展開する際、truffleは、移行中に使用される`from`アドレスとして、C-Chainクライアントから提供される最初の利用可能なアカウントにデフォルトが設定されます。我々は、以下の上記のアカウントとして、事前に定義された秘密鍵を追加しました`truffle-config.json`。最初のデフォルトアカウントは、事前に資金されたAVAXを持つ必要があります。

### Truffleアカウント

トリュフコンソールでインポートされたアカウントを表示することができます。

トリュフコンソールを開く：
```bash
$ truffle console --network development
```

`Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`注意：あなたが見る場合、ネットワークがブートストラップと使用できるまで待つ必要があります。あまりにも長くかかるべきではありません。

トリュフコンソール内で：
```bash
truffle(development)> accounts
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

バランスが以下のものであることがわかります。
```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```
`accounts[1]`（`accounts[0]`デフォルトアカウント）にはバランスが存在し、バランスは存在しませんが、バランスは存在しませんのでご留意ください。



### スクリプティングアカウント資金
`accounts`リストに資金を稼ぐ便利なスクリプトがあります。[ここから](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/fund-cchain-addresses.js)見つけることができます。このコマンドを使用してダウンロードすることもできます：

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

スクリプトを実行できます：

```text
truffle exec fund-cchain-addresses.js --network development
```

スクリプトは、上記リストで`accounts`記載した各アカウントに1000 AVAXを提供します。スクリプトを連続して実行した後、以下のバランスが確認できます。
```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### アカウントに資金を提供する

自身のアカウントに資金を提供したい場合は、[AVAX トランスファー X-ChainとC-Chain間](../platform/transfer-avax-between-x-chain-and-c-chain.md)のチュートリアルのステップに従ってください。コントラクトデプロイメントコストをカバーするために、少なくとも`135422040`nAVAXをアカウントに送信する必要があります。

### パーソナルAPI

パーソナルAPIは、ノードのアカウントとやり取りします。例えば、`web3.eth.personal.newAccount``web3.eth.personal.unlockAccount`使用するいくつかの機能を`web3`持ちます。しかし、デフォルトでこのAPIは無効になっています。`C-chain`/設定でアクティベートすることができます`Coreth`。Avashは、現在このAPIをアクティベートするサポートはありません。したがって、これらの機能を使用する場合は、手動で自分のネットワークを実行する必要があります`personal-api-enabled`。[ローカルテストネットワークの作成/手動](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually)と[C-Chain構成を](https://docs.avax.network/build/references/command-line-interface#c-chain-configs)参照してください。


## マイグレーションを実行する

現在、移行を実行し、コントラクトを展開するために、すべてが完了しました`Storage`。

```text
truffle(development)> migrate --network development
```

あなたが見るはずです：

```text
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      1
> Block gas limit: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        4
   > block timestamp:     1607734632
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.91683679
   > gas used:            176943 (0x2b32f)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.08316321 ETH

   -------------------------------------
   > Total cost:          0.08316321 ETH

2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > block number:        6
   > block timestamp:     1607734633
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.8587791
   > gas used:            96189 (0x177bd)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH

   -------------------------------------
   > Total cost:          0.04520883 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

C-Chain上でアカウントを作成しなかった場合、以下のエラーが表示されます：

```text
Error: Expected parameter 'from' not passed to function.
```

アカウントに資金を提供しない場合、以下のエラーが表示されます：

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```


## コントラクトとやり取り

現在`Storage`コントラクトが展開されました。ブロックチェーンに番号を書き、それを読み直してみましょう。トリュフコンソールを開く：

デプロイされたコントラクトのインスタンスを取得します`Storage`：

```javascript
truffle(development)> let instance = await Storage.deployed()
```

これにより次のようになります：

```text
undefined
```

### ブロックチェーンに数を記す

コントラクトのインスタンスが完了しましたので、`store`メソッドと呼び、ブロックチェーンに書き込む数字を渡し`Storage`ます。

```javascript
truffle(development)> instance.store(1234)
```

次のようなものが表示されるはずです：

```javascript
{
  tx: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
  receipt: {
    blockHash: '0x8bacbce7c9d835db524bb856288e3a73a6afbe49ab34abd8cd8826db0240eb21',
    blockNumber: 9,
    contractAddress: null,
    cumulativeGasUsed: 26458,
    from: '0x34cb796d4d6a3e7f41c4465c65b9056fe2d3b8fd',
    gasUsed: 26458,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x0d507b0467baef742f9cc0e671eddbdf6df41d33',
    transactionHash: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
    transactionIndex: 0,
    rawLogs: []
  },
  logs: []
}
```

### ブロックチェーンから数値を読む

ブロックチェーンから数値を読み取るには、`Storage`コントラクトインスタンスの`retrieve`メソッドを呼び出してください。

```javascript
truffle(development)> let i = await instance.retrieve()
```

これで返すべきです：

```javascript
undefined
```

呼び出しの結果は、（`BN`大きな数）`retrieve`です。`.toNumber`メソッドを呼び出して、値を確認します：

```javascript
truffle(development)> i.toNumber()
```

保存された番号が表示される。

```javascript
1234
```

## 概要

現在、ローカルAvalancheネットワークの立ち上げ、トリュフプロジェクトを作成するだけでなく、Solidityコントラクトの作成、コンパイル、デプロイ、やり取りする必要がありますツールが完了しました。

