# Notas de lanzamiento de AvalancheGo

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.6.3 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.3))

Esta versión es compatible con versiones anteriores a la [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Es opcional, pero recomendada.

**Opciones de configuración**

- Se actualizó el valor predeterminado de `--inbound-connection-throttling-max-conns-per-sec` a `256`.
- Se actualizó el valor predeterminado de `--meter-vms-enabled` a `true`.
- Se actualizó el valor predeterminado de `--staking-disabled-weight` a `100`.

**Métricas**

- Se cambió el comportamiento de `avalanche_network_buffer_throttler_inbound_awaiting_acquire` a solo incrementar si el mensaje realmente está bloqueando.
- Se cambió el comportamiento de `avalanche_network_byte_throttler_inbound_awaiting_acquire` a solo incrementar si el mensaje realmente está bloqueando.
- Se añadieron métricas `Block/Tx` en `meterVM`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_build_block_err_{count,sum}`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_parse_block_err_{count,sum}`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_get_block_err_{count,sum}`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_verify_{count,sum}`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_verify_err_{count,sum}`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_accept_{count,sum}`.
   - Se añadió `avalanche_{ChainID}_vm_metervm_reject_{count,sum}`.
   - Se añadió `avalanche_{DAGID}_vm_metervm_parse_tx_err_{count,sum}`.
   - Se añadió `avalanche_{DAGID}_vm_metervm_get_tx_err_{count,sum}`.
   - Se añadió `avalanche_{DAGID}_vm_metervm_verify_tx_{count,sum}`.
   - Se añadió `avalanche_{DAGID}_vm_metervm_verify_tx_err_{count,sum}`.
   - Se añadió `avalanche_{DAGID}_vm_metervm_accept_{count,sum}`.
   - Se añadió `avalanche_{DAGID}_vm_metervm_reject_{count,sum}`.

**Coreth**

- Se aplicó la reparación de gestión de la falla de callTracer.
- Se inicializaron funciones de multimoneda en el entorno de tiempo de ejecución.

**ProposerVM**

- Se actualizó el bloque `Delay` en redes `--staking-enabled=false` para que sea `0`.


## v1.6.2 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.2))

Esta versión es compatible con versiones anteriores a la [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Es opcional, pero recomendada.

**Opciones de configuración**
* Se eliminó `--coreth-config`. Consulta [aquí.](../references/command-line-interface.md#c-chain-config)
* Se añadió `--throttler-inbound-node-max-processing-msgs`. Consulta [aquí.](../references/command-line-interface.md#message-rate-limiting-throttling)
* Se añadió `--db-config-file`. Consulta [aquí.](../references/command-line-interface.md#database-config)

**API**
* El método `avm.exportAVAX` de la API se ha eliminado. Utilice `avm.export` en su lugar.
* El método `avm.importAVAX` de la API se ha eliminado. Utilice `avm.import` en su lugar.
* El método `info.peers` de la API ahora trata el campo `PublicIP` como opción y solo lo rellena cuando se suministra una IP válida.
* El cliente `platform.getValidatorsAt` de la API se ha agregado.
* El cliente `admin.lockProfile` de la API se ha corregido para llamar correctamente a `lockProfile`.
* El cliente `health.health` de la API se ha corregido para getionar correctamente las respuestas de un servidor no saludable.
* Se mejoraron las respuestas de la API de Revisión de salud para que sean más descriptivas.

**Benchlist**
* Se cambió el tiempo mínimo que un validador debe dejar de responder y la cantidad máxima de tiempo durante el cual un validador será puesto en espera. Estos eran 5 minutos y 30 minutos, respectivamente, y ahora son 2,5 minutos y 15 minutos.

**Base de datos**
* Se les permitió a los usuarios especificar la configuración de la base de datos con el indicador `--db-config-file`.

**Subredes**
* Se añadió la posibilidad de que un cliente configure una subred como privada para restringir la membresía solo a los validadores autorizados.

**Networking**
* Se cambió el tamaño predeterminado de la asignación de mensajes entrantes en conjunto de 32 MiB a 6 MiB.
* Se cambió el tamaño predeterminado de la asignación de mensajes salientes en conjunto de 32 MiB a 6 MiB.
* Se cambió el número máximo predeterminado de bytes que un nodo puede tomar de la asignación de mensajes entrantes en conjunto de 4 MiB a 2 MiB.
* Se cambió el número máximo predeterminado de bytes que un nodo puede tomar de la asignación de mensajes salientes en conjunto de 4 MiB a 2 MiB.
* Se añadió una limitación de la tasa de mensajes entrantes. Un nodo no leerá más mensajes de un par hasta que esté procesando menos de `--throttler-inbound-node-max-processing-msgs` provenientes de ese par.
* Se cambió el número predeterminado de no validadores a los que se les transmite un mensaje de la AppGossip de 2 a 0.
* Se cambió el número predeterminado de validadores a los que se les transmite un mensaje de la AppGossip de 4 a 6.
* Se introdujo la posibilidad de que una VM pueda transmitir a validadores específicos en lugar de solo hacerlo de forma aleatoria uniforme.
* Se corrigió un problema que causó que algunos nodos nunca intentaran volver a conectarse a un nodo desconectado previamente.

**ProposerVM**
* Se introdujo un rezago de la altura de la P-chain pesimista para mejorar la estabilidad durante un período de alto nivel de emisión de bloques de la P-chain.
* Se aplicó correctamente la demora del bloque solicitada.

**Métricas**
* Se eliminaron las métricas de histogramas de solicitud de la API desde la X-chain y la P-chain.
* Se añadieron métricas mempool de la P-chain.
* Se añadieron métricas `validator_sets` a platformvm.

**Otros**
* Se refactorizaron el arranque y el apagado del nodo para evitar apagones desafortunados en caso que el nodo se hubiera iniciado y luego se hubiera detenido inmediatamente.
* Se corrigió el mempool de la P-chain para rastrear correctamente el número de bytes asignados.
* Se actualizó la C-chain para ejecutar geth 1.10.9.
* Se compatilizó abigen para la C-chain.
* Se añadió compatibilidad para el soporte preimagen en la C-chain.
* Se añadió soporte para el extremo del historial de las comisiones en la C-chain.
* Se refactorizó la asignación de apodos del ID para que soporte mejor las pruebas GRPC.
* Se eliminó la lógica de correspondencia de la rama de pruebas de extremo a extremo.
* Se eliminó el punto de entrada principal obsoleto para el administrador de procesos de migración de la base de datos.

## v1.6.1 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.1))

Esta versión es compatible con versiones anteriores a la [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Es opcional, pero recomendada.

**Actualizaciones**

* Se añadió la posibilidad de especificar configuraciones de subred.
* Se añadieron diversos valores de configuración de red nuevos.
* Se eliminaron los mensajes heredados de la biblioteca de red.
* Se corrigió el error de mempool de P-chain que impactó transacciones de AddValidator en las redes locales.
* Se cambiaron las reglas de transmisión para transmitir a un número fijo de validadores, al igual que a todos los pares.
* Se eliminó el método obsoleto `getLiveness` de la API de salud.
* Se añadió la opción de configuración para deshabilitar la posibilidad de hacer conexiones entre no validadores.

**Nota**

Lo siguiente es obsoleto y ya no se debe utilizar. Se pueden eliminar en cualquier versión futura:

* El método `avm.exportAVAX` de la API debe eliminarse en favor de `avm.export`
* El método `avm.importAVAX` de la API debe eliminarse en favor de `avm.import`
* La opción de configuración `coreth-config` debe eliminarse en favor de un [archivo de configuración de la cadena](../references/command-line-interface.md#c-chain-config).

## v1.6.0 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0))

**Este cambio no es compatible con las versiones anteriores.**

Esta actualización añade un limitador de contención a la C-chain y la P-chain, introduce una comisión basada en bloques en la C-chain y ajusta algunos parámetros de comisiones dinámicas en la C-chain.

Los cambios de la actualización entran en vigencia a las **5 PM EDT / 9 PM UTC, 22 de septiembre de 2021 en la red principal**. Debes actualizar tu nodo antes de que los cambios entren en vigencia; de lo contrario, podrías perder tiempo de actividad en tu nodo.

Puede encontrar más información [aquí](https://medium.com/avalancheavax/apricot-phase-four-snowman-and-reduced-c-chain-transaction-fees-1e1f67b42ecf).

**Go**

Ahora la versión mínima necesaria de Go para construir AvalancheGo es Go 1.16.8

**Corrección de errores**

Se corrigió la condición de la carrera durante el inicio del administrador de tiempo de espera.

**Actualizaciones**

* Se introdujo [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md) en la P-chain y la C-chain.
* Se introdujo [mempool gossiping a la P-chain](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md) y la C-chain usando la capa de comunicación VM<->VM.
* Se añadió una comisión basada en bloques a los bloques de la C-chain.
* Se estableció el precio mínimo de gas en 25 nAVAX y el precio máximo de gas en 1000 nAVAX en el mecanismo de comisión dinámica de la C-chain.
* Límite de la tasa de conexiones entrantes

**Nuevas métricas**

* `avalanche_C_blks_built`/`avalanche_P_blks_built`: número de bloques que se han construido localmente en la C-Chain y la P-Chain, respectivamente.
* `avalanche_C_blks_builds_failed` / `avalanche_P_blks_builds_failed`: número de llamadas a BuildBlock que fallaron en la C-Chain y la P-Chain, respectivamente.

**Opciones de configuración**

* Se agregó la etiqueta `inbound-connection-throttling-max-conns-per-sec`.( Ver la [documentación de configuración.](../references/command-line-interface.md))
* Etiqueta `inbound-connection-throttling-max-recent` obsoleta. Esta etiqueta ahora es ignorada.

## PRE_RELEASE v1.6.0-fuji ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0-fuji))

**Ten en cuenta que esta versión no puede ejecutar la red principal y mostrará "la red principal no es compatible" si se intenta ejecutar con una configuración de la red principal.**

Esta actualización añade un limitador de contención a la C-chain y la P-chain, introduce una comisión basada en bloques en la C-chain y ajusta algunos parámetros de comisiones dinámicas en la C-chain.

Los cambios en la actualización entrarán en vigencia a las 5 PM EDT, el 16 de septiembre de 2021 en la red de pruebas de Fuji. Después de que Fuji se actualice y verifique, se publicará un lanzamiento compatible con la red principal.

**Todos los nodos de Fuji deben actualizarse antes de las 5 PM EDT, el 16 de septiembre de 2021.**

**Actualizaciones**

* Se introdujo [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md) en la P-chain y la C-chain.
* Se introdujo [mempool gossiping a la P-chain](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md) y la C-chain usando la capa de comunicación VM<->VM.
* Se añadió una comisión basada en bloques a los bloques de la C-chain.
* Se estableció el precio mínimo de gas en 25 nAVAX y el precio máximo de gas en 1000 nAVAX en el mecanismo de comisión dinámica de la C-chain.
* Se añadieron métricas para el número de bloques construidos y el número de intentos de construcción de bloques fallidos.

## v1.5.3 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.3))

Esta versión es compatible con versiones anteriores a la [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0).

**Tiempo de actividad**

* Se cambió el requisito de tiempo mínimo de actividad para recibir una recompensa de participación del 60% al 80%.

**Networking**

* Se añadieron tres mensajes de la red: `AppRequest`, `AppResponse` y `AppGossip`. Estos mensajes permiten que las instancias de una blockchain envíen datos arbitrarios mutuamente, según lo defina su VM. Antes, las instancias de una blockchain solo podían comunicarse mutuamente con el envío de mensajes consensuados (`Put`, `PushQuery`, etc.). Consulta `snow/engine/common/engine.go`.
* Cuando se reciba un `Pong`, desconecta del remitente si su versión es incompatible.
* Método antepuesto nombrado en `common.Sender` con `Send` por claridad (por ejemplo, `Put` --> `SendPut`).

**P-Chain**

* Se añadió la funcionalidad de rastrear los cambios en el peso de los validadores por bloque.
* Se añadió el método `GetValidatorsAt` de la API que permite recuperar el conjunto de validadores de una subred (o de la red primaria) en una altura de la P-Chain dada.

**C-Chain**

* Se incorporan cambios de Geth v1.10.8
* Se eliminan las referencias a Ancients

**Consenso**

* Se añadió el método `Timestamp()` a la interfaz de `snowman.Block`.

**Redes locales**

* Se actualizó la hora de inicio de los validadores en la génesis local. La hora de finalización de los validadores especificada en la configuración local en las versiones anteriores a la v1.5.3 es el 10 de septiembre de 2021, 00:00:000 UTC.** Por esta razón, debes actualizarte a AvalancheGo v1.5.3 para ejecutar una red local después de esta fecha y hora.**

**Opciones de configuración**

* Se añadió la opción de configuración de AvalancheGo `consensus-app-gossip-size`, que define el número de pares a los que se les transmite un mensaje `AppGossip`.
* Se añadió la opción de configuración de la C-Chain `log-level`. Las opciones son: `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"crit"`. De forma predeterminada es `"debug"` (como antes).

## v1.5.2 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2))

Esta actualización es compatible con las versiones anteriores a la versión [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Consulta los tiempos de actualización previstos en el lanzamiento de la versión v1.5.0.

**Coreth**

* Se parchó una [vulnerabilidad de seguridad de Geth](https://twitter.com/go_ethereum/status/1430067637996990464)
* Se parchó un pánico en la api backend.

**AVM**

* Se introdujo la generación de códecs sin estado para mejorar las herramientas.

**Consenso**

* Se añadió un registro adicional respecto de los votos de burbuja.

## v1.5.1-eth_call ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call))

Esta actualización es compatible con las versiones anteriores a la versión [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Consulta los tiempos de actualización de la red previstos en el lanzamiento de la versión v1.5.0.

Esta actualización es una revisión de la v1.5.1 que permite usar eth_call sin la comprobación de la cuenta de propiedad externa.

## v1.5.1 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1))

Esta actualización es compatible con las versiones anteriores a la versión [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Consulta los tiempos de actualización de la red previstos en el lanzamiento de la versión v1.5.0.

**Configuración**

* Se eliminó la opción `bootstrap-retry-max-attempts` y se añadió la opción `bootstrap-retry-warn-frequency`

**Subredes**

* Se añadieron `subnetID` al mensaje de protocolo de enlace. Esto notifica a los pares acerca de qué subredes le interesa sincronizar a un nodo.
* Se optimizó el gossiping del contenedor de la subred.

**AVM**

* Se corrigió el endpoint JSON de `avm.GetTx` para que informe correctamente las `amount` de las UTXO.

**Bootstrapping**

* Se corrigió el bucle ocupado que se podía producir si el Internet de un nodo se caía durante el arranque, lo que hacía que el nodo informe un error fatal.

**RPCChainVM**

* Se mejoró el almacenamiento en caché de los bloques no verificados.

**Coreth**

* Se actualizó a Geth v1.10.7.

## v1.5.0 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0))

**Este cambio no es compatible con las versiones anteriores.**

Esta actualización añade comisiones dinámicas a la C-chain, junto con varias otras mejoras.

Los cambios en la actualización entrarán en vigencia a las 10:00 a.m. EDT, el 24 de agosto de 2021 en Mainnet. Debes actualizar tu nodo antes de que los cambios entren en vigencia; de lo contrario, podrías perder tiempo de actividad en tu nodo.

Puede encontrar más información [aquí](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60).

**Actualizaciones de la red**

* Se añadieron los cálculos de las comisiones dinámicas a la C-chain.
* Se aumentaron las comisiones `CreateChainTx` y `CreateSubnetTx`.
* Se corrigió el error de corrupción de pila en la validación del delegador.
* Se reforzó el `MaxStakeWeight` para las transacciones de delegación.

**Actualizaciones de clientes**

* Se añadieron funciones de indexación de transacciones a la X-chain para permitir búsquedas históricas de transacciones por dirección y activo.
* Se añadió `./avalanchego` como comando predeterminado en la imagen de docker.
* Se utilizaron versiones de dependencia estática en la imagen de docker.
* Se eliminó el soporte de migración de la base de datos y de daemon runner
* Se refactorizó el análisis de la configuración de nodos.
* Se optimizó el muestreo del gossiping de contenedores.
* Se añadió la capacidad de compilar estáticamente los binarios de AvalancheGo y EVM.
* Se simplificó la interfaz `Block` para exponer solo la identificación del bloque principal, en lugar de obtener el bloque principal completo.
* Se añadieron métricas adicionales para trabajos pendientes en los motores de consenso.
* Se refactorizaron los estados de las P-Chain para manejar los estados de validación de blockchain separados de los estados de confirmación de las transacciones.

**API actualizadas**

* Se agregó `GetAddressTxs` a la API `avm`.
* Se agregó `SetLoggerLevel` y `GetLoggerLevel`a la API `Admin` para permitir un ajuste detallado de los niveles de registro mientras el nodo sigue ejecutándose.
* Se añadió `GetConfig` a la API `Admin` para permitir obtener la configuración del nodo que el nodo está utilizando actualmente.
* Se actualizó `platformvm.Client` para así permitir especificar los `nodeID` en `GetCurrentValidators` y `GetPendingValidators` y se generalizó la respuesta a `GetStake`.

**Argumentos de la CLI actualizados**

* Se eliminó `fetch-only`.
* Se añadió el análisis de la configuración JSON a VM `avm`.
   * Se añadió `indexTransactions`
   * Se añadió `indexAllowIncomplete`

## PRE_RELEASE v1.5.0-fuji ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji))

**Ten en cuenta que esta versión no puede ejecutar la red principal y mostrará el mensaje "this node version doesn't support mainnet" si se intenta ejecutar con una configuración de la red principal. Si ejecutas un nodo de la red principal, no es necesario realizar ninguna acción hasta que se publique el lanzamiento oficial la próxima semana.**

**Este cambio no es compatible con las versiones anteriores.**

Esta actualización añade comisiones dinámicas a la C-chain, junto con varias otras mejoras.

Los cambios en la actualización entrarán en vigencia a las 3_00 p.m. EDT, el 16 de agosto de 2021 en la red de pruebas de Fuji. Después de que Fuji se actualice y verifique, se publicará un lanzamiento compatible con la red principal.

**Actualizaciones de la red**

* Se añadieron los cálculos de las comisiones dinámicas a la C-chain.
* Se aumentaron las comisiones `CreateChainTx` y `CreateSubnetTx`.
* Se corrigió el error de corrupción de pila en la validación del delegador.
* Se reforzó el `MaxStakeWeight` para las transacciones de delegación.

**Actualizaciones de clientes**

* Se añadieron funciones de indexación de transacciones a la X-chain para permitir búsquedas históricas de transacciones por dirección y activo.
* Se añadió `./avalanchego` como comando predeterminado en la imagen de docker.
* Se utilizaron versiones de dependencia estática en la imagen de docker.
* Se eliminó el soporte de migración de la base de datos y de daemon runner
* Se refactorizó el análisis de la configuración de nodos.
* Se optimizó el muestreo del gossiping de contenedores.
* Se añadió la capacidad de compilar estáticamente los binarios de AvalancheGo y EVM.
* Se simplificó la interfaz `Block` para exponer solo la identificación del bloque principal, en lugar de obtener el bloque principal completo.
* Se añadieron métricas adicionales para trabajos pendientes en los motores de consenso.
* Se refactorizaron los estados de las P-Chain para manejar los estados de validación de blockchain separados de los estados de confirmación de las transacciones.

**API actualizadas**

* Se agregó `GetAddressTxs` a la API `avm`.
* Se agregó `SetLoggerLevel` y `GetLoggerLevel`a la API `Admin` para permitir un ajuste detallado de los niveles de registro mientras el nodo sigue ejecutándose.
* Se añadió `GetConfig` a la API `Admin` para permitir obtener la configuración del nodo que el nodo está utilizando actualmente.
* Se actualizó `platformvm.Client` para así permitir especificar los `nodeID` en `GetCurrentValidators` y `GetPendingValidators` y se generalizó la respuesta a `GetStake`.

**Argumentos de la CLI actualizados**

* Se eliminó `fetch-only`.
* Se añadió el análisis de la configuración JSON a VM `avm`.
   * Se añadió `indexTransactions`
   * Se añadió `indexAllowIncomplete`

## v1.4.12 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12))

Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada.

**X-Chain**

* Se añadió el argumento de formato `"json"` al método API `GetTx`, que devuelve la representación JSON de la transacción consultada
* Se añadieron aserciones del tipo de interfaz

**API de Información**

* Se añadió el método `GetNodeVersion` al cliente de la API de Información

**Métricas de Prometheus**

* Se corrigieron y se renombraron las métricas de los bytes sin enviar debido a la compresión
* Se añadieron las métricas de los bytes no recibidos debido a la compresión
* Se añadió la estructura auxiliar `noAverager` al paquete `metrics`

**Base de datos**

* Se añadieron o actualizaron los puntos de referencia

**Memoria compartida**

* Reemplaza `Put` y `Remove` con `Apply` para permitir la optimización de futuras transacciones atómicas

## v1.4.11 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11))

**C-Chain**

Esta versión permite snapshots de forma predeterminada.

**Etiquetas de configuración**

_Eliminados_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Añadidos_

* `network-compression-enabled`

**Métricas de Prometheus**

Se renombraron muchas métricas de Prometheus y se reemplazaron muchos histogramas con dos indicadores. Consulta [aquí](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) los paneles de control actualizados de Grafana.

Esta versión también añade métodos auxiliares al paquete `utils/metric`.

**RocksDB**

RocksDB ya no se compila de forma predeterminada cuando se ejecuta el script de compilación, y no se incluye en los binarios lanzados públicamente. Para compilar AvalancheGo con RocksDB, ejecuta `export ROCKSDBALLOWED=1` en tu terminal y luego `scripts/build.sh`. Debes hacer esto antes de poder usar `--db-type=rocksdb`.

La base de datos RocksDB ahora coloca o busca sus archivos en el subdirectorio `rocksdb`. Ten en cuenta que, si ejecutaste con RocksDB previamente, tendrás que mover los archivos existentes.

**Compresión de mensajes**

Los nodos ahora comprimen algunos mensajes P2P. Si un par tiene una versión >= v1.4.11, los mensajes Put, Push Query, Peer List y Multiput enviados al par se comprimen a través de gzip antes de ser enviados por la red. Esto reduce el uso de ancho de banda de AvalancheGo.

**Limitación de las conexiones entrantes** Se refactorizó la limitación de velocidad de las conexiones entrantes y se habilitaron de manera predeterminada.

**Mejoras generales**

* Se refactorizó y se mejoró el rendimiento de la iteración sobre una base de datos servida por gRPC a un plugin.
* En Linux, limpia la C-Chain si AvalancheGo muere de forma súbita
* Se refactorizaron las definiciones de los mensajes P2P y se movieron desde el paquete `network`.
* Se añadieron varios alias VM al servidor de la API de HTTP
* Se reemplazó `1024` con `units.KiB`, etc.
* Se mejoró la tolerancia a las particiones al procesar los chits en el orden de creación de las consultas correspondientes.

**IP de Fuji**

Se actualizaron las IP de arranque de la red de pruebas de Fuji.

## v1.4.10 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10))

**Fase 2 de Apricot - Parche 10**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada.
{% endhint %}

El parche incluye mejoras de rendimiento, de limitación y de VM:

* Se añadió soporte para usar `RocksDB` en lugar de `LevelDB` en las arquitecturas compatibles.
* Se reestructuró la limitación de la red entrante para que funcione por nodos, para restringir el uso de ancho de banda de los nodos pares.
* Se reestructuró la limitación de la red saliente para ponderar los bytes asignados por participación.
* Se actualizó el valor predeterminado de la etiqueta `pruning-enabled` a `true` para la C-chain.
* Se habilitó el registro de VM personalizadas a través de RPC.
* Se actualizó el estado de la blockchain para informar el estado de la validación.
* Se movió `TimestampVM` a su propio repositorio para que coincida con la ruta de creación de la VM prevista.
* Se corrigió el script protobuf code-gen para colocar los archivos `grpc` en la ubicación correcta.
* Se pasaron los bytes de bloque a través de `rpcchainvm#Block.Verify` para evitar cualquier posible fallo en la verificación de desalojo de caché.

## v1.4.9 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9))

**Fase 2 de Apricot - Parche 9**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada.
{% endhint %}

El parche incluye mejoras en el rendimiento y mejoras en la supervisión:

* Se añadió soporte para ejecutar la C-chain con depuración habilitada. La depuración actualmente está desactivada de manera predeterminada.
* Se redujo el intervalo de ping de la C-chain Websocket para reducir las desconexiones cuando se encuentra detrás del equilibrador de carga.
* Se añadió una marca temporal a la interfaz de bloque de Snowman.
* Se corrigió el error en la aplicación de la duración máxima de la API de la C-chain para las llamadas realizadas a través de websockets.
* Se añadió soporte de encabezado gzip para la terminal http.
* Se añadieron descripciones adicionales de la versión a la terminal `info.getNodeVersion`.
* Se restringió la conexión a las versiones de los nodos >= 1.4.5.
* Se movieron los registros daemon a la carpeta principal de registros.
* Se añadió soporte para el muestreo determinista.
* Se añadió la acción de implementación automática de GitHub para las nuevas etiquetas.
* Se refactorizó la gestión de la configuración para soportar mejor el lanzamiento de nodos de forma programada.

## v1.4.8 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8))

**Fase 2 de Apricot - Parche 8**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada.
{% endhint %}

El parche incluye mejoras en el rendimiento, mejoras en la supervisión y correcciones en la subred:

* Se cambió la definición de la comisión de AVM para que las comisiones se paguen con el activo nativo de la cadena. Esto no cambia el comportamiento de la X-Chain, pero posibilita el uso de otras instancias de AVM.
* Se añadió la capacidad de especificar las configuraciones a cadenas específicas. Esto invalida el parámetro de la CLI `coreth-config`.
* Se añadió la limitación de velocidad al número de nuevas conexiones salientes.
* Se introdujo un contenedor de VM que añade métricas transparentes a una cadena.
* Se añadió la posibilidad de habilitar la generación continua de perfiles de los nodos.
* Se redujeron las asignaciones de bytes en la capa de red.
* Se añadieron varios parámetros de la CLI para ajustar los parámetros de gossip.
* Se habilitó que los nodos se ejecuten utilizando un par de claves efímero, en lugar de uno que se lee del disco.
* Se eliminaron las advertencias espurias incorrectas.
* Se movieron las pruebas de CI para que se ejecuten en Acciones de Github en lugar de ejecutarse en Travis.
* Se eliminaron los casos especiales de la interfaz de la VM.

**Se añadieron argumentos de la línea de comandos:**

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

## v1.4.7 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7))

**Fase 2 de Apricot - Parche 7**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye mejoras en el rendimiento y correcciones de errores.
{% endhint %}

Si la versión del nodo previamente instalada es <= v1.4.4, entonces este nodo puede haber dejado de procesar bloques. Esta actualización reparará el nodo y realizará la migración de la base de datos. Para obtener más detalles sobre la migración de la base de datos, consulta las [notas de migración de la base de datos v1.4.5](avalanchego-v1.4.5-database-migration.md). Si la versión del nodo previamente instalada es >=v1.4.5, entonces este nodo utilizará la base de datos existente y no necesitará realizar la migración de la base de datos.

* Se corrigió el nodo previo a la migración para verificar correctamente el bloque de la P-chain`SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`.
* Se corrigió la regresión en `platformvm.GetBlockchains` para devolver correctamente las blockchains primarias de la subred.
* Se actualizó la versión de grpc a la v1.37.
* Se optimizó el muestreo de la lista de pares.
* Se añadieron los puntos de referencia de la base de datos.
* Se redujeron varias asignaciones de memoria repetidas.

## v1.4.6 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6))

**Fase 2 de Apricot - Parche 6**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 Este parche incluye mejoras en el rendimiento y correcciones de errores.
{% endhint %}

**Si la versión del nodo previamente instalado es <= v1.4.4, entonces este nodo realizará la migración de la base de datos. Para obtener más detalles acerca de la migración de la base de datos, consulta las notas de lanzamiento de la v1.4.5.** Si la versión del nodo previamente instalado es la v1.4.5, entonces este nodo utilizará la base de datos existente y no necesitará realizar la migración de la base de datos.

Este parche:

* Elimina la emisión de transacciones inválidas en el mempool de la P-chain que causaba altas escrituras sostenidas en la base de datos.
* Ignoró los archivos y las carpetas que no son de la base de datos en el directorio de la base de datos. Esto debería corregir específicamente los errores informados en macOS con . Archivos de DS.
* Corrigió la etiqueta build-dir para que se pueda especificar a través de la CLI sin que se produzca un error en el nodo preupgrade.
* Se eliminó la etiqueta plugin-dir que ya no es compatible con el daemon del node-manager Normalmente, no especificar la etiqueta lleva al comportamiento correcto. Sin embargo, para instalaciones complejas, se puede requerir la etiqueta build-dir.
* Reforzó los mensajes de gossip solo a las conexiones que han terminado el protocolo de enlace entre pares.
* Redujo las asignaciones de memoria durante los recorridos de consenso y el arranque.

## v1.4.5 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5))

**Fase 2 de Apricot - Parche 5 - Actualización de la base de datos**

**Esta actualización es más compleja que la actualización clásica de la versión. Puedes encontrar instrucciones más detalladas y las Preguntas frecuentes **[**aquí**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**.**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye importantes mejoras en el rendimiento y muchas otras actualizaciones.
{% endhint %}

**Mejoras de la VM:**

* Se rediseñó totalmente la gestión del estado de la `platformvm`.
   * Se eliminó el uso de `versiondb` que se pasan a través de bloques para pasar las referencias de estado que pueden ser modificadas y leídas sin volver a analizar los objetos.
   * Se implementó un gestor de estado base para almacenar en caché y gestionar adecuadamente las escrituras en la base de datos subyacente.
   * Se implementaron los conjuntos de validadores CoW para permitir el almacenamiento en caché de múltiples conjuntos de validadores en la memoria.
   * La subred indexó las cadenas para evitar tocar objetos de estado no utilizado.
   * `nodeID`indexó los validadores para evitar iteraciones innecesarias al aceptar transacciones `addDelegator` y `addSubnetValidator`.
   * Se redujo la cantidad de pares clave-valor dedicados a la gestión de los conjuntos de validadores en el disco y a los tiempos de actividad de los validadores.
* Se añadieron las búsquedas de recompensas de participación a la API de la `platformvm` para soportar la indexación de las recompensas.
* Se refactorizó la medición del tiempo de actividad de los validadores para simplificar las pruebas.
* Se añadieron las métricas de tipo de bloque y transacción a la `platformvm`.
* Se añadieron las métricas de las llamadas a la API a `avm` y a `platformvm`.
* Se actualizó la gestión del estado de `avm` para utilizar `prefixdb`, registrar las métricas de caché y compartir el código adicional con la `platformvm`.
* Se simplificó la gestión e indexación de `UTXO` en `avm` y la `platformvm`.
* Se reestructuró el análisis y la gestión de las direcciones para que sean totalmente compartidas entre las instancias de VM compatibles.
* Se reestructuró la memoria compartida de la subred primaria para que se comparta totalmente entre las instancias de VM.
* Se añadió una implementación de estado de cadenas para soportar el almacenamiento en caché sin interrupciones sobre las implementaciones de VM existentes y para simplificar la implementación de nuevas VM.
* Se integró el nuevo gestor de estado de cadenas en `rpcchainvm`, que también añade varias métricas.
* Se añadió `upgradeBytes` y `configBytes` a la interfaz estándar de VM para soportar mejor las futuras actualizaciones de la red.
* Se añadieron las terminales `getAtomicTxStatus` y `getAtomicTx` a la API `evm`.
* Se simplificó la producción de bloques `evm` para que se realice sincrónicamente con el motor de consenso.
* Se añadió un mempool de transacciones atómicas para volver a introducir las transacciones atómicas huérfanas.
* Se corrigió el error en el cliente `evm` para establecer correctamente el `sourceChain` en `getAtomicUTXOs`.
* Se integró el nuevo gestor de estado de cadenas en el `evm` para optimizar mejor la gestión de los bloques.

**Mejoras de arranque:**

* Se eliminaron los re-traversals durante el arranque. Esto mejora significativamente el rendimiento del nodo durante los reinicios del proceso de arranque.
* Se corrigió que el nodo se apagara súbitamente cuando se intentaba salir del nodo mientras se ejecutaban los contenedores en la fase de arranque.
* Se corrigió la duplicación de las transmisiones de contenedores IPC durante el arranque.
* Se estandarizó la cola de los trabajos de arranque para escribir a estado usando `prefixdb` en lugar de implementar los prefijos personalizados.
* Se añadieron las métricas adicionales de caché y de caché de arranque.

**Adiciones de migración de base de datos:**

* Se añadió un gestor de procesos de daemon para migrar sin complicaciones al formato de base de datos actualizado.
* Se refactorizó el manejo de versiones para rastrear las versiones semánticas de la base de datos.
* Se implementó un gestor de base de datos para rastrear y operar sobre diferentes versiones de la base de datos.
* Se implementó una migración de `keystore` que copia automáticamente los usuarios de la base de datos `v1.0.0` a la base de datos `v1.4.5`.
* Se implementó una migración del tiempo de actividad de los validadores de la base de datos `v1.0.0` a la base de datos `v1.4.5`.

**Mejoras a los nodos:**

* Actualización del análisis de la configuración para expandir siempre las variables de entorno.
* Se refactorizó la configuración de los nodos para permitir la especificación de los certificados TLS en la memoria sin tocar el disco.
* Se añadió un mejor soporte para los códigos de salida relevantes.
* Se mostró la dirección de escucha de los servidores `http` y `staking` para ayudar con el soporte del mapeo de los puertos no específicos.
* Se implementó una base de datos `versionable` para poder conmutar entre una base de datos de paso a través de una base de datos `versioned`.
* Se optimizaron las preasignaciones del `Set` ID y se redujo el uso de la memoria de los `struct`.
* Se reforzaron reglas de enlace más estrictas.

**Argumentos de la línea de comandos modificados:**

Para los siguientes argumentos, `"default"` se trató previamente como una palabra clave. Ahora, se intentará tratar `"default"` como el valor previsto de la etiqueta. Para mantener el comportamiento de manera predeterminada, no se debe especificar la etiqueta.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

Para los siguientes argumentos, `""` se trató previamente como una palabra clave. Ahora, se intentará tratar `""` como el valor previsto de la etiqueta. Para mantener el comportamiento de manera predeterminada, no se debe especificar la etiqueta.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

Ya no es necesario que `bootstrap-ips` y `bootstrap-ids` estén emparejados. Esto significa que ahora es válido especificar un número diferente a `bootstrap-ips`que de `bootstrap-ids`. Los `bootstrap-ips` se utilizan para conectarse inicialmente a la red y los `bootstrap-ids`se utilizan como beacons en el arranque.

**Argumentos de la línea de comandos agregados:**

* `fetch-only`
* `build-dir`

**Argumentos de la línea de comandos eliminados:**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4))

**Fase 2 de Apricot - Parche 4**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada.
{% endhint %}

El parche incluye correcciones de los errores y mejoras en el rendimiento que buscan optimizar el próximo lanzamiento de `db-upgrade`.

* Se omitió el retraso de arrastre en el arranque para que todas las cadenas terminen tan pronto como la última cadena se marque como arrancada en una subred.
* Se mejoró el tratamiento de mensajes durante el arranque para que los mensajes se gestionen mientras se espera que otras cadenas se sincronicen.
* Se redujeron las asignaciones de muestreo al volver a usar los muestreadores existentes.
* Se actualizaron los scripts del docker para que solo se envíen imágenes desde la rama `master`.
* Se corrigió el formato de registro.
* Se mejoraron los mensajes de error.

## v1.4.3 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3))

**Fase 2 de Apricot - Parche 3**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada.
{% endhint %}

El parche incluye correcciones de los errores, supervisión del tiempo de actividad actualizado y mejoras de rendimiento.

* Se corrigió el tratamiento de mensajes en espera que podría causar que un nodo no pudiera progresar durante el arranque. Esto pasaba normalmente cuando el nodo fallaba en la transición a la ejecución normal cuando estaba terminando de arrancar.
* Se corrigió un error no determinista en la base del código de la C-Chain que podía ocasionar que los nodos que recibían muchas solicitudes de transmisión de transacciones dejaran de producir bloques temporalmente hasta que procesaran un bloque producido por otro nodo.
* Se restringió a uno el número de mensajes de versión que se pueden enviar a un par.
* Se eliminaron los mensajes de protocolo de enlace heredados que quedaron obsoletos en la Fase 2 de Apricot.
* Se marcaron los nodos que se pusieron en espera como si estuvieran desconectados para calcular el tiempo de actividad.
* Se actualizó el conjunto de validadores para que sea más eficaz durante los cambios del conjunto de validadores.
* Se actualizó la red para que solo se intente volver a conectar con un par al desconectarse si actualmente es un validador.

## v1.4.2 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2))

**Fase 2 de Apricot - Parche 2**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores v1.4.0 y v1.4.1. Los cambios en la actualización entrarán en vigencia a las 10:00 a.m. EDT, el 5 de mayo de 2021 en la red de pruebas de Fuji y a las 7:00 a.m. EDT, el 10 de mayo de 2021 en la red principal.
{% endhint %}

El parche reduce aún más el tamaño de los mensajes de gossip entre de la lista de pares e introduce varias etiquetas nuevas:

* `network-peer-list-size` permite ajustar el número de pares de gossip en cada mensaje `peerlist`.
* `network-peer-list-gossip-size` permite ajustar el número de pares que hacen gossip de los mensajes a `peerlist`.
* `network-peer-list-gossip-frequency` permite ajustar la frecuencia de gossip de `peerlist`.

## v1.4.1 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1))

**Fase 2 de Apricot - Parche 1**

{% hint style="warning" %}
Esta actualización es compatible con las versiones anteriores a la v1.4.0. Consulta los tiempos de actualización previstos en el lanzamiento de la versión v1.4.0.
{% endhint %}

El parche reduce el tamaño de los mensajes de la lista de pares gossip e introduce una nueva etiqueta `--bootstrap-beacon-connection-timeout` que permite configurar el tiempo de espera de la conexión de beacon en el arranque.

## v1.4.0 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0))

**Fase 2 de Apricot**

{% hint style="danger" %}
**Ten en cuenta que este cambio no es compatible con versiones anteriores.**

**La publicación relacionada del blog está** [**aquí**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.**
{% endhint %}

{% hint style="warning" %}
Esta actualización aplica la actualización de Ethereum Berlin a la C-chain, añade una nueva terminal de AVM e incluye varias mejoras de estabilidad. Le pedimos a todos los miembros de la comunidad que actualicen lo más pronto posible para asegurarse de que sus nodos se mantengan en buen estado.

Los cambios en la actualización entrarán en vigencia a las 10:00 a.m. EDT, el 5 de mayo de 2021 en la red de pruebas de Fuji y a las 7:00 a.m. EDT, el 10 de mayo de 2021 en la red principal.
{% endhint %}

**Los principales componentes de esta actualización incluyen:**

* Se actualizó Coreth para que dependa de la v1.10.2 de go-ethereum.
* Se aplicó la actualización de Ethereum Berlin. Específicamente de [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) y [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Se añadieron nuevos contratos inteligentes precompilados con estado a la C-chain para soportar transferencias de ANT y contenedores de ARC-20 alrededor de los ANT.
* Se añadió una terminal de AVM `/events`  que admite la notificación por websocket de las transacciones aceptadas que coinciden con un filtro de direcciones.
* Se añadieron dos nuevos tipos de mensajes de red `SignedVersion` y `SignedPeerlist` para mejorar el mapeo de los validadores -> IP.
* Se corrigió un viejo error en el que apagar el nodo mientras una cadena estaba arrancando podía hacer que la cadena se apagara súbitamente.
* Se actualizó el plugin de paquetes gRPC para paginar grandes peticiones para mejorar la estabilidad.
* Se añadió la posibilidad de ejecutar el binario principal de avalanchego como un plugin.
* Se corrigió una posible condición de carrera en la protección contra la corrupción de leveldb.
* Se actualizaron los scripts de compilación automatizados para soportar mejor múltiples arquitecturas.

**Argumentos de la línea de comandos agregados:**

* `plugin-mode-enabled`especifica el binario para que se ejecute en el modo de plugin.

**Argumentos de la línea de comandos eliminados:**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2))

**Fase 1 de Apricot - Parche 2**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye mejoras de seguridad, correcciones de los errores y mejoras de supervisión.
{% endhint %}

**Mejoras de seguridad**

* Se reforzó un formato canónico estricto para los bloques de la C-chain efectuados antes de `Apricot Phase 1`. Esto garantiza que las modificaciones en el campo de bloques `extra-data` no puedan generar modificaciones en el estado de la cadena durante el arranque.
* Se modificó `Keystore` para garantizar que solo se envíen los valores encriptados a través del IPC entre avalanchego y los procesos del plugin.

**Errores corregidos:**

* Se corrigió el cálculo de la capitalización de delegación para incluir la actualización del máximo de delegación actual antes de eliminar un delegador. Esto garantiza que la capitalización de la delegación siempre se cumpla.
* Se corrigió la API estática de `AVM` para que se registre correctamente al inicio.
* Se actualizaron los cálculos del nodo `uptime` para tener en cuenta las actualizaciones de la red.

**Mejoras de supervisión**

* Se añadió un indexador de nodos opcional que puede proporcionar un ordenamiento de operaciones aceptadas en una cadena consistente localmente.
* Se actualizó el inventario ansible para incluir numerosas mejoras (gracias a @moreati).

## v1.3.1 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1))

**Fase 1 de Apricot - Parche 1**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye estabilidad, mejoras de supervisión y correcciones de errores menores.
{% endhint %}

**Los principales componentes de esta actualización incluyen:**

* Se corrigió el segfault de la C-chain al realizar la compresión en las CPU arm64.
* Se añadieron permisos de grupo a los archivos locales para habilitar la supervisión compleja de los nodos.
* Se eliminaron los espacios en blanco de las contraseñas de autenticación que se pasan a través de la etiqueta api-auth-password-file.
* Se eliminó timeSinceNoOutstandingRequests ya que fue reemplazado por longestRunningRequest.
* Se añadieron métricas adicionales en la regulación intencional de la red.
* Varias mejoras de código.

**Argumentos de la línea de comandos agregados:**

* `network-health-max-outstanding-request-duration`

**Argumentos de la línea de comandos eliminados:**

* `network-health-max-time-since-no-requests`

## v1.3.0 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0))

**Fase 1 de Apricot**

{% hint style="danger" %}
Ten en cuenta que este cambio no es compatible con versiones anteriores.

Esta actualización reduce las comisiones de gas de la C-chain, elimina los reembolsos de gas de la C-chain e incluye varias mejoras de seguridad. Le pedimos a todos los miembros de la comunidad que actualicen lo más pronto posible para asegurarse de que sus nodos se mantengan en buen estado.
{% endhint %}

Los cambios en la actualización entrarán en vigencia a las 10:00 a.m. EST, el 25 de marzo de 2021 en la red de pruebas de Fuji y a las 10:00 a.m. EST, el 31 de marzo de 2021 en la red de principal.

**Los principales componentes de esta actualización incluyen:**

* Se redujo el costo de gas de la C-chain de 470 nAVAX a 225 nAVAX.
* Se eliminaron los reembolsos de gas de la C-chain. Este cambio adopta el [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* Se refactorizó la verificación de la C-chain para que sea más limpia cuando se realicen actualizaciones de la red.
* Se corrigió la API de Autenticación para aplicar correctamente los tokens revocados.
* Se reforzó la API de Autenticación para garantizar de que se utilice el formato de firma previsto.
* Se eliminó la contraseña de la API de Autenticación de los argumentos de la CLI.
* Se añadieron controles más estrictos de permisos de archivo.
* Se añadió el tratamiento de errores adicionales menores.
* Se sanearon las escrituras del registro antes de escribirlas en el disco.
* Se añadieron orígenes configurables a la terminal de HTTP.
* Se eliminaron los intentos de HTTPs a HTTP al inicio. Ahora el nodo se cerrará al inicio si la actualización de la terminal HTTP a HTTPs falla.

**Argumentos de la línea de comandos agregados:**

* `api-auth-password-file` especifica el archivo del que se leerá la contraseña de la API de Autenticación.

**Argumentos de la línea de comandos eliminados:**

* `api-auth-password`

## **v1.2.4 (**[**Ver en GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**)**

**Fase 0 de Apricot - Actualización 1 - Parche 4**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye mejoras de estabilidad y supervisión.
{% endhint %}

* Se actualizó el archivo readme para corregir los requisitos de almacenamiento.
* Se añadió un control de errores adicional a la verificación de Avalanche Tx durante el arranque.
* Se actualizaron numerosas métricas, entre ellas, la adición de numerosas métricas nuevas relacionadas con el estado del nodo y el uso de la base de datos, la eliminación de métricas no utilizadas e inválidas y la corrección de algunos nombres de métricas.
* Se añadió un registro adicional a CI.
* Se añadió la C-chain a la lista de cadenas críticas.

## **v1.2.3 (**[**Ver en GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**)**

**Fase 0 de Apricot - Actualización 1 - Parche 3**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye mejoras de estabilidad y supervisión.
{% endhint %}

* Se ajustaron los parámetros de comprobación de estado `[network, router, consensus]` para eliminar las comprobaciones de estado deficientes.
* Se simplificó la gestión de bloques de la C-chain.

## **v1.2.2 (**[**Ver en GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**)**

**Fase 0 de Apricot - Actualización 1 - Parche 2**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye mejoras de estabilidad, de rendimiento y de supervisión.
{% endhint %}

* Se añadieron varios alias de IP en la biblioteca de la red para evitar la repetición de llamadas `SYN`.
* Se corrigió el tratamiento de mensajes de arranque cuando se arranca desde uno mismo.
* Emisión de `AdvanceTimeTx` simplificada.
* Se añadieron nuevas comprobaciones de estado de consenso.
* Añadir un registro de estado del nodo.
* Se añadieron respuestas de estado a las solicitudes `GET` de estado.
* Se consolidaron los registros de mensajes entrantes.
* Se añadió un registro de errores al contenedor `LevelDB`.
* Se añadieron códigos de error a `rpcdb` para evitar el análisis de cadenas.
* Se mejoró el manejo de la C-chain de la cadena canónica para reducir el número de reorganizaciones.
* Se mejoró el manejo de la C-chain de llamadas falsas realizadas en el bloque `pending`.

## **v1.2.1 (**[**Ver en GitHub**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**)**

**Fase 0 de Apricot - Actualización 1 - Parche 1**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada
 El parche incluye mejoras de estabilidad, de rendimiento y de supervisión.


Ten en cuenta que esta actualización elimina `network-timeout-increase` y ‘network-timeout-reduction` como argumentos de la línea de comandos.
{% endhint %}

Resumen de cambios:

* Se añadieron "UTXO" a la respuesta "platformvm.getStake".
* Se añadió un informe de benchlist a la respuesta "info.peers".
* Se añadieron comprobaciones de estado adicionales a la capa de red.
* Se añadió "percent of stake connected" como una métrica informada.
* Se añadió una lógica de reinicio de arranque para asegurar que el nodo ha alcanzado la sugerencia actual, incluso durante los tiempos de alto rendimiento.
* Se añadió un arranque en el ámbito de subred para asegurar que la cadena no se quede detrás debido al arranque de otra cadena.
* Se evitó la verificación de bloques rechazados para evitar cálculos innecesarios.
* Se eliminó el gossiping de bloques no preferidos a la red.
* Se cambió la calculadora de tiempo de espera de la red para utilizar un EWMA de la latencia de red observada.
* Se eliminaron las solicitudes "Get" de los cálculos de latencia de la red.
* Se limpió el algoritmo de benchlist.
* Se limpió el tratamiento de mensajes perdidos en el envío.
* Se limpió la lógica de solicitudes y tiempos de espera pendientes.
* Se generalizó el seguimiento del rendimiento para permitir el uso de prefijos de los nombres de los perfiles.
* Se añadió caché adicional al recorrido de arranque de Avalanche.
* Se corrigió el enlace ansible.
* Los argumentos de la línea de comandos agregados consisten principalmente en configuraciones de comprobaciones de estado. Además, los cálculos de la latencia de la red modificados cambiaron el nombre de algunos argumentos de la línea de comandos.

Argumentos de la línea de comandos agregados:

* "network-timeout-halflife"
* "network-timeout-coefficient"
* "network-health-min-conn-peers"
* "network-health-max-time-since-msg-received"
* "network-health-max-time-since-msg-sent"
* "network-health-max-portion-send-queue-full"
* "network-health-max-send-fail-rate"
* "network-health-max-time-since-no-requests"
* "router-health-max-drop-rate"
* "router-health-max-outstanding-requests"
* "health-check-frequency"
* "health-check-averager-halflife"
* "bootstrap-retry-enabled"
* "bootstrap-retry-max-attempts"

Argumentos de la línea de comandos eliminados:

* "network-timeout-increase"
* "network-timeout-reduction"

## v1.2.0 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0))

**Fase 0 de Apricot - Actualización 1**

{% hint style="danger" %}**
Ten en cuenta que este parche no es compatible con versiones anteriores. Esta actualización corrige los problemas de rendimiento relacionados con las transferencias de intercambio entre la X-chain, la C-chain, y la P-chain. Le pedimos a todos los miembros de la comunidad que actualicen lo más pronto posible para que sus nodos no se vean afectados.
 Además, hay que tener en cuenta que los nodos pueden tardar varios minutos más en conectarse después de la actualización y que hay que dejar que el proceso se complete sin interrupciones.**
{% endhint %}

Los principales componentes de esta actualización incluyen:

* Se corrigió la validación de la importación atómica en la C-Chain
* Se añadió una lógica de excepción de reglas para permitir los bloques de bonificación atómicos
* Se añadió una lógica de "fracaso rápido" a la Memoria compartida si se producen eliminaciones duplicadas
* Se corrigió el problema que provocaba el bloqueo de los sondeos en Snowman debido a un fallo en la eliminación de las solicitudes.
* Se corrigió el problema de BAD BLOCK en coreth debido a ancestros desconocidos
* Se corrigió una condición de carrera en el script de reparación de la cadena canónica en coreth
* Se limitó el número de bloques de procesamiento en Snowman y de txs de procesamiento en Avalanche
* Se actualizaron los valores predeterminados del tiempo de espera de la red y la configuración de benchlist.
* Se verificó que no se había producido una violación de seguridad después de la inestabilidad inicial de la red

## v1.1.5 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5))

**Fase 0 de Apricot - Parche 5**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada. El parche incluye mejoras de estabilidad.
{% endhint %}

* Se corrigió un posible bloqueo al registrar nuevas cadenas que podía ocasionar que la P-chain y la terminal de http(s) se bloquearan.
* Se reparó la indexación TxID -> Altura de bloques en la C-chain.
* Se añadió un buen manejo de las implementaciones de contratos vacíos en la API de debug_traceTransaction en la C-chain.
* Se mejoró el tratamiento de errores en la C-chain.

## v1.1.4 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4))

**Fase 0 de Apricot - Parche 4**

{% hint style="danger" %}
Esta actualización es compatible con las versiones anteriores. Es opcional, pero recomendada. El parche incluye actualizaciones de la CLI, correcciones de los errores de la API, mejoras de estabilidad y mejoras de rendimiento.
{% endhint %}

* Se corrigió un problema por el que los índices de los bloques de la C-chain podían asignarse a bloques no aceptados a una altura determinada.
* Se corrigió el fallo de la VM cuando la RPCChainVM experimentaba altas cargas de la API.
* Se corrigió la burbuja de votos optimista en el motor de Avalanche para que los votos pasen correctamente por los vértices de procesamiento.
* Se añadió el campo IncludePartial a los métodos de la API GetBalance y GetAllBalances de AVM. Esto cambia el comportamiento predeterminado para devolver solo los saldos de los activos que se pueden gastar y de propiedad única.
* Se añadió la posibilidad de especificar configuraciones de génesis personalizadas para las identificaciones personalizadas de la red.
* Se añadió una funcionalidad adicional de la API de IPC.
* Se añadió caché adicional a la RPCChainVM.
* Se mejoró la búsqueda de los directorios de plugin para que siempre funcione con las versiones binarias.

## v1.1.3 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3))

**Fase 0 de Apricot - Parche 3**

{% hint style="danger" %}
Esta actualización es opcional, pero recomendada. El parche incluye correcciones de errores menores relacionadas con las API.
{% endhint %}

* Se corrigió la llamada que se cuelga al intentar filtrar los registros de la C-chain.
* Se corrigió el cliente de la C-chain para llamar a la API multidivisas correcta.
* Se añadió `getAtomicUTXOs` a los clientes de la API `platformvm` y `avm`.

## v1.1.2 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2))

**Fase 0 de Apricot - Parche 2**

{% hint style="danger" %}
Esta actualización es opcional, pero recomendada. El parche incluye correcciones de errores y mejoras de rendimiento.
{% endhint %}

* Se corrigió la caché de procesamiento de arranque para reducir los recorridos duplicados al arrancar Avalanche.
* Se optimizó la verificación de la P-chain durante el arranque.
* Se corrigió el cálculo de la lista de bancos máximos para utilizar los valores de entrada correctos.
* Se eliminaron las ejecuciones de enlace adicionales de CI.
* Se añadió `Height` a la interfaz `snowman.Block`.

## v1.1.1 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1))

**Fase 0 de Apricot - Parche 1**

{% hint style="danger" %}
Esta actualización es opcional, pero recomendada. El parche incluye correcciones de errores y mejoras de rendimiento.
{% endhint %}

* Se corrigió un error de bloqueo de nodos cuando los usuarios desactivaban la API `Health`.
* Se corrigió un error en el seguimiento del tiempo de actividad que podía sobreinformar del tiempo de actividad de un nodo.
* Se refactorizó el análisis de vértices para usar un `Codec`.
* Se separó la gestión de vértices con y sin estado.
* Se añadió una comprobación de longitud de cada campo al Códec.
* Se introdujo un nuevo tipo de códec que agrupa los `TypeID`.
* Se introdujeron etiquetas de límite de mensajes en la CLI.
* Se introdujo un paquete de semanticdb que se utilizará durante una futura migración de la base de datos.
* Se añadió el seguimiento de Epoch al contexto de la cadena.
* Se mejoraron algunos de los mensajes de error devueltos durante la validación de transacciones.
* Se redujo la presión del GC en la versión DB.

## v1.1.0 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0))

**Fase 0 de Apricot**

{% hint style="danger" %}
**Ten en cuenta que esta actualización no es compatible con versiones anteriores. Las actualizaciones deben realizarse antes del lunes 7 de diciembre a las 11:00 p.m. UTC (6:00 p.m. EST). La actualización, que originalmente se programó a mediados de diciembre, se está acelerando para corregir un importante error de desbloqueo de tokens. Le pedimos a todos los miembros de la comunidad que actualicen lo más pronto posible para que sus nodos no se vean afectados.**
{% endhint %}

Hay dos componentes principales para esta actualización:

* Preparativos generales para nuestra próxima actualización de la red de Apricot llamada Actualización de la fase cero de Apricot
* Se corrigió un problema que evitó que las salidas bloqueadas para participaciones se desbloquearan una vez transcurrido su tiempo _**_de bloqueo

## v1.0.6 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6))

{% hint style="danger" %}
Ten en cuenta que esta versión contiene cambios de última hora descritos [aquí](https://docs.avax.network/build/apis/deprecated-api-calls). Cambia el formato de respuesta por defecto de platform.getTxStatus y platform.getCurrentValidators. La actualización es opcional pero se recomienda. El parche incluye mejoras en el rendimiento y algunas mejoras en la calidad de vida.
{% endhint %}

* Se han eliminado los formatos obsoletos de platform.getTxStatus y platform.getCurrentValidators.
* Se añadió soporte para codificaciones hexadecimales de usuarios importados y exportados desde la API de keystore.
* Se ha establecido el requisito de golang a la v1.15.5 para evitar una vulnerabilidad de DoS encontrada en el estándar golang lib.
* Se han añadido clientes de la API para que actúen como ayudantes interactuando con el software del nodo.
* Se ha habilitado la posibilidad de volver al arranque si un nodo se desconecta del resto de la red.
* Se arreglaron las API de GetUTXOs cuando UTXOs referenciaba múltiples direcciones.
* Se refactorizó la codificación binaria para generalizar mejor las opciones de RPC.
* Se ha fijado el filtrado de bloque IP para establecer correctamente la longitud de la ventana.
* Se ha generalizado el paquete de códecs para poder manejar múltiples códecs con diferentes versiones.
* Se añadió Epoch a la interfaz Vertex en preparación de una futura versión.
* Se aplazó el hashing de las transacciones para reducir la utilización de la CPU/Memoria más allá de los chequeos rápidos.
* Para aquellos que utilizan [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), la URL se cerrará en un futuro lanzamiento. Por favor, cámbiate a [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

Para obtener ayuda con esta actualización, ve a [Preguntas frecuentes de los desarrolladores](https://support.avalabs.org/en/collections/2618154-developer-faq). si todavía tienes problemas, puedes unirte a nuestro servidor de [Discord](https://chat.avax.network/) para que te ayudemos.

## v1.0.5 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

{% hint style="danger" %}
Ten en cuenta que la versión posterior a esta, la v1.0.6, contendrá los cambios de última hora de descritos [aquí](https://docs.avax.network/build/apis/deprecated-api-calls). Específicamente, el formato de respuesta de `platform.getTxStatus` y `platform.getCurrentValidators` cambiará.
{% endhint %}

Los cambios en esta versión, v1.0.5, son compatibles con versiones anteriores. La actualización es opcional pero se recomienda. El parche incluye mejoras en el rendimiento y algunas mejoras en la calidad de vida.

* Se añadió `IssueTx`y `GetUTXOs` a la API de la C-chain para permitir la emisión de intercambios atómicos sin revelar las claves privadas de un nodo.
* Se corregió la fuga de memoria en el gestor de peticiones de snowman con el procesamiento de bloques de oráculo.
* Se corregió el error de paginación de UTXO que no informaba sobre los fondos disponibles.
* Se han movido los registros de la cadena http a la carpeta de registros de la cadena legible por los humanos.
* Se ha reestructurado la forma en que se gestionan las ID para evitar las asignaciones de montones.
* Se optimizaron los `UniformSampler` para evitar la creación de múltiples mapas.
* Se ha reducido el uso de `ids.Set`a favor de `[]ids.ID`para utilizar mejor la memoria continua.
* Se introdujo la reutilización de `[]byte` en `PrefixDB`.
* Se han implementado funciones de clasificación específicas de tipo para evitar asignaciones frecuentes de conversión de interfaz.
* Se ha optimizado el usuario de carga AVM para evitar leer información innecesaria del disco.
* Eliminada una asignación de memoria + copia en el envío de sockets para toda la longitud del mensaje.

Para obtener ayuda con esta actualización, ve a [Preguntas frecuentes de los desarrolladores](https://support.avalabs.org/en/collections/2618154-developer-faq). si todavía tienes problemas, puedes unirte a nuestro servidor de [Discord](https://chat.avax.network) para que te ayudemos.

## v1.0.4 ([Ver en GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

![AvalancheGo release notes v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}
Esta actualización es opcional, pero recomendada. El parche incluye mejoras en la calidad de vida y varias mejoras en el rendimiento. Tenga en cuenta que esta actualización requiere que los parámetros de la CLI se especifiquen con -- en lugar de permitir - o --. Por ejemplo, `-public-ip=127.0.0.1` ya no está permitido y debe especificarse como `--public-ip=127.0.0.1`. De resto, esta actualización es compatible con las versiones anteriores.
{% endhint %}

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

Para obtener ayuda con esta actualización, ve a [Preguntas frecuentes de los desarrolladores](https://support.avalabs.org/en/collections/2618154-developer-faq). si todavía tienes problemas, puedes unirte a nuestro servidor de [Discord](https://chat.avax.network) para que te ayudemos.

