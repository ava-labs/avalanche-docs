# Avalanche Developer ERC721 Tutorial 

## Introduction

In this tutorial you will get familiar with ERC721 (NFT) smart contracts and how to deploy these to the Avalanche Fuji testnet and also the Avalanche mainnet (C-Chain). The goal of this tutorial is to be as beginner friendly as possible. I will go through each line of code in order to give you a full understanding of what is happening, so that you can use the concepts as a basis for your first NFT decentralized application. The plan is to showcase:

1. How to create an ERC721 smart contract, so that you can mint your own ERC721 NFT on Avalanche using Open Zeppelin and the Truffle framework;
2. How to extend the contract, so that each token has royalties;
3. How to create your own NFT marketplace where you can list your items, cancel listings and purchase other NFTs;
4. How to extensively test your smart contracts using Truffle's built in Mocha.js library and Open Zeppelin's Test Helper assertion library achieving 100% code coverage;
5. How to deploy your smart contracts on the Avalanche Fuji testnet and on the Avalanche mainnet;

## Development
For this tutorial I have used [Visual Studio Code](https://code.visualstudio.com/) as my code editor of choice but you can used any code editor you like. I recommend to install the **solidity** extension by Juan Blanco to get that nice Syntax highlighting along with some code snippets should you go for Visual Studio Code. You would also need to create a MetaMask wallet or whatever similar provider you are comfortable with in order to deploy to the networks.

### Dependencies
* [NodeJS v8.9.4 or later](https://nodejs.org/en/).
* Truffle, which you can install with npm install -g truffle
* (Optional) [Avash](https://github.com/ava-labs/avash) is a tool for running a local Avalanche network. It's similar to Truffle's [Ganache](https://www.trufflesuite.com/ganache).

### Setting up a Truffle project

1. Create a project directory and inside of it run the commands:
```powershell
truffle init -y
npm init -y
```

2. The first one will provide you with a base structure of a Truffle project and the second one will include a **package.json** file to keep track of the dependencies.
Afterwards, include the following dependencies which will help us build and test the smart contracts.
```powershell
npm install @openzeppelin/contracts @truffle/hdwallet-provider dotenv
npm install --save-dev @openzeppelin/test-helpers solidity-coverage
```
* The [@openzeppelin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) is a library for a secure smart contract development. We inherit from their ERC721 smart contract;
* The [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) is used to sign transactions for addresses derived from a 12 or 24 word mnemonic. In our case we will create a MetaMask wallet and provide the mnemonic from there to deploy to the Avalanche Fuji testnet;
* The [dotenv](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a .env file into process.env. We do not want to leak our mnemonic to other people after all;
* The [@openzeppelin/test-helpers](https://docs.openzeppelin.com/test-helpers/0.5/) is a library that will helps us test when transactions revert and also handle Big Numbers for us. It is a dev dependency;
* The [solidity-coverage](https://www.npmjs.com/package/solidity-coverage) is a library that we will use to check how much coverage our tests have. It is again a dev dependency;

3. Now that we have all the necessary dependencies installed, let us go to the **truffle-config.js** in the root of our project and paste the following lines of code in there:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
module.exports = {
  networks: {
    fuji: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: process.env.MNEMONIC,
          providerOrUrl: `https://avalanche--fuji--rpc.datahub.figment.io/apikey/${process.env.APIKEY}/ext/bc/C/rpc`,
          chainId: '43113'
        })
      },
      network_id: "*",
      gasPrice: 225000000000
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: process.env.MNEMONIC,
          providerOrUrl: `https://api.avax.network/ext/bc/C/rpc`,
          chainId: '43114',
        })
      },
      network_id: "*",
      gasPrice: 225000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.6"
    }
  },
  plugins: ["solidity-coverage"]
};
```

This file is the entrypoint of our Truffle project. As you can see, we specify two networks on which we would like to deploy our smart contracts after we are done with them, namely *fuji* and *mainnet*. We utilize the [@truffle/hdwallet-provider](https://www.npmjs.com/package/@truffle/hdwallet-provider) library, so that we provide a RPC to which we can connect to to deploy our contracts as well as a mnemonic which will be used to sign the transaction to do that. As you can see, some of the variables are accessed via process.env. These are defined in a separate **.env** file in the root of our project and have the following structure:
```
MNEMONIC='paste your metamask mnemonic here which is twelve words long believe me'
APIKEY=YOUR_DATAHUB_API_KEY_FOR_THE_FUJI_TESTNET
```
Note: For the Fuji testnet I used [DataHub](https://datahub.figment.io/services/avalanche)'s testnet RPC. There is a free plan which you can use. For that you would need to register, grab your APIKEY and paste it into your **.env** file. 

### Writing our first ERC721 contract

1. Inside the **contracts/** folder of your Truffle project create a new Collectible.sol file and paste in the following code:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Collectible is ERC721URIStorage {
    // Mapping to check if the metadata has been minted
    mapping(string => bool) public hasBeenMinted;

    // Mapping to keep track of the Item
    mapping(uint256 => Item) public tokenIdToItem;

    // A struct for the collectible item containing info about `owner`, `creator` and the `royalty`
    struct Item {
        address owner;
        address creator;
        uint256 royalty;
    }

    Item[] private items;

    /**
     * @dev Emitted when a `tokenId` has been bought for a `price` by a `buyer`
    */
    event ItemMinted(uint256 tokenId, address creator, string metadata, uint256 royalty);

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection inheriting from the ERC721 smart contract.
     */
    constructor() ERC721("NFTCollectible", "NFTC") {}

    /**
     * @dev create a collectible with a `metadata` for the msg.sender
     *
     * Requirements:
     * - `metadata` has not been minted before
     * - `royalty` must be between 0% and 40%
     *
     * Emits a {Transfer} event - comes from the ERC-721 smart contract.
     */
    function createCollectible(string memory metadata, uint256 royalty)
        public
        returns (uint256)
    {
        require(
            !hasBeenMinted[metadata],
            "This metadata has already been used to mint an NFT."
        );
        require(
            royalty >= 0 && royalty <= 40,
            "Royalties must be between 0% and 40%."
        );
        Item memory newItem = Item(msg.sender, msg.sender, royalty);
        items.push(newItem);
        uint256 newItemId = items.length;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);
        tokenIdToItem[newItemId] = newItem;
        hasBeenMinted[metadata] = true;
        emit ItemMinted(newItemId, msg.sender, metadata, royalty);
        return newItemId;
    }

    /**
     * @dev return the length of the items array
     */
    function getItemsLength() public view returns (uint256) {
        return items.length;
    }

    /**
     * @dev return an item associated to a provided `tokenId`
     */
    function getItem(uint256 tokenId) public view returns (address, address, uint256)
    {
        return (tokenIdToItem[tokenId].owner, tokenIdToItem[tokenId].creator, tokenIdToItem[tokenId].royalty);
    }
}
```

Now that we have this let us start from the top and explain what the smart contract does.

