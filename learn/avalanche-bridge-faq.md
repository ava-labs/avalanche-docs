# Avalanche Bridge (AB) FAQ

The Avalanche Bridge (AB) can be used to transfer ERC20 tokens from Ethereum to Avalanche's C-Chain and vice versa.
This document answers common questions about the bridge.
If this document and other documentation don't answer your question, you can contact us on [Avalanche's support website](https://support.avax.network), [Discord](https://chat.avalabs.org) or [Telegram.](https://t.me/avalancheavax)

## Transactions

### What can I do if my transaction seems stuck?
If the Ethereum transaction transferring funds over the bridge to Avalanche seems stuck and does not have any confirmations, you can speed up the transaction as described [here](#speed-up-transaction). If the Ethereum transaction has already received 35 confirmations, but the Avalanche transaction timer seems to be stuck, check your Metamask wallet balance on the Avalanche network. It could be that the transaction was already processed but is just not showing up on the user interface. Note that this may happen if you opted to "speed up" your transaction.

Is is possible, but very unlikely, that the Ethereum transaction issued by the bridge when transferring funds to Ethereum takes a long time to receive 35 confirmations. This may occur if there is a sudden significant spike in Ethereum gas prices. If the transaction is not included within 200 blocks of when it was issued on Ethereum, a new transaction with a higher gas price may be issued to "unstick" the transfer.

### What if the gas price is more than the amount I am transferring?
When moving ERC20 assets from Ethereum to Avalanche, you are allowed to transfer any number of tokens you would like to. The bridge was designed in such a way that minimizes transaction fees. However, if the transaction fee is higher than the value you are looking to transfer, it may make sense to wait until the Ethereum gas price decreases.

When moving assets from Avalanche back to Ethereum, the bridge charges an in-kind transfer fee, as described [here](#fees). The user interface does now allow transfers less than the fee amount. If a user manually generates and issues such a transaction, the bridge will mark the transfer as invalid and not process it.

### Can I send tokens created on Avalanche to Ethereum?
Not yet. The AB currently only supports transfer of ERC20 tokens create on Ethereum to Avalanche and back. There are plans to enable this in the future.

### Can I send ETH or BTC across the bridge?
The AB does not currently support native ETH or BTC. However, you can transfer the wrapped version of these assets (WETH and WBTC) across the bridge.

### What if my transaction is not visible in the explorer?
The transactions that correspond to bridge transfers will appear on explorers for the Avalanche and Ethereum networks. It may take a few minutes for the transactions to appear. To search for your transaction in the explorer, copy and paste your address into [Avalanche's C-Chain Explorer](https://cchain.explorer.avax.network/) or [Etherscan](https://etherscan.io/). To view the transactions sent by the bridge itself, you can look [here](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) for Avalanche and [here](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) for Ethereum. If you still don't see your transaction, reach out on [Telegram](https://t.me/avalancheavax) or [Discord](https://chat.avax.network/). 

### Are there tutorials on how to use the bridge?
Yes, you can view video tutorials for bridge functionality [here](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

### Can I send to a different address on the other network?
The bridge only allows transfers to the same address on the other network. 
After the asset is transferred to the other network, it can be sent to any address or contract.
 
### Can I speed up my transaction? <a id="speed-up-transaction"></a>
Yes, you can click on the “Speed Up” button on Metamask. 
“Speeding up” a transaction through Metamask issues a new transaction on Ethereum that has a higher gas price than the transaction that was originally sent.
Since the new transaction has a higher gas price, it is more likely to be included in a block.
Only one of the transactions (the original and the "sped up") will be accepted.
Speeding up a transaction that is transferring funds to the bridge is safe.
However, the user interface will not be aware of the new transaction, meaning you may not see the confirmations in the user interface. 
Once the new transaction has 35 confirmations on Ethereum, check your Metamask wallet on Avalanche to see the wrapped funds.

### Why does the number of tokens shown on Metamask not match the number I specified?
When transferring from Avalanche to Ethereum, Metamask shows that 0 tokens are to be transferred, not the actual number of tokens. This is a known problem with Metamask.

## Fees
### How do fees work on the Avalanche Bridge?
The bridge charges transfer fees in order to cover the cost of the transaction fees on the Avalanche and Ethereum networks.
These fees are charged in-kind with the ERC20 asset being transferred.
That is, when you transfer a token, a portion of the balance transferred is taken by the AB as a fee.

The fee is a percentage of the estimated Ethereum transaction fee, plus a constant amount (currently $5) to account for price volatility.

For a limited time, this percentage is zero to encourage users to transfer assets.
Further, transfers to Avalanche may qualify for an AVAX airdrop as described [here](#airdrop).

### How is gas estimated? How does the bridge get token prices?
The bridge uses Chainlink price feeds to get gas price information for the Ethereum network.
The gas price used is the higher of the Chainlink FASTGAS value and the Geth gas price approximation.
The gas price is padded by a few GWEI to ensure transactions sent by the bridge are quickly included in an Ethereum block.

The bridge also uses Chainlink price feeds to determine token prices used to calculate the amount of a token that is equivalent to the bridge fee.

### Is there an airdrop?<a id="airdrop"></a>
Users will be airdropped 0.1 AVAX when they transfer more than $75 (subject to change) of a token from Ethereum to Avalanche.

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

A complete breakdown of a Warden’s role and responsibilities will be provided in an upcoming Avalanche Bridge Tech Design article.

### What is the relationship between Ava Labs and the Wardens?
The wardens are trusted partners of the Avalanche Foundation. They have a record of technical excellence and working with Avalanche.

### Has the code been audited? Where are the audit reports?
Yes, the code for the bridge, warden and smart contracts have been audited by Halborn. Audit reports can be found [here](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

## Tokens

### What kind of tokens can be transferred across the bridge?
Only ERC20 tokens can be transferred across the bridge.

### How can I add a token to the bridge?
See [here](https://github.com/ava-labs/avalanche-bridge-resources#readme).

### How can I add a token used in the bridge to Metamask?
See [here](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) for a tutorial.

### How can I get WETH from ETH?
You can use Metamask’s SWAP function to swap from ETH to WETH. Alternatively, you can also use an AMM such as [Uniswap](https://app.uniswap.org/#/) on Ethereum.

### Why are there two types of the same token?  How can I tell which one derives from the Avalanche Bridge?
The current-generation Avalanche Bridge (AB) to which this document refers is predated by a previous bridge implementation called the AEB.
The AEB bridge and AB bridge each have their own unique token sets.
The AEB tokens will be deprecated in the coming weeks in favor of the AB tokens. AB tokens have a `.e` suffix.
While a token's name and symbol are good references to differentiate the two, the only surefire way to verify a token is the contract address.
The AB token contract addresses can be found [here.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

## Supported Chains
### What chains are supported by the Avalanche Bridge?
The Avalanche Bridge currently only supports transfer of Ethereum ERC20s to the Avalanche C-Chain and vice versa. 
There are plans to support transfer of ERC20s created on the Avalanche C-Chain. 
There are also plans to support networks other than Avalanche and Ethereum.

## AEB (Deprecated Bridge)
The current-generation Avalanche Bridge (AB) to which this document refers is predated by a previous bridge implementation called the AEB.
This section deals with questions about the previous bridge implementation (AEB).

### When does the AEB stop operating?
On August 11, 2021, the AEB will be turned off and transfers across it will not be possible. The funds held on the Ethereum side will be migrated into the new Avalanche Bridge (AB) wallet. Token swaps will be enabled on the Avalanche C-Chain, allowing users to swap their AEB tokens on a 1-1 basis for their equivalent on the Avalanche Bridge. AEB token support timelines will be left up to the individual DApp projects.

### Can I transfer my AEB tokens to Ethereum?
While the AEB bridge is still operating, you may transfer AEB tokens back to Ethereum.
The AEB bridge will be turned off the week of August 11th, 2021. (See above question.)
When this happens the AEB bridge tokens will be migrated to the new AB bridge, and you will be able to convert your AEB tokens into AB tokens seamlessly without needing to cross the bridge.

### How do I convert my AEB (deprecated bridge) tokens to Avalanche Bridge (AB) tokens?
Once the AEB migration happens (currently scheduled for August 11th, 2021), you will be able to convert your AEB tokens to AB tokens using the [AB user interface](http://bridge.avax.network/convert). Further, many ecosystem projects such as Pangolin are working on making it easy for users to convert their tokens and enter new liquidity pools. 

## Design/Technical 
### Is the use of tx.origin in the BridgeToken contracts safe?
While using tx.origin to check authorization within smart contracts poses potential security risks, our use case does not. In the bridge contracts, tx.origin is only used to disallow smart contracts from directly calling the "unwrap" function, since the bridge currently only supports transfer from externally owned accounts. It is safe to do this by comparing the tx.origin value to the msg.sender value.

### Can a single private key mint tokens?
No single party has access to the SGX enclave address. Only the enclave itself can construct/sign a transaction using that key when it receives approvals from 3 of 4 wardens. In this sense, the enclave here is functioning as a cross-chain smart contract.

## Miscellaneous
### On the Proof of Assets page, why don't the amount of an asset on Ethereum and Avalanche match?
It is possible for the bridge to be over-collateralized (i.e. hold more of an ERC20 asset on Ethereum than exists on Avalanche) for three reasons. These are all expected.
1. There are new transfers from Ethereum to Avalanche. The bridge only processes transfers once the Ethereum transaction receives 35 confirmations. Before then, the collateral balance will be more than the wrapped asset supply.
2. AEB collateral has been transferred to the new AB bridge, but not all AEB tokens have been converted to AB tokens on Avalanche yet. 
3. Bridge fees have accumulated on the Ethereum side. The enclave doesn't immediately collect the fees generated from the bridge.  Instead it holds all collected fees of each asset in the bridge wallet until a configured threshold is met.  At which point, the fees are sent to a separate wallet.

### Where can I buy AVAX?
Depending on your location, you may be able to buy AVAX on a centralized exchange.
You can also buy AVAX on decentralized exchanges such as [Pangolin](https://app.pangolin.exchange/).

### How can I contact someone for support?
Support is available using the chat at [support.avax.network](https://support.avax.network), or on our [Discord](https://chat.avax.network/) server.

### What does the .e suffix in the token name mean?
The `.e` suffix denotes that the asset moved across the bridge from Ethereum.

### How do I configure Metamask on Avalanche?
To set up your Metamask wallet and connect it to the Avalanche network, see [here](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche). 

# Ecosystem
## How do I add my project to the ecosystem directory?
To have your project added to the ecosystem directory, please send an email to `ecosystem@avalabs.org`. Please include:

* your project name
* a brief description of your services
* an 88h x 88w .svg version of your project's logo
  
 A member of the Avalanche team will get back to you to confirm the addition of your project.

### How can I get a banner promoted on the Ecosystem page?
To have your project listed in the promotional carousel section of the Avalanche Ecosystem page, please submit a request to `ecosystem@avalabs.org`.  Please include a short description of your project and the promotional details. An Ava Labs support team member will respond to you within 2 business days.

Specifications for the banner are as follows:

* Desktop and Landscape:  1155px * 440px
* Portrait and Mobile:  720px * 337px
* Design elements in middle of banner or they will be cut off
* Use solid color as BG or have gradient that fades into #000000 (edited) 
