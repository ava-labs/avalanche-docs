# Workflow de Fuji

## Introduction

Fuji est le réseau de test du réseau Avalanche. Vous pouvez l'utiliser pour tester votre dapp ou votre contrat intelligent après que vous l'avez développé localement. \(Vous pouvez utiliser [Avash](https://docs.avax.network/build/tools/avash) pour tester les choses localement.\) Fuji est généralement sur la même version que l'Avalanche Mainnet, mais parfois il exécute une version non publiée of En général, vous pouvez vous attendre à ce que le comportement de Fuji soit à peu près le même que d'Avalanche Mainnet. Des outils tels que un explorateur et un portefeuille devraient travailler avec le Fuji Testnet.

Dans ce tutoriel, nous allons passer par un flux de travail Fuji de l'exemple pour montrer comment il peut être utilisé. Nous ferons les choses suivantes :

1. Générer un mnemonic anglais de 24 mots via AvalancheJS
2. Dériver avec les adresses externes BIP44 X-Chain via AvalancheJS
3. Obtenez AVAX du faucet Fuji
4. Envoyer AVAX via AvalancheJS
5. Examiner la transaction résultant sur l'Avalanche Explorer
6. Utilisez le mnemonic pour vous connecter au portefeuille

## Générer une Mnemonic

Pour commencer, nous créerons une phrase mnemonic avec [AvalancheJS](https://docs.avax.network/build/tools/avalanchejs). Mnemonics nous permet de coder une sécurité forte dans une phrase lisible par l'homme. AvalancheJS prend en charge 10 langues dont l'anglais, le japonais, l'espagnol, l'italien, le français, le coréen, le tchèque, le portugais, le chinois simplifié et le chinois Traditionnel.

D'abord, générez un mnemonic conforme [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) à 24 mots via AvalancheJS.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## Adresses dériver

Après avoir créé un mnemonique, nous pouvons utiliser AvalancheJS pour dériver des quaies déterministes \(HD\) hiérarchiques \(HD\) conformes à [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

```typescript
import HDNode from "avalanche/utils/hdnode"
const seed: Buffer = mnemonic.mnemonicToSeedSync(m)
const hdnode: HDNode = new HDNode(seed)

for (let i: number = 0; i <= 2; i++) {
  // Deriving the _i_th external BIP44 X-Chain address
  const child: HDNode = hdnode.derive(`m/44'/9000'/0'/0/${i}`)
  keychain.importKey(child.privateKeyCB58)
}

const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
console.log(xAddressStrings)
// [
//   'X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40',
//   'X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y',
//   'X-fuji1p6n0vyjqgmp06f7pr405q2flqu9v93j383ncam'
// ]
```

**Notez **que nous utilisons `keychain`qui n'a pas encore été défini. La création d'un keychain vide peut être vu dans [cet exemple le script AvalancheJS](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts). Il y a des liens vers des dizaines d'exemples d'AvalancheJS dans [les ressources énumérées ci-dessous](fuji-workflow.md#resources).

Tant que vous avez la phrase menmonic vous pouvez régénérer vos clés privées et les adresses qu'elles contrôlent.

## Obtenez une drip du faucet Fuji

Nous pouvons obtenir un "drip" d'AVAX du robinet Fuji. Coller l'adresse dans le [site Web du faucet Fuji](https://faucet.avax-test.network). Ces AVAX sont pour le Fuji Testnet et n'ont aucune valeur monétaire.

![Demander AVAX](../../../.gitbook/assets/faucet-request.png)

Le faucet enverra un certain AVAX à l'adresse et retournera un ID de transaction \(txID\). Ce txID peut être utilisé avec l'Explorer Fuji Testnet pour en savoir plus sur la transaction.

![Recevoir AVAX](../../../.gitbook/assets/faucet-response.png)

### Vérifier les détails de la transaction

`2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct`Le txID, , peut être vu sur [l'Explorer Fuji Testnet](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct). Avalanche a également un [explorateur de mainnet](https://explorer.avax.network).

Détails de ![la transaction](../../../.gitbook/assets/explorer-1.png) ![Informations sur les entrées et la sortie](../../../.gitbook/assets/explorer-2.png)

### Obtenir l'équilibre

Nous pouvons également utiliser l'Explorer de Fuji pour obtenir le solde de la 1ère [adresse](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40) BIP44, X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8noixfm7a40.

![1er solde](../../../.gitbook/assets/balance-1.png)![](../../../.gitbook/assets/balance-2.png) d'adresse dérivé

Par ailleurs, nous pouvons utiliser AvalancheJS pour obtenir l'équilibre.

```typescript
const address: string = "X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40"
const balance: any = await xchain.getBalance(address, "AVAX")
console.log(balance)
// {
//   balance: '2000000000',
//   utxoIDs: [
//     {
//       txID: '2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct',
//       outputIndex: 0
//     }
//   ]
// }
```

## Envoyer AVAX

Le faucet a envoyé 2 AVAX à la première adresse que nous avons générée. Envoyons AVAX de la 1ère adresse à la 2ème adresse.

```typescript
// get the AVAX asset ID
const avaxAssetID: string = Defaults.network[networkID].X['avaxAssetID']

// get the AVAX balance for the 1st address
const getBalanceResponse: any = await xchain.getBalance(xAddressStrings[0], avaxAssetID)
const balance: BN = new BN(getBalanceResponse.balance)

// subtract the fee
const fee: BN = xchain.getDefaultTxFee()
const amount: BN = balance.sub(fee)

// get the UTXOs for the 1st address
const avmUTXOResponse: any = await xchain.getUTXOs(xAddressStrings[0])
const utxoSet: UTXOSet = avmUTXOResponse.utxos

// build an UnsignedTx sending AVAX from the first external BIP44 address to the second external BIP44 address
const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
  utxoSet,
  amount,
  avaxAssetID,
  [xAddressStrings[1]],
  [xAddressStrings[0]],
  [xAddressStrings[1]]
)

// sign it
const tx: Tx = unsignedTx.sign(xKeychain)

// issue it and get a txid
const txid: string = await xchain.issueTx(tx)
console.log(`Success! TXID: ${txid}`)
// Success! TXID: ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g
```

### Vérifier le succès

Nous pouvons vérifier que la transaction, , `ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`a été réussie en utilisant AvalancheJS.

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

Par ailleurs, nous pouvons utiliser l'Explorer Fuji Tesntet. La transaction peut être vue sur [l'Explorer Fuji](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g).

Détails de ![la transaction](../../../.gitbook/assets/explorer-3.png) ![Informations sur les entrées et la sortie](../../../.gitbook/assets/explorer-4.png)

#### Obtenir l'équilibre

Nous pouvons également utiliser l'Explorer Fuji pour obtenir le solde de la 2e adresse : [X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y).

![2e solde](../../../.gitbook/assets/balance-3.png)![](../../../.gitbook/assets/balance-4.png) d'adresse dérivé

Par ailleurs, nous pouvons utiliser AvalancheJS pour obtenir l'équilibre.

```typescript
const address: string = "X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y"
const balance: any = await xchain.getBalance(address, "AVAX")
console.log(balance)
// {
//   balance: '1999000000',
//   utxoIDs: [
//     {
//       txID: 'ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g',
//       outputIndex: 0
//     }
//   ]
// }
```

### Connectez-vous au portefeuille Web

Enfin, nous pouvons utiliser le mnemonic pour accéder au [portefeuille Web](https://wallet.avax.network) d'Avalanche. Nous verrons qu'il a l'équilibre AVAX et qu'il tire automatiquement la troisième adresse de la mnemonic.

Utilisez le mnemonic pour accéder au portefeuille Web.

![Acess le portefeuille](../../../.gitbook/assets/mnemonic.png)

L'équilibre est exact et l'adresse "active" est la 3e adresse dérivée.

![Adresse de](../../../.gitbook/assets/wallet-2.png) ![portefeuille Web](../../../.gitbook/assets/wallet-1.png)

Notez également que le portefeuille GUI montre qu'il a dérivé les trois mêmes adresses que notre script ci-dessus.

![Adresses dérivées du portefeuille](../../../.gitbook/assets/wallet-3.png)![](../../../.gitbook/assets/derived.png)

## Résumé

Le Fuji Testnet joue un rôle critique dans les dapps de test et de QAing, les contrats intelligents et les produits financiers avant de se déployer sur le continent. L'outil comme AvalancheJS, le public API, le robinet, et l'explorateur contribue à garantir que votre environnement de test et d'AQ est proche de Mainnet, de sorte que vous pouvez être confiant lorsque vous lancez sur Mainnet.

## Ressources

Pour des ressources supplémentaires et de valeur, veuillez consulter ci-dessous.

### Faucet

Le [faucet Fuji](https://faucet.avax-test.network) envoie AVAX aux adresses X-Chain ou C-Chain pour vous aider à tester. \(Ce testnet Avax n'a aucune valeur.\)

### Portefeuille

Le [portefeuille Web](https://wallet.avax.network) d'Avalanche est un portefeuille simple, sécurisé et non gardien pour stocker les actifs d'Avalanche. Il prend en charge les réseaux Mainnet, Fuji et personnalisés.

### Explorer

L'Avalanche Explorer vous permet d'explorer le réseau sur [Mainnet](https://explorer.avax.network) et [Fuji](https://explorer.avax-test.network).

### API publique

Voir [ici.](https://docs.avax.network/build/tools/public-api)

### Exemples d'AvalancheJS

Il y a plus de [60 scripts AvalancheJS](https://github.com/ava-labs/avalanchejs/tree/master/examples) qui démontrent comment les actifs et les NFT, envoyer des transactions, ajouter des validateurs et plus encore.

