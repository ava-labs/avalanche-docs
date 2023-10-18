---
etiquetas: [Construir, Dapps]
descripción: En este documento, aprende cómo implementar y probar un contrato inteligente en Avalanche usando Remix y Core.
sidebar_label: Implementar con Remix IDE
pagination_label: Implementar un Contrato Inteligente en Avalanche Usando Remix y Core
---

# Implementar un Contrato Inteligente en Avalanche Usando Remix y Core

## Introducción

La Red Primaria de Avalanche es una Subred que tiene tres cadenas: P-Chain, X-Chain
y C-Chain. La C-Chain es una instancia de la Máquina Virtual Ethereum alimentada
por el protocolo de consenso Snowman de Avalanche. La [RPC de la C-Chain](/reference/avalanchego/c-chain/api.md) puede hacer todo lo que un cliente Ethereum típico puede hacer utilizando las llamadas RPC estándar de Ethereum. Los beneficios inmediatos de
usar la C-Chain en lugar de Ethereum son todos los beneficios de usar Avalanche. Estas propiedades podrían mejorar considerablemente el rendimiento de
las Dapps y la experiencia del usuario.

Hoy, implementaremos y probaremos un contrato inteligente en Avalanche usando Remix y Core Wallet.

## Paso 1: Configurar Core

Si aún no tienes una billetera Core, sigue esta
[guía](https://support.avax.network/en/articles/6100129-core-extension-how-do-i-create-a-new-wallet)
para crear una nueva billetera.

Si quieres usar la **C-Chain de Avalanche**, puedes seleccionarla de la lista de redes.

Para cambiar a la **red de prueba Fuji**, ve a Configuración, selecciona Avanzado y luego activa el Modo de Red de Prueba.

<div style={{textAlign: 'center'}}>

![testnet](/img/remix-core-guide/testnet.png)

</div>

Configuración de la **Red de Prueba Local (Avalanche Network Runner)**: [(Tutorial del Avalanche Network Runner)](/tooling/network-runner.md)

- **Nombre de la Red**: Avalanche Local C-Chain
- **Nueva URL RPC**:
  [http://127.0.0.1:34890/ext/bc/C/rpc](http://127.0.0.1:34890/ext/bc/C/rpc)
  (Nota: el número de puerto debe coincidir con tu configuración local, que puede ser diferente de 34890.)
- **ChainID**: `43112`
- **Símbolo**: `AVAX`
- **Explorador**: N/A

## Paso 2: Financiar tu Dirección de la C-Chain

### **Usando la Billetera Avalanche**

En la Mainnet, puedes usar la [Billetera Avalanche](https://wallet.avax.network/) para transferir fondos desde la X-Chain a tu dirección de la C-Chain. El proceso es sencillo, como se explica en este [tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet). La billetera también se puede usar en redes de prueba y locales.

### **Usando el Faucet de la Red de Prueba**

Para financiar en la red de prueba, puedes usar el Faucet de la Red de Prueba. Navega a [https://faucet.avax.network/](https://faucet.avax.network/) y pega tu dirección de la C-Chain. El Faucet sabrá automáticamente que necesita enviar los AVAX de prueba a la C-Chain. Haz clic en la casilla de verificación CAPTCHA y selecciona el botón 'Request AVAX'. Tu dirección recibirá AVAX de prueba en unos segundos.

### Financiamiento en la Red de Prueba Local

En una red local, puedes financiar fácilmente tus direcciones siguiendo [este](/build/subnet/hello-subnet.md#importing-the-test-private-key) tutorial.

## Paso 3: Conectar Core e Implementar un Contrato Inteligente Usando Remix

Abre [Remix](https://remix.ethereum.org/) -&gt; Selecciona Solidity

![Explorador de archivos de Remix](/img/remix-core-guide/remix.png)

Carga o crea los contratos inteligentes que queremos compilar e implementar usando el explorador de archivos de Remix.

Para este ejemplo, implementaremos un contrato simple de Hola Mundo desde [aquí](https://blog.chain.link/how-to-create-a-hello-world-smart-contract-with-solidity/).

![Contrato de hola mundo](/img/remix-core-guide/contract.png)

Selecciona la pestaña del compilador de Solidity y compila el contrato.

![Compilar contrato](/img/remix-core-guide/compile.png)

Navega a la pestaña Deploy & Run transactions -&gt; Abre el menú desplegable "ENVIRONMENT" y selecciona
Injected Provider (asegúrate de que Core esté cargado).

![Implementar y ejecutar transacciones](/img/remix-core-guide/provider.png)

Aparecerá una ventana emergente que preguntará qué billetera usar. Selecciona Core.

<div style={{textAlign: 'center'}}>

![Elegir billetera](/img/remix-core-guide/wallet.png)

</div>

Ahora, el contrato inteligente está compilado, Core está inyectado y estamos listos para
implementar nuestro contrato de Hola Mundo. Haz clic en "Deploy".

![Implementar hola mundo](/img/remix-core-guide/deploy.png)

Confirma la transacción en la ventana emergente de Core.

<div style={{textAlign: 'center'}}>

![Confirmar TX](/img/remix-core-guide/approve.png)

</div>

¡Nuestro contrato se ha implementado con éxito!

![Contrato implementado](/img/remix-core-guide/deployed.png)

Ahora, podemos expandirlo seleccionándolo de la pestaña "Deployed Contracts" y probarlo.

<div style={{textAlign: 'center'}}>

![Interactuar con el contrato](/img/remix-core-guide/interact.png)

</div>

La ABI y el Bytecode del contrato están disponibles en la pestaña del compilador de Solidity.

<div style={{textAlign: 'center'}}>

![ABI y bytecode](/img/remix-core-guide/ABI-bytecode.png)

</div>

Si tuviste alguna dificultad siguiendo este tutorial o simplemente quieres discutir
Avalanche con nosotros, ¡puedes unirte a nuestra comunidad en [Discord](https://chat.avalabs.org/)!