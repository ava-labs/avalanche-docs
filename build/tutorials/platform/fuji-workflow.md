# Fuji Workflow

## Introduction

Fuji est le réseau d'essai du réseau Avalanche. Vous pouvez l'utiliser pour tester votre contrat dapp ou intelligent après que vous l'avez développé localement. \(Vous pouvez utiliser [Avash](https://docs.avax.network/build/tools/avash) pour tester les choses localement. \) Fuji est généralement sur la même version que le réseau Avalanche, mais il est parfois en cours d'exécution une version non libérée of En général, vous pouvez vous attendre à ce que le comportement de Fuji soit à peu près le même qu'Avalanche Mainnet. Les outils tels qu'un explorateur et les portefeuilles devraient travailler avec le Fuji Testnet.

Dans ce tutoriel, nous allons passer par un exemple Fuji workflow pour montrer comment il peut être utilisé. Nous ferons les mesures suivantes:

1. Générer un 24 mots anglais mnemonic via AvalancheJS
2. Dériver adresses externes BIP44 X-Chain via AvalancheJS
3. Obtenez AVAX du robinet Fuji
4. Envoyer AVAX via AvalancheJS
5. Examiner la transaction résultant sur l'Explorateur d'avalanche
6. Utilisez le mnémonique pour se connecter au portefeuille web

## Générer un Mnémonique

