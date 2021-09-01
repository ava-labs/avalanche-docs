# Avash

Avashは、Avalancheネットワーク上に展開、テストに使用される一時的なシェル実行環境です。Avashによってローカルで展開されたAvalancheノードは、Avashが終了すると終了します。

Avashは、Avashでシェルコマンドシーケンスを実行できるLuaスクリプトの実行機能を提供します。これにより、タスクの自動化が可能になります。たとえば、各ノードにいくつかの設定が存在するAvalancheノードネットワークを展開するためのLuaスクリプトを作成できます。これにより、テストがより簡単になります。

## インストール<a id="installation"></a>

### 要件<a id="requirements"></a>

* Golang 1.15.5以降
* AvalancheGo

### クイックセットアップ<a id="quick-setup"></a>

Avashをダウンロードし、ビルドするには：

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Avashを実行し、5つのノードステーキングネットワークを起動するには：

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## 構成<a id="configuration"></a>

Avashは、事前に設定された設定ファイルなしで開始することができますが、シェルのグローバル設定の一部を微調整するためのオプションとして利用可能です。Avashは、デフォルトで`$HOME`ディレクトリ`.avash.yaml`で検索しますが、この`--config`フラグを使用して、探すためにカスタム設定ファイルパスを設定することができます。

以下は、Avash設定ファイルのフォーマットです：

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

フィールド引数は、次のように説明します。

* `<filepath>`-ファイルへのフルパス。例：`/home/username/file.txt`
* `<directory>`- ディレクトリへのフルパス。例：`/home/username/folder`
* `<log-level>`- ログされたメッセージをフィルターするための有効なログレベル。以下のいずれかでなければなりません：`{verbo, debug, info, warn, error, fatal, off}`

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

実行して、利用可能なコマンドを確認`help`します。

実行して、そのコマンドで利用可能なオプション一覧を見る`help [command]`ことができます。

例：

```text
help procmanager
help procmanager start
```

### コマンド<a id="commands"></a>

Avashには、以下のルートコマンドが付属しています：

* `avawallet`-ネットワーク上でAvalanche支払いとやり取りするためのツール。
* `callrpc`- RPCのコールがノードに発行されます。
* `exit`- シェルを出力します。
* `help`-ヘルプテキストを表示します。
* `network`- リモートホストとインターフェースするためのツール。
* `procmanager`-Avashプロセスマネージャとやり取りします。
* `runscript`- 提供されたスクリプトを実行します。
* `setoutput`- シェルログ出力を設定します。
* `startnode`-ノードを開始します。
* `varstore`-変数ストアを作成し、それらに変数を印刷するためのツール

タブキーを使用して列挙されたり自動完了が可能で、以下に詳細に説明します。

**avawallet**

**警告**：このウォレットはメモリで保持され、すべてのデータは終了時に消失します。これは、テストに使用する必要があります。

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

**exit**

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

ネットワークの展開と削除には、`.yaml`ネットワーク構成ファイルが必要です。Avashコードベースで例例が提供され[`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml)、以下のフォーマットを持つ必要があります。

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

これにより、多くのホスト上に同時に多くのノードを展開することができます。CLIフラグの完全なリスト[は、ここから](https://docs.avax.network/build/references/command-line-interface)見ることができます。

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

Avashは、[gopher-lua](https://github.com/yuin/gopher-lua)を使用して、Luaスクリプトを実行します。スクリプトを使用できることで、現在のAvash環境を呼び出すコードを書くことができます。

Luaで利用できる機能は次のとおりです：

* `avash_call`-文字列を取り、Avashコマンドとして実行し、出力を返します。
* `avash_sleepmicro`- マイクロ秒を表す符号なしの整数を取り、その長い間スリープします。
* `avash_setvar`-変数スコープ（文字列）、変数名（文字列）、変数（文字列）、変数（文字列）を取り、変数（文字列）を取り、変数ストアに置きましょう。スコープはすでに作成が完了している必要があります。

Luaスクリプトを書く際に、標準的なLua機能が利用可能になり、Avashコマンドの実行を自動化できます。これにより、開発者が自動化できるようになります。

* ローカルネットワーク展開
* トランザクションの送信
* トランザクションテストケース
* UTXOセットとテスト結果を、ディスクに保存します
* UTXOセット
* 予測された結果を追跡し、実際のノードと比較します。

例 Luaスクリプトの[`scripts`フォルダ](https://github.com/ava-labs/avash/tree/master/scripts)内にいます。

