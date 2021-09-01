# Interfaz de la línea de mando

Cuando se ejecuta un nodo, hay una variedad de configuraciones posibles que se admiten.

## Argumentos

### Config File

`--config-file`\(string\):

Config file especifica un archivo JSON para configurar un nodo en lugar de especificar argumentos a través de la línea de comandos. Los argumentos de la línea de comandos anularán cualquier opción establecida en el archivo de configuración.

Ejemplo de archivo de config JSON:

```javascript
{
    "log-level": "debug"
}
```

### APIs

`--api-admin-enabled`\(boolean\):

Si se establece en la `false`aplicación, este nodo no expondrá la API de administración. `false`Defaults Ver [aquí](../avalanchego-apis/admin-api.md) para más información.

`--api-auth-required`\(boolean\):

Si se establece en la `true`configuración, las llamadas de API requieren un token de autorización. `false`Defaults Ver [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-auth-password`\(string\):

La contraseña necesaria para crear/revocar los tokens de autorización. Si `--api-auth-required=true`, debe ser especificado; de otra forma. Ver [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-health-enabled`\(boolean\):

Si se establece en la `true`aplicación, este nodo expondrá la API de Salud. `true`Defaults Ver [aquí](../avalanchego-apis/health-api.md) para más información.

`--index-enabled`\(boolean\):

`false`Si este nodo no permitirá el indexador y la API de índice `false`Defaults Ver [aquí](../avalanchego-apis/index-api.md) para más información.

`--api-info-enabled`\(boolean\):

`true`Si se establece en este nodo expondrá la API de información. `true`Defaults Ver [aquí](../avalanchego-apis/info-api.md) para más información.

`--api-ipcs-enabled`\(boolean\):

Si se establece en la `true`aplicación, este nodo expondrá la API de IPC. `false`Defaults Ver [aquí](../avalanchego-apis/ipc-api.md) para más información.

`--api-keystore-enabled`\(boolean\):

Si se establece en la `false`aplicación, este nodo no expondrá la API de Keystore. `true`Defaults Ver [aquí](../avalanchego-apis/keystore-api.md) para más información.

`--api-metrics-enabled`\(boolean\):

Si se establece en la `false`aplicación, este nodo no expondrá la API de Metrics. `true`Defaults Ver [aquí](../avalanchego-apis/metrics-api.md) para más información.

### Assertions

`--assertions-enabled`\(boolean\):

Cuando se establece en la `true`base, las afirmaciones se ejecutarán en tiempo de ejecución a través de la base de código. Esto está pensado para su uso en la depuración, ya que podemos obtener un mensaje de error más específico. `true`Defaults

### Bootstrapping

`--bootstrap-beacon-connection-timeout`\(duración\):

Tiempo de salida al intentar conectarse a iniciar las beacons de bootstrapping `1m`Defaults

`--bootstrap-ids`\(string\):

Las ID de Bootstrap son una serie de ID de validador. Estas identificaciones se usarán para autenticar a los compañeros de bootstrap. `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`Un ejemplo de configuración de este campo Por defecto está vacío \(no intenta arrancar desde otros nodos.\)

`--bootstrap-ips`\(string\):

Bootstrap IPs es un array de pares de puertos IPv4. Estas direcciones IP se usarán para arrancar el estado actual de Avalanche. `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`Un ejemplo de configuración de este campo Por defecto está vacío \(no intenta arrancar desde otros nodos.\)

`--bootstrap-retry-enabled`\(boolean\):

Si es verdadero, reintentará el bootstrapping si falla.

`--bootstrap-retry-max-attempts`\(uint\):

Máximas veces que reintentará el bootstrapping después de cada falla.

### Database

`--db-dir`\(string, ruta de archivo\):

Especifica el directorio en el que se encuentra la base de datos. `"$HOME/.avalanchego/db"`Defaults

`--db-type`\(string\):

Especifica el tipo de base de datos para usar. `rocksdb`Debe ser uno de `leveldb`, `memdb`. `memdb`es una base de datos de memoria y no persistente.

`leveldb``rocksdb`Tenga en cuenta que al ejecutar con el nodo no puede leer datos que fueron persistidos al ejecutarse con y viceversa.

**Dos notas importantes sobre **RocksDB: Primero, RocksDB no funciona en todas las computadoras. Segundo, RocksDB no se construye por defecto y no está incluido en binarios de publicación pública. Para crear AvalancheGo con RocksDB, ejecutas `export ROCKSDBALLOWED=1`en tu terminal y luego .`scripts/build.sh` `--db-type=rocksdb`Debes hacer esto antes de poder usar

### Génesis

`--genesis`\(string\):

Ruta a un archivo JSON que contiene los datos de génesis para usar. Ignorada al ejecutar redes estándar \(Mainnet, Testnet.\) Si no se daña, utiliza datos de génesis por defecto. Para un ejemplo de una representación de JSON de datos de génesis vea [aquí](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16).

### HTTP Server

`--http-host`\(string\):

La dirección en la que escuchan las APIs HTTP. `127.0.0.1`Defaults Esto significa que por defecto, tu nodo sólo puede manejar llamados a la API hechos desde la misma máquina. `--http-host=`Para permitir las llamadas de API de otras máquinas, usa

`--http-port`\(int\):

Cada nodo ejecuta un servidor HTTP que proporciona las API para interactuar con el nodo y la red de Avalanche. Este argumento especifica el puerto en el que el servidor HTTP escuchará. `9650`El valor por defecto

`--http-tls-cert-file`\(string, ruta de archivo\):

Este argumento especifica la ubicación del certificado TLS utilizado por el nodo para el servidor HTTPS. Esto debe ser especificado cuando `--http-tls-enabled=true`. No hay un valor por defecto.

`--http-tls-enabled`\(boolean\):

Si se establece en la `true`configuración, esta bandera intentará actualizar el servidor para usar HTTPS. `false`Defaults

`--http-tls-key-file`\(string, ruta de archivo\):

Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo para el servidor HTTPS. Esto debe ser especificado cuando `--http-tls-enabled=true`. No hay un valor por defecto.

### IPCS

`--ipcs-chain-ids`\(string\)

Lista separada por comas de identificaciones de cadenas a las que conectarse. No hay un valor por defecto.

`--ipcs-path`\(string\)

El directorio \(Unix\) o el prefijo del nombre de la canalización \(Windows\) para los sockets IPC. Por defecto es /tmp.

### File Descriptor Limit

`--fd-limit`\(int\)

Intenta aumentar el límite del descriptor del archivo de proceso hasta al menos este valor. Defaults`32768`

### Logging

`--log-level``{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\(string\):

El nivel de registro determina qué eventos se registrar. Hay 7 niveles diferentes, en orden de la máxima prioridad a la más baja.

* `Off`: No los registros tienen este nivel de registro.
* `Fatal`: Errores fatal que no son recuperables.
* `Error`: Errores que el nodo encuentra, estos errores fueron capaces de ser recuperados.
* `Warn`: Una advertencia que puede ser indicativa de un nodo byzantine espurio o un error futuro potencial.
* `Info`: descripciones útiles de las actualizaciones de estado de nodo.
* `Debug`: La registro de Debug es útil al intentar entender los errores posibles en el código. Se mostrará más información de la que sería típicamente deseada para un uso normal.
* `Verbo`: rastrea grandes cantidades de información que el nodo está procesando. Esto incluye el contenido de los mensajes y los volcados binarios de datos para el análisis del protocolo de nivel extremadamente bajo.

Cuando se especifica un nivel de registro, hay que tener en cuenta que todos los registros con la prioridad especificada o superior serán rastreados. `Info`Defaults

`--log-display-level``{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\(string\):

El nivel de registro determina qué eventos se muestran en la pantalla. Si se queda en blanco, se predeterminará al valor proporcionado al `--log-level`.

`--log-display-highlight``{auto, plain, colors}`\(string\):

Colorear o resaltar los registros de la pantalla. Resalta por defecto cuando la salida es un terminal. De otra manera, debería ser uno de`{auto, plain, colors}`

`--log-dir`\(string, ruta de archivo\):

Especifica el directorio en el que se guardan los registros del sistema. `"$HOME/.avalanchego/logs"`Defaults

### Network ID

`--network-id`\(string\):

La identidad de la red a la que el nodo debe conectarse. Puede ser una de:

* `--network-id=mainnet`-> Conectarse a la red principal \(por defecto\).
* `--network-id=fuji`-> Conectarse a la red de pruebas de Fuji.
* `--network-id=testnet`-> Conectarse a la red de pruebas actual. \(Actualmente es Fuji.\)
* `--network-id=local`-> Conectarse a una red de pruebas local.
* `--network-id=network-{id}`-> Conectarse a la red con el ID dado. `id`debe estar en el rango .`[0, 2^32)`

### Public IP

`--public-ip`\(string\):

Los validadores deben conocer sus direcciones IP públicas para que puedan hacer saber a otros nodos cómo conectarse a ellos. Si no se proporciona este argumento, el nodo intentará realizar un recorrido NAT para obtener la IP pública del nodo. Debería estar configurado `127.0.0.1`para crear una red local. Si no se establece, intenta aprender la IP usando un recorrido NAT.

`--dynamic-public-ip`\(string\):

`opendns`Valores válidos si Param está presente: `ifconfigco`o .`ifconfigme` Esto sobrepasa `--public-ip`. Si se configura, se encuadrará el servicio remoto cada vez `--dynamic-update-duration`y actualizará la dirección IP pública del nodo.

`--dynamic-update-duration`\(duración\):

El tiempo entre eventos de encuestas para `--dynamic-public-ip`o NAT traversal. El mínimo recomendado es de 1 minuto. `5m`Defaults

### Signature Verification

`--signature-verification-enabled`\(boolean\):

Permite la verificación de la firma. Cuando se establece en la `false`configuración, las firmas no se revisarán en VM que permiten que las firmas sean desactivadas. `true`Defaults

### Staking

`--staking-port`\(string\):

El puerto a través del cual el servidor de stake se conectará a la red de Avalanche externamente. `9651`Defaults

`--staking-enabled`\(boolean\):

Avalanche usa Proof of Stake \(PoS\) como resistencia de Sybil para que sea prohibitivo atacar la red. Si la resistencia de sybil está desactivada y todos los pares serán muestreados durante el consenso. `true`Defaults

`--staking-tls-cert-file`\(string, ruta de archivo\):

Avalanche utiliza conexiones TLS autenticadas de dos vías para conectar nodos de forma segura. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. `$HOME/.avalanchego/staking/staker.crt`De forma predeterminada, el nodo espera que el certificado TLS

`--staking-tls-key-file`\(string, ruta de archivo\):

Avalanche utiliza conexiones TLS autenticadas de dos vías para conectar nodos de forma segura. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. `$HOME/.avalanchego/staking/staker.key`De forma predeterminada, el nodo espera que la clave privada de TLS

`--staking-disabled-weight`\(int\):

El peso que se debe proporcionar a cada compañero cuando el staking está desactivado. `1`Defaults

### Version

`--version`\(boolean\)

Si esto es `true`, imprime la versión y renuncie. `false`Defaults

## Advanced Options

Las siguientes opciones afectan a la corrección de la plataforma. Es posible que sea necesario cambiarlas en toda la red y, por consiguiente, un usuario ordinario no debería cambiarlas de las que están predeterminadas.

### Benchlist

`--benchlist-duration`\(duración\):

Cantidad de tiempo que un pares se cotiza después de superar `--benchlist-fail-threshold`. `1h`Defaults

`--benchlist-fail-threshold`\(int\):

Número de consultas fallidas consecutivas a un nodo antes de ponerlo en el banco \(asumiendo que todas las consultas fallarán\). `10`Defaults

`--benchlist-peer-summary-enabled`\(boolean\):

Permite una métrica de latencia de consulta específica de los pares. `false`Defaults

`--benchlist-min-failing-duration`\(duración\):

La cantidad mínima de tiempo que los mensajes a un par deben fallar antes de que el par sea puesto en el banco. `5m`Defaults

### Directorio de compilación

`--build-dir`\(string\):

Especifica dónde encontrar sub-binaries y binarios de plugin de AvalancheGo. Por defecto es la ruta del binario de AvalancheGo. La estructura de este directorio debe ser la siguiente:

```text
build-dir  
|_avalanchego-latest  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
|_avalanchego-preupgrade  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
```

### Configuraciones de blockchain

Algunas blockchains \(ahora mismo, solo la C-Chain\) permiten al operador de nodo proporcionar una configuración personalizada. AvalancheGo puede leer configuraciones de la blockchain desde archivos y pasarlas a las cadenas correspondientes en la inicialización.

AvalancheGo busca estos archivos en el directorio especificado por `--chain-config-dir`. Este directorio puede tener subdirectorios cuyos nombres son ID de blocket o alias de cadena. Cada sub-directorio contiene la configuración para la cadena especificada en el nombre de directorio. Cada subdirectorio debería contener un archivo llamado `config`, cuyo valor se pasa cuando la cadena correspondiente se inicia la redacción. Por ejemplo, la confit para la C-Chain debería ser en: `[chain-config-dir-goes-here]/C/config.json`.

La extensión que estos archivos deberían tener y el contenido de estos archivos, es dependiente de VM. Por ejemplo, algunas blockchains pueden esperar `config.txt`mientras que otros esperan.`config.json` Si se proporcionan múltiples archivos con el mismo nombre, pero las diferentes extensiones \(por ejemplo, y \) `config.txt`en el mismo subdirectorio, `config.json`AvalancheGo saldrá con un error.

Para una cadena dada, AvalancheGo buscará primero un subdirectorio de config cuyo nombre es el ID de la cadena. Si no se encuentra, busca un subdirectorio de config cuyo nombre es el alias primario de la cadena. Si no se encuentra, busca un subdirectorio de config cuyo nombre es otro alias para la cadena. Todos los nombres de carpeta y archivos son sensibles a la causa.

No es necesario proporcionar estas configuraciones personalizadas. Si no se proporcionan, se utilizará una confección por defecto específica de VM

`--chain-config-dir`\(string\):

Especifica el directorio que contiene configuraciones de cadena, como se describe arriba. `$HOME/.avalanchego/configs/chains`Defaults Si esta bandera no se proporciona y el directorio por defecto no existe, AvalancheGo no saldrá ya que las configuraciones personalizadas son opcionales. Sin embargo, si la bandera está configurada, la carpeta especificada debe existir, o AvalancheGo saldrá con un error.

#### Configuraciones de C-Chain

Para especificar una confusa para la C-Chain, un archivo de configuración JSON debería ser colocado en `{chain-config-dir}/C/config.json`\(u otra ubicación válida, como se especifica arriba.\)

Por ejemplo, si `chain-config-dir`tiene el valor por defecto, entonces se `config.json`puede colocar en , `$HOME/.avalanchego/configs/chains/C/config.json`con estos contenidos:

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

Para más información sobre los configuración de C-Chain mira [aquí](command-line-interface.md#coreth-config).

#### Configuraciones de X-Chain

Para especificar una confusa para la X-Chain, un archivo de configuración JSON debería ser colocado en `{chain-config-dir}/X/config.json`\(u otra ubicación válida, como se especifica arriba.\)

Por ejemplo, si `chain-config-dir`tiene el valor por defecto, entonces se `config.json`puede colocar en , `$HOME/.avalanchego/configs/chains/X/config.json`con estos contenidos:

```javascript
{
  "index-transactions": true,
  "index-allow-incomplete": false
}
```

Para más información sobre los configuración de X-Chain, mira [aquí](command-line-interface.md#avm-config).

### C-Chain / Coreth<a id="coreth-config"></a>

`--coreth-config`\(json\):

\(Este argumento está desviado a favor de usar [configuraciones](command-line-interface.md#chain-configs) de blockchain.\)

Esto te permite especificar una confección que se pasará en la C-Chain. Los valores por defecto para esta config son:

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "rpc-gas-cap": 2500000000,
  "rpc-tx-fee-cap": 100,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": false,
  "debug-api-enabled": false,
  "web3-api-enabled": true,
  "local-txs-enabled": false,
  "pruning-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false
}
```

Los valores por defecto se superan solo si se especifican explícitamente en la configuración.

Los parámetros son los siguientes:

#### API de Coreth

`snowman-api-enabled`\(boolean\):

Permite la API de Snowman Por defecto es false.

`coreth-admin-api-enabled`\(boolean\):

Permite la API de administración. Por defecto es false.

`net-api-enabled`\(boolean\):

Permite la `net_*`API. Por defecto es true.

#### API de Coreth Gas/Price

`rpc-gas-cap`\(int\):

El gas máximo que debe ser consumido por una llamada de RPC \(utilizada en \), medida en nAVAX `eth_estimateGas`\(GWei\). Por defecto a 2500.000.000.000.

`rpc-tx-fee-cap`\(int\):

Cuota de transacción global \(precio \* gaslimit\) \(medida en AVAX\) para variantes de envío send-transction Por defecto a 100.

#### Pruning de la base de datos

`pruning-enabled`\(bool\):

Si es verdadera, la reserva de bases de datos de datos históricos obsoletos estará habilitada. Debería ser desactivado para nodos que necesitan acceso a todos los datos en las raíces históricas. La pointing se hará solo para nuevos datos. Defaults a `false`en v1.4.9 y `true`en versiones posteriores.

#### API de ET

`eth-api-enabled`\(boolean\):

Permite la `eth_*`API. Por defecto es true.

`personal-api-enabled`\(boolean\):

Permite la `personal_*`API. Por defecto es false.

`tx-pool-api-enabled`\(boolean\):

Permite la `txpool_*`API. Por defecto es false.

`debug-api-enabled`\(boolean\):

Permite la `debug_*`API. Por defecto es false.

`web3-api-enabled`\(boolean\):

Permite la `web3_*`API. Por defecto es true.

#### Configuración de ETet

`local-txs-enabled`\(boolean\):

Permite el manejo de transacciones locales. Por defecto es false.

`api-max-duration`\(duración\):

Duración de llamada de la API. Si las llamadas de API superan esta duración, se tardar. Defaults a 0 \(sin máximo\).

`api-max-blocks-per-request`\(int\):

Número máximo de bloques para servir por `getLogs`petición. Por defecto a 0 \(sin máximo\).

`allow-unfinalized-queries`\(boolean\):

Permite las consultas para bloques/transacciones no finalizadas \(no aceptados\) Por defecto es false.

#### Perfil continuo

Puedes configurar tu nodo para ejecutar continuamente perfiles de memoria/CPU y guardar los más recientes. Se habilita si `continuous-profiler-dir`se establece un perfil.

`continuous-profiler-dir`\(string\):

Si no está vacío, el nodo ejecuta continuamente perfiles de memoria/CPU y los pone en este directorio. Por defecto a la cadena vacía \(no habilitada\).

`continuous-profiler-frequency`\(duración\):

Cuán a menudo se crea un nuevo perfil CPU/memoria. `15m`Defaults

`continuous-profiler-max-files`\(int\):

Número máximo de archivos de CPU/memoria para mantener. El valor por defecto es 5.

#### Configuración de Keystore

`keystore-directory`\(string\):

El directorio que contiene claves privadas. Puede ser dado como un camino relativo. Si está vacío, usa un directorio temporal en `coreth-keystore`. Por defecto es una cadena vacía.

`keystore-external-signer`\(string\):

Especifica una URI externa para un firmante de tipo clef. Por defecto a la cadena vacía \(no habilitada\).

`keystore-insecure-unlock-allowed`\(bool\):

Si es cierto, permite a los usuarios desbloquear cuentas en un entorno HTTP inseguro. Por defecto es false.

### Consensus Parameters

`--consensus-gossip-frequency`\(duración\):

Tiempo entre rumores de fronteras aceptadas. `10s`Defaults

`--consensus-shutdown-timeout`\(duración\):

Tiempo de espera antes de eliminar una cadena que no responde. `5s`Defaults

`--creation-tx-fee`\(int\):

Cuota de transacción, en nAVAX, para las transacciones que crean un nuevo estado. `1000000`Por transacción.

`--min-delegator-stake`\(int\):

El stake mínimo, en nAVAX, que puede ser delegado a un validador de la Red Primaria.

Por defecto a `25000000000`\(25 AVAX\) en la red principal. Por defecto a `5000000`\(.005 AVAX\) en la red de prueba.

`--min-delegation-fee`\(int\):

La tarifa de delegación mínima que se puede cobrar por la delegación en la red primaria, multiplicada por `10,000`. Debe estar en el rango `[0, 1000000]`. `20000`Por defecto a \(2 %\) en la red principal.

`--min-stake-duration`\(duración\):

Duración mínima de el stake. La defecto en la red principal es `336h`\(dos semanas.\)

`--min-validator-stake`\(int\):

La participación mínima, en nAVAX, requerida para validar la Red Primaria.

Por defecto a `2000000000000`\(2000 AVAX\) en la red principal. Por defecto a `5000000`\(.005 AVAX\) en la red de prueba.

`--max-stake-duration`\(duración\):

La duración máxima de el stake, en segundos. Por defecto a `8760h`\(365 días\) en la red principal.

`--max-validator-stake`\(int\):s

El Stake máximo, en nAVAX, que se puede colocar en un validador de la red primaria. Por defecto a `3000000000000000`\(3000.000 AVAX\) en la red principal. Esto incluye el stake proporcionado tanto por el validador como por los delegadores del validador.

`--snow-avalanche-batch-size`\(int\):

Las implementaciones de DAG de consenso de Snow definen `b`como el número de transacciones que un vértice debería incluir. El aumento de la producción, `b`teóricamente, de la producción al aumentar la latencia. El nodo esperará como máximo 1 segundo para recoger un lote, y luego emitirá el lote completo de una vez. `1`El valor debe ser al menos `30`Defaults

`--snow-avalanche-num-parents`\(int\):

Las implementaciones de DAG de consenso de Snow definen `p`como el número de padres que un vértex debería incluir. El aumento `p`mejorará la amortización de las preguntas de la red. Sin embargo, al aumentar la conectividad del gráfico, se incrementa la complejidad de los recorridos del gráfico. `2`El valor debe ser al menos `5`Defaults

`--snow-concurrent-repolls`\(int\):

El consenso Snow requiere que se repitan las transacciones que se emiten durante el período de baja utilización de la red. Este parámetro permite definir cuán agresivo será el cliente para finalizar estas transacciones pendientes. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos y al menos `1`y al menos.`--snow-rogue-commit-threshold` `4`Defaults

`--snow-sample-size`\(int\):

El consenso de nieve define como el número de validadores que se `k`muestrean durante cada encuesta de red. Este parámetro permite definir el `k`valor utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. `1`El valor debe ser al menos `20`Defaults

`--snow-quorum-size`\(int\):

El consenso de Snow define `alpha`como el número de validadores que deben preferir una transacción durante cada encuesta de red para aumentar la confianza en la transacción. Este parámetro nos permite definir el `alpha`valor utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. `k/2`El valor debe ser mayor que . `14`Defaults

`--snow-virtuous-commit-threshold`\(int\):

El consenso de nieve define `beta1`como el número de encuestas consecutivas que una transacción virtuosa debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el `beta1`valor utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. `1`El valor debe ser al menos `15`Defaults

`--snow-rogue-commit-threshold`\(int\):

El consenso de nieve define `beta2`como el número de encuestas consecutivas que una transacción roga debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el `beta2`valor utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. `beta1`El valor debe ser al menos `30`Defaults

`--stake-minting-period`\(duración\):

Período de consumo de la función de stake, en horas. La defecto en la red principal es `8760h`\(365 días\).

`--tx-fee`\(int\):

La cantidad de nAVAX que se debe quemar para que una transacción sea válida. Este parámetro requiere un acuerdo de red en su forma actual. Cambiar este valor desde el valor predeterminado solo debería hacerse en redes privadas. Por defecto, a `1000000`nAVAX por transacción.

`--uptime-requirement`\(float\):

Fracción de tiempo que un validador debe estar en línea para recibir las recompensas. `0.6`Defaults

### Health

`--health-check-frequency`\(duración\):

Las revisiones de salud se ejecutan con esta frecuencia. `30s`Defaults

`--health-check-averager-halflife`\(duración\):

Halflife de los promedios utilizados en los controles de salud \(para medir la tasa de fallos de mensajes, por ejemplo.\) Valor más grande --> cálculo menos volátil de los promedios. `10s`Defaults

### Límite de tarifas de mensaje \(Throttling\)

Estas banderas rigen la limitación de tasas de mensajes de entrada y de salida. Para más información sobre la limitación de tarifas y las banderas de abajo, mira el paquete `throttling`en AvalancheGo.

`--throttler-inbound-at-large-alloc-size`\(uint\):

Tamaño, en bytes, de asignación en tamaño en el acelerador de mensaje de entrada. Por defecto a `33554432`\(32 mebibytes\).

`--throttler-inbound-validator-alloc-size`\(uint\):

Tamaño, en bytes, de asignación de validador en el acelerador de mensaje de entrada. Por defecto a `33554432`\(32 mebibytes\).

`--throttler-inbound-node-max-at-large-bytes`\(uint\):

Número máximo de bytes que un nodo puede tomar desde la asignación de gran tamaño del acelerador de mensaje de entrada. Por defecto a `2048`\(2 mebibytes\).

`--throttler-outbound-at-large-alloc-size`\(uint\):

Tamaño, en bytes, de asignación en tamaño en el acelerador de mensaje de salida. Por defecto a `33554432`\(32 mebibytes\).

`--throttler-outbound-validator-alloc-size`\(uint\):

Tamaño, en bytes, de asignación de validador en el acelerador de mensaje de salida. Por defecto a `33554432`\(32 mebibytes\).

`--throttler-outbound-node-max-at-large-bytes`\(uint\):

Número máximo de bytes que un nodo puede tomar desde la asignación de gran tamaño del acelerador de mensaje de salida. Por defecto a `2048`\(2 mebibytes\).

### Red \(Network\)

`--network-compression-enabled`\(bool\) \(v1.4.11\):

Si es cierto, comprimir ciertos mensajes enviados a los pares en la versión >= v1.4.11 para reducir el uso de ancho de banda.

`--network-initial-timeout`\(duración\):

Valor de tiempo de espera inicial del administrador de tiempo de espera adaptable, en nanosegundos. `5s`Defaults

`--network-minimum-timeout`\(duración\):

Valor mínimo de tiempo de espera del gestor de tiempo de espera adaptativo, en nanosegundos. `2s`Defaults

`--network-maximum-timeout`\(duración\):

Valor máximo de tiempo de espera del administrador de tiempo de espera adaptable, en nanosegundos. `10s`Defaults

`--network-timeout-halflife`\(duración\):

Vida media utilizada para calcular el promedio de la latencia en la red. Valor más grande --> menos volátil `5m`Defaults

`--network-timeout-coefficient`\(duración\):

Las peticiones a los pares se tardará después de `network-timeout-coefficient`[] \* [latencia de solicitud promedio]. `2`Defaults

`--network-health-min-conn-peers`\(uint\):

El nodo informará que no está saludable si está conectado a menos de este número de pares. `1`Defaults

`--network-health-max-time-since-msg-received`\(duración\):

Node informará que no ha recibido un mensaje para esta cantidad de tiempo. `1m`Defaults

`--network-health-max-time-since-no-requests`\(duración\):

Node informará que no ha recibido un mensaje para esta cantidad de tiempo. `1m`Defaults

`--network-health-max-portion-send-queue-full`\(float\):

El nodo informará que no está saludable si su cola de envíos está más llena que esta proporción. Debe estar en [0,1]. `0.9`Defaults

`--network-health-max-send-fail-rate`\(float\):

El nodo informará que no está en buen estado si falla más de esta proporción de los envíos de mensajes. Debe estar en [0,1]. `0.25`Defaults

`--inbound-connection-throtting-cooldown`\(duración\)

`--inbound-connection-throttling-max-recent`\(uint\)

Node solo aceptará \(intentará actualizar\) una conexión de entrada desde una IP si no lo ha hecho en la última `inbound-connection-throtting-cooldown`. Node solo permitirá `inbound-connection-throttling-max-recent`desde todas las IPS por`inbound-connection-throttling-max-recent`

### Lista de pares

Nodos se chismes entre los pares para que cada nodo pueda tener una lista de pares actualizada. `--network-peer-list-gossip-size`Un nodo que chismes `--network-peer-list-size`pares a sus pares cada .`--network-peer-list-gossip-frequency`

`--network-peer-list-gossip-frequency`\(duración\):

`1m`Defaults

`--network-peer-list-gossip-size`\(int\):

`50`Defaults

`--network-peer-list-size`\(int\):

`20`Defaults

### Modo Plugin

`--plugin-mode-enabled`\(bool\):

Si es verdad, ejecuta el nodo como un [plugin.](https://github.com/hashicorp/go-plugin) `false`Defaults

### Subnet Whitelist

`--whitelisted-subnets`\(string\):

Lista separada por comas de subnets que este nodo validaría si se añadiera. Por defecto está vacía \(sólo valida la red primaria\).

### Configuraciones de la máquina virtual \(VM\)<a id="vm-configs"></a>

`--vm-aliases-file`\(string\):

Ruta al archivo JSON que define alias para los ID de máquina Virtual. `~/.avalanchego/configs/vms/aliases.json`Defaults Contenido de ejemplo:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

`"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"`El ejemplo anterior alivia la VM cuyo ID es `"timestampvm"`y .`"timerpc"`

### X-Chain / AVM<a id="avm-config"></a>

Esto te permite especificar una confección que se pasará en la X-Chain. Los valores por defecto para esta config son:

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Los valores por defecto se superan solo si se especifican explícitamente en la configuración.

Los parámetros son los siguientes:

#### Indización de transacciones

`index-transactions`\(boolean\):

Permite la indexación de transacciones AVM si se establece en `true`. El valor por defecto es `false`. `true``address``assetID`Cuando se establece en las transacciones de AVM Estos datos están disponibles a través de `avm.getAddressTxs`A[PI.](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api)

Por favor ten en cuenta que si `index-transactions`se establece en verdad, siempre debe ser configurado para cierto para la vida del nodo. Si se establece `false`después de haber sido configurado en la configuración, `true`el nodo se negará a comenzar a menos que también `index-allow-incomplete`se establezca `true`\(véase abajo\).

`index-allow-incomplete`\(boolean\):

Permite índices incompletos. El valor por defecto es `false`.

Este valor de config se ignora si no hay datos de X-Chain indexados en el DB y `index-transactions`se establece en .`false`

