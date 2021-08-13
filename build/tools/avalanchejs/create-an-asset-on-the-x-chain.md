# Créer un actif sur la chaîne X-

Cet exemple crée un actif sur la chaîne X, et le publie sur la plateforme Avalanche. La première étape de ce processus est de créer une instance of connectée à notre extrémité de la plateforme Avalanche. Dans cet exemple, nous utilisons le réseau local `12345` via [Avash](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md). Les exemples de code sont écrits dans le typescript. Le script est complet, à la fois dans le texte et le javascript, après les étapes individuelles.

```typescript
import {
  Avalanche,
  BinTools,
  BN,
  Buffer
 } from "avalanche"
import {
  AVMAPI,
  InitialStates,
  KeyChain,
  SECPMintOutput,
  SECPTransferOutput,
  Tx,
  UnsignedTx,
  UTXOSet
} from "avalanche/dist/apis/avm"
import {
  iAVMUTXOResponse
} from "avalanche/dist/apis/avm/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345 // Default is 1, we want to override that for our local network
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const xchain: AVMAPI = avalanche.XChain() // Returns a reference to the X-Chain used by AvalancheJS
```

## Importer l'adresse préfinancée du réseau local

Ensuite, nous obtenons une instance de bintools, pour traiter avec les données binaires, un keychain local de la chaîne X. Le réseau local `12345` a une adresse préfinancée que vous pouvez accéder avec la clé privée `PrivateKey-ewoqjP7PxY4yr3iLtpLisriqt94hdyDFNgchSxGztUrTXtNN`. Enfin, obtenez l'adresse préfinancée comme un `tampon` et comme une `chaîne`.

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Préparer la sortie de la Monnaie

Maintenant, nous devons créer un tableau vide pour la `SECPMintOutput` que nous allons créer. Nous avons également besoin d'un `seuil` et `d'un temps` de verrouillage pour les sorties que nous allons créer. Chaque transaction X-Chain peut contenir un champ `de mémo` allant jusqu'à 256 octets. de données arbitraires.

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## Décrivez le nouvel actif

La première étape de la création d'un nouvel actif en utilisant AvalancheJS est de déterminer les qualités de l'actif. Nous donnerons à l'actif un nom, un symbole de tiques, ainsi qu'une dénomination.

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## Configuration async/attente

Le code restant sera encapsulé par cette fonction `principale` de sorte que nous pouvons utiliser le modèle `async` / `attendent.`

```typescript
const main = async (): Promise<any> => {
}
main()
```

## Chercher the

Passez les chaînes `xAddressStrings` à `xchain.getUTXOs` pour récupérer the

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## Création de l'état initial

Nous voulons mint un actif avec 507 unités de l'actif détenu par la clé gérée. Cela établit l'état qui résultera de la transaction Créer un actif.

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Créer la sortie de la Monnaie

Nous voulons également créer une `SECPMintOutput` afin que nous puissions commencer à mint plus de cet actif plus tard.

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## Création de la transaction signée

Maintenant que nous savons à quoi nous voulons qu'un actif ressemble à un avantage, nous créons une transaction à envoyer au réseau. Il ya une fonction d'aide AVM `buildCreateAssetTx()` qui le fait juste.

```typescript
const unsignedTx: UnsignedTx = await xchain.buildCreateAssetTx(
  utxoSet,
  xAddressStrings,
  xAddressStrings,
  initialStates,
  name,
  symbol,
  denomination,
  outputs,
  memo
)
```

## Signer et délivrer la transaction

Maintenant, signons la transaction et la délivrons au réseau Avalanche. Si elle est couronnée de succès, elle retournera une chaîne de série [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) pour la TxiD.

Maintenant que nous avons une transaction signée prête à envoyer au réseau, nous l'émettons!

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## Obtenez le statut de la transaction<a id="get-the-status-of-the-transaction"></a>

Maintenant que nous avons envoyé la transaction au réseau, il faut quelques secondes pour déterminer si la transaction a été effectuée. Nous pouvons obtenir un statut mis à jour sur la transaction à l'aide de la TxID via l'API AVM.

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

Les statuts peuvent être l'un des statuts "acceptés", "traitement", "inconnu" et "rejetés":

* "Accepté" indique que la transaction a été acceptée comme valide par le réseau et exécutée
* « traitement » indique que la transaction est votée dessus.
* "Inconnu" indique que le noeud ne sait rien de la transaction, indiquant que le noeud ne l'a pas
* "Rejeté" indique que le noeud sait sur la transaction, mais il est en conflit avec une transaction acceptée

## Identifier l'actif nouvellement créé<a id="identifying-the-newly-created-asset"></a>

La chaîne X-Chain le TxID de la transaction qui a créé l'actif comme l'identifiant unique de l'actif. Cet identifiant unique est désormais connu sous le nom "AssetID" de l'actif. Lorsque les actifs sont échangés autour de la chaîne X, ils font toujours référence à the qu'ils représentent.

