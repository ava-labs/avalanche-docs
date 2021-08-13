# Avash-JP

Avash は、Avalanche ネットワーク上でデプロイおよびテストするために使用される一時的なシェル実行環境です。Avash によってローカルにデプロイされた Avalanche ノードは、Avash が終了すると終了します。

Avash は、Lua スクリプトを実行する機能を提供します。これにより、タスクの自動化が可能になります。例えば、Luaスクリプトを作成して、各ノードにいくつかの設定があるAvalancheノードのネットワークを展開することができます。これにより、テストが簡単になります。

## JPY-JPY-JP<a id="installation"></a>

### JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-<a id="requirements"></a>

* Golang 1.15.5以降
* AvalancheGo-JP

### クイックセットアップ<a id="quick-setup"></a>

Avashをダウンロードしてビルドするには:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Avashを実行し、5つのノードステーキングネットワークを起動するには:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## JavaScript-JP-JP-<a id="configuration"></a>

Avash は、設定ファイルなしで起動できますが、シェルのグローバル設定の一部を調整するオプションとして利用できます。Avash はデフォルトで`$HOME`ディレクトリで`.avash.yaml`を検索しますが、`--config`フラグを使用して探すためにカスタム設定ファイルパスを設定できます。

以下はAvash 構成ファイルの形式です。

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

フィールド引数は次のように説明します。

* `<filepath>` - ファイルへのフルパスです。例: `/home/username/file.txt`
* `<directory>` - ディレクトリへのフルパスです。例: `/home/username/folder`
* `<log-level>` - ログしたメッセージをフィルタリングするための有効なログレベルです。`--`

### JPF-JP-JP<a id="fields"></a>

**avalancheLocation**

```text
Path to AvalancheGo binary.

Type:
  optional, <filepath>

Default:
  $GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego
```

**datadir-jp**

```text
Path to store Avash data at.

Type:
  optional, <directory>

Default:
  $GOPATH/src/github.com/ava-labs/avash/stash
```

**log.terminal**

```text
Log level for messages logged to terminal.

Type:
  optional, <log-level>

Default:
  info
```

**log.logfile**

```text
Log level for messages logged to log files.

Type:
  optional, <log-level>

Default:
  info
```

**log.dir.jp**

```text
Path to put log directory at.

Type:
  optional, <directory>

Default:
  <datadir>/logs
```

## Avash の使用<a id="using-avash"></a>

### シェルを開く<a id="opening-a-shell"></a>

Avash の新しいインスタンスを`./avash` で開始します。

`help`を実行して、利用可能なコマンドを確認します。

`help [command]` を実行して、そのコマンドで使用可能なオプションのリストを確認します。

例:

```text
help procmanager
help procmanager start
```

### JPJ-PJ-PJ<a id="commands"></a>

Avashには以下のルートコマンドが付属しています。

* `avawallet` - ネットワーク経由でAvalanche Paymentsとやり取りするためのツール。
* `callrpc` - ノードへのRPCコールを発行します。
* `exit` - シェルを終了します。
* `help` - ヘルプテキストを表示します。
* `network` - リモートホストとのインタフェースのためのツール。
* `procmanager` - Avash プロセスマネージャーとの交換。
* `runscript` - 提供されたスクリプトを実行します。
* `JavaScript`-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `startnode` - ノードを起動します。
* `varstore` - 変数ストアを作成し、変数を印刷するためのツールです。

これらは、タブキーを使用して列挙または自動完了することができます。

**avawallet-JP**

**警告**: このウォレットはメモリに保持され、すべてのデータは終了時に消去されます。JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-

```text
Tools for interacting with Avalanche Payments over the network. Using this
    command we can create, send, and get the status of a transaction.

Usage:
  avash avawallet [command] [flags]

Available Commands:
  addkey      Adds a private key to a wallet.
  balance     Checks the balance of an address from a node.
  compare     Compares the UTXO set between two wallets.
  create      Creates a wallet.
  maketx      Creates a signed transaction.
  newkey      Creates a random private key.
  refresh     Refreshes UTXO set from node.
  remove      Removes a transaction from a wallet's UTXO set.
  send        Sends a transaction to a node.
  spend       Spends a transaction from a wallet's UTXO set.
  status      Checks the status of a transaction on a node.
  writeutxo   Writes the UTXO set to a file.
```

