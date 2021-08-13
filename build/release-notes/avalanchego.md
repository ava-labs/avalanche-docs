# AvalancheGo リリースノート

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.4.12 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)

この更新は後方互換性があります。これはオプションですが、奨励されています。

**X-Chain-JP**

* JSON 引数を返す API メソッド `GetTx` に `"json"` を追加しました。これは、クエリーされたトランザクションの JSON 表現を返します。
* インターフェイス型のアサーションを追加

**Info API**

* Info APIクライアントに`GetNodeVersion`メソッドを追加しました。

**Prometheus Metrics（プロメテウス）**

* 圧縮によりバイトが送信されないため、メトリックと名前変更が行われた
* 圧縮により受信していないバイトメトリクスを追加しました。
* `メトリックパッケージ`にヘルパー構造体 `noAverager` を追加しました。

**JPD-JPD-JP**

* 更新/追加されたベンチマーク

**JP-JP-**

* `Put` and `Remove` with `Apply`で置き換えて、将来の原子トランザクションの最適化を可能にします。

## v1.4.11 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)

**C-Chain-Chain-JP**

このリリースでは、デフォルトでスナップショットを有効にします。

**Config フラグ**

_JavaScript-JP-JP-_

* `conn-meter-reset-duration-JP`
* `conn-meter-max-conns-JP-JP-J`

_JP-JP-_

* `network-compression-enabled-JP-JP-J`

**Prometheus Metrics（プロメテウス）**

Prometheusの多くのメトリックは名前を変更し、多くのヒストグラムは2つのゲージに置き換えられた。Grafana Dashboardsの更新は[こちら](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)をご覧ください。

このリリースでは、`utils/metric`パッケージにヘルパーメソッドも追加されます。

**RocksDB**

RocksDBはビルドスクリプトを実行するときにデフォルトでビルドされなくなり、公開されたバイナリには含まれません。AvalancheGo を RocksDB でビルドするには、端末で `ROCKSDBALLOWED=1 を`エクスポートし、`scripts/build.sh` を実行します。`--db-type=rocksdb` を使う前にこれを行う必要があります。

RocksDB データベースでは、サブディレクトリ `rocksdb` 内のファイルを検索/検索するようになりました。RocksDBで以前に実行した場合は、既存のファイルを移動する必要があります。

**メッセージの圧縮**

Nodes は P2P メッセージを圧縮するようになりました。PEAR_PEAR_PEARこれによりAvalancheGoの帯域幅の使用量が減少します。

**Inbound Connection Throttling** インバウンド接続レート制限をリファクタリングし、デフォルトで有効にします。

**一般的な改善点**

* gRPCがプラグインに提供するデータベース上の反復のパフォーマンスを改善しました。
* Linux では、AvalancheGo が不正に死亡した場合に C-Chain をクリーンアップします。
* P2Pメッセージ定義をリファクタリングし、`ネットワークパッケージ`から移動します。
* HTTP API サーバーにVMエイリアスを追加しました。
* `1024`を`units.KiB`などに置き換えました。
* 対応するクエリの作成順にチットを処理することでパーティション許容度を改善しました。

**JP-JP-**

Fuji TestnetのブートストラップIPを更新しました。

## v1.4.10 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)

**Apricot Phase 2 - パッチ10**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。{% endhint %}

パッチには、パフォーマンス、スロットリング、VMの改善が含まれています。

* サポートされているアーキテクチャーで`LevelDB`ではなく`RocksDB`を使用するようにサポートしました。
* PEAR ノードの帯域幅の使用を制限するために、再構成されたインバウンドネットワーク・スロットリングをノードごとに設定します。
* SP-JP-JP-
* C-chainの`プルーニング可能`フラグのデフォルト値を`true`に更新しました。
* RPC 経由でカスタム VM の登録を可能にしました。
* Blockchainのステータスを更新し、検証ステータスを報告します。
* `TimestampVM`を独自のリポジトリに移動し、VM作成パスを一致させる。
* `grpc` ファイルを正しい場所に配置するようにprotobuf code-gen スクリプトを修正しました。
* `rpcchainvm#Block.Verify` によりブロックバイトを渡し、キャッシュのエビジョン検証の失敗を避けることができます。

## v1.4.9 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)

**Apricot Phase 2 - パッチ9**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。{% endhint %}

パッチには、パフォーマンス改善とモニタリング改善が含まれています。

* C-chainをプルーニングが有効にした状態で実行できるようにサポートしました。Pruningは現在デフォルトで無効になっています。
* C-chain Websocket ping間隔を削減し、ロードバランサーの後ろに切断を削減しました。
* snowman Blockインターフェイスにタイムスタンプを追加しました。
* C-chain API max duration on the value of the value of the value of the value of the value of the value of the value of the value of the
* gzip ヘッダーのサポートを追加しました。
* `info.getNodeVersion` エンドポイントに追加のバージョン説明を追加しました。
* Node バージョン >= 1.4.5 への接続を制限しました。
* Primary log フォルダーの下にデーモンログを移動しました。
* Derministic Sampling のサポートを追加しました。
* 新しいタグの自動デプロイメントGitHubアクションを追加しました。
* コンフィグ管理をリファクター化し、ノードの起動をプログラム的にサポートする機能を向上しました。

