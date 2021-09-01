# コマンドラインインターフェース

以下の引数でノードの構成を指定できます。

## 引数

### 構成ファイル

`--config-file`（文字列）:

このノード設定を指定するJSONファイルのパス。コマンドライン引数は、設定ファイルで設定された引数をオーバーライドします。

JSON設定ファイルの例例：

```javascript
{
    "log-level": "debug"
}
```

### API

`--api-admin-enabled`（ブール値）：

設定に設定すると`false`、このノードは管理APIを公開することはありません。デフォルトは `false`.より詳細な情報は[、ここ](../avalanchego-apis/admin-api.md)を参照してください。

`--api-auth-required`（ブール値）：

設定に設定された場合`true`、API呼び出しには認可トークンが必要です。デフォルトは `false`.より詳細な情報は[、ここ](../avalanchego-apis/auth-api.md)を参照してください。

`--api-auth-password`（文字列）:

認可トークンを作成/取り消すために必要なパスワード。もし、 `--api-auth-required=true`,を指定する必要があります。より詳細な情報は[、ここ](../avalanchego-apis/auth-api.md)を参照してください。

`--api-health-enabled`（ブール値）：

設定に設定すると`true`、このノードはHealth APIを公開します。デフォルトは `true`.より詳細な情報は[、ここ](../avalanchego-apis/health-api.md)を参照してください。

`--index-enabled`（ブール値）：

このノードがインデックスを有効にせず、インデックスAPIが利用できない場合`false`。デフォルトは `false`.より詳細な情報は[、ここ](../avalanchego-apis/index-api.md)を参照してください。

`--api-info-enabled`（ブール値）：

設定すると`true`、このノードはInfo APIを公開します。デフォルトは `true`.より詳細な情報は[、ここ](../avalanchego-apis/info-api.md)を参照してください。

`--api-ipcs-enabled`（ブール値）：

設定すると`true`、このノードはIPCs APIを公開します。デフォルトは `false`.より詳細な情報は[、ここ](../avalanchego-apis/ipc-api.md)を参照してください。

`--api-keystore-enabled`（ブール値）：

設定に設定すると`false`、このノードはKeystore APIを公開することはありません。デフォルトは `true`.より詳細な情報は[、ここ](../avalanchego-apis/keystore-api.md)を参照してください。

`--api-metrics-enabled`（ブール値）：

設定に設定すると`false`、このノードはMetrics APIを公開することはありません。デフォルトは `true`.より詳細な情報は[、ここ](../avalanchego-apis/metrics-api.md)を参照してください。

### アサーション

`--assertions-enabled`（ブール値）：

設定すると`true`、アサーションはコードベース全体でランタイム時に実行されます。より具体的なエラーメッセージが表示される可能性があるため、これはデバッグで使用することを目的としています。デフォルトは `true`.

### ブートストラップ

`--bootstrap-beacon-connection-timeout`（期間）：

ブートストラップビーコンに接続しようとする際のタイムアウト。デフォルトは `1m`.

`--bootstrap-ids`（文字列）:

ブーツストラップIDは、バリデータIDの配列です。これらのIDは、ブートストラップペアを認証するために使用されます。このフィールドの設定例としては、`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`.デフォルト値は、ネットワークIDにより異なります。

`--bootstrap-ips`（文字列）:

ブーツストラップIPは、IPv4:ポートペアの配列です。これらのIPアドレスは、現在のAvalancheステートのブートストラップに使用されます。このフィールドの設定例としては、`--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`.デフォルト値は、ネットワークIDにより異なります。

`--bootstrap-retry-enabled`（ブール値）：

真の場合、失敗した場合にブートストラップを再度試みます。

`--bootstrap-retry-max-attempts`（uint）：

障害が発生した後、ブートストラップを再試行する回数を最大限にします。

### データベース

`--db-dir`（文字列、ファイルパス）：

データベースが永続化するディレクトリを指定します。デフォルトは `"$HOME/.avalanchego/db"`.

`--db-type`（文字列）:

