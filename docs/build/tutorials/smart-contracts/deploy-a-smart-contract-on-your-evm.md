---
sidebar_position: 3
---

# Deploy a Smart Contract on your Subnet EVM

## Introduction

This tutorial assumes that: <br></br>
- A [Subnet](./create-a-subnet.md) has been created<br></br>
- An [EVM blockchain](./create-evm-blockchain.md) has been created<br></br>
- Your node is currently [validating](./create-a-subnet#adding-subnet-validators) your target Subnet<br></br>
- You have a wallet with the native Subnet token<br></br>

You can run the following command to start your node with a whitelisted subnet:<br></br>
```sh
./avalanchego --network-id=fuji --http-host=127.0.0.1 --whitelisted-subnets=<Whitelisted Subnet ID>
```

## Step 1: Setting up MetaMask

#### **EVM Subnet Settings:** [(Create EVM Tutorial)](./create-evm-blockchain.md)

* **Network Name**: Custom Subnet EVM
* **New RPC URL**: [http://127.0.0.1:9650/ext/bc/BlockchainID/rpc](http://127.0.0.1:9650/ext/bc/BlockchainID/rpc) (Note: the port number should match your local setting which can be different from 9650.)
* **ChainID**: `Subnet EVM ChainID`
* **Symbol**: `Subnet EVM Gas Token Symbol `
* **Explorer**: N/A
<br></br>

You should have a wallet with native Subnet tokens in it

## Step 2: Connect MetaMask and deploy a smart contract using Remix

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity

![remix subnet evm sc](/img/remix-subnet-evm-sc.png)

### Load the smart contract
![remix subnet evm sc2](/img/remix-subnet-evm-sc2.png)
![remix subnet evm sc3](/img/remix-subnet-evm-sc3.png)

For this example, we will deploy an ERC721 contract from the [Avalanche Smart Contract Quickstart Repo](https://github.com/ava-labs/avalanche-smart-contract-quickstart).

![remix subnet evm sc4](/img/remix-subnet-evm-sc4.png)

Navigate to Deploy Tab -&gt; Open the "ENVIRONMENT" drop-down and select Injected Web3 (make sure MetaMask is loaded)

![remix subnet evm sc5](/img/remix-subnet-evm-sc5.png)

Once we injected the web3-&gt; Go back to the compiler, and compile the selected contract -&gt; Navigate to Deploy Tab

![remix subnet evm sc6](/img/remix-subnet-evm-sc6.png)

Now, the smart contract is compiled, MetaMask is injected, and we are ready to deploy our ERC721. Click "Deploy."

![remix subnet evm sc7](/img/remix-subnet-evm-sc7.png)


Confirm the transaction on the MetaMask pop up.

![remix subnet evm sc8](/img/remix-subnet-evm-sc8.png)

### Adjusting Gas
If you are having trouble with underpricing errors then try the following: <br></br>

In the Metamask confirmation window _Click_ Edit

![remix subnet evm sc9](/img/remix-subnet-evm-sc9.png)

_Click_ Edit suggested gas fee

![remix subnet evm sc10](/img/remix-subnet-evm-sc10.png)

Change the gas price and _Click_ save

Confirm the transaction on the MetaMask pop up.

![remix subnet evm sc14](/img/remix-subnet-evm-sc14.png)

Our contract is successfully deployed!

![remix subnet evm sc15](/img/remix-subnet-evm-sc15.png)

Now, we can expand it by selecting it from the "Deployed Contracts" tab and test it out.

![remix subnet evm sc16](/img/remix-subnet-evm-sc16.png)

The contract ABI and Bytecode are available on the compiler tab.

![remix subnet evm sc12](/img/remix-subnet-evm-sc12.png)

If you had any difficulties following this tutorial or simply want to discuss Avalanche with us, you can join our community at [Discord](https://chat.avalabs.org/)!



## Other Tools

You can use Subnet EVM just like you use C-Chain and EVM tools. Only differences are `chainID` and RPC URL. For example you can deploy your contracts with [hardhat quick starter](../../smart-contracts/using-hardhat-with-the-avalanche-c-chain.md) by changing `url` and `chainId` in the `hardhat.config.ts`.
