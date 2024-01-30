---
etiquetas: [Herramientas, AvalancheJS]
descripción: AvalancheJS es una biblioteca de JavaScript para interactuar con la plataforma Avalanche. Está construida con TypeScript y está destinada a admitir tanto el navegador como Node.js. La biblioteca AvalancheJS permite emitir comandos a las API del nodo Avalanche.
etiqueta_de_paginación: Transferir tokens AVAX entre cadenas
etiqueta_de_barra_lateral: Enviar tokens entre cadenas
posición_de_barra_lateral: 2
---

# Transferir tokens AVAX entre cadenas

## Introducción

Este artículo muestra cómo transferir tokens AVAX programáticamente entre cualquier par de cadenas (cadenas X/P/C) de la Red Primaria.

Si estás buscando cómo transferir tokens AVAX usando la billetera web, por favor consulta [este artículo](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet).

## Requisitos previos

- Estás familiarizado con la arquitectura de [Avalanche](/learn/avalanche/avalanche-platform.md).
- Has completado [Ejecutar un nodo Avalanche](/nodes/run/node-manually.md).
- Estás familiarizado con [AvalancheJS](https://github.com/ava-labs/AvalancheJS).
- Has instalado [ts-node](https://www.npmjs.com/package/ts-node#installation) para poder seguir los ejemplos en este tutorial.

## Empezando

Para usar AvalancheJS, puedes clonar el repositorio:

```zsh
git clone https://github.com/ava-labs/avalanchejs.git
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede usar SSH:

`git clone git@github.com:ava-labs/avalanchejs.git`

Puedes encontrar más información sobre SSH y cómo usarlo [aquí](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

o agregarlo a un proyecto existente:

```zsh
yarn add --dev avalanche
```

Para este tutorial, usaremos `ts-node` para ejecutar los scripts de ejemplo directamente desde un directorio AvalancheJS.

Para enviar AVAX, necesitas tener algunos AVAX. Puedes usar una cuenta prefinanciada en la red local o obtener AVAX de la testnet desde el [Avalanche Faucet](https://faucet.avax.network), que es una forma fácil de jugar con Avalanche.
Si ya tienes un saldo de AVAX mayor que cero en Mainnet, pega tu dirección de la cadena C allí y solicita tokens de prueba. De lo contrario, por favor solicita un cupón de faucet en [Discord](https://discord.com/channels/578992315641626624/1193594716835545170).
Después de familiarizarte con tu código, puedes ejecutar el código en Mainnet después de hacer los cambios necesarios.

## Transferir AVAX usando AvalancheJS

La forma más fácil de transferir AVAX entre cadenas es usar [AvalancheJS](https://github.com/ava-labs/AvalancheJS), que es una forma programática de acceder y mover AVAX.

AvalancheJS te permite crear y firmar transacciones localmente, por eso es la forma recomendada de transferir AVAX entre cadenas. Nos estamos alejando de usar el keystore de AvalancheGo porque requiere que mantengas tus claves en un nodo completo, lo que las convierte en un objetivo para hackers maliciosos.

### Código de ejemplo

Los siguientes archivos se pueden encontrar en el directorio [examples](https://github.com/ava-labs/avalanchejs/tree/master/examples) del proyecto AvalancheJS.

| Transferir De >> A       | Exportar                                                                                                                                | Importar                                                                                                                                |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **_X-Chain >> C-Chain_** | [**X-Chain : Exportar Avax a C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts)   | [**C-Chain : Importar Avax desde X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-xchain.ts)        |
| **_X-Chain >> P-Chain_** | [**X-Chain : Exportar Avax a P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-PChain.ts)        | [**P-Chain : Importar Avax desde X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-XChain.ts) |
| **_P-Chain >> X-Chain_** | [**P-Chain : Exportar Avax a X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-XChain.ts) | [**X-Chain : Importar Avax desde P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-PChain.ts)        |
| **_P-Chain >> C-Chain_** | [**P-Chain : Exportar Avax a C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildExportTx-CChain.ts) | [**C-Chain : Importar Avax desde P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-PChain.ts)        |
| **_C-Chain >> X-Chain_** | [**C-Chain : Exportar Avax a X-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts)   | [**X-Chain : Importar Avax desde C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts)        |
| **_C-Chain >> P-Chain_** | [**C-Chain : Exportar Avax a P-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-pchain.ts)        | [**P-Chain : Importar Avax desde C-Chain**](https://github.com/ava-labs/avalanchejs/blob/master/examples/platformvm/buildImportTx-CChain.ts) |

:::tip

La convención de nomenclatura en los nombres de archivos y directorios es:

AVM es para X-Chain, EVM para C-Chain y PlatformVM para P-Chain.

:::

### Tarifa de transacción

Las tarifas de transacción son fijas en X-Chain y P-Chain, mientras que son dinámicas en C-Chain, consulta [este artículo](/reference/standards/guides/txn-fees#fee-schedule) para más detalles. Al transferir tokens, por favor ten en cuenta la tarifa al calcular la cantidad total a transferir.

## Flujo de trabajo en Fuji

Este tutorial utiliza transferencias de la cadena X a la cadena C como ejemplo. Las transferencias entre otras cadenas son muy similares.

### Transferir desde la Cadena X a la Cadena C

Para transferir una cantidad especificada de tokens desde la Cadena X a la Cadena C, el token necesita ser exportado primero de la Cadena X a la memoria atómica, desde donde luego se importa a la Cadena C.

#### Exportar el Token Avax de la Cadena X a la Cadena C

Selecciona la carpeta [**`examples/avm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/avm) para ver los ejemplos de la Cadena X de AvalancheJS. Para exportar AVAX desde la Cadena X a la Cadena C, selecciona [`avm/buildExportTx-cchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildExportTx-cchain-avax.ts).

##### Clave Privada

Localiza esta línea en el archivo

```js
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`;
```

y reemplázala con una clave privada que controles.

```js
const privKey: string = "<TU-CLAVE-PRIVADA-AQUÍ>";
```

##### Configuración de Red

La siguiente configuración funciona cuando se utiliza un nodo local iniciado con [`--network-id=fuji`](/nodes/configure/avalanchego-config-flags.md#network-id):

```js
const ip: string = "localhost";
const port: number = 9650;
const protocol: string = "http";
const networkID: number = 5;
```

Sin embargo, para conectarse directamente al servidor de la API de la [Avalanche Fuji Testnet](/tooling/rpc-providers.md), se necesitan los siguientes cambios:

```js
const ip: string = "api.avax-test.network";
const port: number = 443;
const protocol: string = "https";
const networkID: number = 5;
```

Dependiendo del networkID pasado al instanciar Avalanche, las direcciones codificadas utilizadas tendrán una Parte Legible por Humanos (HRP) distintiva para cada red.

_Ejemplo de Dirección: 5 - X-`fuji`19rknw8l0grnfunjrzwxlxync6zrlu33yxqzg0h_

Para la Testnet Fuji, 5 es el valor correcto a usar.

```js
const networkID: number = 5;
```

Para obtener más información sobre las direcciones codificadas, haz clic [aquí](/tooling/avalanchejs-guides/manage-x-chain-keys.md#encode-bech32-addresses).

**Establece la Cantidad Correcta a Enviar:**

De forma predeterminada, los scripts envían todo el saldo de AVAX de la billetera:

```js
const balance: BN = new BN(getBalanceResponse.balance);
const amount: BN = balance.sub(fee);
```

Para enviar una cantidad diferente, reemplaza el código anterior con el siguiente. A continuación, se establece un nuevo valor de 0.01 AVAX (`10000000` Gwei). El valor se establece en formato Gwei donde `1,000,000,000` Gwei = 1 AVAX.

```js
const value: BN = new BN("10000000");
const amount: BN = value.sub(fee);
```

:::tip
Snowtrace proporciona un [convertidor de unidades](https://snowtrace.io/unitconverter) entre diferentes unidades.
:::

Ejecuta el script de exportación:

```sh
ts-node examples/avm/buildExportTx-cchain-avax.ts
```

Esto devuelve:

```sh
¡Éxito! TXID: 2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc
```

#### Verificar la Transacción

Ahora puedes pasar este txID `2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc` a [examples/avm/getTx.ts](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/getTx.ts), junto con otras configuraciones de red similares, y luego puedes ejecutar

```zsh
ts-node examples/avm/getTx.ts
```

lo cual devuelve:

```js
{
  unsignedTx: {
    networkID: 5,
    blockchainID: '2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm',
    outputs: [ [Object] ],
    inputs: [ [Object], [Object] ],
    memo: '0x41564d207574696c697479206d6574686f64206275696c644578706f7274547820746f206578706f7274204156415820746f2074686520432d436861696e2066726f6d2074686520582d436861696e',
    destinationChain: 'yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp',
    exportedOutputs: [ [Object] ]
  },
  credentials: [
    {
      fxID: 'spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ',
      credential: [Object]
    },
    {
      fxID: 'spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ',
      credential: [Object]
    }
  ]
}
```

#### Importar el Token Avax de la Cadena C a la Cadena X

Selecciona la carpeta [**`examples/evm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/evm) para ver los ejemplos de la Cadena C de AvalancheJS. Para importar AVAX a la Cadena C desde la Cadena X, selecciona [`evm/buildImportTx-xchain.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildImportTx-xchain.ts)

Copia la [configuración de red de arriba](#configuración-de-red) en `evm/buildImportTx-xchain.ts`.

Navega a esta parte del código y asegúrate de que la `cHexAddress`(_Tu dirección de billetera en la Cadena C_) y la `clave privada` sean correctas:

```ts
const cHexAddress: string = "<TU-DIRECCIÓN-DE-BILLETERA-CCHAIN-AQUÍ>";
const privKey: string = "<TU-CLAVE-PRIVADA-AQUÍ>";
```

Ejecuta el script de importación:

```sh
ts-node examples/evm/buildImportTx-xchain.ts
```

Esto devuelve:

```sh
¡Éxito! TXID: 2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc
```

¡Eso es todo! ¡Has transferido AVAX de la Cadena X a la Cadena C!

Puedes verificar esta TX copiando / pegando el TXID de importación en [Avascan](https://testnet.avascan.info/blockchain/c/tx/2uQvMcPZjmPXAyvz9cdKBphDDSmnxxx3vsUrxqpj3U92hsfQcc).

### Transferir desde la Cadena C a la Cadena X

Para devolver los AVAX de vuelta a la Cadena X, necesitas hacer la transferencia en la dirección opuesta.

#### Exportar el Token Avax de la Cadena C a la Cadena X

Selecciona la carpeta [**`examples/evm`**](https://github.com/ava-labs/avalanchejs/tree/master/examples/evm) para ver los ejemplos de AvalancheJS en la red C-Chain. Para exportar AVAX desde la red X-Chain a la red C-Chain, selecciona [`evm/buildExportTx-xchain-avax.ts`](https://github.com/ava-labs/avalanchejs/blob/master/examples/evm/buildExportTx-xchain-avax.ts).

Realiza los cambios necesarios mencionados anteriormente para la clave privada y la configuración de red.

Puedes cambiar la cantidad de AVAX a enviar editando la variable _BN_: `avaxAmount`. El código de muestra asigna esto como `1e7` o `10000000` (0.01 AVAX).

La tarifa aquí solo será para exportar el activo. Las tarifas de importación se deducirán de los UTXO presentes en la Memoria Atómica Exportada, una ubicación de memoria donde los UTXO permanecen después de ser exportados pero antes de ser importados.

```ts
let avaxAmount: BN = new BN(1e7);
let fee: BN = baseFee.div(new BN(1e9));
fee = fee.add(new BN(1e6));
```

Ejecuta el script de exportación:

```zsh
avalanchejs $ ts-node examples/evm/buildExportTx-xchain-avax.ts
¡Éxito! TXID: UAez3DTv26qmhKKFDvmQTayaXTPAVahHenDKe6xnUMhJbKuxc
```

#### Importa el Token Avax de la C-Chain a la X-Chain

Antes de ejecutar el [script de importación de ejemplo](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildImportTx-cchain.ts), debemos hacer algunos cambios en el código:

1. Cambia la [Configuración de Red](#network-setting) para cumplir con los requisitos de la red Fuji.
2. Importa tu Clave Privada siguiendo los pasos enumerados [aquí](#private-key).
3. ¡Ejecuta el Script!

```zsh
avalanchejs $ ts-node examples/avm/buildImportTx-cchain.ts
¡Éxito! TXID: Sm6Ec2GyguWyG3Li1pARmTpaZ6qLEPuVAHV8QBGL9JWwWAEgM
```

## Flujo de Trabajo en Mainnet

El flujo de trabajo en Fuji anterior se puede adaptar a Mainnet con las siguientes modificaciones:

- La clave privada correcta.
- La configuración de red debe ser para un nodo Mainnet, ya sea [un nodo local en Mainnet](/nodes/configure/avalanchego-config-flags.md#network-id) o
  [un servidor API de Avalanche Mainnet](/tooling/rpc-providers.md#using-the-public-api-nodes)
  donde se debe usar `api.avax.network` para la `ip`.
- `const networkID: number = 1` basado en [esto](/tooling/avalanchejs-guides/manage-x-chain-keys.md#encode-bech32-addresses).
- Establece la cantidad correcta a enviar.
- La dirección de recepción correcta.

## Flujo de Trabajo Local

### Inicia la Red Local

Sigue
[esto](/tooling/network-runner.md#start-a-new-avalanche-network-with-five-nodes)
para iniciar una red local de 5 nodos. Asegúrate de obtener uno de los números de puerto siguiendo
[esto](/tooling/network-runner.md#get-api-endpoints-of-all-nodes-in-the-cluster).
En este tutorial, asumiremos que uno de los puertos es 30301.

### Localiza el Código de Ejemplo y Realiza los Cambios Necesarios

La mayoría del código ya está configurado para ejecutarse en una red local. Verifica los
siguientes valores para asegurarte de que sean correctos.

```js
const ip: string = "localhost";
const port: number = 30301; // Cambia esto al valor correcto
const protocol: string = "http";
const networkID: number = 1337;
```

Luego ejecuta los scripts de exportación e importación para transferir tokens entre cadenas.