使用するデータベースの種類を指定します。`memdb`その1つでなければなりません。 `leveldb`, `rocksdb`.`memdb`は、インメモリで永続化されていないデータベースです。

`leveldb``rocksdb`実行時に永続化されたデータ、およびその逆さまでノードは読み取ることができないことに注意してください。

**RocksDBについての2つの重要な注意: まず、RocksDB**はすべてのコンピュータ上で機能することはありません。第二に、RocksDBは、デフォルトで構築されることなく、公然とリリースされたバイナリに含まれないことになります。RocksDBでAvalancheGoを構築するには、端末で実行し、次`export ROCKSDBALLOWED=1`に。`scripts/build.sh`使用できる前に、これを行わなければなりません`--db-type=rocksdb`。

### ジェネシス

`--genesis`（文字列）:

使用するジェネシスデータを含むJSONファイルのパス。標準ネットワークを実行する際に無視（Mainnet、Testnet。）指定されていない場合、デフォルトのジェネシスデータを使用します。ジェネシスデータの例としてJSON表現の場合、[ここ](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16)を参照してください。

### HTTPサーバ

`--http-host`（文字列）:

HTTP APIがリスンするアドレスデフォルトは `127.0.0.1`.つまり、デフォルトで、ノードは同じマシンから呼び出されたみを処理することができます。他のマシンからAPIコールを呼び出すことを可能にするには、 . を使います`--http-host=`。

`--http-port`（int）：

各ノードは、ノードやAvalancheネットワークとやり取りするためのAPIを提供するHTTPサーバーを動作します。この引数は、HTTPサーバがリスンするポートを指定します。デフォルト値は以下のとおりです`9650`。

`--http-tls-cert-file`（文字列、ファイルパス）：

この引数では、HTTPSサーバーのためにノードで使用されるTLS証明書の場所を指定します。これは、ときに指定する必要があります`--http-tls-enabled=true`。デフォルト値は存在しません。

`--http-tls-enabled`（ブール値）：

設定すると、このフラグは`true`、HTTPSを使用するようにサーバーをアップグレードしようとします。デフォルトは `false`.

`--http-tls-key-file`（文字列、ファイルパス）：

この引数は、HTTPSサーバーのためにノードで使用されるTLS秘密鍵の場所を指定します。これは、ときに指定する必要があります`--http-tls-enabled=true`。デフォルト値は存在しません。

### IPCS

`--ipcs-chain-ids`（文字列\)

接続するチェーンIDのカンマ区切りリスト。デフォルト値は存在しません。

`--ipcs-path`（文字列\)

IPCソケットのためのディレクトリ（Unix）あるいは名前付きパイププレフィックス（Windows）です。デフォルトは /tmp

### ファイル記述者の制限

`--fd-limit`（int）

プロセスファイル記述子限度を少なくともこの値にしようとします。デフォルトは`32768`

### ロギング

`--log-level`\(文字列, \)`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`:

ログレベルで、ログするイベントが決定されます。

* `Off`：このレベルのロギングが存在しないログは存在しません。
* `Fatal`：回復不可能で致命的なエラー。
* `Error`：ノードが発生したエラー、これらのエラーが回復することができました。
* `Warn`：スプリアスバイザンノード、または潜在的な未来エラーを示す可能性のある警告。
* `Info`：ノードステータスアップデートの便利な説明。
* `Debug`：コードで可能なバグを理解しようとする場合に、デバッグロギングは役に立ちます。通常の使用に際して希望されるより多くの情報が表示されます。
* `Verbo`：ノードが処理する大量の情報をトラックします。これにより、非常に低いレベルのプロトコル分析のためのメッセージ内容とデータのバイナリダンプが含まれます。

指定された優先度以上のすべてのログがトラッキングされるというログレベルノートを指定する場合。デフォルトは `Info`.

`--log-display-level`\(文字列, \)`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`:

ログレベルで、画面に表示するイベントが決定されます。空白のままにした場合、デフォルトで、`--log-level`.