**callrpc**

```text
Issues an RPC call to a node endpoint for the specified method and params.
    Response is saved to the local varstore.

Usage:
  callrpc [node name] [endpoint] [method] [JSON params] [var scope] [var name]
```

**exit-JP**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**--**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**--**

```text
Tools for interfacing with remote hosts. Using this command we can
  deploy and remove node networks via SSH and a configuration file.

Usage:
  avash network [command] [flags]

Available Commands:
  deploy      Deploys a remote network of nodes.
  remove      Removes a remote network of nodes.
```

**JAX-JAX-JA**

ネットワークをデプロイおよび削除するには、`.yaml` ネットワーク設定ファイルが必要です。例は、[`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml) の Avash コードベースで提供され、次の形式でなければなりません。

```text
# List of hosts
hosts:
  - user: <SSH-username>
    ip: <host-IP>
    # List of nodes
    nodes:
     - name: <node-name>
       # Set of node CLI flags
       flags:
        <CLI-flag>: <value>
        # ...
```

これにより、多くのホストに多くのノードを同時にデプロイすることができます。CLI フラグの完全なリストは[こちら](https://docs.avax.network/build/references/command-line-interface)からご覧いただけます。

**procmanager-JP**

```text
Used to list, stop, and start nodes.

Usage:
  avash procmanager [command] [flags]

Available Commands:
  kill        Kills the process named if currently running.
  killall     Kills all processes if currently running.
  list        Lists the processes currently running.
  metadata    Prints the metadata associated with the node name.
  remove      Removes the process named.
  start       Starts the process named if not currently running.
  startall    Starts all processes if currently stopped.
  stop        Stops the process named if currently running.
  stopall     Stops all processes if currently running.
```

**runscript-JP**

```text
Runs the script provided in the argument, relative to the present working directory.

Usage:
  avash runscript [script file] [flags]
```

**setoupt_JP**

```text
Sets the log level of a specific log output type.

Usage:
  avash setoutput [log output] [log level]
```

**startnode-JP**

```text
Starts an Avalanche client node using procmanager and gives it a name. Example:

startnode MyNode1 --public-ip=127.0.0.1 --staking-port=9651 --http-port=9650 ...

Usage:
  avash startnode [node name] args... [flags]
```

**varstore-JP**

```text
Tools for creating variable stores and printing variables within them.
Using this command we can create variable stores, list all variables they store, and print data placed into these stores.

Usage:
  avash varstore [command] [flags]

Available Commands:
  create      Creates a variable store.
  list        Lists all stores. If store provided, lists all variables in the store.
  print       Prints a variable that is within the store.
  set         Sets a simple variable that within the store.
  storedump   Writes the store to a file.
  vardump     Writes the variable to a file.
```

## スクリプトの書き方<a id="writing-scripts"></a>

Avash は、Lua スクリプトを実行するために [gopher-lua](https://github.com/yuin/gopher-lua) を使用しています。スクリプトは、ユーザーが現在の Avash 環境を呼び出すコードを書くために、hooks を使用できます。

Luaで利用可能な関数は次のとおりです。

* `JavaScript`-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `JavaScript`-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-JavaScript-
* `avash_setvar` - 変数スコープ \(string\)、変数名 \(string\)、変数 \(string\) を取得し、変数ストアに置きます。スコープは既に作成されている必要があります。

Lua スクリプトを書くとき、標準のLua機能はAvashコマンドの連続実行を自動化できます。これにより、開発者は次のように自動化できます。

* ローカルネットワーク展開
* トランザクションの送信
* トランザクションテストケース
* UTXOセットの値とテスト結果をディスクに保存します。
* 2つのノードの値を比較する UTXO セット
* 予想される結果を追跡し、それらを実際のノードと比較します。

Luaスクリプトの例は[、`scripts`](https://github.com/ava-labs/avash/tree/master/scripts)フォルダーにあります。

