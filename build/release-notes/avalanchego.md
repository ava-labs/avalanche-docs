# AvalancheGoリリースノート

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.5.2（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2)）


このアップデートは[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)との下位互換性があります。v1.5.0のリリースに記載されているアップデートの予定時間をご確認ください。

**Coreth**

* [Gethのセキュリティ脆弱性](https://twitter.com/go_ethereum/status/1430067637996990464)を修正しました
* APIバックエンドでのパニックを修正しました。

**AVM**

* ステートレスなコーデック生成機能を導入し、ツール機能を向上させました。

**コンセンサス**

* バブリングVOTEのログを追加しました。


## v1.5.1-eth_call（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call)）

このアップデートは[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)との下位互換性があります。v1.5.0のリリースに記載されているネットワークアップグレードの予定時間をご確認ください。

今回のアップデートは、v1.5.1のホットフィックスで、外部所有のアカウントチェックを行わずにeth_callを使用できるようになります。


## v1.5.1（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1)）

このアップデートは[v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)との下位互換性があります。v1.5.0のリリースに記載されているネットワークアップグレードの予定時間をご確認ください。

**構成**

* オプション`bootstrap-retry-max-attempts`を削除し、オプション`bootstrap-retry-warn-frequency`を追加します

**サブネット**

* ハンドシェイクメッセージに`subnetID`を追加しました。これにより、ノードがどのサブネットの同期に興味を持っているかをピアに通知します。
* 最適化されたサブネットコンテナゴシッピング。

**AVM**

* UTXO上で`amount`を適切に報告するために、`avm.GetTx`のJSONエンドポイントを修正しました。

**ブートストラッピング**

* ブートストラッピング中にノードのインターネットが切断された場合に発生するビジーループを修正し、ノードが致命的なエラーを報告するようになりました。

**RPCChainVM**

* 検証されていないブロックのキャッシュを改善しました。

**Coreth**

* Geth v1.10.7にアップデートしました。

## v1.5.0（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)）

**この変更は、以前のリリースとの後方互換性はありません。**

今回のバージョンアップでは、C-Chainにダイナミック手数料が追加されたほか、様々な改良が加えられています。

アップグレードの変更は、2021年8月24日午前10時（アメリカ東部標準時）にメインネットで有効になります。この変更が有効になる前にノードをアップグレードする必要があります。そうしないと、ノードのアップタイムが失われる可能性があります。

さらなる詳細は[こちら](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60)をご覧ください。

**ネットワークのアップグレード**

*  C-chainにダイナミック手数料計算機能を追加しました。
* 増加した`CreateSubnetTx`と`CreateChainTx`の手数料。
* デリゲーターの検証におけるヒープ破壊のバグを修正しました。
* デリゲートトランザクションに対応する`MaxStakeWeight`を強化しました。

**クライアントのアップグレード**

* X-Chainにトランザクションインデックス機能を追加し、アドレスや資産ごとにトランザクションの履歴を検索できるようにしました。
* ドッカーイメージのデフォルトコマンドとして`./avalanchego`を追加しました。
* ドッカーイメージで使用される静的な依存関係のバージョンを使用しました。
* データベース移行サポートとデーモンランナーを削除しました。
* ノード構成のパースを改良しました。
* コンテナゴシップサンプリングを最適化しました。
* AvalancheGoおよびEVMのバイナリを静的に構築する機能を追加しました。
* 親ブロックの全文を取得するのではなく、親ブロックのIDのみを表示するように`Block`インターフェースを簡素化しました。
* コンセンサスエンジンで保留中のジョブのメトリックを追加しました。
* P-Chainのステータスを再構成し、ブロックチェーンの検証ステータスとトランザクションの確認ステータスを別々に扱うようにしました。

**APIの更新**

* `avm`APIに`GetAddressTxs`を追加しました。
* `Admin`APIに`SetLoggerLevel`と`GetLoggerLevel`を追加し、ノードの実行中にログレベルを細かく調整できるようになりました。
* ノードが現在使用しているノード構成を取得できるように、`Admin`APIに`GetConfig`を追加しました。
* `platformvm.Client`を更新し、`GetCurrentValidators`と`GetPendingValidators`で`nodeID`を指定できるようにし、レスポンスを`GetStake`に一般化しました。

**更新されたCLIの引数**

* `fetch-only`を削除しました。
* `avm`VMにJSON構成の解析機能を追加しました。
   * 追加した`indexTransactions`
   * 追加した`indexAllowIncomplete`

## PRE_RELEASE v1.5.0-fuji（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji)）

**このリリースではメインネットを実行することができません。メインネットの設定で実行しようとすると「このノードのバージョンはメインネットをサポートしていません」と表示されますのでご注意ください。メインネットのノードをお使いの場合は、来週の正式リリース公開まで何もする必要はありません。**

**この変更は、以前のリリースとの後方互換性はありません。**

今回のバージョンアップでは、C-Chainにダイナミック手数料が追加されたほか、様々な改良が加えられています。

今回のアップグレードでの変更点は、2021年8月16日午後3時アメリカ東部時間にFujiテストネットで有効になります。Fujiが更新されて検証された後、メインネットに対応したリリースが公開されます。

**ネットワークのアップグレード**

*  C-chainにダイナミック手数料計算機能を追加しました。
* 増加した`CreateSubnetTx`と`CreateChainTx`の手数料。
* デリゲーターの検証におけるヒープ破壊のバグを修正しました。
* デリゲートトランザクションに対応する`MaxStakeWeight`を強化しました。

**クライアントのアップグレード**

* X-Chainにトランザクションインデックス機能を追加し、アドレスや資産ごとにトランザクションの履歴を検索できるようにしました。
* ドッカーイメージのデフォルトコマンドとして`./avalanchego`を追加しました。
* ドッカーイメージで使用される静的な依存関係のバージョンを使用しました。
* データベース移行サポートとデーモンランナーを削除しました。
* ノード構成のパースを改良しました。
* コンテナゴシップサンプリングを最適化しました。
* AvalancheGoおよびEVMのバイナリを静的に構築する機能を追加しました。
* 親ブロックの全文を取得するのではなく、親ブロックのIDのみを表示するように`Block`インターフェースを簡素化しました。
* コンセンサスエンジンで保留中のジョブのメトリックを追加しました。
* P-Chainのステータスを再構成し、ブロックチェーンの検証ステータスとトランザクションの確認ステータスを別々に扱うようにしました。

**APIの更新**

* `avm`APIに`GetAddressTxs`を追加しました。
* `Admin`APIに`SetLoggerLevel`と`GetLoggerLevel`を追加し、ノードの実行中にログレベルを細かく調整できるようになりました。
* ノードが現在使用しているノード構成を取得できるように、`Admin`APIに`GetConfig`を追加しました。
* `platformvm.Client`を更新し、`GetCurrentValidators`と`GetPendingValidators`で`nodeID`を指定できるようにし、レスポンスを`GetStake`に一般化しました。

**更新されたCLIの引数**

* `fetch-only`を削除しました。
* `avm`VMにJSON構成の解析機能を追加しました。
   * 追加した`indexTransactions`
   * 追加した`indexAllowIncomplete`

## v1.4.12（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)）

この更新は後方互換性があります。任意ですが、推奨します。

**X-Chain**

* 問い合わせたトランザクションのJSON表現を返すAPIメソッド`GetTx`に、フォーマットの引数`"json"`を追加しました
* インターフェースの型アサーションを追加しました

**インフォメーションAPI**

* インフォメーションAPIクライアントにメソッド`GetNodeVersion`を追加しました

**Prometheusメトリック**

* 圧縮のために送信されなかったバイトのメトリックを修正し、名称を変更しました
* 圧縮のために受信できなかったバイトのメトリックを追加しました
* ヘルパー構造体`noAverager`を`metrics`をパッケージに追加しました

**データベース**

* ベンチマークの更新/追加

**共有メモリ**

* 将来のアトミックトランザクションの最適化のために、`Put`と`Remove`を`Apply`に置き換えてください

## v1.4.11（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)）

**C-Chain**

このリリースでは、デフォルトでスナップショットが有効になっています。

**構成フラグ**

_削除_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_追加済み_

* `network-compression-enabled`

**Prometheusメトリック**

多くのPrometheusメトリックの名称が変更され、多くのヒストグラムが2つのゲージに置き換えられました。更新されたGrafanaのダッシュボードは[こちら](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)をご覧ください。

今回のリリースでは、`utils/metric`パッケージにヘルパーメソッドも追加されています。

**RocksDB**

RocksDBは、ビルドスクリプトの実行時にデフォルトでビルドがされなくなりました。ですから、一般公開されているバイナリには含まれていません。AvalancheGoをRocksDBでビルドするには、ターミナルで`export ROCKSDBALLOWED=1`を実行し、次に`scripts/build.sh`を実行します。`--db-type=rocksdb`を使用する前に必ずこれを行う必要があります。

RocksDBデータベースは、サブディレクトリ`rocksdb`にファイルを配置し検索するようになりました。これまでRocksDBを使っていた場合には、既存のファイルを移動する必要があることに注意してください。

**メッセージの圧縮**

ノードが一部のP2Pメッセージを圧縮するようになりました。ピアのバージョンがv1.4.11以上の場合、ピアに送信される、Put、Push Query、Peer ListおよびMultiputメッセージは、ネットワーク上に送信される前にgzipで圧縮されます。これにより、AvalancheGoの帯域幅の使用量が減少します。

**インバウンドコネクションスロットリング** インバウンドコネクションのレート制限をリファクタリングし、デフォルトで有効になりました。

**一般的な改善点**

* gRPCで提供されるデータベースをプラグインで反復処理する際のパフォーマンスをリファクタリングして改善しました。
* Linuxでは、AvalancheGoが正常に停止した場合は、C-Chainをクリーンアップします
* P2Pメッセージの定義をリファクタリングし、`network`パッケージから移動します。
* HTTP APIサーバーにVMエイリアスを追加しました
* `1024`を`units.KiB`などに置き換えました。
* 対応するクエリが作成された順にチットを処理することで、パーティション耐性を向上させました。

**Fuji IP**

Fuji TestnetのブートストラップIPを更新しました。

## v1.4.10（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)）

**Apricotフェーズ2 - パッチ10**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。
{% endhint %}

このパッチには、パフォーマンス、スロットル、およびVMの改善が含まれています。

* サポートされているアーキテクチャでは、`LevelDB`ではなく`RocksDB`を使用するようになりました。
* インバウンド通信のスロットリングをノード単位にリファクタリングし、ピアノードの帯域幅の使用を制限しました。
* アウトバウンド通信のスロットリングをリファクタリングし、割り当てられたバイトをステークスごとに重み付けをします。
* C-Chainの`pruning-enabled`フラグのデフォルト値を`true`に更新しました。
* RPCによるカスタムVMの登録を可能にしました。
* 検証状況を報告するようにブロックチェーンのステータスを更新しました。
* 想定されるVM作成パスに合わせて、`TimestampVM`を独自のリポジトリに移動しました。
* プロトコルバッファーのコード生成スクリプトで、`grpc`ファイルを正しい場所に配置するように修正しました。
* ブロックバイトを`rpcchainvm#Block.Verify`に通すことで、キャッシュ退去検証の失敗の可能性を回避しました。

## v1.4.9（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)）

**Apricotフェーズ2 - パッチ9**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。
{% endhint %}

今回のパッチでは、次のパフォーマンスの改善やモニタリングの改善などが行われています。

* プルーニングを有効にしてC-Chainを実行できるようになりました。現在、デフォルトではプルーニングは無効になっています。
* ロードバランサーの背後にあるときの切断を減らすために、C-Chain Websocket pingの間隔を短くしました。
* Snowmanブロックのインターフェースにタイムスタンプを追加しました。
* Websockeyを介して行われた呼び出しに対するC-Chain APIの最大継続時間の実施に関するバグを修正しました。
* HTTPエンドポイントにgzipヘッダーのサポートを追加しました。
* `info.getNodeVersion`エンドポイントにバージョンの説明を追加しました。
* ノードのバージョンが1.4.5以上の場合の接続が制限されました。
* デーモンのログを一次ログフォルダの下に移動しました
* 決定論的サンプリングのサポートを追加しました。
* 新しいタグに対するGitHubの自動デプロイメントアクションを追加しました。
* プログラムによるノードの起動をサポートするために、設定管理をリファクタリングしました。

## v1.4.8（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)）

**Apricotフェーズ2 - パッチ8**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。
{% endhint %}

このパッチには、パフォーマンスの改善、モニタリングの改善、サブネットの修正が含まれています。

* AVMの手数料定義を変更し、チェーンのネイティブ資産で支払われる手数料を強制するようにしました。これはX-Chainの動作を変更するものではありませんが、他のAVMインスタンスが使用可能になります。
* 特定のチェーンに設定を指定する機能を追加しました。これにより、`coreth-config`CLIパラメータが非推奨となります。
* 新規のアウトバウンド接続数にレート制限を追加しました。
* チェーンに透過的なメトリックを追加するVMラッパーを導入しました。
* 継続的なノードプロファイリングを有効にする機能を追加しました。
* ネットワーク層でのバイト割り当てを削減します。
* ゴシップパラメータを調整するための様々なCLIパラメータを追加しました。
* ディスクから読み取る鍵ではなく、一時的な鍵のペアを使用してノードを実行できるようになりました。
* 不適切な偽装警告を削除しました。
* CIテストをTravisではなく、Github Actionsで実行するようにしました。
* VMインターフェースから特殊なケースを削除しました。

**コマンドライン引数の追加：**

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

## v1.4.7（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)）

**Apricotフェーズ2 - パッチ7**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。このパッチには、パフォーマンスの改善とバグの修正が含まれています。
{% endhint %}

以前にインストールされたノードのバージョンがv1.4.4未満の場合、このノードはブロックの処理を停止している可能性があります。この更新により、ノードの修復とデータベースの移行が行われます。データベースの移行についての詳細は、[v1.4.5のデータベース移行に関するノート](avalanchego-v1.4.5-database-migration.md)を参照してください。インストール済みのノードのバージョンがv1.4.5以上の場合、このノードは既存のデータベースを使用するため、データベースの移行を行う必要はありません。

* 移行前のノードでP-Chainブロック`SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`を正しく検証するように修正しました。
* 一次サブネットのブロックチェーンを正しく返すように`platformvm.GetBlockchains`のリグレッションを修正しました。
* grpcのバージョンをv1.37に更新しました。
* ピアリストのサンプリングを最適化しました。
* データベースのベンチマークを追加しました。
* 繰り返し行われる様々なメモリ割り当てを削減しました。

## v1.4.6（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)）

**Apricotフェーズ2 - パッチ6**

{% hint style="warning" %}
この更新は後方互換性があります。任意ですが、推奨します。このパッチには、パフォーマンスの改善とバグの修正が含まれています。
{% endhint %}

**以前にインストールされていたノードのバージョンがv1.4.4未満の場合、このノードはデータベースの移行を行います。データベースの移行についての詳細はv1.4.5のリリースノートを参照してください。**インストール済みのノードのバージョンがv1.4.5の場合、このノードは既存のデータベースを使用するため、データベースの移行を行う必要はありません。

このパッチです。

* 高い持続性を持つDB書き込みの原因となっていた、 P-Chainメモリプールへの無効なトランザクション発行を削除します。
* データベースディレクトリ内のデータベース以外のファイルやフォルダを無視するようになりました。これにより、macOSで報告されたDS_Storeファイルのエラーが特に修正されます。
* 更新前ノードがエラーにならないように、CLIでbuild-dirフラグを指定できるように修正しました。
* ノードマネージャデーモンでサポートされなくなったplugin-dirフラグを削除しました。通常、このフラグを指定しないと正しい動作になります。しかし、複雑なインストールでは、build-dirフラグが必要な場合があります。
* ピアハンドシェイクが完了した接続にのみゴシップメッセージを送信するようにしました。
* コンセンサスなトラバースやブートストラップ時のメモリの割り当てを削減しました。

## v1.4.5（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)）

**Apricotフェーズ2 - パッチ5 - DBアップグレード**

**この更新は、通常のバージョンアップデートよりも複雑です。より詳細な手順とFAQは**[**こちら**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**をご覧ください。**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。このパッチには、大幅なパフォーマンスの向上とその他多数の更新が含まれています。
{% endhint %}

**VMの改善：**

* `platformvm`の状態管理を全面的に見直しました。
   * オブジェクトを再解析せずに修正や読み取りが可能な状態参照を渡すために、ブロックを介して渡される`versiondb`の使い方を削除しました。
   * ベースとなるデータベースへの書き込みを適切にキャッシュして管理するベースステートマネージャーを実装しました。
   * CoWバリデーターセットを実装し、複数のバリデーターセットをメモリにキャッシュできるようにしました。
   * 使用されていない状態のオブジェクトに触れないように、サブネットでチェーンをインデックス化します。
   * `addDelegator`および`addSubnetValidator`のトランザクションを受け入れる際に不要な反復を避けるため、バリデータを`nodeID`でインデックス化しました。
   * ディスク上のバリデーターセットやバリデーターのアップタイムの管理に使用するキーバリューペアの数を削減しました。
* リワードのインデックス化をサポートするために、`platformvm`のAPIにステーキングのリワードのルックアップを追加しました。
* テストを簡単にするために、バリデーターのアップタイム計測を再構成しました。
* `platformvm`にブロックとトランザクションタイプのメトリックを追加しました。
* `avm`と`platformvm`にAPI呼び出しメトリックを追加しました。
* `avm`のステータス管理を`prefixdb`のものを使用するように更新し、キャッシングメトリックを記録して、`platformvm`と追加のコードを共有しました。
* `avm`と`platformvm`での`UTXO`の管理とインデックスの作成を簡略化しました。
* アドレスの解析と管理を再構築し、互換性のあるVMインスタンス間で完全に共有できるようになりました。
* 一次サブネットの共有メモリを再構築し、VMインスタンス間で完全に共有できるようにしました。
* チェーンステートの実装を追加し、既存のVM実装上のシームレスなキャッシングをサポートし、新しいVMの実装を簡略化しました。
* 新しいチェーンステートマネージャーを`rpcchainvm`に統合し、様々なメトリックも追加しました。
* 将来のネットワークのアップグレードに対応するために、標準のVMインターフェースに`upgradeBytes`と`configBytes`を追加しました。
* `evm`のAPIに`getAtomicTx`と`getAtomicTxStatus`のエンドポイントを追加しました。
* コンセンサスエンジンと同期して行われる`evm`ブロック生成を簡易化しました。
* 孤立したアトミックトランザクションを再導入するために、アトミックトランザクションのmempoolを追加しました。
* `evm`のクライアントで、`getAtomicUTXOs`の`sourceChain`が正しく設定されていないバグを修正しました。
* 新しいチェーンステートマネージャーを`evm`に統合し、ブロック管理の最適化を図りました。

**ブートストラップの改善：**

* ブートストラップ中の再トラバースを削除しました。これにより、ブートストラッププロセスの再起動時のノードのパフォーマンスが大幅に改善されました。
* ブートストラップされたコンテナを実行中にノードを終了しようとすると、不適切なノードのシャットダウンが発生する問題を修正しました。
* ブートストラップ中にIPCコンテナのブロードキャストが重複していたのを修正しました。
* ブートストラップジョブキューを標準化し、カスタムの接頭辞を実装するのではなく、`prefixdb`を使用して状態に書き込むようにしました。
* ブートストラップによるキャッシングとキャッシュメトリックを追加しました。

**データベースの移行に関する追加事項：**

* 更新されたデータベースフォーマットにシームレスに移行するためのデーモンプロセスマネージャーを追加しました。
* データベースのセマンティックバージョンを追跡するために、バージョン処理を再構成しました。
* データベースマネージャーを導入し、異なるバージョンのデータベースを追跡、操作することができるようになりました。
* `v1.0.0`のデータベースから`v1.4.5`のデータベースにユーザーを自動的にコピーする`keystore`の移行を導入しました。
* `v1.0.0`データベースから`v1.4.5`バリデーターのアップタイム移行を実装しました。

**ノードの改良：**

* 環境変数を常に展開するように設定解析を更新しました。
* TLS証明書をディスクを介さずにメモリ上で指定できるようにノード設定を変更しました。
* 意味のある終了コードのサポートを強化しました。
* `http`と`staking`のサーバーのリスニングアドレスを表示することで、特定のポートマッピングをサポートすることができます。
* `versionable`データベースを実装し、パススルーデータベースと`versioned`データベースを切り替えられるようにしました。
* ID`Set`の事前割り当てを最適化し、`struct`のメモリ使用量を削減しました。
* より厳格なリンティングルールの適用をしました。

**コマンドライン引数の変更：**

次の引数`"default"`は、以前、キーワードとして扱われていました。現在では、`"default"`はフラグの意図した値として扱われる試みがされています。デフォルトの動作を維持する場合には、フラグを指定しないでください。

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

次の引数`""`は、以前、キーワードとして扱われていました。現在では、`""`はフラグの意図した値として扱われる試みがされています。デフォルトの動作を維持する場合には、フラグを指定しないでください。

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

`bootstrap-ips`と`bootstrap-ids`をペアにする必要はもうありません。つまり、`bootstrap-ids`と異なる数の`bootstrap-ips`を指定できるようになったということです。`bootstrap-ips`はネットワークへの初期接続に使用され、`bootstrap-ids`はブートストラップのビーコンとして使用されます。

**コマンドライン引数の追加：**

* `fetch-only`
* `build-dir`

**コマンドライン引数の削除：**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)）

**Apricotフェーズ2 - パッチ4**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。
{% endhint %}

このパッチには、次期の`db-upgrade`リリースの最適化を目的としたバグ修正とパフォーマンスの改善が含まれています。

* サブネットで最後のチェーンがブートストラップとしてマークされると同時に、すべてのチェーンが終了するように、ブートストラップのテーリング遅延をスキップしました。
* ブートストラップ時のメッセージ処理を改善し、他のチェーンの同期を待つ間にメッセージを処理できるようになりました。
* 既存のサンプラーを再利用することで、サンプラーの割り当てを削減します。
* `master`ブランチからイメージをプッシュするだけのドッカースクリプトを更新しました。
* ログのフォーマットを修正しました。
* エラーメッセージを改善しました。

## v1.4.3（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)）

**Apricotフェーズ2 - パッチ3**

{% hint style="warning" %}
このアップデートは後方互換性があります。任意ですが、推奨します。
{% endhint %}

このパッチには、バグ修正、アップタイムモニタリングの更新、パフォーマンスの改善が含まれています。

* ブートストラップ時にノードが進行不能になる原因となっていたベンチメッセージの処理を修正しました。この問題は、ノードがブートストラップを終了する際に、通常の実行に移行できない場合に発生します。
* C-Chainのコードベースにある非決定論的なバグを修正しました。このバグにより、大量のトランザクションブロードキャストのリクエストを受け取ったノードが、他のノードによって生成されたブロックを処理するまで、ブロックの生成を一時的に停止することがありました。
* ピアに送信するバージョンメッセージの数を1つに制限しました。
* Apricotフェーズ2で非推奨となったレガシーハンドシェイクメッセージを削除しました。
* ベンチマークを付けたノードをアップタイム計算のためにオフラインとしてマークします。
* バリデーターセットの変更時のパフォーマンスを向上させるために、バリデーターセットを更新しました。
* 切断時に、相手が現在バリデーターである場合にのみ再接続を試みるようにネットワークを更新しました。

## v1.4.2（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)）

**Apricotフェーズ2 - パッチ2**

{% hint style="warning" %}
この更新は、v1.4.0およびv1.4.1との下位互換性があります。アップグレードの変更点は、Fujiテストネットでは東部標準時2021年5月5日午前10時、メインネットでは東部標準時2021年5月10日午前7時に有効となります。
{% endhint %}

このパッチでは、ゴシップのピアリストメッセージのサイズをさらに小さくし、いくつかの新しいフラグを導入しています。

* `network-peer-list-size`は、各`peerlist`メッセージでゴシップのピア数を調整することができます。
* `network-peer-list-gossip-size`は、ゴシップ`peerlist`メッセージを送信するピアの数を調整することができます。
* `network-peer-list-gossip-frequency`は、`peerlist`のゴシップの頻度を調整することができます。

## v1.4.1（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)）

**Apricotフェーズ2 - パッチ1**

{% hint style="warning" %}
この更新は、v1.4.0との下位互換性があります。v1.4.0リリースの更新予定時間をご確認ください。
{% endhint %}

このパッチは、ゴシップのピアリストメッセージのサイズを小さくし、起動時にビーコン接続のタイムアウトを設定できる新しいフラグ`--bootstrap-beacon-connection-timeout`を導入します。

## v1.4.0（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)）

**Apricotフェーズ2**

{% hint style="danger" %}
**この変更は、以前のリリースとの後方互換性はありませんのでご注意ください。**

**関連するブログ記事は**[**こちら**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**からご覧いただけます。**
{% endhint %}

{% hint style="warning" %}
今回のアップグレードでは、Ethereum BerlinのアップグレードをC-Chain,に適用し、新しいAVMエンドポイントを追加するとともに、様々な安定性の向上を図っています。コミュニティの皆様には、ご自身のノードが健全であることを確認するために、できるだけ早くアップデートされることをお勧めします。

アップグレードの変更点は、Fujiテストネットでは東部標準時2021年5月5日午前10時、メインネットでは東部標準時2021年5月10日午前7時に有効となります。
{% endhint %}

**今回のアップグレードの主な内容は、次の通りです。**

* go-ethereumのv1.10.2に依存するようにCorethを更新しました。
* Ethereum Berlinのアップグレードを適用しました。具体的には、[EIP-2565](https://eips.ethereum.org/EIPS/eip-2565)、[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)、[EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)、[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)です。
*  C-Chainに、新しいステートフルなコンパイル済のスマートコントラクトを追加し、ANTの転送とANTの周りのARC-20ラッパーをサポートしました。
* AVM`/events`エンドポイントを追加し、このエンドポイントは、アドレスフィルターに一致するトランザクションが受け入れられたことをWebsocketで通知することをサポートします。
* 2つの新しいネットワークメッセージタイプ`SignedVersion`と`SignedPeerlist`を追加し、バリデーター→IPマッピングを改善しました。
* 長い間続いていた、チェーンのブートストラップ中にノードをシャットダウンすると、チェーンが不自然にシャットダウンされるというバグを修正しました。
* 安定性を向上させるために、大きなリクエストをページングするようにプラグインgRPCパッケージを更新しました。
* Avalanchegoのメインバイナリをプラグインとして実行する機能を追加しました。
* Leveldbの破損防止機能のレースコンディションの可能性を修正しました。
* 自動化されたビルドスクリプトを更新し、複数のアーキテクチャをよりよくサポートするようになりました。

**コマンドライン引数の追加：**

* `plugin-mode-enabled`は、プラグインモードで実行するバイナリを指定します。

**コマンドライン引数の削除：**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)）

**Apricotフェーズ1 - パッチ2**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、セキュリティの改善、バグの修正、およびモニタリングの改善が含まれています。
{% endhint %}

**セキュリティの向上**

* `Apricot Phase 1`以前に作成されたC-Chainブロックに厳格な正規フォーマットを適用しました。これにより、`extra-data`のブロックフィールドを変更しても、ブートストラップ中にチェーンの状態が変更されることはありません。
* `Keystore`AvalancheGoとプラグイン処理間のIPCで暗号化された値のみが送信されるように変更しました。

**バグの修正：**

* デリゲーションキャップの計算において、デリゲーターを削除する前に現在のデリゲーションの最大値を更新するように修正しました。これにより、デリゲーションキャップが常に適用されるようになりました。
* 起動時に`AVM`の静的APIが正しく登録されるように修正しました。
* ネットワークのアップグレードを考慮してノード`uptime`の計算を更新しました。

**モニタリングの改善**

* 任意のノードインデクサを追加し、これにより、チェーンで受け付けた操作の順序をローカルに一貫したものにすることができます。
* Ansibleのインベントリを更新し、多数の改良を加えました（@moreatiに感謝します）。

## v1.3.1（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)）

**Apricotフェーズ1 - パッチ1**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、安定性、モニタリングの改善、およびマイナーなバグの修正が含まれています。
{% endhint %}

**今回のアップグレードの主な内容は、次の通りです。**

* arm64のCPUで圧縮を行う際に発生するC-Chainのセグメンテーションを修正しました。
* 複雑なノードモニタリングを可能にするために、ローカルファイルにグループパーミッションを追加しました。
* API-auth-password-fileフラグで渡されたAuthのパスワードから、空白を取り除きます。
* timeSinceNoOutstandingRequestsがlongestRunningRequestに置き換えられたため、削除しました。
* ネットワークスロットルに追加のメトリックを追加しました。
* 様々なコードのクリーンアップ。

**コマンドライン引数の追加：**

* `network-health-max-outstanding-request-duration`

**コマンドライン引数の削除：**

* `network-health-max-time-since-no-requests`

## v1.3.0（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)）

**Apricotフェーズ1**

{% hint style="danger" %}
この変更は、以前のリリースとの後方互換性はありませんのでご注意ください。

今回のアップグレードでは、C-Chainガス価格の削減、C-Chainガスの払い戻しの削除、そして様々なセキュリティの改善が行われています。コミュニティの皆様には、ノードを健全性を保つために、できるだけ早く更新されることを推奨します。
{% endhint %}

アップグレードの変更点は、Fujiテストネットでは2021年3月25日午前10時（アメリカ東部標準時）、メインネットでは2021年3月31日午前10時（アメリカ東部標準時）に有効となります。

**今回のアップグレードの主な内容は、次の通りです。**

* C-Chainのガスコストを470nAVAXから225nAVAXに削減します。
* C-Chainガスの払い戻しを削除しました。この変更は[EIP-3298](https://eips.ethereum.org/EIPS/eip-3298)を採用しています。
* ネットワークのアップグレード時にC-Chainの検証がよりクリーンになるようにリファクタリングしました。
* 取り消されたトークンを適切に実行するようにAuth APIを修正しました。
* Auth APIを強化し、期待通りの署名フォーマットが使用されるようにしました。
* CLIの引数からAuth APIのパスワードを削除しました。
* より厳密なファイル許可のチェックを追加しました。
* 細かいエラー処理を追加しました。
* ログの書き込みをディスクに書き込む前にサニタイズします。
* HTTPエンドポイントに設定可能なオリジンを追加しました。
* 起動時のHTTPsからHTTPへのフェイルオーバーの試みを削除しました。これにより、HTTPエンドポイントのHTTPsへのアップグレードに失敗した場合、起動時にノードが終了するようになりました。

**コマンドライン引数の追加：**

* `api-auth-password-file`は、Auth APIのパスワードを読み取るファイルを指定します。

**コマンドライン引数の削除：**

* `api-auth-password`

## **v1.2.4（**[**GitHubでの表示**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**）**

**Apricotフェーズ0 - アップグレード1 - パッチ4**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、安定性とモニタリングの改善が含まれています。
{% endhint %}

* Readmeを更新し、ストレージの要件を修正しました。
* ブートストラップ時のAvalancheトランザクションの検証に追加のエラー処理を加えました。
* ノードの健全性やデータベースの使用状況に関する多数の新しいメトリックの追加、使用されていないメトリックや無効なメトリックの削除、いくつかのメトリック名の修正など、多数のメトリックを更新しました。
* CIにログを追加しました。
* クリティカルチェーンのリストにC-Chainを追加しました。

## **v1.2.3（**[**GitHubでの表示**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**）**

**Apricotフェーズ0 - アップグレード1 - パッチ3**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、安定性とモニタリングの改善が含まれています。
{% endhint %}

* `[network, router, consensus]`健全性チェックのパラメータを調整し、健全性チェックの不安定さを解消しました。
* C-Chainブロックの取り扱いが容易になりました。

## **v1.2.2（**[**GitHubでの表示**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**）**

**Apricotフェーズ0 - アップグレード1 - パッチ2**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、安定性、パフォーマンス、およびモニタリングに関する改善が含まれています。
{% endhint %}

* ネットワークライブラリにIPエイリアスを追加し、繰り返し`SYN`を呼び出しを避けるようにしました。
* 自分自身からブートストラップを行う際のブートストラップメッセージの処理を修正しました。
* 簡略化された`AdvanceTimeTx`の発行。
* 新しいコンセンサスの健全性チェックを追加しました。
* ノード健全性ロギングの追加。
* `GET`健全性リクエストに健全性レスポンスを追加しました。
* 受信メッセージのログを統合します。
* `LevelDB`ラッパーにエラーログを追加しました。
* 文字列の解析を避けるために、`rpcdb`にエラーコードを追加しました。
* CanonicalチェーンのC-Chainの取り扱いを改善し、リオーグの数を減らしました。
* `pending`ブロック上で実行されるモック呼び出しのC-Chainの処理を改善しました。

## **v1.2.1（**[**GitHubでの表示**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**）**

**Apricotフェーズ0 - アップグレード1 - パッチ1**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、安定性、パフォーマンス、およびモニタリングに関する改善が含まれています。

今回の更新では、コマンドライン引数の「ネットワークタイムアウトの増加」および「ネットワークタイムアウトの削減」が削除されていますのでご注意ください。
{% endhint %}

変更の概要：

* 「Platformvm.getStake」レスポンスに「UTXO」を追加しました。
* 「info.peers」レスポンスにベンチリストレポートを追加しました。
* ネットワーク層に健全性チェック機能を追加しました。
* 報告されるメトリックとして、「ステーク接続の割合」を追加しました。
* スループットが高い時間帯でも、ノードが現在のチップに追いついていることを確認するために、ブートストラップの再起動ロジックを追加しました。
* サブネット全体でのブートストラップを追加し、他のチェーンのブートストラップによってチェーンが遅れをとることがないようにしました。
* 不必要な計算を避けるために、拒否されたブロックの検証を防止しました。
* 優先されないブロックのネットワークへのゴシップを削除しました。
* ネットワークタイムアウト計算機で、観測されたネットワーク待ち時間のEWMAを使用するように変更しました。
* ネットワーク待ち時間の計算から「Get」リクエストを削除しました。
* ベンチリストのアルゴリズムを改良しました。
* 送信時にドロップしたメッセージの処理を改善しました。
* 未処理のリクエストとタイムアウトのロジックを整理しました。
* パフォーマンストラッキングを一般化し、プロファイル名の接頭辞を可能にしました。
* Avalancheのブートストラップトラバーサルにキャッシュ機能を追加しました。
* Ansibleリンティングを修正しました。
* 追加されたコマンドライン引数は、主に健全性のチェックの設定で構成されます。また、ネットワーク待ち時間の計算方法を変更したことで、いくつかのコマンドライン引数の名前が変わりました。

コマンドライン引数の追加：

* `network-timeout-halflife`
* `network-timeout-coefficient`
* `network-health-min-conn-peers`
* `network-health-max-time-since-msg-received`
* `network-health-max-time-since-msg-sent`
* `network-health-max-portion-send-queue-full`
* `network-health-max-send-fail-rate`
* `network-health-max-time-since-no-requests`
* `router-health-max-drop-rate`
* `router-health-max-outstanding-requests`
* `health-check-frequency`
* `health-check-averager-halflife`
* `bootstrap-retry-enabled`
* `bootstrap-retry-max-attempts`

コマンドライン引数の削除：

* `network-timeout-increase`
* `network-timeout-reduction`

## v1.2.0（[GitHubでの表示](https://github.com/ava-labs/avalanchego/tree/v1.2.0)）

**Apricotフェーズ0 - アップグレード1**

{% hint style="danger" %}
**このパッチは、以前のリリースとの下位互換性はありませんのでご注意ください。今回のアップグレードでは、X、C、P チェーン間のインターチェンジ転送に関するパフォーマンスの問題が修正されています。ご自身のノードが影響を受けないようにするため、コミュニティの皆様にはできるだけ早くアップグレードすることを推奨します。また、アップグレード後にノードの接続に数分かかることがありますが、このプロセスは中断せずに完了させてください。**
{% endhint %}

今回のアップグレードの主な内容は、次の通りです。

* C-Chainにおけるアトミックインポートの検証を修正
* アトミックボーナスブロックを可能にするルール例外ロジックを追加
* 重複した削除が行われた場合に、共有メモリにフェイルファストのロジックを追加
* Snowmanで、リクエストのクリアに失敗してポールが停滞することがある問題を修正しました
* 祖先が不明のため、corethのBAD BLOCK問題を修正しました
* Corethのrepair canonicalチェーンスクリプトにおけるレースコンディションを修正しました
* Snowmanの処理ブロック数とAvalancheの処理トランザクション数の制限しました
* ネットワークのタイムアウトのデフォルト値とベンチリストの設定を更新しました
* 最初のネットワークの不安定さの後、安全性に問題がないことを確認しました

## v1.1.5（[GitHubでの表示](https://github.com/ava-labs/avalanchego/tree/v1.1.5)）

**Apricotフェーズ0 - パッチ5**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、安定性の向上が含まれています。
{% endhint %}

* 新しいチェーンを登録する際に、P-Chainとhttp(s)のエンドポイントがブロックしてしまうデッドロックの可能性があることを修正しました。
* C-ChainのTxID → ブロックの高さのインデックスを修正
* C-chain.のdebug_traceTransaction APIにおいて、空のコントラクトデプロイメントのグレースフルな処理を追加しました。
* C-Chainのエラー処理を改善しました。

## v1.1.4（[GitHubでの表示](https://github.com/ava-labs/avalanchego/tree/v1.1.4)）

**Apricotフェーズ0 - パッチ4**

{% hint style="danger" %}
今回の更新は後方互換性があります。任意ですが、推奨します。このパッチには、CLIのアップグレード、APIのバグフィックス、安定性の向上、パフォーマンスの改善が含まれています。
{% endhint %}

* C-Chainブロックのインデックスが、指定された高さの受け入れられないブロックにマッピングされることがある問題を修正しました。
* RPCChainVMのAPI負荷が高い場合のVMクラッシュを修正しました。
* Avalancheエンジンの楽観的な投票バブリングが、処理する頂点に正しくVOTEを渡すように修正しました。
* AVMのGetBalanceおよびGetAllBalances APIメソッドにフィールドIncludePartialを追加しました。これにより、デフォルトの動作が、支出可能な資産と独自に所有する資産の残高のみを返すように変更されます。
* カスタムネットワークIDにカスタムジェネシス設定を指定できるようになりました。
* IPC APIの機能を追加しました。
* RPCChainVMにキャッシング機能を追加しました。
* プラグインのディレクトリ検索を改善し、常にバイナリリリースで動作するようにしました。

## v1.1.3（[GitHubでの表示](https://github.com/ava-labs/avalanchego/tree/v1.1.3)）

**Apricotフェーズ0 - パッチ3**

{% hint style="danger" %}
この更新は任意ですが、推奨します。このパッチには、APIに関連するマイナーなバグ修正が含まれています。
{% endhint %}

* C-Chainのログをフィルタリングしようとしたときに、呼び出しがハングアップする問題を修正しました。
* C-Chainクライアントが適切なマルチコインAPIを呼び出すように修正しました
* `getAtomicUTXOs`から`avm`と`platformvm`のAPIクライアントを追加しました。

## v1.1.2（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)）

**Apricotフェーズ0 - パッチ2**

{% hint style="danger" %}
この更新は任意ですが、推奨します。このパッチには、バグ修正とパフォーマンスの向上が含まれています。
{% endhint %}

* Avalanche.のブートストラップ時の処理キャッシュを修正し、重複するトラバースを減らしました。
* ブートストラップ中に最適化されたP-Chainの検証。
* 最大ベンチリストの計算で、適切な入力値を使用するように修正しました。
* CIから余分なリンターランを削除しました。
* `snowman.Block`のインターフェースに`Height`を追加しました。

## v1.1.1（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)）

**Apricotフェーズ0 - パッチ1**

{% hint style="danger" %}
この更新は任意ですが、推奨します。このパッチには、バグ修正とパフォーマンスの向上が含まれています。
{% endhint %}

* ユーザーが`Health`APIを無効にするとノードがクラッシュするバグを修正しました。
* アップタイムのトラッキングにおいて、ノードのアップタイムを過剰に報告してしまうバグを修正しました。
* `Codec`を使用するように頂点解析をリファクタリングしました。
* ステートフルとステートレスの頂点管理を分離します。
* コーデックにフィールドごとのスライス長のチェック機能を追加しました。
* `TypeID`をグループ化した新しいコーデックタイプを導入しました。
* CLIにメッセージ制限フラグを導入しました。
* 将来のデータベース移行時に使用されるsemanticdbパッケージを導入しました。
* チェーンコンテキストにエポックトラッキングを追加しました。
* トランザクションの検証時に返されるエラーメッセージの一部を改善しました。
* バージョンDBでは、GCの圧力を下げました。

## v1.1.0（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)）

**アプリコットフェーズ0**

{% hint style="danger" %}
**今回のアップグレードは、以前のリリースとの後方互換性はありませんのでご注意ください。アップグレードは、12月7日（月）午後11時（UTC）（アメリカ東部時間午後6時）までに実施してください。当初、12月中旬頃に予定していたアップグレードは、トークンのロック解除に関する重要なバグを修正するために迅速に処理されています。コミュニティの皆様には、ご自身のノードが影響を受けないように、できるだけ早くアップグレードされることをお勧めします。**
{% endhint %}

このアップグレードには主に2つの要素があります。

* アプリコットフェーズゼロアップグレードと呼ばれるアプリコットネットワークのアップグレードに向けた一般的な準備
* ロック_**_時間が経過した後、ステーク可能なロックされた出力のロックが解除されない問題を修正しました。

## v1.0.6（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)）

{% hint style="danger" %}
このリリースには、[こちら](https://docs.avax.network/build/apis/deprecated-api-calls)で記載されている変更が含まれていることに注意してください。このリリースでは、platform.getTxStatusおよびplatform.getCurrentValidatorsのデフォルトのレスポンスフォーマットが変更されています。アップデートは任意ですが、推奨します。このパッチには、パフォーマンスの改善と一部の寿命の質の向上が含まれています。
{% endhint %}

* platform.getTxStatusおよびplatform.getCurrentValidatorsの非推奨のフォーマットを削除しました。
* キーストアAPIからインポートおよびエクスポートされたユーザーの16進数をサポートするようになりました。
* Go言語の要件をv1.15.5にすることで、Go言語の標準ライブラリに見つかったDoS脆弱性を回避します。
* ノードソフトウェアと対話するヘルパーとして機能するAPIクライアントを追加しました。
* ノードがネットワークの残りの部分から切断された場合に、ブートストラップにフォールバックすることを有効にしました。
* UTXOが複数のアドレスを参照する場合のGetUTXO APIを修正しました。
* RPCオプションをより一般化するために、バイナリエンコーディングをリファクタリングしました。
* IPブロックフィルタリングでウィンドウの長さが正しく設定されるように修正しました。
* コーデックパッケージを一般化し、バージョンの異なる複数のコーデックを管理できるようにしました。
* 将来のリリースに向けて、Vertexインターフェースにエポックを追加しました。
* トランザクションのハッシュ化を延期し、過去の高速チェック時のCPU/メモリ使用量を削減しました。
* [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/)をお使いの方は、今後のリリースでURLが停止される予定です。お手数ですが、[https://explorerapi.avax.network/](https://explorerapi.avax.network/)に切り替えてください。

このアップデートのサポートについては、[デベロッパー用FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)に従ってください。それでも問題が発生する場合は、[Discord](https://chat.avax.network/)に参加してサポートを受けることができます。

## v1.0.5（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)）

{% hint style="danger" %}
このリリースの後にリリースされるv1.0.6には、[こちら](https://docs.avax.network/build/apis/deprecated-api-calls)で説明した変更点が含まれています。具体的には、`platform.getTxStatus`と`platform.getCurrentValidators`のレスポンスフォーマットが変わります。
{% endhint %}

このリリースv1.0.5での変更点は、以前のリリースとの後方互換性があります。更新は任意ですが、推奨されます。このパッチには、パフォーマンスの向上と一部の寿命の質の改善が含まれています。

* C-Chain APIに`IssueTx`と`GetUTXOs`を追加し、ノードに秘密鍵を明かすことなくアトミックスワップを発行できるようにしました。
* オラクルブロック処理を行うSnowmanリクエストマネージャーのメモリリークを修正しました。
* 利用可能な資金が過少に報告されるUTXOのページネーションのバグを修正しました。
* チェーンのhttpログを人間が読めるチェーンログフォルダに移動しました。
* ヒープの割り当てを避けるために、IDの管理方法を再構築します。
* 複数のマップを作成しないように`UniformSampler`を最適化しました。
* `ids.Set`の使用を減らし、`[]ids.ID`を使用することで、連続したメモリーをより有効に活用できるようになりました。
* `[]byte`での`PrefixDB`の再利用を紹介しました。
* 型固有のソート関数を実装し、インターフェース変換の割り当てが頻繁に行われないようにしました。
* AVMのロードユーザーを最適化し、ディスクから不要な情報を読み込まないようにしました。
* ソケット送信時のメモリ確保＋コピーで、メッセージの全長分を削除しました。

このアップデートのサポートについては、[デベロッパー用FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)に従ってください。それでも問題が発生する場合は、[Discord](https://chat.avax.network)に参加してサポートを受けることができます。

## v1.0.4（[GitHubでの表示](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)）

![AvalancheGoリリースノートv1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}`-public-ip=127.0.0.1`{% endhint %}
この更新は任意ですが、推奨されています。このパッチには、寿命の質の改善と様々なパフォーマンスの向上が含まれています。今回の更新では、CLIのパラメータを - または - で指定するのではなく、 - で指定する必要があることに注意してください。例えば、は許可されなくなり、として指定する必要があります。 その他、このアップデートは後方互換性があります。
`--public-ip=127.0.0.1`

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

このアップデートのサポートについては、[デベロッパー用FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq)に従ってください。それでも問題が発生する場合は、[Discord](https://chat.avax.network)に参加してサポートを受けることができます。

