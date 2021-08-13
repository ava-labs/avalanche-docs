# コマンドラインインターフェイス

ノードの設定を以下の引数で指定できます。

## JavaScript-JavaScript-JavaScript-Java

### Config ファイル

`--config-file` \(string\):

JSON ファイルへのパス ノードの設定を指定します。コマンドライン引数は、設定ファイルで設定された引数を上書きします。

JSON 設定ファイルの例:

```javascript
{
    "log-level": "debug"
}
```

### API-JP

`--api-admin-enabled` \(boolean\):

`false` に設定した場合、このノードは ADMIN API を公開しません。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/admin-api.md)をご覧ください。

`--api-auth-required` \(boolean\):

`true` に設定した場合、API 呼び出しは認可トークンが必要です。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/auth-api.md)をご覧ください。

`--api-auth-password` \(string\):

認可トークンの作成/取り消しに必要なパスワードです。`--api-auth-required=true` の場合、指定する必要があります。そうでない場合は無視されます。詳しくは[こちら](../avalanchego-apis/auth-api.md)をご覧ください。

`--api-health-enabled` \(boolean\):

`true`に設定すると、このノードはHealth APIを公開します。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/health-api.md)をご覧ください。

`--index-enabled` \(boolean\):

`false` の場合、このノードはインデックスサーを有効にせず、インデックスAPIは利用できません。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/index-api.md)をご覧ください。

`--api-info-enabled` \(boolean\):

`true` に設定すると、このノードは Info API を公開します。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/info-api.md)をご覧ください。

`--api-ipcs-enabled` \(boolean\):

`true`に設定すると、このノードはIPC APIを公開します。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/ipc-api.md)をご覧ください。

`--api-keystore-enabled` \(boolean\):

`false` に設定した場合、このノードは Keystore API を公開しません。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/keystore-api.md)をご覧ください。

`--api-metrics-enabled` \(boolean\):

`false` に設定した場合、このノードは Metrics API を公開しません。`JavaScript-JavaScript-JavaScript-Java`詳しくは[こちら](../avalanchego-apis/metrics-api.md)をご覧ください。

### Assertions-JP-JP-J

`--assertions-enabled` \(boolean\):

`true` に設定すると、アサーションはコードベース全体で実行されます。これは、より具体的なエラーメッセージが表示される可能性があるため、デバッグで使用することを目的としています。`JavaScript-JavaScript-JavaScript-Java`

### Bootstrapping-JP

`--bootstrap-beacon-connection-timeout` \(duration\):

Beacons に接続しようとするときのタイムアウト。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--bootstrap-ids` \(string\):

Bootstrap IDsはバリデータIDの配列です。これらの ID は、ブートストラップピアを認証するために使用されます。このフィールドの設定例は`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`です。デフォルト値はネットワーク ID に依存します。

`--bootstrap-ips` \(string\):

Bootstrap IPsはIPv4:portペアの配列です。これらの IP アドレスは、現在のAvalanche ステートのブートストラップに使用されます。このフィールドの設定例は `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`です。デフォルト値はネットワーク ID に依存します。

`--bootstrap-retry-enabled` \(boolean\):

true の場合、失敗した場合に起動時の再起動を試みます。

`--bootstrap-retry-max-tempts` \(uint\):

失敗した後、起動時の再起動回数を最大限に活用します。

### JPD-JPD-JP

`--db-dir` \(string, file path\):

DJ-PJP-JP-JPデフォルトは `"$HOME/.avalanchego/db"` です。

`--db-type` \(string\):

使用するデータベースの種類を指定します。`reveldb`, `rocksdb`, `memdb`.`memdb`は、非永続化されたデータベースです。

`Linux```-JP-JP-J

**RocksDBに関する2つの重要な注意事項**: まず、RocksDBはすべてのコンピュータで動作するわけではありません。第二に、RocksDBはデフォルトではビルドされず、公開されたバイナリには含まれていません。AvalancheGo を RocksDB でビルドするには、端末で `ROCKSDBALLOWED=1 を`エクスポートし、`scripts/build.sh` を実行します。`--db-type=rocksdb` を使う前にこれを行う必要があります。

### ジェネシス

`--genesis` \(string\):

JSON ファイルへのパスを使用するジェネシスデータを含む JSON ファイル。標準ネットワーク \(Mainnet, Testnet)を実行すると無視されました。\) 指定されていない場合、デフォルトのジェネシスデータを使用します。ジェネシスデータのJSON表現の例については、[こちら](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16)を参照してください。

### HTTP サーバー

`--http-host` \(string\):

HTTP API がリッスンするアドレス。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`つまり、ノードはデフォルトで、同じマシンから作られたAPIコールを処理できるだけです。他のマシンからのAPIコールを許可するには、`--http-host=`を使用します。