`--log-display-highlight`\(文字列, \)`{auto, plain, colors}`:

表示ログの色やハイライトかどうか。出力がターミナルである場合にデフォルトでハイライトします。そうでない場合、その1つでなければ`{auto, plain, colors}`

`--log-dir`（文字列、ファイルパス）：

システムログが保持されるディレクトリを指定します。デフォルトは `"$HOME/.avalanchego/logs"`.

### ネットワークID

`--network-id`（文字列）:

ノードが接続するネットワークのアイデンティティ。以下のいずれかになります：

* `--network-id=mainnet`->メインに接続します。
* `--network-id=fuji`->富士テストネットワークに接続します。
* `--network-id=testnet`->現在のテストネットワークに接続します。（現在、富士です。）
* `--network-id=local`->ローカルテストネットワークに接続します。
* `--network-id=network-{id}``id`->指定されたIDでネットワークに接続します。`[0, 2^32)`

### パブリックIP

`--public-ip`（文字列）:

バリデータは、パブリックに直面したIPアドレスを知る必要があります。この引数が提供されない場合、ノードはノードがノードに公開IPを取得するためにNATトラバーサルを実行しようとします。ローカルネットワークを作成`127.0.0.1`するように設定する。設定されていない場合、NAT traversalを使用して知識を学習しようとします。

`--dynamic-public-ip`（文字列）:

paramが存在する場合、有効な値： `opendns`、`ifconfigco`または。`ifconfigme`これにより、オーバーライドされます`--public-ip`。設定が完了した場合、リモートサービスを毎回投票`--dynamic-update-duration`し、ノードのパブリックIPアドレスを更新します。

`--dynamic-update-duration`（期間）：

`--dynamic-public-ip`NATトラバーサルのための投票イベント間の時間。推奨最低で1分です。デフォルトは `5m`.

### 署名検証

`--signature-verification-enabled`（ブール値）：

署名検証が可能になります。設定に設定された場合`false`、署名を無効化できるVMにして署名はチェックされません。デフォルトは `true`.

### ステーキング

`--staking-port`（文字列）:

ステーキングサーバーが外部からAvalancheネットワークに接続するポートデフォルトは `9651`.

`--staking-enabled`（ブール値）：

Avalancheは、Sybil抵抗としてProof of Stake（PoS）を使用し、ネットワーク攻撃に非常に高額になります。偽の場合、sybil抵抗が無効になり、コンセンサス中にすべてのピアがサンプリングされます。デフォルトは `true`.

`--staking-tls-cert-file`（文字列、ファイルパス）：

Avalancheは、双方向認証済みTLS接続を使用して、安全にノード接続します。この引数は、ノードで使用されるTLS証明書の場所を指定します。デフォルトで、ノードはTLS証明書が存在すると期待します`$HOME/.avalanchego/staking/staker.crt`。

`--staking-tls-key-file`（文字列、ファイルパス）：

Avalancheは、双方向認証済みTLS接続を使用して、安全にノード接続します。この引数は、ノードで使用されるTLS秘密鍵の場所を指定します。デフォルトで、ノードはTLS秘密鍵が存在すると期待します`$HOME/.avalanchego/staking/staker.key`。

`--staking-disabled-weight`（int）：

ステーキングが無効になったときに各ピアに提供する重量。デフォルトは `1`.

### バージョン

`--version`（ブール値）

これが該当する場合、バージョンを印刷し`true`、終了します。デフォルトは `false`.

## 高度なオプション

以下のオプションは、ノードの正確性に影響を与える可能性があります。パワーユーザーのみがこれらを変更する必要があります。

### ベンチリスト

`--benchlist-duration`（期間）：

ピアが最高を超えた後、ベンチリストにします`--benchlist-fail-threshold`。デフォルトは `1h`.

`--benchlist-fail-threshold`（int）：

ベンチする前にノードに失敗したクエリ数数（すべてのクエリが失敗すると仮定して）。デフォルトは `10`.

`--benchlist-peer-summary-enabled`（ブール値）：

