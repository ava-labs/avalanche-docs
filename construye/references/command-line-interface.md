# Interfaz de la línea de mando

Cuando se ejecuta un nodo, hay una variedad de configuraciones posibles que se admiten.

## Argumentos

### Config File

`--config-file` \(string\):

Config file especifica un archivo JSON para configurar un nodo en lugar de especificar argumentos a través de la línea de comandos. Los argumentos de la línea de comandos anularán cualquier opción establecida en el archivo de configuración.

```text
./build/avalanchego --config-file=config.json
```

config.json file:

```cpp
{
    "plugin-dir": "/home/ubuntu/avalanchego/plugins",
    "log-level": "debug"
}
```

### APIs

`--api-admin-enabled` \(boolean\):

Si se establece en `false`, este nodo no expondrá la API de administración. Por defecto es `false`. Ver [aquí](../avalanchego-apis/admin-api.md) para más información.

`--api-auth-required` \(boolean\):

Si se establece en `true`, los llamados a la API requieren un token de autorización. Por defecto es `false`. Ver [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-auth-password` \(string\):

La contraseña necesaria para crear/revocar los tokens de autorización. Si `--api-auth-required=true`, debe ser especificada; de otra forma sería ignorada. Ver [aquí](../avalanchego-apis/auth-api.md) para más información.

`--api-health-enabled` \(boolean\):

Si se establece como `true`, este nodo expondrá el API de Salud. Por defecto es `true`. Ver [aquí](../avalanchego-apis/health-api.md) para más información.

`--api-info-enabled` \(boolean\):

Si se establece como `true`, este nodo expondrá la API de Información. Por defecto es `true`. Ver [aquí](../avalanchego-apis/info-api.md) para más información.

`--api-ipcs-enabled` \(boolean\):

Si se establece como `true`, este nodo expondrá la API de los IPCs. Por defecto es `false`. Ver [aquí](../avalanchego-apis/ipc-api.md) para más información.

`--api-keystore-enabled` \(boolean\):

Si se establece en `false`, este nodo no expondrá la API del Keystore. Por defecto es `true`. Ver [aquí](../avalanchego-apis/keystore-api.md) para más información.

`--api-metrics-enabled` \(boolean\):

Si se configura como `false`, este nodo no expondrá el API de Métricas. Por defecto es `true`. Ver [aquí](../avalanchego-apis/metrics-api.md) para más información

### Assertions

`--assertions-enabled` \(boolean\):

Cuando se establece en `true`, las aserciones se ejecutarán en tiempo de ejecución en toda la base del código. Esto está pensado para su uso en la depuración, ya que podemos obtener un mensaje de error más específico. Por defecto es `true`.

### Bootstrapping

`--bootstrap-ids` \(string\):

Las ID de Bootstrap son una serie de ID de validador. Estas identificaciones se usarán para autenticar a los compañeros de bootstrap. Esto sólo necesita ser establecido cuando `--p2p-tls-enabled=true`. Una configuración de ejemplo de este campo sería `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. Por defecto está vacío \(no intenta arrancar desde otros nodos.\)

`--bootstrap-ips` \(string\):

Bootstrap IPs es un array de pares de puertos IPv4. Estas direcciones IP se usarán para arrancar el estado actual de Avalanche. Un ejemplo de configuración de este campo sería `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. Por defecto está vacío \(no intenta arrancar desde otros nodos.\)

`--bootstrap-retry-enabled` \(booleano\):

Si es verdadero, reintentará el bootstrapping si falla.
 

`--bootstrap-retry-max-attempts` \(uint\):

Máximas veces que reintentará el bootstrapping después de cada falla.

### Connection Metering

`--conn-meter-max-conns` \(int\):

Actualiza en la mayoría de las conexiones `conn-meter-max-conns`de una IP dada por `conn-meter-reset-duration`. Si `conn-meter-reset-duration` es 0, las conexiones entrantes no tienen límite de velocidad.

`--conn-meter-reset-duration` \(duration\):

Actualiza en la mayoría de las conexiones `conn-meter-max-conns` de una IP dada por `conn-meter-reset-duration`. Si`conn-meter-reset-duration` es 0, las conexiones entrantes no tienen límite de velocidad.

### Database

`--db-dir` \(string, file path\):

Especifica el directorio en el que se encuentra la base de datos. Por defecto `"$HOME/.avalanchego/db"`.

`--db-enabled` \(boolean\):

Si se configura como `false`, las actualizaciones de estado se realizan únicamente en una base de datos en memoria, sin hacer ningún cambio en el almacenamiento permanente. Si se establece en `true`, las actualizaciones de estado se escriben en una base de datos local persistente. Por defecto es `true`.

### HTTP Server

`--http-host` \(string\):

La dirección en la que escuchan las APIs HTTP. Por defecto es `127.0.0.1`. Esto significa que por defecto, tu nodo sólo puede manejar llamados a la API hechos desde la misma máquina. Para permitir llamados a la API desde otras máquinas, usa `--http-host=`. Por ejemplo, si tu dirección IP pública es `1.2.3.4` y quieres acceder al RPC de AvalancheGo a través de esa dirección IP, debes enviar `--http-host=1.2.3.4`. Para permitir llamadas a la API desde todas las IPs, usa `http-host=`.

`--http-port` \(int\):

Cada nodo ejecuta un servidor HTTP que proporciona las API para interactuar con el nodo y la red de Avalanche. Este argumento especifica el puerto en el que el servidor HTTP escuchará. El valor por defecto es `9650`.

`--http-tls-cert-file` \(string, file path\):

Este argumento especifica la ubicación del certificado TLS utilizado por el nodo para el servidor HTTPS. Esto debe ser especificado cuando `--http-tls-enabled=true`. No hay un valor por defecto.

`--http-tls-enabled` \(boolean\):

Si se establece como `true`, este marcador intentará actualizar el servidor para utilizar HTTPS. El valor predeterminado es `false`.

`--http-tls-key-file` \(string, file path\):

Este argumento especifica la ubicación de la clave privada TLS utilizada por el nodo para el servidor HTTPS. Esto debe ser especificado cuando `--http-tls-enabled=true`. No hay un valor por defecto.

### IPCS

`--ipcs-chain-ids` \(string\)

Lista separada por comas de identificaciones de cadenas a las que conectarse. No hay ningún valor predeterminado.

`--ipcs-path` \(string\)

El directorio \(Unix\) o el prefijo del nombre de la canalización \(Windows\) para los sockets IPC. Por defecto es /tmp.

### File Descriptor Limit

`--fd-limit` \(int\)

Intenta aumentar el límite del descriptor del archivo de proceso hasta al menos este valor. El valor por defecto es `32768`

### Logging

`--log-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

El nivel de registro determina qué eventos registrar. Hay 7 niveles diferentes, en orden de mayor a menor prioridad.

* `Off`: Ningún registro tiene este nivel de registro.
* `Fatal`: Errores fatales que no son recuperables.
* `Error`:  Errores que el nodo encuentra, estos errores pudieron ser recuperados.
* `Warn`: Una advertencia que podría ser indicativa de un nodo bizantino falsificado, o un potencial error futuro.
* `Info`: Descripciones útiles de las actualizaciones del estado de los nodos.
* `Debug`: El registro de depuración es útil cuando se intenta comprender posibles errores en el código. Se mostrará más información de la que sería típicamente deseada para un uso normal.
* `Verbo`: Rastrea cantidades extensas de información que el nodo está procesando. Esto incluye el contenido de los mensajes y los volcados binarios de datos para el análisis del protocolo de nivel extremadamente bajo.

Cuando se especifica un nivel de registro, hay que tener en cuenta que todos los registros con la prioridad especificada o superior serán rastreados. Por defecto es `Info`.

`--log-display-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

El nivel de registro determina qué eventos se muestran en la pantalla. Si se deja en blanco, se tomará por defecto el valor proporcionado a `--log-level`.

`--log-display-highlight` \(string, `{auto, plain, colors}`\):

Colorear o resaltar los registros de la pantalla. Resalta por defecto cuando la salida es un terminal. De lo contrario, debe ser alguno de `{auto, plain, colors}`

`--log-dir` \(string, file path\):

Especifica el directorio en el que se guardan los registros del sistema. El valor por defecto es `"$HOME/.avalanchego/logs"`.

### Network ID

`--network-id` \(string\):

La identidad de la red a la que el nodo debe conectarse. Puede ser una de:

* `--network-id=mainnet` -&gt; Conectar a la Red Principal \(default\).
* `--network-id=fuji` -&gt; Conectar a la Red de Pruebas Fuji.
* `--network-id=testnet` -&gt; Conectar a la Red de Pruebas actual. \(Actualmente es Fuji.\)
* `--network-id=local` -&gt; Conectar a una Red de Pruebas Local.
* `--network-id=network-{id}` -&gt; Conectar a la Red que tenga el ID suministrado . `id` debe estar en el rango `[0, 2^32)`.

### Public IP

`--public-ip` \(string\):

Los validadores deben conocer sus direcciones IP públicas para que puedan hacer saber a otros nodos cómo conectarse a ellos. Si no se proporciona este argumento, el nodo intentará realizar un recorrido NAT para obtener la IP pública del nodo. Debe estar configurado a `127.0.0.1` para crear una red local. Si no se establece, intenta aprender la IP usando un recorrido NAT.

`--dynamic-public-ip` \(string\):

Valores válidos si el param está presente: `opendns`, `ifconfigco` o `ifconfigme`. Esto anula la `--public-ip`. Si está configurado, sondeará el servicio remoto cada `--dynamic-update-duration` y actualizará la dirección IP pública del nodo.

`--dynamic-update-duration` \(duration\):

El tiempo entre los eventos del sondeo para `--dynamic-public-ip` o el recorrido NAT. El mínimo recomendado es de 1 minuto. Por defecto es de `5m`.

### Signature Verification

`--signature-verification-enabled` \(boolean\):

Permite la verificación de la firma. Cuando se configura como `false`, las firmas no se verificarán en las máquinas virtuales que permiten desactivarlas. Por defecto es `true`.

### Staking

`--staking-port` \(string\):

El puerto a través del cual el servidor de stake se conectará a la red de Avalanche externamente. El valor por defecto es `9651`.

`--p2p-tls-enabled` \(boolean\):

Avalanche usa conexiones TLS autentificadas de dos vías para identificar con seguridad el `stakingID` de los compañeros conectados. Sin embargo, esto puede ser desactivado para las pruebas. Cuando TLS está deshabilitado, el `stakingID` se derivará de la dirección IP que el nodo dice poseer. Esto también deshabilitará la encriptación de la comunicación entre nodos. Esto sólo debe ser especificado para las pruebas. Por defecto es `true`. Esto debe ser cierto cuando `--staking-enabled=true`.

`--staking-enabled` \(boolean\):

Avalanche usa Proof of Stake \(PoS\) como resistencia de Sybil para que sea prohibitivo atacar la red. Cuando esto es `true`, `--p2p-tls-enabled` debe ser configurado como `true` para asegurar las comunicaciones P2P.

`--staking-tls-cert-file` \(string, file path\):

Avalanche utiliza conexiones TLS de dos vías autentificadas para identificar de forma segura el `stakingID` de los pares conectados cuando `--p2p-tls-enabled=true`. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. Esto debe especificarse cuando `--p2p-tls-enabled=true`. Por defecto`""`.

`--staking-tls-key-file` \(string, file path\):

Avalanche utiliza conexiones TLS de dos vías autentificadas para identificar de forma segura el `stakingID` e los pares conectados cuando `--p2p-tls-enabled=true`. Este argumento especifica la ubicación del certificado TLS utilizado por el nodo. Esto debe especificarse cuando `--p2p-tls-enabled=true`. Por defecto `""`.

`--staking-disabled-weight` \(int\):

El peso que se debe proporcionar a cada compañero cuando el staking está desactivado. Por defecto `1`.

### Version

`--version` \(boolean\)

Si esto es `true`, imprime la versión y se cierra. Por defecto `false`.

## Advanced Options

Las siguientes opciones afectan a la corrección de la plataforma. Es posible que sea necesario cambiarlas en toda la red y, por consiguiente, un usuario ordinario no debería cambiarlas de las que están predeterminadas.

### Benchlist

`--benchlist-duration` \(duration\):

La cantidad de tiempo que un compañero es puesto en la lista de referencia después de superar el `--benchlist-fail-threshold`. Por defecto `1h`.

`--benchlist-fail-threshold` \(int\):

Número de consultas fallidas consecutivas a un nodo antes de ponerlo en el banco \(asumiendo que todas las consultas fallarán\). Por defecto `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Permite una métrica de latencia de consulta específica de los pares. Por defecto es `false`.

`--benchlist-min-failing-duration` \(duration\):

La cantidad mínima de tiempo que los mensajes a un par deben fallar antes de que el par sea puesto en el banco. El valor por defecto es de `5m`.

### Consensus Parameters

`--consensus-gossip-frequency` \(duration\):

Tiempo entre rumores de fronteras aceptadas. Por defecto `10s`.

`--consensus-shutdown-timeout` \(duration\):

Tiempo de espera antes de eliminar una cadena que no responde. Por defecto `5s`.

`--creation-tx-fee` \(int\):

Cuota de transacción, en nAVAX, para las transacciones que crean un nuevo estado. Por defecto es `1000000` nAVAX \(.001 AVAX\) por transacción.

`--min-delegator-stake` \(int\):

El stake mínimo, en nAVAX, que puede ser delegado a un validador de la Red Primaria.

El valor por defecto es `25000000000` \(25 AVAX\) en la red principal. Por defecto es `5000000` \(.005 AVAX\) en la red de pruebas.

`--min-delegation-fee` \(int\):

La cuota mínima de delegación que se puede cobrar por la delegación en la Red Primaria, multiplicada por `10,000`. Debe estar en el rango de `[0, 1000000]`. Por defecto es `20000` \(2%\) en la Red Principal.

`--min-stake-duration` \(duration\):

Duración mínima de el stake. El valor por defecto de la red principal es de `336h` \(dos semanas.\)

`--min-validator-stake` \(int\):

La participación mínima, en nAVAX, requerida para validar la Red Primaria.

Por defecto es `2000000000000` \(2,000 AVAX\) en la Red Principal. Por defecto es `5000000` \(.005 AVAX\) en la red de pruebas.

`--max-stake-duration` \(duration\):

La duración máxima de el stake, en segundos. Por defecto es `8760h` \(365 días\) en la red principal.

`--max-validator-stake` \(int\):

El Stake máximo, en nAVAX, que se puede colocar en un validador de la red primaria. Por defecto es `3000000000000000` \(3,000,000 AVAX\) en la red principal. Esto incluye el stake proporcionado tanto por el validador como por los delegadores del validador.

`--snow-avalanche-batch-size` \(int\):

Las implementaciones DAG del consenso de Snow definen `b` como el número de transacciones que un vértice debe incluir. Aumentar `b`, teóricamente, aumentará el rendimiento mientras aumenta la latencia. El nodo esperará como máximo 1 segundo para recoger un lote, y luego emitirá el lote completo de una vez. El valor debe ser al menos `1`. El valor por defecto es `30`.

`--snow-avalanche-num-parents` \(int\):

Las implementaciones DAG del consenso de Snow definen `p` como el número de progenitores que debe incluir un vértice. Aumentar `p` mejorará la absorción de las consultas de la red. Sin embargo, al aumentar la conectividad del gráfico, se incrementa la complejidad de los recorridos del gráfico. El valor debe ser al menos `2`. El valor por defecto es `5`.

`--snow-concurrent-repolls` \(int\):

El consenso Snow requiere que se repitan las transacciones que se emiten durante el período de baja utilización de la red. Este parámetro permite definir cuán agresivo será el cliente para finalizar estas transacciones pendientes. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser por lo menos `1` y como máximo `--snow-rogue-commit-threshold`. El valor por defecto es `4`.

`--snow-sample-size` \(int\):

El consenso Snow define `k` como el número de validadores que se muestrean durante cada sondeo de la red. Este parámetro permite definir el valor `k` utilizado para el consenso. Esto sólo debería cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser por lo menos `1`. El valor por defecto es `20`.

`--snow-quorum-size` \(int\):

El consenso Snow define `alpha` como el número de validadores que deben preferir una transacción durante cada sondeo de la red para aumentar la confianza en la transacción. Este parámetro nos permite definir el valor `alpha` utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser mayor que `k/2`. El valor por defecto es `14`.

`--snow-virtuous-commit-threshold` \(int\):

El consenso Snow define `beta1` como el número de sondeos consecutivos que una transacción virtuosa debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el valor `beta1` utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos `1`. El valor por defecto es `15`.

`--snow-rogue-commit-threshold` \(int\):

El consenso Snow define `beta2` como el número de sondeos consecutivos que una transacción virtuosa debe aumentar su confianza para que sea aceptada. Este parámetro nos permite definir el valor `beta2` utilizado para el consenso. Esto sólo debe cambiarse después de considerar cuidadosamente las compensaciones del Consenso Snow. El valor debe ser al menos `beta1`. El valor por defecto es `30`.

`--stake-minting-period` \(duration\):

Período de consumo de la función de stake, en segundos. El valor por defecto de la red principal es `8760h` \(365 días\).

`--tx-fee` \(int\):

La cantidad de nAVAX que se debe quemar para que una transacción sea válida. Este parámetro requiere un acuerdo de red en su forma actual. El cambio de este valor del valor por defecto sólo debe hacerse en redes privadas. El valor por defecto es `1000000` nAVAX por transacción.

`--uptime-requirement` \(float\):

Fracción de tiempo que un validador debe estar en línea para recibir las recompensas. El valor por defecto es `0.6`.

### Message Handling

`--max-non-staker-pending-msgs` \(int\):

Número máximo de mensajes que se permite tener pendientes a una persona que no hace stake. El valor por defecto es `20`.

`--staker-msg-reserved` \(float\):

Parte del buffer de mensajes pendientes reservado para los mensajes de los validadores. El valor por defecto es `0.375`.

`--staker-cpu-reserved` \(float\):

Porción del tiempo de la CPU de la cadena reservada para los mensajes de los validadores. El valor por defecto es `0.375`.

### Red (Network) 

`--network-initial-timeout` \(duration\):

Valor de tiempo de espera inicial del administrador de tiempo de espera adaptable, en nanosegundos. El valor por defecto es `5s`.

`--network-minimum-timeout` \(duration\):

Valor mínimo de tiempo de espera del gestor de tiempo de espera adaptativo, en nanosegundos. Por defecto es `2s`.

`--network-maximum-timeout` \(duration\):

Valor máximo de tiempo de espera del administrador de tiempo de espera adaptable, en nanosegundos. El valor por defecto es `10s`.

`--network-timeout-halflife` \(duration\):

Vida media utilizada para calcular el promedio de la latencia en la red. Un valor grande --> menor volatilidad en los cálculos de la latencia en la red
Predeterminado en `5m`.

`--network-timeout-coefficient` \(duration\):

Petición a los peers expirarán después de [`network-timeout-coefficient`] * [latencia promedio de peticiones].
Defaults to `2`.

`--network-health-min-conn-peers` \(uint\):
El nodo informará que no está en buen estado si está conectado a menos de este número de pares. Predeterminado a `1`.

`--network-health-max-time-since-msg-received` \(duration\):
Node will report unhealthy if it hasn't received a message for this amount of time.

Defaults to `1m`.

  

`--network-health-max-time-since-no-requests` \(duration\):

  

Node will report unhealthy if it hasn't received a message for this amount of time.

Defaults to `1m`.

  

`--network-health-max-portion-send-queue-full` \(float\):

  

Node will report unhealthy if its send queue is more than this portion full. Must be in [0,1]. Defaults to `0.9`.

  

`--network-health-max-send-fail-rate` \(float\):

  

Node will report unhealthy if more than this portion of message sends fail. Must be in [0,1]. Defaults to `0.25`.

  

###  Health

  

`--health-check-frequency` \(duration\):

Multiplicador del tiempo de espera después de una solicitud fallida. Por defecto `1.1`.

`--network-timeout-reduction` \(duration\):

Reducción del tiempo de espera después de una solicitud exitosa, en nanosegundos. Por defecto es `1`.

### Throughput Server

`--xput-server-enabled` \[Deprecated\] \(boolean\):

Un servidor opcional ayuda a realizar pruebas de rendimiento inyectando carga en la red a petición Si está habilitado, este servidor se inicia y audita los comandos de un coordinador de pruebas. Por defecto es `false`.

`--xput-server-port` \[Deprecated\] \(string\):

Esta opción permite especificar en qué puerto auditará el servidor de transferencia si está habilitado. Por defecto es `9652`.

### Subnet Whitelist

`--whitelisted-subnets` \(string\):

Lista separada por comas de subnets que este nodo validaría si se añadiera. Por defecto está vacía \(sólo valida la red primaria\).

### Restart on Disconnect

Algunos usuarios han tenido un problema en el que su nodo de AvalancheGo entra en un estado insalubre cuando su nodo pierde la conección a Internet o cuando cambia su dirección IP. Para ayudar a solucionarlo, hay indicadores de línea de comandos que hacen que el nodo se reinicie si se desconecta de todos sus pares. Estos son:

`--restart-on-disconnected` \(boolean, por defecto `false`\)

`--disconnected-check-frequency` \(duration, por defecto `10s`\)

`--disconnected-restart-timeout` \(duration, por defecto `1m`\)

Si `restart-on-disconnected` es `true`, el nodo comprobará cada `disconnected-check-frequency` para ver si ha perdido la conexión con todos los pares. Si el nodo ha perdido la conexión con todos los pares para `disconnected-restart-timeout`, se reiniciará.

Si `restart-on-disconnected` es`false` o si `disconnected-check-frequency` o `disconnectedd-restart-timeout` es 0, el nodo no se reiniciará.

### Plugins

`--plugin-dir` \(string, file path\):

Especifica el directorio en el que se guarda el plugin `evm`. Por defecto `"$HOME/.avalanchego/build/plugins"`.

`--coreth-config` \(json\):

Esto le permite especificar una configuración para ser pasada a Coreth, el VM que ejecuta la C-Chain. Los valores por defecto de esta configuración son:

```cpp
{
    "snowman-api-enabled": false,
    "coreth-admin-api-enabled": false,
    "net-api-enabled": true,
    "rpc-gas-cap": 2500000000,
    "rpc-tx-fee-cap": 100,
    "eth-api-enabled": true,
    "personal-api-enabled": true,
    "tx-pool-api-enabled": true,
    "debug-api-enabled": false,
    "web3-api-enabled": true
}
```

Nota: si se especifica una configuración, se anulan todas las opciones predeterminadas. Por ejemplo:

```text
./build/avalanchego --config-file=config.json
```

config.json:

```cpp
{
    "coreth-config": {
        "snowman-api-enabled": false,
        "coreth-admin-api-enabled": false,
        "net-api-enabled": true,
        "rpc-gas-cap": 2500000000,
        "rpc-tx-fee-cap": 100,
        "eth-api-enabled": true,
        "tx-pool-api-enabled": true,
        "debug-api-enabled": true,
        "web3-api-enabled": true
    }
}
```

Como la opción `personal-api-enabled` está excluida, será puesta en `false` y desactivará el espacio de nombres `personal_*`.

Las opciones especifican los parámetros para Coreth \(the C-Chain\) de la siguiente manera:

* `snowman-api-enabled` -&gt; Habilita el API de Snowman.
* `coreth-admin-apienabled` -&gt; Habilita el API de Administración en el plugin Coreth.
* `net-api-enabled` -&gt; Habilita el API de `net_*`.
* `rpc-gas-cap` -&gt; Establece el máximo de gas a ser consumido por un llamado RPC \(usado en `eth_estimateGas`\)
* `rpc-tx-fee-cap` -&gt; Establece la comisión límite de transacción global \(price \* gaslimit\) para las variantes de transmisión. La unidad es AVAX.
* `eth-api-enabled` -&gt; Habilita el API de `eth_*`.
* `personal-api-enabled` -&gt; Habilita el API de `personal_*`.
* `tx-pool-api-enabled` -&gt; Habilita el API de `txpool_*`.
* `debug-api-enabled` -&gt; Habilita el API de `debug_*`.
* `web3-api-enabled` -&gt; Habilita el API de `web3_*`.

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDU0MTI3MzEwXX0=
-->