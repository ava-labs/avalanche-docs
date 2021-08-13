# AvalancheGo Release

{% page-ref page-ref %}

## v1.4.12 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)

Esta actualización es compatible hacia atrás. Es opcional, pero alentado.

**Cadena X-X-**

* Agregado argumento de formato `"json"` al método API `GetTx`, que devuelve la representación JSON de la transacción consultada
* Added de tipo de interfaz añadidas

**Info API**

* Método añadido `GetNodeVersion` a Info cliente API

**Prometheus Metrics**

* Métricas fijas y renombradas para bytes no enviados debido a la compresión
* Métricas añadidas para bytes no recibidas debido a la compresión
* Agregado help struct `noAverager` al paquete `de métricas`

**Base de datos**

* Parámetros actualizados/añadidos

**Memoria compartida**

* Reemplazar `Poner` y `Eliminar` con `Aplicar` para permitir la optimización de las transacciones atómicas futuras

## v1.4.11 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)

**C-Chain**

Esta versión permite instantáneas de forma predeterminada.

**Banderas confusas**

_Eliminada_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Añadido que se ha añadido a la lista_

* `habilitar la compresión de red`

**Prometheus Metrics**

Muchas métricas de Prometeo fueron renombradas, y muchos histogramas fueron reemplazados por 2 medidores. Vea [aquí](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) para ver los tableros de Grafana actualizados.

Esta versión también añade métodos de ayuda al paquete `util/métrico.`

**RocksDB**

RocksDB ya no se construye por defecto al ejecutar el script de construcción, y no está incluido en los binarios publicados públicamente. Para construir AvalancheGo con RocksDB, ejecute `la exportación ROCKSDBALLOWED=1` en su terminal y luego `scripts/build.sh`. Debe hacer esto antes de que pueda usar `--db-type=rocksdb`.

La base de datos RocksDB ahora coloca / busca sus archivos en una `rocksdb`. de subdirectorio. Tenga en cuenta que si usted corrió previamente con RocksDB, tendrá que mover los archivos existentes.

**Compresión de mensajes**

Los nodos ahora comprimen algunos mensajes P2P. Si un par es la versión >= v1.4.11, Put, Push Query, Peer List y Multiput mensajes enviados al peer se comprimen utilizando gzip antes de ser enviados a través de la red. Esto reduce el uso de ancho de banda de AvalancheGo's

**Conexión entrante Throttling** Ralentizado la velocidad de conexión de entrada refactored y lo habilita de forma predeterminada.

**Mejoras generales**

* Refactored y mejoró el rendimiento de la iteración sobre una base de datos servida por gRPC a un plugin.
* En Linux, limpie la cadena C-Chain si AvalancheGo muere sin gracia
* Refactored las definiciones de mensajes P2P y muévelos del paquete `de` red.
* Agregado alias VM al servidor de API HTTP
* Reemplazado `1024` con `units.KiB`, etc.
* Mejora de la tolerancia de partición mediante el procesamiento de chits para la creación de las consultas correspondientes.

**IPs Fuji**

Actualizado los IP de arranque para el Fuji Testnet.

## v1.4.10 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)

**Fase 2 de albaricoque - Parche 10**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. {% endhint %}

El parche incluye el rendimiento, la aceleración y las mejoras de VM:

* Añadido soporte para usar `RocksDB` en lugar de `LevelDB` en arquitecturas compatibles.
* La aceleración de la red entrante reestructurada para estar sobre una base por nodo, para restringir el uso de ancho de banda de nodos de pares.
* Reestructurada de la red saliente acelerando el peso asignado por bytes en juego.
* Actualizado el valor predeterminado de la bandera habilitada para `la poda` a `la verdad` para la cadena C.
* Habilitado el registro de VMs personalizados sobre RPC.
* Actualizado status de blockchain para informar sobre el estado de validación.
* Moved `TimestampVM` a su propio repositorio para coincidir con la ruta de creación de VM esperada.
* Script de código protobuf fijo para colocar archivos `grpc` en la ubicación correcta.
* Pasó los bytes de bloque a través del `rpcchainvm#Block.Verify` para evitar cualquier posible fallo de verificación de desalojos de caché.

## v1.4.9 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)

**Fase 2 de albaricoque - Parche 9**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. {% endhint %}

El parche incluye mejoras de rendimiento y mejoras de monitoreo:

* Añadido soporte para ejecutar la cadena C con poda habilitada. La poda está actualmente desactivada de forma predeterminada.
* Intervalo de ping Reducido de cadena C para reducir las desconexiones cuando detrás del balancer de carga.
* Añadido la marca de tiempo a la interfaz de bloque snowman.
* Error fijo en la aplicación máxima de la duración de la API de cadena C para llamadas realizadas a través de websockets.
* Añadido soporte de cabecera gzip para el extremo http.
* Añadido descripciones adicionales de versiones al endpoint `info.getNodeVersion`.
* Restringido de conexión a versiones de nodo >= 1.4.5.
* Registros de demonio movidos debajo de la carpeta de registro primaria.
* Añadido soporte para el muestreo determinista.
* Agregado de implementación automática GitHub acción para nuevas etiquetas.
* Refactored config management para apoyar mejor los nodos de lanzamiento programáticamente.

