# コマンドラインインターフェース

次の引数でノードの設定を指定することができます。

## 引数

### 設定ファイル

`--config-file`（文字列）：

このノードの設定を指定するJSONファイルへのパス。コマンドラインの引数は、設定ファイルで設定された引数よりも優先されます。

JSONコンフィグファイルの例。

```javascript
{
    "log-level": "debug"
}
```

### API

`--api-admin-enabled`（ブーリアン）：

`false`に設定すると、このノードはAdmin APIを公開しません。デフォルトでは`false`に設定されています。詳しくは、[こちら](../avalanchego-apis/admin-api.md)をご覧ください。

`--api-auth-required`（ブーリアン）：

`true`に設定されている場合、APIコールは認証トークンを必要とします。デフォルトでは`false`に設定されています。詳しくは[こちら](../avalanchego-apis/auth-api.md)をご覧ください。

`--api-auth-password`（文字列）：

認証トークンの作成・取消に必要なパスワード。`--api-auth-required=true`の場合は指定しなければならず、そうでない場合は無視されます。詳しくは[こちら](../avalanchego-apis/auth-api.md)をご覧ください。

`--api-health-enabled`（ブーリアン）：

`true`に設定すると、このノードはHealth APIを公開します。デフォルトでは`true`に設定されています。詳しくは[こちら](../avalanchego-apis/health-api.md)をご覧ください。

`--index-enabled`（ブーリアン）：

`false`の場合、このノードはインデクサを有効にせず、Index APIは利用できません。デフォルトは`false`です。詳しくは[こちら](../avalanchego-apis/index-api.md)をご覧ください。

`--api-info-enabled`（ブーリアン）：

`true`に設定すると、このノードはInfo APIを公開します。デフォルトでは`true`に設定されています。詳細は[こちら](../avalanchego-apis/info-api.md)をご覧ください。

`--api-ipcs-enabled`（ブーリアン）：

`true`に設定すると、このノードはIPCs APIを公開します。デフォルトでは`false`に設定されています。詳しくは[こちら](../avalanchego-apis/ipc-api.md)をご覧ください。

`--api-keystore-enabled`（ブーリアン）：

`false`に設定すると、このノードはKeystore APIを公開しません。デフォルトでは`true`に設定されています。詳しくは[こちら](../avalanchego-apis/keystore-api.md)をご覧ください。

`--api-metrics-enabled`（ブーリアン）：

`false`に設定すると、このノードはMetrics APIを公開しません。デフォルトでは`true`に設定されています。詳しくは[こちら](../avalanchego-apis/metrics-api.md)をご覧ください。

### アサーション

`--assertions-enabled`（ブーリアン）：

`true`に設定すると、アサーションはコードベース全体でランタイムに実行されます。これは、より具体的なエラーメッセージを得ることができるため、デバッグでの使用を意図しています。デフォルトでは`true`に設定されています。

### ブートストラップ

`--bootstrap-beacon-connection-timeout`（デュレーション）：

起動しているビーコンに接続しようとする際のタイムアウト。デフォルトでは`1m`に設定されています。

`--bootstrap-ids`（文字列）：

ブートストラップIDは、バリデータIDの配列です。これらのIDは、ブートストラップピアの認証に使用されます。このフィールドの設定例は、`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`です。デフォルト値は、ネットワークIDに依存します。

`--bootstrap-ips`（文字列）：

ブートストラップIPは、IPv4:ポートのペアの配列です。これらのIPアドレスは、現在のAvalancheの状態をブートストラップするために使用されます。このフィールドの設定例は`--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`です。デフォルト値は、ネットワークIDによって異なります。

`--bootstrap-retry-enabled`（ブーリアン）：

Trueの場合は、起動に失敗した場合に再起動します。

`--bootstrap-retry-max-attempts`（uint）：

失敗した後にブートストラップを再試行する最大回数。

### データベース

`--db-dir`（文字列、ファイルパス）：

データベースを永続化するためのディレクトリを指定します。デフォルトは`"$HOME/.avalanchego/db"`です。

`--db-type`（文字列）：

使用するデータベースの種類を指定します。`leveldb`、`rocksdb`、`memdb`のいずれかである必要があります。`memdb`は、インメモリー、非パーシステッドデータベースです。

なお、`leveldb`を実行すると、`rocksdb`の実行時に永続化されたデータを読むことができなくなります。