ピア固有のクエリレイテンシーメトリクスを有効にします。デフォルトは `false`.

`--benchlist-min-failing-duration`（期間）：

ピアのベンチ化前に、ピアに最小時間のメッセージが失敗する必要があります。デフォルトは `5m`.

### ビルドディレクトリ

`--build-dir`（文字列）:

AvalancheGoサブバイナリとプラグインバイナリを見つける場所を指定します。デフォルトは、AvalancheGoバイナリのパスです。このディレクトリの構造は、次のように設定する必要があります。

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

### チェーン構成

一部のチェーン（現在C-Chainだけのもの）により、ノードオペレータがカスタム設定を提供できるようになります。AvalancheGoは、ファイルからチェーン構成を読み取り、初期化上、対応するチェーンに渡すことができます。

AvalancheGoは、指定されたディレクトリでこれらのファイルを探します`--chain-config-dir`。このディレクトリは、名前がチェーンIDあるいはチェーンエイリアスであるサブディレクトリを持つことができます。各サブディレクトリには、ディレクトリ名で指定されたチェーンの構成が含まれます。各サブディレクトリには`config`、対応するチェーンが初期化される際に値が渡される名前のファイルを含む必要があります。たとえば、C-Chainの設定は、以下のようにする必要があります： `[chain-config-dir-goes-here]/C/config.json`。

これらのファイルが持つものと、これらのファイルの内容はVMに依存します。たとえば、一部のチェーンが期待する場合`config.txt`があります。`config.json`同じ名前で異なる拡張子（例：同じサブディレクトリ`config.txt`に）を提供`config.json`する場合、AvalancheGoはエラーで終了します。

指定されたチェーンについて、AvalancheGoは、名前がチェーンIDである設定サブディレクトリを最初に探します。見つからない場合、チェーンのプライマリエイザという名前の設定サブディレクトリを探します。見つからない場合、名前がチェーンのための別の別名である設定サブディレクトリを探します。すべてのフォルダとファイル名は、大文字と小文字を区別します。

これらのカスタム構成を提供する必要はありません。提供が行わない場合、VMに固有のデフォルト設定が使用されます。

`--chain-config-dir`（文字列）:

上記に記したように、チェーン構成を含むディレクトリを指定します。デフォルトは `$HOME/.avalanchego/configs/chains`.このフラグが提供されず、デフォルトのディレクトリが存在しない場合、AvalancheGoは終了しません。しかし、フラグが設定された場合、指定されたフォルダが存在するか、AvalancheGoはエラーで終了します。

#### C-Chain構成

C-Chainに設定を指定するため、JSON設定ファイルを（`{chain-config-dir}/C/config.json`または上記で指定した別の有効場所）に置く必要があります。

`config.json`例えば、デフォルト値を`chain-config-dir`持っている場合、以下の内容`$HOME/.avalanchego/configs/chains/C/config.json`で以下のようにします。

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