2. **Collectible.sol** logic

* At the top we define the solidity version. At the time of this tutorial this is the latest Solidity version:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
```

* Next we import the **ERC721URIStorage.sol** contract from Open Zeppelin. This contract is an extension of their **ERC721.sol** contract which takes metadata of an NFT into account as well. We will also use the popular **SafeMath.sol** library for our mathematical operations. This is a library which prevents unsigned integer overflows: 

```javascript
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
```

* Now that we have done that let us define our **Collectible** contract which will inherit from the **ERC721URIStorage**. This would allow us to use all the functions and access all the public state variables which that contract offers. Pretty cool, right? 
```javascript
contract Collectible is ERC721URIStorage {
```

* Afterwards we will define the state variables and also the constructor of our contract:

```javascript
    mapping(string => bool) public hasBeenMinted;
    mapping(uint256 => Item) public tokenIdToItem;
    struct Item {
        address owner;
        address creator;
        uint256 royalty;
    }
    Item[] private items;
    event ItemMinted(uint256 tokenId, address creator, string metadata, uint256 royalty);
    
    constructor() ERC721("NFTCollectible", "NFTC") {}
```

The main thing to note here is the **Item** struct. We need one to keep track of some extra on-chain data that our NFTs can have. In our case this is the **owner**, the **creator** and the **royalty** which would be a percentage of the price paid out to the **creator** on each purchase of the NFT. 
With each minting, a new **Item** will be pushed to the array of items. This array can be then used to display those properties on the frontend, for example.
We define an **ItemMinted** event due to our custom NFTs which we will emit at the end of our minting function. Last but not least, as you can see, we initialize the ERC721 constructor by providing it a name for our token contract and a symbol. These are the two parameters which it takes. Our constructor does not have any, hence the empty body.
The mappings are used to keep track of information such as whether a metadata hash has been minted, meaning that we prevent the minting of that metadata again and also to map the token id to an **Item**.

* The **createCollectible(string memory metadata, uint256 royalty)** function:

```javascript
function createCollectible(string memory metadata, uint256 royalty) public returns (uint256)
    {
        require(
            !hasBeenMinted[metadata],
            "This metadata has already been used to mint an NFT."
        );
        require(
            royalty >= 0 && royalty <= 40,
            "Royalties must be between 0% and 40%"
        );
        Item memory newItem = Item(msg.sender, msg.sender, royalty);
        items.push(newItem);
        uint256 newItemId = items.length;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);
        tokenIdToItem[newItemId] = newItem;
        hasBeenMinted[metadata] = true;
        emit ItemMinted(newItemId, msg.sender, metadata, royalty);
        return newItemId;
    }
```

The function takes two parameters - metadata and royalty. In the beginning of the function body we see a couple of guard conditions which are used to prevent unwanted transaction execution and to revert the transaction if the conditions are not fulfilled. We use the mapping which we have defined above to check whether the metadata has been minted. We also check whether the royalty is between 0% and 40%. Should we pass these conditions, we can now move on to creating our **Item** with the information we have. 
At this point the creator is both the owner and the creator, so we use **msg.sender** which is one of Solidity's global variables and denotes the caller of the function. Our third property is the royalty. After we push this **Item** to the array, we make use of the functions which the **ERC721URIStorage.sol** provides us, namely: 

```javascript
_safeMint(msg.sender, newItemId);
_setTokenURI(newItemId, metadata);
```

This will do the minting for us and associate the item id (token id) with the metadata which we have provided. At the end we update the mappings accordingly with the new information and return the token id.

* Furthermore, we define a couple of view functions. These do not cost any gas, since we do not change the state of the blockchain by calling them. In the second function you can notice that in the **returns** part we do not have **Item**, but rather the properties of the **Item**. Solidity allows returning multiple values.

```javascript
    function getItemsLength() public view returns (uint256) {
        return items.length;
    }
    
    function getItem(uint256 tokenId) public view returns (address, address, uint256)
    {
        return (tokenIdToItem[tokenId].owner, tokenIdToItem[tokenId].creator, tokenIdToItem[tokenId].royalty);
    }
}
```

### Creating our NFT Marketplace.sol contract

1. Inside the **contracts/** folder of your Truffle project create a new Marketplace.sol file and paste in the following code:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import './Collectible.sol';

contract Marketplace is Collectible {
    using SafeMath for uint256;

    struct Listing {
        uint256 price;
        address owner;
    }

    // Mapping for a token id to Listing
    mapping (uint256 => Listing) public tokenIdToListing;

    // Mapping to prevent the same item being listed twice
    mapping (uint256 => bool) public hasBeenListed;

    // Mapping used for listing when the owner transfers the token to the contract and would then wish to cancel the listing
    mapping (uint256 => address) public claimableByAccount;

    /**
     * @dev Emitted when a `tokenId` has been listed for a `price` by a `seller`
    */
    event ItemListed(uint256 tokenId, uint256 price, address seller);

    /**
     * @dev Emitted when a `tokenId` listing for a `price` has been cancelled by a `seller`
    */
    event ListingCancelled(uint256 tokenId, uint256 price, address seller);

    /**
     * @dev Emitted when a `tokenId` has been bought for a `price` by a `buyer`
    */
    event ItemBought(uint256 tokenId, uint256 price, address buyer);

    modifier onlyTokenOwner(uint256 tokenId) {
        require(
            msg.sender == ownerOf(tokenId),
            "Only the owner of the token id can call this function."
        );
        _;
    }

    modifier onlyListingAccount(uint256 tokenId) {
        require(
            msg.sender == claimableByAccount[tokenId],
            "Only the address that has listed the token can cancel the listing."
        );
        _;
    }

    /**
     * @dev list an item with a `tokenId` for a `price`
     *
     * Requirements:
     * - Only the owner of the `tokenId` can list the item
     * - The `tokenId` can only be listed once
     *
     * Emits a {Transfer} event - transfer the token to this smart contract.
     * Emits a {ItemListed} event
     */
    function listItem(uint256 tokenId, uint256 price) public onlyTokenOwner(tokenId) {
        require(!hasBeenListed[tokenId], "The token can only be listed once");
        //send the token to the smart contract
        _transfer(msg.sender, address(this), tokenId);
        claimableByAccount[tokenId] = msg.sender;
        tokenIdToListing[tokenId] = Listing(
            price,
            msg.sender
        );
        hasBeenListed[tokenId] = true;
        emit ItemListed(tokenId, price, msg.sender);
    }

    /**
     * @dev Cancel a listing of an item with a `tokenId`
     *
     * Requirements:
     * - Only the account that has listed the `tokenId` can delist it
     *
     * Emits a {Transfer} event - transfer the token from this smart contract to the owner.
     * Emits a {ListingCancelled} event.
     */
    function cancelListing(uint256 tokenId) public onlyListingAccount(tokenId) {
        //send the token from the smart contract back to the one who listed it
        _transfer(address(this), msg.sender, tokenId);
        uint256 price = tokenIdToListing[tokenId].price;
        delete claimableByAccount[tokenId];
        delete tokenIdToListing[tokenId];
        delete hasBeenListed[tokenId];
        emit ListingCancelled(tokenId, price, msg.sender);
    }

    /**
     * @dev Buy an item with a `tokenId` and pay the owner and the creator
     *
     * Requirements:
     * - `tokenId` has to be listed
     * - `price` needs to be the same as the value sent by the caller
     *
     * Emits a {Transfer} event - transfer the item from this smart contract to the buyer.
     * Emits an {ItemBought} event.
     */
    function buyItem(uint256 tokenId) public payable {
        require(hasBeenListed[tokenId], "The token needs to be listed in order to be bought.");
        require(tokenIdToListing[tokenId].price == msg.value, "You need to pay the correct price.");

        //split up the price between owner and creator
        uint256 royaltyForCreator = tokenIdToItem[tokenId].royalty.mul(msg.value).div(100);
        uint256 remainder = msg.value.sub(royaltyForCreator);
        //send to creator
        (bool isRoyaltySent, ) = tokenIdToItem[tokenId].creator.call{value: royaltyForCreator}("");
        require(isRoyaltySent, "Failed to send AVAX");
        //send to owner
        (bool isRemainderSent, ) = tokenIdToItem[tokenId].owner.call{value: remainder}("");
        require(isRemainderSent, "Failed to send AVAX");

        //transfer the token from the smart contract back to the buyer
        _transfer(address(this), msg.sender, tokenId);

        //Modify the owner property of the item to be the buyer
        Collectible.Item storage item = tokenIdToItem[tokenId];
        item.owner = msg.sender;

        //clean up
        delete tokenIdToListing[tokenId];
        delete claimableByAccount[tokenId];
        delete hasBeenListed[tokenId];
        emit ItemBought(tokenId, msg.value, msg.sender);
    }

    /**
     * @dev return a listing of a `tokenId`
     */
    function getListing(uint256 tokenId) public view returns (uint256, address)
    {
        return (tokenIdToListing[tokenId].price, tokenIdToListing[tokenId].owner);
    }

}
```

