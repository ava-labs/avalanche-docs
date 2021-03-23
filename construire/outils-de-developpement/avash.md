---
description: Avash est un client shell pour interagir avec la plate-forme Avalanche
---

# Avash

Avash est un environnement d'exécution de shell avec état temporaire utilisé pour déployer des réseaux locaux et distants et y exécuter des tests. Les nœuds d'avalanche déployés localement par Avash sont fermés à la sortie d'Avash.

Avash offre la possibilité d'exécuter des scripts Lua qui peuvent exécuter une séquence de commandes shell dans Avash. Cela permet l'automatisation des tâches régulières. Par exemple, on pourrait créer un script Lua pour déployer un réseau de nœuds Avalanche où chaque nœud a une configuration donnée. Cela facilite les tests.

## Installation

### Conditions requises

* Golang 1.13+
* Un client Avalanche mettant en œuvre des indicateurs CLI standard d'Avalanche

### Installation rapide

* Installer et créer un client Avalanche
* `cd $ GOPATH`
* `go get github.com/ava-labs/avash`
* `cd src/github.com/ava-labs/avash`
* `go build`

## Configuration

Bien qu'Avash puisse être démarré sans fichier de configuration prédéfini, il est disponible en tant qu'option pour modifier certains paramètres globaux du shell. Avash recherchera `.avash.yaml` dans le répertoire `$HOME` par défaut, mais l'indicateur `--config` peut être utilisé pour définir un chemin de fichier de configuration personnalisé à rechercher.

Voici le format d'un fichier de configuration Avash :

```cpp
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Les arguments de champ sont décrits comme suit :

* `<filepath>` - Un chemin complet vers un fichier. Exemple : `/home/username/file.txt`
* `<directory>` - Un chemin complet vers un répertoire. Exemple :`/home/username/folder`
* `<log-level>` - Un niveau de journal valide pour filtrer les messages journalisés. Doit être l'un des suivants:`{verbo, debug, info, warn, error, fatal, off}`

### Fields

#### **avalancheLocation**

```cpp
File path to Avalanche binary.

Type:
  optional, <filepath>

Default:
  $GOPATH/src/github.com/ava-labs/avalanchego/build/avalanche
```

#### **datadir**

```cpp
Directory for Avash data store.

Type:
  optional, <directory>

Default:
  $GOPATH/src/github.com/ava-labs/avash/stash
```

#### **log.terminal**

```cpp
Allowed output level for all messages logged to the shell terminal.

Type:
  optional, <log-level>

Default:
  info
```

#### **log.logfile**

```text
Allowed output level for all messages logged to the log file.

Type:
  optional, <log-level>

Default:
  info
```

#### **log.dir**

```cpp
Directory for log file.

Type:
  optional, <directory>

Default:
  <datadir>/logs
```

## Utilisation d'Avash

### Ouvrir une shell

Démarrez une nouvelle instance d'Avash avec `./avash`.

Exécutez`help` pour voir les commandes disponibles.

Nous pouvons également lancer `help [command]` pour voir la liste des options disponibles pour cette commande.

Exemple :

```cpp
help procmanager
help procmanager start
```

### Commandes

Avash est livré avec les commandes root suivantes :

* `avawallet` - Outils pour interagir avec Avalanche Payments sur le réseau.
* `callrpc` - Emet un appel RPC à un nœud.
* `exit` - Sortez du shell.
* `help` - Aide sur n'importe quelle commande.
* `network` - Outils d'interfaçage avec des hôtes distants.
* `procmanager` - Accédez au gestionnaire de processus pour le client avash.
* `runscript` - Exécute le script fourni.
* `setoutput` - Définit la sortie du journal du shell.
* `startnode` - Démarre un processus de nœud et lui donne un nom.
* `varstore` - Outils pour créer des magasins de variables et imprimer des variables à l'intérieur.

Celles-ci peuvent être énumérées ou complétées automatiquement à l'aide de la touche de tabulation et sont expliquées en détail ci-dessous.

#### **avawallet**

{% hint style="danger" %}
**Attention !** Comme toutes les choses dans Avash, ce portefeuille est temporairement conservé en mémoire et toutes les données sont nettoyées à la sortie. Cela devrait être utilisé pour les tests.
{% endhint %}

```cpp
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

#### **callrpc**

```cpp
Issues an RPC call to a node endpoint for the specified method and params.
    Response is saved to the local varstore.

Usage:
  callrpc [node name] [endpoint] [method] [JSON params] [var scope] [var name]
```

#### **exit**

```cpp
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

#### **help**

```cpp
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

#### **network**

```cpp
Tools for interfacing with remote hosts. Using this command we can
  deploy and remove node networks via SSH and a configuration file.

Usage:
  avash network [command] [flags]

Available Commands:
  deploy      Deploys a remote network of nodes.
  remove      Removes a remote network of nodes.
```

**CONFIGURATION**

Pour déployer et supprimer des réseaux, un fichier de configuration réseau `.yaml` est requis. Un exemple est fourni dans la base de code Avash à `network/example.network.yaml`et doit avoir le format suivant:

