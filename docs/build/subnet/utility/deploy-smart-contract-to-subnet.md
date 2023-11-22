---
tags: [Build, Subnets]
description: This tutorial demonstrates the process of deploying a smart contract to an EVM-based Subnet.
sidebar_label: Deploy a Smart Contract
pagination_label: Deploy a Smart Contract on Your Subnet-EVM Using Remix and Core
sidebar_position: 0
---

# Deploy a Smart Contract on Your Subnet-EVM Using Remix and Core

## Introduction

This tutorial assumes that:

- [A Subnet and EVM blockchain](/build/subnet/deploy/fuji-testnet-subnet.md) has been created
- Your Node is currently validating your target Subnet
- Your wallet has a balance of the Subnet Native Token(Specified under _alloc_ in your
  [Genesis File](/build/subnet/upgrade/customize-a-subnet.md#genesis)).

## Step 1: Setting up Core

### **EVM Subnet Settings:** [(EVM Core Tutorial)](/build/subnet/deploy/fuji-testnet-subnet.md#connect-with-core)

- **`Network Name`**: Custom Subnet-EVM
- **`New RPC URL`**: [http://NodeIPAddress:9650/ext/bc/BlockchainID/rpc] (Note: the port number should
  match your local setting which can be different from 9650.)
- **`ChainID`**: Subnet-EVM ChainID
- **`Symbol`**: Subnet-EVM Token Symbol
- **`Explorer`**: N/A

You should see a balance of your Subnet's Native Token in Core.

<div style={{textAlign: 'center'}}>

![balance](/img/evm-smart-contract/core-balance.png)

</div>

## Step 2: Connect Core and Deploy a Smart Contract

### Using Remix

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity.

![remix Subnet evm sc home](/img/remix-subnet-evm-sc-home.png)

Create the smart contracts that we want to compile and deploy using Remix file explorer

### Using GitHub

In Remix Home _Click_ the GitHub button.

![remix Subnet evm sc load panel](/img/remix-subnet-evm-sc-load-panel.png)

Paste the [link to the Smart Contract](https://github.com/ava-labs/avalanche-smart-contract-quickstart/blob/main/contracts/NFT.sol)
into the popup and _Click_ import.

![remix Subnet evm sc import](/img/remix-subnet-evm-sc-import.png)

For this example, we will deploy an ERC721 contract from the [Avalanche Smart Contract Quickstart Repository](https://github.com/ava-labs/avalanche-smart-contract-quickstart).

![remix Subnet evm sc file explorer](/img/remix-subnet-evm-sc-file-explorer.png)

Navigate to Deploy Tab -&gt; Open the "ENVIRONMENT" drop-down and select Injected Web3 (make sure
Core is loaded).

![remix Subnet evm sc web3](/img/remix-subnet-evm-sc-web3.png)

Once we injected the web3-&gt; Go back to the compiler, and compile the selected contract -&gt;
Navigate to Deploy Tab.

![remix Subnet evm sc compile](/img/remix-subnet-evm-sc-compile.png)

Now, the smart contract is compiled, Core is injected, and we are ready to deploy our ERC721.
Click "Deploy."

![remix Subnet evm sc deploy](/img/remix-subnet-evm-sc-deploy.png)

Confirm the transaction on the Core pop up.

<div style={{textAlign: 'center'}}>

![balance](/img/evm-smart-contract/approve.png)

</div>

Our contract is successfully deployed!

![remix Subnet evm sc deployed](/img/remix-subnet-evm-sc-deployed.png)

Now, we can expand it by selecting it from the "Deployed Contracts" tab and test it out.

![remix Subnet evm sc end](/img/remix-subnet-evm-sc-end.png)

The contract ABI and Bytecode are available on the compiler tab.

![remix Subnet evm sc ABI](/img/remix-subnet-evm-sc-abi.png)

If you had any difficulties following this tutorial or simply want to discuss Avalanche
with us, you can join our community at [Discord](https://chat.avalabs.org/)!

## Other Tools

You can use Subnet-EVM just like you use C-Chain and EVM tools. Only differences are `chainID` and
RPC URL. For example you can deploy your contracts with
[hardhat quick start guide](/build/dapp/smart-contracts/toolchains/hardhat.md)
by changing `url` and `chainId` in the `hardhat.config.ts`.
