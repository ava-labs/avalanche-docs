---
description: 'Proporcionado por miembro de la Comunidad: Murat Çeliktepe.'

---

# Crear un Token ERC-20

Las fichas ERC-20 son el concepto más fundamental y esencial de Ethereum. A medida que la comunidad de Avalanche y el ecosistema están creciendo, los nuevos casos de uso y proyectos que se están ejecutando en Ethereum o cadenas diferentes se implementarían a Avalanche. El estándar de token que se usaría para los proyectos no es específico y todos pueden crear su propio estándar y propio token.

Por lo tanto, vamos a crear nuestra propia ficha ERC-20 minable y la mentaremos a cualquier dirección que queramos. La ficha se generará en la cadena C de Avalanche y será accesible en esa cadena.

Lo que tenemos que considerar principalmente es que implementaremos un contrato inteligente escrito con Solidez a Avalanche. Esta es la característica que Avalanche nos proporciona para poder implementar cualquier contrato inteligente en la cadena y no requiere que un nuevo concepto de contrato específico para interactuar. Veamos cómo crear un contrato ERC-20 y lo desplegaremos a avalancha C-Chain.

## Configurar Metamask

Lo primero que deberíamos establecer es una cartera de metamask

![Imagen para post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Haga clic para el icono de metamask en el navegador y seleccione el menú desplegable de red. Aquí deberíamos conectarnos con C-Chain. Haga clic en "Personalizado RPC".

![Imagen para post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Ahora, necesitamos establecer estas cajas con valores correctos.

* **Nombre de la red**: Avalanche C-Chain
* **Nueva URL de RPC**:
   * **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
   * **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
   * **Testnet:** [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:
   * **Mainnet:** `43114`
   * **Fuji Testnet:** `43113`
   * **Testnet:** `43112`
* **Símbolo**: AVAX
* **Explorador**
   * **Mainnet:** [Mainnet: red](https://cchain.explorer.avax.network/)
   * **Fuji Testnet:** [Testnet:](https://cchain.explorer.avax-test.network/)
   * **Localnet:** n/a

![Imagen para post](../../../.gitbook/assets/erc20-metamask.png)

Después de configurar todos los parámetros correctamente, deberíamos ver esta página. Por ahora, tenemos 0 AVAX.

## Fondo su dirección de cadena C

Dependiendo de la red utilizada, hay tres maneras de obtener fondos a su dirección de cadena C.

### **Usando Avalanche Wallet**

En la red principal, puede utilizar la [Cartera Avalanche](https://wallet.avax.network/) para transferir fondos de la cadena X a su dirección de cadena C. El proceso es simple, como se explica en este [tutorial](../platform/transfer-avax-between-x-chain-and-c-chain.md). La cartera también se puede utilizar en las redes locales y de prueba.

### **Utilizando el grifo de red de prueba**

Para obtener financiación en la red de pruebas, también puede utilizar el Grifo de Red de Pruebas. Navega a [https://faucet.avax-test.network/](https://faucet.avax-test.network/) y pegue su dirección de cadena C.

### Financiación de testnet local

En una red local, puede financiar fácilmente sus direcciones desplegando su propio grifo. [Tutorial](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Vamos a [avax grifo](https://faucet.avax-test.network/) y Let’s nuestra dirección de cadena C, para exmaple "0xfe8886bec537252040Dff36448C0F104Be635650".

![Imagen para post](../../../.gitbook/assets/erc20-faucet.png)

Después de copiar y pegar la dirección aquí, haga clic en la solicitud 20 AVAX. Esta muestra de grifo de prueba no tiene valor, es solo para fines de desarrollo.

Luego revise el equilibrio de la cartera y debe tener alguna muestra de prueba en su metamask.

## Crear una ficha minable

Ahora, podemos crear nuestra ficha minable en Remix. Abra Remix en su navegador o vaya a [este enlace](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Imagen para post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

Deberías ver esta página. En esta página, primero haga clic en "SOLIDITY" de "Featured Plugins" y luego haga clic en el botón "Nuevo Archivo". Cuando haga clic en el botón Nuevo Archivo, verá un archivo emergente que requiere un nombre de archivo. Puede elegir un nombre o dejar el defecto.

Dado que usaremos un contrato ERC-20 de [OpenZeppelin](https://openzeppelin.com/contracts/), simplemente pega esta línea en el archivo y guardar.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
```

![Imagen para post](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

Después de guardar el archivo, veremos un montón de archivos que se importan a remezclar. Esta es una característica remix que nos permite importar un repositorio de contrato de GitHub para remix simplemente dándole el URL-Link. con una declaración de importación.

![Imagen para post](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

Tenemos el archivo ERC20PresetMinterPauser.sol en los preestablecidos. Este archivo está escrito por OpenZeppelin de acuerdo con los estándares ERC20 con funcionalidad de minter. Después de desplegar este expediente, seremos el propietario del contrato y por lo tanto tendremos la autoridad y capacidad de acuñar las fichas de la red.

![Imagen para post](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Despliegue del Contrato

Abra la segunda pestaña que es "SOLIDITY COMPILER" y seleccione la versión de solidez que coincide con la versión de solidez escrita en el archivo como "pragma solidity …..". La versión debe ser igual o superior a la versión del archivo. Por ejemplo, en mi archivo, "pragma solidity ^0.6.0" se escribe por lo que la versión requerida es 0.6.0 o superior. Como se muestra en el compilador, la versión de solidez es 0.6.6, que está bien. Después de comprobar la versión de solidez haga clic en el botón de compilar. Si no cambiaste nada en el archivo, o la versión de solidez no está mal, el contrato debería compilar sin ningún error.

![Imagen para post](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Luego, saltemos a la tercera pestaña que es DESPLEGAR Y EJECUTAR TRANSACCIÓN. Aquí antes de implementar nuestro contrato, deberíamos cambiar el entorno. Haga clic en el entorno y seleccione "Inyectado Web3". Si aparece un emergente, y le pide que conecte la cuenta, haga clic para conectarse. Después, debe ver la dirección de la cuenta en el cuadro de texto "CUENTA".

Lo último antes del proceso de despliegue es establecer el contrato que se desplegará como token. Por encima del botón Desplegar, hay un menú desplegable para seleccionar un contrato. Seleccione el contrato llamado "ERC20PresetMinterPauser.sol".

![Imagen para post](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Ahora, aquí entra el nombre y el símbolo de tu token. Lo llamaré "prueba" y el símbolo será "tst". Puede darle un botón y hacer clic para transact

![Imagen para post](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

Después de hacer clic en el botón, aparecerá un emergente, y simplemente confirme él.

![Imagen para post](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

Y luego aparece otra confirmación, una confirmación de metamask Confirmarlo.

Después de confirmar todos estos pop-ups hemos desplegado nuestro token a avalancha C-Chain. Así que podemos empezar a interactuar con él.

## Interactuar con Token

Podemos ver nuestra transacción que se desplegó en avalancha C-Chain a través de este [explorador de cadena c](https://cchain.explorer.avax-test.network/).

Pero en primer lugar, veamos nuestra transacción hash desde la consola remix.

![Imagen para post](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

Después de implementar el contrato, deberíamos ver una consola de remix. Cuando haga clic para flechas y expandirla, se subirá una hash de transacción. Copiarlo.

![Imagen para post](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Simplemente pega el hash de la transacción al [explorador](https://cchain.explorer.avax-test.network/) que compartí arriba y presione entrar.

![Imagen para post](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Aquí podemos ver todos los detalles sobre la transacción y el contrato de token.

![Imagen para post](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

La primera es mi dirección de billetera que crea token y la segunda dirección es mi dirección de contrato token que se llama "prueba". Ahora, vamos a poner un poco de token a nuestra propia dirección.

![Imagen para post](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Vuelve a la remix y después de desplegar, deberías poder ver el contrato en la sección "Contratos desplegados".

Aquí, tenemos un montón de funciones que podemos utilizar para interactuar con nuestro contrato de tokken. Puede comprobar todos estos métodos de documentación de OpenZeppelin para aprender a usarlos. Pero solo usaremos el método de la menta.

Haga clic en la flecha junto al método de menta para leerlo.

![Imagen para post](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Introduzca su dirección y una cantidad en WEI. Por ejemplo, voy a mentir 1000 tst token así que, entré "100"

![Imagen para post](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Añadir Token a Metamask

Ahora hemos acuñado 1000 token a nuestro contrato, pero no deberías poder ver las fichas en tu cartera. Para ver nuestra propia tokken, tenemos que agregarlo. En metamask, haga clic en el botón "Agregar Token" y seleccione "Custom Token" lengüeta.

Aquí ingrese la dirección de símbolo que usted puede ver desde el explorador como mostré arriba. Copia y pégalo aquí. Luego haga clic en el botón Siguiente, debe ver 1000 token que usted nombró en su cartera de metamask Además, puede enviarla a otra cuenta a través de remix o metamask.

