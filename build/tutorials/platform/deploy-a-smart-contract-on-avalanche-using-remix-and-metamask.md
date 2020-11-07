# Deploy a Smart Contract on Avalanche Using Remix and MetaMask

## Introduction

![](../../../.gitbook/assets/image%20%282%29.png)

Avalanche's Primary Network is a subnet that has three chains: P-Chain, X-Chain, and C-Chain. The C-Chain is an instance of the Ethereum Virtual Machine powered by Avalanche’s Snowman consensus protocol. The [C-Chain RPC](../../apis/contract-chain-c-chain-api.md) can do anything a typical Ethereum client can by using the Ethereum-standard RPC calls. The immediate benefits of using the C-Chain rather than Ethereum are all of the benefits of using Avalanche. These properties that could considerably improve the performance of DApps and the user experience.

Today, we will deploy and test a smart contract on Avalanche using Remix and MetaMask.

## Step 1: Setting up MetaMask

![Log in to MetaMask -&amp;gt; Click the Network drop-down -&amp;gt; Select Custom RPC](../../../.gitbook/assets/image%20%2814%29.png)

* **Network Name**: Avalanche C-Chain
* **New RPC URL**:
  * [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc) for Local Testnet
  * [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) for Fuji Testnet
  * [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) for Mainnet
* **ChainID**:
  * `0xa868` for Local Testnet
  * `0xa869` for Fuji Testnet
  * `0xa86a` for Mainnet
* **Symbol**: C-AVAX
* **Explorer**:

  * n/a for Localnet
  * [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/) for Fuji Testnet
  * [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/) for Mainnet

![](../../../.gitbook/assets/image%20%2810%29.png)

## Step 2: Funding your C-Chain address

Navigate to [https://faucet.avax.network](https://faucet.avax.network/), and paste your C-AVAX address. All you need to do is add a “C-” prefix and the faucet will switch from AVAX to C-AVAX.

![](../../../.gitbook/assets/screen-shot-2020-11-05-at-2.43.31-pm.png)

## Step 3: Connect MetaMask and deploy a smart contract using Remix

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity

![](../../../.gitbook/assets/image%20%2813%29.png)

Load or create the smart contracts that we want to compile and deploy using Remix file explorer.

For this example, we will deploy an ERC20 contract from [OpenZeppelin](https://openzeppelin.com/contracts).

![](../../../.gitbook/assets/image%20%288%29.png)

Navigate to Deploy Tab -&gt; Open the “ENVIRONMENT” drop-down and select Injected Web3 \(make sure MetaMask is loaded\)

![](../../../.gitbook/assets/image%20%2815%29.png)

Once we injected the web3-&gt; Go back to the compiler, and compile the selected contract -&gt; Navigate to Deploy Tab

![](../../../.gitbook/assets/image%20%285%29.png)

Now, the smart contract is compiled, MetaMask is injected, and we are ready to deploy our ERC20. Click “Deploy.”

![](../../../.gitbook/assets/image%20%287%29.png)

Confirm the transaction on the MetaMask pop up.

![](../../../.gitbook/assets/image%20%2811%29.png)

Our contract is successfully deployed!

![](../../../.gitbook/assets/image%20%284%29.png)

Now, we can expand it by selecting it from the “Deployed Contracts” tab and test it out.

![](../../../.gitbook/assets/image%20%2812%29.png)

The contract ABI and Bytecode are available on the compiler tab.

![](../../../.gitbook/assets/image%20%286%29.png)

If you had any difficulties following this tutorial or simply want to discuss Avalanche with us, you can join our community at [Discord](https://chat.avalabs.org/)!

