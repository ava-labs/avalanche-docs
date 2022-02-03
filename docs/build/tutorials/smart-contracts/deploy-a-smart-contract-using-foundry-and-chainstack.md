---
decription: In this doc, learn how to deploy and test a smart contract on Avalanche using Foundry and Chainstack.
---

# Deploy a Smart Contract Using Foundry and Chainstack

This section guides you through deploying a Hello World contract using [Chainstack](https://chainstack.com/build-better-with-avalanche/) and [Foundry](https://github.com/gakonst/foundry/) on the Fuji C-Chain testnet.

If you have any questions, reach out in the [Chainstack Discord](https://discord.com/invite/Cymtg2f7pX).

## Deploy an Avalanche Fuji Testnet Node

You need a node to deploy a smart contract to the blockchain network.

To get your node:

1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create).
1. [Deploy a Fuji node](https://docs.chainstack.com/platform/join-a-public-network#join-an-avalanche-network).
1. [Get the deployed node’s HTTPS endpoint](https://docs.chainstack.com/platform/view-node-access-and-credentials).

## Install Foundry

Foundry is a development toolkit to work with smart contracts.

1. [Install Rust](https://www.rust-lang.org/tools/install).
1. [Install Foundry](https://github.com/gakonst/foundry/).

## Initialize with Foundry

In your project directory, run `foundry init`.

This will create a boilerplate project.

## Fund Your Account

You need to pay gas on the network to deploy the contract.

Get Fuji AVAX [through the faucet](https://faucet.avax-test.network/).

## Create the Hello World contract

In the initialized Foundry project in `src/`, create `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Avalanche blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Deploy the Contract

At this point, you are ready to deploy your contract:

* You have your own node on the Avalanche Fuji network through which you will deploy the contract.
* You have Foundry that you will use to deploy the contract.
* You have a funded account that will deploy the contract.

To deploy the contract, run:

``` sh
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

where

* CONTRACT_PATH — path to your `HelloWorld.sol` file.
* PRIVATE_KEY — the private key from your account.
* HTTPS_ENDPOINT — [your node's endpoint](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Example:

``` sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

Congratulations! You have deployed your Hello World smart contract on Avalanche C-Chain!

See also Chainstack docs for more [tutorials](https://docs.chainstack.com/tutorials/avalanche/) and [tools](https://docs.chainstack.com/operations/avalanche/tools).