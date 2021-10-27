# Avalanche  C-ChainでTruffleを使用する

## はじめに

[Truffle Suite（Truffle製品群）](https://www.trufflesuite.com)は、EVM上で自律分散型アプリケーション（dapps）を起動するためのツールキットです。Truffleを使用することで、スマートコントラクトの書き込みやコンパイル、アーティファクトの構築、移行を実行し、デプロイされたコントラクトとやり取りすることができます。このチュートリアルでは、EVMのインスタンスである、Avalancheの C-ChainでTruffleを使用する方法を説明します。

## 要件

[Run an Avalanche Node（Avalancheノードを実行する）](../nodes-and-staking/run-avalanche-node.md)を修了しているので、[Avalancheのアーキテクチャ](../../../learn/platform-overview/)をよく理解されていると思います。また、[X-Chainと C-Chain間でAVAXを転送する](../platform/transfer-avax-between-x-chain-and-c-chain.md)チュートリアルで、クロスチェーンスワップをして、自分の C-Chainアドレスに資金を入れることもすでに実施しています。

## 依存関係

* [Avash](https://github.com/ava-labs/avash)は、ローカルAvalancheネットワークを実行するためのツールです。これは、Truffleの[Ganache](https://www.trufflesuite.com/ganache)と類似しています。
* [NodeJS](https://nodejs.org/en) v8.9.4以降。
* `npm install -g truffle`でインストールできるTruffle

## ローカルAvalancheネットワークを起動する

[Avash](https://github.com/ava-labs/avash)を使用すると、最大15台のAvalancheGoノードで、プライベートテストネットワークのデプロイメントをすぐに立ち上げることが可能です。Avashは、luaスクリプトを介して通常のタスクの自動化をサポートします。これにより、さまざまな構成に対して迅速なテストが可能になります。avashをはじめて使用する場合は、[avashのインストールとビルド](https://github.com/ava-labs/avash#quick-setup)が必要になります。

ローカルの5ノードAvalancheネットワークを起動します。

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

5ノードAvalancheネットワークがマシン上で実行されています。Avashを終了したい場合は、`exit`を実行しますが、今は、それをしないでください、また、このターミナルタブを閉じたりしないでください。

## Truffleのディレクトリを作成し、依存関係をインストールする

新しいターミナルタブを開きます。これにより`truffle`ディレクトリの作成や、いくつかの追加の依存関係をインストールすることができます

まず、`truffle`ワーキングディレクトリを作成するディレクトリに移動します。

```text
cd /path/to/directory
```

新しく`truffle`と名前を付けたディレクトリを作成し、そのディレクトリに入ります。

```text
mkdir truffle; cd truffle
```

`npm`を使用して、EVMと対話ができるライブラリである[web3](https://web3js.readthedocs.io)をインストールします。

```text
npm install web3 -s
```

ここでは、web3を使ってHTTPプロバイダを設定し、web3がEVMと会話するための手段とします。最後に、boilerplace truffleプロジェクトを作成します。

```text
truffle init
```

Avashの開発（ローカル）ネットワークでは、作成されたときに、いくつかの静的アドレスに対してあらかじめ資金が入金されています。[@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider)を使って、あらかじめ資金がされたアドレスを、自分のアカウントとして使用します。

```text
npm install @truffle/hdwallet-provider
```

## truffle-config.jsを更新する

`truffle init`を実行するときに作成されるファイルの1つが`truffle-config.js`です。次を`truffle-config.js`に追加します。

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

API呼び出しを別のAvalancheGoノードに移動したい場合は、`protocol`、`ip`と`port`を変更できることに留意してください。また、`gasPrice`と`gas`をAvalanche C-Chainに対する適切な値に設定していることにも留意してください。

## Storage.solを追加する

`contracts`ディレクトリには、`Storage.sol`と呼ばれる新しいファイルを追加し、次のコードのブロックを追加してください。

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

`Storage`は、Solidarityスマートコントラクトです。これのおかげで、`store`ファンクションを介してブロックチェーンに番号を書き込み、`retrieve`ファンクションを介してブロックチェーンから番号を読み返すことができます。

## 新しい移行を追加する

新しいファイルを`2_deploy_contracts.js`と名付けられた`migrations`ディレクトリに作成し、次のコードブロックを追加します。これにより、`Storage`スマートコントラクトをブロックチェーンにデプロイします。

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Truffleでコントラクトをコンパイルする

`Storage.sol`に変更を加えるときは、常に、`truffle compile`を実行する必要があります。

```text
truffle compile
```

次をご覧ください。

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

##  C-Chain上のアカウント

 C-Chainにスマートコントラクトをデプロイする際、truffleは、移行中に使用`from`されるアドレスとして C-Chainクライアントによって提供される最初に使用可能なアカウントをデフォルトにします。`truffle-config.json`のアカウントとして、定義済の秘密鍵を追加しました。最初のデフォルトのアカウントは、事前に資金が入れられたAVAXを持っている必要があります。

### Truffleアカウント

truffleコンソールでインポートされたアカウントを見ることができます。

truffleコンソールを開くには、次を実行します。
```bash
$ truffle console --network development
```

注意：`Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`が表示された場合、ネットワークがブートストラップされ、使用可能になるまで待つ必要があります。あまりに長くかかることはありません。

Truffleコンソールの中は、次のようになっています。
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

残高を確認することができます。
```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```
`accounts[0]`（デフォルトのアカウント）にはいくらかの残高があり、`accounts[1]`には残高がないことに注意してください。



### アカウントに資金を入れるスクリプトを書く
`accounts`リストに資金を入れる便利なスクリプトがあります。[ここ](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/fund-cchain-addresses.js)にあります。このコマンドを使用してダウンロードすることもできます。

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

これでスクリプトを実行することができます。

```text
truffle exec fund-cchain-addresses.js --network development
```

スクリプトで、上記の`accounts`リストの各アカウントに1,000 AVAXの資金を入れます。スクリプトを実行した後、残高を確認することができます。
```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### アカウントに資金を入れる

自分のアカウントに資金を入れたい場合は、[Transfer AVAX Between X-Chain and C-Chain（X-Chainと C-Chain間でAVAXを転送する）](../platform/transfer-avax-between-x-chain-and-c-chain.md)チュートリアルのステップに従ってください。コントラクトのデプロイメントコストをカバーするため、最低でも`135422040`nAVAXをアカウントに送信する必要があります。

### パーソナルAPI

パーソナルAPIはノードのアカウントとやり取りします。`web3`は、それを使用するいくつかの機能を持ちます。例えば`web3.eth.personal.newAccount`、`web3.eth.personal.unlockAccount`などです。しかし、このAPIは、デフォルトでは無効になっています。`C-chain`/`Coreth`構成で有効にすることができます。Avashは、現在このAPIの有効化はサポートしていません。そのため、これらの機能を使用したい場合は、`personal-api-enabled`で自分のネットワークを手動で実行する必要があります。[ローカルテストネットワークを作成する/手動での作成](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually)および[ C-Chainの構成](https://docs.avax.network/build/references/command-line-interface#c-chain-configs)を参照してください。


## 移行を実行する

これで、移行を実行し、`Storage`コントラクトをデプロイするすべての準備がととのいました。

```text
truffle(development)> migrate --network development
```

次をご覧ください。

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

 C-Chain上にアカウントを作成していない場合は、このエラーが表示されます。

```text
Error: Expected parameter 'from' not passed to function.
```

アカウントに資金を入れていない場合は、このエラーが表示されます。

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```


## コントラクトとのやり取り

これで、`Storage`コントラクトがデプロイされました。ブロックチェーンに番号を書き込み、それを読み返してみましょう。Truffleコンソールを再度開きます。

デプロイされた`Storage`コントラクトのインスタンスを取得します。

```javascript
truffle(development)> let instance = await Storage.deployed()
```

これが返されます。

```text
undefined
```

### ブロックチェーンに番号を書き込む

これで、`Storage`コントラクトのインスタンスが得られ、`store`メソッドを呼び出し、番号を渡してブロックチェーンに書き込みます。

```javascript
truffle(development)> instance.store(1234)
```

次のようなものが表示されます。

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

### ブロックチェーンから番号を読み出す

ブロックチェーンから番号を読み出すためには、`Storage`コントラクトインスタンスの`retrieve`メソッドを呼び出します。

```javascript
truffle(development)> let i = await instance.retrieve()
```

これが返されます。

```javascript
undefined
```

`retrieve`への呼び出しの結果は、`BN`（大きな数字）です。`.toNumber`メソッドを呼び出し、値を確認します。

```javascript
truffle(development)> i.toNumber()
```

自分が保管した番号が表示されます。

```javascript
1234
```

## まとめ

これで、ローカルAvalancheネットワークを起動し、truffleプロジェクトを作成、Solidityコントラクトを作成、コンパイル、デプロイ、やり取りするのに必要なツールが備わりました。

