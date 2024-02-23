---
tags: [Construir, Subredes]
description: Este tutorial muestra cómo implementar una Subred con permisos en la Testnet Fuji.
sidebar_label: En la Testnet Fuji
pagination_label: Implementar una Subred con permisos en la Testnet Fuji
sidebar_position: 1
---

# Implementar una Subred con permisos en la Testnet Fuji

:::note

Este documento describe cómo usar Avalanche-CLI para implementar una Subred en `Fuji`.

:::

Después de probar una Subred en un equipo local siguiendo [este tutorial](/build/subnet/deploy/local-subnet.md),
el siguiente paso es probarlo en la Testnet `Fuji`.

En este artículo, se muestra cómo hacer lo siguiente en la Testnet `Fuji`.

- Crear una Subred.
- Implementar una máquina virtual basada en Subnet-EVM.
- Unir un nodo a la Subred recién creada.
- Agregar un nodo como validador a la Subred.

Todos los ID en este artículo son con fines ilustrativos. Pueden ser diferentes en tu propia
ejecución de este tutorial.

## Requisitos previos

- 1+ nodos en ejecución y completamente inicializados en la Testnet `Fuji`. Consulta la sección
  [Nodos](/nodes/README.md) sobre cómo ejecutar un nodo y convertirte en un validador.
- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) instalado

## Máquina Virtual

Avalanche puede ejecutar múltiples blockchains. Cada blockchain es una instancia de una
[Máquina Virtual](/learn/avalanche/virtual-machines.md), al igual que un objeto en
un lenguaje orientado a objetos es una instancia de una clase.
Es decir, la VM define el comportamiento de la blockchain.

