---
tags: [Construir, Subnets]
description: Este tutorial te guiará a través del proceso de hacer varias actualizaciones y cambios de Subnet, incluyendo qué tener en cuenta y las precauciones sugeridas.
sidebar_label: Consideraciones
pagination_label: Consideraciones clave al actualizar una Subnet
sidebar_position: 0
---

# Consideraciones clave al actualizar una Subnet

En el curso de la operación de una Subnet, inevitablemente necesitarás actualizar o cambiar alguna parte del
stack de software que está ejecutando tu Subnet. Como mínimo, tendrás que actualizar el
cliente de nodo AvalancheGo. Lo mismo ocurre con el binario del plugin de VM que se utiliza para ejecutar la blockchain en
tu Subnet, que probablemente sea el [Subnet-EVM](https://github.com/ava-labs/subnet-evm), la
implementación de la Subnet de la máquina virtual Ethereum.

Las actualizaciones de nodo y VM generalmente no cambian la forma en que funciona tu Subnet, en cambio, mantienen tu
Subnet sincronizada con el resto de la red, aportando actualizaciones de seguridad, rendimiento y características.
La mayoría de las actualizaciones son opcionales, pero todas son recomendadas, y debes incluir las actualizaciones opcionales
como parte de tu mantenimiento de rutina de la Subnet. Algunas actualizaciones serán obligatorias, y se comunicarán claramente como tales
con anticipación, debes prestar especial atención a esas.

Además de las actualizaciones debido a nuevas versiones, es posible que también desees cambiar la configuración de la VM,
para alterar la forma en que la Subnet se ejecuta, para diversas necesidades comerciales u operativas. Estas actualizaciones son únicamente
competencia de tu equipo, y tienes control total sobre el momento de su implementación. Cualquier cambio de este tipo
representa una **actualización de red** y debe ser cuidadosamente planificado y ejecutado.

:::warning
Las actualizaciones de red cambian permanentemente las reglas de tu Subnet.

¡Errores de procedimiento o una actualización fallida pueden detener tu Subnet o provocar pérdida de datos!

Al realizar una actualización de Subnet, cada validador en la Subnet deberá realizar la
misma actualización. Si estás coordinando una actualización de red, debes programar un aviso anticipado a
cada validador de la Subnet para que tengan tiempo de realizar la actualización antes de la activación. Asegúrate
de tener una línea de comunicación directa con todos tus validadores.
:::

Este tutorial te guiará a través del proceso de hacer varias actualizaciones y cambios de Subnet. Señalaremos cosas a tener en cuenta y precauciones que debes tener en cuenta.

## Consideraciones generales de actualización

Cuando operas una Subnet, siempre debes tener en cuenta que las redes de Prueba de Participación como Avalanche
solo pueden progresar si hay una cantidad suficiente de nodos validadores conectados y procesando
transacciones. Cada validador en una Subnet se le asigna un cierto `peso`, que es un valor numérico
que representa la importancia del nodo en las decisiones de consenso. En la Red Primaria, el peso es
igual a la cantidad de AVAX en staking en el nodo. En las Subnets, el peso se asigna actualmente por los
propietarios de la Subnet cuando emiten la transacción [agregando un validador](/reference/avalanchego/p-chain/api.md#platformaddsubnetvalidator) a la Subnet.

Las Subnets pueden operar normalmente solo si los validadores que representan el 80% o más del peso acumulativo del validador
están conectados. Si la cantidad de stake conectado cae cerca o por debajo del 80%, el rendimiento de la Subnet
(tiempo de finalidad) sufrirá, y en última instancia la Subnet se detendrá (dejará de procesar
transacciones).

Como operador de una Subnet, debes asegurarte de que, hagas lo que hagas, al menos el 80% del peso acumulativo de los validadores esté conectado y funcionando en todo momento.

:::info

Es obligatorio que el peso acumulativo de todos los validadores en la Subnet sea al menos
el valor de
[`snow-sample-size`](/nodes/configure/avalanchego-config-flags.md#snow-sample-size-int) (valor predeterminado
20). Por ejemplo, si solo hay un validador en la Subnet, su peso debe ser al menos
`snow-sample-size`. Por lo tanto, al asignar peso a los nodos, siempre usa valores mayores que 20.
Recuerda que el peso de un validador no se puede cambiar mientras está validando, así que asegúrate de usar un
valor apropiado.
:::

## Actualización de nodos validadores de la Subnet

AvalancheGo, el cliente de nodo que ejecuta los validadores Avalanche, está en constante y rápido
desarrollo. Nuevas versiones salen a menudo (aproximadamente cada dos semanas), trayendo capacidades adicionales,
mejoras de rendimiento o correcciones de seguridad. Las actualizaciones suelen ser opcionales, pero de vez en cuando
(mucho menos frecuentemente que las actualizaciones regulares) habrá una actualización que incluye una actualización de red obligatoria.
Esas actualizaciones son **OBLIGATORIAS** para cada nodo que ejecuta la Subnet. Cualquier nodo que
no realice la actualización antes de la marca de tiempo de activación dejará de funcionar inmediatamente cuando la
actualización se active.

Por eso, tener una estrategia de actualización de nodos es absolutamente vital, y siempre debes actualizar al
último cliente AvalancheGo inmediatamente cuando esté disponible.

Para una guía general sobre cómo actualizar AvalancheGo, echa un vistazo a [este tutorial](/nodes/maintain/upgrade-your-avalanchego-node.md). Al actualizar nodos de Subnet y
teniendo en cuenta la sección anterior, asegúrate de escalonar las actualizaciones de nodos y comenzar una nueva actualización
solo una vez que el nodo anterior se haya actualizado correctamente. Usa la [API de Salud](/reference/avalanchego/health-api.md#healthhealth) para verificar que el valor `healthy` en la respuesta
sea `true` en el nodo actualizado, y en otros validadores de la Subnet verifica que
[platform.getCurrentValidators()](/reference/avalanchego/p-chain/api.md#platformgetcurrentvalidators)
tenga `true` en el atributo `connected` para el `nodeID` del nodo actualizado. Una vez que se satisfacen esas dos condiciones,
el nodo se confirma que está en línea y validando la Subnet y puedes comenzar a actualizar
otro nodo.

Continúa el ciclo de actualización hasta que todos los nodos de la Subnet estén actualizados.

## Actualización de binarios de plugin de VM de la Subnet

Además del cliente AvalancheGo en sí, se lanzan nuevas versiones de los binarios de VM que ejecutan las
blockchains en la Subnet. En la mayoría de las Subnets, eso es el
[Subnet-EVM](https://github.com/ava-labs/subnet-evm), por lo que este tutorial pasará por los pasos para
actualizar el binario `subnet-evm`. El proceso de actualización será similar para actualizar cualquier binario de plugin de VM.

Todas las consideraciones para hacer actualizaciones escalonadas de nodos, como se discutió en la sección anterior, son válidas
también para las actualizaciones de VM.

En el futuro, las actualizaciones de VM serán manejadas por la herramienta [Avalanche-CLI
](https://github.com/ava-labs/avalanche-cli), pero por ahora debemos hacerlo manualmente.

Ve a la [página de versiones](https://github.com/ava-labs/subnet-evm/releases) del repositorio de Subnet-EVM.
Localiza la última versión y copia el enlace que corresponda al sistema operativo y la arquitectura de
la máquina en la que se está ejecutando el nodo (`darwin` = Mac, `amd64` = procesador Intel/AMD, `arm64` = procesador Arm). Inicia sesión en la máquina donde se está ejecutando el nodo y descarga el archivo, usando `wget`
y el enlace al archivo, así:

```bash
wget https://github.com/ava-labs/subnet-evm/releases/download/v0.2.9/subnet-evm_0.2.9_linux_amd64.tar.gz
```

Esto descargará el archivo a la máquina. Descomprímelo así (usa el nombre de archivo correcto, por supuesto):

```bash
tar xvf subnet-evm_0.2.9_linux_amd64.tar.gz
```

Esto descomprimirá y colocará el contenido del archivo en el directorio actual, el archivo `subnet-evm`
es el binario del plugin. Ahora debes detener el nodo (si el nodo se está ejecutando como un servicio, usa el comando `sudo
systemctl stop avalanchego`). Ahora debes colocar ese archivo en el directorio de plugins donde
se encuentra el binario AvalancheGo. Si el nodo está instalado usando el script de instalación, la ruta será
`~/avalanche-node/plugins`. En lugar del nombre de archivo `subnet-evm`, el binario de la VM debe tener el nombre
del ID de VM de la cadena en la Subnet. Por ejemplo, para la [Subnet WAGMI](https://subnets-test.avax.network/wagmi) ese ID de VM es
`srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy`. Entonces, el comando para

:::warning
Asegúrate de usar el ID de VM correcto, de lo contrario, tu VM no se actualizará y tu Subnet puede detenerse.
:::

Después de hacer eso, puedes volver a iniciar el nodo (si se está ejecutando como servicio, haz `sudo systemctl start avalanchego`). Puedes monitorear la salida del registro en el nodo para verificar que todo esté bien, o puedes usar la API [info.getNodeVersion()](https://docs.avax.network/apis/avalanchego/apis/info#infogetnodeversion) para verificar las versiones. Un ejemplo de salida se vería así:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "version": "avalanche/1.7.18",
    "databaseVersion": "v1.4.5",
    "gitCommit": "b6d5827f1a87e26da649f932ad649a4ea0e429c4",
    "vmVersions": {
      "avm": "v1.7.18",
      "evm": "v0.8.15",
      "platform": "v1.7.18",
      "sqja3uK17MJxfC7AN8nGadBw9JK5BcrsNwNynsqP5Gih8M5Bm": "v0.0.7",
      "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy": "v0.2.9"
    }
  },
  "id": 1
}
```

Ten en cuenta que la entrada junto al ID de VM que actualizamos correctamente dice `v0.2.9`. ¡Has actualizado con éxito la VM!

Consulta la sección anterior sobre cómo asegurarte de que el nodo esté saludable y conectado antes de pasar a actualizar el siguiente validador de la Subnet.

Si no obtienes el resultado esperado, puedes detener `AvalancheGo`, examinar y seguir de cerca paso a paso lo anterior. Eres libre de eliminar archivos en `~/avalanche-node/plugins`, sin embargo, debes tener en cuenta que eliminar archivos es para eliminar una VM binaria existente. Debes colocar el plugin de VM correcto en su lugar antes de reiniciar AvalancheGo.

## Actualizaciones de red

A veces necesitas hacer una actualización de red para cambiar las reglas configuradas en el génesis bajo las cuales opera la Cadena. En EVM regular, las actualizaciones de red son un proceso bastante complicado que incluye desplegar la nueva binaria de EVM, coordinar la actualización programada y desplegar cambios en los nodos. Pero desde [Subnet-EVM v0.2.8](https://github.com/ava-labs/subnet-evm/releases/tag/v0.2.8), hemos introducido la tan esperada característica de realizar actualizaciones de red usando solo unas pocas líneas de JSON. Las actualizaciones pueden consistir en habilitar/deshabilitar precompilaciones particulares o cambiar sus parámetros. Las precompilaciones disponibles actualmente te permiten:

- Restringir los desplegadores de contratos inteligentes
- Restringir quién puede enviar transacciones
- Acuñar monedas nativas
- Configurar tarifas dinámicas

Consulta [Personalizar una Subnet](/build/subnet/upgrade/customize-a-subnet.md#network-upgrades-enabledisable-precompiles) para obtener una discusión detallada de los posibles parámetros de actualización de precompilación.

## Resumen

Una parte vital del mantenimiento de una Subnet es realizar actualizaciones oportunas en todos los niveles de la pila de software que ejecuta tu Subnet. Esperamos que este tutorial te brinde suficiente información y contexto para que puedas realizar esas actualizaciones con confianza y facilidad. Si tienes preguntas adicionales o algún problema, no dudes en comunicarte con nosotros en [Discord](https://chat.avalabs.org).
