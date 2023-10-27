---
tags: [Construir, Subnets]
description: La Subnet WAGMI ("Todos vamos a lograrlo") es un banco de pruebas de alto rendimiento para optimizaciones de la Máquina Virtual Ethereum (EVM). Está parametrizada para funcionar con una capacidad mayor que la C-Chain Fuji/Mainnet y se utiliza para experimentar con candidatos a versiones antes de incluirlos en una versión oficial de Coreth.
sidebar_label: "Estudio de caso: Subnet WAGMI"
pagination_label: "Subnet WAGMI"
sidebar_position: 1
---

# Subnet WAGMI

La Subnet WAGMI ("Todos vamos a lograrlo") es un banco de pruebas de alto rendimiento para optimizaciones de la Máquina Virtual Ethereum (EVM). Está parametrizada para funcionar con una capacidad mayor que la C-Chain Fuji/Mainnet y se utiliza para experimentar con candidatos a versiones antes de incluirlos en una versión oficial de Coreth.

## Resumen

Este es uno de los primeros casos de uso de las Subnets Avalanche como terreno de prueba para cambios en una VM de producción (Coreth). Muchos subestiman lo útil que es el aislamiento de las Subnets para realizar pruebas de VM complejas en una red viva (sin afectar la estabilidad de la red primaria).