## v1.4.8 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)

**Fase 2 de albaricoque - Parche 8**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. {% endhint %}

El parche incluye mejoras de rendimiento, mejoras de monitoreo y correcciones de subnet:

* Cambió la definición de honorarios del AVM para hacer cumplir las tasas que se pagarán en el activo nativo de la cadena. Esto no cambia el comportamiento de la cadena X, pero hace que otras instancias AVM sean usables.
* Agregó la capacidad de especificar configs a cadenas específicas. Esto devuelve el parámetro CLI `coreth-config`
* Tasa añadida que limita el número de nuevas conexiones salidas.
* Introdujo un envoltorio VM que añade métricas transparentes a una cadena.
* Agregó la capacidad de habilitar perfiles de nodo continuo.
* Dispositivos de byte reducidos en la capa de networking.
* Agregó varios parámetros CLI para la sintonización de los parámetros de chismes.
* Los nodos habilitaron para ejecutar utilizando un par de teclas efímeras, en lugar de uno que se lee desde el disco.
* Eliminó la advertencia spurious incorrecta.
* Moved CI tests para correr en Github Actions en lugar de correr en Travis.
* Eliminaron los casos especiales de la interfaz VM.

**Argumentos de línea de comandos añadidos:**

* `profile-dir`
* `profile-continuous-enabled`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consenso sobre consensus-on-accept-gossip-size`
* `Dimensionamiento de las fronteras aceptadas-`
* `meter-vms-enabled`
* `staking-ephemeral-cert-enabled habilitado`
* `Tiempo de conexión fuera`
* `Conexión outbound-connection-throttling-rps`

## v1.4.7 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)

**Fase 2 de albaricoque - Parche 7**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye mejoras de rendimiento y correcciones de errores. {% endhint %}

Si la versión de nodo previamente instalada es <= v1.4.4, este nodo puede haber dejado de procesar. Esta actualización reparará el nodo y realizará una migración de bases de datos. Para obtener detalles sobre la migración de la base de datos consulte las notas de [migración de la base de datos v1.4.5](avalanchego-v1.4.5-database-migration.md). Si la versión de nodo previamente instalada es >=v1.4.5, este nodo utilizará la base de datos existente y no necesita realizar una migración de bases de datos.

* Se fijó el nodo pre-migration para verificar correctamente el bloque de cadena P `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xojawrWNQrLhQcD`.
* Regresión fija en `platformvm.GetBlockchains` para devolver correctamente las cadenas de bloqueo de subnet primarias.
* Actualizado la versión grpc a v1.37.
* Muestreo optimizado de la lista de peerlist
* Agregado puntos de referencia de la base de datos.
* Reducido varias asignaciones de memoria repetidas.

## v1.4.6 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)

**Fase 2 de albaricoque - Parche 6**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. Este parche incluye mejoras de rendimiento y correcciones de errores. {% endhint %}

**Si la versión de nodo previamente instalada es &lt;= v1.4.4, este nodo realizará una migración de bases de datos. Para obtener detalles sobre la migración de la base de datos consulte las notas de lanzamiento v1.4.5.** Si la versión de nodo previamente instalada es v1.4.5, este nodo utiliza la base de datos existente y no necesita realizar una migración de bases de datos.

Este parche:

* Elimina la emisión de transacciones inválidas en el mempool de cadena P que causó escritura de DB sostenida.
* Ignorados archivos y carpetas no de base de datos en el directorio de bases de datos. Esto debe corregir específicamente errores reportados en macOS con . Archivos DS\_Store.
* Fijo la bandera build-dir para poder ser especificado a través de CLI sin causar error al nodo de preupgrade
* Eliminó la bandera de plugin-dir que ya no es compatible con el demonio de node-manager Normalmente no especificando la bandera conduce al comportamiento correcto. Sin embargo, para instalaciones complejas, puede ser necesario la bandera de build-dir.
* Los mensajes forzados de chismes solo a conexiones que han terminado el apretón de mano.
* Reducido las asignaciones de memoria durante los transversales de consenso y el arranque de secuestro.

## v1.4.5 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)

**Fase 2 de Apricot - Parche 5 - Mejorar DB**

**Esta actualización está más involucrada que la actualización de versión típica. Aquí se pueden encontrar instrucciones más detalladas y una FAQ**[****](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)****

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye mejoras importantes de rendimiento y numerosas otras actualizaciones. {% endhint %}

**Mejora de VM:**

* Rediseñado completamente la gestión estatal de la `platformvm`'s
   * Eliminó el uso de `versiondb`s que se transmiten a través de bloques para pasar referencias de estado que pueden ser modificadas y leídas sin reanalizar objetos.
   * Implementó un gestor de estado base para escribir correctamente caché y mange en la base de datos subyacente.
   * Conjuntos de validación de CoW implementados para habilitar el caché de múltiples conjuntos de validadores en memoria.
   * Cadenas indizadas por subred para evitar tocar objetos de estado no usados.
   * Validadores indizados por `nodeID` para evitar iteraciones innecesarias al tiempo que acepta transacciones de `addDelegator` y `addSubnetValidator`.
   * Reducido el número de pares de valor clave dedicados a la gestión de conjuntos de validación en los tiempos de actualización de disco y validador.
* Agregó la búsqueda de recompensas grapadas a la API de `la plataforma` para apoyar la indexación de recompensas.
* Validador refactorizado medición de tiempo de actividad para simplificar las pruebas.
* Se añadieron métricas de tipo de bloque y transacción a la `platformvm`.
* Agregada métricas de llamadas API al `avm` y al `platformvm`.
* Actualizado la gestión estatal del `avm` para utilizar `prefixdb`s, grabar métricas de caché y compartir código adicional con el `platformvm`.
* Gestión e indexación simplificada de `UTXO` en el `avm` y `platformvm`.
* Analizar y gestionar direcciones reestructuradas para ser compartidas completamente en las instancias VM compatibles.
* Reestructurada memoria compartida de la subred primaria para ser compartida completamente entre los casos de VM.
* Añadió una implementación de estado de cadena para apoyar el caché sin fisuras sobre las implementaciones de VM existentes y para simplificar la implementación de nuevas VM.
* Integró el nuevo gerente de estado de cadena en el `rpcchainvm`, que también añade varias métricas.
* Añadido `upgradeBytes` y `configBytes` a la interfaz VM estándar para mejorar el soporte de futuras actualizaciones de red.
* Agregado `getAtomicTx` y `getAtomicTxStatus` endpoints a la API de `evm`.
* La producción de bloque de `evm` simplificada se realizará sincronizadamente con el motor de consenso.
* Añadió un mempool de transacción atómica para reintroducir transacciones atómicas huérfanas.
* Error corregido en el cliente `evm` para configurar correctamente la `cadena de origen` en `getAtomicUTXOs`.
* Integró el nuevo gestor de estado de cadena en el `evm` para optimizar mejor la gestión de bloqueos.

**Mejora de la captura:**

* Eliminaron re-traversals durante el arranque de arranque. Esto mejora significativamente el rendimiento del nodo durante los reinicios del proceso de bootstrapping
* Se fijó un cierre de nodo sin gracia cuando intentaba salir del nodo mientras ejecutaba contenedores con rosca de arranque.
* Transmisiones de contenedores IPC duplicados corregidos durante el arranque de secuestro.
* Normalizó la cola de trabajos de arranque para escribir a estado utilizando `prefixdb`s en lugar de implementar prefijaciones personalizadas.
* Añadido métricas adicionales de caché y caché de arranque.

**Adiciones de migración de bases de datos:**

* Agregó un gestor de procesos de demonio para migrar sin problemas al formato de base de datos actualizado.
* Manejo de versiones Refactored para rastrear versiones semánticas de base de datos.
* Implementó un gestor de bases de datos para rastrear y operar en diferentes versiones de bases de datos.
* Implementó una migración de `keystore` que copia automáticamente a los usuarios de la base de datos `v1.0.0` a la base de datos `v1.4.5`.
* Implementó una migración de tiempo de actividad de validación desde la base de datos `v1.0.0` a la base de datos `v1.4.5`.

**Mejora del nido:**

* Actualización de análisis de config para ampliar siempre las variables de entorno.
* Refactored el confort de nodo para permitir especificar certificados TLS en memoria sin tocar disco.
* Añadido mejor soporte para códigos de salida significativos.
* Dirección de escucha mostrada de los servidores `http` y `de` grapado para ayudar a apoyar los mapeos de puerto no específicos.
* Implementó una base de datos `versionable` para poder cambiar entre un pase a través de la base de datos y una base de datos `versionada.`
* Identificada optimizada `Set` y redujo el uso de memoria de las `struct`s.
* Las reglas de revestimiento más estrictas forzadas.

**Argumentos de línea de comandos modificados:**

Para los siguientes argumentos, `"default"` fue tratado anteriormente como una palabra clave. Ahora, `"default"` intentará ser tratado como el valor previsto de la bandera. Para mantener el comportamiento predeterminado, no debe especificarse la bandera.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir.`

