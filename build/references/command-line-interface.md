# コマンドラインインターフェース

次の引数でノードの設定を指定することができます。

## 設定ファイル

`--config-file`（文字列）：

このノードの設定を指定するJSONファイルへのパス。コマンドラインの引数は、設定ファイルで設定された引数よりも優先されます。

JSONコンフィグファイルの例。

```javascript
{
    "log-level": "debug"
}
```

## API

`--api-admin-enabled`（ブーリアン）：

`false`に設定した場合、このノードはAdmin APIを公開しません。`false`デフォルトは(1)です。詳細は[こちら](../avalanchego-apis/admin-api.md)をご覧ください。

`--api-auth-required`（ブーリアン）：

`true`に設定した場合、APIコールは認証トークンを必要とします。`false`デフォルトは(1)です。詳細は[こちら](../avalanchego-apis/auth-api.md)をご覧ください。

`--api-auth-password`（文字列）：

認証トークンの作成／取消に必要なパスワード。`--api-auth-required=true`の場合は指定する必要があります。そうでない場合は無視されます。詳細は[こちら](../avalanchego-apis/auth-api.md)をご覧ください。

`--api-health-enabled`（ブーリアン）：

`true`に設定した場合、このノードはHealth APIを公開します。`true`デフォルトは(1)です。詳細は[こちら](../avalanchego-apis/health-api.md)をご覧ください。

`--index-enabled`（ブーリアン）：<a id="index-enabled"></a>

`false`の場合、このノードはインデクサを有効にせず、Index APIは利用できません。`false`デフォルトは\(1\)です。詳細は[こちら](../avalanchego-apis/index-api.md)をご覧ください。

`--api-info-enabled`（ブーリアン）：

`true`に設定した場合、このノードはInfo APIを公開します。`true`デフォルトは\(1\)です。詳細は[こちら](../avalanchego-apis/info-api.md)をご覧ください。

`--api-ipcs-enabled`（ブーリアン）：

`true`に設定した場合、このノードはIPCs APIを公開します。`false`デフォルトは\(1\)です。詳細は[こちら](../avalanchego-apis/ipc-api.md)をご覧ください。

`--api-keystore-enabled`（ブーリアン）：

`false`に設定した場合、このノードはKeystore APIを公開しません。`true`デフォルトは\(1\)です。詳細は[こちら](../avalanchego-apis/keystore-api.md)をご覧ください。

`--api-metrics-enabled`（ブーリアン）：

`false`に設定した場合、このノードはMetrics APIを公開しません。`true`デフォルトは\(1\)です。詳細は[こちら](../avalanchego-apis/metrics-api.md)をご覧ください。

## アサーション

`--assertions-enabled`（ブーリアン）：

`true`に設定した場合、アサーションはコードベース全体でランタイムに実行されます。これは、より具体的なエラーメッセージを得ることができるため、デバッグ時に使用することを目的としています。`true`デフォルトは\(1\)です。

## ブートストラッピング

`--bootstrap-beacon-connection-timeout`（デュレーション）：

起動しているビーコンに接続しようとする際のタイムアウト。`1m`デフォルトは\(1\)です。

`--bootstrap-ids`（文字列）：

ブートストラップIDは、バリデータIDの配列です。これらのIDは、ブートストラップピアの認証に使用されます。このフィールドの設定例は、`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`です。デフォルト値は、ネットワークIDに依存します。

`--bootstrap-ips`（文字列）：

ブートストラップIPは、IPv4:ポートのペアの配列です。これらのIPアドレスは、現在のAvalancheの状態をブートストラップするために使用されます。このフィールドの設定例は、`--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`です。デフォルト値は、ネットワークIDに依存します。

`--bootstrap-retry-enabled`（ブーリアン）：

Trueの場合は、起動に失敗した場合に再起動します。

`--bootstrap-retry-max-attempts`（uint）：

失敗した後にブートストラップを再試行する最大回数。

## データベース

`--db-dir`（文字列、ファイルパス）：

データベースを永続化するためのディレクトリを指定します。`"$HOME/.avalanchego/db"`デフォルトは\(1\)です。

`--db-type`（文字列）：

使用するデータベースの種類を指定します。`leveldb`、`rocksdb`、`memdb`のいずれかである必要があります。`memdb`は、インメモリー、非パーシステッドデータベースです。

なお、`leveldb`を実行すると、`rocksdb`の実行時に永続化されたデータを読むことができなくなります。

**RocksDBに関する重要な注意点を2つ挙げておきます**。まず、RocksDBはすべてのコンピュータで動作するわけではありません。次に、RocksDBはデフォルトでは構成されておらず、一般に公開されているバイナリにも含まれていません。RocksDBでAvalancheGoを構築するには、ターミナルで`export ROCKSDBALLOWED=1`を実行し、次に`scripts/build.sh`を実行します。`--db-type=rocksdb`を使用する前にこれを行う必要があります。

## Genesis（ジェネシス）

`--genesis`（文字列）：

使用するgenesisデータを含むJSONファイルへのパス。標準ネットワーク（Mainnet、Testnet）を実行している場合は無視されます。与えられない場合は、デフォルトの genesis データを使用します。GenesisデータのJSON表現の例については、[こちら](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16)をご覧ください。

