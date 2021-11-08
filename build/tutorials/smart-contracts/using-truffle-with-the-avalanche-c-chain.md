# Usando Truffle con la C-Chain de Avalanche

## Introducción

[Truffle Suite](https://www.trufflesuite.com) es un conjunto de herramientas para lanzar aplicaciones descentralizadas (DApps) en la máquina virtual de Ethereum (EVM). Con Truffle puedes escribir y compilar smart contracts, construir artefactos, ejecutar migraciones e interactuar con smart contracts desplegados. Este tutorial ilustra cómo Truffle puede ser utilizado con la C-Chain de Avalanche, la cual es una instancia del EVM.

## Requisitos

Haber completado [Ejecuta un nodo de Avalanche](../nodes-and-staking/run-avalanche-node.md) y conocer [La arquitectura de Avalanche](../../../learn/platform-overview/). Haber realizado un intercambio de cadena cruzada a través del tutorial [Transferir AVAX entre la X-Chain y la C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) para obtener fondos en tu dirección de C-Chain.

## Dependencias

* [Avash](https://github.com/ava-labs/avash) es una herramienta para dirigir una red local de Avalanche. Es similar a la de Truffle, [Ganache](https://www.trufflesuite.com/ganache).
* [NodeJS](https://nodejs.org/en) v8.9.4 o más reciente.
* Truffle, que puedes instalar con `npm install -g truffle`.

## Iniciar una Red Local de Avalanche

[Avash](https://github.com/ava-labs/avash) te permite hacer despliegues de redes privadas de prueba con hasta 15 nodos de AvalancheGo, listos para ser utilizados. Avash admite la automatización de las tareas habituales mediante scripts lua. Esto permite realizar pruebas rápidas con una amplia variedad de configuraciones. Necesitarás [instalar y configurar](https://github.com/ava-labs/avash#quick-setup) Avash la primera vez que lo uses.

Inicie una red local de cinco nodos de Avalanche:

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Una red de cinco nodos de Avalanche está funcionando en tu máquina. Cuando quieras salir de Avash, ejecuta `exit`, pero no lo hagas ahora, y no cierres esta pestaña de la terminal.

## Crea el directorio de truffle e instala las dependencias

Abre una nueva pestaña de terminal para que puedas crear un directorio `truffle` e instalar más dependencias.

Primero, navega hasta el directorio dentro del cual deseas crear tu directorio de trabajo `truffle`:

```text
cd /path/to/directory
```

Crea y accede a un nuevo directorio llamado `truffle`:

```text
mkdir truffle; cd truffle
```

Usa `npm` para instalar [web3](https://web3js.readthedocs.io), una biblioteca a través de la cual podemos comunicarnos con EVM:

```text
npm install web3 -s
```

Usaremos la web3 para establecer un proveedor de HTTP, que es como la web3 se comunicará con el EVM. Por último, crea un proyecto de truffle:

```text
truffle init
```

La red de desarrollo (local) en Avash prefinancia algunas direcciones estáticas durante su creación. Usaremos [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) para utilizar estas direcciones prefinanciadas como nuestras cuentas.

```text
npm install @truffle/hdwallet-provider
```

## Actualizar truffle-config.js

Uno de los archivos creados cuando ejecutaste `truffle init` es `truffle-config.js`. Añade lo siguiente a `truffle-config.js`.

```javascript
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const protocol = "http";
const ip = "localhost";
const port = 9650;
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}:${port}/ext/bc/C/rpc`
);

const privateKeys = [
  "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
  "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
  "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
  "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
  "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
  "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
  "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
  "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
  "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
  "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a",
];

module.exports = {
  networks: {
    development: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        });
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
    },
  },
};
```

Ten en cuenta que si quieres dirigir las llamadas de API a otro nodo de AvalancheGo, puedes cambiar `protocol`, `ip` y `port`. Ten presente que estamos estableciendo `gasPrice` y `gas` a los valores apropiados para la C-Chain de Avalanche.

## Agregando Storage.sol

En el directorio `contracts`, agrega un nuevo archivo llamado `Storage.sol` y el siguiente bloque de código:

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

`Storage` es un contrato inteligente de Solidity que nos permite escribir un número en la blockchain a través de una función `store` y luego repetir el número desde la blockchain a través de una función `retrieve`.

## Añade la nueva migración

Crea un nuevo archivo en el directorio `migrations`, llamado `2_deploy_contracts.js`, y agrega el siguiente bloque de códigos. Esto maneja el despliegue del contrato inteligente `Storage` en la blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compila Smart Contracts con Truffle

Cada vez que le hagas un cambio a `Storage.sol` deberás ejecutar `truffle compile`.

```text
truffle compile
```

Deberías ver:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Cuentas en la C-Chain

Cuando se despliegan contratos inteligentes a la C-Chain, Truffle se predeterminará a la primera cuenta disponible, proporcionada por su cliente de la C-Chain como la dirección `from` que se utiliza durante las migraciones. Hemos agregado algunas claves privadas predefinidas como nuestras cuentas en `truffle-config.json` . La primera cuenta predeterminada debería tener algunos AVAX prefinanciados.

### Cuentas de Truffle

Ahora puedes ver las cuentas importadas con la consola de Truffle.

Para abrir la consola de Truffle:

```bash
$ truffle console --network development
```

Nota: Si ves `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, debes esperar hasta que la red haya arrancado y esté lista para usarse. Esto no debería tomar mucho tiempo.

Desde la consola de Truffle:

```bash
truffle(development)> accounts
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

Puedes ver los saldos con:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```

Observa que `accounts[0]` (cuenta predeterminada) tiene algo de saldo, mientras que `accounts[1]` no lo tiene.

### Scripting del financiamiento de la cuenta

Hay un script conveniente que financia la lista `accounts` . Puedes encontrarlo [aquí](https://github.com/ava-labs/avalanche-docs/blob/master/scripts/fund-cchain-addresses.js). También puedes descargarlo con este comando:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js;
```

Puedes ejecutar el script con:

```text
truffle exec fund-cchain-addresses.js --network development
```

El script financiará cada cuenta de la lista `accounts` arriba con 1000 AVAX. Después de ejecutar el script de manera exitosa, podrás verificar los saldos con:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### Agrega fondos a tu cuenta

Si deseas financiar tus propias cuentas, sigue los pasos del tutorial [Transferir AVAX entre la X-Chain y la C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md). Necesitas enviar por lo menos `135422040` nAVAX a la cuenta para cubrir el costo del despliegue de los contractos inteligentes.

### API personales

Las API personales interactúan con las cuentas de nodo. `web3` tiene algunas funciones que la usan, por ejemplo: `web3.eth.personal.newAccount`, `web3.eth.personal.unlockAccount`, etc. Sin embargo, esta API se desactiva de forma predeterminada. Se puede activar con las configuraciones `C-chain`/`Coreth`. Sin embargo, esta API se desactiva de forma predeterminada. Así que, si quieres usar estas funciones, deberás ejecutar tu propia red de forma manual con `personal-api-enabled`. Mira [Crea una red de pruebas locales manualmente](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually) y [Configuraciones de la C-Chain](https://docs.avax.network/build/references/command-line-interface#c-chain-configs).

## Ejecutar Migraciones

Ya todo está listo para ejecutar las migraciones y desplegar el contrato `Storage`:

```text
truffle(development)> migrate --network development
```

Deberías ver:

```text
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Migrations dry-run (simulation)
===============================
> Network name:    'development-fork'
> Network id:      1
> Block gas limit: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > block number:        4
   > block timestamp:     1607734632
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.91683679
   > gas used:            176943 (0x2b32f)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.08316321 ETH

   -------------------------------------
   > Total cost:          0.08316321 ETH

2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > block number:        6
   > block timestamp:     1607734633
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.8587791
   > gas used:            96189 (0x177bd)
   > gas price:           225 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH

   -------------------------------------
   > Total cost:          0.04520883 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

Si no creaste una cuenta en la C-Chain verás este error:

```text
Error: Expected parameter 'from' not passed to function.
```

Si no agregaste fondos a la cuenta verás este error:

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

## Interactuando con tu smart contract

El contrato `Storage` ya se ha desplegado. Escribamos un número en la blockchain y luego lo leemos de vuelta. Abre la consola de truffle de nuevo:

Obtén una instancia del contrato desplegado `Storage`:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Esto nos retorna:

```text
undefined
```

### Escribiendo un número en la blockchain

Ahora que tienes una instancia del contrato `Storage`, haz un llamado a su método `store` y dale un número para que lo escriba en la blockchain.

```javascript
truffle(development)> instance.store(1234)
```

Deberías ver algo así:

```javascript
{
  tx: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
  receipt: {
    blockHash: '0x8bacbce7c9d835db524bb856288e3a73a6afbe49ab34abd8cd8826db0240eb21',
    blockNumber: 9,
    contractAddress: null,
    cumulativeGasUsed: 26458,
    from: '0x34cb796d4d6a3e7f41c4465c65b9056fe2d3b8fd',
    gasUsed: 26458,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    to: '0x0d507b0467baef742f9cc0e671eddbdf6df41d33',
    transactionHash: '0x10afbc5e0b9fa0c1ef1d9ec3cdd673e7947bd8760b22b8cdfe08f27f3a93ef1e',
    transactionIndex: 0,
    rawLogs: []
  },
  logs: []
}
```

### Leyendo un número de la blockhain

Para leer el número de la blockchain, ejecuta el método `retrieve` de la instancia del contrato `Storage`.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Esto nos retorna:

```javascript
undefined
```

El resultado del llamado a `retrieve`es un `BN` (número grande). Llama a su método `.toNumber` para ver el valor:

```javascript
truffle(development)> i.toNumber()
```

Deberías ver el número que guardaste.

```javascript
1234
```

## Resumen

Ahora tiene las herramientas necesarias para lanzar una red local de Avalanche, crear un proyecto de truffle, así como crear, compilar, desplegar e interactuar con los Smart Contracts de Solidity.