This might look slighly more complicated but once again, I will go through each line of code, so that at the end you can make sense of the logic entirely.

2. **Marketplace.sol** logic

* At the top we define as usual the solidity version:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
```
* Next we will import our already created **Collectible.sol** contract and inherit from it, since we would want to make use of some of the public state variables there: 

```javascript
import './Collectible.sol';

contract Marketplace is Collectible {
    using SafeMath for uint256;
```

Note: You might have noticed that we again use **SafeMath** for the uint256. This is to prevent the overflows that might happen.

* Afterwards we will define the state variables, events and modifiers:

```javascript
    struct Listing {
        uint256 price;
        address owner;
    }
    mapping (uint256 => Listing) public tokenIdToListing;
    mapping (uint256 => bool) public hasBeenListed;
    mapping (uint256 => address) public claimableByAccount;
    event ItemListed(uint256 tokenId, uint256 price, address seller);
    event ListingCancelled(uint256 tokenId, uint256 price, address seller);
    event ItemBought(uint256 tokenId, uint256 price, address buyer);

    modifier onlyTokenOwner(uint256 tokenId) {
        require(
            msg.sender == ownerOf(tokenId),
            "Only the owner of the token id can call this function."
        );
        _;
    }

    modifier onlyListingAccount(uint256 tokenId) {
        require(
            msg.sender == claimableByAccount[tokenId],
            "Only the address that has listed the token can cancel the listing."
        );
        _;
    }
```

You can see that again we have a struct for the **Listing** of a NFT. We use it to define who has listed a NFT and for what price. We have again some mappings to keep track of vital information such as to which token id a listing belongs to, whether the token id has been listed, as we do not want any double listings of the same NFT and also we have a mapping to keep track of the address that can claim the NFT after it has been listed. This is of course the owner of the item. We need this, because you will see in a bit that we transfer the NFT to the smart contract when listing it, thus making the smart contract the new owner. We have some events for the different functions, namely for listing, cancelling a listing and buying an item. The new concepts which you see here are the modifiers. These can be appended as function modifiers to the functions and act exactly the same as the require() statements. They are usually used to prevent writing the same conditions for different functions or restricting access only to specific addresses. In this case we have two modifiers. The first one is used to prevent other addresses from listing a token which they do not own, whereas the second one is used for allowing only the address that has listed the token to cancel the listing.

* The **listItem(uint256 tokenId, uint256 price)** function:
 
```javascript
function listItem(uint256 tokenId, uint256 price) public onlyTokenOwner(tokenId) 
    {
        require(!hasBeenListed[tokenId], "The token can only be listed once");
        _transfer(msg.sender, address(this), tokenId);
        claimableByAccount[tokenId] = msg.sender;
        tokenIdToListing[tokenId] = Listing(
            price,
            msg.sender
        );
        hasBeenListed[tokenId] = true;
        emit ItemListed(tokenId, price, msg.sender);
    }
```

The function takes two parameters, namely the token id and the price. We begin by defining the constraints which are that only the token owner can list the NFT and that this NFT has not been listed already. Then we proceed by using the *_transfer(msg.sender, address(this), tokenId)* function, which is provided by the **ERC721.sol** contract, and we transfer the token to the **Marketplace.sol** contract. Then we specify the **msg.sender** as the address that can cancel the listing and we update the mappings accordingly by creating a new Listing and by specifying that the token id has been listed. At the end, as usual, we emit an event.

* The **cancelListing(uint256 tokenId)** function:

```javascript
function cancelListing(uint256 tokenId) public onlyListingAccount(tokenId) 
    {
        _transfer(address(this), msg.sender, tokenId);
        uint256 price = tokenIdToListing[tokenId].price;
        delete claimableByAccount[tokenId];
        delete tokenIdToListing[tokenId];
        delete hasBeenListed[tokenId];
        emit ListingCancelled(tokenId, price, msg.sender);
    }
```

Here our constraint is that only the address that has listed the item can cancel the listing. Since the mapping claimableByAccount\[tokenId] is then cleared via the delete keyword we do not need to check that the item has been listed. Here we transfer the item from the Marketplace smart contract back to the one who listed it, clear the mappings and emit an event by providing it information about the token id, the price and who cancelled the listing.

* The **buyItem(uint256 tokenId)** function:

```javascript
function buyItem(uint256 tokenId) public payable {
        require(hasBeenListed[tokenId], "The token needs to be listed in order to be bought.");
        require(tokenIdToListing[tokenId].price == msg.value, "You need to pay the correct price.");

        //split up the price between owner and creator
        uint256 royaltyForCreator = tokenIdToItem[tokenId].royalty.mul(msg.value).div(100);
        uint256 remainder = msg.value.sub(royaltyForCreator);
        //send to creator
        (bool isRoyaltySent, ) = tokenIdToItem[tokenId].creator.call{value: royaltyForCreator}("");
        require(isRoyaltySent, "Failed to send AVAX");
        //send to owner
        (bool isRemainderSent, ) = tokenIdToItem[tokenId].owner.call{value: remainder}("");
        require(isRemainderSent, "Failed to send AVAX");

        //transfer the token from the smart contract back to the buyer
        _transfer(address(this), msg.sender, tokenId);

        //Modify the owner property of the item to be the buyer
        Item storage item = tokenIdToItem[tokenId];
        item.owner = msg.sender;

        //clean up
        delete tokenIdToListing[tokenId];
        delete claimableByAccount[tokenId];
        delete hasBeenListed[tokenId];
        emit ItemBought(tokenId, msg.value, msg.sender);
    }
```

Here the function takes the token id as a parameter and is a **payable** function, meaning that the user can send AVAX via it to the smart contract. We then first check whether the item has been listed and whether the **msg.value** which we send with our function call equals the price of the token. If that is the case we split up the **msg.value** based on the royalty that is defined in the **Item**. **msg.value** is another global variable in Solidity:

```javascript
uint256 royaltyForCreator = tokenIdToItem[tokenId].royalty.mul(msg.value).div(100);
uint256 remainder = msg.value.sub(royaltyForCreator);
```
In the first line we multiply the royalty by the msg.value and then divide it by 100, since we are talking about percentages. Meaning that if the buyer pays 10 AVAX for the NFT and the royalty is 20%, 2 AVAX would go to the creator and the remaining 8 AVAX would go to the seller. This happens in the next lines:

```javascript
(bool isRoyaltySent, ) = tokenIdToItem[tokenId].creator.call{value: royaltyForCreator}("");
require(isRoyaltySent, "Failed to send AVAX");
(bool isRemainderSent, ) = tokenIdToItem[tokenId].owner.call{value: remainder}("");
require(isRemainderSent, "Failed to send AVAX");
```

Afterwards we transfer the NFT from the Marketplace smart contract to the buyer and update the **Item** by modifying the **owner** property. Finally, as we did before, we clean up the mappings and emit an event passing the necessary information to it.

* At the end we define a view function which is used to obtain information about a certain listing. Again, calling this function costs no gas.

```javascript
    function getListing(uint256 tokenId) public view returns (uint256, address)
    {
        return (tokenIdToListing[tokenId].price, tokenIdToListing[tokenId].owner);
    }
}
```

### Testing our smart contracts

Now that we have finished writing our smart contracts it is very important that we test them thoroughly for erroneous behaviour. As we know, once deployed on the blockchain, they are immutable. We will be using [Mocha.js](https://mochajs.org/) for testing our contracts. It is integrated into the Truffle framework, so we do not need to install it. We do, however, need Open Zeppelin's Test Helpers, so we will import these in our tests. With that in mind, let us quickly jump into the **test/** directory of our project root and inside of it create two files, namely:

**collectible.test.js**

**marketplace.test.js**

I. Go inside the first one and copy the code below:

```javascript
const Collectible = artifacts.require('./Collectible')
const { expectRevert } = require('@openzeppelin/test-helpers')

