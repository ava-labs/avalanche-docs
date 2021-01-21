# Usar Wrapped AVAX \(WAVAX\) en Avalanche

## Que es WAVAX?

[AVAX](../../../#avalanche-avax-token) es el token nativo de la  [Plataforma Avalanche ](../../../learn/platform-overview/). Muchos smart contracts en la [Contract Chain \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain), que es una instancia de la Ethereum Virtual Machine, están diseñados para trabajar con Tokens ERC-20 de Ethereum. Para poder usar AVAX en tales contratos, debes usar wrapped AVAX \(WAVAX\), el cual es compatible con ERC-20.

## Descripción

Para convertir AVAX en WAVAX depositarás AVAX en un smart contract que bloqueará los AVAX y te entregará WAVAX. Para convertir WAVAX en AVAX, devolverás los WAVAX al smart contract, que hará _burn_ de los WAVAX y devolverá tus AVAX.

En este tutorial podrás:

* Conectar Metamask a Avalanche
* Agregar fondos a tu cuenta de Metamask
* Cargar el contrato de  WAVAX en Remix
* Conectar con el contrato de WAVAX pre-desplegado
* Convertir AVAX en WAVAX y viceversa
* Añade WAVAX como un token personalizado a Metamask

## Conectar Metamask

[Metamask](https://metamask.io/) es una popular extensión del navegador web que facilita la interacción con Ethereum y blockchains compatibles, como la C-Chain de Avalanche. Configurar Metamask y crear una cuenta en él está fuera del alcance de este tutorial, pero hay una serie de recursos en Internet para guiarte a través de eso.

Después de entrar en tu cuenta de Metamask, conéctala a la red de Avalanche. Haz clic en el menú desplegable de **Network** -&gt; Selecciona **Custom RPC**:

![metamask network dropdown](../../../.gitbook/assets/metamask-network-dropdown.png)

Introduce la información de la red de tu elección:

### Configuración de la Red Principal de Avalanche:

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `0xa86a`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Configuración de la Red de Pruebas Fuji:

* **Network Name**: Avalanche Fuji C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `0xa869`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

Después de guardar los cambios, selecciona la red de Avalanche que acabas de especificar. Deberías ver tu balance de AVAX, que probablemente será 0.

## Agrega Fondos a tu Cuenta de la C-Chain

Necesitas agregar algo de AVAX en tu cuenta.

### **Usando la Wallet de Avalanche**

Si ya tienes algunos AVAX, puedes transferirlos a la cuenta de Metamask usando tu [Wallet de Avalanche](https://wallet.avax.network/). Puedes ver dónde están tus fondos seleccionando **show breakdown** en el panel de la wallet que muestra tu saldo. Si aún no tienes los fondos en la C-Chain necesitas hacer una [Transferencia de Cross Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md), para mover tus AVAX de la X-Chain a la C-Chain.

Después de tener los fondos en la C-Chain, selecciona **Send** en el menú de la izquierda en la Wallet,  y luego cambie la cadena de origen a **C Contract**. En el campo **To Address** pega tu dirección de Metamask. Introduce el monto a enviar y haz click en **Confirm** y ahora en **Send**.

![Send to Metamask](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Los fondos pronto estarán visibles en su cuenta de Metamask.

### **Usando el Faucet de la Red de Pruebas**

Si estás conectado a la red de pruebas, puedes usar su faucet para agregar fondos a tu cuenta de Metamask. Ve a [el faucet](https://faucet.avax-test.network/) y pega tu dirección de Ethereum, que se muestra debajo del nombre de la cuenta en Metamask \(Por ejemplo`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`\). Cuando hagas click en el nombre de la cuenta, copiará la cuenta al portapapeles.

![Faucet funding](../../../.gitbook/assets/wavax2avax-02-faucet.png)

Pega esa dirección en el faucet, prueba que no eres un robot, y luego solicita los AVAX de prueba. Deberían aparecer en tu Metamask en breve.

## Cargar contrato de WAVAX en Remix

Remix es una popular herramienta basada en un navegador para escribir, desplegar e interactuar con smart contracts. Navega hasta el [Website de Remix](https://remix.ethereum.org/). Desplázate hacia abajo hasta que veas las opciones para importar smart contracts.

![Import from GitHub](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

Selecciona **GitHub**, y en el campo de entrada pega `https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol` y selecciona **OK**. esto cargará el smart contract en Remix.

![File Explorer](../../../.gitbook/assets/wavax2avax-04-contract.png)

Cambia a la pestaña del **File Explorer** a la izquierda y selecciona  `WAVAX.sol, que es el contrato que acabamos de cargar.

En el menú de la izquierda, cambia a la pestaña **Compile**:

![Compile](../../../.gitbook/assets/wavax2avax-05-compile.png)

Comprueba que la versión del compilador es compatible con el contrato, como se muestra. Presiona **Compilar WAVAX.sol**, y comprueba que el contrato WAVAX ha aparecido en el campo `CONTRACT` de abajo. Ahora estás listo para conectarte al contrato WAVAX, que ya ha sido desplegado en la red de Avalanche.

## Conecta con el contrato de WAVAX

Cambiate a la pestaña **Deploy & Run Tranasactions** en el lado izquierdo.

![Connect](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Asegúrate de estar conectado a tu Metamask. En el menú desplegable de **Environment**, selecciona `Injected Web3`.  Metamask te pedirá que selecciones la cuenta. Elige la que está conectada a Avalanche y permite que se conecte. Esto rellenará el campo **Cuenta**. Asegúrate de que el campo **Contract** está configurado para el contrato `WAVAX`. Ahora podemos conectarnos al contrato, que ya ha sido publicado en Avalanche. En el campo de edición **At Address**, copia:

* Para la Red Principal: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Para la Red de Pruebas Fuji: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Después de pegar la dirección, pulsa el botón **At Address**.

Remix debería encontrar el contrato desplegado:

![Connect](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

Ahora estamos listos para interactuar con el contrato. Abre la interfaz del contrato pulsando la flecha resaltada.

## Emitir Comandos para el Contrato de WAVAX

¡Hagamos wrap a algunos AVAX!

Como ETH está denominado en 10^18 unidades más pequeñas \(wei\), y AVAX está denominado en 10^9, cambiar el selector de valores de `wei` a`gwei` \(gigawei\). 1 gwei = 10^9 wei = 1 nAVAX.

![Interaction](../../../.gitbook/assets/wavax2avax-08-interact.png)

### Hacer Wrap a AVAX para Crear WAVAX

Para hacer wrap a 10 AVAX, introduce`10000000000` \(10^10\) gwei en el campo **Value**. Para iniciar el wrapping, haz click en **Deposit**. Se te presentará un aviso de Remix para confirmar la transacción. Cuando presiones **Confirm**, en Metamask aparecerá un pop-up de Metamask también pidiendo confirmación. Presiona **Confirm** en Metamask. Deberías notar que tu balance de AVAX se redujo a 10, más la cantidad de la comisión. Pasa a la siguiente sección para ver tu WAVAX en Metamask.

## Agrega WAVAX a Metamask

Para ver su balance de WAVAX, debe agregar WAVAX como una ficha personalizada a Metamask. En Metamask, selecciona los tres puntos junto a su nombre de cuenta y selecciona `Expand View`. Esto abre una nueva pestaña del navegador. Desplácese hacia abajo y seleccione **Add token**. Cambie a la pestaña **Custom Token**.

![Custom Token](../../../.gitbook/assets/wavax2avax-10-add-token.png)

En **Token Contract Address** pegue la misma dirección de contrato que usamos antes:

* Para la Red Principal: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* Para la Red de Pruebas Fuji: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Haz click en **Next** y en **Add Tokens**. Tus WAVAX deberían ser visibles ahora debajo de tu cuenta en Metamask.

### Hacer Unwrap de WAVAX a AVAX

Para hacer unwrap de WAVAX, expande la flecha junto al botón **Withdraw**:

![Withdraw](../../../.gitbook/assets/wavax2avax-09-withdraw.png)
Desafortunadamente, el campo **withdraw** se denomina en wei, por lo que 10 AVAX se representan como `10000000000000000000` \(10^19\) para el monto de **withdraw**. Presionando **Transact** provocará la misma confirmación primero en  Remix, luego en Metamask. Tus AVAX deberían estar de vuelta en la cuenta, menos la cantidad de la comisión.

## Conclusión

Ahora puedes interactuar con smart contracts en la C-Chain de Avalanche con WAVAX, la versión ERC-20 de AVAX. En el futuro, la conversión entre AVAX y WAVAX será significativamente más sencilla, con soporte incorporado en la Wallet y los Exchanges, pero mientras tanto, todavía puede acceder a los DEX, puentes y otros contratos basados en Solidity en la Plataforma de Avalanche.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1NDM0NDcyNTksLTIzMDAyOTExNSwxMT
c0Mzk2OTQwLDQ3NzM3NzkzNCwtMzY5MjMyOTk4LDExNzcyNjY5
NDgsMTcwNDU1Mjc3OCwxNjY4OTM0MjQ4LC0xMTgyNTczMjUwLD
Y3OTY3NjcwOSwtMTg2ODU1NDE1OV19
-->