**RocksDBに関する重要な注意点を2つ挙げておきます**。まず、RocksDBはすべてのコンピュータで動作するわけではありません．次に、RocksDBはデフォルトではビルドされず、一般に公開されているバイナリにも含まれていません。AvalancheGoをRocksDBでビルドするには、ターミナルで`export ROCKSDBALLOWED=1`を実行し、次に`scripts/build.sh`を実行します。`--db-type=rocksdb`を使用する前にこれを行う必要があります。

### Genesis（ジェネシス）

`--genesis`（文字列）：

使用するgenesisデータを含むJSONファイルへのパス。標準的なネットワーク（Mainnet、Testnet）を実行している場合は無視されます。与えられない場合は、デフォルトの genesis データを使用します。GenesisデータのJSON表現の例については、[こちら](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16)をご覧ください。

### HTTPサーバー

`--http-host`（文字列）：

HTTP APIがリッスンするアドレスです。デフォルトでは`127.0.0.1`に設定されています。これは、デフォルトではノードが同じマシンからのAPIコールしか処理できないことを意味します。他のマシンからのAPIコールを許可するには、`--http-host=`を使用します。

`--http-port`（int）：

各ノードは、ノードやAvalancheネットワークと対話するためのAPIを提供するHTTPサーバーを実行します。この引数には、HTTPサーバーがリッスンするポートを指定します。デフォルト値は`9650`です。

`--http-tls-cert-file`（文字列、ファイルパス）：

この引数は、ノードがHTTPSサーバーに使用するTLS証明書の場所を指定します。`--http-tls-enabled=true`の時に指定する必要があります。デフォルト値はありません。

`--http-tls-enabled`（ブーリアン）：

このフラグが`true`に設定されていると、HTTPSを使用するようにサーバーをアップグレードしようとします。デフォルトでは`false`に設定されています。

`--http-tls-key-file`（文字列、ファイルパス）：

この引数は、ノードがHTTPSサーバーに使用するTLSプライベートキーの場所を指定します。`--http-tls-enabled=true`の場合に指定する必要があります。デフォルト値はありません。

### IPCS

`--ipcs-chain-ids`（文字列）

接続先となるチェーンIDのコンマ区切りリスト。デフォルト値はありません。

`--ipcs-path`（文字列）

IPCソケット用のディレクトリ（Unix）または名前付きpipe prefix（Windows）です。デフォルトは/tmpです。

### ファイル記述子の制限

`--fd-limit`（int）

プロセスファイル記述子の上限を少なくともこの値まで引き上げることを試みます。デフォルトは`32768`です。

### ロギング

`--log-level`（文字列、`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`）：

ログレベルは、どのイベントを記録するかを決定します。7つのレベルがあり、優先度の高いものから低いものへと順に並んでいます。

* `Off`：このレベルのログはありません。
* `Fatal`：復旧できない致命的なエラー
* `Error`：ノードが遭遇したエラーで、これらのエラーは回復することができました。
* `Warn`：偽のビザンチンノードや将来のエラーの可能性を示す警告です。
* `Info`：ノードのステータス更新に関する有用な記述。
* `Debug`：デバッグログは、コードのバグを理解しようとする場合に便利です。通常の使用で必要とされるより多くの情報が表示されます。
* `Verbo`：ノードが処理している膨大な量の情報を追跡します。これには、メッセージの内容や、極めて低いレベルのプロトコル分析のためのデータのバイナリダンプが含まれます。

`Info`ログレベルを指定する場合は、指定された優先度以上のログがすべて追跡されることに注意してください。デフォルトは(1)です。

`--log-display-level`（文字列、`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`）：

ログレベルは、どのイベントを画面に表示するかを決定します。空白にすると、`--log-level`で指定した値がデフォルトになります。

`--log-display-highlight`（文字列、`{auto, plain, colors}`）：

表示されるログに色をつけたり、ハイライトするかどうか。デフォルトでは、出力がターミナルの場合はハイライトします。それ以外の場合は、`{auto, plain, colors}`のいずれかでなければなりません。

`--log-dir`（文字列、ファイルパス）：

システムログが保存されるディレクトリを指定します。デフォルトでは`"$HOME/.avalanchego/logs"`に指定されています。

### ネットワークID

`--network-id`（文字列）：

ノードが接続すべきネットワークの識別情報。次のいずれかになります。

