# Verifying contracts with Sourcify : truffle

_This tutorial includes items from the truffle [quickstart docs](https://www.trufflesuite.com/docs/truffle/quickstart)_<br>
_Inspired by [blockscout docs](https://docs.blockscout.com/for-users/smart-contract-interaction/verifying-a-smart-contract/contracts-verification-via-sourcify)_



### Create a project

Make sure you have truffle installed:
```
npm install -g truffle
```
<br>

Create a new directory for your Truffle project:
<br>

```zsh
mkdir MetaCoin
cd MetaCoin
```
<br>

Download ("unbox") the MetaCoin box:
```
truffle unbox metacoin
```
<br>

Once this operation is completed, you'll now have a project structure with the following items:

* ``contracts/``: Directory for Solidity contracts<br>
* ``migrations/``: Directory for scriptable deployment files<br>
* ``test/``: Directory for test files for testing your application and contracts<br>
* ``truffle.js``: Truffle configuration file

## Compiling
Set up your environment:

```zsh
yarn add @truffle/hdwallet-provider
```
<br>

Create a ``.env.json`` file in your project's root directory:

```json
{"mnemonic": "your-wallet-seed-phrase"}
```
<br>

Configure your ``truffle-config.js`` file to the appropriate settings:
<br>

```js
/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require("@truffle/hdwallet-provider");

 //
 const { mnemonic } = require('./.env.json');
 
 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */

   networks: {
 
    fuji: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
_Network can be configured for mainnet deployment(see Alternatives)_ 

Run the following command:

```zsh
truffle compile
```
<br>

Once this operation is completed, your ``./build/contracts`` folder should contain the following items:
<br>

* ``ConvertLib.json`` <br>
* ``MetaCoin.json``<br>
* ``Migrations.json``<br>

_You will need ``MetaCoin.json`` for future use_

### Migrate

Run the following command:
```zsh
truffle migrate --network fuji
```
<br>

You should see the txn activity in your terminal
![Step1](https://user-images.githubusercontent.com/73849597/128948790-654fc0dc-25d5-4713-9058-dfc4101a8366.png)
![Step2](https://user-images.githubusercontent.com/73849597/128949004-c63d366f-3c0e-42e0-92f5-cb86da62bcba.png)
![Step3](https://user-images.githubusercontent.com/73849597/128948793-3cb1beda-00c3-47e2-ab43-7b4712b1cf1d.png)

<br>

_You will need your MetaCoin contract address for future use_


# Verify Smart Contracts on the C-Chain Explorer

The C-Chain Explorer supports verifying smart contracts, allowing users to review it

The Mainnet C-Chain Explorer is [here](https://cchain.explorer.avax.network/) and the Fuji Testnet Explorer is [here](https://cchain.explorer.avax-test.network/)

If you have issues, contact us on [Discord](https://chat.avalabs.org)

## Steps

Navigate to the _Code_ tab at the Explorer page for your contract's address

![CodeTab2](https://user-images.githubusercontent.com/73849597/128950386-35d89fe5-c61f-41b0-badf-87a487bf422c.png)


Click _Verify & Publish_ to enter the smart contract verification page

![SourcifyVerify](https://user-images.githubusercontent.com/73849597/128950515-cc74c92f-6da3-485f-bb7f-a033eb59bd2e.png)


Click _Sourcify: sources and metadataJSON file_

Upload ``MetaCoin.sol`` ``ConvertLib.sol`` and ``MetaCoin.json``(found in build folder)
<br>
Click _Verify & Publish_

![JSONSourcify](https://user-images.githubusercontent.com/73849597/128950634-55bdd46e-885b-437e-84d2-534bd1801df0.png)

View the verified contract: [MetaCoin](https://cchain.explorer.avax-test.network/address/0xf1201EA651Ed5F968920c8bC62Fd76ea4CBfd9C2/contracts)

![MetaCoin](https://user-images.githubusercontent.com/73849597/128950810-b1b5c280-267b-47ce-9922-edd36a157cd6.png)


<br>

## Alternatives

### Flatten files for verification
```zsh
yarn add truffle-flattener
```

Run the following command:

```zsh
npx truffle-flattener contracts/MetaCoin.sol > contracts/MetaCoin_flat.sol
```

repeat compiliation, migration, and verification steps <br>

### Mainnet deployment

Configure your ``truffle-config.js`` file to the appropriate settings:<br>

```js
module.exports = {
...
   networks: {
 
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
      network_id: "*",
      timeoutBlocks: 200,
      skipDryRun: true
    }
   },
 };
```
Run the following command:
```zsh
truffle migrate --network mainnet
```