## v1.4.8 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)

**Apricot Phase 2 - パッチ8**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。{% endhint %}

パッチには、パフォーマンス改善、モニタリング改善、およびサブネット修正が含まれています。

* AVMの手数料定義を変更して、チェーンのネイティブアセットで支払われる手数料を強制します。これはX-Chainの動作を変えることはありませんが、他のAVMインスタンスを利用できます。
* 特定のチェーンにconfigsを指定する機能を追加しました。`Coreth-config` CLI パラメーターを廃止します。
* 新しいアウトバウンド接続数に制限するレートが追加されました。
* VMラッパーを導入しました。
* ノードプロファイリングを有効にする機能を追加しました。
* JavaScript-JP-JP-
* Gossipパラメーターのチューニング用にさまざまなCLIパラメータを追加しました。
* JavaScript-JP-JP-
* 誤ったスプリアス警告を削除しました。
* CIテストを移動して、Travis で実行するのではなくGithub Actionsで実行するようにしました。
* VMインターフェイスから特別なケースを削除しました。

**コマンドライン引数を追加しました:**

* `--`
* `--`
* `--`
* `--`
* `chain-config-dir-JP`
* `bootstrap-multiput-max-containers-received-JP-JP-JP-`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors-JP-JP-J`
* `consensus-on-accept-gossip-size-JP-JP-`
* `consensus-accepted-frontier-gossip-size-JP-JP-`
* `meter-vms-enabled-JP-JP`
* `staking-ephemeral-cert-enabled-JP-JP-J`
* `outbound-connection-timeout-JP`
* `outbound-connection-throttling-rps-JP`

## v1.4.7 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)

**Apricot Phase 2 - パッチ7**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。パッチにはパフォーマンス改善とバグ修正が含まれています。{% endhint %}

以前にインストールされたノードバージョンが<= v1.4.4.4ならば、このノードはブロックの処理を停止した可能性があります。この更新により、ノードを修復し、データベースマイグレーションを実行します。データベースマイグレーションに関する詳細は[、v1.4.5](avalanchego-v1.4.5-database-migration.md) データベースマイグレーションノートを参照してください。以前にインストールされたノードバージョンが>=v1.4.5である場合、このノードは既存のデータベースを使用し、データベースマイグレーションを実行する必要はありません。

* P-chain ブロック `SHraz7TtMfTQ5DX1rREhNZW1bi7PppzAq7xoJAwrWNQrLhQcD` を正しく確認するように、移行前のノードを修正しました。
* `platformvm.GetBlockchains` で、プライマリのサブネットブロックチェーンを正しく返すように修正しました。
* grpc バージョンを v1.37 に更新しました。
* PEERLISTサンプリングを最適化しました。
* データベースベンチマークを追加しました。
* さまざまな繰り返しメモリ割り当てを削減しました。

## v1.4.6 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)

**Apricot Phase 2 - パッチ6**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。このパッチには、パフォーマンス改善とバグ修正が含まれています。{% endhint %}

**以前にインストールされたノードバージョンが&lt;= v1.4.4 である場合、このノードはデータベースマイグレーションを実行します。データベース移行の詳細については、v1.4.5 リリースノートをご覧ください。**以前にインストールされたノードバージョンがv1.4.5である場合、このノードは既存のデータベースを使用し、データベースマイグレーションを実行する必要はありません。

このパッチ:

* P-chain mempoolに無効なトランザクション発行を削除し、持続的なDB書き込みを引き起こしました。
* database ディレクトリ内の非データベースファイルとフォルダを無視しました。JavaScript-JP-JP-JavaScript-JP-JP-
* build-dir フラグを CLI 経由で指定できるようにしました。
* node-manager デーモンでサポートされなくなった plugin-dir フラグを削除しました。通常、フラグを指定しないと正しい動作に繋がります。しかし、複雑なインストールでは、build-dirフラグが必要です。
* PEAR ハンドシェイクを終了した接続のみにメッセージをゴシッピングする。
* コンセンサストラバースとブートストラップ時のメモリ割り当てを削減しました。

## v1.4.5 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)

**Apricot Phase 2 - Patch 5 - DB Upgrade**

**このアップグレードは、一般的なバージョンのアップデートよりも多く関与しています。JavaScript**[**-JP-JP-**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)****

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。このパッチには、パフォーマンス改善や多数の更新プログラムが含まれています。{% endhint %}

**VMの改善:**

* `platformvm`の状態管理を完全に再設計しました。
   * `variousdbs` の使用法を削除し、再解析オブジェクトなしで修正および読み取り可能な状態参照を渡すためにブロックを渡しました。
   * 基礎のデータベースに適切にキャッシュし、mange 書き込みを行うためのベースステートマネージャを実装しました。
   * CoWバリデータセットを実装し、複数のバリデータセットをメモリにキャッシュできるようにしました。
   * 未使用の状態オブジェクトに触れることを避けるために、サブネットでチェーンにインデックスされた。
   * `addDelegator`と`addSubnetValidator`トランザクションの受け入れ中に不要な反復を避けるために、`nodeID`でバリデーターをインデックスしました。
   * バリデータセットとバリデータの稼働時間の管理に専念したキーと値のペアの数を減らしました。
* 報酬のインデックス作成をサポートするために`platformvm`のAPIにリワード検索を追加しました。
* テストを簡素化するために、バリデーターの稼働時間計測をリファクタライズしました。
* `platformvm` にブロックとトランザクション型メトリクスを追加しました。
* `avm`と`platformvm`にAPIコールメトリクスを追加しました。
* `avm`の状態管理を更新し、`prefixdb`sを使用し、キャッシュメトリックを記録し、プラットフォームvmと追加のコードを共有します`。`
* `avm`および`platformvm`での`UTXO`管理とインデックス作成を簡素化しました。
* 再構成されたアドレス解析と管理は、互換性のあるVMインスタンス間で完全に共有されます。
* VMインスタンス間で完全に共有されるプライマリサブネットの共有メモリーを再構成しました。
* 既存のVM実装に対するシームレスなキャッシュをサポートし、新しいVMの実装を簡素化するためのチェーン状態の実装を追加しました。
* 新しいチェーンステートマネージャーを`rpcchainvm`に統合し、さまざまなメトリクスも追加します。
* 将来のネットワークアップグレードをより良いサポートするために、標準VMインターフェイスに`upgradeBytes` と `configBytes` を追加しました。
* `evm` API に `getAtomicTx` と `getAtomicTxStatus` エンドポイントを追加しました。
* `EVM`ブロック生産を簡素化してコンセンサスエンジンと同期的に実行します。
* anomic transaction mempool を追加しました。
* `evm`クライアントで、getAtomicUTXOで`sourceChain`を適切に設定するバグを修正`しました。`
* ブロック管理をより良く最適化するために、新しいチェーンステートマネージャーを`evm`に統合しました。

**ブートストラップの改善:**

* 起動時に再トラバーサルを削除しました。これにより、ブートストラッププロセスの再起動時のノードのパフォーマンスが大幅に向上します。
* 起動コンテナの実行中にノードを終了しようとするときに、非graceful ノードシャットダウンを修正しました。
* 起動時にIPCコンテナのブロードキャストが重複する問題を修正しました。
* Jobs-JP`-`JP
* 追加のブートストラップキャッシュとキャッシュメトリクスを追加しました。

**データベースマイグレーション追加:**

* 更新されたデータベースフォーマットにシームレスに移行するデーモンプロセスマネージャを追加しました。
* データベースセマンティックバージョンを追跡するためのバージョン処理をリファクタライズしました。
* 異なるデータベースバージョンを追跡し操作するためのデータベースマネージャを実装しました。
* `v1.0.0` データベースから `v1.4.5` データベースにユーザーを自動的にコピーする`キーストア`・マイグレーションを実装しました。
* `v1.0.0` データベースから `v1.4.5` データベースへのバリデーターの稼働時間マイグレーションを実装しました。

**ノードの改善:**

* 環境変数を常に展開するために、コンフィグパースが更新されます。
* ノード設定をリファクタリングし、ディスクに触れずにメモリにTLS証明書を指定できるようにしました。
* JavaScript-JP-JP-
* `HTTP`と`ステーキングサーバー`のリスニングアドレスを表示し、非特定のポートマッピングをサポートするのに役立つようにしました。
* `バージョン管理可能`なデータベースを実装し、パススルーデータベースと`バージョン管理済みの`データベース間を切り替えることができます。
* Optimized ID 事前割り当てを`設定`し、`構造体`のメモリ使用量を削減しました。
* 強制的により厳しいLINTINGルール.

**コマンドライン引数を変更しました:**

次の引数について `"default"` は以前はキーワードとして扱われていました。これで、`"default"` はフラグの意図した値として扱われようとします。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

* `config-file-JP-JP-J`
* `coreth-config-JP`
* `plugin-dir-JP`
* `-tls-key-file-JP-JP-`
* `-tls-cert-file-JP-JP-`
* `bootstrap-ips-JP-PP-P-`
* `bootstrap-ids-JP-PRESS-JP-PRESS-JP-P`
* `ipcs-path-JP`
* `--`

次の引数について、`""` は以前はキーワードとして扱われていました。これで、`""` はフラグの意図した値として扱われます。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

* `ipcs-chain-ids-JP-JP-J`
* `log-dir-JP`
* `log-display-level-JP`

`bootstrap-ips` と `bootstrap-ids` のペアリングは不要です。これは、`bootstrap-ids` とは異なる `bootstrap-ips` を指定するのに有効なことを意味します。`bootstrap-ips` は最初にネットワークに接続するために使用され、`bootstrap-ids は bootstrap-ids` として使用されます。

**コマンドライン引数を追加しました:**

* `fetch-only-JP-JP-J`
* `--`

**コマンドライン引数を削除しました:**

* `xput-server-port-JP`
* `xput-server-enabled-JP-JP`

## v1.4.4 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)

**Apricot Phase 2 - パッチ4**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。{% endhint %}

このパッチには、今後の`db-upgrade`リリースの最適化を目的としたバグ修正とパフォーマンス改善が含まれています。

* --
* 他のチェーンが同期するのを待ちながらメッセージを処理するように、ブートストラップ時のメッセージ処理を改善しました。
* 既存のサンプラーを再利用することで、サンプラーの割り当てを削減しました。
* docker スクリプトを更新し、`マスターブランチ`から画像をプッシュするだけです。
* ログの書式設定を修正しました。
* エラーメッセージを改善しました。

## v1.4.3 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)

**Apricot Phase 2 - パッチ3**

{% ヒント スタイル="warning" %}この更新は後方互換性があります。これはオプションですが、奨励されています。{% endhint %}

このパッチにはバグ修正、更新された稼働時間の監視、およびパフォーマンス改善が含まれています。

* 起動時にノードが進行できない可能性があるベンチメッセージ処理を修正しました。これは通常、起動処理が終わったときにノードが通常の実行に移行できなかったときに経験されます。
* C-Chainコードベースで不明なバグを修正しました。トランザクションブロードキャストリクエストをたくさん受け取ったノードが別のノードで生成されたブロックを処理するまでブロックの生成を一時的に停止する可能性があります。
* PEAR_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PRIVE_PR
* Apricot Phase 2 で非推奨化されたレガシーハンドシェイクメッセージを削除しました。
* マークされたノードは、稼働時間計算のためにオフラインであるようにベンチされています。
* バリデータセットの変更時に、バリデータセットをよりパフォーマンスにアップデートしました。
* ネットワーキングを更新し、現在バリデーターである場合にのみ、切断時にピアに再接続しようとします。

## v1.4.2 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)

**Apricot Phase 2 - パッチ2**

{% ヒント スタイル="warning" %}このアップデートは、v1.4.0およびv1.4.1と後方互換性があります。JPJ-JP-JP{% endhint %}

さらにパッチは、peerlist メッセージのサイズを減らし、いくつかの新しいフラグを導入します:

* `network-peer-list-size` では、各`ピアリストメッセージ`にゴシップされたピア数を調整できます。
* `network-peer-list-gossip-size`では、ピアー数を gossip-`peerlist` メッセージに調整できます。
* `network-peer-list-gossip-frequency`では`、ピアリスト`のゴシップ頻度を調整できます。

## v1.4.1 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)

**Apricot Phase 2 - パッチ1**

{% ヒント スタイル="warning" %}このアップデートはv1.4.0と後方互換性があります。v1.4.0 リリースで予想される更新時間をご覧ください。{% endhint %}

このパッチは、gossiped peerlist メッセージのサイズを減らし、ビーコン接続のタイムアウトを起動時に設定できるようにする新しいフラグ`--bootstrap-beacon-connection-timeout` を導入します。

## v1.4.0 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)

**アプリコットフェーズ2**

{% ヒント スタイル="danger" %}**この変更は、以前のリリースと後方互換性がありませんのでご注意ください。**

**関連するブログ記事はこちらからご覧いただけます。**[****](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)****{% endhint %}

{% ヒント スタイル="warning" %}このアップグレードでは、Ethereum BerlinのアップグレードがC-chainに適用され、AVMエンドポイントが追加され、さまざまな安定性が向上しました。私たちは、コミュニティの皆さんに、ノードが健全であることを保証するために、できるだけ早く更新することを強く求めています。

JPJ-JP-JP{% endhint %}

**このアップグレードに必要な主要なコンポーネントは次のとおりです。**

* Corethを更新しました。 go-ethereum v1.10.2 に依存するようにしました。
* Ethereum Berlinのアップグレードを適用しました。[EIP-2565](https://eips.ethereum.org/EIPS/eip-2565)、[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)、[EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)、[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)。
* ANT-Chainに新しいステートフルコンパイル済みスマートコントラクトを追加し、ANT-CLASS-20周辺のARC-20ラッパーをサポートしました。
* アドレスフィルターに一致するトランザクションのWebsocket通知をサポートするAVM `/events`エンドポイントを追加しました。
* 2つの新しいネットワーキングメッセージの種類を追加しました。 `SignedVersion` と `SignedPeerlist` を追加し、バリデータ-> IP マッピングを改善しました。
* チェーンが起動時にノードをシャットダウンすると、チェーンが不正にシャットダウンする可能性があるバグを修正しました。
* プラグインgRPCパッケージを更新し、安定性を向上させるために大規模なリクエストをページネートしました。
* avalanchegoのメインバイナリをプラグインとして実行する機能を追加しました。
* leveldbの腐敗保護におけるレース条件を修正しました。
* 複数のアーキテクチャをより良くサポートするために、自動化されたビルドスクリプトを更新しました。

**コマンドライン引数を追加しました:**

* `plugin-mode-enabled`-enabled は、プラグインモードで実行するバイナリを指定します。

**コマンドライン引数を削除しました:**

* `p2p-tls-enabled-JP-JP`
* `disconnected-check-frequency-JP-JP-JP-J`
* `disconnected-rest-timeout-JP`
* `restart-on-disconnected-on-disconnected-JP`

## v1.3.2 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)

**Apricot Phase 1 - パッチ2**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。これはオプションですが、奨励されています。このパッチには、セキュリティの改善、バグ修正、モニタリングの改善が含まれています。{% endhint %}

**セキュリティの改善**

* `Apricot Phase 1` より前に作成された C-chain ブロックの厳格な正規形式を強制しました。これにより、`エクストラデータブロック`のフィールドを変更すると、ブートストラップ時にチェーン状態を変更することができません。
* avalanchego とプラグインプロセス間でIPCを通じて暗号化された値のみを送信できるように`Keystore`を変更しました。

**バグ修正:**

* デリゲーターを削除する前に、現在のデリゲージの最大値を更新するようにデリゲーションキャップの計算を修正しました。これにより、デリジェッションキャップが常に強制されるようになります。
* `AVM`の静的APIを起動時に正しく登録するように修正しました。
* ノードの`稼働時間`計算を更新して、ネットワークアップグレードを考慮に入れました。

**モニタリングの改善**

* チェーンで受け入れられた操作のローカル一貫した順序を提供できるオプションのノードインデクサを追加しました。
* ansible インベントリーを更新し、多数の改善点を加えるようにしました \(@moreati\ さんに感謝します)。

## v1.3.1 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)

**Apricot Phase 1 - パッチ1**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。これはオプションですが、奨励されています。このパッチには、安定性、モニタリングの改善、およびマイナーなバグ修正が含まれています。{% endhint %}

**このアップグレードに必要な主要なコンポーネントは次のとおりです。**

* arm64 CPUで圧縮を実行する際にC-chainセグフォルトを修正しました。
* 複雑なノード監視を有効にするために、ローカルファイルにグループアクセス許可を追加しました。
* api-auth-password-file フラグを通じて渡された Auth パスワードから空白の空白を除去しました。
* TimeSinceNoOutstandingRequests-JP-JP-J
* ネットワークスロットリングに追加のメトリクスを追加しました。
* さまざまなコードクリーンアップ

**コマンドライン引数を追加しました:**

* `network-health-max-outstanding-request-Duration-JP`

**コマンドライン引数を削除しました:**

* `network-health-max-time-since-no-requests-JP-JP`

## v1.3.0 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)

**アプリコットフェーズ1**

{% ヒント スタイル="danger" %}この変更は、以前のリリースと後方互換性がありませんのでご注意ください。

このアップグレードでは、C-chainガス料金を削減し、C-chainガス払い戻しを取り除くほか、さまざまなセキュリティ改善が含まれています。私たちは、コミュニティの皆さんに、ノードが健全であることを保証するために、できるだけ早く更新することを強く求めています。{% endhint %}

JPJ-JP-JP

**このアップグレードに必要な主要なコンポーネントは次のとおりです。**

* C-チェーンガスコストを470nAVAXから225nAVAXに削減しました。
* C-チェーンガス払い戻しを廃止しました。この変更は[EIP-3298](https://eips.ethereum.org/EIPS/eip-3298)を採用しています。
* C-chain認証を改良した場合、ネットワークアップグレードを実行する際にクリーンなものにしました。
* Auth API を修正しました。 取り消されたトークンを適切に実施するようにしました。
* Auth API を強化し、期待される署名フォーマットが使用されることを保証します。
* CLI 引数から Auth API のパスワードを削除しました。
* より厳格なファイルアクセス許可チェックを追加しました。
* いくつかのマイナーなエラー処理を追加しました。
* Sanitized logは、ディスクに書き込む前に書き込んでいます。
* HTTP エンドポイントに設定可能なオリジンが追加されました。
* HTTP を HTTP フェイルオーバーに試みたことがなくなりました。これで、HTTP エンドポイントをHTTPsにアップグレードするのに失敗した場合、ノードは起動時に閉じられます。

**コマンドライン引数を追加しました:**

* `api-auth-password-file` は Auth API のパスワードを読み込むファイルを指定します。

**コマンドライン引数を削除しました:**

* `api-auth-password-password-JP`

## **v1.2.4 \(**[**GitHub\で表示)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)****

**Apricot Phase 0 - アップグレード1 - パッチ4**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。これはオプションですが、奨励されています。パッチには、安定性とモニタリングの改善が含まれています。{% endhint %}

* readmeを更新し、ストレージ要件を修正しました。
* 起動時にAvalanche Tx検証にエラー処理を追加しました。
* ノードのヘルスとデータベースの使用状況に関連する数多くの新しいメトリックの追加、未使用のメトリックと無効なメトリックの削除、およびいくつかのメトリック名の修正など、多数のメトリックを更新しました。
* CIに追加のログを追加しました。
* C-chainをクリティカルチェーンのリストに追加しました。

## **v1.2.3 \(**[**GitHub\で表示)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)****

**Apricot Phase 0 - アップグレード1 - パッチ3**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。これはオプションですが、奨励されています。パッチには、安定性とモニタリングの改善が含まれています。{% endhint %}

* `[network, router, consensus]` ヘルスチェックパラメータを調整し、フレーキーなヘルスチェックを削除しました。
* C-chainブロックの取り扱いを簡素化しました。

## **v1.2.2 \(**[**GitHub\で表示)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)****

**Apricot Phase 0 - アップグレード1 - パッチ2**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。これはオプションですが、奨励されています。パッチには、安定性、パフォーマンス、およびモニタリングの改善が含まれています。{% endhint %}

* Network ライブラリに IP エイリアスが追加され、`SYN` 呼び出しを繰り返すことを避けました。
* 自分からブートストラップ時にメッセージ処理を修正しました。
* `AdvanceTimeTx`の発行を簡素化しました。
* 新しいコンセンサスヘルスチェックを追加しました。
* ノードヘルスロギングの追加
* ヘルス`GET`リクエストにヘルスレスポンスを追加しました。
* 着信メッセージログを統合しました。
* `LevelDB` ラッパーにエラーロギングを追加しました。
* `rpcdb`にエラーコードを追加し、文字列の解析を避ける。
* C-chainのC-chain処理を改善し、再構成回数を減らしました。
* `pending` ブロックで実行されたモックコールの C-chain 処理を改善しました。

## **v1.2.1 \(**[**GitHub\で表示)**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)****

**Apricot Phase 0 - アップグレード1 - パッチ1**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。これはオプションですが、奨励されています。パッチには、安定性、パフォーマンス、およびモニタリングの改善が含まれています。

この更新では、\`network-timeout-rempean-rempean-rempean-jp-JP-JP-{% endhint %}

変更の概要:

* \`UTXO\`sを\`platformvm.getStake\`レスポンスに追加しました。
* \`info.peers\` レスポンスにベンチリストレポートが追加されました。
* ネットワーキングレイヤーに追加のヘルスチェックを追加しました。
* --
* ハイスループットの時でもノードが現在のチップに追いついたことを確認するために、ブートストラップ再起動ロジックを追加しました。
* --
* 不要な計算を避けるために、rejected blocksの検証を防ぎました。
* Network への非好ましくないブロックのゴシップを削除しました。
* ネットワークタイムアウト電卓を、観察されたネットワークレイテンシーのEWMAを使用するように切り替えました。
* Network-JP-JP-
* Benchlistingアルゴリズムをクリーンアップしました。
* 送信時にドロップしたメッセージの処理をクリーンアップしました。
* --
* プロファイル名のプレフィックスを許可するように、一般化されたパフォーマンストラッキング。
* Avalancheブートストラップトラバーサルに追加のキャッシュを追加しました。
* ansible lintingを修正しました。
* 追加されたコマンドライン引数は、主にヘルスチェックの構成で構成されています。さらに、ネットワークレイテンシーの計算を変更した結果、いくつかのコマンドラインargsの名前を変更しました。

コマンドライン引数を追加しました:

* Network-timeout-halffear-Halflywear-HALFIME-PARK-
* Network-timeout-cofeficient-JP-JP-
* Network-health-min-conn-peers-JP-JP
* JavaScript-JP-JP-
* --
* --
* JavaScript-JP-JP-
* --
* --
* --
* JavaScript-JP-JP-
* --
* \`bootstrap-retry-enabled-enabled-enabled-\``
* --

