# Classes de portefeuille

Le noyau du SDK sont les classes de portefeuille qui permettent aux utilisateurs de créer et de gérer facilement différents types de portefeuilles.

## Portefeuille Mnemonic

Les portefeuilles Mnemonic sont conçus conformément aux spécifications BIP44, BIP32 et BIP39. Pour chaque transaction reçue, le portefeuille mnemonic génère une nouvelle adresse. Cela augmente la confidentialité, mais diminue les performances pour ce type de portefeuille.

### Nouveau portefeuille

```typescript
import {MnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

// Create a new wallet
let newMnemonic = MnemonicWallet.generateMnemonicPhrase()
let myWallet = MnemonicWallet.fromMnemonic(newMnemonic)

let addressX = myWallet.getAddressX()
let addressP = myWallet.getAddressP()
let addressC = myWallet.getAddressC()
```

### D'une Phrase mnemonic existante

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

## Portefeuille Mnemonic

Semblable à la classe MnemonicWallet mais en mode en lecture seule sans accès à la phrase de semence.

```typescript
import {PublicMnemonicWallet} from '@avalabs/avalanche-wallet-sdk'

const XPUB_AVM = `xpub6CvdTKLRh3ehvVLR2f3M1GUTFesrz5zoYFbw32iZqRShmoDnxtfSaF7mdCvXwNRfTwce5RYEADGb6YAzhqEAujEkvjTod6s2WEkpUBJZwqf`;
const XPUB_EVM = `xpub6CQ5fy7iAochmG1tL2ww2P4BviDRRrcEjG3u1uM6GcyGwzihscWoX9RwiCrZDcpAbYK8reYcy7cT8ZgZWVbReZ44ehVYqi5jZD9NknLx4TS`;

let wallet = new PublicMnemonicWallet(XPUB_AVM, XPUB_EVM);
```

## Ledger

Semblable à la classe MnemonicWallet. Au lieu d'avoir accès à une phrase de graines, il communique avec un périphérique du grand livre externe pour signer les transactions.

L'application client doit fournir le transport approprié du [grand livre](https://github.com/LedgerHQ/ledgerjs#ledgerhqhw-transport-).

```typescript
import TransportU2F from '@ledgerhq/hw-transport-u2f';

let transport = await TransportU2F.create();
let wallet = await LedgerWallet.fromTransport(transport);
```

## Singleton

Les portefeuilles Singleton sont le type de portefeuille le plus performant parce qu'ils sont constitués d'une seule clé privée, avec une seule adresse.

```typescript
import { SingletonWallet } from '@avalabs/avalanche-wallet-sdk'

let privateKey = "PrivateKey-23Zqf7uScHNEoj5kuQfGkk8LSoUjM95LawSxFmgNCK6kFnWC7p"
let wallet = new SingletonWallet(privateKey);
```