Para los siguientes argumentos: `""` fue tratado anteriormente como una palabra clave. Ahora, `""` intentará ser tratado como el valor previsto de la bandera. Para mantener el comportamiento predeterminado, no debe especificarse la bandera.

* `ipcs-chain-ids`
* `log-dir.`
* `nivel de log-display-level`

Ya no se requiere que se emparejen los `bootstrap-ips` y los `bootstrap-ids` de arranque. Esto significa que ahora es válido para especificar un número diferente de `bootstrap-ips` que `bootstrap-ids`. Los `bootstrap-ips` se utilizan para conectar inicialmente a la red y los `bootstrap-ids` se utilizan como balizas en la captura de arranque.

**Argumentos de línea de comandos añadidos:**

* `solo para el feto`
* `build-dir.`

**Eliminaron los argumentos de la línea de comandos:**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)

**Fase 2 de albaricoque - Parche 4**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. {% endhint %}

El parche incluye correcciones de errores y mejoras de rendimiento que apuntan a optimizar la próxima versión `db-upgrade` .

* Retraso de cola saltado en el arranque de forma que todas las cadenas terminen tan pronto como la última cadena se marque como arranque en una subred.
* Mejora de la manipulación de mensajes durante el arranque para manejar mensajes mientras espera que otras cadenas se sincronizen.
* Reducción de las asignaciones de muestras mediante la reutilización de los muestreos existentes.
* Escrituras de docker actualizadas para solo empujar imágenes de la rama `maestra.`
* Formateo de registro fijo.
* Mensajes de error mejorados.