コマンドライン引数を削除しました:

* Network-timeout-access-in-manager-JP-JP-J
* Network-timeout-reduction-Reduction-JP

## v1.2.0 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/tree/v1.2.0)

**Apricot Phase 0 - アップグレード1**

{% ヒント スタイル="danger" %}**このパッチは、以前のリリースと後方互換性がありませんのでご注意ください。このアップグレードでは、X、C、およびPチェーン間の交換に関するパフォーマンス上の問題を修正します。私たちは、コミュニティの皆さんに、ノードに影響を受けないようにするために、できるだけ早くアップグレードすることを強くお勧めします。また、ノードはアップグレード後に接続するのに数分かかる場合があり、プロセスは中断されない完了を許可する必要があります。**{% endhint %}

このアップグレードに必要な主要なコンポーネントは次のとおりです。

* C-Chainでのアトミックインポート検証を修正しました。
* Amomic Bonus Blocksを許可するルール例外ロジックを追加
* 重複した削除が発行された場合に共有メモリにフェイルファストロジックを追加
* ポーリングがスノーマンで消去するリクエストが失敗した問題を修正しました。
* 未知の祖先によるCorethでのBAD BLOCKの問題を修正しました。
* coreth で修正されたcanonicalchainスクリプトでのレース条件を修正しました。
* Snowmanの処理ブロック数とAvalancheのtxsの処理数
* ネットワーキングタイムアウトデフォルト値とベンチリスト設定を更新しました。
* 初期のネットワーク不安定化後、安全性に違反していないことを確認しました。