`--http-port` \(int\):

各ノードはHTTPサーバーを実行し、ノードとAvalancheネットワークとの相互作用のためのAPIを提供します。この引数は、HTTP サーバーがリッスンするポートを指定します。`JavaScript-JP-JP-`

`--http-tls-cert-file` \(string, file path\):

この引数は、HTTPS サーバーのためにノードが使用する TLS 証明書の場所を指定します。`--http-tls-enabled=true` のときに指定する必要があります。デフォルト値はありません。

`--http-tls-enabled` \(boolean\):

`True` に設定した場合、このフラグはHTTPSを使用するためにサーバーをアップグレードしようとします。`JavaScript-JavaScript-JavaScript-Java`

`--http-tls-key-file` \(string, file path\):

この引数は、HTTPS サーバーのためにノードが使用するTLS 秘密鍵の場所を指定します。`--http-tls-enabled=true` のときに指定する必要があります。デフォルト値はありません。

### IPCS-JP

`--ipcs-chain-ids` \(string\)

Continue ids コンマで区切られたチェーン ID です。デフォルト値はありません。

`--ipcs-path` \(string\)

IPC ソケットのディレクトリ \(Unix\) または名前付きパイププレフィックス \(Windows\)。JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

### ファイル記述子の制限

`--fd-limit` \(int\)

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-デフォルトは `32768`

### Logging-JP

`--log-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

ログレベルはどのイベントをログするかを決めます。7つのレベルがあります。

* `Off`:ログにはこのレベルのログがありません。
* `Fatal`: 回復不可能な致命的なエラー。
* `Error`: ノードが発生したエラー、これらのエラーは回復することができました。
* `Warn`: 警告 - 偽造型ビザンチンノード、または将来のエラーを示す可能性がある警告。
* `Info`: ノードステータス更新の便利な説明です。
* `Debug`: デバッグのロギングは、コードで可能なバグを理解しようとする際に便利です。通常の使用に必要な情報が表示されます。
* `Verbo`: ノードが処理している膨大な量の情報を追跡します。これには、メッセージ内容や、非常に低いレベルのプロトコル分析のためのデータのバイナリダンプが含まれています。

ログレベルノートを指定すると、指定した優先度以上のすべてのログが追跡されます。デフォルトは `Info` です。

`--log-display-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

ログレベルは、どのイベントを表示するかを決定します。`--log-level` に与えられた値にデフォルト値が設定されます。

`--log-display-highlight` \(string, `{auto, plain, colors}`\):

表示ログの色/ハイライトを表示するかどうか。出力が端末の場合にデフォルトのハイライト表示されます。そうでなければ、`{auto, plain, colors}` のいずれかでなければなりません。

`--log-dir` \(string, file path\):

システムログを保存するディレクトリを指定します。デフォルトでは `"$HOME/.avalanchego/logs"` です。

### ネットワークID

`--network-id` \(string\):

Node が接続するネットワークのID。いずれかの場合もあります:

* `--network-id=mainnet` -> メインネット \(default\)に接続します。
* `--network-id=fuji` -> 富士-test-networkに接続します。
* `--network-id=testnet` -> 現在のtest-networkに接続します。\(今は富士です。\)
* `--network-id=local` -> ローカル test-network に接続します。
* `--network-id=network-{id}` -> 指定したIDでネットワークに接続します。`id`は`[0, 2^32]`でなければなりません。

### Public IP-JP

`--public-ip` \(string\):

