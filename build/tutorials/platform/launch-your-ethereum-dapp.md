# イーサリアムの分散型アプリケーションを起動する

## 概要

このドキュメントでは、Avalanche上で既存の自律分散型アプリケーションを起動する方法を示します。このドキュメントでは、Avalancheプラットフォームの基本とその機能について理解し、ネットワークとの接続、Avalanche上で開発、デプロイのための既存ツールや環境の使い方、そして、Avalanche上で分散型アプリを実行する際に心に留めておくべきいくつかの共通の落とし穴について説明します。

## プラットフォームの基本

Avalancheは、[ネットワークの中のネットワーク](../../../learn/platform-overview/)です。つまり、Avalancheは、一つの同じタイプのブロックを実行しているシングルチェーンではありません。Avalancheには、複数のサブネットが含まれており、それぞれそれぞれがより多くの異なるチェーンの一つを実行しています。しかし、Ethereum自律分散型アプリケーションを安く、高速なネットワークで、即時ファイナリティで実行することについて今私たちが関心を持つ必要はありません。上のリンクを使用して、より詳しい内容を理解していただくことも可能です。しかし、今知っておくべきことは、Avalanche Primary Network上で実行されているチェーンの1つが、 C-Chain（コントラクトチェーン）であるということです。

 C-Chainは、ネットワークとコンセンサス部分をAvalanche同等に置換える[coreth](https://github.com/ava-labs/coreth)と呼ばれる[go-ethereum](https://geth.ethereum.org/docs/rpc/server)のフォークを実行します。残っているのは、Solidityスマートコントラクトを実行し、チェーン上のデータ構造とブロックを管理するEthereum VMです。その結果、イーサリアムのすべてのSolidityスマートコントラクトを実行できるブロックチェーンを手に入れることができますが、しかし[Avalancheの革新的なコンセンサス](../../../learn/platform-overview/avalanche-consensus.md)が可能にする、はるかに大きなトランザクション帯域幅と即時のファイナリティを備えています。

Corethは、Avalancheネットワークを実行するために使用されるクライアントノードアプリケーションである[AvalancheGo](https://github.com/ava-labs/avalancheg)へのプラグインとしてロードされます。

自律分散型アプリケーションに関する限り、Ethereum上でも同様のものが実行されています、ただ、より速く、より安いのです。どうするか見てみましょう。

## Avalanche  C-Chainへのアクセス

 C-Chainは、go-ethereumと[同じAPI](../../avalanchego-apis/contract-chain-c-chain-api.md)に対応しています。そのため、Ethereum上で提供されているすべての使い慣れたAPIを、このプラットフォームとのやり取りに使用できます。

 C-Chainで作業するには複数の方法があります。

### MetaMaskを利用して

カスタムネットワークを定義することにより、MetaMaskを利用して C-Chainにアクセスできます。MetaMaskに移動し、ログインし、ネットワークのドロップダウンをクリックし、「Custom RPC」を選択します。Avalancheのデータは以下の通りです。

#### **Avalanche Mainnet の設定:**

* **ネットワーク名**: Avalanche Mainnet  C-Chain
* **新しいRPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Testnetの設定:**

* **ネットワーク名**: Avalanche FUJI  C-Chain
* **新しいRPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

アプリケーションのウェブインターフェースでは、[Avalancheをプログラムで追加](../smart-contracts/add-avalanche-to-metamask-programmatically.md)できます。そのため、ユーザーはネットワークデータを手動で入力する必要はありません。動作中の追加したカスタムネットワークフローを確認するには、[Pangolin DEX](https://app.pangolin.exchange/)をご覧ください。

### 公開APIノードの使用

MetaMaskを通じてネットワーク操作をプロキシする代わりに、ロードバランサの背後で多くのAvalancheGoノードで構成されている公開APIを使用することもできます。

 C-Chain APIのエンドポイントは、mainnetの[場合はhttps://api.avax.network/ext/bc/C/](https://api.avax.network/ext/bc/C/rpc)rpc、テストネットの[場合はhttps://api.avax-test.network/ext/bc/C/](https://api.avax-test.network/ext/bc/C/rpc)rpcです。

詳細については、ドキュメントを参照してください。

{% page-ref page="../../tools/public-api.md" %}

### 自身のノードの実行

自身の分散型アプリケーションを自分でコントロールできない集中型サービスに依存したくない場合、自身のノードを実行し、その方法でネットワークにアクセスすることができます。自身のノードを実行することで、公開APIの混雑とレート制限にかかわる潜在的な問題を回避することもできます。

開発目的の、AvalancheGoのダウンロード、構築、インストールのチュートリアルが[こちら](../nodes-and-staking/run-avalanche-node.md)にあります。Linuxマシン上でプロダクションノードを実行しようとする場合、素早く、簡単に、`systemd`サービスとしてのノードをインストールするインストーラスクリプトの使用法のチュートリアルが[こちら](../nodes-and-staking/set-up-node-with-installer.md)にあります。スクリプトは、ノードのアップグレードも行います。Dockerコンテナでノードを実行したい場合、さまざまなDocker設定のために、AvalancheGoレポに[ビルドスクリプト](https://github.com/ava-labs/avalanchego/tree/master/scripts)があります。

### ローカルテストネットワークの実行

自身の自律分散型アプリケーションをテストするためにプライベートテストネットワークが必要な場合、[Avash](https://github.com/ava-labs/avash)が、ローカルなAvalancheネットワークを起動するための、Ethereum上のGanacheと同様の、シェルクライアントです。

Avashは、ローカルネットワークのオーケストレーションのためのスクリプト言語としてLuaを使用します。

詳細については、ドキュメントを参照してください。

{% page-ref page="../../tools/avash.md" %}

## コントラクトの開発とデプロイ

Ethereumと互換性のあるブロックチェーンであるため、すべての通常のEthereum開発者ツールと環境が、Avalancheの C-Chainの自律分散型アプリケーションを開発、デプロイするのにも使用できます。

### Remix

Remixを使用してAvalanche上にスマートコントラクトをデプロイするためのチュートリアルがあります。これは、AvalancheネットワークにアクセスするためMetaMaskに依存しています。

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### Truffle

Avalanche上で、スマートコントラクトをテスト、デプロイするのに、Truffleを使用することもできます。このチュートリアルでその方法を確認できます。

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

###
Hardhat

Hardhatは、Solidarityスマートコントラクトのための最新の開発およびテスト環境であり、我々の開発者が最も多く使用している環境です。その卓越したテストサポートから、Avalancheでの開発の推奨環境です。

より詳細な情報については、{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}をご覧ください。

## Avalanche Explorer

スマートコントラクト開発環境の重要な部分は、エクスプローラです。これは、ブロックチェーンのデータをインデックスし、保存します。Mainnet  C-Chainエクスプローラ[は、https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)に、テストネットエクスプローラ[は、https://cchain.explorer.avax-test.network ](https://cchain.explorer.avax-test.network/)にあります。ウェブインターフェースのほかにも、標準的な[Ethereum JSON RPC API](https://eth.wiki/json-rpc/API)も公開しています。

## Avalanche Faucet

開発目的でテストトークンが必要になります。Avalancheには、テストトークンを選択したアドレスにドリップする[Faucet](https://faucet.avax-test.network/)があります。 C-Chainアドレスをそこにペーストします。

必要に応じて、ローカルにfaucetを実行することも可能ですが、[レポジトリ](https://github.com/ava-labs/avalanche-faucet)から構築することも可能です。

## コントラクト検証

スマートコントラクト検証は、ソースコードを公開することで、ユーザーがスマートコントラクトとやり取りをするための透明性を確保します。このことにより、誰もが、行っていると言われていることが本当に行われているかを確認することができます。[ C-Chainエクスプローラ](https://cchain.explorer.avax.network/)を使用して、スマートコントラクトを検証できます。手順は簡単です。

* エクスプローラ上で公開されたコントラクトアドレスに移動します。
* `code`タブ上で、`verify & publish`を選択します。
* フラット化されたソースコードをコピーペーストし、公開されたコントラクト上と同様のすべてのビルドパラメータを正確に入力します。
* `verify & publish`をクリックします

成功すると、`code`タブに緑のチェックマークがつき、ユーザーがあなたのコントラクトの内容を検証できるようになります。このことは、ユーザーがコントラクトを信用できることを示す強力なプラスのシグナルです。そしてすべてのプロダクションコントラクトで強く推奨されています。

## コントラクトセキュリティチェック

自律分散型アプリケーションの性質上、アプリケーションが一旦デプロイされるとバグを修正するのは非常に困難です。このため、アプリケーションが正しくに安全に実行されることをデプロイ前に確実にしておくことが大変重要になります。コントラクトセキュリティレビューは、専門の会社とサービスにより行われます。このサービスは非常に高くつく場合があり、単体の開発者やスタートアップには手が届かない場合もあります。しかし、無料で使用できる自動化されたサービスやプログラムもあります。

次は最も人気のあるものです。

* [Slither](https://github.com/crytic/slither)、チュートリアルは[こちら](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)です。
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

専門のコントラクトセキュリティレビューを使用することができない場合、少なくともこれらのうちの一つを使用することを強く推奨します。安全な開発作業のより総合的な概観は、[ここ](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md)で確認できます。

## 問題点と注意すべき点

Avalancheプラットフォームの C-ChainはEVMと互換性がありますが、同じものではありません。知っておくべきいくつかの異なる点があります。知らなければ、あなたの自律分散型アプリケーションの動きに小さなバグや不統一が生じる可能性があります。

知っておくべき主な異なる点は、次の通りです。

### 測定時間

時間のためにブロックハイトプログレスをプロキシとして使用するのは、Ethereum上では慣習になっています。Avalanche上ではそれは行うべきではありません。Avalanche上のチェーンは、静止状態です。つまり、アクティビティが存在しない場合、ブロックは生成されません。逆のことも言えます。大量のアクティビティがある場合、ブロックは非常に速く生成されます。そのため、生成されるブロックの数によって時間の経過を測定するべきではありません。結果が正確にならず、あなたのコントラクトが第三者によって操作される可能性があります。

ブロック率の代わりに、生成されたブロックのタイムスタンプ属性を読むことによってのみ時間を測定すべきです。タイムスタンプは一本調子で増加し、実際の時間から30秒以内であることが保証されています。

### ファイナリティ

Ethereumでは、ブロックチェーンは再編成可能であり、ブロックは孤立することがあるため、ブロックが最初から数ブロック先にたどり着くまでは、承認されたという事実を信頼することはできません。（通常6ブロック先まで行って初めて安全とみなされます。）Avalancheでは、こういったことは起こりません。1～2秒以内に、ブロックは受け入れらるか拒否されるかします。そして、いったんブロックが受け入れられると、それが最終結果であり、置き換えられたり、削除されたり、変更されたりすることはありません。つまり、Avalanche上では、「確認回数」の概念は使われません。ブロックが承認され、エクスプローラ上で利用に可能になると、それが最終結果です。

### ガス価格

Avalanche上のガスは使い果されます。バリデーターは、自身ではガスを保持しない（バリデーターはステーキングにより報酬を受け取ります）ので、最初に高価格でのトランザクションが含まれることになる、「ガス戦争」の原動力は存在しないのです。したがって、あなたのトランザクションに高いガス代をかける必要はないのです。ガスを無駄に使い果すだけです。

###  C-Chainの構成

 C-Chainを含む個々のチェーンは、環境設定ファイルで指定できる独自の構成オプションを持っています。分散アプリケーションを開発する際、デフォルト以外の C-Chainの構成を使用したいと思っているかもしれません。チェーンの構成の詳細については、[こちら](../../references/command-line-interface.md#chain-configs)を参照してください。

 C-Chain環境設定ファイル`$HOME/.avalanchego/configs/chains/C/config.json`は、にあります。AvalancheGoに指示して、`--chain-config-dir`オプションを使って C-Chain環境設定ファイルをどこか他の場所で探すようにすることもできます。 C-Chainの完全な構成オプションは[ここ](../../references/command-line-interface.md#coreth-config)から確認できます。 C-Chain環境設定ファイルの例:

```javascript
{
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
```

{% hint style="warning" %}Ethereumの[アーカイブノード](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node)機能が必要な場合は、AvalancheGo v1.4.10以降ではデフォルトで有効になっている C-Chainプルーニングを無効にする必要があります。プルーニングを無効にするには、`"pruning-enabled": false`を C-Chain環境設定ファイル{% endhint %}に含めます。

### 公開APIで`eth_newFilter`と関連コールを使用する

公開APIサーバーで[`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter)APIメソッドを使用している場合、公開APIは実際にはロードバランサーの背後のいくつかのノードであるため、期待通りには動作しない可能性があります。`eth_newFilter`呼び出しを行った場合、以降の[`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges)への呼び出しが最初の呼び出しと同じノードで終了しない場合があります。その場合、結果は未定義になります。

ログフィルター機能が必要な場合は、websocket接続を使用してください。これにより確実にクライアントがロードバランサー背後の同じノードといつも話すことになります。あるいは、[`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)を使用するか、自分のノードを実行して、それにAPI呼び出しを行うこともできます。

## サポート

このチュートリアルを使って、Avalanche上で分散型アプリをデプロイし、テストする方法を迅速に学ぶことができます。質問や問題など、お問い合わせについては、公開[Discord](https://chat.avalabs.org/)サーバーでコンタクトしていただけます。ご連絡お待ちしております。また、Avalanche上で何を構築するのかについてもお知らせいただけると幸いです。

