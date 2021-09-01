# How to mint your own ERC721 on Avalanche using Open Zeppelin

### This tutorial teaches you to deploy your own ERC721 token on Avalanche FUJI C-chain testnet.

### The steps to deploy on the mainnet are identical and the differences are mentioned in the tutorial.

## Contents
- [Getting images ready to be uploaded to decentralized storage.](#getting-images-ready-to-be-uploaded-to-decentralized-storage) (IPFS in this tutorial)
- [Getting metadata ready to be uploaded to decentralized storage.](#getting-metadata-ready-to-be-uploaded-to-decentralized-storage) (IPFS in this tutorial)
- [Writing code in Remix IDE](#writing-code-in-remix-ide)
- [Compiling and Deploying to Avalanche FUJI C-Chain Testnet.](#compiling-and-deploying-to-avalanche-fuji-c-chain-testnet-)
- [Check the NFT on the explorer.](#check-the-nft-on-the-explorer)

### <u>Getting images ready to be uploaded to decentralized storage.</u>

1. In order to create NFT we first need to have the image/video content hosted on a decentralized storage solution like IPFS. 

2. IPFS in itself won't be enough because if the host it IPFS and garbage collection takes place your assets will be gone and the NFT will not show your image/video.

3. For this we need a pinning service like Pinata.

4. So you can make an account on Pinata [here](https://app.pinata.cloud).

5. Now, let's get the images ready.

6. You might have seen on marketplaces like Opensea NFT's are in a collection like BAYC, CryptoPunks etc.

7. So do we store links to the metadata of every NFT in the collection? The answer is no.

8. Openzeppelin has come up with a smart way where you just need to store the prefix of the url where the metadata is stored and the tokenID is appended to it to return the url of the metadata for an individual NFT.

9. For example, if the baseURI is "https://mynft.com/" and if you want the metadata for tokenID 1 the contract simply returns ("https://mynft.com/1")

10. This way we don't need to store the url of the metadata for every tokenID.

11. To achieve this we need to rename our images/videos with respect to tokenID.

12. Make sure to have all the assets in a single folder if you plan to create a collection of NFT's.

13. Image / Video for tokenID 0 should be named 0 followed by the extension (jpg, png, tiff, gif, mp4, etc...) 
![image-naming](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/image-naming.png)

14. Here I have a single image named 0 to represent the image corresponding to the tokenID 0. You can name your assets similarly starting from 0 or 1 make sure that your contract also start the tokenID from 0 if you start naming from 0 otherwise 1 whichever is your case. In this tutorial, we will start from 0.

15. Let's upload these assets to pinata for pinning on IPFS.

16. In the pinata dashboard you should see an upload button. 
![pinata-upload-button](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/pinata-upload-button.png)

17. We are supposed to upload the entire folder the reason for that is we get the same baseURI and tokenID type URL if we upload the folder more about it below. <br>
![pinata-select-folder](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/pinata-select-folder.png)

18. Upload the folder by clicking the "Click to upload" button we don't want a custom name for the pin and we need not preserve the directory name so we can ignore those options for now.<br>
![pinata-upload-folder-button](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/pinata-upload-folder-button.png)

19. You can see the files that are about to upload since I have only one you can see it in the image below. Click the "Upload" button to start uploading.<br>
![pinata-folder-upload-button](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/pinata-folder-upload-button.png)

20. Once done you should see the folder in the files section as shown in the image below.
![pinata-folder-uploaded](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/pinata-folder-uploaded.png)

21. You can now click on the name of the folder to see its content on IPFS.
![ipfs-image-folder-content](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/ipfs-image-folder-content.png)

22. So now we have the baseURI for the assets to get any asset all we need to do is append the tokenID and extension to the baseURI.

This is the baseURI in my case.
https://gateway.pinata.cloud/ipfs/QmaHGo7pQ9x7B1rNvPbkzTnrZNuHA4mx53t8ZnAA8JFUG2

To get asset for tokenID 0 all I need to do is append "/" +  tokenID + extension (.gif in this case) 
https://gateway.pinata.cloud/ipfs/QmaHGo7pQ9x7B1rNvPbkzTnrZNuHA4mx53t8ZnAA8JFUG2/0.gif

### <u>Getting metadata ready to be uploaded to decentralized storage.</u>

1. Now we have the baseURI for assets now we need to prepare the metadata that the marketplaces parse in order to extract attributes and artwork from it.

2. Similar naming convention has to be followed for metadata also in case you plan to create an NFT collection.

3. The content of metadata files is expected to be in .json format. However, files need not have an extension.

4. So the metadata for tokenID 0 would be 0.json however when we upload to pinata we suppress the extension.

5. Create a separate folder to store all the metadata files.

6. Create a text file using a notepad, notepad++, or text editor of your choice.
![metadata-file-in-folder](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/metadata-file-in-folder.png)

7. This is the metadata format expected.
![metadata-format](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/metadata-format.png)

8. Let's go through every attribute one by one.
    - `name` - specify the name of the NFT.
    - `tokenId` - specify the tokenID of the NFT.
    - `image` - specify the URL where the assets for the NFT are hosted. This is the same URL I have given above. Make sure to include the complete URL including the tokenID and extension part.
    - `description` - specify some description about the entire NFT collection.
    - `attributes` - specify the attributes of the NFT. Notice the format to specify the attributes.

9. I have also attached the same metadata file in the repository in case you want to copy and edit it go for it.

10. You will need to create such a metadata file for every NFT in the collection. Usually, people write a script to generate metadata files.

11. Once you are done you should have a folder of metadata files ready to be uploaded to pinata.
![metadata-file-in-folder](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/metadata-file-in-folder.png)

12. Upload the folder of metadata to pinata.
![pinata-metadata-folder-uploaded](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/pinata-metadata-folder-uploaded.png)

13. You can click on the folder name and see the contents on IPFS.

### <u>Writing code in Remix IDE</u>

1. Let's now write the code for the ERC721 token.

2. In this tutorial we will use the [Remix IDE](https://remix.ethereum.org/) for deploying smart contracts as it is beginner-friendly.

3. This is how the Remix IDE interface looks like and we can see our project files on the left.
![remix-ide-interface](https://github.com/therealharpaljadeja/avalanche-tutorials/blob/master/how-to-mint-erc20-using-openzeppelin/assets/remix-ide-interface.png?raw=true)

4. Let's create a file under the "contracts" folder for our token.<br>
![create-file-remix](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc20-using-openzeppelin/assets/create-file-remix.png)

5. For this tutorial I named it "MyNFT.sol" make sure to have the .sol extension. As a good practice, you can name the file with the same name as the token.<br>
![remix-file-created](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/remix-file-created.png)

6. I have attached the code for the NFT in the same repository. 

7. Let's go through the code.
    - Inherits
        - `ERC721("MyNFT", "MN")` - replace "MyNFT" with the name you want the collection to have, replace "MN" with the symbol you want for the collection.
        - `Ownable` - ownable is used to have an access control mechanism. Ownable provides utility functions to getOwner, setOwner and renounceOwnership.
    - Variables
        - `tokenCounter` - It is used to keep track of the tokenId to mint.
        - `price` - specify the price you want the minter to pay (in Wei) (0.01 AVAX in this case).
        - `MAX_TOKENS` - specify the maximum number of NFT that can be minted from this collection. (100 in this case)
        - `baseURI` - the base URL for the metadata stored on Pinata. *(you will need to specify this)*
    - Functions
        - `mint` - the main mint function that is to be called in order to create an NFT. It consists of 2 require statements one to check if the max supply is exceeded and the second to check if the minter is paying the correct price.
        - `_baseURI` - we need to override the default openzeppelin _baseURI because the default one returns an empty string.
        - `withdraw` - this function can be called by the owner of the NFT collection to withdraw the funds deposited by the NFT minters. 🤑

### <u>Compiling and Deploying to Avalanche FUJI C-Chain Testnet. </u>

1. Let's now compile the code to check if there are any errors.

2. To compile the shortcut is Ctrl / Command + S or click the icon shown in the image below.
![remix-compile-button](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/remix-compile-button.png)

3. Make sure you have the correct compiler selected from the dropdown and click the "Compile" button.
![compile-nft](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/compile-nft.png)

4. Once compiled we can now deploy the contract to the Avalanche FUJI C-Chain testnet. *The steps to deploy on the mainnet are the same.*

5. Click the deploy button as shown in the image below.<br>
![remix-deploy-button](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/remix-deploy-button.png)

6. In the deploy section make sure you have "Injected web3" selected in the dropdown.
![deploy-section](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/deploy-section.png)

7. Make sure it shows the correct account that you want to use to deploy the NFT.

8. Make sure the correct contract is selected to be deployed.

9. Once ready you can hit the "Deploy" button.

10. You should get a "Confirm Transaction" prompt, hit the "Confirm" button.
![confirm-transaction-dialog](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/confirm-transaction-dialog.png)

11. You should get a metamask pop-up asking to confirm the transaction.<br>
![metamask-popup](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/metamask-popup.png)

12. Make sure you are on the correct network and hit the "Confirm" button.

13. You should be able to see the contract deployment under progress in your metamask.
![contract-deployment-in-progress](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/contract-deployment-in-progress.png)

14. Once the contract is deployed you should be able to see it under the "Deployed Contracts" section.
![deployed-contract](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/deployed-contract.png)

15. Nice! We now have deployed the contract however we don't own any NFT.

16. To own an NFT we need to mint it.

17. Expand the contract and see for the "mint" button.
<br>
![contract-mint-button](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/contract-mint-button.png)

18. You won't be able to mint unless to pay 0.01 AVAX in order to mint. 

19. For that, you will need to specify the amount to pay. Remix IDE doesn't let you specify decimals so we need to specify it in finney which is a lower unit than ether. 1 ether = 1000 finney. We need 0.01 ether so 10 finney.
<br>
![enter-amount](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/enter-amount.png)

20. Now try clicking the "mint" button.

21. "Confirm Transaction" dialog might appear confirm it.

22. Make sure you are on the correct network, the amount is correct, and hit the "Confirm" button.

23. Hooray! We have now minted an NFT to ourselves! 🎉

### Check the NFT on the explorer.

1. You can check the NFT on the explorer. My URL is below.

https://cchain.explorer.avax-test.network/tokens/0x10075f07b799f9ce7a585e95a2711766b1e248a2/instance/0/token-transfers

![nft-on-explorer](https://raw.githubusercontent.com/therealharpaljadeja/avalanche-tutorials/master/how-to-mint-erc721-using-openzeppelin/assets/nft-on-explorer.png)

2. The format is as follows.

*Testnet* - 
https://cchain.explorer.avax-test.network/tokens/{contract-address}/instance/{tokenId}/token-transfers

<br>

*Mainnet* - https://cchain.explorer.avax.network/tokens/{contract-address}/instance/{tokenId}/token-transfers