バリデータは、他のノードに接続する方法を知ることができるように、パブリックに直面しているIPアドレスを知っている必要があります。この引数が指定されていない場合、ノードはNATトラバーサルを実行し、ノードのパブリックIPを取得します。Local Network を作成するには、`127.0.0.1` に設定してください。JP-JP-

`--dynamic-public-ip` \(string\):

param が存在する場合に有効な値: `opendns`, `ifconfigco` または `ifconfigme`.`--public-ip`-JP-JP-設定すると、リモートサービスを`--dynamic-update-duration`-duration-modeで採択し、ノードのパブリックIPアドレスを更新します。

`--dynamic-update-duration` \(duration\):

`--dynamic-public-ip` または NAT トラバーサルのための投票イベント間の時間。推奨最低1分です。`JavaScript-JavaScript-JavaScript-Java`

### 署名検証

`--signature-verification-enabled` \(boolean\):

署名検証を有効にします。`false` に設定すると、署名を無効化できるVMでは署名がチェックされません。`JavaScript-JavaScript-JavaScript-Java`

### ステーキング

`--staking-port` \(string\):

ステーキングサーバーがAvalancheネットワークに接続するポート。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--staking-enabled` \(boolean\):

AvalancheはProof of Stake \(PoS\)をSybil抵抗として使用し、ネットワークを攻撃するのに非常に高価なものにします。false の場合、sybil resistance が無効になり、すべてのピアはコンセンサス中にサンプリングされます。`JavaScript-JavaScript-JavaScript-Java`

`--staking-tls-cert-file` \(string, file path\):

Avalancheは、双方向認証済みTLS接続を使用して、ノードを安全に接続します。この引数は、ノードで使用される TLS 証明書の場所を指定します。デフォルトでは、ノードはTLS証明書が`$HOME/.avalanchego/staking/staker.crt`であることを期待しています。

`--staking-tls-key-file` \(string, file path\):

Avalancheは、双方向認証済みTLS接続を使用して、ノードを安全に接続します。この引数は、ノードで使用されるTLS秘密鍵の場所を指定します。デフォルトでは、ノードはTLSの秘密鍵が`$HOME/.avalanchego/staking/staker.key`であることを期待しています。

`--staking-disabled-weight` \(int\):

ステーキングが無効になっているときに各ピアに提供する重量。`JavaScript-JavaScript-JavaScript-Java`

### JavaScript-JavaScript-JavaScript-Java

`--version` \(boolean\)

The `true` ならば、バージョンを印刷して終了します。`JavaScript-JavaScript-JavaScript-Java`

## Advanced Options

次のオプションは、ノードの正しさに影響を与える可能性があります。これらを変更するのは電力ユーザのみです。

### Benchlist-JP-JP-

`--benchlist-duration` \(duration\):

`--benchlist-fail-threshold` を超えた後、ピアがベンチリストされます。`JavaScript-JavaScript-JavaScript-Java`

`--benchlist-fail-threshold` \(int\):

Node への連続失敗したクエリの数 \(すべてのクエリが失敗する場合) をベンチする前にノードに返却します。`JavaScript-JavaScript-JavaScript-Java`

`--benchlist-peer-summary-enabled` \(boolean\):

ピア固有のクエリーレイテンシーメトリクスを有効にします。`JavaScript-JavaScript-JavaScript-Java`

`--benchlist-min-failing-duration` \(duration\):

ピアへの最小時間メッセージは、ピアがベンチされる前に失敗する必要があります。`JavaScript-JavaScript-JavaScript-Java`

### ディレクトリを構築

`--build-dir` \(string\):

AvalancheGo サブバイナリとプラグインバイナリをどこで検索するかを指定します。AvalancheGoバイナリーのパスをデフォルト値で取得します。このディレクトリの構造は次のようにする必要があります。

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

### Chain Configs(チェーン構成)

いくつかのチェーン \(現在はC-Chain\のみ)では、ノード演算子がカスタム構成を提供できるようにします。AvalancheGoは、ファイルからチェーン構成を読み取り、それらを初期化の対応するチェーンに渡すことができます。

AvalancheGo は、`--chain-config-dir` で指定されたディレクトリでこれらのファイルを探します。このディレクトリは、チェーンIDまたはチェーンエイリアスという名前のサブディレクトリを持っています。各サブディレクトリには、ディレクトリ名で指定されたチェーン設定が含まれています。各サブディレクトリには`config`という名前のファイルを含む必要があります。その値は、対応するチェーンが初期化されたときに渡されます。例えば、C-Chainの設定は次のようにしてください。`[chain-config-dir-goes-here]/C/config.json`。

これらのファイルに必要な拡張子、およびこれらのファイルの内容はVM-dependent-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Password-Passw例えば、いくつかのチェーンでは`config.txt`を期待するかもしれませんが、他のチェーンでは`config.json`を期待するかもしれません。複数のファイルが同じ名前で異なる拡張子 \(例: `config.json` と `config.txt`\) を提供している場合、AvalancheGo はエラーで終了します。

AvalancheGo は、まずチェーン ID という名前の config サブディレクトリを探します。JavaScript-JP-JP-JavaScript-JP-JP-すべてのフォルダーとファイル名は大文字小文字を区別します。

これらのカスタム構成を提供する必要はありません。それらが提供されていない場合、VM固有のデフォルト設定が使用されます。

`--chain-config-dir` \(string\):

上記のように、チェーン構成を含むディレクトリを指定します。デフォルトは`$HOME/.avalanchego/configs/chains`です。このフラグが提供されていない場合、デフォルトのディレクトリが存在しない場合、AvalancheGoは終了しません。ただし、フラグが設定されている場合、指定したフォルダーが存在する必要があります。またはAvalancheGoはエラーで終了します。

#### C-Chain Configs(C-Configs)

現在、C-Chainはカスタム構成をサポートする唯一のチェーンです。C-Chainの設定を指定するには、JSON コンフィグファイルを`{chain-config-dir}/C/config.json` \(または上記のように有効な場所に置く必要があります。\)

例えば、`chain-config-dir`にデフォルト値があれば、`config.`jsonは`$HOME/.avalanchego/configs/chains/C/config.json`に置くことができます。

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

C-Chain 設定の詳細については、[こちら](command-line-interface.md#coreth-config)をご覧ください。

### C-Chain/Coreth<a id="coreth-config"></a>

`--coreth-config` \(json\):

[JavaScript-JP-JP-](command-line-interface.md#chain-configs)\)

これにより、C-Chainに渡す設定を指定できます。この設定のデフォルト値は次のとおりです。

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

デフォルト値は、config で明示的に指定された場合のみ上書きされます。

パラメータは次の通りです。


#### Coreth APIs

`snowman-api-enabled` \(boolean\):

Snowman API を有効にします。JavaScript-JavaScript-JavaScript-Java

`coreth-admin-api-enabled` \(boolean\):

Admin API を有効にします。JavaScript-JavaScript-JavaScript-Java

`net-api-enabled` \(boolean\):

`net_*` API を有効にします。JavaScript-JavaScript-JavaScript-Java

#### Coreth API Gas/Price Caps

`rpc-gas-cap` \(int\):

RPC Call \(`eth_estimateGas`\)で消費する最大ガス(gas\)。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

`rpc-tx-fee-cap` \(int\):

JavaScript-JP-JP-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

#### JPY-JPY-JP

`pruning-enabled`\(bool\):

trueの場合、旧式の履歴データのデータベースプルーニングが有効になります。JavaScript-JP-JP-Pruning は新しいデータのみで行われます。デフォルトはv1.4.9では `false`、そしてそれ以降のバージョンでは `true` です。

#### Eth APIs-JP

`eth-api-enabled` \(boolean\):

`eth_*` API を有効にします。JavaScript-JavaScript-JavaScript-Java

`personal-api-enabled` \(boolean\):

`personal_*` API を有効にします。JavaScript-JavaScript-JavaScript-Java

`tx-pool-api-enabled` \(boolean\):

`txpool_*` APIを有効にします。JavaScript-JavaScript-JavaScript-Java

`debug-api-enabled` \(boolean\):

`debug_*` API を有効にします。JavaScript-JavaScript-JavaScript-Java

`web3-api-enabled` \(boolean\):

`web3_*` API を有効にします。JavaScript-JavaScript-JavaScript-Java

#### Eth 設定

`local-txs-enabled` \(boolean\):

JavaScript-JavaScript-JavaScript-JavaJavaScript-JavaScript-JavaScript-Java

`api-max-duration` \(duration\):

APIコール期間最大値API 呼び出しがこの期間を超えると、タイムアウトします。デフォルトは 0 \(no maximum\)です。

`api-max-blocks-per-request` \(int\):

`getLogs` リクエストごとにサービスするブロック数です。JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

`allow-unfinalized-queries` \(boolean\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-Java

#### 継続的なプロファイリング

ノードを構成してメモリ/CPUプロファイルを継続的に実行し、最新のものを保存できます。`Continuous-profiler-dir が`設定されている場合、CPU プロファイリングが有効になります。

`continuous-profiler-dir` \(string\):

Node-JP-JPJavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

`continuous-profiler-frequency` \(duration\):

CPU/メモリープロファイルが作成される頻度はどのくらいです。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`continuous-profiler-max-files` \(int\):

CPU/メモリプロファイルファイルの最大数。JavaScript-JavaScript-JavaScript-Java

#### Keystore Settings(キーストア設定)

`keystore-directory` \(string\):

PREVENT キーを含むディレクトリー。JavaScript-JavaScript-JavaScript-JavaScript-JavaScri空の場合、`coreth-keystore` では一時ディレクトリを使用します。JavaScript-JavaScript-JavaScript-Java

`keystore-external-signer` \(string\):

Clef-type シグナーの外部 URI を指定します。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

`keystore-insecure-unlock-allow-allow-`allow-JP \(bool\):

true の場合、ユーザーは安全でない HTTP 環境でアカウントのロックを解除できます。JavaScript-JavaScript-JavaScript-Java

### コンセンサスパラメーター

`--consensus-gossip-frequency` \(duration\):

GOSSIPINGの時間は、フロンティアを受ける。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--consensus-shutdown-timeout` \(duration\):

