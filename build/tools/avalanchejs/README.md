# AvalancheJS-JS-JP-JP-

AvalancheJSは[Avalanche](../../../#avalanche)プラットフォームとのインタフェースのためのJavaScriptライブラリです。TypeScript を使用してビルドされ、ブラウザと Node.js の両方をサポートすることを目的としています。AvalancheJSライブラリーでは、AvalancheノードAPIにコマンドを発行できます。

現在、デフォルトでサポートされているAPIは次のとおりです。

* Admin API
* Auth API
* AVM API \(X-Chain\)
* EVM API \(C-Chain\)
* Health API-JP
* Info API
* Keystore API
* Metrics API
* PlatformVM API

AvalancheJSを構築しました。Javascript 開発者は、開発者の消費のために API エンドポイントを有効にした Avalanche Platform 上のノードと対話できます。[Avalanche Platform Specification](https://docs.avax.network)の最新の変更点でライブラリを最新の状態に保ちます。

AvalancheJS を使用すると、開発者は次のことができます:

* 秘密鍵をローカル管理する
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* UTXOを取得する
* トランザクションの構築と署名
* X-Chain、P-Chain、C-Chainに署名されたトランザクションをPrimaryネットワークで発行
* Subnetworkの作成
* X-Chain、P-Chain、C-Chainの間でAVAXとアセットをスワップする
* Primary ネットワークにバリデータを追加する
* Primary ネットワークに Delegator を追加する
* ローカルノードを管理する
* Avalancheネットワーク情報をノードから取得する

## JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

AvalancheJSは、コンパイルにはNode.jsバージョン12.14.1以降が必要です。

## JPY-JPY-J

Avalancheは`npm`経由でインストールできます:

`npm install --avalanche-save-avalanche-JP`

また、レポを直接プルダウンして、それをゼロからビルドすることもできます。

`npm run ビルド`

Javascriptライブラリーを生成し、プロジェクトルート内の "web" というフォルダーに配置します。Avalanchejs ファイルは、Avalancheの純粋な javascript 実装として任意のプロジェクトにドロップすることができます。

AvalancheJS ライブラリーは、次のように既存の Node.js プロジェクトにインポートできます。

```text
const avalanche = require("avalanche");
```

または、TypeScript プロジェクトに次のようなものがあります。

```text
import { Avalanche } from "avalanche"
```

## 必須項目をインポートする

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

The general is any use-JP-JPJavaScript-JP-JP-

* avalanche: javascriptモジュール.
* bn.js: AvalancheJSで使用するbignumberモジュールです。
* buffer: バッファライブラリー。
* BinTools: AvalancheJSに組み込まれたシングルトンです。

