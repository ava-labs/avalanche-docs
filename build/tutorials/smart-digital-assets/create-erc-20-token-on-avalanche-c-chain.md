---
description: 'Proporcionada por el miembro comunitario: Murat Çeliktepe.'
---

# Crear un Token ERC-20

Los tokens ERC-20 son el concepto más fundamental y esencial en Ethereum. A medida que la comunidad de Avalanche y el ecosistema crecen, se implementarán nuevos casos de uso y proyectos que están funcionando en Ethereum o en diferentes cadenas. El estándar de tokens que se utilizaría para los proyectos no es específico y cada uno puede crear su propio estándar y su propio token.

Por lo tanto, crearemos nuestro propio token ERC-20 y lo acuñaremos en cualquier dirección que queramos. El token se generará en la C-Chain de Avalanche y será accesible en esa cadena.

Lo que tenemos que considerar principalmente es que desplegaremos un smart contract escrito con Solidity en Avalanche. Esta es la característica que nos proporciona Avalanche: Poder desplegar cualquier smart contract en la cadena y no es necesario que interactúe con un nuevo concepto de contrato específico del lenguaje. Veamos cómo crear un contrato ERC-20 y desplegarlo en la C-Chain de Avalanche.

## Configurar Metamask

Lo primero que debemos configurar es una wallet de metamask.