contract('Collectible', ([contractDeployer, creator, buyer]) => {
    let collectible;

    before(async () => {
        collectible = await Collectible.new({ from: contractDeployer })
    });

    describe('Collectible deployment', async () => {
        it('Deploys the Collectible SC successfully.', async () => {
            console.log('Address is ', collectible.address)
            assert.notEqual(collectible.address, '', 'should not be empty');
            assert.notEqual(collectible.address, 0x0, 'should not be the 0x0 address');
            assert.notEqual(collectible.address, null, 'should not be null');
            assert.notEqual(collectible.address, undefined, 'should not be undefined');
        })

        it('The collectible SC should have a name and a symbol.', async () => {
            const name = await collectible.name()
            assert.equal(name, 'NFTCollectible', 'The name should be NFTCollectible.')
            const symbol = await collectible.symbol()
            assert.equal(symbol, 'NFTC', 'The symbol should be NFTC.')
        })
    })

    describe('Mint an NFT and set a royalty.', async () => {

        it('The hash \'metadata\' is not minted before the function call.', async () => {
            const hasBeenMinted = await collectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, false, 'The hash \'metadata\' has not been minted, so it should be false.')
        })

        it('The royalty needs to be a number between 0 and 40.', async () => {
            await expectRevert(collectible.createCollectible('metadata', 41), "Royalties must be between 0% and 40%.");
        })

        it('Give a new id to a newly created token', async () => {
            const newTokenId = await collectible.createCollectible.call('metadata', 20, { from: creator })
            assert.equal(parseInt(newTokenId.toString()), 1, 'The new token id should be 1.')
        })

        it('Mint a NFT and emit events.', async () => {
            const result = await collectible.createCollectible('metadata', 20, { from: creator })
            assert.equal(result.logs.length, 2, 'Should trigger two events.');
            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Transfer', 'Should be the \'Transfer\' event.');
            assert.equal(result.logs[0].args.from, 0x0, 'Should be the 0x0 address.');
            assert.equal(result.logs[0].args.to, creator, 'Should log the recipient which is the creator.');
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.');

            //event ItemMinted(uint256 tokenId, address creator, string metadata, uint256 royalty);
            assert.equal(result.logs[1].event, 'ItemMinted', 'Should be the \'ItemMinted\' event.');
            assert.equal(result.logs[1].args.tokenId, 1, 'Should be the token id 1.');
            assert.equal(result.logs[1].args.creator, creator, 'Should log the creator.');
            assert.equal(result.logs[1].args.metadata, 'metadata', 'Should log the metadata correctly.');
            assert.equal(result.logs[1].args.royalty, 20, 'Should log the royalty as 20.');
        })

        it('The items array has a length of 1.', async () => {
            const itemsLength = await collectible.getItemsLength()
            assert.equal(itemsLength, 1, 'The items array should have 1 entry in it.')
        })

        it('The new item has the correct data.', async () => {
            const item = await collectible.getItem(1)
            assert.notEqual(item['0'], buyer, 'The buyer should not be the creator.')
            assert.equal(item['0'], creator, 'The creator is the owner.')
            assert.equal(item['1'], creator, 'The creator is the creator.')
            assert.equal(item['2'], 20, 'The royalty is set to 20.')
        })

        it('Check if hash has been minted and that you cannot mint the same hash again.', async () => {
            const hasBeenMinted = await collectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, true, 'The hash \'metadata\' has been minted.')
            await expectRevert(collectible.createCollectible('metadata', 30, { from: creator }), 'This metadata has already been used to mint an NFT.');
        })

    })
});
```

I will not go through absolutely everything as most of the actions are repetitive, but will note down some key components.

1. First, we import our dependencies at the top and then we define the scope of our test:

```javascript
const Collectible = artifacts.require('./Collectible')
const { expectRevert } = require('@openzeppelin/test-helpers')

