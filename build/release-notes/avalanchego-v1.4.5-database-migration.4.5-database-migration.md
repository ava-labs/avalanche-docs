# AvalancheGo v1.4.5: データベースマイグレーション

この記事は、AvalancheGo < v1.4.5からAvalancheGo >= v1.4.5にノードをアップグレードする場合に適用されます。この記事は v1.4.5 用に書かれており、そのバージョンを参照していますが、例えば、AvalancheGo v1.4.4から AvalancheGo v1.4.6、v1.4.7 などにアップグレードする場合でも適用されます。この文書を読むとき、v1.4.5 を \(データベースサブディレクトリ v1.4.5 を参照して、変更されません。\)

## JavaScript-JP-JP-

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)はデータベース最適化を大幅に実現しました。
* AvalancheGoで使用するディスク容量を一時的に倍増し、メモリとCPUの使用量を一時的に増加させます。
* このドキュメント全体を読んで、ノードが正常にマイグレーションし、マイグレーション中に健全なままであることを確認してください。質問に答えない場合は、[Discord](https://chat.avalabs.org/)サーブにアクセスし、ピン留めされたメッセージを読んで質問を検索してください。まだヘルプが必要な場合は、\#troubleshooting チャンネルに投稿してください。

## JP-JP-

[AvalancheGo v1.4.5 の](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)リリースをお知らせします。このリリースでは、AvalancheGo へのデータベース最適化と安定性向上を大幅に向上させます。

テストでは、下記のグラフに示すように、Mainnet バリデーターで読み取り/出力が最大 90% 減少しました。

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%283%29.png)

P-Chainにおける状態管理のリファクタリングやその他のデータベース最適化による改善点です。

JP-JP-これらの変更により、P-Chainの意思決定レイテンシーも大幅に改善されます。

このアップグレードにより、ブートストラップにかかる時間も大幅に短縮されます。

## アップグレードプロセス

もしコンピューターに既存のデータベースがある場合、AvalancheGo v1.4.5を実行すると、2つのノードが起動します。1つはv1.4.4を実行します。これは、"old" データベースバージョン \(v1.0.0\)を使用します。もう1つはv1.4.5を実行します。これは、AvalancheGo <=1.4.5\)でも同じままになります。

v1.4.4 ノードは通常どおりに実行され、以前と同じようにログが表示されます。ノードは、前と同じノードIDを使用してネットワークに接続し、バリデーターの場合、前と同様にコンセンサスに参加します。要するに、v1.4.4を実行する場合と同じように見えるはずです。

v1.4.5ノードはバックグラウンドで実行され、同じコンピュータで実行されているv1.4.4ノードからブートストラップします。これは、インターネット経由でデータを送信する必要がある通常のブートストラップ手順よりも少ない帯域幅を使用します。起動処理中に、v1.4.5ノードは「new」データベースを生成します。

v1.4.5ノードが起動すると、v1.4.4ノードが停止し、v1.4.5ノードが再起動します。v1.4.5 ノードが再起動すると、通常は "new" データベースを使用して実行し、マイグレーションを完了します。ノードは以前と同じノードIDを持っています。

`--plugin-dir`-JP-JPAvalancheGoをインストールするためにインストーラースクリプトを使用した場合、AvalancheGoサービスファイルからこのフラグを削除する必要があります。この[ノート](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script)を見てください。

## リソース使用法

マイグレーション中、両方のノードが実行されているとき、AvalancheGoは通常よりも多くのシステムリソースを消費します。

移行が完了すると、コンピューターに2つのブートストラップデータベースが存在します。コンピューターの空きディスク容量が完全に起動したデータベース \(~38 GB\)のサイズを超えることを確認してください。AvalancheGoにコンピューターに少なくとも200 GBのディスク容量を捧げることをお勧めします。AvalancheGoは現在その量のほんの一部しか使用していませんが、プルーニングソリューションを実装する前にディスクの使用量が増加すると予想しています。

両方のノードが実行されている間、メモリとCPUの使用量も上昇します。CPU >= 2GHzと>= 6 GBのRAMを持つコンピューターは、AvalancheGoで利用できる問題はありません。とはいえ、ノードを特に正常に動作するように、最初の数日間は注意深く監視する必要があります。

コンピューターのディスク容量が十分であるかどうかを確認する方法、および推奨のコンピューターよりスペックが低い場合にはどうすればよいかについては[FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq)を参照してください。

