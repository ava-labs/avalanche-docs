# 公開API

開発者が自分でノードを起動することなくAvalancheネットワークにアクセスできるように、公開APIサーバーが用意されています。公開APIサーバーは、実際には、ロードバランサーの背後にある複数[AvalancheGo](https://github.com/ava-labs/avalanchego)ノードで、高い可用性と高いリクエストスループットを実現します。

## 公開APIノードの使用

公開APIサーバーは、Avalanche Mainnet対応が`https://api.avax.network/`に、Avalanche Testnet対応が`https://api.avax-test.network/`にあります。[こちら](../avalanchego-apis/issuing-api-calls.md)に書かれている関連APIエンドポイントを追加するだけで、特定のAPIにアクセスできます。例えば、X-Chain API呼び出しを送信するURLは、`https://api.avax.network/ext/bc/X`です。

## 対応API

公共APIサーバーは、[X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md)、[P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md)、[C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md)用のAPIなどを公共フェースサービス上で利用可能とするために役に立つAPIエンドポイントをサポートします。利用可能なAPIの全リストは[こちら](../avalanchego-apis/)をご覧ください。

## スティッキーセッション

公共APIサーバーAPIへのリクエストは、ロードバランサーによって個々のノードに配布されます。その結果、連続リクエストが異なるノードに移動する可能性があります。これにより、一部のユースケースに問題が発生する可能性があります。例えば、あるノードは、指定されたトランザクションを受け入れようとしても、別のノードが、そのトランザクションをまだ処理中の場合があります。これを回避するために、[こちら](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)に書かれている「スティッキーセッション」を使用することができます。これにより、連続API呼び出しを同じノードにルーティングすることができます。

[AvalancheJS](avalanchejs/)を使用している場合は、次のようにコードで設定するだけです。

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## 可用性

公共APIノードの使用は無料で、認証や承認なく誰でも利用できます。レート制限は存在しますが、API呼び出しの多くはキャッシュされ、レート制限が非常に高くなっています。アプリケーションが制限にかかっている場合は、[ご連絡](https://chat.avalabs.org)ください。

## サポート

ご不明な点や問題、ご提案がある場合は、[お問い合せください](https://chat.avalabs.org/)。