## HTTPサーバー

`--http-host`（文字列）：

HTTP APIがリッスンするアドレスです。`127.0.0.1`デフォルトは\(1\)です。つまりデフォルトでは、ノードは同じマシンからのAPIコールしか処理できません。他のマシンからのAPIコールを許可するには、`--http-host=`を使用します。また、パラメータとしてドメイン名を入力することもできます。

`--http-port`（int）：

各ノードは、ノードやAvalancheネットワークと対話するためのAPIを提供するHTTPサーバーを実行します。この引数には、HTTPサーバーがリッスンするポートを指定します。デフォルト値は`9650`です。

`--http-tls-cert-file`（文字列、ファイルパス）：

この引数は、ノードがHTTPSサーバーに使用するTLS証明書の場所を指定します。`--http-tls-enabled=true`の時に指定する必要があります。デフォルト値はありません。

`--http-tls-enabled`（ブーリアン）：

このフラグが`true`に設定されていると、HTTPSを使用するためにサーバーをアップグレードしようとします。`false`デフォルトは\(1\)です。

`--http-tls-key-file`（文字列、ファイルパス）：

この引数は、ノードがHTTPSサーバーに使用するTLS秘密鍵の場所を指定します。`--http-tls-enabled=true`の時に指定する必要があります。デフォルト値はありません。

## IPCS

`--ipcs-chain-ids`（文字列）

接続先となるチェーンIDのコンマ区切りリスト（例`11111111111111111111111111111111LpoYY,4R5p2RXDGLqaifZE4hHWH9owe34pfoBULn1DrQTWivjg8o4aH`）。デフォルト値はありません。

`--ipcs-path`（文字列）

IPCソケット用のディレクトリ（Unix）または名前付きpipe prefix（Windows）です。デフォルトは/tmpです。

## ファイル記述子の制限

`--fd-limit`（int）

プロセスファイル記述子制限を少なくともこの値まで引き上げようとします。デフォルトは`32768`です。

## ロギング

`--log-level`（文字列、`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`）：

ログレベルは、どのイベントを記録するかを決定します。7つのレベルがあり、優先度の高いものから低いものへと順に並んでいます。

* `Off`：このレベルのログはありません。
* `Fatal`：復旧できない致命的なエラー
* `Error`：ノードが遭遇したエラーで、これらのエラーは回復することができました。
* `Warn`：偽のビザンチンノードや将来のエラーの可能性を示す警告です。
* `Info`：ノードのステータス更新に関する有用な記述。
* `Debug`：デバッグログは、コードのバグを理解しようとする場合に便利です。通常の使用で必要とされるより多くの情報が表示されます。
* `Verbo`：ノードが処理している膨大な量の情報を追跡します。これには、メッセージの内容や、極めて低いレベルのプロトコル分析のためのデータのバイナリダンプが含まれます。

ログレベルを指定する場合は、指定された優先度以上のログがすべて追跡されることに注意してください。`Info`デフォルトは\(1\)です。

`--log-display-level`（文字列、`{Off, Fatal, Error, Warn, Info, Debug, Verbo}`）：

ログレベルによって、画面に表示するイベントが決まります。空白の場合、`--log-level`で指定した値がデフォルトになります。

`--log-display-highlight`（文字列、`{auto, plain, colors}`）：

表示ログを色付け／ハイライトするかどうか。デフォルトでは、出力がターミナルの場合にハイライトされます。それ以外の場合は、`{auto, plain, colors}`のいずれかでなければなりません。

`--log-dir`（文字列、ファイルパス）：

システムログを保持するディレクトリを指定します。`"$HOME/.avalanchego/logs"`デフォルトは\(1\)です。

## ネットワークID

`--network-id`（文字列）：

ノードが接続するネットワークのID。次のいずれかになります。

* `--network-id=mainnet` -> Mainnetに接続します \(デフォルト\)。
* `--network-id=fuji` -> Fuji test-networkに接続します。
* `--network-id=testnet` -> 現在のテストネットワークに接続します。\(現在はFujiです。\)
* `--network-id=local` -> ローカルテストネットワークに接続します。
* `--network-id=network-{id}` -> 与えられたID`id`のネットワークに接続します`[0, 2^32)`。

## 公開IP

`--public-ip`（文字列）：

バリデータは自分の公開IPアドレスを知っている必要があります。そうすることで他のノードに接続方法を知らせることができます。この引数を指定しなかった場合は、ノードの公開IPを取得するためにNATトラバーサルを試みます。ローカルネットワークを作成するには、`127.0.0.1`に設定する必要があります。設定されていない場合は、NATトラバーサルを使用してIPを取得しようとします。

`--dynamic-public-ip`（文字列）：

paramが存在する場合の有効な値。`opendns`、`ifconfigco`、`ifconfigme`のいずれかです。これは`--public-ip`よりも優先されます。設定されている場合、`--dynamic-update-duration`毎にリモートサービスをポーリングし、ノードの公開IPアドレスを更新します。