```cpp
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

Ce format peut être mis à l'échelle pour déployer simultanément de nombreux nœuds sur de nombreux hôtes, en utilisant `-` dans la syntaxe YAML pour ajouter de nouveaux éléments à la liste d'hôtes et à la liste de nœuds de chaque hôte. Une liste complète des indicateurs CLI peut être trouvée ici, où `--node-flag`correspond à`nodeflag`dans notre fichier de configuration.

#### **procmanager**

```cpp
Access the process manager for the avash client. Using this 
    command we can list, stop, and start processes registered with the 
    process manager.

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

#### **runscript**

```cpp
Runs the script provided in the argument, relative to the present working directory.

Usage:
  avash runscript [script file] [flags]
```

#### **setoutput**

```cpp
Sets the log level of a specific log output type.

Usage:
  avash setoutput [log output] [log level]
```

#### **startnode**

```cpp
Starts an Avalanche client node using procmanager and gives it a name. Example:

startnode MyNode1 --public-ip=127.0.0.1 --staking-port=9651 --http-port=9650 ... 

Usage:
  avash startnode [node name] args... [flags]

Flags:
      --assertions-enabled                   Turn on assertion execution. (default true)
      --avax-tx-fee uint                     Transaction fee, in nAVAX.
      --bootstrap-ids string                 Comma separated list of bootstrap peer ids to connect to. Example: JR4dVmy6ffUGAKCBDkyCbeZbyHQBeDsET,8CrVPQZ4VSqgL8zTdvL14G8HqAfrBr4z
      --bootstrap-ips string                 Comma separated list of bootstrap nodes to connect to. Example: 127.0.0.1:9630,127.0.0.1:9620
      --client-location string               Path to Avalanche node client, defaulting to the config file's value.
      --data-dir string                      Name of directory for the data stash.
      --db-dir string                        Database directory for Avalanche state. (default "db1")
      --db-enabled                           Turn on persistent storage. (default true)
  -h, --help                                 help for startnode
      --http-port uint                       Port of the HTTP server. (default 9650)
      --http-tls-cert-file string            TLS certificate file for the HTTPS server.
      --http-tls-enabled                     Upgrade the HTTP server to HTTPS.
      --http-tls-key-file string             TLS private key file for the HTTPS server.
      --log-dir string                       Name of directory for the node's logging. (default "logs")
      --log-level string                     Specify the log level. Should be one of {all, debug, info, warn, error, fatal, off} (default "all")
      --meta string                          Override default metadata for the node process.
      --network-id string                    Network ID this node will connect to. (default "12345")
      --public-ip string                     Public IP of this node. (default "127.0.0.1")
      --signature-verification-enabled       Turn on signature verification. (default true)
      --snow-avalanche-batch-size int        Number of operations to batch in each new vertex. (default 30)
      --snow-avalanche-num-parents int       Number of vertexes for reference from each new vertex. (default 5)
      --snow-quorum-size int                 Alpha value to use for required number positive results. (default 2)
      --snow-rogue-commit-threshold int      Beta value to use for rogue transactions. (default 10)
      --snow-sample-size int                 Number of nodes to query for each network poll. (default 2)
      --snow-virtuous-commit-threshold int   Beta value to use for virtuous transactions. (default 5)
      --staking-port uint                    Port of the consensus server. (default 9651)
      --staking-tls-cert-file string         TLS certificate file for staking connections. Relative to the avash binary if doesn't start with '/'. Ex: certs/keys1/staker.crt
      --p2p-tls-enabled                      Require TLS authentication for all P2P connections.
      --staking-enabled                  Utilize staking (also requires p2p tls to be enabled).
      --staking-tls-key-file string          TLS private key file for staking connections. Relative to the avash binary if doesn't start with '/'. Ex: certs/keys1/staker.key
      --xput-server-port uint                Port of the deprecated throughput test server. (default 9652)
```

#### **varstore**

```cpp
Tools for creating variable stores and printing variables within them. Using this 
    command we can create variable stores, list all variables they store, and print data 
    placed into these stores. Variable assignment and update is often managed by avash commands.

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

## Écriture de scripts

Avash importe le [gopher-lua](https://github.com/yuin/gopher-lua) pour exécuter les scripts Lua. Les scripts ont des hooks à leur disposition qui permettent à l'utilisateur d'écrire du code qui appelle l'environnement Avash actuel.

Les fonctions disponibles pour Lua sont :

* `avash_call` - Prend une chaîne et l'exécute en tant que commande Avash, renvoyant la sortie
* `avash_sleepmicro` - Prend un entier non signé représentant les microsecondes et dort pendant cette période
* `avash_setvar` - Prend une portée de variable \(string\), un nom de variable \(string\) et une variable \(string\) et la place dans le magasin de variables. L'étendue doit déjà avoir été créée.

Lors de l'écriture de Lua, la fonctionnalité standard de Lua est disponible pour automatiser l'exécution de séries de commandes Avash. Cela permet à un développeur d'automatiser :

* Déploiements de réseau local
* Envoi de transactions
* Commander des cas de test de transaction
* Enregistrer la valeur des ensembles UTXO et des résultats de test sur le disque
* Comparez les valeurs de deux ensembles UTXO de nœuds
* Suivre les résultats attendus et comparez-les avec de vrais nœuds

Des exemples de scripts Lua se trouvent dans le dossier `./scripts`.