## ステップバイステップアップグレード手順

* **ノードには、これらの手順に従ってダウンタイムがありません。**
* **データベース、およびキーストアデータとバリデーターのアップタイムが自動的に移行されます。**

### 要件の確認

コンピューターが次の要件を満たしていることを確認します。

* CPU >= 2GHz
* RAM >= 6GB
* ハードドライブ: 現在_`$HOME/.avalanchego/db/mainnet/v1.0.0`_で占めているディスク容量の1.3倍以上が必要です。これは、約50 GBの空き容量があるはずです。そうでなければ、プログラムはデータベースをアップグレードすることはできません。AvalancheGoにコンピューターに少なくとも200 GBのディスク容量を捧げることをお勧めします。どのくらいの空き容量を確認するには、[現在使用可能なディスク容量を](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now)参照してください。
* 治療法は次のように見えます。
   * [コンピューターに十分なディスク容量がない場合はどうすればよいですか？](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
   * [コンピューターが2ノードを一度に実行できない場合はどうなりますか？](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### バックアップデータ

ノードのデータを[バックアップします。](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore)

ステーキングキー/証明書はデータベースにはありません。データベース移行によって**まったく影響を受けるべきで**はありません。それでも、ステーキングキー/証明書の[バックアップを取得](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore)することは良い方法です。

### 新バージョンをダウンロードする

新しいバージョンは、次のい**ずれか**の方法でダウンロードできます。

* [Installer Scripts](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade)で、_`./avalanchego-installer.sh`_を実行します。
* バイナリダウンロードでは、[こちら](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary)をご覧ください。
* ソースコードからのビルドについては、[こちら](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code)をご覧ください。

### JavaScript-JP-JP-

新しいバージョンを起動するには

* AvalancheGo を実行する場合、_`--plugin-dir`_ フラグが _`avalanchego.service`_ ファイルに存在しないことを確認してください。もし存在しない場合は、次の段落をスキップできます。それが存在する場合は、下記の手順に従ってそれを削除します。

   コンソールで、_`sudo nano /etc/systemd/system/avalanchego.service`_ コマンドを入力します。  _`ExecStart=`_ で始まる行を探し、次の部分を削除します。_`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ 次に、ctrl-x と y を押して変更を保存します。

   変更を適用するには、コマンドを実行します。  _`sudo systemctl daemon-reload`-JP_  最後に、次のようにノードを再起動します。  _`sudo systemctl restart avalanchego`-JP_

* バイナリーのダウンロードまたはソースコードからのビルドについては、[こちら](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche)をご覧ください。

### 進捗状況を監視する

Monitor and call-JP-JP-J

進捗状況を確認するには、次の手順を実行します。

* ディスク容量の使用状況を確認するコマンド

   _`-h $HOME/.avalanchego/db/mainnet`_

   v1.0.0とv1.4.5の両方のデータベースのサイズを示す結果を生成する必要があります。

* 新しいデータベースを生成するノードのログは、_`$HOME/.avalanchego/logs/fetch-only`_にあります。
* これらのメッセージは、データベース・マイグレーションが完了したことを示します。
   * _`「ノードバージョンをノーマル実行モードで起動する」が`_表示されると、新しい**データベース**が起動し、ノードが再起動します。
   * _`"keystore v1.0.0から v1.4.5 への移行完了" が`_****印刷された場合、keystore データは移行完了です。
   * _`"finished platform vm from database v1.0.0 v1.4.5 v1.4.5" が`_プリントされた場合、**バリデーターの**アップタイムがマイグレーションを終了します。

お使いのコンピュータによっては、アップグレードプロセスにはかなりの時間がかかる可能性があります。一部のバリデータでは、パワフルなコンピューターで30時間以上も経過したことがあります。それは主にコンピュータ上のストレージの種類に依存します。SSD-Basedの場合、12時間以内に完了する必要があります。HDD-Based システムでは、数日かかることがあります \(マイグレーションはほとんどランダムな読み書きと書き込みでHDDはそれらのタイプのワークロードではかなり遅いです)。ただし、ノードはダウンタイムなしでマイグレーション中に引き続き動作します。

ノードのバージョンを確認するには、`info.getNodeVersion` API \([Postman](https://docs.avax.network/build/tools/postman-avalanche-collection)\ のチュートリアル参照)を出力します。このバージョン番号は、移行完了後、どのバージョンに更新するかによって、>=1.4.7 となる必要があります。

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.7"
    },
    "id": 1
}
```

ノードの更新に関する詳細は[こちら](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node)をご覧ください。

## FAQ

### なぜ\[explorer\]は私のノードがv1.4.4にまだまだ存在していると言うのですか？

マイグレーション中、上記のように、v1.4.4ノードがコンピューター上で実行されます。ネットワーク上の他のノードは、マイグレーションが完了するまでv1.4.4を実行すると表示されます。

### データベース移行は必須ですか？

- そうですAvalancheGo < v1.4.5 を実行しているノードが動作しなくなりました。

### V1.4.4以外のバージョンからAvalancheGo 1.4.5にアップグレードすることはできますか？

はい、それは任意のバージョン < 1.4.5 から動作するはずです。

### コンピューターが2ノードを一度に実行できない場合はどうなりますか？

コンピュータ \(コンピュータ1\)がRAMが6GB未満の場合、2つのノードを一度に実行するのに十分なメモリがないため、マイグレーションを実行できない場合があります。RAMのノードには少なくとも6 GBのRAMがあります。

マイグレーションを実行できず、ノードがオフラインである時間を最小限に抑える場合は、次の操作を実行できます。

* 別のコンピュータ \(コンピュータ 2\)で AvalancheGo v1.4.5 を実行し、起動するまでAvalancheGo を停止します。
* コンピューター1でAvalancheGoを停止します。データベースディレクトリ _`$HOME/.avalanchego/db/`_ をコンピュータ2 \(データベースバージョン v1.4.5\)から同じ場所に移動します。その後、AvalancheGo v1.4.5にアップグレードして実行します。

**これは推奨されるアプローチで**はありません。ノードに6GB未満のRAMまたはディスク容量が不十分な場合にのみ実行してください。再び、ノードに少なくとも6 GBのRAMと200 GBのディスク容量があることをお勧めします。このアプローチは、keystore またはバリデーターの稼働時間データをマイグレートすることはありません。

### JP-JP-

AvalancheGoにコンピューターに少なくとも200 GBのディスク容量を捧げることをお勧めします。AvalancheGoは現在、その量のわずか数分の1 \(~38 GB\)しか使用していませんが、プルーニングソリューションを実装する前にディスクの使用量が増加すると予想しています。

### 現在どのくらいのディスク容量が利用可能ですか？

Mac OS または Linux 上のデータベースディレクトリで使用可能なディスク容量を確認するには、次の手順を実行します。

_`df -h $HOME/.avalanchego/db`_

この出力は、たとえば、609 GB のディスク容量が利用できることを示しています。

_`ファイルシステムサイズ Avail Use% on-JPにマウントさ`れた_

_`JP-JP-`_

### 新しいデータベースがブートストラップにどのくらいかかりますか？

約30時間かかることがあります。ただし、コンピュータによっては多かれ少なかれ時間がかかる場合があります。

### どのように私は、データベース移行が完了したことを知っていますか？

_`"ノード実行モードでノードを起動し始める"と`_表示されると、新しいデータベースが起動し、ノードが再起動します。

_`"keystore v1.0.0から v1.4.5 への移行完了" が`_印刷された場合、keystore データは移行完了です。

_`"finished platformvm from database v1.0.0 v1.4.5 v1.4.5" が`_プリントされた場合、バリデーターのアップタイムがマイグレーションを終了します。

### 古いデータベースを削除できますか？

新しいデータベースバージョンが起動すると、v1.4.5 ノードはデータベースマイグレーションを再起動し、完了します。この結果、古いデータベースディレクトリを削除できます。デフォルトでは以下のようにします。

_`JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`_

古いデータベース \(v1.0.0\) を削除する必要はありません。

### このマイグレーションは古いデータベースで何か変わりますか？

--** 旧データベース \(v1.0.0\) は変更されません。

**ただし、ノードが実行されている間にデータベースを変更することはありません。**

明らかにするには、新しいデータベースブートストラップの後に古いデータベースを削除したい場合:

* v1.4.5を新規データベースブートストラップとノードが再起動するまで実行します。
* Node を停止します。
* JavaScript-JP-JP-\)
* Node を起動します。

**また、古いデータベースを削除する前に、鍵ストア・データが正常に移行されていることを確認する必要があります。**

### バリデーターのアップタイムとキーストアデータは移行されますか？

はい、しかし注意すべきとして、AvalancheGo v1.4.5を実行する前に、ステーキングキー/証明書と鍵ストアデータを[バックアップ](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore)する必要があります。

### v1.4.5ノードのログをバックグラウンドで表示するにはどうすればよいですか？

これらのログはデフォルトでは、_`$HOME/.avalanchego/logs/fetch-only`_にあります。

### コンピューターに十分なディスク容量がない場合はどうすればよいですか？

ノードがクラウドで動作しない場合は、ノードのデータを[バックアップ](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore)し、より多くのディスク容量のマシンに移動し、AvalancheGoをそのマシンで実行する必要があります。

ノードがクラウド上で実行される場合は、クラウドプロバイダーから使用可能なディスク容量を増やす手順を取得します。JavaScript-JP-JP-

### 何か問題が発生した場合、どのように私は前のバージョンに戻ることができますか？

[こちら](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version)をご覧ください。このマイグレーションは、既存のデータベース内のデータを変更しません。新しいデータベースがそれと一緒に作成されます。AvalancheGo v1.4.5からv1.4.4に問題が発生し、ダウングレードが発生した場合、既存のデータベースが変更されていないため、ダウングレードは問題なくなるはずです。\(これは既存のデータベース\)を削除していないことを前提としています。

### 更新するとバリデータの稼働時間が減少しますか？

このドキュメントの指示に従えば、いいえ。 ノードは、バックグラウンドで新しいデータベースブートストラップを続けながらコンセンサスに参加します。バリデータベースからバリデータベースで再起動すると、クエリーに反応しないため、ブートストラップ中にオフラインでマークされます。したがって、それを避けることができれば、空のデータベースから再起動することはできません。

### 私はちょうど最初からブートストラップを再起動する必要がありますか？

- そうじゃないわノードがバリデーターである場合、その稼働時間が減少します。\(上記の答えを参照してください\)。ノードがバリデータではなく、既にブートストラップ済みの場合、空のデータベースから再起動するよりもデータベースを移行する方が速くなります。いずれの場合でも、既存のv1.0.0データベースを削除するのではなく、上記のようにマイグレーションを実行することをお勧めします。

### **マイグレーション/ブートストラップ中にノードがシャットオフしました。どうしたらいいですか?**

Nodeを再起動するだけです。移行は、それがオフの場所を拾います。AvalancheGo をサービスとして実行するように設定して、シャットダウン時に自動的に再起動することをお勧めします。

### 何か違うと思います。どうしたらいいですか?

まず、**この文書をよく読んでください。**どこかで質問に答えるかもしれません。答えが表示されない場合は、[Discord](https://chat.avalabs.org/)サーバーにアクセスして質問を検索してください。まだ質問されていない場合は、\#troubleshooting チャンネルに投稿してください。

### Orteliusを使用していますが、どのようにアップグレードできますか？

Orteliusを使用している場合は、以下の手順に従ってアップグレードしてください。

* Orteliusインスタンスを起動しておく。
* 新しいOrteliusインスタンスを別のコンピューターにインストールします。
* Ortelius インスタンスがブートストラップを完了したら、新しいインスタンスに切り替えます。
* Orteliusの古いインスタンスをシャットダウンします。

Orteliusのデプロイ方法は、[https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md) をご覧ください。

Ortelius リリースの1つに、Orteliusがノードの組み込みインデックスサーを使用する点があります。これにより安定性が向上し、Orteliusにトランザクションが不足していることを保証します。

### インストーラースクリプトでインストールされたノードの注意点

Node が[インストーラー・スクリプト](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer)でインストールされた場合、1.4.5にアップグレードした後、サービス定義ファイルを修正する必要があります。コンソールで、_`sudo nano /etc/systemd/system/avalanchego.service`_ コマンドを入力します。  _`ExecStart=`_ で始まる行を探し、次の部分を削除します。_`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ 次に、ctrl-x と y を押して変更を保存します。

変更を適用するには、コマンドを実行します。  _`sudo systemctl daemon-reload`-JP_  最後に、次のようにノードを再起動します。  _`sudo systemctl restart avalanchego`-JP_