レスポンシブチェーンを殺す前のタイムアウト`JavaScript-JavaScript-JavaScript-Java`

`--creation-tx-fee` \(int\):

NAVAXで、新しい状態を作成するトランザクションの取引手数料です。デフォルト値は`トランザクション`ごとに100 nAVAX \(.001 AVAX\)です。

`--min-delegator-stake` \(int\):

NAVAX では、プライマリネットワークのバリデータに委託できる最小のステークが発生します。

Main Net では `2500` \(25 AVAX\) になります。デフォルト値は`、`テストネットで500 \(.005 AVAX\)です。

`--min-delegation-fee` \(int\):

Primary Networkの委任に課金できる最低委任料金は、`10,000`を掛けました。`[0, 100]` の範囲でなければなりません。Main Net では `200` \(2%\) になります。

`--min-stake-duration` \(duration\):

最小のステーキング期間Main Netのデフォルトは`336h` \(2週間)です。\)

`--min-validator-stake` \(int\):

NAVAX での最小の利害関係は、プライマリネットワークを検証するために必要なものです。

Main Net では `200` \(2,000 AVAX\) になります。デフォルト値は`、`テストネットで500 \(.005 AVAX\)です。

`--max-stake-duration` \(duration\):

--JavaScript-JP`-`JP-

