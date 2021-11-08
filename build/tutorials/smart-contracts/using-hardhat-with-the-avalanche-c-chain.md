# Con Hardhat con la C-Chain de Avalanche

## Introducción

Avalanche es una plataforma de código abierto para el lanzamiento de aplicaciones descentralizadas y despliegues de blockchains empresariales en un ecosistema interoperable y altamente escalable. Avalanche te da control absoluto tanto de la red como de las capas, lo que te ayuda a construir todo lo que puedas imaginarte.

La red de Avalanche está compuesta de muchas blockchains. Una de estas blockchains es la C-Chain (cadena de contratos), la cual es una instancia de la máquina virtual de Ethereum. La API de la C-Chain es casi idéntica a la API de un nodo de Ethereum. Avalanche ofrece la misma interfaz que Ethereum, pero con una mayor velocidad, un mejor rendimiento, comisiones menores y tiempos de confirmación de transacciones reducidos. Estas cualidades mejoran considerablemente el rendimiento de las DApps y la experiencia de usuario con los contratos inteligentes.

El objetivo de esta guía es establecer las mejores prácticas para la escritura, las pruebas y la implementación de los contratos inteligentes para la C-Chain de Avalanche. Crearemos los contratos inteligentes con el entorno de desarrollo [Hardhat](https://hardhat.org).

## Requisitos Previos

### NodeJS y Yarn

Primero, instala la versión de LTS (soporte de largo plazo) de [NodeJS](https://nodejs.org/en). Esto se hace `14.17.0`durante la escritura. Paquetes de NodeJS`npm`.

A continuación, instala [Yarn](https://yarnpkg.com):

```text
npm install -g yarn
```

### AvalancheGo y Avash

[AvalancheGo](https://github.com/ava-labs/avalanchego) es una implementación de nodo de Avalanche escrita en Go. [Avash](https://docs.avax.network/build/tools/avash) es una herramienta que sirve para desplegar redes locales de pruebas de forma rápida. Úsalas juntas para desplegar redes locales de pruebas y ejecutar pruebas en ellas.

### Solidity y Avalanche

También es útil tener una comprensión básica de [Solidity](https://docs.soliditylang.org) y de [Avalanche](https://docs.avax.network).

## Dependencias

Clone el [repositorio de arranque rápido](https://github.com/ava-labs/avalanche-smart-contract-quickstart) e instale los paquetes necesarios a través de `yarn`.

```text
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## Escriba contratos

Edite el contrato `Coin.sol` en `contracts/`. `Coin.sol` es un contrato de [ERC20](https://eips.ethereum.org/EIPS/eip-20) de [Open Zeppelin](https://openzeppelin.com). ERC20 es una interfaz popular para los contratos inteligentes. También puedes agregar tus propios contratos.

## Configuración de Hardhat

Hardhat utiliza `hardhat.config.js` como el archivo de configuración. En ese archivo puedes definir tareas, redes, compiladores y más. Para obtener más información, mira [aquí](https://hardhat.org/config/).

En nuestro repositorio usamos el archivo preconfigurado [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). Este archivo configura la información de red necesaria para proporcionar una interacción fluida con Avalanche. También hay algunas claves privadas predefinidas para hacer pruebas en una red local de pruebas.

## Tareas de Hardhat

Puedes definir tareas personalizadas de Hardhat en [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). Se incluyen dos tareas como ejemplos: `accounts`y `balances`. Ambas tienen scripts en [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json).

```javascript
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts` imprime la lista de las cuentas. `yarn balances` imprime la lista de los saldos de la cuenta de AVAX. Al igual que con otros scripts `yarn`, puedes marcar `--network` para pasar tareas por Hardhat.

### Cuentas

Imprime una lista de cuentas en la red local de Avash.

```text
$ yarn accounts --network local
yarn run v1.22.4
npx hardhat accounts --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
0x9632a79656af553F58738B0FB750320158495942
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4
0x0B891dB1901D4875056896f28B6665083935C7A8
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2
0x78A23300E04FB5d5D2820E23cc679738982e1fd5
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB
0x0Fa8EA536Be85F32724D57A37758761B86416123
```

### Saldos

Imprime una lista de las cuentas de AVAX y sus saldos correspondientes en la red local de Avash.

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

Puedes notar que la primera cuenta ya tiene fondos. Esto se debe a que esta dirección está prefinanciada en el archivo génesis de la red local.

## Ayuda de Hardhat

Ejecuta `yarn hardhat` para desplegar la versión de Hardhat, las instrucciones de uso, las opciones globales y las tareas disponibles.

## Flujo de trabajo típico de Avash

### Ejecuta Avash.

Ante todo, verifica que tienes la versión más reciente de AvalancheGo.

```text
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

(Nota que también puedes [descargar binarios precompilados de AvalancheGo](https://github.com/ava-labs/avalanchego/releases), en vez de crearlos desde la fuente.)

Inicia Avash y ejecuta un script para iniciar una nueva red local.

```text
$ cd /path/to/avash
$ git fetch -p
$ git checkout master
$ go build
$ ./avash
Config file set: /Users/username/.avash.yaml
Avash successfully configured.
$ avash> runscript scripts/five_node_staking.lua
RunScript: Running scripts/five_node_staking.lua
RunScript: Successfully ran scripts/five_node_staking.lua
```

Ahora estás ejecutando una red local de Avalanche con cinco nodos.

### Cuentas de fondos

Transfiere 1000 AVAX desde la X-Chain a cada una de las 10 cuentas en `hardhat.config.ts` con el script [`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js). Es indispensable agregar fondos a las cuentas para desplegar contratos inteligentes e interactuar con ellos.

Nota: Si ves `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, debes esperar hasta que la red haya arrancado y esté lista para usarse. Esto no debería tomar mucho tiempo.

```text
$ cd /path/to/avalanche-smart-contract-quickstart
$ yarn fund-cchain-addresses
yarn run v1.22.4
npx hardhat run scripts/fund-cchain-addresses.js --network local
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

Confirma que haya 1000 AVAX en cada una de las cuentas.

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000001000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000000000000000000
✨  Done in 0.72s.
```

Envía algunos AVAX de la primera cuenta a cada una de las cuentas.

```text
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

Confirma que los saldos se actualicen.

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 49999999995275000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000010000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000010000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000010000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000010000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000010000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000010000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000010000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000010000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000010000000000000000
```

### Compila contratos inteligentes.

En [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) hay un script `compile`.

```javascript
"compile": "npx hardhat compile",
```

Ejecuta `yarn compile` para asegurarte de que tu proyecto compile.

Compila el contrato inteligente.

```text
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## Despliega los contratos inteligentes

Hardhat permite desplegar a varios entornos. En [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) hay un script para desplegar.

Edita el script de despliegue en `scripts/deploy.ts`.

```javascript
"deploy": "npx hardhat run scripts/deploy.ts",
```

Puedes elegir el entorno al que quieres desplegar al marcar `--network` con `local` (es decir, una red local creada con Avash), `fuji`, o `mainnet`para cada entorno respectivo. Si no pones `--network`, se predeterminará a la red de Hardhat. Por ejemplo, si quieres desplegar a la red principal:

```text
yarn deploy --network mainnet
```

Despliega el contrato a tu red local.

```text
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

Ahora tenemos un token desplegado en `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`.

### Interactúa con un contrato inteligente

Hardhat tiene una consola de desarrollo para interactuar con contratos y con la red. Para más información sobre la consola de Hardhat consulta [aquí](https://hardhat.org/guides/hardhat-console.html). La consola de Hardhat es una NodeJS-REPL en la que puedes usar diferentes herramientas. [ethers](https://docs.ethers.io/v5/) es la biblioteca que usaremos para interactuar con nuestra red.

Puedes abrir la consola con:

```text
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

Consigue la instancia del contrato con la dirección del contrato y de la fábrica para interactuar con nuestro contrato:

```javascript
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

La primera línea extrae la fábrica de contratos con ABI y bytecode. La segunda línea extrae una instancia de esa fábrica de contratos con una dirección de contratos provista. Recuerda que nuestro contrato ya fue desplegado a `0x17aB05351fC94a1a67Bf3f56DdbB941aE6` en el paso anterior.

Busca las cuentas:

```javascript
> let accounts = await ethers.provider.listAccounts()
undefined
> accounts
[
  '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  '0x9632a79656af553F58738B0FB750320158495942',
  '0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430',
  '0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4',
  '0x0B891dB1901D4875056896f28B6665083935C7A8',
  '0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2',
  '0x78A23300E04FB5d5D2820E23cc679738982e1fd5',
  '0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293',
  '0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB',
  '0x0Fa8EA536Be85F32724D57A37758761B86416123'
]
```

Esta es exactamente la misma lista de cuentas que la de `yarn accounts`.

Ahora podemos interactuar con nuestro contrato `ERC-20`:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]` tiene un saldo porque `account[0]` es la cuenta predeterminada. El contrato se desplegó con esta cuenta. El constructor de [ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) acuña `TOTAL_SUPPLY` del token 123456789 al desplegador del contrato.

`accounts[1]` actualmente no tiene saldo. Envía algunos tokens a `accounts[1]`, que es `0x9632a79656af553F58738B0FB750320158495942`.

```javascript
> let result = await coin.transfer(accounts[1], 100)
undefined
> result
{
  hash: '0x35eec91011f9089ba7689479617a90baaf8590395b5c80bb209fa7000e4848a5',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 3,
  data: '0xa9059cbb0000000000000000000000009632a79656af553f58738b0fb7503201584959420000000000000000000000000000000000000000000000000000000000000064',
  r: '0xc2b9680771c092a106eadb2887e5bff41fcda166c8e00f36ae79b196bbc53d36',
  s: '0x355138cb5e2b9f20c15626638750775cfc9423881db374d732a8549d05ebf601',
  v: 86260,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Nota: Dado que esta es una red local, no tuvimos que esperar hasta que la transacción fuera aceptada. Sin embargo, para otras redes como `fuji` o `mainnet`, deberás esperar hasta que la transacción sea aceptada con `await result.wait()`.

Ahora podemos asegurarnos de que los tokens se transfieran:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

Como puedes haber notado, no había información del "remitente" en `await coin.transfer(accounts[1], 100)`; esto se debe a que `ethers` usa al primer firmador como el firmador predeterminado. En nuestro caso, es `account[0]`. Si queremos usar otra cuenta, primero tenemos que conectarnos con ella.

```javascript
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

Ahora podemos llamar al contrato con `signer1`, que es `account[1]`.

```javascript
> await contractAsSigner1.transfer(accounts[0], 5)
{
  hash: '0x807947f1c40bb723ac312739d238b62764ae3c3387c6cdbbb6534501577382dd',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9632a79656af553F58738B0FB750320158495942',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 2,
  data: '0xa9059cbb0000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000005',
  r: '0xcbf126dd0b109491d037c5f3af754ef2d0d7d06149082b13d0e27e502d3adc5b',
  s: '0x5978521804dd15674147cc6b532b8801c4d3a0e94f41f5d7ffaced14b9262504',
  v: 86259,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Procedamos a revisar los saldos:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

Transferimos cinco tokens exitosamente de `accounts[1]` a `accounts[0]`.

## Resumen

Ya tienes las herramientas necesarias para lanzar una red local de Avalanche y crear un proyecto de Hardhat, así como para crear, compilar, desplegar e interactuar con los contratos de Solidity.

Únete a nuestro [servidor en Discord](https://chat.avax.network) para aprender más y hacer preguntas en caso de tenerlas.

