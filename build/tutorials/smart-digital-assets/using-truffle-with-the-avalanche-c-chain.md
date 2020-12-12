# Using Truffle with the Avalanche C-Chain

## Introduction

[Truffle Suite](https://www.trufflesuite.com) is a toolkit for launching Dapps on the EVM. With Truffle you can write and compile smart contracts, build artifacts, run migrations and interact with your deployed contracts. This tutorial illustrates how Truffle can be used with Avalanche's C-Chain, which is an instance of the EVM.

## Requirements

You've completed [Getting Started](../../getting-started.md) and are familiar with the [Avalanche's architecture](../../../learn/platform-overview/). You've also performed a cross-chain swap via the [Transfer AVAX Between X-Chain, P-Chain, and C-Chain](../../tutorials/platform/transfer-avax-between-x-chain-and-p-chain) tutorial.

## Dependencies

* [Avash](https://github.com/ava-labs/avash) is Avalanche's local development network. It's similar to Truffle's [Ganache](https://www.trufflesuite.com/ganache).
* [NodeJS](https://nodejs.org/en) v8.9.4 or later.
* Truffle: `npm install -g truffle`

## Start up a local Avalanche network

[Avash](https://github.com/ava-labs/avash) is Avalanche's local development network. You can use it to spin up private test network deployments with up to 15 full AvalancheGo nodes out-of-the-box. Avash support automation of regular tasks via lua scripts. This enables rapid testing against a wide variety of configurations. The first time you use avash you'll need to [install and build it](https://github.com/ava-labs/avash#quick-setup). Once that is complete you can start avash with these steps:

```zsh
cd /path/to/avash
# start avash
./avash
# start a five node staking network
runscript scripts/five_node_staking.lua
```

The previous steps `cd` to your avash directory, start avash, and lastly fire up a five node Avalanche network.

## Create truffle directory and install dependencies

Now we need to create a `truffle` directory and install some further dependencies. First `cd` to a directory within which you intend to create your `truffle` working directory. After creating and entering the `truffle` directory, next, using `npm`, install [web3](https://web3js.readthedocs.io) which is a library though which we can talk to the EVM. We'll use web3 to set an HTTP Provider which is **how** web3 will speak to the EVM. Lastly call `truffle init` to create a boilerplace truffle project.

```zsh
cd /path/to/directory
mkdir truffle
cd truffle
npm install web3 -s
truffle init
```

## Update truffle-config.js

One of the files created when you ran `truffle init` is `truffle-config.js`. Add the following to your `truffle-config.js` file.

```js
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

Note that you can change the `protocol`, `ip` and/or `port` as needed. Also note that we're setting the `gasPrice` and `gas` to the appropriate values for the Avalanche C-Chain.

## Add Storage.sol

In the `contracts` directory add a new file called `Storage.sol` and add the following block of code.

```solidity
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

`Storage` is a solidity smart contract which lets us write a number to the blockchain via a `store` function and then read the number back from the blockchain via a `retrieve` function.

## Add new migration

Create a new file in the `migrations` directory called `2_deploy_contracts.js` and add the following block of code. This migration handles deploying the `Storage` smart contract to the blockchain.

```js
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compile Contracts with Truffle

Any time you make a change to `Storage.sol` you need to run `truffle compile`.

```zsh
truffle compile

> Warning: possible unsupported (undocumented in help) command line option: --force

Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Create, fund and unlock an account on the C-Chain

When deploying smart contracts to the C-Chain truffle will default to the first available account provided by your C-Chain client as the `from` address used during migrations. If you have not yet created an accounts on your C-Chain instance then you will see the following error message when attempting to run migrations with truffle.

### Create an account

```zsh
truffle migrate --network development

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Error: Expected parameter 'from' not passed to function.
```

Truffle has a very useful [console](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) which we can use to interact with the blockchain and our contract. We'll use it to create the needed account.

```zsh
truffle console --network development
truffle(development)> let account = web3.eth.personal.newAccount()
truffle(development)> account
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

Here we used the truffle console, which bundles `web3`, to create a new account `0x090172CD36e9f4906Af17B2C36D662E69f162282`. If we now try and run the migration again we'll see this error:

### Fund your account

```zsh
truffle migrate --network development

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

[...]

Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

We need to fund the newly created account. Follow the steps in the [Transfer AVAX Between X-Chain, P-Chain, and C-Chain](../../tutorials/platform/transfer-avax-between-x-chain-and-p-chain) tutorial to fund you're newly created account.

### Unlock your account

```zsh
truffle migrate --network development

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

[...]

Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

Now the error message is telling us that we need to unlock our newly created account. We can use Truffle console to accomplish this. For this we need to create a new file called `web3_script.js` and add the following script.

```zsh
// web3_script.js
let Web3 = require('web3');
let web3 = new Web3("http://localhost:9650/ext/bc/C/rpc");

let main = async (): Promise<any> => {
  let accounts = await web3.eth.personal.getAccounts();
  console.log(accounts)
  let account = accounts[0]
  let unlock = await web3.eth.personal.unlockAccount(account)
  console.log(unlock)
}
  
main()
```

Run the script to unlock your account.

```zsh
node web3_script.js
[ '0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD' ]
true
```

## Run Migrations

Now everything should be in place to run the migrations and deploy the `Storage` contract.

```zsh
truffle migrate --network development

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
> Final cost:          0.12837204 ETH





Starting migrations...
======================
> Network name:    'development'
> Network id:      1
> Block gas limit: 99804786 (0x5f2e672)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x2488355f8ace692e9127423168de2aac53d2526a51e7d6521c94c5702b2000aa
   > Blocks: 0            Seconds: 0
   > contract address:    0x52A7421B0a7B354ee76ef295981803bEdd0F1BaB
   > block number:        3
   > block timestamp:     1607734633
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.90978679
   > gas used:            191943 (0x2edc7)
   > gas price:           470 gwei
   > value sent:          0 ETH
   > total cost:          0.09021321 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.09021321 ETH


2_deploy_contracts.js
=====================

   Deploying 'Storage'
   -------------------
   > transaction hash:    0x95ea3a1928b2ed4c8259635ae2f6b24484f98ef4dcd6bb7f4e2be4ec346f023c
   > Blocks: 0            Seconds: 0
   > contract address:    0x0d507b0467BaEF742F9CC0e671EDDbDf6Df41d33
   > block number:        5
   > block timestamp:     1607734635
   > account:             0x34Cb796d4D6A3e7F41c4465C65b9056Fe2D3B8fD
   > balance:             1000.8446791
   > gas used:            96189 (0x177bd)
   > gas price:           470 gwei
   > value sent:          0 ETH
   > total cost:          0.04520883 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.04520883 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.13542204 ETH
```

## Interacting with your contract

Now that the `Storage` contract has been deployed we can write a number to the blockchain and then read it back. First fire up the truffle console. Next get an instance of the deployed `Storage` contract.

```zsh
truffle console --network development
truffle(development)>let instance = await Storage.deployed()
```

### Writing a number to the blockchain

Once you have an instance of the `Storage` contract then call it's `store` method and pass in a number that you want to write to the blockchain. If it's successful you'll see a tx logged to the console.

```zsh
truffle(development)> instance.store(1234)

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

### Reading a number from the blockhain

Lastly we want to read the number from the blockchain. To do this call the `retrieve` method of the `Storage` contract's instance. The result of the call to `retrieve` is a `BN` which you can call `.toNumber` on to see the value.

```zsh
truffle(development)> let i = await instance.retrieve()
undefined
truffle(development)> i.toNumber()
1234
```

## Summary

You should now have everything you need to launch your own private test network, install needed dependencies such as truffle and web3, create a sample truffle project and add a `Storage` contract and associated migration, and lastly compile, deploy and interact with the `Storage` contract.