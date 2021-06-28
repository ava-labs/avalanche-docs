
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


### Creating a mnemonic wallet
```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a new wallet
let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)

// Mnemonic wallets need to find their HD index on startup
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

```typescript

// Create a wallet instance
let myWallet = MnemonicWallet.create()

// Fired when the wallet starts using a new address
// Used only with HD wallets (Mnemonic, Ledger, and XPUB)
myWallet.on('addressChanged', (addresses)=>{
    console.log(addresses)
})

// Fired when X chain balance is updated
myWallet.on('balanceChangedX', (newBalance)=>{
    console.log(newBalance)
})

// Fired when P chain balance is updated
myWallet.on('balanceChangedP', (newBalance)=>{
    console.log(newBalance)
})

// Fired when C chain balance is updated
myWallet.on('balanceChangedC', (newBalance)=>{
    console.log(newBalance)
})

```

### Sending AVAX
```typescript
import {MnemonicWallet, BN} from '@avalabs/avalanche-wallet-sdk'


let myWallet = MnemonicWallet.create()

// Mnemonic wallets need to find their HD index on startup
async function main(){
    await myWallet.resetHdIndices()

    // Update the UTXOs
    await myWallet.updateUtxosX()
    
    // Send 1 nAVAX
    let to = "X-avax1r20dtfehaat9wev69ajzzfcwtll903vlcx50uh"
    let amount = new BN(1)
    let txID = await myWallet.sendAvax(to, amount)
}
main()
```

### Changing Networks

```typescript
import { NetworkConstants, Network} from 'avalanche-wallet-sdk';

// Set to mainnet
Network.setNetwork(NetNetworkConstants.MainnetConfig)

// Set to fuji
Network.setNetwork(NetNetworkConstants.TestnetConfig)

```





