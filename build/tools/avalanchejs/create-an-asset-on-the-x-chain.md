# Créer un actif sur la X-Chain

Cet exemple crée un actif sur la X-Chain et le publie sur la plateforme Avalanche. La première étape de ce processus est de créer une instance d'AvalancheJS connectée à notre endpoint de choix de la plateforme Avalanche. Dans cet exemple, nous utilisons le réseau local `12345`via A[vash.](https://github.com/ava-labs/avalanche-docs/tree/bba457018ce99b2a1bdf51e488b136049254e330/build/tools/avash/README.md) Les exemples de code sont écrits en dactylographie. Le script est en pleine forme, en dactylographie et en javascript, après les étapes individuelles.

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

## Importer l'adresse pre-funded du réseau local.

Ensuite, nous obtenons une instance de bintools, pour traiter les données binaires, un keychain local de X-Chain. Le réseau local `12345`a une adresse pre-funded que vous pouvez accéder à la clé privée .`PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN` Obtenez enfin l'adresse pre-funded en tant que a `Buffer`et en tant que .`string`

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Préparer à la sortie de la mint

Maintenant nous devons créer un tableau vide pour ce `SECPMintOutput`que nous allons créer. Nous avons également besoin d'un `threshold`et `locktime`pour les sorties que nous allons créer. Chaque transaction X-Chain peut contenir un `memo`champ de 256 octets. de données arbitraires.

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## Décrire le nouvel actif

La première étape de la création d'un nouvel actif en utilisant AvalancheJS est de déterminer les qualités de l'actif. Nous donnerons à l'actif un nom, un symbole de tiqueur, ainsi qu'une confession.

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## Définir async/attendre

Le code restant sera encapsulé par cette `main`fonction de sorte que nous puissions utiliser le `async``await`/

```typescript
const main = async (): Promise<any> => {
}
main()
```

## Rechercher the

Passez le `xAddressStrings`to `xchain.getUTXOs`pour chercher the

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## Créer l'état initial

Nous voulons frapper un actif avec 507 unités de l'actif détenu par la clé gérée. Cela met en place l'État qui résultera de la transaction Créer un actif.

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Créer la sortie de la mint

Nous voulons également créer un `SECPMintOutput`pour que nous puissions en taper plus tard sur cet actif.

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## Créer la transaction signée

Maintenant que nous savons à quoi nous voulons qu'un actif ressemble à un actif, nous créons une transaction à envoyer au réseau. Il existe une fonction d'assistant AVM `buildCreateAssetTx()`qui le fait tout seulement.

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

Maintenant, signons la transaction et délivrons la transaction au réseau d'Avalanche. Si elle est couronnée de succès, elle retourne une chaîne de série [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) pour la TxID.

Maintenant que nous avons une transaction signée prête à envoyer au réseau, let’s !

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## Obtenez l'état de la transaction<a id="get-the-status-of-the-transaction"></a>

Maintenant que nous avons envoyé la transaction au réseau, il faut quelques secondes pour déterminer si la transaction a été traversée. Nous pouvons obtenir un statut mis à jour sur la transaction en utilisant la TxID via l'API AVM.

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

Les statuts peuvent être l'un des statuts « acceptés », « Traitement  », « Inconnu » et « rejetés » :

* "accepté" indique que la transaction a été acceptée comme valide par le réseau et exécuté
* « Traitement » indique que la transaction est votée
* « Unknown » indique que le nœud ne sait rien sur la transaction, indiquant que le nœud ne l'a pas.
* "Rejeté" indique que le nœud sait sur la transaction, mais qu'il est en conflit avec une transaction acceptée

## Identifier l'actif nouvellement créé<a id="identifying-the-newly-created-asset"></a>

La X-Chain utilise le TxID de la transaction qui a créé l'actif comme l'identifiant unique de l'actif. Cet identifiant unique est désormais connu sous le nom d'« AssetID » de l'actif. Lorsque les actifs sont échangés autour de la X-Chain, ils font toujours référence à X-Chain, qu'ils représentent.

