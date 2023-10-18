---
etiquetas: [Construir, Dapps]
descripción: El objetivo de esta guía es establecer las mejores prácticas en cuanto a la escritura, prueba e implementación de contratos inteligentes en la C-Chain de Avalanche utilizando Hardhat.
sidebar_label: Hardhat
pagination_label: Usando Hardhat con la C-Chain de Avalanche
sidebar_position: 0
---

# Usando Hardhat con la C-Chain de Avalanche

## Introducción

El objetivo de esta guía es establecer las mejores prácticas en cuanto a la escritura, prueba e implementación de contratos inteligentes en la C-Chain de Avalanche. Estaremos construyendo contratos inteligentes con el entorno de desarrollo [Hardhat](https://hardhat.org).

## Requisitos previos

### NodeJS y Yarn

Primero, instala la versión LTS (soporte a largo plazo) de
[NodeJS](https://nodejs.org/es). Esto es `18.x` en el momento de escribir esto. NodeJS
incluye `npm`.

A continuación, instala [yarn](https://yarnpkg.com):

```text
npm install -g yarn
```

### AvalancheGo y Avalanche Network Runner

[AvalancheGo](https://github.com/ava-labs/avalanchego) es una implementación de nodo Avalanche
escrita en Go. [Avalanche Network
Runner](/tooling/network-runner.md) es una herramienta para desplegar rápidamente redes de prueba locales.
Juntos, puedes desplegar redes de prueba locales y ejecutar pruebas en ellas.

### Solidity y Avalanche

También es útil tener un entendimiento básico de [Solidity](https://docs.soliditylang.org) y Avalanche.

## Dependencias

Clona el [repositorio de inicio rápido
](https://github.com/ava-labs/avalanche-smart-contract-quickstart) e
instala los paquetes necesarios a través de `yarn`.

```text
git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
cd avalanche-smart-contract-quickstart
yarn
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede usar SSH:

`git clone git@github.com:ava-labs/avalanche-smart-contract-quickstart.git`

Puedes encontrar más información sobre SSH y cómo usarlo
[aquí](https://docs.github.com/es/authentication/connecting-to-github-with-ssh/about-ssh).
:::

## Escribir Contratos

Edita el contrato `ExampleERC20.sol` en `contracts/`. `ExampleERC20.sol` es un
contrato [ERC20](https://eips.ethereum.org/EIPS/eip-20) de
[Open Zeppelin](https://openzeppelin.com). ERC20 es una interfaz de contrato inteligente popular. También puedes agregar tus propios contratos.

## Configuración de Hardhat

Hardhat utiliza `hardhat.config.js` como archivo de configuración. Puedes definir
tareas, redes, compiladores y más en ese archivo. Para más información, consulta
[aquí](https://hardhat.org/config/).

Aquí tienes un ejemplo de `hardhat.config.ts` preconfigurado.

```ts
import { task } from "hardhat/config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import "@nomiclabs/hardhat-waffle"

// Al usar la red hardhat, puedes elegir bifurcar Fuji o Avalanche Mainnet
// Esto te permitirá depurar contratos usando la red hardhat mientras mantienes el estado de la red actual
// Para habilitar la bifurcación, activa uno de estos booleanos y luego ejecuta tus tareas/scripts usando ``--network hardhat``
// Para más información, consulta la guía de hardhat
// https://hardhat.org/hardhat-network/
// https://hardhat.org/guides/mainnet-forking.html
const FORK_FUJI = false
const FORK_MAINNET = false
const forkingData = FORK_FUJI ? {
  url: 'https://api.avax-test.network/ext/bc/C/rpc',
} : FORK_MAINNET ? {
  url: 'https://api.avax.network/ext/bc/C/rpc'
} : undefined

export default {
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.2"
      },
      {
        version: "0.6.4"
      },
      {
        version: "0.7.0"
      },
      {
        version: "0.8.0"
      }
    ]
  },
  networks: {
    hardhat: {
      gasPrice: 225000000000,
      chainId: !forkingData ? 43112 : undefined, //Solo especifica un chainId si no estamos bifurcando
      forking: forkingData
    },
    local: {
      url: 'http://localhost:9650/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43112,
      accounts: [
        "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
        "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
        "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
        "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
        "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
        "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
        "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
        "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
        "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
        "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a"
      ]
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: []
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: []
    }
  }
}
```

Esta configuración proporciona la información de red necesaria para una interacción fluida con Avalanche. También hay algunas claves privadas predefinidas para pruebas en una red de prueba local.

:::info

El puerto en este tutorial utiliza el 9650. Dependiendo de cómo inicies tu red local, podría ser diferente.

:::

## Tareas de Hardhat

Puedes definir tareas personalizadas de hardhat en `hardhat.config.ts`.
Hay dos tareas incluidas como ejemplos: `accounts` y `balances`.

```ts
task("accounts", "Imprime la lista de cuentas", async (args, hre): Promise<void> => {
  const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
  accounts.forEach((account: SignerWithAddress): void => {
    console.log(account.address)
  })
})

task("balances", "Imprime la lista de saldos de cuentas AVAX", async (args, hre): Promise<void> => {
  const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
  for(const account of accounts){
    const balance: BigNumber = await hre.ethers.provider.getBalance(
      account.address
    );
    console.log(`${account.address} tiene un saldo de ${balance.toString()}`);
  }
})
```

`npx hardhat accounts` imprime la lista de cuentas. `npx hardhat balances` imprime la lista de saldos de cuentas AVAX. Al igual que con otros scripts de `yarn`, puedes pasar una bandera `--network` a las tareas de hardhat.

### Cuentas

Imprime una lista de cuentas en la red local de Avalanche Network Runner.

```text
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

Imprime una lista de cuentas y sus saldos AVAX correspondientes en la red local de Avalanche Network Runner.

```text
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC tiene un saldo de 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 tiene un saldo de 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 tiene un saldo de 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 tiene un saldo de 0
0x0B891dB1901D4875056896f28B6665083935C7A8 tiene un saldo de 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 tiene un saldo de 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 tiene un saldo de 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 tiene un saldo de 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB tiene un saldo de 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 tiene un saldo de 0
```

Observa que la primera cuenta ya está financiada. Esto se debe a que esta dirección está prefinanciada en el archivo de génesis de la red local.

### Saldos de ERC20

```js
task("check-erc20-balance", "Imprime el saldo ERC20 de tu cuenta").setAction(async function (taskArguments, hre) {
  const genericErc20Abi = require("./erc20.abi.json");
  const tokenContractAddress = "0x...";
  const provider = ethers.getDefaultProvider("https://api.avax.network/ext/bc/C/rpc");
  const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
  const balance = await contract.balanceOf("0x...");
  console.log(`Saldo en wei: ${balance}`)
});
```

Esto devolverá el resultado en wei. Si quieres saber la cantidad exacta de tokens con su nombre de token, entonces necesitas dividirlo por su decimal. `erc20.abi.json` se puede encontrar [aquí](./erc20.abi.json).

El ejemplo utiliza la [API pública de la C-Chain](/reference/avalanchego/c-chain/api#endpoints) para el proveedor. Para una red Avalanche local, usa `http://127.0.0.1:9650/ext/bc/C/rpc` y para la Testnet Fuji, usa `https://api.avax-test.network/ext/bc/C/rpc`.

## Ayuda de Hardhat

Ejecuta `yarn hardhat` para listar la versión de Hardhat, las instrucciones de uso, las opciones globales y las tareas disponibles.

## Flujo de trabajo típico con Avalanche Network Runner

### Ejecutar Avalanche Network Runner

Primero, confirma que tienes la última versión de AvalancheGo construida.

```text
cd /ruta/a/avalanchego
git fetch -p
git checkout master
./scripts/build.sh
```

(Ten en cuenta que también puedes [descargar binarios precompilados de AvalancheGo](https://github.com/ava-labs/avalanchego/releases) en lugar de construir desde el código fuente).

Confirma que tienes Avalanche Network Runner instalado siguiendo los pasos enumerados [aquí](/tooling/network-runner.md).

Inicia Avalanche Network Runner y ejecuta un script para iniciar una nueva red local.

### Iniciar el servidor

```text
$ cd /ruta/a/Avalanche-Network-Runner
$ avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"
```

### Iniciar una nueva red Avalanche con cinco nodos

```bash
# reemplaza execPath con la ruta a AvalancheGo en tu máquina
# por ejemplo, ${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego
$ AVALANCHEGO_EXEC_PATH="avalanchego"
```

```bash
$ avalanche-network-runner control start \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--number-of-nodes=5 \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH}
```

Ahora estás ejecutando una red Avalanche local con 5 nodos.

### Financiar cuentas

Transfiere 1,000 AVAX desde la X-Chain a cada una de las 10 cuentas en `hardhat.config.ts` con el script [`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js). Financiar estas cuentas es un requisito previo para desplegar e interactuar con contratos inteligentes.

Nota: Si ves `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, debes esperar hasta que la red se haya iniciado y esté lista para usar. No debería tomar mucho tiempo.

```javascript
> const [account1, account2] = await ethers.getSigners();
undefined
> account1.address
'0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC'
> account2.address
'0x9632a79656af553F58738B0FB750320158495942'
```

Check the balance of account1:

```javascript
> const balance1 = await coin.balanceOf(account1.address);
undefined
> balance1.toString()
'500000000000000000000000000'
```

Transfer some tokens from account1 to account2:

```javascript
> await coin.transfer(account2.address, ethers.utils.parseEther('100'));
{
  hash: '0x...',
  ...
}
```

Check the updated balances:

```javascript
> const newBalance1 = await coin.balanceOf(account1.address);
undefined
> newBalance1.toString()
'499999999999999999999999900'
> const newBalance2 = await coin.balanceOf(account2.address);
undefined
> newBalance2.toString()
'100000000000000000000'
```

Exit the console:

```javascript
> .exit
```

Congratulations! You have successfully deployed and interacted with a smart contract on the Avalanche network.

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

Esta es exactamente la misma lista de cuentas que en `yarn accounts`.

Ahora podemos interactuar con nuestro contrato `ERC-20`:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> value = await coin.balanceOf(accounts[1])
BigNumber { _hex: '0x00', _isBigNumber: true }
> value.toString()
'0'
```

La `cuenta[0]` tiene un saldo porque la `cuenta[0]` es la cuenta predeterminada. El contrato se despliega con esta cuenta. El constructor de [ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) acuña `TOTAL_SUPPLY` de 123456789 tokens para el desplegador del contrato.

La `cuenta[1]` actualmente no tiene saldo. Enviemos algunos tokens a `cuenta[1]`, que es `0x9632a79656af553F58738B0FB750320158495942`.

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

Nota: Como esta es una red local, no necesitamos esperar hasta que la transacción sea aceptada. Sin embargo, para otras redes como `fuji` o `mainnet`, debes esperar hasta que la transacción sea aceptada con: `await result.wait()`.

Ahora podemos asegurarnos de que los tokens se hayan transferido:

```javascript
> value = await coin.balanceOf(accounts[0])
BigNumber { _hex: '0x075bccb1', _isBigNumber: true }
> value.toString()
'123456689'
> value = await coin.balanceOf(accounts[1])
BigNumber { _hex: '0x64', _isBigNumber: true }
> value.toString()
'100'
```

Como habrás notado, no había información de "remisor" en `await coin.transfer(accounts[1], 100)`; esto se debe a que `ethers` utiliza el primer firmante como el firmante predeterminado. En nuestro caso, esto es `cuenta[0]`. Si queremos usar otra cuenta, necesitamos conectarnos con ella primero.

```javascript
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

Ahora podemos llamar al contrato con `signer1`, que es `cuenta[1]`.

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

Verifiquemos los saldos ahora:

```javascript
> value = await coin.balanceOf(accounts[0])
BigNumber { _hex: '0x075bccb6', _isBigNumber: true }
> value.toString()
'123456694'
> value = await coin.balanceOf(accounts[1])
BigNumber { _hex: '0x5f', _isBigNumber: true }
> value.toString()
'95'
```

Hemos transferido con éxito 5 tokens de `cuenta[1]` a `cuenta[0]`

## Resumen

Ahora tienes las herramientas que necesitas para lanzar una red Avalanche local, crear un proyecto Hardhat, así como crear, compilar, desplegar e interactuar con contratos Solidity.

Únete a nuestro [Servidor de Discord](https://chat.avax.network) para aprender más y hacer cualquier pregunta que puedas tener.