# Interfaz de Linea de Comando

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

### Connection Metering

`--conn-meter-max-conns` \(int\):

Actualiza en la mayoría de las conexiones `conn-meter-max-conns`de una IP dada por  `conn-meter-reset-duration`. Si `conn-meter-reset-duration` es 0, las conexiones entrantes no tienen límite de velocidad.

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

If set to `true`, this flag will attempt to upgrade the server to use HTTPS. Defaults to `false`.

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
* `--network-id=testnet` -&gt; Conectar a la Red de Pruebas actual. \(Right now, this is Fuji.\)
* `--network-id=local` -&gt; Conectar a una Red de Pruebas Local.
* `--network-id=network-{id}` -&gt; Conectar a la Red que tenga el  . `id` must be in the range `[0, 2^32)`.

### Public IP

`--public-ip` \(string\):

Validators must know their public facing IP addresses so they can let other nodes know how to connect to them. If this argument is not provided, the node will attempt to perform NAT traversal to get the node’s public IP. Should be set to `127.0.0.1` to create a local network. If not set, attempts to learn IP using NAT traversal.

`--dynamic-public-ip` \(string\):

Valid values if param is present: `opendns`, `ifconfigco` or `ifconfigme`. This overrides `--public-ip`. If set, will poll the remote service every `--dynamic-update-duration` and update the node’s public IP address.

`--dynamic-update-duration` \(duration\):

The time between poll events for `--dynamic-public-ip` or NAT traversal. The recommended minimum is 1 minute. Defaults to `5m`.

### Signature Verification

`--signature-verification-enabled` \(boolean\):

Enables signature verification. When set to `false`, signatures won’t be checked in VMs that allow signatures to be disabled. Defaults to `true`.

### Staking

`--staking-port` \(string\):

The port through which the staking server will connect to the Avalanche network externally. Defaults to `9651`.

`--p2p-tls-enabled` \(boolean\):

Avalanche uses two-way authenticated TLS connections to securely identify the `stakingID` of connected peers. However, This can be disabled for testing. When TLS is disabled, the `stakingID` will be derived from the IP Address the node claims it owns. This will also disable encryption of inter-node communication. This should only be specified for testing. Defaults to `true`. This must be true when `--staking-enabled=true`.

`--staking-enabled` \(boolean\):

Avalanche uses Proof of Stake \(PoS\) as Sybil resistance to make it prohibitively expensive to attack the network. When this is `true`, `--p2p-tls-enabled` must be set to `true` in order to secure P2P communications.

`--staking-tls-cert-file` \(string, file path\):

Avalanche uses two-way authenticated TLS connections to securely identify the `stakingID` of connected peers when `--p2p-tls-enabled=true`. This argument specifies the location of the TLS certificate used by the node. This must be specified when `--p2p-tls-enabled=true`. Defaults to `""`.

`--staking-tls-key-file` \(string, file path\):

Avalanche uses two-way authenticated TLS connections to securely identify the `stakingID` of connected peers when `--p2p-tls-enabled=true`. This argument specifies the location of the TLS private key used by the node. This must be specified when `--p2p-tls-enabled=true`. Defaults to `""`.

`--staking-disabled-weight` \(int\):

Weight to provide to each peer when staking is disabled. Defaults to `1`.

### Version

`--version` \(boolean\)

If this is `true`, print the version and quit. Defaults to `false`.

## Advanced Options

The following options affect the correctness of the platform. They may need to be changed network-wide, and as a result, an ordinary user should not change from the defaults.

### Benchlist

`--benchlist-duration` \(duration\):

Amount of time a peer is benchlisted after surpassing `--benchlist-fail-threshold`. Defaults to `1h`.

`--benchlist-fail-threshold` \(int\):