## v1.1.5 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/tree/v1.1.5)

**Apricot Phase 0 - パッチ5**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。--パッチには安定性向上が含まれています。{% endhint %}

* P-chainと http\(s\) エンドポイントがブロックされる可能性がある新しいチェーンを登録するときに、潜在的なデッドロックを修正しました。
* TxID -> C-チェーン内のブロック高さのインデックスを修正します。
* C-chainのdebug\_traceTransaction API で空のコントラクトデプロイメントの優雅な処理を追加しました。
* C-chainでのエラー処理を改善しました。

## v1.1.4 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/tree/v1.1.4)

**Apricot Phase 0 - パッチ4**

{% ヒント スタイル="danger" %}この更新は後方互換性があります。--このパッチには、CLIのアップグレード、APIのバグ修正、安定性向上、およびパフォーマンス改善が含まれています。{% endhint %}

* C-chainブロックインデックスが、指定された高さで受け入れられないブロックにマッピングできる問題を修正しました。
* RPCChainVMがAPIロード時にVMがクラッシュする問題を修正しました。
* Avalanche Engine で楽観的な投票がバブルリングされる問題を修正しました。
* AVMのGetBalanceおよびGetAllBalances APIメソッドに IncludePartial を追加しました。これにより、既定の動作を変更して、使用可能なアセットと一意の所有アセットの残高のみを返します。
* カスタムネットワークIDのカスタムジェネシス設定を指定できる機能を追加しました。
* IPC API機能を追加しました。
* RPCChainVMに追加のキャッシュを追加しました。
* プラグインディレクトリルックアップを改善しました。