contract('Collectible', ([contractDeployer, creator, buyer]) => {
```

As you can see we import the **Collectible** contract and also an **expectRevert** function that will help us with checking whether the functions revert correctly upon false input. Afterwards, we define the scope of our test. Truffle uses the **contract()** function instead of Mocha's **describe()** function. The differences are minimal, so think of them as identical. If you are curious, check out the Truffle docs about the [explanation](https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript#use-contract-instead-of-describe-). The first parameter is the contract name, the second is simply a list of addresses. In this case Truffle's testing environment provides us with 10 accounts, each funded with 100 ETH. Yes, the Truffle's testing environment is based on Ethereum, but since the C-Chain is EVM compatible, think of them as 100 AVAX. Of course, these funds are not real ones and serve only for testing purposes.

2. Afterwards, we define a **before()** hook. This hook runs before our tests and we can use it to deploy the contract.

```javascript
let collectible;

before(async () => {
    collectible = await Collectible.new({ from: contractDeployer })
});
```
Note: We do not actually need **{from: contractDeployer}** as a parameter. If it is missing, Truffle would automatically take the first address into consideration for the function call. However, you will see that for minting an NFT we would use the **creator** address, so we would then need to specify this.
Each function of our contracts would be part of a **describe()** block. That way we can structure our tests efficiently, so that we can find our way easier.

3. In the first **describe()** block we test whether our contract was deployed correctly. For that we need to write individual tests or **it()**. 

```javascript 
describe('Collectible deployment', async () => {
        it('Deploys the Collectible SC successfully.', async () => {
            console.log('Address is ', collectible.address)
            assert.notEqual(collectible.address, '', 'should not be empty');
            assert.notEqual(collectible.address, 0x0, 'should not be the 0x0 address');
            assert.notEqual(collectible.address, null, 'should not be null');
            assert.notEqual(collectible.address, undefined, 'should not be undefined');
        })

        it('The collectible SC should have a name and a symbol.', async () => {
            const name = await collectible.name()
            assert.equal(name, 'NFTCollectible', 'The name should be NFTCollectible.')
            const symbol = await collectible.symbol()
            assert.equal(symbol, 'NFTC', 'The symbol should be NFTC.')
        })
})
```

As you can see an **it()** function takes as parameters a description of the test and an asynchronous function. In the first case, we check whether the collectible.address is not equal to those illegal values. In the second test we check whether our **Collectible.sol** has a name and a symbol. Since those variables are public in the **ERC721.sol** implementation we can call them as getters. The value is stored in a variable and then this variable is compared to the expected name. If you jump to the **Collectible.sol** file you can see the expected name in the **constructor()**.

3. In the second **describe()** block we test our **createCollectible()** function. For that we need to write individual tests for every statement that we make.

```javascript
 describe('Mint an NFT and set a royalty.', async () => {

        it('The hash \'metadata\' is not minted before the function call.', async () => {
            const hasBeenMinted = await collectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, false, 'The hash \'metadata\' has not been minted, so it should be false.')
        })

        it('The royalty needs to be a number between 0 and 40.', async () => {
            await expectRevert(collectible.createCollectible('metadata', 41), "Royalties must be between 0% and 40%.");
        })

        it('Give a new id to a newly created token', async () => {
            const newTokenId = await collectible.createCollectible.call('metadata', 20, { from: creator })
            assert.equal(parseInt(newTokenId.toString()), 1, 'The new token id should be 1.')
        })

        it('Mint a NFT and emit events.', async () => {
            const result = await collectible.createCollectible('metadata', 20, { from: creator })
            assert.equal(result.logs.length, 2, 'Should trigger two events.');
            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Transfer', 'Should be the \'Transfer\' event.');
            assert.equal(result.logs[0].args.from, 0x0, 'Should be the 0x0 address.');
            assert.equal(result.logs[0].args.to, creator, 'Should log the recipient which is the creator.');
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.');

            //event ItemMinted(uint256 tokenId, address creator, string metadata, uint256 royalty);
            assert.equal(result.logs[1].event, 'ItemMinted', 'Should be the \'ItemMinted\' event.');
            assert.equal(result.logs[1].args.tokenId, 1, 'Should be the token id 1.');
            assert.equal(result.logs[1].args.creator, creator, 'Should log the creator.');
            assert.equal(result.logs[1].args.metadata, 'metadata', 'Should log the metadata correctly.');
            assert.equal(result.logs[1].args.royalty, 20, 'Should log the royalty as 20.');
        })

        it('The items array has a length of 1.', async () => {
            const itemsLength = await collectible.getItemsLength()
            assert.equal(itemsLength, 1, 'The items array should have 1 entry in it.')
        })

        it('The new item has the correct data.', async () => {
            const item = await collectible.getItem(1)
            assert.notEqual(item['0'], buyer, 'The buyer should not be the creator.')
            assert.equal(item['0'], creator, 'The creator is the owner.')
            assert.equal(item['1'], creator, 'The creator is the creator.')
            assert.equal(item['2'], 20, 'The royalty is set to 20.')
        })

        it('Check if hash has been minted and that you cannot mint the same hash again.', async () => {
            const hasBeenMinted = await collectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, true, 'The hash \'metadata\' has been minted.')
            await expectRevert(collectible.createCollectible('metadata', 30, { from: creator }), 'This metadata has already been used to mint an NFT.');
        })
    })
```

* First we check that the *'metadata'* is not minted. For that we call the **hasBeenMinted('metadata')** function which is in fact our mapping in our **Collectible.sol** file. This returns us a boolean which is false. 
* Afterwards, we expect that the minting function reverts if we provide a royalty that is not between 0% and 40%. In that case we try with 41%.
* Then, before we complete the transaction we can check what the return value would be. As we know, our **createCollectible()** function returns a token id. We can grab this by executing the function without changing the state:

```javascript
it('Give a new id to a newly created token', async () => {
    const newTokenId = await collectible.createCollectible.call('metadata', 20, { from: creator })
    assert.equal(parseInt(newTokenId.toString()), 1, 'The new token id should be 1.')
})
```
Then we simply compare the newTokenId to 1 and expect them to be equal, since our first NFT should have the token id 1.

* Now we do not only exectute the **createCollectible()** function but also change the state in our next **it()**:

```javascript
it('Mint a NFT and emit events.', async () => {
            const result = await collectible.createCollectible('metadata', 20, { from: creator })
            assert.equal(result.logs.length, 2, 'Should trigger two events.');
            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Transfer', 'Should be the \'Transfer\' event.');
            assert.equal(result.logs[0].args.from, 0x0, 'Should be the 0x0 address.');
            assert.equal(result.logs[0].args.to, creator, 'Should log the recipient which is the creator.');
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.');

            //event ItemMinted(uint256 tokenId, address creator, string metadata, uint256 royalty);
            assert.equal(result.logs[1].event, 'ItemMinted', 'Should be the \'ItemMinted\' event.');
            assert.equal(result.logs[1].args.tokenId, 1, 'Should be the token id 1.');
            assert.equal(result.logs[1].args.creator, creator, 'Should log the creator.');
            assert.equal(result.logs[1].args.metadata, 'metadata', 'Should log the metadata correctly.');
            assert.equal(result.logs[1].args.royalty, 20, 'Should log the royalty as 20.');
        })
