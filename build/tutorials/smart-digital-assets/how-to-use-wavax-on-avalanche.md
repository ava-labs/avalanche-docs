# Use Wrapped AVAX \(WAVAX\) on Avalanche

## What is WAVAX?

[AVAX](../../../#avalanche-avax-token) is the native token on the [Avalanche platform](../../../learn/platform-overview/). Many smart contracts on the [Contract Chain \(C-Chain\)](../../../learn/platform-overview/#contract-chain-c-chain), which is an instance of the Ethereum Virtual Machine, are designed to work with Ethereum's ERC-20 tokens. In order to use AVAX in such contracts, you must use wrapped AVAX \(WAVAX\), which is ERC-20 compatible.

## Overview

To convert AVAX to WAVAX you will deposit AVAX into a smart contract which will lock the AVAX and issue WAVAX to you. To convert WAVAX to AVAX, you will return the WAVAX to the smart contract, which will burn the WAVAX and return your AVAX.

In this tutorial, you will:

* Connect Metamask to Avalanche
* Fund your Metamask account  
* Load the WAVAX contract into Remix
* Connect to the pre-deployed WAVAX contract
* Convert AVAX to WAVAX and back
* Add WAVAX as a custom token to Metamask

## Connect Metamask

[Metamask](https://metamask.io/) is a popular web browser extension that makes it easy to interact with Ethereum and compatible blockchains, such as Avalanche's C-Chain. Setting up Metamask and creating an account on it is beyond the scope of this tutorial, but there are a number of resources on the internet to walk you through that.

After you log in to your Metamask account, connect it to the Avalanche network. Click the Network drop-down -&gt; Select **Custom RPC**:

![metamask network dropdown](../../../.gitbook/assets/image%20%2860%29.png)

Enter the information for the network of your choice:

### Avalanche Mainnet Settings:

* **Network Name**: Avalanche Mainnet C-Chain
* **New RPC URL**: [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
* **ChainID**: `43114`
* **Symbol**: `AVAX`
* **Explorer**: [https://snowtrace.io/](https://snowtrace.io/)

### Fuji Testnet Settings:

* **Network Name**: Avalanche Fuji C-Chain
* **New RPC URL**: [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
* **ChainID**: `43113`
* **Symbol**: `AVAX`
* **Explorer**: [https://testnet.snowtrace.io](https://testnet.snowtrace.io/)

After saving the changes, select the Avalanche network you just specified. You should see your AVAX balance, which will probably be 0.

## Fund Your C-Chain Account

You need to get some AVAX into your account.

### **Using the Avalanche Wallet**

If you already have some AVAX, you can transfer them to the Metamask account using your [Avalanche Wallet](https://wallet.avax.network/). You can see where your funds are by selecting **show breakdown** in the wallet panel showing your balance. If you don't have the funds on the C-Chain already, you need do a [Cross Chain Transfer](../platform/transfer-avax-between-x-chain-and-c-chain.md), to move your AVAX from X-Chain to C-Chain.

After you have funds on the C-Chain, select **Send** on the left side menu in the Wallet, and then switch the source chain to **C Contract**. In the **To Address** field paste your Metamask address. Enter the amount to send and click **Confirm** and then **Send**.

![Send to Metamask](../../../.gitbook/assets/wavax2avax-01-send-to-metamask.png)

Funds should soon be visible in your Metamask account.

### **Using the Test Network Faucet**

If you're connected to the test network, you can use its faucet to fund your Metamask account. Navigate to [the faucet](https://faucet.avax-test.network/) and paste your Ethereum address, which is shown below the account name in Metamask \(e.g.`0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`\). When you click on the account name, it will copy the account to the clipboard.

![Faucet funding](../../../.gitbook/assets/wavax2avax-02-faucet.png)

Paste that address into the faucet, prove that you're not a robot, and then request test AVAX. They should appear in your Metamask shortly.

## Load WAVAX contract into Remix

Remix is a popular browser-based tool for writing, deploying, and interacting with smart contracts. Naviate to [Remix's website](https://remix.ethereum.org/). Scroll down until you see options for importing contracts.

![Import from GitHub](../../../.gitbook/assets/wavax2avax-03-remix-import.png)

Select **GitHub**, and in the input field paste `https://raw.githubusercontent.com/ava-labs/wrapped-assets/main/WAVAX.sol` and select **OK**. That will load the contract into Remix.

![File Explorer](../../../.gitbook/assets/wavax2avax-04-contract.png)

Switching to the File Explorer tab on the left and select `WAVAX.sol`, which is the contract we just loaded.

On the left side menu, switch to Compile tab:

![Compile](../../../.gitbook/assets/wavax2avax-05-compile.png)

Check that the compiler version is compatible with the contract, as shown. Press **Compile WAVAX.sol**, and check that WAVAX contract has appeared in the `CONTRACT` field below. Now you're ready to connect to the WAVAX contract, which has already been deployed on the Avalanche network.

## Connect to the WAVAX contract

Switch to the **Deploy & Run Tranasactions** tab on the left side.

![Connect](../../../.gitbook/assets/wavax2avax-06-deploy.png)

Make sure you're logged in to your Metamask. In the **Environment** dropdown menu, select `Injected Web3`. Metamask will pop up and ask you to select the account. Choose the one connected to Avalanche and allow it to connect. This will pre-fill the **Account** field. Make sure the **Contract** field is set to the `WAVAX` contract. Now we can connect to the contract, which has already published on Avalanche. In the **At Address** edit field, copy:

* For Mainnet: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* For Fuji Testnet: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

After pasting the address, press the **At Address** button.

Remix should find the deployed contract:

![Connect](../../../.gitbook/assets/wavax2avax-07-avalanche-contract.png)

We are now ready to interact with the contract. Open the contract interface by pressing the highlighted arrow.

## Issue Commands to the WAVAX Contract

Let's wrap some AVAX!

Since ETH is denominated in 10^18 smaller units \(wei\), and AVAX is denominated in 10^9, switch the value selector from `wei` to `gwei` \(gigawei\). 1 gwei = 10^9 wei = 1 nAVAX.

![Interaction](../../../.gitbook/assets/wavax2avax-08-interact.png)

### Wrap AVAX to Create WAVAX

To wrap 10 AVAX, enter `10000000000` \(10^10\) gwei in the **Value** field. To initiate the wrapping, click **Deposit**. You will be presented with a prompt by Remix to confirm the transaction. When you press **Confirm** Metamask will pop up, also asking for confirmation. Press **Confirm** in Metamask, too. You should notice your AVAX balance lowered by 10, plus the fee amount. Skip to the next section to see your WAVAX in Metamask.

## Add WAVAX to Metamask

To see your WAVAX balance, you must add WAVAX as a custom token to Metamask. In Metamask, select the three dots next to your account name and select `Expand View`. This opens a new browser tab. Scroll down and select **Add token**. Switch to the **Custom Token** tab.

![Custom Token](../../../.gitbook/assets/wavax2avax-10-add-token.png)

In the **Token Contract Address** paste the same contract address we used before:

* For main net: `0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7`
* For Fuji test net: `0xd00ae08403B9bbb9124bB305C09058E32C39A48c`

Click **Next** and **Add Tokens**. Your WAVAX should now be visible in under your account in Metmask.

### Unwrap WAVAX to AVAX

To unwrap WAVAX, expand the arrow next to **Withdraw** button:

![Withdraw](../../../.gitbook/assets/wavax2avax-09-withdraw.png)

Unfortunately, the withdraw field is denominated in wei, so 10 AVAX is represented as `10000000000000000000` \(10^19\) for the withdraw amount. Pressing **Transact** will trigger the same confirmation first in Remix, then in Metamask. Your AVAX should be back in the account, minus the fee amount.

## Conclusion

You can now interact with smart contracts on Avalanche's C-Chain with WAVAX, the ERC-20 version of AVAX. In the future, converting between AVAX and WAVAX will be significantly simpler, with built-in support from the Wallet and exchanges, but in the meantime, you can still access DEXes, bridges and other Solidity-based contracts on the Avalanche Platform.

