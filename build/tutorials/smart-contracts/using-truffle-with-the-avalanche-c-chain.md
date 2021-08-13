# Usando la Trufa con la cadena Avalanche

## Introducción

[Truffle Suite](https://www.trufflesuite.com) es un conjunto de herramientas para lanzar aplicaciones descentralizadas \(dapps\) en el EVM. Con Truffle puedes escribir y compilar contratos inteligentes, construir artefactos, ejecutar migraciones e interactuar con contratos desplegados. Este tutorial ilustra cómo se puede utilizar la Trufa con la cadena C-Chain, que es una instancia del EVM.

## Requisitos para requisitos de seguridad

Has completado [Run Nodo](../nodes-and-staking/run-avalanche-node.md) Avalanche y estás familiarizado con [la arquitectura de Avalanche](../../../learn/platform-overview/). También ha realizado un intercambio de cadena cruzada a través del tutorial [Transfer AVAX entre cadena X y](../platform/transfer-avax-between-x-chain-and-c-chain.md) cadena C para obtener fondos a su dirección de cadena C.

## Dependencias

* [Avash](https://github.com/ava-labs/avash) es una herramienta para ejecutar una red local de Avalanche. Es similar al [ganache](https://www.trufflesuite.com/ganache) de Truffle.
* [NodeJS](https://nodejs.org/en) v8.9.4 o posterior.
* Trufa, que se puede instalar con `npm instalar trufa -g`

## Inicie una red local de Avalanche

[Avash](https://github.com/ava-labs/avash) le permite girar los despliegues de red de pruebas privados con hasta 15 nodos AvalancheGo fuera de la caja. Avash admite la automatización de tareas regulares a través de scripts lua. Esto permite realizar pruebas rápidas contra una amplia variedad de configuraciones. La primera vez que utilice avash tendrá que [instalar y construirla](https://github.com/ava-labs/avash#quick-setup).

Inicie una red local de cinco nodos Avalanche:

```text
cd /path/to/avash
# build Avash if you haven't done so
go build
# start Avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

Una red de cinco nodos Avalanche está funcionando en su máquina. Cuando quieras salir de `Avash`, correr la salida, pero no hagas eso ahora, y no cierres esta ficha terminal.

## Crear directorio de trufas e instalar dependencias

Abra una nueva pestaña terminal para que podamos crear un directorio `de trufas` e instalar algunas dependencias adicionales.

Primero, navegue al directorio dentro del cual tiene la intención de crear su directorio de trabajo `de` trufa:

```text
cd /path/to/directory
```

Crear e introducir un nuevo directorio llamado `trufa`:

```text
mkdir truffle; cd truffle
```

Utilice `npm` para instalar [web3](https://web3js.readthedocs.io), que es una biblioteca a través de la cual podemos hablar con el EVM:

```text
npm install web3 -s
```

Usaremos web3 para configurar un proveedor HTTP que es como web3 hablará con el EVM. Por último, crear un proyecto de trufa de caldera:

```text
truffle init
```

## Actualizar truffle-config.js

Uno de los archivos creados cuando se ejecutó `trufa init` es `truffle-config.js`. Añada lo siguiente a `truffle-config.js`.

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
     gasPrice: 225000000000
   }
  }
};
```

Tenga en cuenta que puede cambiar el `protocolo`, `ip` y `puerto` si desea dirigir llamadas API a un nodo AvalancheGo diferente. También observamos que estamos estableciendo el `gasPrice` y `gas` a los valores apropiados para la cadena Avalanche

## Añadir Storage.sol

En el directorio de `contratos` añadir un nuevo archivo llamado `Storage.sol` y añadir el siguiente bloque de código:

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

`El almacenamiento` es un contrato inteligente de solidez que nos permite escribir un número a la cadena de bloques a través de una función `de tienda` y luego leer el número de vuelta desde la cadena de bloques a través de una función `de` recuperación.

## Añadir nueva migración

Crear un nuevo archivo en el directorio de `migraciones` llamado `2_reploy_contracts.js`, y agregar el siguiente bloque de código. Esto maneja implementar el contrato inteligente `de almacenamiento` en el blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compilar contratos con trufa

En cualquier momento que haga un cambio a `Storage.sol` que necesita para ejecutar `la pila de trufa`.

```text
truffle compile
```

Debería ver:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Crear, financiar y desbloquear una cuenta en la cadena C

Al implementar contratos inteligentes en la cadena C, truffle predeterminará la primera cuenta `disponible` proporcionada por su cliente de C-Chain como la dirección utilizada durante las migraciones.

### Crear una cuenta

Truffle tiene una [consola](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) muy útil que podemos utilizar para interactuar con el blockchain y nuestro contrato. Abra la consola:

```text
truffle console --network development
```

Entonces, en la consola, cree la cuenta:

```text
truffle(development)> let account = await web3.eth.personal.newAccount()
```

Esto devuelve a:

```text
undefined
```

Imprime la cuenta:

```text
truffle(development)> account
```

Esto imprime la cuenta:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

### Desbloquear su cuenta:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account)
```

Esto devuelve a:

```text
true
```

### Fondo tu cuenta

Siga los pasos en el tutorial [Transfer AVAX entre cadena X y cadena C](../platform/transfer-avax-between-x-chain-and-c-chain.md) para financiar la cuenta recién creada. Tendrá que enviar al menos `135422040` nAVAX a la cuenta para cubrir el costo de los despliegues de contrato.

### Creación de cuenta de Escrituras y financiación

Miembro de la comunidad [Cinque McFarlane-Blake](https://github.com/cinquemb) ha hecho un script conveniente que automatiza este proceso. Puedes encontrarlo [aquí](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js). Descargarlo utilizando este comando:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/make_accounts.js;
```

**Nota**: Si siguió los pasos al comienzo de este tutorial al configurar su `truffle-config.js`, entonces tendrá que modificar el script `make_accounts.js` para usar el puerto 9650 en lugar del puerto 9545 \(el predeterminado utilizado por truffle\).

Puede ejecutar el guion con:

```text
truffle exec make_accounts.js --network development
```

Script creará una cuenta y financiará su dirección de cadena C. Puede personalizar el número de cuentas y la cantidad de AVAX depositada editando las variables de `maxAccounts` y `cantidad` en el script.

## Ejecutar Migraciones

Ahora todo está en marcha para ejecutar migraciones e implementar el contrato `de` almacenamiento:

```text
truffle(development)> migrate --network development
```

Debería ver:

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

Si no creaste una cuenta en la cadena C verá este error:

```text
Error: Expected parameter 'from' not passed to function.
```

Si no financiaste la cuenta, verá este error:

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

Si no desbloqueó la cuenta, verá este error:

```text
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## Interactuar con su contrato

Ahora se ha desplegado el contrato `de` almacenamiento. Escribamos un número al blockchain y luego leamos de nuevo. Abra la consola de trufa de nuevo:

Obtener una instancia del contrato de `almacenamiento` desplegado:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Esto devuelve a:

```text
undefined
```

### Escribir un número al blockchain

Ahora que tiene una instancia del contrato `de` almacenamiento, llame a su método de `tienda` y pase en un número para escribir al blockchain.

```javascript
truffle(development)> instance.store(1234)
```

Si ve este error:

```text
Error: Returned error: authentication needed: password or unlock
```

Luego vuelva a ejecutarlo:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account[0])
```

Deberías ver algo como:

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

### Lectura de un número de blockhain

Para leer el número de la cadena de bloqueo, llame al método de `recuperación` de la instancia de contrato `de` almacenamiento.

```javascript
truffle(development)> let i = await instance.retrieve()
```

Esto debería volver:

```javascript
undefined
```

El resultado de la llamada a `recuperar` es un `BN` \(gran número\). Llama a su método `.toNumber` para ver el valor:

```javascript
truffle(development)> i.toNumber()
```

Deberías ver el número que guardaste.

```javascript
1234
```

## Resumen

Ahora tiene las herramientas que necesita para lanzar una red local de Avalanche, crear un proyecto de trufa, así como crear, compilar, desplegar e interactuar con contratos de Solidity