## v1.1.3 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/tree/v1.1.3)

**Apricot Phase 0 - パッチ3**

{% ヒント スタイル="danger" %}この更新はオプションですが、推奨されます。このパッチには、APIに関するマイナーなバグ修正が含まれています。{% endhint %}

* C-chainログをフィルターしようとするときのハンギングコールを修正しました。
* C-chainクライアントが適切なマルチコインAPIを呼び出すように修正しました。
* `avm`と`platformvm` APIクライアントに`getAtomicUTXOを`追加しました。

## v1.1.2 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)

**Apricot Phase 0 - パッチ2**

{% ヒント スタイル="danger" %}この更新はオプションですが、推奨されます。このパッチにはバグ修正とパフォーマンス改善が含まれています。{% endhint %}

* Avalancheの起動時に複製トラバースが減少するように、処理キャッシュを起動する問題を修正しました。
* P-Chain認証をブートストラップ時に最適化しました。
* 適切な入力値を使用するように最大ベンチリストの計算を修正しました。
* CIから余分なLinterの実行を削除しました。
* `Snowman.Block`インターフェイスに`Height`を追加しました。

## v1.1.1 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)

**Apricot Phase 0 - パッチ1**

{% ヒント スタイル="danger" %}この更新はオプションですが、推奨されます。このパッチにはバグ修正とパフォーマンス改善が含まれています。{% endhint %}

