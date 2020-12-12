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

## Compile Contracts with Truffle

```zsh
truffle compile
```

## Create, fund and unlock an account on the C-Chain

When deploying smart contracts to the C-Chain truffle will default to the first available account provided by your C-Chain client as the `from` address used during migrations. If you have not yet created an accounts on your C-Chain instance then you will see the following error message when attempting to run migrations with truffle.

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

```zsh
truffle migrate --network development

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

[...]

Error:  *** Deployment Failed ***

"Migrations" -- Returned error: authentication needed: password or unlock.
```

Now the error message is telling us that we need to unlock our newly created account. We can use Truffle console to accomplish this.

```zsh
truffle console --

## Run Migrations

```zsh
truffle migrate --network development
```
