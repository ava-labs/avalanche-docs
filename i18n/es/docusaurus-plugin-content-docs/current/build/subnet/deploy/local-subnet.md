---
tags: [Construir, Subredes]
description: Esta guía de cómo hacerlo se centra en tomar una configuración de Subred ya creada y desplegarla en una red Avalanche local.
sidebar_label: En una Red Local
pagination_label: Personaliza tu Subred impulsada por EVM
sidebar_position: 0
---

# Cómo desplegar una Subred en una Red Local

Esta guía de cómo hacerlo se centra en tomar una configuración de Subred ya creada y desplegarla en una
red Avalanche local.

## Requisitos previos

- [Avalanche-CLI instalado](/tooling/cli-guides/install-avalanche-cli.md)
- Has [creado una configuración de Subred](/build/subnet/hello-subnet#create-your-subnet-configuration)

## Desplegando Subredes localmente

En los siguientes comandos, asegúrate de sustituir el nombre de tu configuración de Subred por
`<nombreSubred>`.

Para desplegar tu Subred, ejecuta

`avalanche subnet deploy <nombreSubred>`

y selecciona `Red Local` para desplegarla. Alternativamente, puedes omitir esta solicitud proporcionando
la bandera `--local`. Por ejemplo:

`avalanche subnet deploy <nombreSubred> --local`

El comando puede tardar unos minutos en ejecutarse.

Nota: Si ejecutas `bash` en tu shell y estás ejecutando Avalanche-CLI en ARM64 en Mac,
necesitarás Rosetta 2 para poder desplegar Subredes localmente. Puedes descargar Rosetta 2 usando
`softwareupdate --install-rosetta`.

### Resultados

Si todo funciona como se espera, la salida del comando debería verse algo así:

<!-- markdownlint-disable MD013 -->

```text
> avalanche subnet deploy miSubred
✔ Red Local
Desplegando [miSubred] en Red Local
Instalando subnet-evm-v0.4.3...
Instalación exitosa de subnet-evm-v0.4.3
Controlador de backend iniciado, pid: 93928, salida en: /Users/subnet-developer/.avalanche-cli/runs/server_20221122_173138/avalanche-cli-backend
Instalando avalanchego-v1.9.3...
Instalación exitosa de avalanchego-v1.9.3
VMs listas.
Iniciando red...
..................
La blockchain ha sido desplegada. Espera hasta que la red lo reconozca...
......
Red lista para usar. Puntos finales del nodo de red local:
+-------+----------+------------------------------------------------------------------------------------+
| NODO  |    VM    |                                        URL                                         |
+-------+----------+------------------------------------------------------------------------------------+
| nodo2 | miSubred | http://127.0.0.1:9652/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo3 | miSubred | http://127.0.0.1:9654/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo4 | miSubred | http://127.0.0.1:9656/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo5 | miSubred | http://127.0.0.1:9658/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+
| nodo1 | miSubred | http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc |
+-------+----------+------------------------------------------------------------------------------------+

Detalles de conexión de la Extensión del Navegador (cualquier URL de nodo de arriba funciona):
URL RPC:          http://127.0.0.1:9650/ext/bc/SPqou41AALqxDquEycNYuTJmRvZYbfoV9DYApDJVXKXuwVFPz/rpc
Dirección financiada:   0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC con 1000000 (10^18) - clave privada: 56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027
Nombre de red:     miSubred
ID de cadena:         54325
Símbolo de moneda:  TUTORIAL
```

<!-- markdownlint-enable MD013 -->

Puedes usar los detalles del despliegue para conectarte e interactuar con tu Subred.

Para gestionar la red Avalanche local recién desplegada, consulta
[el árbol de comandos `avalanche network`](/tooling/avalanche-cli.md#network).

### Desplegando Múltiples Subredes

Puedes desplegar múltiples Subredes simultáneamente, pero no puedes desplegar la misma Subred varias veces
sin restablecer todo el estado de la Subred desplegada.

## Redesplegando la Subred

Para redesplegar la Subred, primero necesitas borrar el estado de la Subred. Esto borra permanentemente todos los datos
de todas las Subredes desplegadas localmente. Para hacerlo, ejecuta

```shell
avalanche network clean
```

Ahora estás libre de redeployar tu Subred con

```shell
avalanche subnet deploy <nombreSubred> --local
```