[Subnet-EVM](https://github.com/ava-labs/subnet-evm) es la VM que define las Cadenas de Contratos de la Subred.
Subnet-EVM es una versión simplificada de [Cadena C-Avalanche](https://github.com/ava-labs/coreth).

Esta cadena implementa la Máquina Virtual Ethereum y admite contratos inteligentes en Solidity, así como
la mayoría de las demás características de los clientes Ethereum.

## Testnet Fuji

Para este tutorial, se recomienda que sigas
[Ejecutar un Nodo Avalanche Manualmente](/nodes/run/node-manually.md#run-an-avalanche-node-from-source)
y este paso a continuación en particular para iniciar tu nodo en `Fuji`:

_Para conectarte a la Testnet Fuji en lugar de a la red principal, usa el argumento `--network-id=Fuji`_

También vale la pena señalar que
[solo se necesita 1 AVAX para convertirse en un validador en la Testnet Fuji](/nodes/validate/what-is-staking.md)
y puedes obtener el token de prueba desde el [faucet](https://faucet.avax.network/). Si ya tienes un saldo AVAX
mayor que cero en Mainnet, pega tu dirección de C-Chain allí y solicita tokens de prueba. De lo contrario,
por favor solicita un cupón de faucet en
[Guild](https://guild.xyz/avalanche). Los administradores y moderadores en el [Discord](https://discord.com/invite/RwXY7P6)
oficial pueden proporcionar AVAX de testnet si los desarrolladores no pueden obtenerlo de las otras dos opciones.

Para obtener el NodeID de este nodo `Fuji`, llama al siguiente comando curl a [info.getNodeID](/reference/avalanchego/info-api.md#infogetnodeid):

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta debería verse algo como:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
  },
  "id": 1
}
```

Esa parte que dice, `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` es el NodeID, todo el conjunto.
El usuario va a necesitar este ID en la sección posterior al llamar a [addValidator](#agregar-un-validador).

:::info

Con más datos en `Fuji`, puede llevar tiempo inicializar la Testnet `Fuji` desde cero.
Puedes usar [State-Sync](/nodes/configure/chain-config-flags.md#state-sync-enabled-boolean)
para acortar el tiempo de inicialización.

:::

## Avalanche-CLI

Si aún no está instalado, instala `Avalanche-CLI` siguiendo el tutorial en [Instalación de Avalanche-CLI](/tooling/cli-guides/install-avalanche-cli.md)

### Clave Privada

Todos los comandos que emiten una transacción requieren una clave privada cargada en la herramienta, o
un dispositivo ledger conectado.

Este tutorial se centra en el uso de claves almacenadas y deja los detalles de operación con ledger para el despliegue en `Mainnet`,
ya que las operaciones en `Mainnet` requieren el uso de ledger, mientras que en `Fuji` es opcional.

`Avalanche-CLI` admite las siguientes operaciones de clave:

- create
- delete
- export
- list

:::warning

Solo debes usar la clave privada creada para este tutorial para operaciones de prueba en `Fuji` u
otras testnets. No uses esta clave en `Mainnet`. La CLI va a almacenar la clave en tu sistema de archivos.
Cualquier persona que tenga acceso a esa clave va a tener acceso a todos los fondos asegurados por esa
clave privada. Para implementar en `Mainnet`, sigue [este tutorial](/build/subnet/deploy/mainnet-subnet.md).

:::

Ejecuta `create` si aún no tienes ninguna clave privada disponible. Puedes crear varias claves con nombre.
Cada comando que requiera una clave va a requerir el nombre de clave apropiado que quieras usar.

```bash
avalanche key create mytestkey
```

Esto va a generar una nueva clave llamada `mytestkey`. El comando también va a imprimir las direcciones
asociadas con la clave:

<!-- markdownlint-disable MD013 -->

```bash
Generando nueva clave...
Clave creada
+-----------+-------------------------------+-------------------------------------------------+---------------+
| NOMBRE    |             CADENA             |                     DIRECCIÓN                    |    RED        |
+-----------+-------------------------------+-------------------------------------------------+---------------+
| mytestkey | C-Chain (formato hexadecimal)  | 0x86BB07a534ADF43786ECA5Dd34A97e3F96927e4F      | Todas         |
+           +-------------------------------+-------------------------------------------------+---------------+
|           | P-Chain (formato Bech32)       | P-custom1a3azftqvygc4tlqsdvd82wks2u7nx85rg7v8ta | Red Local     |
+           +                               +-------------------------------------------------+---------------+
|           |                               | P-fuji1a3azftqvygc4tlqsdvd82wks2u7nx85rhk6zqh   | Fuji          |
+-----------+-------------------------------+-------------------------------------------------+---------------+
```

<!-- markdownlint-enable MD013 -->



Puedes usar la dirección de la C-Chain (`0x86BB07a534ADF43786ECA5Dd34A97e3F96927e4F`) para financiar tu clave desde el [faucet](https://faucet.avax.network/). El comando también imprime direcciones de la P-Chain para la red local predeterminada y `Fuji`. Esta última (`P-fuji1a3azftqvygc4tlqsdvd82wks2u7nx85rhk6zqh`) es la que se necesita para este tutorial.

El comando `delete` por supuesto elimina una clave privada:

```bash
avalanche key delete mytestkey
```

Pero ten cuidado de siempre tener una clave disponible para comandos que involucren transacciones.

El comando `export` va a **imprimir tu clave privada** en formato hexadecimal en la salida estándar.

```bash
avalanche key export mytestkey
21940fbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb5f0b
```

_esta clave está modificada intencionalmente_.

También puedes **importar** una clave usando la bandera `--file` con un argumento de ruta y proporcionando un nombre para ella:

```bash
avalanche key create othertest --file /tmp/test.pk
Cargando clave de usuario...
Clave cargada
```

Finalmente, el comando `list` va a listar todas tus claves en tu sistema y sus direcciones asociadas (la CLI almacena las claves en un directorio especial en tu sistema de archivos, manipular el directorio va a resultar en un mal funcionamiento de la herramienta).

<!-- markdownlint-disable MD013 -->

```bash
avalanche key list
+-----------+-------------------------------+-------------------------------------------------+---------------+
| NOMBRE    |             CADENA            |                     DIRECCIÓN                    |    RED        |
+-----------+-------------------------------+-------------------------------------------------+---------------+
| othertest | C-Chain (formato hexadecimal) | 0x36c83263e33f9e87BB98D3fEb54a01E35a3Fa735      | Todas         |
+           +-------------------------------+-------------------------------------------------+---------------+
|           | P-Chain (formato Bech32)      | P-custom1n5n4h99j3nx8hdrv50v8ll7aldm383nap6rh42 | Red Local     |
+           +                               +-------------------------------------------------+---------------+
|           |                               | P-fuji1n5n4h99j3nx8hdrv50v8ll7aldm383na7j4j7q   | Fuji          |
+-----------+-------------------------------+-------------------------------------------------+---------------+
| mytestkey | C-Chain (formato hexadecimal) | 0x86BB07a534ADF43786ECA5Dd34A97e3F96927e4F      | Todas         |
+           +-------------------------------+-------------------------------------------------+---------------+
|           | P-Chain (formato Bech32)      | P-custom1a3azftqvygc4tlqsdvd82wks2u7nx85rg7v8ta | Red Local     |
+           +                               +-------------------------------------------------+---------------+
|           |                               | P-fuji1a3azftqvygc4tlqsdvd82wks2u7nx85rhk6zqh   | Fuji          |
+-----------+-------------------------------+-------------------------------------------------+---------------+
```

<!-- markdownlint-enable MD013 -->

#### Financiando la Clave

:::danger

Realiza estos pasos solo para seguir este tutorial para direcciones `Fuji`. Para acceder a la billetera en `Mainnet`,
se recomienda encarecidamente el uso de un dispositivo ledger.

:::

1. Una clave recién creada no tiene fondos en ella. Envía fondos a través de una transferencia a sus direcciones correspondientes
   si ya tienes fondos en una dirección diferente, o consíguelos del faucet en
   [`https://faucet.avax.network`](https://faucet.avax.network/) usando tu **dirección C-Chain**.
   Si ya tienes un saldo de AVAX mayor que cero en Mainnet,
   pega tu dirección C-Chain allí y solicita tokens de prueba.
   De lo contrario,
   por favor solicita un cupón de faucet en
   [Guild](https://guild.xyz/avalanche). Los administradores y moderadores en el [Discord](https://discord.com/invite/RwXY7P6) oficial
   pueden proporcionar AVAX de testnet si los desarrolladores no pueden obtenerlo de las otras dos opciones.

2. **Exporta** tu clave a través del comando `avalanche key export`. La salida es tu clave privada,
   que te ayudará a [importar](https://support.avax.network/en/articles/6821877-core-extension-how-can-i-import-an-account)
   tu cuenta en la extensión Core.

3. Conecta la extensión Core a [Core web](https://core.app/), y mueve los fondos de prueba de la C-Chain a la P-Chain
   haciendo clic en Stake, luego en Cross-Chain Transfer (encuentra más detalles en
   [este tutorial](https://support.avax.network/en/articles/8133713-core-web-how-do-i-make-cross-chain-transfers-in-core-stake)).

Después de seguir estos 3 pasos, tu clave de prueba debería tener ahora un saldo en la P-Chain en `Fuji` Testnet.

## Crear una Subnet EVM

Crear una Subnet con `Avalanche-CLI` para `Fuji` funciona de la misma manera que con una red local.
De hecho,
el comando `create` solo crea una especificación de tu Subnet en el sistema de archivos local.
Después, la
Subnet necesita ser _desplegada_. Esto permite reutilizar las configuraciones, creando la configuración con el
comando `create`, luego desplegándola primero en una red local y sucesivamente en `Fuji` - y
eventualmente en `Mainnet`.

Para crear una Subnet EVM, ejecuta el comando `subnet create` con un nombre de tu elección:

```bash
avalanche subnet create testsubnet
```

Esto va a iniciar una serie de preguntas para personalizar tu Subnet EVM según tus necesidades. La mayoría de las preguntas tienen
alguna validación para reducir problemas debido a una entrada inválida. La primera pregunta pide el tipo de
máquina virtual (ver [Máquina Virtual](#máquina-virtual)).

```bash
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige tu VM:
  ▸ SubnetEVM
    Personalizado
```

Como quieres crear una Subnet EVM, simplemente acepta el valor predeterminado `Subnet-EVM`.
A continuación, la CLI pregunta por el ChainID. Deberías proporcionar tu propio ID. Verifica
[chainlist.org](https://chainlist.org/) para ver si el valor que deseas ya está en uso.

```bash
✔ Subnet-EVM
creando subnet testsubnet
Ingresa el ChainId de tu subnet. Puede ser cualquier entero positivo.
ChainId: 3333
```

Ahora, proporciona un símbolo de tu elección para el token de esta EVM:

```bash
Selecciona un símbolo para el token nativo de tu subnet
Símbolo del token: TST
```

En este punto, la CLI solicita la estructura de tarifas de la Subnet, para que el usuario pueda ajustar las tarifas
a sus necesidades:

```bash
Utiliza las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cómo te gustaría establecer las tarifas:
  ▸ Uso bajo de disco    / Rendimiento bajo    1.5 mil gas/s (configuración de C-Chain)
    Uso medio de disco / Rendimiento medio 2 mil   gas/s
    Uso alto de disco   / Rendimiento alto   5 mil   gas/s
    Personalizar configuración de tarifas
    Volver al paso anterior
```

Puedes navegar con las teclas de flecha para seleccionar la configuración adecuada. Utiliza
`Uso bajo de disco / Rendimiento bajo 1.5 mil gas/s` para este tutorial.

La siguiente pregunta es sobre el airdrop:

```bash
✔ Uso bajo de disco    / Rendimiento bajo    1.5 mil gas/s
Utiliza las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cómo te gustaría distribuir los fondos:
  ▸ Airdrop de 1 millón de tokens a la dirección predeterminada (no utilizar en producción)
    Personalizar tu airdrop
    Volver al paso anterior
```

Puedes aceptar el valor predeterminado, nuevamente, NO para producción, o personalizar tu airdrop. En este último
caso, el asistente continuaría. Asume el valor predeterminado aquí.

La pregunta final es sobre los precompiles. Los precompiles son personalizaciones poderosas de tu EVM.
Lee sobre ellos en [precompiles](/build/subnet/upgrade/customize-a-subnet.md#precompiles).

```bash
✔ Airdrop de 1 millón de tokens a la dirección predeterminada (no utilizar en producción)
Utiliza las teclas de flecha para navegar: ↓ ↑ → ←
? Avanzado: ¿Te gustaría agregar un precompile personalizado para modificar la EVM?:
  ▸ No
    Sí
    Volver al paso anterior
```

Para este tutorial, asume el caso simple de no tener precompiles adicionales. Esto finaliza la
secuencia de preguntas y el comando se cierra:

```bash
✔ No
Genesis creado exitosamente
```

Es posible finalizar el proceso en cualquier momento con Ctrl-C.

En este punto, la CLI crea la especificación de la nueva Subnet en disco, pero aún no está desplegada.

Imprime la especificación en disco ejecutando el comando `describe`:

```bash
avalanche subnet describe testsubnet
 _____       _        _ _
|  __ \     | |      (_) |
| |  | | ___| |_ __ _ _| |___
| |  | |/ _ \ __/ _  | | / __|
| |__| |  __/ || (_| | | \__ \
|_____/ \___|\__\__,_|_|_|___/
+----------------------------+----------------------------------------------------+
|         PARÁMETRO          |                       VALOR                        |
+----------------------------+----------------------------------------------------+
| Nombre de la Subnet        | testsubnet                                         |
+----------------------------+----------------------------------------------------+
| ChainID                    | 3333                                               |
+----------------------------+----------------------------------------------------+
| Nombre del Token           | TST                                               |
+----------------------------+----------------------------------------------------+
| ID de VM                   | tGBrM2SXkAdNsqzb3SaFZZWMNdzjjFEUKteheTa4dhUwnfQyu  |
+----------------------------+----------------------------------------------------+
| SubnetID de Fuji           | XTK7AM2Pw5A4cCtQ3rTugqbeLCU9mVixML3YwwLYUJ4WXN2Kt  |
+----------------------------+----------------------------------------------------+
| BlockchainID de Fuji       | 5ce2WhnyeMELzg9UtfpCDGNwRa2AzMzRhBWfTqmFuiXPWE4TR  |
+----------------------------+----------------------------------------------------+
| SubnetID de Red Local      | 2CZP2ndbQnZxTzGuZjPrJAm5b4s2K2Bcjh8NqWoymi8NZMLYQk |
+----------------------------+----------------------------------------------------+
| BlockchainID de Red Local  | oaCmwvn8FDuv8QjeTozGpHeczk1Kv2651j2jhm6sR1nraGwVW  |
+----------------------------+----------------------------------------------------+

  _____              _____             __ _
 / ____|            / ____|           / _(_)
| |  __  __ _ ___  | |     ___  _ __ | |_ _  __ _
| | |_ |/ _  / __| | |    / _ \| '_ \|  _| |/ _  |
| |__| | (_| \__ \ | |___| (_) | | | | | | | (_| |
 \_____|\__,_|___/  \_____\___/|_| |_|_| |_|\__, |
                                             __/ |
                                            |___/
+--------------------------+-------------+
|   PARÁMETRO DE GAS        |    VALOR    |
+--------------------------+-------------+
| GasLimit                 |     15000000 |
+--------------------------+-------------+
| MinBaseFee               | 25000000000 |
+--------------------------+-------------+
| TargetGas (por 10s)      |    20000000 |
+--------------------------+-------------+
| BaseFeeChangeDenominator |          36 |
+--------------------------+-------------+
| MinBlockGasCost          |           0 |
+--------------------------+-------------+
| MaxBlockGasCost          |     1000000 |
+--------------------------+-------------+
| TargetBlockRate          |           2 |
+--------------------------+-------------+
| BlockGasCostStep         |      200000 |
+--------------------------+-------------+



          _         _
    /\   (_)       | |
   /  \   _ _ __ __| |_ __ ___  _ __
  / /\ \ | | '__/ _  | '__/ _ \| '_ \
 / ____ \| | | | (_| | | | (_) | |_) |
/_/    \_\_|_|  \__,_|_|  \___/| .__/
                               | |
                               |_|
+--------------------------------------------+------------------------+---------------------------+
|                  DIRECCIÓN                 | CANTIDAD DE AIRDROP (10^18) | CANTIDAD DE AIRDROP (WEI) |
+--------------------------------------------+------------------------+---------------------------+
| 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC |                1000000 | 1000000000000000000000000 |
+--------------------------------------------+------------------------+---------------------------+


  _____                                    _ _
 |  __ \                                  (_) |
 | |__) | __ ___  ___ ___  _ __ ___  _ __  _| | ___  ___
 |  ___/ '__/ _ \/ __/ _ \| '_   _ \| '_ \| | |/ _ \/ __|
 | |   | | |  __/ (_| (_) | | | | | | |_) | | |  __/\__ \
 |_|   |_|  \___|\___\___/|_| |_| |_| .__/|_|_|\___||___/
                                    | |
                                    |_|

No se han establecido precompilaciones
```

También puedes listar las subredes disponibles:

```bash
avalanche subnet list
go run main.go subnet list
+-------------+-------------+----------+---------------------------------------------------+------------+-----------+
|   SUBRED    |    CADENA   | ID DE CADENA |                       ID DE VM                    |    TIPO    | DESDE REPO |
+-------------+-------------+----------+---------------------------------------------------+------------+-----------+
| testsubnet  | testsubnet  |     3333 | tGBrM2SXkAdNsqzb3SaFZZWMNdzjjFEUKteheTa4dhUwnfQyu | Subnet-EVM | false     |
+-------------+-------------+----------+---------------------------------------------------+------------+-----------+
```

Listar información desplegada:

```bash
avalanche subnet list --deployed
go run main.go subnet list --deployed
+-------------+-------------+---------------------------------------------------+---------------+-----------------------------------------------------------------+---------+
|   SUBRED    |    CADENA   |                       ID DE VM                    | RED LOCAL |                          FUJI (TESTNET)                         | MAINNET |
+-------------+-------------+---------------------------------------------------+---------------+-----------------------------------------------------------------+---------+
| testsubnet  | testsubnet  | tGBrM2SXkAdNsqzb3SaFZZWMNdzjjFEUKteheTa4dhUwnfQyu | Sí           | SubnetID: XTK7AM2Pw5A4cCtQ3rTugqbeLCU9mVixML3YwwLYUJ4WXN2Kt     | No      |
+             +             +                                                   +               +-----------------------------------------------------------------+---------+
|             |             |                                                   |               | BlockchainID: 5ce2WhnyeMELzg9UtfpCDGNwRa2AzMzRhBWfTqmFuiXPWE4TR | No      |
+-------------+-------------+---------------------------------------------------+---------------+-----------------------------------------------------------------+---------+

```

## Desplegar la Subred

Para desplegar la nueva Subred, ejecuta

:::note

Para desplegar la Subred, necesitarás algunos AVAX de testnet en la cadena P.

:::

```bash
avalanche subnet deploy testsubnet
```

Esto va a iniciar una nueva serie de comandos.

```bash
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Elija una red para desplegar en:
  ▸ Red Local
    Fuji
    Mainnet
```

Este tutorial trata sobre el despliegue en `Fuji`, así que navega con las teclas de flecha hasta `Fuji` y presiona enter.
Luego se le pide al usuario que proporcione qué clave privada usar para el despliegue. El despliegue básicamente
consiste en ejecutar una transacción de
[createSubnet](/reference/avalanchego/p-chain/api.md#platformcreatesubnet). Por lo tanto, la
clave necesita tener fondos.

Además, este tutorial asume que un nodo está en funcionamiento, completamente arrancado en `Fuji`, y se ejecuta
desde la **misma** máquina.

```bash
✔ Fuji
Desplegando [testsubnet] en Fuji
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué clave privada se debe usar para emitir la transacción?:
    test
  ▸ mytestkey
```

Las Subredes están actualmente permisionadas solamente. Por lo tanto, el proceso ahora requiere que el usuario proporcione
_qué claves pueden controlar la Subred_. La CLI le pide al usuario que proporcione una o más **direcciones de la cadena P**.
Sólo las claves correspondientes a estas direcciones van a poder agregar o quitar validadores.
Asegúrate de proporcionar direcciones de la **cadena P Fuji** -`P-Fuji....`-.

```bash
Configure qué direcciones pueden agregar nuevos validadores a la subred.
Estas direcciones se conocen como tus claves de control. También vas a
establecer cuántas claves de control se requieren para agregar un validador.
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Establecer claves de control:
  ▸ Agregar clave de control
    Hecho
    Cancelar
```

Ingresa en `Agregar clave de control` y proporciona al menos una clave. Puedes ingresar múltiples direcciones, simplemente usa
una aquí. Cuando termines, presiona `Hecho`. (La dirección proporcionada aquí es
intencionalmente inválida. La dirección tiene una suma de comprobación y la herramienta se asegurará de que sea una dirección válida).

```bash
✔ Agregar tecla de control
Ingrese la dirección de la cadena P (Ej: `P-...`): P-fuji1vaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasz
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Configurar teclas de control:
    Agregar tecla de control
  ▸ Listo
    Cancelar
```

Finalmente, es necesario definir el umbral de cuántas teclas se requieren para que un cambio sea válido,
-hay alguna validación de entrada-. Por ejemplo, si hay una tecla de control, como se mencionó anteriormente, simplemente ingrese 1.
El umbral _podría_ ser arbitrario dependiendo de las necesidades, por ejemplo, 2 de 4 direcciones,
1 de 3, 3 de 5, etc., pero actualmente esta herramienta solo funciona si _la clave privada utilizada aquí posee al menos
una tecla de control y el umbral es 1_.

```bash
✔ Ingrese el número requerido de firmas de teclas de control para agregar un validador: 1
```

Aquí el asistente se completa y la CLI intenta la transacción.

Si la clave privada no está financiada o no tiene suficientes fondos, el mensaje de error será:

```bash
Error: fondos insuficientes: los UTXO proporcionados necesitan 100000000 unidades más del activo "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
```

Si la clave privada tiene fondos, pero la **clave de control** es incorrecta (no controlada por la clave privada),
la CLI va a crear la Subnet, pero _no la blockchain_:

```bash
La Subnet se ha creado con ID: 2EkPnvnDiLgudnf8NjtxaNcVFtdAAnUPvaoNBrc9WG5tNmmfaK. Ahora creando la blockchain...
Error: autorización insuficiente
```

Por lo tanto, el usuario necesita proporcionar una tecla de control de la cual realmente tenga control, y luego tiene éxito.
La salida (asumiendo que el nodo se está ejecutando en `localhost` y el puerto de la API está configurado en el estándar `9650`)
se verá algo como esto:

<!-- markdownlint-disable MD013 -->

```bash
La Subnet se ha creado con ID: 2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H. Ahora creando la blockchain...
Endpoint para la blockchain "2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh" con ID de VM "tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw": http://127.0.0.1:9650/ext/bc/2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh/rpc
```

<!-- markdownlint-enable MD013 -->

Bien hecho. Acabas de crear tu propia Subnet con tu propia Subnet-EVM en ejecución en `Fuji`.

Para obtener información sobre tu nueva Subnet, visita el
[Explorador de Subnets Avalanche](https://subnets-test.avax.network/). La
búsqueda funciona mejor por ID de blockchain, así que en este ejemplo, ingresa `2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh`
en el cuadro de búsqueda y deberías ver la información de tu nueva blockchain brillante.

## Solicitud para unirse a una Subnet como validador

La nueva Subnet creada en los pasos anteriores aún no tiene validadores dedicados.
Para solicitar permiso para validar una Subnet, se requieren los siguientes pasos:

:::info

Antes de que un nodo pueda ser un validador en una Subnet, se requiere que el nodo ya sea un validador en la
red primaria, lo que significa que tu nodo se ha **inicializado completamente**.

Consulta [aquí](/nodes/validate/add-a-validator.md#add-a-validator-with-core-extension) cómo
convertirte en un validador.

:::

Primero, solicita permiso para validar ejecutando el comando `join` junto con el nombre de la Subnet:

```bash
avalanche subnet join testsubnet
```

Nota: ¡Ejecutar `join` no garantiza que tu nodo sea un validador de la Subnet! El propietario de
la Subnet debe aprobar que tu nodo sea un validador llamando a `addValidator` como se describe en la siguiente sección.

Cuando llamas al comando `join`, primero se te solicita la selección de la red:

```bash
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Elija una red para validar (este comando solo admite redes públicas):
  ▸ Fuji
    Mainnet
```

A continuación, hay dos opciones de configuración: configuraciones automáticas y manuales. Como se mencionó anteriormente,
"Automático" va a intentar editar un archivo de configuración y configurar tu directorio de complementos, mientras que
"Manual" simplemente va a imprimir la configuración requerida en la pantalla. Veamos qué hace "Automático":

```bash
✔ Automático
✔ Ruta de tu archivo de configuración existente (o donde se va a generar): config.json
```

Proporciona una ruta a un archivo de configuración. Si ejecutas este comando en la máquina donde se está ejecutando tu
validador, entonces podrías apuntar esto al archivo de configuración utilizado realmente, por ejemplo
`/etc/avalanchego/config.json` - solo asegúrate de que la herramienta tenga acceso de **escritura** al archivo. O
podrías copiar el archivo más tarde. En cualquier caso, la herramienta va a intentar editar el archivo existente especificado
por la ruta dada, o crear un nuevo archivo. Nuevamente, establece permisos de escritura.

A continuación, proporciona el directorio de complementos. El comienzo de este tutorial contiene la descripción de las VM
[Máquina Virtual](#máquina-virtual). Cada VM ejecuta su propio complemento, por lo tanto, AvalancheGo necesita
poder acceder al binario de complemento correspondiente. Como este es el comando `join`, que aún no conoce el complemento, hay
que proporcionar el directorio donde reside el complemento. Asegúrate de proporcionar la ubicación para tu caso:

```bash
✔ Ruta de tu directorio de complementos de avalanchego (probablemente avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins
```

La herramienta no sabe exactamente dónde se encuentra, por lo que requiere la ruta completa. Con la ruta dada,
va a copiar el binario de la VM a la ubicación proporcionada:

```shell
✔ Ruta de tu directorio de complementos de avalanchego (probablemente avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins█
Binario de la VM escrito en /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw
Esto va a editar tu archivo de configuración existente. Esta edición no es destructiva,
pero siempre es bueno tener una copia de seguridad.
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Continuar?:
  ▸ Sí
    No
```

Presionar `Sí` va a intentar escribir el archivo de configuración:

<!-- markdownlint-disable MD013 -->

```shell
✔ Sí
El archivo de configuración ha sido editado. Para usarlo, asegúrate de iniciar el nodo con la opción '--config-file', por ejemplo

./build/avalanchego --config-file config.json

(usando tu ubicación binaria). El nodo debe reiniciarse para que los cambios surtan efecto.
```

<!-- markdownlint-enable MD013 -->

Es **necesario reiniciar el nodo**.

Si eliges "Manual" en su lugar, la herramienta simplemente va a imprimir _instrucciones_. El usuario va a tener
que seguir estas instrucciones y aplicarlas al nodo. Ten en cuenta que las ID de la VM y las Subnets van a ser
diferentes en tu caso.

```bash
✔ Manual

Para configurar tu nodo, debes hacer dos cosas:

1. Agregar tu binario de VM a tu directorio de complementos del nodo
2. Actualizar la configuración de tu nodo para comenzar a validar la Subnet

Para agregar la VM a tu directorio de complementos, copia o scp desde /tmp/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw
```

Si instalaste avalanchego manualmente, es probable que tu directorio de plugins sea avalanchego/build/plugins.

Si inicias tu nodo desde la línea de comandos SIN un archivo de configuración (por ejemplo, a través de la línea de comandos o un script de systemd), agrega la siguiente bandera al comando de inicio de tu nodo:

--track-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H
(si el nodo ya tiene una configuración de track-subnets, agrega el nuevo valor separado por comas).

Por ejemplo:
./build/avalanchego --network-id=Fuji --track-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

Si inicias el nodo a través de un archivo de configuración JSON, agrega esto a tu archivo de configuración:
track-subnets: 2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

CONSEJO: Prueba este comando con la bandera --avalanchego-config apuntando a tu archivo de configuración, esta herramienta intentará actualizar el archivo automáticamente (asegúrate de que pueda escribir en él).

Después de actualizar tu configuración, deberás reiniciar tu nodo para que los cambios surtan efecto.

## Agregar un validador

:::warning

Si el comando "join" no se completa con éxito antes de que se complete el comando "addValidator", la Subnet puede experimentar un rendimiento degradado o incluso detenerse.

:::

Ahora que el nodo se ha unido a la Subnet, un titular de la clave de control de la Subnet debe llamar a "addValidator" para otorgar al nodo permiso para ser un validador en tu Subnet.

Para agregar un nodo a la lista blanca como un validador reconocido en la Subnet, ejecuta:

```bash
avalanche subnet addValidator testsubnet
```

Dado que esta operación implica una nueva transacción, deberás especificar qué clave privada usar:

```bash
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué clave privada se debe usar para emitir la transacción?:
    test
  ▸ mytestkey
```

Elige `Fuji`:

```bash
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red en la que implementar. Este comando solo admite Fuji actualmente.:
  ▸ Fuji
    Mainnet
```

Ahora usa el **NodeID** del nuevo validador definido al principio de este tutorial. Para obtener mejores resultados, asegúrate de que el validador esté en funcionamiento y sincronizado.

```bash
¿Cuál es el NodeID del validador que deseas agregar a la lista blanca?: NodeID-BFa1paAAAAAAAAAAAAAAAAAAAAQGjPhUy
```

-este ID está modificado intencionalmente-

La siguiente pregunta requiere un poco de reflexión. Un validador tiene un peso, que define con qué frecuencia el consenso lo selecciona para la toma de decisiones. Debes pensar en cuántos validadores quieres tener inicialmente para identificar un buen valor aquí. El rango es de 1 a 100, pero el mínimo para una Subnet sin ningún validador aún es 20. La estructura se describe un poco en [addSubnetValidator](/reference/avalanchego/p-chain/api.md#platformaddsubnetvalidator) bajo la sección `weight`.

Simplemente selecciona 30 para este caso:

```bash
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué peso de participación te gustaría asignar al validador?:
    Predeterminado (20)
  ▸ Personalizado
```

```bash
✔ ¿Qué peso de participación te gustaría asignar al validador?: 30
```

Luego especifica cuándo el validador va a comenzar a validar. El tiempo debe estar en el futuro. La opción personalizada requerirá ingresar una fecha específica en formato `AAAA-MM-DD HH:MM:SS`. Simplemente toma el valor predeterminado esta vez:

```bash
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Hora de inicio:
  ▸ Comenzar en un minuto
    Personalizado
```

Finalmente, especifica cuánto tiempo va a estar validando:

```bash
✔ Comenzar en un minuto
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cuánto tiempo debe validar tu validador?:
  ▸ Hasta que expire el validador de la red primaria
    Personalizado
```

Si eliges `Personalizado` aquí, el usuario debe ingresar una **duración**, que es un período de tiempo expresado en horas. Por ejemplo, podrías decir `200 días = 24 * 200 = 4800 horas`

```bash
✔ ¿Cuánto tiempo debe estar validando este validador? Ingresa una duración, por ejemplo, 8760h: 4800h
```

La CLI muestra una fecha real de cuándo es eso ahora:

```bash
? Tu validador va a dejar de hacer stake para el 2023-02-13 12:26:55:
  ▸ Sí
    No
```

Confirma si es correcto. En este punto, la serie de preguntas está completa y la CLI intenta la transacción:

```bash
NodeID: NodeID-BFa1padLXBj7VHa2JYvYGzcTBPQGjPhUy
Red: Fuji
Hora de inicio: 2022-07-28 12:26:55
Hora de finalización: 2023-02-13 12:26:55
Peso: 30
Entradas completas, emitiendo transacción para agregar la información del validador proporcionado...
```

Esto puede tomar unos segundos y, si tiene éxito, imprimirá:

```bash
Transacción exitosa, ID de transacción: EhZh8PvQyqA9xggxn6EsdemXMnWKyy839NzEJ5DHExTBiXbjV
```

¡Esto significa que el nodo ahora es un validador en la Subnet dada en `Fuji`!

## Exportar Subnet

Esta herramienta es más útil en la máquina donde se está ejecutando o va a ejecutarse un validador. Para permitir que una VM se ejecute en una máquina diferente, puedes exportar la configuración. Solo necesitas proporcionar una ruta donde exportar los datos:

```bash
avalanche subnet export testsubnet
✔ Ingresa la ruta del archivo para escribir los datos de exportación: /tmp/testsubnet-export.dat
```

El archivo está en formato de texto y no debes cambiarlo. Luego puedes usarlo para importar la configuración en una máquina diferente.

## Importar Subnet

Para importar una especificación de VM exportada en la sección anterior, simplemente emite el comando `import` con la ruta del archivo después de haber copiado el archivo:

```bash
avalanche subnet import /tmp/testsubnet-export.dat
Subnet importada exitosamente
```

Después de esto, toda la configuración de la Subnet debería estar disponible en la máquina de destino:

```bash
avalanche subnet list
+---------------+---------------+----------+-----------+----------+
|    SUBNET     |     CHAIN     | CHAIN ID |   TYPE    | DEPLOYED |
+---------------+---------------+----------+-----------+----------+
| testsubnet    | testsubnet    |     3333 | SubnetEVM | No       |
+---------------+---------------+----------+-----------+----------+
```

## Apéndice

### Conectar con Core

Para conectar Core (o MetaMask) con tu blockchain en la nueva
Subnet que se ejecuta en tu computadora local,
puedes agregar una nueva red en tu billetera Core
con los siguientes valores:

```text
- Nombre de la red: testsubnet
- URL RPC: [http://127.0.0.1:9650/ext/bc/2XDnKyAEr1RhhWpTpMXqrjeejN23vETmDykVzkb4PrU1fQjewh/rpc]
- ID de la cadena: 3333
- Símbolo: TST
```

:::note

A menos que implementes tu Subnet en otros nodos, no podrás usar otros nodos, incluido el servidor de API público `https://api.avax-test.network/`, para conectarte a Core.

Si quieres abrir este nodo para que otros accedan a tu Subnet, debes configurarlo correctamente con `https//node-ip-address` en lugar de `http://127.0.0.1:9650`, sin embargo, está fuera del alcance de este tutorial cómo hacerlo.

:::
