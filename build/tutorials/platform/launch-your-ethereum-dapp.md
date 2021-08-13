# Ethereum Dappを起動する

## JavaScript-JP-JP-

このドキュメントの目的は、Avalancheで既存のdappを起動するのに役立つことです。Avalanche Platformの基本的な手法とその動作方法、ネットワークへの接続方法、Avalancheでの開発と展開における既存のツールや環境の使用方法、さらにはAvalancheでdappを実行する際に考慮すべきいくつかの一般的な落とし穴が含まれています。

## プラットフォーム基礎

Avalancheはネットワークネットワークです[。](../../../learn/platform-overview/)これは、単一のブロックのユニフォーム型を実行する単一のチェーンではありません。複数のサブネットが含まれており、それぞれの複数の異種チェーンが動作します。しかし、Ethereum dappをインスタントファイナリティで低価格で高速なネットワークで実行するには、今すぐそれに関心を示す必要はありません。上記のリンクを使えば、あなたが望むならば、より多くのことを知ることができますが、今知っている必要があるのは、Avalanche Primary Networkで動作するチェーンがC-Chain \(contract chain\)であるということです。

C-Chainは、ネットワークとコンセンサス部分をAvalanche同値に置き換えた[coreth](https://github.com/ava-labs/coreth)と呼ばれる[go-ethereum](https://geth.ethereum.org/docs/rpc/server)のフォークを実行します。残り点はEthereum VMです。これはSolidityスマートコントラクトを実行し、チェーン上のデータ構造とブロックを管理します。その結果、EthereumからSolidityスマートコントラクトをすべて実行できるブロックチェーンが得られますが、[Avalancheの革新的なコンセンサス](../../../learn/platform-overview/avalanche-consensus.md)が可能になるトランザクション帯域幅と即時の最終的には非常に優れた機能を備えています。

CorethはAvalancheネットワークを実行するために使用されるクライアントノードアプリケーション[AvalancheGo](https://github.com/ava-labs/avalancheg)にプラグインとしてロードされます。

あなたのdappに関しては、それはEthereumと同じ動作をします。- どうやって見てみましょう

## Avalanche C-Chainへのアクセス

C-Chainはgo-ethereumと[同じ](../../avalanchego-apis/contract-chain-c-chain-api.md)APIを公開しているため、Ethereumで利用可能なすべての馴染みのあるAPIをプラットフォームとのやり取りに使用できます。

C-Chainでは複数の方法があります。

### MetaMaskを通じて

MetaMaskからC-Chainにアクセスできます。MetaMaskに移動し、ログインし、ネットワークドロップダウンをクリックし、[Custom RPC]を選択します。Avalancheのデータは以下の通りです。

#### **Avalanche Mainnet 設定:**

* **ネットワーク名**: Avalanche Mainnet C-Chain
* **新しいRPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **シンボル：**`AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Testnetの設定:**

* **ネットワーク名：**Avalanche FUJI C-C-Chain
* **新しいRPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **シンボル：**`AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.netc](https://cchain.explorer.avax-test.network/)

アプリケーションのWebインターフェイスで、Avalancheを[プログラム的に追加](../smart-contracts/add-avalanche-to-metamask-programmatically.md)することで、ユーザーはネットワーク・データを手動で入力する必要がありません。カスタムネットワークフローの実現を確認するには、[Pangolin DEX](https://app.pangolin.exchange/)をチェックしてください。

### Public API ノードの使用

MetaMaskを通じてネットワーク操作をプロキシする代わりに、Public APIを使用することができます。これは、ロードバランサーの後ろにあるAvalancheGoノードで構成されています。

C-Chain API エンドポイントは、メインネットの場合は[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)、testnetの場合は[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)です。

詳細については、[ドキュメント](../../tools/public-api.md)を参照してください。

### 独自のノードを実行する

Dapp が制御できない集中型サービスに依存したくない場合は、独自のノードを実行してネットワークにアクセスできます。また、独自のノードを実行することで、パブリックAPIの混雑やレート制限の問題が発生する可能性があります。

開発目的のために、[ここで](../nodes-and-staking/run-avalanche-node.md)はAvalancheGoのダウンロード、ビルド、およびインストールのためのチュートリアルです。Linux マシンで実動ノードを実行する場合は、[インストーラースクリプト](../nodes-and-staking/set-up-node-with-installer.md)を使用して`、Systemd`サービスとしてノードを簡単にインストールする方法を説明します。Script はノードのアップグレードも処理します。Dockerコンテナでノードを実行したい場合、AvalancheGo repo にさまざまな Docker コンフィギュレーション用の[ビルドスクリプト](https://github.com/ava-labs/avalanchego/tree/master/scripts)があります。

### JavaScript-JP-JP-

Dappをテストするためにプライベートテストネットワークが必要な場合、[Avash](https://github.com/ava-labs/avash)はEthereumでGanacheと同様にローカルAvalancheネットワークを起動するためのシェルクライアントです。

Avash は Lua をローカルネットワークをオーケストレーションするためのスクリプト言語として使用しています。Avash のチュートリアルは[こちらから](../../tools/avash.md)ご覧いただけます。

## 契約の開発と展開

Ethereum互換のブロックチェーンであるため、通常のEthereum開発ツールや環境はすべて、AvalancheのC-Chain用のdappsを開発および展開するために使用できます。

### JRリミックス

[Avalanche](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)でスマートコントラクトを展開するためのチュートリアルです。MetaMask を使用し、Avalancheネットワークにアクセスできます。

### トリュフ

Truffle を使用して、Avalanche 上でスマートコントラクトをテストおよびデプロイすることもできます。[JavaScript](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)-JP-JP-

### Hardhat-JP

HardhatはSolidityスマートコントラクトの最新の開発およびテスト環境であり、当社の開発者が最も活用しているものです。その優れたテストサポートにより、Avalancheの開発に推奨される方法です。

[ここで](https://github.com/ava-labs/avalanche-smart-contract-quickstart)は、開発者が新しいプロジェクトを始めるために使用するquickstartリポジトリです。Avalanche 用に既に設定されているため、追加のセットアップは必要ありません。

## Avalanche Explorer-JP

スマートコントラクト開発環境の重要な部分は、ブロックチェーンデータをインデックスし、サービスするエクスプローラです。Mainnet C-Chain Explorerは、[https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)[](https://cchain.explorer.avax-test.network/)およびtestnet Explorerで利用できます。Webインターフェース以外にも、標準的な[Ethereum JSON RPC API](https://eth.wiki/json-rpc/API)も公開されています。

## Avalanche蛇口

開発目的では、テストトークンが必要です。Avalancheには[Faucet](https://faucet.avax-test.network/)があり、テストトークンを好きなアドレスにドリップします。C-Chainアドレスをそこに貼り付けます。

必要に応じて、faucet をローカルに実行することもできますが、[リポジトリ](https://github.com/ava-labs/avalanche-faucet)からビルドすることもできます。

## 契約の確認

スマートコントラクト検証は、ソースコードを公開することにより、スマートコントラクトとやり取りするユーザーが透明性を提供し、誰もがそれが何をしていることを証明することができます。[C-Chain](https://cchain.explorer.avax.network/) エクスプローラーを使用して、スマートコントラクトを検証できます。手順は簡単です:

* エクスプローラーで公開された契約アドレスに移動します。
* `Code` タブで、`検証と公開`を選択します。
* フラット化されたソースコードをコピー&ペーストし、すべてのビルドパラメーターを公開されたコントラクトにまったく入力します。
* [`verify & publish`]をクリックします。

成功すると、`コードタブ`に緑色のチェックマークが付いていきます。そして、ユーザーは契約内容を確認できます。これは、ユーザーが契約を信頼できるという強力なプラスシグナルであり、すべての生産契約に強く推奨されています。

## 契約セキュリティチェック

分散型アプリケーションの性質上、アプリケーションがデプロイされるとバグを修正することは非常に難しいです。そのため、アプリケーションが正しく安全に動作していることを確認して、デプロイメントの前に非常に重要です。契約セキュリティレビューは専門企業やサービスによって行われます。彼らは非常に高価な可能性があります。これは、単一の開発者やスタートアップにとっては手の届かないかもしれません。しかし、自動化されたサービスやプログラムもあります。

最も人気のあるものは次のとおりです。

* [Slither](https://github.com/crytic/slither), ここに[チュートリアル](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)です
* [MythX-JP](https://mythx.io/)
* [Mythril-JP](https://github.com/ConsenSys/mythril)

プロの契約セキュリティレビューができない場合は、少なくとも1つ使用することをお勧めします。より包括的な開発プラクティスについての詳細な検討は[、こちら](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md)をご覧ください。

## Gotchasと見るべきこと

Avalanche PlatformのC-ChainはEVM-compatibleですが、同一ではありません。Dappsの動作方法に微妙なバグや矛盾を生成する可能性があります。

ここでは、あなたが気づくべき主な違いがあります。

### 測定時間

Ethereumでは、ブロック高さの進捗状況を時間のプロキシとして使用することが慣習的です。あなたはアバランチでそれをするべきではありません。Avalancheの鎖は静止状態であり、活動がなければブロックが生成されないことを意味します。反対側も真実です。 もし多いアクティビティがあれば、ブロックは非常に速く生成されます。そのため、時間の経過を、生産するブロック数で測定するべきではありません。結果は正確ではなく、お客様の契約は第三者によって操作される可能性があります。

ブロックレートではなく、生成されたブロックのtimestamp属性を読み取るだけで時間を測定する必要があります。タイムスタンプは単調に増加し、リアルタイムから30秒以内に達することが保証されています。

### JP-JP-

Ethereumではブロックチェーンが再構成され、ブロックは孤立することができますので、ブロックがチップから数ブロックの先に \(通常、ブロック6の深い場所が安全であると推定されています) ブロックはブロックを許可されているという事実に依存することはできません。Avalancheではそうではありません。ブロックは、1-2 秒以内に受け入れられ、または拒否されます。そして、ブロックが受け入れられたら、それはfinalであり、置き換え、削除、または変更することはできません。したがって、Avalancheの「確認数」の概念は使われていません。ブロックがエクスプローラで利用可能になるとすぐに、それは最終的です。

### ガス価格

JPG-JPG-バリデータはガスを自分自身で保ちません \(彼らはstaking\に報酬を与える)。 したがって、高価なトランザクションが最初に含まれている「ガス戦争」のダイナミクスは存在しません。したがって、あなたの取引にガス価格を高める必要はありません。ガス燃焼だけだ

### Coreth 構成

coreth は、バリデーターとして使用されるノードが公に実行されるのに最適な方法で構成されています。DPP や dapps では、デフォルト値を設定して使用する際に適切な設定を変更することもできます。これはノードのコマンドラインオプションを通じて行われます。coreth のコマンドラインオプションは、デフォルト値とともに[ここに](../../references/command-line-interface.md#coreth-config)表示されます。

コマンドラインでオプションを指定することもできますし、config ファイルを使用することもできます。これは、多くのカスタムオプションが設定されているときに作業が簡単です。`—config-file=config.json` オプションを使用して、config.`json` ファイルで完全な構成を提供します。

```javascript
{
  "coreth-config": {
    "snowman-api-enabled": false,
    "coreth-admin-api-enabled": false,
    "net-api-enabled": true,
    "eth-api-enabled": true,
    "personal-api-enabled": false,
    "tx-pool-api-enabled": true,
    "debug-api-enabled": true,
    "web3-api-enabled": true,
    "local-txs-enabled": true
  }
}
```

### `eth_newFilter` と関連する呼び出しの使用とPublic API

public API サーバーで[`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter) API メソッドを使用している場合、public API は実際にはロードバランサーの後ろにいくつかのノードであるため、期待通りに動作しない可能性があります。`eth_newFilter` を呼び出すと、その後の [`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges) への呼び出しは、最初の呼び出しと同じノードで終わらないことがあり、未定義の結果が出てきます。

ログフィルタリング機能が必要な場合は、websocket コネクションを使用してください。これにより、クライアントが常にロードバランサーの背後にある同じノードと話していることを保証します。あるいは、[`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs) を使用するか、独自のノードを実行して API 呼び出しを行うこともできます。

## JP-JP-

このチュートリアルでは、Avalancheのスピードアップ、Dappsのデプロイ、テストを迅速に実現できるはずです。質問、問題、またはちょうど私たちとチャットしたい場合は、当社のパブリック[Discord](https://chat.avalabs.org/)サーバーで私たちに連絡することができます。私たちはあなたからお聞きして、あなたがアバランチで何を建てているのかを見つけたいです!