```

Our variable which is the result of the function call is no longer the token id, but a transaction receipt, meaning that we obtain much more information out of it. Cool, right? Let us put this information to use. We test whether the correct events are emitted since they are the signal that we need. In this case we have two. One is the *Transfer* event which comes from the **\_safeMint(msg.sender, newItemId)** function of the **ERC721.sol** smart contract. The other one is our own *ItemMinted* event. We check for the correct name and the correct arguments. 

* In the remaining **it()**-s we check whether the mappings were updated accordingly and whether our **Item** has the correct values. Our final **it()** makes sure that the transaction reverts if we call the **createCollectible()** function with the same metadata parameter value.

4. Now that we are done writing the test, in our console we simply run the command:

```powershell
truffle test
```

Note: You might notice that this would run the command *truffle compile* beforehand. This would create a **build/contracts** folder in our root directory where the .json representations of all of our used contracts are stored. These are in fact used when you call functions on the frontend.

II. Go inside the **marketplace.test.js** file and copy the code below:

```javascript
const Marketplace = artifacts.require('./Marketplace')
const { expectRevert, BN } = require('@openzeppelin/test-helpers')
const { convertTokensToWei } = require('../utils/tokens')
const { toBN } = web3.utils;

contract('Marketplace', ([contractDeployer, creator, buyer, secondBuyer]) => {
    let marketplace;

    before(async () => {
        marketplace = await Marketplace.new({ from: contractDeployer })
        await marketplace.createCollectible('metadata', 20, { from: creator })
    });

    describe('marketplace deployment', async () => {
        it('Deploys the Marketplace SC successfully.', async () => {
            console.log('Address is ', marketplace.address)
            assert.notEqual(marketplace.address, '', 'Should not be empty');
            assert.notEqual(marketplace.address, 0x0, 'Should not be the 0x0 address');
            assert.notEqual(marketplace.address, null, 'Should not be null');
            assert.notEqual(marketplace.address, undefined, 'Should not be undefined');
        })
    })

    describe('List a NFT.', async () => {
        it('The token id 0 has not been listed.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, false, 'The NFT with token id 1 has not been listed yet.')
        })

        it('The NFT with token id 1 cannot be listed by anyone who doesn\'t own it.', async () => {
            await expectRevert(marketplace.listItem(1, convertTokensToWei('5'), { from: contractDeployer }), 'Only the owner of the token id can call this function.');
            await expectRevert(marketplace.listItem(1, convertTokensToWei('5'), { from: buyer }), 'Only the owner of the token id can call this function.');
        })

        it('Transfer the NFT to the Marketplace SC.', async () => {
            const result = await marketplace.listItem(1, convertTokensToWei('5'), { from: creator })
            assert.equal(result.logs.length, 3, 'Should trigger three events.');

            //event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Approval', 'Should be the \'Approval\' event.');
            assert.equal(result.logs[0].args.owner, creator, 'Should be the creator address.');
            assert.equal(result.logs[0].args.approved, 0x0, 'Should log the address(0) to approve in order to clear previous approvals.');
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.');

            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[1].event, 'Transfer', 'Should be the \'Transfer\' event.');
            assert.equal(result.logs[1].args.from, creator, 'Should be the creator address.');
            assert.equal(result.logs[1].args.to, marketplace.address, 'Should log the recipient which is the marketplace.');
            assert.equal(result.logs[1].args.tokenId, 1, 'Should log the token id which is 1.');

            //event event ItemListed(uint256 tokenId, uint256 price, address seller);
            assert.equal(result.logs[2].event, 'ItemListed', 'Should be the \'ItemListed\' event.');
            assert.equal(result.logs[2].args.tokenId, 1, 'Should be the token id 1.');
            assert.equal(result.logs[2].args.price, convertTokensToWei('5'), 'Should log the price which is 5 AVAX.');
            assert.equal(result.logs[2].args.seller, creator, 'Should log the creator as the seller.');
        })

        it('The listing has the correct data.', async () => {
            const listing = await marketplace.getListing(1)
            assert.equal(listing['0'], convertTokensToWei('5'), 'The price is 5 AVAX.')
            assert.equal(listing['1'], creator, 'The one who listed it is the creator.')
        })  

        it('The Marketplace SC is now the owner of the NFT and not the seller.', async () => {
            const ownerOfNFT = await marketplace.ownerOf(1)
            assert.equal(ownerOfNFT, marketplace.address, 'The owner should be the marketplace.');
            assert.notEqual(ownerOfNFT, creator, 'The owner should not be the creator.');
        })
        
        //Actually this can be skipped, as the owner is technically the smart contract at this point
        it('The NFT with token id 1 cannot be listed again.', async () => {
            await expectRevert.unspecified(marketplace.listItem(1, convertTokensToWei('5'), { from: creator }));
        })

        it('The token id 1 can be claimed back by the creator if not sold.', async () => {
            const claimableBySeller = await marketplace.claimableByAccount(1)
            assert.equal(claimableBySeller, creator, 'The NFT with token id 1 can be claimed by the creator if not sold.')
        })

        it('The token id 1 has been listed.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, true, 'The NFT with token id 1 has been listed.')
        })

    })

    describe('Cancel the listing.', async () => {
        it('The listing cannot be cancelled by an address that does not have the right to claim it.', async () => {
            await expectRevert(marketplace.cancelListing(1, { from: contractDeployer }), 'Only the address that has listed the token can cancel the listing.');
            await expectRevert(marketplace.cancelListing(1, { from: buyer }), 'Only the address that has listed the token can cancel the listing.');
        })

        it('Transfer the NFT back to the owner.', async () => {
            const result = await marketplace.cancelListing(1, { from: creator })
            assert.equal(result.logs.length, 3, 'Should trigger three events.');

            //event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Approval', 'Should be the \'Approval\' event.');
            assert.equal(result.logs[0].args.owner, marketplace.address, 'Should be the marketplace address.');
            assert.equal(result.logs[0].args.approved, 0x0, 'Should log the address(0) to approve in order to clear previous approvals.');
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.');

            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[1].event, 'Transfer', 'Should be the \'Transfer\' event.');
            assert.equal(result.logs[1].args.from, marketplace.address, 'Should be the marketplace address.');
            assert.equal(result.logs[1].args.to, creator, 'Should log the recipient that is the creator.');
            assert.equal(result.logs[1].args.tokenId, 1, 'Should log the token id which is 1.');

            //event event ListingCancelled(uint256 tokenId, uint256 price, address seller);
            assert.equal(result.logs[2].event, 'ListingCancelled', 'Should be the \'ListingCancelled\' event.');
            assert.equal(result.logs[2].args.tokenId, 1, 'Should be the token id 1.');
            assert.equal(result.logs[2].args.price, convertTokensToWei('5'), 'Should log the price which is 5 AVAX.');
            assert.equal(result.logs[2].args.seller, creator, 'Should log the creator as the one who cancels the listing.');
        })

        it('The seller is now the owner of the NFT and not the Marketplace SC.', async () => {
            const ownerOfNFT = await marketplace.ownerOf(1)
            assert.equal(ownerOfNFT, creator, 'The owner should be the creator.');
            assert.notEqual(ownerOfNFT, marketplace.address, 'The owner should not be the marketplace.');
        })

        it('The claimableByAccount mapping should be cleared.', async () => {
            const claimableBySeller = await marketplace.claimableByAccount(1)
            assert.equal(claimableBySeller, 0x0, 'The NFT with token id 1 cannot be claimed by anyone after its no longer listed.')
        })

        it('The listing should not exist anymore.', async () => {
            const listing = await marketplace.getListing(1)
            assert.equal(listing['0'], 0, 'The price is reset to 0.')
            assert.equal(listing['1'], 0x0, 'The address(0) should be the one which owns the listing.')
        })

        it('The token id 1 is not listed anymore.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, false, 'The NFT with token id 1 is not listed anymore.')
        })

    })

    describe('Buy a NFT.', async () => {
        //Make sure to list the item again
        before(async () => {
            await marketplace.listItem(1, convertTokensToWei('5'), { from: creator })
        });

        it('You cannot buy an item that is not listed or does not exist.', async () => {
            await expectRevert(marketplace.buyItem(2, { from: buyer }), 'The token needs to be listed in order to be bought.');
        })

        it('You need to pay the correct price of 5 AVAX.', async () => {
            await expectRevert(marketplace.buyItem(1, { from: buyer, value: convertTokensToWei('4') }), 'You need to pay the correct price.');
        })

        //Define the balances to check later whether they've increased or decreased by the correct amount
        let balanceOfCreatorBeforePurchase;

        it('Buy the NFT.', async () => {
            balanceOfCreatorBeforePurchase = await web3.eth.getBalance(creator)
            const result = await marketplace.buyItem(1, { from: buyer, value: convertTokensToWei('5') })
            assert.equal(result.logs.length, 3, 'Should trigger three events.');

            //event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
            assert.equal(result.logs[0].event, 'Approval', 'Should be the \'Approval\' event.');
            assert.equal(result.logs[0].args.owner, marketplace.address, 'Should be the marketplace address.');
            assert.equal(result.logs[0].args.approved, 0x0, 'Should log the address(0) to approve in order to clear previous approvals.');
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.');

            //event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
            assert.equal(result.logs[1].event, 'Transfer', 'Should be the \'Transfer\' event.');
            assert.equal(result.logs[1].args.from, marketplace.address, 'Should be the marketplace address.');
            assert.equal(result.logs[1].args.to, buyer, 'Should log the recipient that is the buyer.');
            assert.equal(result.logs[1].args.tokenId, 1, 'Should log the token id which is 1.');

            //event event ItemBought(uint256 tokenId, uint256 price, address seller);
            assert.equal(result.logs[2].event, 'ItemBought', 'Should be the \'ItemBought\' event.');
            assert.equal(result.logs[2].args.tokenId, 1, 'Should be the token id 1.');
            assert.equal(result.logs[2].args.price, convertTokensToWei('5'), 'Should log the price which is 5 AVAX.');
            assert.equal(result.logs[2].args.buyer, buyer, 'Should log the buyer address as the buyer.');
        })

        it('The buyer is now the owner of the NFT and not the Marketplace SC.', async () => {
            const ownerOfNFT = await marketplace.ownerOf(1)
            assert.equal(ownerOfNFT, buyer, 'The owner should be the buyer.');
            assert.notEqual(ownerOfNFT, marketplace.address, 'The owner should not be the marketplace.');
        })

        it('The claimableByAccount mapping should be cleared.', async () => {
            const claimableBySeller = await marketplace.claimableByAccount(1)
            assert.equal(claimableBySeller, 0x0, 'The NFT with token id 1 cannot be claimed by anyone after its no longer listed.')
        })

        it('The listing should not exist anymore.', async () => {
            const listing = await marketplace.getListing(1)
            assert.equal(listing['0'], 0, 'The price is reset to 0.')
            assert.equal(listing['1'], 0x0, 'The address(0) should be the one which owns the listing.')
        })

        it('The token id 1 is not listed anymore.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, false, 'The NFT with token id 1 should not be listed anymore.')
        })

        it('The item has the correct data.', async () => {
            const item = await marketplace.getItem(1)
            assert.notEqual(item['0'], creator, 'The owner should not be the creator.')
            assert.equal(item['0'], buyer, 'The buyer is the owner now.')
            assert.equal(item['1'], creator, 'The creator remains the creator address.')
            assert.equal(item['2'], 20, 'The royalty is set to 20.')
        })

        it('The balances of creator and first buyer are correct.', async () => {
            const balanceOfCreatorAfterPurchase = await web3.eth.getBalance(creator)
            assert.equal(balanceOfCreatorAfterPurchase, toBN(balanceOfCreatorBeforePurchase).add(toBN(convertTokensToWei('5'))), 'The balance of the creator should be increased by 5 AVAX after the purchase.')
        })

        it('The balances of creator, first buyer who is now the seller and second buyer are correct.', async () => {
            //List the item again, only this time by the new owner
            await marketplace.listItem(1, convertTokensToWei('10'), { from: buyer })
            const balanceOfBuyerBeforePurchase = await web3.eth.getBalance(buyer)
            const balanceOfCreatorBeforePurchase = await web3.eth.getBalance(creator)
            await marketplace.buyItem(1, { from: secondBuyer, value: convertTokensToWei('10') })
            const balanceOfBuyerAfterPurchase = await web3.eth.getBalance(buyer)
            const balanceOfCreatorAfterPurchase = await web3.eth.getBalance(creator)
            assert.equal(balanceOfBuyerAfterPurchase, toBN(balanceOfBuyerBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('80')).div(new BN('100'))), 'The balance of the seller should increase by 80% of the sold amount.')
            assert.equal(balanceOfCreatorAfterPurchase, toBN(balanceOfCreatorBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('20')).div(new BN('100'))), 'The balance of the creator should increase by 20% of the sold amount.')
        })
    })
});
```

Most of the concepts such as testing deployment, function reverts and emitted events are repeated here, so I will only go through the differences:

1. As you can see at the top we are importing the **Marketplace** contract as well as some helping functions:

```javascript
const Marketplace = artifacts.require('./Marketplace')
const { expectRevert, BN } = require('@openzeppelin/test-helpers')
const { convertTokensToWei } = require('../utils/tokens')
const { toBN } = web3.utils;
```

We use the **toBN()** function to convert the balances of the addresses, which are returned as strings, to Big Numbers, so that we can perform an adding. We also import a function **convertTokenToWei** from a **utils/** folder of our project's root which we do not have yet, so let us create it and inside of it create a **tokens.js** file.
Then copy the code below in there:

```javascript
const convertTokensToWei = (n) => {
    return web3.utils.toWei(n, 'ether');
}
module.exports = { convertTokensToWei }
```

We use this function, so that we do not have to write 18 zeroes after the AVAX amount that a buyer would pay for a NFT. In reality, transfering 5 AVAX means that we transfer 5000000000000000000 as a value. In order to not have to write all those zeroes, we can simply call convertTokensToWei('5') and the function will add the zeroes for us.
Now, back to our **marketplace.test.js** test script. 

2. We create a **before()** hook. There we deploy the marketplace contract and we also mint a NFT. Notice again that our **Marketplace.sol** has all the functions which **Collectible.sol** has, hence we can call the **createCollectible()** function: 

```javascript
before(async () => {
        marketplace = await Marketplace.new({ from: contractDeployer })
        await marketplace.createCollectible('metadata', 20, { from: creator })
});
```
In this case the creator address is the one who calls the function and therefore is the owner of the first NFT.

4. Afterwards, we simply test every statement which we make inside the function just like we did for the **collectible.test.js**.
5. We do the same for the **cancelListing()** function.
6. For the **buyItem()** function things are not that different. The interesting part is the final **it()** where we check the balances of the seller, buyer and creator after the second sale, since for the first one the seller is equal to the creator:

```javascript
it('The balances of creator, first buyer who is now the seller and second buyer are correct.', async () => {
            //List the item again, only this time by the new owner
            await marketplace.listItem(1, convertTokensToWei('10'), { from: buyer })
            const balanceOfBuyerBeforePurchase = await web3.eth.getBalance(buyer)
            const balanceOfCreatorBeforePurchase = await web3.eth.getBalance(creator)
            const balanceOfSecondBuyerBeforePurchase = await web3.eth.getBalance(secondBuyer)
            await marketplace.buyItem(1, { from: secondBuyer, value: convertTokensToWei('10') })
            const balanceOfSecondBuyerAfterPurchase = await web3.eth.getBalance(secondBuyer)
            const isCorrectSecondBuyerBalanceDifference = toBN(balanceOfSecondBuyerAfterPurchase).add(toBN(convertTokensToWei('10'))).lt(toBN(balanceOfSecondBuyerBeforePurchase))
            assert.equal(isCorrectSecondBuyerBalanceDifference, true, 'The balance of the second buyer should decrease by 10 AVAX plus gas paid.')
            const balanceOfBuyerAfterPurchase = await web3.eth.getBalance(buyer)
            const balanceOfCreatorAfterPurchase = await web3.eth.getBalance(creator)
            assert.equal(balanceOfBuyerAfterPurchase, toBN(balanceOfBuyerBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('80')).div(new BN('100'))), 'The balance of the seller should increase by 80% of the sold amount.')
            assert.equal(balanceOfCreatorAfterPurchase, toBN(balanceOfCreatorBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('20')).div(new BN('100'))), 'The balance of the creator should increase by 20% of the sold amount.')
        })