`--max-validator-stake` \(int\):s

nAVAX での最大のステークは、プライマリネットワーク上のバリデータに配置できます。Main Net では `300` \(3,000,000 AVAX\) になります。これには、バリデータとデリゲーターの両方によってバリデータに提供されるステークが含まれます。

`--snow-avalanche-batch-size` \(int\):

SnowコンセンサスのDAG実装では、`b`を頂点に含めるべきトランザクション数と定義しています。`B`の増加は、理論的には、遅延を増やすとともにスループットを増やすでしょう。ノードはバッチを収集するのに1秒間待ち、その後、バッチ全体を一度に発行します。値は少なくとも`1`でなければなりません。デフォルト値は`30`です。

`--snow-avalanche-num-parents` \(int\):

Snow consensusのDAG実装では、`p`を頂点に含めるべき親の数と定義しています。`p` を増やすことで、ネットワークククエリの償却が改善されます。しかしながら、グラフの接続性が増加することにより、グラフのトラバースの複雑さが増加します。値は`2`つ以上でなければなりません。デフォルト値は`5`です。

`--snow-concurrent-repolls` \(int\):

Snow のコンセンサスには、ネットワーク使用量の低い間に発行されたリポリングトランザクションが必要です。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-これは、Snow Consensusのトレードオフを慎重に考慮した上でのみ変更する必要があります。値は少なくとも`1`で、`--snow-rogue-commit-threshold`でなければなりません。`JavaScript-JavaScript-JavaScript-Java`

