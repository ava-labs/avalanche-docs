---
description: >-
  Avalancheで構築。制限なしにビルドします。Avalancheを構築する開発者は、強力で信頼性があり、安全なアプリケーションを簡単に作成できます。

---

# JPD-JPD-JPD

## Avalanche-JP

[Avalanche](https://avax.network)は、[分散型](https://support.avalabs.org/en/articles/4587146-what-is-a-decentralized-application-dapp)アプリケーションと[エンタープライズブロックチェーン](http://support.avalabs.org/en/articles/4064677-what-is-a-blockchain)展開を1つの相互運用性が高くスケーラブルなエコシステムで起動するためのオープンソースプラットフォームです。Avalancheは、ほぼ即時トランザクションの最終的には、グローバルな金融の規模のために構築された最初の分散型スマートコントラクトプラットフォームです。Ethereumの開発者はAvalancheをすぐに構築できます。

Avalancheと他の分散型ネットワークとの重要な違いは、コンセンサスプロトコルです。時間の経過とともに、人々はブロックチェーンが遅く、スケーラブルでない必要があるという誤った理解に来ました。Avalancheプロトコルは、分散化を妥協することなく、強力な安全性保証、迅速な最終性、およびハイスループットを実現するためにコンセンサスに対する新しいアプローチを採用しています。

## AVAX-JP

AVAXはAvalancheのネイティブトークンです。これは、手数料の支払い、ステーキングを通じてプラットフォームを保護し、Avalancheで作成された複数のサブネット間の基本的なアカウント単位を提供するために使用される硬いキャップの不足の資産です。`1 nAVAX`は`0.001` AVAXに等しいです。

## Avalancheコンセンサスプロトコル

![コンセンサス比較](.gitbook/assets/image%20%2810%29%20%281%29%20%281%29%20%281%29.png)

Avalancheファミリーの議定書は、サブサンプリング投票を繰り返し行うことによって機能します。[JavaScript](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript[-](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-クエリーされたバリデーターがトランザクションが無効であると考えている場合、トランザクションをすでに拒否している場合、または競合するトランザクションを好む場合、トランザクションが拒否されるべきであると答えます。そうでなければ、トランザクションが受け入れられるべきであると考えていることを返信します。

_JavaScript_-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-つまり、将来的にトランザクションについて問い合わせると、トランザクションが受け入れられるべきだと考えられることを返信します。同様に、バリデータは、トランザクションを拒否すべきだと考えるバリデータが十分に大部分が返信した場合、トランザクションを拒否することを好むでしょう。

バリデータは、このサンプリングプロセスを繰り返します。バリデーターの_アルファ_が_ベータ_$$$$ $$ 連続したラウンドに対して、 \(acplet-or reject\)と同じ返信を返します。

トランザクションに競合がない一般的なケースでは、最終化は非常に迅速に行われます。コンフリクトが存在する場合、正直なバリデータは、コンフリクトなトランザクションの周りに素早くクラスターを付け、すべての正しいバリデータがそのトランザクションを好むまで正のフィードバックループを入力します。これにより、競合しない取引の受け入れと競合する取引の拒否につながります。

![Avalanche Consensusの仕組み](.gitbook/assets/howavalancheconsensusworks.png)

\(システムパラメーターに基づく高い確率で\) もし正直なバリデータがトランザクションを受け入れるか拒否する場合、すべての正直なバリデータがそのトランザクションを受け入れるか拒否するか、または拒否するかを保証します。

Avalancheコンセンサスプロトコルの技術的コンポーネントについては[、](https://arxiv.org/pdf/1906.08936.pdf)ホワイトペーパーを参照してください。

## Snowman Consensus Protocol-JP

Snowman は、チェーン最適化されたコンセンサスプロトコルで、高スループット、全量オーダーで、スマートコントラクトに最適です。スノーマンは[Avalancheコンセンサスプロトコル](./#avalanche-consensus-protocol)によって供給されています。[P-Chain](learn/platform-overview/#platform-chain-p-chain)と[C-Chain](learn/platform-overview/#contract-chain-c-chain)の両方でSnowmanコンセンサスプロトコルを実装しています。

## 主な特徴

### JPS-PEED-JP

Cornellのコンピュータ科学者チームによって開発された新しいコンセンサスプロトコルを使用し、1秒以内にトランザクションを永久に確認できます。

### Scalability-JP

1秒間に4,500のトランザクションが可能–既存のブロックチェーンよりも大きい順序です。

### --

より強力なセキュリティ保証が、他のネットワークで51%標準をはるかに上回っています。

### JP-JP-

ほとんど任意のロジックを含む、カスタムブロックチェーンと分散型アプリを簡単に作成できます。

### JPS-JP-JP

Proof-of-workではなく、エネルギー効率の良いProof-of-stakeコンセンサスアルゴリズムを使用します。

### スマートコントラクトサポート

Solidityスマートコントラクトの作成と、Remix、Metamask、Truffleなどのお気に入りのEthereumツールがサポートされています。

### PrivateおよびPublic Blockchains

独自のパブリックまたはプライベートブロックチェーンを作成します。

### 金融向けに設計

複雑なカスタムルールセットでデジタルスマートアセットを簡単に作成し、取引するためのネイティブサポート。

