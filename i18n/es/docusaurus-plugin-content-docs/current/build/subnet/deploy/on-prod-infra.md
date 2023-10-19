---
tags: [Construir, Subredes]
description: Este tutorial demuestra cómo implementar una Subred en un entorno de producción.
sidebar_label: En Infraestructura de Producción
pagination_label: Implementar Subredes en Infraestructura de Producción
sidebar_position: 3
---

# Implementar Subredes en Infraestructura de Producción

## Introducción

Después de arquitectar tu entorno de Subred en la [máquina local](/build/subnet/deploy/local-subnet.md),
demostrando el diseño y probándolo en [la Testnet Fuji](/build/subnet/deploy/fuji-testnet-subnet.md),
eventualmente necesitarás implementar tu Subred en un entorno de producción. Ejecutar una Subred en producción es mucho más
complicado que las implementaciones locales y en Testnet, ya que tu Subred tendrá que cuidar el uso del mundo real,
manteniendo el tiempo de actividad, las actualizaciones y todo eso en un entorno potencialmente adversarial. El propósito
de este documento es señalar un conjunto de consideraciones generales y proponer soluciones potenciales a
ellas.

La arquitectura del entorno que tu Subred particular usará estará muy influenciada por
el tipo de carga y actividad que tu Subred está diseñada para soportar, por lo que tu solución probablemente será
diferente a lo que proponemos aquí. Aún así, podría ser útil seguir adelante, para construir la
intuición para el tipo de preguntas que necesitarás considerar.

## Configuración de Nodos

Los nodos Avalanche son elementos esenciales para ejecutar tu Subred en producción. Como mínimo, tu
Subred necesitará nodos validadores, potencialmente también nodos que actúen como servidores RPC, indexadores o
exploradores. Ejecutar un nodo es básicamente ejecutar una instancia de [AvalancheGo](/nodes/README.md) en un
servidor.

### Sistema Operativo del Servidor

Aunque AvalancheGo puede ejecutarse en una computadora macOS o Windows, recomendamos encarecidamente ejecutar nodos
en computadoras que ejecuten Linux, ya que están diseñadas específicamente para cargas de servidor y todas las herramientas y
utilidades necesarias para administrar un servidor son nativas de Linux.

### Especificación de Hardware

Para ejecutar AvalancheGo como un validador en la Red Primaria, la configuración recomendada es la siguiente:

- CPU: Equivalente a 8 vCPU de AWS
- RAM: 16 GiB
- Almacenamiento: 1 TiB con al menos 3000 IOPS
- SO: Ubuntu 20.04
- Red: Conexión de red confiable IPv4 o IPv6, con un puerto público abierto

Esa es la configuración suficiente para ejecutar un nodo de Red Primaria. Cualquier requisito de recursos
para tu Subred se suman a esto, por lo que no debes ir por debajo de esta configuración, pero es posible que necesites
aumentar la especificación si esperas que tu Subred maneje una cantidad significativa de transacciones.

Asegúrate de configurar el monitoreo del consumo de recursos para tus nodos porque el agotamiento de recursos puede
causar que tu nodo se ralentice o incluso se detenga, lo que puede afectar severamente tu Subred negativamente.

### Ubicación del Servidor

Puedes ejecutar un nodo en una computadora física que poseas y ejecutes, o en una instancia en la nube. Aunque
ejecutar en tu propio hardware puede parecer una buena idea, a menos que tengas un personal de DevOps de tamaño considerable las 24/7,
recomendamos usar proveedores de servicios en la nube, ya que generalmente proporcionan recursos informáticos confiables en los que
puedes confiar para que se mantengan y monitoreen adecuadamente.

#### Servidores Locales

