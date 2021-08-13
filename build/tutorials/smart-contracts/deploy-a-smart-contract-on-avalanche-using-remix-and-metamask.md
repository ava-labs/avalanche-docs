# Implementar un contrato inteligente en Avalanche usando Remix y MetaMask

## Introducción

![Red Primaria](../../../.gitbook/assets/image%20%2821%29.png)

La Red Primaria de Avalanche es un subred que tiene tres cadenas: Cadena P, Cadena X, y Cadena C-Chain. La cadena C es una instancia de la Máquina Virtual Ethereum impulsada por el protocolo de consenso de Avalanche. El [C-Chain RPC](../../avalanchego-apis/contract-chain-c-chain-api.md) puede hacer cualquier cosa que un cliente típico Ethereum pueda utilizando las llamadas RPC estándar Ethereum. Los beneficios inmediatos de utilizar la cadena C en lugar de Ethereum son todos los beneficios de utilizar Avalanche. Estas propiedades que podrían mejorar considerablemente el rendimiento de DApps y la experiencia del usuario.

Hoy en día, implementaremos y probaremos un contrato inteligente en Avalanche utilizando Remix y MetaMask.

## Paso 1: Configurar MetaMask

Inicia sesión en MetaMask -> Haga clic en la desplegable Red -> Seleccionar RPC personalizado

![metamask red desplegable](../../../.gitbook/assets/image%20%2860%29.png)

#### **Configuración de Avalanche Mainnet:**

* **Nombre de la red**: Avalanche Mainnet C-Chain
* **Nuevo RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Símbolo**: `AVAX`
* **Explorador** de [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **Configuración de FUJI Testnet:**

* **Nombre de la red**: Avalanche FUJI C-Chain
* **Nuevo URL de** RPC: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Símbolo**: `AVAX`
* **Explorador** de [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

#### **Configuración local de Testnet \(AVASH\):** [(Tutorial de Avash)](https://docs.avax.network/build/tools/avash)

* **Nombre de la red**: Avalanche Local
* **Nuevo RPC URL:http://localhost:9650/ext/bc/C/rpc**[](http://localhost:9650/ext/bc/C/rpc)[](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**: `43112`
* **Símbolo**: `AVAX`
* **Explorador** de proyectos: N/A

## Paso 2: Financiar su dirección de cadena C

### **Usando Avalanche Wallet**

En la red principal, puede utilizar la [Cartera Avalanche](https://wallet.avax.network/) para transferir fondos de la cadena X a su dirección de cadena C. El proceso es simple, como se explica en este [tutorial](../platform/transfer-avax-between-x-chain-and-c-chain.md). La cartera también se puede utilizar en las redes locales y de prueba.

### **Utilizando el grifo de red de prueba**

Para obtener financiación en la red de pruebas, también puede utilizar el Grifo de Red de Pruebas. Navega a [https://faucet.avax-test.network/](https://faucet.avax-test.network/) y pegue su dirección C-AVAX. Todo lo que necesitas hacer es agregar un prefijo "C-" y el grifo cambiará de AVAX a C-AVAX.

### Financiación de testnet local

En una red local, puede financiar fácilmente sus direcciones desplegando su propio grifo. [Tutorial](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

## Paso 3: Conecte MetaMask e implemente un contrato inteligente utilizando Remix

Abrir [Remix](https://remix.ethereum.org/) -> Seleccionar Solidity

![explorador de archivos remix](../../../.gitbook/assets/remix-file-explorer.png)

Cargue o cree los contratos inteligentes que queremos compilar y desplegar utilizando el explorador de archivos Remix.

Por este ejemplo, implementaremos un contrato ERC20 de [OpenZeppelin](https://openzeppelin.com/contracts).

![Contrato ERC20](../../../.gitbook/assets/erc20-contract.png)

Navegar a Desplegar la pestaña -> Abra el desplegable "AMBIENTE" y seleccione Web3 inyectado \(asegúrese de que MetaMask esté cargado\)

![Despliegue y ejecute transacciones](../../../.gitbook/assets/deploy-and-run-transactions.png)

Una vez que inyectamos el web3-> Regresa al compilador, y compile el contrato seleccionado -> Navegar para Desplegar Tab

![Compilador de solidez](../../../.gitbook/assets/solidity-compiler.png)

Ahora, el contrato inteligente se compila, MetaMask se inyecta y estamos listos para implementar nuestro ERC20. Haga clic en "Desplegar".

![Despliegue erc20](../../../.gitbook/assets/deploy-erc20.png)

Confirme la transacción en el MetaMask pop.

![Confirma ERC20](../../../.gitbook/assets/confirm-erc20.png)

Nuestro contrato se ha desplegado con éxito!

![Metadatos publicados](../../../.gitbook/assets/published-metadata.png)

Ahora, podemos ampliarlo seleccionándolo de la pestaña "Contratos desplegados" y probarlo.

![Interactuar con contrato](../../../.gitbook/assets/interact-with-contract.png)

El contrato ABI y Bytecode están disponibles en la pestaña del compilador.

![Bytecode ABI](../../../.gitbook/assets/abi-bytecode.png)

Si usted tuvo alguna dificultad siguiendo este tutorial o simplemente quiere discutir Avalanche con nosotros, ¡puede unirse a nuestra comunidad en [Discord](https://chat.avalabs.org/)!