`--dynamic-update-duration`（デュレーション）：

`--dynamic-public-ip`またはNATトラバーサルのポールイベントの間隔。推奨される最小時間は1分です。`5m`デフォルトは\(1\)です。

## 署名検証

`--signature-verification-enabled`（ブーリアン）：

署名の検証を有効にします。`false`に設定すると、署名を無効化できるVMでは、署名の検証が行われません。`true`デフォルトは\(1\)です。

## ステーキング

`--staking-port`（文字列）：

ステーキングサーバーがAvalancheネットワークに外部から接続するためのポートです。`9651`デフォルトは\(1\)です。

`--staking-enabled`（ブーリアン）：

Avalancheはシビル耐性にプルーフ・オブ・ステーク（PoS）を使用し、ネットワークへの攻撃が非常に高額になるようにしています。falseの場合、シビル耐性は無効となり、コンセンサス中にすべてのピアがサンプリングされます。`true`デフォルトは\(1\)です。

このフラグを`false`に設定しても、「このノードがバリデータではない」という意味では**ありません**。このノードがバリデータだけではなく、すべてのノードをサンプリングするということを意味します。**何をしようとしているのかを十分理解している場合以外は、このフラグをfalseに設定してはなりません。**

`--staking-tls-cert-file`（文字列、ファイルパス）：

Avalancheは、双方向認証のTLS接続を使用してノードを安全に接続します。この引数は、ノードが使用するTLS証明書の場所を指定します。デフォルトでは、ノードはTLS証明書が`$HOME/.avalanchego/staking/staker.crt`にあることを想定しています。

`--staking-tls-key-file`（文字列、ファイルパス）：

Avalancheは、双方向認証のTLS接続を使用してノードを安全に接続します。この引数は、ノードが使用するTLS証明書の場所を指定します。デフォルトでは、ノードはTLSプライベートキーが`$HOME/.avalanchego/staking/staker.key`であることを期待しています。

`--staking-disabled-weight`（int）：

ステーキングが無効になっている場合に各ピアに提供する重量。`1`デフォルトは\(1\)です。

## バージョン

`--version`（ブーリアン）

これが`true`の場合、バージョンを表示して終了します。`false`デフォルトは\(1\)です。

## 高度なオプション

以下のオプションは、ノードの正しさに影響する可能性があります。パワーユーザーのみがこれらを変更する必要があります。

### アプリのゴシップ

`--consensus-app-gossip-non-validator-size`（uint）：

AppGossipメッセージをゴシップするピアの数（バリデータである場合もそうでない場合もあります）。`0`デフォルトは\(1\)です。

`--consensus-app-gossip-validator-size`（uint）：

AppGossipメッセージをゴシップするバリデータの数。`6`デフォルトは\(1\)です。

### ベンチリスト

`--benchlist-duration`（デュレーション）：

`--benchlist-fail-threshold`を超えた後にピアがベンチリストに登録されるまでの最大時間。`15m`デフォルトは\(1\)です。

`--benchlist-fail-threshold`（int）：

ベンチ処理する前にノードに対して連続して失敗をしたクエリの数（すべてのクエリが失敗すると仮定）。`10`デフォルトは\(1\)です。

`--benchlist-peer-summary-enabled`（ブーリアン）：

ピア固有のクエリ待機時間のメトリックを有効にします。`false`デフォルトは\(1\)です。

`--benchlist-min-failing-duration`（デュレーション）：

ピアへのクエリが失敗してから、そのピアがベンチされるまでの最小時間。`150s`デフォルトは\(1\)です。

### 構築ディレクトリ

`--build-dir`（文字列）：

AvalancheGoとプラグインバイナリを見つける場所を指定します。デフォルトでは、実行されたAvalancheGoバイナリのパスになっています。このディレクトリの構造は次のようになっていなければなりません。

```text
build-dir
|_avalanchego
    |_plugins
      |_evm
```

### チェーンの設定

一部のチェーンでは、ノードオペレータがカスタム設定を提供できます。AvalancheGoは、ファイルからチェーンの設定を読み取り、初期化時に対応するチェーンに渡すことができます。

AvalancheGoは、`--chain-config-dir`で指定されたディレクトリでこれらのファイルを検索します。このディレクトリには、名前がチェーンIDやチェーンエイリアスであるサブディレクトリをもつことができます。各サブディレクトリには、ディレクトリ名で指定されたチェーンの設定が含まれます。各サブディレクトリには、対応するチェーンが初期化されるときに値が渡される`config`という名前のファイルを含める必要があります。例えば、C-Chainの設定は、`[chain-config-dir-goes-here]/C/config.json`にある必要があります。

これらのファイルが持つべき拡張子やファイルの内容は、VMに依存します。例えば、あるチェーンでは`config.txt`を想定し、他のチェーンでは`config.json`を想定する場合があります。同じサブディレクトリに、同じ名前で異なる拡張子（例：`config.json`と`config.txt`）を持つ複数のファイルがある場合、AvalancheGoはエラーとなり終了します。

