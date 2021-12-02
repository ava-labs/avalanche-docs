# Create NFTs with the Avalanche Wallet

## Non-Fungible Tokens on Avalanche

[Avalanche](../platform/README.md) natively supports the creation of of digital assets including fixed-cap assets, variable-cap assets, and non-fungible tokens \(NFTs\).

Some assets are fungible, meaning all units of that asset are perfectly interchangeable. Notes of a currency are fungible, for example: one $5 note is the treated the same as any other $5 note. Some assets, by contrast, are non-fungible. That is, elements are not unique and perfectly interchangeable. Real estate is non-fungible because each piece of land is distinct.

Non-fungible tokens are a useful way of representing proof of ownership of a unique asset.

## NFT Studio on Avalanche Wallet

The **NFT Studio** in the [Avalanche Wallet](https://wallet.avax.network/) can be used to create NFTs. In this tutorial we'll create a **Collectible** asset: a generic NFTs with a picture and a description, or with a custom payload. You can create them using a simple point and click interface, and no technical knowledge required.

To access the **NFT Studio**, log into the Avalanche Wallet. On the left side, select **Studio**:

![NFT Studio](/img/nft-studio-01-select.png)

This opens NFT Studio. There you have two options: **New Family**, for the creation of a new family of NFTs, and **Mint Collectible** for creating new assets in existing families. We need to create our first family of NFTs, so click **New Family**.

### Create NFT Family

There you will be asked to enter the name of your collectible family, as well as a symbol \(ticker\). Names do not have to be unique.

![Create new family](/img/nft-studio-02-family.png)

You will also need to enter a value for **Number of Groups**, which specifies how many distinct collectibles the newly created family holds. Choose carefully, because once created, the parameters of the collectible family cannot be changed.

When you're done, press **Create** to create the collectible family. The transaction fee will be deducted from your wallet's balance. When the family is created, you will see the transaction ID \(TxID\), as well as parameters for the family. You can use the TxID to look up the transaction in [the explorer](https://explorer.avax.network/), but it is not necessary to write it down.

Press **Back to Studio** to return, and we're ready to create our first collectibles. Press **Mint Collectible**.

### Mint NFTs

After pressing **Mint Collectible** you will be presented with a list of all the Collectible families that still have Collectible groups that have not been created yet.

![Select a family](/img/nft-studio-03-select-family.png)

Select the family you created earlier. You'll be prompted to fill a form with the parameters of the new collectible.

![Mint a Collectible](/img/nft-studio-04-mint.png)

By default, a **Generic** type of collectible will be selected. That is an NFT that has a **Title**, a **URL** for the image, and a **Description**. Enter the required data, as well as the **Quantity**, which will determine how many copies of the collectible are created. As before, enter the data carefully: you won't be able to change anything once the tokens are minted. You'll see a preview of the data where you can check what your collectible will look like.

If you would like to have something else besides a picture collectible, select **Custom**.

![Custom Collectible](/img/nft-studio-05-custom.png)

A custom collectible can contain an **UTF-8** encoded string, a **URL**, or a **JSON** payload. The size of the data cannot exceed 1024 bytes.

When you're done, press **Mint** to create the collectible. The transaction fee will be deducted from your wallet, and a newly created collectible will be placed in your wallet.

### See your collectibles

An overview of your collectibles is always visible in the top of the screen, along with your balances.

![Overview](/img/nft-studio-06-overview.png)

To see your collectibles in more detail, select **Portfolio** from the left-hand side menu. You will be presented with a screen showing all of your assets, with tokens selected by default. Change the selection to **Collectibles** by clicking the corresponding tab.

![Collectibles list](/img/nft-studio-07-collectibles.png)

For each Generic collectible, a picture will be shown, along with the title, and the number indicating how many copies of the collectible are in your portfolio. Hovering over the collectible with your pointer will show the detailed description:

![Collectible details](/img/nft-studio-08-detail.png)

If you select a collectible by clicking on it, you will see which group it belongs to, its quantity, along with the **Send** button.

## Send NFTs

To send your collectible to someone, either click the **Send** button on the selected collectible in the Portfolio, or navigate to **Send** tab on the left-hand side menu, and click **Add Collectible**:

![Choosing the collectibles](/img/nft-studio-09-send.png)

You will be presented with a menu to select a collectible you wish to send.

![Multiple collectibles](/img/nft-studio-10-multiple.png)

You can send multiple collectibles in a single transaction. Clicking the label on the collectible will let you edit the number of copies you wish to send. You can send multiple families and collectible types in a single transaction.

When you have entered the destination address, press **Confirm** to initiate the transaction.

![Transaction](/img/nft-studio-11-send-transaction.png)

After pressing **Send Transaction** it will be published on the network, and the transaction fee will be deducted from your balance. Collectibles will be deposited into the destination address shortly after.

## Summary

Now you can create NFT families, mint NFT groups, and send NFTs. Have fun! Make sure to share your creations with us on our [social media channels](https://www.avalabs.org/social)!

If you would like to know the technical background of how NFTs work on the Avalanche network or would like to build products using NFTs, please check out this [NFT tutorial](creating-a-nft-part-1.md). If you have technical questions, reach out to us on our [Discord](https://chat.avalabs.org/) server.

