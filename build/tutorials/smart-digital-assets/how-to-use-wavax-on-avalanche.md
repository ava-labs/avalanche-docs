# Utilice AVAX envuelta \(WAVAX\) en Avalanche

## ¿Qué es WAVAX?

[AVAX](../../../#avalanche-avax-token) es el símbolo nativo de la [plataforma Avalanche](../../../learn/platform-overview/). Muchos contratos inteligentes en la [cadena de contrato \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain), que es una instancia de la Máquina Virtual Ethereum, están diseñados para trabajar con las fichas ERC-20 de Ethereum. Para utilizar AVAX en tales contratos, debe utilizar AVAX \(WAVAX\), que es compatible con ERC-20.

## Descripción general

Para convertir AVAX a WAVAX depositará AVAX en un contrato inteligente que bloqueará el AVAX y le emitirá WAVAX. Para convertir WAVAX a AVAX, devolverá la WAVAX al contrato inteligente, que quemará la WAVAX y devolverá su AVAX.

En este tutorial, usted será:

* Conecte Metamask a Avalanche
* Fondo tu cuenta de Metamask
* Cargar el contrato WAVAX en Remix
* Conéctese al contrato de WAVAX pre-deployed
* Convertir AVAX en WAVAX y atrás
* Añadir WAVAX como una muestra personalizada a Metamask

## Conecte Metamask

[Metamask](https://metamask.io/) es una extensión popular del navegador web que facilita la interacción con Ethereum y cadenas de bloqueo compatibles, como la cadena C-Chain. Configurar Metamask y crear una cuenta en ella está más allá del alcance de este tutorial, pero hay una serie de recursos en Internet para caminar a través de eso.

Después de iniciar sesión en su cuenta de Metamask, conéctalo a la red Avalanche. Haga clic en el desplegable de red -> Seleccione **RPC personalizado**:

![metamask red desplegable](../../../.gitbook/assets/image%20%2860%29.png)

Ingrese la información para la red de su elección:

### Configuración de Avalanche Mainnet:

* **Nombre de la red**: Avalanche Mainnet C-Chain
* **Nuevo RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Símbolo**: `AVAX`
* **Explorador** de [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

### Configuración de Fuji Testnet:

* **Nombre de la red**: Avalanche Fuji C-Chain
* **Nuevo URL de** RPC: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Símbolo**: `AVAX`
* **Explorador** de [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

Después de guardar los cambios, seleccione la red Avalanche que acaba de especificar. Usted debe ver su equilibrio AVAX, que probablemente será 0.

## Fondo Su Cuenta De Cadena C.

Necesitas tener un poco de AVAX en tu cuenta.

### **Usando la Cartera Avalanche**

Si ya tienes algún AVAX, puedes transferirlos a la cuenta de Metamask utilizando tu [Cartera de Avalanche](https://wallet.avax.network/). Puede ver dónde están sus fondos seleccionando **el desglose** de mostrar en el panel de la cartera que muestra su equilibrio. Si ya no tienes los fondos en la cadena C, necesitas hacer una [Transferir cadena](../platform/transfer-avax-between-x-chain-and-c-chain.md) cruzada, para mover tu AVAX de la cadena X a la cadena C-Chain.

Después de tener fondos en la cadena C-Chain, seleccione **Enviar** en el menú lateral izquierdo en la Cartera y luego cambie la cadena fuente a **C Contrato**. En el campo **Para direccionar** pega su dirección de Metamask Introduzca el importe para enviar y haga clic **en Confirmar** y luego **Enviar**.

![Enviar a Metamask](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Pronto los fondos deben ser visibles en su cuenta de Metamask

### **Utilizando el grifo de red de pruebas**

Si está conectado a la red de prueba, puede utilizar su grifo para financiar su cuenta de Metamask. Navega por [el](https://faucet.avax-test.network/) grifo y pegue su dirección Ethereum, que se muestra por debajo del nombre de la cuenta en Metamask `\(por ejemplo, 0xDd1749831fbF70d8AB7bB07ef7CD9c53D054a57\).` Cuando haga clic en el nombre de la cuenta, copiará la cuenta al portapapeles.

![Financiación del grifo](../../../.gitbook/assets/wavax2avax-02-faucet.png)

Pega esa dirección en el grifo, prueba que no eres un robot, y luego pide prueba AVAX. Deberían aparecer en su Metamask en breve.

## Contrato de carga WAVAX en Remix

Remix es una herramienta popular basada en el navegador para escribir, desplegar e interactuar con contratos inteligentes. Naviate al [sitio web de Remix](https://remix.ethereum.org/). Desplácese hacia abajo hasta que vea opciones para importar contratos.

![Importación de GitHub](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

Seleccione **GitHub**, y en la pasta de campo de entrada `https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol` y seleccione **OK**. Eso cargará el contrato en Remix.

![Explorador de archivos](../../../.gitbook/assets/wavax2avax-04-contract.png)

Cambiando a la pestaña Explorador de archivos a la izquierda y seleccione `WAVAX.sol`, que es el contrato que acabamos de cargar.

En el menú lateral izquierdo, cambie a Compilar pestaña:

![Compilación](../../../.gitbook/assets/wavax2avax-05-compile.png)

Compruebe que la versión del compilador es compatible con el contrato, como se muestra Pulse **Compile WAVAX.sol**, y compruebe que el contrato de WAVAX ha aparecido en el campo `CONTRATO` a continuación. Ahora estás listo para conectarse al contrato WAVAX, que ya se ha desplegado en la red Avalanche.

## Conéctese al contrato WAVAX

Cambie a la pestaña **Desplegar y Ejecutar Tranasactions** en el lado izquierdo.

![Conéctese a la red](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Asegúrate de que hayas iniciado sesión en tu Metamask. En el menú desplegable **Environment**, seleccione `Web3 inyectado`. Metamask aparecerá y le pedirá que seleccione la cuenta. Elija el conectado a Avalanche y le permita conectarse. Esto will el campo **de la** Cuenta. Asegúrese de que el campo **del contrato** se ajuste al contrato `WAVAX`. Ahora podemos conectar con el contrato, que ya ha publicado en Avalanche. En el campo **de** edición de direcciones, copia:

* Para Mainnet: `0xB31f6AA3C1e785363F0875A1B74E27b85FD66c7`
* Para Fuji Testnet: `0xd00ae08403B9bb9124bB305C09058E32C39A48c`

Después de pegar la dirección, presione el botón **At Address**.

Remix debe encontrar el contrato desplegado:

![Conéctese a la red](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

Ahora estamos listos para interactuar con el contrato. Abra la interfaz del contrato presionando la flecha resaltada.

## Comandos de emisión del contrato de WAVAX

¡Envolvamos un poco de AVAX!

Dado que ETH se denomina en 10^18 unidades más pequeñas \(wei\), y AVAX se denomina en 10^9, cambie el selector de valor de `wei` a `gwei` \(gigawei\). 1 gwei = 10^9 wei = 1 nAVAX.

![Interacción](../../../.gitbook/assets/wavax2avax-08-interact.png)

### Envolver AVAX para crear WAVAX

Para envolver 10 AVAX, ingrese `1000` \(10^10\) gwei en el campo **Value**. Para iniciar el envoltorio haga clic en **Deposit**. Se le presentará un aviso por Remix para confirmar la transacción. Cuando presione **Confirme** Metamask aparecerá, también pidiendo confirmación. Presione **también Confirme** en Metamask. Debe notar que su saldo AVAX bajó en 10, más la cantidad de honorarios. Saltar a la siguiente sección para ver su WAVAX en Metamask.

## Añadir WAVAX a Metamask

Para ver su saldo de WAVAX, debe agregar WAVAX como un símbolo personalizado a Metamask. En Metamask, seleccione los tres puntos junto al nombre de su cuenta y seleccione `Expandir Ver`. Esto abre una nueva pestaña del navegador. Desplácese hacia abajo y seleccione **Agregar token**. Cambie a la pestaña **Token** Personalizado.

![Token personalizado](../../../.gitbook/assets/wavax2avax-10-add-token.png)

En el **Token Contract Address** pegue la misma dirección de contrato que hemos utilizado antes:

* Para la red principal: `0xB31f6AA3C1e785363F0875A1B74E27b85FD66c7`
* Para la red de ensayo Fuji: `0xd00ae08403B9bb9124bB305C09058E32C39A48c`

Haga clic **en Siguiente** y **añadir Tokens**. Su WAVAX debería ser visible en su cuenta en Metmask.

### Desenvolver WAVAX a AVAX

Para desenvolver WAVAX, expanda la flecha junto a **Retirar** botón:

![Retirar](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

Lamentablemente, el campo de retirada se denomina en wei, por lo que 10 AVAX está representado como `1000` \(10^19\) para la cantidad de retirada. Pulsando **Transact** activará la misma confirmación primero en Remix, luego en Metamask. Su AVAX debería volver a la cuenta, menos el importe de la tarifa.

## Conclusión

Ahora puedes interactuar con contratos inteligentes en la cadena C-Chain de Avalanche con WAVAX, la versión ERC-20 de AVAX. En el futuro, la conversión entre AVAX y WAVAX será significativamente más simple, con soporte integrado de la cartera y los intercambios, pero mientras tanto, todavía puede acceder a DEXes, puentes y otros contratos basados en la Solidaridad en la Plataforma Avalanche.

