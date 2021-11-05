# Getting Started

The purpose of this tutorial is to give a general overview of Avalanche and to serve as a starting point for new users to the Avalanche ecosystem. General knowledge of cryptocurrency is assumed, and in particular familiarity with the Ethereum ecosystem. If you don't understand something right away, that's OK. Search for an answer online, and if you don't find it, ask on our [Discord](https://chat.avax.network).

We recommend reading this document entirely before using Avalanche so that you can avoid common pitfalls and problems that new users run into. There are many facets of Avalanche, so it's best to get a full picture of things before diving in to save yourself confusion. Also, this guide contains tips and warnings to help you avoid falling victim to scammers.

You can find a general overview of Avalanche [here](https://support.avax.network/en/articles/4135427-avalanche-platform-overview). It will be useful in understanding similarities and differences between Avalanche and other platforms.

## AVAX Token and Fees

All fees on Avalanche are paid in the native token, AVAX, so you'll need some in order to interact with the Avalanche network. You can get it through [exchanges](https://ecosystem.avax.network/marketplace?tag=exchange). Another way to acquire AVAX is via credit card purchase on [Pangolin](https://app.pangolin.exchange/#/buy). Other ways ways are explained below.

If you use the [Avalanche Bridge](https://bridge.avax.network) to transfer assets to Avalanche, you will need some AVAX to move/swap your assets. The Avalanche Bridge provides an [airdrop](https://support.avax.network/en/articles/5462264-is-there-an-airdrop) of AVAX to users who transfer more than a certain value of assets to Avalanche. Use this AVAX to swap some of your bridged assets for AVAX so that you can pay future transaction fees.

## Wallet

An _address_ can hold a balance of cryptocurrencies. A _wallet_ controls a set of addresses. Think of an address like a lockbox, and a wallet as a key for many lockboxes. A wallet is accessible by providing a unique, secret 24 word passphrase. **If you lose this passphrase, you don't have access to your wallet, and there is no way to recover your assets!** Therefore, it's very important to safely store your wallet's secret passphrase securely. At the same time, **anyone with your passphrase can access and take all of your assets**, so it's vital to make sure nobody else knows your passphrase. It's best practice to **not have your passphrase saved on any computer.**

You can access your wallet on the [Avalanche Wallet](https://wallet.avax.network/) website. You can follow [this](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet) guide to set up a new own wallet.

You can and should use a [hardware Ledger](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche) to log into your wallet. **Using a hardware wallet is the most secure way of accessing your tokens** because your private keys and the passphrase never leave the device.

Once you have your wallet, you may want to send your AVAX from an exchange to your wallet. See [here](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet) for a guide on doing so.

Avalanche's Primary Network consists of three different chains, as explained in the overview article linked above. To move your funds from one chain to another, you will need to make [cross-chain transfers](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains).

## Metamask

Most of the activity on the Avalanche network happens on various dapps \(decentralized apps\). To interact with them, you can use a browser extension that will connect your wallet with the dapp. [Metamask](http://metamask.io/) is one such popular wallet extension.

By default, Metamask connects to Ethereum. To connect to Avalanche, you need to [add Avalanche as a custom network](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

In Metamask you can create a new account and send funds to it from your main Avalanche wallet, or import the existing Avalanche Wallet account. You can import the account either by using the secret passphrase or by exporting the C-Chain private key from the wallet \(Select `Manage Keys`, then `View C Chain Private Key`\). If you use the Ledger hardware wallet, you can use it in Metamask too. It will connect to your wallet and have the same balances/addresses as if you accessed your wallet on the wallet website.

To see your funds in Metamask \(if you imported Avalanche Wallet\), or to be able to send funds from the Wallet account to Metamask account, you will need to have your funds on the C-Chain. If you transferred the funds from an exchange they will usually be on the X-Chain, so you will need to a cross-chain transfer, as explained in the previous section.

## Transactions

You can send tokens from the Avalanche Wallet or Metamask. It is important to have in mind that all transactions are final and irreversible. If you make a mistake and send funds to an incorrect address, there is no mechanism that can revert the transaction and return the funds to you. That's why it's critically important to be sure that the address you're sending the tokens to is correct and that you mean to send to an address on Avalanche and not a different network \(see next section.\)

### Sending to Other Networks

Other networks may have address formats that are identical to the ones on Avalanche. But **that doesn't mean that you can send funds on Avalanche directly to other blockchain networks**, including, for example, Ethereum or BSC \(Binance Smart Chain\). If you tell Avalanche to send funds to address \(`0x12345`\), for example, it will do so **on Avalanche**, not another network, even if that address exists or is valid on another network. Your funds will not end up on the other network. Once the funds are sent, only the person who has the private keys that control the destination address can ever access them. If _you_ control the destination address, you can probably be able to retrieve them by importing the private key that controls the address to Metamask. If you sent them to someone else's address, though, you will need their cooperation, which may be difficult.

The above applies in the reverse direction, too. You cannot send funds to an Avalanche address directly from Ethereum, BSC, etc. The addresses may look the same and be accepted, but that doesn't mean the funds will arrive in your wallet. If you want to send or receive funds from Ethereum, see the [Avalanche Bridge](getting-started.md#avalanche-bridge) section below.

If you're unsure of what you're attempting to do, or doing something for the first time, it's best to send a small amount \('dust'\) first, to check that it arrives at the intended destination.

### Adding Tokens

Besides the native token, AVAX, numerous other tokens exist on the network. Avalanche Wallet has built in support for the most popular tokens, but Metamask does not. If you acquire other tokens, they may not immediately be visible in your wallet or Metamask. You may need to add them manually, by selecting 'Add token' button. To add a token, you will need to know the token contract address. Do not use the search function in Metamask, it only works correctly on Ethereum. You can find addresses of the most popular tokens [here](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json) for assets from Ethereum, or [here](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json) for Avalanche assets.

When you add the address, the rest of the data will autofill, and your balance should be visible. You can automatically add tokens to Metamask [here](https://bridge.avax.network/proof-of-assets) by pressing the Metamask icon in the `Wrapped token` you want to add.

## Dapps

### Avalanche Bridge

Once you have your browser extension \(Metamask for example\) set up, you are ready to interact with dapps on Avalanche. Most of what you will want to do, such as _yield farming_, requires that you have tokens other than AVAX. If you have those tokens on Ethereum \(or an exchange that can send them to Ethereum\), one of the cheapest and fastest ways of bringing them over is the [Avalanche Bridge](https://bridge.avax.network/).

You can find a collection of video tutorials on the basic usage of the Avalanche Bridge [here](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP). Also, make sure that you go over the [FAQ](https://docs.avax.network/learn/avalanche-bridge-faq) which answers most common questions about the bridge and highlights things to watch out for.

When you bridge over $75 or more of assets, you will also be airdropped some AVAX to help pay for initial swaps. Use those funds only to acquire additional AVAX as you will need AVAX to pay for fees on every other dapp you use! If you get stranded without enough AVAX for fees you will be unable to do anything else, so make sure you always have some AVAX in your wallet. You can swap for AVAX on [Pangolin](https://app.pangolin.exchange).

### Ecosystem

There is an ever-growing collection of dapps deployed on Avalanche. To find them, you can go to our official [ecosystem website](https://ecosystem.avax.network/marketplace). You can filter the projects by selecting the tags for the areas of your interest. There is also a [community-driven](https://www.avax-projects.com/) list of projects. \(You should not consider the presence of a project on the lists above as an endorsement of the project.\)

Dip in, browse, and try stuff. There are many gems in there.

## Security

As elsewhere in the cryptocurrency space, you need to be keenly aware of the dangers. All transactions are final and irreversible, and if you fall victim to a scam, nobody will be able to retrieve your funds.

### Wallet Passphrase

It's crucial to understand that **your secret passphrase is your wallet**. Whoever has access to the secret 24 word passphrase has complete and full access and control over everything in the wallet. If you give someone your passphrase, you have given them everything in it. Therefore, **never give your passphrase to anyone**. Do not send it anywhere. Do not type it into websites you found online or that someone sent you a link to. Best practice is to not have your passphrase saved on any computer.

The only place where you can enter the passphrase is into the [official Avalanche Wallet](https://wallet.avax.network) website, and even then, make sure you're on a secure network and that the website is the right one by typing the address `https://wallet.avax.network` address yourself. Check the padlock icon in your browser to make sure your connection is secure. If you're in doubt as to whether to enter your passphrase, don't.

If you're working with non-trivial amounts of tokens \(in other words, money you can't comfortably lose\), we strongly advise that you use a [Ledger hardware wallet](https://www.ledger.com/) to access your funds.

### DYOR

That stands for 'Do your own research'. In other words, don't just blindly trust anything you read online. Check for other sources, ask for second opinions. Be very careful and judicious with accepting news from one source.

Be especially suspicious of people contacting you in private, offering help about issues you posted about publicly. Virtually every time it happens, it's a scammer trying to convince you to expose your passphrase, private keys or otherwise compromise your tokens.

Don't rush into unknown projects that promise outsized returns. Any dapp you deposit your funds into has access to them. Search for the project online and see who maintains it. Check that the contracts are verified and audited. Look out for potential red flags.

### Fake tokens

Anyone can create a new token, and on Avalanche it is pretty cheap. Also, liquidity pool creation on DEXes is permissionless so anyone can create a new pair with a fake token that has the same name and token image as the real thing. To avoid that kind of scam, always select tokens from the official token lists on the DEXes, don't use links from other places.

## Explorers

Explorers are websites that index and present network activity, where you can look up individual transactions, and find out more about what's flowing through the network.

### Official explorer

[explorer.avax.network](https://explorer.avax.network/) is the official network explorer maintained by Ava Labs.

### AvaScan

[Avascan](https://avascan.info/) is an independent explorer website, known for its slick presentation and comprehensive overview, especially interesting for viewing [validators and delegators](https://avascan.info/staking/validators), as it shows lots of interesting information about individual network validators.

### VScout

[VScout](https://vscout.io/) is another alternative explorer for Avalanche. Among other things there you can see distribution of validators across the planet.

## Online support

We offer several ways of getting support. Here are some:

* [Support site](https://support.avax.network/en/)
* [Twitter tech support](https://twitter.com/avaxtechsupport).
* [Telegram](https://t.me/avalancheavax)
* [Discord server](http://chat.avax.network/) \(most popular and highest traffic.\)

Expanding on the [DYOR](getting-started.md#dyor) section above: When using any public support channel, be suspicious of anyone contacting you in private via DMs, email or similar. They may pose as admins, moderators or team members. **Legitimate accounts will never contact you in DMs first!** Real admins and team members will always engage publicly first, and if needed request that you _contact them_ in direct message.

Scammers monitor public channels for people looking for help and then contact them in private offering to help. A scammer might tell you that you need to 'sync your wallet' or something similar and give you a link where you are supposed to enter the wallet passphrase to complete the process. They might offer an app that will solve the problem. In both cases, it's just someone looking to steal your funds.

It bears repeating: do not give anyone your secret 24 word passphrase or your private keys!

## Conclusion

Avalanche is a young platform, but it offers many interesting and exciting opportunities to get engaged and participate in the new frontier of blockchains. Getting started can feel daunting, but we hope this document will ease your introduction and onboarding.

If you have any questions, or doubts, need something to be cleared up, or just want to chat, please join us on our [Discord server](http://chat.avax.network/). We'd love to hear from you.