* `--network-id=mainnet` -> Main netに接続に接続します。（デフォルト）
* `--network-id=fuji` -> Fuji test-networkに接続します。
* `--network-id=testnet` -> 現在のテストネットワークに接続します。(現在はFujiです。)
* `--network-id=local` -> ローカルテストネットワークに接続します。
* `--network-id=network-{id}` -> 与えられたID`id`のネットワークに接続します`[0, 2^32)`。

### 公開IP

`--public-ip`（文字列）：

バリデータは、自分の公開用IPアドレスを知っておかなければなりません。そうすることで、他のノードに接続方法を知らせることができます。この引数を指定しなかった場合は、ノードの公開IPを取得するためにNATトラバーサルを試みます。ローカルネットワークを作成するには、`127.0.0.1`に設定する必要があります。設定されていない場合は、NAT トラバーサルを使用してIPを取得しようとします。

`--dynamic-public-ip`（文字列）：

paramが存在する場合の有効な値。`opendns`、`ifconfigco`、`ifconfigme`のいずれかです。これは`--public-ip`よりも優先されます。設定すると、`--dynamic-update-duration`ごとにリモートサービスをポーリングし、ノードの公開IPアドレスを更新します。

`--dynamic-update-duration`（デュレーション）：

`--dynamic-public-ip`またはNATトラバーサルのポールイベント間の時間です。推奨される最小値は1分です。デフォルトでは`5m`に設定されています。

### 署名検証

`--signature-verification-enabled`（ブーリアン）：

署名の確認を有効にします。`false`に設定すると、署名の無効化を許可しているVMでは、署名の確認が行われません。デフォルトでは`true`に設定されています。

### ステーキング

`--staking-port`（文字列）：

ステーキングサーバーがAvalancheネットワークに外部から接続するためのポートです。デフォルトは`9651`です。

`--staking-enabled`（ブーリアン）：

AvalancheはSybil攻撃に対する抵抗としてプルーフ・オブ・ステーク（PoS）を使用し、ネットワークへの攻撃が非常に高額になるようにしています。falseの場合、Sybil攻撃に対する抵抗は無効となり、コンセンサスの際にすべてのピアがサンプリングされます。デフォルトは`true`です。

`--staking-tls-cert-file`（文字列、ファイルパス）：

Avalancheは、双方向認証のTLS接続を使用してノードを安全に接続します。この引数は、ノードが使用するTLS証明書の場所を指定します。デフォルトでは、ノードはTLS証明書が`$HOME/.avalanchego/staking/staker.crt`にあることを期待しています。

`--staking-tls-key-file`（文字列、ファイルパス）：

Avalancheは、双方向認証のTLS接続を使用してノードを安全に接続します。この引数は、ノードが使用するTLS秘密鍵の場所を指定します。デフォルトでは、ノードはTLSプライベートキーが`$HOME/.avalanchego/staking/staker.key`であることを期待しています。

`--staking-disabled-weight`（int）：

ステーキングが無効の際に各ピアに提供するWeight。デフォルトでは`1`に設定されています。

### バージョン

`--version`（ブーリアン）

これが`true`の場合、バージョンを表示して終了します。デフォルトでは`false`に設定されています。

## 高度なオプション

以下のオプションは、ノードの正しさに影響を与える可能性があります。パワーユーザーのみがこれらを変更すべきです。

### ベンチリスト

`--benchlist-duration`（デュレーション）：

`--benchlist-fail-threshold`を超えた後にベンチリストに登録される時間。デフォルトでは`1h`に設定されています。

`--benchlist-fail-threshold`（int）：

あるノードへのクエリが連続して失敗した場合、そのノードをベンチに入れるまでの回数（そのノードへのクエリはすべて失敗すると仮定します）。デフォルトでは`10`に設定されています。

`--benchlist-peer-summary-enabled`（ブーリアン）：

ピア固有のクエリレイテンシーメトリックを有効にします。デフォルトでは`false`に設定されています。

`--benchlist-min-failing-duration`（デュレーション）：

ピアへのメッセージが失敗してから、そのピアがベンチされるまでの最小時間。デフォルトでは`5m`に設定されています。

### 構築ディレクトリ

`--build-dir`（文字列）：

AvalancheGoのサブバイナリとプラグインバイナリを見つける場所を指定します。デフォルトでは、実行されたAvalancheGoバイナリのパスになります。このディレクトリの構造は次のようになっている必要があります。

