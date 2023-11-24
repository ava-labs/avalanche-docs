---
tags: [Nodos]
description: Referencia de todas las opciones de configuración y banderas disponibles para la cadena.
sidebar_label: Configuraciones de la Cadena
pagination_label: Configuraciones de la Cadena
sidebar_position: 1
---

# Configuraciones de la Cadena

Algunas cadenas permiten que el operador del nodo proporcione una configuración personalizada.
AvalancheGo puede leer las configuraciones de la cadena desde archivos y pasarlas a las
cadenas correspondientes durante la inicialización.

AvalancheGo busca estos archivos en el directorio especificado por
la bandera `--chain-config-dir` de AvalancheGo, como se documenta
[aquí](/nodes/configure/avalanchego-config-flags.md#--chain-config-dir-string). Si se omite, el valor
por defecto es `$HOME/.avalanchego/configs/chains`. Este directorio puede tener
subdirectorios cuyos nombres son ID de cadena o alias de cadena. Cada subdirectorio
contiene la configuración de la cadena especificada en el nombre del directorio. Cada
subdirectorio debe contener un archivo llamado `config`, cuyo valor se pasa
cuando se inicializa la cadena correspondiente (ver más abajo para la extensión). Por
ejemplo, la configuración para la C-Chain debería estar en:
`{chain-config-dir}/C/config.json`.

Esto también se aplica a las Subnets, por ejemplo, si el ID de cadena de una Subnet es
`2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, la configuración para esta cadena
debería estar en
`{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`

:::tip

Por defecto, ninguno de estos directorios y/o archivos existe. Deberá
crearlos manualmente si es necesario.

:::

La extensión de archivo que estos archivos deben tener, y el contenido de estos
archivos, depende de la VM. Por ejemplo, algunas cadenas pueden esperar `config.txt` mientras
que otras esperan `config.json`. Si se proporcionan varios archivos con el mismo nombre
pero con extensiones diferentes (por ejemplo, `config.json` y `config.txt`) en el mismo
subdirectorio, AvalancheGo saldrá con un error.

Para una cadena dada, AvalancheGo seguirá la siguiente secuencia para buscar su
archivo de configuración, donde todos los nombres de carpetas y archivos distinguen entre mayúsculas y minúsculas:

- Primero busca un subdirectorio de configuración cuyo nombre sea el ID de la cadena - Si no
  se encuentra, busca un subdirectorio de configuración cuyo nombre sea el alias principal de la cadena - Si no se encuentra,
  busca un subdirectorio de configuración cuyo nombre sea otro alias para la cadena

Alternativamente, para algunas configuraciones puede ser más conveniente proporcionar la configuración
completamente a través de la línea de comandos. Para eso, puede usar la bandera `--chain-config-content` de AvalancheGo, como se documenta
[aquí](/nodes/configure/avalanchego-config-flags.md#--chain-config-content-string).

No es necesario proporcionar estas configuraciones personalizadas. Si no se proporcionan, se utilizará una configuración predeterminada específica de la VM. Y los valores de estas
configuraciones predeterminadas se imprimen cuando el nodo se inicia.

## Configuraciones de la C-Chain

Para especificar una configuración para la C-Chain, se debe colocar un archivo de configuración JSON en
`{chain-config-dir}/C/config.json`. Este archivo no existe por
defecto.

Por ejemplo, si `chain-config-dir` tiene el valor predeterminado que es
`$HOME/.avalanchego/configs/chains`, entonces `config.json` debería colocarse en
`$HOME/.avalanchego/configs/chains/C/config.json`.

La configuración de la C-Chain se imprime en el registro cuando un nodo se inicia. Los valores predeterminados
para cada bandera de configuración se especifican a continuación.

Los valores predeterminados se anulan solo si se especifican en el archivo de configuración dado. Es
recomendable proporcionar solo valores que sean diferentes de los predeterminados, ya que eso
hace que la configuración sea más resistente a futuros cambios predeterminados. De lo contrario, si
los valores predeterminados cambian, su nodo permanecerá con los valores antiguos, lo que podría
afectar negativamente el funcionamiento de su nodo.

### Sincronización de Estado

#### `state-sync-enabled` (booleano)

Establece en `true` para iniciar la cadena con la sincronización de estado habilitada. El par
descargará el estado de la cadena de los pares hasta un bloque reciente cerca de la punta, luego procederá con
el arranque normal.

Por defecto, realiza la sincronización de estado si se inicia un nuevo nodo desde cero. Sin embargo, si
se ejecuta con una base de datos existente, por defecto será falso y no realizará la sincronización de estado
en ejecuciones posteriores.

Tenga en cuenta que si necesita datos históricos, la sincronización de estado no es la opción correcta.
Sin embargo, es suficiente si solo está ejecutando un validador.

#### `state-sync-skip-resume` (booleano)

Si se establece en `true`, la cadena no reanudará una operación de sincronización de estado
que no se completó previamente. Normalmente, la cadena debería poder reanudar
la sincronización de estado sin ningún problema. Por defecto, es `false`.

#### `state-sync-min-blocks` (entero)

Número mínimo de bloques por delante de la cadena que el nodo local debe preferir
la sincronización de estado sobre el arranque. Si la base de datos del nodo ya está cerca de la
punta de la cadena, el arranque es más eficiente. Por defecto, es `300000`.

#### `state-sync-ids` (cadena)

Lista separada por comas de ID de nodo (precedidos de `NodeID-`) para recuperar la sincronización de estado
datos de. Un ejemplo de configuración de este campo sería
`--state-sync-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`.
Si no se especifica (o está vacío), se seleccionan pares al azar. Por defecto es una cadena vacía (`""`).

#### `state-sync-server-trie-cache` (entero)

Tamaño de la caché de trie utilizada para proporcionar datos de sincronización de estado a los pares en MB. Debe ser
un múltiplo de `64`. Por defecto, es `64`.

### Perfilado Continuo

#### `continuous-profiler-dir` (cadena)

Habilita el perfilador continuo (captura un perfil de CPU/Memoria/Bloqueo a un
intervalo especificado). Por defecto es `""`. Si se proporciona una cadena no vacía, se
habilita el perfilador continuo y especifica el directorio para colocar los
perfiles.

#### `continuous-profiler-frequency` (duración)

Especifica la frecuencia con la que se ejecuta el perfilador continuo. Por defecto `900000000000`
nanosegundos, que son 15 minutos.

#### `continuous-profiler-max-files` (entero)

Especifica el número máximo de perfiles a mantener antes de eliminar los más antiguos.
Por defecto, es `5`.

### Habilitando APIs Específicas de Avalanche

#### `snowman-api-enabled` (booleano)

Habilita la API de Snowman. Por defecto es `false`.

#### `coreth-admin-api-enabled` (booleano)

Obsoleto a partir de `v0.12.5`. Use `admin-api-enabled` en su lugar.

Habilita la API de Admin. Por defecto es `false`.

#### `coreth-admin-api-dir` (cadena)

Obsoleto a partir de `v0.12.5`. Use `admin-api-dir` en su lugar.

Especifica el directorio que la API de Admin utiliza para almacenar perfiles de CPU/Memoria/Bloqueo.
Por defecto es `""`.

### Habilitando APIs de EVM

#### `eth-apis` ([]cadena)

Use el campo `eth-apis` para especificar el conjunto exacto de servicios a habilitar en
su nodo. Si este campo no está configurado, entonces la lista predeterminada será:
`["eth","eth-filter","net","web3","internal-eth","internal-blockchain","internal-transaction"]`.

:::note

Los nombres utilizados en esta bandera de configuración se han actualizado en Coreth `v0.8.14`.
Los nombres anteriores que contienen `public-` y `private-` están obsoletos. Si bien
la versión actual continúa aceptando valores obsoletos, es posible que no se admitan
en futuras actualizaciones y se recomienda actualizar a los nuevos valores.

La asignación de valores obsoletos y su equivalente actualizado es la siguiente:


| Obsoleto                           | Usar en su lugar      |
| ---------------------------------- | ---------------------- |
| `public-eth`                       | `eth`                  |
| `public-eth-filter`                | `eth-filter`           |
| `private-admin`                    | `admin`                |
| `private-debug`                    | `debug`                |
| `public-debug`                     | `debug`                |
| `internal-public-eth`              | `internal-eth`         |
| `internal-public-blockchain`       | `internal-blockchain`  |
| `internal-public-transaction-pool` | `internal-transaction` |
| `internal-public-tx-pool`          | `internal-tx-pool`     |
| `internal-public-debug`            | `internal-debug`       |
| `internal-private-debug`           | `internal-debug`       |
| `internal-public-account`          | `internal-account`     |
| `internal-private-personal`        | `internal-personal`    |

:::

:::note

Si completas este campo, anulará los valores predeterminados, por lo que debes incluir
cada servicio que desees habilitar.

:::

#### `eth`

El nombre de API `public-eth` está obsoleto a partir de la versión 1.7.15, y las API previamente
bajo este nombre se han migrado a `eth`.

Agrega las siguientes llamadas RPC al espacio de nombres `eth_*`. El valor predeterminado es `true`.

`eth_coinbase`
`eth_etherbase`

#### `eth-filter`

El nombre de API `public-eth-filter` está obsoleto a partir de la versión 1.7.15, y las API
bajo este nombre se han migrado a `eth-filter`.

Habilita la API de filtro público para el espacio de nombres `eth_*`. El valor predeterminado es `true`.

Agrega las siguientes llamadas RPC (ver [aquí](https://eth.wiki/json-rpc/API) para
documentación completa):

- `eth_newPendingTransactionFilter`
- `eth_newPendingTransactions`
- `eth_newAcceptedTransactions`
- `eth_newBlockFilter`
- `eth_newHeads`
- `eth_logs`
- `eth_newFilter`
- `eth_getLogs`
- `eth_uninstallFilter`
- `eth_getFilterLogs`
- `eth_getFilterChanges`

#### `admin`

El nombre de API `private-admin` está obsoleto a partir de la versión 1.7.15, y las API
bajo este nombre se han migrado a `admin`.

Agrega las siguientes llamadas RPC al espacio de nombres `admin_*`. El valor predeterminado es `false`.

- `admin_importChain`
- `admin_exportChain`

#### `debug`

Los nombres de API `private-debug` y `public-debug` están obsoletos a partir de la versión 1.7.15,
y las API previamente bajo estos nombres se han migrado a `debug`.

Agrega las siguientes llamadas RPC al espacio de nombres `debug_*`. El valor predeterminado es `false`.

- `debug_dumpBlock`
- `debug_accountRange`
- `debug_preimage`
- `debug_getBadBlocks`
- `debug_storageRangeAt`
- `debug_getModifiedAccountsByNumber`
- `debug_getModifiedAccountsByHash`
- `debug_getAccessibleState`

#### `net`

Agrega las siguientes llamadas RPC al espacio de nombres `net_*`. El valor predeterminado es `true`.

- `net_listening`
- `net_peerCount`
- `net_version`

Nota: Coreth es una máquina virtual y no tiene acceso directo a la
capa de red, por lo que `net_listening` siempre devuelve verdadero y `net_peerCount`
siempre devuelve 0. Para métricas precisas sobre la capa de red, los usuarios deben usar
las API de AvalancheGo.

#### `debug-tracer`

Agrega las siguientes llamadas RPC al espacio de nombres `debug_*`. El valor predeterminado es `false`.

- `debug_traceChain`
- `debug_traceBlockByNumber`
- `debug_traceBlockByHash`
- `debug_traceBlock`
- `debug_traceBadBlock`
- `debug_intermediateRoots`
- `debug_traceTransaction`
- `debug_traceCall`

#### `web3`

Agrega las siguientes llamadas RPC al espacio de nombres `web3_*`. El valor predeterminado es `true`.

- `web3_clientVersion`
- `web3_sha3`

#### `internal-eth`

El nombre de API `internal-public-eth` está obsoleto a partir de la versión 1.7.15, y las API
bajo este nombre se han migrado a `internal-eth`.

Agrega las siguientes llamadas RPC al espacio de nombres `eth_*`. El valor predeterminado es `true`.

- `eth_gasPrice`
- `eth_baseFee`
- `eth_maxPriorityFeePerGas`
- `eth_feeHistory`

#### `internal-blockchain`

El nombre de API `internal-public-blockchain` está obsoleto a partir de la versión 1.7.15, y las
API previamente bajo este nombre se han migrado a `internal-blockchain`.

Agrega las siguientes llamadas RPC al espacio de nombres `eth_*`. El valor predeterminado es `true`.

- `eth_chainId`
- `eth_blockNumber`
- `eth_getBalance`
- `eth_getAssetBalance`
- `eth_getProof`
- `eth_getHeaderByNumber`
- `eth_getHeaderByHash`
- `eth_getBlockByNumber`
- `eth_getBlockByHash`
- `eth_getUncleBlockByNumberAndIndex`
- `eth_getUncleBlockByBlockHashAndIndex`
- `eth_getUncleCountByBlockNumber`
- `eth_getUncleCountByBlockHash`
- `eth_getCode`
- `eth_getStorageAt`
- `eth_call`
- `eth_estimateGas`
- `eth_createAccessList`

#### `internal-transaction`

El nombre de API `internal-public-transaction-pool` está obsoleto a partir de la versión 1.7.15, y
las API previamente bajo este nombre se han migrado a `internal-transaction`.

Agrega las siguientes llamadas RPC al espacio de nombres `eth_*`. El valor predeterminado es `true`.

- `eth_getBlockTransactionCountByNumber`
- `eth_getBlockTransactionCountByHash`
- `eth_getTransactionByBlockNumberAndIndex`
- `eth_getTransactionByBlockHashAndIndex`
- `eth_getRawTransactionByBlockNumberAndIndex`
- `eth_getRawTransactionByBlockHashAndIndex`
- `eth_getTransactionCount`
- `eth_getTransactionByHash`
- `eth_getRawTransactionByHash`
- `eth_getTransactionReceipt`
- `eth_sendTransaction`
- `eth_fillTransaction`
- `eth_sendRawTransaction`
- `eth_sign`
- `eth_signTransaction`
- `eth_pendingTransactions`
- `eth_resend`

#### `internal-tx-pool`

El nombre de API `internal-public-tx-pool` está obsoleto a partir de la versión 1.7.15, y las
API previamente bajo este nombre se han migrado a `internal-tx-pool`.

Agrega las siguientes llamadas RPC al espacio de nombres `txpool_*`. El valor predeterminado es `false`.

- `txpool_content`
- `txpool_contentFrom`
- `txpool_status`
- `txpool_inspect`

#### `internal-debug`

Los nombres de API `internal-private-debug` e `internal-public-debug` están
obsoletos a partir de la versión 1.7.15, y las API que antes estaban bajo estos nombres se han
migrado a `internal-debug`.

Agrega las siguientes llamadas RPC al espacio de nombres `debug_*`. El valor predeterminado es `false`.

- `debug_getHeaderRlp`
- `debug_getBlockRlp`
- `debug_printBlock`
- `debug_chaindbProperty`
- `debug_chaindbCompact`

#### `debug-handler`

Agrega las siguientes llamadas RPC al espacio de nombres `debug_*`. El valor predeterminado es `false`.

- `debug_verbosity`
- `debug_vmodule`
- `debug_backtraceAt`
- `debug_memStats`
- `debug_gcStats`
- `debug_blockProfile`
- `debug_setBlockProfileRate`
- `debug_writeBlockProfile`
- `debug_mutexProfile`
- `debug_setMutexProfileFraction`
- `debug_writeMutexProfile`
- `debug_writeMemProfile`
- `debug_stacks`
- `debug_freeOSMemory`
- `debug_setGCPercent`

#### `internal-account`

El nombre de API `internal-public-account` está obsoleto a partir de la versión 1.7.15, y las API
que antes se encontraban bajo este nombre se han migrado a `internal-account`.

Agrega las siguientes llamadas RPC al espacio de nombres `eth_*`. El valor predeterminado es `true`.

- `eth_accounts`

#### `internal-personal`

El nombre de API `internal-private-personal` está obsoleto a partir de la versión 1.7.15, y las
API que antes se encontraban bajo este nombre se han migrado a `internal-personal`.

Agrega las siguientes llamadas RPC al espacio de nombres `personal_*`. El valor predeterminado es `false`.

- `personal_listAccounts`
- `personal_listWallets`
- `personal_openWallet`
- `personal_deriveAccount`
- `personal_newAccount`
- `personal_importRawKey`
- `personal_unlockAccount`
- `personal_lockAccount`
- `personal_sendTransaction`
- `personal_signTransaction`
- `personal_sign`
- `personal_ecRecover`
- `personal_signAndSendTransaction`
- `personal_initializeWallet`
- `personal_unpair`

### Configuración de la API

#### `rpc-gas-cap` (int)

El gas máximo que consumirá una llamada RPC (usado en `eth_estimateGas` y
`eth_call`). El valor predeterminado es `50,000,000`.

#### `rpc-tx-fee-cap` (int)

Límite global de tarifa de transacción (precio \* `gaslimit`) (medido en AVAX) para
variantes de envío de transacciones. El valor predeterminado es `100`.

#### `api-max-duration` (duration)

Duración máxima de una llamada de API. Si las llamadas de API exceden esta duración, se agotará el tiempo de espera. El valor predeterminado es `0` (sin máximo).

#### `api-max-blocks-per-request` (int)

Número máximo de bloques para servir por solicitud de `getLogs`. El valor predeterminado es `0` (sin máximo).

#### `ws-cpu-refill-rate` (duration)

La tasa de recarga especifica la cantidad máxima de tiempo de CPU que se asignará a una sola
conexión por segundo. El valor predeterminado es sin máximo (`0`).

#### `ws-cpu-max-stored` (duration)

Especifica la cantidad máxima de tiempo de CPU que se pueden almacenar para una sola conexión WS. El valor predeterminado es sin máximo (`0`).

#### `allow-unfinalized-queries` (boolean)

Permite consultas de bloques/transacciones no finalizadas (aún no aceptadas). El valor predeterminado es `false`.

#### `accepted-cache-size` `(int)

Especifica la profundidad para mantener encabezados y registros aceptados en la caché. Esto
es particularmente útil para mejorar el rendimiento de `eth_getLogs` para registros recientes.

### Pool de transacciones

#### `local-txs-enabled` (boolean)

Habilita el manejo de transacciones locales (prioriza las transacciones enviadas a través
de este nodo). El valor predeterminado es `false`.

#### `allow-unprotected-txs` (boolean)

Si es `true`, las API permitirán que se emitan transacciones que no están protegidas contra reproducción
(EIP-155) a través de este nodo. El valor predeterminado es `false`.

#### `allow-unprotected-tx-hashes` ([]TxHash)

Especifica una matriz de hashes de transacciones que se deben permitir pasar
la protección de reproducción. Esta bandera está destinada a operadores de nodos que desean explícitamente
permitir que se emitan transacciones específicas a través de su API. El valor predeterminado es una lista vacía.

#### `remote-tx-gossip-only-enabled` (boolean)

Obsoleto a partir de `v0.12.5`. Usar en su lugar `tx-gossip-enabled`.

Si es `true`, el nodo solo propagará transacciones remotas para evitar que las transacciones
emitidas a través de este nodo se transmitan a la red. El valor predeterminado es
`false`.

#### `tx-regossip-frequency` (duration)

Obsoleto a partir de `v0.12.5`. Usar en su lugar `regossip-frequency`.

Cantidad de tiempo que debe transcurrir antes de intentar volver a propagar una transacción
que ya se propagó una vez. El valor predeterminado es `60000000000` nanosegundos, que es
1 minuto.

#### `tx-regossip-max-size` (int)

Obsoleto a partir de `v0.12.5`. Usar en su lugar `regossip-max-txs`.

Número máximo de transacciones para volver a propagar a la vez. El valor predeterminado es `15`.

#### `tx-pool-journal` (string)

Especifica la ruta de archivo de un diario de transacciones para almacenar transacciones locales que sobreviven
entre reinicios del nodo.

El valor predeterminado es una cadena vacía y está desactivado. Para habilitar el registro de la piscina de transacciones,
el usuario debe especificar un diario no vacío y habilitar las transacciones locales a través de `local-txs-enabled`.

#### `tx-pool-rejournal` (duration)

Intervalo de tiempo para regenerar el diario de transacciones locales. El valor predeterminado es 1 hora.

#### `tx-pool-price-limit` (int)

Precio mínimo de gas para exigir la aceptación en la piscina. El valor predeterminado es 1 wei.

#### `tx-pool-price-bump` (int)

Porcentaje mínimo de aumento de precio para reemplazar una transacción que ya existe (nonce). El valor predeterminado es 10%.

#### `tx-pool-account-slots` (int)

Número de espacios de transacción ejecutables garantizados por cuenta. El valor predeterminado es 16.

#### `tx-pool-global-slots` (int)

Número máximo de espacios de transacción ejecutables para todas las cuentas. El valor predeterminado es 5120.

#### `tx-pool-account-queue` (int)

Número máximo de espacios de transacción no ejecutables permitidos por cuenta. El valor predeterminado es 64.

#### `tx-pool-global-queue` (int)

Número máximo de espacios de transacción no ejecutables para todas las cuentas. El valor predeterminado es 1024.

### Métricas

#### `metrics-enabled` (boolean)

Habilita las métricas. El valor predeterminado es `false`.

#### `metrics-expensive-enabled` (boolean)

Habilita métricas costosas. El valor predeterminado es `false`.

### Instantáneas

#### `snapshot-async` (boolean)

Si es `true`, permite que la generación de instantáneas se ejecute de forma asíncrona. El valor predeterminado es
`true`.

#### `snapshot-verification-enabled` (boolean)

Si es `true`, verifica la instantánea completa después de que se ha generado. El valor predeterminado es `false`.

### Registro

#### `log-level` (string)

Define el nivel de registro para la cadena. Debe ser uno de `"trace"`, `"debug"`, `"info"`,
`"warn"`, `"error"`, `"crit"`. El valor predeterminado es `"info"`.

#### `log-json-format` (bool)

Si es `true`, cambia los registros al formato JSON. El valor predeterminado es `false`.

### Configuración de Keystore

#### `keystore-directory` (string)

El directorio que contiene las claves privadas. Puede ser una ruta relativa. Si
está vacío, utiliza un directorio temporal en `coreth-keystore`. El valor predeterminado es una cadena vacía (`""`).

#### `keystore-external-signer` (string)

Especifica una URI externa para un firmante de tipo clef. El valor predeterminado es una cadena vacía
(`""` como no habilitado).

#### `keystore-insecure-unlock-allowed` (bool)

Si es `true`, permite desbloquear cuentas en un entorno HTTP inseguro. El valor predeterminado es `false`.

### Base de Datos

#### `trie-clean-cache` (int)

Tamaño de la caché utilizada para nodos de trie limpios (en MB). Debe ser un múltiplo de `64`. Por defecto, es `512`.

#### `trie-dirty-cache` (int)

Tamaño de la caché utilizada para nodos de trie sucios (en MB). Cuando los nodos sucios superan este límite, se escriben en disco. Por defecto, es `256`.

#### `trie-dirty-commit-target` (int)

Límite de memoria para apuntar en la caché sucia antes de realizar un commit (en MB). Por defecto, es `20`.

#### `trie-prefetcher-parallelism` (int)

Máximo de lecturas de disco concurrentes que el prebuscador de trie debe realizar a la vez. Por defecto, es `16`.

#### `snapshot-cache` (int)

Tamaño de la caché limpia de la capa de disco de instantáneas (en MB). Debe ser un múltiplo de `64`. Por defecto, es `256`.

#### `trie-clean-journal` (string)

Directorio para guardar la caché limpia del trie (debe estar poblado para habilitar el registro de la caché limpia del trie). Vacío y deshabilitado por defecto.

#### `trie-clean-rejournal` (duration)

Frecuencia para volver a registrar la caché limpia del trie en disco (mínimo 1 minuto, debe estar poblado para habilitar el registro de la caché limpia del trie).

#### `acceptor-queue-limit` (int)

Especifica el número máximo de bloques en cola durante la aceptación de bloques antes de bloquearse en Aceptar. Por defecto, es `64`.

#### `commit-interval` (int)

Especifica el intervalo de commit en el que persistir el trie de merkle en disco. Por defecto, es `4096`.

#### `pruning-enabled` (boolean)

Si es `true`, se habilitará el recorte de la base de datos de datos históricos obsoletos. Esto reduce la cantidad de datos escritos en disco, pero no elimina ningún estado que se haya escrito en el disco anteriormente. Esta bandera debe establecerse en `false` para nodos que necesiten acceso a todos los datos en raíces históricas. El recorte se hará sólo para nuevos datos. Por defecto, es `false` en la versión 1.4.9, y `true` en versiones posteriores.

:::note

Si un nodo se ejecuta alguna vez con `pruning-enabled` como `false` (modo de archivo), establecer `pruning-enabled` en `true` resultará en una advertencia y el nodo se apagará. Esto es para protegerse contra configuraciones incorrectas no intencionales de un nodo de archivo.

Para anular esto y cambiar al modo de recorte, además de `pruning-enabled: true`, `allow-missing-tries` también debe establecerse en `true`.

:::

#### `populate-missing-tries` (\*uint64)

Si no es nulo, establece el punto de partida para repoblar los tries faltantes y regenerar el bosque de merkle de archivo.

Para restaurar un bosque de merkle de archivo que ha sido corrompido (nodos de trie faltantes para una sección de la cadena de bloques), especifique el punto de partida del último bloque en disco, donde el trie completo estaba disponible en ese bloque para volver a procesar bloques desde esa altura en adelante y regenerar el bosque de merkle de archivo al iniciar. Esta bandera debe usarse una vez para regenerar el bosque de merkle de archivo y debe eliminarse de la configuración después de completar. Esta bandera hará que el nodo retrase su inicio mientras vuelve a procesar bloques antiguos.

#### `populate-missing-tries-parallelism` (int)

Número de lectores concurrentes a utilizar al volver a poblar los tries faltantes al iniciar. Por defecto, es `1024`.

#### `allow-missing-tries` (boolean)

Si es `true`, permite que un nodo que alguna vez estuvo configurado como archivador cambie al modo de recorte. Por defecto, es `false`.

#### `preimages-enabled` (boolean)

Si es `true`, habilita las preimágenes. Por defecto, es `false`.

#### `offline-pruning-enabled` (boolean)

Si es `true`, el recorte sin conexión se ejecutará al iniciar y bloqueará hasta que se complete (aproximadamente una hora en Mainnet). Esto reducirá el tamaño de la base de datos eliminando nodos de trie antiguos. **Mientras se realiza el recorte sin conexión, su nodo no podrá procesar bloques y se considerará fuera de línea.** Mientras está en curso, el proceso de recorte consume una pequeña cantidad de espacio adicional en disco (para marcadores de eliminación y el filtro de bloom). Para más información, consulte [aquí](/nodes/maintain/run-offline-pruning.md#disk-space-considerations).

Dado que el recorte sin conexión elimina datos de estado antiguos, esto no debe ejecutarse en nodos que necesiten soportar solicitudes de API de archivo.

Esto está destinado a ejecutarse manualmente, por lo que después de ejecutarlo una vez con esta bandera, debe cambiarse de nuevo a falso antes de ejecutar el nodo de nuevo. Por lo tanto, debe ejecutarse con esta bandera establecida en verdadero y luego establecerla en falso en la ejecución siguiente.

#### `offline-pruning-bloom-filter-size` (int)

Esta bandera establece el tamaño del filtro de bloom a utilizar en el recorte sin conexión (denominado en MB y con un valor predeterminado de 512 MB). El filtro de bloom se mantiene en memoria para comprobaciones eficientes durante el recorte y también se escribe en disco para permitir que el recorte se reanude sin volver a generar el filtro de bloom.

El estado activo se agrega al filtro de bloom antes de iterar la base de datos para encontrar nodos de trie que se pueden eliminar de forma segura, cualquier nodo de trie que no esté en el filtro de bloom se considera seguro para su eliminación. El tamaño del filtro de bloom puede afectar su tasa de falsos positivos, lo que puede afectar los resultados del recorte sin conexión. Este es un parámetro avanzado que se ha ajustado a 512 MB y no debe cambiarse sin una consideración cuidadosa.

#### `offline-pruning-data-directory` (string)

Esta bandera debe establecerse cuando se habilita el recorte sin conexión y establece el directorio que el recorte sin conexión utilizará para escribir su filtro de bloom en disco. Este directorio no debe cambiarse entre ejecuciones hasta que el recorte sin conexión haya completado.

#### `tx-lookup-limit` (uint64)

Número de bloques recientes para los cuales mantener índices de búsqueda de transacciones en la base de datos. Si se establece en 0, se mantendrán índices de búsqueda de transacciones para todos los bloques. Por defecto, es `0`.

#### `skip-tx-indexing` (bool)

Si se establece en `true`, el nodo no indexará transacciones. El límite de búsqueda de transacciones aún se puede utilizar para controlar la eliminación de índices de transacciones antiguas. Por defecto, es `false`.

### Red de VM

#### `max-outbound-active-requests` (int)

Especifica el número máximo de solicitudes salientes de VM2VM en vuelo a la vez. Por defecto, es `16`.

#### `max-outbound-active-cross-chain-requests` (int)

Especifica el número máximo de solicitudes salientes de cadena cruzada en vuelo a la vez. Por defecto, es `64`.

### Varios

#### `airdrop` (string)

Ruta a un archivo json que contiene una lista de direcciones para un airdrop de génesis. Cada dirección recibirá un airdrop de `AirdropAmount` en el génesis, y el hash del archivo de airdrop debe coincidir con `AirdropHash`. `AirdropAmount` y `AirdropHash` son parte de la configuración de génesis. Esta opción se aplica sólo a `subnet-evm` (no aplicable a `coreth`).

#### `skip-upgrade-check` (bool)

Si se establece en `true`, la cadena omitirá verificar que todas las actualizaciones de red esperadas se hayan realizado antes del último bloque aceptado al iniciar. Esto permite que los operadores de nodos se recuperen si su nodo ha aceptado bloques después de una actualización de red con una versión del código anterior a la actualización. Por defecto, es `false`.

## Configuraciones de la Cadena X

Para especificar una configuración para la Cadena X, se debe colocar un archivo de configuración JSON en `{chain-config-dir}/X/config.json`.

Por ejemplo, si `chain-config-dir` tiene el valor predeterminado que es `$HOME/.avalanchego/configs/chains`, entonces `config.json` se puede colocar en `$HOME/.avalanchego/configs/chains/X/config.json`.

Esto le permite especificar una configuración que se pasará a la Cadena X. Los valores predeterminados para esta configuración son:

```json
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Los valores predeterminados se anulan sólo si se especifican explícitamente en la configuración.

Los parámetros son los siguientes:

**Indexación de Transacciones**

### `index-transactions` (boolean)

Habilita la indexación de transacciones AVM si se establece en `true`. El valor predeterminado es `false`.
Cuando se establece en `true`, las transacciones AVM se indexan según la `dirección` y el `assetID` involucrados. Estos datos están disponibles a través de `avm.getAddressTxs`
[API](/reference/avalanchego/x-chain/api.md#avmgetaddresstxs).

:::note
Si `index-transactions` se establece en true, siempre debe estar configurado en true
durante la vida útil del nodo. Si se establece en `false` después de haber sido establecido en `true`, el
nodo se negará a iniciar a menos que `index-allow-incomplete` también se establezca en `true`
(ver más abajo).
:::

### `index-allow-incomplete` (booleano)

Permite índices incompletos. El valor predeterminado es `false`.

Este valor de configuración se ignora si no hay datos indexados de la cadena X en la base de datos y
`index-transactions` se establece en `false`.

## Configuraciones de la Cadena de Subnet

Como se mencionó anteriormente, si la id de cadena de una Subnet es
`2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, la configuración para esta cadena
debería estar en
`{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`

## Preguntas frecuentes

- Cuando se usa `getBlockNumber` devolverá bloques finalizados. Para permitir consultas
  de bloques/transacciones no finalizados (aún no aceptados), use `allow-unfainalized-queries`
  y establezca en true (por defecto está establecido en `false`).

- Cuando se desactiva la poda sin conexión `(pruning-enabled: false)` desde un estado previamente
  habilitado, esto no afectará a los bloques cuyo estado ya fue podado. Esto devolverá errores de nodo de trie faltante, ya que el nodo no puede buscar el estado de un bloque histórico si ese estado fue eliminado.