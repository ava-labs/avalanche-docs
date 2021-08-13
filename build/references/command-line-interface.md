# Interfaz de línea de comandos

Puede especificar la configuración de un nodo con los argumentos a continuación.

## Argumentos

### Config File

-`--config-file` \(string\):

Camino a un archivo JSON que especifica la configuración de este nodo. Los argumentos de línea de comandos anularán los argumentos establecidos en el archivo de config.

Ejemplo archivo de config JSON:

```javascript
{
    "log-level": "debug"
}
```

### API

`--api-admin-enabled` \(boolean\):

Si se establece en `falso`, este nodo no expondrá la API de administración. Deficiencias a `falso`. Vea [aquí](../avalanchego-apis/admin-api.md) para más información.

`--api-auth-required` \(boolean\):

Si se establece en `verdad`, las llamadas API requieren una token de autorización. Deficiencias a `falso`. Vea [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-auth-password` \(string\):

La contraseña necesaria para crear/revocar fichas de autorización. Si `--api-auth-required=true`, debe especificarse; de lo contrario, ignorarse. Vea [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-health-enabled` \(boolean\):

Si se pone en `realidad`, este nodo expondrá la API de salud. Deficiencias a `la verdad`. Vea [aquí](../avalanchego-apis/health-api.md) para más información.

`---indexed` \(boolean\):

Si es `falso`, este nodo no permitirá el indexador y la API de índice no estará disponible. Deficiencias a `falso`. Vea [aquí](../avalanchego-apis/index-api.md) para más información.

`--api-info-enabled` \(boolean\):

Si se establece en `verdad`, este nodo expondrá la API de información. Deficiencias a `la verdad`. Vea [aquí](../avalanchego-apis/info-api.md) para más información.

`--api-ipcs-enabled` \(boolean\):

Si se establece en `verdad`, este nodo expondrá la API de IPC. Deficiencias a `falso`. Vea [aquí](../avalanchego-apis/ipc-api.md) para más información.

`--api-keystore-enabled` \(boolean\):

Si se establece en `falso`, este nodo no expondrá la API de Keystore. Deficiencias a `la verdad`. Vea [aquí](../avalanchego-apis/keystore-api.md) para más información.

`--api-metrics-enabled` activadas \(boolean\):

Si se establece en `falso`, este nodo no expondrá la API de Metrics. Deficiencias a `la verdad`. Vea [aquí](../avalanchego-apis/metrics-api.md) para más información.

### Afirmaciones

`--assertions-enabled` \(boolean\):

Cuando se establece en `verdad`, las afirmaciones se ejecutarán en tiempo de ejecución a través de la base de código. Esto está destinado a ser utilizado en la depuración, ya que podemos obtener un mensaje de error más específico. Deficiencias a `la verdad`.

### Botas de arranque

`--bootstrap-beacon-connection-timeout` \(duración\):

Tiempo de espera cuando se trata de conectar con balizas de arranque Deficiencias a `1m`.

-`--bootstrap-ids` \(string\):

Las ID de arranque es una variedad de ID de validador. Estas ID se utilizarán para autenticar a los pares de arranque de estreno. Un ejemplo de este campo sería -`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. El valor predeterminado depende del ID de red.

-`--bootstrap-ips` \(string\):

Las IPs de arranque es una variedad de pares IPv4:port. Estas direcciones IP se utilizarán para iniciar el estado actual de Avalanche. Un ejemplo de este campo sería -`--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. El valor predeterminado depende del ID de red.

`--bootstrap-retry-enabled` \(boolean\):

Si es cierto, reintentará el arranque si falla.

`--bootstrap-retry-max-attempts` \(uint\):

Número máximo de veces para reintentar el arranque después de un fracaso.

### Base de datos

`--db-dir` \(string, archivo path\):

Especifica el directorio al que se persiste la base de datos. Defaults to `"$HOME/.avalanchego/db"`.

`--db-type` \(string\):

Especifica el tipo de base de datos que se utilizará. Debe ser uno de `leveldb`, `rocksdb`, `memdb`. `memdb` es una base de datos in-memory no persistida.

Tenga en cuenta que cuando se ejecuta con `leveldb`, el nodo no puede leer los datos que se persistieron al correr con `leveldb`, y viceversa.

**Dos notas importantes sobre RocksDB**: Primero, RocksDB no funciona en todos los ordenadores. Segundo, RocksDB no está construido por defecto y no está incluido en los binarios publicados públicamente. Para construir AvalancheGo con RocksDB, ejecute `la exportación ROCKSDBALLOWED=1` en su terminal y luego `scripts/build.sh`. Debe hacer esto antes de que pueda usar `--db-type=rocksdb`.

### Genial.

`--génesis` \(string\):

Camino a un archivo JSON que contiene los datos de génesis que se utilizan. Ignorado cuando se ejecuta redes estándar \(Mainnet, Testnet. \) Si no se da, utiliza datos de génesis predeterminados. Para un ejemplo de una representación JSON de datos de génesis, consulte [aquí](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16).

### Servidor HTTP

-`--http-host` \(string\):

La dirección que escuchan las API HTTP. Defaults a `127.0.0.1`. Esto significa que de forma predeterminada, su nodo solo puede manejar llamadas API hechas de la misma máquina. Para permitir llamadas de API de otras máquinas, utilice `--http-host=`.

-`--http-port` \(int\):

Cada nodo ejecuta un servidor HTTP que proporciona las API para interactuar con el nodo y la red Avalanche. Este argumento especifica el puerto que el servidor HTTP escuchará. El valor predeterminado es `9650`.

-`--http-tls-cert-file` \(string, file path\):

Este argumento especifica la ubicación del certificado TLS utilizado por el nodo para el servidor HTTPS. Esto debe especificarse cuando `--http-tls-enabled=true`. No hay valor predeterminado.

`--http-tls-enabled` \(boolean\):

Si se establece en `true`, esta bandera intentará actualizar el servidor para usar HTTPS. Deficiencias a `falso`.

-`--http-tls-key-file` \(string, file path\):

Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo para el servidor HTTPS. Esto debe especificarse cuando `--http-tls-enabled=true`. No hay valor predeterminado.

### IPCS

`--ipcs-chain-ids` \(string\)

Lista separada de Coma de los sids de cadena a conectar. No hay valor predeterminado.

`--ipcs-path` \(string\)

El directorio \(Unix\) o prefijo de tubería llamado \(Windows\) para los calcetines IPC. Defaults to /tmp.

### Límite de Descriptor de Archivos

`--fd-limit` \(int\)

Intentos de elevar el límite de descriptor de archivos de proceso a al menos este valor. Deficiencias en `32768`

### Registro

-`--log-level` `\(string, {Off, Fatal, Error, Advertencia, Info, Debug, Verbo}\):`

El nivel de registro determina qué eventos se registrarán. Hay 7 niveles diferentes, con el fin de que la máxima prioridad a la más baja.

* `Off`: No hay troncos tienen este nivel de logging.
* `Fatal`: Errores fatal que no son recuperables.
* `Error`: Errores que el nodo encuentra, estos errores fueron capaces de ser recuperados.
* `Advertencia`: Una advertencia que podría ser indicativa de un nodo byzantine espurio, o un error potencial futuro.
* `Info`: Descripciones útiles de las actualizaciones de estado de los nodos.
* `Debug`: El registro de depuración es útil cuando se intenta entender posibles errores en el código. Se mostrará más información que normalmente se desearía para el uso normal.
* `Verbo`: Rastrea grandes cantidades de información que el nodo está procesando. Esto incluye contenidos de mensajes y vertederos binarios de datos para análisis de protocolo de nivel extremadamente bajo.

Al especificar una nota de nivel de registro que todos los registros con la prioridad especificada o superior serán rastreados. Defaults to `Info`.

`--log-display-level` `\(string, {Off, Fatal, Error, Advertencia, Info, Debug, Verbo}\):`

El nivel de registro determina qué eventos se muestran en la pantalla. Si se deja en blanco, se predeterminará el valor proporcionado a `--log-level`.

`--log-display-highlight` `\(string, {auto, llano, colores}\):`

Si desea color/resaltar registros de pantalla. Se destaca por defecto cuando la salida es una terminal. De lo contrario, debería ser uno de `{auto, llano, colors}`

`--log-dir` \(string, archivo path\):

Especifica el directorio en el que se conservan los registros del sistema. Defaults to `"$HOME/.avalanchego/logs"`.

### ID de red

-`--network-id` \(string\):

La identidad de la red con la que el nodo debe conectarse. Puede ser uno de:

* `--network-id=mainnet` -> Conectar a Main net \(default\).
* `--network-id=fuji` -> Conecte a la red de pruebas Fuji.
* `--network-id=testnet` -> Conecte a la red de --network-id=testnet \(Ahora mismo, este es Fuji. \)
* `--network-id=local` -> Conectarse a una red de pruebas local.
* `--network-id=network-{id}` -> Conectarse a la red con el ID dado. `id` debe estar en el rango `[0, 2^32)`.

### IP pública

-`--public-ip` \(string\):

Los validadores deben conocer sus direcciones IP orientadas al público para que puedan hacer que otros nodos sepan cómo conectarse a ellos. Si no se proporciona este argumento, el nodo intentará realizar la inversión NAT para obtener el IP público del nodo. Debe fijarse en `127.0.0.1` para crear una red local. Si no se ha establecido, intenta aprender IP utilizando NAT traversal.

-`--dynamic-public-ip` \(string\):

Valores válidos si el param está presente: `opendns`, `ifconfigco` o `ifconfigme`. Esto se `anula... public-ip`. Si se establece, se hará una encuesta sobre el servicio remoto cada `--dynamic-update-duration` y actualizará la dirección IP pública del nodo.

-`--dynamic-update-duration` \(duración\):

El tiempo entre eventos de encuestas para -`--dynamic-public-ip` o NAT traversal. El mínimo recomendado es de 1 minuto. Defaults a `5m`.

### Verificación de la firma

`--signature-verification-enabled` activado \(boolean\):

Permite la verificación de la firma. Cuando se establece en `falso`, las firmas no se verificarán en VMs que permiten que las firmas se deshabiliten. Deficiencias a `la verdad`.

### Toma

`--staking-port` \(string\):

El puerto a través del cual el servidor de grapado se conectará a la red Avalanche externamente. Defaults to `9651`.

`---staking activado` \(boolean\):

Avalanche utiliza Prueba de Stake \(PoS\) como resistencia Sybil para hacer prohibitivamente caro atacar la red. Si la resistencia falsa, se deshabilita la resistencia a los sybil y todos los pares serán muestreados durante el consenso. Deficiencias a `la verdad`.

`--staking-tls-cert-file` \(string, archivo path\):

Avalanche utiliza conexiones TLS autenticadas en dos vías para conectar nodos de forma segura. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. De forma predeterminada, el nodo espera que el certificado TLS esté en `$HOME/.avalanchego/staking/staker.crt`.

-`--staking-tls-key-file` \(string, archivo path\):

Avalanche utiliza conexiones TLS autenticadas en dos vías para conectar nodos de forma segura. Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo. De forma predeterminada, el nodo espera que la clave privada TLS esté en `$HOME/.avalanchego/staking/staker.key`.

`--staking-disabled-weight` \(int\):

Peso para proporcionar a cada par cuando se deshabilita el grapado. Deficiencias a `1`.

### Versión para imprimir

-`--version` \(boolean\)

Si esto es `cierto`, imprime la versión y renuncie. Deficiencias a `falso`.

## Opciones avanzadas

Las siguientes opciones pueden afectar la corrección de un nodo. Solo los usuarios de energía deben cambiar estos.

### Lista de referencia

`--benchlist-duration` duración \(duración\):

Cantidad de tiempo que un pare se cotiza después de superar `--benchlist-fail-threshold`. Deficiencias a la `1h`.

`--benchlist-fail-threshold` \(int\):

Número de consultas fallidas consecutivas a un nodo antes de benching \(asumiendo que todas las consultas a él fallarán\). Deficiencias a `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Permite realizar métricas de latencia específicas de consulta entre pares. Deficiencias a `falso`.

`--benchlist-min-failing-duration` \(duración\):

La cantidad mínima de mensajes de tiempo a un par debe estar fallando antes de que el pares sea benched. Defaults a `5m`.

### Build Directory

`--build-dir` \(string\):

Especifica dónde encontrar sub-binaries y binarios de plugin AvalancheGo. Default al camino de AvalancheGo binario. La estructura de este directorio debe ser la siguiente:

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

### Configuraciones de cadena

Algunas cadenas \(ahora mismo, solo el C-Chain\) permiten al operador de nodo proporcionar una configuración personalizada. AvalancheGo puede leer configuraciones de cadena de archivos y pasarlas a las cadenas correspondientes de inicialización.

AvalancheGo busca estos archivos en el directorio especificado por `--chain-config-dir`. Este directorio puede tener subdirectorios cuyos nombres son ID de cadena o alias de cadena. Cada subdirectorio contiene la configuración de la cadena especificada en el nombre del directorio. Cada subdirectorio debe contener un archivo llamado `config`, cuyo valor se pasa cuando se inicia la cadena correspondiente. Por ejemplo, la configuración de la cadena C-Chain estar en: `C-Chain`

La extensión que deben tener estos archivos y el contenido de estos archivos, es VM-dependent. Por ejemplo, algunas cadenas pueden esperar `config.txt` mientras que otros esperan `config.json`. Si se proporcionan varios archivos con el mismo nombre, pero diferentes extensiones \(por ejemplo, `config.json` y `config.txt`\) en el mismo subdirectorio, AvalancheGo salirá con un error.

Para una cadena determinada, AvalancheGo buscará primero un subdirectorio de config cuyo nombre es el ID de cadena. Si no se encuentra, busca un subdirectorio config cuyo nombre es el alias primario de la cadena. Si no se encuentra, busca un subdirectorio de config cuyo nombre es otro alias de la cadena. Todos los nombres de carpetas y archivos son sensibles a las mayúsculas.

No se requiere proporcionar estas configuraciones personalizadas. Si no se proporcionan, se utilizará un config predeterminado específico para VM.

-`--chain-config-dir` \(string\):

Especifica el directorio que contiene conglomerados de cadena, como se describe anteriormente. Defaults to `$HOME/.avalanchego/configs/chains`. Si no se proporciona esta bandera y no existe el directorio predeterminado, AvalancheGo no saldrá ya que los configs personalizados son opcionales. Sin embargo, si la bandera está configurada, la carpeta especificada debe existir, o AvalancheGo saldrá con un error.

#### Configuraciones de cadena C

Actualmente, la cadena C es la única cadena que admite configuraciones personalizadas. Para especificar un config para la cadena C-Chain, se debe colocar un archivo de config JSON en `C-Chain,` \(u otra ubicación válida, como se especifica anteriormente. \)

Por ejemplo, si `chain-config-dir` tiene el valor predeterminado, entonces `config.json``` se puede colocar en value, con estos contenidos:

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

Para obtener más información sobre los configs C-Chain consulte [aquí](command-line-interface.md#coreth-config).

### C-Chain / Coreth<a id="coreth-config"></a>

-`--coreth-config` \(json\):

\(Este argumento se deprecia a favor de utilizar [Configuraciones de cadena](command-line-interface.md#chain-configs). \)

Esto le permite especificar un config que se va a pasar a la cadena C. Los valores predeterminados de esta config son:

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

Los valores predeterminados se anulan solo si se especifica explícitamente en la configuración.

Los parámetros son los siguientes:


#### Las API de Coreth

`snowman-api-enabled` \(boolean\):

Permite la API de Snowman. Deficiencias a falso.

`coreth-admin-api-enabled` \(boolean\):

Permite la API de administración. Deficiencias a falso.

`net-api-enabled` \(boolean\):

Permite la API `net_*`. Deficiencias a la verdad.

#### Coreth API Gas/Price Caps

`rpc-gas-cap` \(int\):

El gas máximo que debe ser consumido por una llamada RPC \(utilizada en `eth_estimateGas`\), medido en nAVAX \(GWei\). Deficiencias a 2.500.000.000.

`rpc-tx-fee-cap` \(int\):

Cuota de transacción global \(precio \* gaslimit\) \(medida en AVAX\) para variantes de trascendimiento. Deficiencias a 100.

#### Poda de base de datos

`pruning-enabled`\(bool\):

Si es cierto, se habilitará la poda de bases de datos de datos históricos obsoletos. Debe estar deshabilitado para los nodos que necesitan acceso a todos los datos en las raíces históricas. La poda se hará solo para nuevos datos. Defaults to `false` en v1.4.9, y `verdad` en versiones posteriores.

#### Eth API

`eth-api-enabled` \(boolean\):

Permite la API `eth_*`. Deficiencias a la verdad.

`personal-api-enabled` \(boolean\):

Permite la API `personal_*`. Deficiencias a falso.

`tx-pool-api-enabled` \(boolean\):

Permite la API de `txpool_*`. Deficiencias a falso.

`debug-api-enabled` \(boolean\):

Permite la API de `debug_*`. Deficiencias a falso.

`web3-api-activado` \(boolean\):

Permite la API `web3_*`. Deficiencias a la verdad.

#### Ajustes de Et

`local-txs-enabled` activado \(boolean\):

Permite el manejo de transacciones locales. Deficiencias a falso.

`api-max-duration` \(duración\):

Duración máxima de la llamada de API. Si las llamadas de API superan esta duración, se tardará en salir. Defaults a 0 \(sin máximo\).

`api-max-blocks-per-request` \(int\):

Número máximo de bloques para servir por petición de `getLogs`. Defaults a 0 \(sin máximo\).

`b) consultas no finalizadas` \(boolean\):

Permite consultas para bloques / transacciones no finalizados \(no aceptados\). Deficiencias a falso.

#### Perfil continuo

Puede configurar su nodo para ejecutar continuamente perfiles de memoria/CPU y guardar los más recientes. El perfilado continuo de memoria/CPU está activado si se establece `continuous-profiler-dir`

`continuous-profiler-dir` \(string\):

Si no está vacío, el nodo ejecuta continuamente perfiles de memoria/CPU y los coloca en este directorio. Defaults a la cadena vacía \(no habilitada\).

`frecuencia continua` de perfilador \(duración\):

Cuán a menudo se crea un nuevo perfil de CPU/memoria. Defaults a `15m`.

`continuous-profiler-max-files` \(int\):

Número máximo de archivos de perfiles de memoria CPU/memoria que se deben guardar. Deficiencias a 5.

#### Configuración de teclado

`keystore-directory` \(string\):

El directorio que contiene teclas privadas. Puede ser dado como un camino relativo. Si está vacío, utiliza un directorio temporal en `coreth-keystore`. Default to vatio string.

`keystore-external-signer` \(string\):

Especifica una URI externa para un firmante de tipo cle. Defaults a la cadena vacía \(no habilitada\).

`keystore-insecure-unlock-allowed` permitido \(bool\):

Si es cierto, permite a los usuarios desbloquear cuentas en un entorno HTTP inseguro. Deficiencias a falso.

### Parámetros de Consenso

`--consensus-gossip-frequency` \(duración\):

Tiempo entre chismes las fronteras aceptadas. Deficiencias a `10`.

`--`

Tiempo antes de matar una cadena insensible. Deficiencias a `5`.

-`--creation-tx-fee` \(int\):

Tasa de transacción, en nAVAX, para transacciones que crean un nuevo estado. Defaults a `1000` nAVAX \(.001 AVAX\) por transacción.

`--min-delegator-stake` \(int\):

La apuesta mínima, en nAVAX, que puede delegarse en un validador de la Red Primaria.

Defaults to `25000` \(25 AVAX\) en Main Net. Defaults to `5000` \(.005 AVAX\) en Test Net.

`--min-delegation-fee` \(int\):

La cuota mínima de delegación que se puede cobrar para la delegación en la Red Primaria, multiplicada por `10.000` . Debe estar en el rango `[0, 100]`. Defaults to `20000` \(2%\) en Main Net.

`--min-stake-duration` \(duración\):

Duración mínima de la staking El predeterminado en Main Net es de `336h` \(dos semanas). \)

`--min-validator-stake` \(int\):

La participación mínima, en nAVAX, requiere para validar la Red Primaria.

Defaults to `2000` \(2.000 AVAX\) en Main Net. Defaults to `5000` \(.005 AVAX\) en Test Net.

`--max-stake-duration` \(duración\):

La duración máxima de la grapada, en horas. Defaults a `8760h` \(365 días\) en Main Net.

`--max-validator-stake` \(int\):s

La apuesta máxima, en nAVAX, que puede colocarse en un validador en la red primaria. Defaults to `3000` \(3.000.000 AVAX\) en Main Net. Esto incluye la participación proporcionada por el validador y por los delegados al validador.

`--snow-avalanche-batch-size` \(int\):

Las implementaciones de DAG de consenso de Snow definen `b` como el número de transacciones que un vértice debe incluir. El aumento de `b` aumentará, teóricamente, el rendimiento mientras aumenta la latencia. El nodo esperará a lo largo de 1 segundo para recoger un lote, y luego emitirá todo el lote a la vez. El valor debe ser al menos `1`. Defaults a `30`.

`--snow-avalanche-num-parents` \(int\):

Las implementaciones DAG de consenso de Snow definen `p` como el número de padres que un vértice debe incluir. El aumento de `p` mejorará la amortización de las consultas de red. Sin embargo, al aumentar la conectividad del gráfico, se aumenta la complejidad de los traversals del grafo. El valor debe ser al menos `2`. Defaults a `5`.

`--snow-concurrent-repolls coincidentes de` --snow-concurrent-repolls

El consenso de nieve requiere operaciones de votación que se expiden durante el tiempo bajo de uso de la red. Este parámetro permite definir lo agresivo que será el cliente para finalizar estas transacciones pendientes. Esto sólo debe cambiarse después de examinar cuidadosamente los cambios del consenso de la nieve. El valor debe ser al menos `1` y, como `máximo, --` Deficiencias a `4`.

`--snow-sample-size` \(int\):

El consenso de nieve define `k` como el número de validadores que se muestrean durante cada encuesta de red. Este parámetro permite definir el valor `k` utilizado para el consenso. Esto sólo debe cambiarse después de examinar cuidadosamente los cambios del consenso de la nieve. El valor debe ser al menos `1`. Defaults a `20`.

-`--snow-quorum-size` \(int\):

El consenso de nieve define `alfa` como el número de validadores que deben preferir una transacción durante cada encuesta de red para aumentar la confianza en la transacción. Este parámetro nos permite definir el valor `alfa` utilizado para el consenso. Esto sólo debe cambiarse después de examinar cuidadosamente los cambios del consenso de la nieve. El valor debe ser superior a `k/2`. Deficiencias a `14`.

`--snow-virtuous-commit-threshold`

El consenso de nieve define el `beta1` como el número de encuestas consecutivas que una transacción virtuosa debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el valor `beta1` utilizado para el consenso. Esto sólo debe cambiarse después de examinar cuidadosamente los cambios del consenso de la nieve. El valor debe ser al menos `1`. Defaults a `15`.

`--snow-rogue-commit-threshold`

El consenso de nieve define el `beta2` como el número de encuestas consecutivas que una transacción desleal debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el valor `beta2` utilizado para el consenso. Esto sólo debe cambiarse después de examinar cuidadosamente los cambios del consenso de la nieve. El valor debe ser al menos `beta1`. Deficiencias a `30`.

`--stake-minting-period` \(duración\):

Período de consumo de la función de grapado, en horas. El predeterminado en Main Net es de `8760h` \(365 días\).

`--tx-fee` \(int\):

La cantidad necesaria de nAVAX para que una transacción sea válida. Este parámetro requiere un acuerdo de red en su forma actual. Cambiar este valor desde el defecto solo debe hacerse en redes privadas. Defaults a `1000` nAVAX por transacción.

---requisito de tiempo de `--uptime-requirement`

Fracción del tiempo un validador debe estar en línea para recibir recompensas. Deficiencias a `0.6`.

### Salud y Salud

`--health-check-frequency` \(duración\):

El cheque de salud corre con esta freqency. Deficiencias a `los 30`.

`--health-check-averager-halflife` \(duración\):

La mitad de la vida útil de los promedios utilizados en los cheques de salud \(para medir la tasa de fallos de mensajes, por ejemplo. \) Valor más grande --> cálculo menos volátil de promedios. Deficiencias a `10`.

### Mensaje de límite de velocidad \(Throttling\)

Estas banderas rigen la limitación de la velocidad de los mensajes entrantes y salientes. Para obtener más información sobre la limitación de la velocidad y las banderas a continuación, consulte `el acelerador` de paquetes en AvalancheGo.

`--throttler-inbound-at-large-alloc-size --throttler-inbound-at-large-alloc-size` \(uint\):

Tamaño, en bytes, de la asignación en gran escala en el acelerador de mensajes entrantes. Defaults a `33554432` \(32 mebibytes\).

`--throttler-inbound-validator-alloc-size` \(uint\):

Tamaño, en bytes, de asignación de validación en el acelerador de mensajes entrantes. Defaults a `33554432` \(32 mebibytes\).

`--throttler-inbound-node-max-at-large-bytes` \(uint\):

Número máximo de bytes un nodo puede tomar de la asignación a gran escala del acelerador de mensajes entrantes. Defaults to `2048` \(2 mebibytes\).

`--throttler-outbound-at-large-alloc-size` \(uint\):

Tamaño, en bytes, de la asignación en gran escala en el acelerador de mensajes saliente. Defaults a `33554432` \(32 mebibytes\).

`--throttler-outbound-validator-alloc-size` \(uint\):

Tamaño, en bytes, de asignación de validación en el acelerador de mensajes saliente. Defaults a `33554432` \(32 mebibytes\).

`--throttler-outbound-node-max-at-large-bytes` \(uint\):

Número máximo de bytes un nodo puede tomar de la asignación en gran escala del acelerador de mensajes salientes. Defaults to `2048` \(2 mebibytes\).

### Red de red de redes de redes

`--network-compression-enabled` \(bool\) \(v1.4.11\):

Si es cierto, comprimir ciertos mensajes enviados a los pares en la versión >= v1.4.11 para reducir el uso del ancho de banda.

`--network-initial-timeout` \(duración\):

Valor inicial del gestor de tiempo adaptativo, en nanosegundos. Deficiencias a `5`.

`--network-minimum-timeout` \(duración\):

Valor mínimo de tiempo del gestor de tiempo adaptativo, en nanosegundos. Deficiencias a `2s`.

-`--network-maximum-timeout` \(duración\):

Valor máximo del gestor de tiempo de espera adaptativo, en nanosegundos. Deficiencias a `10`.

`--network-timeout-halflife` \(duración\):

Medio tiempo utilizado al calcular la latencia media de la red. Valor más grande --> Cálculo de latencia de red menos volátil. Defaults a `5m`.

`--network-timeout-coefficient` \(duración\):

Las solicitudes a los pares se retirarán después de \[`network-timeout-coefficient`\] \* \[media de la latencia de la solicitud\]. Defaults a `2`.

-`--network-health-min-conn-peers` \(uint\):

Nodo informará de mal salud si está conectado a menos de lo que muchos pares. Deficiencias a `1`.

`--network-health-max-time-since-msg-received` \(duración\):

Node informará de malsano si no ha recibido un mensaje para esta cantidad de tiempo. Deficiencias a `1m`.

`--network-health-max-time-since-no-requests` \(duración\):

Node informará de malsano si no ha recibido un mensaje para esta cantidad de tiempo. Deficiencias a `1m`.

`--network-health-max-portion-send-queue-full` \(float\):

Nodo informará poco sano si su cola de envío es más que esta porción completa. Debe estar en \[0,1\]. Deficiencias a `0.9`.

-`--network-health-max-send-fail-rate` \(float\):

Nodo informará de mal salud si más de esta porción de mensaje envía fallos. Debe estar en \[0,1\]. Deficiencias a `0.25`.

`--inbound-connection-throtting-cooldown` \(duración\)

`--inbound-connection-throttling-max-recent` \(uint\)

Node solo aceptará \(intento de actualizar\) una conexión de entrada desde una IP si no lo ha hecho en el último cooldown de conexión `inbound-connection-throtting-cooldown`. Nodo solo permitirá `el acceso inbound-connection-throttling-max-recent` de todos los IPS por `conexión` inbound-connection-throttling-max-recent

### Listado de pares chismes

Los nodos se chismean entre sí para que cada nodo pueda tener una lista de pares actualizada. Un `cotilleo` `de` nodo `--network-peer-list-size pares` a --network-peer-list-size de sus pares cada --network-peer-list-size

`--network-peer-list-gossip-frequency` \(duración\):

Deficiencias a `1m`.

`--network-peer-list-gossip-size` \(int\):

Deficiencias a `50`.

-`--network-peer-list-size` \(int\):

Deficiencias a `20`.

### Modo de enchufado

`--plugin-mode-enabled` \(bool\):

Si es cierto, ejecuta el nodo como un [plugin.](https://github.com/hashicorp/go-plugin) Deficiencias a `falso`.

### Subred Whitelist

--subnets `--whitelisted-subnets` \(string\):

Lista separada de subredes a las que este nodo validaría si se añade. Defaults to vacío \(solo validará la Red Primaria\).

### Máquina Virtual \(VM\) Configuraciones<a id="vm-configs"></a>

`--vm-aliases-file` \(string\):

Camino al archivo JSON que define alias para los ID de máquina virtual. Defaults to `~/.avalanchego/configs/vms/aliases.json`. Contenido de ejemplo:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

El ejemplo anterior alquila el VM cuyo ID es `"tGas3T58KzdjLHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"` a `"timestampvm"` y `"timerpc"`.

