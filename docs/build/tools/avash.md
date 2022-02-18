# Avash

:::warning

Avash is deprecated and is being replaced with the [Avalanche Network Runner](./network-runner.md)

:::

Avash is a temporary shell execution environment used to deploy and test on Avalanche networks. Avalanche nodes deployed locally by Avash are exited when Avash exits.

Avash provides the ability to run Lua scripts, which can execute a sequence of shell commands in Avash. This allows for automation of tasks. For instance, one could create a Lua script to deploy a network of Avalanche nodes where each node has some given configuration. This makes testing easier.

## Installation {#installation}

### Requirements {#requirements}

* Golang 1.16.8 or later
* AvalancheGo

### Quick Setup {#quick-setup}

To download and build Avash:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

To run Avash and fire up a 5 node staking network:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Configuration {#configuration}

While Avash can be started without a premade configuration file, it’s available as an option for tweaking some of the shell’s global settings. Avash will search for `.avash.yaml` in the `$HOME` directory by default, but the `--config` flag can be used to set a custom configuration filepath to look for.

Below is the format of an Avash configuration file:

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

The field arguments are described as follows:

* `<filepath>` - A full path to a file. Example: `/home/username/file.txt`
* `<directory>` - A full path to a directory. Example: `/home/username/folder`
* `<log-level>` - A valid log level to filter logged messages. Must be one of: `{verbo, debug, info, warn, error, fatal, off}`

### Fields {#fields}

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

## Using Avash {#using-avash}

### Opening a shell {#opening-a-shell}

Start a new instance of Avash with `./avash`.

Run `help` to see the commands available.

Run `help [command]` to see the list of options available for that command.

Ex:

```text
help procmanager
help procmanager start
```

### Commands {#commands}

Avash comes with the following root commands:

* `avawallet` - Tools for interacting with Avalanche Payments over the network.
* `callrpc` - Issues an RPC call to a node.
* `exit` - Exits the shell.
* `help` - Displays help text.
* `network` - Tools for interfacing with remote hosts.
* `procmanager` - Interact with the Avash process manager.
* `runscript` - Runs the provided script.
* `setoutput` - Sets shell log output.
* `startnode` - Starts a node.
* `varstore` - Tools for creating variable stores and printing variables within them.

These can be enumerated or auto-completed using the tab key and are explained in detail below.

**avawallet**

**Warning**: This wallet is held in memory and all data is wiped upon exit. This should only be used for testing.

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

**help**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**network**

```text
Tools for interfacing with remote hosts. Using this command we can
  deploy and remove node networks via SSH and a configuration file.

Usage:
  avash network [command] [flags]

Available Commands:
  deploy      Deploys a remote network of nodes.
  remove      Removes a remote network of nodes.
```

**CONFIGURATION**

To deploy and remove networks, a `.yaml` network configuration file is required. An example is provided in the Avash codebase at [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml) and should have the following format:

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

This can be used to simultaneously deploy many nodes on many hosts. A full list of configuration flags can be found [here](https://docs.avax.network/build/references/avalanchego-config-flags).

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

## Writing Scripts {#writing-scripts}

Avash uses [gopher-lua](https://github.com/yuin/gopher-lua) to run Lua scripts. Scripts can use hooks to allow the user to write code that invokes the current Avash environment.

The functions available to Lua are:

* `avash_call` - Takes a string and runs it as an Avash command, returning output
* `avash_sleepmicro` - Takes an unsigned integer representing microseconds and sleeps for that long
* `avash_setvar` - Takes a variable scope (string), a variable name (string), and a variable (string) and places it in the variable store. The scope must already have been created.

When writing Lua scripts, the standard Lua functionality is available to automate the execution of series of Avash commands. This allows a developer to automate:

* Local network deployments
* Sending transactions
* Order transaction test cases
* Save the value of UTXO sets and test results to disk
* Compare the values of two nodes UTXO sets
* Track expected results and compare them with real nodes

Example Lua scripts are in the [`scripts` folder](https://github.com/ava-labs/avash/tree/master/scripts).

