---
description: ERC-20 tokens are the most fundamental and essential concept in Ethereum. This same token standard is adopted in the Avalanche ecosystem.
---

# Create an ERC-20 Token Using Solidity

ERC-20 tokens are the most fundamental and essential concept in Ethereum. As the Avalanche community and the ecosystem are growing, new use cases and projects that are running on Ethereum or different chains would be implemented to Avalanche. The token standard that would be used for the projects is not specific and everyone can create their own standard and own token.

Therefore, we will be creating our own mintable ERC-20 token and will mint it to any address we want. The token will be generated on Avalanche C-Chain and will be accessible on that chain.

The thing we have to mainly consider is that we will deploy a smart contract written with Solidity to Avalanche. This is the feature that Avalanche provides us- to be able to deploy any smart contract to the chain and no requirement for a new language specific contract concept to interact. Let’s look at how to create an ERC-20 contract and deploy it to avalanche C-Chain.

## Set up Metamask

The first thing we should set is a metamask wallet.

![Image for post](https://miro.medium.com/max/408/0*0HGM4O_J5iF3943S)

Click to metamask icon on the browser and select the network drop-down menu. Here we should connect to C-Chain. Click to "Custom RPC".

![Image for post](https://miro.medium.com/max/989/1*Y7O1bBeTWnuQBAqTnwmqUQ.png)

Now, we need to set these boxes with correct values.

- **Network Name**: Avalanche C-Chain
- **New RPC URL**:
  - **Mainnet:** [https://api.avax.network/ext/bc/C/rpc](https://api.avax.network/ext/bc/C/rpc)
  - **Fuji Testnet:** [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc)
  - **Local Testnet:** [http://localhost:9650/ext/bc/C/rpc](http://localhost:9650/ext/bc/C/rpc)
- **ChainID**:
  - **Mainnet:** `43114`
  - **Fuji Testnet:** `43113`
  - **Local Testnet:** `43112`
- **Symbol**: AVAX
- **Explorer**:
  - **Mainnet:** [https://snowtrace.io](https://snowtrace.io/)
  - **Fuji Testnet:** [https://testnet.snowtrace.io](https://testnet.snowtrace.io/)
  - **Localnet:** n/a

![Image for post](/img/erc20-metamask.png)

After setting up all the parameters correctly, we should see this page. For now, we have 0 AVAX.

## Fund Your C-Chain Address

Depending on the network used, there are three ways to get funds to your C-Chain address.

### **Using Avalanche Wallet**

On the main net, you can use the [Avalanche Wallet](https://wallet.avax.network/) to transfer funds from the X-Chain to your C-Chain address. The process is simple, as explained in this [tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet). Wallet can be used on test and local networks, too.

### **Using Test Network Faucet**

For funding on the test network, you can also use the Test Network Faucet. Navigate to [https://faucet.avax.network/](https://faucet.avax.network/) and paste your C-Chain address.

### Funding on Local Testnet

On a local network, you can easily fund your addresses by deploying your own faucet. [Tutorial](https://medium.com/avalabs/the-ava-platform-tools-pt-2-the-ava-faucet-48f28da57146)

Let’s go to [avax faucet](https://faucet.avax.network/) and paste our C-Chain address, for example "0xfe8886bec537252040Dff36448C0F104Be635650".

![Image for post](/img/erc20-faucet.png)

After copy and paste the address here, click request 20 AVAX. This test faucet token has no value, it is just for development purposes.

Then check your wallet balance and you should have some test token in your metamask.

## Create mintable token

Now, we can create our mintable token on Remix. Open Remix on your browser or go to [this link](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.6.6+commit.6c089d02.js).

![Image for post](https://miro.medium.com/max/1910/1*FWHtbWNXr6FvjzPHH93wvw.png)

You should view this page. On this page, first, click "SOLIDITY" from "Featured Plugins" and then click the "New File" button. When you click the New File button, you will see a pop-up that requires a file name. You can choose a name or leave the default.

Since we will use an ERC-20 contract from [OpenZeppelin](https://openzeppelin.com/contracts/), just paste this line to the file and save.

```javascript
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol"
```

![Image for post](https://miro.medium.com/max/1408/1*y1wpcCeB8PypnPfs-zhyBg.png)

After saving the file, we will see a bunch of files that are imported to remix. This is a remix feature that allows us to import a GitHub contract repository to remix by just giving the URL-Link. with an import statement.

![Image for post](https://miro.medium.com/max/1364/1*6pmdpKWiKj4RW-OcvMSijA.png)

We have ERC20PresetMinterPauser.sol file in the presets. This file is written by OpenZeppelin according to ERC20 standards with minter functionality. After deploying this file, we will be the owner of the contract and thus have the authority and ability to mint the tokens.

![Image for post](https://miro.medium.com/max/1398/1*5UcrRfoSwjpD29NyuMrrbA.png)

## Deploy the Contract

Open the second tab which is "SOLIDITY COMPILER" and select the solidity version that matches with the solidity version written in file as "pragma solidity …..". The version should be equal to or higher than the file’s version. For example, in my file, "pragma solidity ^0.6.0" is written so the required version is 0.6.0 or higher. As shown, in the compiler the solidity version is 0.6.6, which is ok. After checking the solidity version click the compile button. If you did not change anything in the file, or the solidity version is not wrong, the contract should compile without any errors.

![Image for post](https://miro.medium.com/max/1388/1*2jkDckFUJ4z3gMoLYZ_-PQ.png)

Then, let’s jump to the third tab which is DEPLOY & RUN TRANSACTION. Here before deploying our contract, we should change the environment. Click to the environment and select "Injected Web3". If a pop-up shows up and asks you to connect the account, click to connect. After, you should see the account address in the "ACCOUNT" textbox.

The last thing before the deployment process is to set the contract that will be deployed as a token. Above the Deploy Button, there is a drop-down menu to select a contract. Select the contract named "ERC20PresetMinterPauser.sol".

![Image for post](https://miro.medium.com/max/383/1*s9LtZu4hSuPcVwVZsweZJA.png)

Now, here enter the name and symbol of your token. I will name it "test" and the symbol will be "tst". You can give it a and click to transact button.

![Image for post](https://miro.medium.com/max/593/1*ZKDEv_h_Pqfd3b7PAosXQw.png)

After clicking the button, a pop-up will show up and just confirm it.

![Image for post](https://miro.medium.com/max/353/1*yOOQYZvESjSKx2qec5pYgA.png)

And then another pop-up, a metamask confirmation, appears. Confirm it.

After confirming all these pop-ups we have deployed our token to avalanche C-Chain. So we can start to interact with it.

## Interact with Token

We can see our transaction that deployed on avalanche C-Chain via this [c-chain explorer](https://testnet.snowtrace.io/).

But firstly, let’s see our transaction hash from the remix console.

![Image for post](https://miro.medium.com/max/1469/1*WTHSIfrDe9R_hk-C5GNq0g.png)

After deploying the contract, we should see a log in remix console. When you click to arrow and expand it, a transaction hash will come up. Copy it.

![Image for post](https://miro.medium.com/max/1909/1*NBXgtkYv2VfBkZx1OsBm7A.png)

Just paste the transaction hash to the [explorer](https://testnet.snowtrace.io/) I shared above and press enter.

![Image for post](https://miro.medium.com/max/1907/1*6GhQaa_UaDvtk3Kvimi3aA.png)

Here we can see all details about the transaction and token contract.

![Image for post](https://miro.medium.com/max/764/1*tTFQUn3fStbv-TW9kExyUg.png)

The first one is my wallet address that creates token and the second address is my token contract address which is named "test". Now, let’s mint some token to our own address.

![Image for post](https://miro.medium.com/max/607/1*K9eBNTQFkvUYjjmvegDZtQ.png)

Come back to the remix and after deploying, you should be able to see the contract in "Deployed Contracts" section.

Here, we have a bunch of functions that we can use to interact with our token contract. You can check all these methods from OpenZeppelin documentation to learn how to use them. But we will only use the mint method.

Click to arrow beside the mint method to read it.

![Image for post](https://miro.medium.com/max/577/1*GrxG6rsklrYN4xN1eF_ckw.png)

Enter your address and an amount in WEI. For example, I will mint 1000 tst token so, I entered "1000000000000000000000"

![Image for post](https://miro.medium.com/max/354/1*FM-PMUY7au61ejHJzBIsfg.png)

## Add Token to Metamask

Now we minted 1000 token to our contract, but you should not be able to see the tokens in your metamask wallet. In order to see our own token, we have to add it. On metamask, click to "Add Token" button and select "Custom Token" tab.

Here enter the token address that you can see from explorer as I showed above. Copy and paste it here. Then click on the Next button, you should see 1000 token that you named in your metamask wallet. Also, you can send it to another account via either remix or metamask.