特定のチェーンについて、AvalancheGoはまずチェーンIDを名前にもつ設定サブディレクトリを探します。それが見つからない場合は、チェーンのプライマリエイリアスを名前にもつ設定サブディレクトリを探します。それも見つからない場合は、そのチェーンの別のエイリアスの名前をもつ設定サブディレクトリを探します。すべてのフォルダ名とファイル名は、大文字と小文字が区別されます。

これらのカスタム設定を提供する必要はありません。提供されない場合は、VM固有のデフォルト設定が使用されます。

`--chain-config-dir`（文字列）：

上述のようにチェーンの設定を含むディレクトリを指定します。`$HOME/.avalanchego/configs/chains`デフォルトは\(1\)です。このフラグが指定されておらず、デフォルトのディレクトリが存在しない場合でも、カスタム設定はオプションであるため、AvalancheGoは終了しません。ただし、フラグが設定されている場合は、指定されたフォルダが存在していなければなりません。存在しない場合は、AvalancheGoはエラーで終了します。

#### C-Chainの設定

C-Chainの設定を指定するには、JSON configファイルを`{chain-config-dir}/C/config.json`（または上記のような有効な場所）に配置する必要があります。

例えば、`chain-config-dir`にデフォルト値がある場合、`config.json`は`$HOME/.avalanchego/configs/chains/C/config.json`に配置することができます。

C-Chainの設定オプションを以下に示します。

デフォルトのC-Chainの設定は次の通りです。

```json
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
  "allow-unfinalized-queries": false,
  "log-level": "info"
}
```

与えられた設定で指定されている場合のみ、デフォルト値の更新が行われます。

**API**

`snowman-api-enabled`（ブーリアン）：

Snowman APIを有効にします。デフォルトはfalseです。

`coreth-admin-api-enabled`（ブーリアン）：

Admin APIを有効にします。デフォルトはfalseです。

`net-api-enabled`（ブーリアン）：

`net_*`APIを有効にします。デフォルトはTrueです。

`eth-api-enabled`（ブーリアン）：

`eth_*`APIを有効にします。デフォルトはTrueです。

`personal-api-enabled`（ブーリアン）：

`personal_*`APIを有効にします。デフォルトはfalseです。

`tx-pool-api-enabled`（ブーリアン）：

`txpool_*`APIを有効にします。デフォルトはfalseです。

`debug-api-enabled`（ブーリアン）：

`debug_*`APIを有効にします。デフォルトはfalseです。

`web3-api-enabled`（ブーリアン）：

`web3_*`APIを有効にします。デフォルトはTrueです。

**APIガス／価格キャップ**

`rpc-gas-cap`（int）：

RPC呼び出し（`eth_estimateGas`で使用）で消費される最大のガス。nAVAX（GWei）で測定されます。デフォルトは2,500,000,000です。

`rpc-tx-fee-cap`（int）：

送信トランザクションバリアントのグローバルトランザクション手数料 \(価格 \* ガスリミット\) の上限 \(AVAXで測定\)。デフォルトは100です。

**データベースのプルーニング**

`pruning-enabled`（ブーリアン）：

trueの場合、古い履歴データのデータベースプルーニングが有効になります。履歴ルートのすべてのデータにアクセスする必要があるノードでは、無効にする必要があります。プルーニングは新しいデータに対してのみ行われます。v1.4.9でのデフォルトは`false`で、それ以降のバージョンでは`true`です。

**ログレベル**

`log-level`（文字列）：

ログレベルを定義します。`"trace"`、`"debug"`、`"info"`、`"warn"`、`"error"`、`"crit"`のいずれかでなければなりません。`"debug"`デフォルトは\(1\)です。

**キーストアの設定**

`keystore-directory`（文字列）：

秘密鍵を格納するディレクトリ。相対パスとして指定できます。空白の場合は、`coreth-keystore`で一時ディレクトリを使用します。デフォルトは空の文字列です。

`keystore-external-signer`（文字列）：

clef型サイナーの外部URIを指定します。デフォルトは空の文字列です（有効ではありません）。

`keystore-insecure-unlock-allowed`\(bool\):

trueの場合、安全でないHTTP環境でユーザーがアカウントをロック解除することを許可します。デフォルトはfalseです。

**その他の設定**

`local-txs-enabled`（ブーリアン）：

ローカルトランザクション処理を有効にします。デフォルトはfalseです。

`api-max-duration`（デュレーション）：

APIコールの最大継続時間。APIコールがこの継続時間を超えた場合、タイムアウトになります。デフォルトは0（最大値なし）です。

`api-max-blocks-per-request`（int）：

`getLogs`リクエストごとに提供するブロックの最大数。デフォルトは0（最大値なし）です。

`allow-unfinalized-queries`（ブーリアン）：

ファイナライズされていない（まだ受理されていない）ブロック／取引に対するクエリを許可します。デフォルトはfalseです。

#### X-Chainの設定

X-Chainの設定を指定するためには、JSON configファイルを`{chain-config-dir}/X/config.json`（または、上記で指定された他の有効な場所）に配置する必要があります。

例えば、`chain-config-dir`にデフォルト値がある場合、`config.json`は`$HOME/.avalanchego/configs/chains/X/config.json`に配置することができます。

