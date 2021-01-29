# Writing Smart Contracts on Avalanche

## Introduction

The goal of this guide is to lay out a best-practices regarding writing, testing and deploying smart-contracts to Avalanche. We'll be building smart contracts with [Hardhat](https://hardhat.org) which is a very popular development environment for building smart contracts.

## Prerequisites

First install the LTS of [nodejs](https://nodejs.org/en) which is `14.15.4` at the time of writing. NodeJS bundles `npm`. Next install [yarn](https://yarnpkg.com)

```zsh
npm install -g yarn
```

It is also helpful to have a basic understanding of [Solidity](https://docs.soliditylang.org) and [Avalanche](../../../README.md).

## Dependencies

First clone the [repository](https://github.com/ava-labs/avalanche-smart-contract-quickstart) and download the necessary packages.

```zsh
git clone https://github.com/ava-labs/smart-contract-quickstart.git
cd smart-contract-quickstart
yarn
```

## Write Contracts

Edit the `Coin.sol` contract in `contracts/`. `Coin.sol` is an [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) contract. ERC20 is a popular smart contract interface for interoperability. You can also place your own contracts in the `contracts` directory.

## Building

In [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json) there's a `compile` script, defined as:

```json
"compile": "npx hardhat compile",
```

Run `yarn compile` to make sure your project compiles.

## Prepare to Deploy

Edit the deployment script in `scripts/deploy.js`. You can add other contract deployments there.

## Deploy to the hardhat test network

In [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json) there are scripts for deploying to [avash](https://github.com/ava-labs/avash), `fuji` and `mainnet`:

```json
"test-deploy": "npx hardhat run scripts/deploy.js",
"deploy": "npx hardhat run scripts/deploy.js --network mainnet",
"deploy-fuji": "npx hardhat run scripts/deploy.js --network fuji",
```

Deploy your contract to the hardhat network with `yarn test-deploy`.

## Deploy to Fuji or Mainnet

You need to add your private key to the accounts field in [hardhat.config.js](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/hardhat.config.js).

Then run `yarn deploy` for mainnet or `yarn deploy-fuji` for fuji.

## Hardhat Tasks

You can define custom hardhat tasks in [hardhat.config.js](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/hardhat.config.js). There are two tasks included as examples&mdash;`accounts` and `balances` both of which have scripts in [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/master/package.json).

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

You can run `yarn hardhat` to list hardhat version, usage instructions, global options and available tasks.

If you hve any questions, problems, or ideas, you can reach out to us at [Discord](https://chat.avalabs.org/).

