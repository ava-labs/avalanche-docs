# Avance

Avash est un environnement temporaire d'exécution de shell utilisé pour déployer et tester sur les réseaux Avalanche. Les nœuds avalanches déployés localement par Avash sont sortis lorsque les issues Avash

Avash fournit la capacité d'exécuter les scripts Lua, qui peuvent exécuter une séquence de commandes shell dans Avash. Cela permet l'automatisation des tâches. Par exemple, on pourrait créer un script Lua pour déployer un réseau de nœuds Avalanche où chaque nœud a une certaine configuration donnée. Cela facilite les tests.

## Installation<a id="installation"></a>

### Exigences minimales<a id="requirements"></a>

* Golang 1.15.5 ou plus tard
* AvalancheGo

### Configuration rapide<a id="quick-setup"></a>

Télécharger et construire Avash:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Pour exécuter Avash et incendier un réseau de mise en ligne de 5 noeuds:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Configuration<a id="configuration"></a>

Alors que Avash peut être démarré sans un fichier de configuration préfabriqué, il est disponible comme une option pour la tweaking certains des paramètres globaux de la shell. Avash recherchera `.avash.yaml` dans le répertoire `$HOME` par défaut, mais le drapeau `--config` peut être utilisé pour définir un fichier de configuration personnalisé à chercher.

Ci-dessous est le format d'un fichier de configuration Avash :

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Les arguments de terrain sont décrits comme suit:

* `<filepath>` - Un chemin complet vers un fichier. Exemple: `/home/username/file.txt`
* `<directory>` - Un chemin complet vers un répertoire. Exemple: `/home/nom` d'utilisateur/dossier
* `<log-level>` - Un niveau de log valide pour filtrer les messages enregistrés. Doit être l'un des: `{verbo, debug, info, avertissement, erreur, fatal, off}`

### Champs<a id="fields"></a>

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

### Ouverture de la coque<a id="opening-a-shell"></a>

Démarrez une nouvelle instance of avec `./avash`.

Exécutez `l'aide` pour voir les commandes disponibles.

Exécuter `l'aide [commande]` pour voir la liste des options disponibles pour cette commande.

Ex :

```text
help procmanager
help procmanager start
```

### Commandes<a id="commands"></a>

Avash est livré avec les commandes root suivantes:

* `avawallet` - Outils pour interagir avec les paiements avalanches sur le réseau.
* `callrpc` - émet un appel RPC à un nœud.
* `sortie` - Sort la coquille.
* `aide` - Affiche le texte d'aide.
* `réseau` - Outils d'interface avec les hôtes distants.
* `procmanager` - Interagir avec le gestionnaire de processus Avash.
* `runscript` - exécute le script fourni.
* `setoutput` - Définit la sortie du journal de la shell.
* `startnode` - Commence un nœud.
* `varstore` - Outils pour la création de variables stockées et d'impression à leur sein.

Ceux-ci peuvent être énumérés ou auto-completed à l'aide de la clé de l'onglet et sont expliqués en détail ci-dessous.

**avawallet**

**Attention**: ce portefeuille est tenu en mémoire et toutes les données sont essuyées à la sortie. Ceci ne devrait être utilisé que pour les tests.

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

**sortie sortie**

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

Pour déployer et supprimer les réseaux, un fichier de configuration réseau `.yaml` est nécessaire. Un exemple est fourni dans la base de code Avash à [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml) et devrait avoir le format suivant:

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

## Ecriture des Scripts<a id="writing-scripts"></a>

Avash utilise [gopher-lua](https://github.com/yuin/gopher-lua) pour exécuter les scripts Lua. Les scripts peuvent utiliser des crochets pour permettre à l'utilisateur d'écrire le code qui invoque l'environnement Avash actuel.

Les fonctions disponibles à Lua sont:

* `avash_call` - Prend une chaîne et la exécute comme une commande Avash, retournant la sortie
* `avash_sleepmicro` - Prend un entier non signé représentant les microsecondes et dormons pour cette longue
* `avash_setvar` - Prend une étendue variable \(string\), un nom variable \(string\), et une variable \(string\) et la place dans le magasin variable. La portée doit déjà avoir été créée.

Lors de l'écriture des scripts Lua, la fonctionnalité Lua standard est disponible pour automatiser l'exécution des séries de commandes Avash. Cela permet à un développeur d'automatiser :

* Déploiements de réseaux locaux
* Opérations d'envoi
* Commander des tests de transaction
* Sauvegardez la valeur des ensembles UTXO et résultats de test sur le disque
* Comparer les valeurs des deux ensembles UTXO
* Suivre les résultats attendus et les comparer avec les nœuds réels

Exemple Les scripts Lua sont dans le [dossier `scripts`](https://github.com/ava-labs/avash/tree/master/scripts).