これにより、X-Chainに渡すコンフィグを指定することができます。この設定のデフォルト値は

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

デフォルト値は、設定で明示的に指定されている場合のみ上書きされます。

パラメータは、次の通りです。

**トランザクションのインデックス**

`index-transactions`（ブーリアン）：

`true`に設定されている場合、AVM トランザクションインデックスを有効にします。デフォルト値は`false`です。`true`に設定されている場合、AVMトランザクションは含まれる`address`および`assetID`に対してインデックスが作成されます。このデータは`avm.getAddressTxs`[API](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api)を介して利用可能です。

`index-transactions`をtrueに設定した場合、ノードが存続する限り常にtrueに設定しておく必要があることにご注意ください。いったん`true`に設定した後で`false`に設定すると、`index-allow-incomplete`も`true`に設定しない限り、ノードは起動を拒否します（下記をご覧ください）。

`index-allow-incomplete`（ブーリアン）：

不完全なインデックスを許可します。デフォルト値は`false`です。

`index-transactions``false`この設定値は、DBにX-Chainインデックス付きのデータがなく、\(1\)が\(2\)に設定されている場合には無視されます。

### コンセンサス・パラメータ

`--consensus-gossip-frequency`（デュレーション）：

ゴシップの間の時間がフロンティアを受け入れた。`10s`デフォルトは\(1\)です。

`--consensus-shutdown-timeout`（デュレーション）：

反応しないチェーンを殺す前のタイムアウト。`5s`デフォルトは\(1\)です。

`--creation-tx-fee`（int）：

新しい状態を作成するトランザクションのためのnAVAX単位の取引手数料。デフォルトでは、1トランザクションあたり`1000000`nAVAX（.001AVAX）です。

`--min-delegator-stake`（int）：

一次ネットワークのバリデータに委ねることができる最小の賭け金（nAVAX）。

Mainnetでのデフォルトは、`25000000000`（25AVAX）です。Test Netでのデフォルトは、`5000000`（.005AVAX）です。

`--min-delegation-fee`（int）：

プライマリネットワークでのデリゲーションに課すことができる最小のデリゲーション料金に`10,000`を掛けたものです。`[0, 1000000]`の範囲でなければなりません。Mainnetでのデフォルトは、`20000`（2%）です。

`--min-stake-duration`（デュレーション）：

最小のステーキング期間。Mainnetでのデフォルトは、`336h`（2週間）です。

`--min-validator-stake`（int）：

一次ネットワークを有効にするために必要な最小の出資額（nAVAX）です。

Mainnetでのデフォルトは、`2000000000000`（2,000AVAX）です。Test Netでのデフォルトは、`5000000`（.005AVAX）です。

`--max-stake-duration`（デュレーション）：

最大のステーキング期間（時間単位）。Mainnetでのデフォルトは、`8760h`（365日）です。

`--max-validator-stake`（int）:s

プライマリネットワーク上のバリデータにかけられる最大のステーク（単位：nAVAX）。Mainnetでのデフォルトは、`3000000000000000`（3,000,000AVAX）です。これにはバリデータとデリゲータの両方がバリデータに提供するステークが含まれます。

`--stake-minting-period`（デュレーション）：

ステーキング機能の消費期間（時間単位）。Mainnetでのデフォルトは、`8760h`（365日）です。

`--tx-fee`（int）：

X-Chain上でのトランザクションを有効にするため、またP-Chain上でインポート／エクスポートトランザクションが有効になるためにバーン（焼却）する必要のあるnAVAXの量です。このパラメータは、現在の形式でのネットワークの同意が必要です。この値をデフォルトから変更する場合は、必ずプライベートなネットワークでのみ行ってください。デフォルトは、トランザクションごとに`1,000,000`nAVAXです。

`--uptime-requirement` \(フロート\):

リワードを受け取るためにバリデータがオンラインでなければならない時間の割合。`0.8`デフォルトは\(1\)です。

#### Snowのパラメータ

`--snow-avalanche-batch-size`（int）：

Snow consensusのDAG実装では、頂点に含めるトランザクションの数として`b`を定義しています。`b`を増加させると、理論的には、スループットが向上し、一方待機時間も増加します。ノードはバッチを収集するために最大で1秒間待機し、その後バッチ全体を一度に発行します。この値は`1`以上でなければなりません。`30`デフォルトは\(1\)です。

`--snow-avalanche-num-parents`（int）：

Snow consensusのDAG実装では、頂点に含めるべき親の数として`p`を定義します。`p`を増やすことで、ネットワーククエリの償却が改善されます。ただし、グラフの連結性を高めることで、グラフのトラバースの複雑さが増します。この値は`2`以上でなければなりません。`5`デフォルトは\(1\)です。

`--snow-concurrent-repolls`（int）：

Snowのコンセンサスでは、ネットワークの使用率が低い間に発行されたトランザクションを再ポーリングする必要があります。このパラメータでは、クライアントがどの程度の積極性でこれらの保留中のトランザクションをファイナライズさせるかを定義できます。このパラメータを変更するのは、Snow コンセンサスのトレードオフを慎重に検討してからにする必要があります。この値は`1`以上`--snow-rogue-commit-threshold`以下でなければなりません。`4`デフォルトは\(1\)です。

