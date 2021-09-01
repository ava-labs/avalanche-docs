# Usar Wrapped AVAX \(WAVAX\) en Avalanche

## Que es WAVAX?

[AVAX](../../../#avalanche-avax-token) es el token nativo en la [plataforma de Avalanche](../../../learn/platform-overview/). Muchos contratos inteligentes en la blockchain de [contratos \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain), que es una instancia de la máquina virtual de Ethereum están diseñados para trabajar con los tokens de ERC-20 de Ethereum de Ethereum. Para poder usar AVAX en tales contratos, debes usar wrapped AVAX \(WAVAX\), el cual es compatible con ERC-20.

## Resumen

Para convertir AVAX en WAVAX depositarás AVAX en un smart contract que bloqueará los AVAX y te entregará WAVAX. Para convertir WAVAX en AVAX, devolverás los WAVAX al smart contract, que hará burn de los WAVAX y devolverá tus AVAX.

En este tutorial podrás:

* Conectar Metamask a Avalanche
* Agregar fondos a tu cuenta de Metamask
* Cargar el contrato de WAVAX en Remix
* Conectar con el contrato de WAVAX pre-desplegado
* Convertir AVAX en WAVAX y viceversa
* Añade WAVAX como un token personalizado a Metamask

## Conectar Metamask

[Metamask](https://metamask.io/) es una extensión de navegador web popular que hace que sea fácil interactuar con Ethereum y blockchains compatibles, como la C-Chain. Avalanche. Configurar Metamask y crear una cuenta en él está fuera del alcance de este tutorial, pero hay una serie de recursos en Internet para guiarte a través de eso.

Después de entrar en tu cuenta de Metamask, conéctala a la red de Avalanche. Haz clic en el menú desplegable de la red -> Selecciona RPC ****personalizado:

![Desertificación de la red metamask](../../../.gitbook/assets/image%20%2860%29.png)

Introduce la información de la red de tu elección:

### Configuración de la Red Principal de Avalanche:

* **Nombre de la **red: Avalanche Mainnet C-Chain
* **Nuevo RPC **URL: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**:`43114`
* ****Símbolo:`AVAX`
* **Explorador de **ello: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Configuración de la Red de Pruebas Fuji:

* **Nombre de la **red: Avalanche C-Chain
* **Nuevo RPC **URL: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**:`43113`
* ****Símbolo:`AVAX`
* **Explorador de **ello: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

Después de guardar los cambios, selecciona la red de Avalanche que acabas de especificar. Deberías ver tu balance de AVAX, que probablemente será 0.

## Agrega Fondos a tu Cuenta de la C-Chain

Necesitas agregar algo de AVAX en tu cuenta.

### **Usar la billetera de Avalanche**

Si ya tienes algún AVAX, puedes transferirlos a la cuenta de Metamask usando tu [Billetera](https://wallet.avax.network/) de Avalanche. Puedes ver dónde están tus fondos seleccionando **el desglose en el panel **de billetera que muestra tu equilibrio. Si ya no tienes los fondos en la C-Chain necesitas hacer una [transferencia](../platform/transfer-avax-between-x-chain-and-c-chain.md) de Cross para mover tu AVAX de X-Chain a C-Chain.

Después de tener fondos en la C-Chain, selecciona **Send **en el menú de lado izquierdo en la billetera, y luego cambia la cadena de origen al contrato ****C. En el **campo de **dirección pega tu dirección de Metamask. **Ingresa la cantidad de enviar y hacer clic en **Confirma y luego Envía ****enviar.

![Enviar a Metamask](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Los fondos pronto estarán visibles en su cuenta de Metamask.

### **Usar el Faucet de la red de pruebas**

Si estás conectado a la red de pruebas, puedes usar su faucet para agregar fondos a tu cuenta de Metamask. Navega al [faucet](https://faucet.avax-test.network/) y pega tu dirección de Ethereum, que se muestra por debajo del nombre de la cuenta en Metamask \(por `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`ejemplo\). Cuando hagas click en el nombre de la cuenta, copiará la cuenta al portapapeles.

![Financiación de Faucet](../../../.gitbook/assets/wavax2avax-02-faucet.png)

Pega esa dirección en el faucet, prueba que no eres un robot, y luego solicita los AVAX de prueba. Deberían aparecer en tu Metamask en breve.

## Cargar contrato de WAVAX en Remix

Remix es una popular herramienta basada en un navegador para escribir, desplegar e interactuar con smart contracts. Naviate al [sitio web de Remix](https://remix.ethereum.org/). Desplázate hacia abajo hasta que veas las opciones para importar smart contracts.

![Importación de GitHub](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

Selecciona ****GitHub, y en la pasta de campo de entrada `https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol`y selecciona **OK.** Eso cargará el contrato en Remix.

![Explorador de archivos](../../../.gitbook/assets/wavax2avax-04-contract.png)

Conmutando a la pestaña Explorador de archivos en la izquierda y selecciona `WAVAX.sol`, que es el contrato que acabamos de cargar.

En el menú de la izquierda, cambia a la pestaña Compile:

![Compilar](../../../.gitbook/assets/wavax2avax-05-compile.png)

Comprueba que la versión del compilador es compatible con el contrato, como se muestra. Prensa Compile WAVAX.sol y **comprueba que el contrato de **WAVAX ha aparecido en el `CONTRACT`campo de abajo. Ahora estás listo para conectarte al contrato WAVAX, que ya ha sido desplegado en la red de Avalanche.

## Conecta con el contrato de WAVAX

Cambia a la **pestaña **Implementar y ejecutar Tranasactions en el lado izquierdo.

![Conectar](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Asegúrate de estar conectado a tu Metamask. En el menú **desplegable de Medio **Ambiente, selecciona `Injected Web3`. Metamask te pedirá que selecciones la cuenta. Elige la que está conectada a Avalanche y permite que se conecte. Esto will el campo de la ****cuenta. Asegúrate de que el campo **de **contrato esté fijado en el `WAVAX`contrato. Ahora podemos conectarnos al contrato, que ya ha sido publicado en Avalanche. En el campo de **edición **de direcciones

* Para Mainnet:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Para Fuji Testnet:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Después de pegar la dirección, presiona el **botón de **At

Remix debería encontrar el contrato desplegado:

![Conectar](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

Ahora estamos listos para interactuar con el contrato. Abre la interfaz del contrato pulsando la flecha resaltada.

## Emitir Comandos para el Contrato de WAVAX

¡Hagamos wrap a algunos AVAX!

Dado que ETH se denomina en 10^18 unidades más pequeñas \(wei\), y AVAX se denomina en 10^9, cambia el selector de valor de `wei`a `gwei`\(gigawei\). 1 gwei = 10^9 wei = 10^9 wei = 1 nAVAX.

![Interacción](../../../.gitbook/assets/wavax2avax-08-interact.png)

### Hacer Wrap a AVAX para Crear WAVAX

`10000000000`****Para envolver 10 AVAX, introduce \(10 ^10\) gwei en el campo de Value. Para iniciar la envoltura, haz clic en ****Deposit. Se te presentará un aviso de Remix para confirmar la transacción. Cuando presionas **Confirma **Metamask aparecerá, también pidiendo confirmación. Prensa **Confirma **en Metamask, también. Deberías notar que tu balance de AVAX se redujo a 10, más la cantidad de la comisión. Pasa a la siguiente sección para ver tu WAVAX en Metamask.

## Agrega WAVAX a Metamask

Para ver su balance de WAVAX, debe agregar WAVAX como una ficha personalizada a Metamask. En Metamask, selecciona los tres puntos al lado de tu nombre de cuenta y selecciona `Expand View`. Esto abre una nueva pestaña de navegador. Desplácese hacia abajo y selecciona **Agregar **token. **Cambia a la **pestaña de Token

![Token personalizadas](../../../.gitbook/assets/wavax2avax-10-add-token.png)

**En la dirección de contrato de **Token

* Para la red principal:`0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Para la red de prueba de Fuji:`0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Haz clic en **Siguiente **y **añade **Tokens. Tus WAVAX deberían ser visibles ahora debajo de tu cuenta en Metamask.

### Hacer Unwrap de WAVAX a AVAX

Para desenvolver WAVAX, expande la flecha al lado de **Retirar **botón:

![Retirar](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

`10000000000000000000`Desafortunadamente, el campo de retiro se denomina en wei, por lo que 10 AVAX está representado como \(10 ^19\) para la cantidad de retirada. Presionar **Transact **desencadenará la misma confirmación primero en Remix, luego en Metamask. Tus AVAX deberían estar de vuelta en la cuenta, menos la cantidad de la comisión.

## Conclusión

Ahora puedes interactuar con smart contracts en la C-Chain de Avalanche con WAVAX, la versión ERC-20 de AVAX. En el futuro, la conversión entre AVAX y WAVAX será significativamente más sencilla, con soporte incorporado en la Wallet y los Exchanges, pero mientras tanto, todavía puede acceder a los DEX, puentes y otros contratos basados en Solidity en la Plataforma de Avalanche.