Si planeas ejecutar nodos en tu propio hardware, asegúrate de que cumplan con la especificación mínima de hardware
como se describe anteriormente. Presta mucha atención a la configuración de red adecuada, asegurándote de que el
puerto p2p (9651) sea accesible y la IP pública esté configurada correctamente en el nodo. Asegúrate de que el nodo esté
conectado a la red físicamente (no a través de Wi-Fi), y que el enrutador sea lo suficientemente potente como para
manejar un par de miles de conexiones TCP persistentes y que el ancho de banda de la red pueda
acomodar al menos 5 Mbps de tráfico de red constante de subida y bajada.

Al instalar el nodo AvalancheGo en las máquinas, a menos que tengas un personal de DevOps dedicado que
se encargará de la configuración y la configuración del nodo, recomendamos usar el [script de instalación](/nodes/run/with-installer.md)
para configurar los nodos. Abstraerá la mayor parte del
proceso de configuración para ti, configurará el nodo como un servicio del sistema y permitirá actualizaciones fáciles del nodo.

#### Proveedores de la Nube

Hay varios proveedores de servicios en la nube diferentes. Tenemos documentos que muestran cómo configurar un nodo en
los más populares:

- [Amazon Web Services](/nodes/run/third-party/aws-node.md)
- [Azure](/nodes/run/third-party/microsoft-azure-node.md)
- [Google Cloud Platform](/nodes/run/third-party/google-cloud-node.md)

Hay una amplia gama de otros proveedores de servicios en la nube que pueden ofrecer precios más bajos o mejores ofertas para tus
necesidades particulares, por lo que tiene sentido buscar opciones.

Una vez que decidas un proveedor (o proveedores), si ofrecen instancias en múltiples centros de datos, tiene
sentido distribuir los nodos geográficamente, ya que eso proporciona una mejor resistencia y estabilidad
contra cortes de energía.

### Número de Validadores

El número de validadores en una Subred es una decisión crucial que debes tomar. Por estabilidad y
descentralización, debes esforzarte por tener tantos validadores como sea posible.

Por razones de estabilidad, nuestra recomendación es tener **al menos** 5 validadores completos en tu Subred.
Si tienes menos de 5 validadores, la vida útil de tu Subred estará en riesgo cada vez que un solo validador
se desconecte, y si tienes menos de 4, incluso un nodo desconectado detendrá tu Subred.

Debes ser consciente de que 5 es el mínimo que recomendamos. Pero, desde un punto de vista de descentralización,
tener más validadores siempre es mejor ya que aumenta la estabilidad de tu Subred y la hace
más resistente tanto a fallas técnicas como a acciones adversariales. En resumen: ejecuta tantos validadores de Subred
como puedas.

Teniendo en cuenta que a veces tendrás que sacar nodos de línea, para mantenimiento de rutina (al menos para
actualizaciones de nodos que ocurren con cierta regularidad) o interrupciones y fallas no programadas, debes ser
capaz de manejar rutinariamente al menos un nodo fuera de línea sin que el rendimiento de tu Subred se degrade.

### Inicio de Nodos

Una vez que configures el servidor e instales AvalancheGo en ellos, los nodos necesitarán iniciar (sincronizarse con
la red). Este es un proceso largo, ya que los nodos necesitan ponerse al día y reproducir toda la actividad de la red
desde el génesis hasta el momento presente. La sincronización completa en un nodo puede llevar más de una
semana, pero hay formas de acortar ese proceso, dependiendo de tus circunstancias.

#### Sincronización de Estado

