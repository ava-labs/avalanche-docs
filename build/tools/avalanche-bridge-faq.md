# Avalanche Bridge (AB) FAQ

## Transactions

### What can I do if my transaction seems stuck?
If your Ethereum transaction transferring funds over the bridge to Avalanche seems stuck and does not have any confirmations, you can speed up the transaction, as outlined below in [this](#can-I-safely-speed-up-my-transaction) and [this](#what-happens-after-I-have-sped-up-a-transaction-on-metamask). If the Ethereum transaction has already received 35 confirmations, but the Avalanche transaction timer seems to be hanging, check your Metamask wallet balance on the Avalanche network. It is likely that the transaction was already processed, but failed to be picked up by the UI due to refreshing, our speeding up the original Ethereum transaction.

Though very unlikely, when moving funds from Avalanche back to Ethereum, it is possible for the Ethereum transaction sent by the bridge to take a long time to receive confirmations. This may occur if there is a sudden significant spike in Ethereum gas prices. If the transaction is not included within 200 blocks of when it was issued on Ethereum, a new transaction with a higher gas price may be issued to unstick the transaction.


### What if the gas price is more than the amount I am transferring?
When moving ERC20 assets from Ethereum to Avalanche, you are allowed to transfer any value of tokens you would like to. The bridge was designed in such a way that minimizes the transaction fees on Ethereum; however, if the Ethereum gas cost transaction fee is higher than the value you are looking to transfer, it may make sense to wait until the gas price on the Ethereum network comes down. Once crossing the bridge we hope you find the transaction fees and finalization times on Avalanche much more user friendly.

When moving assets from Avalanche back to Ethereum, the bridge charges an in-kind transfer fee, as outlined below in Q2.1. While the web app will not allow you to send transfers less than this fee amount, if such a transaction is manually generated and sent to the Avalanche network, the bridge will simply mark the transfer as invalid since it does not have enough funds to cover the transfer fee.

### Can I send my native avalanche tokens to Ethereum?
Not yet. The initial launch of the AB only supports moving native Ethereum tokens to Avalanche and back. However, in future releases we hope to enable bidirectional transfers which would allow you to also move Avalanche native tokens to Ethereum

### Can I send ETH or BTC across the bridge?
Currently, the AB does not support native ETH or BTC. However, you can transfer the wrapped version of these assets (WETH and WBTC) across the bridge. These tokens are available through Metamask or AMMs on Ethereum. 

### What if my transaction is not visible in the Explorer?
When transferring assets in either direction across the bridge, the transaction you send to the respective network will take seconds to minutes to appear in its respective explorer. To search for your transaction in the explorer, copy and paste your wallet address into either [cchain.explorer.avax.network](https://cchain.explorer.avax.network/) or [etherscan.io](https://etherscan.io/). To view the transactions sent by the bridge itself, you can look [here for Avalanche](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) and [here for Ethereum](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0). If you still aren’t seeing your transaction, feel free to reach out to us on [Telegram](https://t.me/avalancheavax) or [Discord](https://chat.avax.network/).

### Are there tutorials on how to use the bridge?
Yes, you can view video tutorials for all bridge functionality [here](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

### Can I send to a different wallet address?
After crossing the bridge in either direction, you can send assets to any wallet or contract address you would like to. However, the bridge was designed to only allow transfers across networks from and to the same wallet address. 
 
### Can I safely speed up my transaction?
Yes, you can click on the “Speed Up” button on Metamask. However, keep in mind of [this FAQ](#what-happens-after-I-have-sped-up-a-transaction-on-metamask). 

### What happens after I have sped up a transaction on Metamask?
“Speeding up” a transaction through metamask issues a new transaction on Ethereum that has a higher gas price than the transaction that was originally sent. Since the new transaction has a high gas price, it is more likely to be included in a block, and since both transactions use the same nonce, only one will be accepted into the blockchain. Speeding up a transaction that is transferring funds to the bridge is perfectly safe; however, the UI is not currently aware of the new transaction, meaning you may not see the confirmations animation. Once the new transaction has 35 confirmations on Ethereum, check your metamask wallet on Avalanche to see the wrapped funds.

### When transferring from Avalanche to Ethereum, why does the number showing on Metamask not match the number I requested?
When transferring from Avalanche to Ethereum, 0 shows up on Metamask, not the actual number of tokens to be transferred. This is a known problem with Metamask.

## Fees
### How do fees work on the Avalanche Bridge?
The bridge charges certain transfer fees in order to cover the cost of the transaction fees on each blockchain network. These fees are charged in kind of the ERC20 asset being transferred. Currently, the fees are calculated as follows.

For moving assets from Ethereum to Avalanche, the fee is a small percentage of the assets being transferred, capped at a reasonable amount to incentivize larger transfers. However, as a welcome gesture to the Avalanche community, the fee percentage when transferring from Ethereum to Avalanche is currently 0.00%. Further, transfers to Avalanche may qualify for an AVAX airdrop as explained below in [this FAQ](#how-does-the-airdrop-work).

For moving assets from Avalanche back to Ethereum, the fee is based on the current Ethereum gas price and current price of the ERC20 asset compared to ETH. The bridge charges the equivalent value of the amount of gas set as the gas limit for the transaction, plus a constant dollar amount (currently $5) to account for any price volatility. The bridge leverages Chainlink price feeds to determine the current asset prices and uses that to calculate the amount of the ERC20  that is equivalent to this fee value.

### How is gas estimated?
The bridge also leverages Chainlink price feeds to get current gas approximations for the Ethereum network. The gas price used is the higher of the Chainlink FASTGAS value and the Geth gas price approximation. The gas price is padded by a few GWEI to help ensure transactions sent by the bridge get included in a block quickly on Ethereum, which benefits the user experience of the bridge.

### How does the airdrop work?
Users will be airdropped AVAX token when they transfer more than $75 (subject to change) from Ethereum to Avalanche. The actual amount required is slightly less than the amount displayed on the frontend.  However, the bridge checks the USD equivalent at time of the 35th conf, thus the frontend pads the amount displayed slightly in case of price variance. 

### What if I did not receive my airdrop?
If you haven’t received your airdrop, please confirm that the transfer amount met the minimum threshold requirements.  The current requirements for .1 AVAX are a transfer of at least $75 USD notional equivalent in assets being transferred.

## Security
### I have heard of the bridge referred to as trustless.  What does this mean?
The Avalanche Bridge is trustless in the sense that no one party is able to access any of the funds held as collateral or mint wrapped assets. All transfers across the bridge must be approved by 3 of 4 independent parties (called Wardens). In this sense, when using the bridge you are not trusting any one party to properly transfer your funds.

### What is the role of the wardens?
The role of the wardens is four fold:
1. Storing Secret Shares
2. Indexing Supported Blockchains
3. Tracking Processed Transactions
4. Hosting Public Information

A complete breakdown of a Warden’s role and responsibilities will be provided in the upcoming Avalanche Bridge Tech Design article.

### What is the relationship between Ava Labs and the Wardens?
The wardens are trusted partners of the Avalanche Foundation.  They have a historical record of technical excellence and have a history of working with the platform.

### Has the code been audited? Where are the audit reports?
Yes, the code for the bridge, warden and smart contracts have been audited by Halborn separately. Audit reports can be found [here](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

##Tokens

### How can I add a token used to bridge?
Here is [the doc](https://github.com/ava-labs/avalanche-bridge-resources#readme).

### How can I add a token used in bridge to Metamask?
[Here](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) is the tutorial on how to add a token.

### How to get WETH from ETH?
You can use Metamask’s SWAP function to swap from ETH to WETH. Alternatively, you can also use any AMM on Ethereum, such as [Uniswap](https://app.uniswap.org/#/).

### Why are there two types of the same token?  How can I tell which one derives from the Avalanche Bridge?
The AEB bridge and AB bridge each have their own unique token set holding wrapped assets on the Ethereum EVM.  The AEB tokens will be rapidly deprecated in the coming weeks in favor of the AB tokens (indicated by the “.e” suffix).  While the token name and symbol are a good reference to differentiate the two, the only surefire way to verify a token is the contract address.  The AB token contract addresses can be found [here](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json) 

## Supported Chains
### What chains are supported by the Avalanche Bridge?
Currently the Avalanche Bridge only supports native Ethereum Assets moving over to the Avalanche C-Chain.  There are development plans to support bidirectionality of assets (ie native C-Chain assets being wrapped on Ethereum) and additional chains in the future.

## AEB Bridge (deprecated)
### Can I transfer my AEB tokens back to Ethereum?
While the AEB bridge is still operating, you are able to transfer any AEB tokens back to Ethereum. The AEB bridge is planned to be sunset the week of August 11th, 2021. When this happens the AEB bridge tokens will be migrated to the new AB bridge, and you will be able to convert your AEB tokens into AB tokens seamlessly without needing to cross the bridge. See Q6.2 for more details.

### How do I convert my AEB tokens to Avalanche bridged tokens?
Once the AEB migration happens (currently scheduled for August 11th, 2021), you will be able to convert your AEB tokens to AB tokens at [bridge.avax.network/convert](http://bridge.avax.network/convert). Further, many ecosystem projects such as Pangolin are working on making it easy for everyone to convert their tokens and re-enter new liquidity pools. 

## Design/Technical 
### Is the use of tx.origin in the BridgeToken contracts a potential risk?
While using tx.origin to check authorization within smart contracts poses potential security risks, our use case does not. In the bridge contracts, tx.origin is only used to disallow smart contracts from directly calling the "unwrap" function, since the bridge currently only supports transfer from externally owned accounts. It is safe to do this by comparing the tx.origin value to the msg.sender value.

### Can a single private key arbitrarily mint tokens?
No single party has access to the SGX enclave address. Only the enclave itself can construct/sign a transaction using that key when it receives approvals from 3 of 4 wardens. In this sense, the enclave here is functioning as a cross-chain smart contract.

## Other
### On the Proof of Assets page, why the amount of each asset on ethereum and avalanche side aren't matching up?

It is possible for the bridge to be over collateralized (i.e. hold more of an ERC20 asset on Ethereum than exists on Avalanche) for three reasons. These are all expected.
1. There are new transfers from Ethereum to Avalanche. The bridge only processes transfers once the Ethereum transaction receives 35 confirmations. Before then, the collateral balance will be more than the wrapped asset supply.
2. AEB collateral has been transferred to the new AB bridge, but not all AEB tokens have been converted to AB tokens on Avalanche yet. 
3. Bridge fees have accumulated on the Ethereum side. The enclave doesn't immediately collect the fees generated from the bridge.  Instead it holds all collected fees of each asset in the bridge wallet until a configured threshold is met.  At which point, the fees are sent to a separate wallet.

### Where can I get AVAX tokens?
AVAX tokens can be purchased on various centralized exchanges depending on your location. Alternatively, AVAX can also be purchased on automated market makers on the Avalanche C-chain, such as [Pangolin](https://app.pangolin.exchange/).

### How can I contact someone for support?
Support is available using the chat at [support.avax.network](https://support.avax.network). You can also join our [Telegram](https://t.me/avalancheavax) or [Discord](https://chat.avax.network/) channels.

### What does the .e suffix mean at the end of each token?
The “.e” suffix denotes that the asset moved across the bridge from the Ethereum EVM.

### How to set up Metamask on Avalanche?
To set up your Metamask wallet and connect it to the Avalanche network, see [here](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche). 

# Ecosystem
## How do I add my project to the ecosystem directory?
To have your project added to the ecosystem directory, please send an email to ecosystem@avalabs.org.  Please include your project name, a brief description of your services and a 88h x88w .svg version of your logo.  A member of the Ava Labs team will get back to you within 2 business days to confirm the addition of your project.

### How can I get a banner promoted on the Ecosystem page?
To have your project listed in the promotional carousel section of the Avalanche Ecosystem page, please submit a request to ecosystem@avalabs.org.  Please include a short description of your project and the promotional details. An Ava Labs support team member will respond to you within 2 business days.

Specifications for the banner are as follows:

* Desktop and Landscape:  1155px * 440px
* Portrait and Mobile:  720px * 337px
* Design elements in middle of banner or they will be cut off
* Use solid color as BG or have gradient that fades into #000000 (edited) 

Promotional banners rotate on two week cycles.