C-Chain設定についてのより詳細な情報は、ここを参照[してください。](command-line-interface.md#coreth-config)

#### X-Chain構成

X-Chainに設定を指定するため、JSON設定ファイルを（`{chain-config-dir}/X/config.json`または上記で指定した別の有効場所）に置く必要があります。

`config.json`例えば、デフォルト値を`chain-config-dir`持っている場合、以下の内容`$HOME/.avalanchego/configs/chains/X/config.json`で以下のようにします。

```javascript
{
  "index-transactions": true,
  "index-allow-incomplete": false
}
```

X-Chain設定についてのより詳細な情報は、ここを参照[してください。](command-line-interface.md#avm-config)

### C-Chain / Coreth<a id="coreth-config"></a>

`--coreth-config`（json）：

（この引数は、[Chain Configs](command-line-interface.md#chain-configs)を使用することに支持して廃止推奨です。）

これにより、C-Chainに渡される設定を指定することができます。この設定のデフォルト値は次のとおりです。

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

デフォルト値は、設定で明示的に指定された場合にのみオーバーライドされます。

パラメータは以下の通りです。

#### Coreth API

`snowman-api-enabled`（ブール値）：

Snowman APIを有効にします。デフォルトは、偽のものです。

`coreth-admin-api-enabled`（ブール値）：

管理APIを有効にします。デフォルトは、偽のものです。

`net-api-enabled`（ブール値）：

APIを有効にします`net_*`。デフォルトは真です。

#### Coreth API Gas/プライス上限

`rpc-gas-cap`（int）：

`eth_estimateGas`nAVAX（GWei）で測定されたRPCコールで使用される最大ガスです。デフォルトは、2500,000,000,000です。

`rpc-tx-fee-cap`（int）：

送信超過バリアントのためのグローバルトランザクション手数料（価格\*ガス制限）上限（AVAXで測定される）デフォルトは100です。

#### データベースプルーニング

`pruning-enabled`（ブール）：

真の場合、時代遅れの履歴データのデータベースプルン化が可能になります。履歴のあるルートですべてのデータにアクセスする必要があるノードについては、無効化してください。`true`プルーニングは、新しいデータのためにのみ行われます。デフォルトはv1.4.9以降のバージョン`false`で実行されます。

#### Eth API

`eth-api-enabled`（ブール値）：

APIを有効にします`eth_*`。デフォルトは真です。

`personal-api-enabled`（ブール値）：

APIを有効にします`personal_*`。デフォルトは、偽のものです。

`tx-pool-api-enabled`（ブール値）：

APIを有効にします`txpool_*`。デフォルトは、偽のものです。

`debug-api-enabled`（ブール値）：

APIを有効にします`debug_*`。デフォルトは、偽のものです。

`web3-api-enabled`（ブール値）：

APIを有効にします`web3_*`。デフォルトは真です。

#### Eth設定

`local-txs-enabled`（ブール値）：

ローカルトランザクション処理が可能になります。デフォルトは、偽のものです。

`api-max-duration`（期間）：

最大APIコール期間。API呼び出しがこの期間を超える場合、タイムアウトします。デフォルトは0（最大限は存在しません）の場合。

`api-max-blocks-per-request`（int）：

リクエストごとにサービスするブロック数`getLogs`。デフォルトは0 \(最大値は存在しません\)にします。

`allow-unfinalized-queries`（ブール値）：

未確定（まだ受け入れられない）ブロック/トランザクションのためのクエリを可能にします。デフォルトは、偽のものです。

#### 継続的なプロファイリング

メモリ/CPUプロファイルを継続して実行し、最新のものを保存するようにノードを構成できます。セット`continuous-profiler-dir`が完了した場合、連続メモリ/CPUプロファイリングが有効になります。

`continuous-profiler-dir`（文字列）:

空でない場合、ノードは継続的にメモリ/CPUプロファイルを実行し、このディレクトリに置く。デフォルトは、空の文字列です（有効化されていない）。

`continuous-profiler-frequency`（期間）：

新しいCPU/メモリプロファイルが作成される頻度。デフォルトは `15m`.

`continuous-profiler-max-files`（int）：

維持するCPU/メモリープロファイル数。デフォルトは5です。

#### キーストア設定

`keystore-directory`（文字列）:

秘密鍵を含むディレクトリ相対パスとして与えることができます。空でない場合、以下の一時ディレクトリを使用します`coreth-keystore`。デフォルトは空の文字列です。

`keystore-external-signer`（文字列）:

clef型シグナーのための外部のURIを指定します。デフォルトは、空の文字列です（有効化されていない）。

`keystore-insecure-unlock-allowed`（ブール）：

真の場合、安全でないHTTP環境でアカウントのロックを解除できるようにします。デフォルトは、偽のものです。

### コンセンサスパラメータ

`--consensus-gossip-frequency`（期間）：

受け入れられたフロンティアをゴシップする間の時間。デフォルトは `10s`.

`--consensus-shutdown-timeout`（期間）：

レスポンシブチェーンを殺す前にタイムアウト。デフォルトは `5s`.

`--creation-tx-fee`（int）：

新しいステートを生み出すトランザクション手数料は、nAVAXでします。トランザクションごとに `1000000`nAVAX（.001 AVAX）のデフォルト値です。

`--min-delegator-stake`（int）：

nAVAXで最低ステークは、プライマリネットワークのバリデータに委任できるものです。

メインネット上でデフォルト値は（`25000000000`25 AVAX）です。テストネット上のデフォルトは、（.`5000000`005 AVAX）です。

`--min-delegation-fee`（int）：

プライマリネットワーク上で委任のために請求できる最低委任手数料は、乗算されます`10,000`。範囲でなければなりません`[0, 1000000]`。メインネット上のデフォルトは、（2%`20000`）です。

`--min-stake-duration`（期間）：

最小ステーキング期間。メインネット上のデフォルトは、（`336h`2週間）です。

`--min-validator-stake`（int）：

nAVAXで最低ステークは、プライマリネットワークのバリデーションに要求されます。

メインネット上でデフォルト値は（2,`2000000000000`000 AVAX）です。テストネット上のデフォルトは、（.`5000000`005 AVAX）です。

`--max-stake-duration`（期間）：

最大ステーキング期間、時間以内で。メインネット上のデフォルトは、（`8760h`365日間）です。

`--max-validator-stake`\(int\):s

nAVAXで最大ステークを設定し、プライマリネットワーク上のバリデータ上に配置できます。メインネット上のデフォルトは、（3,000,000 `3000000000000000`AVAX）です。これには、バリデータとバリデータによって提供されるステークが含まれます。

`--snow-avalanche-batch-size`（int）：

SnowコンセンサスDAG実装は、頂点に含めるトランザクション数`b`と定義します。理論上、スループットを増やしながら、遅延を増やする意志の増加は、理論上`b`、遅延を増やします。ノードは、バッチを回収するまでに最大で1秒待ちとなり、バッチ全体を一度に発行します。値は、少なくとも必要があります`1`。デフォルトは `30`.

`--snow-avalanche-num-parents`（int）：

SnowコンセンサスDAG実装は、頂点を含めるべき親数と定義`p`します。増加が増えることで、ネットワークククエリの償却が改善`p`されます。しかし、グラフの接続を増やすことで、グラフトラバーサルの複雑さが増しになります。値は、少なくとも必要があります`2`。デフォルトは `5`.

`--snow-concurrent-repolls`（int）：

Snowコンセンサスにより、ネットワーク使用の低い間に発行されたリポル取引が必要になります。このパラメーターにより、クライアントがこれらの保留中のトランザクションを確定する際にどのようにアグレッシブなかを定義することができます。これは、Snowコンセンサスに関するトレードオフを慎重に考慮した後でのみ変更すべきです。値は、少なくとも、少なくとも`1`でなければなりません。`--snow-rogue-commit-threshold`デフォルトは `4`.

`--snow-sample-size`（int）：

Snowコンセンサスにより、各ネットワークポール中にサンプリングされるバリデータ数と`k`定義されます。このパラメータにより、コンセンサスに使用される`k`値を定義することができます。これは、Snowコンセンサスに関するトレードオフを慎重に考慮した後でのみ変更すべきです。値は、少なくとも必要があります`1`。デフォルトは `20`.

`--snow-quorum-size`（int）：

Snowコンセンサス定義は、各ネットワーク投ール中にトランザクションを好むバリデータ数と`alpha`定義します。このパラメータにより、コンセンサスに使用される`alpha`値を定義することができます。これは、Snowコンセンサスに関するトレードオフを慎重に考慮した後でのみ変更すべきです。値は、以前の値でなければなりません`k/2`。デフォルトは `14`.

`--snow-virtuous-commit-threshold`（int）：

Snowコンセンサスにより、バーチャルなトランザクションが受け入れられるためには、信頼性を高める必要があるという連続投票数と`beta1`定義されます。このパラメータにより、コンセンサスに使用される`beta1`値を定義することができます。これは、Snowコンセンサスに関するトレードオフを慎重に考慮した後でのみ変更すべきです。値は、少なくとも必要があります`1`。デフォルトは `15`.

`--snow-rogue-commit-threshold`（int）：

Snowのコンセンサスにより、不正な取引が受け入れられるため、信頼を高める必要があるという連続投票数と`beta2`定義されます。このパラメータにより、コンセンサスに使用される`beta2`値を定義することができます。これは、Snowコンセンサスに関するトレードオフを慎重に考慮した後でのみ変更すべきです。値は、少なくとも必要があります`beta1`。デフォルトは `30`.

`--stake-minting-period`（期間）：

ステーキング機能の消費期間、時間単位で。メインネット上のデフォルトは、（`8760h`365日間）です。

`--tx-fee`（int）：

トランザクションが有効になるために焼却する必要量。このパラメーターでは、現在の形でネットワーク合意が必要です。 この値をデフォルトから変更する場合は、プライベートネットワーク上でのみ行われる必要があります。デフォルトは、トランザクションごとの`1000000`nAVAXです。

`--uptime-requirement`\(float\):

バリデータがオンラインで報酬を受け取る必要があります。デフォルトは `0.6`.

### ヘルス

`--health-check-frequency`（期間）：

ヘルスチェックは、このフリーデンシーで実行されます。デフォルトは `30s`.

`--health-check-averager-halflife`（期間）：

ヘルスチェックで使用される平均値の半減期より大きな値 -->平均の揮発性計算が少ない。デフォルトは `10s`.

### メッセージレート制限（スロットリング）

これらのフラグは、インバウンドとアウトバウンドメッセージのレート制限を管理します。レート制限と以下のフラグについてのより詳細な情報は、AvalancheGo`throttling`のパッケージを参照してください。

`--throttler-inbound-at-large-alloc-size`（uint）：

インバウンドメッセージスロットラーで大規模な割当てが行われるサイズは、バイト単位で、デフォルトは、（`33554432`32メビバイト）です。

`--throttler-inbound-validator-alloc-size`（uint）：

インバウンドメッセージthrottlerでバリデータ割当のサイズは、バイト単位で、サイズはインバウンドメッセージでします。デフォルトは、（`33554432`32メビバイト）です。

`--throttler-inbound-node-max-at-large-bytes`（uint）：

インバウンドメッセージthrottlerの大規模割当により、ノードが取ることができる最大バイト数。デフォルトは、（`2048`2メビバイト）です。

`--throttler-outbound-at-large-alloc-size`（uint）：

アウトバウンドメッセージthrottlerで最大の割当てが行われるサイズは、バイト単位で、デフォルトは、（`33554432`32メビバイト）です。

`--throttler-outbound-validator-alloc-size`（uint）：

アウトバインドメッセージthrottlerでバリデータ割当のサイズは、バイト単位で、サイズは、サイズは、バイト単位です。デフォルトは、（`33554432`32メビバイト）です。

`--throttler-outbound-node-max-at-large-bytes`（uint）：

アウトバウンドメッセージthrottlerの大規模割当により、ノードが最大で取ることができるバイト数。デフォルトは、（`2048`2メビバイト）です。

### ネットワーク

`--network-compression-enabled`（ブール） \(v1.4.11\)：

真の場合、バージョンでバージョンでバージョンに送られた特定のメッセージを圧縮し、帯域幅の使用を軽減します。

`--network-initial-timeout`（期間）：

アダプティブタイムアウトマネージャーの初期タイムアウト値、ナノ秒単位で。デフォルトは `5s`.

`--network-minimum-timeout`（期間）：

アダプティブタイムアウトマネージャーの最小タイムアウト値は、ナノ秒単位でデフォルトは `2s`.

`--network-maximum-timeout`（期間）：

アダプティブタイムアウトマネージャーの最大タイムアウト値は、ナノ秒単位でです。デフォルトは `10s`.

`--network-timeout-halflife`（期間）：

平均的なネットワーク遅延を計算する際に使用されるハーフライフ。より大きな値 --> より少ない揮発性のネットワーク遅延計算。デフォルトは `5m`.

`--network-timeout-coefficient`（期間）：

ピアへのリクエストは、`network-timeout-coefficient`[] \* [平均リクエスト遅延]後にタイムアウトします。デフォルトは `2`.

`--network-health-min-conn-peers`（uint）：

ノードは、この数多くのピアに接続された場合、不健全なことが報告されます。デフォルトは `1`.

`--network-health-max-time-since-msg-received`（期間）：

この時間のメッセージが届かない場合、ノードは不健全なことを報告します。デフォルトは `1m`.

`--network-health-max-time-since-no-requests`（期間）：

この時間のメッセージが届かない場合、ノードは不健全なことを報告します。デフォルトは `1m`.

`--network-health-max-portion-send-queue-full`\(float\):

送信キューが満額を超える場合、ノードは不健全なことを報告します。[0,1]でなければなりません。デフォルトは `0.9`.

`--network-health-max-send-fail-rate`\(float\):

メッセージが送信された場合、ノードは不健全な報告が行われます。[0,1]でなければなりません。デフォルトは `0.25`.

`--inbound-connection-throtting-cooldown`（期間）

`--inbound-connection-throttling-max-recent`（uint）

ノードは、最後に行わない場合にのみ、IPからインバウンド接続を受け付ける（アップグレードしようとする）ことができます`inbound-connection-throtting-cooldown`。ノードは、1 . あたりのすべてのIPS`inbound-connection-throttling-max-recent`からのみ許可されます。`inbound-connection-throttling-max-recent`

### ピアリストゴシップ

gossipピアを互いにノードし、各ノードが最新のピアリストを持つことができるようにします。`--network-peer-list-gossip-size`ノードゴシップは、毎回そのピアに`--network-peer-list-size`接続します。`--network-peer-list-gossip-frequency`

`--network-peer-list-gossip-frequency`（期間）：

デフォルトは `1m`.

`--network-peer-list-gossip-size`（int）：

デフォルトは `50`.

`--network-peer-list-size`（int）：

デフォルトは `20`.

### プラグインモード

`--plugin-mode-enabled`（ブール）：

trueの場合、[プラグイン](https://github.com/hashicorp/go-plugin)としてノードを実行します。デフォルトは `false`.

### サブネットホワイトリスト

`--whitelisted-subnets`（文字列）:

このノードが追加された場合に検証されるサブネットのカンマ区切りリスト。デフォルトは空です（プライマリネットワークのみ検証されます）。

### バーチャルマシン（VM）構成<a id="vm-configs"></a>

`--vm-aliases-file`（文字列）:

バーチャルマシンIDのエイリアスを定義するJSONファイルのパス。デフォルトは `~/.avalanchego/configs/vms/aliases.json`.例コンテンツ：

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

`"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"`上記の例では、IDがとられているVMのエイリアス`"timestampvm"`になります。`"timerpc"`

### X-Chain / AVM<a id="avm-config"></a>

これにより、X-Chainに渡される設定を指定することができます。この設定のデフォルト値は次のとおりです。

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

デフォルト値は、設定で明示的に指定された場合にのみオーバーライドされます。

パラメータは以下の通りです。

#### トランザクションインデックス

`index-transactions`（ブール値）：

設定された場合、AVMトランザクションインデックスを有効にします`true`。デフォルト値は `false`.設定に設定された場合`true`、AVMトランザクションは、そのに関与`address`するものとします`assetID`。このデータは[、API](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api)経由で利用可能です`avm.getAddressTxs`。

真に設定された場合、ノードが生涯に`index-transactions`あたるときは常に真に設定する必要があります。`false``index-allow-incomplete`設定後に設定される場合、（下記を`true`参照してください）に設定されていない限り、ノードは`true`スタートを拒否します。

`index-allow-incomplete`（ブール値）：

不完全なインデックスを可能にします。デフォルト値は `false`.

DBにX-Chainインデックスデータが存在し、その時点で設定`index-transactions`されている場合、この設定値は無視されます。`false`

