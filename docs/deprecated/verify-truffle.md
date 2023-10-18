---
tags: [Build, Dapps]
description: This tutorial walks through verifying a smart contract on a block explorer using Truffle after deploying it to Avalance C-Chain.
sidebar_label: Using Truffle
pagination_label: Verifying Smart Contracts with Truffle Verify
---

# Verifying Smart Contracts with Truffle Verify

:::warning
This document has been deprecated and is no longer maintained. It may contain incorrect/obsolete information.
:::

_This tutorial includes items from the truffle [quickstart docs](https://www.trufflesuite.com/docs/truffle/quickstart)_

_Inspired by [truffle verify docs](https://www.npmjs.com/package/truffle-plugin-verify)_

## Create a Project

Make sure you have truffle installed:

```zsh
npm install -g truffle
```

Create a new directory for your Truffle project:

```zsh
mkdir MetaCoin
cd MetaCoin
```

Download ("unbox") the MetaCoin box:

```zsh
truffle unbox metacoin
```

Once this operation is completed, you'll now have a project structure with the following items:

- `contracts/`: Directory for Solidity contracts
- `migrations/`: Directory for scriptable deployment files
- `test/`: Directory for test files for testing your application and contracts
- `truffle.js`: Truffle configuration file

## Compiling

Before we compile our smart contract, we must set up our environment

Run the following commands:

```zsh
npm init -y
```

```zsh
yarn add @truffle/hdwallet-provider yarn add -D truffle-plugin-verify
```

Create a `.env.json` file in your project's root directory:

```json
{
  "mnemonic": "your-wallet-seed-phrase",
  "snowtraceApiKey": "your-snowtrace-api-key"
}
```

_Get your Snowtrace API key [here](https://snowtrace.io/myapikey)_

Configure your `truffle-config.js` file to the appropriate settings:

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

const HDWalletProvider = require("@truffle/hdwallet-provider")

//
const { snowtraceApiKey, mnemonic } = require("./.env.json")

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

  plugins: ["truffle-plugin-verify"],
  api_keys: {
    snowtrace: snowtraceApiKey,
  },
  networks: {
    fuji: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://api.avax-test.network/ext/bc/C/rpc`
        ),
      network_id: 1,
      timeoutBlocks: 200,
      confirmations: 5,
    },
  },
}
```

_Network can be configured for Mainnet deployment(see Alternatives)_

Run the following command:

```zsh
truffle compile
```

Once this operation is completed, your `./build/contracts` folder should contain the following items:

- `ConvertLib.json`
- `MetaCoin.json`
- `Migrations.json`

## Migrate

Run the following command:

```zsh
npx truffle migrate --network fuji
```

You should see the TX activity in your terminal
![truffle-verify-txn1](/img/truffle-verify-txn1.png)

![truffle-verify-txn2](/img/truffle-verify-txn2.png)

![truffle-verify-txn3](/img/truffle-verify-txn3.png)

## Truffle Verify

Truffle verify allows users to verify contracts from the CLI

### Fuji Testnet

Take a look at the Fuji Testnet Explorer [here](https://testnet.snowtrace.io/)
and read more about truffle verify
[here](https://github.com/rkalis/truffle-plugin-verify)

If you have issues, contact us on [Discord](https://chat.avalabs.org)

1. Run the following command:

    ```zsh
    npx truffle run verify ConvertLib MetaCoin --network fuji
    ```

2. Wait for the verification message from the CLI
   ![truffle-verify-message1](/img/truffle-verify-message1.png)

3. View the verified contract
   ![truffle-verify-view-contract](/img/truffle-verify-view-contract.png)

### Mainnet

Configure your `truffle-config.js` file to the appropriate settings:

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
        confirmations: 5
    }
  }
};
```

Run the following commands:

```zsh
truffle migrate --network mainnet
```

```zsh
truffle verify CovertLib MetaCoin --network mainnet
```

Thanks for reading 🔺
