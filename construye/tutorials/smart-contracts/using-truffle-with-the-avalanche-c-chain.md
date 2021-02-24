# Usando Truffle con la  C-Chain de Avalanche

## Introducción

[Truffle Suite](https://www.trufflesuite.com) es un conjunto de herramientas para el lanzamiento de aplicaciones descentralizadas \(Dapps\) en la EVM. Con Truffle puedes escribir y compilar smart contracts, construir artefactos, ejecutar migraciones e interactuar con smart contracts desplegados. Este tutorial ilustra cómo Truffle puede ser utilizado con la C-Chain de Avalanche, la cual es una instancia del EVM.

## Requisitos

Haber completado [Iniciando en Avalanche](../../getting-started.md) y que seas familiar con [La Arquitectura de Avalanche](../../../aprende/platform-overview/). También haber realizado un intercambio de cross-chain a través del tutorial [Transferir AVAX entre la X-Chain y la C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) para obtener fondos en tu dirección de C-Chain.

## Dependencias

* [Avash](https://github.com/ava-labs/avash) es una herramienta para dirigir una red local de Avalanche. Es similar a la de Truffle [Ganache](https://www.trufflesuite.com/ganache).
* [NodeJS](https://nodejs.org/en) v8.9.4 o más actual.
* Truffle, el cual puedes instalar con `npm install -g truffle`

## Iniciar una Red Local de Avalanche

[Avash](https://github.com/ava-labs/avash) te permite hacer despliegues de redes de prueba privadas con hasta 15 nodos AvalancheGo listos para usar. Avash admite la automatización de las tareas habituales mediante scripts lua. Esto permite realizar pruebas rápidas con una amplia variedad de configuraciones. La primera vez que uses avash necesitarás [Instalarlo y configurarlo](https://github.com/ava-labs/avash#quick-setup).

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

Abre una nueva pestaña de terminal para que podamos crear un directorio de `truffle` e instalar algunas dependencias más.

Primero, navega hasta el directorio dentro del cual pretendes crear tu directorio de trabajo `truffle`:

```text
cd /path/to/directory
```

Crea y accede a un nuevo directorio llamado `truffle`:

```text
mkdir truffle; cd truffle
```

Usa`npm` para instalar [web3](https://web3js.readthedocs.io), que es una biblioteca a través de la cual podemos comunicarnos con el EVM:

```text
npm install web3 -s
```

Usaremos la web3 para establecer un proveedor de HTTP, que es como la web3 se comunicará con el EVM. Por último, crea un proyecto de truffle:

```text
truffle init
```

## Actualizar truffle-config.js

Uno de los archivos creados cuando ejecutamos `truffle init` es`truffle-config.js`. Añade lo siguiente a `truffle-config.js`.

```javascript
const Web3 = require('web3');
const protocol = "http";
const ip = "localhost";
const port = 9650;
module.exports = {
  networks: {
   development: {
     provider: function() {
      return new Web3.providers.HttpProvider(`${protocol}://${ip}:${port}/ext/bc/C/rpc`)
     },
     network_id: "*",
     gas: 3000000,
     gasPrice: 470000000000
   }
  }
};
```

Ten en cuenta que puedes cambiar `protocol`, el `ip` y `port` si quieres dirigir los llamados a la API a un nodo de AvalancheGo diferente. También ten en cuenta que estamos estableciendo el `gasPrice` y `gas` a los valores apropiados para la C-Chain de Avalanche.

## Agregando Storage.sol

En el directorio `contracts` agrega un nuevo archivo llamado `Storage.sol` y agrega el siguiente bloque de código:

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

`Storage` es un smart contract de solidity que nos permite escribir un número en la blockchain a través de una función de `store` y luego leer el número de vuelta de la cadena de bloques a través de una función de `retrieve`.

## Añade la nueva migración

Crea un nuevo archivo en el directorio `migrations` llamado `2_deploy_contracts.js`, y agrega el siguiente bloque de código. Esto maneja el despliegue del smart contract `Storage` en la blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compila Smart Contracts con Truffle

Cada vez que hagas un cambio a `Storage.sol` tienes que ejecutar `truffle compile`.

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

## Crea, agrega fondos y debloquea una cuenta en la C-Chain

Cuando se despliegan smart contracts a la C-Chain, truffle se predeterminará a la primera cuenta disponible proporcionada por su cliente de la C-Chain como la dirección `from` utilizada durante las migraciones.

### Crea una Cuenta

Truffle tiene una muy útil [consola](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) la cual podemos usar para interactuar con la blockchain y nuestro smart contract. Abre la consola:

```text
truffle console --network development
```

Ahora, en la consola, crea la cuenta:

```text
truffle(development)> let account = web3.eth.personal.newAccount()
```

Esto nos retorna:

```text
undefined
```

Imprime la cuenta:

```text
truffle(development)> account
```

Esta es la cuenta que nos proporciona:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

Sal de la consola de Truffle:

```text
truffle(development)> .exit
```

### Agrega fondos a tu cuenta

Sigue los pasos en el tutorial de como [Transferir AVAX entre la X-Chain y la C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) para agregar fondos a la nueva cuenta que creamos. Necesitas enviar por lo menos `135422040` nAVAX a la cuenta para cubrir el costo de el despliegue de los smart contracts.

### Desbloquea tu cuenta

Crea un nuevo archivo llamado `web3_script.js` en el directorio `truffle` y agrega lo siguiente:

```javascript
// web3_script.js
let Web3 = require('web3');
let web3 = new Web3("http://localhost:9650/ext/bc/C/rpc");

let main = async () => {
  let accounts = await web3.eth.personal.getAccounts();
  console.log(accounts);
  let account = accounts[0];
  let unlock = await web3.eth.personal.unlockAccount(account);
  console.log(unlock);
}

main()
```

Ejecuta el script para desbloquear tu cuenta.

```text
node web3_script.js
```

Esto debería producir algo así:

```javascript
[ '0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD' ]
true
```

## Ejecutar Migraciones

Ahora todo está listo para ejecutar las migraciones y desplegar el contrato `Storage`:

```text
truffle migrate --network development
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
   > gas price:           470 gwei
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
   > gas price:           470 gwei
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

Si no desbloqueaste la cuenta verás este error:

```text
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## Interactuando con tu smart contract

Ahora que el contrato `Storage` ha sido desplegado. Escribamos un número en la blockchain y luego lo leemos de vuelta. Abre la consola de truffle de nuevo:

```text
truffle console --network development
```

Consigue una instancia del contrato `Storage` desplegado:

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

Si ves este error:

```text
Error: Returned error: authentication needed: password or unlock
```

Entonces ejecuta esto nuevamente: `node web3_script.js`

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

`Storage` undefined

```text
The result of the call to `retrieve` is a `BN` \(big number\). Call its `.toNumber` method to see the value:

```javascript
truffle(development)> i.toNumber()
```

Deberías ver el numero que guardaste.

```javascript
1234
```

## Resumen

Ahora tiene las herramientas necesarias para lanzar una red local de Avalanche, crear un proyecto de truffle, así como crear, compilar, desplegar e interactuar con los Smart Contracts de Solidity.

