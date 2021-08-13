# Avash

Avash es un entorno de ejecución temporal de shell utilizado para desplegar y probar en redes Avalanche. Los nodos de Avalanche desplegados localmente por Avash se salen cuando Avash sale.

Avash proporciona la capacidad de ejecutar scripts Lua, que puede ejecutar una secuencia de comandos de shell en Avash. Esto permite la automatización de tareas. Por ejemplo, se podría crear un script Lua para implementar una red de nodos Avalanche donde cada nodo tiene alguna configuración dada. Esto facilita las pruebas.

## Instalación de instalaciones<a id="installation"></a>

### Requisitos para requisitos de seguridad<a id="requirements"></a>

* Golang 1.15.5 o más tarde
* Avalanche,

### Configuración rápida<a id="quick-setup"></a>

Para descargar y construir Avash:

```bash
git clone https://github.com/ava-labs/avash.git; cd avash; go build
```

Para ejecutar Avash y disparar una red de 5 nodos:

```bash
./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua:
```

## Configuración<a id="configuration"></a>

Mientras que Avash puede iniciarse sin un archivo de configuración prefabricado, está disponible como una opción para modificar algunos de los ajustes globales de la concha. Avash buscará `.avash.yaml` en el directorio `$HOME` de forma predeterminada, pero la bandera `--config` se puede utilizar para configurar una configuración personalizada filepath para buscar.

A continuación se muestra el formato de un archivo de configuración Avash:

```text
avalancheLocation: <filepath>
datadir: <directory>
log:
  terminal: <log-level>
  logfile: <log-level>
  dir: <directory>
```

Los argumentos sobre el terreno se describen a continuación:

* `<filepath>` - Una ruta completa a un archivo. Ejemplo: `/home/username/file.txt`
* `<directory>` - Una ruta completa a un directorio. Ejemplo: `/home/username/carpeta`
* `<log-level>` - Un nivel de registro válido para filtrar mensajes registrados. Debe ser uno de: `{verbo, debug, info, advertencia, error, fatal, off}`

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

## Uso de Avash<a id="using-avash"></a>

### Abriendo una cáscara<a id="opening-a-shell"></a>

Empieza una nueva instancia de Avash con `./avash`.

Ejecute `ayuda` para ver los comandos disponibles.

Ejecute `ayuda [comando]` para ver la lista de opciones disponibles para ese comando.

Ex:

```text
help procmanager
help procmanager start
```

### Comandos<a id="commands"></a>

Avash viene con los siguientes comandos de raíz:

* `avawallet` - Herramientas para interactuar con Pagos Avalanche a través de la red.
* `callrpc` - Emite una llamada RPC a un nodo.
* `salida` - Sale de la cáscara.
* `ayuda` - Muestra el texto de ayuda.
* `red:` Herramientas para el interconexión con hosts remotos.
* `procmanager` - Interactúa con el gerente de proceso Avash.
* `runscript` - Ejecuta el script provided
* `setoutput` - Configura la salida de registro de shell .
* `startnode` - Comienza un nodo.
* `varstore` - Herramientas para crear tiendas variables e imprimir variables dentro de ellas.

Estos pueden ser enumerados o completados automáticamente utilizando la tecla de pestaña y se explican en detalle a continuación.

**avawallet**

**Advertencia**: Esta cartera se mantiene en memoria y todos los datos se borran en la salida. Esto solo debe utilizarse para las pruebas.

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

**salida de la salida**

```text
Exit the shell, attempting to gracefully stop all processes first.

Usage:
  avash exit
```

**Ayuda a la ayuda**

```text
Help provides help for any command in the application.
Simply type avash help [path to command] for full details.

Usage:
  avash help [command] [flags]
```

**red de red de red**

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

Para implementar y eliminar redes, se requiere un archivo de configuración de red `.yaml`. Un ejemplo se proporciona en la base de código Avash a [`example.network.yaml`](https://github.com/ava-labs/avash/blob/master/example.network.yaml) y debe tener el siguiente formato:

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

Esto se puede utilizar para implementar simultáneamente muchos nodos en muchos anfitriones. Aquí se encuentra una lista completa de banderas [CLI](https://docs.avax.network/build/references/command-line-interface).

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

## Escribir Escrituras<a id="writing-scripts"></a>

Avash usa [gopher-lua](https://github.com/yuin/gopher-lua) para ejecutar guiones de Lua. Scripts puede utilizar ganchos para permitir al usuario escribir código que invoca el entorno Avash actual.

Las funciones de que dispone Lua son:

* `avash_call` - Toma una cadena y la ejecuta como un comando Avash, devolviendo la salida
* `avash_sleepmicro` - Toma un entero sin firmar que representa a los microsegundos y duerme durante tanto tiempo
* `avash_setvar` - Toma un alcance variable \(string\), un nombre variable \(string\), y una variable \(string\) y lo coloca en la tienda variable. El alcance ya debe haber sido creado.

Al escribir scripts Lua, la funcionalidad estándar de Lua está disponible para automatizar la ejecución de series de comandos de Avash. Esto permite a un desarrollador automatizar lo siguiente:

* Despliegues de redes locales
* Transacciones de envío
* Casos de prueba de transacción
* Guarde el valor de los conjuntos UTXO y los resultados de prueba en disco
* Compare los valores de dos nodos conjuntos UTXO
* Rastrear los resultados esperados y compararlos con nodos reales

Ejemplo de scripts Lua están en la [carpeta `de` scripts](https://github.com/ava-labs/avash/tree/master/scripts).

