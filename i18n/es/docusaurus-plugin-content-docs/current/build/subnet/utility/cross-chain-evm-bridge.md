---
tags: [Construir, Subredes]
description: Este tutorial demuestra el proceso de implementación de un puente entre cadenas EVM cruzadas. Construye bajo tu propio riesgo.
sidebar_label: Agregar un puente cruzado entre cadenas
pagination_label: Implementar un puente EVM cruzado entre cadenas
sidebar_position: 2
---

# Implementar un puente EVM cruzado entre cadenas

:::warning

Este tutorial es con fines de demostración sobre cómo construir un puente cruzado entre cadenas. No es para uso en producción.
Debes asumir la responsabilidad total de garantizar la seguridad de tu puente.

:::

## Introducción

En este tutorial, estaremos construyendo un puente entre **[WAGMI](/build/subnet/info/wagmi.md)** y
**[Fuji](/learn/avalanche/fuji.md)**. Este puente nos ayudará a transferir la moneda nativa **WGM**
envuelta en **wWGM** de ida y vuelta desde la cadena WAGMI a la cadena Fuji. Usando esta guía, tú
puedes implementar un puente entre cualquier cadena basada en EVM para cualquier token ERC20.

La versión envuelta de una moneda nativa es su representación ERC20 anclada. Envolverla con el estándar ERC20
facilita ciertos procesos como transacciones delegadas. Puedes obtener fácilmente tokens envueltos
enviando la moneda nativa a la dirección del contrato de token envuelto.

> WAGMI es una cadena de prueba independiente basada en EVM desplegada en una Subred personalizada en la red Avalanche.

Estaremos utilizando el repositorio del puente de **ChainSafe**, para configurar fácilmente un puente robusto y seguro.

## Flujo de trabajo del puente

Las cadenas WAGMI y Fuji no están interconectadas por defecto, sin embargo, podríamos hacer que se comuniquen.
Los relayers observan eventos (mediante la consulta de bloques) en una cadena y realizan la acción necesaria utilizando esos
eventos en la otra cadena. De esta manera, también podemos realizar el puente de tokens de una cadena a la
otra cadena a través del uso de contratos inteligentes.

Aquí está el flujo de trabajo de alto nivel básico del puente -

- Los usuarios depositan tokens en el contrato del puente
- El contrato del puente le pide al contrato del controlador que realice la acción de depósito
- El contrato del controlador **bloquea** el token depositado en la caja fuerte del token
- El contrato del puente emite el evento `Deposit`
- El relayer recibe el evento `Deposit` desde la cadena fuente
- El relayer crea una propuesta de votación en la cadena de destino para acuñar un nuevo token
- Después de que los relayers de umbral votan, la propuesta se ejecuta
- Los tokens son **acuñados** a la dirección del receptor

El puente de tokens desde la cadena fuente a la cadena de destino implica el enfoque de **bloquear y acuñar**. Mientras que
el puente de tokens desde la cadena de destino a la cadena fuente implica el enfoque de **quemar y liberar**. No podemos
acuñir y quemar tokens que no controlamos. Por lo tanto, los bloqueamos en la caja fuerte del token en la cadena fuente.
Y acuñimos el token correspondiente (que desplegaremos y, por lo tanto, controlaremos) en la cadena de destino.

![arquitectura](/img/chainsafe-bridge-1-workflow.png)

## Requisitos

Estos son los requisitos para seguir este tutorial -