`--snow-sample-size` \(int\):

Snow コンセンサス `k` は、各ネットワーク ポール中にサンプリングされるバリデーターの数と定義します。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-`JavaScri`これは、Snow Consensusのトレードオフを慎重に考慮した上でのみ変更する必要があります。値は少なくとも`1`でなければなりません。デフォルト値は`20`です。

`--snow-quorum-size` \(int\):

Snow consensus は`、`トランザクションに対する信頼性を高めるために、各ネットワーク投票時にトランザクションを好むバリデーターの数を定義します。このパラメータでは、コンセンサスに使用する`アルファ`値を定義できます。これは、Snow Consensusのトレードオフを慎重に考慮した上でのみ変更する必要があります。値は`k/2`より大きい値でなければなりません。`JavaScript-JavaScript-JavaScript-Java`

`--snow-virtuous-commit-threshold` \(int\):

Snowのコンセンサスでは、`beta1`を、好ましいトランザクションが受け入れられるための信頼性を高める必要があると定めています。このパラメータでは、コンセンサスに使用する`beta1`値を定義できます。これは、Snow Consensusのトレードオフを慎重に考慮した上でのみ変更する必要があります。値は`1`つ以上でなければなりません。デフォルトは`15`です。

`--snow-rogue-commit-threshold` \(int\):

Snowのコンセンサスでは、`beta2`を、不正なトランザクションが受け入れられるための信頼性を高める必要があるという連続した投票数と定義しています。このパラメータでは、コンセンサスに使用する`beta2`値を定義できます。これは、Snow Consensusのトレードオフを慎重に考慮した上でのみ変更する必要があります。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri``JavaScript-JavaScript-JavaScript-Java`

`--stake-minting-period` \(duration\):

時間で、ステーキング機能の消費期間。Main Netのデフォルトは`8760h` \(365 days\)です。

`--tx-fee` \(int\):

トランザクションが有効になるために、nAVAXを焼き付ける必要量です。このパラメータは、現在の形でネットワーク合意が必要です。この値をデフォルトから変更するのは、プライベートネットワークでのみ行う必要があります。デフォルト値は`1`トランザクションあたり100 nAVAXです。

`--uptime-requirement` \(float\):

バリデーターは、報酬を受け取るためにオンラインでなければなりません。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

### 健康

`--health-check-frequency` \(duration\):

Health checkはこのfreqencyで実行されます。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--health-check-averager-`halffeen \(duration\):

