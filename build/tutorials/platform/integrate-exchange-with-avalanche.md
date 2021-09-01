# Avalanche C-Chainと取引所を統合する

## 概要

このドキュメントの目的は、EVM互換Avalanche C-Chainと統合する方法について簡単に概要を提供することです。すでにETHをサポートしているチームでは、C-Chainをサポートすることは、Avalancheノード（[go-ethereum](https://geth.ethereum.org/docs/rpc/server)と[同じAPI](https://eth.wiki/json-rpc/API)を持つ）をスピンアップし、トランザクションを構築する際にAvalancheのChainID（43114）を発生するのと同じくらい簡単です。

さらに、Ava Labsは、[avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta)と呼ばれるCチェーンのための[Rosetta API](https://www.rosetta-api.org/)の実装を維持します。この標準化された統合パスについては、添付されたRosetta APIウェブサイト上で詳細を確認することができます。

## EVMエンドポイントを使用した統合

### Avalancheノードを実行する

ノードフォームソースを構築したり、ドッカーイメージに含める場合は、[AvalancheGo GitHubリポジトリ](https://github.com/ava-labs/avalanchego)を参照してください。素早く起動できるように、avalanchegoノードのインストール、更新を自動化する[ノードインストールスクリプト](../nodes-and-staking/set-up-node-with-installer.md)を使用し、事前にビルドされたバイナリを使用して、Linux上のシステムデータサービスです。

### Avalancheノードの構成

すべての構成オプションとそのデフォルト値については[、ここで](../../references/command-line-interface.md)説明します。

コマンドライン上で設定オプションを提供したり、設定ファイルを使用したりできます。設定ファイルの場所を指定できます。 , キーと値がオプションの名前と値であるJSONファイル`config.json`で`—config-file=config.json`指定できます。

C-Chainを含む個々のチェーンには、ノードレベルのオプションと別に設定オプションがあります。これらは、設定ファイルで指定することもできます。より詳細は、ここを参照[してください。](../../references/command-line-interface.md#chain-configs)

`$HOME/.avalanchego/configs/chains/C/config.json`C-Chain設定ファイルAvalancheGoに、オプションでC-Chain設定ファイルについて他の場所を探すようにすることもできます`--chain-config-dir`。C-Chain設定ファイルの例：

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

### C-Chainとやり取りする

Cチェーンとのやり取りは、[go-ethereum](https://geth.ethereum.org/)とやり取りと同じです。C-Chain APIのためのリファレンス資料は[、ここから](../../avalanchego-apis/contract-chain-c-chain-api.md)入手できます。

名前`personal_`空間オンにするには、上記の設定例のように、適切なコマンドラインスイッチをノードに渡す必要があります。

## Rosettaを使用した統合

[Rosetta](https://www.rosetta-api.org/)は、すべてのネットワークに同じAPIセットを提示することにより、異なるブロックチェーンネットワークとの統合がより簡単になります。Rosetta APIは、[データAPI](https://www.rosetta-api.org/docs/data_api_introduction.html)と[構築API](https://www.rosetta-api.org/docs/construction_api_introduction.html)の2つのコアコンポーネントで構成されています。これらのAPIにより、標準的な通信プロトコル上で標準形式で、誰でもブロックチェーンに読み書きできるようになります。これらのAPIの仕様は、[rosetta-](https://github.com/coinbase/rosetta-specifications)specificsリポジトリで確認できます。

Avalanche C-ChainのためのRosettaサーバ実装をご[覧い](https://github.com/ava-labs/avalanche-rosetta)ただけます。サーバとAvalancheクライアント両方をパッケージするDockerfileが付属しています。詳細な手順は、リンクされたリポジトリで見ることができます。

## トランザクションの構築

Avalanche C-Chainトランザクションは、標準的なEVMトランザクションと同じです。

* AvalancheのChainID（43114）でサインする必要があります。
* ガス価格は、225 Gweiに固定されています。

開発目的で、Avalancheは、イーサリアムのためのすべての人気ツールをサポートしています。そのため、イーサリアムとSolidityを知識した開発者は、自宅でいるように思えます。いくつかの人気のある開発環境のためのチュートリアルとリポジトリがあります：

* [MetaMaskとRemix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## オンチェーンデータへの侵入

イーサリアムネットワークで使用するオンチェーンデータを摂取する標準的な方法を使用できます。

### ファイナリティを決定する

Avalancheコンセンサスにより、1-2秒で高速かつ不可逆性のファイナリティを提供します。最新のファイナライズブロックをクエリするため、任意の値（ブロック、バランス、ステートなど）をパラメーターでクエリーします`latest`。最後のファイナライズブロックを超えるクエリ（つまり、eth\_blockNumberが10を返し、11を問い合わせます）場合、未確定データがクエリできないことを示すエラーが発生します（avalanchego@v1.3.2の時点で）。

### （オプション）カスタムGolang SDK

golangを使用してC-Chainから自身のシステムにデータを抽出する計画を立てる場合、我々のカスタム[ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient)を使用することをお勧めします。`block.Hash()`標準go-ethereumクライアントは、Avalanche C-Chainブロックの追加`[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)`ヘッダーフィールドを考慮に入れないため、（呼び出した時）ブロックハッシュを正しく計算しません。なぜならAvalanche C-Chain ブロックチェーンでAVAXがチェーン間で移動する（X-ChainとP-Chain）場合、アカウントに含まれないため、標準的なgo-ethereumクライアントのブロックハッシュを正しく計算しません。マルチチェーン抽象について[、ここから](../../../learn/platform-overview/)詳細を読むことができます。

JSONレスポンスを直接読むことを計画する場合、あるいは（ワイヤー経由で受け取ったハッシュを再計算しないでください）web3.jsを使用してオンチェーン取引のデータ、ログ、レシートを抽出する場合、問題は発生しないはずです！

## サポート

問題や質問があれば、我々の開発者に直接あるいは、我々の公開[Discord](https://chat.avalabs.org/)サーバーに連絡してください。