- Configurar [WAGMI](/build/subnet/info/wagmi.md#adding-wagmi-to-core) y
[Fuji](/build/dapp/fuji-workflow.md#set-up-fuji-network-on-core-optional) en Core
- Importar el token `wWGM` (activo) en la red WAGMI (Core). Aquí está la dirección - `0x3Ee7094DADda15810F191DD6AcF7E4FFa37571e4`
- Monedas `WGM` en la cadena WAGMI. Gotea `1 WGM` desde el [WAGMI Faucet](https://faucet.trywagmi.xyz/).
- Monedas `AVAX` en la cadena Fuji. Gotea `10 AVAX` desde el [Fuji Faucet](https://faucet.avax.network/)
- Tokens `WGM` envueltos en la cadena WAGMI. Envía algunas monedas `WGM` a la dirección del token `wWGM` (ver
segundo punto), para recibir la misma cantidad de `wWGM`. Siempre mantén algunas monedas `WGM`, para cubrir las tarifas de transacción.

## Configuración del entorno

Creemos un nuevo directorio `deploy-bridge`, donde guardaremos nuestros códigos de puente. Estaremos
utilizando los siguientes repositorios -

- [`ChainSafe/chainbridge-deploy`](https://github.com/ChainSafe/chainbridge-deploy) - Esto nos ayudará
a configurar nuestros contratos de puente
- [`ChainSafe/ChainBridge`](https://github.com/ChainSafe/ChainBridge) - Esto nos ayudará a configurar
nuestro relayer fuera de la cadena.

### Instalando la herramienta de línea de comandos de ChainBridge

Usando el siguiente comando, podemos clonar e instalar la herramienta de línea de comandos de ChainBridge. Esto
nos ayudará a configurar los contratos de puente y demostrar transferencias de puente. Una vez que los contratos de puente
estén desplegados, puedes usar su ABI y dirección de contrato para configurar tu interfaz de usuario.

```bash
git clone -b v1.0.0 --depth 1 https://github.com/ChainSafe/chainbridge-deploy \
&& cd chainbridge-deploy/cb-sol-cli \
&& npm install \
&& make install
```

Esto construirá los contratos e instalará el comando `cb-sol-cli`.

### Configurando variables de entorno

Configuremos las variables de entorno, para que no necesitemos escribir sus valores cada vez que
emitimos un comando. Vuelve al directorio `deploy-bridge` (directorio principal del proyecto) y crea un
nuevo archivo `configVars`. Coloca el siguiente contenido dentro de él -

```env
SRC_GATEWAY=https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc
DST_GATEWAY=https://api.avax-test.network/ext/bc/C/rpc

SRC_ADDR="<Tu dirección en WAGMI>"
SRC_PK="<tu clave privada en WAGMI>"
DST_ADDR="<Tu dirección en Fuji>"
DST_PK="<tu clave privada en Fuji>"

SRC_TOKEN="0x3Ee7094DADda15810F191DD6AcF7E4FFa37571e4"
RESOURCE_ID="0x00"
```

- `SRC_ADDR` y `DST_ADDR` son las direcciones que desplegarán los contratos de puente y actuarán como relayers.
- `SRC_TOKEN` es el token que queremos puentear. Aquí está la dirección de la versión envuelta ERC20
de la moneda WGM aka wWGM.
- `RESOURCE_ID` podría ser cualquier cosa. Identifica nuestros tokens ERC20 puenteados en ambos lados (WAGMI y Fuji).

Cada vez que hagamos cambios en estas variables de configuración, tenemos que actualizar nuestro entorno bash. Ejecuta
el siguiente comando de acuerdo a la ubicación relativa del archivo. Estas variables son temporales
y solo están allí en la sesión terminal actual, y se eliminarán una vez que la sesión haya terminado.
Asegúrate de cargar estas variables de entorno en cualquier lugar donde las vayas a usar en los comandos bash
(como `$SRC_GATEWAY` o `$SRC_ADDR`)

```bash
source ./configVars
```

## Configurando la Cadena Fuente

Necesitamos configurar nuestra cadena fuente de la siguiente manera -

- Desplegar contratos de Puente y Controlador con `$SRC_ADDR` como relayer predeterminado y único
- Registrar el token `wWGM` como un recurso en el puente

### Desplegar Contratos Fuente

La herramienta de línea de comandos `cb-sol-cli` nos ayudará a desplegar los contratos. Ejecuta el siguiente comando
en la sesión de terminal donde se cargan las variables de configuración. Agregará `SRC_ADDR` como el relayer predeterminado
para relayer eventos desde la cadena WAGMI (fuente) a la cadena Fuji (destino).

**Uno de los parámetros más importantes a tener en cuenta al desplegar el contrato de puente es el valor de `expiry`**
**Es el número de bloques después del cual una propuesta se considera cancelada. Por defecto es**
**establecido en `100`. En Avalanche Mainnet, con este valor, las propuestas podrían expirar en 3-4 minutos.**
**Deberías elegir un valor de vencimiento muy grande, de acuerdo a la cadena en la que estás desplegando el puente.**
**De lo contrario, tu propuesta será cancelada si no se reciben el número umbral de propuestas de voto**
**a tiempo.**

También debes tener en cuenta que a veces, durante una alta actividad de red, una transacción podría
quedarse atascada durante mucho tiempo. Las transacciones de propuesta atascadas en este escenario, podrían resultar en la cancelación
de propuestas anteriores. Por lo tanto, los valores de vencimiento deben ser lo suficientemente grandes y los relayers deben emitir
transacciones con un precio de gas máximo competitivo.

```bash
./build/chainbridge relayer generate --config config.json \
    --srcChainId 0 \
    --dstChainId 1 \
    --bridge $SRC_BRIDGE \
    --handler $SRC_HANDLER \
    --privateKey $RELAYER_PK \
    --pollInterval 5s \
    --confirmations 1 \
    --gasLimit 1000000 \
    --gasPrice 25000000000 \
    --rpc $SRC_GATEWAY
```

### Starting Relayer

Now, run the following command to start the relayer.

```bash
./build/chainbridge relayer start --config config.json
```

The relayer will start polling for deposit events on the source chain and submitting vote proposals
on the destination chain.

```bash
echo "{
  \"chains\": [
    {
      \"name\": \"WAGMI\",
      \"type\": \"ethereum\",
      \"id\": \"0\",
      \"endpoint\": \"$SRC_GATEWAY\",
      \"from\": \"$SRC_ADDR\",
      \"opts\": {
        \"bridge\": \"$SRC_BRIDGE\",
        \"erc20Handler\": \"$SRC_HANDLER\",
        \"genericHandler\": \"$SRC_HANDLER\",
        \"gasLimit\": \"1000000\",
        \"maxGasPrice\": \"50000000000\",
        \"http\": \"true\",
        \"blockConfirmations\":\"0\"
      }
    },
    {
      \"name\": \"Fuji\",
      \"type\": \"ethereum\",
      \"id\": \"1\",
      \"endpoint\": \"$DST_GATEWAY\",
      \"from\": \"$DST_ADDR\",
      \"opts\": {
        \"bridge\": \"$DST_BRIDGE\",
        \"erc20Handler\": \"$DST_HANDLER\",
        \"genericHandler\": \"$DST_HANDLER\",
        \"gasLimit\": \"1000000\",
        \"maxGasPrice\": \"50000000000\",
        \"http\": \"true\",
        \"blockConfirmations\":\"0\"
      }
    }
  ]
}" >> config.json
```

Verifica y confirma los detalles en el archivo `config.json`.

> En el comando anterior, puedes ver que `blockConfirmations` está configurado en `0`. Esto funcionará bien para redes como Avalanche porque el bloque se confirma una vez que se ha comprometido. A diferencia de otras cadenas como Ethereum, que requiere 20-30 confirmaciones de bloque. Por lo tanto, utiliza esta configuración con precaución, dependiendo del tipo de cadena que estés utilizando.
>
> Puede causar problemas graves si se acuña o se libera un token correspondiente basado en un bloque no confirmado.

### Configurar claves

Dale acceso al relayer a tus claves. Usando estas claves, el relayer propondrá eventos de depósito y ejecutará propuestas. Pedirá establecer una contraseña para encriptar estas claves. Cada vez que inicies el relayer, pedirá esta contraseña.

```bash
./build/chainbridge accounts import --privateKey $SRC_PK
```

```bash
./build/chainbridge accounts import --privateKey $DST_PK
```

## Probemos el puente

La configuración está ahora completa, tanto en la cadena como fuera de ella. Ahora solo tenemos que iniciar el relayer y probar el puente. Para fines de prueba, usaremos `cb-sol-cli` para hacer transacciones de depósito en el puente. Pero puedes crear tu propia interfaz y integrarla con el puente utilizando los ABIs.

### Iniciar el relayer

Ejecuta el siguiente comando para iniciar el relayer. Imprimirá registros de todos los eventos asociados a nuestro puente, que ocurren en ambas cadenas. Así que mantén el relayer en funcionamiento y sigue los siguientes comandos en otra sesión de terminal.

```bash
./build/chainbridge --config config.json --verbosity trace --latest
```

### Aprobar al Handler para gastar mis tokens

Ahora, depositemos tokens en el puente WAGMI. Pero antes de eso, necesitamos aprobar al handler para que gaste (bloquee o queme) tokens en nuestro nombre (aquí `SRC_PK`). La cantidad aquí está en Wei (1 ether (WGM) = 10^18 Wei). Aprobaremos 0.1 wWGM.

```bash
cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK --gasPrice 25000000000 erc20 approve \
    --amount 100000000000000000 \
    --erc20Address $SRC_TOKEN \
    --recipient $SRC_HANDLER
```

### Depositar tokens en el puente

Una vez aprobado, podemos enviar una transacción de depósito. Ahora depositemos 0.1 wWGM en el puente. El handler bloqueará (transferirá a un lugar seguro) 0.1 wWGM desde nuestra dirección (aquí `SRC_PK`) y acuñará los nuevos tokens en la cadena de destino para el destinatario (aquí `DST_ADDR`).

```bash
cb-sol-cli --url $SRC_GATEWAY --privateKey $SRC_PK --gasPrice 25000000000 erc20 deposit \
    --amount 100000000000000000 \
    --dest 1 \
    --bridge $SRC_BRIDGE \
    --recipient $DST_ADDR \
    --resourceId $RESOURCE_ID
```

Esta transacción transferirá 0.1 wWGM al lugar seguro de tokens y emitirá un evento `Deposit`, que será capturado por el relayer. Después de este evento, enviará una propuesta de votación a la cadena de destino. Dado que el umbral es 1, el puente ejecutará la propuesta y acuñará nuevos wWGM a la dirección del destinatario. Aquí tienes una captura de pantalla de la salida del relayer.

![output](/img/chainsafe-bridge-2-relayer-output.png)

De manera similar, podemos transferir los tokens de vuelta a la cadena WAGMI.

## Conclusión

De manera similar al proceso anterior, puedes desplegar un puente entre cualquier par de cadenas basadas en EVM. Hemos utilizado la herramienta de línea de comandos para hacer aprobaciones y depósitos. Esto se puede extender aún más para construir una interfaz integrada con el puente. Actualmente, depende de un único relayer, que no es seguro. Necesitamos un gran conjunto de relayers y un umbral alto para evitar cualquier tipo de centralización.

Puedes aprender más sobre estos contratos e implementaciones leyendo la documentación de
[ChainBridge](https://chainbridge.chainsafe.io/) de ChainSafe.