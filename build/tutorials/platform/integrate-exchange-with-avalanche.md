# Avalanche C-Chainとの取引所を統合する

## JavaScript-JP-JP-

本文書の目的は、EVM-Compatible Avalanche C-Chainと統合する方法の簡単な概要を示すことです。すでにETHをサポートしているチームにとって、C-Chainをサポートすることは、Avalancheノード \([go-ethereum](https://geth.ethereum.org/docs/rpc/server)\と[同じAPI](https://eth.wiki/json-rpc/API)を持つ)をスピンアップし、トランザクションの構築時にAvalancheのChainID \(43114\)を生成するのと同じくらい簡単です。

さらにAva Labsは、[avalanche-rosetta](https://github.com/ava-labs/avalanche-rosetta)と呼ばれるC-Chain用の[Rosetta API](https://www.rosetta-api.org/)の実装を維持しています。この標準化された統合パスの詳細については、Rosetta APIのWebサイトをご覧ください。

## EVM Endpoints を使用した統合

### Avalancheノードの実行

ノードフォームソースをビルドするか、またはそれをdockerイメージに含める場合は、[AvalancheGo GitHub リポジトリ](https://github.com/ava-labs/avalanchego)を参照してください。すばやく起動して実行するには、あらかじめビルドされたバイナリを使用して、Linux 上の systemd サービスとして avalanchego ノードをインストールおよび更新する自動化する[ノードインストールスクリプト](../nodes-and-staking/set-up-node-with-installer.md)を使用できます。

### Avalancheノードの構成

すべての設定オプションとそのデフォルト値は[ここに](../../references/command-line-interface.md)説明されています。

Config-JP-JP-JP-J-JP-JP`config-file=config.json を使用して config-file=config.json` を指定できます。`json` は JSON ファイルで、キーと値はオプション名と値です。

C-Chainを含む個々のチェーンには、ノードレベルのオプションとは別に独自の設定オプションがあります。これらはまた、config ファイルで指定することもできます。詳しくはこちらをご覧ください[。](../../references/command-line-interface.md#chain-configs)

C-Chain config ファイルは `$HOME/.avalanchego/configs/chains/C/config.json` にあります。AvalancheGo に`--chain-config-dir` オプションでC-Chain設定ファイルについて他の場所を探すこともできます。C-Chain 設定ファイルの例:

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

{% ヒント スタイル="warning" %}Ethereum [Archive Node](https://ethereum.org/en/developers/docs/nodes-and-clients/#archive-node)機能が必要な場合は、C-Chainのプルーニングを無効にしてください。これはAvalancheGo v1.4.10以降でデフォルトで有効にされています。プルーニングを無効にするには、C-Chain 設定ファイルに `"pruning-enabled": false` を含めます。{% endhint %}

### C-Chainとの相互作用

C-Chainとの相互作用は、[go-ethereum](https://geth.ethereum.org/)と相互作用と同じです。C-Chain APIの参考資料は[こちらから](../../avalanchego-apis/contract-chain-c-chain-api.md)ご覧いただけます。

`personal_`namespaceはデフォルトでオフになっていることに注意してください。ONをオンにするには、上記の設定例のように、適切なコマンドラインスイッチをノードに渡す必要があります。

## Rosettaによる統合

[Rosetta](https://www.rosetta-api.org/)は、すべてのネットワークに同じAPIを提示することにより、異なるブロックチェーンネットワークとの統合を容易にするためのオープンソースの仕様とツールセットです。Rosetta APIは、[Data API](https://www.rosetta-api.org/docs/data_api_introduction.html)と[Construction API](https://www.rosetta-api.org/docs/construction_api_introduction.html)の2つのコアコンポーネントで構成されています。これらのAPIにより、誰でも標準的な通信プロトコルでブロックチェーンに書き込むことができます。これらのAPIの仕様は[、rosetta-](https://github.com/coinbase/rosetta-specifications)specifically repositoryにあります。

Avalanche C-ChainのRosettaサーバー実装は[こちら](https://github.com/ava-labs/avalanche-rosetta)からご覧いただけます。サーバーをインストールして実行するだけです。Dockerfile には、サーバーと Avalanche クライアントの両方をパッケージングするものがあります。詳細な手順は、リンクされたリポジトリで見つけることができます。

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaServer-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaJava-JavaJava-JavaScript-JavaJavaJava-Java-JavaJavaScript-JavaJavaScript-JavaJavaJavaJ

Avalanche C-Chainトランザクションは、2つの例外を除く標準的なEVMトランザクションと同一です。

* AvalancheのChainID \(43114\)で署名する必要があります。
* ガス価格は225Gweiに固定されています。

AvalancheはEthereumのすべての人気ツールツールをサポートしています。EthereumとSolidityに精通した開発者は自宅で気軽に楽しめます。いくつかの人気のある開発環境のためのチュートリアルとリポジトリがあります:

* [MetaMaskとRemix](../smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask.md)
* [トリュフ](../smart-contracts/using-truffle-with-the-avalanche-c-chain.md)
* [Hardhat-JP](https://github.com/ava-labs/avalanche-smart-contract-quickstart)

## チェーン上のデータの取得

Ethereumネットワークで使用するチェーン上のデータをインキングする標準的な方法を使用できます。

### Finalityの判断

Avalancheコンセンサスにより、1-2秒で素早く不可逆的な最終的には実現します。`最新`の最終ブロックをクエリーするには、最新のパラメーターで任意の値 \(block, balance, state etc\)をクエリーします。最後の最終ブロック \(つまり、eth\_blockNumberが10を返し、11\を返す)をクエリーすると、未完成のデータがクエリーできないことを示すエラーが発生します(avalanchego@v1.3.2\)。

### \(Optional\) カスタムGolang SDK

C-Chainから独自のシステムにデータを抽出する場合は、カスタム[ethclient](https://github.com/ava-labs/coreth/tree/master/ethclient)を使用することをお勧めします。Go-ethereum Ethereum クライアントは、Avalanche C-C-Chain ブロックのヘッダーフィールドで、AVAX をチェーン \(X-Chain と P`-`Chain`\)`間で移動する際に、ブロックハッシュを正しく計算しません。JavaScript-JP[-](../../../learn/platform-overview/)JP-

JSON レスポンスを直接読み込むことを計画している場合、または web3.js \(wire\ で受け取ったハッシュを再計算しない) を使用して、オンチェーンでトランザクションデータ/ログ/レシートを抽出する必要があります。

## JP-JP-

何か問題や質問がある場合は、[Discord](https://chat.avalabs.org/)のパブリック・サーバーに直接ご連絡ください。

