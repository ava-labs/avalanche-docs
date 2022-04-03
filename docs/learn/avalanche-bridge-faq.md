---
sidebar_position: 3
description: The Avalanche Bridge (AB) can be used to transfer ERC20 tokens from Ethereum to Avalanche's C-Chain and vice versa. This document answers common questions about the bridge. 
---

# Avalanche Bridge (AB) FAQ

The [Avalanche Bridge (AB)](https://bridge.avax.network/) can be used to transfer ERC20 tokens from Ethereum to Avalanche's C-Chain and vice versa. This document answers common questions about the bridge. If this document and other documentation don't answer your question, you can contact us on [Avalanche's support website](https://support.avax.network), [Discord](https://chat.avalabs.org) or [Telegram.](https://t.me/avalancheavax)



## Important Information
To ensure the safety of users and the protection of their funds, the Avalanche Bridge should only be accessed and used through the UI, located [here](https://bridge.avax.network/). Any other use of the Avalanche Bridge could result in the permanent loss of funds. The non-exhaustive list below enumerates possible ways to permanently lose funds by attempting to use the Avalanche Bridge through not recommended means. Funds lost in the below ways are permanently lost and are not recoverable by Ava Labs, the Wardens, or the bridge.

* **USERS MUST NOT SEND FUNDS DIRECTLY TO ANY OF THE AVALANCHE BRIDGE’S CONTRACT ADDRESSES.** The Avalanche Bridge should only be accessed through the Avalanche Bridge’s UI, located [here](https://bridge.avax.network/). Any funds sent directly to the Avalanche Bridge’s contract addresses will be permanently lost and not recoverable.
* **USERS MUST NOT SEND FUNDS DIRECTLY TO ANY OF THE AVALANCHE BRIDGE’S WALLET ADDRESSES.** The Avalanche Bridge should only be accessed through the Avalanche Bridge’s UI, located [here](https://bridge.avax.network/). Any funds sent directly to the Avalanche Bridge’s wallet addresses will be permanently lost and not recoverable.
* **DO NOT ATTEMPT TO USE ANY SMART-CONTRACT WALLET WITH THE AVALANCHE BRIDGE.** The Avalanche Bridge is currently not compatible with smart contract wallets because smart contracts are currently not supported by the Avalanche Bridge. Using the Avalanche Bridge with a smart contract wallet or smart contract will result in the permanent loss of funds. Users should not use smart contracts with the Avalanche Bridge at this time because no one can retrieve tokens lost when smart contract wallets try to use the Avalanche Bridge. This is not a statement against smart contracts wallets or the below list of smart contract wallet projects, which is not an exhaustive list. This is to make users aware of the current technical architecture. WE CANNOT RETRIEVE YOUR TOKENS.
  * [Ambire](https://www.ambire.com/)
  * [Argent](https://www.argent.xyz/)
  * [Gnosis Safe](https://gnosis-safe.io/)



## User Notes

1. There is a bug in the Metamask Mobile app that affects bridge transactions (**only on mobile**). Until this is resolved, don't use the Metamask mobile app for bridge transfers. Use the desktop app, or, if on mobile, Coinbase Wallet.
2. You need AVAX to pay for transaction fees on Avalanche. **You should use the AVAX you receive in the airdop to do a swap for more AVAX on an AMM so that you can pay for transaction fees.** If you run out of AVAX, you will not be able to do transactions on Avalanche.


## Transactions

### What can I do if my transaction seems stuck?

If the Ethereum transaction transferring funds over the bridge to Avalanche seems stuck and does not have any confirmations, you can speed up the transaction as described [here](avalanche-bridge-faq.md#speed-up-transaction). If the Ethereum transaction has already received 35 confirmations, but the Avalanche transaction timer seems to be stuck, check your Metamask wallet balance on the Avalanche network. It could be that the transaction was already processed but is just not showing up on the user interface. Note that this may happen if you opted to "speed up" your transaction.

It is possible, but very unlikely, that the Ethereum transaction issued by the bridge when transferring funds to Ethereum takes a long time to receive 35 confirmations. This may occur if there is a sudden significant spike in Ethereum gas prices. If the transaction is not included within 200 blocks of when it was issued on Ethereum, a new transaction with a higher gas price may be issued to "unstick" the transfer.

### How long does a bridge transfer take?

The Ethereum transaction should take 10 - 15 minutes. The Avalanche transaction takes a few seconds.

### Why is the Avalanche transaction part of the bridge taking so long?

It only takes a few seconds. If the bridge interface shows it taking longer, it's just a problem with the interface. Your assets have been transferred after a few seconds. Check your wallet and the C-Chain explorer.

### What if the gas price is more than the amount I am transferring?

When moving ERC20 assets from Ethereum to Avalanche, you use Metamask to send an Ethereum transaction transferring the funds. That transaction's fee depends on the current gas price on the Ethereum network, which is highly variable. If the gas price is so high that the transaction fee is more than the amount of value being transferred, you may want to wait until the gas price decreases.

When moving assets from Avalanche back to Ethereum, the bridge charges an in-kind transfer fee, as described [here](avalanche-bridge-faq.md#fees). The user interface does now allow transfers less than the fee amount. If a user manually generates and issues such a transaction, the bridge will mark the transfer as invalid and not process it.

### Can I send tokens created on Avalanche to Ethereum?

Not yet. The AB currently only supports transfer of ERC20 tokens create on Ethereum to Avalanche and back. There are plans to enable this in the future.

### Can I send ETH or BTC across the bridge?

The AB does not currently support native ETH or BTC. However, you can transfer the wrapped version of these assets (WETH and WBTC) across the bridge.

### What if my transaction is not visible in the explorer?

The transactions that correspond to bridge transfers will appear on explorers for the Avalanche and Ethereum networks. It may take a few minutes for the transactions to appear. To search for your transaction in the explorer, copy and paste your address into [Avalanche's C-Chain Explorer](https://snowtrace.io/) or [Etherscan](https://etherscan.io/). To view the transactions sent by the bridge itself, you can look [here](https://snowtrace.io/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) for Avalanche and [here](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) for Ethereum. If you still don't see your transaction, reach out on [Telegram](https://t.me/avalancheavax) or [Discord](https://chat.avax.network/).

### Are there tutorials on how to use the bridge?

Yes, you can view video tutorials for bridge functionality [here](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

### How do I pay for transaction fees on Avalanche?

On Avalanche, transaction fees are paid in the native asset, AVAX. In order to send transactions on the Avalanche C-Chain, you must have sufficient AVAX in your wallet to cover the cost of the gas for the transaction. To help you get started on Avalanche, the bridge will airdrop you a small amount of AVAX if you move more than $75 (subject to change) worth of tokens over from Ethereum. In order to avoid running out of AVAX to cover your transaction fees, we recommend first buying an adequate amount of AVAX. You can do so on [Pangolin](https://app.pangolin.exchange/).

#### Can I send to a different address on the other network?

The bridge only allows transfers to the same address on the other network. After the asset is transferred to the other network, it can be sent to any address or contract.

### Can I speed up my transaction? {#speed-up-transaction} 

Yes, you can click on the “Speed Up” button on Metamask. “Speeding up” a transaction through Metamask issues a new transaction on Ethereum that has a higher gas price than the transaction that was originally sent. Since the new transaction has a higher gas price, it is more likely to be included in a block. Only one of the transactions (the original and the "sped up") will be accepted. Speeding up a transaction that is transferring funds to the bridge is safe. However, the user interface will not be aware of the new transaction, meaning you may not see the confirmations in the user interface. Once the new transaction has 35 confirmations on Ethereum, check your Metamask wallet on Avalanche to see the wrapped funds.

### Why does the number of tokens shown on Metamask not match the number I specified?

When transferring from Avalanche to Ethereum, Metamask shows that 0 tokens are to be transferred, not the actual number of tokens. This is a known problem with Metamask.

### What is the Bridge's address on Ethereum and Avalanche?

Bridge Addresses:

* Ethereum: [`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche: [`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://snowtrace.io/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Note that **you should not directly transfer tokens to these addresses**. You should use the Bridge's user interface, which checks for malformed transactions.

## Fees

### How do fees work on the Avalanche Bridge?

The bridge charges transfer fees in order to cover the cost of the transaction fees on the Avalanche and Ethereum networks, as well as the operational costs of the bridge infrastructure. These fees are charged in-kind with the ERC20 asset being transferred. That is, when you transfer a token, a portion of the balance transferred goes towards covering the fee.

When moving assets from Ethereum to Avalanche, the bridge fee is $3 worth of the ERC20 asset being transferred. Transfers to Avalanche may qualify for an AVAX airdrop as described [here](avalanche-bridge-faq.md#airdrop).

When moving assets from Avalanche to Ethereum, the bridge fee is largely based on the **expected** Ethereum transaction fee, which is calculated using current asset prices, the current Ethereum gas price, and the approximate amount of gas that will be used by the Ethereum transaction. As such, the Ethereum transaction fee, and thus also the bridge fee, can be highly variable. To account for price volatility, a constant dollar amount (currently $15) is added to the bridge fee. Note that the bridge fee will be different than the Ethereum transaction fee displayed in explorers such as Etherscan because asset prices, the Ethereum gas price, and the amount of gas used by Ethererum transactions fluctuate. The expected bridge fee is displayed in the bridge UI when performing a transfer.

### Why doesn't the amount of asset I received on one network match the amount that I sent from the other?

The bridge charges a fee. See above.

### How is gas estimated? How does the bridge get token prices?

The bridge uses Chainlink price feeds to get gas price information for the Ethereum network. The gas price used is the higher of the Chainlink FASTGAS value and the Geth gas price approximation. The gas price is padded by a few GWEI to ensure transactions sent by the bridge are quickly included in an Ethereum block.

The bridge also uses Chainlink price feeds to determine token prices used to calculate the amount of a token that is equivalent to the bridge fee.

### Is there an airdrop? {#airdrop}

Users will be airdropped up to 0.1 AVAX when they transfer more than $75 (subject to change) of a token from Ethereum to Avalanche.

### What if I did not receive my airdrop?

If you haven’t received your airdrop, please confirm that the transfer amount met the minimum amount required.

## Security

### Is the Avalanche Bridge trustless?

The Avalanche Bridge is trustless in the sense that no one party is able to access any of the funds held as collateral or mint wrapped assets. All transfers across the bridge must be approved by 3 of 4 independent parties (called wardens). In this sense, use of the bridge does not require trust in any one party to transfer your funds.

### What is the role of the wardens?

The role of the wardens is fourfold:

1. Storing Secret Shares
2. Indexing Supported Blockchains
3. Tracking Processed Transactions
4. Hosting Public Information

A complete breakdown of a Warden’s role and responsibilities can be found [here](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### What is the relationship between Ava Labs and the Wardens?

The wardens are trusted partners of the Avalanche Foundation. They have a record of technical excellence and working with Avalanche.

### Has the code been audited? Where are the audit reports?

Yes, the code for the bridge, warden and smart contracts have been audited by Halborn. Audit reports can be found [here](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

## Tokens

### My transfer to Avalanche is complete but I don't see my assets on Metamask Avalanche. What happened? {#cant-see-funds}

You need to tell Metamask to look for the tokens. Make sure you've added the tokens from the [Avalanche Bridge token list](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) to Metamask. The easiest way to do that is go to the [Proof of Assets](https://bridge.avax.network/proof-of-assets) web page and click the Metamask icon next to the wrapped token you need (for WETH that would be WETH.e, for USDT look for USDT.e, for example).


### What kind of tokens can be transferred across the bridge?

Only supported ERC20 tokens can be transferred across the bridge. On Avalanche, these tokens are represented by the token symbol with ".e" appended. For example, the bridged DAI token is DAI.e.

### I sent ETH over the bridge but don't see it on Avalanche!

You most likely didn't. Sending ETH to Avalanche over Avalanche Bridge is done through two transactions. First transaction, done entirely on Ethereum, wraps ETH to WETH which then gets deposited to your Ethereum wallet. After that is done, you need to initiate a second transaction to send WETH to Avalanche, where WETH.e will be deposited to your wallet, after 35 confirmations of the second transaction on Ethereum. You will need to add WETH.e to Metamask to see them in your wallet.

### How do I unwrap WETH.e to ETH on Avalanche?

You don't. There is no such thing as ETH on Avalanche. You can use WETH.e, a wrapped representation of ETH, in smart contracts and dapps on Avalanche.

### How do I wrap/unwrap ETH on Ethereum?

You can use Metamask’s SWAP function to swap from ETH to WETH. Alternatively, you can also use an AMM such as [Uniswap](https://app.uniswap.org/#/) on Ethereum.

### How can I add a token to the bridge?

See [here](https://github.com/ava-labs/avalanche-bridge-resources#readme).

### How can I add a token used in the bridge to Metamask?

See [here](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) for a tutorial.

### Why are there two types of the same token?  How can I tell which one derives from the Avalanche Bridge?

In general, when you are interacting with smart contracts and dapps such as Pangolin, **you want to use the token with .e at the end**.

The current-generation Avalanche Bridge (AB) to which this document refers is predated by a previous bridge implementation called the AEB. The AEB bridge and AB bridge each have their own unique token sets. The AEB tokens have been deprecated in favor of the AB tokens. AB tokens have a `.e` suffix. While a token's name and symbol are good references to differentiate the two, the only surefire way to verify a token is the contract address. The AB token contract addresses can be found [here.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

### Why doesn’t the newly bridged token appear in my wallet automatically?

Tokens are not held by your C-chain address, but rather in the token's smart contract. You have to tell your wallet (i.e. Metamask) which smart contracts to check for balances held by your addresses.

### Does the Avalanche Bridge support transferring NFTs?

The Avalanche Bridge does not currently support NFT transfers.

## Supported Chains

### What chains are supported by the Avalanche Bridge?

The Avalanche Bridge currently only supports transfer of Ethereum ERC20s to the Avalanche C-Chain and vice versa. There are plans to support transfer of ERC20s created on the Avalanche C-Chain. There are also plans to support networks other than Avalanche and Ethereum.

### Can I bridge assets from (network) to Avalanche?

The Avalanche Bridge can only transfer assets between Ethereum and Avalanche. To get assets from another network onto Avalanche, you can do one of the following:

* Transfer those assets to Ethereum, and from Ethereum to Avalanche
* Use a third party bridge not created/maintained/supported by Ava Labs
* Buy AVAX on a centralized exchange and withdraw AVAX to Avalanche, then use an AMM to swap for other assets.

## AEB (Deprecated Bridge)

The current-generation Avalanche Bridge (AB) to which this document refers is predated by a previous bridge implementation called the AEB. This section deals with questions about the previous bridge implementation (AEB).

### When does the AEB stop operating?

The AEB is deactivated and transfers across it are no longer possible. The funds held on the Ethereum side of the AEB have been moved to the new Avalanche Bridge (AB). Token conversions have been enabled on the Avalanche C-Chain, allowing users to convert their AEB tokens on a 1-1 basis for their equivalent on the Avalanche Bridge. This conversion can be done at [https://bridge.avax.network/convert](https://bridge.avax.network/convert). AEB token support timelines will be left up to the individual DApp projects.

### Can I transfer my AEB tokens to Ethereum?

In order to move your AEB tokens to Ethereum, you must first convert them into AB tokens as described in the question above. Once converted, you can use the new Avalanche Bridge to move the AB tokens back to Ethereum.

### How do I convert my AEB (deprecated bridge) tokens to Avalanche Bridge (AB) tokens?

You can convert your AEB tokens to AB tokens using the [AB user interface](http://bridge.avax.network/convert). Further, many ecosystem projects such as Pangolin are working on making it easy for users to convert their tokens and enter new liquidity pools.

## Design/Technical

### Can a single private key mint tokens?

No single party has access to the SGX enclave address. Only the enclave itself can construct/sign a transaction using that key when it receives approvals from 3 of 4 wardens. In this sense, the enclave here is functioning as a cross-chain smart contract.

### Why doesn't the bridge hold funds in a a smart contract?

Not using a smart contract simplifies the end-to-end transfer requirements, resulting in lower gas fees and faster transfers.

### Can I integrate bridge transfers into my own smart contracts?

Currently, the bridge only supports cross-chain transfers from externally owned accounts (EOAs). This is because the bridge uses the same address on both networks, ensuring that funds moved across the bridge are kept within the same wallet, and there is not a way to ensure that a smart contract at a given address on Ethereum also exists at the same address on Avalanche. ERC20 tokens sent to the bridge address from smart contracts on the Ethereum network will not be minted as wrapped tokens on Avalanche.

### Is the use of tx.origin in the BridgeToken contracts safe?

While using tx.origin to check authorization within smart contracts poses potential security risks, our use case does not. In the bridge contracts, tx.origin is only used to disallow smart contracts from directly calling the "unwrap" function, since the bridge currently only supports transfer from externally owned accounts. It is safe to do this by comparing the tx.origin value to the msg.sender value.

### Where can I find more information about the design?

See [Avalanche Bridge: Secure Cross-Chain Asset Transfers Using Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

## Miscellaneous

### I can't see my tokens in my wallet. Are they lost forever?

No. It is very likely a user interface issue, and the tokens are there but you just don't see the tokens. See [here](avalanche-bridge-faq.md#cant-see-funds).

### On the Proof of Assets page, why don't the amount of an asset on Ethereum and Avalanche match?

It is possible for the bridge to be over-collateralized (i.e. hold more of an ERC20 asset on Ethereum than exists on Avalanche) for three reasons. These are all expected.

1. There are new transfers from Ethereum to Avalanche. The bridge only processes transfers once the Ethereum transaction receives 35 confirmations. Before then, the collateral balance will be more than the wrapped asset supply.
2. AEB collateral has been transferred to the new AB bridge, but not all AEB tokens have been converted to AB tokens on Avalanche yet.
3. Bridge fees have accumulated on the Ethereum side. The enclave doesn't immediately collect the fees generated from the bridge. Instead it holds all collected fees of each asset in the bridge wallet until a configured threshold is met. At which point, the fees are sent to a separate wallet.

### Where can I buy AVAX?

Depending on your location, you may be able to buy AVAX on a centralized exchange. You can also buy AVAX on decentralized exchanges such as [Pangolin](https://app.pangolin.exchange/).

### How can I contact someone for support?

Support is available using the chat at [support.avax.network](https://support.avax.network), or on our [Discord](https://chat.avax.network/) server. **Please make a reasonable effort to search for the answer to your question before asking!** Someone else has almost certainly asked it.

### What does the .e suffix in the token name mean?

The `.e` suffix denotes that the asset moved across the bridge from Ethereum.

### How do I configure Metamask on Avalanche?

To set up your Metamask wallet and connect it to the Avalanche network, see [here](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

### I transfered my ERC20 over the Avalanche Bridge. Where can I trade it now?

You can trade bridge tokens on multiple different AMMs on the Avalanche C-Chain, such as [Pangolin](https://app.pangolin.exchange/).

## Ecosystem

### How do I add my project to the ecosystem directory?

To have your project added to the ecosystem directory, please send an email to `ecosystem@avalabs.org`. Please include:

* your project name
* a brief description of your services
* an 88h x 88w .svg version of your project's logo

  A member of the Avalanche team will get back to you to confirm the addition of your project.

### How can I get a banner promoted on the Ecosystem page?

To have your project listed in the promotional carousel section of the Avalanche Ecosystem page, please submit a request to `ecosystem@avalabs.org`. Please include a short description of your project and the promotional details. An Ava Labs support team member will respond to you within 2 business days.

Specifications for the banner are as follows:

* Desktop and Landscape:  1155px \* 440px
* Portrait and Mobile:  720px \* 337px
* Design elements in middle of banner or they will be cut off
* Use solid color as BG or have gradient that fades into \#000000 (edited) 

