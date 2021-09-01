# Portefeuille

## Avis : Beta Release🔴 🔴

Cette bibliothèque est en développement rapide et il peut y avoir des changements de rupture fréquents. Un audit est en cours.

## Avalanche Wallet SDK \(Beta\)

Le SDK de portefeuille d'Avalanche est une bibliothèque TypeScript pour créer et gérer des portefeuilles non gardiens sur le réseau d'Avalanche.

Il fournit des méthodes de haut niveau pour transposer sur les X-Chain, P-Chain et C-Chain d'Avalanche.

Les types de portefeuille sont pris en charge :

* Singleton
* Ledger
* Portefeuilles Mnemonic
* Portefeuilles XPUB

En utilisant `avalanche-wallet-sdk`, les développeurs peuvent :

* Recevoir et envoyer des jetons et des NFT.
* Transfer des fonds entre les chaînes
* Ajouter un nœud à l'ensemble de validateur
* Déléguer la participation à un validateur
* Créer des fichiers de frappes à partir d'instances de portefeuille
* Obtenez l'historique de la transaction d'un portefeuille
* Mint les NFT sur la X-Chain

### Installation

Le code source peut être trouvé dans la [repo Github](https://github.com/ava-labs/avalanche-wallet-sdk) de cette bibliothèque.

#### Installer avec`npm`

`npm install --save @avalabs/avalanche-wallet-sdk`

#### Installer avec`yarn`

`yarn add @avalabs/avalanche-wallet-sdk`

### Classes

Voir [ici](wallet-classes.md) pour les classes exposées par cette bibliothèque.

### Exemple d'utilisation

#### Auditeurs d'événements

Chaque instance de portefeuille va lancer des événements pour indiquer des changements dans son état.

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

#### Envoyer AVAX

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

#### Changer les réseaux

Par défaut, le SDK est connecté à l'Avalanche Mainnet.

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### Impression BN \(grand nombre\)

Les montants des jetons sont représentés dans leur plus petite unité divisible en utilisant les BN.js. L'espace de `Utils`noms a des fonctions d'aide pour afficher les numéros BN de manière lisible par l'homme.

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Fournisseur de websocket

Utilisez la `WebsocketProvider`classe pour mettre à jour les soldes de portefeuille en temps réel sans s'interroger.

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

#### Ajouter des jetons ERC20

Le SDK est livré avec un ensemble de contrats ERC20. Vous pouvez ajouter d'autres contrats comme ceci :

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

