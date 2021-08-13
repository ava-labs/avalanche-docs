# Truffleを使うC-Chain

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

[Truffle Suite](https://www.trufflesuite.com)は、EVM上で分散型アプリケーション \(dapps\)を起動するためのツールキットです。Truffle を使用すると、スマートコントラクトの書き込みとコンパイル、アーティファクトのビルド、移行の実行、およびデプロイされたコントラクトとのやり取りができます。このチュートリアルでは、TruffleをEVMのインスタンスであるAvalancheのC-Chainでどのように使用できるかを説明します。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

[Avalanche Node](../nodes-and-staking/run-avalanche-node.md)の実行を完了しました。[Avalancheの建築](../../../learn/platform-overview/)に精通しています。また、C-Chainアドレスに資金を入手するために[、AVAX Between X-Chain と C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) チュートリアルを使用して、クロスチェーンスワップを実行しました。

## 依存性

* [Avash](https://github.com/ava-labs/avash) は、ローカルAvalancheネットワークを実行するためのツールです。トリュフの[ガナッシュ](https://www.trufflesuite.com/ganache)に似ています。
* [NodeJS](https://nodejs.org/en) v8.9.4 以降。
* Truffle-truffle-`g-truffle-truffle-truffle-truffle-truffle-truffle-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff-truff`

## Avalancheネットワークを起動する

[Avash](https://github.com/ava-labs/avash) を使用すると、すぐに使える最大 15 個の AvalancheGo ノードでプライベート テスト ネットワーク デプロイメントをスピンアップできます。Avash は、lua スクリプトによる通常のタスクの自動化をサポートします。これにより、さまざまな構成に対して迅速なテストが可能になります。avash を初めて使用する際は、それを[インストールしてビルド](https://github.com/ava-labs/avash#quick-setup)する必要があります。

Avalancheネットワークを起動します:

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

5つのノードAvalancheネットワークがマシン上で実行されています。Avash を終了したい場合は、`exit` を実行しますが、今すぐそれをしないで、このターミナルタブを閉じないでください。

## Truffle ディレクトリを作成し、依存関係をインストールします。

`Truffle` ディレクトリを作成し、さらに依存関係をインストールできるように、新しいターミナルタブを開きます。

まず、`Truffle`の作業ディレクトリを作成するディレクトリに移動します。

```text
cd /path/to/directory
```

`Truffleという`名前の新しいディレクトリを作成して入力します。

```text
mkdir truffle; cd truffle
```

`npm` を使用して[、Web3](https://web3js.readthedocs.io) をインストールします。これは EVM に通じるライブラリです。

```text
npm install web3 -s
```

Web3を使ってHTTPプロバイダーを設定します。これは、Web3がEVMにどのように話すかです。最後に、boilerplace truffle プロジェクトを作成します。

```text
truffle init
```

## Truffle-config.jsを更新

`Truffle init` を実行したときに作成されたファイルの1つは、`truffle-config.js`です。`Truffle-config.js` に以下のように追加します。

```javascript
const Web3 = require('web3');
const protocol = "http";
const ip = "localhost";
const port = 9650;
module.exports = {
  networks: {
   development: {
     provider: function() {
      return new Web3.providers.HttpProvider(`${protocol}://${ip}:${port}/ext/bc/C/rpc`)
     },
     network_id: "*",
     gas: 3000000,
     gasPrice: 225000000000
   }
  }
};
```

APIコールを別のAvalancheGoノードに直接接続する場合は`、プロトコル、``ip`、`ポート`を変更できます。また、`GasPrice`と`gas`をAvalanche C-Chainの適切な値に設定することにも注意してください。

## Storage.solを追加

`contracts` ディレクトリーに `Storage.sol` という新しいファイルを追加し、次のコードブロックを追加します。

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

`Storage`はStore関数でブロックチェーンに数字を書き、`Reatribe`関数でブロックチェーンから番号を読み戻すこと`が`できるSolidityスマートコントラクトです。

## 新しいマイグレーションを追加

`2_deploy_contracts.js`という名前の`マイグレーションズ`・ディレクトリーに新しいファイルを作成し、次のコード・ブロックを追加します。これにより、`Storage` スマートコントラクトをブロックチェーンにデプロイします。

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Truffleとの契約をコンパイルする

`Storage.sol` に変更を加えるときはいつでも`、Truffle compile を`実行する必要があります。

```text
truffle compile
```

JPY-JPY-JPY

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## C-Chainでアカウントを作成、資金調達、およびロック解除

C-Chain にスマートコントラクトをデプロイする際、Truffle は、移行時に使用される`from`アドレスとして、C-Chain クライアントが提供する最初の利用可能なアカウントにデフォルトで使用します。

### アカウントを作成する

Truffleには非常に便利な[コンソール](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console)があり、ブロックチェーンや契約書とやり取りに使用できます。コンソールを開きます:

```text
truffle console --network development
```

次に、コンソールでアカウントを作成します。

```text
truffle(development)> let account = await web3.eth.personal.newAccount()
```

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

```text
undefined
```

アカウントを印刷します:

```text
truffle(development)> account
```

これはアカウントを表示します:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

### アカウントのロック解除:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account)
```

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

```text
true
```

### あなたのアカウントに資金を供給する

[AVAX Transfer AVAX Transfer AVAX Tween X-Chain と C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) チュートリアルで、新しく作成されたアカウントに資金を提供します。契約展開のコストをカバーするために、少なくとも`135422040` nAVAXをアカウントに送信する必要があります。

### スクリプトアカウント作成と資金調達

[Cinque McFarlane-Blake](https://github.com/cinquemb) はこのプロセスを自動化する便利なスクリプトを作成しました。[ここ](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js)で見つけることができます。このコマンドを使用してダウンロードします:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/make_accounts.js;
```

**注**: このチュートリアルでは、`truffle-config.js` を設定する際に手順に従った場合、port 9545 \(Truffle\ で使用されるデフォルト)ではなく、port 9650 を使用するために `make_accounts.js` スクリプトを変更する必要があります。

スクリプトを実行できます:

```text
truffle exec make_accounts.js --network development
```

Scriptはアカウントを作成し、C-Chainアドレスに資金を提供します。スクリプト内の`maxAccounts`と`amount`s変数を編集することで、AVAXの入金口数とAVAXの量をカスタマイズできます。

## マイグレーションを実行する

これで、マイグレーションを実行し、`Storage`コントラクトを展開することができます。

```text
truffle(development)> migrate --network development
```

JPY-JPY-JPY

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

C-Chainでアカウントを作成していない場合、このエラーが表示されます。

```text
Error: Expected parameter 'from' not passed to function.
```

アカウントに資金を供給していない場合、次のエラーが表示されます。

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

アカウントのロックを解除していない場合、次のエラーが表示されます:

```text
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## 契約書と交流する

これで`、`ストレージ契約がデプロイされました。ブロックチェーンに数字を書き、それを元に戻してみましょう。Truffle コンソールを再度開きます:

Deploy `Storage` Contractのインスタンスを取得します。

```javascript
truffle(development)> let instance = await Storage.deployed()
```

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

```text
undefined
```

### ブロックチェーンに数字を書く

`Storage`コントラクトのインスタンスがあれば、`store`メソッドを呼び出して、ブロックチェーンに書き込むように番号を渡します。

```javascript
truffle(development)> instance.store(1234)
```

このエラーが表示された場合:

```text
Error: Returned error: authentication needed: password or unlock
```

次に、これを再び実行します:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account[0])
```

JP-JP-

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

### Blockhainから数字を読み込む

ブロックチェーンから数字を読み込むには、`Storage` contract インスタンスの`revew-`modeを呼び出します。

```javascript
truffle(development)> let i = await instance.retrieve()
```

これが返されるはずです:

```javascript
undefined
```

`JavaScript`-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-`JavaScript`-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`.toNumber`メソッドを呼び出して値を確認します。

```javascript
truffle(development)> i.toNumber()
```

あなたが保存した番号が表示されるはずです。

```javascript
1234
```

## JavaScript-JP-JP-

これで、ローカルAvalancheネットワークを起動し、Truffleプロジェクトを作成し、Solidity契約の作成、コンパイル、デプロイ、およびやり取りを行うために必要なツールが用意されています。