`--snow-sample-size`（int）：

Snowコンセンサスは、`k`を各ネットワークポーリング時にサンプリングされるバリデータの数と定義します。このパラメータでは、コンセンサスに使用する`k`値を定義できます。このパラメータを変更するのは、Snow コンセンサスのトレードオフを慎重に検討してからにする必要があります。この値は`1`以上でなければなりません。`20`デフォルトは\(1\)です。

`--snow-quorum-size`（int）：

Snowコンセンサスでは、`alpha`を、トランザクションの信頼性を高めるため、各ネットワークポーリング中にトランザクションを優先しなければならないバリデータの数として定義します。このパラメータでは、コンセンサスに使用する`alpha`値を定義することができます。このパラメータを変更するのは、Snow コンセンサスのトレードオフを慎重に検討してからにする必要があります。この値は`k/2`より大きくなければなりません。`14`デフォルトは\(1\)です。

`--snow-virtuous-commit-threshold`（int）：

`beta1`Snow consensusでは、\(1\)を、好ましい取引が受け入れられるために信頼性を高めなければならない連続したポールの回数と定義している。このパラメータでは、コンセンサスに使用する`beta1`値を定義することができます。このパラメータを変更するのは、Snow コンセンサスのトレードオフを慎重に検討してからにする必要があります。この値は`1`以上でなければなりません。`15`デフォルトは\(1\)です。

`--snow-rogue-commit-threshold`（int）：

Snowコンセンサスでは、`beta2`を、不正な取引が受け入れられるために信頼性を高めなければならない連続したポールの回数と定義しています。このパラメータでは、コンセンサスに使用する`beta2`値を定義することができます。このパラメータを変更するのは、Snow コンセンサスのトレードオフを慎重に検討してからにする必要があります。この値は`beta1`以上でなければなりません。`30`デフォルトは\(1\)です。

### 連続プロファイリング

メモリ／CPUのプロファイルを継続的に実行し、最新のプロファイルを保存するようにノードを設定することができます。`--profile-continuous-enabled`が設定されていると、連続的なメモリ／CPUプロファイルが有効になります。

`--profile-continuous-enabled`（ブーリアン）：

このアプリが継続的にパーフォーマンスプロファイルを生成する必要があるかどうか。デフォルトはfalse（有効ではない）です。

`--profile-dir`（文字列）：

プロファイリングが有効になっている場合、ノードは継続的にメモリ／CPUプロファイルを実行し、このディレクトリに配置します。デフォルトは`$HOME/.avalanchego/profiles/`です。

`--profile-continuous-freq`（デュレーション）：

新しいCPU/メモリプロファイルが作成される頻度。`15m`デフォルトは\(1\)です。

`--profile-continuous-max-files`（int）：

保持するCPU／メモリプロファイルの最大数。デフォルトは5です。

### データベースの設定

`--db-config-file`（文字列）：

データベース設定ファイルへのパス。

#### LevelDBの設定

LevelDB設定ファイルはJSONでなければなりません。またこれらの鍵を持っている場合があります。指定されていない鍵はデフォルト値を受け取ります。

```
{
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockCacheCapacity": int
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockSize": int
	// CompactionExpandLimitFactor limits compaction size after expanded.  This
	// will be multiplied by table size limit at compaction target level.
	"compactionExpandLimitFactor": int
	// CompactionGPOverlapsFactor limits overlaps in grandparent (Level + 2)
	// that a single 'sorted table' generates.  This will be multiplied by
	// table size limit at grandparent level.
	"compactionGPOverlapsFactor": int
	// CompactionL0Trigger defines number of 'sorted table' at level-0 that will
	// trigger compaction.
	"compactionL0Trigger": int
	// CompactionSourceLimitFactor limits compaction source size. This doesn't
	// apply to level-0.  This will be multiplied by table size limit at
	// compaction target level.
	"compactionSourceLimitFactor": int
	// CompactionTableSize limits size of 'sorted table' that compaction
	// generates.  The limits for each level will be calculated as:
	//   CompactionTableSize * (CompactionTableSizeMultiplier ^ Level)
	// The multiplier for each level can also fine-tuned using
	// CompactionTableSizeMultiplierPerLevel.
	"compactionTableSize": int
	// CompactionTableSizeMultiplier defines multiplier for CompactionTableSize.
	"compactionTableSizeMultiplier": float
	"compactionTableSizeMultiplierPerLevel": []float
	// CompactionTotalSizeMultiplier defines multiplier for CompactionTotalSize.
	"compactionTotalSizeMultiplier": float64
	// OpenFilesCacheCapacity defines the capacity of the open files caching.
	"openFilesCacheCapacity": int
	// There are two buffers of size WriteBuffer used.
	"writeBuffer": int
	"filterBitsPerKey": int
}
```

#### RocksDB設定ファイル

カスタム設定はRocksDBではまだサポートされていません。

### 健全性

`--health-check-frequency`（デュレーション）：

健全性チェックはこの頻度で実行されます。`30s`デフォルトは\(1\)です。

