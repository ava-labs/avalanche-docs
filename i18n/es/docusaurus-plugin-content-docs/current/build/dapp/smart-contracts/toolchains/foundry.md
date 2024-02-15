---
etiquetas: [Construir, Dapps]
descripción: Esta guía muestra cómo implementar e interactuar con contratos inteligentes utilizando Foundry en una Red Avalanche local y la C-Chain Fuji.
sidebar_label: Foundry
pagination_label: Usando Foundry con la Avalanche C-Chain
sidebar_position: 2
---

# Usando Foundry con la Avalanche C-Chain

## Introducción

Esta guía muestra cómo implementar e interactuar con contratos inteligentes utilizando Foundry en una Red Avalanche local y la C-Chain Fuji.

[Foundry toolchain](https://github.com/foundry-rs/foundry) es una herramienta de desarrollo de contratos inteligentes escrita en Rust. Gestiona tus dependencias, compila tu proyecto, ejecuta pruebas, implementa y te permite interactuar con la cadena desde la línea de comandos.

## Conocimientos recomendados

- Comprensión básica de [Solidity](https://docs.soliditylang.org) y Avalanche.
- Estás familiarizado con el [Inicio rápido de contratos inteligentes de Avalanche](https://github.com/ava-labs/avalanche-smart-contract-quickstart).
- Comprensión básica de la [arquitectura de Avalanche](/learn/avalanche/avalanche-platform.md).
- Realizaste un intercambio cruzado de cadenas a través de este [tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet) para obtener fondos en tu dirección de C-Chain.

## Requisitos

- Has [instalado Foundry](https://github.com/foundry-rs/foundry#installation) y ejecutado `foundryup`. Esta instalación incluye los binarios `forge` y `cast` utilizados en este recorrido.
- [NodeJS](https://nodejs.org/en) versión `16.x`

### AvalancheGo y Avalanche Network Runner

[AvalancheGo](https://github.com/ava-labs/avalanchego) es una implementación de nodo Avalanche escrita en Go.

[Avalanche Network Runner](/tooling/network-runner.md) es una herramienta para implementar rápidamente redes de prueba locales. Juntos, pueden implementar redes de prueba locales y ejecutar pruebas en ellas.

Inicia una red Avalanche local de cinco nodos:

```zsh
cd /ruta/a/avalanche-network-runner
# inicia una red de cinco nodos de staking
./go run examples/local/fivenodenetwork/main.go
```

Una red Avalanche de cinco nodos está funcionando en tu máquina. La red se ejecutará hasta que presiones Ctrl + C para salir.

## Empezando

Esta sección te guiará a través de la creación de un [ERC721](https://eips.ethereum.org/EIPS/eip-721).

### Clonar Avalanche Smart Contract Quick Start

Clona el [repositorio de inicio rápido](https://github.com/ava-labs/avalanche-smart-contract-quickstart) e instala los paquetes necesarios a través de `yarn`.

```zsh
git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
cd avalanche-smart-contract-quickstart
yarn
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede utilizar SSH:

`git clone git@github.com:ava-labs/avalanche-smart-contract-quickstart.git`

Puedes encontrar más información sobre SSH y cómo usarlo [aquí](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

Para implementar contratos, necesitas tener algunos AVAX. Puedes obtener AVAX de la testnet desde el [Avalanche Faucet](https://faucet.avax.network), que es una forma fácil de jugar con Avalanche. Si ya tienes un saldo de AVAX mayor que cero en Mainnet, pega tu dirección de C-Chain allí y solicita tokens de prueba. De lo contrario, por favor solicita un cupón de faucet en [Guild](https://guild.xyz/avalanche). Los administradores y moderadores en el [Discord](https://discord.com/invite/RwXY7P6) oficial pueden proporcionar AVAX de testnet si los desarrolladores no pueden obtenerlo de las otras dos opciones. Después de familiarizarte con tu código, puedes ejecutarlo en Mainnet después de hacer los cambios necesarios en tu flujo de trabajo.

## Escribir Contratos

Utilizaremos nuestro ejemplo de contrato inteligente ERC721, [`NFT.sol`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/3fbba0ac28f6420e9be5d2635d5f23693f80127a/contracts/NFT.sol), que se encuentra en `./contracts` de nuestro proyecto.

```ts
//SPDX-License-Identifier: MIT
// contracts/ERC721.sol

pragma solidity >=0.6.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("GameItem", "ITM") {}

  // commented out unused variable
  // function awardItem(address player, string memory tokenURI)
  function awardItem(address player)
    public
    returns (uint256)
  {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    // _setTokenURI(newItemId, tokenURI);

    return newItemId;
  }
}
```

Examinemos esta implementación de un NFT como un Ítem de Juego. Comenzamos importando los contratos de nuestros módulos de nodo. Importamos la implementación de código abierto de OpenZeppelin del [estándar ERC721](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721) que nuestro contrato NFT heredará. Nuestro constructor toma los argumentos `_name` y `_symbol` para nuestro NFT y los pasa al constructor de la implementación ERC721 padre. Por último, implementamos la función `awardItem` que permite a cualquiera acuñar un NFT en la dirección de billetera de un jugador. Esta función incrementa el `currentTokenId` y utiliza la función `_mint` de nuestro contrato padre.

## Compilar, Implementar y Verificar con Forge

[Forge](https://book.getfoundry.sh/reference/forge/forge-build.html) es una herramienta de línea de comandos que se incluye con Foundry. Forge prueba, compila e implementa tus contratos inteligentes.

Requiere alguna configuración inicial del proyecto en forma de un [foundry.toml](https://github.com/foundry-rs/foundry#configuration) que se puede generar ejecutando:

```zsh
forge init --no-git --no-commit --force
```

El `foundry.toml` por defecto apunta a las carpetas que agregó. Queremos cambiar esto para asegurarnos de que `src` apunte al directorio `contracts`. Cambia tu `foundry.toml` para que se vea como el siguiente:

```zsh
[profile.default]
src = 'contracts'
out = 'out'
libs = ["node_modules", "lib"]
remappings = [
    '@ensdomains/=node_modules/@ensdomains/',
    '@openzeppelin/=node_modules/@openzeppelin/',
    'hardhat/=node_modules/hardhat/',
]

# Ver más opciones de configuración en https://github.com/foundry-rs/foundry/tree/master/config
```

Para compilar el contrato NFT, ejecuta:

```zsh
forge build
```

Por defecto, los artefactos del contrato estarán en el directorio `out`, como se especifica en el `foundry.toml`. Para implementar nuestro contrato compilado con Forge, tenemos que establecer variables de entorno para el punto final RPC y la clave privada que queremos usar para implementar.

Establece tus variables de entorno ejecutando:

```zsh
export RPC_URL=<TU-PUNTO-FINAL-RPC>
export PRIVATE_KEY=<TU-CLAVE-PRIVADA>
```

Dado que estamos implementando en la testnet Fuji, nuestra exportación de `RPC_URL` debería ser:

```zsh
export RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
```

Si desea verificar sus contratos durante el proceso de implementación (la forma más rápida y fácil),
obtenga una [Clave de API de Snowtrace](https://docs.snowtrace.io/getting-started/viewing-api-usage-statistics).
Agregue esto como una variable de entorno:

```zsh
export ETHERSCAN_API_KEY=<TU-CLAVE-DE-API-DE-SNOWTRACE>
```

Una vez configurado, puede [implementar su NFT con Forge](https://book.getfoundry.sh/reference/forge/forge-create.html) ejecutando
el siguiente comando mientras agrega los valores para `_name` y `_symbol`, los
argumentos de constructor relevantes de la [contrato NFT](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/3ad93abf50fba65e3aab68f23382bcace73968be/contracts/NFT.sol#L13).
Puede verificar los contratos con Snowtrace agregando `--verify` antes de `--constructor-args`:

```zsh
forge create NFT --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY --verify --constructor-args GameItem ITM
```

Después de una implementación exitosa, verá la dirección de la billetera que implementó, la
dirección del contrato y el hash de transacción impresos en su terminal.

Aquí hay un ejemplo de salida de una implementación y verificación de NFT.

```zsh
[⠔] Compiling...
No se han cambiado archivos, se omitió la compilación
Implementador: 0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc
Implementado en: 0x52c84043cd9c865236f11d9fc9f56aa003c1f922
Hash de transacción: 0xf35c40dbbdc9e4298698ad1cb9937195e5a5e74e557bab1970a5dfd42a32f533
```

Después de una verificación exitosa, después de su implementación verá el estado de verificación del contrato como
`verificado exitosamente`:

```zsh
Iniciando verificación de contrato...
Esperando a que etherscan detecte la implementación del contrato...
Comenzando a verificar el contrato `0x8e982a4ef70430f8317b5652bd5c28f147fbf912` implementado en fuji

Enviando verificación para [contracts/NFT.sol:NFT] "0x8e982a4Ef70430f8317B5652Bd5C28F147FBf912".

Enviando verificación para [contracts/NFT.sol:NFT] "0x8e982a4Ef70430f8317B5652Bd5C28F147FBf912".
Contrato enviado para verificación:
	Respuesta: `OK`
	GUID: `cfkyqwvjjauafirepxt8qhks2zhptczzccqege9uefu9ma8wiz`
	URL:
        https://testnet.snowtrace.io/address/0x8e982a4ef70430f8317b5652bd5c28f147fbf912
Estado de verificación del contrato:
Respuesta: `NOTOK`
Detalles: `Pendiente en cola`
Estado de verificación del contrato:
Respuesta: `OK`
Detalles: `Pasar - Verificado`
Contrato verificado exitosamente
```

_Nota: Por favor, guarde la dirección `Implementado en` para usarla en las siguientes secciones._

## Verificación Después de la Implementación

Si no verificó durante el proceso de implementación, aún puede verificar un contrato implementado con
foundry, usando [`forge verify-contract`](https://book.getfoundry.sh/reference/forge/forge-verify-contract).

_Nota: El archivo foundry.toml y las variables de entorno deberán estar
configuradas como lo estaban en la sección anterior_

Por ejemplo, si quisiéramos verificar el contrato NFT que acabamos de
implementar en la sección anterior, se vería así:

```zsh
forge verify-contract --chain-id 43113 --watch --constructor-args $(cast abi-encode "constructor(string,string)" "GameItem" "ITM") 0x8e982a4ef70430f8317b5652bd5c28f147fbf912 NFT
```

Después de una verificación exitosa, verá el estado de verificación del contrato como `verificado exitosamente`:

```zsh
Iniciando verificación de contrato...
Esperando a que etherscan detecte la implementación del contrato...
Comenzando a verificar el contrato `0x8e982a4ef70430f8317b5652bd5c28f147fbf912` implementado en fuji

Enviando verificación para [contracts/NFT.sol:NFT] "0x8e982a4Ef70430f8317B5652Bd5C28F147FBf912".

Enviando verificación para [contracts/NFT.sol:NFT] "0x8e982a4Ef70430f8317B5652Bd5C28F147FBf912".
Contrato enviado para verificación:
	Respuesta: `OK`
	GUID: `cfkyqwvjjauafirepxt8qhks2zhptczzccqege9uefu9ma8wiz`
	URL:
        https://testnet.snowtrace.io/address/0x8e982a4ef70430f8317b5652bd5c28f147fbf912
Estado de verificación del contrato:
Respuesta: `NOTOK`
Detalles: `Pendiente en cola`
Estado de verificación del contrato:
Respuesta: `OK`
Detalles: `Pasar - Verificado`
Contrato verificado exitosamente
```

## Usando Cast para Interactuar con el Contrato Inteligente

Podemos llamar a funciones en nuestro contrato NFT con
[Cast](https://book.getfoundry.sh/reference/cast/cast-send.html), la
herramienta de línea de comandos de Foundry para interactuar con contratos inteligentes, enviar transacciones
y obtener datos de la cadena. En este escenario, vamos a crear un NFT de un Ítem de Juego en la billetera de un jugador
usando la función [`awardItem`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/0f29cbb6375a1a452579213f688609c880d52c01/contracts/NFT.sol#L17)
en nuestro contrato inteligente.

Cree un NFT desde su contrato reemplazando `<NFT-CONTRACT-ADDRESS>` con su
dirección `Implementado en` y `<NFT-RECIPIENT-ADDRESS>` con una dirección de su
elección.

_Nota: Esta sección asume que ya ha configurado sus variables de entorno de RPC y clave privada durante la implementación_

```zsh
cast send --rpc-url=$RPC_URL  <NFT-CONTRACT-ADDRESS> "awardItem(address)" <NFT-RECIPIENT-ADDRESS> --private-key=$PRIVATE_KEY
```

Después de un éxito, la línea de comandos mostrará los [datos de transacción](https://testnet.snowtrace.io/tx/0x4651ae041a481a6eeb852e5300e9be48e66a1d2332733df22d8e75cf460b0c2c).

```zsh
blockHash               0x1d9b0364fe002eeddd0e32be0c27d6797c63dffb51fe555ea446357759e6a6f8
blockNumber             10714448
contractAddress
cumulativeGasUsed       90837
effectiveGasPrice       28000000000
gasUsed                 90837
logs                    [{"address":"0x45857b942723fff8ee7acd2b1d6515d9965c16e5","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000845095a03a6686e24b90fed55e11f4ec808b1ab3","0x0000000000000000000000000000000000000000000000000000000000000001"],"data":"0x","blockHash":"0x1d9b0364fe002eeddd0e32be0c27d6797c63dffb51fe555ea446357759e6a6f8","blockNumber":"0xa37d50","transactionHash":"0x4651ae041a481a6eeb852e5300e9be48e66a1d2332733df22d8e75cf460b0c2c","transactionIndex":"0x0","logIndex":"0x0","removed":false}]
logsBloom               0x000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000400000000000000000000000000080100000000000000000400000000000