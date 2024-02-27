---
etiquetas: [Construir, Subredes]
descripción: La Subred WAGMI ("Todos vamos a lograrlo") es un banco de pruebas de alto rendimiento para optimizaciones de la Máquina Virtual EVM (Ethereum). Está parametrizada para funcionar con una capacidad mayor que la C-Chain Fuji/Mainnet y se utiliza para experimentar con candidatos a versiones antes de incluirlos en una versión oficial de Coreth.
sidebar_label: "Estudio de caso: Subred WAGMI"
pagination_label: "Subred WAGMI"
sidebar_position: 1
---

# Subred WAGMI

La Subred WAGMI ("Todos vamos a lograrlo") es un banco de pruebas de alto rendimiento para optimizaciones de la Máquina Virtual EVM (Ethereum). Está parametrizada para funcionar con una capacidad mayor que la C-Chain Fuji/Mainnet y se utiliza para experimentar con candidatos a versiones antes de incluirlos en una versión oficial de Coreth.

## Resumen

Este es uno de los primeros casos de uso de las Subredes Avalanche como terreno de prueba para cambios en una VM de producción (Coreth). Muchos subestiman lo útil que es el aislamiento de las Subredes para realizar pruebas de VM complejas en una red viva (sin afectar la estabilidad de la red primaria).

