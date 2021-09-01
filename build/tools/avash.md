# Avash

Avash es un entorno de ejecución de concha temporal utilizado para implementar y probar en redes de Avalanche. Los nodos de Avalanche implementados localmente por Avash se salen cuando Avash sale.

Avash proporciona la capacidad de ejecutar scripts de Lua, que pueden ejecutar una secuencia de comandos de shell en Avash. Esto permite la automatización de tareas. Por ejemplo, se podría crear un guión Lua para desplegar una red de nodos Avalanche donde cada nodo tiene una configuración determinada. Esto hace que las pruebas sean más fáciles.

## Instalación<a id="installation"></a>

### Requisitos<a id="requirements"></a>

* Golang 1.15.5 o superior
* avalanchego

### Configuración rápida<a id="quick-setup"></a>

Para descargar y crear Avash:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Para ejecutar Avash y disparar una red de participación de 5 nodos:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Configuración<a id="configuration"></a>

Aunque Avash puede iniciarse sin un archivo de configuración preestablecido, está disponible como una opción para ajustar algunas de las configuraciones globales del shell. Avash buscará `.avash.yaml`en el `$HOME`directorio de forma predeterminada, pero la `--config`bandera puede ser utilizada para establecer un archivo de configuración personalizada para buscar.

A continuación se muestra el formato de un archivo de configuración de Avash:

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Los argumentos de campo se describen a continuación:

* `<filepath>`- Una ruta completa hacia un archivo. Ejemplo:`/home/username/file.txt`
* `<directory>`- Un camino completo hacia un directorio. Ejemplo:`/home/username/folder`
* `<log-level>`- Un nivel de registro válido para filtrar mensajes registrados. Debe ser uno de los siguientes:`{verbo, debug, info, warn, error, fatal, off}`

### Campos<a id="fields"></a>

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

## Usar Avash<a id="using-avash"></a>

### Abrir una concha<a id="opening-a-shell"></a>

Empieza una nueva instancia de Avash con `./avash`.

Ejecuta `help`para ver los comandos disponibles.

Ejecuta `help [command]`para ver la lista de opciones disponibles para ese comando.

Ex:

```text
help procmanager
help procmanager start
```

### Comandos<a id="commands"></a>

Avash viene con los siguientes comandos root:

* `avawallet`- Herramientas para interactuar con los pagos de Avalanche a través de la red.
* `callrpc`- Publica una llamada RPC a un nodo.
* `exit`- Sale la cáscara.
* `help`- Muestra texto
* `network`- Herramientas para interactuar con hosts remotos.
* `procmanager`- Interactúa con el gerente de proceso de Avash.
* `runscript`- Ejecuta el script proporcionado.
* `setoutput`- Establece la salida de registro
* `startnode`- Empieza un nodo.
* `varstore`- Herramientas para crear tiendas variables e imprimir

Éstos pueden enumerarse o completarse automáticamente utilizando la tecla de tabulación y se explican en detalle a continuación.

**avawallet**

****Advertencia: Esta billetera se mantiene en memoria y todos los datos se borran en la salida. Esto solo debería ser utilizado para las pruebas.

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

**salida**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**ayuda**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**red**

```text
Tools for interfacing with remote hosts. Using this command we can
  deploy and remove node networks via SSH and a configuration file.

Usage:
  avash network [command] [flags]

Available Commands:
  deploy      Deploys a remote network of nodes.
  remove      Removes a remote network of nodes.
```

**CONFIGURACIÓN**

Para implementar y eliminar redes, se requiere un archivo de configuración de la `.yaml`red. Un ejemplo se proporciona en la base de código de Avash [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml)y debería tener el siguiente formato:

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

Esto puede ser utilizado para implementar simultáneamente muchos nodos en muchos hosts. Aquí se encuentra [una](https://docs.avax.network/build/references/command-line-interface) lista completa de banderas CL

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

**rss**

```text
Runs the script provided in the argument, relative to the present working directory.

Usage:
  avash runscript [script file] [flags]
```

**setoutput salida**

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

## Escribir scripts<a id="writing-scripts"></a>

Avash utiliza [gopher-lua](https://github.com/yuin/gopher-lua) para ejecutar scripts de Lua. Scripts puede usar ganchos para permitir al usuario escribir código que invoca el entorno de Avash actual.

Las funciones disponibles para Lua son:

* `avash_call`- Toma una cadena y la ejecuta como un comando de Avash, de vuelta de la salida
* `avash_sleepmicro`- Toma un entero no firmado que representa microsegundos y duermes por ese largo tiempo.
* `avash_setvar`- Toma un alcance variable \(string\), un nombre variable \(string\) y una variable \(string\) y la coloca en la tienda variable. El scope ya debe haber sido creado.

Al escribir scripts de Lua, la funcionalidad de Lua estándar está disponible para automatizar la ejecución de la serie de comandos de Avash Esto le permite a un desarrollador automatizar:

* Despliegues de la red local
* Envío de transacciones
* Ordenar casos de prueba de transacciones
* Guardar el valor de los conjuntos UTXO y los resultados de las pruebas en el disco
* Comparar los valores de dos nodos UTXO conjuntos
* Rastrear los resultados esperados y compáralos con los nodos reales

Ejemplo de los scripts de Lua están en la [`scripts`carpeta.](https://github.com/ava-labs/avash/tree/master/scripts)

