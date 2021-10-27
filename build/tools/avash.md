# Avash

Avashは、Avalancheネットワーク上でデプロイし、テストするために使用する一時的なシェル実行環境です。AvashでローカルにデプロイされたAvalancheノードは、Avashが終了したときに終了します。

Avashは、Avashで一連のシェルコマンドを実行するLuaスクリプトを実行する機能を提供します。これにより、タスクを自動化することができます。例えば、Luaスクリプトを作成して、各ノードがいくつかの設定を持っているAvalancheノードのネットワークをデプロイすることができます。これにより、テストが簡単になります。

## インストール<a id="installation"></a>

### 要件<a id="requirements"></a>

* Golang 1.15.5以降
* AvalancheGo

### 迅速なセットアップ<a id="quick-setup"></a>

Avashをダウンロードし、ビルドするには:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Avashを実行し、5ノードステーキングネットワークを起動するには：

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## 構成<a id="configuration"></a>

Avashは、あらかじめ設定ファイルなしで起動することができ、シェルのグローバル設定の一部を微調整するためのオプションとして使用できます。Avashは、デフォルトで、`$HOME`ディレクトリで`.avash.yaml`を検索します。ただし、検索するカスタム構成ファイルパスを設定するために、`--config`フラグを使用することができます。

次は、Avash構成ファイルのフォーマットです。

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

フィールド引数は、次のように記述されます。

* `<filepath>`-ファイルへのフルパス。例：`/home/username/file.txt`
* `<directory>`-ディレクトリへのフルパス。例：`/home/username/folder`
* `<log-level>`-ログメッセージをフィルターするための有効なログレベル。次のいずれかでなければなりません。`{verbo, debug, info, warn, error, fatal, off}`

### フィールド<a id="fields"></a>

**avalancheLocation**

```text
Path to AvalancheGo binary.

Type:
  optional, <filepath>

Default:
  $GOPATH/src/github.com/ava-labs/avalanchego/build/avalanchego
```

**datadir**

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

**log.dir**

```text
Path to put log directory at.

Type:
  optional, <directory>

Default:
  <datadir>/logs
```

## Avashを使用する<a id="using-avash"></a>

### シェルを開く<a id="opening-a-shell"></a>

Avashの新しいインスタンスを開始します`./avash`。

`help`を実行して、利用可能なコマンドを確認します。

`help [command]`を実行して、そのコマンドで利用可能なオプションのリストを確認します。

例：

```text
help procmanager
help procmanager start
```

### コマンド<a id="commands"></a>

Avashには、次のルートコマンドが付属しています。

* `avawallet`-ネットワーク上でAvalanche決済とやり取りするためのツール。
* `callrpc`-ノードへのRPC呼び出しを発行します。
* `exit`-シェルを終了します。
* `help`-ヘルプテキストを表示します。
* `network`-リモートホストを備えたインターフェースのためのツール。
* `procmanager`-Avashプロセスマネジャーとやり取りします。
* `runscript`-提供されたスクリプトを実行します。
* `setoutput`-シェルログ出力を設定します。
* `startnode`-ノードを開始します。
* `varstore`-変数ストアを作成し、それらの中に変数を印刷するためのツール。

これらは、タブキーを使用して列挙または自動完了することができます。次で詳細に説明します。

**avawallet**

**警告**：このウォレットは、メモリで保持され、すべてのデータは終了時に消失します。これは、テストのみに使用する必要があります。

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

**終了**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**ヘルプ**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**ネットワーク**

```text
Tools for interfacing with remote hosts. Using this command we can
  deploy and remove node networks via SSH and a configuration file.

Usage:
  avash network [command] [flags]

Available Commands:
  deploy      Deploys a remote network of nodes.
  remove      Removes a remote network of nodes.
```

**構成**

ネットワークをデプロイ、削除するには、ネットワー`.yaml`ク構成ファイルが必要です。例は、Avashコードベースで提供され[`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml)、次のフォーマットである必要があります。

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

これにより、多くのホスト上で、多くのノードを同時にデプロイすることができます。CLIフラグの完全なリストは、[こちら](https://docs.avax.network/build/references/command-line-interface)をご覧ください。

**procmanager**

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

**runscript**

```text
Runs the script provided in the argument, relative to the present working directory.

Usage:
  avash runscript [script file] [flags]
```

**setoutput**

```text
Sets the log level of a specific log output type.

Usage:
  avash setoutput [log output] [log level]
```

**startnode**

```text
Starts an Avalanche client node using procmanager and gives it a name. Example:

startnode MyNode1 --public-ip=127.0.0.1 --staking-port=9651 --http-port=9650 ...

Usage:
  avash startnode [node name] args... [flags]
```

**varstore**

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

## スクリプトを書く<a id="writing-scripts"></a>

Avashは、[gopher-lua](https://github.com/yuin/gopher-lua)を使用してLuaスクリプトを実行します。スクリプトは、フックを使用して、ユーザーが現在のAvash環境を呼び出すコードを書けるようにします。

Luaで利用可能な機能は、次の通りです。

* `avash_call`-文字列を取得、Avashコマンドとして実行し、出力を返す
* `avash_sleepmicro`- マイクロ秒を表す署名なし整数を取得し、その間スリープ状態になる
* `avash_setvar`-変数スコープ（文字列）、変数名（文字列）、変数（文字列）を取得し、変数ストアに配置します。スコープは、既に作成済みでなければなりません。

Luaスクリプトを書く場合、標準的なLua機能では、Avashコマンドの一連の実行を自動化することができます。これにより、開発者は、次を自動化することができます。

* ローカルネットワークのデプロイメント
* トランザクションの送信
* トランザクションのテストケースをオーダーする
* UTXOセット値とテスト結果をディスクに保存する
* 2つのノードUTXOセットの値を比較する
* 予想結果を追跡し、実際のノードと比較する

例 のLuaスクリプトは[`scripts`、フォルダ](https://github.com/ava-labs/avash/tree/master/scripts)内にあります。