![Imagen para correo](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Haz clic en el icono de metamask del navegador y selecciona el menú desplegable de la red. Aquí debemos conectarnos a la C-Chain. Haz clic en "RPC personalizado".

![Imagen para correo](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Ahora, tenemos que ajustar estas casillas con los valores correctos.

* **Nombre de la **red: Avalanche C-Chain
* **Nueva **URL:
   * **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
   * **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
   * **Testnet: **[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:
   * **Mainnet:**`43114`
   * **Fuji Testnet:**`43113`
   * **Testnet local:**`43112`
* ****Símbolo: AVAX
* ****Explorador
   * **Mainnet:** [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/)
   * **Fuji Testnet:** [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)
   * **Localnet:** n/a

![Imagen para correo](../../../.gitbook/assets/erc20-metamask.png)

Después de configurar todos los parámetros correctamente, deberíamos ver esta página. Por ahora, tenemos 0 C-AVAX.

## Agrega fondos a tu dirección de la C-Chain

Dependiendo de la red utilizada, hay tres maneras de hacer llegar los fondos a su dirección de la C-Chain.

### **Usar billetera de Avalanche**

En la red principal, puedes usar la [billetera](https://wallet.avax.network/) de Avalanche para transferir fondos de la X-Chain a tu dirección de C-Chain El proceso es simple, como se explica en este [tutorial](../platform/transfer-avax-between-x-chain-and-c-chain.md). La wallet puede ser usada en redes locales y de pruebas.

### **Usar Faucet de red de pruebas**

Para la agregar fondos en la red de pruebas, también puedes utilizar el Faucet de la Red de Pruebas. Navega a [https://faucet.avax-test.network/](https://faucet.avax-test.network/) y pega tu dirección C-Chain.

### Agregando Fondos en la Red de Pruebas Local

En una red local, puedes agregar fondos fácilmente a tus direcciones desplegando su propio faucet. [Tutorial](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Vamos a [avax faucet](https://faucet.avax-test.network/) y pegamos nuestra dirección C-Chain para exmaple "0xfe8886bec537252040Dff36448C0F104Be635650".

![Imagen para correo](../../../.gitbook/assets/erc20-faucet.png)

Después de copiar y pegar la dirección aquí, haz clic en request 2.0000 C-AVAX. Este token de prueba del faucet no tiene ningún valor, es sólo para fines de desarrollo.

Entonces comprueba el balance de tu wallet y deberías tener algunos tokens de prueba en metamask.

## Crear Mint Token

Ahora podemos crear nuestro Mint Token en Remix. Abre Remix en tu navegador o ve a [este enlace](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Imagen para correo](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Deberías ver esta página. En esta página, primero, haz clic en "SOLIDity" de "Plugins destacados" y luego haz clic en el botón "Nuevo archivo". Al hacer clic en el botón "Nuevo Archivo", verás un pop-up que requiere un nombre de archivo. Puedes elegir un nombre o dejar el predeterminado.

Ya que usaremos un contrato de ERC-20 de [OpenZeppelin](https://openzeppelin.com/contracts/), solo pega esta línea al archivo y salva.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![Imagen para correo](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Después de guardar el archivo, veremos un montón de archivos que se importan a Remix. Esta es una característica de Remix que nos permite importar un repositorio de contratos GitHub a Remix con sólo dar el URL-Link con una declaración de importación.

![Imagen para correo](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

Tenemos el archivo ERC20PresetMinterPauser.sol en los presets. Este archivo está escrito por OpenZeppelin de acuerdo con los estándares ERC20 con funcionalidad minter. Después de desplegar este archivo, seremos los dueños del contrato y tendremos la autoridad y la capacidad de acuñar los tokens que queramos.

![Imagen para correo](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Desplegar el Contrato

Abre la segunda pestaña que es "SOLIDity COMPILER" y selecciona la versión de solidity que coincide con la versión de solidity escrita en el archivo como "pragma solidity …..". La versión debe ser igual o mayor que la versión del archivo. Por ejemplo, en mi archivo, "pragma solidity ↑0.6.0" está escrito de modo que la versión requerida es 0.6.0 o superior. Como se muestra, en el compilador, la versión de solidity es 0.6.6, lo que está bien. Después de comprobar la versión de solidity haz clic en el botón de compilar. Si no has cambiado nada en el archivo o la versión de solidity no está mal, no deberías obtener un error.

![Imagen para correo](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Entonces, vayamos a la tercera pestaña que es DEPLOY & RUN TRANSACTION. Aquí, antes de desplegar nuestro contrato, debemos cambiar el entorno. Haz clic en el entorno y selecciona "Web inyectada Si aparece un pop-up que le pide que conecte la cuenta, haga clic en conectar. Después, deberías ver la dirección de cuenta en el cuadro de texto "CUENTA".

Lo último antes del proceso de despliegue es establecer el contrato que se desplegará como un token. Sobre el botón Deploy, hay un menú desplegable para seleccionar un contrato. Selecciona el contrato denominado "ERC20PresetMinterPauser.sol".

![Imagen para correo](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Ahora, aquí introduce el nombre y el símbolo de tu Token. Lo nombraré "prueba" y el símbolo será "tst". Puedes darle al botón transact para hacer la transacción.

![Imagen para correo](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Después de hacer clic en el botón, un pop-up aparecerá y lo confirmaremos.

![Imagen para correo](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

Aparecerá otro pop-up, una confirmación de metamask. Confírmala.

Después de confirmar todos estos pop-ups hemos desplegado nuestro Token para la C-Chain de Avalanche. Así que podemos empezar a interactuar con el.

## Interactuar con el Token

Podemos ver nuestra transacción que se desplegó en la C-Chain de avalanche a través de este [explorador de la](https://cchain.explorer.avax-test.network/) c-chain.

Pero primero, veamos el hash de nuestra transacción desde la consola de Remix.

![Imagen para correo](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Después de desplegar el contrato, deberíamos ver un registro en la consola de remix. Cuando haga clic en la flecha y la expanda, aparecerá un hash de transacción. Cópialo.

![Imagen para correo](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Solo pega la transacción hash al [explorador](https://cchain.explorer.avax-test.network/) que compartí arriba y presiona entrar.

![Imagen para correo](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Aquí podemos ver todos los detalles sobre la transacción y el contrato del token.

![Imagen para correo](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

La primera es mi dirección de billetera que crea token y la segunda dirección es mi dirección de contrato de token que se denomina "prueba". Ahora, acuñemos algunos tokens para nuestra dirección.

![Imagen para correo](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Regresa al remix y después de implementar, deberías ser capaz de ver el contrato en la sección "contratos desplegados".

Aquí tenemos un montón de funciones que podemos usar para interactuar con el contrato de nuestro token. Puedes revisar todos estos métodos en la documentación de OpenZeppelin para aprender a usarlos. Pero sólo usaremos el método mint.

Haz clic en la flecha junto al método mint para leerlo.

![Imagen para correo](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Introduce tu dirección y una cantidad en WEI. Por ejemplo, acuñaré 1000 tst de token así, entré en "100"

![Imagen para correo](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Añadir Token a Metamask

Ahora acuñamos 1000 tokens a nuestro contrato, pero no deberías poder ver los tokens en tu wallet de metamask. Para ver nuestro propio token, tenemos que agregarlo. En metamask, haz clic en el botón "Agregar Token" y selecciona la pestaña "Token personalizados".

Aquí introduce la dirección del token que puedes ver desde el explorador como mostré anteriormente. Copia y pégala aquí. Luego haz click en el botón "Next", deberías ver 1000 tokens que nombraste en tu wallet de metamask. También, puedes enviarlo a otra cuenta a través de Remix o de metamask.

