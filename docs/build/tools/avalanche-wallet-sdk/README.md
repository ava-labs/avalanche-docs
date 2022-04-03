---
description: The Avalanche Wallet SDK is a TypeScript library for creating and managing non-custodial wallets on the Avalanche platform.
---

# Wallet SDK Overview

## Notice: Beta Release🔴

This library is under rapid development and there may be frequent breaking changes. An audit is pending.

## Avalanche Wallet SDK (Beta)

The Avalanche Wallet SDK is a TypeScript library for creating and managing non-custodial wallets on the Avalanche network.

It provides high-level methods to transact on Avalanche's X-Chain, P-Chain and C-Chain.

The wallet types are supported:

* Singleton Wallets
* Ledger Wallets
* Mnemonic Wallets
* XPUB Wallets

Using `avalanche-wallet-sdk`, developers can:

* Receive and send tokens and NFTs.
* Transfer funds between chains
* Add a node to the validator set
* Delegate stake to a validator
* Create keystore files from wallet instances
* Get the transaction history of a wallet
* Mint NFTs on the X-Chain

### Installation

Source code can be found in this library's [Github repo](https://github.com/ava-labs/avalanche-wallet-sdk).

#### Install with `npm`

`npm install --save @avalabs/avalanche-wallet-sdk`

#### Install with `yarn`

`yarn add @avalabs/avalanche-wallet-sdk`

### Classes

See [here](wallet-classes.md) for Classes exposed by this library.

### Example Usage

#### Event Listeners

Every wallet instance will fire events to indicate changes in its state.

```typescript
// Create a wallet instance
let myWallet = MnemonicWallet.create()

// Fired when the wallet starts using a new address
// Used only with HD wallets (Mnemonic, Ledger, and XPUB)
myWallet.on('addressChanged', (addresses)=>{
    // Use the most recent addresses from the wallet
})

// Fired when X chain balance is updated
myWallet.on('balanceChangedX', (newBalance)=>{
    // Recent X chain balance
})

// Fired when P chain AVAX balance is updated
myWallet.on('balanceChangedP', (newBalance)=>{
    // Recent P chain AVAX balance
})

// Fired when C chain AVAX balance is updated
myWallet.on('balanceChangedC', (newBalance)=>{
    // Recent C chain AVAX balance
})
```

#### Sending AVAX

```typescript
import {MnemonicWallet, BN} from '@avalabs/avalanche-wallet-sdk'

let myWallet = MnemonicWallet.create()

// Mnemonic wallets need to find their HD index on startup
await myWallet.resetHdIndices()

// Update the UTXOs
await myWallet.updateUtxosX()

// Send 1 nAVAX
let to = "X-avax1r20dtfehaat9wev69ajzzfcwtll903vlcx50uh"
let amount = new BN(1)
let txID = await myWallet.sendAvax(to, amount)
```

#### Changing Networks

By default the SDK is connected to the Avalanche Mainnet.

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### Printing BN (Big Number)

Token amounts are represented in their smallest divisible unit using BN.js. The `Utils` namespace has helper functions to display BN numbers in a human readable way.

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Websocket Provider

Use the `WebsocketProvider` class to update wallet balances in real time without polling.

```typescript
import { Network, NetworkConstants } from 'avalanche-wallet-sdk';

// Create a websocket provider from the network currently used by the SDK
const provider = Network.WebsocketProvider.fromActiveNetwork()

// To track wallets and update their balances
provider.trackWallet(myWallet)

// To stop tracking wallets
// Make sure to call this to avoid memory leaks
provider.removeWallet(myWallet)

// To change provider network
provider.setNetwork(NetworkConstants.TestnetConfig) // connect to Fuji testnet
```

#### Adding ERC20 Tokens

The SDK comes loaded with a set of ERC20 contracts. You can add additional contracts like this:

```typescript
import { Assets } from '@avalabs/avalanche-wallet-sdk'

// Will try to fetch details about the ERC20 contract
try{
    await Assets.addErc20Token('0x34B6C87bb59Eb37EFe35C8d594a234Cd8C654D50'); // Testnet DAI
}catch(e){
    // Contract not found or not valid
}

// or from known data
let tokenData = {
    chainId: 43114,
    address: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    decimals: 18,
    name: 'Dai Stablecoin',
    symbol: 'DAI',
}

Assets.addErc20TokenFromData(tokenData)
```

