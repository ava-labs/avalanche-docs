---
tags: [Build, Dapps]
description: In this doc, learn how to deploy and test a smart contract on Avalanche using Remix and Core.
sidebar_label: Deploy with Remix IDE
pagination_label: Deploy a Smart Contract on Avalanche Using Remix and Core
---

# Deploy a Smart Contract on Avalanche Using Remix and Core

## Introduction

Avalanche's Primary Network is a Subnet that has three chains: P-Chain, X-Chain,
and C-Chain. The C-Chain is an instance of the Ethereum Virtual Machine powered
by Avalanche’s Snowman consensus protocol. The
[C-Chain RPC](/reference/avalanchego/c-chain/api.md) can do anything a typical Ethereum
client can by using the Ethereum-standard RPC calls. The immediate benefits of
using the C-Chain rather than Ethereum are all of the benefits of using
Avalanche. These properties that could considerably improve the performance of
Dapps and the user experience.

Today, we will deploy and test a smart contract on Avalanche using Remix and Core Wallet.

## Step 1: Setting up Core

If you don't already have a Core wallet, follow this
[guide](https://support.avax.network/en/articles/6100129-core-extension-how-do-i-create-a-new-wallet)
to create a new wallet.

If you want to use the **Avalanche C-Chain**, it can be selected from the networks list.

To switch to the **Fuji test network**, go to Settings, select Advanced, and then turn Testnet Mode on.

<div style={{textAlign: 'center'}}>

![testnet](/img/remix-core-guide/testnet.png)

</div>

**Local Testnet (Avalanche Network Runner) Settings:** [(Avalanche Network Runner Tutorial)](/tooling/network-runner.md)

- **Network Name**: Avalanche Local C-Chain
- **New RPC URL**:
  [http://127.0.0.1:34890/ext/bc/C/rpc](http://127.0.0.1:34890/ext/bc/C/rpc)
  (Note: the port number should match your local setting which can be different
  from 34890.)
- **ChainID**: `43112`
- **Symbol**: `AVAX`
- **Explorer**: N/A

## Step 2: Funding Your C-Chain Address

### **Using Core web**

On the Mainnet, you can use [Core
web](https://core.app/) to transfer funds from the X-Chain to your
C-Chain address. The process is simple, as explained in this
[tutorial](https://support.avax.network/en/articles/8133713-core-web-how-do-i-make-cross-chain-transfers-in-core-stake).
Please note that you will need [Core wallet](https://join.core.app/extension) connected to Core web for making cross-chain transfers.
Core wallet can be used on test and local networks, too. 
This wallet is available for [mobile](https://support.avax.network/en/articles/6115608-core-mobile-where-can-i-download-core-mobile-to-my-phone) too.

### **Using Test Network Faucet**

For funding on the test network, you can use the Test Network Faucet. Navigate
to [https://faucet.avax.network/](https://faucet.avax.network/) and paste your
C-Chain address. Faucet will automatically know that it needs to send the test
AVAX to C-Chain. Click the CAPTCHA checkbox and select 'Request AVAX' button.
Your address will receive test AVAX in a few seconds.

### Funding on Local Testnet

On a local network, you can easily fund your addresses by following
[this](/build/subnet/hello-subnet.md#importing-the-test-private-key).

## Step 3: Connect Core and Deploy a Smart Contract Using Remix

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity

![Remix file explorer](/img/remix-core-guide/remix.png)

Load or create the smart contracts that we want to compile and deploy using Remix file explorer.

For this example, we will deploy a simple Hello World contract from [here](https://blog.chain.link/how-to-create-a-hello-world-smart-contract-with-solidity/).

![Hello world contract](/img/remix-core-guide/contract.png)

Select the Solidity compiler tab and compile the contract.

![Compile contract](/img/remix-core-guide/compile.png)

Navigate to Deploy & Run transactions Tab -&gt; Open the "ENVIRONMENT" drop-down and select
Injected Provider (make sure Core is loaded).

![Deploy and run transactions](/img/remix-core-guide/provider.png)

A pop up will ask which wallet to use. Select Core.

<div style={{textAlign: 'center'}}>

![Choose wallet](/img/remix-core-guide/wallet.png)

</div>

Now, the smart contract is compiled, Core is injected, and we are ready to
deploy our Hello world contract. Click "Deploy."

![Deploy hello world](/img/remix-core-guide/deploy.png)

Confirm the transaction on the Core pop up.

<div style={{textAlign: 'center'}}>

![Confirm TX](/img/remix-core-guide/approve.png)

</div>

Our contract is successfully deployed!

![Deployed contract](/img/remix-core-guide/deployed.png)

Now, we can expand it by selecting it from the "Deployed Contracts" tab and test it out.

<div style={{textAlign: 'center'}}>

![Interact with contract](/img/remix-core-guide/interact.png)

</div>

The contract ABI and Bytecode are available on the Solidity compiler tab.

<div style={{textAlign: 'center'}}>

![ABI and bytecode](/img/remix-core-guide/ABI-bytecode.png)

</div>

If you had any difficulties following this tutorial or simply want to discuss
Avalanche with us, you can join our community at [Discord](https://chat.avalabs.org/)!
