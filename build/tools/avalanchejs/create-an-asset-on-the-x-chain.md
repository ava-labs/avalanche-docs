# Create an Asset on the X-Chain

This example creates an asset on the X-Chain and publishes it to the Avalanche platform. The first step in this process is to create an instance of AvalancheJS connected to our Avalanche platform endpoint of choice. In this example we're using the local network `12345` via [Avash](../avash.md). The code examples are written in typescript. The script is in full, in both typescript and javascript, after the individual steps. The whole example can be found [here](https://github.com/ava-labs/avalanchejs/blob/master/examples/avm/buildCreateAssetTx.ts).

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

## Import the local network's pre-funded address

Next we get an instance of bintools, for dealing with binary data, an the X-Chain local keychain. The local network `12345` has a pre-funded address which you can access with the private key `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`. Lastly get the pre-funded address as a `Buffer` and as a `string`.

```typescript
const bintools: BinTools = BinTools.getInstance()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
xKeychain.importKey(privKey)
const xAddresses: Buffer[] = xchain.keyChain().getAddresses()
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
```

## Prepare for the Mint Output

Now we need to create an empty array for the `SECPMintOutput` which we're going to create. We also need a `threshold` and `locktime` for the outputs which we're going to create. Each X-Chain transaction can can contain a `memo` field of up to 256 bytes. of arbitrary data.

```typescript
const outputs: SECPMintOutput[] = []
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = bintools.stringToBuffer("AVM utility method buildCreateAssetTx to create an ANT")
```

## Describe the new asset

The first step in creating a new asset using AvalancheJS is to determine the qualities of the asset. We will give the asset a name, a ticker symbol, as well as a denomination.

```typescript
const name: string = "TestToken"
const symbol: string = "TEST"
// Where is the decimal point indicate what 1 asset is and where fractional assets begin
// Ex: 1 AVAX is denomination 9, so the smallest unit of AVAX is nanoAVAX (nAVAX) at 10^-9 AVAX
const denomination: number = 3
```

## Set up async/await

The remaining code will be encapsulated by this `main` function so that we can use the `async` / `await` pattern.

```typescript
const main = async (): Promise<any> => {
}
main()
```

## Fetch the UTXO

Pass the `xAddressStrings` to `xchain.getUTXOs` to fetch the UTXO.

```typescript
  const avmUTXOResponse: iAVMUTXOResponse = await xchain.getUTXOs(xAddressStrings)
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
```

## Creating the initial state

We want to mint an asset with 507 units of the asset held by the managed key. This sets up the state that will result from the Create Asset transaction.

```typescript
// Create outputs for the asset's initial state
const amount: BN = new BN(507)
const secpTransferOutput = new SECPTransferOutput(amount, xAddresses, locktime, threshold)
const initialStates: InitialStates = new InitialStates()

// Populate the initialStates with the outputs
initialStates.addOutput(secpTransferOutput)
```

## Create the Mint Output

We also want to create a `SECPMintOutput` so that we can mint more of this asset later.

```typescript
const secpMintOutput: SECPMintOutput = new SECPMintOutput(xAddresses, locktime, threshold)
outputs.push(secpMintOutput
```

## Creating the signed transaction

Now that we know what we want an asset to look like, we create a transaction to send to the network. There is an AVM helper function `buildCreateAssetTx()` which does just that.

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

## Sign and issue the transaction

Now let's sign the transaction and issue it to the Avalanche network. If successful it will return a [CB58](http://support.avalabs.org/en/articles/4587395-what-is-cb58) serialized string for the TxID.

Now that we have a signed transaction ready to send to the network, let’s issue it!

```typescript
const tx: Tx = unsignedTx.sign(xKeychain)
const id: string = await xchain.issueTx(tx)
console.log(id)
```

## Get the status of the transaction <a id="get-the-status-of-the-transaction"></a>

Now that we sent the transaction to the network, it takes a few seconds to determine if the transaction has gone through. We can get an updated status on the transaction using the TxID through the AVM API.

```typescript
// returns one of: "Accepted", "Processing", "Unknown", and "Rejected"
const status: string = await xchain.getTxStatus(id)
```

The statuses can be one of "Accepted", "Processing", "Unknown", and "Rejected":

* "Accepted" indicates that the transaction has been accepted as valid by the network and executed
* "Processing" indicates that the transaction is being voted on.
* "Unknown" indicates that node knows nothing about the transaction, indicating the node doesn’t have it
* "Rejected" indicates the node knows about the transaction, but it conflicted with an accepted transaction

## Identifying the newly created asset <a id="identifying-the-newly-created-asset"></a>

The X-Chain uses the TxID of the transaction which created the asset as the unique identifier for the asset. This unique identifier is henceforth known as the "AssetID" of the asset. When assets are traded around the X-Chain, they always reference the AssetID that they represent.

