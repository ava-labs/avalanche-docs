---
etiquetas: [Construir, Subredes]
descripción: Cómo personalizar una Subred utilizando Genesis, Precompilación y Configuraciones de Blockchain.
sidebar_label: Personalizar una Subred
pagination_label: Personaliza tu Subred impulsada por EVM
sidebar_position: 1
---

# Personaliza tu Subred impulsada por EVM

Todas las Subredes se pueden personalizar utilizando [`Configuraciones de Subred`](#configuraciones-de-subred).

Una Subred puede tener una o más blockchains. Por ejemplo, la Red Primaria, que es una Subred, una
especial, tiene 3 blockchains. Cada cadena se puede personalizar aún más utilizando un archivo de
configuración específico de la cadena. Consulta [aquí](/nodes/configure/chain-config-flags.md) para obtener una explicación detallada.

Una blockchain creada por o bifurcada de [Subnet-EVM](https://github.com/ava-labs/subnet-evm) se puede
personalizar utilizando uno o más de los siguientes métodos:

- [Genesis](#genesis)
- [Precompilación](#precompilaciones)
- [Configuraciones de actualización](#actualizaciones-de-red-habilitardeshabilitar-precompilaciones)
- [Configuraciones de cadena](#configuraciones-de-cadena-avalanchego)

## Configuraciones de Subred

Una Subred se puede personalizar configurando parámetros para lo siguiente:

- [Comunicación solo para validadores para crear una Subred privada](/nodes/configure/subnet-configs.md#validatoronly-bool)
- [Consenso](/nodes/configure/subnet-configs.md#parámetros-de-consenso)
- [Gossip](/nodes/configure/subnet-configs.md#configuraciones-de-gossip)

Consulta [aquí](/nodes/configure/subnet-configs.md) para obtener más información.

## Genesis

Cada blockchain tiene algún estado de genesis cuando se crea. Cada Máquina Virtual define el formato y
la semántica de sus datos de genesis.

El genesis predeterminado proporcionado por Subnet-EVM a continuación tiene algunos parámetros bien definidos:

```json
{
  "config": {
    "chainId": 43214,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "subnetEVMTimestamp": 0,
    "feeConfig": {
      "gasLimit": 15000000,
      "minBaseFee": 25000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 200000
    },
    "allowFeeRecipients": false
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0xe4e1c0",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

### Configuración de Cadena

`chainID`: Denota el ID de Cadena de la cadena a crear. Debe elegirse cuidadosamente, ya que un conflicto con
otras cadenas puede causar problemas. Una sugerencia es consultar [chainlist.org](https://chainlist.org/)
para evitar colisiones de ID, reservar y publicar correctamente tu ID de Cadena.

Puedes usar la llamada RPC `eth_getChainConfig` para obtener la configuración de cadena actual. Consulta
[aquí](/reference/subnet-evm/api#ethgetchainconfig) para obtener más información.

#### Forks Duros

`homesteadBlock`, `eip150Block`, `eip150Hash`, `eip155Block`, `byzantiumBlock`, `constantinopleBlock`,
`petersburgBlock`, `istanbulBlock`, `muirGlacierBlock`, `subnetEVMTimestamp` son tiempos de activación de forks duros.
Cambiar estos tiempos puede causar problemas, así que trátalos con cuidado.

#### Configuración de Tarifas

`gasLimit`: Establece la cantidad máxima de gas consumido por bloque. Esta restricción pone un límite en la
cantidad de cómputo que se puede hacer en un solo bloque, lo que a su vez establece un límite en el
uso máximo de gas permitido para una sola transacción.
Para referencia, el valor de la C-Chain se establece en `15,000,000`.

`targetBlockRate`: Establece la tasa objetivo de producción de bloques en segundos. Un objetivo de 2 apuntará
a producir un bloque cada 2 segundos. Si la red comienza a producir bloques a una velocidad más rápida,
indica que se emiten más bloques de los previstos a la red, lo que resulta en un
aumento en las tarifas base.
Para la C-chain, este valor se establece en `2`.

`minBaseFee`: Establece un límite inferior en la tarifa base EIP-1559 de un bloque. Dado que la tarifa base del bloque establece
el precio de gas mínimo para cualquier transacción incluida en ese bloque, esto efectivamente establece un gas mínimo
precio para cualquier transacción.

`targetGas`: Especifica la cantidad objetivo de gas (incluido el costo de gas del bloque) para consumir dentro de un
ventana rodante de 10 segundos. Cuando el algoritmo de tarifa dinámica observa que la actividad de la red es
por encima/por debajo del `targetGas`, aumenta/disminuye la tarifa base proporcionalmente a qué tan lejos por encima/por debajo
la actividad de red real está del objetivo. Si la red comienza a producir bloques con un costo de gas más alto que
esto, las tarifas base se incrementan en consecuencia.

`baseFeeChangeDenominator`: Divide la diferencia entre la utilización real y la objetivo para determinar
cuánto aumentar/disminuir la tarifa base. Un denominador más grande indica una tarifa base que cambia más lentamente, más pegajosa,
mientras que un denominador más bajo permite que la tarifa base se ajuste más rápidamente.
Para referencia, el valor de la C-chain se establece en `36`. Este valor establece la
tarifa base para aumentar o disminuir en un factor de `1/36` de la tarifa base del bloque padre.

`minBlockGasCost`: Establece la cantidad mínima de gas a cobrar por la producción de un bloque.
Este valor se establece en `0` en la C-Chain.

`maxBlockGasCost`: Establece la cantidad máxima de gas a cobrar por la producción de un bloque.

`blockGasCostStep`: Determina cuánto aumentar/disminuir el costo de gas del bloque según el
tiempo transcurrido desde el bloque anterior.

Si el bloque se produce a la tasa objetivo, el costo de gas del bloque se mantendrá igual que el costo de gas del bloque padre.

Si se produce más rápido/más lento, el costo de gas del bloque se incrementará/decrementará por el valor de paso por
cada segundo más rápido/más lento que la tasa de bloque objetivo correspondientemente.

:::nota
Si el `blockGasCostStep` se establece en un número muy grande, efectivamente requiere que la producción de bloques
no vaya más rápido que la `targetBlockRate`. Por ejemplo, si un bloque se produce dos segundos más rápido que
la tasa de bloque objetivo, el costo de gas del bloque aumentará en `2 * blockGasCostStep`.

:::

#### Destinatarios de Tarifas Personalizados

Consulta la sección [Configuración de un Destinatario de Tarifas Personalizado](#configuración-de-un-destinatario-de-tarifas-personalizado)

### Alloc

Consulta la sección [Configuración de la Asignación de Genesis](#configuración-de-la-asignación-de-genesis)

### Header

Los campos `nonce`, `timestamp`, `extraData`, `gasLimit`, `difficulty`, `mixHash`, `coinbase`,
`number`, `gasUsed`, `parentHash` definen la cabecera del bloque génesis. El campo `gasLimit` debe ser
ajustado para que coincida con el `gasLimit` establecido en la `feeConfig`. No es necesario cambiar ninguno de los otros campos de la cabecera del génesis.

`nonce`, `mixHash` y `difficulty` son parámetros remanentes de los sistemas de Prueba de Trabajo.
Para Avalanche, estos no juegan ningún papel relevante, así que simplemente debes dejarlos en sus
valores por defecto:

`nonce`: El resultado de la iteración del proceso de minería es este valor. Puede ser cualquier valor en
el bloque génesis. El valor por defecto es `0x0`.

`mixHash`: La combinación de `nonce` y `mixHash` permite verificar que el Bloque ha sido realmente
minado criptográficamente, por lo tanto, desde este aspecto, es válido. El valor por defecto es `0x0000000000000000000000000000000000000000000000000000000000000000`.

`difficulty`: El nivel de dificultad aplicado durante el proceso de descubrimiento de nonce de este bloque.
El valor por defecto es `0x0`.

`timestamp`: La marca de tiempo de la creación del bloque génesis. Comúnmente se establece en `0x0`.

`extraData`: Datos extra opcionales que pueden incluirse en el bloque génesis. Comúnmente se establece en `0x`.

`gasLimit`: La cantidad total de gas que se puede usar en un solo bloque. Debe ser establecido en
el mismo valor que en la [configuración de tarifas](#fee-config). El valor `e4e1c0` es
hexadecimal y es igual a `15,000,000`.

`coinbase`: Se refiere a la dirección de los productores de bloques. Esto también significa que representa la
receptor de la recompensa del bloque. Comúnmente se establece
en `0x0000000000000000000000000000000000000000` para el bloque génesis. Para permitir receptores de tarifas en
Subnet-EVM, consulta [esta sección](#setting-a-custom-fee-recipient).

`parentHash`: Este es el hash Keccak de 256 bits de toda la cabecera del bloque padre. Comúnmente se establece en
`0x0000000000000000000000000000000000000000000000000000000000000000` para el
bloque génesis.

`gasUsed`: Esta es la cantidad de gas utilizada por el bloque génesis. Comúnmente se establece en `0x0`.

`number`: Este es el número del bloque génesis. Debe ser `0x0` para el génesis.
De lo contrario, dará error.

### Ejemplos de Génesis

Otro ejemplo de un archivo génesis se puede encontrar en la
[carpeta de redes](https://github.com/ava-labs/public-chain-assets/blob/1951594346dcc91682bdd8929bcf8c1bf6a04c33/chains/11111/genesis.json).
Nota: por favor, elimina los campos `airdropHash` y `airdropAmount` si quieres empezar con él.

Aquí tienes algunos ejemplos de cómo se utiliza un archivo génesis:

- [scripts/run.sh](https://github.com/ava-labs/subnet-evm/blob/master/scripts/run.sh#L99)

### Configurando la Asignación del Génesis

Alloc define direcciones y sus saldos iniciales. Esto debe cambiarse adecuadamente para cada cadena.
Si no proporcionas ninguna asignación de génesis, no podrás interactuar con tu nueva cadena (todas
las transacciones requieren que se pague una tarifa desde el saldo del remitente).

El campo `alloc` espera pares clave-valor. Las claves de cada entrada deben ser una dirección válida. El campo `balance`
en el valor puede ser tanto un número `hexadecimal` como un número para indicar el saldo inicial de la dirección.
El valor por defecto contiene `8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` con un saldo de `50000000000000000000000000`
en él. Por defecto:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  }
```

Para especificar una asignación de génesis diferente, completa el campo `alloc` en el JSON de génesis de la siguiente manera:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    },
    "Ab5801a7D398351b8bE11C439e05C5B3259aeC9B": {
      "balance": "0xa796504b1cb5a7c0000"
    }
  },
```

Las claves en la asignación son direcciones hexadecimales
**sin el prefijo canónico `0x`**. Los saldos están denominados en Wei
([10^18 Wei = 1 Unidad Entera del Token Nativo](https://eth-converter.com/)) y se expresan como cadenas hexadecimales
**con el prefijo canónico `0x`**. Puedes usar [este convertidor](https://www.rapidtables.com/convert/number/hex-to-decimal.html)
para traducir entre números decimales y hexadecimales.

El ejemplo anterior produce las siguientes asignaciones de génesis (denominadas en unidades enteras del
token nativo, es decir, 1 AVAX/1 WAGMI):

<!-- markdownlint-disable MD013 -->

```text
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC: 100000000 (0x52B7D2DCC80CD2E4000000=100000000000000000000000000 Wei)
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B: 49463 (0xa796504b1cb5a7c0000=49463000000000000000000 Wei)
```

<!-- markdownlint-enable MD013 -->

### Estableciendo un Receptor de Tarifas Personalizado

Por defecto, todas las tarifas se queman (se envían a la dirección del agujero negro con `"allowFeeRecipients": false`).
Sin embargo, es posible habilitar que los productores de bloques establezcan un receptor de tarifas (que será compensado
por los bloques que producen).

Para habilitar esta característica, debes añadir lo siguiente a tu
archivo génesis (bajo la clave `"config"`):

```json
{
  "config": {
    "allowFeeRecipients": true
  }
}
```

#### Dirección del Receptor de Tarifas

Con `allowFeeRecipients` habilitado, tus validadores pueden especificar sus direcciones para recoger las tarifas. Ellos
necesitan actualizar su [configuración de cadena](#avalanchego-chain-configs) EVM con lo siguiente para especificar dónde
debe ser enviada la tarifa.

```json
{
  "feeRecipient": "<TU DIRECCIÓN 0x>"
}
```

:::warning

Si la característica `allowFeeRecipients` está habilitada en la Subnet, pero un validador no especifica un
"feeRecipient", las tarifas se quemarán en los bloques que produce.

:::

_Nota: este mecanismo también se puede activar como un precompilado._
_Ver la sección [Cambiando los Mecanismos de Recompensa de Tarifas](#changing-fee-reward-mechanisms) para más detalles._

## Precompilados

Subnet-EVM puede proporcionar funcionalidades personalizadas con contratos precompilados. Estos contratos precompilados
se pueden activar a través de `ChainConfig` (en el génesis o como una actualización).

### Interfaz de AllowList

La interfaz de `AllowList` se utiliza por los precompilados para comprobar si una dirección dada está permitida para usar un
contrato precompilado. `AllowList` consiste en dos roles principales, `Admin` y `Enabled`. `Admin` puede
añadir/eliminar otras direcciones `Admin` y `Enabled`. Las direcciones `Enabled` pueden usar el contrato precompilado, pero no pueden modificar otros roles.

`AllowList` añade los campos `adminAddresses` y `enabledAddresses` a las configuraciones de los contratos precompilados.
Por ejemplo, la configuración del contrato precompilado del gestor de tarifas se ve así:

```json
{
  "feeManagerConfig": {
    "blockTimestamp": 0,
    "adminAddresses": [<lista de direcciones>],
    "enabledAddresses": [<lista de direcciones>]
  }
}
```



La configuración de `AllowList` afecta solo a la precompilación relacionada. Por ejemplo, la dirección de administrador en `feeManagerConfig` no afecta a las direcciones de administrador en otras precompilaciones activadas.

La interfaz de solidez de la lista de permitidos se define de la siguiente manera y se puede encontrar en [IAllowList.sol](https://github.com/ava-labs/subnet-evm/blob/5faabfeaa021a64c2616380ed2d6ec0a96c8f96d/contract-examples/contracts/IAllowList.sol):

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAllowList {
  // Establece [addr] para tener el rol de administrador sobre la precompilación
  function setAdmin(address addr) external;

  // Establece [addr] para estar habilitado en el contrato de precompilación.
  function setEnabled(address addr) external;

  // Establece [addr] para no tener ningún rol en el contrato de precompilación.
  function setNone(address addr) external;

  // Lee el estado de [addr].
  function readAllowList(address addr) external view returns (uint256 role);
}
```

`readAllowList(addr)` devolverá un uint256 con un valor de 0, 1 o 2, correspondiente a los roles `None`, `Enabled` y `Admin` respectivamente.

_Nota: `AllowList` no es un contrato real sino solo una interfaz. No se puede llamar por sí mismo._
_Esto es utilizado por otras precompilaciones. Verifique las secciones de precompilación adicionales para ver cómo funciona esto._

### Restringir a los desplegadores de contratos inteligentes

Si desea restringir quién tiene la capacidad de desplegar contratos en su
Subnet, puede proporcionar una configuración de `AllowList` en su archivo de génesis o de actualización:

```json
{
  "contractDeployerAllowListConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

En este ejemplo, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` se nombra como el
`Admin` de la `ContractDeployerAllowList`. Esto le permite agregar otros `Admin` o agregar
direcciones `Enabled`. Tanto los `Admin` como los `Enabled` pueden desplegar contratos. Para proporcionar
una gran experiencia de usuario con contratos de fábrica, se verifica que `tx.Origin` sea un desplegador válido
en lugar del llamador de `CREATE`. Esto significa que los contratos de fábrica aún podrán crear nuevos contratos siempre que el remitente de la transacción original sea un desplegador permitido.

El contrato de precompilación `Stateful Precompile` que alimenta la `ContractDeployerAllowList` se adhiere a la
[interfaz de solidez AllowList](#interfaz-allowlist) en `0x0200000000000000000000000000000000000000`
(puede cargar esta interfaz e interactuar directamente en Remix):

- Si intenta agregar un `Enabled` y no es un `Admin`, verá algo como:
  ![admin fail](/img/admin_fail.png)

- Si intenta desplegar un contrato pero no es un `Admin` ni
  un `Enabled`, verá algo como:
  ![deploy fail](/img/deploy_fail.png)

- Si llama a `readAllowList(addr)` entonces puede leer el rol actual de `addr`, que devolverá
  un uint256 con un valor de 0, 1 o 2, correspondiente a los roles `None`, `Enabled` y `Admin` respectivamente.

:::warning

Si elimina a todos los administradores de la lista de permitidos, ya no será posible actualizar la
lista de permitidos sin modificar el Subnet-EVM para programar una actualización de red.

:::

#### Configuración inicial de la lista de permitidos de contratos

Es posible habilitar esta precompilación con una configuración inicial para activar su efecto en
la marca de tiempo de activación. Esto proporciona una forma de habilitar la precompilación sin una dirección de administrador para gestionar
la lista de desplegadores. Con esto, puede definir una lista de direcciones que tienen permitido desplegar contratos.
Dado que no habrá una dirección de administrador para gestionar la lista de desplegadores, solo se puede modificar a través de una
actualización de red. Para usar la configuración inicial, debe especificar direcciones en el campo `enabledAddresses`
en su archivo de génesis o de actualización:

```json
{
  "contractDeployerAllowListConfig": {
    "blockTimestamp": 0,
    "enabledAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

Esto permitirá que solo `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` despliegue contratos. Para obtener más
información sobre las configuraciones iniciales de precompilación, consulte [Configuraciones iniciales de precompilación](#configuraciones-iniciales-de-precompilación).

### Restringir quién puede enviar transacciones

Similar a la restricción de los desplegadores de contratos, esta precompilación restringe qué direcciones pueden enviar
transacciones en la cadena. Al igual que en la sección anterior, puede activar la precompilación incluyendo una
configuración de `AllowList` en su archivo de génesis:

```json
{
  "config": {
    "txAllowListConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

En este ejemplo, `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` se nombra como el
`Admin` de la `TransactionAllowList`. Esto les permite agregar otros `Admins` o agregar
`Allowed`. Tanto los `Admins` como los `Enabled` pueden enviar transacciones a la cadena.

El contrato de precompilación `Stateful Precompile` que alimenta la `TxAllowList` se adhiere a la
[interfaz de solidez AllowList](#interfaz-allowlist) en `0x0200000000000000000000000000000000000002`
(puede cargar esta interfaz e interactuar directamente en Remix):

- Si intenta agregar un `Enabled` y no es un `Admin`, verá algo como:
  ![admin fail](/img/admin_fail.png)

- Si intenta enviar una transacción pero no es un `Admin` o no está
  `Enabled`, verá algo como: `cannot issue transaction from non-allow listed address`

- Si llama a `readAllowList(addr)` entonces puede leer el rol actual de `addr`, que devolverá
  un `uint256` con un valor de 0, 1 o 2, correspondiente a los roles `None`, `Allowed` y `Admin` respectivamente.

:::warning

Si elimina a todos los administradores de la lista de permitidos, ya no será posible actualizar la
lista de permitidos sin modificar el Subnet-EVM para programar una actualización de red.

:::

#### Configuración inicial de la lista de permitidos de transacciones

Es posible habilitar esta precompilación con una configuración inicial para activar su efecto en
la marca de tiempo de activación. Esto proporciona una forma de habilitar la precompilación sin una dirección de administrador para gestionar
la lista de transacciones. Con esto, puede definir una lista de direcciones que tienen permitido enviar
transacciones. Dado que no habrá una dirección de administrador para gestionar la lista de transacciones, solo se puede modificar
a través de una actualización de red. Para usar la configuración inicial, debe especificar direcciones en
el campo `enabledAddresses` en su archivo de génesis o de actualización:

```json
{
  "txAllowListConfig": {
    "blockTimestamp": 0,
    "enabledAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

Esto permitirá que solo `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` envíe transacciones. Para obtener más
información sobre las configuraciones iniciales de precompilación, consulte [Configuraciones iniciales de precompilación](#configuraciones-iniciales-de-precompilación).

### Acuñando monedas nativas

Puede acuñar monedas nativas (gas) con un contrato precompilado. Para activar esta función, usted
puede proporcionar `nativeMinterConfig` en el génesis:

```json
{
  "config": {
    "contractNativeMinterConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

`adminAddresses` denota las cuentas de administrador que pueden agregar otras cuentas `Admin` o `Enabled`. Tanto `Admin` como `Enabled` son elegibles para acuñar monedas nativas para otras direcciones. El `ContractNativeMinter` utiliza los mismos métodos que en `ContractDeployerAllowList`.

El contrato de `Stateful Precompile` que alimenta al `ContractNativeMinter` cumple con la siguiente interfaz de Solidity en `0x0200000000000000000000000000000000000001` (puedes cargar esta interfaz e interactuar directamente en Remix):

```solidity
// (c) 2022-2023, Ava Labs, Inc. Todos los derechos reservados.
// Consulta el archivo LICENSE para conocer los términos de licencia.

pragma solidity ^0.8.0;
import "./IAllowList.sol";

interface INativeMinter is IAllowList {
  // Acuña [amount] número de monedas nativas y las envía a [addr]
  function mintNativeCoin(address addr, uint256 amount) external;
}
```

`mintNativeCoin` toma una dirección y una cantidad de monedas nativas que se van a acuñar. La cantidad denota la cantidad en la denominación mínima de monedas nativas (10^18). Por ejemplo, si quieres acuñar 1 moneda nativa (en AVAX), debes pasar 1 \* 10^18 como la cantidad.

Ten en cuenta que esto usa la interfaz `IAllowList` directamente, lo que significa que utiliza las mismas funciones de interfaz de `AllowList` como `readAllowList` y `setAdmin`, `setEnabled`, `setNone`. Para obtener más información, consulta [Interfaz de Solidity de AllowList](#interfaz-de-allowlist).

:::warning

La EVM no evita los desbordamientos al almacenar el saldo de la dirección. Los desbordamientos en los opcodes de saldo se manejan estableciendo el saldo en el máximo. Sin embargo, lo mismo no se aplicará a las llamadas de API. Si intentas acuñar más que el saldo máximo, las llamadas de API devolverán el saldo hexadecimal desbordado. Esto puede romper las herramientas externas. Asegúrate de que el suministro total de monedas nativas siempre sea menor que 2^256-1.

:::

#### Configuración inicial del Acuñador Nativo

Es posible habilitar este precompilado con una configuración inicial para activar su efecto en la marca de tiempo de activación. Esto proporciona una forma de habilitar el precompilado sin una dirección de administrador para acuñar monedas nativas. Con esto, puedes definir una lista de direcciones que recibirán una acuñación inicial de la moneda nativa cuando este precompilado se active. Esto puede ser útil para redes que requieren una acuñación única sin especificar ninguna dirección de administrador. Para usar la configuración inicial, debes especificar un mapa de direcciones con sus cantidades de acuñación correspondientes en el campo `initialMint` en tu archivo de génesis o actualización:

```json
{
  "contractNativeMinterConfig": {
    "blockTimestamp": 0,
    "initialMint": {
      "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": "1000000000000000000",
      "0x10037Fb06Ec4aB8c870a92AE3f00cD58e5D484b3": "0xde0b6b3a7640000"
    }
  }
}
```

En el campo de cantidad, puedes especificar una cadena decimal o hexadecimal. Esto acuñará 1000000000000000000 (equivalente a 1 Moneda Nativa denominada como 10^18) a ambas direcciones. Ten en cuenta que ambas están en formato de cadena. El hex "0xde0b6b3a7640000" es equivalente a 1000000000000000000. Para obtener más información sobre las configuraciones iniciales de los precompilados, consulta [Configuraciones Iniciales de Precompilados](#configuraciones-iniciales-de-precompilados).

### Configurando Tarifas Dinámicas

Puedes configurar los parámetros del algoritmo de tarifas dinámicas en la cadena utilizando el `FeeConfigManager`. Para activar esta función, deberás proporcionar el `FeeConfigManager` en el génesis:

```json
{
  "config": {
    "feeManagerConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

El precompilado implementa la interfaz `FeeManager` que incluye la misma interfaz `AllowList` utilizada por ContractNativeMinter, TxAllowList, etc. Para un ejemplo de la interfaz `AllowList`, consulta el [TxAllowList](#interfaz-de-allowlist) anterior.

El contrato de `Stateful Precompile` que alimenta al `FeeConfigManager` cumple con la siguiente interfaz de Solidity en `0x0200000000000000000000000000000000000003` (puedes cargar esta interfaz e interactuar directamente en Remix). También se puede encontrar en
[IFeeManager.sol](https://github.com/ava-labs/subnet-evm/blob/5faabfeaa021a64c2616380ed2d6ec0a96c8f96d/contract-examples/contracts/IFeeManager.sol):

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IAllowList.sol";

interface IFeeManager is IAllowList {
  // Establece los campos de configuración de tarifas en el almacenamiento del contrato
  function setFeeConfig(
    uint256 gasLimit,
    uint256 targetBlockRate,
    uint256 minBaseFee,
    uint256 targetGas,
    uint256 baseFeeChangeDenominator,
    uint256 minBlockGasCost,
    uint256 maxBlockGasCost,
    uint256 blockGasCostStep
  ) external;

  // Obtiene la configuración de tarifas desde el almacenamiento del contrato
  function getFeeConfig()
    external
    view
    returns (
      uint256 gasLimit,
      uint256 targetBlockRate,
      uint256 minBaseFee,
      uint256 targetGas,
      uint256 baseFeeChangeDenominator,
      uint256 minBlockGasCost,
      uint256 maxBlockGasCost,
      uint256 blockGasCostStep
    );

  // Obtiene el último número de bloque que cambió la configuración de tarifas desde el almacenamiento del contrato
  function getFeeConfigLastChangedAt()
    external
    view
    returns (uint256 blockNumber);
}
```

El FeeConfigManager precompilado utiliza la interfaz `IAllowList` directamente, lo que significa que utiliza las mismas funciones de interfaz de `AllowList` como `readAllowList` y `setAdmin`, `setEnabled`, `setNone`. Para obtener más información, consulta [Interfaz de Solidity de AllowList](#interfaz-de-allowlist).

Además de la interfaz `AllowList`, el FeeConfigManager agrega las siguientes capacidades:

- `getFeeConfig` - recupera la configuración actual de tarifas dinámicas
- `getFeeConfigLastChangedAt` - recupera la marca de tiempo del último bloque donde se actualizó la configuración de tarifas
- `setFeeConfig` - establece la configuración de tarifas dinámicas en la cadena (consulta [aquí](#configuración-de-tarifas) para obtener detalles sobre los parámetros de configuración de tarifas)

También puedes obtener la configuración de tarifas en un bloque con el método RPC `eth_feeConfig`. Para obtener más información, consulta [aquí](/reference/subnet-evm/api#eth_feeconfig).

#### Configuración Inicial de la Configuración de Tarifas

Es posible habilitar este precompilado con una configuración inicial para activar su efecto en la marca de tiempo de activación. Esto proporciona una forma de definir tu estructura de tarifas para que tenga efecto en la activación. Para usar la configuración inicial, debes especificar la configuración de tarifas en el campo `initialFeeConfig` en tu archivo de génesis o actualización:



```json
{
  "feeManagerConfig": {
    "blockTimestamp": 0,
    "initialFeeConfig": {
      "gasLimit": 20000000,
      "targetBlockRate": 2,
      "minBaseFee": 1000000000,
      "targetGas": 100000000,
      "baseFeeChangeDenominator": 48,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 10000000,
      "blockGasCostStep": 500000
    }
  }
}
```

Esto establecerá la configuración de tarifas en los valores especificados en el campo `initialFeeConfig`. Para obtener más información sobre las configuraciones iniciales de los precompilados, consulte [Configuraciones iniciales de precompilados](#initial-precompile-configurations).

### Cambiando los mecanismos de recompensa de tarifas

El mecanismo de recompensa de tarifas se puede configurar con este contrato de precompilado estatal llamado
`RewardManager`. La configuración puede incluir quemar tarifas, enviar tarifas a una dirección predefinida o
permitir que las tarifas sean recolectadas por los productores de bloques. Este precompilado se puede configurar de la siguiente manera en
el archivo génesis:

```json
{
  "config": {
    "rewardManagerConfig": {
      "blockTimestamp": 0,
      "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
    }
  }
}
```

`adminAddresses` denota las cuentas de administrador que pueden agregar otras cuentas `Admin` o `Enabled`. `Admin` y
`Enabled` son ambos elegibles para cambiar el mecanismo de tarifa actual.

El precompilado implementa la interfaz `RewardManager` que incluye la interfaz `AllowList`.
Para un ejemplo de la interfaz `AllowList`, consulte [TxAllowList](#allowlist-interface) arriba.

El contrato de precompilado `Stateful Precompile` que alimenta el `RewardManager` se adhiere a la siguiente interfaz de Solidity
en `0x0200000000000000000000000000000000000004` (puede cargar esta interfaz e interactuar
directamente en Remix). También se puede encontrar en
[IRewardManager.sol](https://github.com/ava-labs/subnet-evm/blob/5faabfeaa021a64c2616380ed2d6ec0a96c8f96d/contract-examples/contracts/IRewardManager.sol):

```solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IAllowList.sol";

interface IRewardManager is IAllowList {
  // setRewardAddress sets the reward address to the given address
  function setRewardAddress(address addr) external;

  // allowFeeRecipients allows block builders to claim fees
  function allowFeeRecipients() external;

  // disableRewards disables block rewards and starts burning fees
  function disableRewards() external;

  // currentRewardAddress returns the current reward address
  function currentRewardAddress() external view returns (address rewardAddress);

  // areFeeRecipientsAllowed returns true if fee recipients are allowed
  function areFeeRecipientsAllowed() external view returns (bool isAllowed);
}
```

El precompilado `RewardManager` utiliza la interfaz `IAllowList` directamente, lo que significa que utiliza las mismas
funciones de la interfaz `AllowList` como `readAllowList` y `setAdmin`, `setEnabled`, `setNone`. Para
más información, consulte [Interfaz de Solidity de AllowList](#allowlist-interface).

Además de la interfaz `AllowList`, el `RewardManager` agrega las siguientes capacidades:

- `setRewardAddress` - establece la dirección a la que se envían las tarifas. Esta dirección puede ser un contrato o una
  dirección de usuario. La dirección se convierte en la dirección de coinbase requerida para los bloques en los que este mecanismo
  está habilitado. Esto significa que recibirá las tarifas recolectadas de las transacciones en el bloque.
  Recibir tarifas no llamará a ninguna función de contrato ni a funciones de fallback. Simplemente aumentará
  el saldo de la dirección por la cantidad de tarifas.

- `allowFeeRecipients` - permite a los productores de bloques reclamar tarifas. Esto permitirá a los productores de bloques
  reclamar tarifas especificando sus propias direcciones en sus configuraciones de cadena. Consulte [aquí](#fee-recipient)
  para obtener más información sobre cómo especificar la dirección del receptor de tarifas en la configuración de la cadena.

- `disableRewards` - deshabilita las recompensas de bloque y comienza a quemar tarifas.

- `currentRewardAddress` - devuelve la dirección de recompensa actual. Esta es la dirección a la que se envían las tarifas. Puede incluir una dirección de agujero negro (`0x010...0`) lo que significa que las tarifas se queman. También puede
  incluir un hash predefinido (`0x0000000000000000000000000000000000000000`) que denota que se permiten receptores de tarifas personalizados. Se recomienda utilizar la función `areFeeRecipientsAllowed` para verificar si
  se permiten receptores de tarifas personalizados primero.

- `areFeeRecipientsAllowed` - devuelve true si se permiten receptores de tarifas personalizados.

Estos 3 mecanismos (quemar, enviar a una dirección predefinida y permitir que los productores de bloques recojan
tarifas) no se pueden habilitar al mismo tiempo. Habilitar un mecanismo tomará el control sobre el
mecanismo anterior. Por ejemplo, si habilita `allowFeeRecipients` y luego habilita
`disableRewards`, el `disableRewards` tomará el control y las tarifas se quemarán.

_Nota: Las direcciones de recompensa o direcciones de receptores de tarifas no necesitan ser una cuenta de administrador o habilitada._

#### Configuración inicial

Es posible habilitar este precompilado con una configuración inicial para activar su efecto en
la marca de tiempo de activación. Esto proporciona una forma de habilitar el precompilado sin una dirección de administrador para
cambiar el mecanismo de recompensa de tarifas. Esto puede ser útil para redes que requieren un cambio de mecanismo de recompensa de una sola vez sin especificar ninguna dirección de administrador. Sin esta configuración inicial, el
precompilado heredará el mecanismo `feeRecipients` activado en el génesis. Esto significa que si
`allowFeeRecipients` se establece en verdadero en el archivo génesis, el precompilado se habilitará con el
mecanismo `allowFeeRecipients`. De lo contrario, seguirá quemando tarifas. Para usar la configuración inicial,
debe especificar el mecanismo de recompensa inicial en el campo `initialRewardConfig` en
su archivo de génesis o actualización.

Para permitir receptores de tarifas personalizados, debe especificar el campo `allowFeeRecipients` en el `initialRewardConfig`:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "initialRewardConfig": {
      "allowFeeRecipients": true
    }
  }
}
```

Para establecer una dirección para recibir todas las recompensas de transacción, debe especificar la
campo `rewardAddress` en el `initialRewardConfig`:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "initialRewardConfig": {
      "rewardAddress": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
    }
  }
}
```

Para deshabilitar las recompensas y comenzar a quemar tarifas, debe dejar todos los campos en el
`initialRewardConfig` vacío:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "initialRewardConfig": {}
  }
}
```

Sin embargo, esto es diferente al comportamiento predeterminado del precompilado. Si no especifica el
campo `initialRewardConfig`, el precompilado heredará el mecanismo `feeRecipients` activado en el
génesis. Esto significa que si `allowFeeRecipients` se establece en verdadero en el archivo génesis, el precompilado
se habilitará con el mecanismo `allowFeeRecipients`. De lo contrario, seguirá quemando tarifas.
Configuración de ejemplo para este caso:

```json
{
  "rewardManagerConfig": {
    "blockTimestamp": 0,
    "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
  }
}
```

Si tanto `allowFeeRecipients` como `rewardAddress` se especifican en el campo `initialRewardConfig`,
se devolverá un error y el precompilado no se activará. Para obtener más información sobre
configuraciones iniciales de precompilados, consulte [Configuraciones iniciales de precompilados](#initial-precompile-configurations).

## Ejemplos de contratos

Subnet-EVM contiene contratos de ejemplo para precompilaciones en `/contracts`. Es un proyecto de hardhat con pruebas y tareas. Para obtener más información, consulta el archivo README de ejemplos de contratos (https://github.com/ava-labs/subnet-evm/tree/master/contracts#subnet-evm-contracts).

## Actualizaciones de red: Habilitar/Deshabilitar Precompilaciones

:::warning

Realizar una actualización de red requiere coordinar la actualización en toda la red. Una actualización de red cambia el conjunto de reglas utilizado para procesar y verificar bloques, de modo que cualquier nodo que se actualice incorrectamente o no se actualice a tiempo cuando esa actualización entre en efecto puede quedar fuera de sincronización con el resto de la red.

Cualquier error en la configuración de las actualizaciones de red o en su coordinación en los validadores puede hacer que la red se detenga y la recuperación pueda ser difícil.

:::

Además de especificar la configuración para cada una de las precompilaciones anteriores en la configuración de la cadena génesis, se pueden habilitar o deshabilitar individualmente en un momento dado como una actualización de red. Deshabilitar una precompilación deshabilita la llamada a la precompilación y destruye su almacenamiento para que pueda ser habilitada en un momento posterior con una nueva configuración si se desea.

Estas actualizaciones deben especificarse en un archivo llamado `upgrade.json` ubicado en el mismo directorio donde reside `config.json` (https://github.com/ava-labs/subnet-evm/tree/master/contracts#subnet-evm-contracts): `{chain-config-dir}/{blockchainID}/upgrade.json`. Por ejemplo, la actualización de la Subred WAGMI debe colocarse en `~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/upgrade.json`.

El contenido de `upgrade.json` debe formatearse de acuerdo con lo siguiente:

```json
{
  "precompileUpgrades": [
    {
      "[NOMBRE_PRECOMPILACIÓN]": {
        "blockTimestamp": "[MARCA_DE_TIEMPO_ACTIVACIÓN]", // marca de tiempo Unix en la que la precompilación debe activarse
        "[PARÁMETRO]": "[VALOR]" // opciones de configuración específicas de la precompilación, por ejemplo, "adminAddresses"
      }
    }
  ]
}
```

:::warning

Un `blockTimestamp` inválido en un archivo de actualización hace que la actualización falle. El valor de `blockTimestamp` debe establecerse en un valor de marca de tiempo Unix válido que esté en el _futuro_ en relación con la _cabeza de la cadena_. Si el nodo encuentra un `blockTimestamp` que está en el pasado, fallará al iniciarse.

:::

Para deshabilitar una precompilación, se debe usar el siguiente formato:

<!-- markdownlint-disable MD013 -->

```json
{
  "precompileUpgrades": [
    {
      "<nombrePrecompilación>": {
        "blockTimestamp": "[MARCA_DE_TIEMPO_DESACTIVACIÓN]", // marca de tiempo Unix en la que la precompilación debe desactivarse
        "disable": true
      }
    }
  ]
}
```

<!-- markdownlint-enable MD013 -->

Cada elemento en `precompileUpgrades` debe especificar exactamente una precompilación para habilitar o deshabilitar y las marcas de tiempo de bloque deben estar en orden creciente. Una vez que se ha activado una actualización (se ha aceptado un bloque después de la marca de tiempo especificada), siempre debe estar presente en `upgrade.json` exactamente como se configuró en el momento de la activación (de lo contrario, el nodo se negará a iniciar).

Habilitar y deshabilitar una precompilación es una actualización de red y siempre se debe hacer con precaución.

:::danger

Por seguridad, siempre debes tratar `precompileUpgrades` como de solo agregado.

Como medida de último recurso, es posible abortar o reconfigurar una actualización de precompilación que no se ha activado, ya que la cadena aún está procesando bloques utilizando el conjunto de reglas anterior.

:::

Si es necesario abortar una actualización, puedes eliminar la actualización de precompilación de `upgrade.json` desde el final de la lista de actualizaciones. Mientras la cadena de bloques no haya aceptado un bloque con una marca de tiempo posterior a la marca de tiempo de esa actualización, abortará la actualización para ese nodo.

### Ejemplo

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668950000,
        "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
      }
    },
    {
      "txAllowListConfig": {
        "blockTimestamp": 1668960000,
        "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
      }
    },
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668970000,
        "disable": true
      }
    }
  ]
}
```

Este ejemplo habilita `feeManagerConfig` en el primer bloque con marca de tiempo >= `1668950000`, habilita `txAllowListConfig` en el primer bloque con marca de tiempo >= `1668960000` y deshabilita `feeManagerConfig` en el primer bloque con marca de tiempo >= `1668970000`.

Cuando una desactivación de precompilación entra en efecto (es decir, después de que haya pasado su `blockTimestamp`), se borrará su almacenamiento. Si quieres volver a habilitarlo, deberás tratarlo como una nueva configuración.

Después de haber creado `upgrade.json` y haberlo colocado en el directorio de configuración de la cadena, debes reiniciar el nodo para que el archivo de actualización se cargue (una vez más, ¡asegúrate de no reiniciar todos los validadores de la Subred a la vez!). Al reiniciar el nodo, imprimirá la configuración de la cadena, donde puedes verificar que la actualización se haya cargado correctamente. En nuestro ejemplo:

<!-- markdownlint-disable MD013 -->

```text
INFO [08-15|15:09:36.772] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain>
github.com/ava-labs/subnet-evm/eth/backend.go:155: Initialised chain configuration
config=“{ChainID: 11111 Homestead: 0 EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0
Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Subnet EVM: 0, FeeConfig:
{\“gasLimit\“:20000000,\“targetBlockRate\“:2,\“minBaseFee\“:1000000000,\“targetGas\
“:100000000,\“baseFeeChangeDenominator\“:48,\“minBlockGasCost\“:0,\“maxBlockGasCost\
“:10000000,\“blockGasCostStep\“:500000}, AllowFeeRecipients: false, NetworkUpgrades: {\
“subnetEVMTimestamp\“:0}, PrecompileUpgrade: {}, UpgradeConfig: {\"precompileUpgrades\":[{\"feeManagerConfig\":{\"adminAddresses\":[\"0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc\"],\"enabledAddresses\":null,\"blockTimestamp\":1668950000}},{\"txAllowListConfig\":{\"adminAddresses\":[\"0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc\"],\"enabledAddresses\":null,\"blockTimestamp\":1668960000}},{\"feeManagerConfig\":{\"adminAddresses\":null,\"enabledAddresses\":null,\"blockTimestamp\":1668970000,\"disable\":true}}]}, Engine: Dummy Consensus Engine}"”
```

<!-- markdownlint-enable MD013 -->

Ten en cuenta que la entrada `precompileUpgrades` refleja correctamente los cambios. También puedes verificar los precompiles activados en un momento específico con el método RPC [`eth_getActivePrecompilesAt`](/reference/subnet-evm/api#eth_getactiveprecompilesat). El método RPC [`eth_getChainConfig`](/reference/subnet-evm/api#eth_getchainconfig) también devolverá las actualizaciones configuradas en la respuesta.

¡Eso es todo, tu Subnet está lista y las actualizaciones deseadas se activarán en el momento indicado!

### Configuraciones iniciales de precompilación

Los precompiles pueden ser gestionados por algunas direcciones privilegiadas para cambiar sus configuraciones y activar sus efectos. Por ejemplo, el precompile `feeManagerConfig` puede tener `adminAddresses` que pueden cambiar la estructura de tarifas de la red.

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668950000,
        "adminAddresses": ["0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"]
      }
    }
  ]
}
```

En este ejemplo, solo la dirección `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` tiene permitido cambiar la estructura de tarifas de la red. La dirección de administrador debe llamar al precompile para activar su efecto; es decir, necesita enviar una transacción con una nueva configuración de tarifas para realizar la actualización. Esta es una característica muy poderosa, pero también otorga una gran cantidad de poder a la dirección de administrador. Si la dirección `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` se ve comprometida, la red se ve comprometida.

Con las configuraciones iniciales, los precompiles pueden activar inmediatamente su efecto en la marca de tiempo de activación. De esta manera, las direcciones de administrador pueden omitirse de la configuración de precompilación. Por ejemplo, el precompile `feeManagerConfig` puede tener `initialFeeConfig` para configurar la configuración de tarifas en la activación:

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "blockTimestamp": 1668950000,
        "initialFeeConfig": {
          "gasLimit": 20000000,
          "targetBlockRate": 2,
          "minBaseFee": 1000000000,
          "targetGas": 100000000,
          "baseFeeChangeDenominator": 48,
          "minBlockGasCost": 0,
          "maxBlockGasCost": 10000000,
          "blockGasCostStep": 500000
        }
      }
    }
  ]
}
```

Ten en cuenta que no hay un campo `adminAddresses` en la configuración. Esto significa que no habrá direcciones de administrador para gestionar la estructura de tarifas con este precompile. El precompile simplemente actualizará la configuración de tarifas a la configuración de tarifas especificada cuando se active en el `blockTimestamp` `1668950000`.

:::note
Todavía es posible agregar `adminAddresses` o `enabledAddresses` junto con estas configuraciones iniciales. En este caso, el precompile se activará con la configuración inicial, y las direcciones de administrador/habilitadas pueden acceder al contrato precompilado normalmente.
:::

:::info

Si deseas cambiar la configuración inicial de precompilación, primero deberás desactivarla y luego activar el precompile nuevamente con la nueva configuración.

:::

Consulta cada configuración inicial de precompilación en sus secciones relevantes de `Configuración inicial` bajo [Precompiles](#precompiles).

## Configuraciones de la cadena AvalancheGo

Como se describe en [este documento](/nodes/configure/chain-config-flags.md#subnet-chain-configs), cada blockchain de Subnets puede tener su propia configuración personalizada. Si el ChainID de una Subnet es `2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, el archivo de configuración para esta cadena se encuentra en `{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`.

Para blockchains creadas por o bifurcadas de Subnet-EVM, la mayoría de las configuraciones de [C-Chain](/nodes/configure/chain-config-flags.md#c-chain-configs) son aplicables, excepto las [APIs específicas de Avalanche](/nodes/configure/chain-config-flags.md#enabling-avalanche-specific-apis).

### Regossip de prioridad

Una transacción se "regossipea" cuando el nodo no encuentra la transacción en un bloque después de `priority-regossip-frequency` (por defecto, `1m`). Por defecto, hasta 16 transacciones (máximo 1 por dirección) se regossipean a validadores por minuto.

Los operadores pueden usar "regossip de prioridad" para regossipar más agresivamente transacciones para un conjunto de direcciones importantes (como relayers de puentes). Para hacerlo, deberás actualizar tu [configuración de cadena](/nodes/configure/chain-config-flags.md#subnet-chain-configs) con lo siguiente:

```json
{
  "priority-regossip-addresses": ["<TU DIRECCIÓN 0x>"]
}
```

Por defecto, hasta 32 transacciones de direcciones prioritarias (máximo 16 por dirección) se regossipean a validadores por segundo. Puedes anular estos valores predeterminados con la siguiente configuración:

```json
{
  "priority-regossip-frequency": "1s",
  "priority-regossip-max-txs": 32,
  "priority-regossip-addresses": ["<TU DIRECCIÓN 0x>"],
  "priority-regossip-txs-per-address": 16
}
```

### Receptor de tarifas

Esto funciona junto con [`allowFeeRecipients`](#setting-a-custom-fee-recipient) y el precompile de [RewardManager](#changing-fee-reward-mechanisms) para especificar a dónde se deben enviar las tarifas.

Con `allowFeeRecipients` habilitado, los validadores pueden especificar sus direcciones para recolectar tarifas.

```json
{
  "feeRecipient": "<TU DIRECCIÓN 0x>"
}
```

:::warning

Si `allowFeeRecipients` o el precompile de `RewardManager` está habilitado en la Subnet, pero un validador no especifica un "feeRecipient", las tarifas se quemarán en los bloques que produce.

:::

## Actualizaciones de red: Actualizaciones de estado

Subnet-EVM permite a los operadores de red especificar una modificación de estado que tendrá lugar al comienzo del primer bloque con una marca de tiempo mayor o igual a la especificada en la configuración.

Esto proporciona un camino de último recurso para actualizar contratos no actualizables a través de una actualización de red (por ejemplo, para solucionar problemas cuando estás ejecutando tu propia blockchain).

:::warning

Esto solo debe usarse como una alternativa de último recurso a bifurcar `subnet-evm` y especificar la actualización de red en el código.

Usar una actualización de red para modificar el estado no es parte de las operaciones normales de la EVM. Debes asegurarte de que las modificaciones no invaliden ninguna de las suposiciones de los contratos desplegados o causen incompatibilidades con la infraestructura aguas abajo, como los exploradores de bloques.

:::

Las marcas de tiempo para las actualizaciones en `stateUpgrades` deben estar en orden creciente. `stateUpgrades` se puede especificar junto con `precompileUpgrades` o por sí solo.

Se admiten las siguientes tres modificaciones de estado:

- `balanceChange`: agrega una cantidad especificada al saldo de una cuenta dada. Esta cantidad puede ser especificada en hexadecimal o decimal y debe ser positiva.
- `storage`: modifica las ranuras de almacenamiento especificadas a los valores especificados. Las claves y valores deben ser de 32 bytes especificados en hexadecimal, con el prefijo `0x`.
- `code`: modifica el código almacenado en la cuenta especificada. El código debe ser _solo_ la parte en tiempo de ejecución de un código. El código debe comenzar con el prefijo `0x`.

:::warning

Si se modifica el código, _solo_ se debe proporcionar la parte en tiempo de ejecución del bytecode en `upgrades.json`. No utilices el bytecode que se usaría para desplegar un nuevo contrato, ya que esto incluye el código del constructor también. Consulta la documentación de tu compilador para obtener información sobre cómo encontrar la parte en tiempo de ejecución del contrato que deseas modificar.

:::

El archivo `upgrades.json` que se muestra a continuación describe una actualización de red que realizará las siguientes modificaciones de estado en el primer bloque después (o en) `8 de marzo de 2023 1:30:00 AM GMT`:

- Establece el código para la cuenta en `0x71562b71999873DB5b286dF957af199Ec94617F7`,
- Y agrega `100` wei al saldo de la cuenta en `0xb794f5ea0ba39494ce839613fffba74279579268`,
- Establece la ranura de almacenamiento `0x1234` en el valor `0x6666` para la cuenta en `0xb794f5ea0ba39494ce839613fffba74279579268`.

```json
{
  "stateUpgrades": [
    {
      "blockTimestamp": 1678239000,
      "accounts": {
        "0x71562b71999873DB5b286dF957af199Ec94617F7": {
          "code": "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80632e64cec114602d575b600080fd5b60336047565b604051603e91906067565b60405180910390f35b60008054905090565b6000819050919050565b6061816050565b82525050565b6000602082019050607a6000830184605a565b9291505056fea26469706673582212209421042a1fdabcfa2486fb80942da62c28e61fc8362a3f348c4a96a92bccc63c64736f6c63430008120033"
        },
        "0xb794f5ea0ba39494ce839613fffba74279579268": {
          "balanceChange": "0x64",
          "storage": {
            "0x0000000000000000000000000000000000000000000000000000000000001234": "0x0000000000000000000000000000000000000000000000000000000000006666"
          }
        }
      }
    }
  ]
}
```