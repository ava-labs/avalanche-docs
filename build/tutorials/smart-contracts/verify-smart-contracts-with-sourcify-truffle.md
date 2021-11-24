# Create a project

_This tutorial includes items from the truffle [quickstart docs](https://www.trufflesuite.com/docs/truffle/quickstart), and it is inspired by [blockscout docs](https://docs.blockscout.com/for-users/smart-contract-interaction/verifying-a-smart-contract/contracts-verification-via-sourcify)_

Make sure you have truffle installed:
```
npm install -g truffle
```

Create a new directory for your Truffle project:

```zsh
mkdir MetaCoin
cd MetaCoin
```

Download ("unbox") the MetaCoin box:
```
truffle unbox metacoin
```


Once this operation is completed, you'll now have a project structure with the following items:

* ``contracts/``: Directory for Solidity contracts
* ``migrations/``: Directory for scriptable deployment files
* ``test/``: Directory for test files for testing your application and contracts
* ``truffle.js``: Truffle configuration file

## Compiling
Set up your environment:

```zsh
npm init -y
```

```zsh
yarn add @truffle/hdwallet-provider yarn add truffle-flattener
```

Create a ``.env.json`` file in your project's root directory:

```json
{"mnemonic": "your-wallet-seed-phrase"}
```

Configure your ``truffle-config.js`` file to the appropriate settings:


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
_Network can be configured for mainnet deployment(see [Alternatives](verify-smart-contracts-with-sourcify-truffle.md#alternatives))_ 

Run the following commands:

```zsh
npx truffle-flattener contracts/MetaCoin.sol > contracts/MetaCoin_flat.sol & truffle compile
```

Once this operation is completed, your ``./contracts`` folder should contain the following items:


* ``ConvertLib.sol`` 
* ``MetaCoin_flat.sol``
* ``MetaCoin.sol``
* ``Migrations.sol``

_You will need ``MetaCoin_flat.sol`` for future use_
<br>

## Migrate

Run the following command:
```zsh
truffle migrate --network fuji
```

You should see the txn activity in your terminal

![Step1](https://user-images.githubusercontent.com/73849597/143319829-11686093-954d-4a85-8bb4-6b2d83251bcb.png)

![Step2](https://user-images.githubusercontent.com/73849597/143319842-43ccba01-ff68-4bf6-acad-829f39d86907.png)

<br>

_You will need your MetaCoin contract address for future use_


# Verify Smart Contracts on Snowtrace

Snowtrace supports verifying smart contracts, allowing users to review it

Snowtrace is [here](https://snowtrace.io/) and Snowtrace for Fuji is [here](https://testnet.snowtrace.io/)

If you have issues, contact us on [Discord](https://chat.avalabs.org)

## Steps
* Navigate to the _Contract_ tab at the Explorer page for your contract's address


<img width="1361" alt="Contract Tab" src="https://user-images.githubusercontent.com/73849597/143319874-f00e38c1-ce58-4923-92c4-5a476f2d48e1.png">


* Click _Verify & Publish_ to enter the smart contract verification page


<img width="710" alt="Vewp" src="https://user-images.githubusercontent.com/73849597/143323526-07cd3911-044a-49b9-8131-76ac4ffd71a8.png">



* Enter the _Contract Adress_ you would like to verify

* Select _Solidity (Single file)_ for Compiler Type

* Select _v0.6.12+commit.27d51765_ for Compiler Version 

* Select _3) MIT license (MIT)_ for Open Source License Type

* Click _Continue_

![JSONSourcify](https://user-images.githubusercontent.com/73849597/128950634-55bdd46e-885b-437e-84d2-534bd1801df0.png)

* Paste the Solidity Contract Code of ``MetaCoin_flat.sol`` into the form

* Click _Verify & Publish_


<img width="1351" alt="SRCCode" src="https://user-images.githubusercontent.com/73849597/143323279-2c33a07b-9642-4ae0-9285-e68fca0ee4f0.png">


* View the verified contract: [MetaCoin](https://testnet.snowtrace.io/address/0xf1201EA651Ed5F968920c8bC62Fd76ea4CBfd9C2/contracts)


# Alternatives

## Flatten files for verification
```zsh
yarn add truffle-flattener
```

Run the following command:

```zsh
npx truffle-flattener contracts/MetaCoin.sol > contracts/MetaCoin_flat.sol
```

repeat compiliation, migration, and verification steps 

## Mainnet deployment

Configure your ``truffle-config.js`` file to the appropriate settings:

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