HALF-JP-JP\) より大きい値--> 平均値の揮発性計算が少ない`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

### JavaScript-JavaScript-JavaScript-JavaScript-JavaScri

これらのフラグは、インバウンドメッセージとアウトバウンドメッセージのレート制限を規定します。rate-ritingと下のフラグの詳細については、AvalancheGo のパッケージ`のスロットリング`を参照してください。

`--throttler-inbound-at-large-alloc-size` \(uint\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScriデフォルト値は `33554432` \(32 メビバイト\)です。

`--throttler-inbound-validator-alloc-size` \(uint\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-デフォルト値は `33554432` \(32 メビバイト\)です。

`--throttler-inbound-node-max-at-large-bytes` \(uint\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScriデフォルト値は `2048` \(2 mebibytes\)です。

`--throttler-outbound-at-large-alloc-size` \(uint\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScriデフォルト値は `33554432` \(32 メビバイト\)です。

`--throttler-outbound-validator-alloc-size` \(uint\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-デフォルト値は `33554432` \(32 メビバイト\)です。

`--throttler-outbound-node-max-at-large-bytes` \(uint\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScriデフォルト値は `2048` \(2 mebibytes\)です。

### JPN-WEBサイト

`--network-compression-enabled` \(bool\) \(v1.4.11\):

true の場合、バージョン >= v1.4.11 でのピアに送られた特定のメッセージを圧縮して帯域幅の使用量を減らします。

`--network-initial-timeout` \(duration\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-`JavaScript-JavaScript-JavaScript-Java`

`--network-minimum-timeout` \(duration\):

JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-`JavaScript-JavaScript-JavaScript-Java`

`--network-maximum-timeout` \(duration\):

Adaptive timeout managerの最大タイムアウト値はナノ秒で表示されます。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--network-timeout-halffeen`(duration\):

平均ネットワーク遅延の計算時に使用される半減期。--> より大きな値--> 不揮発性のネットワーク遅延計算`JavaScript-JavaScript-JavaScript-Java`

`--network-timeout-cofeficient` \(duration\):

PEERS_PARC`_`CONFIG_JP_JP_`JavaScript-JavaScript-JavaScript-Java`

`--network-health-min-conn-peers` \(uint\):

Nodeはこの多くのピアよりも少ない場合、不健全な状態を報告します。`JavaScript-JavaScript-JavaScript-Java`

`--network-health-max-time-since-msg-received` \(duration\):

Node は、この時間のメッセージを受けていない場合、不正な状態を報告します。`JavaScript-JavaScript-JavaScript-Java`

`--network-health-max-time-since-no-requests` \(duration\):

Node は、この時間のメッセージを受けていない場合、不正な状態を報告します。`JavaScript-JavaScript-JavaScript-Java`

`--network-health-max-portion-send-queue-full` \(float\):

Node は、その send キューがこの部分を満たす場合に、不正に報告します。\[0,1\] にある必要があります。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--network-health-max-send-fail-rate` \(float\):

Node は、メッセージのこの部分が失敗した場合に、不正に報告します。\[0,1\] にある必要があります。`JavaScript-JavaScript-JavaScript-JavaScript-JavaScri`

`--inbound-connection-throtting-cooldown` \(duration\)

`--inbound-connection-throttling-max-create` \(uint\)

Node は、最後の `inbound-connection-throtting-cooldown` で IP からのインバウンド接続のみを受け入れます。Node `は、inbound-connection-`throttling-max-connection-throttling-max-recent ごとに、すべての IPS からのみ inbound-`connection-throttling-max-cending-max-recent` でのみ許可します。

### ピアリストのゴシピング

Gossipピアをノードし、各ノードが最新のピアリストを持つことができるようにします。`--network-peer-list-size`-peer-`list-`gossip-size-`peer-list-gossip-frequency-JP-JP-`

`--network-peer-list-gossip-frequency` \(duration\):

`JavaScript-JavaScript-JavaScript-Java`

`--network-peer-list-gossip-size` \(int\):

`JavaScript-JavaScript-JavaScript-Java`

`--network-peer-list-size` \(int\):

`JavaScript-JavaScript-JavaScript-Java`

### プラグインモード

`--plugin-mode-enabled` \(bool\):

true の場合、ノードを[プラグイン](https://github.com/hashicorp/go-plugin)として実行します。`JavaScript-JavaScript-JavaScript-Java`

### Subnet ホワイトリスト

`--whitelisted-subnets` \(string\):

Comma-Space-JP-JPデフォルトでは空の \(Primary Network\)のみを検証します。

### Virtual Machine \(VM\) 設定<a id="vm-configs"></a>

`--vm-aliases-file` \(string\):

JSON ファイルへのパス バーチャルマシン ID のためのエイリアスを定義します。デフォルトでは、`~/.avalanchego/configs/vms/aliases.json` です。コンテンツの例:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

上記の例では`、IDが「tGas3T58KzdjLHHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhHH」`を「`timerpc」`にエイリアスします`。`

