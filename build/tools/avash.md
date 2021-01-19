# Avash


Avash es un entorno temporal de ejecución de shells con estado que se utiliza para desplegar redes locales y remotas y ejecutar pruebas en ellas. Los nodos de Avalanche desplegados localmente por Avash se cierran al salir de Avash.

Avash proporciona la capacidad de ejecutar scripts Lua que pueden ejecutar una secuencia de comandos de shell en Avash. Esto permite la automatización de las tareas regulares. Por ejemplo, se podría crear un guión Lua para desplegar una red de nodos Avalanche donde cada nodo tiene una configuración determinada. Esto hace que las pruebas sean más fáciles.

## Instalación<a id="installation"></a>

### Requisitos<a id="requirements"></a>

* Golang 1.15.5 o superior
* Un cliente de Avalanche que esté implementando los Avalanche Standard CLI Flags”

### Configuración Rápida <a id="quick-setup"></a>

1. Instalar y crear un cliente de Avalanche.
2. `cd $GOPATH`
3. `go get github.com/ava-labs/avash`
4. `cd src/github.com/ava-labs/avash`
5. `go build`

## Configuración<a id="configuration"></a>

Aunque Avash puede iniciarse sin un archivo de configuración preestablecido, está disponible como una opción para ajustar algunas de las configuraciones globales del shell. Avash buscará `.avash.yaml` en el directorio `$HOME` por defecto, pero la etiqueta `--config` puede usarse para establecer una ruta de archivo de configuración personalizada para buscar.

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

* `<filepath>` - Una ruta completa a un archivo. Ejemplo: `/home/username/file.txt`
* `<directory>` - Una ruta completa a un directorio. Ejemplo:  `/home/username/folder`
* `<log-level>` - Un nivel de registro válido para filtrar los mensajes registrados. Debe ser alguno de: `{verbo, debug, info, warn, error, fatal, off}`

### Campos<a id="fields"></a>

**avalancheLocation**

```text
Ruta de archivo a el binario de Avalanche.

Tipo:
  optional, <filepath>

Default:
  $GOPATH/src/github.com/ava-labs/avalanchego/build/avalanche
```

**datadir**

```text
Directorio para el almacén de datos de Avash.

Tipo:
  optional, <directory>

Default:
  $GOPATH/src/github.com/ava-labs/avash/stash
```

**log.terminal**

```text
Nivel de salida permitido para todos los mensajes registrados en la terminal shell.

Tipo:
  optional, <log-level>

Default:
  info
```

**log.logfile**

```text
Nivel de salida permitido para todos los mensajes registrados en el archivo de registro.

Tipo:
  optional, <log-level>

Default:
  info
```

**log.dir**

```text
Directorio del archivo de registro.

Tipo:
  optional, <directory>

Default:
  <datadir>/logs
```

## Usando Avash <a id="using-avash"></a>

### Abriendo un shell <a id="opening-a-shell"></a>

Inicia una nueva instancia de Avash con `./avash`.

Ejecuta `help` para ver los comandos disponibles.

También podemos ejecutar el [comando] `help ` tpara ver la lista de opciones disponibles para ese comando.

Ejemplo:

```text
help procmanager
help procmanager start
```

### Comandos<a id="commands"></a>

Avash viene con los siguientes comandos root:

* `avawallet` - Herramientas para interactuar con Pagos de Avalanche en la red.
* `callrpc` - Emite una llamada RPC a un nodo.
* `exit` - Cierra la Shell
* `help` - Ayuda sobre cualquier comando.
* `network` Herramientas para interactuar con hosts remotos.
* `procmanager` - Accede al gestor de procesos para el cliente avash.
* `runscript` - Ejecuta el script provisto.
* `setoutput` - Establece la salida del registro del shell.
* `startnode` - Inicia un proceso de nodos y le da un nombre
* `varstore` - Herramientas para crear almacenes de variables e imprimir variables dentro de ellos.

Éstos pueden enumerarse o completarse automáticamente utilizando la tecla de tabulación y se explican en detalle a continuación.

**avawallet**

**Advertencia**: Como todas las cosas en Avash, esta cartera se mantiene temporalmente en la memoria y todos los datos se limpian al salir. Esto debería ser utilizado para las pruebas.

```text
Herramientas para interactuar con Pagos de Avalanche a través de la red. Usando este 
    comando podemos crear, enviar y obtener el estado de una transacción.

Uso:
  avash avawallet [command] [flags]

Comandos Disponibles:
  addkey      Añade una private key a una cartera.
  balance     Comprueba el balance de una dirección de un nodo.
  compare     Compara el set de UTXO entre dos wallets.
  create      Crea una wallet.
  maketx      Crea una transacción firmada.
  newkey      Crea una private key aleatoria.
  refresh     Refresca el conjunto UTXO desde el nodo.
  remove      Elimina una transacción del set de UTXO de una wallet.
  send        Envía una transacción a un nodo.
  spend       Paga una transacción del set de UTXO de una wallet.
  status      Comprueba el estado de una transacción en un nodo.
  writeutxo   Escribe el conjunto UTXO en un archivo.
```

**callrpc**

```text
Emite un llamado RPC a un punto final de nodo para el método y los parámetros especificados.
    La respuesta se guarda en el almacén local.

Uso:
  callrpc [node name] [endpoint] [method] [JSON params] [var scope] [var name]
```

**exit**

```text
Salir de la shell, intentando detener todos los procesos primero.

Uso:
  avash exit
```

