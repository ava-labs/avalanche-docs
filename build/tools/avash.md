# Avash

Avash est un environnement d'exécution de shell temporaire utilisé pour déployer et tester sur les réseaux d'Avalanche. Les nœuds d'Avalanche déployés localement par Avash sont sortis lorsque Avash sort.

Avash fournit la possibilité d'exécuter les scripts Lua, qui peut exécuter une séquence de commandes de shell en Avash. Cela permet d'automatiser les tâches. Par exemple, on pourrait créer un script Lua pour déployer un réseau de nœuds Avalanche où chaque nœud a une certaine configuration. Cela facilite les tests.

## Installation<a id="installation"></a>

### Exigences<a id="requirements"></a>

* Golang 1.15.5 ou plus tard
* AvalancheGo

### Configuration rapide<a id="quick-setup"></a>

Pour télécharger et construire Avash :

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Pour exécuter Avash et lancer un réseau de jalonnement de 5 nœuds :

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Configuration<a id="configuration"></a>

Alors que Avash peut être démarré sans fichier de configuration premade il est disponible en option pour tweaking certains des paramètres mondiaux de la shell. Avash recherchera par défaut `.avash.yaml`dans le `$HOME`répertoire, mais le `--config`drapeau peut être utilisé pour configurer un fichier de configuration personnalisée à rechercher.

Ci-dessous est le format d'un fichier de configuration Avash :

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Les arguments sur le terrain sont décrits comme suit :

* `<filepath>`- Un chemin complet vers un fichier. Exemple :`/home/username/file.txt`
* `<directory>`- Un chemin complet vers un répertoire. Exemple :`/home/username/folder`
* `<log-level>`- Un niveau de journal valide pour filtrer les messages enregistrés. Doit être l'un des éléments suivants :`{verbo, debug, info, warn, error, fatal, off}`

### Fields<a id="fields"></a>

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

## Utilisation Using<a id="using-avash"></a>

### Ouvrir une coque<a id="opening-a-shell"></a>

Démarrez une nouvelle instance of avec `./avash`.

Exécuter `help`pour voir les commandes disponibles.

Exécuter `help [command]`pour voir la liste des options disponibles pour cette commande.

Ex:

```text
help procmanager
help procmanager start
```

### Commandes<a id="commands"></a>

Avash est livré avec les commandes root suivantes :

* `avawallet`- Outils pour interagir avec les paiements d'Avalanche sur le réseau.
* `callrpc`- émet un appel à la RPC sur un nœud.
* `exit`- Sort la coquille.
* `help`- Affiche un texte d'aide.
* `network`- Outils pour l'interfaçage avec les hôtes distants.
* `procmanager`- Interagir avec le gestionnaire de processus Avash.
* `runscript`- exécute le script fourni.
* `setoutput`- Définit la sortie du journal de la coque.
* `startnode`- Commence un nœud.
* `varstore`- Outils pour créer des magasins de variables et imprimer des variables en eux.

Ceux-ci peuvent être énumérés ou auto-completed en utilisant la clé de l'onglet et sont expliqués en détail ci-dessous.

**avawallet**

**Attention **: ce portefeuille est tenu en mémoire et toutes les données sont essuyées à la sortie. Cela ne doit être utilisé que pour les tests.

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

**sortie**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**aide**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**réseau**

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

Pour déployer et supprimer les réseaux, un fichier de configuration `.yaml`réseau est requis. [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml)Un exemple est fourni dans la base de code Avash et devrait avoir le format suivant :

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

Cela peut être utilisé pour déployer simultanément de nombreux nœuds sur de nombreux hôtes. Une liste complète des drapeaux CLI peut être trouvée [ici](https://docs.avax.network/build/references/command-line-interface).

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

## Écrire des scripts<a id="writing-scripts"></a>

Avash utilise [gopher-lua](https://github.com/yuin/gopher-lua) pour exécuter les scripts Lua. Les scripts peuvent utiliser des crochets pour permettre à l'utilisateur d'écrire du code qui invoque l'environnement Avash en cours.

Les fonctions disponibles à Lua sont :

* `avash_call`- prend une chaîne et la exécute comme une commande Avash, renvoyant la sortie
* `avash_sleepmicro`- Prend un entier non signé représentant les microsecondes et dort pour ce long
* `avash_setvar`- Prend une portée variable \(une chaîne\), un nom de variable \(une chaîne\) et une variable \(une chaîne\) et la place dans le magasin de variables. La portée doit déjà avoir été créée.

Lors de l'écriture des scripts Lua, la fonctionnalité Lua standard est disponible pour automatiser l'exécution des séries de commandes Avash. Cela permet à un développeur d'automatiser :

* Déploiements de réseaux locaux
* Transactions d'envoi
* Commander des tests de transaction
* Enregistrer la valeur des sets et des résultats de test sur le disque
* Comparer les valeurs de deux jeux UTXO
* Suivez les résultats attendus et les comparez avec les nœuds réels

Exemple les scripts Lua sont dans le [`scripts`dossier.](https://github.com/ava-labs/avash/tree/master/scripts)