```

What we do here is that the new owner lists the item for 10 AVAX. He is denoted by the **buyer** address, since he has previously bought the NFT from the creator. A **secondBuyer** purchases the item, so we check whether the **secondBuyer** has at least 10 AVAX less, because we need to take into account the gas paid:

```javascript
const balanceOfSecondBuyerBeforePurchase = await web3.eth.getBalance(secondBuyer)
            await marketplace.buyItem(1, { from: secondBuyer, value: convertTokensToWei('10') })
            const balanceOfSecondBuyerAfterPurchase = await web3.eth.getBalance(secondBuyer)
            const isCorrectSecondBuyerBalanceDifference = toBN(balanceOfSecondBuyerAfterPurchase).add(toBN(convertTokensToWei('10'))).lt(toBN(balanceOfSecondBuyerBeforePurchase))
            assert.equal(isCorrectSecondBuyerBalanceDifference, true, 'The balance of the second buyer should decrease by 10 AVAX plus gas paid.')
```

For the **creator** we also check their balance before and after the purchase and that it needs to be larger by 20% of the purchase amount. The seller which is in this case the **buyer** address should get 80% of the price:

```javascript
const balanceOfBuyerAfterPurchase = await web3.eth.getBalance(buyer)
const balanceOfCreatorAfterPurchase = await web3.eth.getBalance(creator)
assert.equal(balanceOfBuyerAfterPurchase, toBN(balanceOfBuyerBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('80')).div(new BN('100'))), 'The balance of the seller should increase by 80% of the sold amount.')
assert.equal(balanceOfCreatorAfterPurchase, toBN(balanceOfCreatorBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('20')).div(new BN('100'))), 'The balance of the creator should increase by 20% of the sold amount.')
```

4. Now that we are done writing the test, in our console we simply run the command:

```powershell
truffle test
```

5. To check the test coverage we can run the command:

```powershell
truffle run coverage
```

### Deploying our smart contracts

1. Now that our contracts have passed the tests, let us have a look at the **migrations/** folder which Truffle provided us in the beginning. Inside of it we have the **1_initial_migration.js** script which is used to deploy the **Migrations.sol** contract that is available in the **contracts/** folder. This contract simply keeps track of the migrations that we do. In order to migrate our own contracts, we create another script called **2_deploy_contracts.js** and inside of it paste the following lines of code:

```javascript
const Collectible = artifacts.require('Collectible')
const Marketplace = artifacts.require('Marketplace')

