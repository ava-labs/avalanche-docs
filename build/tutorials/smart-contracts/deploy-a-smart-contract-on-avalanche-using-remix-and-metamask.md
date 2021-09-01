# Implementar un Smart Contract en Avalanche Usando Remix y MetaMask

## Introducción

![Red primaria](../../../.gitbook/assets/image%20%2821%29.png)

La red primaria de Avalanche es una subred que tiene tres cadenas: P-Chain, X-Chain, y C-Chain. La C-Chain es una instancia de la Ethereum Virtual Machine impulsada por el protocolo de consenso Snowman de Avalanche. La [RPC de C-Chain](../../avalanchego-apis/contract-chain-c-chain-api.md) puede hacer cualquier cosa que un cliente típico de Ethereum pueda usando las llamadas RPC estándar de Ethereum Los beneficios inmediatos de usar la C-Chain en vez de Ethereum son todos los beneficios de usar Avalanche. Estas propiedades que podrían mejorar considerablemente el rendimiento de los DApps y la experiencia del usuario.

Hoy, desplegaremos y probaremos un smart contract en Avalanche usando Remix y MetaMask.

## Paso 1: Configuración de MetaMask

Iniciamos sesión en MetaMask -> Hacemos click en el menú desplegable Network -> Seleccionamos Custom RPC

![Desertificación de la red metamask](../../../.gitbook/assets/image%20%2860%29.png)

#### **Configuración de Avalanche Mainnet:**

* **Nombre de la **red: Avalanche Mainnet C-Chain
* **Nuevo RPC **URL: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**:`43114`
* ****Símbolo:`AVAX`
* **Explorador de **ello: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Configuración de FUJI Testnet:**

* **Nombre de la **red: Avalanche FUJI C-Chain
* **Nuevo RPC **URL: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**:`43113`
* ****Símbolo:`AVAX`
* **Explorador de **ello: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

#### **Configuración de Testnet \(AVASH\): [\(Tutorial de Avash](../../tools/avash.md)**

* **Nombre de la **red: Avalanche Local
* **Nuevo RPC **URL:[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**:`43112`
* ****Símbolo:`AVAX`
* **Explorador de **ello: N/A

## Paso 2: Financiar tu dirección de C-Chain

### **Usar billetera de Avalanche**

En la red principal, puedes usar la [billetera](https://wallet.avax.network/) de Avalanche para transferir fondos de la X-Chain a tu dirección de C-Chain El proceso es simple, como se explica en este [tutorial](../platform/transfer-avax-between-x-chain-and-c-chain.md). La wallet puede ser usada en redes locales y de pruebas.

### **Usar Faucet de red de pruebas**

Para financiar en la red de prueba, puedes usar el Faucet de la red de prueba. Navega a [https://faucet.avax-test.network/](https://faucet.avax-test.network/) y pega tu dirección C-Chain. Faucet sabrá automáticamente que necesita enviar la prueba AVAX a C-Chain. Haz clic en la casilla de verificación de captcha y selecciona el botón "Solicitar AVAX". Tu dirección recibirá la prueba de AVAX en unos segundos.

### Agregando Fondos en la Red de Pruebas Local

En una red local, puedes financiar fácilmente tus direcciones al seguir [esto](../platform/create-a-local-test-network.md#getting-avax).

## Paso 3: Conectar MetaMask e implementar un contrato inteligente usando Remix

Abrir [Remix](https://remix.ethereum.org/) -> Seleccionar Solidity

![Explorador de archivos](../../../.gitbook/assets/remix-file-explorer.png)

Carga o crea los smart contracts que queremos compilar y desplegar usando el explorador de archivos Remix.

Por este ejemplo, implementaremos un contrato de ERC20 desde [OpenZeppelin](https://openzeppelin.com/contracts).

![Contrato](../../../.gitbook/assets/erc20-contract.png)

Navega a implementar Tab -> Abre el menú desplegable "AMBIENTAL" y selecciona Web3 inyectado \(asegúrate de que la MetaMask esté cargada\)

![Implementar transacciones](../../../.gitbook/assets/deploy-and-run-transactions.png)

Una vez que se inyectó la web3-> Vuelve al compilador, y compila el contrato seleccionado -> Ve a la pestaña Deploy

![Recopilador de Solidity](../../../.gitbook/assets/solidity-compiler.png)

Ahora, el contrato inteligente se compila, MetaMask se inyecta y estamos listos para implementar nuestro ERC20. Haz clic en "Implementar".

![Implementar erc20](../../../.gitbook/assets/deploy-erc20.png)

Confirma la transacción en la ventana emergente de MetaMask.

![Confirma ERC20](../../../.gitbook/assets/confirm-erc20.png)

¡Nuestro contrato se ha desplegado con éxito!

![Metadatos publicados](../../../.gitbook/assets/published-metadata.png)

Ahora, podemos expandirla seleccionándolo desde la pestaña "contratos desplegados" y probarlo

![Interact con contrato](../../../.gitbook/assets/interact-with-contract.png)

El ABI / Bytecode del smart contract están disponibles en la pestaña del compilador.

![ABI](../../../.gitbook/assets/abi-bytecode.png)

¡Si has tenido alguna dificultad siguiendo este tutorial o simplemente quieres discutir Avalanche con nosotros, puedes unirse a nuestra comunidad en [Discord](https://chat.avalabs.org/)!