* `Health` APIを無効にしたときにノードがクラッシュするバグを修正しました。
* アップタイムトラッキングでノードのアップタイムが報告されるバグを修正しました。
* `Codec`を使用するようにリファクタライド頂点パース
* ステートフルとステートレスな頂点管理を分離しました。
* Codecにフィールドごとのスライス長さのチェックを追加しました。
* `TypeID` をグループ化する新しいコーデック型を導入しました。
* CLI へのメッセージ制限フラグを導入しました。
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java
* Epoch トラッキングをチェーンコンテキストに追加しました。
* トランザクション検証中に返されるエラーメッセージの一部を改善しました。
* GC 圧力が低下しました。

## v1.1.0 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)

**アプリコットフェーズ0**

{% ヒント スタイル="danger" %}**このアップグレードは、以前のリリースと後方互換性がありませんのでご注意ください。アップグレードは12月7日(月)午後11時(JST\)までに実行する必要があります。12月中旬頃に予定されたアップグレードは、現在、重要なトークンのバグのロック解除を修正するために迅速に実行されています。私たちは、コミュニティの皆さんに、ノードに影響を受けないようにするために、できるだけ早くアップグレードすることを強くお勧めします。**{% endhint %}

このアップグレードには2つの主要なコンポーネントがあります。

