# パブリックAPI

開発者がAvalancheネットワークにアクセスできるようにするパブリックAPIサーバーがあり、ノード自身で実行することなくパブリックAPIサーバーがあります。パブリックAPIサーバーは、実際にロードバランサに背後にあるいくつかの[AvalancheGo](https://github.com/ava-labs/avalanchego)ノードであり、高い可用性と高い要求スループットを確実にします。

## パブリックAPIノードを使用する

`https://api.avax.network/`パブリックAPIサーバーは、Avalanche MainnetとAvalancheテストネット`https://api.avax-test.network/`に存在します。特定のAPIにアクセスするには、[ここで](../avalanchego-apis/issuing-api-calls.md)記載したように、関連するAPIエンドポイントを追加するだけです。たとえば、X-Chain API呼び出しを送信するURLは以下のようになります`https://api.avax.network/ext/bc/X`。

## サポートされたAPI

パブリックAPIサーバーは、[X-Chain](../avalanchego-apis/exchange-chain-x-chain-api.md)、[P-Chain](../avalanchego-apis/platform-chain-p-chain-api.md)、[C-Chain](../avalanchego-apis/contract-chain-c-chain-api.md)のためのAPIをはじめ、パブリックフェースで利用できるように、パブリックフェースで利用できるすべてのAPIエンドポイントをサポートします。利用可能なAPIの完全なリストについては[、ここ](../avalanchego-apis/)を参照してください。

## スティッキーセッション

パブリックAPIサーバーAPIへのリクエストは、ロードバランサーによって個々のノードに分散されます。その結果、連続したリクエストは異なるノードに移動することができます。これにより、いくつかのユースケースで問題が発生する可能性があります。たとえば、あるノードでは、特定のトランザクションが受け付けられていると考える可能性があり、一方で別のノードではトランザクションが処理されています。この回避のために、ここに記載されているように、「スティッキーセッション」を使用できます[。](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)これにより、連続したAPIコールが同じノードにルーティングされることが可能になります。

[AvalancheJS](avalanchejs/)を使用してパブリックAPIにアクセスする場合、単にコード内の以下のように設定してください。

```javascript
avalanche.setRequestConfig("withCredentials", true);
```

## 可用性

パブリックAPIノードの使用は無料で、認証や認証なしで誰も利用可能になります。レート制限は存在しますが、多くのAPIコールがキャッシュされ、レート制限は非常に高いものです。制限に違反してアプリケーションが稼働している場合、[ご連絡ください。](https://chat.avalabs.org)

## サポート

質問、問題、提案がある場合は、[我々にご相談ください。](https://chat.avalabs.org/)