```text
build-dir  
|_avalanchego-latest  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
|_avalanchego-preupgrade  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
```

### チェーンの設定

一部のチェーン（現在はC-Chainのみ）では、ノードオペレーターがカスタムの設定を提供することができます。AvalancheGoは、ファイルからチェーンの設定を読み取り、初期化時に対応するチェーンに渡すことができます。

AvalancheGoは、`--chain-config-dir`で指定されたディレクトリでこれらのファイルを探します。このディレクトリには、チェーンIDやチェーンエイリアスを名前に持つサブディレクトリを置くことができます。各サブディレクトリには、ディレクトリ名で指定されたチェーンの設定が含まれます。各サブディレクトリには、`config`という名前のファイルがあり、その値は対応するチェーンの初期化時に渡されます。例えば、C-Chainのコンフィグは、次のようになります。`[chain-config-dir-goes-here]/C/config.json`

これらのファイルが持つべき拡張子やファイルの内容は、VMに依存します。例えば、あるチェーンでは`config.txt`を期待し、他のチェーンでは`config.json`を期待する場合があります。同じサブディレクトリに、同じ名前で異なる拡張子（例：`config.json`と`config.txt`）を持つ複数のファイルが提供された場合、AvalancheGoはエラーで終了します。

特定のチェーンに対して、AvalancheGoはまずチェーンIDを名前とするコンフィグサブディレクトリを探します。見つからない場合は、チェーンの一次エイリアスを名前に持つコンフィグサブディレクトリを探します。見つからない場合は、そのチェーンの別のエイリアスの名前を持つコンフィグサブディレクトリを探します。すべてのフォルダとファイルの名前は、大文字と小文字を区別します。

これらのカスタム設定を提供することは必須ではありません。用意されていない場合は、VM固有のデフォルト設定が使用されます。

`--chain-config-dir`（文字列）：

上述のようにチェーンのコンフィグを含むディレクトリを指定します。デフォルトは`$HOME/.avalanchego/configs/chains`に設定されています。このフラグが指定されず、デフォルトのディレクトリが存在しない場合、カスタムコンフィグはオプションであるため、AvalancheGoは終了しません。ただし、このフラグが設定されている場合は、指定されたフォルダが存在していなければ、AvalancheGoはエラーで終了します。

#### C-Chainの設定

C-Chainの設定を指定するには、JSON configファイルを`{chain-config-dir}/C/config.json`（または上記のような有効な場所）に配置する必要があります。

例えば、`chain-config-dir`がデフォルト値の場合、`config.json`は`$HOME/.avalanchego/configs/chains/C/config.json`の位置に配置することができ、このような内容になります。

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

