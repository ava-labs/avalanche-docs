# Public API-JP

開発者はノード自体を実行することなくAvalancheネットワークにアクセスできるパブリックAPIサーバーがあります。Public API サーバーは実際には、高可用性と高リクエストのスループットを確実にするために、ロードバランサーの後ろにいくつかの[AvalancheGo](https://github.com/ava-labs/avalanchego)ノードです。

## Public API ノードの使用

Public API サーバーは、Avalanche Mainnet 用 `https://api.avax.network/` および Avalanche Testnet 用 `https://api.avax-test.network/` にあります。特定のAPIにアクセスするには、[ここで](../avalanchego-apis/issuing-api-calls.md)説明したように、関連するAPIエンドポイントを追加するだけです。例えば、X-Chain API コールを送信するURLは、`https://api.avax.network/ext/bc/X`です。

## サポートされているAPI

Public API サーバーは、[X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md)、[P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md)、[C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md)のAPIを含む、パブリックフェースサービスで利用できるようにするすべてのAPIエンドポイントをサポートしています。利用可能なAPIの完全なリストは[、こちら](../avalanchego-apis/)を参照してください。

## Sticky セッション

Public API サーバーAPIへのリクエストは、ロードバランサーによって個々のノードに配布されます。結果として、連続したリクエストは異なるノードに移動することができます。これは、いくつかのユースケースに問題を引き起こす可能性があります。例えば、あるノードは、あるノードが指定されたトランザクションが受け入れられると考えられるかもしれませんが、別のノードではトランザクションが処理されています。このような状況を回避するには、[ここに](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)記載されているように、'sticky sessions' を使うことができます。これにより、連続した API コールを同じノードにルーティングできます。

[AvalancheJS](avalanchejs/)を使用してパブリックAPIにアクセスする場合は、以下のコードを設定してください。

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## --

パブリックAPIノードの使用は、認証や認証なしで誰でも利用できます。Rate limiting には存在しますが、API コールの多くはキャッシュされ、Rate limitsは非常に高いです。アプリケーションが制限に反して動作している場合は、[弊社までご](https://chat.avalabs.org)連絡ください。

## JP-JP-

ご質問、問題、ご提案、[ご](https://chat.avalabs.org/)相談はこちらから

