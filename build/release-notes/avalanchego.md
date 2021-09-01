# AvalancheGo

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.5.2 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2)\)


このアップデートは、[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)と後方で互換性があります。v1.5.0リリースで予想される更新時間をご覧ください。

**Coreth**

* [Gethセキュリティ脆弱性](https://twitter.com/go_ethereum/status/1430067637996990464)がパッチされました
* apiバックエンドでパニックをパッチしました。

**AVM**

* 改善のためのステートレスコーデック生成が導入されました。

**コンセンサス**

* バブリング票を回す追加ロギングを追加。


## v1.[5](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call).1-eth\_call

このアップデートは、[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)と後方で互換性があります。v1.5.0リリースで予想されるネットワークアップ時間を確認してください。

このアップデートは、外部所有のアカウントチェックなしでeth\_callを使用できるようにするv1.5.1のためのホットフィックスです。


## v1.[5](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1).1

このアップデートは、[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)と後方で互換性があります。v1.5.0リリースで予想されるネットワークアップ時間を確認してください。

**構成**

* オプションを削除し`bootstrap-retry-max-attempts`、追加オプション`bootstrap-retry-warn-frequency`

**サブネット**

* ハンドシェイクメッセージに`subnetID`sこれにより、同期に際して、ノードがサブネットが興味深いものであることを、ピアに通知します。
* 最適化されたサブネットコンテナゴシッピング。

**AVM**

* `amount`UTXOで適切に報告するように、`avm.GetTx`JSONエンドポイントを修正。

**ブートストラップ**

* ブートストラップ中にノードが落ち、致命的なエラーが発生する場合に発生する可能性がある忙しいループを修正しました。

**RPCChainVM**

* 未確認ブロックのキャッシュを改善。

**Coreth**

* Geth v1.10.7に更新。

## v1.5.0[（GitHub上で表示する）](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)

**この変更は、以前のリリースと逆さまとは互換性がありません。**

このアップグレードにより、C-チェーンにダイナミック手数料を追加します。また、他の様々な改善と

アップグレードにおける変更が、2021年8月24日午前EDT（メインネット）で発生します。変更が有効になる前にノードをアップグレードする必要があります。

より多くの情報は[、ここから](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60)入手できます。

**ネットワークアップグレー**

* Cチェーンにダイナミック手数料計算を追加しました。
* 増加`CreateSubnetTx`と手数料`CreateChainTx`。
* デリゲータバリデーションでヒープの破損バグを修正しました。
* 委任取引`MaxStakeWeight`のために強制されます。

**クライアントアップグレー**

* Xチェーンにトランザクションインデックス機能を追加し、アドレスとアセットによるトランザクションの履歴アップを可能にします。
* dockerイメージにデフォルトコマンド`./avalanchego`として追加。
* dockerイメージで静的依存バージョンを使用します。
* データベース移行サポートとdeamonランナを削除しました。
* リファクタ付きノード構成のパース。
* 最適化されたコンテナゴシップサンプリング。
* AvalancheGoとEVMバイナリを静的に構築できる機能を追加しました。
* 完全な親ブロックを取得する代わりに、親ブロックのIDのみを公開する`Block`インターフェースをシンプル化しました。
* コンセンサスエンジンでペンディングジョブのための追加メトリック追加。
* ブロックチェーンバリデーションステータスがトランザクション確認ステータスとは別に処理されるようにします。

**更新されたAPI**

* API`GetAddressTxs`に追加`avm`。
* ノードが実行されている中に、ログレベルの微細なチューニングを可能にするAPIに追加され、`Admin`APIに`GetLoggerLevel`追加`SetLoggerLevel`されます。
* 現在使用されているノード設定を取得できる`Admin`API`GetConfig`に追加します。
* `GetCurrentValidators`s`nodeID`を指定し、そのレスポンスを一般化`platformvm.Client`するために更新`GetPendingValidators`されました。`GetStake`

**CLI引数**

* 削除されました`fetch-only`。
* VMに解析するJSON設定を追加`avm`。
   * 追加`indexTransactions`
   * 追加`indexAllowIncomplete`

## PRE\_RELEASE v1.5.0-fuji \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji)\)

**このリリースでは、メインネットを実行できないことに注意してください。メインネット設定で実行しようとした場合、「このノードバージョンはメインネットをサポートしない」と表示されます。メインネットノードを実行する場合、来週公式リリースが行われるまでアクションは必要ありません。**

**この変更は、以前のリリースと逆さまとは互換性がありません。**

このアップグレードにより、C-チェーンにダイナミック手数料を追加します。また、他の様々な改善と

アップグレードで変更が発生したのは、2021年8月16日午後3時\(EDT\)時点で、富士テストネット上で発生します。富士が更新、検証後、メインネット互換のリリースが公開されます。

**ネットワークアップグレー**

* Cチェーンにダイナミック手数料計算を追加しました。
* 増加`CreateSubnetTx`と手数料`CreateChainTx`。
* デリゲータバリデーションでヒープの破損バグを修正しました。
* 委任取引`MaxStakeWeight`のために強制されます。

**クライアントアップグレー**

* Xチェーンにトランザクションインデックス機能を追加し、アドレスとアセットによるトランザクションの履歴アップを可能にします。
* dockerイメージにデフォルトコマンド`./avalanchego`として追加。
* dockerイメージで静的依存バージョンを使用します。
* データベース移行サポートとdeamonランナを削除しました。
* リファクタ付きノード構成のパース。
* 最適化されたコンテナゴシップサンプリング。
* AvalancheGoとEVMバイナリを静的に構築できる機能を追加しました。
* 完全な親ブロックを取得する代わりに、親ブロックのIDのみを公開する`Block`インターフェースをシンプル化しました。
* コンセンサスエンジンでペンディングジョブのための追加メトリック追加。
* ブロックチェーンバリデーションステータスがトランザクション確認ステータスとは別に処理されるようにします。

**更新されたAPI**

* API`GetAddressTxs`に追加`avm`。
* ノードが実行されている中に、ログレベルの微細なチューニングを可能にするAPIに追加され、`Admin`APIに`GetLoggerLevel`追加`SetLoggerLevel`されます。
* 現在使用されているノード設定を取得できる`Admin`API`GetConfig`に追加します。
* `GetCurrentValidators`s`nodeID`を指定し、そのレスポンスを一般化`platformvm.Client`するために更新`GetPendingValidators`されました。`GetStake`

**CLI引数**

* 削除されました`fetch-only`。
* VMに解析するJSON設定を追加`avm`。
   * 追加`indexTransactions`
   * 追加`indexAllowIncomplete`

## v1.4.12 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)\)

このアップデートは、後方互換性があります。オプションですが、推奨です。

**X-Chain**

* クエリされたトランザクションのJSON表現を`GetTx`返すAPIメソッドにフォーマット引数を追加しました`"json"`。
* インターフェース型アサーションを追加

**情報API**

* Info APIクライアントにメソッド`GetNodeVersion`を追加

**Prometheus Metrics**

* 圧縮により送信されないバイトのためのメトリックを修正、名前変更しました。
* 圧縮により受信できないバイトメトリックを追加しました
* `metrics`パッケージにヘルパー構造`noAverager`を追加

**データベース**

* 更新/追加されたベンチマーク

**共有メモリ**

* `Remove`置き換え`Put`、将来のアミトマニクスの最適化を`Apply`可能にします。

## v1.4.11 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)\)

**C-Chain**

このリリースにより、デフォルトでスナップショットが可能になります。

**構成フラグ**

_削除_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_追加_

* `network-compression-enabled`

**Prometheus Metrics**

多くのPrometheusメトリックの名前が変更され、多くのヒストグラムが2ゲージに置き換えられました。更新され[た](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)Grafanaダッシュボード

このリリースにより、パッケージにヘルパメソッドが追加されます`utils/metric`。

**RocksDB**

RocksDBは、ビルドスクリプを実行する際にデフォルトでビルドされなくなりました。また、公然とリリースされたバイナリに含まれないものではありません。RocksDBでAvalancheGoを構築するには、端末で実行し、次`export ROCKSDBALLOWED=1`に。`scripts/build.sh`使用できる前に、これを行わなければなりません`--db-type=rocksdb`。

RocksDBデータベースが、サブディレクトリ内のファイルを検索するようになりました`rocksdb`。以前にRocksDBで実行した場合、既存のファイルを移動する必要がありますことに注意してください。

**メッセージ圧縮**

ノードは、P2Pメッセージを圧縮するようになりました。ピアがバージョンである場合、Put、Push Query、Peer List、Multiputメッセージは、gzipを使用して圧縮され、ネットワーク経由で送信されます。これによりAvalancheGoの帯域幅使用率が低下します。

**インバウンド接続スロットリング インバウンド接続レート制限を**リファクタリングし、デフォルトで有効にします。

**一般的な改善**

* gRPCによってプラグインにサービスされるデータベース上でイテレーションの性能をリファクタリングし、向上させました。
* Linux上で、AvalancheGoが不正に死亡した場合、C-Chainをクリーンアップします。
* P2Pメッセージ定義をリファクタリングし、パッケージから移動します`network`。
* HTTP APIサーバーにVMエイリアスを追加
* 置き換えなどが`1024`可能になります`units.KiB`。
* 対応するクエリを作成する順番にチットを処理することにより、パーティションの許容度を改善しました。

**富士 IP**

富士テストネットのためのブートストラップIPを更新しました。

## v1.4.10 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)\)

**Apricotフェーズ2 -パッチ10**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。{% endhint %}

パッチには、パフォーマンス、スロットリング、VMの改善が含まれています：

* `RocksDB``LevelDB`サポートされたアーキテクチャではなく使用するサポートが追加されました。
* 再構成されたインバウンドネットワークスロットリングは、ピアノードでの帯域幅使用を制限するために、1ノードあたりに限定されます。
* 再構成されたアウトバウンドネットワークスロットリングにより、ステークにより割り当てられたバイト数を重くします。
* Cチェーン`true`のために`pruning-enabled`フラグのデフォルト値を更新します。
* RPC上でカスタムVMの登録が可能になりました。
* ブロックチェーンステータス更新により、バリデーションステータス報告。
* 予期されるVM作成パスに合わせて、独自のリポジトリ`TimestampVM`に移動します。
* `grpc`protobufコード-genスクリプトを修正しました。
* 潜在的なキャッシュエチブリ検証障害を回避`rpcchainvm#Block.Verify`するために、ブロックバイトを通じて渡されます。

## v1.4.9 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)\)

**Apricotフェーズ2 -パッチ9**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。{% endhint %}

パッチには、パフォーマンス改善とモニタリングの改善が含まれます：

* プルーンが有効になっている場合でCチェーンを実行するためのサポートを追加しました。プルーニングは、デフォルトで無効になっています。
* Cチェーンウェブソケットping間隔を低減し、ロードバランサー後方で切断を削減します。
* snowman Blockインターフェースにタイムスタンプを追加。
* ウェブソケット経由で行われる呼び出しで、C-chain API最大期間が実行されるバグを修正しました。
* httpエンドポイントのためのgzipヘッダーサポートを追加しました。
* `info.getNodeVersion`エンドポイントに追加されたバージョン説明を追加。
* ノードバージョンに接続する制限が設けられています。
* プライマリログフォルダーの下にデーモンログを移動します。
* 決定論サンプリングのためのサポートを追加しました。
* 新しいタグのためのGitHubアクションを追加しました。
* プログラムでノード立ち上げをサポートするためのリファクタリングされた構成管理。

## v1.4.8 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)\)

**Apricotフェーズ2 -パッチ8**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。{% endhint %}

パッチには、パフォーマンス改善、モニタリングの改善、サブネット修正が含まれます：

* AVMの手数料定義を変更し、チェーンネイティブアセットで手数料を支払われるようにします。これによりX-Chainの動作が変わることはありませんが、他のAVMインスタンスが使用可能になりました。
* 特定のチェーンに設定を指定できる機能を追加しました。このことにより、`coreth-config`CLIパラメーターを廃止します。
* 新しいアウトバウンド接続数に制限するレートが追加されました。
* 透明なメトリックをチェーンに追加するVMラッパーを導入しました。
* 連続ノードプロファイリングを有効にする機能を追加しました。
* ネットワーキングレイヤーでバイト割当を減らしました。
* ゴシップパラメータをチューニングするための様々なCLIパラメータを追加しました。
* ディスクから読み取る代わりに、一時的な鍵ペアを使用して実行するための有効化されたノード。
* 間違ったスプリアス警告を削除しました。
* Travisで実行する代わりにGithub Actionsで実行するように、CIテストを移動しました。
* VMインターフェースから特別なケースを削除。

**コマンドライン引数を追加：**

* `profile-dir`
* `profile-continuous-enabled`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consensus-on-accept-gossip-size`
* `consensus-accepted-frontier-gossip-size`
* `meter-vms-enabled`
* `staking-ephemeral-cert-enabled`
* `outbound-connection-timeout`
* `outbound-connection-throttling-rps`

## v1.4.7 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)\)

**Apricotフェーズ2 -パッチ7**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、パフォーマンス改善とバグ修正が含まれます。{% endhint %}

以前にインストールされたノードバージョンが<= v1.4.4である場合、このノードはブロックの処理を停止した可能性があります。この更新により、ノードを修復し、データベースマイグレーションを実行します。データベース移行について詳しくは、[v1.4.5](avalanchego-v1.4.5-database-migration.md)のデータベース移行ノートをご覧ください。以前にインストールされたノードバージョンが>=v1.4.5である場合、このノードは既存のデータベースを使用し、データベースマイグレーションを実行する必要はありません。

* P-chainブロックを正しく確認するように、移行前のノードを修正しました`SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`。
* プライマリーサブネットブロックチェーンを正しく返す`platformvm.GetBlockchains`ように、回帰を修正しました。
* grpcバージョンをv1.37に更新しました。
* 最適化されたピアリストサンプリング。
* データベースベンチマークを追加。
* 様々な繰り返しメモリ割当を削減。

## v1.4.6 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)\)

**Apricotフェーズ2 -パッチ6**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。このパッチには、パフォーマンス改善とバグ修正が含まれます。{% endhint %}

**以前にインストールされたノードバージョンが<= v1.4.4である場合、このノードはデータベース移行を実行します。データベース移行について詳しくは、v1.4.5のリリースノートをご覧ください。**以前にインストールされたノードバージョンがv1.4.5である場合、このノードは既存のデータベースを使用し、データベースマイグレーションを実行する必要はありません。

このパッチ：

* 高度な持続可能なDBライティングを引き起こしたP-chainメンプールに無効なトランザクション発行を削除します。
* データベースディレクトリ内の非データベースファイルとフォルダを無視します。これにより、具体的にmacOS上で報告されたエラーを修正する必要があります。DS\_Storeファイル
* プリアップグレードノードがエラーが発生することなく、CLI経由でビルド-dirフラグの指定が可能になるように修正しました。
* ノードマネージャデーモンでサポートされなくなったplugin-dirフラグを削除しました。通常フラグを指定しないことで、正しい動作につながります。しかし、複雑なインストールのために、build-dirフラグが必要になる可能性があります。
* ピアハンドシェイクを終了した接続にのみメッセージをエンコードします。
* コンセンサストラバーサルとブートストラップ中にメモリ割当を削減しました。

## v1.4.5 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)\)

**Apricotフェーズ2 - パッチ5 - DBアップグレード**

**このアップグレードは、典型的なバージョンアップよりも多くの関与です。より詳細な手順とFAQは[**、ここから**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)確認できます****。**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、大きなパフォーマンス改善や多数の更新が含まれています。{% endhint %}

**VMの改善：**

* `platformvm`状態管理を完全に再設計します。
   * ブロックを通過した`versiondb`sの使用量を削除しました。
   * 適切にキャッシュし、基礎となるデータベースにマングライドするためのベースステートマネージャを実装しました。
   * CoWバリデータセットを実装し、メモリに複数のバリデータセットをキャッシュするようにします。
   * 未使用のステートオブジェクトに触れることを避けるサブネットでチェーンをインデックス化します。
   * 受け入れとトランザクション中に不必要なイテレーションを回避するために`addDelegator`、バリデータ`nodeID`がインデックス化されました`addSubnetValidator`。
   * ディスク上にセットを管理する際に専用のキーと値ペアの数を減らします。
* 報酬のインデックスをサポートするために`platformvm`、APIにステーキング報酬ルックアップを追加します。
* テストをシンプルにするためのリファクター付きバリデータ更新時間メーター。
* `platformvm`ブロックとトランザクションタイプメトリックを追加。
* `avm`APIコールメトリック`platformvm`
* s`prefixdb`、キャッシュメトリックを記録し、追加コードを共有するように、`avm`状態管理を更新しました`platformvm`。
* シンプルな`UTXO`管理と`avm`インデックス。`platformvm`
* 再構成されたアドレスのパースと管理は、互換性のあるVMインスタンス間で完全に共有されます。
* プライマリサブネットの共有メモリを再構成し、VMインスタンス間で完全に共有することができます。
* 既存のVM実装上でのシームレスなキャッシュをサポートし、新しいVMの実装をシンプルにするためのチェーンステート実装を追加しました。
* 新しいチェーンステートマネージャを統合し`rpcchainvm`、様々なメトリクスも追加します。
* 今後のネットワークアップをサポートするために、標準的なVMインターフェース`configBytes`に追加され、追加`upgradeBytes`されます。
* APIに追加`getAtomicTx`、`getAtomicTxStatus`エンドポイント`evm`。
* シンプルな`evm`ブロック生産は、コンセンサスエンジンと同期して実行することができます。
* アミットトランザクションメンプールを追加。
* `evm`クライアントで適切にイン`sourceChain`を設定するバグを修正しました。`getAtomicUTXOs`
* 新しいチェーンステートマネージャを統合し、より良いブロックマネージャを最適化`evm`します。

**ブートストラップの改善：**

* ブートストラップ中に再トラバーサルが削除されました。これにより、ブートストラッププロセスの再スタート中にノードのパフォーマンスが大幅に向上します。
* ブートストラップされたコンテナを実行中にノード終了を試みるときに、非グレースフルノードシャットダウンを修正しました。
* ブートストラップ中に重複したIPCコンテナブロードキャストを修正しました。
* カスタムプレフィックスを実装する代わりに、`prefixdb`sを使用して書き込むように、ブートストラップジョブキューを標準化しました。
* 追加のブートストラップキャッシュとキャッシュメトリクスを追加しました。

**データベースマイグレーション追加：**

* 更新されたデータベースフォーマットにシームレスに移行するように、デーモンプロセスマネージャを追加しました。
* データベースセマンティックバージョンを追跡するためのリファクタリングされたバージョンハンドリング。
* 異なるデータベースバージョンを経由してトラッキング、動作するためのデータベースマネージャを実装しました。
* データベースから`v1.0.0`データベースに自動的にコピーする`keystore`マイグレーションを実装しました`v1.4.5`。
* `v1.0.0`バリデータ稼働時間マイグレーションを実装しました`v1.4.5`。

**ノード改善：**

* 常に環境変数を展開するように、構成のパースアップデートします。
* ノード設定をリファクタリングし、ディスクに触れることなくメモリでTLS証明書を指定できるようにします。
* 意味のある終了コードについて、より良いサポートを追加しました。
* 非特定のポートマッピングをサポートするようにするため、`staking`サーバーのリスニングアドレス`http`が表示されます。
* データベースを通じて切り替えることができる`versionable`データベースを実装しました`versioned`。
* IDのプリ`Set`割当を最適化し、sのメモリ使用量を低減します`struct`。
* 強制されたより厳しいラインティングルール。

**変更コマンドライン引数：**

以下の引数は、以前にキーワードとして扱われてい`"default"`ました。さて、フラグの意図した値として扱われよう`"default"`とします。デフォルトの動作を維持するため、フラグを指定すべきではありません。

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

以下の引数は、以前にキーワードとして扱われてい`""`ました。さて、フラグの意図した値として扱われよう`""`とします。デフォルトの動作を維持するため、フラグを指定すべきではありません。

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

`bootstrap-ids`もはや必要はなく`bootstrap-ips`なりました。`bootstrap-ips`つまり、より異なる数を指定することができます。`bootstrap-ids``bootstrap-ips`最初にネットワークに接続するために使用され、ブートストラップにおけるビーコンとして使用`bootstrap-ids`されます。

**コマンドライン引数を追加：**

* `fetch-only`
* `build-dir`

**コマンドライン引数を削除：**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)\)

**Apricotフェーズ2 -パッチ4**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。{% endhint %}

パッチには、バグフィックスと、今後のリリースを最適化することを目指するパフォーマンス改善が含まれています`db-upgrade`。

* ブートストラップでタイリング遅延を省略する。
* ブートストラップ中にメッセージを処理する改善された。
* 既存のサンプラーを再利用することにより、サンプラー割り当てを軽減します。
* dockerスクリプトを更新し、ブランチからイメージだけをプッシュします`master`。
* ログフォーマットを修正。
* エラーメッセージを改善。

## v1.4.3 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)\)

**Apricotフェーズ2 -パッチ3**

{% hint style="warning" %}このアップデートは、後方互換性があります。オプションですが、推奨です。{% endhint %}

パッチには、バグフィックス、更新された稼働時間モニタリング、パフォーマンス改善が含まれています。

* ブートストラップ中にノードが進行できない可能性があるベンチされたメッセージ処理を修正しました。ブートストラップが完了するにつれて、ノードが通常の実行に遷移できない場合に、通常経験されました。
* C-Chainコードベースで、多くのトランザクションブロック要求が受け取ったノードが、別のノードによって生成されるブロックを処理するまで、一時的にブロックの生成を停止する可能性がある不具合を修正しました。
* ピアスツー・ピアに送信されるバージョンメッセージ数を制限しました。
* Apricotフェーズ2で廃止されたレガシーハンドシェイクメッセージを削除しました。
* 稼働時間計算のためにオフラインであるとして、マークされたノード。
* バリデータセットが変更中に、よりパフォーマンスとして設定するバリデータを更新しました。
* ネットワーキングを更新し、現在バリデータである場合に限り、切断時にピアに再接続しようとします。

## v1.4.2 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)\)

**Apricotフェーズ2 -パッチ2**

{% hint style="warning" %}このアップデートは、v1.4.0とv1.4.1と互換性があります。アップグレードにおける変更は、2021年5月5日午前10時\(月\)午前8時\(月\)午前8時\(月\)午前8時\)に、そして2021年5月10日午前7時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\)に発生します。{% endhint %}

このパッチにより、ゴシップされたピーリストメッセージのサイズをさらに低減し、いくつかの新しいフラグが導入されます。

* `network-peer-list-size`各メッセージにゴシップされたピア数をチューニングすることができます`peerlist`。
* `network-peer-list-gossip-size`これにより、`peerlist`ゴシップメッセージにピア数を調整することができます。
* `network-peer-list-gossip-frequency`sがゴシップ`peerlist`される頻度をチューニングすることができます。

## v1.4.1 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)\)

**Apricotフェーズ2 -パッチ1**

{% hint style="warning" %}このアップデートは、v1.4.0と後方互換性があります。v1.4.0リリースで予想される更新時間をご覧ください。{% endhint %}

このパッチにより、ゴシップされたピアリストメッセージのサイズを小さくし、ビーコン接続タイムアウトがスタートアップ時に設定できるように`--bootstrap-beacon-connection-timeout`するための新しいフラグが導入されます。

## v1.4.0[（GitHub上で表示する）](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)

**Apricotフェーズ2**

{% hint style="danger" %}この変更は、以前のリリースと逆方向に互換性がないことにご**留意ください。**

**関連ブログポストは[**、ここから**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)見ることができます****。**{% endhint %}

{% hint style="warning" %}このアップグレードにより、イーサリアムベルリンのCチェーンにアップグレードされるようになります。新しいAVMエンドポイントを追加し、さまざまな安定性向上が含まれます。コミュニティの皆様に、できるだけ早く更新を求めて、彼らのノードが健康的な状態で維持できるようにします。

アップグレードにおける変更は、2021年5月5日午前10時\(月\)午前8時\(月\)午前8時\(月\)午前8時\)に、そして2021年5月10日午前7時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\(月\)午前8時\)に発生します。{% endhint %}

**このアップグレードのための主要コンポーネントは、次のものが含まれます。**

* Corethを更新し、go-ethereumのv1.10.2に依存します。
* イーサリアムベルリンのアップグレード適用。具体的には、[EIP-2565](https://eips.ethereum.org/EIPS/eip-2565)、[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)[、EIP-2929、EIP-2930、EIP-2930。](https://eips.ethereum.org/EIPS/eip-2930)[](https://eips.ethereum.org/EIPS/eip-2929)
* ANTsfersとARC-20ラッパーをサポートするために、Cチェーンに新しいステートフルでコンパイルされたスマートコントラクトを追加しました。
* アドレスフィルターに合わせるトランザクションのウェブソケット通知をサポートするAVM`/events`エンドポイントを追加しました。
* 2つの新しいネットワーキングメッセージタイプを追加し`SignedVersion`、バリデータ -> IPマッピングを改善`SignedPeerlist`しました。
* ブートストラップ中にノードをシャットダウンし、チェーンを不正にシャットダウンする可能性が長い長いバグを修正しました。
* プラグインgRPCパッケージを更新し、安定性を向上させるため、大きな要求をページネートします。
* avalanchegoのメインバイナリをプラグインとして実行する機能を追加しました。
* leveldbの腐敗保護で潜在的なレース状態を修正しました。
* 自動ビルドスクリプトを更新し、複数のアーキテクチャをより良いサポートするために。

**コマンドライン引数を追加：**

* `plugin-mode-enabled`プラグインモードで実行するバイナリを指定します。

**コマンドライン引数を削除：**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)\)

**Apricotフェーズ1 -パッチ2**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。このパッチには、セキュリティの改善、バグ修正、モニタリングの改善が含まれます。{% endhint %}

**セキュリティの改善**

* C-chainブロックのための厳格なカノニカルフォーマットを実行しました`Apricot Phase 1`。これにより、`extra-data`ブロックフィールドに変更が加わることができなくなります。
* avalanchegoとプラグインプロセス間でIPC経由で送信されるように`Keystore`変更しました。

**バグ修正：**

* デリゲータを削除する前に、現在のデリゲーションを最大限に更新するように、デリゲーターを追加します。これにより、デリギオン上限が常に実行されるようになります。
* `AVM`スタートアップ時に正しく登録するように修正。
* ネットワークアップグレードを考慮に入れるために更新されたノード`uptime`計算。

**モニタリングの改善**

* チェーン上で受け付けられたオペレーションがローカルで一貫した順序を提供できるオプションのノードインデクタを追加しました。
* 多数の改善を追加する（@moreatiのおかげで大変です）。

## v1.3.1 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)\)

**Apricotフェーズ1 -パッチ1**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、安定性、モニタリングの改善、マイナーなバグ修正が含まれます。{% endhint %}

**このアップグレードのための主要コンポーネントは、次のものが含まれます。**

* arm64 CPU上で圧縮を行う際に、C-chainセグフォーラットを修正しました。
* 複雑なノードモニタリングを可能にするためのローカルファイルにグループパーミッションを追加します。
* api-auth-password-fileフラグを通じて渡したAuthパスワードから空白のスペースを取り除く。
* longestRunningRequestに置き換えられたとして、時間SinceNoOutstandingRequestを削除します。
* ネットワークスロットリングに追加メトリックを追加。
* 様々なコードクリーンアップ。

**コマンドライン引数を追加：**

* `network-health-max-outstanding-request-duration`

**コマンドライン引数を削除：**

* `network-health-max-time-since-no-requests`

## v1.3.0[（GitHub上で表示する）](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)

**Apricotフェーズ1**

{% hint style="danger" %}この変更は、以前のリリースと逆方向に互換性がないことにご留意ください。

このアップグレードにより、Cチェーンガス手数料を削減し、Cチェーンガス払い戻しを削除し、さまざまなセキュリティ改善が含まれています。コミュニティの皆様に、できるだけ早く更新を求めて、彼らのノードが健康的な状態で維持できるようにします。{% endhint %}

アップグレードにおける変更は、富士テストネットで10AM EST、2021年3月25日、そして2021年3月31日メインネットで10AM ESTで発生します。

**このアップグレードのための主要コンポーネントは、次のものが含まれます。**

* Cチェーンガスコストを470 nAVAXから225 nAVAXに削減しました。
* Cチェーンガス払い戻しを削除。この変更により、[EIP-3298](https://eips.ethereum.org/EIPS/eip-3298)を採用しています。
* ネットワークアップを実行する際に、C-chain検証をリファクタリングした。
* Auth APIを修正。
* 期待される署名フォーマットが使用されることを確実にするために、Auth APIを強化します。
* CLI引数からAuth APIのパスワードを削除します。
* より厳格なファイルパーミッションチェックを追加しました。
* いくつかの軽微な追加エラー処理を追加しました。
* サニタイズされたログは、ディスクに書き込まれる前に書き込まれます。
* HTTPエンドポイントに設定可能なオリジンを追加。
* スタートアップでHTTPを試みるように削除しました。HTTP エンドポイントをHTTPsにアップグレードするに失敗した場合、ノードはスタートアップ時に終了します。

**コマンドライン引数を追加：**

* `api-auth-password-file`Auth APIのパスワードを読み取るファイルを指定します。

**コマンドライン引数を削除：**

* `api-auth-password`

## **v1.2.4 \([**GitHub上で表示する**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)****\)**

**Apricotフェーズ0 -アップグレード1 -パッチ4**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、安定性とモニタリングの改善が含まれます。{% endhint %}

* ストレージ要件を修正するように更新しました。
* ブートストラップ中にAvalanche Tx検証に追加されたエラー処理を追加しました。
* ノードヘルスとデータベース使用に関して、多数の新しいメトリックスの追加、未使用で無効なメトリックの削除、いくつかのメトリック名の修正など、数多くのメトリックの更新が行われています。
* CIに追加ログを追加。
* クリティカルチェーンの一覧にCチェーンを追加。

## **v1.2.3 \([**GitHub上で表示する**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)****\)**

**Apricotフェーズ0 -アップグレード1 -パッチ3**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、安定性とモニタリングの改善が含まれます。{% endhint %}

* 調整された`[network, router, consensus]`ヘルスチェックパラメーター。
* 簡素化されたCチェーンブロックハンドリング。

## **v1.2.2 \([**GitHub上で表示する**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)****\)**

**Apricotフェーズ0 -アップグレード1 -パッチ2**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、安定性、パフォーマンス、モニタリングの改善が含まれます。{% endhint %}

* 繰り返しコールを避けるために、ネットワークライブラリにIPエイリアスを追加します`SYN`。
* 自身からブートストラップする際に、ブートストラップメッセージ処理を修正しました。
* 簡素化された発行`AdvanceTimeTx`。
* 新しいコンセンサスヘルスチェックを追加しました。
* ノードヘルスロギングを追加します。
* ヘルスリクエストにヘルスレスポンスを追加しました`GET`。
* 統合された着信メッセージログ。
* ラッパーにエラーログを追加`LevelDB`。
* 文字列の解析を避ける`rpcdb`ために、エラーコードを追加しました。
* カノニカルチェーンのCチェーンハンドリングを改善し、再組織数を減らします。
* ブロック上で実行されるモックコールにおけるC-chainハンドリングを改善しました`pending`。

## ******v1.[**2**](https://github.com/ava-labs/avalanchego/tree/v1.2.1).1**

**Apricotフェーズ0 -アップグレード1 -パッチ1**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、安定性、パフォーマンス、モニタリングの改善が含まれます。

この更新により、コマンドライン引数として、「network-timeout-crease」、「 network-timeout-reduction」が削除されますのでご留意ください。{% endhint %}

変更概要：

* 「platformvm.getStake」レスポンスにUTXOを追加。
* 「info.peers」レスポンスにベンチリストレポートが追加されました。
* ネットワーキングレイヤーに追加のヘルスチェックを追加しました。
* 報告されたメトリックとして、「ステークが接続されるパーセント」を追加します。
* 高速なスループット中にさえ、ノードが現在のチップに巻き込まれたことを確実にするためのブートストラップリングが追加されました。
* 別のチェーンブートストラップにより、チェーンが崩壊しないようにするサブネットワイドブートストラップを追加しました。
* 不必要な計算を避けるために、拒否されたブロックの検証を防ぎます。
* 好ましくないブロックのゴシップを削除。
* ネットワークのタイムアウト計算を切り替えて、観察されたネットワーク遅延のEWMAを使用します。
* ネットワーク遅延計算から「Get」要求を削除。
* ベンチリストアルゴリズムがクリーンアップされます。
* 送信中にドロップされたメッセージの処理がクリーンアップされました。
* 未払いな要求とタイムアウトロジックをクリーンアップします。
* プロフィール名のプレフィックスを可能にする一般化されたパフォーマンストラッキング。
* Avalancheブートストラップトラバーサルに追加キャッシュを追加。
* アンシブルリントを修正。
* 追加されたコマンドライン引数は、主にヘルスチェックの構成で構成されています。さらに、ネットワーク遅延計算により、いくつかのコマンドラインアルグの名前を変更しました。

コマンドライン引数を追加：

* \`network-timeout-halflife\`
* \`network-timeout-cofequick\`
* \`network-health-min-conn-peers\`
* \`network-health-max-time-since-msg-received\`
* \`network-health-max-time-since-msg-sent\`
* \`network-health-max-portion-send-queue-full\`
* \`network-health-max-send-fail-rate\`
* \`network-health-max-time-since-no-requests\`
* \`router-health-max-drop-rate\`
* \`router-health-max-outstanding-requests\`
* \`health-check-frequency\`
* \`health-check-averager-halflife'
* \`bootstrap-retry-enabled'
* \`bootstrap-retry-max-attempts\`

コマンドライン引数を削除：

* \`network-timeout-増加\`
* \`network-timeout-reduction\`

## v1.2.0[（GitHub上で表示する）](https://github.com/ava-labs/avalanchego/tree/v1.2.0)

**Apricotフェーズ0 -アップグレード 1**

{% hint style="danger" %}このパッチは、以前のリリースと後方とも互換性がありませんのでご**留意ください。このアップグレードにより、X、C、Pチェーン間でのやり取りに関連するパフォーマンス問題が修正されます。コミュニティの皆様に、できるだけ早くアップグレードして、ノードに影響が発生しないようにしてください。また、アップグレード後に接続するに数分かかる可能性があり、そのプロセスは中断がなくなるように許可されるべきであることに注意してください。**{% endhint %}

このアップグレードのための主要コンポーネントは、次のものが含まれます。

* C-Chain上でアミットインポートバリデーションを修正
* アミトニックボーナスブロックを許可するルール例外ロジックを追加しました
* 重複した削除が発行される場合に、共有メモリにフェイルファストロジックを追加
* 削除が失敗したため、世論調査がスノーマンにストールすることができる問題を修正しました。
* 未知の祖先のためにコアスでバッドブロックの問題を修正
* コアスで修復カノニカルチェーンスクリプトのレース状態を修正
* Snowmanで処理される数の限られた数とAvalancheで処理されるTXS
* 更新されたネットワーキングタイムアウトデフォルト値とベンチリスト設定
* 初期のネットワーク不安定化後、安全性違反が発生したことが確認されたことがありません。

## v1.1.5 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/tree/v1.1.5)\)

**Apricotフェーズ0 -パッチ5**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。パッチには、安定性の向上が含まれています。{% endhint %}

* P-chainと http\(s\)エンドポイントがブロックする可能性がある新しいチェーンを登録する際に、潜在的なデッドロックを修正しました。
* TxID ->Cチェーン内のブロック高さインデックスを修復します。
* Cチェーン内のdebug\_traceTransaction APIで空のコントラクトデプロイメントの優雅な処理を追加しました。
* Cチェーンでエラーハンドリングを改善しました。

## v1.[1](https://github.com/ava-labs/avalanchego/tree/v1.1.4).4

**Apricotフェーズ0 -パッチ4**

{% hint style="danger" %}このアップデートは、後方互換性があります。オプションですが、推奨です。このパッチには、CLIアップグレード、APIバグ修正、安定性改善、パフォーマンス改善が含まれます。{% endhint %}

* C-chainブロックインデックスが、指定された高さで受け入れられないブロックにマッピングできる問題を修正しました。
* RPCChainVMが高いAPIロードが発生したときに、VMのクラッシュを修正しました。
* Avalanche Engineでバブルの修正を修正。
* AVMのGetBalancesとGetAllBalances APIメソッドに IncludePartialを追加しました。これにより、デフォルトの動作が変化し、費用可能と独自の所有アセットの残高のみを返すようにします。
* カスタムネットワークIDにカスタムジェネシ設定を指定できる機能を追加しました。
* 追加のIPC API機能を追加しました。
* RPCChainVMに追加キャッシュを追加。
* 常にバイナリリリースで動作するように改善しました。

## v1.1.3 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/tree/v1.1.3)\)

**Apricotフェーズ0 -パッチ3**

{% hint style="danger" %}このアップデートはオプションですが、推奨されます。パッチには、APIに関連する軽微なバグ修正が含まれています。{% endhint %}

* Cチェーンログをフィルターしようとする際にハングアップコールを修正しました。
* Cチェーンクライアントを修正。
* `getAtomicUTXOs`追加`avm`、`platformvm`APIクライアント。

## v1.1.2 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)\)

**Apricotフェーズ0 -パッチ2**

{% hint style="danger" %}このアップデートはオプションですが、推奨されます。パッチには、バグフィックスとパフォーマンス改善が含まれています。{% endhint %}

* Avalancheを起動する際に、重複トラバーサルを減らすように、ブートストラップ処理キャッシュを修正しました。
* ブートストラップ中に最適化されたPチェーン検証。
* 適切な入力値を使用するように、最大限のベンチリスト計算を修正しました。
* CIから余分なリンタが実行されるを削除しました。
* インターフェース`Height`に追加`snowman.Block`。

## v1.1.1 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)\)

**Apricotフェーズ0 -パッチ1**

{% hint style="danger" %}このアップデートはオプションですが、推奨されます。パッチには、バグフィックスとパフォーマンス改善が含まれています。{% endhint %}

* APIを無効にした際に、ノードクラッシュバグを修正しました`Health`。
* アップタイムトラッキングで、ノードのアップタイムが報告される過程でバグを修正しました。
* リファクタ付き頂点パースして、a`Codec`.
* ステートフルとステートレスな頂点管理を分離します。
* コーデックにフィールドごとのスライス長さチェックを追加。
* `TypeID`グループが一緒にいる新しいコーデックタイプを導入。
* CLIにメッセージ制限フラグを導入しました。
* 将来のデータベース移行中に使用するsemanticdbパッケージを導入しました。
* チェーンコンテキストにエポックトラッキングを追加。
* トランザクションバリデーション中に返されたエラーメッセージの一部を改善しました。
* バージョンDBでGC圧を低下します。

## v1.1.0[（GitHub上で表示する）](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)

**Apricotフェーズ0**

{% hint style="danger" %}このアップグレードは、以前のリリースと逆方向に互換性がないことにご**留意ください。アップグレードは、12月7日月曜日午後11時（UTC）までに実行されなければなりません。UTC（午後6時（EST）までにアップグレードが実行される必要があります。元々12月中旬にスケジュールされたアップグレードは、現在、重要なトークンのロック解除を修正するために迅速に開始されます。コミュニティの皆様に、できるだけ早くアップグレードして、ノードに影響が発生しないようにしてください。**{% endhint %}

このアップグレードには、2つの主要コンポーネントがあります：

* Apricot ネットワークアップグレードに向けた一般的な準備と呼ばれるもの
* ロックが終了した後、ステーク可能なロックアウトプットがアンロックを受けることを防ぐ問題を修正しました。

## v1.0.6 \([GitHub上で表示する](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)\)

{% hint style="danger" %}このリリースには[、ここで](https://docs.avax.network/build/apis/deprecated-api-calls)説明したブレーキングチェンジが含まれています。platform.getTxStatusとplatform.getCurrentValidatorsのデフォルトのレスポンスフォーマットが変更されます。更新はオプションですが、推奨されます。パッチには、パフォーマンス改善と、ライフの品質向上が含まれます。{% endhint %}

* platform.getTxStatusと platform.getCurrentValidatorsの非推奨フォーマットを削除しました。
* keystore APIからインポート、エクスポートされたユーザーの1進符号化をサポートする追加。
* golangの要件をv1.15.5に設定し、golangスタンダードリブで見つかるDoS脆弱性を回避します。
* ノードソフトウェアとやり取りするヘルパーとして機能するAPIクライアントを追加しました。
* ノードが他のネットワークから切断された場合、ブートストラップに戻る可能性のある有効化が可能です。
* UTXOが複数のアドレスを参照した際に、GetUTXOs APIを修正しました。
* RPCオプションをより一般化するためのリファクタリングされたバイナリエンコード。
* ウィンドウ長を正しく設定するようにするIPブロックフィルタを修正しました。
* コーデックパッケージを一般化し、異なるバージョンで複数のコーデックを管理できます。
* 将来のリリースに備えて、VertexインターフェースにEpochを追加しました。
* 過去の高速チェックを削減する
* [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/)をご利用のお客様のために、URLは将来のリリースでシャットダウンされることになります。[https://explorerapi.avax.network/](https://explorerapi.avax.network/)に切り替えてください。

このアップデートでサポートされるには、開発[者に関するFAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)に従ってください。もしまだ問題が発生した場合、[Discord](https://chat.avax.network/)に参加してサポートが可能です。

## v1.0.5 [\(GitHub上で表示する\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)

{% hint style="danger" %}v1.0.6以降のリリースには、[ここで](https://docs.avax.network/build/apis/deprecated-api-calls)説明したブレーキング変更が含まれますことに注意してください。`platform.getCurrentValidators`つまり、レスポンスフォーマットが変更`platform.getTxStatus`されます。{% endhint %}

v1.0.5で、このリリースにおける変更は、以前のリリースと後方方向で互換性があります。更新はオプションですが、推奨されます。パッチには、パフォーマンス改善と、ライフの品質向上が含まれます。

* ノードに秘密鍵を明らかすことなくアミックスワップを発行できるようにするために、C-chain APIに追加され、C-chain API`GetUTXOs`に追加`IssueTx`されます。
* オラクルブロック処理で、スノーマンリクエストマネージャーでメモリーリークの修正。
* UTXOページネーションバグを修正。
* チェーンhttpログを移動し、人間が読みやすいチェーンログフォルダーに住むようにします。
* ヒープアロケーションを回避するためにIDがどのように構成されるかを再構成する。
* 多数のマップを作成しないように、`UniformSampler`sを最適化します。
* 連続メモリを利用できるようにするため`ids.Set`、使用を`[]ids.ID`減らしました。
* 再`[]byte`利用が導入されました。`PrefixDB`
* 頻繁にインターフェース変換アロケーションを避ける型別ソート機能を実装しました。
* AVMロードユーザーを最適化し、ディスクから不要な情報を読み取ることを避ける。
* メッセージの全長のために送信されるソケットでメモリ割当とコピーを削除しました。

このアップデートでサポートされるには、開発[者に関するFAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)に従ってください。もしまだ問題が発生した場合、[Discord](https://chat.avax.network)に参加してサポートが可能です。

## v1.[0](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4).4

![AvalancheGoリリースノートv1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}このアップデートはオプションですが、推奨されます。このパッチには、品質オブライフ改善と様々なパフォーマンス向上が含まれています。この更新では、CLIパラメータは、--あるいは--を許可する代わりに指定する必要があります。`-public-ip=127.0.0.1`たとえば、もはや許可がなくなり、として指定する必要があります。`--public-ip=127.0.0.1`そうでない場合、このアップデートは後方互換性があります。{% endhint %}

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

このアップデートでサポートされるには、開発[者に関するFAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)に従ってください。もしまだ問題が発生した場合、[Discord](https://chat.avax.network)に参加してサポートが可能です。