**help**

```text
Help proporciona ayuda para cualquier comando de la aplicación.
Simplemente escriba avash help [aquí va el comando] para obtener todos los detalles.

Uso:
  avash help [command] [flags]
```

**network**

```text
Herramientas para interactuar con hosts remotos. Usando este comando podemos
  desplegar y eliminar redes de nodos a través de SSH y un archivo de configuración.

Uso:
  avash network [command] [flags]

Comandos Disponibles:
deploy     Despliega una red remota de nodos.
remove     Remueve una red remota de nodos.
```

**Configuración**

Para desplegar y eliminar las redes, se requiere un archivo de configuración de red `.yaml`. Se proporciona un ejemplo en la base de código de Avash en  `network/example.network.yaml` y debe tener el siguiente formato:

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

Este formato puede ser escalado para desplegar simultáneamente muchos nodos en muchos hosts, usando `-` en la sintaxis YAML para agregar nuevos elementos a la lista de hosts y a la lista de nodos de cada host. Una lista completa de indicadores de CLI puede ser encontrada [aquí](https://docs.avax.network/v1.0/en/references/command-line-interface/), donde`--node-flag` corresponde a  `nodeflag`en nuestro archivo de configuración.

**procmanager**

```text
Accede al administrador de procesos para el cliente avash. Usando esto 
    podemos listar, detener e iniciar procesos registrados con el 
       el administrador de procesos.

Uso:
  avash procmanager [command] [flags]

Comandos Disponibles:
  kill         Mata el proceso nombrado si está actualmente en marcha.
  killall      Mata todos los procesos si se están ejecutando actualmente.
  list         Lista los procesos que se están ejecutando actualmente.
  metadata     Imprime los metadatos asociados al nombre del nodo.
  remove       Elimina el proceso nombrado.
  start        Inicia el proceso nombrado si no está actualmente en ejecución.
  startall     Inicia todos los procesos si están actualmente detenidos.
  stop         Detiene el proceso nombrado si se está ejecutando actualmente.
  stopall      Detiene todos los procesos si se están ejecutando actualmente.
```

**runscript**

```text
Ejecuta el script proporcionado en el argumento, relativo al directorio de trabajo actual.

Uso:
  avash runscript [script file] [flags]
```

**setoutput**

```text
Establece el nivel de registro de un tipo específico de salida de registro.

Uso:
  avash setoutput [log output] [log level]
```

**startnode**

```text
Inicia un nodo de clientes de Avalanche usando procmanager y le da un nombre. Ejemplo:

startnode MyNode1 --public-ip=127.0.0.1 --staking-port=9651 --http-port=9650 ... 

Uso:
  avash startnode [node name] args... [flags]

Flags:
      --assertions-enabled                   Pon en marcha la ejecución de la afirmación. ( Por defecto verdadero)
      --avax-tx-fee uint                     Comisión de la transacción, en nAVAX.
      --bootstrap-ids string                 Lista separada por comas de ID's de pares de bootstrap con los que conectarse. Ejemplo: JR4dVmy6ffUGAKCBDkyCbeZbyHQBeDsET,8CrVPQZ4VSqgL8zTdvL14G8HqAfrBr4z
      --bootstrap-ips string                 Lista separada por comas de nodos bootstrap a los que conectarse. Ejemplo: 127.0.0.1:9630,127.0.0.1:9620
      --client-location string               Ruta al cliente del nodo Avalanche, predeterminando el valor del archivo de configuración.
      --data-dir string                      Nombre del directorio de la reserva de datos.
      --db-dir string                        Directorio de la base de datos del estado de Avalanche. (por defecto "db1")
      --db-enabled                           Enciende el almacenamiento persistente. (Por defecto verdadero)
  -h, --help                                 ayuda para startnode
      --http-port uint                       Puerto del servidor HTTP. (default 9650)
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

**varstore**

```text
Tools for creating variable stores and printing variables within them. Using this 
    command we can create variable stores, list all variables they store, and print data 
    placed into these stores. Variable assignment and update is often managed by avash commands.

Uso:
  avash varstore [command] [flags]

Comandos Disponibles:
  create      Creates a variable store.
  list        Lists all stores. If store provided, lists all variables in the store.
  print       Prints a variable that is within the store.
  set         Sets a simple variable that within the store.
  storedump   Writes the store to a file.
  vardump     Writes the variable to a file.
```

## Writing Scripts <a id="writing-scripts"></a>

Avash imports the [gopher-lua](https://github.com/yuin/gopher-lua) to run Lua scripts. Scripts have hooks available to them which allows the user to write code which invokes the current Avash environment.

The functions available to Lua are:

* `avash_call` - Takes a string and runs it as an Avash command, returning output
* `avash_sleepmicro` - Takes an unsigned integer representing microseconds and sleeps for that long
* `avash_setvar` - Takes a variable scope \(string\), a variable name \(string\), and a variable \(string\) and places it in the variable store. The scope must already have been created.

When writing Lua, the standard Lua functionality is available to automate the execution of series of Avash commands. This allows a developer to automate:

* Local network deployments
* Sending transactions
* Order transaction test cases
* Save the value of UTXO sets and test results to disk
* Compare the values of two nodes UTXO sets
* Track expected results and compare them with real nodes

Example Lua scripts are in the `./scripts` folder.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjEzNTA4MDAxMCwxMDUzNzEyMzk1LC0yOD
E3MTgwOF19
-->