# Deploy a Gnosis Safe on Your Subnet EVM

## Introduction
This article shows how to deploy and interact with a [Gnosis Safe](https://gnosis-safe.io/) programmatically on any [Subnet EVM](README.md).

If you are looking for more information regarding the Gnosis Safe protocol, please check out [these developer docs](https://docs.gnosis-safe.io/).

## Prerequisites
This tutorial assumes that:

- [A Subnet and EVM blockchain](./create-a-fuji-subnet.md) has been created.
- Your Node is currently validating your target Subnet.
- Your wallet has a balance of the Subnet Native Token(Specified under _alloc_ in your [Genesis File](./customize-a-subnet.md#genesis)).

## Fuji Workflow


### Deploy the Safe Contracts

Set up the repository by running thew following Commands:

```zsh
git https://github.com/safe-global/safe-contracts.git
cd safe-contracts
```

Next, change `.env.example` to `.env` and set the `MNEMONIC` value to your wallet's _seed phrase_ or _private key_.

```env
MNEMONIC=<"YOUR-SEED-PHRASE-HERE">
```

Next, add your Subnet Network parameters to [`hardhat.congfig.ts`](https://github.com/safe-global/safe-contracts/blob/main/hardhat.config.ts):

```ts
    subnet: {
      url: <"YOUR-SUBNET-RPC-HERE">,
      chainId: <"YOUR-SUBNET-CHAIN-ID-HERE">,
      gasPrice: "auto",
      accounts: { mnemonic: MNEMONIC },
    },
```


Finally, deploy the contracts by running:

```zsh
yarn hardhat --network subnet deploy
```

This will deploy the contracts to your Subnet EVM!

```zsh
Nothing to compile
deploying "SimulateTxAccessor" (tx: 0x3463b03296f55e49be21436818377c953b2719c8d1da43d577bc55910f0ca82a)...: deployed at 0xe336d36FacA76840407e6836d26119E1EcE0A2b4 with 237301 gas
deploying "GnosisSafeProxyFactory" (tx: 0xeda9a30613ad931f55299f2c433ede3fbe1ea2fe1732f826eb7e907b777b5d35)...: deployed at 0xE3573540ab8A1C4c754Fd958Dc1db39BBE81b208 with 865918 gas
deploying "DefaultCallbackHandler" (tx: 0x1ba2833639cec958f4a10f58a464a1e3c8157e3e146a006bc7b2e4d878ae7104)...: deployed at 0x8B3BC4270BE2abbB25BC04717830bd1Cc493a461 with 541390 gas
deploying "CompatibilityFallbackHandler" (tx: 0xb293543df8b243beebdd028db7a8424a4c35fce4f41048c1c27dc25da129a227)...: deployed at 0x7B4982e1F7ee384F206417Fb851a1EB143c513F9 with 1235752 gas
deploying "CreateCall" (tx: 0xe7039693d387118a5347814749a67bfb105106d385a60de1428bed3d2bb86233)...: deployed at 0x55a4eDd8A2c051079b426E9fbdEe285368824a89 with 294075 gas
deploying "MultiSend" (tx: 0x1132b71b510dbd911d565410f2a51719211b678ac467ab4ed7e04a89662fd682)...: deployed at 0xB8a934dcb74d0E3d1DF6Bce0faC12cD8B18801eD with 189518 gas
deploying "MultiSendCallOnly" (tx: 0x49196adc780ec8d0d67239bed7d9ffbcb4725ab282f7f008fb0cf9cec252c9da)...: deployed at 0xa1E47689f396fED7d18D797d9D31D727d2c0d483 with 141745 gas
deploying "SignMessageLib" (tx: 0x2a8fae6b5cdd76d09f9777b7382785742f173c4db4270f00f22ad9592cdbc424)...: deployed at 0xe17bDC68168d07c1776c362d596adaa5d52A1De7 with 261758 gas
deploying "GnosisSafeL2" (tx: 0x72d1ba4bb12adbb8e6f99ac1c834ba46b2f9bf2b7741a65c30ed6871e13f394c)...: deployed at 0xF5f1f185cF359dC48469e410Aeb6983cD4DC5812 with 5268965 gas
deploying "GnosisSafe" (tx: 0x21b0ca4fa1b1a3553cb74637ce9bb7a1bcfbc56d9c2d1651bd1963c80c941d11)...: deployed at 0x768AF58E63775354938e9F3FEdB764F601c038b4 with 5086960 gas
✨  Done in 33.85s.
```

The deployment of the contracts is using a [proxy factory](https://github.com/safe-global/safe-contracts/blob/v1.3.0/contracts/proxies/GnosisSafeProxyFactory.sol), therefore the address is depending on the bytecode. If the address is the same then the deployment bytecode of the contract is also the same (assuming that the target chain follows the EVM specifications set in the Ethereum Yellowpaper).

### Create a Proxy

It is recommended to use [`createProxyWithNonce`](https://github.com/safe-global/safe-contracts/blob/c36bcab46578a442862d043e12a83fec41143dec/contracts/proxies/GnosisSafeProxyFactory.sol#L61) as this facilitates [`create2`](https://docs.openzeppelin.com/cli/2.8/deploying-with-create2) for a counterfactual deployment.

The method takes 3 parameters:

`singleton` - Address of the logic contract that should be used. In this case, it will be [`GnosisSafeL2`](https://github.com/safe-global/safe-contracts/blob/v1.3.0/contracts/GnosisSafeL2.sol) at address `0xF5f1f185cF359dC48469e410Aeb6983cD4DC5812` per the example deployment above.

`initializer` - Method call to the initializer method on the singleton contract (similar to a constructor, e.g. the setup method for the Safe contracts). The data for this method is the encode call to a method that performs the initial setup of the contract.



For the Safe contracts this is the [setup](https://github.com/safe-global/safe-contracts/blob/v1.3.0/contracts/GnosisSafe.sol#L66-L84) function.

To encode `initializer` you can implement [this Safe Creation example](https://github.com/5afe/safe-tasks/blob/master/src/creation.ts) into your workflow. This and other Safe interaction examples can be found in the [Safe Tasks](https://github.com/5afe/safe-tasks/tree/master/src) repository.

`saltNonce` - A number that can be randomly chosen to impact the resulting address of the proxy (for more info see [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014))

### Interacting With The Safe
The [safe-deployments](https://github.com/safe-global/safe-deployments) repository contains the ABI files for the different versions of the Safe that can be used with all common Ethereum tools to interact with the Safe.

The important part is how to create the signature to confirm a transaction. More information on this can be found in the [Safe docs](https://docs.gnosis-safe.io/contracts/signatures).

To make this easier the Safe team provides multiple CLIs ([safe-cli](https://github.com/5afe/safe-cli#safe-cli) and [safe-tasks](https://github.com/5afe/safe-tasks#gnosis-safe-tasks)) and an the [safe-core-sdk](https://github.com/safe-global/safe-core-sdk/tree/main/packages/safe-core-sdk#safe-core-sdk).


## Local Workflow

### Start the Local Network

Follow [Create a Local Test Network](../quickstart/create-a-local-test-network.md#avalanche-network-runner) to start a 5-node local network. Make sure that you get one of the port number by following [this](../quickstart/create-a-local-test-network.md#retrieve-all-nodes). In this tutorial, we will assume one of the ports is 13076.

### Locate the Hardhat Network Configuration and Make Necessary Changes

Most of the code are already set to run it on a local network. Do check the following values in `hardhat.config.ts` to make sure they are correct.

```js
    subnet: {
      url: `http://127.0.0.1:13076/ext/bc/2iu7cwjqicwzytFRRgfyCzaFQtJw53C7WSoDEU7KWRo8mhVFRj/rpc`,
      chainId: 99999,
      gasPrice: "auto",
      accounts: [
        "56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
      ],
    },
```

Then run the deployment and interaction methods follow the exercise in this tutorial. 