Creamos un explorador básico de WAGMI [https://subnets-test.avax.network/wagmi](https://subnets-test.avax.network/wagmi) que muestra estadísticas de uso agregadas sobre la Subnet.

- ID de Subnet: [28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY](https://explorer-xp.avax-test.network/subnet/28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY?tab=validators)
- ID de Cadena: [2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt](https://testnet.avascan.info/blockchain/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt)

### Parámetros de la Red

- ID de Red: 11111
- ID de Cadena: 11111
- Límite de Gas de Bloque: 20,000,000 (2.5 veces la C-Chain)
- Objetivo de Gas de 10s: 100,000,000 (~6.67 veces la C-Chain)
- Tarifa Mínima: 1 Gwei (4% de la C-Chain)
- Tasa de Bloques Objetivo: 2s (igual que la C-Chain)

El archivo génesis de WAGMI se puede encontrar [aquí](https://github.com/ava-labs/public-chain-assets/blob/1951594346dcc91682bdd8929bcf8c1bf6a04c33/chains/11111/genesis.json).

### Agregando WAGMI a Core

```text
- Nombre de Red: WAGMI
- URL RPC: <https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc>
- URL WS: wss://subnets.avax.network/wagmi/wagmi-chain-testnet/ws
- ID de Cadena: 11111
- Símbolo: WGM
- Explorador: <https://subnets.avax.network/wagmi/wagmi-chain-testnet/explorer>
```

:::info

Esto también se puede usar con otras billeteras, como MetaMask.

:::

## Estudio de caso: Actualización de WAGMI

Este estudio de caso utiliza la actualización de la Subnet [WAGMI](https://subnets-test.avax.network/wagmi) para mostrar cómo se puede hacer una actualización de red en una Subnet basada en EVM (Máquina Virtual Ethereum) de manera sencilla, y cómo la actualización resultante se puede utilizar para controlar dinámicamente la estructura de tarifas en la Subnet.

### Introducción

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) tiene como objetivo proporcionar una caja de herramientas fácil de usar para personalizar la EVM para tu blockchain. Está diseñado para funcionar sin problemas para muchas Subnets sin necesidad de ninguna modificación. Pero, ¿qué sucede cuando quieres agregar una nueva característica actualizando las reglas de tu EVM?

En lugar de codificar en duro el momento de las actualizaciones de red en el código del cliente como la mayoría de las cadenas EVM, que requieren implementaciones coordinadas de nuevo código, [Subnet-EVM v0.2.8](https://github.com/ava-labs/subnet-evm/releases/tag/v0.2.8) introduce la esperada característica de realizar actualizaciones de red utilizando solo unas pocas líneas de JSON en un archivo de configuración.

### Actualizaciones de Red: Habilitar/Deshabilitar Precompilaciones

Una descripción detallada de cómo hacer esto se puede encontrar en el tutorial [Personalizar una Subnet](/build/subnet/upgrade/customize-a-subnet.md#network-upgrades-enabledisable-precompiles). Aquí tienes un resumen:

- La actualización de red utiliza precompilaciones existentes en Subnet-EVM:
  - ContractDeployerAllowList, para restringir a los desplegadores de contratos inteligentes
  - TransactionAllowList, para restringir quién puede enviar transacciones
  - NativeMinter, para acuñar monedas nativas
  - FeeManager, para configurar tarifas dinámicas
- Cada una de estas precompilaciones se puede habilitar o deshabilitar individualmente en un momento dado como una actualización de red, o cualquiera de los parámetros que rigen su comportamiento se puede cambiar.
- Estas actualizaciones deben especificarse en un archivo llamado `upgrade.json` ubicado en el mismo directorio donde se encuentra el archivo [`config.json`](/build/subnet/upgrade/customize-a-subnet.md#avalanchego-chain-configs) de la cadena: `{directorio-de-configuración-de-cadena}/{ID-de-blockchain}/upgrade.json`.

### Preparación

Para preparar la actualización de red de WAGMI, el 15 de agosto de 2022, anunciamos en
[Twitter](https://twitter.com/AaronBuchwald/status/1559249414102720512) y compartimos en otras redes sociales como Discord, la siguiente información:

> Con Subnet-EVM v0.2.8 es hora de una nueva temporada de Subnet: Edición de Actualización de Red.
>
> Como en todo gran programa, estamos comenzando esta temporada con un episodio piloto: Actualización de Red WAGMI.
>
> Manténganse atentos porque este piloto es literalmente imperdible para cada nodo WAGMI 😉
>
> La actualización activará el administrador de configuración de tarifas y permitirá actualizaciones de configuración de tarifas suaves en el futuro <https://docs.avax.network/subnets/customize-a-subnet#configuring-dynamic-fees>
>
> Esta actualización cambia cómo se procesan los bloques en WAGMI, por lo que cada nodo WAGMI necesita actualizarse para seguir validando WAGMI correctamente.
>
> Para actualizar tu nodo, debes actualizar a Subnet-EVM v0.2.8 y seguir las instrucciones para habilitar una precompilación estatal en Subnet-EVM aquí:
> <https://docs.avax.network/subnets/customize-a-subnet#network-upgrades-enabledisable-precompiles>
>
> Puedes encontrar el JSON para configurar la actualización de red en este gist:
> <https://gist.github.com/aaronbuchwald/b3af9da34678f542ce31717e7963085b>
>
> TLDR; necesitarás colocar el archivo JSON en el directorio de archivos de tu nodo dentro de
> `directorio-de-configuración-de-cadena/wagmi ID-de-blockchain/upgrade.json` y reiniciar tu nodo.
>
> Nota: el ID de blockchain de WAGMI es 2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt.

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
    }
  ]
}
```

Una explicación detallada de feeManagerConfig se puede encontrar en la documentación de las precompilaciones (/build/subnet/upgrade/customize-a-subnet.md#configuring-dynamic-fees).

Con el archivo `upgrade.json` anterior, pretendemos cambiar las `adminAddresses` en el momento de tiempo `1660658400`:

- `0x6f0f6DA1852857d7789f68a28bba866671f3880D` está nombrado como el nuevo administrador del FeeManager.
- `1660658400` es el [timestamp Unix](https://www.unixtimestamp.com/) para las 10:00 AM EDT del 16 de agosto de 2022
  (hora futura en la que hicimos el anuncio) cuando el cambio del nuevo FeeManager entraría en efecto.

Colocamos el archivo `upgrade.json` en el directorio de configuración de la cadena, que en nuestro caso es
`~/.avalanchego/configs/chains/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/`. Después de eso,
reiniciamos el nodo para que se cargue el archivo de actualización.

Cuando el nodo se reinicia, AvalancheGo lee el contenido del archivo JSON y lo pasa a
Subnet-EVM. Vemos un registro de la configuración de la cadena que incluye la actualización de precompilación. Se
ve así:

```text
INFO [08-15|15:09:36.772] <2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt Chain>
github.com/ava-labs/subnet-evm/eth/backend.go:155: Configuración de cadena inicializada
config=“{ChainID: 11111 Homestead: 0 EIP150: 0 EIP155: 0 EIP158: 0 Byzantium: 0
Constantinople: 0 Petersburg: 0 Istanbul: 0, Muir Glacier: 0, Subnet-EVM: 0, FeeConfig:
{\“gasLimit\“:20000000,\“targetBlockRate\“:2,\“minBaseFee\“:1000000000,\“targetGas\
“:100000000,\“baseFeeChangeDenominator\“:48,\“minBlockGasCost\“:0,\“maxBlockGasCost\
“:10000000,\“blockGasCostStep\“:500000}, AllowFeeRecipients: false, NetworkUpgrades: {\
“subnetEVMTimestamp\“:0}, PrecompileUpgrade: {}, UpgradeConfig: {\“precompileUpgrades\“:
[{\“feeManagerConfig\“:{\“adminAddresses\“:[\
“0x6f0f6da1852857d7789f68a28bba866671f3880d\“],\“blockTimestamp\“:1660658400}}]},
Engine: Dummy Consensus Engine}”
```

Observamos que `precompileUpgrades` muestra correctamente la próxima actualización de precompilación. La actualización está bloqueada
y lista para usar.

### Activación

Cuando pasó el tiempo de las 10:00 AM EDT del 16 de agosto de 2022 (timestamp Unix 1660658400), el `upgrade.json` había
sido ejecutado según lo planeado y la nueva dirección de administrador del FeeManager ha sido activada. A partir de ahora,
no necesitamos emitir ningún código nuevo o desplegar nada en los nodos WAGMI para cambiar la estructura de tarifas.
¡Veamos cómo funciona en la práctica!

### Uso del Fee Manager

El propietario `0x6f0f6DA1852857d7789f68a28bba866671f3880D` ahora puede configurar las tarifas en la Subnet como
consideren adecuado. Para hacer eso, todo lo que se necesita es acceso a la red, la clave privada de la dirección de administrador recién
establecida y realizar llamadas al contrato precompilado.

Usaremos [Remix](https://remix.ethereum.org) un IDE de Solidity en línea y la [Extensión del Navegador Core](https://support.avax.network/en/articles/6066879-core-extension-how-do-i-add-the-core-extension).
Core viene con la red WAGMI incorporada. MetaMask también servirá, pero deberá [agregar WAGMI](/build/subnet/info/wagmi.md#adding-wagmi-to-metamask) usted mismo.

Primero, usando Core, abrimos la cuenta como propietario `0x6f0f6DA1852857d7789f68a28bba866671f3880D`.

Luego conectamos Core a WAGMI, activamos el `Modo Testnet` en la página `Avanzado` en el menú de hamburguesa:

![Modo Testnet de Core](/img/network-upgrade/core-testnet-mode.png)

Y luego abrimos el menú `Manage Networks` en el menú desplegable de redes. Seleccionamos WAGMI allí haciendo clic
en el icono de estrella:

![Selección de red de Core](/img/network-upgrade/core-network-select.png)

Luego cambiamos a WAGMI en el menú desplegable de redes. Estamos listos para pasar a Remix ahora, así que lo abrimos
en el navegador. Primero, verificamos que Remix vea la extensión y hable correctamente con ella. Seleccionamos el icono `Deploy & run transactions` en el borde izquierdo, y en el menú desplegable de Entorno, seleccionamos `Injected Provider`. Necesitamos aprobar el acceso de la red Remix en la extensión del navegador Core. Cuando eso esté hecho, se muestra `Custom (11111) network`:

![Proveedor inyectado](/img/network-upgrade/remix-injected-provider.png)

¡Bien, estamos hablando con la Subnet WAGMI! A continuación, necesitamos cargar los contratos en Remix. Usando la opción 'load from
GitHub' desde la pantalla de inicio de Remix, cargamos dos contratos:

- [IAllowList.sol](https://github.com/ava-labs/subnet-evm/blob/master/contracts/contracts/interfaces/IAllowList.sol)
- y
  [IFeeManager.sol](https://github.com/ava-labs/subnet-evm/blob/master/contract/contracts/interfaces/IFeeManager.sol).

IFeeManager es nuestro precompilado, pero hace referencia a IAllowList, así que también necesitamos ese. Compilamos IFeeManager.sol y lo desplegamos en la dirección de precompilación
`0x0200000000000000000000000000000000000003` utilizada en la
[Subnet](https://github.com/ava-labs/subnet-evm/blob/master/precompile/params.go#L33).

![Contrato desplegado](/img/network-upgrade/deployed-contract.png)

Ahora podemos interactuar con el precompilado FeeManager desde Remix a través de Core. Por ejemplo, podemos
usar el método `getFeeConfig` para verificar la configuración de tarifas actual. Cualquiera puede realizar esta acción, ya que es solo una operación de lectura.

Una vez que tengamos la nueva configuración deseada para las tarifas en la Subnet, podemos usar `setFeeConfig`
para cambiar los parámetros. ¡Esta acción **solo** puede ser realizada por el propietario
`0x6f0f6DA1852857d7789f68a28bba866671f3880D` como la `adminAddress` especificada en el [`upgrade.json` anterior](#desplegando-upgradejson).

![setFeeConfig](/img/network-upgrade/setFeeConfig.png)

Cuando llamamos a ese método presionando el botón `transact`, se publica una nueva transacción en la Subnet, y podemos verla en [el
explorador](https://subnets-test.avax.network/wagmi/block/0xad95ccf04f6a8e018ece7912939860553363cc23151a0a31ea429ba6e60ad5a3):

![transacción](/img/network-upgrade/wagmi-tx.png)

Inmediatamente después de que se acepta la transacción, la nueva configuración de tarifas entra en efecto. Podemos verificar con
`getFeeCofig` que los valores se reflejan en la configuración de tarifas activa (una vez más, esta acción puede ser
realizada por cualquier persona):

![getFeeConfig](/img/network-upgrade/getFeeConfig.png)

¡Eso es todo, tarifas cambiadas! Sin actualizaciones de red, sin despliegues complejos y arriesgados, solo haciendo una simple
llamada de contrato y ¡la nueva configuración de tarifas está en su lugar!

### Conclusión

Las actualizaciones de red pueden ser procedimientos complejos y peligrosos de llevar a cabo de manera segura. Nuestros esfuerzos continuos con Subnets son para hacer las actualizaciones lo más indoloras y simples posible. Con la poderosa combinación de precompilaciones estatales y actualizaciones de red a través de archivos de configuración de actualización, hemos logrado simplificar en gran medida tanto las actualizaciones de red como los cambios de parámetros de red. Esto, a su vez, permite experimentación mucho más segura y muchos nuevos casos de uso que eran demasiado arriesgados y complejos de llevar a cabo con los mecanismos tradicionales de actualización de red que requieren altos esfuerzos de coordinación.

Esperamos que este estudio de caso ayude a inspirar ideas para nuevas cosas que puedas probar por tu cuenta. ¡Estamos ansiosos por ver qué has construido y cómo las actualizaciones fáciles te ayudan a gestionar tus Subnets! Si tienes alguna pregunta o problema, no dudes en contactarnos en nuestro [Discord](https://chat.avalabs.org). ¡O simplemente acércate para contarnos qué emocionantes cosas nuevas has construido!
