# Using Hardhat with the Avalanche C-Chain

## Introduction

Avalanche is an open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem. Avalanche gives you complete control on both the network and application layers—helping you build anything you can imagine.

The Avalanche Network is composed of many blockchains. One of these blockchains is the C-Chain (Contract Chain), which is an Ethereum Virtual Machine instance. The C-Chain's API is almost identical to an Ethereum node's API. Avalanche offers the same interface as Ethereum but with higher speed, higher throughput, lower fees and lower transaction confirmation times. These properties considerably improve the performance of DApps and the user experience of smart contracts.

The goal of this guide is to lay out best practices regarding writing, testing and deployment of smart contracts to Avalanche's C-Chain. We'll be building smart contracts with development environment [Hardhat](https://hardhat.org).

## Prerequisites

### NodeJS and Yarn

First, install the LTS (long-term support) version of [nodejs](https://nodejs.org/en). This is `14.17.0` at the time of writing. NodeJS bundles `npm`.

Next, install [yarn](https://yarnpkg.com):

```text
npm install -g yarn
```

### AvalancheGo and Avalanche Network Runner

[AvalancheGo](https://github.com/ava-labs/avalanchego) is an Avalanche node implementation written in Go. [Avalanche Network Runner](../../subnets/network-runner.md) is a tool to quickly deploy local test networks. Together, you can deploy local test networks and run tests on them.

### Solidity and Avalanche

It is also helpful to have a basic understanding of [Solidity](https://docs.soliditylang.org) and Avalanche.

## Dependencies

Clone the [quickstart repository](https://github.com/ava-labs/avalanche-smart-contract-quickstart) and install the necessary packages via `yarn`.

```text
$ git clone https://github.com/ava-labs/avalanche-smart-contract-quickstart.git
$ cd avalanche-smart-contract-quickstart
$ yarn
```

## Write Contracts

Edit the `Coin.sol` contract in `contracts/`. `Coin.sol` is an [Open Zeppelin](https://openzeppelin.com) [ERC20](https://eips.ethereum.org/EIPS/eip-20) contract. ERC20 is a popular smart contract interface. You can also add your own contracts.

## Hardhat Config

Hardhat uses `hardhat.config.js` as the configuration file. You can define tasks, networks, compilers and more in that file. For more information see [here](https://hardhat.org/config/).

In our repository we use a pre-configured file [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). This file configures necessary network information to provide smooth interaction with Avalanche. There are also some pre-defined private keys for testing on a local test network.

:::info

The port in this tutorial uses 9650. Depending on how you start your local network, it could be different. Please check [here](../../quickstart/create-a-local-test-network.md#retrieve-all-nodes) to see how to retrieve the port numbers.

:::

## Hardhat Tasks

You can define custom hardhat tasks in [hardhat.config.ts](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/hardhat.config.ts). There are two tasks included as examples: `accounts` and `balances`. Both have scripts in [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json).

```javascript
"accounts": "npx hardhat accounts",
"balances": "npx hardhat balances"
```

`yarn accounts` prints the list of accounts. `yarn balances` prints the list of AVAX account balances. As with other `yarn` scripts you can pass in a `--network` flag to hardhat tasks.

### Accounts

Prints a list of accounts on the local Avalanche Network Runner network.

```text
$ yarn accounts --network local
yarn run v1.22.4
npx hardhat accounts --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
0x9632a79656af553F58738B0FB750320158495942
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4
0x0B891dB1901D4875056896f28B6665083935C7A8
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2
0x78A23300E04FB5d5D2820E23cc679738982e1fd5
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB
0x0Fa8EA536Be85F32724D57A37758761B86416123
```

### Balances

Prints a list of accounts and their corresponding AVAX balances on the local Avalanche Network Runner network.

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000000000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 0
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 0
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 0
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 0
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 0
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 0
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 0
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 0
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 0
```

Notice that the first account is already funded. This is because this address is pre-funded in the local network genesis file.

## Hardhat Help

Run `yarn hardhat` to list Hardhat's version, usage instructions, global options and available tasks.

## Typical Avalanche Network Runner Workflow

### Run Avalanche Network Runner

First confirm you have the latest AvalancheGo built.

```text
$ cd /path/to/avalanchego
$ git fetch -p
$ git checkout master
$ ./scripts/build.sh
```

(Note that you can also [download pre-compiled AvalancheGo binaries](https://github.com/ava-labs/avalanchego/releases) rather than building from source.)

Confirm you have Avalanche Network Runner installed by following the steps listed [here](../../quickstart/create-a-local-test-network.md#installation)

Start Avalanche Network Runner and run a script to start a new local network.

### Start the server

```text
$ cd /path/to/Avalanche-Network-Runner
$ avalanche-network-runner server \
--log-level debug \
--port=":8080" \
--grpc-gateway-port=":8081"
```

### Start a New Avalanche Network with Five Nodes

```bash
# replace execPath with the path to AvalancheGo on your machine
# e.g., ${HOME}/go/src/github.com/ava-labs/avalanchego/build/avalanchego
$ AVALANCHEGO_EXEC_PATH="avalanchego"
```

```bash
$ avalanche-network-runner control start \
--log-level debug \
--endpoint="0.0.0.0:8080" \
--number-of-nodes=5 \
--avalanchego-path ${AVALANCHEGO_EXEC_PATH}
```

Now you're running a local Avalanche network with 5 nodes.

### Fund Accounts

Transfer 1,000 AVAX from the X-Chain to each of the 10 accounts in `hardhat.config.ts` with the script [`fund-cchain-addresses`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/scripts/fund-cchain-addresses.js). Funding these accounts is a prerequisite for deploying and interacting with smart contracts.

Note: If you see `Error: Invalid JSON RPC response: "API call rejected because chain is not done bootstrapping"`, you need to wait until network is bootstrapped and ready to use. It should not take too long.

```text
$ cd /path/to/avalanche-smart-contract-quickstart
$ yarn fund-cchain-addresses
yarn run v1.22.4
npx hardhat run scripts/fund-cchain-addresses.js
Exporting 1000 AVAX to each address on the C-Chain...
2b75ae74ScLkWe5GVFTYJoP2EniMywkcZySQUoFGN2EJLiPDgp
Importing AVAX to the C-Chain...
2dyXcQGiCk1ckCX4Fs8nLgL8GJgsM72f9Ga13rX5v9TAguVJYM
✨  Done in 5.03s.
```

Confirm each of the accounts are funded with 1000 AVAX.

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 50000001000000000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000000000000000000
✨  Done in 0.72s.
```

Send each of the accounts some AVAX from the first account.

```text
$ yarn send-avax-wallet-signer --network local
yarn run v1.22.4
npx hardhat run scripts/sendAvaWalletSigner.ts --network local
Seeding addresses with AVAX
✨  Done in 1.33s.
```

Confirm that the balances are updated

```text
$ yarn balances --network local
yarn run v1.22.4
npx hardhat balances --network local
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC has balance 49999999995275000000000000
0x9632a79656af553F58738B0FB750320158495942 has balance 1000010000000000000000
0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430 has balance 1000010000000000000000
0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4 has balance 1000010000000000000000
0x0B891dB1901D4875056896f28B6665083935C7A8 has balance 1000010000000000000000
0x01F253bE2EBF0bd64649FA468bF7b95ca933BDe2 has balance 1000010000000000000000
0x78A23300E04FB5d5D2820E23cc679738982e1fd5 has balance 1000010000000000000000
0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293 has balance 1000010000000000000000
0x61e0B3CD93F36847Abbd5d40d6F00a8eC6f3cfFB has balance 1000010000000000000000
0x0Fa8EA536Be85F32724D57A37758761B86416123 has balance 1000010000000000000000
```

Note: If you see `Error HH108: Cannot connect to the network local. Please make sure your node is running, and check your internet connection and networks config`, ensure that you are using a valid Node Port. See which ports the Nodes are using by running the command:

```text
$ cd /path/to/avalanche-network-runner
$ avalanche-network-runner control uris \
--log-level debug \
--endpoint="0.0.0.0:8080"
```

### Compile Smart Contracts

In [`package.json`](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) there's a `compile` script.

```javascript
"compile": "npx hardhat compile",
```

Run `yarn compile` to make sure your project compiles.

Compile the smart contract.

```text
$ yarn compile
yarn run v1.22.4
rimraf ./build/
npx hardhat compile
Compiling 1 file with 0.6.4
Compilation finished successfully
✨  Done in 2.13s.
```

## Deploy Smart Contracts

Hardhat enables deploying to multiple environments. In [package.json](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/package.json) there is a script for deploying.

Edit the deployment script in `scripts/deploy.ts`

```javascript
"deploy": "npx hardhat run scripts/deploy.ts",
```

You can choose which environment that you want to deploy to by passing in the `--network` flag with `local` (e.g. a local network created with Avalanche Network Runner), `fuji`, or `mainnet` for each respective environment. If you don't pass in `--network` then it will default to the hardhat network. For example, if you want to deploy to mainnet:

```text
yarn deploy --network mainnet
```

Deploy the contract to your local network

```text
$ yarn deploy --network local
yarn run v1.22.4
npx hardhat run scripts/deploy.ts --network local
Coin deployed to: 0x17aB05351fC94a1a67Bf3f56DdbB941aE6
✨  Done in 1.28s.
```

We now have a token deployed at `0x17aB05351fC94a1a67Bf3f56DdbB941aE6`.

### Interact with Smart Contract

Hardhat has a developer console to interact with contracts and the network. For more information about Hardhat's console see [here](https://hardhat.org/guides/hardhat-console.html). Hardhat console is a NodeJS-REPL, and you can use different tools in it. [ethers](https://docs.ethers.io/v5/) is the library that we'll use to interact with our network.

You can open console with:

```text
$ yarn console --network local
yarn run v1.22.11
npx hardhat console --network local
Welcome to Node.js v16.2.0.
Type ".help" for more information.
>
```

Get the contract instance with factory and contract address to interact with our contract:

```javascript
> const Coin = await ethers.getContractFactory('ExampleERC20');
undefined
> const coin = await Coin.attach('0x17aB05351fC94a1a67Bf3f56DdbB941aE6')
undefined
```

The first line retrieves contract factory with ABI & bytecode. The second line retrieves an instance of that contract factory with given contract address. Recall that our contract was already deployed to `0x17aB05351fC94a1a67Bf3f56DdbB941aE6` in the previous step.

Fetch the accounts:

```javascript
> let accounts = await ethers.provider.listAccounts()
undefined
> accounts
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

This is exactly the same account list as in `yarn accounts`.

Now we can interact with our `ERC-20` contract:

```javascript
> let value = await coin.balanceOf(accounts[0])
undefined
> value.toString()
'123456789'
> value = await coin.balanceOf(accounts[1])
BigNumber { _hex: '0x00', _isBigNumber: true }
> value.toString()
'0'
```

`account[0]` has a balance because `account[0]` is the default account. The contract is deployed with this account. The constructor of [ERC20.sol](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/ERC20.sol) mints `TOTAL_SUPPLY` of 123456789 token to the deployer of the contract.

`accounts[1]` currently has no balance. Send some tokens to `accounts[1]`, which is `0x9632a79656af553F58738B0FB750320158495942`.

```javascript
> let result = await coin.transfer(accounts[1], 100)
undefined
> result
{
  hash: '0x35eec91011f9089ba7689479617a90baaf8590395b5c80bb209fa7000e4848a5',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 3,
  data: '0xa9059cbb0000000000000000000000009632a79656af553f58738b0fb7503201584959420000000000000000000000000000000000000000000000000000000000000064',
  r: '0xc2b9680771c092a106eadb2887e5bff41fcda166c8e00f36ae79b196bbc53d36',
  s: '0x355138cb5e2b9f20c15626638750775cfc9423881db374d732a8549d05ebf601',
  v: 86260,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Note: Since this is a local network, we did not need to wait until transaction is accepted. However for other networks like `fuji` or `mainnet` you need to wait until transaction is accepted with: `await result.wait()`.

Now we can ensure that tokens are transferred:

```javascript
> value = await coin.balanceOf(accounts[0])
BigNumber { _hex: '0x075bccb1', _isBigNumber: true }
> value.toString()
'123456689'
> value = await coin.balanceOf(accounts[1])
BigNumber { _hex: '0x64', _isBigNumber: true }
> value.toString()
'100'
```

As you might noticed there was no "sender" information in `await coin.transfer(accounts[1], 100)`; this is because `ethers` uses the first signer as the default signer. In our case this is `account[0]`. If we want to use another account we need to connect with it first.

```javascript
> let signer1 = await ethers.provider.getSigner(1)
> let contractAsSigner1 = coin.connect(signer1)
```

Now we can call the contract with `signer1`, which is `account[1]`.

```javascript
> await contractAsSigner1.transfer(accounts[0], 5)
{
  hash: '0x807947f1c40bb723ac312739d238b62764ae3c3387c6cdbbb6534501577382dd',
  type: 0,
  accessList: null,
  blockHash: null,
  blockNumber: null,
  transactionIndex: null,
  confirmations: 0,
  from: '0x9632a79656af553F58738B0FB750320158495942',
  gasPrice: BigNumber { _hex: '0x34630b8a00', _isBigNumber: true },
  gasLimit: BigNumber { _hex: '0x8754', _isBigNumber: true },
  to: '0x17aB05351fC94a1a67Bf3f56DdbB941aE6c63E25',
  value: BigNumber { _hex: '0x00', _isBigNumber: true },
  nonce: 2,
  data: '0xa9059cbb0000000000000000000000008db97c7cece249c2b98bdc0226cc4c2a57bf52fc0000000000000000000000000000000000000000000000000000000000000005',
  r: '0xcbf126dd0b109491d037c5f3af754ef2d0d7d06149082b13d0e27e502d3adc5b',
  s: '0x5978521804dd15674147cc6b532b8801c4d3a0e94f41f5d7ffaced14b9262504',
  v: 86259,
  creates: null,
  chainId: 43112,
  wait: [Function (anonymous)]
}
```

Let's check balances now:

```javascript
> value = await coin.balanceOf(accounts[0])
BigNumber { _hex: '0x075bccb6', _isBigNumber: true }
> value.toString()
'123456694'
> value = await coin.balanceOf(accounts[1])
BigNumber { _hex: '0x5f', _isBigNumber: true }
> value.toString()
'95'
```

We've succesfully transfered 5 tokes from `accounts[1]` to `accounts[0]`

## Summary

Now you have the tools you need to launch a local Avalanche network, create a Hardhat project, as well as create, compile, deploy and interact with Solidity contracts.

Join our [Discord Server](https://chat.avax.network) to learn more and ask any questions you may have.