C-Chainの設定については、[こちら](command-line-interface.md#coreth-config)をご覧ください。

#### X-Chainの設定

X-Chainの設定を指定するためには、JSON configファイルを`{chain-config-dir}/X/config.json`（または、上記で指定された他の有効な場所）に配置する必要があります。

例えば、`chain-config-dir`がデフォルト値の場合、`config.json`は`$HOME/.avalanchego/configs/chains/X/config.json`の位置に配置することができ、このような内容になります。

```javascript
{
  "index-transactions": true,
  "index-allow-incomplete": false
}
```

X-Chainの設定については、[こちら](command-line-interface.md#avm-config)をご覧ください。

### C-Chain / Coreth <a id="coreth-config"></a>

`--coreth-config`（json）：

（この引数は[チェーンの設定](command-line-interface.md#chain-configs)を使用する場合には非推奨となっています）。

これにより、C-Chain.にパスされる設定を指定することができます。この設定のデフォルト値は次のとおりです。

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "rpc-gas-cap": 2500000000,
  "rpc-tx-fee-cap": 100,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": false,
  "debug-api-enabled": false,
  "web3-api-enabled": true,
  "local-txs-enabled": false,
  "pruning-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false
}
```

デフォルト値は、設定で明示的に指定されている場合のみ上書きされます。

パラメータは、次の通りです。

#### Coreth APIs

`snowman-api-enabled`（ブーリアン）：

Snowman APIを有効にします。デフォルトはfalseです。

`coreth-admin-api-enabled`（ブーリアン）：

Admin APIを有効にします。デフォルトはfalseです。

`net-api-enabled`（ブーリアン）：

`net_*`APIを有効にします。デフォルトはtrueです。

#### Coreth APIガス/価格キャップ

`rpc-gas-cap`（int）：

`eth_estimateGas`RPC呼び出し（で使用）で消費される最大のガスで、単位はnAVAX（GWei）です。デフォルトは2,500,000,000です。

`rpc-tx-fee-cap`（int）：

send-transction バリアントのグローバルトランザクション手数料 \(price \* gaslimit\) の上限 \(AVAX で測定\)。デフォルトは100です。

#### データベースのプルーニング

`pruning-enabled`\(bool\):

`false``true`trueの場合、古くなった履歴データのデータベース・プルーニングが有効になります。歴史的なルーツのすべてのデータにアクセスする必要があるノードでは、無効にする必要があります。刈り込みは新しいデータに対してのみ行われます。v1.4.9のデフォルトは\(1\)で、それ以降のバージョンでは\(2\)です。

#### Eth APIs

`eth-api-enabled`（ブーリアン）：

`eth_*`APIを有効にします。デフォルトはtrueです。

`personal-api-enabled`（ブーリアン）：

`personal_*`APIを有効にします。デフォルトはfalseです。

`tx-pool-api-enabled`（ブーリアン）：

`txpool_*`APIを有効にします。デフォルトはfalseです。

`debug-api-enabled`（ブーリアン）：

`debug_*`APIを有効にします。デフォルトはfalseです。

`web3-api-enabled`（ブーリアン）：

`web3_*`APIを有効にします。デフォルトはtrueです。

#### イーサネット設定

`local-txs-enabled`（ブーリアン）：

ローカルトランザクション処理を有効にします。デフォルトはfalseです。

`api-max-duration`（デュレーション）：

APIコールの最大継続時間。APIコールがこの継続時間を超えた場合、タイムアウトになります。デフォルトは0（最大値なし）です。

`api-max-blocks-per-request`（int）：

`getLogs`リクエストごとに提供するブロックの最大数。デフォルトは0（最大値なし）です。

`allow-unfinalized-queries`（ブーリアン）：

ファイナライズされていない（まだ受理されていない）ブロック/取引に対する問い合わせを許可します。デフォルトは false です。

### 連続プロファイリング

`profile-continuous-enabled`メモリ/CPUのプロファイルを継続的に実行し、最新のプロファイルを保存するようにノードを設定することができます。が設定されていると、連続的なメモリ／CPUプロファイルが有効になります。


`profile-continuous-enabled`（ブーリアン）：

アプリが継続的にパフォーマンスプロファイルを生成するかどうか。デフォルトはfalse（有効でない）です。

`profile-dir`（文字列）：

`$HOME/.avalanchego/profiles/`プロファイリングが有効な場合、ノードはメモリ／CPUのプロファイルを継続的に実行し、このディレクトリに配置します。デフォルトでは\(1\)に設定されています。

`profile-continuous-freq`（デュレーション）：

新しいCPU/メモリプロファイルが作成される頻度。`15m`デフォルトは\(1\)です。

`profile-continuous-max-files`（int）：

保持するCPU/メモリプロファイルファイルの最大数です。デフォルトは5です。

### キーストアの設定

`keystore-directory`（文字列）：

`coreth-keystore`秘密鍵を格納するディレクトリ。相対パスで指定できます。空の場合は、\(1\)の一時ディレクトリを使用します。デフォルトは空の文字列です。

`keystore-external-signer`（文字列）：

clef型サイナーの外部URIを指定します。デフォルトは空の文字列です（有効ではありません）。

`keystore-insecure-unlock-allowed`\(bool\):

trueの場合、安全でないHTTP環境でユーザーがアカウントをロック解除することを許可します。デフォルトはfalseです。

### コンセンサス・パラメータ

`--consensus-gossip-frequency`（デュレーション）：

ゴシップの間の時間がフロンティアを受け入れた。`10s`デフォルトは\(1\)です。

`--consensus-shutdown-timeout`（デュレーション）：

反応しないチェーンを殺す前のタイムアウト。`5s`デフォルトは\(1\)です。

`--creation-tx-fee`（int）：

`1000000`新しい状態を作成するトランザクションのための、nAVAX単位のトランザクション料金。デフォルトでは、1トランザクションあたりnAVAX（0.001AVAX）です。

`--min-delegator-stake`（int）：

一次ネットワークのバリデータに委ねることができる最小の賭け金（nAVAX）。

`25000000000``5000000`Main Netでは、デフォルトで（25 AVAX）になります。Test Netでは、デフォルトで（0.005AVAX）になります。

`--min-delegation-fee`（int）：

`10,000``[0, 1000000]``20000`一次ネットワーク上のデリゲーションに課すことができる最小のデリゲーション料金に .を乗じたもの。の範囲でなければなりません。デフォルトはMain Netで\(2%\)です。

`--min-stake-duration`（デュレーション）：

`336h`最小のステーキング期間。メインネットのデフォルトは\(1\)\(2週間\)です。

`--min-validator-stake`（int）：

一次ネットワークを有効にするために必要な最小の出資額（nAVAX）です。

`2000000000000``5000000`Main Netでは、デフォルトで（2,000 AVAX）になります。Test Netでは、デフォルトで（0.005AVAX）になります。

`--max-stake-duration`（デュレーション）：

`8760h`ステーキングの最大期間を時間単位で指定します。Main Netでのデフォルトは\(1\) \(365日\)です。

`--max-validator-stake`（int）:s

`3000000000000000`一次ネットワーク上のバリデータにかけられる最大の賭け金（単位：nAVAX）。デフォルトはメインネットの\(1\) \(3,000,000 AVAX\)である。これにはバリデータとバリデータへの委任者の両方が提供した賭け金が含まれる。

`--snow-avalanche-batch-size`（int）：

`b``b``1`スノーコンセンサスのDAG実装では、\(1\)を1つの頂点が含むべきトランザクションの数として定義しています。\(2\)を増加させると、理論的には、レイテンシーが増加する一方で、スループットが増加します。ノードはバッチを収集するために最大で1秒間待機し、その後バッチ全体を一度に発行します。この値は少なくとも\(3\)でなければなりません。`30`デフォルトは\(1\)です。

`--snow-avalanche-num-parents`（int）：

`p``p``2`Snow consensusのDAG実装では、\(1\)を頂点が含むべき親の数として定義しています。\(2\)を増やすことで、ネットワーククエリの償却が改善されます。ただし、グラフの連結性を高めることで、グラフのトラバースの複雑さが増します。最低でも\(3\)としなければならない。`5`デフォルトは\(1\)です。

`--snow-concurrent-repolls`（int）：

`1``--snow-rogue-commit-threshold`Snowのコンセンサスでは、ネットワークの使用率が低い時に発行されたトランザクションを再ポーリングする必要があります。このパラメータでは、クライアントがこれらの保留中のトランザクションを最終的に処理する際の積極性を定義できます。このパラメータは、Snow コンセンサスのトレードオフを慎重に検討した後にのみ変更する必要があります。値は最低でも\(1\)、最大でも\(2\)でなければなりません。`4`デフォルトは\(1\)です。

`--snow-sample-size`（int）：

`k``k``1`Snowのコンセンサスでは、各ネットワークポーリングでサンプリングされるバリデーターの数を\(1\)と定義している。このパラメータでは、コンセンサスに使用する\(2\)の値を定義できます。これは、Snow コンセンサスのトレードオフを慎重に検討した後にのみ変更すべきです。この値は少なくとも\(3\)でなければなりません。`20`デフォルトは\(1\)です。

`--snow-quorum-size`（int）：

`alpha``alpha``k/2`Snow consensusでは、トランザクションの信頼性を高めるために、各ネットワークポーリング時にトランザクションを好む必要のあるバリデーターの数を\(1\)と定義している。このパラメータにより、コンセンサスに使用される\(2\)の値を定義することができる。この値は、Snowのコンセンサスのトレードオフを慎重に検討した後にのみ変更すべきである。この値は、\(3\)よりも大きくなければなりません。`14`デフォルトは\(1\)です。

`--snow-virtuous-commit-threshold`（int）：

`beta1`Snow consensusでは、\(1\)を、好ましい取引が受け入れられるために信頼性を高めなければならない連続したポールの回数と定義している。`beta1``1`このパラメータでは、コンセンサスに使用する\(1\)の値を定義することができます。これは、Snowのコンセンサスのトレードオフを慎重に検討した後にのみ変更する必要があります。この値は少なくとも\(2\)でなければなりません。`15`デフォルトは\(1\)です。

`--snow-rogue-commit-threshold`（int）：

`beta2``beta2``beta1`Snowのコンセンサスでは、\(1\)を、不正な取引が受け入れられるために信頼性を高めなければならない連続したポールの回数と定義している。このパラメータにより、コンセンサスに使用される\(2\)の値を定義することができます。これはSnowコンセンサスのトレードオフを慎重に検討した後にのみ変更すべきである。この値は少なくとも\(3\)でなければなりません。`30`デフォルトは\(1\)です。

`--stake-minting-period`（デュレーション）：

`8760h`ステーキング機能の消費期間（単位：時間）。Main Netのデフォルトは\(1\)\(365日\)です。

`--tx-fee`（int）：

`1000000`トランザクションを有効にするために使い果たす必要のあるnAVAXの量です。このパラメータは、現在の形ではネットワークの同意が必要です。この値をデフォルトから変更することは、プライベートなネットワークでのみ行うべきである。デフォルトでは、1回の取引につき（1）nAVAXとなっている。

`--uptime-requirement` \(フロート\):

リワードを受け取るためにバリデータがオンラインでなければならない時間の割合。`0.6`デフォルトは\(1\)です。

### 健全性

`--health-check-frequency`（デュレーション）：

健全性チェックはこの頻度で実行されます。`30s`デフォルトは\(1\)です。

`--health-check-averager-halflife`（デュレーション）：

健全性チェックで使用される平均値の半減期（メッセージの失敗率の測定など）値が大きいほど、平均値の計算が不安定になります。`10s`デフォルトは\(1\)です。

### メッセージのレート制限（スロットリング）について

`throttling`これらのフラグは、インバウンドおよびアウトバウンド・メッセージのレート・リミッティングを管理します。レート制限と以下のフラグの詳細については、AvalancheGoのパッケージ\(1\)を参照してください。

`--throttler-inbound-at-large-alloc-size`（uint）：

`33554432`受信メッセージのスロットラーでの大口割り当てのサイズ（バイト単位）。デフォルトは\(1\)\(32メガバイト\)です。

`--throttler-inbound-validator-alloc-size`（uint）：

`33554432`受信メッセージのスロットルにおけるバリデータの割り当てサイズをバイト単位で指定します。デフォルトは \(32 mebibytes\) です。

`--throttler-inbound-node-max-at-large-bytes`（uint）：

`2048`ノードが受信メッセージスロットラーのアットラージアロケーションから取得できる最大バイト数です。デフォルトは\(1\) \(2 mebibytes\)です。

`--throttler-outbound-at-large-alloc-size`（uint）：

`33554432`送信メッセージスロットラーの大口割り当てのサイズ（バイト単位）。デフォルトは\(1\)\(32メガバイト\)です。

`--throttler-outbound-validator-alloc-size`（uint）：

`33554432`アウトバウンド・メッセージ・スロットラーのバリデータの割り当てサイズをバイト単位で指定します。デフォルトは\(1\) \(32 mebibytes\) です。

`--throttler-outbound-node-max-at-large-bytes`（uint）：

`2048`ノードがアウトバウンドメッセージスロットラーのアットラージアロケーションから取得できる最大バイト数です。デフォルトは \(1\) \(2 mebibytes\) です。

### ネットワーク

`--network-compression-enabled` \(bool\) \(v1.4.11\):

trueの場合、バージョンがv1.4.11以上のピアに送信される特定のメッセージを圧縮して、帯域幅の使用量を削減します。

`--network-initial-timeout`（デュレーション）：

アダプティブタイムアウトマネージャーの初期タイムアウト値（単位：ナノ秒）。`5s`デフォルトは\(1\)です。

`--network-minimum-timeout`（デュレーション）：

アダプティブタイムアウトマネージャーの最小タイムアウト値（単位：ナノ秒）。`2s`デフォルトは\(1\)です。

`--network-maximum-timeout`（デュレーション）：

アダプティブタイムアウトマネージャーの最大タイムアウト値（単位：ナノ秒）。`10s`デフォルトは\(1\)です。

`--network-timeout-halflife`（デュレーション）：

平均ネットワークレイテンシーを計算する際に使用する半減期。値が大きいほど、ネットワークのレイテンシーの計算が不安定になります。`5m`デフォルトは\(1\)です。

`--network-timeout-coefficient`（デュレーション）：

`network-timeout-coefficient`ピアへのリクエストは、[\(1\)] \* [平均リクエストレイテンシー]後にタイムアウトします。`2`デフォルトは\(1\)です。

`--network-health-min-conn-peers`（uint）：

この数以下のピアにしか接続されていない場合、ノードは不健全性を報告します。`1`デフォルトは\(1\)です。

`--network-health-max-time-since-msg-received`（デュレーション）：

ノードは、この時間内にメッセージを受信しなかった場合、不健全性を報告します。`1m`デフォルトは\(1\)です。

`--network-health-max-time-since-no-requests`（デュレーション）：

ノードは、この時間内にメッセージを受信しなかった場合、不健全性を報告します。`1m`デフォルトは\(1\)です。

`--network-health-max-portion-send-queue-full` \(フロート\):

ノードは、送信キューがこの部分を超えていっぱいになった場合、不健康を報告する。0,1]でなければなりません。`0.9`デフォルトは\(1\)です。

`--network-health-max-send-fail-rate` \(フロート\):

この部分以上のメッセージ送信が失敗した場合、ノードは不健全性を報告する。0,1]でなければなりません。`0.25`デフォルトは\(1\)です。

`--inbound-connection-throtting-cooldown` \(デュレーション\)

`--inbound-connection-throttling-max-recent` \(uint\)

`inbound-connection-throtting-cooldown``inbound-connection-throttling-max-recent``inbound-connection-throttling-max-recent`ノードは、直近（1）でアップグレードを行っていない場合にのみ、あるIPからのインバウンド接続を受け入れる（アップグレードを試みる）。ノードは、\(3\)のすべてのIPSからの\(2\)のみを許可する。

### ピアリスト・ゴシップ

`--network-peer-list-size``--network-peer-list-gossip-size``--network-peer-list-gossip-frequency`ノードは、各ノードが最新のピアリストを持つことができるように、互いにピアをゴシップします。ノードは\(3\)ごとに\(1\)のピアを\(2\)のピアにゴシップします。

`--network-peer-list-gossip-frequency`（デュレーション）：

`1m`デフォルトは\(1\)です。

`--network-peer-list-gossip-size`（int）：

`50`デフォルトは\(1\)です。

`--network-peer-list-size`（int）：

`20`デフォルトは\(1\)です。

### プラグインモード

`--plugin-mode-enabled`\(bool\):

[](https://github.com/hashicorp/go-plugin)trueの場合、ノードをプラグインとして実行します。`false`デフォルトは\(1\)です。

### サブネットホワイトリスト

`--whitelisted-subnets`（文字列）：

このノードが追加された場合に検証されるサブネットのコンマ区切りリスト。デフォルトは空です（一次ネットワークのみ検証されます）。

### <a id="vm-configs"></a>仮想マシン（VM）の設定

`--vm-aliases-file`（文字列）：

仮想マシンIDのエイリアスを定義したJSONファイルへのパス。`~/.avalanchego/configs/vms/aliases.json`デフォルトは\(1\)です。コンテンツの例

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

`"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"``"timestampvm"``"timerpc"`上記の例では、IDが\(1\)のVMを\(2\)と\(3\)にエイリアスしています。

### X-Chain / AVM <a id="avm-config"></a>

これにより、X-Chainに渡すコンフィグを指定することができます。この設定のデフォルト値は

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

デフォルト値は、設定で明示的に指定されている場合のみ上書きされます。

パラメータは、次の通りです。

#### トランザクションのインデックス化

`index-transactions`（ブーリアン）：

`true``false``true``address``assetID``avm.getAddressTxs`[](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api)\(1\)に設定されている場合、AVM トランザクションインデックスを有効にします。初期値は\(2\)です。\(3\)に設定されている場合、AVM取引は関係する\(4\)および\(5\)に対してインデックス化される。このデータは\(6\)\(7\)のAPI\(7\)を介して利用可能です。

`index-transactions``false``true``index-allow-incomplete``true`なお、\(1\)をtrueに設定した場合、ノードが存続する限り常にtrueに設定する必要があります。\(2\)を設定した後に\(4\)を設定すると、\(5\)を設定しない限り、ノードは起動を拒否します（後述）。

`index-allow-incomplete`（ブーリアン）：

`false`不完全なインデックスを許可します。初期値は\(1\)です。

`index-transactions``false`この設定値は、DBにX-Chainインデックス付きのデータがなく、\(1\)が\(2\)に設定されている場合には無視されます。

