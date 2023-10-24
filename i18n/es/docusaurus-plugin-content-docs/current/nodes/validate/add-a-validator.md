---
tags: [Nodos]
description: Esta sección proporciona documentos sobre cómo construir y mantener un nodo AvalancheGo, y luego validar la red Avalanche utilizando un nodo AvalancheGo.
sidebar_label: Nodo ➡️ Validador
pagination_label: Agregar un nodo al conjunto de validadores
sidebar_position: 3
---

# Agregar un Nodo al Conjunto de Validadores

## Introducción

La [Red Primaria](/learn/avalanche/avalanche-platform.md)
es inherente a la plataforma Avalanche y valida las blockchains incorporadas en Avalanche. En este
tutorial, agregaremos un nodo a la Red Primaria en Avalanche.

La P-Chain gestiona metadatos en Avalanche. Esto incluye hacer un seguimiento de qué nodos
están en qué Subnets, qué blockchains existen y qué Subnets están validando
qué blockchains. Para agregar un validador, emitiremos
[transacciones](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction)
a la P-Chain.

:::advertencia

Ten en cuenta que una vez que emites la transacción para agregar un nodo como validador, no hay
forma de cambiar los parámetros. **No puedes eliminar tu participación temprano o cambiar
la cantidad de participación, el ID del nodo o la dirección de recompensa.** Asegúrate de usar
los valores correctos en las llamadas de API a continuación. Si no estás seguro, no dudes en unirte
a nuestro [Discord](https://chat.avalabs.org/) para hacer preguntas.

:::

## Requisitos

Has completado [Ejecutar un nodo Avalanche](/nodes/run/node-manually.md) y estás familiarizado con
la [arquitectura de Avalanche](/learn/avalanche/avalanche-platform.md). En este
tutorial, usamos [AvalancheJS](/tooling/avalanchejs-overview.md) y
[la colección de Postman de Avalanche](/tooling/avalanchego-postman-collection.md) para ayudarnos
a realizar llamadas de API.

Para asegurarte de que tu nodo esté bien conectado, asegúrate de que tu nodo pueda
recibir y enviar tráfico TCP en el puerto de participación (`9651` de forma predeterminada) y que tu nodo
tenga una dirección IP pública (es opcional establecer --public-ip=[LA IP PÚBLICA DE TU NODO AQUÍ]
cuando ejecutes el binario AvalancheGo, ya que de forma predeterminada, el nodo intentará realizar
traversal NAT para obtener la IP del nodo según su enrutador). No hacer ninguna de
estas cosas puede poner en peligro tu recompensa de participación.

## Agregar un validador con Avalanche Wallet

Primero, te mostramos cómo agregar tu nodo como validador usando [Avalanche Wallet](https://wallet.avax.network).

### Obtener el ID del Nodo

Obtén el ID de tu nodo llamando a [`info.getNodeID`](/reference/avalanchego/info-api.md#infogetnodeid):

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json' 127.0.0.1:9650/ext/info
```

La respuesta tiene el ID de tu nodo:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
  },
  "id": 1
}
```

### Agregar como validador

Abre [la billetera](https://wallet.avax.network/), y ve a la pestaña `Earn` (Ganar). Elige
`Add Validator` (Agregar validador) bajo la sección `Validate` (Validar).

Completa los parámetros de participación. Se explican con más detalle en [este
documento](/nodes/validate/how-to-stake.md). Cuando hayas completado todos los parámetros de participación
y los hayas verificado, haz clic en `Confirm` (Confirmar). Asegúrate de que el período de participación sea de al
menos 2 semanas, la tasa de tarifa de delegación sea de al menos 2% y estés apostando al
menos 2,000 AVAX en Mainnet (1 AVAX en Fuji Testnet).

Deberías ver un mensaje de éxito y tu saldo debería actualizarse.

Llamar a
[`platform.getPendingValidators`](/reference/avalanchego/p-chain/api.md#platformgetpendingvalidators)
verifica que tu transacción haya sido aceptada. Ten en cuenta que esta llamada de API debe hacerse
antes de la hora de inicio de validación de tu nodo, de lo contrario, el retorno no incluirá
el ID de tu nodo ya que ya no está pendiente.

Vuelve a la pestaña `Earn` (Ganar) y haz clic en `Estimated Rewards` (Recompensas estimadas).

Una vez que haya pasado la hora de inicio de tu validador, verás las recompensas que puede
ganar, así como su hora de inicio, hora de finalización y el porcentaje de su período de
validación que ha pasado.

También puedes llamar a
[`platform.getCurrentValidators`](/reference/avalanchego/p-chain/api.md#platformgetcurrentvalidators)
para verificar que el ID de tu nodo esté incluido en la respuesta.

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

### Flujo de trabajo de Fuji

En esta sección, usaremos la Testnet Fuji para mostrar cómo agregar un nodo al conjunto de validadores.

Abre tu directorio AvalancheJS y selecciona la carpeta
[**`examples/platformvm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/platformvm)
para ver el código fuente de los scripts de ejemplo.

Usaremos el script
[**`buildAddValidatorTx.ts`**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildAddValidatorTx.ts)
para agregar un validador. Para obtener más información sobre la API `buildAddValidatorTx`,
haz clic
[aquí](https://github.com/ava-labs/avalanchejs-docs/blob/main/classes/api_platformvm.platformvmapi.md#buildaddvalidatortx).

#### Clave privada

Localiza esta línea en el archivo

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
```

y reemplázala con una clave privada que controles. Puedes usar [este código para generar una nueva clave](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/createKeypair.ts).

```js
const privKey: string = "<TU-CLAVE-PRIVADA-AQUÍ>";
```

#### Configuración de red

La siguiente configuración funciona cuando se usa un nodo local iniciado con [`--network-id=fuji`](/nodes/configure/avalanchego-config-flags.md#network-id):

```js
const ip: string = "localhost";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 5;
```

Sin embargo, para conectarse directamente al servidor de la [API de Avalanche Fuji Testnet](/tooling/rpc-providers.md),
se necesitan los siguientes cambios:

```js
const ip: string = "api.avax-test.network";
const port: number = 443;
const protocol: string = "https";
const networkID: number = 5;
```

Dependiendo de la networkID pasada al instanciar un objeto `Avalanche` en el código, las direcciones codificadas utilizadas tendrán una Parte Legible por Humanos (HRP) distintiva por red.

_Ejemplo de dirección: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

Para Fuji Testnet, 5 es el valor correcto a usar.

Para obtener más información sobre las direcciones codificadas, haz clic [aquí](/tooling/avalanchejs-guides/manage-x-chain-keys.md#encode-bech32-addresses).

#### Configuración para la validación

A continuación, necesitamos especificar el período de validación y la tarifa de delegación del nodo.

```ts
const nodeID: string = "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg";
const startTime: BN = UnixNow().add(new BN(60 * 1));
const endTime: BN = startTime.add(new BN(26300000));
const delegationFee: number = 10;
```

#### ID del nodo

Esta es la ID del nodo del validador que se está agregando. Consulta la sección anterior sobre cómo recuperar la ID del nodo usando la API [`info.getNodeID`](/reference/avalanchego/info-api.md#infogetnodeid).

#### Período de staking

`startTime` y `endTime` son necesarios para especificar el momento de inicio/fin de la validación. La duración mínima en la que se puede validar la Red Primaria es de 2 semanas, y la duración máxima es de un año. Se puede iniciar una nueva validación en la Red Primaria después de terminar una, simplemente que la duración máxima _continua_ es de un año. `startTime` y `endTime` son los tiempos Unix en los que tu validador comenzará y dejará de validar la Red Primaria, respectivamente. `startTime` debe estar en el futuro en relación con el momento en que se emite la transacción.

El código de ejemplo usa `const startTime: BN = UnixNow().add(new BN(60 * 1))` y `const endTime: BN = startTime.add(new BN(26300000))` para calcular el tiempo Unix 1 minuto y 304 días en el futuro (en el momento en que se escribió este artículo) para usar como valores de `startTime` y `endTime`, respectivamente.

:::tip

Puedes crear tu propio timestamp Unix [aquí](https://www.unixtimestamp.com/) o usando el método `UnixNow()`

:::

Para crear tus propios tiempos de inicio, sigue los pasos a continuación:

Localiza esta línea en el archivo

```ts
const startTime: BN = UnixNow().add(new BN(60 * 1));
const endTime: BN = startTime.add(new BN(26300000));
```

Cambia `startTime` y `endTime` por nuevos valores de `BN`, por ejemplo:

```ts
const startTime: BN = new BN(1654656829); // Mié Jun 08 2022 02:53:49 GMT+0000
const endTime: BN = new BN(1662602029); // Jue Sep 08 2022 01:53:49 GMT+0000
```

#### Tarifa de delegación

Avalanche permite la delegación de stake. Este parámetro es la tarifa porcentual que cobra este validador cuando otros delegan stake en él. Por ejemplo, si la tarifa de delegación es `10` y alguien delega en este validador, entonces cuando el período de delegación haya terminado, el 10% de la recompensa va al validador y el resto va al delegador, si este nodo cumple con los requisitos de recompensa de validación.

#### Cantidad de stake

Establece la cantidad adecuada de stake al llamar a `pchain.buildAddValidatorTx` reemplazando `stakeAmount.minValidatorStake` con un número en la unidad de gwei, por ejemplo, `BN(1e12)` que son 10,000 AVAX.

#### Direcciones

Por defecto, el ejemplo usa la variable `pAddressStrings` para definir `toAddresses`, `fromAddresses`, `changeAddresses` y `rewardAddresses`:

```js
const pAddressStrings: string[] = pchain.keyChain().getAddressStrings();
```

Esto recupera las direcciones de la P-Chain que pertenecen a la `clave privada` que aparece antes en el ejemplo.

No se necesita ningún cambio en las direcciones para la acción predeterminada.

#### Ejecutar el código

Ahora que hemos realizado todos los cambios necesarios en el script de ejemplo, es hora de agregar un validador a la Red Fuji.

Ejecuta el comando:

```zsh
ts-node examples/platformvm/buildAddValidatorTx.ts
```

La respuesta tiene el ID de transacción.

```zsh
¡Éxito! TXID: 2ftDVwmss5eJk8HFsNVi6a3vWK9s3szZFhEeSY2HCS8xDb8Cra
```

Podemos verificar el estado de la transacción ejecutando el script de ejemplo: [`getTxStatus.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/getTxStatus.ts) siguiendo los pasos a continuación:

1. Asegúrate de que tu [configuración de red](/build/dapp/chain-settings.md) sea correcta antes de ejecutar el script.

2. Localiza esta línea en el archivo

```js
const main = async (): Promise<any> => {
  const txID: string = "x1NLb9JaHkKTXvSRReVSsFwQ38mY7bfD1Ky1BPv721VhrpuSE"
  ...
  }
```

y reemplázala con el TXID de _buildAddValidator_

```js
const main = async (): Promise<any> => {
 const txID: string = "2ftDVwmss5eJk8HFsNVi6a3vWK9s3szZFhEeSY2HCS8xDb8Cra"
 ...
 }
```

Ejecuta el comando:

```sh
ts-node examples/platformvm/getTxStatus.ts
```

Esto devuelve:

```sh
{ status: 'Committed' }
```

El estado debería ser `Committed`, lo que significa que la transacción fue exitosa.

Podemos ver si el nodo está ahora en el conjunto de validadores pendientes para la red Fuji usando el ejemplo: [`getPendingValidators.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/getPendingValidators.ts). Simplemente cambia la [configuración de red](/build/dapp/chain-settings.md) para cumplir con los requisitos de Fuji y luego ejecuta el script:

```sh
ts-node examples/platformvm/getPendingValidators.ts
```

La respuesta debería incluir el nodo que acabamos de agregar:

```json
{
  "validators": [
    {
      "nodeID": "NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg",
      "startTime": "1654656829",
      "endtime": "1662602029",
      "stakeAmount": "1000000000"
    }
  ],
  "delegators": []
}
```

Cuando el tiempo alcance `1654656829` (Mié Jun 08 2022 02:53:49 GMT+0000), este nodo comenzará a validar la Red Primaria. Cuando alcance `1662602029` (Jue Sep 08 2022 01:53:49 GMT+0000), este nodo dejará de validar la Red Primaria. El AVAX con stake y las recompensas, si las hay, se devolverán a `pAddressStrings`.

#### Personalización de direcciones

Hay 4 direcciones que se necesitan al llamar a `pchain.buildAddValidatorTx`. Solo 2 de ellas se pueden cambiar: `toAddresses` y `rewardAddresses`. Por razones de compatibilidad con versiones anteriores, `fromAddresses` y `changeAddresses` son solo marcadores de posición y se ignoran.

`toAddresses`

Un arreglo de direcciones que reciben los tokens con stake al final del período de staking.

`rewardAddresses`

Cuando un validador deja de validar la Red Primaria, recibirá una recompensa si es suficientemente receptivo y correcto mientras validaba la Red Primaria. Estos tokens se envían a `rewardAddresses`. La apuesta original se enviará de vuelta a las direcciones definidas en `toAddresses`.

La apuesta de un validador nunca se reduce, sin importar su comportamiento, siempre recibirán su apuesta de vuelta cuando terminen de validar.

Localiza esta parte del código

```ts
let privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
pKeychain.importKey(privKey);
```

y reemplaza `privKey` con claves privadas que controlas. Para generar un nuevo par de claves, podemos usar el script de ejemplo [`createKeypair.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/createKeypair.ts) junto con la [Configuración de la Red Fuji](/build/dapp/chain-settings.md).

```ts
let privKey: string =
  "PrivateKey-PY2dvfxzvBAe1a5nn7x23wmZMgAYJaS3XAZXzdUa22JtzUvKM";
pKeychain.importKey(privKey);
privKey = "PrivateKey-2Y3Vg9LShMJyUDBHzQqv5WtKDJ8yAVHyM3H5CNCBBmtg3pQEQG";
pKeychain.importKey(privKey);
privKey = "PrivateKey-NaV16owRSfa5TAtxtoU1BPUoM2y1ohttRbwKJG1j7onE4Ge1s";
pKeychain.importKey(privKey);
priKey = "PrivateKey-26JMUsR5RCkf5k9ME8WxKCWEuCK5s2SrALUn7vEa2urwyDDc91";
pKeychain.importKey(privKey);

const pAddressStrings: string[] = pchain.keyChain().getAddressStrings();
```

Este ejemplo crearía un keychain con 4 direcciones:

```ts
  "P-fuji1jx644d9y00y5q4hz8cq4wr75a2erne2y4e32xc", // pAddressStrings[0]
  "P-fuji1wchdgdp94j8tszlpsp56qvgkvdn20svpmnm8qk", // pAddressStrings[1]
  "P-fuji1f36kkpy6yzd7ayrywxvvprns7qlrcu3hwqdya8", // pAddressStrings[2]
  "P-fuji1qw7yt3fp43kuwsufff4vhezs2yl00slr09vmh5", // pAddressStrings[3]
```

Ahora podemos pasar cada dirección según su posición en el arreglo `pAddressStrings`:

```ts
const unsignedTx: UnsignedTx = await pchain.buildAddValidatorTx(
  utxoSet,
  [pAddressStrings[0], pAddressStrings[1]], // toAddresses, una o más direcciones
  [pAddressStrings[0]], // fromAddresses, requerido para compatibilidad hacia atrás
  [pAddressStrings[0]], // changeAddresses, requerido para compatibilidad hacia atrás
  nodeID,
  startTime,
  endTime,
  stakeAmount.minValidatorStake,
  [pAddressStrings[2], pAddressStrings[3]], //rewardAddresses, una o más direcciones
  delegationFee,
  locktime,
  threshold,
  memo,
  asOf
);
```

### Flujo de trabajo en Mainnet

El flujo de trabajo en Fuji se puede adaptar a Mainnet con las siguientes modificaciones:

- La clave privada correcta.
- La configuración de red debe ser para un nodo de Mainnet, ya sea [un nodo local en Mainnet](/nodes/configure/avalanchego-config-flags.md#network-id) o [un servidor de API de Avalanche Mainnet](/tooling/rpc-providers.md#using-the-public-api-nodes) donde se debe usar `api.avax.network` para la `ip`.
- `const networkID: number = 1` basado en [esto](/tooling/avalanchejs-guides/manage-x-chain-keys.md#encode-bech32-addresses).
- Establecer la cantidad correcta para apostar.
