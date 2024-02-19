---
tags: [Nodos]
description: Este documento enumera todas las configuraciones y banderas disponibles para AvalancheGo.
sidebar_label: Configuraciones + Banderas de AvalancheGo
pagination_label: Configuraciones y Banderas de AvalancheGo
sidebar_position: 0
---

# Configuraciones y Banderas de AvalancheGo

<!-- markdownlint-disable MD001 -->

Puedes especificar la configuración de un nodo con los argumentos a continuación.

## Directorio de Datos

#### `--data-dir` (cadena)

Establece el directorio base de datos donde se colocarán los subdirectorios por defecto a menos que se especifique lo contrario.
Por defecto, es `$HOME/.avalanchego`.

## Archivo de Configuración

#### `--config-file` (cadena)

Ruta a un archivo JSON que especifica la configuración de este nodo. Los argumentos de línea de comandos
anularán los argumentos establecidos en el archivo de configuración. Esta bandera se ignora
si se especifica `--config-file-content`.

Ejemplo de archivo de configuración JSON:

```json
{
  "log-level": "debug"
}
```

:::tip
[El script de instalación](/nodes/run/with-installer/installing-avalanchego.md) crea el archivo de configuración del nodo
en `~/.avalanchego/configs/node.json`. No se crea ningún archivo por defecto si
[AvalancheGo se construye desde el código fuente](/nodes/run/node-manually.md),
deberías crearlo manualmente si es necesario.
:::

#### `--config-file-content` (cadena)

Como alternativa a `--config-file`, permite especificar el contenido de configuración codificado en base64.

#### `--config-file-content-type` (cadena)

