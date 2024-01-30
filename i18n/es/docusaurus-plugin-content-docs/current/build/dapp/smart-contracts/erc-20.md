---
tags: [Construir, Dapps]
description: Los tokens ERC-20 son el concepto más fundamental y esencial en Ethereum. Este mismo estándar de token se adopta en el ecosistema Avalanche.
sidebar_label: Crear un Token ERC-20
pagination_label: Crear un Token ERC-20 usando Solidity
---

# Crear un Token ERC-20 usando Solidity

[Los tokens ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) son el concepto más fundamental y esencial en Ethereum. A medida que la comunidad y el ecosistema Avalanche están creciendo, nuevos casos de uso y proyectos que se ejecutan en Ethereum u otras cadenas se implementarán en Avalanche.

Por lo tanto, estaremos creando nuestro propio token ERC-20 mintable y lo mintiremos a cualquier dirección que queramos. El token se generará en la cadena C de Avalanche y será accesible en esa cadena. Estamos utilizando la red de pruebas Fuji en este tutorial.

El artículo se centra en desplegar un contrato inteligente escrito con Solidity en Avalanche. Esta es la característica que Avalanche nos proporciona, poder desplegar cualquier contrato inteligente en la cadena y sin necesidad de un nuevo concepto de contrato específico de lenguaje para interactuar. Veamos cómo crear un contrato ERC-20 y desplegarlo en la cadena C de Avalanche.

## Configurar Core

Lo primero que debemos hacer es habilitar el modo de red de pruebas en Core. Para hacer eso, ve a **Configuración** y haz clic en **Avanzado**.

![Imagen de configuración 1](/img/c-chain-ERC20/settings1.png)

Aquí, activa la función de **Modo de Red de Pruebas**. Esto hará que Core cambie automáticamente a la red de pruebas Fuji.

![Imagen de configuración 2](/img/c-chain-ERC20/settings2.png)

:::info

Si estás usando otras billeteras, como MetaMask, puedes agregar la red de pruebas Fuji utilizando las siguientes especificaciones:

