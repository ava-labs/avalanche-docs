---
description: The core of the SDK are the wallet classes that let users easily create and manage different types of wallets. Find out more info here.
---

# Wallet Classes

The core of the SDK are the wallet classes that let users easily create and manage different types of wallets.

## Mnemonic Wallet

Mnemonic wallets are designed according to BIP44, BIP32 and BIP39 specifications. For each transaction received, the mnemonic wallet generates a new address. This increases privacy but decreases performance for this wallet type.

### New wallet

```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a new wallet
let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)

let addressX = myWallet.getAddressX()
let addressP = myWallet.getAddressP()
let addressC = myWallet.getAddressC()
```

### From an Existing Mnemonic Phrase

```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a wallet instance from the known mnemonic phrase
let myWallet = MnemonicWallet.fromMnemonic(myMnemonicPhrase)

// This is also a good place to attach the event listeners.

// Mnemonic wallets with activity need to find their HD index on startup
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

    let addressX = myWallet.getAddressX()
    let addressP = myWallet.getAddressP()
    let addressC = myWallet.getAddressC()
})
```

## Public Mnemonic Wallet

Similar to the MnemonicWallet class but in read-only mode without access to the seed phrase.

```typescript
import {PublicMnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

const XPUB_AVM = `xpub6CvdTKLRh3ehvVLR2f3M1GUTFesrz5zoYFbw32iZqRShmoDnxtfSaF7mdCvXwNRfTwce5RYEADGb6YAzhqEAujEkvjTod6s2WEkpUBJZwqf`;
const XPUB_EVM = `xpub6CQ5fy7iAochmG1tL2ww2P4BviDRRrcEjG3u1uM6GcyGwzihscWoX9RwiCrZDcpAbYK8reYcy7cT8ZgZWVbReZ44ehVYqi5jZD9NknLx4TS`;

let wallet = new PublicMnemonicWallet(XPUB_AVM, XPUB_EVM);
```

## Ledger Wallet

Similar to the MnemonicWallet class. Instead of having access to a seed phrase, it communicates with an external ledger device to sign transactions.

The client application needs to provide the appropriate [ledger transport](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-).

```typescript
import TransportU2F from '@ledgerhq/hw-transport-u2f';

let transport = await TransportU2F.create();
let wallet = await LedgerWallet.fromTransport(transport);
```

## Singleton Wallet

Singleton wallets are the most performant wallet type because they consist of a single private key, with a single address.

```typescript
import { SingletonWallet } from '@avalabs/avalanche-wallet-sdk'

let privateKey = "PrivateKey-23Zqf7uScHNEoj5kuQfGkk8LSoUjM95LawSxFmgNCK6kFnWC7p"
let wallet = new SingletonWallet(privateKey);
```