Number of consecutive failed queries to a node before benching it \(assuming all queries to it will fail\). Defaults to `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Enables peer specific query latency metrics. Defaults to `false`.

`--benchlist-min-failing-duration` \(duration\):

Minimum amount of time messages to a peer must be failing before the peer is benched. Defaults to `5m`.

### Consensus Parameters

`--consensus-gossip-frequency` \(duration\):

Time between gossiping accepted frontiers. Defaults to `10s`.

`--consensus-shutdown-timeout` \(duration\):

Timeout before killing an unresponsive chain. Defaults to `5s`.

`--creation-tx-fee` \(int\):

Transaction fee, in nAVAX, for transactions that create new state. Defaults to `1000000` nAVAX \(.001 AVAX\) per transaction.

`--min-delegator-stake` \(int\):

The minimum stake, in nAVAX, that can be delegated to a validator of the Primary Network.

Defaults to `25000000000` \(25 AVAX\) on Main Net. Defaults to `5000000` \(.005 AVAX\) on Test Net.

`--min-delegation-fee` \(int\):

The minimum delegation fee that can be charged for delegation on the Primary Network, multiplied by `10,000` . Must be in the range `[0, 1000000]`. Defaults to `20000` \(2%\) on Main Net.

`--min-stake-duration` \(duration\):

Minimum staking duration. The Default on Main Net is `336h` \(two weeks.\)

`--min-validator-stake` \(int\):

The minimum stake, in nAVAX, required to validate the Primary Network.

Defaults to `2000000000000` \(2,000 AVAX\) on Main Net. Defaults to `5000000` \(.005 AVAX\) on Test Net.

`--max-stake-duration` \(duration\):

The maximum staking duration, in seconds. Defaults to `8760h` \(365 days\) on Main Net.

`--max-validator-stake` \(int\):

The maximum stake, in nAVAX, that can be placed on a validator on the primary network. Defaults to `3000000000000000` \(3,000,000 AVAX\) on Main Net. This includes stake provided by both the validator and by delegators to the validator.

`--snow-avalanche-batch-size` \(int\):

DAG implementations of Snow consensus define `b` as the number of transactions a vertex should include. Increasing `b` will, theoretically, increase throughput while increasing latency. The node will wait for at most 1 second to collect a batch, and will then issue the entire batch at once. The value must be at least `1`. Defaults to `30`.

`--snow-avalanche-num-parents` \(int\):

DAG implementations of Snow consensus define `p` as the number of parents a vertex should include. Increasing `p` will improve the amortization of network queries. However, by increasing the connectivity of the graph, the complexity of the graph traversals is increased. The value must be at least `2`. Defaults to `5`.

`--snow-concurrent-repolls` \(int\):

Snow consensus requires repolling transactions that are issued during low time of network usage. This parameter lets one define how aggressive the client will be in finalizing these pending transactions. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1` and at most `--snow-rogue-commit-threshold`. Defaults to `4`.

`--snow-sample-size` \(int\):