`--health-check-averager-halflife`（デュレーション）：


健全性チェックで使用される平均のハーフライフ（メッセージの失敗率を測定する場合など）。値が大きいほど、平均値の計算の安定性が増します。`10s`デフォルトは\(1\)です。

### ネットワーク

`--network-allow-private-ips`\(bool\):

ノードがピアをプライベートIPと接続することを許可します。`true`デフォルトは\(1\)です。

`--network-compression-enabled`\(bool\):

trueの場合、ピアに送信された特定のメッセージを圧縮して、帯域幅の使用量を減らします。

`--network-initial-timeout`（デュレーション）：

アダプティブタイムアウトマネージャーの初期タイムアウト値（単位：ナノ秒）。`5s`デフォルトは\(1\)です。

`--network-initial-reconnect-delay`（デュレーション）：

ピアの再接続を試みる前に、初期待機時間を待つ必要があります。`1s`デフォルトは\(1\)です。

`--network-max-reconnect-delay`（デュレーション）：

ピアの再接続を試みる前に、最大待機時間を待つ必要があります。`1h`デフォルトは\(1\)です。

`--network-minimum-timeout`（デュレーション）：

アダプティブタイムアウトマネージャーの最小タイムアウト値（単位：ナノ秒）。`2s`デフォルトは\(1\)です。

`--network-maximum-timeout`（デュレーション）：

アダプティブタイムアウトマネージャーの最大タイムアウト値（単位：ナノ秒）。`10s`デフォルトは\(1\)です。

`--network-timeout-halflife`（デュレーション）：

平均ネットワーク待機時間を計算するのに使用されるハーフライフ。値が大きいほど、ネットワークの待機時間の計算の安定性が増します。`5m`デフォルトは\(1\)です。

`--network-timeout-coefficient`（デュレーション）：

`network-timeout-coefficient`ピアへのリクエストは、[\(1\)] \* [平均リクエストレイテンシー]後にタイムアウトします。`2`デフォルトは\(1\)です。

`--network-get-version-timeout`（デュレーション）：

ハンドシェイクでピアからのGetVersionレスポンスを待つためのタイムアウト。`10s`デフォルトは\(1\)です。

`--network-read-handshake-timeout`（デュレーション）：

ハンドシェイクメッセージを読み込む際のタイムアウト値。`15s`デフォルトは\(1\)です。

`--network-ping-timeout`（デュレーション）：

ピアとのPing-Pongのタイムアウト値。`30s`デフォルトは\(1\)です。

`--network-ping-frequency`（デュレーション）：

他のピアをピンギングする頻度。`22.5s`デフォルトは\(1\)です。

`--network-health-min-conn-peers`（uint）：

この数以下のピアにしか接続されていない場合、ノードは不健全性を報告します。`1`デフォルトは\(1\)です。

`--network-health-max-time-since-msg-received`（デュレーション）：

ノードは、この時間内にメッセージを受信しなかった場合、不健全性を報告します。`1m`デフォルトは\(1\)です。

`--network-health-max-time-since-no-requests`（デュレーション）：

ノードは、この時間内にメッセージを受信しなかった場合、不健全性を報告します。`1m`デフォルトは\(1\)です。

`--network-health-max-portion-send-queue-full` \(フロート\):

ノードは、送信キューがこの部分を超えていっぱいになった場合、不健全性を報告します。[0,1]でなければなりません。`0.9`デフォルトは\(1\)です。

`--network-health-max-send-fail-rate` \(フロート\):

メッセージの送信失敗がこの割合を超える場合、ノードは不健全性を報告します。[0,1]でなければなりません。`0.25`デフォルトは\(1\)です。

`--network-max-clock-difference`（デュレーション）：

このノードとピアの間のクロック差が許容される最大値。`1m`デフォルトは\(1\)です。

`--network-require-validator-to-connect`\(bool\):

trueの場合、このノードがバリデータであるか、他のノードがバリデータ、あるいは他のノードがビーコンである場合のみ別のノードとの接続性を維持します。

`--outbound-connection-timeout`（デュレーション）：

ピアをダイアル中のタイムアウト。

#### メッセージレート制限

これらのフラグでインバウンドおよびアウトバウンドメッセージのレート制限を制御します。レート制限と下記のフラグついての詳細の情報は、AvalancheGoのパッケージ`throttling`を参照してください。

`--throttler-inbound-at-large-alloc-size`（uint）：

インバウンドメッセージスロットルの全体割り当てのサイズ（バイト単位）。デフォルトは`6291456`（6MiB）です。

`--throttler-inbound-validator-alloc-size`（uint）：

インバウンドメッセージスロットルの全体割り当てのサイズ（バイト単位）。デフォルトは（32MiB）です`33554432`。

`--throttler-inbound-node-max-at-large-bytes`（uint）：

インバウンドメッセージスロットルの全体割り当てからノードが取得できる最大バイト数。デフォルトは`2097152`（2MiB）です。

`--throttler-inbound-node-max-processing-msgs`（uint）：