Especifica el formato del contenido de configuración codificado en base64. JSON, TOML, YAML son
algunos de los formatos de archivo actualmente soportados (ver
[aquí](https://github.com/spf13/viper#reading-config-files) para la lista completa). Por defecto, es `JSON`.

## APIs

#### `--api-admin-enabled` (booleano)

Si se establece en `true`, este nodo expondrá la API de Administración. Por defecto, es `false`.
Ver [aquí](/reference/avalanchego/admin-api.md) para más información.

#### `--api-auth-required` (booleano)

Si se establece en `true`, las llamadas de API requieren un token de autorización. Por defecto, es `false`.
Ver [aquí](/reference/avalanchego/auth-api.md) para más información.

#### `--api-auth-password` (cadena)

La contraseña necesaria para crear/revocar tokens de autorización. Si
`--api-auth-required=true`, debe especificarse; de lo contrario, se ignora. Ver
[aquí](/reference/avalanchego/auth-api.md) para más información.

#### `--api-auth-password-file` (cadena)

Archivo de contraseña utilizado para crear/validar inicialmente tokens de autorización de API.
Se ignora si se especifica `---api-auth-password`.
Se elimina el espacio en blanco al principio y al final de la contraseña. Se puede cambiar a través de una llamada de API.

#### `--api-health-enabled` (booleano)

Si se establece en `false`, este nodo no expondrá la API de Salud. Por defecto, es `true`. Ver
[aquí](/reference/avalanchego/health-api.md) para más información.

#### `--index-enabled` (booleano)

Si se establece en `true`, este nodo habilitará el indexador y la API de Índice estará
disponible. Por defecto, es `false`. Ver
[aquí](/reference/avalanchego/index-api.md) para más información.

#### `--api-info-enabled` (booleano)

Si se establece en `false`, este nodo no expondrá la API de Información. Por defecto, es `true`. Ver
[aquí](/reference/avalanchego/info-api.md) para más información.

#### `--api-keystore-enabled` (booleano)

Si se establece en `true`, este nodo expondrá la API de Keystore. Por defecto, es `false`.
Ver [aquí](/reference/avalanchego/keystore-api.md) para más información.

#### `--api-metrics-enabled` (booleano)

Si se establece en `false`, este nodo no expondrá la API de Métricas. Por defecto, es
`true`. Ver [aquí](/reference/avalanchego/metrics-api.md) para más información.

#### `--http-shutdown-wait` (duración)

Duración de espera después de recibir SIGTERM o SIGINT antes de iniciar el apagado.
El punto final `/health` devolverá no saludable durante esta duración (si la API de Salud
está habilitada). Por defecto, es `0s`.

#### `--http-shutdown-timeout` (duración)

Duración máxima de espera para que las conexiones existentes se completen durante el
apagado del nodo. Por defecto, es `10s`.

## Arranque

#### `--bootstrap-beacon-connection-timeout` (duración)

Tiempo de espera al intentar conectar con beacons de arranque. Por defecto, es `1m`.

#### `--bootstrap-ids` (cadena)

Los IDs de arranque son una lista separada por comas de los IDs de validadores. Estos IDs se utilizarán
para autenticar a los pares de arranque. Un ejemplo de configuración de este campo sería
`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`.
El número de IDs dados aquí debe ser el mismo que el número dado
`--bootstrap-ips`. El valor por defecto depende del ID de red.

#### `--bootstrap-ips` (cadena)

Las IPs de arranque son una lista separada por comas de pares IP:puerto. Estas direcciones IP
se utilizarán para arrancar el estado actual de Avalanche. Un ejemplo de configuración de
este campo sería `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. El número
de IPs dados aquí debe ser el mismo que el número dado `--bootstrap-ids`. El
valor por defecto depende del ID de red.

#### `--bootstrap-retry-enabled` (booleano)

Si se establece en `false`, no se volverá a intentar el arranque si falla. Por defecto, es `true`.

#### `--bootstrap-retry-warn-frequency` (uint)

Especifica cuántas veces se debe reintentar el arranque antes de advertir al operador. Por defecto, es `50`.

#### `--bootstrap-ancestors-max-containers-sent` (uint)

Número máximo de contenedores en un mensaje `Ancestors` enviado por este nodo. Por defecto, es `2000`.

#### `--bootstrap-ancestors-max-containers-received` (unit)

Este nodo lee como máximo esta cantidad de contenedores de un mensaje `Ancestors` entrante. Por defecto, es `2000`.

#### `--bootstrap-max-time-get-ancestors` (duración)

Tiempo máximo para gastar recuperando un contenedor y sus ancestros al responder a un mensaje GetAncestors.
Por defecto, es `50ms`.

## Sincronización de Estado

#### `--state-sync-ids` (cadena)

Los IDs de sincronización de estado son una lista separada por comas de los IDs de validadores. Los
validadores especificados serán contactados para obtener y autenticar el punto de inicio (resumen de estado) para la sincronización de estado. Un ejemplo de configuración de este campo sería
`--state-sync-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`.
El número de IDs dados aquí debe ser el mismo que el número dado
`--state-sync-ips`. El valor por defecto es vacío, lo que resulta en que se muestreen todos los validadores.

#### `--state-sync-ips` (cadena)

Las IPs de sincronización de estado son una lista separada por comas de pares IP:puerto. Estas direcciones IP
serán contactadas para obtener y autenticar el punto de inicio (resumen de estado) para
la sincronización de estado. Un ejemplo de configuración de este campo sería
`--state-sync-ips="127.0.0.1:12345,1.2.3.4:5678"`. El número de IPs dados aquí
debe ser el mismo que el número de `--state-sync-ids` dados.

## Sincronización Parcial Red Primaria

#### `--partial-sync-primary-network` (cadena)

La sincronización parcial permite a los no validadores sincronizar opcionalmente solo la cadena P en la red primaria.

## Configuraciones de la Cadena

Algunas blockchains permiten que el operador del nodo proporcione configuraciones personalizadas para blockchains individuales. Estas configuraciones personalizadas se dividen en dos categorías: actualizaciones de red y configuraciones opcionales de la cadena. AvalancheGo lee estas configuraciones desde el directorio de configuración de la cadena y las pasa a la VM durante la inicialización.

#### `--chain-config-dir` (cadena)

Especifica el directorio que contiene las configuraciones de la cadena, como se describe [aquí](chain-config-flags.md). Por defecto, es `$HOME/.avalanchego/configs/chains`. Si no se proporciona esta bandera y el directorio predeterminado no existe, AvalancheGo no saldrá ya que las configuraciones personalizadas son opcionales. Sin embargo, si se establece la bandera, la carpeta especificada debe existir, o AvalancheGo saldrá con un error. Esta bandera se ignora si se especifica `--chain-config-content`.

:::note
Por favor, reemplace `chain-config-dir` y `blockchainID` con sus valores reales.
:::

Las actualizaciones de red se pasan desde la ubicación: `chain-config-dir`/`blockchainID`/`upgrade.*`. Los archivos de actualización suelen estar codificados en json y, por lo tanto, se llaman `upgrade.json`. Sin embargo, el formato del archivo depende de la VM. Después de que una blockchain ha activado una actualización de red, la misma configuración de actualización debe pasarse siempre para asegurar que las actualizaciones de red se activen en el momento correcto.

Las configuraciones de la cadena se pasan desde la ubicación `chain-config-dir`/`blockchainID`/`config.*`. Los archivos de configuración suelen estar codificados en json y, por lo tanto, se llaman `config.json`. Sin embargo, el formato del archivo depende de la VM. Esta configuración es utilizada por la VM para manejar banderas de configuración opcionales como habilitar/deshabilitar APIs, actualizar el nivel de registro, etc. La configuración de la cadena está destinada a proporcionar parámetros de configuración opcionales y la VM utilizará valores predeterminados si no se pasa nada.

La referencia completa de todas las opciones de configuración para algunas cadenas estándar se puede encontrar en un documento separado de [banderas de configuración de la cadena](chain-config-flags.md).

La referencia completa de la configuración de actualización de la Subnet `subnet-evm` se puede encontrar en un documento separado de [Personalizar una Subnet](/build/subnet/upgrade/customize-a-subnet.md).

#### `--chain-config-content` (cadena)

Como alternativa a `--chain-config-dir`, las configuraciones personalizadas de las cadenas se pueden cargar en su totalidad desde la línea de comandos a través de la bandera `--chain-config-content`. El contenido debe estar codificado en base64.

Ejemplo:

```bash
cchainconfig="$(echo -n '{"log-level":"trace"}' | base64)"
chainconfig="$(echo -n "{\"C\":{\"Config\":\"${cchainconfig}\",\"Upgrade\":null}}" | base64)"
avalanchego --chain-config-content "${chainconfig}"
```

#### `--chain-aliases-file` (cadena)

Ruta al archivo JSON que define alias para ID de Blockchains. Por defecto, es `~/.avalanchego/configs/chains/aliases.json`. Esta bandera se ignora si se especifica `--chain-aliases-file-content`. Ejemplo de contenido:

```json
{
  "q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi": ["DFK"]
}
```

El ejemplo anterior asigna alias a la Blockchain cuyo ID es `"q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi"` como `"DFK"`. Los alias de la cadena se agregan después de agregar alias de red primaria y antes de cualquier cambio en los alias a través de la API de administración. Esto significa que el primer alias incluido para una Blockchain en una Subnet se tratará como el "Alias Primario" en lugar del blockchainID completo. El Alias Primario se utiliza en todas las métricas y registros.

#### `--chain-aliases-file-content` (cadena)

Como alternativa a `--chain-aliases-file`, permite especificar contenido de alias de Blockchains codificado en base64.

#### `--chain-data-dir` (cadena)

Directorio de datos específico de la cadena. Por defecto, es `$HOME/.avalanchego/chainData`.

## Base de Datos

##### `--db-dir` (cadena, ruta de archivo)

Especifica el directorio en el que se persiste la base de datos. Por defecto, es `"$HOME/.avalanchego/db"`.

##### `--db-type` (cadena)

Especifica el tipo de base de datos a utilizar. Debe ser uno de `LevelDB` o `memdb`. `memdb` es una base de datos en memoria, no persistente.

:::note

`memdb` almacena todo en memoria. Así que si tienes una instancia de LevelDB de 900 GiB, entonces usando `memdb` necesitarías 900 GiB de RAM. `memdb` es útil para pruebas rápidas ocasionales, no para ejecutar un nodo real (en Fuji o Mainnet). También tenga en cuenta que `memdb` no persiste después de reiniciar. Así que cada vez que reinicies el nodo, comenzará a sincronizar desde cero.

:::

### Configuración de la Base de Datos

#### `--db-config-file` (cadena)

Ruta al archivo de configuración de la base de datos. Se ignora si se especifica `--db-config-file-content`.

#### `--db-config-file-content` (cadena)

Como alternativa a `--db-config-file`, permite especificar el contenido de la configuración de la base de datos codificado en base64.

#### Configuración de LevelDB

Un archivo de configuración de LevelDB debe ser JSON y puede tener estas claves. Cualquier clave no especificada recibirá el valor predeterminado.

```go
{
	// BlockCacheCapacity define la capacidad de la caché de bloques de 'sorted table'.
	// Use -1 para cero.
	//
	// El valor predeterminado es 12MiB.
	"blockCacheCapacity": int

	// BlockSize es el tamaño mínimo sin comprimir en bytes de cada bloque de 'sorted table'.
	//
	// El valor predeterminado es 4KiB.
	"blockSize": int

	// CompactionExpandLimitFactor limita el tamaño de la compactación después de la expansión.
	// Esto se multiplicará por el límite de tamaño de tabla en el nivel de destino de la compactación.
	//
	// El valor predeterminado es 25.
	"compactionExpandLimitFactor": int

	// CompactionGPOverlapsFactor limita las superposiciones en el abuelo (Nivel + 2)
	// que una sola 'sorted table' genera. Esto se multiplicará por
	// el límite de tamaño de tabla en el nivel de abuelo.
	//
	// El valor predeterminado es 10.
	"compactionGPOverlapsFactor": int

	// CompactionL0Trigger define el número de 'sorted table' en el nivel-0 que
	// desencadenará la compactación.
	//
	// El valor predeterminado es 4.
	"compactionL0Trigger": int

	// CompactionSourceLimitFactor limita el tamaño de la fuente de compactación. Esto no se aplica a
	// nivel-0.
	// Esto se multiplicará por el límite de tamaño de tabla en el nivel de destino de la compactación.
	//
	// El valor predeterminado es 1.
	"compactionSourceLimitFactor": int

	// CompactionTableSize limita el tamaño de la 'sorted table' que genera la compactación.
	// Los límites para cada nivel se calcularán como:
	//   CompactionTableSize * (CompactionTableSizeMultiplier ^ Nivel)
	// El multiplicador para cada nivel también se puede ajustar finamente utilizando CompactionTableSizeMultiplierPerLevel.
	//
	// El valor predeterminado es 2MiB.
	"compactionTableSize": int

	// CompactionTableSizeMultiplier define el multiplicador para CompactionTableSize.
	//
	// El valor predeterminado es 1.
	"compactionTableSizeMultiplier": float

	// CompactionTableSizeMultiplierPerLevel define el multiplicador por nivel para
	// CompactionTableSize.
	// Use cero para omitir un nivel.
	//
	// El valor predeterminado es nulo.
	"compactionTableSizeMultiplierPerLevel": []float

	// CompactionTotalSize limita el tamaño total de la 'sorted table' para cada nivel.
	// Los límites para cada nivel se calcularán como:
	//   CompactionTotalSize * (CompactionTotalSizeMultiplier ^ Nivel)
	// El multiplicador para cada nivel también se puede ajustar finamente utilizando
	// CompactionTotalSizeMultiplierPerLevel.
	//
	// El valor predeterminado es 10MiB.
	"compactionTotalSize": int

	// CompactionTotalSizeMultiplier define el multiplicador para CompactionTotalSize.
	//
	// El valor predeterminado es 10.
	"compactionTotalSizeMultiplier": float



// disableSeeksCompaction permite desactivar la 'compactación desencadenada por búsquedas'.
// El propósito de la 'compactación desencadenada por búsquedas' es optimizar la base de datos para
// minimizar las 'búsquedas de nivel', sin embargo, esto puede generar muchas
// compactaciones pequeñas que pueden no ser preferibles.
//
// El valor predeterminado es true.
"disableSeeksCompaction": bool

// openFilesCacheCapacity define la capacidad de la caché de archivos abiertos.
// Use -1 para cero, esto tiene el mismo efecto que especificar NoCacher a OpenFilesCacher.
//
// El valor predeterminado es 1024.
"openFilesCacheCapacity": int

// writeBuffer define el tamaño máximo de un 'memdb' antes de que se vacíe en
// una 'tabla ordenada'. 'memdb' es una base de datos en memoria respaldada por un
// diario desordenado en disco.
//
// LevelDB puede contener hasta dos 'memdb' al mismo tiempo.
//
// El valor predeterminado es 6MiB.
"writeBuffer": int

// filterBitsPerKey es el número de bits que se agregan al filtro de Bloom por
// clave.
//
// El valor predeterminado es 10.
"filterBitsPerKey": int

// maxManifestFileSize es el límite máximo de tamaño del archivo MANIFEST-******.
// Cuando el archivo MANIFEST-****** crece más allá de este tamaño, LevelDB creará
// un nuevo archivo MANIFEST.
//
// El valor predeterminado es infinito.
"maxManifestFileSize": int

// metricUpdateFrequency es la frecuencia para sondear las métricas de LevelDB en
// nanosegundos.
// Si <= 0, las métricas de LevelDB no se sondean.
//
// El valor predeterminado es 10s.
"metricUpdateFrequency": int
}
```

## Génesis

#### `--genesis-file` (string)

Ruta a un archivo JSON que contiene los datos de génesis a utilizar. Se ignora cuando se ejecutan
redes estándar (Mainnet, Fuji Testnet), o cuando se especifica `--genesis-content`. Si no se proporciona, utiliza los datos de génesis predeterminados.

Estas son las propiedades principales en el archivo JSON:

- `networkID`: Un identificador único para la blockchain, debe ser un número en el rango [0, 2^32).
- `allocations`: La lista de direcciones iniciales, sus saldos iniciales y el cronograma de desbloqueo para cada una.
- `startTime`: La hora de inicio de la blockchain, debe ser una marca de tiempo Unix
  y no puede ser una hora en el futuro.
- `initialStakeDuration`: La duración de stake, en segundos, de los validadores que existen en el génesis de la red.
- `initialStakeDurationOffset`: El desplazamiento, en segundos, entre los tiempos de inicio
  de los validadores que existen en el génesis.
- `initialStakedFunds`: Una lista de direcciones que poseen los fondos stakeados en el génesis
  (cada dirección debe estar presente en `allocations` también)
- `initialStakers`: Los validadores que existen en el génesis. Cada elemento contiene
  la `rewardAddress`, NodeID y la `delegationFee` del validador.
- `cChainGenesis`: La información de génesis que se pasará a la C-Chain.
- `message`: Un mensaje para incluir en el génesis. No es obligatorio.

Para un ejemplo de una representación JSON de los datos de génesis, consulte [genesis_local.json](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.json).

#### `--genesis-file-content` (string)

Como alternativa a `--genesis-file`, permite especificar los datos de génesis codificados en base64 a utilizar.

## Servidor HTTP

#### `--http-host` (string)

La dirección en la que escuchan las API HTTP. De forma predeterminada, es `127.0.0.1`. Esto significa que,
de forma predeterminada, su nodo solo puede manejar llamadas de API realizadas desde la misma máquina. Para
permitir llamadas de API desde otras máquinas, use `--http-host=`. También puede ingresar
nombres de dominio como parámetro.

#### `--http-port` (int)

Cada nodo ejecuta un servidor HTTP que proporciona las API para interactuar con el
nodo y la red Avalanche. Este argumento especifica el puerto en el que el servidor HTTP
escuchará. El valor predeterminado es `9650`.

#### `--http-tls-cert-file` (string, ruta de archivo)

Este argumento especifica la ubicación del certificado TLS utilizado por el nodo para
el servidor HTTPS. Esto debe especificarse cuando `--http-tls-enabled=true`. No
hay un valor predeterminado. Esta bandera se ignora si se especifica `--http-tls-cert-file-content`.

#### `--http-tls-cert-file-content` (string)

Como alternativa a `--http-tls-cert-file`, permite especificar el contenido codificado en base64
del certificado TLS utilizado por el nodo para el servidor HTTPS. Tenga en cuenta que
el contenido completo del certificado, con el encabezado inicial y final, debe estar codificado en base64.
Esto debe especificarse cuando `--http-tls-enabled=true`.

#### `--http-tls-enabled` (booleano)

Si se establece en `true`, esta bandera intentará actualizar el servidor para usar HTTPS. De forma predeterminada, es `false`.

#### `--http-tls-key-file` (string, ruta de archivo)

Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo para
el servidor HTTPS. Esto debe especificarse cuando `--http-tls-enabled=true`. No
hay un valor predeterminado. Esta bandera se ignora si se especifica `--http-tls-key-file-content`.

#### `--http-tls-key-file-content` (string)

Como alternativa a `--http-tls-key-file`, permite especificar el contenido codificado en base64
de la clave privada TLS utilizada por el nodo para el servidor HTTPS. Tenga en cuenta que
el contenido completo de la clave privada, con el encabezado inicial y final, debe estar codificado en base64.
Esto debe especificarse cuando `--http-tls-enabled=true`.

#### `--http-read-timeout` (string)

Duración máxima para leer la solicitud completa, incluido el cuerpo. Un valor cero o
negativo significa que no habrá tiempo de espera.

#### `--http-read-header-timeout` (string)

Duración máxima para leer las cabeceras de la solicitud. El plazo de lectura de la conexión se restablece después de leer las cabeceras. Si `--http-read-header-timeout` es cero, se utiliza el valor de `--http-read-timeout`. Si ambos son cero, no hay tiempo de espera.

#### `--http-write-timeout` (string)

Duración máxima antes de agotar el tiempo de espera de escritura de la respuesta. Se restablece cada vez
que se lee el encabezado de una nueva solicitud. Un valor cero o negativo significa que no habrá tiempo de espera.

#### `--http-idle-timeout` (string)

Duración máxima para esperar la siguiente solicitud cuando las conexiones persistentes están habilitadas. Si
`--http-idle-timeout` es cero, se utiliza el valor de `--http-read-timeout`. Si ambos son cero,
no hay tiempo de espera.

#### `--http-allowed-origins` (string)

Orígenes permitidos en el puerto HTTP. De forma predeterminada, es `*`, lo que permite todos los orígenes. Ejemplo:
`"https://*.avax.network https://*.avax-test.network"`

#### `--http-allowed-hosts` (string)

Lista de nombres de host aceptables en las solicitudes de API. Proporcione el comodín (`'*'`) para aceptar
solicitudes de todos los hosts. Una llamada de API cuyo campo `Host` HTTP no sea aceptable recibirá un código de error 403. De forma predeterminada, es `localhost`.

## Límite de descriptores de archivo

#### `--fd-limit` (int)

Intenta aumentar el límite de descriptores de archivo del proceso a al menos este valor y
devuelve un error si el valor está por encima del máximo del sistema. Predeterminado de Linux `32768`.

## Registro

#### `--log-level` (string, `{verbo, debug, trace, info, warn, error, fatal, off}`)

El nivel de registro determina qué eventos se registran. Hay 8 niveles diferentes, en orden de mayor a menor prioridad.

- `off`: Ningún registro tiene este nivel de registro. Desactiva el registro.
- `fatal`: Errores fatales que no son recuperables.
- `error`: Errores que encuentra el nodo, estos errores pudieron ser recuperados.
- `warn`: Una advertencia que podría ser indicativa de un nodo bizantino espurio, o un error potencial futuro.
- `info`: Descripciones útiles de actualizaciones de estado del nodo.
- `trace`: Rastrea los resultados del trabajo de los contenedores (bloque, vértice, transacción). Útil para rastrear identificadores de contenedores y sus resultados.
- `debug`: El registro de depuración es útil cuando se intenta entender posibles errores en el código. Se mostrará más información de la que se desearía típicamente para el uso normal.
- `verbo`: Rastrea cantidades extensas de información que el nodo está procesando. Esto incluye el contenido de los mensajes y volcados binarios de datos para un análisis de protocolo de nivel extremadamente bajo.

Al especificar un nivel de registro, tenga en cuenta que se rastrearán todos los registros con la prioridad especificada o superior. El valor predeterminado es `info`.

#### `--log-display-level` (cadena, `{verbo, debug, trace, info, warn, error, fatal, off}`)

El nivel de registro determina qué eventos mostrar en stdout. Si se deja en blanco, se utilizará el valor proporcionado a `--log-level`.

#### `--log-format` (cadena, `{auto, plain, colors, json}`)

La estructura del formato de registro. El valor predeterminado es `auto`, que formatea los registros como en una terminal, cuando la salida es una terminal. De lo contrario, debe ser uno de `{auto, plain, colors, json}`.

#### `--log-dir` (cadena, ruta de archivo)

Especifica el directorio en el que se guardan los registros del sistema. El valor predeterminado es `"$HOME/.avalanchego/logs"`. Si está ejecutando el nodo como un servicio del sistema (por ejemplo, utilizando el script de instalación), los registros también se almacenarán en `$HOME/var/log/syslog`.

#### `--log-disable-display-plugin-logs` (booleano)

Deshabilita la visualización de los registros de los complementos en stdout. El valor predeterminado es `false`.

#### `--log-rotater-max-size` (entero sin signo)

El tamaño máximo del archivo de registro en megabytes antes de que se rote. El valor predeterminado es `8`.

#### `--log-rotater-max-files` (entero sin signo)

El número máximo de archivos de registro antiguos para retener. 0 significa retener todos los archivos de registro antiguos. El valor predeterminado es `7`.

#### `--log-rotater-max-age` (entero sin signo)

El número máximo de días para retener archivos de registro antiguos según la marca de tiempo codificada en su nombre de archivo. 0 significa retener todos los archivos de registro antiguos. El valor predeterminado es `0`.

#### `--log-rotater-compress-enabled` (booleano)

Habilita la compresión de archivos de registro rotados a través de gzip. El valor predeterminado es `false`.

## ID de red

#### `--network-id` (cadena)

La identidad de la red a la que el nodo debe conectarse. Puede ser uno de:

- `--network-id=mainnet` -&gt; Conectarse a Mainnet (predeterminado).
- `--network-id=fuji` -&gt; Conectarse a la red de prueba Fuji.
- `--network-id=testnet` -&gt; Conectarse a la red de prueba actual. (En este momento, esto es Fuji).
- `--network-id=local` -&gt; Conectarse a una red de prueba local.
- `--network-id=network-{id}` -&gt; Conectarse a la red con el ID dado.
  `id` debe estar en el rango `[0, 2^32)`.

## OpenTelemetry

AvalancheGo admite recopilar y exportar trazas de [OpenTelemetry](https://opentelemetry.io/). Esto puede ser útil para la depuración, el análisis de rendimiento o el monitoreo.

#### `--tracing-enabled` (booleano)

Si es verdadero, habilita el rastreo de OpenTelemetry. El valor predeterminado es `false`.

#### `--tracing-endpoint` (cadena)

El punto final para exportar los datos de traza. El valor predeterminado es `localhost:4317`.

#### `--tracing-insecure` (cadena)

Si es verdadero, no utiliza TLS al exportar los datos de traza. El valor predeterminado es `true`.

#### `--tracing-sample-rate` (flotante)

La fracción de trazas a muestrear. Si es `>=` 1, siempre se muestrea. Si es `<=` 0, nunca se muestrea.
El valor predeterminado es `0.1`.

#### `--tracing-exporter-type`(cadena)

Tipo de exportador a utilizar para el rastreo. Las opciones son [`grpc`,`http`]. El valor predeterminado es `grpc`.

## IP pública

Los validadores deben conocer una de sus direcciones IP públicas para que puedan habilitar
que otros nodos se conecten a ellos.

De forma predeterminada, el nodo intentará realizar el tránsito de NAT para obtener la IP del nodo
según su enrutador.

#### `--public-ip` (cadena)

Si se proporciona este argumento, el nodo asumirá que esta es su IP pública.

:::tip
Cuando se ejecuta una red local, puede ser más fácil establecer este valor en `127.0.0.1`.
:::

#### `--public-ip-resolution-frequency` (duración)

Frecuencia con la que este nodo resuelve/actualiza su IP pública y renueva los mapeos NAT, si corresponde. El valor predeterminado es de 5 minutos.

#### `--public-ip-resolution-service` (cadena)

Cuando se proporciona, el nodo utilizará ese servicio para resolver/actualizar periódicamente su IP pública.
Los únicos valores aceptables son `ifconfigCo`, `opendns` o `ifconfigMe`.

## Staking (Participación)

#### `--staking-port` (entero)

El puerto a través del cual los pares de la red se conectarán a este nodo externamente.
Tener este puerto accesible desde Internet es necesario para el correcto funcionamiento del nodo.
El valor predeterminado es `9651`.

#### `--sybil-protection-enabled` (booleano)

Avalanche utiliza Prueba de Participación (PoS) como resistencia a sybil para hacer prohibitivamente
costoso atacar la red. Si es falso, la resistencia a sybil está deshabilitada y todos
los pares serán muestreados durante el consenso. El valor predeterminado es `true`. Tenga en cuenta que esto no se puede desactivar en redes públicas (`Fuji` y `Mainnet`).

Establecer este indicador en `false` **no significa** "este nodo no es un validador".
Significa que este nodo muestreará a todos los nodos, no solo a los validadores.
**No debe establecer este indicador en falso a menos que entienda lo que está haciendo.**

#### `--sybil-protection-disabled-weight` (entero sin signo)

Peso que se proporcionará a cada par cuando la participación esté deshabilitada. El valor predeterminado es `100`.

#### `--staking-tls-cert-file` (cadena, ruta de archivo)

Avalanche utiliza conexiones TLS autenticadas de dos vías para conectar nodos de forma segura.
Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. De
forma predeterminada, el nodo espera que el certificado TLS esté en
`$HOME/.avalanchego/staking/staker.crt`. Esta bandera se ignora si
se especifica `--staking-tls-cert-file-content`.

#### `--staking-tls-cert-file-content` (cadena)

Como alternativa a `--staking-tls-cert-file`, permite especificar el contenido base64
codificado del certificado TLS utilizado por el nodo. Tenga en cuenta que el contenido completo del certificado, con el encabezado inicial y final, debe estar codificado en base64.

#### `--staking-tls-key-file` (cadena, ruta de archivo)

Avalanche utiliza conexiones TLS autenticadas de dos vías para conectar nodos de forma segura.
Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo. De
forma predeterminada, el nodo espera que la clave privada TLS esté en
`$HOME/.avalanchego/staking/staker.key`. Esta bandera se ignora si
se especifica `--staking-tls-key-file-content`.

#### `--staking-tls-key-file-content` (cadena)

Como alternativa a `--staking-tls-key-file`, permite especificar el contenido base64
codificado de la clave privada TLS utilizada por el nodo. Tenga en cuenta que el contenido completo de la clave privada, con el encabezado inicial y final, debe estar codificado en base64.

## Subnets

### Seguimiento de Subnets

#### `--track-subnets` (cadena)

Lista separada por comas de los ID de Subnet que este nodo rastreará si se agrega.
El valor predeterminado es vacío (solo validará la Red Primaria).

### Configuraciones de Subnets

Es posible proporcionar parámetros para Subnets. Estos parámetros se aplican a todas las cadenas en las Subnets especificadas. Los parámetros deben especificarse con un archivo de configuración `{subnetID}.json` bajo `--subnet-config-dir`. AvalancheGo carga las configuraciones para las Subnets especificadas en el parámetro `--track-subnets`.

La referencia completa de todas las opciones de configuración para una Subnet se puede encontrar en un documento aparte de [Configuraciones de Subnet](./subnet-configs).

#### `--subnet-config-dir` (`string`)

Especifica el directorio que contiene las configuraciones de las Subnets, como se describe anteriormente. Por defecto, es `$HOME/.avalanchego/configs/subnets`. Si se establece explícitamente la bandera, la carpeta especificada debe existir, o AvalancheGo saldrá con un error. Esta bandera se ignora si se especifica `--subnet-config-content`.

Ejemplo: Digamos que tenemos una Subnet con ID `p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6`. Podemos crear un archivo de configuración en el directorio `subnet-config-dir` por defecto en `$HOME/.avalanchego/configs/subnets/p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6.json`. Un archivo de configuración de ejemplo es:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  },
  "appGossipNonValidatorSize": 10
}
```

:::tip
Por defecto, ninguno de estos directorios y/o archivos existe. Deberá crearlos manualmente si es necesario.
:::

#### `--subnet-config-content` (string)

Como alternativa a `--subnet-config-dir`, permite especificar parámetros codificados en base64 para una Subnet.

## Versión

#### `--version` (booleano)

Si es `true`, imprime la versión y sale. Por defecto es `false`.

## Opciones Avanzadas

Las siguientes opciones pueden afectar la corrección de un nodo. Solo los usuarios avanzados deben cambiar estas opciones.

### Gossiping

#### `--consensus-app-gossip-validator-size` (uint)

Número de validadores a los que hacer gossip de un mensaje de AppGossip. Por defecto es `10`.

#### `--consensus-app-gossip-non-validator-size` (uint)

Número de no validadores a los que hacer gossip de un mensaje de AppGossip. Por defecto es `0`.

#### `--consensus-app-gossip-peer-size` (uint)

Número de pares (que pueden o no ser validadores) a los que hacer gossip de un mensaje de AppGossip. Por defecto es `0`.

#### `--consensus-accepted-frontier-gossip-validator-size` (uint)

Número de validadores a los que hacer gossip de la frontera aceptada. Por defecto es `0`.

#### `--consensus-accepted-frontier-gossip-non-validator-size` (uint)

Número de no validadores a los que hacer gossip de la frontera aceptada. Por defecto es `0`.

#### `--consensus-accepted-frontier-gossip-peer-size` (uint)

Número de pares a los que hacer gossip de la frontera aceptada. Por defecto es `15`.

#### `--consensus-accepted-frontier-gossip-frequency` (duración)

Tiempo entre gossipeos de fronteras aceptadas. Por defecto es `10s`.

#### `--consensus-on-accept-gossip-validator-size` (uint)

Número de validadores a los que hacer gossip de cada contenedor aceptado. Por defecto es `0`.

#### `--consensus-on-accept-gossip-non-validator-size` (uint)

Número de no validadores a los que hacer gossip de cada contenedor aceptado. Por defecto es `0`.

#### `--consensus-on-accept-gossip-peer-size` (uint)

Número de pares a los que hacer gossip de cada contenedor aceptado. Por defecto es `10`.

### Benchlist

#### `--benchlist-duration` (duración)

Cantidad máxima de tiempo que un par está en la lista de bench después de superar `--benchlist-fail-threshold`. Por defecto es `15m`.

#### `--benchlist-fail-threshold` (int)

Número de consultas fallidas consecutivas a un nodo antes de ponerlo en bench (asumiendo que todas las consultas a él fallarán). Por defecto es `10`.

#### `--benchlist-min-failing-duration` (duración)

Cantidad mínima de tiempo que las consultas a un par deben estar fallando antes de que el par sea puesto en bench. Por defecto es `150s`.

### Parámetros de Consenso

:::note
Algunos de estos parámetros solo se pueden establecer en una red local o privada, no en la Testnet Fuji o en Mainnet
:::

#### `--consensus-shutdown-timeout` (duración)

Tiempo de espera antes de matar una cadena no receptiva. Por defecto es `5s`.

#### `--create-asset-tx-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que crean nuevos activos. Por defecto es `10000000` nAVAX (.01 AVAX) por transacción. Esto solo se puede cambiar en una red local.

#### `--create-subnet-tx-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que crean nuevas Subnets. Por defecto es `1000000000` nAVAX (1 AVAX) por transacción. Esto solo se puede cambiar en una red local.

#### `--create-blockchain-tx-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que crean nuevas blockchains. Por defecto es `1000000000` nAVAX (1 AVAX) por transacción. Esto solo se puede cambiar en una red local.

#### `--transform-subnet-tx-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que transforman Subnets. Por defecto es `1000000000` nAVAX (1 AVAX) por transacción. Esto solo se puede cambiar en una red local.

#### `--add-primary-network-validator-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que agregan nuevos validadores de la red primaria. Por defecto es 0. Esto solo se puede cambiar en una red local.

#### `--add-primary-network-delegator-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que agregan nuevos delegadores de la red primaria. Por defecto es 0. Esto solo se puede cambiar en una red local.

#### `--add-subnet-validator-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que agregan nuevos validadores de Subnets. Por defecto es `10000000` nAVAX (.01 AVAX).

#### `--add-subnet-delegator-fee` (int)

Tarifa de transacción, en nAVAX, para transacciones que agregan nuevos delegadores de Subnets. Por defecto es `10000000` nAVAX (.01 AVAX).

#### `--min-delegator-stake` (int)

La participación mínima, en nAVAX, que se puede delegar a un validador de la Red Primaria.

Por defecto es `25000000000` (25 AVAX) en Mainnet. Por defecto es `5000000` (.005 AVAX) en Test Net. Esto solo se puede cambiar en una red local.

#### `--min-delegation-fee` (int)

La tarifa mínima de delegación que se puede cobrar por la delegación en la Red Primaria, multiplicada por `10,000`. Debe estar en el rango `[0, 1000000]`. Por defecto es `20000` (2%) en Mainnet. Esto solo se puede cambiar en una red local.

#### `--min-stake-duration` (duración)

Duración mínima de stake. El valor por defecto en Mainnet es `336h` (dos semanas). Esto solo se puede cambiar en una red local. Esto se aplica tanto a los períodos de delegación como de validación.

#### `--min-validator-stake` (int)

La participación mínima, en nAVAX, requerida para validar la Red Primaria. Esto solo se puede cambiar en una red local.

Por defecto es `2000000000000` (2,000 AVAX) en Mainnet. Por defecto es `5000000` (.005 AVAX) en Test Net.

#### `--max-stake-duration` (duración)

La duración máxima de apuesta, en horas. Por defecto es `8760h` (365 días) en Mainnet. Esto solo se puede cambiar en una red local.

#### `--max-validator-stake` (int)

La apuesta máxima, en nAVAX, que se puede colocar en un validador en la red primaria. Por defecto es `3000000000000000` (3,000,000 AVAX) en Mainnet. Esto incluye la apuesta proporcionada tanto por el validador como por los delegadores al validador. Esto solo se puede cambiar en una red local.

#### `--stake-minting-period` (duración)

Período de consumo de la función de apuesta, en horas. El valor predeterminado en Mainnet es `8760h` (365 días). Esto solo se puede cambiar en una red local.

#### `--stake-max-consumption-rate` (uint)

El porcentaje máximo de la tasa de consumo para el suministro de tokens restante en el período de acuñación, que es de 1 año en Mainnet. Por defecto es `120,000`, que es un 12% por año. Esto solo se puede cambiar en una red local.

#### `--stake-min-consumption-rate` (uint)

El porcentaje mínimo de la tasa de consumo para el suministro de tokens restante en el período de acuñación, que es de 1 año en Mainnet. Por defecto es `100,000`, que es un 10% por año. Esto solo se puede cambiar en una red local.

#### `--stake-supply-cap` (uint)

El suministro máximo de apuestas, en nAVAX, que se pueden colocar en un validador. Por defecto es `720,000,000,000,000,000` nAVAX. Esto solo se puede cambiar en una red local.

#### `--tx-fee` (int)

La cantidad requerida de nAVAX a quemar para que una transacción sea válida en la X-Chain, y para transacciones de importación/exportación en la P-Chain. Este parámetro requiere acuerdo de la red en su forma actual. Cambiar este valor desde el valor predeterminado solo debe hacerse en redes privadas o redes locales. Por defecto, son `1,000,000` nAVAX por transacción.

#### `--uptime-requirement` (float)

Fracción de tiempo que un validador debe estar en línea para recibir recompensas. Por defecto es `0.8`. Esto solo se puede cambiar en una red local.

#### `--uptime-metric-freq` (duración)

Frecuencia de renovación de la métrica de tiempo de actividad promedio de este nodo. Por defecto es `30s`.

#### Parámetros de Snow

##### `--snow-concurrent-repolls` (int)

El consenso de Snow requiere repollar transacciones que se emiten durante períodos de baja
uso de la red. Este parámetro permite definir qué tan agresivo será el cliente en
finalizar estas transacciones pendientes. Esto solo debe cambiarse después de
considerar cuidadosamente los compromisos del consenso de Snow. El valor debe ser al
menos `1` y como máximo `--snow-rogue-commit-threshold`. Por defecto es `4`.

##### `--snow-sample-size` (int)

El consenso de Snow define `k` como el número de validadores que se muestrean durante
cada encuesta de red. Este parámetro permite definir el valor `k` utilizado para
consenso. Esto solo debe cambiarse después de considerar cuidadosamente los
compromisos del consenso de Snow. El valor debe ser al menos `1`. Por defecto es `20`.

##### `--snow-quorum-size` (int)

El consenso de Snow define `alpha` como el número de validadores que deben preferir una
transacción durante cada encuesta de red para aumentar la confianza en la
transacción. Este parámetro nos permite definir el valor `alpha` utilizado para el consenso.
Esto solo debe cambiarse después de considerar cuidadosamente los compromisos del consenso de Snow. El
valor debe ser mayor que `k/2`. Por defecto es `15`.

##### `--snow-virtuous-commit-threshold` (int)

El consenso de Snow define `beta1` como el número de encuestas consecutivas en las que una
transacción virtuosa debe aumentar su confianza para que sea aceptada. Este
parámetro nos permite definir el valor `beta1` utilizado para el consenso. Esto solo debe
cambiarse después de considerar cuidadosamente los compromisos del consenso de Snow. El
valor debe ser al menos `1`. Por defecto es `15`.

##### `--snow-rogue-commit-threshold` (int)

El consenso de Snow define `beta2` como el número de encuestas consecutivas en las que una
transacción rogue debe aumentar su confianza para que sea aceptada. Este parámetro
nos permite definir el valor `beta2` utilizado para el consenso. Esto solo debe cambiarse
después de considerar cuidadosamente los compromisos del consenso de Snow. El valor debe
ser al menos `beta1`. Por defecto es `20`.

##### `--snow-optimal-processing` (int)

Número óptimo de elementos de procesamiento en el consenso. El valor debe ser al menos `1`. Por defecto es `50`.

##### `--snow-max-processing` (int)

Número máximo de elementos de procesamiento que se considerarán saludables. Informa de no saludable
si hay más de este número de elementos pendientes. El valor debe ser al menos
`1`. Por defecto es `1024`.

##### `--snow-max-time-processing` (duración)

Tiempo máximo que un elemento debe estar en proceso y aún así estar saludable.
Informa de no saludable si hay un elemento en proceso durante más tiempo que esta duración.
El valor debe ser mayor que `0`. Por defecto es `2m`.

### Parámetros de ProposerVM

#### `--proposervm-use-current-height` (bool)

Hacer que ProposerVM informe siempre la altura del último bloque aceptado en la P-chain. Por defecto es `false`.

### Perfilado continuo

Puede configurar su nodo para que ejecute continuamente perfiles de memoria/CPU y guarde los más recientes. El perfilado continuo de memoria/CPU está habilitado si se establece `--profile-continuous-enabled`.

#### `--profile-continuous-enabled` (boolean)

Si la aplicación debe producir continuamente perfiles de rendimiento. Por defecto es falso (no habilitado).

#### `--profile-dir` (string)

Si el perfilado está habilitado, el nodo ejecuta continuamente perfiles de memoria/CPU y los coloca en este directorio. Por defecto es `$HOME/.avalanchego/profiles/`.

#### `--profile-continuous-freq` (duración)

Con qué frecuencia se crea un nuevo perfil de CPU/memoria. Por defecto es `15m`.

#### `--profile-continuous-max-files` (int)

Número máximo de archivos de perfiles de CPU/memoria que se mantendrán. Por defecto son 5.

### Salud

#### `--health-check-frequency` (duración)

La frecuencia con la que se ejecuta la comprobación de salud. Por defecto es `30s`.

#### `--health-check-averager-halflife` (duración)

Vida media de los promedios utilizados en las comprobaciones de salud (para medir la tasa de fallos de mensajes, por ejemplo). Un valor más grande --&gt; cálculo de promedios menos volátil. Por defecto es `10s`.

### Red

#### `--network-allow-private-ips` (bool)

Permite que el nodo se conecte a pares con IPs privadas. Por defecto es `true`.

#### `--network-compression-type` (string)

El tipo de compresión a utilizar al enviar mensajes a los pares. Por defecto es `gzip`.
Debe ser uno de [`gzip`, `zstd`, `none`].

Los nodos pueden manejar mensajes entrantes comprimidos con `gzip`, pero por defecto envían mensajes comprimidos con `zstd`.

#### `--network-initial-timeout` (duración)

Valor de tiempo de espera inicial del administrador de tiempo de espera adaptativo. Por defecto es `5s`.

#### `--network-initial-reconnect-delay` (duración)

Duración de retraso inicial que se debe esperar antes de intentar reconectar un par. Por defecto es `1s`.

#### `--network-max-reconnect-delay` (duración)

Duración máxima de retraso que se debe esperar antes de intentar reconectar un par. Por defecto es `1h`.

#### `--network-minimum-timeout` (duración)

Valor de tiempo de espera mínimo del administrador de tiempo de espera adaptativo. Por defecto es `2s`.

#### `--network-maximum-timeout` (duración)

Valor de tiempo de espera máximo del administrador de tiempo de espera adaptativo. Por defecto es `10s`.

#### `--network-maximum-inbound-timeout` (duración)

Valor de tiempo de espera máximo de un mensaje entrante. Define la duración dentro de la cual se debe cumplir un
mensaje entrante. Los mensajes entrantes que contengan un plazo límite superior
a este valor se anularán con este valor. Por defecto es `10s`.

#### `--network-timeout-halflife` (duración)

Vida media utilizada al calcular la latencia de red promedio. Un valor más grande --&gt; menos
cálculo de latencia de red volátil. Por defecto es `5m`.

#### `--network-timeout-coefficient` (duración)

Las solicitudes a los pares expirarán después de \[`network-timeout-coefficient`\] \* \[latencia promedio de la solicitud\]. El valor predeterminado es `2`.

#### `--network-read-handshake-timeout` (duración)

Valor de tiempo de espera para leer mensajes de saludo. El valor predeterminado es `15s`.

#### `--network-ping-timeout` (duración)

Valor de tiempo de espera para Ping-Pong con un par. El valor predeterminado es `30s`.

#### `--network-ping-frequency` (duración)

Frecuencia de envío de pings a otros pares. El valor predeterminado es `22.5s`.

#### `--network-health-min-conn-peers` (uint)

El nodo informará que está en mal estado si está conectado a menos de esta cantidad de pares. El valor predeterminado es `1`.

#### `--network-health-max-time-since-msg-received` (duración)

El nodo informará que está en mal estado si no ha recibido un mensaje durante este tiempo. El valor predeterminado es `1m`.

#### `--network-health-max-time-since-msg-sent` (duración)

La capa de red informa que está en mal estado si no ha enviado un mensaje durante al menos este tiempo. El valor predeterminado es `1m`.

#### `--network-health-max-portion-send-queue-full` (float)

El nodo informará que está en mal estado si su cola de envío está más llena que esta proporción. Debe estar en \[0,1\]. El valor predeterminado es `0.9`.

#### `--network-health-max-send-fail-rate` (float)

El nodo informará que está en mal estado si falla más de esta proporción de envíos de mensajes. Debe estar en \[0,1\]. El valor predeterminado es `0.25`.

#### `--network-health-max-outstanding-request-duration` (duración)

El nodo informa que está en mal estado si ha habido una solicitud pendiente durante esta duración. El valor predeterminado es `5m`.

#### `--network-max-clock-difference` (duración)

Valor máximo de diferencia de reloj permitida entre este nodo y los pares. El valor predeterminado es `1m`.

#### `--network-require-validator-to-connect` (bool)

Si es verdadero, este nodo solo mantendrá una conexión con otro nodo si este nodo es un validador, el otro nodo es un validador o el otro nodo es un beacon.

#### `--network-tcp-proxy-enabled` (bool)

Requiere que todas las conexiones P2P se inicien con una cabecera de proxy TCP. El valor predeterminado es `false`.

#### `--network-tcp-proxy-read-timeout` (duración)

Duración máxima para esperar una cabecera de proxy TCP. El valor predeterminado es `3s`.

#### `--network-outbound-connection-timeout` (duración)

Tiempo de espera al marcar un par. El valor predeterminado es `30s`.

### Limitación de velocidad de mensajes

Estas banderas gobiernan la limitación de velocidad de los mensajes entrantes y salientes. Para obtener más información sobre la limitación de velocidad y las banderas a continuación, consulte el paquete `throttling` en AvalancheGo.

#### Basado en CPU

Limitación de velocidad basada en cuánto uso de CPU causa un par.

##### `--throttler-inbound-cpu-validator-alloc` (float)

Número de CPU asignadas para uso de validadores. El valor debe estar en el rango (0, recuento total de núcleos]. El valor predeterminado es la mitad del número de CPU en la máquina.

##### `--throttler-inbound-cpu-max-recheck-delay` (duración)

En el limitador de velocidad de CPU, verifique al menos con esta frecuencia si el uso de CPU del nodo ha disminuido a un nivel aceptable. El valor predeterminado es `5s`.

##### `--throttler-inbound-disk-max-recheck-delay` (duración)

En el limitador de velocidad de red basado en disco, verifique al menos con esta frecuencia si el uso de disco del nodo ha disminuido a un nivel aceptable. El valor predeterminado es `5s`.

##### `--throttler-inbound-cpu-max-non-validator-usage` (float)

Número de CPU que, si se utilizan por completo, limitarán la velocidad de todos los no validadores. El valor debe estar en el rango [0, recuento total de núcleos]. El valor predeterminado es el 80% del número de CPU en la máquina.

##### `--throttler-inbound-cpu-max-non-validator-node-usage` (float)

Número máximo de CPU que un no validador puede utilizar. El valor debe estar en el rango [0, recuento total de núcleos]. El valor predeterminado es el número de CPU / 8.

##### `--throttler-inbound-disk-validator-alloc` (float)

Número máximo de lecturas/escrituras de disco por segundo para asignar para uso de validadores. Debe ser > 0. El valor predeterminado es `1000 GiB/s`.

##### `--throttler-inbound-disk-max-non-validator-usage` (float)

Número de lecturas/escrituras de disco por segundo que, si se utilizan por completo, limitarán la velocidad de todos los no validadores. Debe ser >= 0. El valor predeterminado es `1000 GiB/s`.

##### `--throttler-inbound-disk-max-non-validator-node-usage` (float)

Número máximo de lecturas/escrituras de disco por segundo que un no validador puede utilizar. Debe ser >= 0. El valor predeterminado es `1000 GiB/s`.

#### Basado en ancho de banda

Limitación de velocidad basada en el ancho de banda que utiliza un par.

##### `--throttler-inbound-bandwidth-refill-rate` (uint)

Uso máximo promedio de ancho de banda entrante de un par, en bytes por segundo. Consulte la interfaz `throttling.BandwidthThrottler`. El valor predeterminado es `512`.

##### `--throttler-inbound-bandwidth-max-burst-size` (uint)

Ancho de banda entrante máximo que un nodo puede usar a la vez. Consulte la interfaz `throttling.BandwidthThrottler`. El valor predeterminado es `2 MiB`.

#### Basado en el tamaño del mensaje

Limitación de velocidad basada en el tamaño total, en bytes, de los mensajes no procesados.

##### `--throttler-inbound-at-large-alloc-size` (uint)

Tamaño, en bytes, de la asignación en grande en el limitador de velocidad de mensajes entrantes. El valor predeterminado es `6291456` (6 MiB).

##### `--throttler-inbound-validator-alloc-size` (uint)

Tamaño, en bytes, de la asignación de validador en el limitador de velocidad de mensajes entrantes. El valor predeterminado es `33554432` (32 MiB).

##### `--throttler-inbound-node-max-at-large-bytes` (uint)

Número máximo de bytes que un nodo puede tomar de la asignación en grande del limitador de velocidad de mensajes entrantes. El valor predeterminado es `2097152` (2 MiB).

#### Basado en el número de mensajes

Limitación de velocidad basada en el número de mensajes no procesados.

##### `--throttler-inbound-node-max-processing-msgs` (uint)

El nodo dejará de leer mensajes de un par cuando esté procesando esta cantidad de mensajes del par. Reanudará la lectura de mensajes del par cuando esté procesando menos de esta cantidad de mensajes. El valor predeterminado es `1024`.

#### Saliente

Limitación de velocidad para mensajes salientes.

##### `--throttler-outbound-at-large-alloc-size` (uint)

Tamaño, en bytes, de la asignación en grande en el limitador de velocidad de mensajes salientes. El valor predeterminado es `33554432` (32 MiB).

##### `--throttler-outbound-validator-alloc-size` (uint)

Tamaño, en bytes, de la asignación de validador en el limitador de velocidad de mensajes salientes. El valor predeterminado es `33554432` (32 MiB).

##### `--throttler-outbound-node-max-at-large-bytes` (uint)

Número máximo de bytes que un nodo puede tomar de la asignación en grande del limitador de velocidad de mensajes salientes. El valor predeterminado es `2097152` (2 MiB).

### Limitación de velocidad de conexión

#### `--network-inbound-connection-throttling-cooldown` (duración)

El nodo mejorará una conexión entrante desde una IP dada como máximo una vez dentro de esta duración. El valor predeterminado es `10s`. Si es 0 o negativo, no considerará la recencia de la última mejora al decidir si mejorar.

#### `--network-inbound-connection-throttling-max-conns-per-sec` (uint)

El nodo aceptará como máximo esta cantidad de conexiones entrantes por segundo. El valor predeterminado es `512`.

#### `--network-outbound-connection-throttling-rps` (uint)

El nodo realiza como máximo esta cantidad de intentos de conexión saliente por segundo. El valor predeterminado es `50`.

### Chismes de la lista de pares que hacen gossiping

Los nodos hacen gossiping de pares entre sí para que cada nodo pueda tener una lista de pares actualizada. Un nodo hace gossiping de `--network-peer-list-num-validator-ips` IPs de validadores a `--network-peer-list-validator-gossip-size` validadores, `--network-peer-list-non-validator-gossip-size` no validadores y `--network-peer-list-peers-gossip-size` pares cada `--network-peer-list-gossip-frequency`.

#### `--network-peer-list-num-validator-ips` (int)

Número de IPs de validadores para hacer gossiping a otros nodos. Por defecto: `15`.

#### `--network-peer-list-validator-gossip-size` (int)

Número de validadores a los que el nodo hará gossiping de la lista de pares. Por defecto: `20`.

#### `--network-peer-list-non-validator-gossip-size` (int)

Número de no validadores a los que el nodo hará gossiping de la lista de pares. Por defecto: `0`.

#### `--network-peer-list-peers-gossip-size` (int)

Número total de pares (incluyendo no validadores o validadores) a los que el nodo hará gossiping de la lista de pares. Por defecto: `0`.

#### `--network-peer-list-gossip-frequency` (duración)

Frecuencia para hacer gossiping de los pares a otros nodos. Por defecto: `1m`.

#### `--network-peer-read-buffer-size` (int)

Tamaño del búfer en el que se leen los mensajes de los pares (hay un búfer por cada par). Por defecto: `8` KiB (8192 bytes).

#### `--network-peer-write-buffer-size` (int)

Tamaño del búfer en el que se escriben los mensajes de los pares (hay un búfer por cada par). Por defecto: `8` KiB (8192 bytes).

### Seguimiento del uso de recursos

#### `--meter-vm-enabled` (bool)

Habilitar las VM de medición para rastrear el rendimiento de la VM con más precisión. Por defecto: `true`.

#### `--system-tracker-frequency` (duración)

Frecuencia para comprobar el uso real del sistema de los procesos rastreados. Más comprobaciones frecuentes --> métricas de uso más precisas, pero más caro de rastrear. Por defecto: `500ms`.

#### `--system-tracker-processing-halflife` (duración)

Vida media a utilizar para el rastreador de solicitudes de procesamiento. Una vida media más grande --> las métricas de uso cambian más lentamente. Por defecto: `15s`.

#### `--system-tracker-cpu-halflife` (duración)

Vida media a utilizar para el rastreador de CPU. Una vida media más grande --> las métricas de uso de la CPU cambian más lentamente. Por defecto: `15s`.

#### `--system-tracker-disk-halflife` (duración)

Vida media a utilizar para el rastreador de disco. Una vida media más grande --> las métricas de uso de disco cambian más lentamente. Por defecto: `1m`.

#### `--system-tracker-disk-required-available-space` (uint)

Número mínimo de bytes disponibles en disco, por debajo de los cuales el nodo se apagará. Por defecto: `536870912` (512 MiB).

#### `--system-tracker-disk-warning-threshold-available-space` (uint)

Umbral de advertencia para el número de bytes disponibles en disco, por debajo del cual el nodo se considerará no saludable. Debe ser >= `--system-tracker-disk-required-available-space`. Por defecto: `1073741824` (1 GiB).

### Plugins

#### `--plugin-dir` (string)

Establece el directorio para los [plugins de VM](/build/vm/intro.md). El valor por defecto es `$HOME/.avalanchego/plugins`.

### Configuraciones de Máquinas Virtuales (VM)

#### `--vm-aliases-file (string)`

Ruta del archivo JSON que define alias para IDs de Máquinas Virtuales. Por defecto: `~/.avalanchego/configs/vms/aliases.json`. Esta bandera se ignora si se especifica `--vm-aliases-file-content`. Ejemplo de contenido:

```json
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

El ejemplo anterior asigna los alias "timestampvm" y "timerpc" a la VM cuyo ID es "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH".

`--vm-aliases-file-content` (string)

Como alternativa a `--vm-aliases-file`, permite especificar los alias codificados en base64 para IDs de Máquinas Virtuales.

### Indexación

#### `--index-allow-incomplete` (boolean)

Si es verdadero, permite ejecutar el nodo de una manera que podría hacer que un índice pierda transacciones. Ignorado si el índice está desactivado. Por defecto: `false`.

### Enrutador

#### `--router-health-max-drop-rate` (float)

El nodo se reporta como no saludable si el enrutador deja caer más de esta proporción de mensajes. Por defecto: `1`.

#### `--router-health-max-outstanding-requests` (uint)

El nodo se reporta como no saludable si hay más de esta cantidad de solicitudes de consenso pendientes (Get, PullQuery, etc.) en todas las cadenas. Por defecto: `1024`.
