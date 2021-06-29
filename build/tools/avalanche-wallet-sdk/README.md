
# 🔴WARNING: Beta Release🔴

This library is under development and there might be frequent breaking changes.

# avalanche-wallet-sdk

Avalanche wallet SDK is a typescript library for creating and managing decentralized wallets. 

It provides high level methods to transact on Avalanche's primary networks: X-Chain, P-Chain and C-Chain.

Wallet types supported:
- Singleton Wallets
- Ledger Wallets
- Mnemonic Wallets
- XPUB Wallets


Using the avalanche-wallet-sdk developers can:

- Receive and send tokens and NFTs.
- Transfer cross chain
- Validation & Delegation
- Create keystore files from wallet instances
- Get transaction history of wallets
- Mint NFTs on the X chain

## Tutorials

### Creating a mnemonic wallet
Mnemonic wallets are designed according to BIP44, BIP32 and BIP39 proposals. For each transaction received,
the mnemonic wallet will generate a new address. This increases privacy but decreases performance for this wallet type.
```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a new wallet
let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)

// Mnemonic wallets need to find their HD index on startup
// This is a heavy operation and can take a long time for wallets with extensive activity
myWallet.resetHdIndices().then(()=>{
    // The wallet is ready to use

    // Update X chain balance
    myWallet.updateUtxosX()
    // Update P chain balance
    myWallet.updateUtxosP()
    // Update C chain AVAX balance
    myWallet.updateAvaxBalanceC()
    // update C chain ERC20 balance
    myWallet.updateBalanceERC20()

    let addressX = myWallet1.getAddressX()
    let addressP = myWallet1.getAddressP()
    let addressC = myWallet1.getAddressC()
})
```

### Event listeners
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

### Sending AVAX
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

### Changing Networks

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to mainnet
Network.setNetwork(NetNetworkConstants.MainnetConfig)

// Set to fuji
Network.setNetwork(NetNetworkConstants.TestnetConfig)

```

### Printing BN
Token amounts are represented in their smallest divisible unit using BN.js. The `Utils` namespace has helper functions to display BN numbers in a 
human readable way.
```typescript
import {Utils} from `@avalabs/avalanche-wallet-sdk`

// On X and P chains AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567

```

### Websocket Provider
Use the `WebsocketProvider` class to update wallet balances in real time without polling.
```typescript
import { Network, NetworkConstants } from 'avalanche-wallet-sdk';

// Create a websocket provider from the current network used by the SDK
const provider = Network.WebsocketProvider.fromActiveNetwork()

// To track wallets and update their balances
provider.trackWallet(myWallet)

// To stop tracking wallets
// Make sure to call this to avoid memory leaks
provider.removeWallet(myWallet)

// To change provider network
provider.setNetwork(NetworkConstants.TestnetConfig) // connect to Fuji testnet

```


### Adding ERC20 Tokens
The SDK comes loaded with a set of ERC20 contracts. You can add additional contracts like this:
```typescript
import { Assets } from '@avalabs/avalanche-wallet-sdk'

// Will try to fetch details about the ERC20 contract
await Assets.addErc20Token('0x34B6C87bb59Eb37EFe35C8d594a234Cd8C654D50'); // Testnet DAI

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



