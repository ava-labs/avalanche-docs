# Deploy a Smart Contract on Avalanche Using Remix and MetaMask

## Introduction

![](../../../.gitbook/assets/image%20%282%29.png)

Avalanche's Primary Network is a subnet that has three chains: P-Chain, X-Chain, and C-Chain. The C-Chain is an instance of the Ethereum Virtual Machine powered by Avalanche’s Snowman consensus protocol. The [C-Chain RPC](../../apis/contract-chain-c-chain-api.md) can do anything a typical Ethereum client can by using the Ethereum-standard RPC calls. The immediate benefits of using the C-Chain rather than Ethereum are all of the benefits of using Avalanche. These properties that could considerably improve the performance of DApps and the user experience.

Today, we will deploy and test a smart contract on Avalanche using Remix and MetaMask.

## Step 1: Setting up MetaMask

![Metamask custom rpc](https://docs.avax.network/images/metamask-custom-rpc.png)

![Metamask settings](https://docs.avax.network/images/metamask-settings.png)

* **Network Name**: Avalanche C-Chain
* **New RPC URL**:
  * [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc) for Local Testnet
  * [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) for Fuji Testnet
  * [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc) for Mainnet
* **ChainID**:
  * `43112` for Local Testnet
  * `43113` for Fuji Testnet
  * `43114` for Mainnet
* **Symbol**: C-AVAX
* **Explorer**:
  * n/a for Localnet
  * [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/) for Fuji Testnet
  * [https://cchain.explorer.avax.network](https://cchain.explorer.avax.network/) for Mainnet

![Metamask account](https://docs.avax.network/images/metamask-account.png)

## Step 2: Funding your C-Chain address

Navigate to [https://faucet.avax.network](https://faucet.avax.network/), and paste your C-AVAX address. All you need to do is add a “C-” prefix and the faucet will switch from AVAX to C-AVAX.

![Faucet](https://docs.avax.network/images/faucet.png)

## Step 3: Connect MetaMask and deploy a smart contract using Remix

![Remix dashboard](https://docs.avax.network/images/remix-dashboard.png)

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity

![Solidity on remix](https://docs.avax.network/images/solidity1.png)

Load or create the smart contracts that we want to compile and deploy using Remix file explorer.

For this example, we will deploy an ERC20 contract from [OpenZeppelin](https://openzeppelin.com/contracts).

![Solidity on remix](https://docs.avax.network/images/solidity2.png)

Navigate to Deploy Tab -&gt; Open the “ENVIRONMENT” drop-down and select Injected Web3 \(make sure MetaMask is loaded\)

![Solidity on remix](https://docs.avax.network/images/solidity3.png)

Once we injected the web3-&gt; Go back to the compiler, and compile the selected contract -&gt; Navigate to Deploy Tab

![Solidity on remix](https://docs.avax.network/images/solidity4.png)

Now, the smart contract is compiled, MetaMask is injected, and we are ready to deploy our ERC20. Click “Deploy.”

![Solidity on remix](https://docs.avax.network/images/solidity5.png)

Confirm the transaction on the MetaMask pop up.

![Solidity on remix](https://docs.avax.network/images/solidity6.png)

Our contract is successfully deployed!

![Solidity on remix](https://docs.avax.network/images/solidity7.png)

Now, we can expand it by selecting it from the “Deployed Contracts” tab and test it out.

![Compiler](https://docs.avax.network/images/compiler.png)

The contract ABI and Bytecode are available on the compiler tab.

If you had any difficulties following this tutorial or simply want to discuss Avalanche with us, you can join our community at [Discord](https://chat.avalabs.org/)!

