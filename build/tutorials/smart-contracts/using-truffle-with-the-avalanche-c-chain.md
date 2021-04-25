# Using Truffle with the Avalanche C-Chain

## Introduction

[Truffle Suite](https://www.trufflesuite.com) is a toolkit for launching decentralized applications \(dapps\) on the EVM. With Truffle you can write and compile smart contracts, build artifacts, run migrations and interact with deployed contracts. This tutorial illustrates how Truffle can be used with Avalanche's C-Chain, which is an instance of the EVM.

## Requirements

You've completed [Run an Avalanche Node](../../get-started.md) and are familiar with [Avalanche's architecture](../../../learn/platform-overview/). You've also performed a cross-chain swap via the [Transfer AVAX Between X-Chain and C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) tutorial to get funds to your C-Chain address.

## Dependencies

* [NodeJS](https://nodejs.org/en) v8.9.4 or later.
* Truffle, which you can install with `npm install -g truffle`

## Create truffle directory and install dependencies

Open a new terminal tab to so we can create a `truffle` directory and install some further dependencies.

First, navigate to the directory within which you intend to create your `truffle` working directory:

```text
cd /path/to/directory
```

Create and enter a new directory named `truffle`:

```text
mkdir truffle; cd truffle
```

Use `npm` to install [web3](https://web3js.readthedocs.io), which is a library through which we can talk to the EVM:

```text
npm install web3 -s
```

We'll use web3 to set an HTTP Provider which is how web3 will speak to the EVM. Lastly, create a boilerplace truffle project:

```text
truffle init
```

## Update truffle-config.js

One of the files created when you ran `truffle init` is `truffle-config.js`. Add the following to `truffle-config.js`.

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

Note that you can change the `protocol`, `ip` and `port` if you want to direct API calls to a different AvalancheGo node. Also note that we're setting the `gasPrice` and `gas` to the appropriate values for the Avalanche C-Chain.

## Add Storage.sol

In the `contracts` directory add a new file called `Storage.sol` and add the following block of code:

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

`Storage` is a solidity smart contract which lets us write a number to the blockchain via a `store` function and then read the number back from the blockchain via a `retrieve` function.

## Add new migration

Create a new file in the `migrations` directory named `2_deploy_contracts.js`, and add the following block of code. This handles deploying the `Storage` smart contract to the blockchain.

```javascript
const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
```

## Compile Contracts with Truffle

Any time you make a change to `Storage.sol` you need to run `truffle compile`.

```text
truffle compile
```

You should see:

```text
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Storage.sol
> Artifacts written to /path/to/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

## Create, fund and unlock an account on the C-Chain

When deploying smart contracts to the C-Chain, truffle will default to the first available account provided by your C-Chain client as the `from` address used during migrations.

### Create an account

Truffle has a very useful [console](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#console) which we can use to interact with the blockchain and our contract. Open the console:

```text
truffle console --network development
```

Then, in the console, create the account:

```text
truffle(development)> let account = await web3.eth.personal.newAccount()
```

This returns:

```text
undefined
```

Print the account:

```text
truffle(development)> account
```

This prints the account:

```text
'0x090172CD36e9f4906Af17B2C36D662E69f162282'
```

### Unlock your account:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account)
```

This returns:

```text
true
```

### Fund your account

Follow the steps in the [Transfer AVAX Between X-Chain and C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) tutorial to fund the newly created account. You'll need to send at least `135422040` nAVAX to the account to cover the cost of contract deployments.

### Scripting account creation and funding

Community member [Cinque McFarlane-Blake](https://github.com/cinquemb) has made a convenient script that automates this process. You can find it [here](https://github.com/ava-labs/avalanche-docs/tree/1b06df86bb23632b5fa7bf5bd5b10e8378061929/scripts/make_accounts.js). Download it using this command:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/make_accounts.js;
```

**Note**: If you followed the steps at the beginning of this tutorial when setting up your `truffle-config.js`, then you will need to modify the `make_accounts.js` script to use port 9650 instead of port 9545 \(the default used by truffle\).

You can run the script with:

```text
truffle exec make_accounts.js --network development
```

Script will create an account and fund its C-Chain address. You can customize the number of accounts and the amount of AVAX deposited by editing the `maxAccounts` and `amount` variables in the script.

## Run Migrations

Now everything is in place to run migrations and deploy the `Storage` contract:

```text
truffle(development)> migrate --network development
```

You should see:

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

If you didn't create an account on the C-Chain you'll see this error:

```text
Error: Expected parameter 'from' not passed to function.
```

If you didn't fund the account, you'll see this error:

```text
Error:  *** Deployment Failed ***

"Migrations" could not deploy due to insufficient funds
   * Account:  0x090172CD36e9f4906Af17B2C36D662E69f162282
   * Balance:  0 wei
   * Message:  sender doesn't have enough funds to send tx. The upfront cost is: 1410000000000000000 and the sender's account only has: 0
   * Try:
      + Using an adequately funded account
```

If you didn't unlock the account, you'll see this error:

```text
Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

## Interacting with your contract

Now the `Storage` contract has been deployed. Let's write a number to the blockchain and then read it back. Open the truffle console again:

Get an instance of the deployed `Storage` contract:

```javascript
truffle(development)> let instance = await Storage.deployed()
```

This returns:

```text
undefined
```

### Writing a number to the blockchain

Now that you have an instance of the `Storage` contract, call it's `store` method and pass in a number to write to the blockchain.

```javascript
truffle(development)> instance.store(1234)
```

If you see this error:

```text
Error: Returned error: authentication needed: password or unlock
```

Then run this again:

```text
truffle(development)> await web3.eth.personal.unlockAccount(account[0])
```

You should see something like:

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

### Reading a number from the blockhain

To read the number from the blockchain, call the `retrieve` method of the `Storage` contract instance.

```javascript
truffle(development)> let i = await instance.retrieve()
```

This should return:

```javascript
undefined
```

The result of the call to `retrieve` is a `BN` \(big number\). Call its `.toNumber` method to see the value:

```javascript
truffle(development)> i.toNumber()
```

You should see the number you stored.

```javascript
1234
```

## Summary

Now you have the tools you need to launch a local Avalanche network, create a truffle project, as well as create, compile, deploy and interact with Solidity contracts.