## v1.4.3 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)

**Fase 2 de albaricoque - Parche 3**

{% insinuar style="warning" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. {% endhint %}

El parche incluye correcciones de errores, monitoreo actualizado de tiempo de actividad y mejoras de rendimiento.

* Manejo de mensajes bancados fijo que podría causar que un nodo no pueda progresar durante el arranque de arranque. Esto se experimentó normalmente cuando el nodo no llegaría a la transición a la ejecución normal mientras estaba terminando el arranque de arranque.
* Se ha corregido un error no determinista en la base de código de la cadena C que podría causar nodos que reciben muchas solicitudes de transmisión de transacciones para dejar de producir temporalmente bloques hasta que procesen un bloque producido por otro nodo.
* Restringió el número de mensajes de versión que se enviarían a un par a uno.
* Eliminaron mensajes de apretón de manos heredados que fueron rechazados en la Fase 2 de Apricot.
* Nodos marcados que han sido benched como desconectados para cálculos de tiempo real.
* Actualizado el conjunto de validadores para ser más performant durante los cambios de conjunto de validadores.
* Actualizado la red para intentar volver a conectarse a un par en desconexión si actualmente son un validador.

## v1.4.2 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)

**Fase 2 de albaricoque - Parche 2**

{% insinuar style="warning" %} Esta actualización es compatible con v1.4.0 y v1.4.1. Los cambios en la actualización entran en vigor a las 10 AM EDT, 5 de mayo de 2021 en el Fuji testnet y 7 AM EDT, 10 de mayo de 2021 en mainnet. {% endhint %}

El parche reduce aún más el tamaño de los mensajes de lista de pares chismes, e introduce varias nuevas banderas:

* `network-peer-list-size` permite afinar el número de pares gossiped en cada mensaje de `la lista de` parentesco.
* `network-peer-list-gossip-size` permite afinar el número de pares a los que cotizan mensajes `de lista de` parentesco.
* `network-peer-list-gossip-frequency` permite afinar con qué frecuencia se cotizan `las listas de` pares.

## v1.4.1 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)

**Fase 2 de albaricoque - Parche 1**

{% insinuar style="warning" %} Esta actualización es compatible con v1.4.0. Por favor, vea los tiempos de actualización previstos en la versión v1.4.0. {% endhint %}

El parche reduce el tamaño de los mensajes de lista de pares chismes, e introduce una nueva bandera `--bootstrap-beacon-connection-timeout` que permite configurar el tiempo de conexión con faros en el inicio.

## v1.4.0 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)

**Fase 2 del albaricoque**

{% insinuar style="danger" %} **Tenga en cuenta que este cambio no es compatible con versiones anteriores.**

**El post de blog relacionado se puede encontrar** [**aquí**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.** {% endhint %}

{% insinuar style="warning" %} Esta actualización aplica la actualización de Ethereum Berlin a la cadena C, agrega un nuevo punto final AVM e incluye varias mejoras de estabilidad. Instamos a todos los habitantes de la comunidad a que se actualicen lo antes posible para asegurar que sus nodos permanezcan sanos.

Los cambios en la actualización entran en vigor a las 10 AM EDT, 5 de mayo de 2021 en el Fuji testnet y 7 AM EDT, 10 de mayo de 2021 en mainnet. {% endhint %}

**Los componentes principales de esta actualización incluyen:**

* Coreth actualizado para depender de v1.10.2 de go-ethereum.
* Aplicó la actualización de Ethereum Berlín. Específicamente [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) y [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Añadió nuevos contratos inteligentes precompilados de estado a la cadena C para apoyar transferencias ANT y envoltorios ARC-20 alrededor de ANTs.
* Agregó un endpoint AVM `/events` que admite notificación de las transacciones que se aceptan coincidiendo con un filtro de direcciones.
* Añadido dos nuevos tipos de mensajes de red `SignedVersion` y `SignedPeerlist` para mejorar el validador -> aparcamientos IP.
* Se ha corregido un error de larga duración donde cerrar el nodo mientras una cadena estaba bootstrapping podría causar que la cadena se apagara sin gracia.
* Actualizado los paquetes de gRPC plugin para pagar grandes peticiones para mejorar la estabilidad.
* Añadió la capacidad de ejecutar el binario principal de avalanchego's como plugin.
* Fijo una posible condición racial en la protección de la corrupción de leveldb
* Actualizado los scripts de construcción automatizados para mejorar el soporte de múltiples arquitecturas.

**Argumentos de línea de comandos añadidos:**

* Activado por `plugin-mode-enabled` especifica el binario que se ejecutará en modo plugin.

**Eliminaron los argumentos de la línea de comandos:**

* `p2p-tls activado`
* `Frecuencia de verificación desconectada.`
* `disconnected-restart-timeout`
* `reiniciar en desconexión`

## v1.3.2 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)

**Fase 1 de albaricoque - Parche 2**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye mejoras de seguridad, correcciones de errores y mejoras de monitoreo. {% endhint %}

**Mejoras de seguridad**

* Forzó un estricto formato canónico para bloques de cadena C realizados antes de `la fase 1 de Apricot` y asegura que las modificaciones en el campo de bloques `extra-data` no pueden dar lugar a modificaciones en el estado de cadena durante el arranque de arranque.
* Cambió el `Keystore` para asegurar que solo se envían valores cifrados sobre el IPC entre los procesos de avalanchego y plugin.

**Corregir el bug:**

* Los cálculos de la delegación fijas para incluir la actualización de la delegación actual máxima antes de eliminar a un delegador. Esto garantiza que el límite de delegación siempre se aplique a la delegación.
* La API estática de `AVM` fijada para ser registrada correctamente en el inicio.
* Cálculos de `tiempo de trabajo` actualizados para tener en cuenta las actualizaciones de red.

**Mejoras de seguimiento**

* Agregó un indexador opcional que puede proporcionar un pedido de operaciones de forma local consistente aceptadas en una cadena.
* Inventario reactualizado para incluir numerosas mejoras \(Enorme gracias a @moreati\).

## v1.3.1 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)

**Fase 1 de albaricoque - Parche 1**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye estabilidad, mejoras de monitoreo y correcciones de errores menores. {% endhint %}

**Los componentes principales de esta actualización incluyen:**

* Segmento de cadena C fijo al realizar compresión en CPU arm64.
* Se añadieron permisos de grupo a archivos locales para permitir la monitorización compleja de nodos.
* Espacio blanco desmontado de las contraseñas Auth pasaron a través de la bandera de archivo de contraseña api-auth-password-file
* Tiempo Removed ya que fue reemplazado por longestRunningRequest.
* Añadido métricas adicionales en la aceleración de la red.
* Varios códigos de limpieza.

**Argumentos de línea de comandos añadidos:**

* `network-health-max-outstanding-request-duration network-health-max-outstanding-request-duration`

**Eliminaron los argumentos de la línea de comandos:**

* `network-health-max-time-since-no-requests`

## v1.3.0 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)

**Fase 1 de albaricoque**

{% insinuar style="danger" %} Tenga en cuenta que este cambio no es compatible con versiones anteriores.

Esta actualización reduce los gastos de gas de cadena C, elimina los reembolsos de gas de cadena C e incluye varias mejoras de seguridad. Instamos a todos los habitantes de la comunidad a que se actualicen lo antes posible para asegurar que sus nodos permanezcan sanos. {% endhint %}

Los cambios en la actualización entran en vigor a las 10 AM EST, 25 de marzo de 2021 en el Fuji testnet y 10 AM EST, 31 de marzo de 2021 en mainnet.

**Los componentes principales de esta actualización incluyen:**

* Reducido costo de gas de cadena C de 470 nAVAX a 225 nAVAX.
* Eliminaron las restituciones de gas de cadena C. Este cambio adopta el [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* La verificación de la cadena C Refactored para ser más limpia al realizar mejoras de red.
* Fijo la API Auth para hacer cumplir correctamente las fichas revocadas.
* Fortalecido la API Auth para asegurar que se utilice el formato de firma esperado.
* Eliminó la contraseña de la Auth API de los argumentos CLI.
* Agregó cheques de permisos de archivo más estrictos.
* Añadido un pequeño manejo de errores adicionales.
* El registro Sanitized escribe antes de ser escrito en disco.
* Se añadieron orígenes configurables al punto final HTTP.
* Eliminó los intentos HTTP a HTTP fallar en el inicio. Ahora el nodo se cerrará en el inicio si falla la actualización del endpoint HTTP a HTTP .

**Argumentos de línea de comandos añadidos:**

* `api-auth-password-file` especifica el archivo para leer la contraseña de la API Auth.

**Eliminaron los argumentos de la línea de comandos:**

* `api-auth-password`

## **v1.2.4 \(**[**Ver en GitHub\)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)****

**Fase 0 de albaricoque - Mejorar 1 - Parche 4**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye mejoras de estabilidad y monitoreo. {% endhint %}

* Readme actualizado para corregir los requisitos de almacenamiento.
* Se añadió el manejo de errores adicional a la verificación Avalanche Tx durante el arranque de arranque.
* Actualizado numerosas métricas, incluyendo la adición de numerosas nuevas métricas relacionadas con la salud de los nodos y el uso de bases de datos, la eliminación de métricas no utilizadas y la fijación de algunos nombres métricos.
* Añadido registro adicional a CI.
* Añadió la cadena C a la lista de cadenas críticas.

## **v1.2.3 \(**[**Ver en GitHub\)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)****

**Fase 0 de albaricoque - Mejorar 1 - Parche 3**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye mejoras de estabilidad y monitoreo. {% endhint %}

* Parámetros de control de salud ajustados `[de red, router y consenso]` para eliminar los controles de salud escamosos.
* Manejo simplificado de bloque de cadena C.

## **v1.2.2 \(**[**Ver en GitHub\)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)****

**Fase 0 de albaricoque - Mejorar 1 - Parche 2**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye estabilidad, rendimiento y mejoras de monitoreo. {% endhint %}

* Agregado alias IP en la biblioteca de red para evitar llamadas `SYN` repetidas.
* Manejo de mensajes de arranque fijo cuando se trata de arranque.
* Simplificado de `AdvanceTimeTx` emisión.
* Añadido nuevos controles de salud de consenso.
* Añadiendo tala de salud de los nodos.
* Añadido respuestas de salud a las solicitudes `GET` de salud.
* Registros de mensajes entrantes consolidados.
* Agregado registro de error al envoltorio `LevelDB`.
* Agregado códigos de error al `rpcdb` para evitar el intercambio de cuerdas.
* Mejora de la manipulación de la cadena C de la cadena canónica para reducir el número de reorgs.
* Mejora de la manipulación de la cadena C de las llamadas de moja realizadas en el bloque `pendiente.`

## **v1.2.1 \(**[**Ver en GitHub\)**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)****

**Fase 0 de albaricoque - Mejorar 1 - Parche 1**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye estabilidad, rendimiento y mejoras de monitoreo.

Tenga en cuenta que esta actualización elimina \`network-timeout-increase\` y ‘network-timeout-reduction\` como argumentos de línea de comandos. {% endhint %}

Resumen de cambio:

* Añadido \`UTXO\`s a la respuesta \`platformvm.getStake\`.
* Añadido información de la lista de referencia a la respuesta \`info.peers\`.
* Añadido controles adicionales de salud en la capa de redes.
* Añadido \`por ciento de la estaca conectada\` como una métrica informada.
* Agregada lógica de reinicio de arranque para asegurar que el nodo se haya alcanzado hasta la punta actual, incluso durante tiempos de alto rendimiento.
* Agregado bootstrapping a escala de subred para asegurarse de que una cadena no se caerá detrás debido a otra cadena de arranque de cadena.
* Impidió la verificación de bloques rechazados para evitar cálculos innecesarios.
* Eliminó el chismeado de bloques no preferidos a la red.
* Cambió la calculadora de tiempo de red para usar una EWMA de la latencia de red observada.
* Eliminó las peticiones \`Get\` de los cálculos de latencia de la red.
* Limpió el algoritmo de la lista de referencia.
* Limpió el manejo de mensajes caídos en el envío.
* Limpió la solicitud pendiente y la lógica de tiempo de espera.
* Seguimiento de rendimiento generalizado para permitir la prefijación de nombres de perfil.
* Añadido caché adicional a la Avalanche bootstrapping traversal.
* Inyección ansible fija.
* Los argumentos de la línea de comandos añadidos consisten principalmente en configuraciones de cheques de salud. Además, los cálculos de latencia de red modificaron el nombre de algunos args de línea de comandos.

Argumentos de línea de comandos añadidos:

* \`network-timeout-halflife\`
* \`network-timeout-coefficient\`
* \`network-health-min-conn-peers\`
* \`network-health-max-time-since-msg-received\`
* \`network-health-max-time-since-msg-sent\`
* \`network-health-max-portion-send-queue-full\`
* \`network-health-max-send-fail-rate\`
* \`network-health-max-time-since-no-requests\`
* \`router-health-max-drop-rate\`
* \`router-health-max-outstanding-requests\`
* \`health-check-frequency\`
* \`health-check-averager-halflife\`
* \`bootstrap-retry-enabled\`
* \`bootstrap-retry-max-attempts\`

Eliminaron los argumentos de la línea de comandos:

* \`network-timeout-increase\` aumentar\`
* \`network-timeout-reduction\`

## v1.2.0 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.2.0)

**Fase 0 de albaricoque - Mejorar 1**

{% insinuar style="danger" %} **Tenga en cuenta que este parche no es compatible con versiones anteriores. Esta actualización fija problemas de rendimiento relacionados con transferencias de intercambio entre cadenas X, C y P. Instamos a todos los habitantes de la comunidad a que se actualicen lo antes posible para garantizar que sus nodos no se vean afectados. Además, tenga en cuenta que los nodos pueden tomar varios minutos adicionales para conectarse después de la actualización y el proceso debe permitirse completar ininterrumpido.** {% endhint %}

Los componentes principales de esta actualización incluyen:

* Validación de importación atómica fijada en la cadena C-C.
* Agregada lógica de excepción de regla para permitir bloques de bonificación atómica
* Agregada lógica de fail-fast en Memoria Compartida si se emiten borrachos duplicados
* Cuestión fijada en donde las encuestas podrían pararse en el muñeco de nieve debido a que no se han resuelto las solicitudes
* Cuestión de BLOQUE BAD fijo en el núcleo debido a antepasados desconocidos
* Fijo una condición de carrera en el script de cadena canónica de reparación en coreth
* Número limitado de bloques de procesamiento en Snowman y txs de procesamiento en Avalanche
* Valores predeterminados de tiempo de red actualizados y valores de referencia
* Verificada no hubo violación de seguridad después de la inestabilidad inicial de la red

## v1.1.5 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.1.5)

**Fase 0 de albaricoque - Parche 5**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye mejoras de estabilidad. {% endhint %}

* Se fijó un posible bloqueo al registrar nuevas cadenas que podrían causar que el extremo de la cadena P y http\(s\) bloquee.
* Reparación TxID -> Bloque de la altura indexación en la cadena C.
* Se añadió un manejo elegante de implementaciones de contratos vacías en la API debug\_traceTransaction en la cadena C.
* Mejora de la manipulación de errores en la cadena C.

## v1.1.4 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.1.4)

**Fase 0 de albaricoque - Parche 4**

{% insinuar style="danger" %} Esta actualización es compatible hacia atrás. Es opcional, pero alentado. El parche incluye actualizaciones de CLI, correcciones de errores de API y mejoras de rendimiento. {% endhint %}

* Se solucionó un problema en el que los índices de bloque de cadena C podrían mapear a bloques no aceptados a una altura determinada.
* Coloque VM fijo cuando el RPCChainVM experimentó cargas de alta API.
* Fijo de voto optimista burbujeando en el Motor Avalanche para pasar correctamente los votos a través de vértices de procesamiento.
* Campo añadido IncludePartial a los métodos de API GetBalance y GetAllBalances de AVM. Esto cambia el comportamiento por defecto para devolver solo los saldos de activos fungibles y de propiedad única.
* Agregó la capacidad de especificar configs de génesis personalizadas para ID de red personalizados.
* Añadido funcionalidad adicional de API IPC.
* Añadido caché adicional al RPCChainVM.
* Búsqueda de directorio de plugin mejorada para siempre trabajar con los lanzamientos binarios.

## v1.1.3 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.1.3)

**Fase 0 de albaricoque - Parche 3**

{% insinuar style="danger" %} Esta actualización es opcional, pero alentada. El parche incluye correcciones de errores menores relacionadas con API. {% endhint %}

* Llamadas colgantes fijas cuando intentas filtrar registros de cadena C.
* Cliente de cadena C fijo para llamar a la API de múltiples monedas.
* Se añadió `getAtomicUTXOs` a los clientes de API `avm` y `platformvm`

## v1.1.2 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)

**Fase 0 de albaricoque - Parche 2**

{% insinuar style="danger" %} Esta actualización es opcional, pero alentada. El parche incluye correcciones de errores y mejoras de rendimiento. {% endhint %}

* caché de procesamiento de arranque fijo para reducir las traversals duplicadas al iniciar el arranque Avalanche.
* Verificación optimizada de la cadena P durante el arranque de arranque.
* Cálculo de la lista de bancos máximo fijada para utilizar los valores de entrada apropiados.
* Eliminaron las carreras de linterna extra de CI.
* Añadido `Altura` al muñeco de `snowman.Block` interfaz.

## v1.1.1 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)

**Fase 0 de albaricoque - Parche 1**

{% insinuar style="danger" %} Esta actualización es opcional, pero alentada. El parche incluye correcciones de errores y mejoras de rendimiento. {% endhint %}

* Se ha corregido un error de accidente de nodo cuando los usuarios desactivaron la API de `Salud.`
* Corregía un error en el seguimiento de tiempo de trabajo que podría reportar el tiempo de trabajo de un nodo.
* Refactored de vértice para usar un `Codec`.
* Separado gestión de vértice stateful y apátrida.
* Agregado por campo de longitud de rodajas de control al Codec.
* Introdujo un nuevo tipo de codec que agrupa los `TypeID`s juntos.
* Introducido las banderas límite de mensajes a la CLI.
* Introdujo un paquete semanticdb que se utilizará durante una futura migración de bases de datos.
* Añadido el seguimiento de Epoh al contexto de la cadena.
* Mejoró algunos de los mensajes de error devuelto durante la validación de transacciones.
* Reducido GC presión en la versión DB.

## v1.1.0 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)

**Fase 0 de albaricoque**

{% insinuar style="danger" %} **Tenga en cuenta que esta actualización no es compatible con versiones anteriores. Las actualizaciones deben realizarse a más tardar el lunes 7 de diciembre a las 11 p.m. UTC \(6 p.m. EST\). La actualización, que originalmente estaba programada alrededor de mediados de diciembre, se está acelerando para arreglar un importante error de desbloqueo de tokken. Instamos a todos los habitantes de la comunidad a que se actualicen lo antes posible para garantizar que sus nodos no se vean afectados.** {% endhint %}

Hay dos componentes principales para esta actualización:

* Preparativos generales para nuestra próxima actualización de red de albaricoque llamada el actualización de fase cero de Apricot
* Fijar un problema que impidió que las salidas bloqueadas de juego se desbloquearan después de que su bloqueo \_\*\*\_time hubiera pasado

## v1.0.6 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)

{% insinuar style="danger" %} Tenga en cuenta que esta versión contiene cambios de ruptura descritos [aquí](https://docs.avax.network/build/apis/deprecated-api-calls). Cambia el formato de respuesta predeterminado de platform.getTxStatus y platform.getCurrentValidators. La actualización es opcional, pero alentada. El parche incluye mejoras de rendimiento y algunas mejoras de calidad de vida. {% endhint %}

* Eliminados formatos de platform.getTxStatus y platform.getCurrentValidators.
* Añadido soporte para codificaciones hex de usuarios importados y exportados de la API de keystore.
* Configure el requisito de golang a v1.15.5 para evitar una vulnerabilidad DoS encontrada en el estándar de golang lib.
* Se añadió a los clientes de API para actuar como ayudantes interactuando con el software de nodo.
* Habilitado volver a caer de nuevo a la to si un nodo se desconecta del resto de la red.
* Se fijaron las API de GetutXOs cuando UTXOs referenció varias direcciones.
* Codificación binaria Refactored para generalizar mejor las opciones RPC.
* Filtrado de bloque IP fijo para configurar correctamente la longitud de la ventana.
* Generalizó el paquete de codec para poder gestionar múltiples codecs con diferentes versiones.
* Añadido Epoh a la interfaz Vertex en preparación de una futura liberación.
* Interacción diferida para reducir la utilización de CPU/Memoria más allá de cheques rápidos.
* Para aquellos que usan [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), la URL se cerrará en una versión futura. Por favor, cambie a [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

Para obtener asistencia con esta actualización, siga nuestra [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), si todavía se está ejecutando en problemas puede unirse a nuestra [Discord](https://chat.avax.network/) para obtener ayuda.

## v1.0.5 [\(Ver en GitHub\](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

{% insinuar style="danger" %} Tenga en cuenta que la liberación después de este, v1.0.6, contendrá los cambios de ruptura descritos [aquí](https://docs.avax.network/build/apis/deprecated-api-calls). A saber, el formato de respuesta de `platform.getTxStatus``` y platform.getTxStatus cambiarán. {% endhint %}

Los cambios en esta versión, v1.0.5, son compatibles con versiones anteriores. La actualización es opcional, pero alentada. El parche incluye mejoras de rendimiento y algunas mejoras de calidad de vida.

* Añadido `IssueTx` y `GetutXOs` a la API de cadena C para permitir la emisión de swaps atómicos sin revelar las teclas privadas de un nodo.
* Fuga de memoria fija en el gestor de solicitudes de muñeco de nieve con procesamiento de bloques oracle.
* Fijar el error de pago, UTXO que los fondos disponibles no reportados.
* Troncos http de cadena movidos para vivir en la carpeta de registros de cadena legible por humanos.
* Reestructurar cómo se consiguen las ID para evitar asignaciones de montaje.
* Optimizó los `Muestradores Uniformes` para evitar crear múltiples mapas.
* Reducido uso de `ids.Set` a favor de `[]ids.ID` para utilizar mejor la memoria continua.
* Introducido `[]byte` reuso en `PrefixDB`.
* Implementado funciones de clasificación específicas para evitar asignaciones de conversión de interfaz frecuentes.
* Optimizado usuario de carga AVM para evitar leer información innecesaria desde el disco.
* Eliminó una asignación de memoria + copia en el enchufe enviando para toda la duración del mensaje.

Para obtener asistencia con esta actualización, siga nuestra [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), si todavía se está ejecutando en problemas puede unirse a nuestra [Discord](https://chat.avax.network) para obtener ayuda.

## v1.0.4 [\(Ver en GitHub\](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

![AvalancheGo notas de lanzamiento v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% insinuar style="danger" %} Esta actualización es opcional, pero alentada. El parche incluye mejoras de calidad de vida y varias mejoras de rendimiento. Tenga en cuenta que esta actualización requiere que los parámetros CLI se requires con -- en lugar de permitir ya sea - o --. Por ejemplo, `-public-ip=127.0.0.1` ya no está permitido y debe especificarse como `--public-ip=127.0.0.1`. De lo contrario, esta actualización es compatible hacia atrás. {% endhint %}

```text
• Added subnet whitelisting to allow a node owner to choose which subnets to validate.
```

```text
• Added config file parsing for node settings.
• Added more options for specifying a node's IP address and added getNodeIP to the info *endpoint.
• Added a TxID to the result of get.Validators in the platformvm.
• Updated Coreth version.
• Cleaned up the snowball trie implementation and added additional tests to align with mutation tests.
• Implemented and optimized continuous time averages for tracking CPU and network latency.
• Significantly optimized memory allocations in various locations.
• Increased the signature verification cache size.
• Reduced DB reads during vertex management.
```

```text
• Added an optional argument includeReason to platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

Para obtener asistencia con esta actualización, siga nuestra [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), si todavía se está ejecutando en problemas puede unirse a nuestra [Discord](https://chat.avax.network) para obtener ayuda.

