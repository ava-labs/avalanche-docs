---
tags: [Nodos]
description: Esta sección proporciona documentos sobre cómo construir y mantener un nodo AvalancheGo, y luego validar la red Avalanche utilizando un nodo AvalancheGo.
sidebar_label: Nodo ➡️ Validador
pagination_label: Agregar un nodo al conjunto de validadores
sidebar_position: 3
---

# Agregar un nodo al conjunto de validadores

## Introducción

La [Red Primaria](/learn/avalanche/avalanche-platform.md)
es inherente a la plataforma Avalanche y valida las blockchains incorporadas en Avalanche.
En este tutorial, agregaremos un nodo a la Red Primaria en Avalanche.

La P-Chain gestiona metadatos en Avalanche. Esto incluye hacer un seguimiento de qué nodos
están en qué Subredes, qué blockchains existen y qué Subredes están validando
qué blockchains. Para agregar un validador, emitiremos
[transacciones](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)
a la P-Chain.

:::warning

Ten en cuenta que una vez que emites la transacción para agregar un nodo como validador, no hay
forma de cambiar los parámetros. **No puedes quitar tu participación temprano o cambiar
la cantidad de participación, el ID del nodo, o la dirección de recompensa.** Asegúrate de usar
los valores correctos en las llamadas de API a continuación. Si no estás seguro, no dudes en unirte
a nuestro [Discord](https://chat.avalabs.org/) para hacer preguntas.

:::

## Requisitos

Has completado [Ejecutar un Nodo Avalanche](/nodes/run/node-manually.md) y estás familiarizado con
la arquitectura de Avalanche (/learn/avalanche/avalanche-platform.md). En este
tutorial, usamos [AvalancheJS](/tooling/avalanchejs-overview.md) y
la [colección de Postman de Avalanche](/tooling/avalanchego-postman-collection/setup.md)
para ayudarnos a realizar llamadas de API.

Para asegurarte de que tu nodo esté bien conectado, asegúrate de que tu nodo pueda
recibir y enviar tráfico TCP en el puerto de participación (`9651` de forma predeterminada) y que tu nodo
tenga una dirección IP pública (es opcional establecer --public-ip=[LA IP PÚBLICA DE TU NODO AQUÍ]
al ejecutar el binario AvalancheGo, ya que de forma predeterminada, el nodo intentará realizar
traversal NAT para obtener la IP del nodo según su enrutador). No hacer ninguna de
estas cosas puede poner en peligro tu recompensa de participación.

## Agregar un validador con la extensión Core

Primero, te mostramos cómo agregar tu nodo como validador usando [Core web](https://core.app).

### Obtén el ID del nodo, la firma BLS y la clave BLS

Obtén esta información llamando a [`info.getNodeID`](/reference/avalanchego/info-api.md#infogetnodeid):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json' 127.0.0.1:9650/ext/info
```

La respuesta tiene el ID de tu nodo, la clave BLS (clave pública) y la firma BLS (prueba de posesión):

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD",
    "nodePOP": {
      "publicKey": "0x8f95423f7142d00a48e1014a3de8d28907d420dc33b3052a6dee03a3f2941a393c2351e354704ca66a3fc29870282e15",
      "proofOfPossession": "0x86a3ab4c45cfe31cae34c1d06f212434ac71b1be6cfe046c80c162e057614a94a5bc9f1ded1a7029deb0ba4ca7c9b71411e293438691be79c2dbf19d1ca7c3eadb9c756246fc5de5b7b89511c7d7302ae051d9e03d7991138299b5ed6a570a98"
    }
  },
  "id": 1
}
```

### Agregar como validador

Conecta la [extensión Core](https://join.core.app/extension) a [Core web](https://core.app), y ve a la pestaña 'Staking'.
Aquí, elige 'Validate' en el menú.

Completa los parámetros de participación. Se explican con más detalle en [este documento](/nodes/validate/how-to-stake.md). Cuando hayas
completado todos los parámetros de participación y los hayas revisado, haz clic en `Submit Validation`. Asegúrate de que el período de participación sea de al menos
2 semanas, la tasa de tarifa de delegación sea de al menos 2% y estés poniendo en juego al menos
2,000 AVAX en Mainnet (1 AVAX en Fuji Testnet). Una guía completa sobre esto se puede encontrar
[aquí](https://support.avax.network/en/articles/8117267-core-web-how-do-i-validate-in-core-stake).

Deberías ver un mensaje de éxito y tu saldo debería actualizarse.

Vuelve a la pestaña `Stake` y verás aquí una descripción general de tu validación,
con información como la cantidad de participación, el tiempo de participación y más.

![Descripción general de la participación](/img/staking-overview.png)

Llamar a
[`platform.getPendingValidators`](/reference/avalanchego/p-chain/api.md#platformgetpendingvalidators)
verifica que tu transacción haya sido aceptada. Ten en cuenta que esta llamada de API debe hacerse
antes de la hora de inicio de validación de tu nodo, de lo contrario, el retorno no incluirá
el ID de tu nodo ya que ya no está pendiente.

También puedes llamar a
[`platform.getCurrentValidators`](/reference/avalanchego/p-chain/api.md#platformgetcurrentvalidators)
para comprobar que el ID de tu nodo está incluido en la respuesta.

¡Eso es todo!

## Agregar un validador con AvalancheJS

También podemos agregar un nodo al conjunto de validadores usando [AvalancheJS](/tooling/avalanchejs-overview.md).

### Instalar AvalancheJS

Para usar AvalancheJS, puedes clonar el repositorio:

```zsh
git clone https://github.com/ava-labs/avalanchejs.git
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede usar SSH:

`git clone git@github.com:ava-labs/avalanchejs.git`

Puedes encontrar más información sobre SSH y cómo usarlo
[aquí](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

o agregarlo a un proyecto existente:

```zsh
yarn add @avalabs/avalanchejs
```

Para este tutorial, usaremos [`ts-node`](https://www.npmjs.com/package/ts-node)
para ejecutar los scripts de ejemplo directamente desde un directorio AvalancheJS.

### Flujo de trabajo en Fuji

En esta sección, usaremos Fuji Testnet para mostrar cómo agregar un nodo al conjunto de validadores.

Abre tu directorio AvalancheJS y selecciona la carpeta
[**`examples/p-chain`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/p-chain)
para ver el código fuente de los scripts de ejemplo.

Usaremos el script
[**`validate.ts`**](https://github.com/ava-labs/avalanchejs/blob/master/examples/p-chain/validate.ts)
para agregar un validador.

#### Agregar variables de entorno necesarias

Localiza el archivo `.env.example` en la raíz de AvalancheJS y elimina `.example`
del título. Ahora, este será el archivo `.env` para las variables globales.

Agrega la clave privada y la dirección de la P-Chain asociadas con ella.
La URL de la API ya está configurada en Fuji (`https://api.avax-test.network/`).

![Variables de entorno](/img/validator-avalanchejs-1.png)

#### Obtener el ID del nodo, la firma BLS y la clave BLS

Obtén esta información llamando a [`info.getNodeID`](/reference/avalanchego/info-api.md#infogetnodeid):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json' 127.0.0.1:9650/ext/info
```

La respuesta tiene el ID de tu nodo, la clave BLS (clave pública) y la firma BLS (prueba de posesión):

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-JXJNyJXhgXzvVGisLkrDiZvF938zJxnT5",
    "nodePOP": {
      "publicKey": "0xb982b485916c1d74e3b749e7ce49730ac0e52d28279ce4c5c989d75a43256d3012e04b1de0561276631ea6c2c8dc4429",
      "proofOfPossession": "0xb6cdf3927783dba3245565bd9451b0c2a39af2087fdf401956489b42461452ec7639b9082195b7181907177b1ea09a6200a0d32ebbc668d9c1e9156872633cfb7e161fbd0e75943034d28b25ec9d9cdf2edad4aaf010adf804af8f6d0d5440c5"
    }
  },
  "id": 1
}
```

#### Rellena el ID del nodo, la firma BLS y la clave BLS

Después de obtener estos datos, ve a `examples/p-chain/validate.ts`.

Reemplaza el `nodeID`, `blsPublicKey` y `blsSignature` con los valores de tu propio nodo.

![Valores reemplazados](/img/validator-avalanchejs-2.png)


#### Configuración para la validación

A continuación, necesitamos especificar el período de validación y la tarifa de delegación del nodo.


#### Período de validación

El período de validación está configurado de forma predeterminada en 21 días, siendo la fecha de inicio la fecha y hora en que se emite la transacción. La fecha de inicio no se puede modificar.

La fecha de finalización se puede ajustar en el código.

Digamos que queremos que el período de validación termine después de 50 días. Puedes lograr esto agregando el número de días deseados a `endTime.getDate()`, en este caso `50`.

``` ts
// mueve la fecha de finalización 50 días en el futuro
endTime.setDate(endTime.getDate() + 50);
```

Ahora digamos que quieres que el período de staking termine en una fecha y hora específicas, por ejemplo, el 15 de mayo de 2024, a las 11:20 AM. Se puede lograr de la siguiente manera en el código:

```ts
const startTime = await new PVMApi().getTimestamp();
const startDate = new Date(startTime.timestamp);
const start = BigInt(startDate.getTime() / 1000);

// Establece la hora de finalización en una fecha y hora específicas
const endTime = new Date('2024-05-15T11:20:00'); // 15 de mayo de 2024, a las 11:20 AM
const end = BigInt(endTime.getTime() / 1000);
```

#### Tarifa de delegación

Avalanche permite la delegación de stake. Este parámetro es la tarifa porcentual que cobra este validador cuando otros delegan stake en él. Por ejemplo, si `delegationFeeRate` es `10` y alguien delega a este validador, entonces cuando el período de delegación haya terminado, el 10% de la recompensa va al validador y el resto va al delegador, si este nodo cumple con los requisitos de recompensa de validación.

La tarifa de delegación en AvalancheJS está establecida en `20`. Para cambiar esto, debes proporcionar el porcentaje de tarifa deseado como parámetro a `newAddPermissionlessValidatorTx`, que por defecto es `1e4 * 20`.

Por ejemplo, si quieres que sea `10`, el código actualizado se vería así:

```ts
const tx = newAddPermissionlessValidatorTx(
    context,
    utxos,
    [bech32ToBytes(P_CHAIN_ADDRESS)],
    nodeID,
    PrimaryNetworkID.toString(),
    start,
    end,
    BigInt(1e9),
    [bech32ToBytes(P_CHAIN_ADDRESS)],
    [bech32ToBytes(P_CHAIN_ADDRESS)],
    1e4 * 10, // tarifa de delegación, reemplazado 20 con 10
    undefined,
    1,
    0n,
    blsPublicKey,
    blsSignature,
  );
```


#### Cantidad de stake

Establece la cantidad que se bloqueará para la validación al llamar a `newAddPermissionlessValidatorTx`, reemplazando `weight` con un número en la unidad de nAVAX. Por ejemplo, `2 AVAX` serían `2e9 nAVAX`.

``` ts
  const tx = newAddPermissionlessValidatorTx(
    context,
    utxos,
    [bech32ToBytes(P_CHAIN_ADDRESS)],
    nodeID,
    PrimaryNetworkID.toString(),
    start,
    end,
    BigInt(2e9), // la cantidad a staked
    [bech32ToBytes(P_CHAIN_ADDRESS)],
    [bech32ToBytes(P_CHAIN_ADDRESS)],
    1e4 * 10,
    undefined,
    1,
    0n,
    blsPublicKey,
    blsSignature,
  );
```

#### Ejecuta el código

Ahora que hemos realizado todos los cambios necesarios en el script de ejemplo, es hora de agregar un validador a la Red Fuji.

Ejecuta el comando:

```zsh
node --loader ts-node/esm examples/p-chain/validate.ts
```

La respuesta:

```zsh
laviniatalpas@Lavinias-MacBook-Pro avalanchejs % node --loader ts-node/esm examples/p-chain/validate.ts
(node:87616) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)
{ txID: 'RVe3CFRieRbBvKXKPu24Zbt1QehdyGVT6X4tPWVBeACPX3Ab8' }
```

Podemos verificar el estado de la transacción ejecutando el script de ejemplo con [`platform.getTxStatus`](/docs/reference/avalanchego/p-chain/api.md#platformgettxstatus) o buscando el validador directamente en el [explorador](https://subnets-test.avax.network/validators/NodeID-JXJNyJXhgXzvVGisLkrDiZvF938zJxnT5).

![Validador agregado](/img/validator-avalanchejs-3.png)


### Flujo de trabajo en Mainnet

El flujo de trabajo en Fuji anterior se puede adaptar a Mainnet con las siguientes modificaciones:

- `AVAX_PUBLIC_URL` debería ser `https://api.avax.network/`.
- `P_CHAIN_ADDRESS` debería ser la dirección de la cadena P-Chain en Mainnet.
- Establece la cantidad correcta para apostar.
- La `blsPublicKey`, `blsSignature` y `nodeID` deben ser las correspondientes a tu Nodo en Mainnet.