- **Nombre de Red**: Avalanche C-Chain
- **Nueva URL RPC**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
- **ChainID**: `43113`
- **Símbolo**: AVAX
- **Explorador**: [`https://testnet.snowtrace.io`](https://testnet.snowtrace.io/)

:::

La configuración está hecha. Por ahora, tenemos 0 AVAX.

## Financia tu Dirección en la C-Chain

Avalanche tiene un [Faucet](https://faucet.avax.network/) que gotea tokens de prueba a la dirección que elijas. Si ya tienes un saldo de AVAX mayor que cero en Mainnet, pega tu dirección de la C-Chain allí y solicita tokens de prueba. De lo contrario, por favor solicita un cupón de faucet en [Discord](https://discord.com/channels/578992315641626624/1193594716835545170).

## Crea un Token Mintable

Ahora, podemos crear nuestro token mintable en Remix. Abre Remix en tu navegador o ve a [este enlace](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Imagen para el post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Deberías ver esta página. En esta página, primero, haz clic en "SOLIDITY" de "Featured Plugins" y luego haz clic en el botón "New File". Cuando hagas clic en el botón New File, verás un pop-up que requiere un nombre de archivo. Puedes elegir un nombre o dejar el predeterminado.

Dado que usaremos un contrato ERC-20 de [OpenZeppelin](https://openzeppelin.com/contracts/), simplemente pega esta línea en el archivo y guárdalo.

```solidity
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![Imagen para el post](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Después de guardar el archivo, veremos un montón de archivos que se importan a Remix. Esta es una característica de Remix que nos permite importar un repositorio de contratos de GitHub a Remix simplemente dando el enlace de URL con una declaración de importación.

![Imagen para el post](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

Tenemos el archivo ERC20PresetMinterPauser.sol en los presets. Este archivo está escrito por OpenZeppelin de acuerdo con los estándares ERC20 con funcionalidad de minter. Después de desplegar este archivo, seremos los propietarios del contrato y, por lo tanto, tendremos la autoridad y la capacidad de mintir los tokens.

![Imagen para el post](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Despliega el Contrato

Abre la pestaña con la etiqueta `Solidity compiler` y selecciona la versión de Solidity que coincida con la versión de Solidity escrita en el archivo como `pragma solidity …..`. La versión debe ser igual o superior a la versión del archivo. Por ejemplo, en mi archivo, se escribe `pragma solidity ^0.6.0`, por lo que la versión requerida es 0.6.0 o superior. Como se muestra, en el compilador la versión de Solidity es 0.6.6, lo cual está bien. Después de verificar la versión de Solidity, haz clic en el botón de compilación. Si no cambiaste nada en el archivo, o la versión de Solidity no es incorrecta, el contrato debería compilar sin errores.

![Imagen para el post](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Luego, saltemos a la pestaña con la etiqueta `Deploy & run transactions`. Aquí, antes de desplegar nuestro contrato, debemos cambiar el entorno. Haz clic en el entorno y selecciona "Injected Web3". Si aparece un pop-up y te pide que conectes la cuenta, haz clic para conectar. Después, deberías ver la dirección de la cuenta en el cuadro de texto "CUENTA".

Lo último antes del proceso de despliegue es establecer el contrato que se desplegará como un token. Encima del botón de despliegue, hay un menú desplegable para seleccionar un contrato. Selecciona el contrato llamado `ERC20PresetMinterPauser.sol`.

![Imagen para el post](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Ahora, aquí ingresa el nombre y el símbolo de tu token. Yo lo llamaré "test" y el símbolo será `tst`. Puedes darle un nombre y hacer clic en el botón de transacción.

![Imagen para el post](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Después de hacer clic en el botón, aparecerá un pop-up y simplemente confírmalo.

![Confirmación de Core](/img/c-chain-ERC20/transaction-approval.png)

Y luego otro pop-up, una confirmación de Core, aparece. Confírmalo.

Después de confirmar todos estos pop-ups, hemos desplegado nuestro token en la cadena C de Avalanche. Así que podemos empezar a interactuar con él.

## Interactúa con el Token

Podemos ver nuestra transacción que se desplegó en la cadena C de Avalanche a través de este [explorador de la c-chain](https://testnet.snowtrace.io/).

Pero primero, veamos el hash de nuestra transacción desde la consola de Remix.

![Imagen para el post](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Después de desplegar el contrato, deberíamos ver un registro en la consola de Remix. Cuando hagas clic en la flecha y lo expandas, aparecerá un hash de transacción. Cópialo.

![Imagen para el post](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Simplemente pega el hash de transacción en el [explorador](https://testnet.snowtrace.io/) que compartí arriba y presiona enter.

Aquí podemos ver todos los detalles sobre la transacción y el contrato del token.

La primera imagen muestra la dirección de mi billetera que crea el token y la segunda dirección es la dirección de mi contrato de token que se llama "test". Ahora, vamos a crear algunos tokens en nuestra propia dirección.

Vuelve a Remix y después de desplegar, deberías poder ver el contrato en la sección "Contratos Desplegados".

Aquí, tenemos un montón de funciones que podemos usar para interactuar con nuestro contrato de token. Puedes revisar todos estos métodos en la documentación de OpenZeppelin para aprender cómo usarlos. Pero solo usaremos el método de creación de tokens (mint).

Haz clic en la flecha junto al método de mint para leerlo.

Ingresa tu dirección y una cantidad en wei. Por ejemplo, voy a crear 1000 tokens "tst", así que ingresé "1000000000000000000000".

## Agregar Token a Core

Ahora hemos creado 1000 tokens en nuestro contrato, pero no deberías poder ver los tokens en tu billetera Core. Para ver nuestro propio token, tenemos que agregarlo. En Core, haz clic en Avalanche C-Chain y luego selecciona Manage:

Haz clic en Agregar token personalizado. Aquí, ingresa la dirección del token que puedes ver en el explorador, como se mostró anteriormente. Copia y pega la dirección aquí. Luego haz clic en el botón Agregar token, deberías ver 1000 tokens con el nombre que le diste en tu billetera Core. Además, puedes enviarlo a otra cuenta tanto a través de Remix como de Core.