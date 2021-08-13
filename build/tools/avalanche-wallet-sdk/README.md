# Portefeuille SDK

## Avis: bêta libération 🔴

Cette bibliothèque est en cours de développement rapide et il peut y avoir des changements fréquents de rupture. Une vérification est en cours.

## Portefeuille Avalanche SDK \(Beta\)

Le portefeuille Avalanche SDK est une bibliothèque TypeScript pour la création et la gestion de portefeuille non privatives de liberté sur le réseau Avalanche.

Il fournit des méthodes de haut niveau pour agir sur la chaîne X, la chaîne P et la chaîne C d'Avalanche.

Les types de portefeuille sont pris en charge:

* Portefeuilles Singleton
* Portefeuilles de ledger
* Portefeuilles Mnémoniques
* Portefeuilles XPUB

Utilisant `avalanche-wallet-sdk`, les développeurs peuvent:

* Recevez et envoyez des jetons et des NFT.
* Transfert de fonds entre chaînes
* Ajouter un noeud à l'ensemble du validateur
* Délégué la prise à un validant
* Créer des fichiers Keystore à partir des instances de portefeuille
* Obtenez l'historique de la transaction d'un portefeuille
* NFT de la Monnaie sur la chaîne X.

### Installation

Le code source peut être trouvé dans la [repo Github](https://github.com/ava-labs/avalanche-wallet-sdk) de cette bibliothèque.

#### Installer avec `npm`

`npm install --sauve --save`

#### Installer avec `le fil`

`yard add @avalabs/avalanche-wallet-sdk`

### Classes

Voir [ici](wallet-classes.md) pour les classes exposées par cette bibliothèque.

### Exemple d'utilisation

#### Auditeurs d'événements

Chaque instance de portefeuille incendiera des événements pour indiquer les changements dans son état.

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

#### Changing de réseaux

Par défaut, le SDK est connecté au réseau Avalanche Mainnet.

```typescript
import { NetworkConstants, Network} from '@avalabs/avalanche-wallet-sdk';

// Set to Mainnet
Network.setNetwork(NetworkConstants.MainnetConfig)

// Set to Fuji Testnet
Network.setNetwork(NetworkConstants.TestnetConfig)
```

#### Impression BN \(Big Numéro\)

Les montants des jetons sont représentés dans leur plus petite unité divisible à l'aide de BN.js. L'espace de noms `Utils` a des fonctions d'aide pour afficher les numéros BN d'une manière lisible par l'homme.

```typescript
import {Utils} from '@avalabs/avalanche-wallet-sdk'

// On X-Chain and P-Chain AVAX has 9 decimals
let amtX = new BN(1234567000000)
Utils.bnToAvaxX(amtX) // 1,234.567

// On the C-Chain it has 18
let amtC = new BN(1234567000000000000000)
Utils.bnToAvaxC(amtC) // 1,234.567
```

#### Fournisseur de prise Web

Utilisez la classe `WebsocketProvider` pour mettre à jour les soldes du portefeuille en temps réel sans sondage.

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

#### Ajout de jetons ERC20

Le SDK est livré avec un ensemble de contrats ERC20. Vous pouvez ajouter des contrats supplémentaires comme ceci:

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

