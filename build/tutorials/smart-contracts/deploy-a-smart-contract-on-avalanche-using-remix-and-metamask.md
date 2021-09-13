# Deploy a Smart Contract on Avalanche Using Remix and MetaMask

## Introduction

![Primary Network](../../../.gitbook/assets/image%20%2821%29.png)

Avalanche's Primary Network is a subnet that has three chains: P-Chain, X-Chain, and C-Chain. The C-Chain is an instance of the Ethereum Virtual Machine powered by Avalanche’s Snowman consensus protocol. The [C-Chain RPC](../../avalanchego-apis/contract-chain-c-chain-api.md) can do anything a typical Ethereum client can by using the Ethereum-standard RPC calls. The immediate benefits of using the C-Chain rather than Ethereum are all of the benefits of using Avalanche. These properties that could considerably improve the performance of DApps and the user experience.

Today, we will deploy and test a smart contract on Avalanche using Remix and MetaMask.

## Step 1: Setting up MetaMask

Log in to MetaMask -&gt; Click the Network drop-down -&gt; Select Custom RPC

![metamask network dropdown](../../../.gitbook/assets/image%20%2860%29.png)

#### **Avalanche Mainnet Settings:**

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax.network/](https://cchain.explorer.avax.network/)

#### **FUJI Testnet Settings:**

* **Network Name**: Avalanche FUJI C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbol**: `AVAX`
* **Explorer**: [https://cchain.explorer.avax-test.network](https://cchain.explorer.avax-test.network/)

#### **Local Testnet \(AVASH\) Settings:** [\(Avash Tutorial\)](../../tools/avash.md)

* **Network Name**: Avalanche Local
* **New RPC URL**:[http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
* **ChainID**: `43112`
* **Symbol**: `AVAX`
* **Explorer**: N/A

## Step 2: Funding your C-Chain address

### **Using Avalanche Wallet**

On the main net, you can use the [Avalanche Wallet](https://wallet.avax.network/) to transfer funds from the X-Chain to your C-Chain address. The process is simple, as explained in this [tutorial](../platform/transfer-avax-between-x-chain-and-c-chain.md). Wallet can be used on test and local networks, too.

### **Using Test Network Faucet**

For funding on the test network, you can use the Test Network Faucet. Navigate to [https://faucet.avax-test.network/](https://faucet.avax-test.network/) and paste your C-Chain address. Faucet will automatically know that it needs to send the test AVAX to C-Chain. Click the captcha checkbox and select 'Request AVAX' button. Your address will receive test AVAX in a few seconds.

### Funding on local testnet

On a local network, you can easily fund your addresses by following [this](../platform/create-a-local-test-network.md#getting-avax).

## Step 3: Connect MetaMask and deploy a smart contract using Remix

Open [Remix](https://remix.ethereum.org/) -&gt; Select Solidity

![remix file explorer](../../../.gitbook/assets/remix-file-explorer.png)

Load or create the smart contracts that we want to compile and deploy using Remix file explorer.

For this example, we will deploy an ERC20 contract from [OpenZeppelin](https://openzeppelin.com/contracts).

![ERC20 Contract](../../../.gitbook/assets/erc20-contract.png)

Navigate to Deploy Tab -&gt; Open the "ENVIRONMENT" drop-down and select Injected Web3 \(make sure MetaMask is loaded\)

![Deploy and run transactions](../../../.gitbook/assets/deploy-and-run-transactions.png)

Once we injected the web3-&gt; Go back to the compiler, and compile the selected contract -&gt; Navigate to Deploy Tab

![Solidity compiler](../../../.gitbook/assets/solidity-compiler.png)

Now, the smart contract is compiled, MetaMask is injected, and we are ready to deploy our ERC20. Click "Deploy."

![Deploy erc20](../../../.gitbook/assets/deploy-erc20.png)

Confirm the transaction on the MetaMask pop up.

![Confirm ERC20](../../../.gitbook/assets/confirm-erc20.png)

Our contract is successfully deployed!

![Published metadata](../../../.gitbook/assets/published-metadata.png)

Now, we can expand it by selecting it from the "Deployed Contracts" tab and test it out.

![Interact with contract](../../../.gitbook/assets/interact-with-contract.png)

The contract ABI and Bytecode are available on the compiler tab.

![ABI bytecode](../../../.gitbook/assets/abi-bytecode.png)

If you had any difficulties following this tutorial or simply want to discuss Avalanche with us, you can join our community at [Discord](https://chat.avalabs.org/)!

