# Interfaz de la línea de mando

Cuando se ejecuta un nodo, hay una variedad de configuraciones posibles que se admiten.

## Config File

`--config-file` (cadena):

Config file especifica un archivo JSON para configurar un nodo en lugar de especificar argumentos a través de la línea de comandos. Los argumentos de la línea de comandos anularán cualquier opción establecida en el archivo de configuración.

Ejemplo de un archivo de configuración JSON:

```javascript
{
    "log-level": "debug"
}
```

## API

`--api-admin-enabled` (booleano):

Si se establece en `false`, este nodo no expondrá la API del Administrador. De forma predeterminada es `false`. Ve [aquí](../avalanchego-apis/admin-api.md) para más información.

`--api-auth-required` (booleano):

Si se establece en `true`, las llamadas de la API requieren un token de autorización. De forma predeterminada es `false`. Ve [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-auth-password` (cadena):

La contraseña necesaria para crear/revocar los tokens de autorización. Si es `--api-auth-required=true`, debe especificarse; de lo contrario es ignorado. Ve [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-health-enabled` (booleano):

Si se establece como `true`, este nodo expondrá la API de Salud. De forma predeterminada es `true`. Mira [aquí](../avalanchego-apis/health-api.md) para más información.

`--index-enabled` \(booleano\): <a id="index-enabled"></a>

Si es `false`, este nodo no habilitará el indexador y la API del Index no estará disponible. De forma predeterminada es `false`. Ve [aquí](../avalanchego-apis/index-api.md) para más información.

`--api-info-enabled` \(booleano\):

Si se establece en `true`, este nodo expondrá la API de Información. De forma predeterminada es `true`. Ve [aquí](../avalanchego-apis/info-api.md) para más información.

`--api-ipcs-enabled` \(booleano\):

Si se establece como `true`, este nodo expondrá la API de los IPC. De forma predeterminada es `false`. Ve [aquí](../avalanchego-apis/ipc-api.md) para más información.

`--api-keystore-enabled` \(booleano\):

Si se establece en `false`, este nodo no expondrá la API del Repositorio de claves. De forma predeterminada es `true`. Ve [aquí](../avalanchego-apis/keystore-api.md) para más información.

`--api-metrics-enabled` \(booleano\):

Si se establece en `false`, este nodo no expondrá la API de Métricas. De forma predeterminada es `true`. Ve [aquí](../avalanchego-apis/metrics-api.md) para más información.

## Assertions

`--assertions-enabled` \(booleano\):

Cuando se establece en `true`, las aserciones se ejecutarán en el tiempo de ejecución en toda la base del código. Esto está pensado para su uso en la depuración, ya que podemos obtener un mensaje de error más específico. De forma predeterminada es `true`.

## Bootstrapping

`--bootstrap-beacon-connection-timeout` \(duración\):

Tiempo de espera cuando intenta conectarse a las balizas de arranque. De forma predeterminada es `1m`.

`--bootstrap-ids` \(cadena\):

Las ID de Bootstrap son una serie de ID de validador. Estas identificaciones se usarán para autenticar a los compañeros de bootstrap. Un ejemplo de configuración de este campo sería `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. Por defecto está vacío \(no intenta arrancar desde otros nodos.\)

`--bootstrap-ips` \(cadena\):

Bootstrap IPs es un array de pares de puertos IPv4. Estas direcciones IP se usarán para arrancar el estado actual de Avalanche. Un ejemplo de configuración de este campo sería `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. Por defecto está vacío \(no intenta arrancar desde otros nodos.\)

`--bootstrap-retry-enabled` \(booleano\):

Si es verdadero, reintentará el bootstrapping si falla.

`--bootstrap-retry-max-attempts` \(uint\):

Máximas veces que reintentará el bootstrapping después de cada falla.

## Database

`--db-dir` \(cadena, ruta de archivos\):

Especifica el directorio en el que se encuentra la base de datos. De forma predeterminada es `"$HOME/.avalanchego/db"`.

`--db-type` \(cadena\):

Especifica el tipo de base de datos a utilizar. Debe ser uno de `leveldb`, `rocksdb`, `memdb`. `memdb` es una base de datos no persistente almacenada en la memoria física.

Hay que tener en cuenta que, cuando se ejecuta con `leveldb`, el nodo no puede leer datos que persistieron cuando se ejecutó con `rocksdb` y viceversa.

**Dos notas importantes sobre RocksDB**: primero, RocksDB no funciona en todas las computadoras. En segundo lugar, RocksDB no está construido de forma predeterminada y no se incluye en los binarios difundidos públicamente. Para compilar AvalancheGo con RocksDB, ejecuta `export ROCKSDBALLOWED=1` en tu terminal y luego `scripts/build.sh`. Debes hacer esto antes de poder usar `--db-type=rocksdb`.

## Génesis

`--genesis` \(cadena\):

Ruta a un archivo JSON que contiene los datos génesis a utilizar. Ignorado cuando se ejecutan las redes estándar \(Mainnet, Testnet\). De no suministrarse, utiliza datos génesis predeterminados. [Aquí](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16) encuentras un ejemplo de una representación JSON de los datos génesis.

## HTTP Server

`--http-host` \(cadena\):

La dirección en la que escuchan las APIs HTTP. De forma predeterminada es `127.0.0.1`. Esto significa que por defecto, tu nodo sólo puede manejar llamados a la API hechos desde la misma máquina. Para permitir llamadas de la API de otras máquinas, se debe usar `--http-host=`. También se pueden introducir los nombres de los dominios como parámetro .

`--http-port` \(int\):

Cada nodo ejecuta un servidor HTTP que proporciona las API para interactuar con el nodo y la red de Avalanche. Este argumento especifica el puerto en el que el servidor HTTP escuchará. El valor predeterminado es `9650`.

`--http-tls-cert-file` \(cadena, ruta de archivos\):

Este argumento especifica la ubicación del certificado TLS utilizado por el nodo para el servidor HTTPS. Esto debe especificarse cuando `--http-tls-enabled=true`. No hay un valor por defecto.

`--http-tls-enabled` \(booleano\):

Si se establece en `true`, este indicador intentará actualizar el servidor para que use HTTPS. De forma predeterminada es `false`.

`--http-tls-key-file` \(cadena, ruta de archivos\):

Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo para el servidor HTTPS. Esto debe especificarse cuando `--http-tls-enabled=true`. No hay un valor por defecto.

## IPCS

`--ipcs-chain-ids` \(cadena\)

Lista separada por comas de las ID de cadena a la cual conectarse \(por ejemplo, `11111111111111111111111111111111LpoYY,4R5p2RXDGLqaifZE4hHWH9owe34pfoBULn1DrQTWivjg8o4aH`\). No hay un valor por defecto.

`--ipcs-path` \(cadena\)

El directorio \(Unix\) o el prefijo del nombre de la canalización \(Windows\) para los sockets IPC. Por defecto es /tmp.

## File Descriptor Limit

`--fd-limit` \(int\)

Intenta aumentar el límite del descriptor del archivo de proceso hasta al menos este valor. De forma predertminada es `32768`

## Logging

`--log-level` \(cadena, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

El nivel de registro determina qué eventos registrar. Hay 7 niveles diferentes, en orden de prioridad de mayor a menor.

* `Off`: ningún registro llega a este nivel al registrar.
* `Fatal`: : errores fatales que no son recuperables.
* `Error`: errores que encuentra el nodo; estos errores pudieron ser recuperados.
* `Warn`: una advertencia que puede indicar un nodo bizantino falso o un error futuro potencial.
* `Info`: descripciones útiles de las actualizaciones del estado de los nodos.
* `Debug`: el registro de la depuración es útil cuando se intenta comprender posibles fallas en el código. Se mostrará más información de la que sería típicamente deseada para un uso normal.
* `Verbo`: rastrea grandes cantidades de información que el nodo está procesando. Esto incluye el contenido de los mensajes y los volcados binarios de datos para el análisis del protocolo de nivel extremadamente bajo.

Cuando se especifica un nivel de registro, hay que tener en cuenta que todos los registros con la prioridad especificada o superior serán rastreados. De forma predeterminada es `Info`.

`--log-display-level` \(cadena, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

El nivel de registro determina qué eventos se muestran en la pantalla. Si se deja en blanco, se predeterminará el valor proporcionado a `--log-level`.

`--log-display-highlight` \(cadena, `{auto, plain, colors}`\):

Colorear o resaltar los registros de la pantalla. Resalta por defecto cuando la salida es un terminal. De lo contrario, debería ser uno de los `{auto, plain, colors}`

`--log-dir` \(cadena, ruta de archivos\):

Especifica el directorio en el que se guardan los registros del sistema. De forma predeterminada es `"$HOME/.avalanchego/logs"`.

## Network ID

`--network-id` \(cadena\):

La identidad de la red a la que el nodo debe conectarse. Puede ser una de:

* `--network-id=mainnet` -> Conecta a la red principal \(por defecto\).
* `--network-id=fuji` -> Conecta a la red de pruebas Fuji.
* `--network-id=testnet` -> Conecta a la red de pruebas actual. \(Actualmente es Fuji.\)
* `--network-id=local` -> Conecta a una red de pruebas local.
* `--network-id=network-{id}` -> Conecta a la red con la identificación dada. `id` debe estar en el rango de `[0, 2^32)`.

## Public IP

`--public-ip` \(cadena\):

Los validadores deben conocer sus direcciones IP públicas para que puedan hacer saber a otros nodos cómo conectarse a ellos. Si no se proporciona este argumento, el nodo intentará realizar un recorrido NAT para obtener la IP pública del nodo. Debe establecerse en `127.0.0.1` para crear una red local. Si no se establece, intenta aprender la IP usando un recorrido NAT.

`--dynamic-public-ip` \(cadena\):

Valores válidos si el parámetro está presente: `opendns`, `ifconfigco` o `ifconfigme`. Esto anula `--public-ip`. Si se configura, sondeará el servicio remoto cada `--dynamic-update-duration` y actualizará la dirección IP pública del nodo.

`--dynamic-update-duration` \(duración\):

El tiempo entre los eventos del sondeo para `--dynamic-public-ip` o el recorrido del NAT. El mínimo recomendado es de 1 minuto. De forma predeterminada es `5m`.

## Signature Verification

`--signature-verification-enabled` \(booleano\):

Permite la verificación de la firma. Cuando se configura como `false`, las firmas no se verificarán en máquinas virtuales que permiten desactivarlas. De forma predeterminada es `true`.

## Staking

`--staking-port` \(cadena\):

El puerto a través del cual el servidor de stake se conectará a la red de Avalanche externamente. De forma predeterminada es `9651`.

`--staking-enabled` \(booleano\):

Avalanche usa Proof of Stake \(PoS\) como resistencia de Sybil para que sea prohibitivo atacar la red. Si es falso, la resistencia ante Sybil se desactiva y todos los pares serán muestreados durante el consenso. De forma predeterminada es `true`.

Establecer este indicador en `false` **no** significa "este nodo no es un validador".
 Significa que este nodo muestreará todos los nodos, no solo los validadores.
** No se debe establecer este indicador en falso a menos que el usuario entienda lo que está haciendo.**

`--staking-tls-cert-file` \(cadena, ruta de archivos\):

Avalanche utiliza conexiones TLS autenticadas de dos vías para conectar de forma segura los nodos. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. De forma predeterminada, el nodo espera que el certificado TLS esté en `$HOME/.avalanchego/staking/staker.crt`.

`--staking-tls-key-file` \(cadena, ruta de archivos\):

Avalanche utiliza conexiones TLS autenticadas de dos vías para conectar de forma segura los nodos. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. De forma predeterminada, el nodo espera que la clave privada TLS esté en `$HOME/.avalanchego/staking/staker.key`.

`--staking-disabled-weight` \(int\):

El peso que se debe proporcionar a cada compañero cuando el staking está desactivado. De forma predeterminada es `1`.

## Version

`--version` \(booleano\)

Si es `true`, imprime la versión y cierra. De forma predeterminada es `false`.

## Advanced Options

Las siguientes opciones afectan a la corrección de la plataforma. Es posible que sea necesario cambiarlas en toda la red y, por consiguiente, un usuario ordinario no debería cambiarlas de las que están predeterminadas.

### Aplicación de Gossiping

`--consensus-app-gossip-non-validator-size` \(uint\):

Número de pares \(que pueden ser validadores o no\) a los cuales se les transmite un mensaje de la AppGossip. De forma predeterminada es `0`.

`--consensus-app-gossip-validator-size` \(uint\):

Número de validadores a los que se les debe transmitir un mensaje de la AppGossip. De forma predeterminada es `6`.

### Benchlist

`--benchlist-duration` \(duración\):

Cantidad de tiempo máxima que un par se pone en lista de espera después de superar `--benchlist-fail-threshold`. De forma predeterminada es `15m`.

`--benchlist-fail-threshold` \(int\):

Número de consultas fallidas consecutivas a un nodo antes de ponerlo en el banco \(asumiendo que todas las consultas fallarán\). De forma predeterminada es `10`.

`--benchlist-peer-summary-enabled` \(booleano\):

Permite una métrica de latencia de consulta específica de los pares. De forma predeterminada es `false`.

`--benchlist-min-failing-duration` \(duración\):

Cantidad mínima de tiempo que las consultas a un par deben estar fallando antes de que el par sea puesto en espera \(benched\). De forma predeterminada es `150s`.

### Construir el directorio

`--build-dir` \(cadena\):

Especifica dónde encontrar binarios de AvalancheGo y de plugins. Establece de forma predeterminada la ruta del binario de AvalancheGo ejecutado. La estructura de este directorio debe ser la siguiente:

```text
build-dir
|_avalanchego
    |_plugins
      |_evm
```

### Configuraciones de la cadena

Algunas cadenas permiten que el operador del nodo dé una configuración personalizada. AvalancheGo puede leer las configuraciones de la cadena desde los archivos y pasarlas a las cadenas correspondientes en la inicialización.

AvalancheGo busca estos archivos en el directorio especificado por `--chain-config-dir`. Este directorio puede tener subdirectorios cuyos nombres son identificaciones de la cadena o alias de la cadena. Cada subdirectorio contiene la configuración de la cadena especificada en el nombre del directorio. Cada subdirectorio debe contener un archivo llamado `config`, cuyo valor es aprobado cuando la cadena correspondiente es inicializada. Por ejemplo, la configuración de la C-Chain debería ser la siguiente: `[chain-config-dir-goes-here]/C/config.json`.

La extensión que deberían tener estos archivos y su contenido depende de la VM. Por ejemplo, algunas cadenas pueden esperar `config.txt` mientras otras esperan `config.json`. Si a varios archivos se les da el mismo nombre pero diferentes extensiones \(por ejemplo, `config.json` y `config.txt`\) en el mismo subdirectorio, AvalancheGo saldrá con un error.

Para una cadena determinada, AvalancheGo buscará primero un subdirectorio de configuración cuyo nombre sea la identificación de la cadena. Si no se encuentra, busca un subdirectorio de configuración cuyo nombre sea el alias primario de la cadena. Si no se encuentra, busca un subdirectorio de configuración cuyo nombre sea otro alias para la cadena. Todos los nombres de las carpetas y de los archivos distinguen mayúsculas y minúsculas.

No se requiere proporcionar estas configuraciones personalizadas. Si no se proporcionan, se usará una configuración específica de la VM de forma predeterminada.

`--chain-config-dir` \(cadena\):

Especifica el directorio que contiene las configuraciones de la cadena, como ya se describió. De forma predeterminada es `$HOME/.avalanchego/configs/chains`. Si esta marca no se proporciona y no existe un directorio predeterminado, AvalancheGo no saldrá, ya que las configuraciones personalizadas son opcionales. Sin embargo, si el indicador está configurado, la carpeta especificada debe existir o AvalancheGo saldrá con un error.

#### Configuración de la C-Chain

Para especificar una configuración para la C-Chain, se debe colocar un archivo de configuración JSON en `{chain-config-dir}/C/config.json` \(u otra ubicación válida, como ya se indicó\).

Por ejemplo, si `chain-config-dir` tiene el valor por defecto, `config.json` puede ser ubicado en `$HOME/.avalanchego/configs/chains/C/config.json`.

Las opciones de configuración de la C-Chain descritas a continuación.

La configuración de la C-Chain por defecto es:

```json
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
  "allow-unfinalized-queries": false,
  "log-level": "info"
}
```

Los valores por defecto son anulados solo si se especifica en la configuración dada.

**APIs**

`snowman-api-enabled` \(booleano\):

Activa la API de Snowman. Por defecto es false.

`coreth-admin-api-enabled` \(booleano\):

Activa la API de Administración. Por defecto es false.

`net-api-enabled` \(booleano\):

Activa la API de `net_*`. Por defecto es true.

`eth-api-enabled` \(booleano\):

Activa la API de `eth_*`. Por defecto es true.

`personal-api-enabled` \(booleano\):

Activa la API de `personal_*`. Por defecto es false.

`tx-pool-api-enabled` \(booleano\):

Activa la API de `txpool_*`. Por defecto es false.

`debug-api-enabled` \(booleano\):

Activa la API de `debug_*`. Por defecto es false.

`web3-api-enabled` \(booleano\):

Activa la API de `web3_*`. Por defecto es true.

**API Gas/Límites del costo**

`rpc-gas-cap` \(int\):

El máximo de gas que será consumido por una llamada de RPC \(utilizada en `eth_estimateGas`\), medidos en nAVAX \(GWei\). De forma predeterminada es 2 500 000 000.

`rpc-tx-fee-cap` \(int\):

Límite \(medida en AVAX\) de la tarifa de transacción global \(precio \* gaslimit\) para las variantes de transacciones de envío. De forma predeterminada es 100.

**Depuración de la base de datos**

`pruning-enabled`\(booleano\):

Si es verdadero, se habilitará la depuración de los datos históricos obsoletos en la base de datos. Debe desactivarse para los nodos que necesitan acceso a todos los datos en las raíces históricas. La depuración se hará solo para nuevos datos. De forma predeterminada es `false` en la v1.4.9 y `true` en las versiones posteriores.

**Nivel de registro**

`log-level` \(cadena\):

Define el nivel de registro. Debe ser uno de `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"crit"`. De forma predeterminada es `"debug"`.

**Configuración del almacenamiento de llaves **

`keystore-directory` \(cadena\):

El directorio que contiene las claves privadas. Se puede dar como ruta relativa. Si está vacío, utiliza un directorio temporal en `coreth-keystore`. El valor predeterminado es la cadena vacía.

`keystore-external-signer` \(cadena\):

Especifica una URI externa para un firmante de tipo clef. El valor predeterminado es la cadena vacía \(no está habilitado\).

`keystore-insecure-unlock-allowed`\(bool\):

Si es verdadero, permite a los usuarios desbloquear las cuentas en el entorno HTTP inseguro. Por defecto es false.

**Otras configuraciones**

`local-txs-enabled` \(booleano\):

Permite el manejo de las transacciones locales. Por defecto es false.

`api-max-duration` \(duración\):

Duración máxima de la llamada de la API. Si las llamadas de la API superan esta duración, caducarán. El valor predeterminado es 0 \(no hay máximo\).

`api-max-blocks-per-request` \(int\):

Número máximo de bloques a cubrir por petición `getLogs`. El valor predeterminado es 0 \(no hay máximo\).

`allow-unfinalized-queries` \(booleano\):

Permite consultas para bloques/transacciones que no se han completado \(todavía no se han aceptado\). Por defecto es false.

#### Configuración de la X-Chain

Para especificar una configuración para la X-Chain, se debe colocar un archivo de configuración JSON en `{chain-config-dir}/X/config.json` \(u otra ubicación válida, como ya se indicó\).

Por ejemplo, si `chain-config-dir` tiene el valor por defecto, `config.json` puede ser ubicado en `$HOME/.avalanchego/configs/chains/X/config.json`.

Permite especificar una configuración que se va a pasar a la X-Chain. Los valores predeterminados para esta configuración son:

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Los valores predeterminados se anulan solo si se especifica explícitamente en la configuración.

Los parámetros son los siguientes:

**Indexación de la transacción**

`index-transactions` \(booleano\):

Habilita la indexación de las transacciones de la AVM si se establece en `true`. El valor predeterminado es `false`. Cuando se establece en `true`, las transacciones de la AVM son indexadas contra los `address` y `assetID` involucrados. Estos datos están disponibles mediante la `avm.getAddressTxs` [API](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api).

Hay que tener en cuenta que si `index-transactions` se configura como verdadero, siempre debe ser configurado como verdadero durante el tiempo de vida del nodo. Si se configura como `false` después de haber sido configurado como `true`, el nodo se negará a inciar a menos que `index-allow-incomplete` también se configure como `true` \(ver a continuación\).

`index-allow-incomplete` \(booleano\):

Permite índices incompletos. El valor predeterminado es `false`.

Este valor de configuración es ignorado si no hay datos indexados de la X-Chain en el DB y `index-transactions` está configurado como `false`.

### Parámetros de consenso

`--consensus-gossip-frequency` \(duración\):

Tiempo entre rumores de fronteras aceptadas. De forma predeterminada es `10s`.

`--consensus-shutdown-timeout` \(duración\):

Tiempo de espera antes de eliminar una cadena que no responde. De forma predeterminada es `5s`.

`--creation-tx-fee` \(int\):

Cuota de transacción, en nAVAX, para las transacciones que crean un nuevo estado. El valor predeterminado es `1000000` nAVAX \(0,001 AVAX\) por transacción.

`--min-delegator-stake` \(int\):

El stake mínimo, en nAVAX, que puede ser delegado a un validador de la Red Primaria.

Por defecto es `25000000000` \(25 AVAX\) en la red principal. El valor predeterminado es `5000000` \(0,005 AVAX\) en la red de pruebas.

`--min-delegation-fee` \(int\):

La tarifa mínima de delegación se puede cobrar por delegación en la red primaria, multiplicada por `10,000`. Debe estar en el rango `[0, 1000000]`. Por defecto es `20000` \(2%\) en la red principal.

`--min-stake-duration` \(duración\):

Duración mínima de la participación. Por defecto en la red principal es `336h` \(dos semanas\).

`--min-validator-stake` \(int\):

La participación mínima, en nAVAX, requerida para validar la Red Primaria.

Por defecto es `2000000000000` \(2 000 AVAX\) en la red principal. El valor predeterminado es `5000000` \(0.005 AVAX\) en la red de pruebas.

`--max-stake-duration` \(duración\):

La duración máxima de la participación, en segundos. Por defecto es `8760h` \(365 días\) en la red principal.

`--max-validator-stake` \(int\):s

El Stake máximo, en nAVAX, que se puede colocar en un validador de la red primaria. Por defecto es `3000000000000000` \(3 000 000 AVAX\) en la red principal. Esto incluye la participación proporcionada tanto por el validador como por los delegadores del validador.

`--stake-minting-period` \(duración\):

Período de consumo de la función de stake, en horas. Por defecto en la red principal es `8760h` \(365 días\).

`--tx-fee` \(int\):

La cantidad necesaria de nAVAX que se quemarán para que una transacción sea válida en la X-Chain, y para las transacciones de importación o exportación en la P-Chain. Este parámetro exige acuerdo en la red en su forma actual. El cambio de este valor con respecto al valor predeterminado solo debe hacerse en redes privadas. El valor predeterminado es `1,000,000` nAVAX por transacción.

`--uptime-requirement` \(float\):

Fracción de tiempo que un validador debe estar en línea para recibir las recompensas. De forma predeterminada es `0.8`.

#### Parámetros de Snow

`--snow-avalanche-batch-size` \(int\):

Las implementaciones DAG del consenso de Snow definen `b` como el número de transacciones que un vértice debe incluir. Teóricamente, aumentar `b` aumentará el rendimiento al incrementarse la latencia. El nodo esperará como máximo 1 segundo para recoger un lote, y luego emitirá el lote completo de una vez. El valor debe ser al menos `1`. De forma predeterminada es `30`.

`--snow-avalanche-num-parents` \(int\):

Las implementaciones DAG del consenso de Snow definen `p` como el número de matrices que un vértice debe incluir. El aumento de `p` mejorará la amortización de las consultas en la red. Sin embargo, al aumentar la conectividad del gráfico, se incrementa la complejidad de los recorridos del gráfico. El valor debe ser al menos `2`. De forma predeterminada es `5`.

`--snow-concurrent-repolls` \(int\):

El consenso Snow requiere que se repitan las transacciones que se emiten durante el período de baja utilización de la red. Este parámetro permite definir cuán agresivo será el cliente para finalizar estas transacciones pendientes. Esto solo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos `1` y máximo `--snow-rogue-commit-threshold`. De forma predeterminada es `4`.

`--snow-sample-size` \(int\):

El consenso de Snow define `k` como el número de validadores que son muestreados durante cada sondeo de la red. Este parámetro nos permite definir el valor `k` utilizado para el consenso. Esto solo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos `1`. De forma predeterminada es `20`.

`--snow-quorum-size` \(int\):

El consenso de Snow define `alpha` como el número de validadores que deben preferir una transacción durante cada sondeo de la red para aumentar la confianza en la transacción. Este parámetro nos permite definir el valor `alpha` utilizado para el consenso. Esto solo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser mayor que `k/2`. De forma predeterminada es `14`.

`--snow-virtuous-commit-threshold` \(int\):

El consenso de Snow define `beta1` como el número de sondeos consecutivos en que una transacción virtuosa debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el valor `beta1` utilizado para el consenso. Esto solo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos `1`. De forma predeterminada es `15`.

`--snow-rogue-commit-threshold` \(int\):

El consenso de Snow define `beta2` como el número de sondeos consecutivos que una transacción fraudulenta debe aumentar su confianza para ser aceptada. Este parámetro nos permite definir el valor `beta2` utilizado para el consenso. Esto solo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos `beta1`. De forma predeterminada es `30`.

### Caracterización continua

Se puede configurar el nodo para que ejecute continuamente los perfiles de la memoria/CPU y guarde los más recientes. El perfilado continuo de la memoria/CPU se habilita si `--profile-continuous-enabled`está configurado.

`--profile-continuous-enabled` \(booleano\):

Si la aplicación debe producir continuamente los perfiles de rendimiento. El valor predeterminado es falso \(no está habilitado\).

`--profile-dir` \(cadena\):

Si se habilita la caracterización, el nodo ejecuta continuamente los perfiles de la memoria/CPU y los pone en este directorio. El valor predeterminado es `$HOME/.avalanchego/profiles/`.

`--profile-continuous-freq` \(duración\):

Con qué frecuencia se crea un nuevo perfil de memoria/CPU. De forma predeterminada es `15m`.

`--profile-continuous-max-files` \(int\):

Número máximo de archivos de perfiles de memoria/CPU a conservar. El valor por defecto es 5.

### Configuración de la base de datos

`--db-config-file` \(cadena\):

Ruta al archivo de configuración de la base de datos.

#### Configuración de LevelDB

Un archivo de configuración de LevelDB debe ser JSON y puede tener estas claves. Cualquier clave no dada recibirá el valor por defecto.

```
{
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockCacheCapacity": int
	// BlockSize is the minimum uncompressed size in bytes of each 'sorted
	// table' block.
	"blockSize": int
	// CompactionExpandLimitFactor limits compaction size after expanded.  This
	// will be multiplied by table size limit at compaction target level.
	"compactionExpandLimitFactor": int
	// CompactionGPOverlapsFactor limits overlaps in grandparent (Level + 2)
	// that a single 'sorted table' generates.  This will be multiplied by
	// table size limit at grandparent level.
	"compactionGPOverlapsFactor": int
	// CompactionL0Trigger defines number of 'sorted table' at level-0 that will
	// trigger compaction.
	"compactionL0Trigger": int
	// CompactionSourceLimitFactor limits compaction source size. This doesn't
	// apply to level-0.  This will be multiplied by table size limit at
	// compaction target level.
	"compactionSourceLimitFactor": int
	// CompactionTableSize limits size of 'sorted table' that compaction
	// generates.  The limits for each level will be calculated as:
	//   CompactionTableSize * (CompactionTableSizeMultiplier ^ Level)
	// The multiplier for each level can also fine-tuned using
	// CompactionTableSizeMultiplierPerLevel.
	"compactionTableSize": int
	// CompactionTableSizeMultiplier defines multiplier for CompactionTableSize.
	"compactionTableSizeMultiplier": float
	"compactionTableSizeMultiplierPerLevel": []float
	// CompactionTotalSizeMultiplier defines multiplier for CompactionTotalSize.
	"compactionTotalSizeMultiplier": float64
	// OpenFilesCacheCapacity defines the capacity of the open files caching.
	"openFilesCacheCapacity": int
	// There are two buffers of size WriteBuffer used.
	"writeBuffer": int
	"filterBitsPerKey": int
}
```

#### Archivo de configuración de RocksDB

La configuración personalizada todavía no es compatible con RocksDB.

### Health

`--health-check-frequency` \(duración\):

Las revisiones de estado se ejecutan con esta frecuencia. De forma predeterminada es `30s`.

`--health-check-averager-halflife` \(duración\):

Vida media de los promediadores utilizados en las verificaciones de estado \(para medir la tasa de fallos de mensajes, por ejemplo\). Valor superior --> cálculo menos volátil de los promedios. De forma predeterminada es `10s`.

### Red \(Network\)

`--network-allow-private-ips`\(bool\):

Permite que el nodo conecte a los pares con las IP privadas. De forma predeterminada es `true`.

`--network-compression-enabled`\(bool\):

Si es verdadero, comprime ciertos mensajes enviados a los pares para reducir el uso de ancho de banda.

`--network-initial-timeout` \(duración\):

Valor de tiempo de espera inicial del administrador de tiempo de espera adaptable, en nanosegundos. De forma predeterminada es `5s`.

`--network-initial-reconnect-delay` \(duración\):

Se debe esperar que pase la duración de la demora inicial antes de intentar volver a conectar un par. De forma predeterminada es `1s`.

`--network-max-reconnect-delay` \(duración\):

Se debe esperar que termine la duración máxima de la demora antes de intentar volver a conectar un par. De forma predeterminada es `1h`.

`--network-minimum-timeout` \(duración\):

Valor mínimo de tiempo de espera del gestor de tiempo de espera adaptativo, en nanosegundos. De forma predeterminada es `2s`.

`--network-maximum-timeout` \(duración\):

Valor máximo de tiempo de espera del administrador de tiempo de espera adaptable, en nanosegundos. De forma predeterminada es `10s`.

`--network-timeout-halflife` \(duración\):

Vida media utilizada para calcular el promedio de la latencia en la red. Valor mayor --> menos volatilidad en el cálculo de la latencia de la red. De forma predeterminada es `5m`.

`--network-timeout-coefficient` \(duración\):

Las peticiones a los pares caducarán después de [`network-timeout-coefficient`] \* [latencia promedio de petición]. De forma predeterminada es `2`.

`--network-get-version-timeout` \(duración\):

Tiempo muerto para esperar la respuesta de GetVersion de los pares en Handshake De forma predeterminada es `10s`.

`--network-read-handshake-timeout` \(duración\):

Valor del tiempo muerto de espera para leer los mensajes de Handshake. De forma predeterminada es `15s`.

`--network-ping-timeout` \(duración\):

Valor para el tiempo fuera durante Ping-Pong con un par De forma predeterminada es `30s`.

`--network-ping-frequency` \(duración\):

Frecuencia de comprobación de disponibilidad de recursos de otros pares. De forma predeterminada es `22.5s`.

`--network-health-min-conn-peers` \(uint\):

El nodo informará que no está saludable si está conectado a menos de este número de pares. De forma predeterminada es `1`.

`--network-health-max-time-since-msg-received` \(duración\):

El nodo informará que no está sano si no ha recibido un mensaje para esta cantidad de tiempo. De forma predeterminada es `1m`.

`--network-health-max-time-since-no-requests` \(duración\):

El nodo informará que no está sano si no ha recibido un mensaje para esta cantidad de tiempo. De forma predeterminada es `1m`.

`--network-health-max-portion-send-queue-full` \(float\):

El nodo informará que no está saludable si su cola de envíos está más llena que esta proporción. Debe estar en [0,1]. De forma predeterminada es `0.9`.

`--network-health-max-send-fail-rate` \(float\):

El nodo informará que no está en buen estado si falla más de esta proporción de los envíos de mensajes. Debe estar en [0,1]. De forma predeterminada es `0.25`.

`--network-max-clock-difference` \(duración\):

Máxima diferencia permitida entre relojes entre este nodo y los pares. De forma predeterminada es `1m`.

`--network-require-validator-to-connect`\(bool\):

Si es verdadero, este nodo solo mantendrá una conexión con otro nodo si este nodo es un validador, el otro nodo es un validador o el otro nodo es una baliza \(beacon\).

`--outbound-connection-timeout` \(duración\):

Tiempo fuera mientras se llama a un par.

#### Límite de la tasa de mensajes

Estos indicadores rigen la limitación de las tasas de mensajes entrantes y salientes. Para más información sobre la limitación de las tasas y los siguientes indicadores, se puede consultar el paquete `throttling` en AvalancheGo.

`--throttler-inbound-at-large-alloc-size` \(uint\):

Tamaño en bytes de la asignación general en el regulador de mensajes entrantes. Por defecto es `6291456` \(6 MiB\).

`--throttler-inbound-validator-alloc-size` \(uint\):

Tamaño en bytes de la asignación de validadores en el regulador de mensajes entrantes. Por defecto es `33554432` \(32 MiB\).

`--throttler-inbound-node-max-at-large-bytes` \(uint\):

Número máximo de bytes que un nodo puede tomar de la asignación general del regulador de mensajes entrantes. De forma predeterminada es `2097152` \(2 MiB\).

`--throttler-inbound-node-max-processing-msgs` \(uint\):

El nodo dejará de leer mensajes de un par cuando esté procesando esta cantidad de mensajes del par. Retomará la lectura de mensajes del par cuando esté procesando menos de este número de mensajes. De forma predeterminada es `1024`.

`--throttler-outbound-at-large-alloc-size` \(uint\):

Tamaño en bytes de la asignación general en el regulador de mensajes salientes. Por defecto es `6291456` \(6 MiB\).

`--throttler-outbound-validator-alloc-size` \(uint\):

Tamaño en bytes de la asignación de validadores en el regulador de mensajes salientes. Por defecto es `33554432` \(32 MiB\).

`--throttler-outbound-node-max-at-large-bytes` \(uint\):

Número máximo de bytes que un nodo puede tomar de la asignación general del regulador de mensajes salientes. De forma predeterminada es `2097152` \(2 MiB\).
#### Límite de la tasa de conexión

`--inbound-connection-throttling-cooldown` \(duración\):

El nodo actualizará una conexión entrante de una IP dada a lo sumo una vez dentro de esta duración. De forma predeterminada es `10s`. Si es 0 o negativo, no considerará lo reciente que fue la última actualización para decidir si actualizar.

`--inbound-connection-throttling-max-conns-per-sec` \(uint\):

El nodo aceptará como máximo esta cantidad de conexiones entrantes por segundo. De forma predeterminada es `512`.

`--inbound-connection-throttling-max-recent` \(uint\):

Obsoleta. Ignorado a partir de AvalancheGo v1.6.0.

`--outbound-connection-throttling-rps` \(uint\):

El nodo hace a lo sumo esta cantidad de intentos de conexión entre pares salientes por segundo. De forma predeterminada es `50`.

#### Gossiping en la lista de pares

Los nodos le envían información \(gossip\) a los pares para que cada nodo pueda tener una lista de pares actualizada a la fecha. Un nodo le envía información `--network-peer-list-size` a los pares para `--network-peer-list-gossip-size` de sus pares cada `--network-peer-list-gossip-frequency`.

`--network-peer-list-gossip-frequency` \(duración\):

De forma predeterminada es `1m`.

`--network-peer-list-gossip-size` \(int\):

De forma predeterminada es `50`.

`--network-peer-list-size` \(int\):

De forma predeterminada es `20`.

`--network-peer-list-staker-gossip-fraction` \(uint\):

1 de cada `network-peer-list-staker-gossip-fraction` mensajes de la lista de pares transmitidos será enviado a un validador.

De forma predeterminada es `2`.

### Modo de Plugin

`--plugin-mode-enabled`\(bool\):

Si es verdadero, ejecuta el nodo como un [plugin.](https://github.com/hashicorp/go-plugin) De forma predeterminada es `false`.

### Subredes

#### Whitelist

`--whitelisted-subnets` \(cadena\):

Lista separada por comas de subnets que este nodo validaría si se añadiera. Por defecto está vacía \(solo valida la red primaria\).

#### Configuraciones de la subred

Es posible dar parámetros para las subredes. Aquí los parámetros se aplican a todas las cadenas de las subredes especificadas. Los parámetros deben especificarse con un `{subnetID}.json` archivo de configuración bajo `--subnet-config-dir`. Configuraciones de las cargas de AvalancheGo para las subredes especificadas en el parámetro `--whitelisted-subnet`.

`--subnet-config-dir` \(cadena\):

Especifica el directorio que contiene la configuración de la subred descrito anteriormente. De forma predeterminada es `$HOME/.avalanchego/configs/subnets`. Si la indicación se establece explícitamente, la carpeta especificada debe existir o AvalancheGo saldrá con un error.

Por ejemplo, digamos que tenemos una subred con el ID `p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6`. Podemos crear un archivo de configuración bajo  `subnet-config-dir` de forma predeterminada en `$HOME/.avalanchego/configs/subnets/p4jUwqZsA2LuSftroCd3zb4ytH8W99oXKuKVZdsty7eQ3rXD6.json`. Un ejemplo de archivo de configuración es:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  }
}
```

**Solo el validador**

`validatorOnly`\(bool\):

Si `true`, este nodo no expone contenido de la blockchain de la subred a no validadores mediante mensajes P2P. De forma predeterminada es `false`. [Aquí](../platform/create-a-subnet.md#private-subnets) se encuentra más información.

**Parámetros de consenso**

La configuración de la subred admite la carga de nuevos parámetros de consenso. Las claves JSON son diferentes que sus claves `CLI` correspondientes.

| Clave CLI | Clave JSON |
| :--- | :--- |
| --snow-sample-size | k |
| --snow-quorum-size | alpha |
| --snow-virtuous-commit-threshold | betaVirtuous |
| --snow-rogue-commit-threshold | betaRogue |
| --snow-concurrent-repolls | concurrentRepolls |
| --snow-optimal-processing | optimalProcessing |
| --snow-max-processing | maxOutstandingItems |
| --snow-max-time-processing | maxItemProcessingTime |
| --snow-avalanche-batch-size | batchSize |
| --snow-avalanche-num-parents | parentSize |

Los parámetros de consenso de una subred se han predeterminado a los mismos valores utilizados para la Red Primaria, que se dan [aquí](command-line-interface.md#snow-parameters).

### Configuraciones de la máquina virtual \(VM\) <a id="vm-configs"></a>

`--vm-aliases-file` \(cadena\):

Ruta al archivo JSON que define los alias para las identificaciones de la máquina virtual. De forma predeterminada es `~/.avalanchego/configs/vms/aliases.json`. Contenido de ejemplo:

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

El ejemplo anterior apoda la VM cuya identificación es `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"` a `"timestampvm"` y `"timerpc"`.

