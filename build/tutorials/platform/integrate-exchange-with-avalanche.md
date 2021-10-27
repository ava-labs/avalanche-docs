# 取引所をAvalanche  C-Chainと統合する

## 概要

このドキュメントの目的は、EVM-互換性のあるAvalanche  C-Chainと統合する方法の概要を簡単に説明することです。すでにETHをサポートしているチームの場合、 C-Chainをサポートすることは、Avalancheノード（[go-ethereum](https://geth.ethereum.org/docs/rpc/server)と[同じAPI](https://eth.wiki/json-rpc/API)を持つ）のスピンアップのように簡単で、トランザクションを構築するときにAvalancheのChainID（43114）を展開します。

さらに、Ava Labsは、[avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta)と呼ばれる C-Chain[用の](https://www.rosetta-api.org/)Rosetta APIの実装を維持しています。この標準化された統合パスについては、添付のRosetta APIウェブサイトで詳細をご覧ください。

## EVMエンドポイントを使用した統合

### Avalancheノードを実行する

ノードフォームソースを構築したい場合、またはDockerイメージに含める場合は、[AvalancheGo GitHubリポジトリ](https://github.com/ava-labs/avalanchego)を参照します。素早くに立ち上げて起動するには、構築済のバイナリを使用して、Linux上のsystemdサービスとしてavalanchegoノードのインストールや更新を自動化する[ノードインストールスクリプト](../nodes-and-staking/set-up-node-with-installer.md)を使用できます。

### Avalancheノードを設定する

すべての設定オプションとデフォルト値は[こちら](../../references/command-line-interface.md)にあります。

コマンドラインで設定オプションを提供するか、設定ファイルを使用することができます。これにより、多くのオプションを提供するときの操作が簡単になります。`—config-file=config.json`で設定ファイルの場所を指定することができます。　`config.json`は、鍵と値を持つJSONファイルで、オプションの名前と値です。

 C-Chainを含む個々のチェーンには、ノードレベルのオプションとは別に独自の設定オプションがあります。これらは設定ファイルで指定することもできます。詳細は[こちら](../../references/command-line-interface.md#chain-configs)をご覧ください。

 C-Chain環境設定ファイル`$HOME/.avalanchego/configs/chains/C/config.json`は、にあります。AvalancheGoに指示して、`--chain-config-dir`オプションを使って C-Chain環境設定ファイルをどこか他の場所で探すようにすることもできます。 C-Chain環境設定ファイルの例:

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

{% hint style="warning" %}Ethereumの[アーカイブノード](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node)機能が必要な場合は、AvalancheGo v1.4.10以降ではデフォルトで有効になっている C-Chainプルーニングを無効にする必要があります。プルーニングを無効にするには、`"pruning-enabled": false`を C-Chain環境設定ファイルに含めます。{% endhint %}

###  C-Chainでやり取りする

 C-Chainとのやり取りは、[go-ethereum](https://geth.ethereum.org/)とのやり取りと同じです。 C-ChainAPIの参照材料は[こちら](../../avalanchego-apis/contract-chain-c-chain-api.md)です。

デフォルトでは、`personal_`名前スペースがオフになっていることに注意してください。ONにするには、上記の設定例のように、適切なコマンドラインスイッチをノードに渡す必要があります。

## Rosettaを使用した統合

[Rosetta](https://www.rosetta-api.org/)は、すべてのネットワークに同じAPIのセットを提示することで、異なるブロックチェーンネットワークとの統合を簡単にするオープンソース仕様とツールのセットです。Rosetta APIは、2つのコアコンポーネントである[Data API](https://www.rosetta-api.org/docs/data_api_introduction.html)と[Construction API](https://www.rosetta-api.org/docs/construction_api_introduction.html)で構成されています。これらのAPIにより、標準の通信プロトコルで標準フォーマットのブロックチェーンに誰でも読み込み、書き込みが可能になります。これらのAPIの仕様は、[rosetta-specification](https://github.com/coinbase/rosetta-specifications)のリポジトリにあります。

Rosettaサーバーの実装は[こちら](https://github.com/ava-labs/avalanche-rosetta)です。適切な設定で、サーバーをインストールして実行するだけです。サーバーとAvalancheクライアントの両方をパッケージしているDockerファイルが付属しています。詳細な手順は、リンクのリポジトリにあります。

## トランザクションの構築

Avalanche  C-Chainトランザクションには2つの例外がありますが、標準のEVMトランザクションと同じです。

* これらはAvalancheのChainID (43114)で署名する必要があります。
* ガス価格は225Gweiに固定されています。

開発目的で、Avalancheは、Ethereum用のすべての人気ツールに対応しているため、EthereumとSolidityを理解している開発者にはおなじみでしょう。人気の開発環境のチュートリアルとリポジトリがいくつかあります。

* [MetaMaskとRemix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [Truffle](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat](../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md)

## オンチェーンデータを取得する

Ethereumネットワークで使用するオンチェーンデータを取得する標準的な方法が使えます。

### ファイナリティの決定

Avalancheのコンセンサスにより、1-2秒で迅速かつ不可逆のファイナリティが得られます。最も最新のブロックをクエリするには、`latest`パラメータで任意の値（ブロック、残高、状態）をクエリします。最後にファイナライズされたブロックを上回る（例えばeth_blockNumberが10を返し、11をクエリするなど）場合、未確定のデータをクエリできないことを示すエラーが出ます（avalanchego@v1.3.2として）。

### （オプション）カスタムGolang SDK

golangを使用して C-Chainからデータを自分のシステムに抽出する場合、カスタム[ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient)の使用をお勧めします。標準のgo-ethereumEthereumクライアントは、チェーン（X-ChainとP-Chain）間でAVAXを動かすために使用される、Avalanche  C-Chainブロックで追加された`[ExtDataHash](https://github.com/ava-labs/coreth/blob/2c3cfac5f766ce5f32a2eddc43451bdb473b84f1/core/types/block.go#L98)`ヘッダーフィールドを考慮しないため、（`block.Hash()`を呼び出す際に）ブロックハッシュを正しく計算しません。マルチチェーンの抽象化については、[こちら](../../../learn/platform-overview/)をご覧ください（通常の C-Chain統合の範疇外です）

JSONレスポンスを直接読み込んだり、web3.jsを使用して（ワイヤーで受け取ったハッシュを再計算しない）オンチェーンのトランザクションデータ/ログ/レシートを抽出する予定であれば、何の問題もないはずです。

## サポート

問題やご不明な点がある場合は、開発者に直接連絡するか、公開の[Discord](https://chat.avalabs.org/)サーバーにお問合せください。

