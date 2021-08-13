---
description: Avalancheのステークホルダーの検証または委任方法を学びます

---

# ステーキング

Staking は、トークンをロックアップしてネットワークをサポートするプロセスです。 \(報酬はネットワークユーティリティ、金銭的補償などを増やすことができます。ステーキングの概念は、PeercoinのSunny KingとScott Nadalによって[最初に導入](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf)された。

### Proof-of-Stakeの機能はどのように機能しますか？

[sybil 攻撃](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack)に抵抗するためには、分散型ネットワークは、不足なリソースでネットワーク影響を支払うことを要求する必要があります。これにより、攻撃者がネットワーク上で十分な影響力を得ることは、そのセキュリティを損なうために、実現不可能に高価です。Proof-of-workシステムでは、不足しているリソースがコンピューティングパワーです。Avalancheでは、希少なリソースはネイティブトークンである[AVAX](../../#avalanche-avax-token)です。Avalancheでブロックチェーンを[検証](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)するには、AVAXを賭けなければなりません。

## Avalancheのパラメーターをステーキング

[Primary Network](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network)の検証が完了すると、AVAXトークンが付いています。ネットワークを保護するのに役立つ報酬を受け取るかもしれません。バリデータは、バリデーションリワードが有効で、有効期間中に正しい場合のみ受領[し](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards)ます。[Avalanche](https://files.avalabs.org/papers/token.pdf) トークンホワイトペーパーを参照して、AVAX とステーキングの仕組みについて学びます。

{% ヒント スタイル="warning" %}ステーキングリワードは**、これらのすべてのパラメーターが満たされている限り**、ステーキング期間の末にウォレットアドレスに送信されます。{% endhint %}

* バリデーターが出資する必要がある最小値は2,000 AVAXです。
* 委任者が委任する必要がある最小量は25 AVAXです。
* 1 つの検証のための資金を賭けることができる最小時間は 2 週間です。
* 1 つの検証のための資金を賭けることができる最大時間は 1 年です。
* 1 つの代表団の資金を賭けることができる最低時間は 2 週間です。
* 1 つの委任のための資金を賭けることができる最大時間は 1 年です。
* 最低の代表取締役会費率は2%です。
* バリデータ \(彼ら自身のステーク+ステークが彼らに委託された)の最大重量は、3e6 AVAXで、バリデータがステークした量の5倍です。例えば、2,000 AVAX をバリデーターとして出力した場合、8000 AVAX はノード合計 \(delegator\ ではなく)に委任できます。
* バリデーターが正しくオンラインでなければならない時間の最小割合は60%です。

## バリデータ

**バリデーター**はAvalancheを安全にし、新しいブロック/頂点を作成し、トランザクションを処理します。コンセンサスを達成するために、バリデータは互いに繰り返しサンプルを行います。与えられたバリデータがサンプリングされる確率は、そのステークに比例します。

Validator セットにノードを追加するとき、次のように指定します。

* ノードのID
* 検証を始めて、停止する場合
* AVAXの数
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* 代表団料金 \(以下参照)

--バリデーターが出力する最小値は2,000 AVAXです。{% endhint %}

{% ヒント スタイル="danger" %}トランザクションをバリデータとしてノードを追加すると、パラメータを変更する方法はありません。**ステークを早期に削除したり、ステーク金額、ノードID、リワードアドレスを変更することはできません。**以下のAPIコールで正しい値を使用していることを確認してください。わからない場合は、[Discord](https://chat.avax.network) に関するヘルプを尋ねるか、[Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq)を参照してください。{% endhint %}

### JavaScript-JP-JP-<a id="running-a-validator"></a>

バリデーターを実行している場合、ノードがリワードを受け取るように接続されていることが重要です。[こちら](http://support.avalabs.org/en/articles/4594192-networking-setup)をご覧ください。

トランザクションを発行してバリデーターを追加すると、ステーククトークンとトランザクション手数料は、管理するアドレスから差し引かれます。検証が完了すると、資金は、出たアドレスに返されます。報酬を獲得した場合、バリデーターとして自分を追加したときに指定したアドレスに送信されます。

#### API コールを許可する<a id="allow-api-calls"></a>

APIコールをリモートマシンからノードに呼び出すには、APIポート \(`9650` by default\) 上のトラフィックを許可し、`--http-host=` 引数でノードを実行します。

JavaScript-JP-JP-ネットワークを設定して、信頼できるマシン \(例えば、パーソナルコンピューターからAPIポートへのアクセスを許可する必要があります。\)

#### なぜ私の稼働時間が低いのですか？<a id="why-is-my-uptime-low"></a>

Avalancheのすべてのバリデータは、他のバリデータの稼働時間を追跡します。ノードが持っている接続と各接続のアップタイムだけでなく、`info.peers`を呼び出すことができます。**これはノードの視点だけです。**他のノードは、ノードのアップタイムを異なるように認識することができます。ただ、1つのノードが稼働時間を低いと認識しているからこそ、ステーキング報酬を受け取らないという意味ではありません。

NATトラバーサルに失敗したため、ノードが別のノードに接続されていない可能性が高いのは、`--public-ip=[NODE'S PUBLIC IP]`でノードを起動しませんでした。将来的には、ノードがよく接続されていることを確認できるように、より良いモニタリングを追加します。

#### シークレットマネジメント<a id="secret-management"></a>

検証ノードで必要な唯一の秘訣は、ノードのIDを決定するTLSキーであるStaking Keyです。ノードを始めるときに、Staking Keyが作成され、`$HOME/.avalanchego/staker.key`に置きます。このファイル \(および `staker.crt`\) を安全な場所にバックアップする必要があります。Staking Keyを失うと、ノードに新しいIDが付いているため、バリデーション報酬が危険にさらされる可能性があります。

AVAX ファンドを検証ノードに持っている必要はありません。実際、ノードに多くの資金を持ってい**ない**のがベストプラクティスです。あなたの資金のほとんどすべては、秘密鍵がどのコンピューターにもない"cold" アドレスにいるべきです。

#### Monitoring on JP-JP-JP<a id="monitoring"></a>

このチュートリアルに従って、ノードの稼働時間、一般的な健康状況などを監視する方法を学びます。

--/../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegators ——

デリゲーターはトークンホルダーであり、ステーキングに参加したいが、デリゲーションを通じて既存の検証ノードを信頼するように選択する。

stakeをバリデータに委託する場合、次のように指定します。

* --
* ステーク \(バリデータがvalidating\である場合に必ずしも)
* AVAXの数
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

--デリゲーターが委任する必要がある最小値は25 AVAXです。{% endhint %}

{% ヒント スタイル="danger" %}トランザクションを発行して、デリゲーターにステークを追加する方法はありません。**ステークを早期に削除したり、ステーク金額、ノードID、リワードアドレスを変更することはできません。**わからない場合は、[Discord](https://chat.avax.network) に関するヘルプを尋ねるか、[Developer FAQs](http://support.avalabs.org/en/collections/2618154-developer-faq)を参照してください。{% endhint %}

### Delegatorの報酬<a id="delegator-rewards"></a>

トークンを委任するバリデーターが十分に正しく応答性がある場合、委任が終わったときに報酬を受け取ります。デレガーは、バリデータと同じ関数に従って報酬を受け取ります。ただし、バリデーターがリワードの一部を保持するバリデーターは、バリデーターの委任料金率で指定したリワードの一部を保持します。

トランザクションを発行すると、Tokensをデリゲートする取引手数料は、管理するアドレスから差し引かれます。デリゲートが終わると、ステーククトされたトークンがあなたのアドレスに返されます。報酬を獲得した場合、トークンを委任したときに指定したアドレスに送信されます。

