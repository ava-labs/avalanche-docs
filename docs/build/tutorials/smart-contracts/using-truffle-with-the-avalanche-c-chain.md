# Using Truffle with the Avalanche C-Chain

## Introduction

[Truffle Suite](https://www.trufflesuite.com) is a toolkit for launching decentralized applications (dapps) on the EVM. With Truffle you can write and compile smart contracts, build artifacts, run migrations and interact with deployed contracts. This tutorial illustrates how Truffle can be used with Avalanche's C-Chain, which is an instance of the EVM.

## Requirements

You've completed [Run an Avalanche Node](../nodes-and-staking/run-avalanche-node.md) and are familiar with [Avalanche's architecture](../../../learn/platform-overview/README.md). You've also performed a cross-chain swap via the [Transfer AVAX Between X-Chain and C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) tutorial to get funds to your C-Chain address.

## Dependencies

* [Avalanche Network Runner](https://github.com/ava-labs/avalanche-network-runner) is a tool for running a local Avalanche network. It's similar to Truffle's [Ganache](https://www.trufflesuite.com/ganache).
* [NodeJS](https://nodejs.org/en) v8.9.4 or later.
* Truffle, which you can install with `npm install -g truffle`

## Start up a local Avalanche network

[Avalanche Network Runner](https://github.com/ava-labs/avalanche-network-runner) allows you to spin up private test network deployments. Start a local five node Avalanche network:

```text
cd /path/to/avalanche-network-runner
# start a five node staking network
./go run examples/local/fivenodenetwork/main.go
```

A five node Avalanche network is running on your machine. Network will run until you CTRL + C to exit.

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

Use `npm` to install [web3](https://web3js.readthedocs.io), which is a library through which we can talk to the EVM and [AvalancheJS](../../tools/avalanchejs/README.md) which is used for cross chain swaps.

```text
npm install web3 avalanche -s
```

We'll use web3 to set an HTTP Provider which is how web3 will speak to the EVM. Lastly, create a boilerplace truffle project:

```text
truffle init
```

The local development network pre-funds some static addresses when created. We'll use [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) to use these pre-funded addresses as our accounts.

```text
npm install @truffle/hdwallet-provider
```

## Update truffle-config.js

One of the files created when you ran `truffle init` is `truffle-config.js`. Add the following to `truffle-config.js`.

```javascript
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const protocol = "http";
const ip = "localhost";
const port = 9650;
Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
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

Note that you can change the `protocol`, `ip` and `port` if you want to direct API calls to a different AvalancheGo node. Also note that we're setting the `gasPrice` and `gas` to the appropriate values for the Avalanche C-Chain.

## Add Storage.sol

In the `contracts` directory add a new file called `Storage.sol` and add the following block of code:

```text
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

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

## Accounts on C-chain

When deploying smart contracts to the C-Chain, truffle will default to the first available account provided by your C-Chain client as the `from` address used during migrations. We have added some pre-defined private keys as our accounts in the `truffle-config.json`. The first and default account should have some pre-funded AVAX.

### Truffle Accounts

You can view imported accounts with truffle console.

To open the truffle console:

```bash
truffle console --network development
```

Note: If you see `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, you need to wait until network is bootstrapped and ready to use. It should not take too long.

Inside truffle console:

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

You can see balances with:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0])
'50000000000000000000000000'

truffle(development)> await web3.eth.getBalance(accounts[1])
'0'
```

Notice that `accounts[0]` (default account) has some balance, while `accounts[1]` has no balance.

### Scripting account funding

There is a convenient script that funds the `accounts` list . You can find it [here](https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js). You can also download it using this command:

```text
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/fund-cchain-addresses.js
```

You can run the script with:

```text
truffle exec fund-cchain-addresses.js --network development
```

Script will fund 1000 AVAX to each account in `accounts` list above. After succesfully running the script you can check balances with:

```bash
truffle(development)> await web3.eth.getBalance(accounts[0]);
'50000001000000000000000000'
truffle(development)> await web3.eth.getBalance(accounts[1]);
'1000000000000000000'
```

### Fund your account

If you wish to fund accounts your own, follow the steps in the [Transfer AVAX Between X-Chain and C-Chain](../platform/transfer-avax-between-x-chain-and-c-chain.md) tutorial. You'll need to send at least `135422040` nAVAX to the account to cover the cost of contract deployments.

### Personal APIs

Personal APIs interact with node’s accounts. `web3` has some functions that uses it, e.g: `web3.eth.personal.newAccount`, `web3.eth.personal.unlockAccount` etc... However this API is disabled by default. It can be activated with `C-chain`/`Coreth` configs. The Avalanche Network Runner currently does not support activating this API. So if you want to use these features you need to run your own network manually with `internal-private-personal` API enabled via the `eth-apis` flag. See [Create a Local Test Network/Manually](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#manually) and [C-Chain Configs](https://docs.avax.network/build/references/avalanchego-config-flags#c-chain-configs).

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

You should see something like:

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

The result of the call to `retrieve` is a `BN` (big number). Call its `.toNumber` method to see the value:

```javascript
truffle(development)> i.toNumber()
```

You should see the number you stored.

```javascript
1234
```

## Summary

Now you have the tools you need to launch a local Avalanche network, create a truffle project, as well as create, compile, deploy and interact with Solidity contracts.
