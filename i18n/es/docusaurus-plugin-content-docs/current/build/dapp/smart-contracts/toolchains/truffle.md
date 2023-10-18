---
etiquetas: [Construir, Dapps]
descripción: Lanzar cualquier aplicación descentralizada Solidity nueva o existente en Avalanche C-Chain fomenta la misma experiencia de desarrollo que Ethereum, pero se beneficia de la seguridad, velocidad e interoperabilidad de la Red Avalanche.
sidebar_label: Truffle
pagination_label: Usando Truffle con Avalanche C-Chain
sidebar_position: 1
---

# Usando Truffle con Avalanche C-Chain

## Introducción

[Truffle Suite](https://www.trufflesuite.com) es un conjunto de herramientas para lanzar
aplicaciones descentralizadas (dapps) en la EVM. Con Truffle puedes escribir y
compilar contratos inteligentes, construir artefactos, ejecutar migraciones e interactuar con
contratos desplegados. Este tutorial ilustra cómo Truffle puede ser usado con
la C-Chain de Avalanche, que es una instancia de la EVM.

## Requisitos

Has completado [Ejecutar un Nodo Avalanche
](/nodes/run/node-manually.md) y estás familiarizado con
la [arquitectura de Avalanche
](/learn/avalanche/avalanche-platform.md). También has
realizado un intercambio cruzado de cadenas a través de este [este
tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet)
para obtener fondos en tu dirección de C-Chain.

## Dependencias

- [Avalanche Network
  Runner](https://github.com/ava-labs/avalanche-network-runner) es una herramienta para
  ejecutar una red Avalanche local. Es similar a
  [Ganache](https://www.trufflesuite.com/ganache) de Truffle.
- [NodeJS](https://nodejs.org/en) v8.9.4 o posterior.
- Truffle, que puedes instalar con `npm install -g truffle`

## Iniciar una Red Avalanche Local

[Avalanche Network Runner](https://github.com/ava-labs/avalanche-network-runner)
te permite iniciar despliegues de redes de prueba privadas. Inicia una red Avalanche local de cinco nodos:

```text
cd /ruta/a/avalanche-network-runner
# iniciar una red de cinco nodos de staking
./go run examples/local/fivenodenetwork/main.go
```

Una red Avalanche de cinco nodos está funcionando en tu máquina. La red se ejecutará hasta que presiones Ctrl + C para salir.

## Crear un Directorio Truffle e Instalar Dependencias

Abre una nueva pestaña de terminal para que podamos crear un directorio de trabajo `truffle` e instalar algunas dependencias adicionales.

Primero, navega al directorio en el que pretendes crear tu directorio de trabajo `truffle`:

```text
cd /ruta/al/directorio
```

Crea y entra en un nuevo directorio llamado `truffle`:

```text
mkdir truffle; cd truffle
```

Usa `npm` para instalar [web3](https://web3js.readthedocs.io), que es una biblioteca
a través de la cual podemos hablar con la EVM y
[AvalancheJS](/tooling/avalanchejs-overview.md) que se utiliza para intercambios cruzados de cadenas.

```text
npm install web3 avalanche -s
```

Usaremos web3 para establecer un Proveedor HTTP que es cómo web3 hablará con la EVM.
Por último, crea un proyecto truffle de plantilla:

```text
truffle init
```

La red de desarrollo local prefinancia algunas direcciones estáticas cuando se crean.
Usaremos
[@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider)
para usar estas direcciones prefinanciadas como nuestras cuentas.

```text
npm install @truffle/hdwallet-provider
```

## Actualizar truffle-config.js

Uno de los archivos creados cuando ejecutaste `truffle init` es `truffle-config.js`. Añade lo siguiente a `truffle-config.js`.

```javascript
const Web3 = require("web3")
const HDWalletProvider = require("@truffle/hdwallet-provider")

const protocol = "http"
const ip = "localhost"
const port = 9650
Web3.providers.HttpProvider.prototype.sendAsync =
  Web3.providers.HttpProvider.prototype.send
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}:${port}/ext/bc/C/rpc`
)

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
]

module.exports = {
  networks: {
    development: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        })
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
    },
  },
}
```

Ten en cuenta que puedes cambiar el `protocolo`, `ip` y `puerto` si quieres dirigir
llamadas de API a un nodo AvalancheGo diferente. También ten en cuenta que estamos estableciendo el
`gasPrice` y `gas` a los valores apropiados para la C-Chain de Avalanche.

## Añadir Storage.sol

En el directorio `contracts` añade un nuevo archivo llamado `Storage.sol` y añade el siguiente bloque de código:

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Storage
 * @dev Almacena y recupera un valor en una variable
 */
contract Storage {

    uint256 number;

    /**
     * @dev Almacena el valor en la variable
     * @param num valor a almacenar
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Devuelve el valor
     * @return valor de 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

`Storage` es un contrato inteligente de Solidity que nos permite escribir un número en
la blockchain a través de una función `store` y luego leer el número de vuelta desde
la blockchain a través de una función `retrieve`.

## Añadir Nueva Migración

Crea un nuevo archivo en el directorio `migrations` llamado `2_deploy_contracts.js` y agrega el siguiente bloque de código. Esto se encarga de desplegar el contrato inteligente `Storage` en la blockchain.

```javascript
const Storage = artifacts.require("Storage")

module.exports = function (deployer) {
  deployer.deploy(Storage)
}
```

## Compilar Contratos con Truffle

Cada vez que hagas un cambio en `Storage.sol`, debes ejecutar `truffle compile`.

```text
truffle compile
```

Deberías ver:

```text
Compilando tus contratos...
===========================
> Compilando ./contracts/Migrations.sol
> Compilando ./contracts/Storage.sol
> Artefactos escritos en /ruta/hacia/build/contracts
> Compilado exitosamente usando:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Cuentas en C-Chain

Al desplegar contratos inteligentes en C-Chain, truffle utilizará por defecto la primera cuenta disponible proporcionada por tu cliente de C-Chain como la dirección `from` utilizada durante las migraciones. Hemos agregado algunas claves privadas predefinidas como nuestras cuentas en el archivo `truffle-config.json`. La primera cuenta, que es la cuenta por defecto, debería tener algunos AVAX prefinanciados.

### Cuentas de Truffle

Puedes ver las cuentas importadas con la consola de truffle.

Para abrir la consola de truffle:

```bash
truffle console --network development
```

Nota: Si ves `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, debes esperar hasta que la red se haya iniciado y esté lista para usar. No debería tomar mucho tiempo.

Dentro de la consola de truffle:

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

Observa que la `cuenta[0]` (cuenta por defecto) tiene un saldo, mientras que la `cuenta[1]` no tiene saldo.

### Financiamiento de Cuentas con un Script

Hay un script conveniente que financia la lista de `cuentas`. Puedes encontrarlo
[aquí](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js).
También puedes descargarlo usando este comando:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js
```

Puedes ejecutar el script con:

```text
truffle exec fund-cchain-addresses.js --network development
```

El script financiará con 1000 AVAX a cada cuenta en la lista de `cuentas` de arriba. Después de ejecutar el script con éxito, puedes verificar los saldos con:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### Financia tu Cuenta

Si deseas financiar tus propias cuentas, sigue los pasos en este
[tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet).
Debes enviar al menos `135422040` nAVAX a la cuenta para cubrir el costo de despliegue de contratos.

### APIs Personales

Las APIs personales interactúan con las cuentas del nodo. `web3` tiene algunas funciones que la utilizan, por ejemplo: `web3.eth.personal.newAccount`, `web3.eth.personal.unlockAccount`, etc... Sin embargo, esta API está desactivada por defecto. Puede ser activada con las configuraciones de `C-chain`/`Coreth`. El Avalanche Network Runner actualmente no soporta la activación de esta API. Así que si quieres usar estas características, necesitas ejecutar tu propia red manualmente con la API `internal-private-personal` habilitada a través de la bandera `eth-apis`. Consulta y
[Configuraciones de C-Chain](/nodes/configure/chain-config-flags.md#c-chain-configs).

## Ejecutar Migraciones

Ahora todo está listo para ejecutar las migraciones y desplegar el contrato `Storage`:

```text
truffle(development)> migrate --network development
```

Deberías ver:

```text
Compilando tus contratos...
===========================
> Todo está actualizado, no hay nada que compilar.

Migraciones en simulación (dry-run)
===================================
> Nombre de la red:    'development-fork'
> ID de la red:        1
> Límite de gas del bloque: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Desplegando 'Migrations'
   ------------------------
   > número de bloque:        4
   > marca de tiempo del bloque:     1607734632
   > cuenta:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > saldo:             1000.91683679
   > gas usado:            176943 (0x2b32f)
   > precio del gas:           225 gwei
   > valor enviado:          0 ETH
   > costo total:          0.08316321 ETH

   -------------------------------------
   > Costo total:          0.08316321 ETH

2_deploy_contracts.js
=====================

   Desplegando 'Storage'
   ---------------------
   > número de bloque:        6
   > marca de tiempo del bloque:     1607734633
   > cuenta:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > saldo:             1000.8587791
   > gas usado:            96189 (0x177bd)
   > precio del gas:           225 gwei
   > valor enviado:          0 ETH
   > costo total:          0.04520883 ETH

   -------------------------------------
   > Costo total:          0.04520883 ETH



Resumen
=======
> Despliegues totales: 2
> Costo final: 0.13542204 ETH
```

Si no creaste una cuenta en la C-Chain, verás este error:

```text
Error: Se esperaba el parámetro 'from' pero no se pasó a la función.
```

Si no financiaste la cuenta, verás este error:

```text
Error:  *** Despliegue fallido ***

"No se pudo desplegar la migración debido a fondos insuficientes
   * Cuenta:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Saldo:  0 wei
   * Mensaje:  el remitente no tiene suficientes fondos para enviar la transacción. El costo inicial es: 1410000000000000000 y la cuenta del remitente solo tiene: 0
   * Intenta:
      + Usar una cuenta adecuadamente financiada
```

## Interactuando con tu contrato

Ahora el contrato `Storage` ha sido desplegado. Vamos a escribir un número en la blockchain y luego leerlo de vuelta. Abre la consola de truffle de nuevo:

Obtén una instancia del contrato `Storage` desplegado:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

Esto devuelve:

```text
undefined
```

### Escribiendo un número en la blockchain

Ahora que tienes una instancia del contrato `Storage`, llama a su método `store` y pasa un número para escribir en la blockchain.

```javascript
truffle(development) > instance.store(1234)
```

Deberías ver algo como:

```js
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
    logsBloom: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000