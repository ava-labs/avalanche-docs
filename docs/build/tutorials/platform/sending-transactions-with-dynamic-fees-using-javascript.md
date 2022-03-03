---
description: This tutorial will help users to send transactions with dynamic fee settings to adjust their priority fee and max fee cap during high network activity using javascript.
---

# Sending Transactions with Dynamic Fees using Javascript

## Overview

The objective of this document is to provide and explain sending transactions with dynamic fees using javascript. Make sure you have followed [the tutorial on adjusting the dynamic fees using MetaMask](./adjusting-gas-price-during-high-network-activity.md). There, we have explained the key concepts related to dynamic fees and EIP1559 type of transactions.

## Prerequisites

* Basic familiarity with [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
* Basic familiarity with [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/).
* Basic familiarity with [the Avalanche C-Chain](https://docs.avax.network/build/avalanchego-apis/c-chain) network and [EVM compatibility](https://ethereum.org/en/developers/docs/evm/)
* Basic understanding of [dynamic fee transactions](https://docs.avax.network/build/tutorials/platform/adjusting-gas-price-during-high-network-activity#good-to-know-keywords-and-concepts) transactions

## Installing dependencies

Open the terminal and install the following dependencies in a new folder.

* ethers
* avalanche
* dotenv

```
npm install ethers avalanche dotenv
```

## Setting up Environment and Project

To send a transaction we need to sign it using our private key. But private key should not be hardcoded in the code, rather must be fetched through some environment variables. Make a `.env` file in the root folder with the following content.

```env
PRIVATEKEY=<YOUR_PRIVATE_KEY>
```

Now make a new file `app.js` in the root folder, which will be our main and only file with the `sendAvax()` function. Follow the rest of the tutorial by understanding and pasting the provided snippets sequentially in the `app.js` file.

## Importing Dependencies and Private Key

```javascript
const ethers = require('ethers');
const Avalanche = require('avalanche').Avalanche;
require('dotenv').config();

const privateKey = process.env.PRIVATEKEY;
```

## Setting up HTTP Provider Connected with Fuji Network

Using the HTTP provider, we will connect to one of the nodes on the Fuji network. Using this provider we will send the signed transaction to the network. You can also connect to mainnet using the URL - `https://api.avax.network/ext/bc/C/rpc`

```javascript
// For sending a signed transaction to the network
const nodeURL = 'https://api.avax-test.network/ext/bc/C/rpc';
const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL);
```

## Setting up C-Chain APIs for Estimating Base and Priority Fees

To estimate the max fee and max priority fee on the network, we will be using C-Chain APIs. We can use the C-Chain through an AvalancheJS instance connected to the network as shown below.
```javascript
// For estimating max fee and priority fee using CChain APIs
const chainId = 43113;
const avalanche = new Avalanche('api.avax-test.network', undefined, 'https', chainId);
const cchain = avalanche.CChain();
```

## Setting up Wallet

A wallet is required for signing transactions with your private key and thus making it valid.

```javascript
// For signing an unsigned transaction
const wallet = new ethers.Wallet(privateKey);
const address = wallet.address;
```

## Function for Estimating Max Fee and Max Priority Fee

The function `calcFeeData()` estimates the max fee and max priority fee per gas according to network activity using the C-Chain APIs. This function returns max fee and max priority fee per gas in units of `nAVAX` or `gwei` (1 AVAX = 10^9 gWei).

```javascript
// Function to estimate max fee and max priority fee
const calcFeeData = async (maxFeePerGas = undefined, maxPriorityFeePerGas = undefined) => {
  const baseFee = parseInt(await cchain.getBaseFee(), 16) / 1e9;
  maxPriorityFeePerGas = maxPriorityFeePerGas == undefined ? parseInt(await cchain.getMaxPriorityFeePerGas(), 16) / 1e9 : maxPriorityFeePerGas;
  maxFeePerGas = maxFeePerGas == undefined ? baseFee + maxPriorityFeePerGas : maxFeePerGas;

  if(maxFeePerGas < maxPriorityFeePerGas) {
    throw("Error: Max fee per gas cannot be less than max priority fee per gas");
  }

  return {
    maxFeePerGas: maxFeePerGas.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas.toString()
  };
}
```
Actual API returns base fee and priority fee in units of `wei` which is one-billionth of a billionth of `AVAX` (1 AVAX = 10^18 wei).

## Function to Create, Sign and Send Transaction

The function `sendAvax()` takes 4 arguments -
* `amount` - Amount of AVAX to send in the transaction
* `address` - Destination address to which we want to send AVAX
* `maxFeePerGas` - Desired maximum fee per gas you want to pay in nAVAX
* `maxPriorityFeePerGas` - Desired maximum priority fee per gas you want to pay in nAVAX
* `nonce` - Used as a differentiator for more than 1 transaction with same signer

The last 3 arguments are optional, and if `undefined` is passed, then it will use the `calcFeeData()` function to estimate them. Each transaction with the same data and parameters is differentiated by a nonce value. If there are more than 1 transactions with the same nonce signed by the same address, then only 1 of them with the highest effective priority fee will be accepted. `nonce` parameter should only be used when you are either re-issuing or cancelling a stuck transaction.

```javascript
// Function to send AVAX
const sendAvax = async (amount, to, maxFeePerGas = undefined, maxPriorityFeePerGas = undefined, nonce = undefined) => {
  if(nonce == undefined) {
    nonce = await HTTPSProvider.getTransactionCount(address);
  }
  
  // If the max fee or max priority fee is not provided, then it will automatically calculate using CChain APIs
  ({ maxFeePerGas, maxPriorityFeePerGas } = await calcFeeData(maxFeePerGas, maxPriorityFeePerGas));
  
  maxFeePerGas = ethers.utils.parseUnits(maxFeePerGas, "gwei");
  maxPriorityFeePerGas = ethers.utils.parseUnits(maxPriorityFeePerGas, "gwei");

  // Type 2 transaction is for EIP1559
  const tx = {
    type: 2,
    nonce,
    to, 
    maxPriorityFeePerGas,
    maxFeePerGas,
    value: ethers.utils.parseEther(amount),
    chainId,
  };

  tx.gasLimit = await HTTPSProvider.estimateGas(tx);

  const signedTx = await wallet.signTransaction(tx); 
  const txHash = ethers.utils.keccak256(signedTx);

  console.log('Sending signed transaction');

  // Sending a signed transaction and waiting for its inclusion
  await (await HTTPSProvider.sendTransaction(signedTx)).wait();

  console.log(`View transaction with nonce ${nonce}: https://testnet.snowtrace.io/tx/${txHash}`);
};
```

This function calculates transaction hash from the signed transaction and logs on the console, the URL for transaction status on the Snowtrace explorer.

## Calling the `sendAVAX()` Function

There are various ways to call this function. We may or may not pass the optional arguments like max fee and max priority fee. It is recommended to set the max fee as the maximum price per gas that you are willing to pay for a transaction, no matter how high or low the base fee will be, as at max you will only be charged the provided max fee, along with a small priority fee above the base fee.

If you do not pass these arguments, then it will automatically estimate the max fee and priority fee from the network. For example, let's say, I want to pay 100 nAVAX per gas for a transaction and a small tip of 2 nAVAX, then we will call the following function.

```javascript
// setting max fee as 100 and priority fee as 2
sendAvax("0.01", "0x856EA4B78947c3A5CD2256F85B2B147fEBDb7124", 100, 2);
```
**This function should not be used without a max fee per gas. As you will have to pay the estimated price, even if it is higher than your budget.**

There could be the following cases -



| Max Fee   | Max Priority Fee | Comment                                                                                                                                                                                                                      |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **undefined** | 2                | It will calculate the max fee by adding the provided priority fee with the estimated base fee. Take extra precaution here as the max fee will now be capped by `baseFee + priorityFee`, which can consume all the provided priority fees. |
| 100       | **undefined**        | It will estimate the priority fee and use the provided max fee. If the estimated priority fee is more than the provided max fee, then it throws an error.                                                                            |
| **undefined** | **undefined**        | It will estimate the base fee and priority fee from the network, and will add both the values to calculate the max fee per gas. Again, you have to pay whatever will be estimated.                                               |

You will get the following output on the successful submission of the signed transactions. Using this URL you can view the status of your transaction on Snowtrace.
```bash
View transaction with nonce 25: https://testnet.snowtrace.io/tx/0xd5b92b85beaf283fbaeeefb95c9a17a6b346a05b6f9687f2d6e421aa79243b35
```

## Reissuance of Stuck Transaction

Sometimes during high network activity, all transactions couldn't make it to the latest blocks for a long time, due to relatively lower effective tip than the other transactions in the pool. We can either re-issue the same transaction with a higher priority fee or cancel the transaction. To re-issue the stuck transaction, you can send a new one with same amount and data but higher priority fee and same nonce value as the stuck transaction. The transaction with lower effective tip will automatically be rejected (due to same nonce), and you do not need to worry about it. You can also cancel the stuck transaction, by keeping the amount to 0, with a higher priority fee and same nonce. Let's say, the above transaction with a nonce value of 25 has stuck. You can then re-issue a new transaction with same nonce, but higher priority fee this time.

```javascript
// reissuing transaction with nonce 25
sendAvax("0.01", "0x856EA4B78947c3A5CD2256F85B2B147fEBDb7124", 100, 10, 25);

// cancelling transaction with nonce 25
sendAvax("0", "0x856EA4B78947c3A5CD2256F85B2B147fEBDb7124", 100, 10, 25);
```

## Conclusion

You have learned about creating, signing, and sending transactions with dynamic fee parameters to the C-Chain of Avalanche network using javascript. It also explained, how to re-issue or cancel a stuck transaction, by sending a transaction with the same nonce. This tutorial points out the recommended way for choosing max fee cap and max priority fee cap for transactions and can also work as a general guide for all the EVM-based chains.