Creamos un explorador básico de WAGMI [https://subnets-test.avax.network/wagmi](https://subnets-test.avax.network/wagmi) que muestra estadísticas de uso agregadas sobre la Subred.

- ID de Subred: [28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY](https://explorer-xp.avax-test.network/subnet/28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY?tab=validators)
- ID de Cadena: [2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt](https://testnet.avascan.info/blockchain/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt)

### Parámetros de la Red

- ID de Red: 11111
- ID de Cadena: 11111
- Límite de Gas de Bloque: 20,000,000 (2.5 veces la C-Chain)
- Objetivo de Gas de 10s: 100,000,000 (~6.67 veces la C-Chain)
- Tarifa Mínima: 1 Gwei (4% de la C-Chain)
- Tasa de Bloques Objetivo: 2s (igual que la C-Chain)

El archivo génesis de WAGMI se puede encontrar [aquí](https://github.com/ava-labs/public-chain-assets/blob/1951594346dcc91682bdd8929bcf8c1bf6a04c33/chains/11111/genesis.json).

### Agregar WAGMI a Core

```text
- Nombre de Red: WAGMI
- URL RPC: [https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc]
- URL WS: wss://subnets.avax.network/wagmi/wagmi-chain-testnet/ws
- ID de Cadena: 11111
- Símbolo: WGM
- Explorador: [https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer]
```

:::info

Esto también se puede usar con otras billeteras, como MetaMask.

:::

## Estudio de caso: Actualizaciones de WAGMI

Este estudio de caso utiliza la actualización de la Subred [WAGMI](https://subnets-test.avax.network/wagmi) para mostrar cómo se puede hacer una actualización de red en una Subred basada en EVM (Máquina Virtual Ethereum) de manera sencilla, y cómo la actualización resultante se puede utilizar para controlar dinámicamente la estructura de tarifas en la Subred.

### Introducción

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) tiene como objetivo proporcionar una caja de herramientas fácil de usar para personalizar la EVM para tu blockchain. Está diseñado para funcionar de inmediato para muchas Subredes sin necesidad de ninguna modificación. Pero, ¿qué sucede cuando quieres agregar una nueva característica actualizando las reglas de tu EVM?

En lugar de codificar en duro el momento de las actualizaciones de red en el código del cliente como la mayoría de las cadenas EVM, que requieren implementaciones coordinadas de nuevo código, [Subnet-EVM
v0.2.8](https://github.com/ava-labs/subnet-evm/releases/tag/v0.2.8) introduce la esperada
característica de realizar actualizaciones de red utilizando solo unas pocas líneas de JSON en un archivo de configuración.

### Actualizaciones de Red: Habilitar/Deshabilitar Precompilaciones

Una descripción detallada de cómo hacer esto se puede encontrar en el tutorial [Personalizar una Subred](/build/subnet/upgrade/customize-a-subnet.md#network-upgrades-enabledisable-precompiles). Aquí tienes un resumen:

- La actualización de red utiliza precompilaciones existentes en Subnet-EVM:
  - ContractDeployerAllowList, para restringir los desplegadores de contratos inteligentes
  - TransactionAllowList, para restringir quién puede enviar transacciones
  - NativeMinter, para acuñar monedas nativas
  - FeeManager, para configurar tarifas dinámicas
  - RewardManager, para habilitar recompensas de bloque
- Cada una de estas precompilaciones se puede habilitar o deshabilitar individualmente en un momento dado como una actualización de red, o cualquiera de los parámetros que rigen su comportamiento se puede cambiar.
- Estas actualizaciones deben especificarse en un archivo llamado `upgrade.json` ubicado en el mismo directorio donde se encuentra el archivo [`config.json`](/build/subnet/upgrade/customize-a-subnet.md#avalanchego-chain-configs) de la cadena: `{chain-config-dir}/{blockchainID}/upgrade.json`.

### Preparación

Para prepararnos para la primera actualización de red de WAGMI, el 15 de agosto de 2022, lo anunciamos en
[Twitter](https://twitter.com/AaronBuchwald/status/1559249414102720512) y lo compartimos en otras redes sociales como Discord.

Para la segunda actualización, el 24 de febrero de 2024, hicimos otro anuncio en [X](https://x.com/jceyonur/status/1760777031858745701?s=20).

### Desplegando upgrade.json

El contenido de `upgrade.json` es:

```json
{
  "precompileUpgrades": [
    {
      "feeManagerConfig": {
        "adminAddresses": ["0x6f0f6DA1852857d7789f68a28bba866671f3880D"],
        "blockTimestamp": 1660658400
      }
    },
    {
      "contractNativeMinterConfig": {
        "blockTimestamp": 1708696800,
        "adminAddresses": ["0x6f0f6DA1852857d7789f68a28bba866671f3880D"],
        "managerAddresses": ["0xadFA2910DC148674910c07d18DF966A28CD21331"]
      }
    }
  ]
}
```

Con el `upgrade.json` anterior, pretendemos realizar dos actualizaciones de red:

1. La primera actualización es activar la precompilación de FeeManager:
   - `0x6f0f6DA1852857d7789f68a28bba866671f3880D` es nombrado como el nuevo Admin de la precompilación de FeeManager.
   - `1660658400` es el [timestamp Unix](https://www.unixtimestamp.com/) para el mar. 16 ago. 2022 14:00:00 GMT+0000
     (hora futura en la que hicimos el anuncio) cuando el cambio de FeeManager entraría en efecto.
2. La segunda actualización es activar la precompilación de NativeMinter:
   - `0x6f0f6DA1852857d7789f68a28bba866671f3880D` es nombrado como el nuevo Admin de la precompilación de NativeMinter.
   - `0xadFA2910DC148674910c07d18DF966A28CD21331` es nombrado como el nuevo Manager de la precompilación de NativeMinter. Las direcciones de Manager están habilitadas después de las actualizaciones de Durango que ocurrieron el 13 de feb. 2024.
   - `1708696800` es el [timestamp Unix](https://www.unixtimestamp.com/) para el vie. 23 feb. 2024 14:00:00 GMT+0000
     (hora futura en la que hicimos el anuncio) cuando el cambio de NativeMinter entraría en efecto.

Las explicaciones detalladas de feeManagerConfig se pueden encontrar [aquí](/build/subnet/upgrade/customize-a-subnet.md#configuring-dynamic-fees), y para contractNativeMinterConfig en [aquí](/build/subnet/upgrade/customize-a-subnet.md#minting-native-coins).

Colocamos el archivo `upgrade.json` en el directorio de configuración de la cadena, que en nuestro caso es
`~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/`. Después de eso,
reiniciamos el nodo para que se cargue el archivo de actualización.

Cuando el nodo se reinicia, AvalancheGo lee el contenido del archivo JSON y lo pasa a
Subnet-EVM. Vemos un registro de la configuración de la cadena que incluye la actualización de precompilación. Se
ve así:

```text
INFO [02-22|18:27:06.473] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain> github.com/ava-labs/subnet-evm/core/blockchain.go:335: Upgrade Config: {"precompileUpgrades":[{"feeManagerConfig":{"adminAddresses":["0x6f0f6da1852857d7789f68a28bba866671f3880d"],"blockTimestamp":1660658400}},{"contractNativeMinterConfig":{"adminAddresses":["0x6f0f6da1852857d7789f68a28bba866671f3880d"],"managerAddresses":["0xadfa2910dc148674910c07d18df966a28cd21331"],"blockTimestamp":1708696800}}]}
```

Observamos que `precompileUpgrades` muestra correctamente las próximas actualizaciones de precompilación. La actualización está bloqueada
y lista.

### Activaciones

Cuando pasó el tiempo de las 10:00 AM EDT del 16 de agosto de 2022 (timestamp Unix 1660658400), el `upgrade.json` había
sido ejecutado según lo planeado y la nueva dirección de administrador de FeeManager ha sido activada. A partir de ahora,
no necesitamos emitir ningún código nuevo o desplegar nada en los nodos WAGMI para cambiar la estructura de tarifas.
¡Veamos cómo funciona en la práctica!

Para la segunda actualización el 23 de febrero de 2024, se siguió el mismo proceso. El `upgrade.json` había sido
ejecutado después de Durango, según lo planeado, y las nuevas direcciones de administrador y manager de NativeMinter han sido activadas.

### Usando Fee Manager

El propietario `0x6f0f6DA1852857d7789f68a28bba866671f3880D` ahora puede configurar las tarifas en la Subnet como
consideren adecuado. Para hacer eso, todo lo que se necesita es acceso a la red, la clave privada de la dirección de manager recién establecida y realizar llamadas al contrato precompilado.

Usaremos [Remix](https://remix.ethereum.org) IDE de Solidity en línea y la [Extensión del Navegador Core](https://support.avax.network/en/articles/6066879-core-extension-how-do-i-add-the-core-extension).
Core viene con la red WAGMI incorporada. MetaMask también servirá, pero deberá [agregar WAGMI](/build/subnet/info/wagmi.md#adding-wagmi-to-core) usted mismo.

Primero, usando Core, abrimos la cuenta como propietario `0x6f0f6DA1852857d7789f68a28bba866671f3880D`.

Luego conectamos Core a WAGMI, activamos el `Modo Testnet` en la página `Avanzado` en el menú de hamburguesa:

![Modo Testnet de Core](/img/network-upgrade/core-testnet-mode.png)

Y luego abrimos el menú `Manage Networks` en el menú desplegable de redes. Seleccionamos WAGMI allí haciendo clic
en el icono de estrella:

![Selección de red de Core](/img/network-upgrade/core-network-select.png)

Luego cambiamos a WAGMI en el menú desplegable de redes. Estamos listos para pasar a Remix ahora, así que lo abrimos
en el navegador. Primero, verificamos que Remix ve la extensión y se comunica correctamente con ella. Seleccionamos el icono `Deploy & run transactions` en el borde izquierdo, y en el menú desplegable de Entorno, seleccionamos `Injected Provider`. Necesitamos aprobar el acceso de Remix a la red en la extensión del navegador Core. Cuando eso esté hecho, se muestra `Custom (11111) network`:

![Proveedor inyectado](/img/network-upgrade/remix-injected-provider.png)

Bien, estamos hablando con la Subnet WAGMI. A continuación, necesitamos cargar los contratos en Remix. Usando la opción 'load from
GitHub' desde la pantalla de inicio de Remix cargamos dos contratos:

- [IAllowList.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/IAllowList.sol)
- y
  [IFeeManager.sol](https://github.com/ava-labs/subnet-evm/blob/master/contract/contracts/interfaces/IFeeManager.sol).

IFeeManager es nuestra precompilación, pero hace referencia a IAllowList, así que también necesitamos ese. Compilamos IFeeManager.sol y usamos el contrato desplegado en la dirección de precompilación
`0x0200000000000000000000000000000000000003` utilizada en la
[Subnet](https://github.com/ava-labs/subnet-evm/blob/master/precompile/contracts/feemanager/module.go#L21).

![Contrato desplegado](/img/network-upgrade/deployed-contract.png)

Ahora podemos interactuar con la precompilación de FeeManager desde Remix a través de Core. Por ejemplo, podemos
usar el método `getFeeConfig` para verificar la configuración actual de tarifas. Esta acción puede ser realizada
por cualquier persona, ya que es solo una operación de lectura.

Una vez que tengamos la nueva configuración deseada para las tarifas en la Subnet, podemos usar `setFeeConfig`
para cambiar los parámetros. Esta acción **solo** puede ser realizada por el propietario
`0x6f0f6DA1852857d7789f68a28bba866671f3880D` como la dirección `adminAddress` especificada en el [`upgrade.json` arriba](#deploying-upgradejson).

![setFeeConfig](/img/network-upgrade/setFeeConfig.png)

Cuando llamamos a ese método presionando el botón `transact`, se publica una nueva transacción en la
Subnet, y podemos verla en [el
explorador](https://subnets-test.avax.network/wagmi/block/0xad95ccf04f6a8e018ece7912939860553363cc23151a0a31ea429ba6e60ad5a3):

![transacción](/img/network-upgrade/wagmi-tx.png)

Inmediatamente después de que se acepte la transacción, la nueva configuración de tarifas entra en vigor. Podemos verificar con `getFeeConfig` que los valores se reflejen en la configuración de tarifas activa (una vez más, esta acción puede ser realizada por cualquier persona):

![getFeeConfig](/img/network-upgrade/getFeeConfig.png)

¡Eso es todo, las tarifas han cambiado! Sin actualizaciones de red, sin implementaciones complejas y arriesgadas, solo haciendo una simple llamada de contrato y la nueva configuración de tarifas está en su lugar.

### Usando NativeMinter

Para el NativeMinter, podemos usar el mismo proceso para conectarnos a la Subnet e interactuar con el precompilado. Podemos cargar la interfaz INativeMinter usando la opción 'load from GitHub' desde la pantalla de inicio de Remix con los siguientes contratos:

- [IAllowList.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/IAllowList.sol)
- y
  [INativeMinter.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/INativeMinter.sol).

Podemos compilarlos e interactuar con el contrato desplegado en la dirección de precompilado
`0x0200000000000000000000000000000000000001` utilizada en la
[Subnet](https://github.com/ava-labs/subnet-evm/blob/master/precompile/contracts/nativeminter/module.go#L22).

![Contrato desplegado](/img/network-upgrade/deploy-minter.png)

El precompilado del minter nativo se utiliza para acuñar monedas nativas a direcciones especificadas. Las monedas acuñadas se agregan a la oferta actual y pueden ser utilizadas por el receptor para pagar las tarifas de gas.
Para obtener más información sobre el precompilado del minter nativo, consulte [aquí](/build/subnet/upgrade/customize-a-subnet.md#minting-native-coins).

El método `mintNativeCoin` solo puede ser llamado por direcciones habilitadas, de administrador y de gerente. Para esta actualización, hemos agregado tanto una dirección de administrador como una de gerente en [`upgrade.json` arriba](#deploying-upgradejson). La dirección del gerente estuvo disponible después de las actualizaciones de Durango que ocurrieron el 13 de febrero de 2024. Usaremos la dirección del gerente `0xadfa2910dc148674910c07d18df966a28cd21331` para acuñar monedas nativas.

![mintNativeCoin](/img/network-upgrade/mintNativeCoin.png)

Cuando llamamos a ese método presionando el botón `transact`, se publica una nueva transacción en la Subnet, y podemos verla en [el
explorador](https://subnets-test.avax.network/wagmi/tx/0xc4aaba7b5863c1b8f6664ac1d483e2d7d392ab58d1a8feb0b6c318cbae7f1e93):

![tx](/img/network-upgrade/mint-tx-result.png)

Como resultado de esta transacción, el precompilado del minter nativo acuñó una nueva moneda nativa (1 WGM) a la dirección del receptor `0xB78cbAa319ffBD899951AA30D4320f5818938310`. La página de la dirección en el explorador [aquí](https://subnets-test.avax.network/wagmi/address/0xB78cbAa319ffBD899951AA30D4320f5818938310) no muestra ninguna transacción entrante; esto se debe a que el 1 WGM fue acuñado directamente por la EVM misma, sin ningún remitente.

### Conclusión

Las actualizaciones de red pueden ser procedimientos complejos y peligrosos de llevar a cabo de manera segura. Nuestros continuos esfuerzos con Subnets son hacer que las actualizaciones sean lo más sencillas y simples posible. Con la poderosa combinación de precompilados estatales y actualizaciones de red a través de archivos de configuración de actualización, hemos logrado simplificar en gran medida tanto las actualizaciones de red como los cambios de parámetros de red. Esto, a su vez, permite una experimentación mucho más segura y muchos nuevos casos de uso que eran demasiado arriesgados y complejos de llevar a cabo con los esfuerzos de alta coordinación requeridos con los mecanismos tradicionales de actualización de red.

Esperamos que este estudio de caso ayude a inspirar ideas para nuevas cosas que puedas probar por ti mismo. ¡Estamos ansiosos por ver qué has construido y cómo las actualizaciones fáciles te ayudan a gestionar tus Subnets! Si tienes alguna pregunta o problema, no dudes en contactarnos en nuestro [Discord](https://chat.avalabs.org). ¡O simplemente acércate para contarnos qué cosas emocionantes has construido!