Pour commencer, nous allons créer une phrase mnémonique avec [AvalancheJS](https://docs.avax.network/build/tools/avalanchejs). Les Mnémoniques nous permettent d'encoder la sécurité forte dans une phrase lisible par l'homme. AvalancheJS supporte 10 langues dont l'anglais, le japonais, l'espagnol, l'italien, le français, le coréen, le tchèque, le portugais, le chinois simplifié et la tradition chinoise.

Premièrement, générer un 24 mots anglais [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonic compatible via AvalancheJS.

```typescript
import { Mnemonic } from "avalanche"
const mnemonic: Mnemonic = Mnemonic.getInstance()
const strength: number = 256
const wordlist = mnemonic.getWordlists("english") as string[]
const m: string = mnemonic.generateMnemonic(strength, randomBytes, wordlist)
console.log(m)
// "pool hat domain flame stomach canal fury master farm gown tide supreme winner motion this first divide spray forum wall reopen bounce spider palm"
```

## Dériver Adresses

Après avoir généré un mnémonique, nous pouvons utiliser AvalancheJS pour dériver les touches déterministes hiérarchiques conformes [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) \(HD\).

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

**Notez** que nous utilisons `le porte-clés` qui n'a pas encore été défini. La création d'un chain clé vide peut être vue dans [cet exemple le script AvalancheJS](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/newKeyChain.ts). Il y a des liens vers des dizaines d'exemples AvalancheJS dans [les ressources énumérées ci-dessous](fuji-workflow.md#resources).

Tant que vous avez la phrase menmonic vous pouvez regénérer vos clés privées et les adresses qu'elles contrôlent.

## Obtenez une goutte à partir du robinet Fuji

Nous pouvons obtenir un "goutte" of depuis le robinet Fuji. Coller l'adresse dans le [site du robinet Fuji](https://faucet.avax-test.network). Ces AVAX sont pour le Fuji Testnet et n'ont aucune valeur monétaire.

![Demande AVAX](../../../.gitbook/assets/faucet-request.png)

Le robinet enverra un certain AVAX à l'adresse et retournera un ID de transaction \(txID\). Ce txID peut être utilisé avec l'Explorateur Fuji Testnet pour en savoir plus sur la transaction.

![Réception AVAX](../../../.gitbook/assets/faucet-response.png)

### Vérifier les détails de la transaction

Le txID, `2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvCUDPo5t9nMct`, peut être vu sur [l'Explorateur Fuji Testnet](https://explorer.avax-test.network/tx/2GjAMJrBUYs8RuK2bXrNCuu34fNpJVor2ubNzvcUDPo5t9nMct). Avalanche possède également un [Explorateur Mainnet](https://explorer.avax.network).

![Détails de la transaction](../../../.gitbook/assets/explorer-1.png) ![Détails d'entrée et de sortie](../../../.gitbook/assets/explorer-2.png)

### Obtenez l'équilibre

Nous pouvons également utiliser l'Explorateur Fuji pour obtenir l'équilibre de la 1ère [adresse](https://explorer.avax-test.network/address/fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8nutsfm7a40) BIP44-dérivée—X-fuji1cfvdpdqyzpp8pq0g6trmjsrn9pt8noixfm7a40.

![1re balance](../../../.gitbook/assets/balance-1.png) ![d'adresse dérivée 1re transactions d'adresse dérivée](../../../.gitbook/assets/balance-2.png)

Alternativement, nous pouvons utiliser AvalancheJS pour obtenir l'équilibre.

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

Le robinet a envoyé 2 AVAX à la première adresse que nous avons générée. Envoyons AVAX de la 1re adresse à la 2e adresse.

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

Nous pouvons vérifier que la transaction, `ankMr1tD65A9Sto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g`, a été réussie avec AvalancheJS.

```typescript
const txid: string = "ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g"
const status: string = await xchain.getTxStatus(txid)
console.log(status)
// Accepted
```

Alternativement nous pouvons utiliser l'Explorateur Fuji Tesntet. La transaction peut être vue sur [l'Explorateur Fuji](https://explorer.avax-test.network/tx/ankMr1tD65A9SSto5w4ic1d31t6w42jeu8pfv6v4gRPpMg17g).

![Détails de la transaction](../../../.gitbook/assets/explorer-3.png) ![Détails d'entrée et de sortie](../../../.gitbook/assets/explorer-4.png)

#### Obtenez l'équilibre

Nous pouvons également utiliser l'Explorateur Fuji pour obtenir le solde de la 2ème adresse—[X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y](https://explorer.avax-test.network/address/X-fuji1y75dj6qygj7frw2xtcfn724qfty4aadnmeth6y).

![2e balance](../../../.gitbook/assets/balance-3.png) ![d'adresse dérivée 2e transactions d'adresse dérivée](../../../.gitbook/assets/balance-4.png)

Alternativement, nous pouvons utiliser AvalancheJS pour obtenir l'équilibre.

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

Enfin, nous pouvons utiliser le mnémonique pour accéder au [portefeuille Web Avalanche](https://wallet.avax.network). Nous allons voir qu'il a l'équilibre AVAX qu'il dérive auto-magiquement la 3ème adresse de la mnemonic.

Utilisez le mnémonique pour accéder au portefeuille Web.

![Acess le portefeuille](../../../.gitbook/assets/mnemonic.png)

Le solde est correct et l'adresse "active" est la 3e adresse dérive.

![Web portefeuille balance](../../../.gitbook/assets/wallet-1.png) ![3ème dérivé adresse BIP44](../../../.gitbook/assets/wallet-2.png)

Notez également que le portefeuille GUI montre qu'il a dérivé les mêmes 3 adresses que notre script ci-dessus.

![Wallet adresses](../../../.gitbook/assets/wallet-3.png) ![dérivées AvalancheJS adresses dérivées](../../../.gitbook/assets/derived.png)

## Résumé

Le Fuji Testnet joue un rôle essentiel dans les dapps et QAing, les contrats intelligents et les produits financiers avant de se déployer sur le continent. L'outillage comme AvalancheJS, l'API publique, le robinet et l'explorateur aide à garantir que votre environnement de test et QA est proche de Mainnet afin que vous puissiez être confiant lorsque vous lancez sur Mainnet.

## Ressources naturelles

Pour des ressources supplémentaires et utiles, veuillez consulter ci-dessous.

### Robinet

Le [robinet Fuji](https://faucet.avax-test.network) envoie AVAX aux adresses chaîne Xou C-Chain pour vous aider à tester. \(Ce testnet Avax n'a aucune valeur. \)

### Portefeuille

Le [portefeuille Web](https://wallet.avax.network) Avalanche est un portefeuille simple, sûr, non gardien pour le stockage des actifs Avalanche. Il supporte les réseaux Mainnet, Fuji et personnalisés.

### Explorateur

L'Explorateur Avalanche vous permet d'explorer le réseau sur [Mainnet](https://explorer.avax.network) et [Fuji](https://explorer.avax-test.network).

### API publique

Voir [ici.](https://docs.avax.network/build/tools/public-api)

### Exemples AvalancheJS

Il y a plus [de 60 exemples de scripts AvalancheJS](https://github.com/ava-labs/avalanchejs/tree/master/examples) qui démontrent comment les actifs et les NFT, envoyer des transactions, ajouter des validateurs et plus.

