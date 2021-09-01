# イーサリアムのDappを立ち上げる

## 概要

このドキュメントの目的は、Avalanche上で既存のdappを立ち上げる際に手助けすることです。Avalancheプラットフォームの基本と動作方法、ネットワークに接続する方法、Avalanche上での開発と展開に際して、既存のツールや環境を使用する方法、そしてAvalanche上で使用する方法を示すように設計された一連のリソースが含まれています。Avalanche上でdappを実行する際に考慮すべき一般的な落とし穴が含まれています。

## プラットフォーム基礎

Avalancheは[、](../../../learn/platform-overview/)ネットワークのネットワークです。つまり、単一でユニフォームタイプのブロックを実行する単一チェーンではないことを意味します。多数のサブネットが含まれており、それぞれがより異質なチェーンで実行されます。しかし、即時ファイナリティで低額で高速なネットワーク上でイーサリアムの分散アプリを実行するため、今すぐそのことに気にする必要はありません。上のリンクを使用することにより、より詳しく知ることができます。しかし、Avalancheプライマリネットワーク上で実行されるチェーンの1つが、C-Chain（コントラクトチェーン）であるということです。

C-Chainは、[coreth](https://github.com/ava-labs/coreth)と呼ばれる[go-ethereum](https://geth.ethereum.org/docs/rpc/server)のフォークを実行します。このフォークでは、ネットワークとコンセンサス部分がAvalanche同値に置き換えられます。残されたものは、Solidityスマートコントラクトを実行し、チェーン上のデータ構造やブロックを管理するイーサリアムVMです。その結果、[Avalancheの革命的なコンセンサス](../../../learn/platform-overview/avalanche-consensus.md)により可能になる、はるかに大きなトランザクション帯域幅と瞬時ファイナリティで、イーサリアムからSolidityスマートコントラクトを実行できるブロックチェーンが得られます。

Corethは、Avalancheネットワークを実行するために使用されるクライアントノードアプリケーションとして[AvalancheGo](https://github.com/ava-labs/avalancheg)にロードされます。

dappに関する限り、イーサリアムと同じイーサリアムで実行されることになります。どのように見つかろう。

## Avalanche C-Chainにアクセスする

C-Chainは、go-ethereumと[同じ](../../avalanchego-apis/contract-chain-c-chain-api.md)APIを公開するので、イーサリアム上で利用可能なすべての慣れたAPIを使用することができます。

C-Chainで作業する方法はいくつかあります。

### MetaMask

MetaMaskを通じてC-Chainにアクセスすることができます。MetaMaskに移動し、ログインし、ネットワークドロップダウンをクリックし、「カスタムRPC」を選択します。Avalancheのデータは以下のようになります。

#### **Avalancheメインネット設定：**

* **ネットワーク名**：AvalancheメインネットC-Chain
* **新しいRPC URL**：[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**：`43114`
* **シンボル**：`AVAX`
* **エクスプローラ**：[https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJIテストネット設定：**

* **ネットワーク名**：Avalanche FUJI C-Chain
* **新しいRPC URL**：[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**：`43113`
* **シンボル**：`AVAX`
* **エクスプローラ**：[https://cchain.explorer.avax-test.net](https://cchain.explorer.avax-test.network/)

アプリケーションのウェブインターフェースで、Avalancheを[プログラムで追加](../smart-contracts/add-avalanche-to-metamask-programmatically.md)できるため、ユーザーは手動でネットワークデータを入力する必要はありません。カスタムネットワークフローが実行されていることを確認するには、[Pangolin DEX](https://app.pangolin.exchange/)をチェックしてください。

### パブリックAPIノードを使用する

MetaMaskを通じてネットワーク操作をプロキシする代わりに、ロードバランサの背後にいる数数のAvalancheGoノードで構成されるパブリックAPIを使用することができます。

C-Chain APIエンドポイントは、メインネットの場合は[https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)、テストネットの場合は[https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)です。

より詳しい情報については、ドキュメントを参照してください：

{% page-ref page="../../tools/public-api.md" %}

### 自身のノードを実行する

dappがコントロールできない集中サービスに依存したくない場合、自身のノードを実行し、そのようにネットワークにアクセスすることができます。自身のノードを実行することも、パブリックAPIの混雑とレート制限に関する潜在的な問題を回避します。

開発目的で、[ここに](../nodes-and-staking/run-avalanche-node.md)AvalancheGoのダウンロード、ビルド、インストールのためのチュートリアルです。`systemd`Linuxマシン上で生産ノードを実行する場合、[ここに](../nodes-and-staking/set-up-node-with-installer.md)示すチュートリアルです。スクリプトは、ノードアップグレードも対応します。ドッカーコンテナでノードを実行したい場合、AvalancheGoレポに様々なDocker設定用の[ビルドスクリプト](https://github.com/ava-labs/avalanchego/tree/master/scripts)があります。

### ローカルテストネットワークの実行

あなたのダップをテストするプライベートテストネットワークが必要な場合、[Avash](https://github.com/ava-labs/avash)は、イーサリアム上のGanacheと同様にローカルAvalancheネットワークを立ち上げるシェルクライアントです。

Avashは、ローカルネットワークをオーケストレーションするためのスクリプト言語としてLuaを使用します。

より詳しい情報については、ドキュメントを参照してください：

{% page-ref page="../../tools/avash.md" %}

## コントラクトを開発と展開する

イーサリアムと互換性のあるブロックチェーンであるため、AvalancheのC-Chainのためのdappsを開発、展開するために、通常のイーサリアムの開発ツールや環境すべてを使用することができます。

### Remix

Remixを使用してAvalanche上にスマートコントラクトを展開するためのチュートリアルがあります。AvalancheネットワークにアクセスするためのMetaMaskに頼まれています。

{% page-ref page="../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md" %}

### Truffle

Truffleを使用してAvalanche上にスマートコントラクトをテスト、展開することもできます。このチュートリアルの方法を確認する：

{% page-ref page="../smart-contracts/using-truffle-with-the-avalanche-c-chain.md" %}

### Hardhat

Hardhatは、Solidityスマートコントラクトのための最新の開発とテスト環境であり、我々の開発者が最も使用するものです。優れたテストサポートにより、Avalancheのための開発推奨方法です。

より詳細な情報については、次のことを参照してください：{% page-ref page="../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md" %}

## Avalanche エクスプローラ

スマートコントラクト開発環境の重要な部分はエクスプローラです。このエクスプローラは、ブロックチェーンデータにインデックスし、サービスを提供します。メインネットCチェーンエクスプローラは、[https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)および、[https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)で利用可能になります。ウェブインターフェース以外に、標準的な[イーサリアムJSON RPC API](https://eth.wiki/json-rpc/API)を公開します。

## Avalanche Faucet

開発目的でテストトークンが必要になります。Avalancheは、テストトークンを、あなたの選択したアドレスにドリップする[Fauchet](https://faucet.avax-test.network/)を持っています。C-Chainアドレスをそこに貼り付けます。

必要に応じて、ローカルでフォーセットを実行することもできますが、リポジトリから構築する[ことができます。](https://github.com/ava-labs/avalanche-faucet)

## コントラクト検証

スマートコントラクトを検証することで、ソースコードを公開することで、スマートコントラクトとやり取りするユーザーが透明性を提供し、誰もがそれが本当に行っていることを証明できるようにします。[C-Chain](https://cchain.explorer.avax.network/)エクスプローラを使用してスマートコントラクトを確認することができます。手順は、シンプルです。

* エクスプローラ上で公開されたコントラクトアドレスに移動する
* `code`タブ上で選択`verify & publish`
* フラット化されたソースコードをコピーして貼り付け、公開されたコントラクトに記載されているすべてのビルドパラメータをまさに入力してください。
* クリック`verify & publish`

成功すると、`code`タブに緑のチェックマークが表示され、ユーザーはコントラクトの内容を確認できるようになります。これは、あなたのコントラクトを信頼できるという強力なシグナルであり、すべての生産コントラクトに強く推奨されます。

## コントラクトセキュリティチェック

分散型アプリケーションの性質により、アプリケーションが展開されるとバグを修正するのは非常に難しいことです。そのため、デプロイメント前にアプリが正しく安全に動作しているようにしてください。コントラクトセキュリティレビューは、専門の企業とサービスによって行われます。非常に高価な可能性があり、単一の開発者やスタートアップには手がかりがなくなります。しかし、自由に使用できる自動化サービスやプログラムもあります。

最も人気のあるのは、

* [Slither](https://github.com/crytic/slither)、ここに[チュートリアル](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)
* [MythX](https://mythx.io/)
* [Mythril](https://github.com/ConsenSys/mythril)

プロフェッショナルなコントラクトセキュリティレビューが不可能である場合、少なくとも1つ使用することを強くお勧めします。安全な開発慣行について、より包括的な見解は[ここから](https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md)入手できます。

## ゴットチャともの

AvalancheプラットフォームのC-Chainは、EVMと互換性がありますが、同一ではありません。dappsの行動に際して、微妙なバグや矛盾が発生する可能性があることに注意する必要があるいくつかの違いがあります。

ここに注意すべき主な違いは以下のとおりです。

### 測定時間

ブロック高さプログレスを、時間の間にプロキシとして使用するのはイーサリアム上に慣習的なことです。Avalanche上で行うべきではありません。Avalanche上のチェーンは、静止です。つまり、アクティビティが存在しない場合、ブロックが生成されることはありません。反対も真実です。もし大量のアクティビティが存在する場合、ブロックは非常に高速に生成されます。そのため、生成されたブロック数で時間の経過を測定することはできません。結果は正確ではなく、あなたのコントラクトは第三者によって操作される可能性があります。

ブロックレート代わりに、生成されたブロックのタイムスタンプ属性を読むだけで時間を測定する必要があります。タイムスタンプは、単一的に増加し、リアルタイムから30秒以内に存在することが保証されます。

### ファイナリティ

イーサリアム上で、ブロックチェーンは再編化が可能で、ブロック切り離が可能になります。そのため、先端から数ブロックが存在するまで、ブロックが受け付けられたという事実に頼ることはできません。（通常、6つの場所が深いものと推定されます）。Avalanche上ではそうではありません。ブロックは、1秒または2秒以内に承認あるいは拒否されます。そして、ブロックが承認された後、ファイナイナルであり、置き換え、削除、変更することはできません。つまり、Avalanche上の「確認数」というコンセプトは使用されません。ブロックがエクスプローラで受け入れられ、利用可能になったとすぐに、最終的です。

### ガス価格

Avalanche上のガスが焼き払われます。バリデータは、（ステーキングで報酬を受け取る）自分自身でガスを保持しないことになります。そのため、高額の取引がまず含まれている「ガスウォー」のダイナミクスは存在しません。したがって、あなたのトランザクションにより高いガス価格を置く必要はありません。ガスを燃やすことは無駄で終わることになります。

### C-Chain構成

C-Chainを含む個々のチェーンには、構成ファイルで指定できる独自の構成オプションがあります。dappsを開発する際に、デフォルト以外にC-Chain設定を使用することができます。チェーン構成の詳細については、ここを参照[してください。](../../references/command-line-interface.md#chain-configs)

`$HOME/.avalanchego/configs/chains/C/config.json`C-Chain設定ファイルAvalancheGoに、オプションでC-Chain設定ファイルについて他の場所を探すようにすることもできます`--chain-config-dir`。C-Chainのための完全な設定オプションを[ここから](../../references/command-line-interface.md#coreth-config)確認することができます。C-Chain設定ファイルの例：

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

{% hint style="warning" %}[イーサリアムアーカイブノード](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node)機能が必要な場合、AvalancheGo v1.4.10以降デフォルトで有効にされているCチェーンプルーニングを無効にする必要があります。プルンを無効にするには、C-Chain設定ファイル`"pruning-enabled": false`にインクルードしてください。{% endhint %}

### パブリックAPIで使用`eth_newFilter`、関連する呼び出し

パブリックAPIサーバー上で[`eth_newFilter`](https://eth.wiki/json-rpc/API#eth_newfilter)APIメソッドを使用している場合、実際にロードバランサの背後にいくつかのノードであるため、期待どおりに動作することはできません。[`eth_getFilterChanges`](https://eth.wiki/json-rpc/API#eth_getfilterchanges)呼び出しを行った場合`eth_newFilter`、最初の呼び出しと同じノード上に終了しない可能性があり、未定義の結果が終了します。

ログフィルタ機能が必要な場合は、ウェブソケット接続を使用する必要があります。これにより、クライアントはロードバランサの背後にいる同じノードと常に話をしていることを保証します。あるいは、自身のノードを使用したり[`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)、実行したり、API呼び出しをすることができます。

## サポート

このチュートリアルを使うことで、Avalancheでスピードアップ、デプロイ、テストできるよう迅速にできるはずです。質問、問題がある場合、あるいは我々とチャットしたい場合、あなたは我々の公共[Discord](https://chat.avalabs.org/)サーバー上で我々に連絡することができます。我々は、あなたから連絡がとてもとても良く、Avalanche上で構築されているものを知ることを楽しみにしています！