ピアからのこの大量のメッセージを処理する際、ノードはピアからのメッセージの読み取りを停止します。このメッセージ量より少ない場合は、ピアからのメッセージの読み取りを再開します。`1024`デフォルトは\(1\)です。

`--throttler-outbound-at-large-alloc-size`（uint）：

アウトバウンドメッセージスロットルの全体割り当てのサイズ（バイト単位）。デフォルトは`6291456`（6MiB）です。

`--throttler-outbound-validator-alloc-size`（uint）：

アウトバウンドメッセージスロットルのバリデータ割り当てのサイズ（バイト単位）。デフォルトは（32MiB）です`33554432`。

`--throttler-outbound-node-max-at-large-bytes`（uint）：

アウトバウンドメッセージスロットルの全体割り当てからノードが取得できる最大バイト数。デフォルトは`2097152`（2MiB）です。
#### 接続レート制限

`--inbound-connection-throttling-cooldown`（デュレーション）：

ノードは、この期間中に最大1回、指定されたIPからのインバウンドコネクションをアップグレードします。`10s`デフォルトは\(1\)です。０かマイナスの場合、アップグレードするかどうか決定する際に、最後のアップグレードがいつだったかは考慮しません。

`--inbound-connection-throttling-max-conns-per-sec`（uint）：

ノードは毎秒、最大この数のインバウンドコネクションを受け入れます。`512`デフォルトは\(1\)です。

`--inbound-connection-throttling-max-recent`（uint）：

非推奨です。AvalancheGo v1.6.0では無視されます。

`--outbound-connection-throttling-rps`（uint）：

ノードは1秒当たり最大この量の送信ピア接続を行います。`50`デフォルトは\(1\)です。

#### ピアリスト・ゴシップ

ノードはピアをお互いにゴシップするため、各ノードは最新のピアリストを持つことができます。ノードは、`--network-peer-list-gossip-frequency`毎に、`--network-peer-list-size`ピアをそのピアの`--network-peer-list-gossip-size`にゴシップします。

`--network-peer-list-gossip-frequency`（デュレーション）：

`1m`デフォルトは\(1\)です。

`--network-peer-list-gossip-size`（int）：

`50`デフォルトは\(1\)です。

`--network-peer-list-size`（int）：

`20`デフォルトは\(1\)です。

`--network-peer-list-staker-gossip-fraction`（uint）：

ゴシップされた各`network-peer-list-staker-gossip-fraction`ピアリストメッセージのうち1つがバリデータに送信されます。

`2`デフォルトは\(1\)です。

### プラグインモード

`--plugin-mode-enabled`\(bool\):

[](https://github.com/hashicorp/go-plugin)trueの場合、ノードをプラグインとして実行します。`false`デフォルトは\(1\)です。

### サブネット

#### ホワイトリスト

`--whitelisted-subnets`（文字列）：

このノードが追加された場合に検証されるサブネットのコンマ区切りリスト。デフォルトは空です（プライマリネットワークのみを検証します）。

#### サブネット設定

サブネットにパラメータを指定することができます。ここのパラメータは、指定されたサブネットのすべてのチェーンに適用されます。パラメータは`--subnet-config-dir`下の`{subnetID}.json`設定ファイルで指定されなければなりません。AvalancheGoは、`--whitelisted-subnet`パラメータで指定されたサブネットの設定をロードします。

`--subnet-config-dir`（文字列）：

上に記載したようにサブネット設定を含むディレクトリを指定します。`$HOME/.avalanchego/configs/subnets`デフォルトは\(1\)です。フラグが明示的に設定されている場合、指定したフォルダが存在していなければなりません。そうでなければ、AvalancheGoはエラーで終了します。

例：ID`p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6`のサブネットがあるとします。`$HOME/.avalanchego/configs/subnets/p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6.json`のデフォルト`subnet-config-dir`下に設定ファイルを作成することができます。設定ファイルの例は次の通りです。

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  }
}
```

**バリデータのみ**

`validatorOnly`\(bool\):

`true`の場合、このノードはP2Pメッセージを介して、サブネットブロックチェーンの内容を非バリデータに公開ません。`false`デフォルトは\(1\)です。詳細については、[こちら](../platform/create-a-subnet.md#private-subnets)をご覧ください。

**コンセンサス・パラメータ**

サブネット設定では、新しいコンセンサスパラメータのロードがサポートされています。JSON鍵は、一致する`CLI`鍵とは異なります。

| CLI鍵 | JSON鍵 |
| :--- | :--- |
| --snow-sample-size | k |
| --snow-quorum-size | alpha |
| --snow-virtuous-commit-threshold | betaVirtuous |
| --snow-rogue-commit-threshold | betaRogue |
| --snow-concurrent-repolls | concurrentRepolls |
| --snow-optimal-processing | optimalProcessing |
| --snow-max-processing | maxOutstandingItems |
| --snow-max-time-processing | maxItemProcessingTime |
| --snow-avalanche-batch-size | batchSize |
| --snow-avalanche-num-parents | parentSize |

サブネットのコンセンサスパラメータは、デフォルトでプライマリネットワークで使用される値と同じに設定されています。[ここ](command-line-interface.md#snow-parameters)で指定されている値です。

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