Snow consensus defines `k` as the number of validators that are sampled during each network poll. This parameter lets one define the `k` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1`. Defaults to `20`.

`--snow-quorum-size` \(int\):

Snow consensus defines `alpha` as the number of validators that must prefer a transaction during each network poll to increase the confidence in the transaction. This parameter lets us define the `alpha` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at greater than `k/2`. Defaults to `14`.

`--snow-virtuous-commit-threshold` \(int\):

Snow consensus defines `beta1` as the number of consecutive polls that a virtuous transaction must increase its confidence for it to be accepted. This parameter lets us define the `beta1` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `1`. Defaults to `15`.

`--snow-rogue-commit-threshold` \(int\):

Snow consensus defines `beta2` as the number of consecutive polls that a rogue transaction must increase its confidence for it to be accepted. This parameter lets us define the `beta2` value used for consensus. This should only be changed after careful consideration of the tradeoffs of Snow consensus. The value must be at least `beta1`. Defaults to `30`.

`--stake-minting-period` \(duration\):

Consumption period of the staking function, in seconds. The Default on Main Net is `8760h` \(365 days\).

`--tx-fee` \(int\):

The required amount of nAVAX to be burned for a transaction to be valid. This parameter requires network agreement in its current form. Changing this value from the default should only be done on private networks. Defaults to `1000000` nAVAX per transaction.

`--uptime-requirement` \(float\):

Fraction of time a validator must be online to receive rewards. Defaults to `0.6`.

### Message Handling

`--max-non-staker-pending-msgs` \(int\):

Maximum number of messages a non-staker is allowed to have pending. Defaults to `20`.

`--staker-msg-reserved` \(float\):

Portion of pending message buffer reserved for messages from validators. Defaults to `0.375`.

`--staker-cpu-reserved` \(float\):

Portion of chain’s CPU time reserved for messages from validators. Defaults to `0.375`.

### Network Timeout

`--network-initial-timeout` \(duration\):

Initial timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `5s`.

`--network-minimum-timeout` \(duration\):

Minimum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `5s`.

`--network-maximum-timeout` \(duration\):

Maximum timeout value of the adaptive timeout manager, in nanoseconds. Defaults to `10s`.

`--network-timeout-multiplier` \(float\):

Multiplier of the timeout after a failed request. Defaults to `1.1`.

`--network-timeout-reduction` \(duration\):

Reduction of the timeout after a successful request, in nanoseconds. Defaults to `1`.

### Throughput Server

`--xput-server-enabled` \[Deprecated\] \(boolean\):

An optional server helps run throughput tests by injecting load into the network on command. If enabled, this server is started up and listens for commands from a test coordinator. Defaults to `false`.

`--xput-server-port` \[Deprecated\] \(string\):

This option lets one specify on which port the throughput server, if enabled, will listen. Defaults to `9652`.

### Subnet Whitelist

`--whitelisted-subnets` \(string\):

Comma separated list of subnets that this node would validate if added to. Defaults to empty \(will only validate the Primary Network\).

### Restart on Disconnect

Some users have had an issue where their AvalancheGo node gets into an unhealthy state when their node loses internet connectivity or when their IP address changes. To help deal with this, there are command line flags that cause the node to restart if it disconnected from all peers. They are:

`--restart-on-disconnected` \(boolean, defaults to `false`\)

`--disconnected-check-frequency`  \(duration, defaults to `10s`\)

`--disconnected-restart-timeout` \(duration, defaults to `1m`\)

If `restart-on-disconnected` is `true`, the node will check every `disconnected-check-frequency` to see whether it has lost connection to all peers. If the node has lost connection to all peers for `disconnected-restart-timeout`, it will restart. 

If `restart-on-disconnected` is `false` or either`disconnected-check-frequency` or`disconnected-restart-timeout` is 0, node will not restart.

### Plugins

`--plugin-dir` \(string, file path\):

Specifies the directory in which the `evm` plugin is kept. Defaults to `"$HOME/.avalanchego/build/plugins"`.

`--coreth-config` \(json\):

This allows you to specify a config to be passed into Coreth, the VM running the C Chain. The default values for this config are:

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

Note: if a config is specified, all default options are overridden. For example:

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

Since the option `personal-api-enabled` is excluded, it will be set to false and disable the `personal_*` namespace.

The options specify parameters for Coreth \(the C Chain\) as follows:

* `snowman-api-enabled` -&gt; Enables Snowman API.
* `coreth-admin-apienabled` -&gt; Enables Admin API on Coreth plugin.
* `net-api-enabled` -&gt; Enables `net_*` API.
* `rpc-gas-cap` -&gt; Sets the maximum gas to be consumed by an RPC Call \(used in `eth_estimateGas`\)
* `rpc-tx-fee-cap` -&gt; Sets the global transaction fee \(price \* gaslimit\) cap for send-transction variants. The unit is AVAX.
* `eth-api-enabled` -&gt; Enables `eth_*` API.
* `personal-api-enabled` -&gt; Enables `personal_*` API.
* `tx-pool-api-enabled` -&gt; Enables `txpool_*` API.
* `debug-api-enabled` -&gt; Enables `debug_*` API.
* `web3-api-enabled` -&gt; Enables `web3_*` API.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI0NTc2OTY4LC0yMDY5NDI1NTgyLDE3Nj
czMzQ4MDksODc4MzgyODQyLDE1MTE1MTM5NjQsMjA1NTg4OTI3
LDEyMjc1NjE1NzRdfQ==
-->