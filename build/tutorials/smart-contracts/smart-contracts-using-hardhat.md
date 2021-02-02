# Writing Smart Contracts on Avalanche

## Introduction

This guide shows you how to write, test and deploy smart contracts to Avalanche. We'll build smart contracts with [Hardhat](https://hardhat.org), which is a very popular development environment for building smart contracts.

The commands in this guide assume your computer is running Linux or MacOS.

## Prerequisites

First, install the long term support (LTS) version of [Node.js](https://nodejs.org/en). This version is `14.15.4` at the time of writing. You can download Node.js [here](https://nodejs.org/en/download/). When you install Node.js, it will include another tool called `npm`, which we'll use.

Next, use `npm` to install [yarn](https://yarnpkg.com):

```zsh
npm install -g yarn
```

It is also helpful to have a basic understanding of [Solidity](https://docs.soliditylang.org) and [Avalanche](../../../README.md).

## Dependencies

First, clone the quickstart [repository](https://github.com/ava-labs/avalanche-smart-contract-quickstart) and download the necessary packages:

```zsh
git clone https://github.com/ava-labs/smart-contract-quickstart.git
cd smart-contract-quickstart
yarn
```

## Write Contracts

One of the directories inside the `smart-contract-quickstart` directory you just cloned is called `contracts`. Inside that directory is a file named `Coin.sol`. This file is an [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) contract, written in Solidity. ERC20 is a popular smart contract interface for interoperability. You can also place your own contracts in the `contracts` directory.

## Building

In [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json) there's a `compile` script, defined as:

```json
"compile": "npx hardhat compile",
```

Run `yarn compile` to make sure your project compiles.

## Prepare to Deploy

Edit the deployment script in `scripts/deploy.js`. You can add other contract deployments there.

## Deploy to the hardhat test network

In [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json) there are scripts for deploying to mainnet, the Fuji testnet, or a local network run with [avash](https://github.com/ava-labs/avash).

```json
"test-deploy": "npx hardhat run scripts/deploy.js",
"deploy": "npx hardhat run scripts/deploy.js --network mainnet",
"deploy-fuji": "npx hardhat run scripts/deploy.js --network fuji",
```

Deploy your contract to the Hardhat network with `yarn test-deploy`.

## Deploy to Fuji or Mainnet

You need to add your private key to the accounts field in hardhat.config.js.

Then run `yarn deploy` for mainnet or `yarn deploy-fuji` for fuji.

## Hardhat Tasks

You can define custom Hardhat tasks in hardhat.config.js. There are two tasks included as examples&mdash;`accounts` and `balances` both of which have scripts in [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json).

```json
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts` will print the list of accounts. `yarn balances` prints the list of AVAX account balances.

## Sending AVAX

[package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json) has a `send-avax` script which is found in [scripts/sendAvax.js](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/scripts/sendAvax.js).

```json
"send-avax": "npx hardhat run scripts/sendAvax.js",
```

Run it with `yarn send-avax`.

## Hardhat Help

You can run `yarn hardhat` to list Hardhat's version, usage instructions, global options and available tasks.

If you hve any questions, problems, or ideas, you can reach out to us at [Discord](https://chat.avalabs.org/).

