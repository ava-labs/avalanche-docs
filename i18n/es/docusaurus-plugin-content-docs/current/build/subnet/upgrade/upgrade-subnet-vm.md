---
tags: [Construir, Subredes]
description: Esta guía explica cómo actualizar una Máquina Virtual de una Subred desplegada.
sidebar_label: Máquina Virtual de la Subred
pagination_label: Actualizar la Máquina Virtual de una Subred
sidebar_position: 2
---

# Cómo actualizar la Máquina Virtual de una Subred

Esta guía explica cómo actualizar una Subred que ya ha sido desplegada.

## Actualizando una VM local

Para actualizar una Subred local, primero necesitas pausar la red local. Para hacerlo, ejecuta

```shell
avalanche network stop
```

A continuación, necesitas seleccionar la nueva VM en la que se ejecutará tu Subred. Si estás ejecutando una Subred-EVM,
probablemente quieras actualizar a la última versión lanzada. Si estás ejecutando una VM personalizada, querrás
elegir otro binario personalizado.

Inicia el asistente de actualización con

```shell
avalanche subnet upgrade vm <nombreSubred>
```

donde reemplazas `<nombreSubred>` con el nombre de la Subred que deseas actualizar.

### Seleccionando una implementación de VM para actualizar

Después de iniciar el Asistente de Actualización de la Subred, deberías ver algo como esto:

```text
? ¿Qué implementación te gustaría actualizar?
  ▸ Actualizar la configuración para implementaciones futuras
    Implementación local existente
```

Si seleccionas la primera opción, Avalanche-CLI actualiza la configuración de tu Subred y cualquier llamada futura a
`avalanche subnet deploy` utiliza la nueva versión que seleccionas. Sin embargo, cualquier implementación local existente
continúa utilizando la versión antigua.

Si seleccionas la segunda opción, ocurre lo contrario. La implementación local existente cambia
a la nueva VM pero los despliegues subsiguientes utilizan la original.

### Seleccionar una VM a la que actualizar

La siguiente opción te pide que selecciones tu nueva máquina virtual.

```text
? ¿Cómo te gustaría actualizar la máquina virtual de tu Subred?
  ▸ Actualizar a la última versión
    Actualizar a una versión específica
    Actualizar a un binario personalizado
```

Si estás usando la Subred-EVM, tendrás la opción de actualizar a la última versión lanzada.
También puedes seleccionar una versión específica o suministrar un binario personalizado. Si tu Subred ya
utiliza una VM personalizada, necesitas seleccionar otro binario personalizado.

Una vez que selecciones tu VM, deberías ver algo como:

```text
Actualización completa. Listo para reiniciar la red.
```

### Reiniciar la Red

:::note

Si estás ejecutando múltiples Subredes simultáneamente, es posible que necesites actualizar múltiples Subredes para reiniciar
la red. Todas tus implementaciones desplegadas deben estar utilizando la misma versión del Protocolo RPC. Puedes ver más
detalles al respecto [aquí](/build/subnet/info/troubleshoot-subnet.md#incompatible-rpc-version-for-custom-vm).

:::

Finalmente, reinicia la red con

```shell
avalanche network start
```

Si la red se inicia correctamente, tu Subred ahora está ejecutando la VM actualizada.
