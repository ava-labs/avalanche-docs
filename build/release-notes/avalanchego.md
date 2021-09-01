# Notas de lanzamiento de AvalancheGo

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.5.2 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2)\)


Esta actualización es compatible con [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Por favor, mira los tiempos de actualización esperados en la liberación de v1.5.0.

**Coreth**

* Patched una [vulnerabilidad de seguridad Geth](https://twitter.com/go_ethereum/status/1430067637996990464)
* Patched un pánico en el backend de APi.

**AVM**

* Introducido la generación de codec de stateless para mejorar las herramientas.

**Consenso**

* Añadida que se registra adicional alrededor de los votos bubbling


## v1.5.1-eth\_call \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call)\)

Esta actualización es compatible con [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Por favor, mira los tiempos de actualización de la red esperados en la liberación de v1.5.0.

Esta actualización es una solución de acceso directo para v1.5.1 que permite usar eth\_call sin el control de cuenta de propiedad externa


## v1.5.1 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1)\)

Esta actualización es compatible con [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Por favor, mira los tiempos de actualización de la red esperados en la liberación de v1.5.0.

**Configuración**

* Opción eliminada `bootstrap-retry-max-attempts`y opción adicional`bootstrap-retry-warn-frequency`

**Subnet**

* Añadida `subnetID`s al mensaje de aprehender. Esto notifica a los pares sobre qué subnets un nodo es interesante en la sincronización.
* Contenedores de subred optimizados

**AVM**

* El extremo `avm.GetTx`de JSON fijado para informar correctamente `amount`s en UTXOs.

**Bootstrapping**

* Se fija el bucle ocupado que podría ocurrir si la internet de un nodo cayó durante la toma de arranque, causando que el nodo informe un error fatal.

**RPCChainVM**

* Mejor caché de bloques no verificados.

**Coreth**

* Actualizado a Geth v1.10.7.

## v1.5.0 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)\)

**Este cambio no es compatible con versiones anteriores.**

Esta actualización agrega tarifas dinámicas a la C-chain, junto con varias otras mejoras.

Los cambios en la actualización entran en vigor a las 10 de la mañana EDT, 24 de agosto de 2021 en Mainnet. Debes actualizar tu nodo antes de que los cambios entren en vigor, de lo contrario puedes experimentar la pérdida de tiempo de actividad en tu nodo.

Más información se puede encontrar [aquí](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60).

**Actualizaciones de la red**

* Agregada cálculos de tarifas dinámicas a la C-chain.
* Incremento `CreateSubnetTx`y `CreateChainTx`tasas.
* Infecciones de corrupción de achas corregido en la validación de delegador.
* Forzada para transacciones `MaxStakeWeight`de delegación.

**Actualizaciones de cliente**

* Se añadieron capacidades de indexación de transacciones a la blockchain X para permitir la búsqueda histórica de transacciones por dirección y activo.
* Añadido `./avalanchego`como el comando por defecto en la imagen de docker.
* Versiones de dependencia estática en la imagen de docker.
* Eliminado el soporte de migración de la base de datos y el corredor de Deamon.
* Parking de nodos Refactored
* Contenedores optimizados
* Agregada la capacidad de crear de forma estática los binarios de AvalancheGo y EVM.
* Simplificó la `Block`interfaz para exponer el ID de la ID de la bloque de origen en lugar de buscar el bloque de padres completo.
* Añadida métricas adicionales para trabajos pendientes en los motores de consenso.
* Los estados de la P-chain Refactored para manejar los estados de validación de blockchain por separado de los estados de confirmación de transacción.

**API actualizadas**

* Añadida `GetAddressTxs`a la `avm`API.
* Añadida `SetLoggerLevel`y `GetLoggerLevel`a la `Admin`API para permitir la sintonización de los niveles de registro mientras el nodo sigue funcionando.
* Añadida `GetConfig`a la `Admin`API para permitir el config de nodo que el nodo está usando actualmente.
* `platformvm.Client`Actualizado para permitir la especificación de s `nodeID`en la respuesta a la respuesta `GetCurrentValidators`y `GetPendingValidators`generalización`GetStake`

**Argumentos actualizados de CLI**

* `fetch-only`Eliminado.
* Agregada prueba de confianza JSON a `avm`VM.
   * Añadido`indexTransactions`
   * Añadido`indexAllowIncomplete`

## PRE\_RELEASE v1.5.0-fuji \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji)\)

**Tenga en cuenta que esta versión es incapaz de ejecutar la red de información de la red principal, y mostrará "esta versión de nodo no admite la red de la red" si intenta ejecutarse con una configuración de la red central. Si ejecutas un nodo principal, no se requiere acción hasta que el lanzamiento oficial se publique la próxima semana**

**Este cambio no es compatible con versiones anteriores.**

Esta actualización agrega tarifas dinámicas a la C-chain, junto con varias otras mejoras.

Los cambios en la actualización entran en vigor a las 3 PM EDT, 16 de agosto de 2021 en la red Fuji. Después de que Fuji sea actualizado y verificado, se publicará una versión compatible de la red principal.

**Actualizaciones de la red**

* Agregada cálculos de tarifas dinámicas a la C-chain.
* Incremento `CreateSubnetTx`y `CreateChainTx`tasas.
* Infecciones de corrupción de achas corregido en la validación de delegador.
* Forzada para transacciones `MaxStakeWeight`de delegación.

**Actualizaciones de cliente**

* Se añadieron capacidades de indexación de transacciones a la blockchain X para permitir la búsqueda histórica de transacciones por dirección y activo.
* Añadido `./avalanchego`como el comando por defecto en la imagen de docker.
* Versiones de dependencia estática en la imagen de docker.
* Eliminado el soporte de migración de la base de datos y el corredor de Deamon.
* Parking de nodos Refactored
* Contenedores optimizados
* Agregada la capacidad de crear de forma estática los binarios de AvalancheGo y EVM.
* Simplificó la `Block`interfaz para exponer el ID de la ID de la bloque de origen en lugar de buscar el bloque de padres completo.
* Añadida métricas adicionales para trabajos pendientes en los motores de consenso.
* Los estados de la P-chain Refactored para manejar los estados de validación de blockchain por separado de los estados de confirmación de transacción.

**API actualizadas**

* Añadida `GetAddressTxs`a la `avm`API.
* Añadida `SetLoggerLevel`y `GetLoggerLevel`a la `Admin`API para permitir la sintonización de los niveles de registro mientras el nodo sigue funcionando.
* Añadida `GetConfig`a la `Admin`API para permitir el config de nodo que el nodo está usando actualmente.
* `platformvm.Client`Actualizado para permitir la especificación de s `nodeID`en la respuesta a la respuesta `GetCurrentValidators`y `GetPendingValidators`generalización`GetStake`

**Argumentos actualizados de CLI**

* `fetch-only`Eliminado.
* Agregada prueba de confianza JSON a `avm`VM.
   * Añadido`indexTransactions`
   * Añadido`indexAllowIncomplete`

## v1.4.12 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)\)

Esta actualización es compatible al revés. Es opcional, pero alentado.

**X-Chain**

* `GetTx`Añadido de formato `"json"`al método de API
* assertions de tipo de interfaz

**Info**

* Método añadido `GetNodeVersion`a la información API

**Metricas de Prometheus**

* métricas fijas y renombradas para bytes no enviados debido a la compresión
* métricas añadidas para bytes no recibidos debido a la compresión
* Agregada ayuda Estructurada `noAverager`al `metrics`paquete

**Base**

* Parámetros actualizados/agregados

**Memoria compartida**

* Reemplaza `Put`y `Remove`con el fin de `Apply`permitir la optimización de transacciones atómicas en el futuro

## v1.4.11 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)\)

**C-Chain**

Esta liberación permite instantáneas por defecto.

**Banderas de Config**

_Eliminado_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Añadido_

* `network-compression-enabled`

**Metricas de Prometheus**

Muchas métricas de Prometheus fueron renombradas y muchas histogramas fueron reemplazadas por 2 gauges. Ver [aquí](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) para mostradores actualizados de Grafana.

Esta liberación también agrega métodos de ayuda al `utils/metric`paquete.

**RocksDB**

RocksDB ya no está construido por defecto al ejecutar el script de construcción, y no está incluido en binarios de publicación pública. Para crear AvalancheGo con RocksDB, ejecutas `export ROCKSDBALLOWED=1`en tu terminal y luego .`scripts/build.sh` `--db-type=rocksdb`Debes hacer esto antes de poder usar

La base de datos de RocksDB localiza/busca sus archivos en un `rocksdb`subdirectorio. Tenga en cuenta que si anteriormente ejecutas con RocksDB, tendrás que mover los archivos existentes.

**Compresión de mensajes**

Nodos comprimir algunos mensajes P2P. Si un pares es la versión >= v1.4.11, Push Query, la lista de pares y los mensajes Multiput enviados al pares se comprimen usando gzip antes de ser enviados a través de la red. Esto reduce el uso de ancho de banda de AvalancheGo.

**Conexión de entrada Throttling de conexión **Refactored de conexión de entrada limitante y lo habilita de forma predeterminada.

**Mejoras generales**

* Refactored y mejorado el rendimiento de la iteración sobre una base de datos servida por gRPC a un plugin.
* En Linux, limpia la C-Chain si AvalancheGo muere de forma poco graciosa
* Refactored P2P definiciones de mensaje y move del `network`paquete.
* Agregada VM al servidor de API HTTP
* Reemplazado `1024`con , `units.KiB`etc.
* Mejora de la tolerancia de partición al procesar chits en orden de la creación de las preguntas correspondientes.

**IPs de Fuji**

Actualizado las IP de arranque para la Testnet de Fuji.

## v1.4.10 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)\)

**Apricot Fase 2 - Parche 10**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado.{% endhint %}

El parche incluye mejoras de rendimiento, aceleración y VM:

* Añadido soporte para usar en `RocksDB`lugar de `LevelDB`en arquitecturas compatibles.
* Reestructurada de la red de entrada para estar en una base por nodo, para restringir el uso de ancho de banda de nodos compañeros.
* Reestructurada de red de salida al peso asignado por bytes por acción.
* `true`Actualizado el valor por defecto de la `pruning-enabled`bandera para la C-chain.
* Habilitado el registro de VM personalizadas sobre RPC.
* Actualizado status de blockchain para informar del estado de validación.
* Movida `TimestampVM`en su propio repositorio para coincidir con la ruta de creación de VM esperada
* Guión de código protobuf para colocar `grpc`archivos en la ubicación correcta.
* Pasó los bytes de bloque a través de la para evitar cualquier posible fallo de verificación `rpcchainvm#Block.Verify`de desalojos de caché.

## v1.4.9 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)\)

**Apricot Fase 2 - Parch 9**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado.{% endhint %}

El parche incluye mejoras de rendimiento y mejoras de monitorización:

* Añadido soporte para ejecutar la C-chain con poda habilitada. La Pruning está actualmente desactivada de forma predeterminada.
* Intervalo de ping de C-chain para reducir las desconexiones cuando se encuentra detrás de la carga de balancer
* Añadida de timestamp a la interfaz de bloque snowman
* Error fijo en la aplicación máxima de la API de C-chain para las llamadas hechas a través de websockets.
* Agregada soporte de cabecera gzip para el punto de extremo http.
* Agregada descripciones de versión adicionales al punto de `info.getNodeVersion`referencia.
* Restringida la conexión a las versiones de nodo >= 1.4.5.
* Registros de daemon movidos debajo de la carpeta de registro principal.
* Añadido soporte para el muestreo determinista.
* Agregada acción de implementación automática GitHub para nuevas etiquetas.
* Refactored Transformed Transformed Transformed Config Management para apoyar mejor lanzamiento de nodos programmatically.

## v1.4.8 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)\)

**Apricot Fase 2 - Parche 8**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado.{% endhint %}

El parche incluye mejoras de rendimiento, mejoras de monitoreo y soluciones de subred:

* Cambió la definición de tasas de la AVM para hacer cumplir las tarifas que se pagaran en el activo nativo de la cadena. Esto no cambia el comportamiento de la X-Chain, pero hace que otras instancias de AVM sean usables.
* Agregada la capacidad de especificar configures a las cadenas específicas. Esto deshace el parámetro `coreth-config`CLI.
* Tasa de agregado que limita al número de nuevas conexiones de salida salientes.
* Introdujo un envoltorio VM que agrega métricas transparentes a una cadena.
* Agregada la capacidad de permitir la elaboración de perfiles de nodo continuo.
* Reducción de las asignaciones de bytes en la capa de networking.
* Agregada varios parámetros CLI para afinar parámetros de chismes.
* Los nodos habilitados para ejecutar usando un par de claves efímero, en lugar de uno que se lee desde el disco.
* Eliminamos una advertencia spurious incorrecta.
* Pruebas de CI Moved para ejecutarse en Acciones de Github en lugar de ejecutarse en Travis.
* Eliminaron casos especiales desde la interfaz VM.

**Argumentos de la línea de comandos**

* `profile-dir`
* `profile-continuous-enabled`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consensus-on-accept-gossip-size`
* `consensus-accepted-frontier-gossip-size`
* `meter-vms-enabled`
* `staking-ephemeral-cert-enabled`
* `outbound-connection-timeout`
* `outbound-connection-throttling-rps`

## v1.4.7 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)\)

**Apricot Fase 2 - Parche 7**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye mejoras de rendimiento y correcciones de errores.{% endhint %}

Si la versión de nodo instalado anteriormente es <= v1.4.4, entonces este nodo puede haber dejado de procesar bloques. Esta actualización reparará el nodo y realizará una migración de la base. Para detalles sobre la migración de la base de datos vea las notas de [migración de la base de datos v1.4.5](avalanchego-v1.4.5-database-migration.md). Si la versión de nodo instalado anteriormente es >=v1.4.5, entonces este nodo utilizará la base de datos existente y no necesita realizar una migración de la base.

* `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`Fijo el nodo pre-migration para verificar correctamente el bloque de P
* Regresión fija en `platformvm.GetBlockchains`para devolver correctamente las blockchains de subred primarias.
* Actualizado la versión grpc a v1.37.
* Muestreo de pares
* Agregada base de datos.
* Reducido varias asignaciones de memoria repetidas.

## v1.4.6 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)\)

**Apricot Fase 2 - Parche 6**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado. Este parche incluye mejoras de rendimiento y correcciones de errores.{% endhint %}

**Si la versión de nodo instalado anteriormente es <= v1.4.4, entonces este nodo realizará una migración de la base. Para detalles sobre la migración de la base de datos vea las notas de liberación v1.4.5.** Si la versión de nodo instalado anteriormente es v1.4.5, entonces este nodo utiliza la base de datos existente y no necesita realizar una migración de la base.

Este parche:

* Elimina la emisión de transacciones inválidas en el mempool de P blockchain que causó escritura de DB sostenidas de alto sostenido.
* Ignorados archivos y carpetas no de bases de datos en el directorio de la base. Esto debería reparar específicamente errores reportados en macOS con . Archivos de DS\_Store
* Se fija la bandera de build-dir para ser capaz de ser especificada a través de CLI sin causar el nodo de preupgrade al error
* Eliminamos la bandera de plugin-dir que ya no es compatible con el demonio de node-manager Normalmente no especificando la bandera lleva al comportamiento correcto. Sin embargo, para instalaciones complejas puede ser necesario la bandera de build-dir.
* Los mensajes de chismes forzados solo a las conexiones que han terminado el aprehensión de manos de compañeros.
* Reducción de las asignaciones de memoria durante los traversals de consenso y la toma de arranque.

## v1.4.5 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)\)

**Apricot Fase 2 - Parche 5 - Actualización de DB**

**Esta actualización está más involucrada que la actualización de versión típica. ****Aquí se pueden [**encontrar**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration) instrucciones más detalladas y una FAQ**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye mejoras de rendimiento significativas y numerosas otras actualizaciones.{% endhint %}

**Mejora de VM:**

* Rediseñado totalmente la gestión `platformvm`del estado
   * Eliminamos el uso de `versiondb`s que se transmiten a través de bloques para pasar referencias de estado que pueden ser modificadas y leídas sin re-parsing objetos.
   * Implementó un gestor de estado de base para escribir correctamente caché y mange en la base de datos subyacente.
   * Implementamos conjuntos de validador de CoW para permitir la caché de varios conjuntos de validadores en la memoria.
   * Cadenas de Indización por subred para evitar tocar objetos de estado no usados.
   * `nodeID`Validadores de índices para evitar iteraciones innecesarias al aceptar `addDelegator`y `addSubnetValidator`transacciones.
   * Reducido el número de pares de valor clave dedicados a gestionar conjuntos de validadores en disco y validadores
* Agregada búsqueda de recompensa a la API de la `platformvm`'s para admitir la indexación de recompensas.
* Validador refactorizado de medición de tiempo de actividad para simplificar las pruebas.
* Se añadieron métricas de tipo de bloque y transacción a la `platformvm`.
* Añadidas métricas de llamadas de API a la `avm`y a la .`platformvm`
* Actualizado la gestión del estado para usar `prefixdb`s, grabar métricas `avm`de caché y compartir código adicional con el `platformvm`.
* `UTXO`Gestión simplificada e indexación en los `avm`y .`platformvm`
* Para compartirse totalmente entre instancias VM compatibles.
* Reestructurada memoria compartida de la subred primaria para ser totalmente compartida entre instancias VM.
* Agregó una implementación de estado de la cadena para apoyar el cacheo sin interrupciones sobre las implementaciones VM existentes y simplificar la implementación de nuevas VM
* `rpcchainvm`Integrada el nuevo gerente de estado de la blockchain en la , que también agrega varias métricas.
* Añadida `upgradeBytes`y `configBytes`a la interfaz VM estándar para soportar mejores actualizaciones de la red
* Añadida `getAtomicTx`y puntos de `getAtomicTxStatus`finalización a la `evm`API.
* La producción de `evm`bloque simplificada para ser realizada de forma sincronizada con el motor de consenso.
* Agregada un mempool de transacción atómica para reintroducir transacciones atómicas orphaned
* Error fijo en el `evm`cliente para establecer correctamente el `sourceChain`en .`getAtomicUTXOs`
* Integró el nuevo gerente de estado de la block, en el `evm`para optimizar mejor la gestión de block.

**Mejora de la captura:**

* Eliminaron re-traversals durante la strapping. Esto mejora significativamente el rendimiento del nodo durante las reinicies del proceso de toma de arranque.
* Se ha fijado un cierre de nodo sin gracia al intentar salir del nodo al ejecutar contenedores de arranque
* Transmisiones de contenedores de IPC durante la toma de arranque.
* Normalizó la cola de trabajo de arranque para escribir en el estado usando `prefixdb`s en lugar de implementar la prefijación personalizada.
* Añadida métricas de caché y caché adicionales.

**Adiciones de migración de la base:**

* Agregó un gestor de procesos de daemon para migrar sin interrupciones al formato de base de datos actualizado.
* Manipulación de versión Refactored para rastrear versiones semánticas de la base de datos.
* Implementó un gestor de base de datos para rastrear y operar en diferentes versiones de bases de datos.
* Implementó una `keystore`migración que copia automáticamente a los usuarios de la base de `v1.0.0`datos a la base de `v1.4.5`datos.
* Implementó una migración de tiempo de actividad de la base de `v1.0.0`datos a la base de `v1.4.5`datos.

**Mejoras de nodo:**

* Actualizando el análisis de configuración para expandir siempre variables de entorno.
* Refactorizó la confección de nodo para permitir la especificación de certificados TLS en memoria sin tocar disco.
* Añadido mejor soporte para códigos de salida significativos.
* Muestra la dirección de escucha de los `http`y `staking`servidores para ayudar a apoyar los aparcamientos de puertos no específicos.
* Implementó una base de datos para poder cambiar entre un pase a través de una base `versionable`de datos y una base de `versioned`datos.
* `Set`pre-allocations de ID optimizadas y reducimos el uso de la memoria de las `struct`s.
* Reglas de linaje forzadas

**Argumentos de la línea de comandos modificados:**

Para los siguientes argumentos `"default"`fueron tratados anteriormente como una palabra clave. Ahora, `"default"`intentará ser tratado como el valor deseado de la bandera. Para conservar el comportamiento por defecto, la bandera no debe ser especificada.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

Para los siguientes argumentos `""`fueron tratados anteriormente como una palabra clave. Ahora, `""`intentará ser tratado como el valor deseado de la bandera. Para conservar el comportamiento por defecto, la bandera no debe ser especificada.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

Ya no es necesario que los `bootstrap-ips`y `bootstrap-ids`estén paired. Esto significa que ahora es válido para especificar un número diferente `bootstrap-ips`que .`bootstrap-ids` Los `bootstrap-ips`se usan para conectarse inicialmente a la red y los `bootstrap-ids`se usan como los beacons en la toma de arranque.

**Argumentos de la línea de comandos:**

* `fetch-only`
* `build-dir`

**Argumentos de la línea de comandos**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)\)

**Apricot Fase 2 - Parche 4**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado.{% endhint %}

El parche incluye correcciones de errores y mejoras de rendimiento que buscan optimizar la próxima `db-upgrade`liberación.

* Retardo de cola en el arranque de forma que todas las blockchains terminen tan pronto como la última cadena esté marcada como bootstrapped en una subred.
* Mejora de la manipulación de mensajes durante el arranque para manejar mensajes mientras espera que otras blockchains se sincronizarán.
* Reducción de las asignaciones de muestras al reusar los muestras existentes.
* Escrituras de docker actualizado para solo presionar imágenes de la `master`rama.
* Formateo de registro
* Mensajes de error

## v1.4.3 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)\)

**Apricot Fase 2 - Parch 3**

{% hint style="warning" %}Esta actualización es compatible al revés. Es opcional, pero alentado.{% endhint %}

El parche incluye correcciones de errores, monitorización actualizada de tiempo de actividad y mejoras de rendimiento.

* Manipulación de mensajes de banco fijo que podría causar que un nodo sea incapaz de avanzar durante la toma de arranque. Esto fue típicamente experimentado cuando el nodo no lograría la transición a la ejecución normal ya que estaba finalizando la strapping.
* Se ha fijado un error no determinista en la base de código de C-Chain que podría causar nodos que reciben muchas solicitudes de emisión de transacciones para dejar de producir temporalmente bloques hasta que procesen un bloque producido por otro nodo.
* Restringió el número de mensajes de versión que se enviarán a un pares a uno.
* Eliminaron mensajes de manos legados que fueron recados en la fase 2 de Apricot
* Nodos marcados que han sido benched como no en línea para cálculos de tiempo de actualización.
* Actualizado el validador establecido para ser más performante durante los cambios de validador
* Actualizado la red para solo intentar reconectarse a un par en desconexión si son actualmente un validador de la red.

## v1.4.2 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)\)

**Apricot Fase 2 - Parche 2**

{% hint style="warning" %}Esta actualización es compatible con v1.4.0 y v1.4.1. Los cambios en la actualización entran en vigor a las 10 de la AM 5de mayo de 2021 en la prueba Fuji y las 7 de la EDT de la Fuji , el 10 de mayo de 2021 en la red principal.{% endhint %}

El parche reduce aún más el tamaño de los mensajes de pares gossiped e introduce varias nuevas banderas:

* `network-peer-list-size`permite afinar el número de pares chismes en cada `peerlist`mensaje.
* `network-peer-list-gossip-size`permite afinar el número de pares a los que se cotizan `peerlist`mensajes de chismes.
* `network-peer-list-gossip-frequency`permite afinar con frecuencia s se `peerlist`cotizan en chismes.

## v1.4.1 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)\)

**Apricot Fase 2 - Parche 1**

{% hint style="warning" %}Esta actualización es compatible con v1.4.0. Por favor, mira los tiempos de actualización esperados en la liberación de v1.4.0.{% endhint %}

El parche reduce el tamaño de los mensajes de pares gossiped e introduce una nueva bandera `--bootstrap-beacon-connection-timeout`que permite que la hora de conexión de beacon sea configurada en la puesta en marcha.

## v1.4.0 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)\)

**Apricot Fase 2**

{% hint style="danger" %}**Tenga en cuenta que este cambio no es compatible con versiones anteriores.**

**El post de blog relacionado se puede encontrar **[**aquí**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.**{% endhint %}

{% hint style="warning" %}Esta actualización aplica la actualización de Berlín a la C-chain, agrega un nuevo punto de extremo de AVM e incluye varias mejoras de estabilidad. Instamos a todos los en la comunidad a actualizar lo antes posible para asegurar que sus nodos permanezcan sanos.

Los cambios en la actualización entran en vigor a las 10 de la AM 5de mayo de 2021 en la prueba Fuji y las 7 de la EDT de la Fuji , el 10 de mayo de 2021 en la red principal.{% endhint %}

**Los componentes principales de esta actualización incluyen:**

* Coret actualizado para depender de v1.10.2 de go-ethereum.
* Aplicó la actualización de Ethereum Berlín. Específicamente [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) y [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Agregada nuevos contratos inteligentes precompilados a la blockchain C, para soportar transferencias ANT y envoltorios ARC-20 alrededor de ANT.
* Agregada un `/events`extremo de AVM que admite la notificación de websocket de transacciones aceptadas que coincida con un filtro de direcciones.
* Agregada dos nuevos tipos de mensajes de red `SignedVersion`y para mejorar `SignedPeerlist`el validador -> aparcamientos de IP.
* Se ha fijado un error de larga data donde se cierra el nodo mientras una cadena estaba bootstrapping podría hacer que la cadena se apagara sin gracia.
* Actualizado los paquetes de gRPC de plugin para pagar grandes peticiones para mejorar la estabilidad.
* Agregada la capacidad de ejecutar el binario principal de avalanchego como un plugin.
* Fija una condición de raza potencial en la protección de la corrupción de leveldb
* Actualizado los scripts de construcción automatizados para soportar mejor varias arquitecturas.

**Argumentos de la línea de comandos:**

* `plugin-mode-enabled`especifica el binario para ejecutarse en modo plugin.

**Argumentos de la línea de comandos**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)\)

**Apricot Fase 1 - Parche 2**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye mejoras de seguridad, correcciones de errores y mejoras de monitoreo.{% endhint %}

**Mejoras de seguridad**

* Forzó un formato canónico estricto para bloques de C-chain hechos antes de `Apricot Phase 1`. Esto garantiza que las modificaciones al campo de bloque no puedan dar lugar a modificaciones al estado de la `extra-data`block, durante la toma de arranque.
* Cambió el para asegurar `Keystore`que solo se envían valores cifrados sobre el IPC entre avalanchego y los procesos de plugin.

**Soluciones de error:**

* Los cálculos de la capitalización de la delegación fija para incluir la actualización de la delegación actual máxima antes de eliminar un delegador. Esto garantiza que la tope de delegación
* `AVM`La API estática fijada para ser registrada correctamente al iniciar la creación.
* `uptime`Cálculos de nodo actualizado para tomar las actualizaciones de red en cuenta.

**Mejoras de monitoreo**

* Agregada un indexer de nodo opcional que puede proporcionar un pedido local coherente de operaciones aceptadas en una cadena.
* Inventario anatómico actualizado para incluir numerosas mejoras \(enormes gracias a @moreati\).

## v1.3.1 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)\)

**Apricot Fase 1 - Parche 1**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye estabilidad, mejoras de monitoreo y soluciones de errores menores.{% endhint %}

**Los componentes principales de esta actualización incluyen:**

* Segalla de C Fixed al realizar la compresión en CPU de brazo64.
* Agregada permisos de grupo a los archivos locales para permitir la monitorización de nodo complejo.
* Espacio blanco de las contraseñas de Auth Auth de Auth
* Tiempo eliminado timeSinceNoOutstandingRequests que se sustituya por la longestRunningRequest.
* Añadida métricas adicionales en aceleramiento de la red.
* Varias limpieza de código.

**Argumentos de la línea de comandos:**

* `network-health-max-outstanding-request-duration`

**Argumentos de la línea de comandos**

* `network-health-max-time-since-no-requests`

## v1.3.0 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)\)

**Apricot Fase 1**

{% hint style="danger" %}Tenga en cuenta que este cambio no es compatible con versiones anteriores.

Esta actualización reduce las tasas de gas de C-chain y elimina los reembolsos de gas de C-chain e incluye varias mejoras de seguridad. Instamos a todos los en la comunidad a actualizar lo antes posible para asegurar que sus nodos permanezcan sanos.{% endhint %}

Los cambios en la actualización entran en vigor a las 10 de la EST, 25 de marzo de 2021 en la prueba de Fuji y 10 de la EST, 31 de marzo de 2021 en la red principal.

**Los componentes principales de esta actualización incluyen:**

* Reducción de gas de C-chain desde 470 nAVAX a 225 nAVAX
* Eliminaron los reembolsos de gas de C-chain Este cambio adopta [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* La verificación de la blockchain C para ser más limpia al realizar actualizaciones de la red.
* Se ha fijado la API de Auth para hacer cumplir adecuadamente tokens revocados.
* Fortaleció la API de Auth para asegurar que se utiliza el formato de firma esperado.
* Eliminó la contraseña de la API de Auth desde los argumentos CLI.
* Agregada comprobaciones de permisos de archivo más estrictas
* Añadida un pequeño manejo de error adicional.
* El registro sanitario escribe antes de ser escrito en disco.
* Añadidos orígenes configurables al punto de extremo HTTP.
* Eliminamos intentos HTTP a HTTP fracasar en el inicio. Ahora el nodo se cerrará en arranque si la actualización de la terminal HTTP a las HTTP fracasa.

**Argumentos de la línea de comandos:**

* `api-auth-password-file`Especifica el archivo para leer la contraseña de la API de Auth desde la que se encuentra.

**Argumentos de la línea de comandos**

* `api-auth-password`

## **v1.2.4 **\([**Ver en GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**\)**

**Apricot Fase 0 - Actualizar 1 - Parche 4**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye mejoras de estabilidad y monitorización.{% endhint %}

* Readme para corregir los requisitos de almacenamiento.
* Agregada manipulación de error adicional a la verificación de Avalanche Tx durante la toma de arranque.
* Actualizado numerosas métricas incluyendo agregar numerosas métricas nuevas relacionadas con la salud de nodo y el uso de la base de datos, eliminar métricas no usadas e inválidas y fijar algunos nombres métricos.
* Añadida sesión adicional a CI.
* Añadida la blockchain C a la lista de chains. críticos.

## **v1.2.3 **\([**Ver en GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**\)**

**Apricot Fase 0 - Actualizar 1 - Parche 3**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye mejoras de estabilidad y monitorización.{% endhint %}

* Parámetros de verificación de salud ajustados para eliminar las pruebas de `[network, router, consensus]`salud de flaky
* Manipulación simplificada de bloque de C-chain

## **v1.2.2 **\([**Ver en GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**\)**

**Apricot Fase 0 - Actualizar 1 - Parche 2**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye la estabilidad, el rendimiento y las mejoras de monitoreo.{% endhint %}

* Agregada IP alias en la biblioteca de red para evitar llamadas `SYN`repetidas.
* Manipulación de mensajes de arranque fijo al iniciar bootstrapping desde ti mismo.
* issuance. `AdvanceTimeTx`simplificada.
* Añadido nuevos cheques de salud de consenso.
* Añadiendo el registro de salud de nodos.
* Añadida respuestas de salud a las solicitudes de `GET`salud.
* Registros de mensajes entrantes consolidados.
* Se añadió el registro de error al `LevelDB`wrapper.
* Agregada códigos de error al `rpcdb`para evitar la interacción de string.
* Mejora la manipulación de la C-chain de la blockchain canónica para reducir el número de reorgs.
* Mejora la manipulación de la C-chain de las llamadas de mock realizadas en el `pending`bloque.

## **v1.2.1 **\([**Ver en GitHub**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**\)**

**Apricot Fase 0 - Actualizar 1 - Parche 1**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional, pero alentado. El parche incluye la estabilidad, el rendimiento y las mejoras de monitoreo.

Tenga en cuenta que esta actualización elimina \`network-timeout-increase\` y ‘network-timeout-reduction\` como argumentos de la línea de comandos.{% endhint %}

Resumen de cambios:

* Agregada \`UTXO a la respuesta \`platformvm.getStake\`.
* Añadida de benchlist que informa a la respuesta \`info.peers\`
* Agregada revisiones de salud adicionales en la capa de redes.
* Añadido \`por ciento de las acciones conectadas\` como una métrica informada.
* Agregada lógica de reinicio de arranque para asegurar que el nodo ha alcanzado la punta actual, incluso durante tiempos de alto rendimiento.
* Agregada bootstrapping de arranque de toda la subred para asegurar que una cadena no se quede detrás debido a otra chain de la cadena.
* Prevaleció la verificación de bloques rechazados para evitar el cálculo innecesario.
* Eliminado el chismes de bloques no preferidos a la red.
* Conmutó la calculadora de tiempo de red para usar una EWMA de la latencia de red observada
* Eliminamos peticiones \`Get\` de los cálculos de latencia de la red.
* Limpiamos el algoritmo de cotización comparativa.
* Limpió el manejo de mensajes caídos en el envío.
* Limpiamos la solicitud pendiente y la lógica de tiempo
* Seguimiento de rendimiento generalizado para permitir la fijación de nombres de perfil.
* Añadida caché adicional al arranque de Avalanche
* Acuñación fija ansible
* Los argumentos de la línea de comandos añadidos consisten principalmente en configuraciones de cheques de salud. Además, los cálculos de latencia de la red modificados cambiaron el nombre de algunos arg de línea de comandos.

Argumentos de la línea de comandos:

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
* \`bootstrap-retry-enabled\` habilitados
* \`bootstrap-retry-max-attempts\`

Argumentos de la línea de comandos

* \` de \`network-timeout-increase\`
* \` \`network-timeout-reduction\`

## v1.2.0 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0)\)

**Apricot Fase 0 - Upgrade 1**

{% hint style="danger" %}**Tenga en cuenta que este parche no es compatible con versiones anteriores. Esta actualización fija problemas de rendimiento relacionados con las transferencias de intercambio entre X, C y P. Instamos a todos los en la comunidad a actualizar lo antes posible para asegurar que sus nodos no se vean afectados. Además, ten en cuenta de que los nodos pueden tomar varios minutos adicionales para conectarse después de la actualización y el proceso debería ser permitido completar sin interrupciones.**{% endhint %}

Los componentes principales de esta actualización incluyen:

* validación de importación atómica fija en C-Chain
* Agregada lógica de excepción a la regla para permitir bloques de bono atómicas
* Agregada lógica fail-fast en la memoria compartida
* Cuestión fija en el que las encuestas podrían stall el hombre de nieve debido a la falta de resolver las peticiones
* Edición de BAD BLOCK en núcleo debido a los ancestros desconocidos
* Fija una condición de raza en la reparación de script de blocket canónico en coreth
* Número limitado de bloques de procesamiento en Snowman y procesamiento de txs en Avalanche
* Valores de configuración de red actualizada de tiempo de espera
* Verificado no hubo violación de seguridad después de la inestabilidad de la red inicial

## v1.1.5 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5)\)

**Apricot Fase 0 - Parche 5**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional pero alentado. El parche incluye mejoras de estabilidad.{% endhint %}

* Se ha fijado un bloqueo potencial al registrar nuevas blockchains que podrían hacer que el punto de finalización de la P-chain y http\(s\) se bloquee.
* Repara TxID -> Bloque de la altura en la cadena C.
* Agregada manipulación elegante de implementaciones de contratos vacías en la API de debug\_traceTransaction en la C-chain.
* Mejora de la manipulación de error en la C-chain.

## v1.1.4 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4)\)

**Apricot Fase 0 - Parche 4**

{% hint style="danger" %}Esta actualización es compatible al revés. Es opcional pero alentado. El parche incluye actualizaciones de CLI, soluciones de errores de la API, mejoras de estabilidad y mejoras de rendimiento.{% endhint %}

* Se ha fijado un problema en el que los índices de bloque de C-chain podrían asignar a los bloques no aceptados en una altura dada.
* Coloca VM cuando el RPCChainVM experimentó cargas de alta API.
* Burbuja de voto optimista en el motor de Avalanche para pasar correctamente los votos a través de los vértices de procesamiento.
* Campo añadido IncludePartial a los métodos de API de GetBalance y GetAllBalances Esto cambia el comportamiento por defecto para devolver los saldos de activos fungibles y de propiedad única.
* Agregada la capacidad de especificar configuraciones de génesis personalizadas para ID de red personalizados.
* Agregada funcionalidad de API IPC
* Añadido caché adicional al RPCChainVM.
* Búsqueda de directorio de plugin mejorada para trabajar siempre con los lanzamientos binarios.

## v1.1.3 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3)\)

**Apricot Fase 0 - Parch 3**

{% hint style="danger" %}Esta actualización es opcional pero alentado. El parche incluye correcciones de errores menores relacionadas con las API.{% endhint %}

* Llamada de suspensión fija al intentar filtrar registros de C-chain.
* Cliente de C-chain fijo para llamar la API de varias monedas.
* `avm`Añadido `getAtomicUTXOs`a los clientes de `platformvm`API

## v1.1.2 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)\)

**Apricot Fase 0 - Parche 2**

{% hint style="danger" %}Esta actualización es opcional pero alentado. El parche incluye correcciones de errores y mejoras de rendimiento.{% endhint %}

* Cache de procesamiento de arranque fijo para reducir los traversals duplicados al iniciar la bootstrapping de Avalanche.
* Verificación de la blockchain P optimizada durante la toma de arranque.
* Cálculo de la lista de bancos máximos fijados para usar los valores de entrada apropiados.
* Se eliminan las versiones de linaje extra desde CI.
* Añadida `Height`a la `snowman.Block`interfaz.

## v1.1.1 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)\)

**Apricot Fase 0 - Parche 1**

{% hint style="danger" %}Esta actualización es opcional pero alentado. El parche incluye correcciones de errores y mejoras de rendimiento.{% endhint %}

* Se ha corregido un error de accidente de nodo cuando los usuarios desactivaron la `Health`API.
* Se ha corregido un error en el seguimiento de tiempo de actividad que podría informar sobre el tiempo de actividad de un nodo.
* Pruebas de vértice refactorizado para usar un `Codec`.
* Gestión de vértex de status y apátridas.
* Agregada longitud de rodaje por campo al Codec.
* Introdujo un nuevo tipo de codec que agrupa s `TypeID`s juntos.
* Introducido con banderas de mensaje límite a la CLI.
* Introdujo un paquete semanticdb para ser utilizado durante una futura migración de la base de datos.
* Añadida Epoh rastreo al contexto de la cadena.
* Mejoró algunos de los mensajes de error devueltos durante la validación de transacciones.
* Reducción de la presión GC en la versión DB.

## v1.1.0 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)\)

**Apricot Fase 0**

{% hint style="danger" %}**Tenga en cuenta que esta actualización no es compatible con versiones anteriores. Las actualizaciones deben realizarse a más tardar el lunes 7 de diciembre a las 11 p.m. UTC \(6 p.m. EST\). La actualización, que originalmente estaba programada a mediados de diciembre, se está acelerando para arreglar un error de desbloqueo de tokens importantes. Instamos a todos los en la comunidad a actualizar lo antes posible para asegurar que sus nodos no se vean afectados.**{% endhint %}

Hay dos componentes principales a esta actualización:

* Preparativos generales para nuestra próxima actualización de red de Apricot llamada la actualización de fase Zero
* Fijación de un problema que impidió que las salidas de bloqueo de participación fueran desbloqueadas después de que su bloqueo \_\*\*\_time hubiera pasado

## v1.0.6 \([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)\)

{% hint style="danger" %}Tenga en cuenta que esta versión contiene cambios de ruptura descritos [aquí.](https://docs.avax.network/build/apis/deprecated-api-calls) Cambia el formato de respuesta por defecto de platform.getTxStatus y platform.getCurrentValidators. La actualización es opcional pero se recomienda. El parche incluye mejoras de rendimiento y algunas mejoras de calidad de vida.{% endhint %}

* Se han eliminado los formatos obsoletos de platform.getTxStatus y platform.getCurrentValidators.
* Se añadió soporte para codificaciones hexadecimales de usuarios importados y exportados desde la API de keystore.
* Se ha establecido el requisito de golang a la v1.15.5 para evitar una vulnerabilidad de DoS encontrada en el estándar golang lib.
* Se han añadido clientes de la API para que actúen como ayudantes interactuando con el software del nodo.
* Se ha habilitado la posibilidad de volver al arranque si un nodo se desconecta del resto de la red.
* Arregladas las APIs de GetUTXOs cuando UTXOs referenciaba múltiples direcciones.
* Se refactorizó la codificación binaria para generalizar mejor las opciones de RPC.
* Se ha fijado el filtrado de bloque IP para establecer correctamente la longitud de la ventana.
* Se ha generalizado el paquete de códecs para poder manejar múltiples códecs con diferentes versiones.
* Se añadió Epoch a la interfaz Vertex en preparación de una futura versión.
* Se aplazó el hashing de las transacciones para reducir la utilización de la CPU/Memoria más allá de los chequeos rápidos.
* Para aquellos que usan [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), la URL se cerrará en una versión futura. Por favor cambia a [https://explorerapi.avax.network/](https://explorerapi.avax.network/)

Para ayuda con esta actualización, sigue nuestra pregunta de [desarrolladores FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), si sigues encontrándote en problemas puedes unirse a nuestra [Discord](https://chat.avax.network/) para obtener ayuda.

## v1.0.5 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)

{% hint style="danger" %}Tenga en cuenta que la liberación después de este, v1.0.6, contendrá los cambios de ruptura descritos [aquí.](https://docs.avax.network/build/apis/deprecated-api-calls) Es decir, el formato de respuesta `platform.getTxStatus`y `platform.getCurrentValidators`cambiará.{% endhint %}

Los cambios en esta versión, v1.0.5, son compatibles con versiones anteriores. La actualización es opcional pero se recomienda. El parche incluye mejoras en el rendimiento y algunas mejoras en la calidad de vida.

* Agregada `IssueTx`y `GetUTXOs`a la API de C-chain para permitir la emisión de intercambios atómicos sin revelar claves privadas a un nodo.
* Se corregió la fuga de memoria en el gestor de peticiones de snowman con el procesamiento de bloques de oráculo.
* Se corregió el error de paginación de UTXO que no informaba sobre los fondos disponibles.
* Se han movido los registros de la cadena http a la carpeta de registros de la cadena legible por los humanos.
* Se ha reestructurado la forma en que se gestionan las ID para evitar las asignaciones de montones.
* Optimizó las `UniformSampler`s para evitar crear varios mapas.
* Reducción de uso de `ids.Set`a favor de `[]ids.ID`utilizar mejor la memoria continua.
* Introducido la `[]byte`reutilización en .`PrefixDB`
* Se han implementado funciones de clasificación específicas de tipo para evitar asignaciones frecuentes de conversión de interfaz.
* Se ha optimizado el usuario de carga AVM para evitar leer información innecesaria del disco.
* Eliminada una asignación de memoria \+ copia en el envío de sockets para toda la longitud del mensaje.

Para ayuda con esta actualización, sigue nuestra pregunta de [desarrolladores FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), si sigues encontrándote en problemas puedes unirse a nuestra [Discord](https://chat.avax.network) para obtener ayuda.

## v1.0.4 [\(Ver en GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)

![AvalancheGo notas de liberación v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}Esta actualización es opcional pero alentado. El parche incluye mejoras en la calidad de vida y varias mejoras en el rendimiento. Tenga en cuenta que esta actualización requiere que los parámetros de la CLI se especifiquen con -- en lugar de permitir - o --. Por ejemplo, no `-public-ip=127.0.0.1`está permitido y debe ser especificado como .`--public-ip=127.0.0.1` De lo contrario, esta actualización es compatible al revés.{% endhint %}

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

Para ayuda con esta actualización, sigue nuestra pregunta de [desarrolladores FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq), si sigues encontrándote en problemas puedes unirse a nuestra [Discord](https://chat.avax.network) para obtener ayuda.

