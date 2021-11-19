# Verifying contracts with truffle verify

_This tutorial includes items from the truffle [quickstart docs](https://www.trufflesuite.com/docs/truffle/quickstart)_<br>
_Inspired by [truffle verify docs](https://www.npmjs.com/package/truffle-plugin-verify)_



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
Before we compile our smart contract, we must set up our environment

<br>

Run the following commands:

```zsh
npm init -y 
```
<br>

```zsh 
yarn add @truffle/hdwallet-provider yarn add -D truffle-plugin-verify 
```

<br>

Create a ``.env.json`` file in your project's root directory:

```json
{"mnemonic": "your-wallet-seed-phrase",
"snowtraceApiKey": "your-snowtrace-api-key"
}
```
_Get your snowtrace API key [here](https://snowtrace.io/myapikey)_
<br> <br>

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
const { snowtraceApiKey, mnemonic } = require("./.env.json");

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

   plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    snowtrace: snowtraceApiKey
  },
  networks: {

    fuji: {
        provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
        network_id: 1,
        timeoutBlocks: 200,
        confirmations: 5,
        production: true    // Treats this network as if it was a public net. (default: false)
    }
  }
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
npx truffle migrate --network fuji
```
<br>

You should see the txn activity in your terminal
<img width="793" alt="step1" src="https://user-images.githubusercontent.com/73849597/142695096-4dcbfb58-cc9d-46ba-b146-67ea5f46048f.png">
<img width="899" alt="step2" src="https://user-images.githubusercontent.com/73849597/142695128-5c4adc0d-78be-423e-ac8e-4a77c81a5d5a.png">
<img width="794" alt="step3" src="https://user-images.githubusercontent.com/73849597/142695152-bbd7551a-9624-4dca-9649-17fa93a98ebc.png">

<br>

# Verify Smart Contracts with Truffle Verify

Truffle verify alls users to verify contracts from the CLI

Take a look at the Fuji Testnet Explorer [here](https://testnet.snowtrace.io/) and read more about truffle Verify [here](https://github.com/rkalis/truffle-plugin-verify)

If you have issues, contact us on [Discord](https://chat.avalabs.org)

## Steps
1. Run the following command:
```zsh
npx truffle run verify ConvertLib MetaCoin --network fuji
```
<br>

2. Wait for the verification message from the CLI
<img width="867" alt="Screen Shot 2021-11-19 at 1 18 47 PM" src="https://user-images.githubusercontent.com/73849597/142695700-cdcfb290-d8a7-49f3-bae7-33ef38e604fe.png">

<br>

7. View the verified [contracts](https://testnet.snowtrace.io/address/0xbA9c33d2605d25d555a301b938C47dc0D2bc6538#code) <br>
<img width="1384" alt="step5" src="https://user-images.githubusercontent.com/73849597/142696234-99cb457e-3b52-4566-8868-a078e54465e7.png">


## Mainnet deployment

Configure your ``truffle-config.js`` file to the appropriate settings:<br>

```js
module.exports = {
...
   plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    snowtrace: snowtraceApiKey
  },
  networks: {

    mainnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
        network_id: 1,
        timeoutBlocks: 200,
        confirmations: 5,
        production: true    // Treats this network as if it was a public net. (default: false)
    }
  }
};
```
Run the following commands:
```zsh
truffle migrate --network mainnet
```
<br>

```zsh
truffle verify CovertLib MetaCoin --network mainnet
```


Thanks for reading 🔺
