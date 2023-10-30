---
tags: [Nodos]
description: Referencia de todas las opciones y banderas de configuración de Subnet disponibles.
sidebar_label: Configuraciones de Subnet
pagination_label: Configuraciones de Subnet
sidebar_position: 2
---

# Configuraciones de Subnet

Es posible proporcionar parámetros para una Subnet. Estos parámetros se aplican a todas
las cadenas en la Subnet especificada.

AvalancheGo busca archivos especificados con `{subnetID}.json` bajo
`--subnet-config-dir` como se documenta
[aquí](/nodes/configure/avalanchego-config-flags.md#subnet-configs).

Aquí tienes un ejemplo de archivo de configuración de Subnet:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  },
  "appGossipNonValidatorSize": 10
}
```

## Parámetros

### Subnet Privada

#### `validatorOnly` (bool)

Si es `true`, este nodo no expone el contenido de la blockchain de la Subnet a nodos no validadores
a través de mensajes P2P. Por defecto es `false`.

Las Subnets de Avalanche son públicas por defecto. Esto significa que cada nodo puede sincronizar y
escuchar transacciones/bloques en Subnets, incluso si no están validando la
Subnet escuchada.

Los validadores de la Subnet pueden elegir no publicar el contenido de las blockchains a través de esta
configuración. Si un nodo establece `validatorOnly` en verdadero, el nodo intercambia
mensajes sólo con los validadores de esta Subnet. Otros pares no podrán
aprender el contenido de esta Subnet desde este nodo.

:::tip

Esta es una configuración específica del nodo. Cada validador de esta Subnet tiene que usar
esta configuración para crear una Subnet privada completa.

:::

#### `allowedNodes` (lista de cadenas)

Si `validatorOnly=true`, esto permite que se permitan explícitamente los NodeIDs especificados
para sincronizar la Subnet independientemente de su estado de validador. Por defecto, está vacío.

:::tip

Esta es una configuración específica del nodo. Cada validador de esta Subnet tiene que usar
esta configuración para permitir correctamente un nodo en la Subnet privada.

:::

#### `proposerMinBlockDelay` (duración)

La demora mínima realizada al construir bloques snowman++. El valor predeterminado es de 1 segundo.

Como una de las formas de controlar la congestión de la red, Snowman++ sólo construirá un
bloque `proposerMinBlockDelay` después de la marca de tiempo del bloque padre. Algunas
VM personalizadas de alto rendimiento pueden encontrar esto demasiado estricto. Esta bandera permite ajustar la
frecuencia a la que se construyen los bloques.

### Parámetros de Consenso

Las configuraciones de Subnet admiten cargar nuevos parámetros de consenso. Las claves JSON son
diferentes de sus claves `CLI` correspondientes. Estos parámetros deben agruparse bajo la
clave `consensusParameters`. Los parámetros de consenso de una Subnet se establecen por defecto en los
mismos valores utilizados para la Red Primaria, que se dan en [Parámetros Snow
CLI](/nodes/configure/avalanchego-config-flags.md#snow-parameters).

| Clave CLI                        | Clave JSON            |
| :------------------------------- | :-------------------- |
| --snow-sample-size               | k                     |
| --snow-quorum-size               | alpha                 |
| --snow-virtuous-commit-threshold | `betaVirtuous`        |
| --snow-rogue-commit-threshold    | `betaRogue`           |
| --snow-concurrent-repolls        | concurrentRepolls     |
| --snow-optimal-processing        | `optimalProcessing`   |
| --snow-max-processing            | maxOutstandingItems   |
| --snow-max-time-processing       | maxItemProcessingTime |
| --snow-avalanche-batch-size      | `batchSize`           |
| --snow-avalanche-num-parents     | `parentSize`          |

### Configuraciones de Gossip

Es posible definir diferentes configuraciones de Gossip para cada Subnet sin
cambiar los valores de la Red Primaria. Por ejemplo, en la Red Primaria, las mempools de transacciones no se gossipan a no validadores
(`--consensus-app-gossip-non-validator-size` es `0`). Puedes cambiar esto para
tu Subnet y compartir la mempool con no validadores también. Las claves JSON de estos
parámetros son diferentes de sus claves `CLI` correspondientes. Estos parámetros
se establecen por defecto en los mismos valores utilizados para la Red Primaria. Para más información,
consulta [Configuraciones de Gossip CLI](/nodes/configure/avalanchego-config-flags.md#gossiping).

| Clave CLI                                               | Clave JSON                             |
| :------------------------------------------------------ | :------------------------------------- |
| --consensus-accepted-frontier-gossip-validator-size     | gossipAcceptedFrontierValidatorSize    |
| --consensus-accepted-frontier-gossip-non-validator-size | gossipAcceptedFrontierNonValidatorSize |
| --consensus-accepted-frontier-gossip-peer-size          | gossipAcceptedFrontierPeerSize         |
| --consensus-on-accept-gossip-validator-size             | gossipOnAcceptValidatorSize            |
| --consensus-on-accept-gossip-non-validator-size         | gossipOnAcceptNonValidatorSize         |
| --consensus-on-accept-gossip-peer-size                  | gossipOnAcceptPeerSize                 |
| --consensus-app-gossip-validator-size                   | appGossipValidatorSize                 |
| --consensus-app-gossip-non-validator-size               | appGossipNonValidatorSize              |
| --consensus-app-gossip-peer-size                        | appGossipPeerSize                      |
