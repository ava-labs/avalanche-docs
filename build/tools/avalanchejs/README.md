# AvalancheJS

AvalancheJSは、[、](../../../#avalanche)Avalancheプラットフォームとやり取りするためのJavaScriptライブラリです。TypeScriptを使用して構築されていて、ブラウザとNode.jsの両方をサポートします。AvalancheJSライブラリにより、AvalancheノードAPIにコマンドを発行できます。

現在デフォルトでは、次がサポートされています。

* 管理者用API
* 認証API
* AVM API (X-Chain)
* EVM API (C-Chain)
* 健全性API
* 情報API
* Keystore API
* Metrics API
* PlatformVM API

使いやすさを念頭に置き、AvalancheJSを構築しました。このライブラリを使用すると、Javascript開発者は、開発者が使用できるようにAPIエンドポイントを有効にしたAvalancheプラットフォーム上のノードとやり取りできます。[](https://docs.avax.network)Avalancheプラットフォーム仕様の更新に合わせて、当社では、ライブラリを最新の状態にしています。

AvalancheJSを使用すると、開発者は次のことができます。

* ローカルで秘密鍵を管理する
* アドレスの残高を取得する
* アドレス対応のUTXOを取得する
* トランザクションを構築し、署名する
* 一次ネットワーク上のX-Chain,、P-Chain、およびC-Chain に署名されたトランザクションを発行する
* サブネットワークの作成をする
* X-Chain,、P-Chain、および C-Chainと C-Chain間でAVAXと資産をスワップする
* 一次ネットワークにバリデーターを追加する
* 一次ネットワークにデリゲーターを追加する
* ローカルノードを管理する
* ノードからAvalancheネットワーク情報を取得する

## 要件

AvalancheJSは、コンパイルにNode.jsバージョン12.14.1以上が必要です。

## インストール

Avalancheは、`npm`を介してインストールすることができます。

`npm install --save avalanche`

リポジトリを直接プルダウンして、最初から作成することもできます。

`npm run build`

これにより、純粋なJavascriptライブラリを生成し、プロジェクトルートの「ウェブ」という名前のフォルダにそれを配置することができます。「avalanchejs」ファイルは、Avalancheの純粋なjavascript実装として、任意のプロジェクトにドロップすることができます。

AvalancheJSライブラリは、次に示すように、既存のNode.jsプロジェクトにインポートすることができます。

```text
const avalanche = require("avalanche");
```

または、次に示すように、TypeScriptプロジェクトに追加することができます。

```text
import { Avalanche } from "avalanche"
```

## 必要なものをインポートする

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

上記の行で、チュートリアルで使用するライブラリをインポートします。ライブラリには、次が含まれます。

* avalanche: javascriptモジュール。
* bn.js: AvalancheJSが使用するbignumberモジュールです。
* バッファ：バッファライブラリ。
* BinTools: AvalancheJSに組み込まれたシングルトンで、バイナリデータを扱うために使用されます。

