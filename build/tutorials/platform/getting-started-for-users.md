# Getting Started For Users

The purpose of this tutorial is to give a general overview and serve as a starting point for users new to the Avalanche Platform and its ecosystem. General knowledge of cryptocurrency space is assumed, in particular familiarity with Ethereum ecosystem.

We recommend reading this document entirely before going further, as that way you may avoid common pitfalls and problems that new users run into when onboarding onto Avalanche. In addition, many of these components and applications depend on each other, so it's best to get a full picture of relationships before diving in. Also, it contains safety warnings and pointers that you need to be familiar with in order not to get scammed and your tokens stolen.

You can find a general overview of the Avalanche Platform [here](https://support.avax.network/en/articles/4135427-avalanche-platform-overview), it will be useful in understanding commonalities and differences between Avalanche and other platforms.

## Funding

As all fees on Avalanche are paid in native token AVAX, you will need to have some in order to participate in the Avalanche network. You can get it through [exchanges](https://ecosystem.avax.network/marketplace?tag=exchange). Another way to acquire AVAX is via credit card purchase on [Pangolin](https://app.pangolin.exchange/#/buy). Further ways are explained below.

## Wallet

Cryptocurrency funds are usually accessed through wallets. Your wallet is how you send and receive tokens on the Avalanche Network, and can almost be seen like a bank account. But, unlike traditional banking, there is no customer support to go to if you lose access to your wallet. It's very important to safely store your secret passphrase in a secure manner, like the password manager of your choice (Enpass, Lastpass, etc). **If you do not save your secret passphrase, you will lose access to your funds forever!**

[Avalanche Wallet](https://wallet.avax.network/) is the official web wallet for the Avalanche platform. You can follow [this](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet) to create your own wallet.

You can also use a [HW Ledger](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche) to log into your wallet. Using a HW wallet is the most secure way of accessing the network because your private keys and the passphrase never leave the device.

Once you have your wallet, you may want to send your AVAX [from exchange to your wallet](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet).

Avalanche Primary Network consists of three different chains, as explained in the overview article linked above. To move your funds from one chain to another, you will need to make [cross-chain transfers](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains).

## Metamask

Most of the activity on the Avalanche network happens on various Dapps (decentralized apps). To interact with them, you need a browser extension that will connect your wallet with the dapp. [Metamask](http://metamask.io/) is one such popular wallet extension.

By default, Metamask connects to Ethereum. To connect to Avalanche, you need to [add Avalanche as a custom network](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

In Metamask you can create a new account and send funds to it from your main Avalanche wallet, or import the existing Avalanche Wallet account. You can import the account either by using the secret passphrase or exporting the C-Chain private key from the wallet (Select `Manage Keys`, then `View C Chain Private Key`). If you use the Ledger hardware wallet, you can use it in Metamask too, it will connect to the same wallet.

To see your funds in Metamask (if you imported Avalanche Wallet), or to be able to send funds from the Wallet account to Metamask account, you will need to have your funds on the C-Chain. If you transferred the funds from an exchange they will usually be on the X-Chain, so you will need to a cross-chain transfer, as explained in the previous section. 

## Transactions

You can send transactions from the Avalanche Wallet or Metamask. It is important to have in mind that all transactions are final and irreversible. If you make a mistake and send funds to a wrong address, there is no mechanism that can revert the transaction and return the funds to you. That's why it's critically important to be sure that the address you're sending the tokens to is correct and that the address is actually on Avalanche.

### Sending to Other Networks

Other networks may have address formats that are identical to the ones on Avalanche. But that doesn't mean that you can send funds from Avalanche Wallet to, for example, Ethereum or BSC. Wallet or Metamask have no way of knowing that your intention is to send funds to Ethereum, so they will allow you to do that. But your funds will not end up on Ethereum (or BSC, or another network). They will stay on Avalanche and be sent to that address, but on Avalanche. And once sent, only the person that has the private keys that control that address can ever get to them. If you control the destination address you will probably be able to retrieve them by adding the controlling account to Metamask and switching to Avalanche. But if you sent them to someone else's account, you will need their cooperation, and if the address was an exchange's hot wallet address (for example), you will have a hard time convincing the exchange to retrieve them.

The above stands in reverse direction too. You cannot send to your Avalanche Wallet directly from Ethereum, BSC or other networks. The addresses may look the same and be accepted, but that doesn't mean the funds will arrive in your wallet. If you want to send or receive funds from Ethereum, see the [Avalanche Bridge](#Avalanche Bridge) section below.

If you're unsure of what you're attempting to do, especially if you're attempting something for the first time, it's best to send a small amount ('dust') first, to check that it arrives at the intended destination.

### Adding Tokens

Besides the native token, AVAX, numerous other tokens exist on the network. Avalanche Wallet has built in support for the most popular tokens, but Metamask does not. If you acquire other tokens, they may not immediately be visible in your wallet or Metamask. You may need to add them manually, by selecting 'Add token' button. To add a token, you will need to know the token contract address. Do not use the search function in Metamask, it only works correctly on Ethereum. You can find addresses of the most popular tokens [here](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json) for assets from Ethereum, or [here](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json) for Avalanche assets.

When you add the address, the rest of the data will autofill, and your balance should be visible. You can automatically add tokens to Metamask [here](https://bridge.avax.network/proof-of-assets) by pressing the Metamask icon in the `Wrapped token` you want to add. 

## Dapps

### Avalanche Bridge

Once you have your browser extension set up, you are ready to interact with dapps on Avalanche. Most of what you will want to do (*yield farming*), which requires that you have tokens other than AVAX. If you have those tokens on Ethereum (or an exchange that can send them to Ethereum), one of the cheapest and fastest ways of bringing them over is the [Avalanche Bridge](https://bridge.avax.network/).

You can find a collection of video tutorials on the basic usage of the Avalanche Bridge [here](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP). Also, make sure that you go over the [FAQ](https://docs.avax.network/learn/avalanche-bridge-faq) which answers most common questions about the bridge and highlights things to watch out for.

When you bridge over $75 or more of assets, you will also be airdropped some AVAX to help pay for initial swaps. Use those funds only to acquire additional AVAX as you will need AVAX to pay for fees on every other dapp you use! If you get stranded without enough AVAX for fees you will be unable to do anything else, so make sure you always have some AVAX in your wallet. You can swap for AVAX on [Pangolin](https://app.pangolin.exchange).

### Ecosystem

There is an ever-growing collection of dapps deployed on Avalanche. To find them, you can go to our official [ecosystem website](https://ecosystem.avax.network/marketplace). You can filter the projects by selecting the tags for the areas of your interest. There is also a [community-driven](https://www.avax-projects.com/) list of projects.

Dip in, browse, try stuff. There are many gems in there.

## Security

As elsewhere in cryptocurrency space, you need to be keenly aware of the dangers. All transactions are final and irreversible, if you get scammed chances are nobody will be able to help you retrieve your funds.

### Wallet Passphrase

What is crucial to understand is that **your secret passphrase is your wallet**. Whoever has access to the secret 24 word passphrase has complete and full access and control over everything in the wallet. If you give someone your passphrase, you have given them everything in it. Therefore, never give your passphrase to anyone. Do not send it anywhere, do not type it into websites you found online or someone sent you the link to.

The only place where you can enter the passphrase is into the official wallet, and even then, make sure you're on a secure network, that the website is genuine by typing the address wallet.avax.network address yourself, and checking the padlock to make sure that it really is wallet.avax.network. Any other site where you enter your passphrase into may easily steal all your funds. So be very, very careful about entering your passphrase anywhere. If in doubt, don't. Reach out to us to check if the site is legitimate.

If you're working with non-trivial amounts of tokens (in other words, money you cannot comfortably lose), it is strongly advised to invest in a Ledger HW wallet. 

### DYOR

That stands for 'Do your own research'. In other words, don't just blindly trust anything you read online. Check for other sources, ask for second opinions. Be very careful and judicious with accepting news from one source.

Be especially suspicious of people contacting you in private, offering help about issues you posted about publicly. Virtually every time it happens, that's a scammer trying to convince you to expose your passphrase, private keys or otherwise compromise your tokens.

Also, don't rush into unknown projects that promise outsized returns. Any dapp you deposit your funds into has access to them. Google the project, see who is behind the project, check that it has traction in community. Check that the contracts are verified and audited. Look out for potential red flags.

### Fake tokens

Anyone can create a new token, and on Avalanche it is pretty cheap. Also, liquidity pool creation on DEXes is permissionless so anyone can create a new pair with a fake token that has the same name and token image as the real thing. To avoid that kind of scams, always select tokens from the official token lists on the DEXes, don't use links from other places.

## Explorers

Explorers are websites that index and present network activity, where you can look up individual transactions, and find out more about what's flowing through the network.

### Official explorer

[explorer.avax.network](https://explorer.avax.network/) is the official network explorer maintained by Ava Labs.

### AvaScan

[AvaScan](https://avascan.info/) is an independent explorer website, known for its slick presentation and comprehensive overview, especially interesting for [validators and delegators](https://avascan.info/staking/validators) as it shows lots of interesting information about individual network validators.

### VScout

[VScout](https://vscout.io/) is another alternative explorer for Avalanche. Among other things there you can see distribution of validators across the planet.

## Online support

We offer several ways of getting support. There's the official [Support site](https://support.avax.network/en/). There's the Twitter [tech support account](https://twitter.com/avaxtechsupport). There's the official [Telegram channel](https://t.me/avalancheavax). But the biggest and the best is our [Discord server](http://chat.avax.network/).

Expanding on [DYOR](#dyor) section above: When using any public support channel, be suspicious of anyone contacting you in private, via DMs, email or similar. They may pose as admins, moderators or team members. **Legitimate accounts will never contact you in DMs first!** Real admins and team members will always engage publicly first, and if needed request that you *contact them* in direct message.

Scammers monitor public channels for people looking for help and then contact them in private offering to help. 'Help' usually consists of requests to 'sync your wallet' or something similar giving you a link where you are supposed to enter the wallet passphrase to complete the process, which then proceeds to steal any funds that can be moved. They might also offer an app that will solve the problem, but ends up doing the same.

It bears repeating: do not give anyone your secret 24 word passphrase or your private keys!

## Conclusion

Avalanche is a young platform, but it offers many interesting and exciting opportunities to get engaged and participate in the new frontier that are cryptocurrencies. But the domain knowledge required to make informed and correct decisions may be overwhelming for newcomers to the space. We hope this document will easy your introduction and onboarding.

If you have any questions, or doubts, need something to be cleared up, or just want to chat, please join us on our [Discord server](http://chat.avax.network/), we'd love to hear from you.
