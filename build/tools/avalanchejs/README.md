# AvalancheJS

AvalancheJSは[、](../../../#avalanche)AvalancheプラットフォームとインターフェームのためのJavaScriptライブラリです。TypeScriptを使用して構築され、ブラウザとNode.js両方をサポートすることを意図しています。AvalancheJSにより、AvalancheノードAPIにコマンドを発行することができます。

現在デフォルトでサポートされているAPIは、以下の通りです。

* 管理API
* Auth API
* AVM API（X-Chain）
* EVM API（C-Chain）
* ヘルスAPI
* 情報API
* キーストアAPI
* Metrics API
* プラットフォームVM API

我々は、使いやすいことを念頭に置いてAvalancheJSを構築しました。このライブラリにより、Javascript開発者は、Avalancheプラットフォーム上のノードとやり取りできます。[Avalancheプラットフォーム仕様](https://docs.avax.network)で最新の変更により、ライブラリを最新の状態に保ちます。

AvalancheJSを使用する場合、開発者は次のことができます。

* ローカルに管理する
* アドレス上の残高を取り戻す
* アドレスのためにUTXOを取得する
* トランザクションを構築し、サインする
* プライマリネットワーク上でX-Chain、P-Chain、C-Chainに署名された取引を発行する
* サブネットワークを作成する
* X-Chain、P-Chain、C-Chain間でAVAXとアセットをスワップします。
* プライマリネットワークにバリデータを追加する
* プライマリネットワークにデリゲータを追加する
* ローカルノードを管理する
* ノードからAvalancheネットワーク情報を取得する

## 要件

AvalancheJSは、コンパイルするには、Node.jsバージョン12.14.1以上が必要です。

## インストール

Avalancheは、以下の経由でインストールできます`npm`。

`npm install --save avalanche`

また、直接レポをプルダウンし、ゼロからビルドすることもできます：

`npm run build`

これにより純粋なJavascriptライブラリが生成され、プロジェクトルートで「ウェブ」という名前のフォルダに配置されます。Avalancheの純粋なjavascript実装として、「avalanchejs」ファイルは任意のプロジェクトにドロップすることができます。

AvalancheJSライブラリは、以下のように既存のNode.jsプロジェクトにインポートすることができます。

```text
const avalanche = require("avalanche");
```

あるいは、以下のようにTypeScriptプロジェクトに入る

```text
import { Avalanche } from "avalanche"
```

## エッセンシャルをインポート

```text
import {
    Avalanche,
    BinTools,
    Buffer,
    BN
  } from "avalanche"

let bintools = BinTools.getInstance();
```

上記の行は、チュートリアルで使用されるライブラリをインポートします。ライブラリは、次のものを含みます：

* avalanche：
* bn.js：AvalancheJSで使用するビグナンバーモジュール。
* バッファ：
* BinTools：AvalancheJSに組み込まれたシングルトン。