module.exports = async (deployer, network, [owner]) => {
    await deployer.deploy(Collectible)
    await deployer.deploy(Marketplace)
}
```
As you can see, it is pretty straightforward. We import the contracts and deploy them via the deployer parameter. This is taken care by Truffle.

2.1. In order to deploy our contracts to the Fuji testnet, all we need to do is simply run the command:

```powershell
truffle migrate --network fuji
```

2.2. And should we want to deploy to the Avalanche mainnet, we simply run:

```powershell
truffle migrate --network mainnet
```

## Conclusion

To sum up, in this tutorial we got familiar with the following concepts:

1. We managed to create our very own ERC721 smart contract based on the Open Zeppelin implementation utilizing the Truffle framework;
2. We extended this contract by including royalties;
3. We created a marketplace where one could list their NFTs, cancel their listings or buy other NFTs;
4. We learned how to test our smart contracts extensively using the integrated Mocha.js library in Truffle;
5. We deployed our final contracts to the Fuji testnet;

Last but not least, should you try to extend the smart contracts, here are some potential ideas:

* For the **Collectible.sol** you could add more special properties for your NFTs should you want to use gamification;
* For the **Marketplace.sol** you could implement the option to bid on an item;
* Include an expiration date for a listing on the marketplace;

Or literally anything else that comes to your mind. The opportunities are limitless :)
