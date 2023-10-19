---
etiquetas: [Construir, Subredes]
descripción: Este tutorial demuestra el proceso de implementar un contrato inteligente en una Subred basada en EVM.
sidebar_label: Implementar un Contrato Inteligente
pagination_label: Implementar un Contrato Inteligente en tu Subred-EVM Usando Remix y Core
sidebar_position: 0
---

# Implementar un Contrato Inteligente en tu Subred-EVM Usando Remix y Core

## Introducción

Este tutorial asume que:

- Se ha creado una Subred y blockchain EVM (/build/subnet/deploy/fuji-testnet-subnet.md)
- Tu Nodo está validando actualmente tu Subred objetivo
- Tu billetera tiene un saldo del Token Nativo de la Subred (Especificado bajo _alloc_ en tu
[Archivo Génesis](/build/subnet/upgrade/customize-a-subnet.md#genesis)).

## Paso 1: Configurar Core

### **Configuraciones de la Subred EVM:** [(Tutorial de Core EVM)](/build/subnet/deploy/fuji-testnet-subnet.md#connect-with-core)

- **`Nombre de Red`**: Subred-EVM Personalizada
- **`Nueva URL RPC`**: <http://DirecciónIPNodo:9650/ext/bc/IDBlockchain/rpc> (Nota: el número de puerto debe
coincidir con tu configuración local, que puede ser diferente de 9650.)
- **`ChainID`**: ID de Cadena de la Subred-EVM
- **`Símbolo`**: Símbolo del Token de la Subred-EVM
- **`Explorador`**: N/A

Deberías ver un saldo del Token Nativo de tu Subred en Core.

<div style={{textAlign: 'center'}}>

![balance](/img/evm-smart-contract/core-balance.png)

</div>

## Paso 2: Conectar Core e Implementar un Contrato Inteligente

### Usando Remix

Abre [Remix](https://remix.ethereum.org/) -&gt; Selecciona Solidity.

![remix Subnet evm sc home](/img/remix-subnet-evm-sc-home.png)

Crea los contratos inteligentes que queremos compilar e implementar usando el explorador de archivos de Remix.

### Usando GitHub

En la página de Inicio de Remix, _Haz clic_ en el botón de GitHub.

![remix Subnet evm sc load panel](/img/remix-subnet-evm-sc-load-panel.png)

Pega el [enlace al Contrato Inteligente](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/NFT.sol)
en el cuadro emergente y _Haz clic_ en importar.

![remix Subnet evm sc import](/img/remix-subnet-evm-sc-import.png)

Para este ejemplo, implementaremos un contrato ERC721 del [Repositorio de Inicio Rápido de Contratos Inteligentes de Avalanche](https://github.com/ava-labs/avalanche-smart-contract-quickstart).

![remix Subnet evm sc file explorer](/img/remix-subnet-evm-sc-file-explorer.png)

Navega a la pestaña de Implementación -&gt; Abre el desplegable "ENVIRONMENT" y selecciona Injected Web3 (asegúrate de que
Core esté cargado).

![remix Subnet evm sc web3](/img/remix-subnet-evm-sc-web3.png)

Una vez que hemos inyectado el web3-&gt; Vuelve al compilador y compila el contrato seleccionado -&gt;
Navega a la pestaña de Implementación.

![remix Subnet evm sc compile](/img/remix-subnet-evm-sc-compile.png)

Ahora, el contrato inteligente está compilado, Core está inyectado y estamos listos para implementar nuestro ERC721.
Haz clic en "Deploy".

![remix Subnet evm sc deploy](/img/remix-subnet-evm-sc-deploy.png)

Confirma la transacción en el pop-up de Core.

<div style={{textAlign: 'center'}}>

![balance](/img/evm-smart-contract/approve.png)

</div>

¡Nuestro contrato se ha implementado con éxito!

![remix Subnet evm sc deployed](/img/remix-subnet-evm-sc-deployed.png)

Ahora, podemos expandirlo seleccionándolo de la pestaña "Deployed Contracts" y probarlo.

![remix Subnet evm sc end](/img/remix-subnet-evm-sc-end.png)

La ABI y el Bytecode del contrato están disponibles en la pestaña del compilador.

![remix Subnet evm sc ABI](/img/remix-subnet-evm-sc-abi.png)

Si tuviste alguna dificultad siguiendo este tutorial o simplemente quieres discutir Avalanche
con nosotros, ¡puedes unirte a nuestra comunidad en [Discord](https://chat.avalabs.org/)!

## Otras Herramientas

Puedes usar Subred-EVM de la misma manera que usas herramientas de C-Chain y EVM. Las únicas diferencias son `chainID` y
la URL RPC. Por ejemplo, puedes implementar tus contratos con
[guía de inicio rápido de hardhat](/build/dapp/smart-contracts/toolchains/hardhat.md)
cambiando `url` y `chainId` en el `hardhat.config.ts`.