# Usar Hardhat con la C-Chain de Avalanche

## Introducción

Avalanche es una plataforma de código abierto para el lanzamiento de aplicaciones descentralizadas y despliegues de blockchains empresariales en un ecosistema interoperable y altamente escalable. Avalanche te da control completo en la red y en las capas de application a crear cualquier cosa que puedas imaginar.

La red de Avalanche está compuesta de muchas blockchains. Una de estas blockchains es la C-Chain \(Contract Chain\), que es una instancia de la máquina virtual de Ethereum La API de la C-Chain's casi idéntica a la API de un nodo Ethereum de un nodo Ethereum. Avalanche ofrece la misma interfaz que Ethereum pero con mayor velocidad, mayor rendimiento, menor tarifas y tiempos de confirmación de transacción. Estas propiedades mejoran considerablemente el rendimiento de DApps y la experiencia de usuario de contratos inteligentes.

El objetivo de esta guía es establecer las mejores prácticas con respecto a la escritura, las pruebas e implementación de contratos inteligentes a la of Avalanche. Crearemos contratos inteligentes con entorno de desarrollo [Hardhat](https://hardhat.org).

## Requisitos Previos

### NodeJS y Yarn

Primero, instale la versión LTS \(soporte de largo plazo\) de [nodejs](https://nodejs.org/en). Esto es `14.17.0`en el momento de escribir. `npm`Paquetes de NodeJS

Siguiente, instale [hilo](https://yarnpkg.com):

```zsh
npm install -g yarn
```

### AvalancheGo y Avash

[AvalancheGo](https://github.com/ava-labs/avalanchego) es una implementación de nodo de Avalanche escrita en Go. [Avash](https://docs.avax.network/build/tools/avash) es una herramienta para implementar rápidamente redes de pruebas locales. Juntos, puedes implementar redes de pruebas locales y ejecutar pruebas en ellas.

### Solidity y Avalanche

También es útil tener una comprensión básica de [Solidity](https://docs.soliditylang.org) y [Avalanche](https://docs.avax.network).

## Dependencias

`yarn`Clone el [repositorio de inicio rápido](https://github.com/ava-labs/avalanche-smart-contract-quickstart) e instale los paquetes necesarios

```zsh
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## Escribir contratos

Edita el `Coin.sol`contrato en . `contracts/``Coin.sol`es un [contrato de](https://eips.ethereum.org/EIPS/eip-20)[ Zeppelin](https://openzeppelin.com) ERC20. ERC20 es una interfaz de contrato inteligente popular. También puedes agregar tus propios contratos.

## Hardhat Config

Hardhat utiliza `hardhat.config.js`como el archivo de configuración. Puedes definir tareas, redes, compiladores y más en ese archivo. Para más información mira [aquí](https://hardhat.org/config/).

En nuestro repositorio usamos un archivo preconfigurado [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). Este archivo configura la información de red necesaria para proporcionar una interacción suave con Avalanche. También hay algunas claves privadas predefinidas para probar en una red de pruebas local.

## Tareas de Hardhat

Puedes definir tareas personalizadas de hardhat en [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). Hay dos tareas incluidas como ejemplos: `accounts`y`balances` Ambos tienen scripts en el [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json).

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts`Impulsa la lista de cuentas. `yarn balances`Imprime la lista de saldos de cuenta de AVAX. Al igual que con otros `yarn`scripts puedes pasar en una `--network`bandera a las tareas de hardhat

### Cuentas

Imprime una lista de cuentas en la red de Avash local.

```zsh
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

### Balances

Imprime una lista de cuentas y sus correspondientes saldos de AVAX en la red de Avash local.

```zsh
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

Observa que la primera cuenta ya está financiada. Esto se debe a que esta dirección está prefinanciada en el archivo de génesis de la red local.


## Ayuda de Hardhat

Ejecuta para `yarn hardhat`enumerar la versión de Hardhat, las instrucciones de uso, las opciones globales y las tareas disponibles.

## flujo de trabajo típico de Avash

### Ejecuta Avash

Primero confirma que tienes la última AvalancheGo construida.

```zsh
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

\(Tenga en cuenta que también puedes [descargar binarios de AvalancheGo](https://github.com/ava-labs/avalanchego/releases) precompilados en lugar de crear desde fuente.\)

Empieza a iniciar Avash y ejecuta un script para iniciar una nueva red local.

```zsh
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

Ahora estás ejecutando una red de Avalanche local con 5 nodos.

### Cuentas de fondos

Transfiere 100AVAX desde la X-Chain a cada una de las 10 cuentas en `hardhat.config.ts`con el script .[`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js) Financiar estas cuentas es un requisito previo para implementar e interactuar con contratos inteligentes.

Nota: Si ves `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, necesitas esperar hasta que la red esté bootstrapped y lista para usar. No debería tardar demasiado


```zsh
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

Confirma que cada una de las cuentas se financian con 1000 AVAX.

```zsh
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

Envía cada una de las cuentas AVAX desde la primera cuenta.

```zsh
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

Confirma que los saldos se actualizan

```zsh
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

### Compilar contratos inteligentes

En [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json)hay un `compile`script.

```json
"compile": "npx hardhat compile",
```

Ejecuta para asegurarse `yarn compile`de que tu proyecto compile.

Compara el contrato inteligente.

```zsh
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## Implementar contratos inteligentes

Hardhat permite implementar en varios ambientes. En [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) hay un script para implementar.

Edita el script de implementación en`scripts/deploy.ts`

```json
"deploy": "npx hardhat run scripts/deploy.ts",
```

Puedes elegir el entorno al que quieres implementar al pasar en la `--network`bandera \(por `local`ejemplo, una red local creada con Avash\) `fuji`o `mainnet`para cada entorno respectivo. Si no pasas en `--network`entonces se predeterminará a la red de hardhat Por ejemplo, si quieres implementar en la red principal:

```zsh
yarn deploy --network mainnet
```

Implementa el contrato en tu red local

```zsh
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

Ahora tenemos un token desplegado en `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`.

### Interact con contrato inteligente

Hardhat tiene una consola de desarrolladores para interactuar con contratos y la red. Para más información sobre la consola de Hardhat, mira [aquí](https://hardhat.org/guides/hardhat-console.html). consola Hardhat es una nodeJS-REPL, y puedes usar diferentes herramientas en ella. [Eters](https://docs.ethers.io/v5/) es la biblioteca que usaremos para interactuar con nuestra red.

Puedes abrir la consola con:

```zsh
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

Obtén la instancia de contrato con la dirección de fábrica y de contrato para interactuar con nuestro contrato:

```js
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

La primera línea recupera la fábrica de contratos con ABI & bytecode. La segunda línea recupera una instancia de esa fábrica de contratos con dirección de contrato dada. Recuerda que nuestro contrato ya estaba implementado `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`en el paso anterior.

Acaba de obtener las cuentas:

```js
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
Esta es exactamente la misma lista de cuenta que en `yarn accounts`.

Ahora podemos interactuar con nuestro `ERC-20`contrato:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'0'
```

`account[0]`tiene un saldo porque `account[0]`es la cuenta por defecto. El contrato se despliega con esta cuenta. El constructor de acuñaciones [ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) `TOTAL_SUPPLY`de 123456789 token al despliegue del contrato.

`accounts[1]`actualmente no tiene equilibrio. `accounts[1]`Envía algunos tokens a lo que es `0x9632a79656af553F58738B0FB750320158495942`.

```js
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

Nota: Dado que esta es una red local, no necesitamos esperar hasta que la transacción sea aceptada. `mainnet`Sin embargo para otras redes como `fuji`o necesitas esperar hasta que la transacción sea aceptada con: .`await result.wait()`

Ahora podemos asegurar que los tokens sean transferidos:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456689'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'100'
```

`await coin.transfer(accounts[1], 100)`Como puedes notar que no había información "remitente" en lo que se refiere a la información porque `ethers`usa el primer firmante como el signatario por defecto. `account[0]`En nuestro caso esto es Si queremos usar otra cuenta necesitamos conectarnos con ella primero.

```js
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

`signer1`Ahora podemos llamar con el contrato , que es `account[1]`.

```js
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

Revisemos los saldos ahora:

```js
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456694'
> let value = await coin.balanceOf(accounts[1])
undefined
> value.toString()
'95'
```

Hemos transferido sucesivamente 5 tokes de a la `accounts[1]`vista`accounts[0]`

## Resumen

Ahora tienes las herramientas que necesitas lanzar una red de Avalanche local, crear un proyecto de Hardhat, así como crear, compilar, implementar e interactuar con contratos de Solidity

Únete a nuestro [servidor de Discord](https://chat.avax.network) para saber más y haz cualquier pregunta que tengas tú.