* Apricot Phase Zero Upgradeという今後のApricotネットワークアップグレードに向けた一般的な準備
* ロックされた出力がロックされた後、ロックされた出力がロックされないようにする問題を修正しました。

## v1.0.6 [\(GitHub\で表示)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)

{% ヒント スタイル="danger" %}このリリースには、[ここで](https://docs.avax.network/build/apis/deprecated-api-calls)説明する破損の変更点が含まれています。platform.getTxStatus と platform.getCurrentValidators のデフォルトのレスポンスフォーマットを変更します。更新はオプションですが、奨励されています。パッチには、パフォーマンス改善と生活の質の向上が含まれています。{% endhint %}

* platform.getTxStatus と platform.getCurrentValidators の非推奨フォーマットを削除しました。
* keystore API からインポートおよびエクスポートされたユーザーの 16 進数エンコーディングをサポートしました。
* golang requirements を v1.15.5 に設定して、golang 標準 lib にある DoS 脆弱性が見つかるようにします。
* APIクライアントを追加しました。
* ノードがネットワークの他の部分から切断された場合に起動時に戻るようにしました。
* UTXOが複数のアドレスを参照したときにGetUTXOs APIを修正しました。
* RPC オプションをより一般化するために、バイナリエンコーディングをリファクタリングしました。
* IPブロックのフィルタリングを修正しました。ウィンドウ長を正しく設定するようにしました。
* 複数のコーデックをさまざまなバージョンで管理できるように、コーデックパッケージを一般化しました。
* VertexインターフェイスにEpochを追加しました。
* CPU/メモリ使用率を低減するトランザクションハッシュを遅延させてください。
* [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/) を使用している方は、URL は将来のリリースでシャットダウンされます。[JPJ-PJ-PJ](https://explorerapi.avax.network/)

このアップデートに関するサポートについては、[Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) を参照してください。それでも問題が発生している場合は、[Discord](https://chat.avax.network/) に参加してヘルプをしてください。

## v1.0.5 [\(GitHub\で表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

{% ヒント スタイル="danger" %}このリリース以降のv1.0.6には、[ここで](https://docs.avax.network/build/apis/deprecated-api-calls)説明する改良点が含まれています。`platform.getTxStatus` と `platform.getCurrentValidators` の応答形式は変更されます。{% endhint %}

今回のリリースでは、v1.0.5の変更点は、以前のリリースと後方互換性があります。更新はオプションですが、奨励されています。パッチには、パフォーマンス改善と生活の質の向上が含まれています。

* C-chain APIに`IssueTx`と`GetUTXO`を追加し、ノードに秘密鍵を明らかにせずにアトミックスワップを発行できるようにしました。
* oracle ブロック処理でスノーマンリクエストマネージャーでメモリーリークを修正しました。
* UTXOページネーションバグを修正しました。利用可能な資金が過小評価されていた問題を修正しました。
* HTTP ログを人間が読みやすいチェーンログフォルダーに移動しました。
* ID がどのようにヒープ割り当てを回避する方法を再構築します。
* `UniformSampler`s を最適化して複数のマップを作成しないようにしました。
* `ids` の使用量を減らしました。`[]ids.ID` を有効にして、連続メモリを活用することができます。
* `PrefixDB` で `[]byte` reuse を導入しました。
* JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java
* AVMロードユーザーを最適化して、不要な情報をディスクから読み込むことを避けました。
* メッセージの全長のために送信するソケット内のメモリ割り当て+コピーを削除しました。

このアップデートに関するサポートについては、[Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) を参照してください。それでも問題が発生している場合は、[Discord](https://chat.avax.network) に参加してヘルプをしてください。

## v1.0.4 [\(GitHub\で表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

![AvalancheGoリリースノートv1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% ヒント スタイル="danger" %}この更新はオプションですが、推奨されます。このパッチには、QOL-of Lifeの向上とさまざまなパフォーマンス向上が含まれています。この更新では、--- か --- のいずれかを許可するのではなく、CLI パラメーターを指定する必要があります。-public-ip`=127.0.0.`1 は許可されなくなりました。`--public-ip=127.0.0.1` として指定する必要があります。そうでなければ、この更新は後方互換性があります。{% endhint %}

```text
• Added subnet whitelisting to allow a node owner to choose which subnets to validate.
```

```text
• Added config file parsing for node settings.
• Added more options for specifying a node's IP address and added getNodeIP to the info *endpoint.
• Added a TxID to the result of get.Validators in the platformvm.
• Updated Coreth version.
• Cleaned up the snowball trie implementation and added additional tests to align with mutation tests.
• Implemented and optimized continuous time averages for tracking CPU and network latency.
• Significantly optimized memory allocations in various locations.
• Increased the signature verification cache size.
• Reduced DB reads during vertex management.
```

```text
• Added an optional argument includeReason to platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

このアップデートに関するサポートについては、[Developer FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) を参照してください。それでも問題が発生している場合は、[Discord](https://chat.avax.network) に参加してヘルプをしてください。