Si los nodos que ejecutarás como validadores no necesitan tener todo el historial de transacciones, entonces
puedes usar [sincronización de estado](/nodes/configure/chain-config-flags.md#state-sync-enabled-boolean). Con
esta bandera habilitada, en lugar de reproducir toda la historia para llegar al estado actual, los nodos simplemente
descargan solo el estado actual de otros pares de la red, acortando el proceso de inicio desde
varios días a un par de horas. Si los nodos se utilizarán exclusivamente para validación de Subred, puedes
usar la sincronización de estado sin ningún problema. Actualmente, la sincronización de estado solo está disponible para la C-Chain,
pero dado que la mayor parte de las transacciones en la plataforma ocurren allí, aún tiene un impacto significativo
en la velocidad de inicio.

#### Copia de la Base de Datos

Una buena manera de reducir los tiempos de inicio en múltiples nodos es la copia de la base de datos. La base de datos es idéntica
en todos los nodos y, como tal, se puede copiar de manera segura de un nodo a otro. Solo asegúrate de que el
nodo no esté en funcionamiento durante el proceso de copia, ya que eso puede resultar en una base de datos corrupta. El procedimiento de copia de la base de datos se explica en detalle [aquí](/nodes/maintain/node-backup-and-restore.md#database).

Asegúrate de no reutilizar accidentalmente el NodeID de ningún nodo, especialmente no restaures el ID de otro
nodo, consulta [aquí](/nodes/maintain/node-backup-and-restore.md#nodeid) para más detalles. Cada nodo
de

Las instrucciones generales sobre cómo usar un dispositivo Ledger con Avalanche se pueden encontrar aquí.

### Archivo de génesis

La estructura que define los parámetros más importantes en una Subnet se encuentra en el archivo de génesis, que es un archivo legible por humanos en formato `json`. Describir el contenido y las opciones disponibles en el archivo de génesis está más allá del alcance de este documento, y si estás listo para implementar tu Subnet en producción, probablemente ya lo tengas planificado.

Si quieres revisarlo, tenemos una descripción del archivo de génesis en nuestro documento sobre [personalización de Subnets EVM](/build/subnet/upgrade/customize-a-subnet.md).

## Configuración del validador

Ejecutar nodos como validadores de una Subnet requiere algunas consideraciones adicionales, por encima de las que se tienen en cuenta al ejecutar un nodo regular o un validador de la Red Primaria solamente.

### Unirse a una Subnet

Para que un nodo se una a una Subnet, hay dos requisitos previos:

- Validación en la Red Primaria
- Seguimiento de la Subnet

La validación en la Red Primaria significa que un nodo no puede unirse a una Subnet como validador antes de convertirse en un validador en la Red Primaria misma. Entonces, después de agregar el nodo al conjunto de validadores en la Red Primaria, el nodo puede unirse a una Subnet. Por supuesto, esto es válido solo para validadores de Subnet, si necesitas un nodo de Subnet que no valide, entonces el nodo no necesita ser un validador en absoluto.

Para que un nodo comience a sincronizar la Subnet, debes agregar la opción de línea de comando `--track-subnets` o la clave `track-subnets` al archivo de configuración del nodo (que se encuentra en `.avalanchego/configs/node.json` para nodos creados con el script de instalación). Un solo nodo puede sincronizar múltiples Subnets, por lo que puedes agregarlas como una lista separada por comas de los ID de Subnet.

Un ejemplo de una configuración de nodo que sincroniza dos Subnets:

```json
{
  "public-ip-resolution-service": "opendns",
  "http-host": "",
  "track-subnets": "28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY,Ai42MkKqk8yjXFCpoHXw7rdTWSHiKEMqh5h8gbxwjgkCUfkrk"
}
```

Pero eso no es todo. Además de rastrear el ID de la Subnet, el nodo también necesita tener el plugin que contiene la instancia de la VM en la que se ejecutará la cadena de bloques en la Subnet. Es probable que ya hayas pasado por eso en Testnet y Fuji, pero como recordatorio, puedes consultar [este tutorial](/build/subnet/deploy/fuji-testnet-subnet.md).

Entonces, nombra al binario del plugin de la VM como el `VMID` de la cadena de la Subnet y colócalo en el directorio `plugins` donde se encuentra el binario del nodo (para nodos creados con el script de instalación, eso sería `~/avalanche-node/plugins/`).

### Arranque de la Subnet

Después de haber rastreado la Subnet y colocado el binario de la VM en el directorio correcto, tu nodo está listo para comenzar a sincronizarse con la Subnet. Reinicia el nodo y monitorea la salida del registro. Deberías notar algo similar a esto:

<!-- markdownlint-disable MD013 -->

```text
Jul 30 18:26:31 node-fuji avalanchego[1728308]: [07-30|18:26:31.422] INFO chains/manager.go:262 creating chain:
Jul 30 18:26:31 node-fuji avalanchego[1728308]:     ID: 2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt
Jul 30 18:26:31 node-fuji avalanchego[1728308]:     VMID:srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

<!-- markdownlint-enable MD013 -->

Eso significa que el nodo ha detectado la Subnet y está intentando inicializarla y comenzar a arrancar la Subnet. Puede llevar algún tiempo (si ya hay transacciones en la Subnet), y eventualmente terminará el arranque con un mensaje como este:

<!-- markdownlint-disable MD013 -->

```text
Jul 30 18:27:21 node-fuji avalanchego[1728308]: [07-30|18:27:21.055] INFO <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain> snowman/transitive.go:333 consensus starting with J5wjmotMCrM2DKxeBTBPfwgCPpvsjtuqWNozLog2TomTjSuGK as the last accepted block
```

<!-- markdownlint-enable MD013 -->

Eso significa que el nodo ha arrancado correctamente la Subnet y ahora está sincronizado. Si el nodo es uno de los validadores, comenzará a validar cualquier transacción que se publique en la Subnet.

### Monitoreo

Si quieres inspeccionar el proceso de sincronización de la Subnet, puedes usar la llamada RPC para verificar el [estado de la cadena de bloques](/reference/avalanchego/p-chain/api.md#platformgetblockchainstatus).

Para obtener una visión más profunda del funcionamiento de la Subnet, consulta el registro de la cadena de bloques. Por defecto, el registro se puede encontrar en `~/.avalanchego/logs/ChainID.log` donde reemplazas `ChainID` por el ID real de la cadena de bloques en tu Subnet.

Para obtener una visión aún más completa (¡y bonita!) de cómo se comporta el nodo y la Subnet, puedes instalar el sistema de monitoreo Prometheus+Grafana con los paneles personalizados para la operación regular del nodo, así como un panel dedicado para los datos de la Subnet. Consulta el [tutorial](/nodes/maintain/setting-up-node-monitoring.md) para obtener información sobre cómo configurarlo.

### Gestión de la validación

En Avalanche, todas las validaciones están limitadas en el tiempo y pueden variar desde dos semanas hasta un año. Además, las validaciones de Subnet siempre son un subconjunto del período de validación de la Red Primaria (deben ser más cortas o iguales). Eso significa que periódicamente tus validadores expirarán y necesitarás enviar una nueva transacción de validación tanto para la Red Primaria como para tu Subnet.

A menos que se administre adecuadamente y de manera oportuna, eso puede ser disruptivo para tu Subnet (si todos los validadores expiran al mismo tiempo, tu Subnet se detendrá). Para evitar eso, toma notas de cuándo está programada una validación en particular y prepárate para renovarla lo antes posible. Además, al configurar inicialmente los nodos, asegúrate de escalonar la expiración de los validadores para que no todos expiren en la misma fecha. Establecer fechas de finalización con al menos un día de diferencia es una buena práctica, así como establecer recordatorios para cada vencimiento.

## Conclusión

Esperamos que al leer este documento tengas una mejor imagen de los requisitos y consideraciones que debes tener en cuenta al implementar tu Subnet en producción y que ahora estés mejor preparado para lanzar tu Subnet con éxito.

Ten en cuenta que ejecutar una Subnet en producción no es una situación de "hacerlo una vez y listo", de hecho, es ejecutar una flota de servidores 24/7. Y como con cualquier servicio en tiempo real, deberías tener sistemas de registro, monitoreo y alerta robustos para verificar constantemente la salud de los nodos y la Subnet y alertarte si algo fuera de lo común sucede.

Si tienes alguna pregunta, duda o quieres chatear, por favor visita nuestro [servidor de Discord](https://chat.avax.network/), donde tenemos un canal dedicado `#subnet-chat` para hablar sobre todo lo relacionado con Subnets.

¡Esperamos verte allí!
